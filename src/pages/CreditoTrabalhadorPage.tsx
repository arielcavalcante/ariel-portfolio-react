import {
	lazy,
	Suspense,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
	type CSSProperties,
} from 'react';
import { Reveal } from '../components/Reveal';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { siteContent, type Locale } from '../content';
import { useInteractive3DSupport } from '../hooks/useInteractive3DSupport';
import { useMediaQuery } from '../hooks/useMediaQuery';
import '../components/IPhoneMockup/iphoneMockup.css';
import './SomapayPage.css';
import './CreditoTrabalhadorPage.css';

type CreditoTrabalhadorPageProps = {
	locale: Locale;
};

const MOBILE_LAYOUT_QUERY = '(max-width: 809px)';
const COPY_REVEAL_PHASE = 0.58;
const SCREEN_ANGLES = [0.1, -0.8] as const;
const MOBILE_PHONE_SCALE = {
	withoutCopy: 0.92,
	withCopy: 0.62,
} as const;
const MOBILE_PHONE_POSITION_Y = {
	withoutCopy: 4,
	withCopy: 6,
} as const;
const MOBILE_FALLBACK_COPY_OFFSET = '-13.5svh';

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
] as const;

const workerCreditRenders = [
	'/assets/3d/renders/worker-credit-screen-01.webp',
	'/assets/3d/renders/worker-credit-screen-02.webp',
	'/assets/3d/renders/worker-credit-screen-03.webp',
	'/assets/3d/renders/worker-credit-screen-04.webp',
] as const;

function PhoneStaticFallback({
	activeIndex,
	side,
	alt,
	scale = 1,
	offset = '0svh',
}: {
	activeIndex: number;
	side: 'left' | 'right';
	alt: string;
	scale?: number;
	offset?: string;
}) {
	const style = {
		'--worker-credit-fallback-scale': scale,
		'--worker-credit-fallback-offset': offset,
	} as CSSProperties;

	return (
		<div
			className={`worker-credit-case__phone-placeholder is-phone-${side}`}
			role='img'
			aria-label={alt}
			style={style}
		>
			<div className='iphone-mockup__fallback' aria-hidden='true'>
				{workerCreditRenders.map((src, index) => (
					<img
						key={src}
						className={`worker-credit-case__fallback-image ${
							index === activeIndex ? 'is-active' : ''
						}`}
						src={src}
						alt=''
						decoding='async'
						loading='eager'
					/>
				))}
			</div>
		</div>
	);
}

type WorkerCreditContentSection = {
	title?: string;
	paragraphs: string[];
};

type WorkerCreditScreenContent = {
	sections: WorkerCreditContentSection[];
};

type WorkerCreditMobileStep = {
	screenIndex: number;
	screenStepIndex: number;
	screenStepCount: number;
	title?: string;
	paragraph: string;
};

type WorkerCreditSequenceState = {
	screenIndex: number;
	mobileStepIndex: number;
	copyVisible: boolean;
};

const workerCreditContent: Record<Locale, WorkerCreditScreenContent[]> = {
	en: [
		{
			sections: [
				{
					title: 'Context',
					paragraphs: [
						'Is a payroll-deducted loan programme for private-sector employees, including workers hired under the CLT regime (Brazil’s main formal employment framework). Approval follows government regulations and uses official employment data, accessed through an integration with Dataprev (Brazil’s public social security technology provider), to verify eligibility.',
						'Instalments are deducted directly from the employee’s salary, within their payroll-deduction limit. The programme aims to expand access to credit at more competitive rates through platforms connected to Brazilian government systems.',
					],
				},
				{
					title: 'Challenges',
					paragraphs: [
						'The project timeline was one of its main challenges: we had only seven days to conduct research, gather references, develop the wireframes, and create the final high-fidelity screens, with stakeholder reviews at each stage.',
						'Requirements definition was another significant challenge. Due to the urgency of the project, there was not enough time to fully refine the requirements before development began, leading to misalignment and rework throughout the process. At critical moments, we set up a war room involving Product, Legal, Regulatory Compliance, and Information Security teams to accelerate decision-making and ensure the solution met all regulatory requirements.',
					],
				},
			],
		},
		{
			sections: [
				{
					title: 'Business priority',
					paragraphs: [
						"One of the stakeholders' priorities was to accelerate the project's financial return. To support this goal, I proposed giving greater visual prominence to the option most strategic for the business right at the start of the sign-up flow. Placing it at the top of the screen and assigning it the primary CTA made it more attractive, yet did not prevent users from comparing other available alternatives or simulating customized amounts and terms.",
					],
				},
			],
		},
		{
			sections: [
				{
					title: 'Review and choice',
					paragraphs: [
						'At the final stage of the application flow, I organised the information into a review screen so users could verify the main loan terms before confirming. Details such as the number and value of instalments, the amount to be received, fees and interest, and the total borrowed were presented with a clear hierarchy. I also reinforced that instalments would be deducted directly from the employee’s payroll, improving transparency throughout the process.',
						'The insured and uninsured options were not part of the initial requirements. Since stakeholders also had a parallel goal of increasing insurance profitability, I used this stage as an opportunity to propose both alternatives. The insured option received greater visual prominence, while the uninsured option remained accessible, allowing users to make an informed choice before confirming.',
					],
				},
			],
		},
		{
			sections: [
				{
					title: 'Loan management',
					paragraphs: [
						'After completing the application, users can track their payments, review contract and disbursement details, check the outstanding balance, and download their CCB (Brazilian bank credit note). Values are presented clearly, and colour is used to support comprehension without compromising accessibility, since all information is also communicated through text.',
					],
				},
			],
		},
	],
	'pt-BR': [
		{
			sections: [
				{
					title: 'Contexto',
					paragraphs: [
						'É uma modalidade de empréstimo consignado para trabalhadores do setor privado, incluindo funcionários contratados pelo regime CLT. A concessão segue regulamentações governamentais e utiliza dados oficiais do vínculo empregatício, por meio de integração com a Dataprev, para verificar a elegibilidade.',
						'As parcelas são descontadas diretamente da folha de pagamento, dentro da margem consignável. A modalidade busca ampliar o acesso a crédito com taxas mais competitivas por meio de plataformas integradas aos sistemas do governo.',
					],
				},
				{
					title: 'Desafios',
					paragraphs: [
						'O cronograma foi um dos principais desafios do projeto: tivemos apenas sete dias para conduzir a pesquisa, reunir referências, desenvolver os wireframes e criar as telas finais em alta fidelidade, com validações dos stakeholders em cada etapa.',
						'A definição dos requisitos também exigiu atenção. Como a demanda era urgente, não houve tempo suficiente para amadurecê-los antes do início do desenvolvimento, o que gerou desalinhamentos e retrabalho ao longo do processo. Em momentos críticos, foi necessário organizar uma war room envolvendo os times de Produto, Jurídico, Compliance Regulatório e Segurança da Informação para acelerar decisões e garantir a conformidade da solução.',
					],
				},
			],
		},
		{
			sections: [
				{
					title: 'Prioridade do negócio',
					paragraphs: [
						'Uma das prioridades dos stakeholders era acelerar o retorno financeiro do projeto. Para apoiar esse objetivo, propus que, logo no início do fluxo de contratação, a opção mais estratégica para o negócio recebesse maior destaque visual. O posicionamento no topo da tela e associada ao CTA primário oferecia maior atratividade mas não impedia que o usuário comparasse as demais alternativas disponíveis ou simulasse valores e condições customizadas.',
					],
				},
			],
		},
		{
			sections: [
				{
					title: 'Revisão e escolha',
					paragraphs: [
						'Na etapa final da contratação, organizei as informações em uma tela de revisão para que o usuário pudesse conferir as principais condições antes de confirmar o empréstimo. Dados como número e valor das parcelas, valor a receber, taxas/juros e valor total contratado, além de um reforço de que as parcelas seriam descontadas diretamente da folha de pagamento, foram apresentados de forma hierarquizada, reforçando a transparência da operação.',
						'As opções de contratação com e sem seguro não existiam nos requisitos iniciais. Como havia uma demanda paralela dos stakeholders para aumentar a rentabilidade dos seguros, aproveitei esta etapa para propor a inclusão das duas alternativas. A opção com seguro recebeu maior destaque visual, enquanto a contratação sem seguro permaneceu acessível, permitindo uma escolha consciente antes da confirmação.',
					],
				},
			],
		},
		{
			sections: [
				{
					title: 'Gestão do empréstimo',
					paragraphs: [
						'Após a contratação, o usuário pode acompanhar os pagamentos, consultar as informações do contrato e da liberação do crédito, verificar o saldo pendente e fazer o download da CCB. Os valores são apresentados de forma clara, e o uso de cores facilita a compreensão sem comprometer a acessibilidade, já que todas as informações também são comunicadas por texto.',
					],
				},
			],
		},
	],
};

function createMobileSteps(
	screens: WorkerCreditScreenContent[],
): WorkerCreditMobileStep[] {
	return screens.flatMap((screen, screenIndex) => {
		const screenSteps = screen.sections.flatMap(section =>
			section.paragraphs.map((paragraph, paragraphIndex) => ({
				title: paragraphIndex === 0 ? section.title : undefined,
				paragraph,
			})),
		);

		return screenSteps.map((step, screenStepIndex) => ({
			...step,
			screenIndex,
			screenStepIndex,
			screenStepCount: screenSteps.length,
		}));
	});
}

const workerCreditMobileSteps: Record<Locale, WorkerCreditMobileStep[]> = {
	en: createMobileSteps(workerCreditContent.en),
	'pt-BR': createMobileSteps(workerCreditContent['pt-BR']),
};

function getScreenAngle(index: number) {
	return SCREEN_ANGLES[index % SCREEN_ANGLES.length];
}

function WorkerCreditCopySection({
	section,
}: {
	section: WorkerCreditContentSection;
}) {
	const paragraphs = section.paragraphs.map(paragraph => (
		<p key={paragraph}>{paragraph}</p>
	));

	if (!section.title) {
		return <div className='worker-credit-case__copy-section'>{paragraphs}</div>;
	}

	return (
		<section className='worker-credit-case__copy-section'>
			<h2>{section.title}</h2>
			{paragraphs}
		</section>
	);
}

function useWorkerCreditSequence({
	isMobile,
	mobileSteps,
}: {
	isMobile: boolean;
	mobileSteps: WorkerCreditMobileStep[];
}) {
	const sequenceRef = useRef<HTMLDivElement>(null);
	const progressRef = useRef<HTMLDivElement>(null);
	const stateRef = useRef<WorkerCreditSequenceState>({
		screenIndex: 0,
		mobileStepIndex: 0,
		copyVisible: false,
	});
	const progressVisibleRef = useRef(false);
	const [sequenceState, setSequenceState] = useState<WorkerCreditSequenceState>(
		stateRef.current,
	);
	const [progressVisible, setProgressVisible] = useState(false);
	const stepCount = isMobile ? mobileSteps.length : workerCreditScreens.length;

	useEffect(() => {
		const sequence = sequenceRef.current;
		if (!sequence) return;

		let animationFrame = 0;
		let lastProgressPercentage = -1;

		const updateSequence = () => {
			animationFrame = 0;
			const bounds = sequence.getBoundingClientRect();
			const scrollDistance = Math.max(
				sequence.offsetHeight - window.innerHeight,
				1,
			);
			const progress = Math.min(Math.max(-bounds.top / scrollDistance, 0), 1);
			const progressPercentage = Math.round(progress * 100);
			const nextProgressVisible =
				window.scrollY > 1 && (progressVisibleRef.current || progress > 0);

			if (nextProgressVisible !== progressVisibleRef.current) {
				progressVisibleRef.current = nextProgressVisible;
				setProgressVisible(nextProgressVisible);
			}

			if (progressRef.current) {
				progressRef.current.style.setProperty(
					'--worker-credit-progress',
					String(progress),
				);

				if (progressPercentage !== lastProgressPercentage) {
					lastProgressPercentage = progressPercentage;
					progressRef.current.setAttribute(
						'aria-valuenow',
						String(progressPercentage),
					);
				}
			}

			const sequenceProgress = progress * stepCount;
			const nextStepIndex = Math.min(
				stepCount - 1,
				Math.floor(sequenceProgress),
			);
			const screenIndex = isMobile
				? mobileSteps[nextStepIndex].screenIndex
				: nextStepIndex;
			const phase =
				sequenceProgress >= stepCount ? 1 : sequenceProgress - nextStepIndex;
			const nextState: WorkerCreditSequenceState = {
				screenIndex,
				mobileStepIndex: nextStepIndex,
				copyVisible: isMobile
					? sequenceProgress >= COPY_REVEAL_PHASE
					: phase >= COPY_REVEAL_PHASE,
			};
			const currentState = stateRef.current;

			if (
				currentState.screenIndex !== nextState.screenIndex ||
				currentState.mobileStepIndex !== nextState.mobileStepIndex ||
				currentState.copyVisible !== nextState.copyVisible
			) {
				stateRef.current = nextState;
				setSequenceState(nextState);
			}
		};

		const queueUpdate = () => {
			if (animationFrame) return;
			animationFrame = requestAnimationFrame(updateSequence);
		};

		window.addEventListener('scroll', queueUpdate, { passive: true });
		window.addEventListener('resize', queueUpdate);
		updateSequence();

		return () => {
			cancelAnimationFrame(animationFrame);
			window.removeEventListener('scroll', queueUpdate);
			window.removeEventListener('resize', queueUpdate);
		};
	}, [isMobile, mobileSteps, stepCount]);

	return {
		...sequenceState,
		progressRef,
		progressVisible,
		sequenceRef,
		stepCount,
	};
}

export function CreditoTrabalhadorPage({
	locale,
}: CreditoTrabalhadorPageProps) {
	const site = siteContent[locale];
	const isMobile = useMediaQuery(MOBILE_LAYOUT_QUERY);
	const supports3D = useInteractive3DSupport();
	const mobileSteps = workerCreditMobileSteps[locale];
	const {
		copyVisible,
		mobileStepIndex,
		progressRef,
		progressVisible,
		screenIndex,
		sequenceRef,
		stepCount,
	} = useWorkerCreditSequence({ isMobile, mobileSteps });

	useLayoutEffect(() => {
		const previousScrollRestoration = window.history.scrollRestoration;
		window.history.scrollRestoration = 'manual';
		window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

		return () => {
			window.history.scrollRestoration = previousScrollRestoration;
		};
	}, []);

	useEffect(() => {
		document.body.classList.add('somapay-case-open');
		return () => document.body.classList.remove('somapay-case-open');
	}, []);

	const sequenceStyle = {
		'--phone-sequence-height': `${(stepCount + 1) * 100}svh`,
	} as CSSProperties;
	const activeMobileStep =
		mobileSteps[Math.min(mobileStepIndex, mobileSteps.length - 1)];
	const currentScreenAngle = getScreenAngle(activeMobileStep.screenIndex);
	const nextScreenAngle = getScreenAngle(activeMobileStep.screenIndex + 1);
	const mobileParagraphProgress =
		activeMobileStep.screenStepIndex / activeMobileStep.screenStepCount;
	const phoneRotation: [number, number, number] = isMobile
		? [
				Math.PI,
				currentScreenAngle +
					(nextScreenAngle - currentScreenAngle) * mobileParagraphProgress,
				0,
			]
		: [Math.PI, getScreenAngle(screenIndex), 0];
	const phonePosition: [number, number, number] = isMobile
		? [
				0,
				copyVisible
					? MOBILE_PHONE_POSITION_Y.withCopy
					: MOBILE_PHONE_POSITION_Y.withoutCopy,
				0,
			]
		: [0, 0, 0];
	const phoneScale = isMobile
		? copyVisible
			? MOBILE_PHONE_SCALE.withCopy
			: MOBILE_PHONE_SCALE.withoutCopy
		: 1;
	const fallbackScale = isMobile
		? phoneScale / MOBILE_PHONE_SCALE.withoutCopy
		: 1;
	const fallbackOffset =
		isMobile && copyVisible ? MOBILE_FALLBACK_COPY_OFFSET : '0svh';
	const phoneAlt =
		locale === 'pt-BR'
			? `Mockup de um iPhone 17 Pro exibindo a tela ${screenIndex + 1} de ${workerCreditScreens.length} do aplicativo Somapay`
			: `iPhone 17 Pro mockup displaying Somapay app screen ${screenIndex + 1} of ${workerCreditScreens.length}`;
	const phoneSide = screenIndex % 2 === 0 ? 'right' : 'left';
	const staticPhone = (
		<PhoneStaticFallback
			activeIndex={screenIndex}
			side={phoneSide}
			alt={phoneAlt}
			scale={fallbackScale}
			offset={fallbackOffset}
		/>
	);

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
								{supports3D ? (
									<Suspense fallback={staticPhone}>
										<IPhoneMockup
											key={`iphone-${isMobile ? 'mobile' : 'desktop'}`}
											className={`worker-credit-case__mockup is-phone-${phoneSide}`}
											screenImage={workerCreditScreens[screenIndex]}
											preloadScreenImages={workerCreditScreens}
											fallbackImage={workerCreditRenders[screenIndex]}
											position={phonePosition}
											rotation={phoneRotation}
											scale={phoneScale}
											alt={phoneAlt}
										/>
									</Suspense>
								) : (
									staticPhone
								)}
								<div
									className={`worker-credit-case__copy ${
										screenIndex % 2 === 0 ? 'is-copy-left' : 'is-copy-right'
									} ${copyVisible ? 'is-visible' : ''}`}
								>
									{isMobile ? (
										<article
											key={`${locale}-${mobileStepIndex}`}
											className={`worker-credit-case__copy-item is-active ${
												screenIndex % 2 === 0 ? 'is-left' : 'is-right'
											}`}
										>
											{activeMobileStep.title && (
												<h2>{activeMobileStep.title}</h2>
											)}
											<p>{activeMobileStep.paragraph}</p>
										</article>
									) : (
										workerCreditContent[locale].map((screen, index) => (
											<article
												key={`${locale}-${index}`}
												className={`worker-credit-case__copy-item ${
													index === screenIndex ? 'is-active' : ''
												} ${index % 2 === 0 ? 'is-left' : 'is-right'}`}
												aria-hidden={index !== screenIndex}
											>
												{screen.sections.map((section, sectionIndex) => (
													<WorkerCreditCopySection
														key={`${section.title ?? 'copy'}-${sectionIndex}`}
														section={section}
													/>
												))}
											</article>
										))
									)}
								</div>
							</figure>
						</div>
					</div>
				</section>
			</main>

			<div
				ref={progressRef}
				className={`worker-credit-case__progress ${
					progressVisible ? 'is-visible' : ''
				}`}
				role='progressbar'
				aria-label={
					locale === 'pt-BR' ? 'Progresso do conteúdo' : 'Content progress'
				}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={0}
			>
				<span aria-hidden='true' />
			</div>

			<SiteFooter locale={locale} />
		</div>
	);
}
