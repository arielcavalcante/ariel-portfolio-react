import { useEffect, useRef } from 'react';
import { Reveal } from '../components/Reveal';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { AnnotatedText } from '../components/TermTooltip';
import {
	siteContent,
	vetPointContent,
	type Locale,
} from '../content';
import './VetPointPage.css';

type VetPointPageProps = {
	locale: Locale;
};

type TextSectionProps = {
	id: string;
	className?: string;
	section: {
		label: string;
		paragraphs: readonly string[];
		quote?: string;
	};
};

function TextSection({ id, className = '', section }: TextSectionProps) {
	return (
		<section
			className={`vetpoint-section ${className}`.trim()}
			id={id}
			data-vetpoint-section
		>
			<div className='vetpoint-shell vetpoint-section__grid'>
				<Reveal className='vetpoint-section__title'>
					<h2>{section.label}</h2>
				</Reveal>
				<Reveal className='vetpoint-section__content' delay={70}>
					{section.quote && <blockquote>{section.quote}</blockquote>}
					{section.paragraphs.map(paragraph => (
						<p key={paragraph}>{paragraph}</p>
					))}
				</Reveal>
			</div>
		</section>
	);
}

export function VetPointPage({ locale }: VetPointPageProps) {
	const pageRef = useRef<HTMLDivElement>(null);
	const site = siteContent[locale];
	const text = vetPointContent[locale];

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
					element.closest<HTMLElement>('[data-vetpoint-section], .site-footer'),
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
			pageElement.style.setProperty(
				'--language-switch-on-color',
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
		<div className='page-shell vetpoint-case' ref={pageRef}>
			<a className='skip-link' href='#main-content'>
				{site.common.skipToContent}
			</a>
			<SiteHeader locale={locale} currentPage='vetpoint' />

			<main id='main-content' tabIndex={-1}>
				<section className='vetpoint-hero' id='start' data-vetpoint-section>
					<div className='vetpoint-shell vetpoint-hero__inner'>
						<Reveal className='vetpoint-hero__logo'>
							<img
								src='/assets/vetpoint/vetpoint.svg'
								alt='VetPoint'
							/>
						</Reveal>
						<Reveal className='vetpoint-hero__copy' delay={80}>
							<h1>{text.hero.title}</h1>
							<p className='vetpoint-hero__metrics'>{text.hero.metrics}</p>
							<p className='vetpoint-hero__description'>{text.hero.lede}</p>
						</Reveal>
					</div>
				</section>

				<section
					className='vetpoint-intro'
					id='intro'
					data-vetpoint-section
				>
					<div className='vetpoint-shell vetpoint-intro__grid'>
						<Reveal className='vetpoint-section__title vetpoint-intro__title'>
							<h2>{text.intro.label}</h2>
						</Reveal>
						<div className='vetpoint-intro__content'>
							{text.intro.blocks.map((block, index) => (
								<Reveal
									className='vetpoint-copy-block'
									delay={index * 55}
									key={block.title}
								>
									<h3>{block.title}</h3>
									{block.paragraphs.map(paragraph => (
										<p key={paragraph}>
											<AnnotatedText
												text={paragraph}
												terms={[text.intro.term]}
											/>
										</p>
									))}
								</Reveal>
							))}
						</div>
					</div>
				</section>

				<section
					className='vetpoint-gallery'
					id='product'
					data-vetpoint-section
					aria-labelledby='vetpoint-gallery-title'
				>
					<h2 className='visually-hidden' id='vetpoint-gallery-title'>
						{text.galleryLabel}
					</h2>
					<div className='vetpoint-gallery__carousel'>
						<div className='vetpoint-gallery__track'>
							{[0, 1].map(group => (
								<div
									className='vetpoint-gallery__group'
									aria-hidden={group === 1 ? 'true' : undefined}
									key={group}
								>
									{text.images.map((image, index) => (
										<figure
											className='vetpoint-gallery__item'
											key={image.src}
										>
											<div className='vetpoint-gallery__image'>
												<img
													src={image.src}
													alt={group === 0 ? image.alt : ''}
													loading={group === 0 && index < 2 ? 'eager' : 'lazy'}
													decoding='async'
													draggable='false'
													width='1200'
													height='2133'
												/>
											</div>
											<figcaption>
												{index + 1}. {image.caption}
											</figcaption>
										</figure>
									))}
									<div
										className='vetpoint-gallery__spacer'
										aria-hidden='true'
									>
										<span />
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				<TextSection
					id='challenge'
					className='vetpoint-section--yellow vetpoint-section--sticky-title'
					section={text.sections.challenge}
				/>

				<section
					className='vetpoint-section vetpoint-section--paper vetpoint-section--reverse'
					id='role'
					data-vetpoint-section
				>
					<div className='vetpoint-shell vetpoint-section__grid'>
						<Reveal className='vetpoint-section__title'>
							<h2>{text.sections.role.label}</h2>
						</Reveal>
						<div className='vetpoint-section__content'>
							<ul className='vetpoint-role-list'>
								{text.sections.role.cards.map((card, index) => (
									<li key={card.title}>
										<Reveal delay={index * 55}>
											<article>
												<h3>{card.title}</h3>
												<p>{card.text}</p>
											</article>
										</Reveal>
									</li>
								))}
							</ul>
						</div>
					</div>
				</section>

				<TextSection
					id='approach'
					className='vetpoint-section--blue'
					section={text.sections.approach}
				/>
				<TextSection
					id='workstreams'
					className='vetpoint-section--navy vetpoint-section--reverse'
					section={text.sections.workstreams}
				/>
				<TextSection
					id='engineering'
					className='vetpoint-section--orange'
					section={text.sections.engineering}
				/>

				<section
					className='vetpoint-section vetpoint-outcome vetpoint-section--reverse'
					id='outcome'
					data-vetpoint-section
				>
					<div className='vetpoint-shell vetpoint-section__grid'>
						<Reveal className='vetpoint-section__title'>
							<h2>{text.sections.outcome.label}</h2>
						</Reveal>
						<Reveal className='vetpoint-section__content' delay={70}>
							{text.sections.outcome.paragraphs.map(paragraph => (
								<p key={paragraph}>{paragraph}</p>
							))}
						</Reveal>
					</div>
				</section>

				<section
					className='vetpoint-disclosure'
					data-vetpoint-section
					aria-label={text.sections.outcome.disclosureLabel}
				>
					<div className='vetpoint-shell vetpoint-disclosure__inner'>
						<Reveal>
							<p>{text.sections.outcome.disclosure}</p>
						</Reveal>
						<Reveal delay={70}>
							<p className='vetpoint-thanks'>{text.thanks}</p>
						</Reveal>
					</div>
				</section>
			</main>

			<SiteFooter locale={locale} />
		</div>
	);
}
