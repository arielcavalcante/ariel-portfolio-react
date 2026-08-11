import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { localizedPath, siteContent, type Locale } from '../content';
import { BeforeAfter } from '../components/BeforeAfter';
import { Reveal } from '../components/Reveal';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import {
	AnnotatedText,
	type GlossaryTerm,
} from '../components/TermTooltip';
import './SomapayPage.css';

type SomapayPageProps = {
	locale: Locale;
};

type Copy = {
	hero: {
		title: string;
		metrics: string;
		description: string;
	};
	intro: Array<{ title: string; paragraphs: string[] }>;
	data: {
		title: string;
		description: string;
		chart: {
			opportunity: string;
			critical: string;
			important: string;
			lowPriority: string;
			reviews: string;
			rating: string;
		};
		metrics: Array<{
			prefix: string;
			value: number;
			suffix: string;
			decimals?: number;
			label: string;
		}>;
	};
	goals: {
		title: string;
		items: Array<{ title: string; description: string }>;
	};
	onboarding: {
		title: string;
		description: string;
	};
	pix: {
		title: string;
		intro: string[];
		modernization: {
			title: string;
			description: string;
		};
		receiving: {
			title: string;
			description: string[];
		};
		flowsTitle: string;
		sending: string;
		receivingFlow: string;
		play: string;
		pause: string;
	};
	workerCredit: {
		overline: string;
		title: string;
		paragraphs: string[];
		imageAlt: string;
		cta: string;
	};
	help: {
		title: string;
		paragraphs: string[];
		beforeCaption: string;
		afterCaption: string;
	};
	darkMode: {
		title: string;
		paragraphs: string[];
		note: string;
		comparisonLabel: string;
		darkAlt: string;
		lightAlt: string;
	};
};

const copy: Record<Locale, Copy> = {
	en: {
		hero: {
			title:
				'Redesigning a rapidly growing banking platform for more than 700,000 users.',
			metrics:
				'+28% Play Store rating · +14% trust score on ReclameAqui · from 250k → 700k users',
			description:
				'Creating a smoother path from onboarding to conversion, simplifying the journey while increasing adoption and brand loyalty.',
		},
		intro: [
			{
				title: 'Context',
				paragraphs: [
					'Somapay is a Brazilian SaaS company that combines HR tech and fintech. Companies use its HR platform to manage their teams, while employees use the Somapay PF app to receive their salaries and access financial services.',
				],
			},
			{
				title: 'The challenge',
				paragraphs: [
					'The products were scaling quickly, but the Somapay PF experience had fallen behind. The app suffered from inconsistent UX patterns, an unstable onboarding flow, outdated financial journeys, and low user trust.',
					'A simple input component had more than 10 documented variations in design — not counting other versions lost in the legacy codebase.',
				],
			},
			{
				title: 'What I did',
				paragraphs: [
					'For more than a year and a half, I led a full redesign of the platform, created the company’s Design System, and helped shape new financial products from concept to launch.',
				],
			},
			{
				title: 'The final result',
				paragraphs: [
					'During my time as lead designer (2025–2026), the average Play Store rating increased by 28.5%. Positive ratings (4★–5★) rose from 50.8% to 72.8% of the total, while one-star ratings fell by half, from 42.3% to 21.5%.',
				],
			},
		],
		data: {
			title: 'Data',
			description:
				'Using a scraping tool, I collected thousands of App Store and Play Store reviews and used LLMs to identify the main recurring pain points. The analysis showed that essential flows, such as Pix transfers, were often perceived as confusing, dated, and overly complex, creating friction in one of the app’s most-used features.',
			chart: {
				opportunity: 'Opportunity',
				critical: 'Critical',
				important: 'Important',
				lowPriority: 'Low priority',
				reviews: 'Reviews',
				rating: 'Average rating',
			},
			metrics: [
				{
					prefix: '+',
					value: 28,
					suffix: '%',
					label: 'Play Store rating',
				},
				{
					prefix: '+',
					value: 14,
					suffix: '%',
					label: 'Platform trust rating',
				},
				{
					prefix: '+',
					value: 700,
					suffix: 'k',
					label: 'Active users',
				},
			],
		},
		goals: {
			title: 'Goals',
			items: [
				{
					title:
						'Optimizing onboarding to include more edge cases in the experience',
					description:
						'With more than 50,000 new users arriving every month, our onboarding flow could not handle several everyday scenarios — from people without a CPF to users who could not receive the SMS verification code. I redesigned critical parts of the flow to make account creation much more reliable, inclusive, and resilient.',
				},
				{
					title: 'Rebuilding the Pix experience',
					description:
						'Pix is the most-used payment method in Brazil, making it one of the app’s most critical areas. After new regulatory requirements such as MED Pix and Pix Automático arrived, I led a full redesign of the transfer experience. The new structure improved information architecture, reduced complexity, and created scalable foundations that prevented patchwork as new features were added.',
				},
				{
					title: 'Help',
					description:
						'One of the most critical areas when everything else fails, support was extremely difficult to find and lacked basic usability and good practices.',
				},
			],
		},
		onboarding: {
			title: 'Onboarding',
			description:
				'As the first contact in the user journey, onboarding had become a major friction point. The old flow did not support several crucial exception cases — including foreign users without a CPF, underage apprentices who needed parental authorization, and trans people who could not use their chosen name. Improving accessibility, inclusion, and account-creation success became a top business priority.',
		},
		pix: {
			title: 'Pix',
			intro: [
				'As Brazil’s most popular payment method, used by more than 76% of the population, the quality of the Pix experience directly influenced whether users saw Somapay as their main account.',
				'Research, support tickets, and app-store reviews consistently pointed to the same problem: the flow was difficult to navigate, visually fragmented, and packed with steps. While introducing new features such as Pix Automático and MED Pix, I used the opportunity to redesign the entire area and create a clearer, more scalable foundation for future growth.',
			],
			modernization: {
				title: 'Modernization',
				description:
					'The first step was simplifying the Pix home screen. In my proposal, a single entry point accepts every kind of payment key, QR-code scanning is integrated into the main flow, frequent contacts are one tap away, and supporting features are organized in a much clearer and more scalable way.',
			},
			receiving: {
				title: 'Receiving payments',
				description: [
					'Receiving money required unnecessary effort. Users had to create a fixed-value charge with a due date or navigate through several screens to find, copy, and share their Pix key.',
					'The new experience introduced a dedicated receive area where users can instantly display their QR code, share their Pix key, or download the QR code for printing and reuse. Fixed-value charges remain available when needed, but receiving money no longer depends on a flow designed only for collecting payments.',
				],
			},
			flowsTitle: 'Take a look at the complete flows',
			sending: 'Sending a Pix',
			receivingFlow: 'Receiving a Pix',
			play: 'Play flow',
			pause: 'Pause flow',
		},
		workerCredit: {
			overline: 'Dive deeper',
			title: 'Crédito do\nTrabalhador',
			paragraphs: [
				'Crédito do Trabalhador is a payroll-deducted loan programme for private-sector employees, with repayments taken directly from their salaries. The project required the creation of a new application flow in just seven days, balancing government regulations, integration with Dataprev, business goals and transparency for users.',
			],
			imageAlt: 'Interface screens from the Crédito do Trabalhador experience.',
			cta: 'View full project',
		},
		help: {
			title: 'Help',
			paragraphs: [
				'After identifying that the help area was barely used, I dedicated time to improving readability, information hierarchy, and access to support channels. By replacing dense text blocks with a more structured, action-focused layout, users could find answers faster and navigate support without unnecessary complexity.',
				'Showing the date of the latest update and collecting feedback helped increase trust in the platform by demonstrating that the content stays current and creating a direct channel for continuous improvement.',
			],
			beforeCaption: 'Old FAQ withdraw page',
			afterCaption: 'New FAQ Withdraw page',
		},
		darkMode: {
			title: 'Dark mode',
			paragraphs: [
				'Dark mode exposed a problem in the existing color system: the brand orange no longer conveyed the same message it did on light surfaces. Reduced contrast made interactive elements less evident, while the shift in tone made primary actions look like warning or error states.',
				'Instead of simply mirroring the light theme, I redefined how colors behave in dark environments, balancing accessibility, visual hierarchy, and brand recognition. The result was a dedicated set of dark-mode design tokens that preserved the product identity and kept critical actions clear and trustworthy.',
				'To make implementation scalable, the system was structured with semantic design tokens instead of hard-coded colors. Primitive tokens such as Neutral Gray 100 could map to different values in each theme (#FDFDFD in light mode and #1A1A1A in dark mode), while semantic tokens such as Background Color referenced those primitives. This allowed the entire interface to change themes by updating token values, giving developers complete dark-mode support without extra implementation effort and creating a solid foundation for future products.',
			],
			note: 'Move the pointer over the screen on the right to compare the differences.',
			comparisonLabel: 'Light and dark mode comparison',
			darkAlt: 'A phone showing the black and orange Somapay PF banking app.',
			lightAlt: 'A phone showing the orange and white Somapay PF banking app.',
		},
	},
	'pt-BR': {
		hero: {
			title:
				'Redesenhando uma plataforma bancária em rápida expansão para mais de 700 mil usuários.',
			metrics:
				'+28% na nota da Play Store · +14% de confiança no ReclameAqui · de 250 mil → 700 mil usuários',
			description:
				'Criando um caminho mais fluido do onboarding à conversão, simplificando a jornada enquanto aumento a adoção e a fidelidade à marca.',
		},
		intro: [
			{
				title: 'Contexto',
				paragraphs: [
					'A Somapay é uma SaaS brasileira que une os conceitos de rhtech e fintech. Lá, empresas utilizam a plataforma de RH para gerenciar suas equipes, enquanto seus colaboradores contam com o app Somapay PF para receber seus salários e acessar serviços financeiros.',
				],
			},
			{
				title: 'O desafio',
				paragraphs: [
					'Os produtos estavam escalando rápido, mas a experiência no Somapay PF tinha ficado para trás. O aplicativo sofria com padrões de UX inconsistentes, um onboarding instável, fluxos financeiros desatualizados e baixa confiança por parte dos usuários.',
					'Um componente simples de input tinha mais de 10 variações documentadas no design — isso sem falar de outras versões perdidas no código legado.',
				],
			},
			{
				title: 'O que eu fiz',
				paragraphs: [
					'Durante mais de um ano e meio, liderei um redesign completo da plataforma, criei o Design System da empresa e ajudei a estruturar novos produtos financeiros do conceito ao lançamento.',
				],
			},
			{
				title: 'O resultado final',
				paragraphs: [
					'Durante o meu período como lead designer (2025–2026), a avaliação média dos usuários na Play Store subiu 28,5 %. As avaliações positivas (4★–5★) saltaram de 50,8% para 72,8% do total, enquanto as notas ruins (1★) caíram pela metade (de 42,3% para 21,5%).',
				],
			},
		],
		data: {
			title: 'Dados',
			description:
				'Usando uma ferramenta de scraping, coletei milhares de avaliações da App Store e Play Store e usei LLMs para identificar os principais pontos de dor recorrentes. A análise revelou que fluxos essenciais, como as transferências via Pix, eram frequentemente vistos como confusos, datados e complexos demais, gerando fricção em uma das funcionalidades mais usadas do aplicativo.',
			chart: {
				opportunity: 'Oportunidade',
				critical: 'Crítico',
				important: 'Importante',
				lowPriority: 'Baixa prioridade',
				reviews: 'Avaliações',
				rating: 'Nota média',
			},
			metrics: [
				{
					prefix: '+',
					value: 28,
					suffix: '%',
					label: 'Avaliação na Play Store',
				},
				{
					prefix: '+',
					value: 14,
					suffix: '%',
					label: 'Avaliação de confiança no ReclameAqui',
				},
				{
					prefix: '+',
					value: 700,
					suffix: 'k',
					label: 'Usuários ativos',
				},
			],
		},
		goals: {
			title: 'Objetivos',
			items: [
				{
					title:
						'Otimizando o onboarding para incluir mais casos extremos na experiência',
					description:
						'Com mais de 50 mil novos usuários chegando todo mês, o nosso onboarding não estava dando conta de vários cenários do dia a dia — desde pessoas sem CPF até quem não conseguia receber o código de verificação por SMS. Eu redesenhei partes críticas desse fluxo para tornar a criação de contas muito mais confiável, inclusiva e resiliente.',
				},
				{
					title: 'Reconstruindo a experiência do Pix',
					description:
						'Pix é o meio de pagamento mais usado no Brasil, o que faz dele uma das áreas mais críticas do app. Após a chegada de novas demandas regulatórias, como o MED Pix e o Pix Automático, liderei um redesign completo da experiência de transferência. A nova estrutura melhorou a arquitetura de informação, reduziu a complexidade e estabeleceu fundações para crescimento escalável, prevenindo puxadinhos em próximas adições de funcionalidade.',
				},
				{
					title: 'Ajuda',
					description:
						'Uma das áreas mais críticas para quando todo o resto falha, o suporte era super difícil de achar e pecava em usabilidade básica e boas práticas.',
				},
			],
		},
		onboarding: {
			title: 'Onboarding',
			description:
				'Sendo o primeiro contato na jornada do usuário, o onboarding tinha se tornado um grande ponto de fricção. O fluxo antigo não dava suporte a vários casos de exceção cruciais — desde usuários estrangeiros sem CPF, menores aprendizes que precisavam de autorização dos pais e pessoas trans que não conseguiam usar seu nome social. Melhorar a acessibilidade, a inclusão e a taxa de sucesso na criação de contas virou uma prioridade máxima de negócio.',
		},
		pix: {
			title: 'Pix',
			intro: [
				'Sendo o meio de pagamento mais popular do Brasil, usado por mais de 76% da população, a qualidade da experiência com o Pix influenciava diretamente se os usuários viam a Somapay como sua conta principal.',
				'Pesquisas, chamados de suporte e avaliações na app store apontavam consistentemente para o mesmo problema: o fluxo era difícil de navegar, visualmente fragmentado e cheio de etapas. Ao introduzir novos recursos como o Pix Automático e o MED Pix, aproveitei a oportunidade para redesenhar toda a área, criando uma base mais clara e escalável para o crescimento futuro.',
			],
			modernization: {
				title: 'Modernização',
				description:
					'O primeiro passo do projeto foi simplificar a tela inicial do Pix. Em minha proposta, um único ponto de entrada aceita todos os tipos de chaves de pagamento, a leitura de QR code está integrada no fluxo principal, os contatos frequentes ficam a um toque de distância e as funcionalidades de apoio ficam organizadas de um jeito bem mais claro e escalonável.',
			},
			receiving: {
				title: 'Recebendo pagamentos',
				description: [
					'Receber dinheiro exigia um esforço desnecessário. Os usuários precisavam gerar uma cobrança com valor fixo e data de vencimento ou navegar por várias telas para encontrar, copiar e compartilhar sua chave Pix.',
					'A nova experiência trouxe uma área dedicada para receber pagamentos, permitindo que os usuários exibam instantaneamente seu QR code, compartilhem sua chave Pix ou façam o download do QR code para imprimir e reutilizar. As cobranças de valor fixo continuam disponíveis quando necessárias, mas receber dinheiro não depende mais de um fluxo feito apenas para cobrar.',
				],
			},
			flowsTitle: 'Dá uma olhada nos fluxos completos',
			sending: 'Enviando um Pix',
			receivingFlow: 'Recebendo um Pix',
			play: 'Reproduzir fluxo',
			pause: 'Pausar fluxo',
		},
		workerCredit: {
			overline: 'Aprofunde-se',
			title: 'Crédito do\nTrabalhador',
			paragraphs: [
				'O Crédito do Trabalhador é uma modalidade de empréstimo consignado voltada a trabalhadores do setor privado, com parcelas descontadas diretamente da folha de pagamento. O projeto exigiu a criação de um novo fluxo em apenas sete dias, conciliando regulamentações governamentais, integração com a Dataprev, objetivos de negócio e transparência para o usuário.',
			],
			imageAlt: 'Telas da experiência do produto Crédito do Trabalhador.',
			cta: 'Ver projeto completo',
		},
		help: {
			title: 'Ajuda',
			paragraphs: [
				'Depois de identificar que a área de ajuda era pouquíssimo acessada, dediquei um tempo para melhorar a legibilidade, a hierarquia da informação e o acesso aos canais de suporte. Ao trocar blocos densos de texto por um layout mais estruturado e focado em ação, os usuários conseguiram encontrar respostas mais rápido e navegar pelo suporte sem complicação.',
				'Mostrar a data da última atualização e coletar feedbacks ajudou a aumentar a confiança na plataforma, mostrando que o conteúdo está sempre fresco e criando um canal direto pra gente continuar melhorando sempre.',
			],
			beforeCaption: 'Versão antiga de FAQ sobre Saque',
			afterCaption: 'Nova versão de FAQ sobre Saque',
		},
		darkMode: {
			title: 'Modo escuro',
			paragraphs: [
				'O modo escuro revelou um problema no sistema de cores existente: o laranja da marca já não transmitia a mesma mensagem que passava em superfícies claras. O contraste reduzido deixou os elementos interativos menos evidentes, enquanto a mudança de tom fez com que as ações principais parecessem estados de alerta ou erro.',
				'Em vez de apenas espelhar o tema claro, redefini o comportamento das cores para ambientes escuros, equilibrando acessibilidade, hierarquia visual e reconhecimento da marca. O resultado foi um conjunto dedicado de design tokens para o modo escuro, que preservou a identidade do produto e garantiu que as ações críticas continuassem claras e confiáveis.',
				'Para tornar a implementação escalável, o sistema foi estruturado usando tokens de design semânticos em vez de cores fixadas no código. Tokens primitivos como Neutral Gray 100 podiam ser mapeados para valores diferentes em cada tema (#FDFDFD no modo claro e #1A1A1A no modo escuro), enquanto tokens semânticos como Background Color referenciavam esses primitivos. Isso permitiu que toda a interface mudasse de tema apenas alterando os valores dos tokens, dando aos desenvolvedores suporte completo ao modo escuro sem esforço adicional de implementação e criando uma base sólida para escalar em futuros produtos.',
			],
			note: 'Passe o mouse sobre a tela à direita para ver as diferenças.',
			comparisonLabel: 'Comparação entre os modos claro e escuro',
			darkAlt:
				'Um celular com o app de banco aberto. É um app preto e laranja, da Somapay PF.',
			lightAlt:
				'Um celular com o aplicativo do banco aberto. É o app laranja e branco do Somapay PF.',
		},
	},
};

const somapayGlossary: Record<Locale, readonly GlossaryTerm[]> = {
	en: [
		{
			label: 'Dataprev',
			definition:
				"Brazil’s public technology company responsible for processing social-security and employment data.",
			triggerLabel: 'Learn what Dataprev is',
		},
		{
			label: 'MED Pix',
			definition:
				"Pix’s special refund mechanism for transactions involving suspected fraud or operational failure.",
			triggerLabel: 'Learn what MED Pix means',
		},
		{
			label: 'Pix Automático',
			definition:
				'A Pix feature that lets users authorize recurring payments, similar to direct debit.',
			triggerLabel: 'Learn what Pix Automático means',
		},
		{
			label: 'design tokens',
			definition:
				'Reusable names that store visual decisions such as colors, spacing, typography, and borders.',
			triggerLabel: 'Learn what design tokens are',
		},
		{
			label: 'Primitive tokens',
			definition:
				'Primitive tokens store raw values; semantic tokens describe how those values are used in the interface.',
			triggerLabel: 'Learn the difference between primitive and semantic tokens',
		},
		{
			label: 'semantic tokens',
			definition:
				'Primitive tokens store raw values; semantic tokens describe how those values are used in the interface.',
			triggerLabel: 'Learn the difference between primitive and semantic tokens',
		},
	],
	'pt-BR': [
		{
			label: 'Dataprev',
			definition:
				'Empresa pública de tecnologia responsável pelo processamento de dados previdenciários e trabalhistas no Brasil.',
			triggerLabel: 'Saiba o que é a Dataprev',
		},
		{
			label: 'MED Pix',
			definition:
				'Mecanismo especial do Pix para devolução de valores em transações com suspeita de fraude ou falha operacional.',
			triggerLabel: 'Saiba o que significa MED Pix',
		},
		{
			label: 'Pix Automático',
			definition:
				'Funcionalidade do Pix que permite autorizar pagamentos recorrentes, de forma semelhante ao débito automático.',
			triggerLabel: 'Saiba o que é o Pix Automático',
		},
		{
			label: 'design tokens',
			definition:
				'Nomes reutilizáveis que armazenam decisões visuais, como cores, espaçamentos, tipografia e bordas.',
			triggerLabel: 'Saiba o que são design tokens',
		},
		{
			label: 'Tokens primitivos',
			definition:
				'Tokens primitivos armazenam valores brutos; tokens semânticos descrevem como esses valores são utilizados na interface.',
			triggerLabel: 'Entenda a diferença entre tokens primitivos e semânticos',
		},
		{
			label: 'tokens semânticos',
			definition:
				'Tokens primitivos armazenam valores brutos; tokens semânticos descrevem como esses valores são utilizados na interface.',
			triggerLabel: 'Entenda a diferença entre tokens primitivos e semânticos',
		},
	],
};

const media = {
	pixModernization: '/assets/somapay/pf/pix-modernization.webp',
	pixReceiving: '/assets/somapay/pf/pix-receiving.webp',
	sendPoster: '/assets/somapay/pf/pix-send-poster.jpg',
	sendVideo: '/assets/somapay/pf/pix-send.webm',
	receivePoster: '/assets/somapay/pf/pix-receive-poster.jpg',
	receiveVideo: '/assets/somapay/pf/pix-receive.webm',
	workerCredit: '/assets/somapay/pf/credito-trabalhador.webp',
	helpBefore: '/assets/somapay/pf/help-before.webp',
	helpAfter: '/assets/somapay/pf/help-after.webp',
	tokens: '/assets/somapay/pf/image-grid.svg',
	dark: '/assets/somapay/pf/dark-mode.webp',
	light: '/assets/somapay/pf/light-mode.webp',
};

function SectionTitle({
	children,
	className = '',
}: {
	children: string;
	className?: string;
}) {
	const titleRef = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		const title = titleRef.current;
		if (!title) return;

		const fit = () => {
			title.style.removeProperty('font-size');
			const preferredSize = Number.parseFloat(getComputedStyle(title).fontSize);
			const availableWidth = title.clientWidth;
			const textWidth = title.scrollWidth;

			if (textWidth > availableWidth && availableWidth > 0) {
				title.style.fontSize = `${preferredSize * (availableWidth / textWidth) * 0.98}px`;
			}
		};

		fit();
		const observer = new ResizeObserver(fit);
		observer.observe(title);
		document.fonts?.ready.then(fit);

		return () => observer.disconnect();
	}, [children]);

	return (
		<h2 ref={titleRef} className={`sp-section-title ${className}`.trim()}>
			{children}
		</h2>
	);
}

function useReducedMotion() {
	const [reduced, setReduced] = useState(false);

	useEffect(() => {
		const query = window.matchMedia('(prefers-reduced-motion: reduce)');
		const update = () => setReduced(query.matches);
		update();
		query.addEventListener('change', update);
		return () => query.removeEventListener('change', update);
	}, []);

	return reduced;
}

function AnimatedMetric({
	value,
	decimals = 0,
}: {
	value: number;
	decimals?: number;
}) {
	const ref = useRef<HTMLSpanElement>(null);
	const [display, setDisplay] = useState(0);
	const reduced = useReducedMotion();

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		if (reduced) {
			setDisplay(value);
			return;
		}

		let frame = 0;
		let started = false;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting || started) return;
				started = true;
				const startedAt = performance.now();
				const duration = 1100;

				const animate = (time: number) => {
					const progress = Math.min((time - startedAt) / duration, 1);
					const eased = 1 - Math.pow(1 - progress, 3);
					setDisplay(value * eased);
					if (progress < 1) frame = requestAnimationFrame(animate);
				};

				frame = requestAnimationFrame(animate);
				observer.disconnect();
			},
			{ threshold: 0.45 },
		);

		observer.observe(node);
		return () => {
			observer.disconnect();
			cancelAnimationFrame(frame);
		};
	}, [reduced, value]);

	return <span ref={ref}>{display.toFixed(decimals)}</span>;
}

type Bubble = {
	name: string;
	x: number;
	y: number;
	reviews: number;
};

function BubbleMatrix({
	locale,
	labels,
}: {
	locale: Locale;
	labels: Copy['data']['chart'];
}) {
	const rootRef = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState<Bubble | null>(null);
	const [containerWidth, setContainerWidth] = useState(960);
	const bubbles: Bubble[] = useMemo(
		() => [
			{
				name: locale === 'pt-BR' ? 'Instabilidade do app' : 'App instability',
				x: 868,
				y: 1.56,
				reviews: 868,
			},
			{
				name: locale === 'pt-BR' ? 'Login e acesso' : 'Login & access',
				x: 679,
				y: 1.72,
				reviews: 679,
			},
			{
				name: locale === 'pt-BR' ? 'PIX e transferências' : 'PIX & transfers',
				x: 453,
				y: 1.93,
				reviews: 453,
			},
			{
				name: locale === 'pt-BR' ? 'Atendimento e suporte' : 'Support',
				x: 304,
				y: 1.97,
				reviews: 304,
			},
			{
				name: locale === 'pt-BR' ? 'Saldo e extrato' : 'Balance & statement',
				x: 167,
				y: 2.25,
				reviews: 167,
			},
			{
				name:
					locale === 'pt-BR'
						? 'Empréstimo/crédito/limite'
						: 'Credit/loan/limit',
				x: 94,
				y: 2.82,
				reviews: 94,
			},
			{
				name: locale === 'pt-BR' ? 'Cartão' : 'Card',
				x: 66,
				y: 2.47,
				reviews: 66,
			},
		],
		[locale],
	);

	useEffect(() => {
		const node = rootRef.current;
		if (!node) return;

		const updateWidth = () => {
			const nextWidth = node.getBoundingClientRect().width;
			if (nextWidth > 0) setContainerWidth(nextWidth);
		};
		const observer = new ResizeObserver(updateWidth);

		observer.observe(node);
		updateWidth();

		return () => observer.disconnect();
	}, []);

	const isMobile = containerWidth <= 809;
	const width = isMobile ? Math.max(containerWidth, 280) : 960;
	const height = isMobile ? 360 : 520;
	const plot = useMemo(
		() =>
			isMobile
				? { left: 42, right: width - 20, top: 20, bottom: 308 }
				: { left: 78, right: 915, top: 48, bottom: 448 },
		[isMobile, width],
	);
	const mapX = useCallback(
		(x: number) => plot.left + (x / 950) * (plot.right - plot.left),
		[plot],
	);
	const mapY = useCallback(
		(y: number) =>
			plot.bottom - ((y - 1.2) / (3.1 - 1.2)) * (plot.bottom - plot.top),
		[plot],
	);
	const radius = useCallback(
		(reviews: number) => {
			const baseRadius = 10 + ((reviews - 66) / (868 - 66)) * 35;
			return isMobile ? baseRadius * 0.55 : baseRadius;
		},
		[isMobile],
	);
	const centerX = mapX(200);
	const centerY = mapY(2.5);
	const xTicks = isMobile ? [0, 200, 950] : [0, 200, 400, 600, 800, 950];
	const yTicks = isMobile ? [1.2, 2.5, 3.1] : [1.2, 1.5, 2, 2.5, 3, 3.1];

	const bubbleLayout = useMemo(() => {
		const occupied: Array<{
			left: number;
			right: number;
			top: number;
			bottom: number;
		}> = [];
		const fontSize = isMobile ? 8 : 10;
		const lineHeight = isMobile ? 10 : 12;

		return bubbles.map(bubble => {
			const x = mapX(bubble.x);
			const y = mapY(bubble.y);
			const r = radius(bubble.reviews);
			const words = bubble.name.split(' ');
			const lines =
				words.length > 2
					? [
							words.slice(0, Math.ceil(words.length / 2)).join(' '),
							words.slice(Math.ceil(words.length / 2)).join(' '),
						]
					: [bubble.name];
			const maxWidth =
				Math.max(...lines.map(line => line.length)) * fontSize * 0.55;
			const baseLabelY =
				y +
				r +
				(isMobile ? 8 : 12) +
				(lines.length === 2 ? 6 : 0) +
				(bubble.reviews === 868 ? (isMobile ? 5 : 6) : 0);
			const sideStep = Math.min(
				isMobile ? 24 : 42,
				Math.max(isMobile ? 12 : 18, maxWidth * 0.35),
			);
			const candidates = [0, -sideStep, sideStep, -sideStep * 2, sideStep * 2]
				.flatMap(offsetX =>
					[0, lineHeight, lineHeight * 2].map(offsetY => {
						const blockCenterX = x + offsetX;
						const textAnchor =
							offsetX < 0
								? ('end' as const)
								: offsetX > 0
									? ('start' as const)
									: ('middle' as const);
						const labelX =
							textAnchor === 'end'
								? blockCenterX + maxWidth / 2
								: textAnchor === 'start'
									? blockCenterX - maxWidth / 2
									: blockCenterX;

						return {
							blockCenterX,
							labelX,
							labelY: baseLabelY + offsetY,
							textAnchor,
						};
					}),
				)
				.sort((a, b) => {
					const aVertical = a.labelY - baseLabelY;
					const bVertical = b.labelY - baseLabelY;
					return aVertical - bVertical;
				});

			const position = candidates.find(candidate => {
				const box = {
					left: candidate.blockCenterX - maxWidth / 2,
					right: candidate.blockCenterX + maxWidth / 2,
					top: candidate.labelY - lineHeight,
					bottom: candidate.labelY + lineHeight * lines.length,
				};
				const staysInside = box.left >= 0 && box.right <= width;
				const collides = occupied.some(
					placed =>
						!(
							box.right < placed.left ||
							box.left > placed.right ||
							box.bottom < placed.top ||
							box.top > placed.bottom
						),
				);

				if (!staysInside || collides) return false;
				occupied.push(box);
				return true;
			}) ?? {
				blockCenterX: x,
				labelX: x,
				labelY: baseLabelY,
				textAnchor: 'middle' as const,
			};

			return { bubble, x, y, r, lines, ...position, lineHeight };
		});
	}, [bubbles, isMobile, mapX, mapY, radius, width]);
	const tooltipPosition = active
		? (() => {
				const scale = containerWidth / width;
				const bubbleX = mapX(active.x) * scale;
				const bubbleY = mapY(active.y) * scale;
				const bubbleRadius = radius(active.reviews) * scale;
				const tooltipWidth = isMobile ? 160 : 190;
				const gap = isMobile ? 8 : 12;
				const fitsOnRight =
					bubbleX + bubbleRadius + gap + tooltipWidth <= containerWidth;

				return {
					left: fitsOnRight
						? bubbleX + bubbleRadius + gap
						: Math.max(0, bubbleX - bubbleRadius - gap - tooltipWidth),
					top: Math.max(8, bubbleY - (isMobile ? 28 : 34)),
				};
			})()
		: null;

	return (
		<div className='sp-chart-wrap' ref={rootRef}>
			<svg
				className={`sp-chart${isMobile ? ' sp-chart--mobile' : ''}`}
				viewBox={`0 0 ${width} ${height}`}
				role='img'
				aria-label={`${labels.reviews} × ${labels.rating}`}
				onPointerLeave={() => setActive(null)}
			>
				<line x1={centerX} y1={plot.top} x2={centerX} y2={plot.bottom} />
				<line x1={plot.left} y1={centerY} x2={plot.right} y2={centerY} />

				{!isMobile && (
					<>
						<text x={plot.left + 14} y={plot.top + 22}>
							{labels.opportunity}
						</text>
						<text x={centerX + 14} y={plot.top + 22}>
							{labels.critical}
						</text>
						<text x={plot.left + 14} y={plot.bottom - 15}>
							{labels.lowPriority}
						</text>
						<text x={centerX + 14} y={plot.bottom - 15}>
							{labels.important}
						</text>
					</>
				)}

				{xTicks.map(tick => (
					<text
						key={tick}
						className='sp-chart__tick'
						x={mapX(tick)}
						y={plot.bottom + 28}
						textAnchor='middle'
					>
						{tick}
					</text>
				))}
				{yTicks.map(tick => (
					<text
						key={tick}
						className='sp-chart__tick'
						x={plot.left - 18}
						y={mapY(tick) + 4}
						textAnchor='end'
					>
						{tick}
					</text>
				))}

				<text
					className='sp-chart__axis'
					x={(plot.left + plot.right) / 2}
					y={height - 18}
					textAnchor='middle'
				>
					{labels.reviews}
				</text>
				<text
					className='sp-chart__axis'
					x='18'
					y={(plot.top + plot.bottom) / 2}
					textAnchor='middle'
					transform={`rotate(-90 18 ${(plot.top + plot.bottom) / 2})`}
				>
					{labels.rating}
				</text>

				{bubbleLayout.map(
					({
						bubble,
						x,
						y,
						r,
						lines,
						labelX,
						labelY,
						textAnchor,
						lineHeight,
					}) => (
						<g
							key={bubble.name}
							className='sp-chart__bubble'
							tabIndex={0}
							role='img'
							aria-label={`${bubble.name}. ${labels.reviews}: ${bubble.reviews}. ${labels.rating}: ${bubble.y}`}
							onPointerEnter={() => setActive(bubble)}
							onFocus={() => setActive(bubble)}
							onBlur={() => setActive(null)}
						>
							<circle cx={x} cy={y} r={r} />
							<text
								className='sp-chart__label'
								x={labelX}
								y={labelY}
								textAnchor={textAnchor}
							>
								{lines.map((line, index) => (
									<tspan
										key={line}
										x={labelX}
										dy={index === 0 ? 0 : lineHeight}
									>
										{line}
									</tspan>
								))}
							</text>
						</g>
					),
				)}
			</svg>

			{active && (
				<div
					className='sp-chart-tooltip'
					role='status'
					style={tooltipPosition ?? undefined}
				>
					<strong>{active.name}</strong>
					<span>
						{labels.reviews}: {active.reviews}
					</span>
					<span>
						{labels.rating}: {active.y}
					</span>
				</div>
			)}
		</div>
	);
}

type FlowStep = {
	id: string;
	label: string;
	active: boolean;
	branch?: string[];
};

function OnboardingStepper({ locale }: { locale: Locale }) {
	const rootRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(820);

	useEffect(() => {
		const node = rootRef.current;
		if (!node) return;
		const update = () => setWidth(node.getBoundingClientRect().width);
		const observer = new ResizeObserver(update);
		observer.observe(node);
		update();
		return () => observer.disconnect();
	}, []);

	const labels =
		locale === 'pt-BR'
			? {
					signup: 'Cadastro',
					gov: 'Bacen Protege+',
					id: 'Confirmação de Identidade',
					chosen: 'Nome Social',
					contact: 'Autenticação de Contatos',
					whatsapp: 'WhatsApp',
					phone: 'Ligação',
					docs: 'Verificação de Documentos',
					minors: 'Menores de Idade',
					foreigners: 'Estrangeiros',
					trust: 'Baixa Confiança',
					irregular: 'CPF Irregular',
					login: 'Login',
				}
			: {
					signup: 'Sign-up',
					gov: 'Gov Validation',
					id: 'ID Confirmation',
					chosen: 'Chosen Name',
					contact: 'Contact 2FA',
					whatsapp: 'WhatsApp',
					phone: 'Phone Call',
					docs: 'ID Verification',
					minors: 'Minors',
					foreigners: 'Foreigners',
					trust: 'Low Trust',
					irregular: 'Irregular Documents',
					login: 'Login',
				};

	const steps: FlowStep[] = [
		{ id: 'signup', label: labels.signup, active: false },
		{ id: 'gov', label: labels.gov, active: true },
		{ id: 'id', label: labels.id, active: true, branch: [labels.chosen] },
		{
			id: 'contact',
			label: labels.contact,
			active: true,
			branch: [labels.whatsapp, labels.phone],
		},
		{
			id: 'docs',
			label: labels.docs,
			active: true,
			branch: [
				labels.minors,
				labels.foreigners,
				labels.trust,
				labels.irregular,
			],
		},
		{ id: 'login', label: labels.login, active: false },
	];

	return (
		<div className='sp-stepper' ref={rootRef}>
			<ol className='visually-hidden'>
				{steps.map(step => (
					<li key={`${step.id}-accessible`}>
						{step.label}
						{step.branch && (
							<ul>
								{step.branch.map((branch, index) => (
									<li key={`${step.id}-${branch}-${index}`}>{branch}</li>
								))}
							</ul>
						)}
					</li>
				))}
			</ol>
			{width < 560 ? (
				<VerticalFlow steps={steps} />
			) : (
				<HorizontalFlow width={Math.max(width, 680)} steps={steps} />
			)}
		</div>
	);
}

function HorizontalFlow({
	width,
	steps,
}: {
	width: number;
	steps: FlowStep[];
}) {
	const radius = 8;
	const nodeY = 58;
	const labelY = 82;
	const branchY = 132;
	const branchRadius = 8;
	const height = 194;
	const margin = 56;
	const gap = (width - margin * 2) / (steps.length - 1);
	const xs = steps.map((_, index) => margin + index * gap);
	const branchSources = [2, 3, 4];
	const branchXs = branchSources.map(index => xs[index]);

	return (
		<svg viewBox={`0 0 ${width} ${height}`} aria-hidden='true'>
			{steps.slice(0, -1).map((step, index) => (
				<line
					key={step.id}
					className={
						step.active && steps[index + 1].active
							? 'sp-flow-line sp-flow-line--active'
							: 'sp-flow-line'
					}
					x1={xs[index] + radius}
					y1={nodeY}
					x2={xs[index + 1] - radius}
					y2={nodeY}
				/>
			))}

			{branchSources.map((source, index) => (
				<line
					key={source}
					className='sp-flow-branch'
					x1={xs[source]}
					y1={nodeY + radius}
					x2={branchXs[index]}
					y2={branchY - branchRadius}
				/>
			))}

			{branchXs.slice(0, -1).map((x, index) => (
				<line
					key={x}
					className='sp-flow-branch'
					x1={x + branchRadius}
					y1={branchY}
					x2={branchXs[index + 1] - branchRadius}
					y2={branchY}
				/>
			))}

			{branchXs.map((x, index) => {
				const branch = steps[branchSources[index]].branch ?? [];
				return (
					<g key={x}>
						<circle
							className='sp-flow-branch-node'
							cx={x}
							cy={branchY}
							r={branchRadius}
						/>
						<text
							className='sp-flow-branch-label'
							x={x}
							y={branchY + 24}
							textAnchor='middle'
						>
							{branch.map((line, lineIndex) => (
								<tspan key={line} x={x} dy={lineIndex === 0 ? 0 : 14}>
									{line}
								</tspan>
							))}
						</text>
					</g>
				);
			})}

			{steps.map((step, index) => (
				<g key={step.id}>
					<circle
						className={
							step.active ? 'sp-flow-node sp-flow-node--active' : 'sp-flow-node'
						}
						cx={xs[index]}
						cy={nodeY}
						r={radius}
					/>
					<text
						className={
							step.active
								? 'sp-flow-label sp-flow-label--active'
								: 'sp-flow-label'
						}
						x={xs[index]}
						y={labelY}
						textAnchor='middle'
					>
						{step.label}
					</text>
				</g>
			))}
		</svg>
	);
}

function VerticalFlow({ steps }: { steps: FlowStep[] }) {
	const width = 260;
	const radius = 9;
	const mainX = 38;
	const labelX = 62;
	const branchX = 84;
	const lineHeight = 15;
	const ys: number[] = [];
	let y = 20;

	steps.forEach((step, index) => {
		ys.push(y);
		if (!steps[index + 1]) return;
		y += step.branch
			? Math.max(72, 44 + step.branch.length * lineHeight + 18)
			: 64;
	});

	return (
		<svg
			className='sp-stepper__vertical'
			viewBox={`0 0 ${width} ${y + 24}`}
			aria-hidden='true'
		>
			{steps.slice(0, -1).map((step, index) => (
				<line
					key={step.id}
					className={
						step.active && steps[index + 1].active
							? 'sp-flow-line sp-flow-line--active'
							: 'sp-flow-line'
					}
					x1={mainX}
					y1={ys[index] + radius}
					x2={mainX}
					y2={ys[index + 1] - radius}
				/>
			))}

			{steps.map((step, index) => {
				if (!step.branch) return null;
				const branchY = ys[index] + 38;
				return (
					<g key={`${step.id}-branch`}>
						<line
							className='sp-flow-branch'
							x1={mainX + radius * 0.7}
							y1={ys[index] + radius * 0.7}
							x2={branchX - radius * 0.7}
							y2={branchY - radius * 0.7}
						/>
						<circle
							className='sp-flow-branch-node'
							cx={branchX}
							cy={branchY}
							r={8}
						/>
						<text
							className='sp-flow-branch-label sp-flow-branch-label--vertical'
							x={branchX + 18}
							y={branchY + 4}
						>
							{step.branch.map((line, lineIndex) => (
								<tspan
									key={line}
									x={branchX + 18}
									dy={lineIndex === 0 ? 0 : lineHeight}
								>
									{line}
								</tspan>
							))}
						</text>
					</g>
				);
			})}

			{steps.map((step, index) => (
				<g key={step.id}>
					<circle
						className={
							step.active ? 'sp-flow-node sp-flow-node--active' : 'sp-flow-node'
						}
						cx={mainX}
						cy={ys[index]}
						r={radius}
					/>
					<text
						className={
							step.active
								? 'sp-flow-label sp-flow-label--active'
								: 'sp-flow-label'
						}
						x={labelX}
						y={ys[index] + 5}
					>
						{step.label}
					</text>
				</g>
			))}
		</svg>
	);
}

function PhoneVideo({
	src,
	poster,
	label,
	playLabel,
	pauseLabel,
}: {
	src: string;
	poster: string;
	label: string;
	playLabel: string;
	pauseLabel: string;
}) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const figureRef = useRef<HTMLElement>(null);
	const [playing, setPlaying] = useState(false);
	const [shouldLoad, setShouldLoad] = useState(false);
	const pendingPlayRef = useRef(false);

	useEffect(() => {
		const figure = figureRef.current;
		if (!figure || shouldLoad) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				setShouldLoad(true);
				observer.disconnect();
			},
			{ rootMargin: '500px 0px' },
		);

		observer.observe(figure);
		return () => observer.disconnect();
	}, [shouldLoad]);

	useEffect(() => {
		if (!shouldLoad || !pendingPlayRef.current) return;
		pendingPlayRef.current = false;
		videoRef.current?.play().catch(() => setPlaying(false));
	}, [shouldLoad]);

	const toggle = useCallback(async () => {
		const video = videoRef.current;
		if (!video) return;
		if (!shouldLoad) {
			pendingPlayRef.current = true;
			setShouldLoad(true);
			return;
		}
		if (video.paused) {
			await video.play().catch(() => setPlaying(false));
		} else {
			video.pause();
		}
	}, [shouldLoad]);

	return (
		<figure className='sp-flow-card' ref={figureRef}>
			<button
				className='sp-phone'
				type='button'
				onClick={toggle}
				aria-label={playing ? pauseLabel : playLabel}
			>
				<span className='sp-phone__screen'>
					<video
						ref={videoRef}
						src={shouldLoad ? src : undefined}
						poster={shouldLoad ? poster : undefined}
						muted
						loop
						playsInline
						preload='metadata'
						onPlay={() => setPlaying(true)}
						onPause={() => setPlaying(false)}
					/>
				</span>
				<span className='sp-phone__speaker' aria-hidden='true' />
				<span className='sp-phone__play' aria-hidden='true'>
					{playing ? (
						<span className='sp-phone__pause-symbol'>Ⅱ</span>
					) : (
						<span className='sp-phone__play-symbol' />
					)}
				</span>
			</button>
			<figcaption>{label}</figcaption>
		</figure>
	);
}

export function SomapayPage({ locale }: SomapayPageProps) {
	const text = copy[locale];
	const site = siteContent[locale];
	const pageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		document.body.classList.add('somapay-case-open');
		return () => document.body.classList.remove('somapay-case-open');
	}, []);

	useEffect(() => {
		const pageElement = pageRef.current;
		if (!pageElement) return;

		// Map each page area to the colors used by the header above it.
		const sectionStyles: Record<string, { color: string; background: string }> =
			{
				start: {
					color: 'var(--paper)',
					background: 'var(--ink)',
				},
				intro: {
					color: 'var(--paper)',
					background: 'var(--brand-blue)',
				},
				data: {
					color: 'var(--navy)',
					background: 'var(--gold)',
				},
				goals: {
					color: 'var(--paper)',
					background: 'var(--brand-blue)',
				},
				onboarding: {
					color: 'var(--paper)',
					background: 'var(--ink)',
				},
				pix: {
					color: 'var(--paper)',
					background: 'var(--brand-blue)',
				},
				'worker-credit': {
					color: 'var(--paper)',
					background: 'var(--navy)',
				},
				faq: {
					color: 'var(--navy)',
					background: 'var(--gold)',
				},
				'dark-mode': {
					color: 'var(--paper)',
					background: 'var(--ink)',
				},
				nda: {
					color: 'var(--yellow)',
					background: 'var(--orange)',
				},
				footer: {
					color: 'var(--ink)',
					background: 'var(--paper)',
				},
			};

		let animationFrame = 0;

		// Match the header to the page area directly underneath its midpoint.
		const updateHeaderColor = () => {
			const header = pageElement.querySelector<HTMLElement>('.site-header');
			const probeY = (header?.getBoundingClientRect().height ?? 64) / 2;
			const currentArea = document
				.elementsFromPoint(window.innerWidth / 2, probeY)
				.map(element =>
					element.closest<HTMLElement>('section[id], .site-footer'),
				)
				.find(area => area && pageElement.contains(area));

			const sectionId = currentArea?.id || 'footer';
			const styles = sectionStyles[sectionId] || sectionStyles.start;
			pageElement.style.setProperty('--header-text-color', styles.color);
			pageElement.style.setProperty(
				'--header-background-color',
				styles.background,
			);
			pageElement.style.setProperty(
				'--language-switch-off-color',
				styles.background === 'var(--ink)' ? 'var(--brand-blue)' : 'var(--ink)',
			);
			pageElement.style.setProperty(
				'--language-switch-on-color',
				styles.background === 'var(--gold)' ? 'var(--navy)' : 'var(--gold)',
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
		<div className='page-shell somapay-case' ref={pageRef}>
			<a className='skip-link' href='#main-content'>
				{site.common.skipToContent}
			</a>
			<SiteHeader locale={locale} currentPage='somapay-pf' />

			<main id='main-content' tabIndex={-1}>
				<section className='sp-hero' id='start'>
					<div className='sp-shell sp-hero__inner'>
						<Reveal className='sp-hero__logo'>
							<img src='/assets/somapay/pf/logo.svg' alt='Somapay PF' />
						</Reveal>
						<Reveal className='sp-hero__copy' delay={80}>
							<h1>{text.hero.title}</h1>
							<p className='sp-hero__metrics'>{text.hero.metrics}</p>
							<p className='sp-hero__description'>{text.hero.description}</p>
						</Reveal>
					</div>
				</section>

				<section className='sp-intro' id='intro'>
					<div className='sp-shell sp-intro__grid'>
						<SectionTitle className='sp-intro-title'>Intro</SectionTitle>
						<div className='sp-intro__content'>
							{text.intro.map((item, index) => (
								<Reveal
									className='sp-copy-block'
									delay={index * 55}
									key={item.title}
								>
									<h3 className='sp-copy-block__title'>{item.title}</h3>
									{item.paragraphs.map(paragraph => (
										<p key={paragraph}>{paragraph}</p>
									))}
								</Reveal>
							))}
						</div>
					</div>
				</section>

				<section className='sp-data' id='data'>
					<div className='sp-shell'>
						<Reveal className='sp-section-lead sp-section-lead--data'>
							<SectionTitle>{text.data.title}</SectionTitle>
							<p>{text.data.description}</p>
						</Reveal>
						<Reveal className='sp-data__chart' delay={90}>
							<BubbleMatrix locale={locale} labels={text.data.chart} />
						</Reveal>
						<div className='sp-metrics'>
							{text.data.metrics.map((metric, index) => (
								<Reveal
									className='sp-metric'
									delay={index * 70}
									key={metric.label}
								>
									<div className='sp-metric__value'>
										{metric.prefix}
										<AnimatedMetric
											value={metric.value}
											decimals={metric.decimals}
										/>
										{metric.suffix}
									</div>
									<p>{metric.label}</p>
								</Reveal>
							))}
						</div>
					</div>
				</section>

				<section className='sp-goals' id='goals'>
					<div className='sp-shell sp-goals__grid'>
						<Reveal>
							<SectionTitle className='sp-display-title'>
								{text.goals.title}
							</SectionTitle>
						</Reveal>
						<ol className='sp-goals__items'>
							{text.goals.items.map((item, index) => (
								<li key={item.title}>
									<Reveal className='sp-goal' delay={index * 70}>
										<span className='sp-index' aria-hidden='true'>
											0{index + 1}
										</span>
										<div>
											<h3>{item.title}</h3>
											<p>
											<AnnotatedText
												text={item.description}
												terms={somapayGlossary[locale]}
												sectionTexts={text.goals.items.map(
													goal => goal.description,
												)}
												textIndex={index}
											/>
											</p>
										</div>
									</Reveal>
								</li>
							))}
						</ol>
					</div>
				</section>

				<section className='sp-onboarding' id='onboarding'>
					<div className='sp-shell'>
						<Reveal className='sp-section-lead sp-section-lead--red'>
							<SectionTitle>{text.onboarding.title}</SectionTitle>
							<p>{text.onboarding.description}</p>
						</Reveal>
						<Reveal className='sp-onboarding__flow' delay={80}>
							<OnboardingStepper locale={locale} />
						</Reveal>
					</div>
				</section>

				<section className='sp-pix' id='pix'>
					<div className='sp-shell'>
						<Reveal className='sp-section-lead sp-section-lead--white sp-pix__lead'>
							<SectionTitle>{text.pix.title}</SectionTitle>
							<div>
								{text.pix.intro.map((paragraph, index) => (
									<p key={paragraph}>
										<AnnotatedText
											text={paragraph}
											terms={somapayGlossary[locale]}
											sectionTexts={text.pix.intro}
											textIndex={index}
										/>
									</p>
								))}
							</div>
						</Reveal>

						<div className='sp-feature sp-feature--wide'>
							<Reveal className='sp-feature__copy'>
								<h3>{text.pix.modernization.title}</h3>
								<p>{text.pix.modernization.description}</p>
							</Reveal>
							<Reveal className='sp-feature__media' delay={80}>
								<img
									src={media.pixModernization}
									alt=''
									loading='lazy'
									decoding='async'
								/>
							</Reveal>
						</div>

						<div className='sp-feature sp-feature--phone'>
							<Reveal className='sp-feature__copy'>
								<h3>{text.pix.receiving.title}</h3>
								{text.pix.receiving.description.map(paragraph => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</Reveal>
							<Reveal
								className='sp-feature__media sp-feature__media--phone'
								delay={80}
							>
								<img
									src={media.pixReceiving}
									alt=''
									loading='lazy'
									decoding='async'
								/>
							</Reveal>
						</div>

						<Reveal className='sp-flows-title'>
							<h3>{text.pix.flowsTitle}</h3>
						</Reveal>
						<div className='sp-flow-gallery'>
							<PhoneVideo
								src={media.sendVideo}
								poster={media.sendPoster}
								label={text.pix.sending}
								playLabel={text.pix.play}
								pauseLabel={text.pix.pause}
							/>
							<PhoneVideo
								src={media.receiveVideo}
								poster={media.receivePoster}
								label={text.pix.receivingFlow}
								playLabel={text.pix.play}
								pauseLabel={text.pix.pause}
							/>
						</div>
					</div>
				</section>

				<section className='sp-help' id='faq'>
					<div className='sp-shell sp-help__grid'>
						<Reveal className='sp-section-lead sp-section-lead--red'>
							<SectionTitle>{text.help.title}</SectionTitle>
							<div>
								{text.help.paragraphs.map(paragraph => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</div>
						</Reveal>
						<div className='sp-help__screens'>
							<Reveal className='sp-help__screen'>
								<figure>
									<img
										src={media.helpBefore}
										alt=''
										loading='lazy'
										decoding='async'
									/>
									<figcaption>{text.help.beforeCaption}</figcaption>
								</figure>
							</Reveal>
							<Reveal
								className='sp-help__screen sp-help__screen--raised'
								delay={80}
							>
								<figure>
									<img
										src={media.helpAfter}
										alt=''
										loading='lazy'
										decoding='async'
									/>
									<figcaption>{text.help.afterCaption}</figcaption>
								</figure>
							</Reveal>
						</div>
					</div>
				</section>

				<section className='sp-dark-mode' id='dark-mode'>
					<div className='sp-shell'>
						<Reveal className='sp-section-lead sp-section-lead--yellow sp-dark-mode__lead'>
							<SectionTitle>{text.darkMode.title}</SectionTitle>
							<div>
								{text.darkMode.paragraphs.map((paragraph, index) => (
									<p key={paragraph}>
										<AnnotatedText
											text={paragraph}
											terms={somapayGlossary[locale]}
											sectionTexts={text.darkMode.paragraphs}
											textIndex={index}
										/>
									</p>
								))}
							</div>
						</Reveal>

						<div className='sp-dark-mode__visuals'>
							<Reveal className='sp-token-graphic'>
								<img
									src={media.tokens}
									alt=''
									loading='lazy'
									decoding='async'
								/>
							</Reveal>
							<Reveal className='sp-comparison' delay={600}>
								<figure>
									<BeforeAfter
										before={media.dark}
										after={media.light}
										beforeAlt={text.darkMode.darkAlt}
										afterAlt={text.darkMode.lightAlt}
										label={text.darkMode.comparisonLabel}
									/>
									<figcaption>{text.darkMode.note}</figcaption>
								</figure>
							</Reveal>
						</div>
					</div>
				</section>

				<section className='sp-worker-credit' id='worker-credit'>
					<div className='sp-shell sp-worker-credit__grid'>
						<Reveal className='sp-worker-credit__heading'>
							<p className='sp-worker-credit__overline'>
								{text.workerCredit.overline}
							</p>
							<SectionTitle className='sp-worker-credit__title'>
								{text.workerCredit.title}
							</SectionTitle>
						</Reveal>
						<div className='sp-worker-credit__content'>
							<Reveal className='sp-worker-credit__copy'>
								{text.workerCredit.paragraphs.map((paragraph, index) => (
									<p key={paragraph}>
										<AnnotatedText
											text={paragraph}
											terms={somapayGlossary[locale]}
											sectionTexts={text.workerCredit.paragraphs}
											textIndex={index}
										/>
									</p>
								))}
							</Reveal>
							<Reveal className='sp-worker-credit__image' delay={80}>
								<img
									src={media.workerCredit}
									alt={text.workerCredit.imageAlt}
									loading='lazy'
									decoding='async'
								/>
							</Reveal>
							<Reveal className='sp-worker-credit__action' delay={120}>
								<a
									className='case-link sp-worker-credit__link'
									href={localizedPath(
										locale,
										'/somapay-pf/cred-trabalhador',
									)}
								>
									<span>{text.workerCredit.cta}</span>
									<span className='case-link__icon' aria-hidden='true' />
								</a>
							</Reveal>
						</div>
					</div>
				</section>

				<section
					className='sp-nda'
					id='nda'
					aria-label={site.caseDisclosure.label}
				>
					<div className='sp-shell sp-nda__inner'>
						<Reveal>
							<p>{site.caseDisclosure.text}</p>
						</Reveal>
						<Reveal delay={80}>
							<p className='sp-thanks'>{site.caseDisclosure.thanks}</p>
						</Reveal>
					</div>
				</section>
			</main>

			<SiteFooter locale={locale} />
		</div>
	);
}
