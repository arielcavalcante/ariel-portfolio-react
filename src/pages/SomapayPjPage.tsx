import { useEffect, useRef } from 'react';
import { BeforeAfter } from '../components/BeforeAfter';
import { Reveal } from '../components/Reveal';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { siteContent, somapayPjContent, type Locale } from '../content';
import './SomapayPjPage.css';

type SomapayPjPageProps = {
	locale: Locale;
};

type NarrativeSectionProps = {
	id: string;
	className: string;
	section: {
		label: string;
		paragraphs: readonly string[];
	};
};

function NarrativeSection({
	id,
	className,
	section,
}: NarrativeSectionProps) {
	return (
		<section
			className={`spj-section ${className}`}
			id={id}
			data-somapay-pj-section
		>
			<div className='spj-shell spj-section__grid'>
				<Reveal className='spj-section__title'>
					<h2>{section.label}</h2>
				</Reveal>
				<Reveal className='spj-section__content' delay={70}>
					{section.paragraphs.map(paragraph => (
						<p key={paragraph}>{paragraph}</p>
					))}
				</Reveal>
			</div>
		</section>
	);
}

export function SomapayPjPage({ locale }: SomapayPjPageProps) {
	const pageRef = useRef<HTMLDivElement>(null);
	const site = siteContent[locale];
	const text = somapayPjContent[locale];

	useEffect(() => {
		document.body.classList.add('somapay-case-open');
		return () => document.body.classList.remove('somapay-case-open');
	}, []);

	useEffect(() => {
		const pageElement = pageRef.current;
		if (!pageElement) return;

		let animationFrame = 0;
		const updateHeaderColors = () => {
			const header = pageElement.querySelector<HTMLElement>('.site-header');
			const probeY = (header?.getBoundingClientRect().height ?? 64) / 2;
			const currentArea = document
				.elementsFromPoint(window.innerWidth / 2, probeY)
				.map(element =>
					element.closest<HTMLElement>(
						'[data-somapay-pj-section], .site-footer',
					),
				)
				.find(area => area && pageElement.contains(area));

			if (!currentArea) return;
			const computed = getComputedStyle(currentArea);
			const toggleTrackColor =
				computed.getPropertyValue('--section-toggle-track-color').trim() ||
				computed.color;

			pageElement.style.setProperty('--header-text-color', computed.color);
			pageElement.style.setProperty(
				'--header-background-color',
				computed.backgroundColor,
			);
			pageElement.style.setProperty(
				'--language-switch-off-color',
				toggleTrackColor,
			);
		};

		const queueHeaderUpdate = () => {
			cancelAnimationFrame(animationFrame);
			animationFrame = requestAnimationFrame(updateHeaderColors);
		};

		window.addEventListener('scroll', queueHeaderUpdate, { passive: true });
		window.addEventListener('resize', queueHeaderUpdate);
		updateHeaderColors();

		return () => {
			cancelAnimationFrame(animationFrame);
			window.removeEventListener('scroll', queueHeaderUpdate);
			window.removeEventListener('resize', queueHeaderUpdate);
		};
	}, []);

	return (
		<div className='page-shell somapay-pj-case' ref={pageRef}>
			<a className='skip-link' href='#main-content'>
				{site.common.skipToContent}
			</a>
			<SiteHeader locale={locale} currentPage='somapay-pj' />

			<main id='main-content' tabIndex={-1}>
				<section className='spj-hero' id='start' data-somapay-pj-section>
					<div className='spj-shell spj-hero__inner'>
						<Reveal className='spj-hero__logo'>
							<img
								src='/assets/somapay/pj/conta-pjota.svg'
								alt='Somapay PJ'
							/>
						</Reveal>
						<Reveal className='spj-hero__copy' delay={80}>
							<h1>{text.hero.title}</h1>
							<p className='spj-hero__metrics'>{text.hero.metrics}</p>
							<p className='spj-hero__description'>{text.hero.description}</p>
						</Reveal>
					</div>
				</section>

				<section className='spj-intro' id='intro' data-somapay-pj-section>
					<div className='spj-shell spj-intro__grid'>
						<Reveal className='spj-section__title spj-intro__title'>
							<h2>{text.intro.label}</h2>
						</Reveal>
						<div className='spj-intro__content'>
							{text.intro.blocks.map((block, index) => (
								<Reveal
									className='spj-copy-block'
									delay={index * 55}
									key={block.title}
								>
									<h3>{block.title}</h3>
									{block.paragraphs.map(paragraph => (
										<p key={paragraph}>{paragraph}</p>
									))}
								</Reveal>
							))}
						</div>
					</div>
				</section>

				<NarrativeSection
					id='system'
					className='spj-section--paper'
					section={text.system}
				/>

				<section
					className='spj-section spj-section--blue'
					id='journey'
					data-somapay-pj-section
				>
					<div className='spj-shell spj-journey__grid'>
						<Reveal className='spj-section__title spj-journey__title'>
							<h2>{text.journey.label}</h2>
						</Reveal>
						<div className='spj-journey__content'>
							<Reveal className='spj-journey__intro' delay={70}>
								<p>{text.journey.intro}</p>
							</Reveal>
							<ol className='spj-journey__items'>
								{text.journey.steps.map((step, index) => (
									<li key={step.number}>
										<Reveal className='spj-journey__item' delay={index * 70}>
											<span className='spj-journey__number' aria-hidden='true'>
												{step.number}
											</span>
											<div>
												<h3>{step.title}</h3>
												<p>{step.text}</p>
											</div>
										</Reveal>
									</li>
								))}
							</ol>
						</div>
					</div>
				</section>

				<NarrativeSection
					id='delivery'
					className='spj-section--gold'
					section={text.delivery}
				/>

				<section
					className='spj-dark-mode'
					id='dark-mode'
					data-somapay-pj-section
				>
					<div className='spj-shell'>
						<Reveal className='spj-section__title spj-dark-mode__lead'>
							<h2>{text.darkMode.label}</h2>
							<div className='spj-dark-mode__copy'>
								{text.darkMode.paragraphs.map(paragraph => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</div>
						</Reveal>

						<div className='spj-dark-mode__visuals'>
							<Reveal className='spj-dark-mode__background'>
								<img
									src='/assets/somapay/pj/image-grid.svg'
									alt=''
									loading='lazy'
									decoding='async'
								/>
							</Reveal>
							<Reveal className='spj-dark-mode__comparison' delay={600}>
								<figure>
									<BeforeAfter
										before='/assets/somapay/pj/Home Screen - Dark -- mockup.webp'
										after='/assets/somapay/pj/Home Screen - Light -- mockup.webp'
										beforeAlt={text.darkMode.darkAlt}
										afterAlt={text.darkMode.lightAlt}
										label={text.darkMode.comparisonLabel}
										aspectRatio={2003 / 4096}
									/>
									<figcaption>{text.darkMode.note}</figcaption>
								</figure>
							</Reveal>
						</div>
					</div>
				</section>

				<section
					className='spj-section spj-outcome'
					id='outcome'
					data-somapay-pj-section
				>
					<div className='spj-shell'>
						<div className='spj-section__grid'>
							<Reveal className='spj-section__title'>
								<h2>{text.outcome.label}</h2>
							</Reveal>
							<Reveal className='spj-section__content' delay={70}>
								{text.outcome.paragraphs.map(paragraph => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</Reveal>
						</div>
						<ul className='spj-outcome__metrics'>
							{text.outcome.metrics.map((metric, index) => (
								<li key={metric.value}>
									<Reveal delay={index * 55}>
										<strong>{metric.value}</strong>
										<span>{metric.label}</span>
									</Reveal>
								</li>
							))}
						</ul>
					</div>
				</section>

				<section
					className='spj-disclosure'
					data-somapay-pj-section
					aria-label={site.caseDisclosure.label}
				>
					<div className='spj-shell spj-disclosure__inner'>
						<Reveal>
							<p>{site.caseDisclosure.text}</p>
						</Reveal>
						<Reveal delay={70}>
							<p className='spj-thanks'>{site.caseDisclosure.thanks}</p>
						</Reveal>
					</div>
				</section>
			</main>

			<SiteFooter locale={locale} />
		</div>
	);
}
