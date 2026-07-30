import { lazy, Suspense, useEffect } from 'react';
import { Reveal } from '../components/Reveal';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { siteContent, type Locale } from '../content';
import './SomapayPage.css';
import './CreditoTrabalhadorPage.css';

type CreditoTrabalhadorPageProps = {
	locale: Locale;
};

const IPhoneMockup = lazy(() =>
	import('../components/IPhoneMockup/IPhoneMockup').then(module => ({
		default: module.IPhoneMockup,
	})),
);

export function CreditoTrabalhadorPage({
	locale,
}: CreditoTrabalhadorPageProps) {
	const site = siteContent[locale];

	useEffect(() => {
		document.body.classList.add('somapay-case-open');
		return () => document.body.classList.remove('somapay-case-open');
	}, []);

	return (
		<div className='page-shell somapay-case worker-credit-case'>
			<a className='skip-link' href='#main-content'>
				{site.common.skipToContent}
			</a>
			<SiteHeader locale={locale} currentPage='somapay-pf' />

			<main id='main-content' tabIndex={-1}>
				<section className='worker-credit-case__hero'>
					<div className='sp-shell worker-credit-case__hero-inner'>
						<Reveal>
							<h1>Crédito do Trabalhador</h1>
						</Reveal>

						<Reveal delay={80}>
							<figure className='worker-credit-case__phone'>
								<Suspense
									fallback={
										<div
											className='worker-credit-case__phone-placeholder'
											aria-hidden='true'
										/>
									}
								>
									<IPhoneMockup
										screenImage='/assets/3d/images/01.webp'
										alt={
											locale === 'pt-BR'
												? 'Mockup 3D interativo de um iPhone 17 Pro exibindo o aplicativo Somapay'
												: 'Interactive 3D iPhone 17 Pro mockup displaying the Somapay app'
										}
									/>
								</Suspense>
							</figure>
						</Reveal>
					</div>
				</section>
			</main>

			<SiteFooter locale={locale} />
		</div>
	);
}
