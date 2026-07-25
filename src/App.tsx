import { useEffect } from 'react';
import type { Locale } from './content';
import { siteContent } from './content';
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
				: content.seo.homeDescription;

		document.title = title;
		let meta = document.querySelector<HTMLMetaElement>(
			'meta[name="description"]',
		);
		if (!meta) {
			meta = document.createElement('meta');
			meta.name = 'description';
			document.head.appendChild(meta);
		}
		meta.content = description;
	}, [content, route.locale, route.page]);

	if (route.page === 'home') return <HomePage locale={route.locale} />;
	if (route.page === 'somapay') return <SomapayPage locale={route.locale} />;
	return <NotFoundPage locale={route.locale} />;
}
