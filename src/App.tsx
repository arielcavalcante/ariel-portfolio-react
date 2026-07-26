import { useEffect } from 'react';
import type { Locale } from './content';
import { localizedPath, pathWithoutLocale, siteContent } from './content';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SomapayPage } from './pages/SomapayPage';

type Route = {
	locale: Locale;
	page: 'home' | 'somapay' | '404';
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
	return { locale, page: '404' };
}

export default function App() {
	const route = resolveRoute(window.location.pathname);
	const content = siteContent[route.locale];

	useEffect(() => {
		document.documentElement.lang = route.locale === 'pt-BR' ? 'pt-BR' : 'en';
		const title =
			route.page === 'home'
				? content.seo.homeTitle
				: route.page === 'somapay'
					? content.seo.caseTitle
					: content.seo.notFoundTitle;
		const description =
			route.page === 'somapay'
				? content.seo.caseDescription
				: route.page === 'home'
					? content.seo.homeDescription
					: content.seo.notFoundDescription;

		document.title = title;
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
					: window.location.pathname;
		const canonicalUrl = new URL(
			canonicalPath,
			'https://arielcavalcante.com',
		).href;

		setMeta('meta[name="description"]', 'name', 'description', description);
		setMeta(
			'meta[name="robots"]',
			'name',
			'robots',
			route.page === '404' ? 'noindex, follow' : 'index, follow',
		);
		setMeta('meta[property="og:title"]', 'property', 'og:title', title);
		setMeta(
			'meta[property="og:description"]',
			'property',
			'og:description',
			description,
		);
		setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
		setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
		setMeta(
			'meta[property="og:locale"]',
			'property',
			'og:locale',
			route.locale === 'pt-BR' ? 'pt_BR' : 'en_US',
		);
		setLink('link[rel="canonical"]', {
			rel: 'canonical',
			href: canonicalUrl,
		});

		document.head
			.querySelectorAll('link[rel="alternate"][hreflang]')
			.forEach(link => link.remove());

		if (route.page !== '404') {
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
	return <NotFoundPage locale={route.locale} />;
}
