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
	const pageRef = useRef<HTMLDivElement>(null);
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

	useEffect(() => {
		const page = pageRef.current;
		const resume = page?.querySelector<HTMLElement>('#resume');
		if (!page || !resume) return;

		let animationFrame = 0;

		const updateHeaderColor = () => {
			const header = page.querySelector<HTMLElement>('.site-header');
			const probeY = (header?.getBoundingClientRect().height ?? 64) / 2;
			const resumeRect = resume.getBoundingClientRect();
			const overResume = resumeRect.top <= probeY && resumeRect.bottom > probeY;

			page.style.setProperty(
				'--header-text-color',
				overResume ? 'var(--yellow)' : 'var(--brand-blue)',
			);
			page.style.setProperty(
				'--header-background-color',
				overResume ? 'var(--navy)' : 'var(--paper)',
			);
			page.style.setProperty(
				'--header-nav-color',
				overResume ? 'var(--yellow)' : 'var(--ink)',
			);
		};

		const queueHeaderUpdate = () => {
			cancelAnimationFrame(animationFrame);
			animationFrame = requestAnimationFrame(updateHeaderColor);
		};

		window.addEventListener('scroll', queueHeaderUpdate, { passive: true });
		window.addEventListener('resize', queueHeaderUpdate);
		updateHeaderColor();

		return () => {
			cancelAnimationFrame(animationFrame);
			window.removeEventListener('scroll', queueHeaderUpdate);
			window.removeEventListener('resize', queueHeaderUpdate);
		};
	}, []);

	return (
		<div className='page-shell home-page' ref={pageRef}>
			<a className='skip-link' href='#main-content'>
				{content.common.skipToContent}
			</a>
			<SiteHeader locale={locale} currentPage='home' />

			<main id='main-content' tabIndex={-1}>
				<section className='home-hero page-width'>
					<div className='availability'>
						<span className='availability__dot' aria-hidden='true' />
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

				<section
					className='projects-section page-width'
					id='projects'
					aria-label={content.common.projects}
				>
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

				<section className='resume-section' id='resume'>
					<div className='resume-section__inner page-width'>
						<header className='resume-section__heading'>
							<h2>{content.home.resume.title}</h2>
							<p className='resume-section__years'>
								<span>{content.home.resume.startYear}</span>
								<span className='resume-section__arrow' aria-hidden='true' />
								<span>{content.home.resume.endYear}</span>
							</p>
						</header>
						<img
							className='resume-section__wave'
							src='/assets/icons/long wave.svg'
							alt=''
							aria-hidden='true'
						/>
						<ol className='resume-list'>
							{content.home.resume.entries.map((entry, index) => (
								<li className='resume-entry' key={entry.company}>
									<Reveal delay={index * 60}>
										<article>
											<div className='resume-entry__identity'>
												<h3>{entry.company}</h3>
												<p>{entry.industry}</p>
												<p>{entry.role}</p>
											</div>
											<p className='resume-entry__description'>
												{entry.description}
											</p>
											<p className='resume-entry__period'>{entry.period}</p>
										</article>
									</Reveal>
								</li>
							))}
						</ol>
						<div className='resume-actions'>
							<a
								className='resume-download'
								href={content.home.resume.downloadHref}
								download
							>
								<span className='resume-download__icon' aria-hidden='true' />
								<span>{content.home.resume.downloadLabel}</span>
							</a>
						</div>
					</div>
				</section>
			</main>

			<SiteFooter locale={locale} />
		</div>
	);
}
