import { useEffect, useState, type FocusEvent } from 'react';
import type { Locale } from '../content';
import { localizedPath, pathWithoutLocale, siteContent } from '../content';
import LanguageSwitch from './LanguageSwitch';

type CurrentPage = 'home' | 'projects' | 'somapay-pf' | '404';

type SiteHeaderProps = {
	locale: Locale;
	currentPage?: CurrentPage;
	projectCount?: number;
};

export function SiteHeader({
	locale,
	currentPage = 'home',
	projectCount = 2,
}: SiteHeaderProps) {
	const [menuOpen, setMenuOpen] = useState(false);
	const [projectsOpen, setProjectsOpen] = useState(false);
	const [pastTop, setPastTop] = useState(false);

	const content = siteContent[locale];
	const nav = content.nav;
	const projects = content.home.projects;

	const homeHref = localizedPath(locale, '/');

	const targetLocale: Locale = locale === 'en' ? 'pt-BR' : 'en';

	const currentPath =
		typeof window !== 'undefined'
			? pathWithoutLocale(window.location.pathname)
			: '/';

	const languageHref = localizedPath(targetLocale, currentPath);

	useEffect(() => {
		const updateLogo = () => setPastTop(window.scrollY > 1);
		updateLogo();
		window.addEventListener('scroll', updateLogo, { passive: true });

		return () => window.removeEventListener('scroll', updateLogo);
	}, []);

	useEffect(() => {
		document.body.classList.toggle('menu-open', menuOpen);

		return () => {
			document.body.classList.remove('menu-open');
		};
	}, [menuOpen]);

	function closeMenu() {
		setMenuOpen(false);
		setProjectsOpen(false);
	}

	function toggleMenu() {
		if (menuOpen) setProjectsOpen(false);
		setMenuOpen(open => !open);
	}

	function closeProjectsOnBlur(event: FocusEvent<HTMLDivElement>) {
		if (!event.currentTarget.contains(event.relatedTarget)) {
			setProjectsOpen(false);
		}
	}

	return (
		<header className={`site-header${menuOpen ? ' is-menu-open' : ''}`}>
			<div className='site-header__inner'>
				<a
					className={`brand-mark brand-mark--compact${
						pastTop ? ' is-symbol' : ''
					}`}
					href={homeHref}
					aria-label={nav.home}
					onClick={closeMenu}
				>
					<img
						src='/assets/icons/logo/ariel logo.svg'
						alt=''
						aria-hidden='true'
					/>
				</a>

				<nav
					id='primary-navigation'
					className={`desktop-nav${menuOpen ? ' is-open' : ''}`}
					aria-label='Primary navigation'
				>
					<a
						href={homeHref}
						className={`nav-primary-link${
							currentPage === 'home' ? ' is-active' : ''
						}`}
						onClick={closeMenu}
					>
						{nav.home}
					</a>

					<div
						className={`projects-nav${projectsOpen ? ' is-open' : ''}`}
						onMouseEnter={() => setProjectsOpen(true)}
						onMouseLeave={() => setProjectsOpen(false)}
						onFocus={() => setProjectsOpen(true)}
						onBlur={closeProjectsOnBlur}
					>
						<button
							className='projects-trigger'
							type='button'
							aria-expanded={menuOpen || projectsOpen}
							aria-controls='projects-navigation'
							onClick={() => setProjectsOpen(open => !open)}
						>
							{nav.projects}

							<span className='nav-count' aria-hidden='true'>
								{projectCount}
							</span>
						</button>

						<div className='projects-popover'>
							<ul
								className='projects-popover__surface'
								id='projects-navigation'
							>
								{projects.map(project => (
									<li key={project.id}>
										{project.available ? (
											<a
												className={
													currentPage === project.id ? 'is-active' : undefined
												}
												href={localizedPath(locale, project.href)}
												onClick={closeMenu}
											>
												{project.name}
											</a>
										) : (
											<span className='project-link is-disabled' aria-disabled='true'>
												<span>{project.name}</span>
												<span className='project-status'>{project.cta}</span>
											</span>
										)}
									</li>
								))}
							</ul>
						</div>
					</div>

					<a
						className='nav-primary-link'
						href='mailto:hello@arielcavalcante.com'
						onClick={closeMenu}
					>
						{nav.contact}
					</a>

					<LanguageSwitch
						locale={locale}
						languageHref={languageHref}
						label={nav.language}
					/>
				</nav>

				<button
					className='menu-button'
					type='button'
					aria-label={menuOpen ? nav.close : nav.menu}
					aria-expanded={menuOpen}
					aria-controls='primary-navigation'
					onClick={toggleMenu}
				>
					<span
						className={`menu-button__icon ${
							menuOpen ? 'menu-button__icon--close' : 'menu-button__icon--open'
						}`}
						aria-hidden='true'
					/>
				</button>
			</div>
		</header>
	);
}
