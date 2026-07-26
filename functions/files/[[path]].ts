interface FileObject {
	body?: ReadableStream;
	httpEtag: string;
	range?: {
		offset: number;
		length: number;
	};
	size: number;
	writeHttpMetadata(headers: Headers): void;
}

interface FileBucket {
	get(
		key: string,
		options?: {
			onlyIf?: Headers;
			range?: Headers;
		},
	): Promise<FileObject | null>;
	head(key: string): Promise<FileObject | null>;
}

interface Env {
	FILES_BUCKET: FileBucket;
}

interface FunctionContext {
	env: Env;
	request: Request;
}

const FILES_PREFIX = '/files/';
const DEFAULT_CACHE_CONTROL = 'public, max-age=3600, s-maxage=86400';

function getObjectKey(request: Request): string | null {
	const pathname = new URL(request.url).pathname;
	if (!pathname.startsWith(FILES_PREFIX)) return null;

	try {
		const key = decodeURIComponent(pathname.slice(FILES_PREFIX.length));
		if (
			!key ||
			key.includes('\0') ||
			key.includes('\\') ||
			key.split('/').some(segment => segment === '..')
		) {
			return null;
		}

		return key;
	} catch {
		return null;
	}
}

function createObjectHeaders(
	object: FileObject,
	isRangeRequest = false,
): Headers {
	const headers = new Headers();
	object.writeHttpMetadata(headers);
	headers.set('accept-ranges', 'bytes');
	headers.set('etag', object.httpEtag);
	headers.set('x-ariel-file-source', 'r2');

	if (!headers.has('cache-control')) {
		headers.set('cache-control', DEFAULT_CACHE_CONTROL);
	}

	if (isRangeRequest && object.range) {
		const end = object.range.offset + object.range.length - 1;
		headers.set(
			'content-range',
			`bytes ${object.range.offset}-${end}/${object.size}`,
		);
		headers.set('content-length', String(object.range.length));
	} else if (!headers.has('content-length')) {
		headers.set('content-length', String(object.size));
	}

	return headers;
}

function failedPreconditionStatus(request: Request): number {
	return request.headers.has('if-none-match') ||
		request.headers.has('if-modified-since')
		? 304
		: 412;
}

export const onRequest: (context: FunctionContext) => Promise<Response> = async ({
	env,
	request,
}) => {
	if (request.method !== 'GET' && request.method !== 'HEAD') {
		return new Response('Method not allowed', {
			status: 405,
			headers: { allow: 'GET, HEAD' },
		});
	}

	const key = getObjectKey(request);
	if (!key) {
		return new Response('File not found', { status: 404 });
	}

	if (request.method === 'HEAD') {
		const object = await env.FILES_BUCKET.head(key);
		if (!object) {
			return new Response('File not found', { status: 404 });
		}

		return new Response(null, {
			status: 200,
			headers: createObjectHeaders(object),
		});
	}

	const isRangeRequest = request.headers.has('range');
	const object = await env.FILES_BUCKET.get(key, {
		onlyIf: request.headers,
		range: isRangeRequest ? request.headers : undefined,
	});

	if (!object) {
		return new Response('File not found', { status: 404 });
	}

	const headers = createObjectHeaders(object, isRangeRequest);
	if (!object.body) {
		return new Response(null, {
			status: failedPreconditionStatus(request),
			headers,
		});
	}

	return new Response(object.body, {
		status: isRangeRequest ? 206 : 200,
		headers,
	});
};
