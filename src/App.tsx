import { useEffect } from 'react';
import type { Locale } from './content';
import { localizedPath, pathWithoutLocale, siteContent } from './content';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CreditoTrabalhadorPage } from './pages/CreditoTrabalhadorPage';
import { SomapayPage } from './pages/SomapayPage';

type Route = {
	locale: Locale;
	page: 'home' | 'somapay' | 'workerCredit' | '404';
};

function resolveRoute(pathname: string): Route {
	const normalized = pathname.replace(/\/+$/, '') || '/';
	const locale: Locale =
		normalized === '/br' || normalized.startsWith('/br/') ? 'pt-BR' : 'en';
	const localPath =
		locale === 'pt-BR'
			? normalized.replace(/^\/br(?=\/|$)/, '') || '/'
			: normalized;

	if (localPath === '/') return { locale, page: 'home' };
	if (localPath === '/somapay-pf') return { locale, page: 'somapay' };
	if (localPath === '/somapay-pf/cred-trabalhador') {
		return { locale, page: 'workerCredit' };
	}
	return { locale, page: '404' };
}

export default function App() {
	const route = resolveRoute(window.location.pathname);
	const content = siteContent[route.locale];

	useEffect(() => {
		document.documentElement.lang = route.locale === 'pt-BR' ? 'pt-BR' : 'en';
		const pageMetadata: Record<Route['page'], { title: string; description: string }> = {
			home: {
				title: content.seo.homeTitle,
				description: content.seo.homeDescription,
			},
			somapay: {
				title: content.seo.caseTitle,
				description: content.seo.caseDescription,
			},
			workerCredit: {
				title: content.seo.workerCreditTitle,
				description: content.seo.workerCreditDescription,
			},
			'404': {
				title: content.seo.notFoundTitle,
				description: content.seo.notFoundDescription,
			},
		};
		const { title, description } = pageMetadata[route.page];
		const themeColor: Record<Route['page'], string> = {
			home: '#f2f2f1',
			somapay: '#0c0c0c',
			workerCredit: '#171a31',
			'404': '#f2f2f1',
		};

		document.title = title;
		document.documentElement.style.backgroundColor = themeColor[route.page];
		const setMeta = (
			selector: string,
			attribute: 'name' | 'property',
			key: string,
			value: string,
		) => {
			let meta = document.head.querySelector<HTMLMetaElement>(selector);
			if (!meta) {
				meta = document.createElement('meta');
				meta.setAttribute(attribute, key);
				document.head.appendChild(meta);
			}
			meta.content = value;
		};
		const setLink = (
			selector: string,
			attributes: Record<string, string>,
		) => {
			let link = document.head.querySelector<HTMLLinkElement>(selector);
			if (!link) {
				link = document.createElement('link');
				document.head.appendChild(link);
			}
			Object.entries(attributes).forEach(([key, value]) =>
				link?.setAttribute(key, value),
			);
		};

		const localPath = pathWithoutLocale(window.location.pathname);
		const canonicalPath =
			route.page === 'home'
				? localizedPath(route.locale, '/')
				: route.page === 'somapay'
					? localizedPath(route.locale, '/somapay-pf')
					: route.page === 'workerCredit'
						? localizedPath(
								route.locale,
								'/somapay-pf/cred-trabalhador',
							)
					: window.location.pathname;
		const canonicalUrl = new URL(
			canonicalPath,
			'https://arielcavalcante.com',
		).href;
		const socialImageUrl =
			'https://arielcavalcante.com/assets/social-preview.jpg';
		const socialImageAlt =
			'Ariel Cavalcante logo with a merman illustration and geometric red shapes.';

		setMeta('meta[name="description"]', 'name', 'description', description);
		setMeta(
			'meta[name="theme-color"]',
			'name',
			'theme-color',
			themeColor[route.page],
		);
		setMeta(
			'meta[name="robots"]',
			'name',
			'robots',
			route.page === 'workerCredit'
				? 'noindex, nofollow, noarchive, nosnippet'
				: route.page === '404'
					? 'noindex, follow'
					: 'index, follow',
		);
		setMeta('meta[property="og:title"]', 'property', 'og:title', title);
		setMeta(
			'meta[property="og:description"]',
			'property',
			'og:description',
			description,
		);
		setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
		setMeta(
			'meta[property="og:site_name"]',
			'property',
			'og:site_name',
			'Ariel Cavalcante',
		);
		setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
		setMeta(
			'meta[property="og:image"]',
			'property',
			'og:image',
			socialImageUrl,
		);
		setMeta(
			'meta[property="og:image:secure_url"]',
			'property',
			'og:image:secure_url',
			socialImageUrl,
		);
		setMeta(
			'meta[property="og:image:type"]',
			'property',
			'og:image:type',
			'image/jpeg',
		);
		setMeta(
			'meta[property="og:image:width"]',
			'property',
			'og:image:width',
			'1200',
		);
		setMeta(
			'meta[property="og:image:height"]',
			'property',
			'og:image:height',
			'630',
		);
		setMeta(
			'meta[property="og:image:alt"]',
			'property',
			'og:image:alt',
			socialImageAlt,
		);
		setMeta(
			'meta[property="og:locale"]',
			'property',
			'og:locale',
			route.locale === 'pt-BR' ? 'pt_BR' : 'en_US',
		);
		setMeta(
			'meta[name="twitter:card"]',
			'name',
			'twitter:card',
			'summary_large_image',
		);
		setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
		setMeta(
			'meta[name="twitter:description"]',
			'name',
			'twitter:description',
			description,
		);
		setMeta(
			'meta[name="twitter:image"]',
			'name',
			'twitter:image',
			socialImageUrl,
		);
		setMeta(
			'meta[name="twitter:image:alt"]',
			'name',
			'twitter:image:alt',
			socialImageAlt,
		);
		setLink('link[rel="canonical"]', {
			rel: 'canonical',
			href: canonicalUrl,
		});

		document.head
			.querySelectorAll('link[rel="alternate"][hreflang]')
			.forEach(link => link.remove());

		if (route.page !== '404' && route.page !== 'workerCredit') {
			const alternatePath =
				route.page === 'home' ? '/' : localPath;
			([
				['en', localizedPath('en', alternatePath)],
				['pt-BR', localizedPath('pt-BR', alternatePath)],
				['x-default', localizedPath('en', alternatePath)],
			] as const).forEach(([hreflang, href]) => {
				const link = document.createElement('link');
				link.rel = 'alternate';
				link.hreflang = hreflang;
				link.href = new URL(href, 'https://arielcavalcante.com').href;
				document.head.appendChild(link);
			});
		}
	}, [content, route.locale, route.page]);

	if (route.page === 'home') return <HomePage locale={route.locale} />;
	if (route.page === 'somapay') return <SomapayPage locale={route.locale} />;
	if (route.page === 'workerCredit') {
		return <CreditoTrabalhadorPage locale={route.locale} />;
	}
	return <NotFoundPage locale={route.locale} />;
}
