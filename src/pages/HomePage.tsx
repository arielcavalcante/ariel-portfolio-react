import { useEffect, useRef } from 'react';
import type { Locale } from '../content';
import { localizedPath, siteContent } from '../content';
import { ProjectCard } from '../components/ProjectCard';
import { Reveal } from '../components/Reveal';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { SkillMarquee } from '../components/SkillMarquee';

type HomePageProps = {
	locale: Locale;
};

export function HomePage({ locale }: HomePageProps) {
	const content = siteContent[locale];
	const titleRef = useRef<HTMLHeadingElement>(null);
	const heroTitleLines =
		locale === 'pt-BR'
			? {
					desktop: ['Design de Produto &', 'Design Systems'],
					mobile: ['Design de', 'Produto &', 'Design', 'Systems'],
				}
			: {
					desktop: ['Product Design &', 'Design Systems'],
					mobile: ['Product', 'Design &', 'Design', 'Systems'],
				};

	useEffect(() => {
		const title = titleRef.current;
		if (!title) return;

		const fitTitle = () => {
			title.style.removeProperty('font-size');
			const preferredSize = Number.parseFloat(getComputedStyle(title).fontSize);
			const availableWidth = title.clientWidth;
			const renderedWidth = title.scrollWidth;

			if (renderedWidth > availableWidth && availableWidth > 0) {
				title.style.fontSize = `${preferredSize * (availableWidth / renderedWidth) * 0.98}px`;
			}
		};

		fitTitle();
		const observer = new ResizeObserver(fitTitle);
		observer.observe(title);
		document.fonts?.ready.then(fitTitle);

		return () => observer.disconnect();
	}, [locale]);

	return (
		<div className='page-shell home-page'>
			<SiteHeader locale={locale} currentPage='home' />

			<main>
				<section className='home-hero page-width'>
					<div className='availability'>
						<span className='availability__dot' />
						<span>{content.home.available}</span>
					</div>

					<div className='home-hero__title-art'>
						<img
							className='home-hero__merman'
							src='/assets/icons/merman.svg'
							alt=''
							aria-hidden='true'
						/>
						<span
							className='home-hero__shape home-hero__shape--circle'
							aria-hidden='true'
						/>
						<span
							className='home-hero__shape home-hero__shape--square'
							aria-hidden='true'
						/>
						<h1 ref={titleRef}>
							{heroTitleLines.desktop.map(line => (
								<span className='home-hero__title-line--desktop' key={line}>
									{line}
								</span>
							))}
							{heroTitleLines.mobile.map(line => (
								<span className='home-hero__title-line--mobile' key={line}>
									{line}
								</span>
							))}
						</h1>
					</div>

					<p className='home-hero__intro'>{content.home.intro}</p>
					<SkillMarquee items={content.home.skills} />
				</section>

				<section className='projects-section page-width' id='projects'>
					{content.home.projects.map((project, index) => (
						<Reveal key={project.id} delay={index * 80}>
							<ProjectCard
								labels={{
									client: content.common.client,
									role: content.common.role,
								}}
								project={{
									...project,
									href: project.available
										? localizedPath(locale, project.href)
										: project.href,
								}}
							/>
						</Reveal>
					))}
				</section>
			</main>

			<SiteFooter locale={locale} />
		</div>
	);
}
