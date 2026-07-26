import {
	useEffect,
	useRef,
	useState,
	type FocusEvent,
	type MouseEvent,
} from 'react';
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
	const navigationRef = useRef<HTMLElement>(null);
	const navigationMarkerRef = useRef<HTMLSpanElement>(null);
	const menuButtonRef = useRef<HTMLButtonElement>(null);
	const projectsTriggerRef = useRef<HTMLButtonElement>(null);

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

	useEffect(() => {
		if (!menuOpen && !projectsOpen) return;

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') return;

			event.preventDefault();
			setMenuOpen(false);
			setProjectsOpen(false);
			(menuOpen ? menuButtonRef : projectsTriggerRef).current?.focus();
		};

		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, [menuOpen, projectsOpen]);

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

	function moveNavigationMarker(target: HTMLElement | null) {
		const navigation = navigationRef.current;
		const marker = navigationMarkerRef.current;
		if (!navigation || !marker || !target) {
			marker?.classList.remove('is-ready');
			return;
		}

		const navigationRect = navigation.getBoundingClientRect();
		const targetRect = target.getBoundingClientRect();
		const placement = target.dataset.navMarker || 'below';

		if (placement === 'left') {
			marker.style.left = `${targetRect.left - navigationRect.left - 13}px`;
			marker.style.top = `${
				targetRect.top - navigationRect.top + targetRect.height / 2
			}px`;
		} else {
			marker.style.left = `${
				targetRect.left - navigationRect.left + targetRect.width / 2
			}px`;
			marker.style.top = `${targetRect.bottom - navigationRect.top + 7}px`;
		}

		marker.dataset.placement = placement;
		marker.style.setProperty(
			'--nav-marker-color',
			getComputedStyle(target).color,
		);
		marker.classList.add('is-ready');
	}

	function restoreNavigationMarker() {
		const currentTarget =
			navigationRef.current?.querySelector<HTMLElement>('[data-nav-current]');
		moveNavigationMarker(currentTarget ?? null);
	}

	function moveMarkerFromEvent(event: MouseEvent<HTMLElement>) {
		const eventTarget = event.target;
		if (!(eventTarget instanceof Element)) return;

		const target = eventTarget.closest<HTMLElement>('[data-nav-marker]');
		if (target && navigationRef.current?.contains(target)) {
			moveNavigationMarker(target);
		}
	}

	function moveMarkerFromFocus(event: FocusEvent<HTMLElement>) {
		const target = event.target.closest<HTMLElement>('[data-nav-marker]');
		if (target) moveNavigationMarker(target);
	}

	useEffect(() => {
		const animationFrame = requestAnimationFrame(restoreNavigationMarker);
		window.addEventListener('resize', restoreNavigationMarker);

		return () => {
			cancelAnimationFrame(animationFrame);
			window.removeEventListener('resize', restoreNavigationMarker);
		};
	}, [currentPage, locale]);

	return (
		<header
			className={`site-header${menuOpen ? ' is-menu-open' : ''}${
				pastTop ? ' is-scrolled' : ''
			}`}
		>
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
					ref={navigationRef}
					id='primary-navigation'
					className={`desktop-nav${menuOpen ? ' is-open' : ''}`}
					aria-label={nav.primaryLabel}
					onMouseOver={moveMarkerFromEvent}
					onMouseLeave={restoreNavigationMarker}
					onFocusCapture={moveMarkerFromFocus}
				>
					<a
						href={homeHref}
						data-nav-marker='below'
						data-nav-current={currentPage === 'home' ? '' : undefined}
						className={`nav-primary-link${
							currentPage === 'home' ? ' is-active' : ''
						}`}
						aria-current={currentPage === 'home' ? 'page' : undefined}
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
							ref={projectsTriggerRef}
							className='projects-trigger'
							type='button'
							data-nav-marker='below'
							data-nav-current={
								currentPage === 'projects' || currentPage === 'somapay-pf'
									? ''
									: undefined
							}
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
												aria-current={
													currentPage === project.id ? 'page' : undefined
												}
												data-nav-marker='left'
												href={localizedPath(locale, project.href)}
												onClick={closeMenu}
											>
												{project.name}
											</a>
										) : (
											<span className='project-link is-disabled'>
												<span>{project.name}</span>
												<span className='project-status'>{project.cta}</span>
											</span>
										)}
									</li>
								))}
							</ul>
						</div>
					</div>

					<div className='resume-nav'>
						<a
							className='nav-primary-link'
							data-nav-marker='below'
							href={`${homeHref}#resume`}
							onClick={closeMenu}
						>
							{nav.resume}
						</a>
						<a
							className='resume-nav__download'
							href={content.home.resume.downloadHref}
							download
							aria-label={nav.downloadResume}
						>
							<span aria-hidden='true' />
						</a>
					</div>

					<a
						className='nav-primary-link'
						data-nav-marker='below'
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

					<span
						ref={navigationMarkerRef}
						className='desktop-nav__marker'
						aria-hidden='true'
					/>
				</nav>

				<button
					ref={menuButtonRef}
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
