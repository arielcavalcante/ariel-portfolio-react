import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDirectory = path.join(root, 'public');
const sourceExtensions = new Set(['.css', '.html', '.ts', '.tsx']);

async function collectSourceFiles(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async entry => {
			const entryPath = path.join(directory, entry.name);
			if (entry.isDirectory()) return collectSourceFiles(entryPath);
			return sourceExtensions.has(path.extname(entry.name)) ? [entryPath] : [];
		}),
	);

	return files.flat();
}

async function read(relativePath) {
	return readFile(path.join(root, relativePath), 'utf8');
}

test('all referenced local assets exist and are not empty', async () => {
	const files = [
		path.join(root, 'index.html'),
		...(await collectSourceFiles(path.join(root, 'src'))),
	];
	const references = new Map();
	const quotedAsset = /['"`](\/(?:assets|fonts)\/[^'"`?#]+|\/favicon-(?:dark|light)\.png)(?:[?#][^'"`]*)?['"`]/g;

	for (const file of files) {
		const source = await readFile(file, 'utf8');
		for (const match of source.matchAll(quotedAsset)) {
			const assetPath = decodeURIComponent(match[1]);
			const locations = references.get(assetPath) ?? [];
			locations.push(path.relative(root, file));
			references.set(assetPath, locations);
		}
	}

	assert.ok(references.size > 0, 'No local asset references were discovered');

	for (const [assetPath, locations] of references) {
		const filePath = path.join(publicDirectory, assetPath.slice(1));
		const fileStats = await stat(filePath).catch(() => null);
		assert.ok(
			fileStats?.isFile(),
			`Missing ${assetPath}, referenced by ${locations.join(', ')}`,
		);
		assert.ok(fileStats.size > 0, `${assetPath} is empty`);
	}
});

test('the application keeps its supported English and Portuguese routes', async () => {
	const app = await read('src/App.tsx');
	const expectedLocalRoutes = [
		"localPath === '/'",
		"localPath === '/somapay-pf'",
		"localPath === '/somapay-pj'",
		"localPath === '/somapay-pf/cred-trabalhador'",
		"localPath === '/vetpoint'",
	];

	for (const route of expectedLocalRoutes) {
		assert.ok(app.includes(route), `App route is missing: ${route}`);
	}
	assert.match(app, /normalized\.startsWith\('\/br\/'\)/);
	assert.match(app, /page: '404'/);
});

test('the sitemap contains only public, supported pages', async () => {
	const sitemap = await read('public/sitemap.xml');
	const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
		match => match[1],
	);

	assert.deepEqual(urls, [
		'https://arielcavalcante.com/',
		'https://arielcavalcante.com/br/',
		'https://arielcavalcante.com/somapay-pf',
		'https://arielcavalcante.com/br/somapay-pf',
		'https://arielcavalcante.com/somapay-pj',
		'https://arielcavalcante.com/br/somapay-pj',
		'https://arielcavalcante.com/vetpoint',
		'https://arielcavalcante.com/br/vetpoint',
	]);
	assert.doesNotMatch(sitemap, /cred-trabalhador/);
});

test('the private case study remains protected from search indexing', async () => {
	const app = await read('src/App.tsx');
	const headers = await read('public/_headers');
	const directive = 'noindex, nofollow, noarchive, nosnippet';

	assert.ok(app.includes(directive), 'Client-side robots directive is missing');
	assert.match(
		headers,
		/\/somapay-pf\/cred-trabalhador\*[\s\S]*?X-Robots-Tag: noindex, nofollow, noarchive, nosnippet/,
	);
	assert.match(
		headers,
		/\/br\/somapay-pf\/cred-trabalhador\*[\s\S]*?X-Robots-Tag: noindex, nofollow, noarchive, nosnippet/,
	);
});

test('Cloudflare keeps direct SPA routes working', async () => {
	const redirects = await read('public/_redirects');
	assert.match(redirects, /^\/\*\s+\/index\.html\s+200\s*$/m);
});

test('shared file URLs remain connected to the R2 bucket', async () => {
	const routes = JSON.parse(await read('public/_routes.json'));
	const fileFunction = await read('functions/files/[[path]].ts');
	const wrangler = await read('wrangler.toml');

	assert.ok(routes.include.includes('/files/*'));
	assert.match(fileFunction, /FILES_BUCKET/);
	assert.match(wrangler, /binding\s*=\s*"FILES_BUCKET"/);
	assert.match(wrangler, /bucket_name\s*=\s*"ariel-portfolio-files"/);
});

test('the uptime health endpoint is valid', async () => {
	const health = JSON.parse(await read('public/health.json'));
	assert.deepEqual(health, {
		service: 'ariel-portfolio',
		status: 'ok',
	});
});
