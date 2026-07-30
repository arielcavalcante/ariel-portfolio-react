import {
	lazy,
	Suspense,
	useEffect,
	useRef,
	useState,
	type CSSProperties,
} from 'react';
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

const workerCreditScreens = [
	'/assets/3d/images/01.webp',
	'/assets/3d/images/02.webp',
	'/assets/3d/images/03.webp',
	'/assets/3d/images/04.webp',
];

export function CreditoTrabalhadorPage({
	locale,
}: CreditoTrabalhadorPageProps) {
	const site = siteContent[locale];
	const sequenceRef = useRef<HTMLDivElement>(null);
	const [screenIndex, setScreenIndex] = useState(0);

	useEffect(() => {
		document.body.classList.add('somapay-case-open');
		return () => document.body.classList.remove('somapay-case-open');
	}, []);

	useEffect(() => {
		workerCreditScreens.forEach(src => {
			const image = new Image();
			image.src = src;
		});
	}, []);

	useEffect(() => {
		const sequence = sequenceRef.current;
		if (!sequence) return;

		let animationFrame = 0;

		const updateScreen = () => {
			animationFrame = 0;
			const bounds = sequence.getBoundingClientRect();
			const scrollDistance = Math.max(
				sequence.offsetHeight - window.innerHeight,
				1,
			);
			const progress = Math.min(Math.max(-bounds.top / scrollDistance, 0), 1);
			const nextIndex = Math.min(
				workerCreditScreens.length - 1,
				Math.floor(progress * workerCreditScreens.length),
			);

			setScreenIndex(current => (current === nextIndex ? current : nextIndex));
		};

		const queueUpdate = () => {
			if (animationFrame) return;
			animationFrame = requestAnimationFrame(updateScreen);
		};

		window.addEventListener('scroll', queueUpdate, { passive: true });
		window.addEventListener('resize', queueUpdate);
		updateScreen();

		return () => {
			cancelAnimationFrame(animationFrame);
			window.removeEventListener('scroll', queueUpdate);
			window.removeEventListener('resize', queueUpdate);
		};
	}, []);

	const sequenceStyle = {
		'--phone-screen-count': workerCreditScreens.length,
	} as CSSProperties;
	const phoneRotation: [number, number, number] = [
		Math.PI,
		screenIndex % 2 === 0 ? 0.1 : -0.8,
		0,
	];

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

						<div
							ref={sequenceRef}
							className='worker-credit-case__phone-sequence'
							style={sequenceStyle}
						>
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
										screenImage={workerCreditScreens[screenIndex]}
										rotation={phoneRotation}
										alt={
											locale === 'pt-BR'
												? `Mockup 3D interativo de um iPhone 17 Pro exibindo a tela ${screenIndex + 1} de ${workerCreditScreens.length} do aplicativo Somapay`
												: `Interactive 3D iPhone 17 Pro mockup displaying Somapay app screen ${screenIndex + 1} of ${workerCreditScreens.length}`
										}
									/>
								</Suspense>
							</figure>
						</div>
					</div>
				</section>
			</main>

			<SiteFooter locale={locale} />
		</div>
	);
}
