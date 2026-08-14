export type Locale = 'en' | 'pt-BR';

export const contact = {
	email: 'hello@arielcavalcante.com',
	phoneLabel: '+55 (85) 99204 6519',
	phoneHref: 'https://wa.me/5585992046519',
	linkedinLabel: 'Ariel Cavalcante',
	linkedinHref: 'https://linkedin.com/in/arielcavalcante',
};

export const siteContent = {
	en: {
		seo: {
			homeTitle: 'Ariel Cavalcante · Product Designer',
			homeDescription:
				'2026 portfolio of Product Designer Ariel Cavalcante, with 6+ years of experience across product design, design systems, fintech and more.',
			caseTitle: 'Somapay PF · Ariel Cavalcante',
			caseDescription:
				'+28% increase in Google Play rating through research and an end-to-end product redesign',
			somapayPjTitle: 'Somapay PJ · Ariel Cavalcante',
			somapayPjDescription:
				'How Somapay expanded beyond payroll with a dedicated mobile business account for independent contractors.',
			workerCreditTitle: 'Crédito do Trabalhador · Ariel Cavalcante',
			workerCreditDescription:
				'Product design case study for Somapay’s Crédito do Trabalhador experience.',
			vetPointTitle: 'VetPoint · Ariel Cavalcante',
			vetPointDescription:
				'How Petco’s initial mobile concepts became a complete, responsive veterinary staffing platform built in React.',
			notFoundTitle: '404 · Ariel Cavalcante',
			notFoundDescription: 'The requested page could not be found.',
		},
		nav: {
			primaryLabel: 'Primary navigation',
			home: 'Home',
			projects: 'Projects',
			workerCredit: 'Crédito do Trabalhador',
			resume: 'Resume',
			downloadResume: 'Download resume PDF',
			contact: 'Contact',
			menu: 'Menu',
			close: 'Close',
			language: 'Come to Brazil',
		},
		common: {
			skipToContent: 'Skip to main content',
			copyEmail: 'Copy email address',
			emailCopied: 'Email copied!',
			dismissNotification: 'Click to dismiss.',
			client: 'Client',
			role: 'My role',
			projects: 'Projects',
			home: 'Home',
		},
		caseDisclosure: {
			label: 'Disclosure',
			text: 'This case study contains information from projects completed under non-disclosure agreements (NDAs). Some sensitive details were changed or omitted to respect those commitments. The content presented here reflects my own analysis and contributions and does not necessarily represent the official views or positioning of the companies involved.',
			thanks: 'Thanks for your time!',
		},
		home: {
			available: 'Available for work',
			title: 'Product Design &\nDesign Systems',
			intro:
				'Bridging design and engineering with a touch of that Brazilian sauce.',
			skills: [
				'Design Systems',
				'Product Strategy',
				'Interaction Design',
				'Front-end Collaboration',
				'Motion & Microinteractions',
				'Accessibility',
			],
			projects: [
				{
					id: 'somapay-pf',
					client: 'Somapay',
					name: 'Somapay PF',
					title:
						'+28% increase in Google Play rating through research and an end-to-end product redesign',
					roles: [
						'Product Redesign',
						'Product Strategy',
						'User Interviews + User Tests',
						'Process Optimization',
					],
					cta: 'View Case Study',
					href: '/somapay-pf',
					art: '/assets/somapay/pf/card-art.svg',
					icon: '/assets/somapay/pf/app-icon.svg',
					available: true,
				},
				{
					id: 'somapay-pj',
					client: 'Somapay',
					name: 'Somapay PJ',
					title:
						'Expanded the product portfolio to a new audience. Same foundation, different visual identity',
					roles: [
						'End-to-end Product Design',
						'Design Team Management',
						'Design System Foundation',
						'Interaction Design',
					],
					cta: 'View Case Study',
					href: '/somapay-pj',
					art: '/assets/somapay/pj/card-art.svg',
					icon: '/assets/somapay/pj/app-icon.svg',
					available: true,
				},
				{
					id: 'vetpoint',
					client: 'Petco',
					name: 'Petco VetPoint',
					title:
						'Turning mobile concepts into a complete, responsive veterinary staffing platform',
					roles: [
						'Product Design',
						'Responsive Design',
						'Design Systems',
						'Frontend Development',
					],
					cta: 'View Case Study',
					href: '/vetpoint',
					art: '/assets/vetpoint/organized-home-screen.webp',
					icon: '/assets/vetpoint/vetpoint_app-icon.svg',
					available: true,
				},
			],
			resume: {
				title: 'Resume',
				startYear: '2019',
				endYear: '2026',
				downloadLabel: 'Download PDF',
				downloadHref: '/assets/ariel-cavalcante-resume.pdf',
				entries: [
					{
						company: 'Somapay',
						industry: 'Digital banking and HRTech platform',
						role: 'Senior Product Designer',
						description:
							'Led end-to-end design across credit, payments, onboarding, support and account experiences. Took Crédito do Trabalhador from discovery to launch, evolved the design system and contributed to a 28% increase in the app’s Google Play rating.',
						period: 'Nov 2024 – 2026',
					},
					{
						company: 'Instituto Atlântico',
						industry: 'Technology and innovation consultancy',
						role: 'UX Designer',
						description:
							'Designed complex enterprise products for Dell and other international clients, covering research, user flows, prototyping, accessibility reviews, design systems and implementation support.',
						period: 'Nov 2021 – Jul 2024',
					},
					{
						company: 'Garimpo UX',
						industry: 'UX consultancy',
						role: 'UX Designer',
						description:
							'Designed B2C retail and travel experiences through user research, service mapping, prototyping, responsive UI, usability testing and data analysis.',
						period: 'Jan 2020 – Nov 2021',
					},
					{
						company: 'Oowlish',
						industry: 'Software development company',
						role: 'Frontend Designer',
						description:
							'Designed and implemented responsive interfaces for Petco, creating reusable React components and design system patterns with Styled Components and Storybook.',
						period: 'Jun 2019 – Dec 2019',
					},
				],
			},
		},
	},
	'pt-BR': {
		seo: {
			homeTitle: 'Ariel Cavalcante · Designer de Produto',
			homeDescription:
				'Portfólio 2026 de Ariel Cavalcante, Designer de Produto com mais de 6 anos de experiência em produto, design systems, fintech e muito mais.',
			caseTitle: 'Somapay PF · Ariel Cavalcante',
			caseDescription:
				'+28% na avaliação da Google Play por meio de pesquisa e redesign de produto de ponta a ponta',
			somapayPjTitle: 'Somapay PJ · Ariel Cavalcante',
			somapayPjDescription:
				'Como a Somapay expandiu sua atuação para além da folha de pagamento com uma conta empresarial mobile para prestadores de serviço.',
			workerCreditTitle: 'Crédito do Trabalhador · Ariel Cavalcante',
			workerCreditDescription:
				'Estudo de caso de design de produto da experiência de Crédito do Trabalhador da Somapay.',
			vetPointTitle: 'VetPoint · Ariel Cavalcante',
			vetPointDescription:
				'Como os conceitos mobile iniciais da Petco se tornaram uma plataforma completa e responsiva para gestão de turnos veterinários, construída em React.',
			notFoundTitle: '404 · Ariel Cavalcante',
			notFoundDescription: 'A página solicitada não foi encontrada.',
		},
		nav: {
			primaryLabel: 'Navegação principal',
			home: 'Início',
			projects: 'Projetos',
			workerCredit: 'Crédito do Trabalhador',
			resume: 'Currículo',
			downloadResume: 'Baixar currículo em PDF',
			contact: 'Contato',
			menu: 'Menu',
			close: 'Fechar',
			language: 'Come to Brazil',
		},
		common: {
			skipToContent: 'Pular para o conteúdo principal',
			copyEmail: 'Copiar endereço de email',
			emailCopied: 'Email copiado!',
			dismissNotification: 'Clique para fechar.',
			client: 'Cliente',
			role: 'Meu papel',
			projects: 'Projetos',
			contacts: 'Contatos',
			home: 'Início',
		},
		caseDisclosure: {
			label: 'Aviso de confidencialidade',
			text: 'Este estudo de caso contém informações de projetos realizados sob acordos de confidencialidade (NDA). Alguns detalhes sensíveis foram alterados ou omitidos para respeitar esses compromissos. O conteúdo apresentado aqui reflete minhas análises e contribuições pessoais, não representando necessariamente as opiniões ou posicionamentos oficiais das empresas envolvidas.',
			thanks: 'Obrigado pelo seu tempo!',
		},
		home: {
			available: 'Disponível para trabalho',
			title: 'Design de Produto &\nSistemas de Design',
			intro:
				'Unindo design e engenharia com um toque daquele tempero cearense.',
			skills: [
				'Design Systems',
				'Estratégia de Produto',
				'Design de Interação',
				'Colaboração com Front-end',
				'Motion e Microinterações',
				'Acessibilidade',
			],
			projects: [
				{
					id: 'somapay-pf',
					client: 'Somapay',
					name: 'Somapay PF',
					title:
						'+28% na avaliação da Google Play por meio de pesquisa e redesign de produto de ponta a ponta',
					roles: [
						'Redesign de Produto',
						'Estratégia de Produto',
						'Entrevistas + Testes com Usuários',
						'Otimização de Processos',
					],
					cta: 'Ver estudo de caso',
					href: '/somapay-pf',
					art: '/assets/somapay/pf/card-art.svg',
					icon: '/assets/somapay/pf/app-icon.svg',
					available: true,
				},
				{
					id: 'somapay-pj',
					client: 'Somapay',
					name: 'Somapay PJ',
					title:
						'Expansão do portfólio para um novo público. A mesma base, uma identidade visual diferente',
					roles: [
						'Design de Produto de ponta a ponta',
						'Gestão da Equipe de Design',
						'Fundação do Sistema de Design',
						'Design de Interação',
					],
					cta: 'Ver estudo de caso',
					href: '/somapay-pj',
					art: '/assets/somapay/pj/card-art.svg',
					icon: '/assets/somapay/pj/app-icon.svg',
					available: true,
				},
				{
					id: 'vetpoint',
					client: 'Petco',
					name: 'Petco VetPoint',
					title:
						'Transformando conceitos mobile em uma plataforma completa e responsiva para gestão de turnos veterinários',
					roles: [
						'Design de Produto',
						'Design Responsivo',
						'Design Systems',
						'Desenvolvimento Front-end',
					],
					cta: 'Ver estudo de caso',
					href: '/vetpoint',
					art: '/assets/vetpoint/organized-home-screen.webp',
					icon: '/assets/vetpoint/vetpoint.svg',
					available: true,
				},
			],
			resume: {
				title: 'Currículo',
				startYear: '2019',
				endYear: '2026',
				downloadLabel: 'Baixar PDF',
				downloadHref: '/assets/ariel-cavalcante-curriculo.pdf',
				entries: [
					{
						company: 'Somapay',
						industry: 'Plataforma de banco digital e HRTech',
						role: 'Designer de Produto Sênior',
						description:
							'Liderei o design de ponta a ponta em crédito, pagamentos, onboarding, suporte e conta. Levei o Crédito do Trabalhador da descoberta ao lançamento, evoluí o design system e contribuí para um aumento de 28% na nota do app na Google Play.',
						period: 'Nov 2024 – 2026',
					},
					{
						company: 'Instituto Atlântico',
						industry: 'Consultoria de tecnologia e inovação',
						role: 'Designer UX',
						description:
							'Projetei produtos corporativos complexos para a Dell e outros clientes internacionais, passando por pesquisa, fluxos de usuário, prototipação, avaliações de acessibilidade, design systems e suporte à implementação.',
						period: 'Nov 2021 – Jul 2024',
					},
					{
						company: 'Garimpo UX',
						industry: 'Consultoria de UX',
						role: 'Designer UX',
						description:
							'Projetei experiências B2C para varejo e turismo por meio de pesquisa com usuários, mapeamento de serviços, prototipação, UI responsiva, testes de usabilidade e análise de dados.',
						period: 'Jan 2020 – Nov 2021',
					},
					{
						company: 'Oowlish',
						industry: 'Empresa de desenvolvimento de software',
						role: 'Designer Front-end',
						description:
							'Projetei e implementei interfaces responsivas para a Petco, criando componentes React reutilizáveis e padrões de design system com Styled-Components e Storybook.',
						period: 'Jun 2019 – Dez 2019',
					},
				],
			},
		},
	},
} as const;

export const somapayPjContent = {
	en: {
		hero: {
			title: 'A business account built for the people behind the business.',
			metrics: 'Lead Product Designer · iOS + Android · 10k+ Android installs',
			description:
				'I designed Somapay PJ, a mobile banking experience for independent contractors receiving payments through the Somapay ecosystem.',
		},
		intro: {
			label: 'Intro',
			blocks: [
				{
					title: 'Context',
					paragraphs: [
						'Somapay had already built a strong relationship with companies and salaried workers through payroll. Independent contractors were also receiving payments through the platform, but their experience ended at that transaction.',
						'Somapay PJ was created to turn that payment moment into an ongoing financial relationship, with a dedicated business account designed around how contractors actually work.',
					],
				},
				{
					title: 'The challenge',
					paragraphs: [
						'The new account needed to feel distinct enough for a different audience without losing the familiarity and trust already associated with Somapay. It also had to support the operational complexity behind business onboarding, document review and financial transactions.',
					],
				},
				{
					title: 'What I did',
					paragraphs: [
						'I led the product design work from definition through delivery, structuring the core journey and designing onboarding, account review, home, Pix, statements, receipts and the states around errors, limits and pending approvals.',
						'I stayed close to engineering throughout implementation, refining component behavior and interaction details as the experience moved from prototypes into production.',
					],
				},
				{
					title: 'Final result',
					paragraphs: [
						'Somapay PJ gave the company a dedicated entry point for a new audience and established reusable foundations for future financial services. The Android version reached more than 10,000 installations in its first year after public launch.',
					],
				},
			],
		},
		journey: {
			label: 'Core journey',
			intro:
				'The v1 experience was organized into four key moments, from the first interaction to the day-to-day use of the account. Each stage also considered situations that happen outside the ideal path.',
			steps: [
				{
					number: '01',
					title: 'Register',
					text: "Verify the company pre-registration, confirm the shareholder's identity, and introduce them to the app.",
				},
				{
					number: '02',
					title: 'Receive',
					text: 'View balance, payment history, account status, and the information needed to keep the business moving.',
				},
				{
					number: '03',
					title: 'Move money',
					text: 'Use Pix, statements, and receipts with clear limits, confirmations, and feedback.',
				},
				{
					number: '04',
					title: 'Get credit',
					text: 'Offer and display the available Extra Balance limit, allowing service providers to access credit and keep the business running even when a payment has not arrived yet.',
				},
			],
		},
		darkMode: {
			label: 'Dark mode',
			paragraphs: [
				'Research indicated that Somapay PJ’s main audience would be developers, IT specialists and other technology professionals working as independent contractors. For people who already spent much of their day in dark interfaces, supporting dark mode from the first release was a requirement rather than an optional enhancement.',
				'Instead of simply inverting the light theme, I designed both modes together from the start. Colors, contrast, hierarchy and interaction states were adjusted so the account remained accessible, familiar and recognizably Somapay in either environment.',
				'Both themes were built on the same semantic design tokens, allowing engineering to change surfaces and content consistently without maintaining two disconnected sets of rules. This gave the first release complete theme support and created a scalable foundation for the product to evolve.',
			],
			note: 'Move the pointer over the screen to compare the light and dark themes.',
			comparisonLabel: 'Somapay PJ light and dark mode comparison',
			darkAlt: 'Somapay PJ home screen using the dark theme.',
			lightAlt: 'Somapay PJ home screen using the light theme.',
		},
		system: {
			label: 'System thinking',
			paragraphs: [
				'The product needed its own identity, but not an entirely separate foundation. I reused the strongest patterns from the existing ecosystem and adapted hierarchy, color and behavior to the needs of a business account.',
				'Treating recurring decisions as reusable components kept onboarding, account status and transaction flows coherent while giving the team room to expand the product later.',
			],
		},
		delivery: {
			label: 'Design to product',
			paragraphs: [
				'The work continued beyond polished screens. I documented rules, alternative states and feedback behavior, then reviewed the implementation with engineering as real constraints surfaced.',
				'This collaboration kept the experience consistent across iOS and Android and reduced ambiguity in the most sensitive parts of the journey.',
			],
		},
		outcome: {
			label: 'Outcome',
			paragraphs: [
				'Somapay PJ expanded the product portfolio beyond payroll and created a clearer relationship with independent contractors after they were paid.',
				'More than a collection of screens, the project established a mobile product structure the company could continue evolving as new account and credit services became possible.',
			],
			metrics: [
				{
					value: '10k+',
					label: 'Android installs in the first year after launch',
				},
				{
					value: 'iOS + Android',
					label: 'One coherent experience across both platforms',
				},
				{
					value: 'End-to-end',
					label: 'From product definition to implementation support',
				},
			],
		},
	},
	'pt-BR': {
		hero: {
			title: 'Uma conta empresarial feita para quem faz o negócio acontecer.',
			metrics:
				'Lead Product Designer · iOS + Android · 10 mil+ instalações no Android',
			description:
				'Desenhei o Somapay PJ, uma experiência bancária mobile para prestadores de serviço que recebem pagamentos pelo ecossistema Somapay.',
		},
		intro: {
			label: 'Intro',
			blocks: [
				{
					title: 'Contexto',
					paragraphs: [
						'A Somapay já tinha uma relação sólida com empresas e trabalhadores assalariados por meio da folha de pagamento. Prestadores de serviço também recebiam pela plataforma, mas a experiência deles terminava naquela transação.',
						'O Somapay PJ nasceu para transformar esse momento de pagamento em uma relação financeira contínua, com uma conta empresarial pensada para a forma como esses profissionais trabalham.',
					],
				},
				{
					title: 'O desafio',
					paragraphs: [
						'A nova conta precisava ter personalidade suficiente para conversar com outro público sem perder a familiaridade e a confiança já associadas à Somapay. Também precisava lidar com a complexidade operacional do cadastro empresarial, da análise de documentos e das transações financeiras.',
					],
				},
				{
					title: 'O que eu fiz',
					paragraphs: [
						'Liderei o design de produto da definição à entrega, estruturando a jornada principal e desenhando onboarding, análise cadastral, tela inicial, Pix, extratos, comprovantes e os estados de erro, limite e aprovação pendente.',
						'Acompanhei a implementação de perto junto à engenharia, refinando o comportamento dos componentes e os detalhes de interação enquanto a experiência saía dos protótipos e chegava à produção.',
					],
				},
				{
					title: 'Resultado final',
					paragraphs: [
						'O Somapay PJ criou uma porta de entrada dedicada para um novo público e estabeleceu bases reutilizáveis para futuros serviços financeiros. A versão Android alcançou mais de 10 mil instalações no primeiro ano após o lançamento público.',
					],
				},
			],
		},
		journey: {
			label: 'Jornada principal',
			intro:
				'A experiência da v1 foi organizada em quatro momentos, do primeiro contato ao uso cotidiano da conta. Cada etapa também considerou as situações que acontecem fora do caminho ideal.',
			steps: [
				{
					number: '01',
					title: 'Cadastrar',
					text: 'Verificar o pré-cadastro da empresa, confirmar a identidade do sócio e introduzi-lo ao app.',
				},
				{
					number: '02',
					title: 'Receber',
					text: 'Visualizar saldo, extrato de pagamentos, status da conta e informações necessárias para manter o negócio em movimento.',
				},
				{
					number: '03',
					title: 'Movimentar',
					text: 'Usar Pix, extratos e comprovantes com limites, confirmações e feedback claros.',
				},
				{
					number: '04',
					title: 'Contratar',
					text: 'Oferecer e exibir limite de Saldo Extra, permitindo que prestadores de serviço contratem crédito para manter o negócio funcionando mesmo quando o pagamento ainda não chegou.',
				},
			],
		},
		darkMode: {
			label: 'Modo escuro',
			paragraphs: [
				'A pesquisa indicou que o público principal do Somapay PJ seria formado por desenvolvedores, profissionais de TI e outros especialistas de tecnologia que atuavam como prestadores de serviço. Para pessoas que já passavam boa parte do dia em interfaces escuras, oferecer o modo escuro desde a primeira versão era uma necessidade, não um aprimoramento opcional.',
				'Em vez de apenas inverter o tema claro, desenhei os dois modos em conjunto desde o início. Cores, contraste, hierarquia e estados de interação foram ajustados para que a conta continuasse acessível, familiar e reconhecível como Somapay nos dois ambientes.',
				'Os dois temas foram construídos sobre os mesmos design tokens semânticos, permitindo que a engenharia alterasse superfícies e conteúdos de forma consistente sem manter dois conjuntos desconectados de regras. Assim, a primeira versão já nasceu com suporte completo aos temas e uma base escalável para a evolução do produto.',
			],
			note: 'Passe o mouse sobre a tela para comparar os temas claro e escuro.',
			comparisonLabel: 'Comparação entre os modos claro e escuro do Somapay PJ',
			darkAlt: 'Tela inicial do Somapay PJ usando o tema escuro.',
			lightAlt: 'Tela inicial do Somapay PJ usando o tema claro.',
		},
		system: {
			label: 'Pensamento sistêmico',
			paragraphs: [
				'O produto precisava de uma identidade própria, mas não de uma base completamente separada. Reaproveitei os padrões mais sólidos do ecossistema existente e adaptei hierarquia, cor e comportamento às necessidades de uma conta empresarial.',
				'Transformar decisões recorrentes em componentes reutilizáveis manteve onboarding, status da conta e transações coerentes, além de dar espaço para o time expandir o produto depois.',
			],
		},
		delivery: {
			label: 'Do design ao produto',
			paragraphs: [
				'O trabalho continuou depois das telas refinadas. Documentei regras, estados alternativos e comportamentos de feedback, acompanhando a implementação com engenharia à medida que restrições reais apareciam.',
				'Essa colaboração manteve a experiência consistente entre iOS e Android e reduziu ambiguidades nos momentos mais sensíveis da jornada.',
			],
		},
		outcome: {
			label: 'Resultado',
			paragraphs: [
				'O Somapay PJ expandiu o portfólio para além da folha de pagamento e criou uma relação mais clara com os prestadores de serviço depois do recebimento.',
				'Mais do que um conjunto de telas, o projeto estabeleceu uma estrutura de produto mobile que a empresa poderia continuar evoluindo à medida que novos serviços de conta e crédito se tornassem possíveis.',
			],
			metrics: [
				{
					value: '10 mil+',
					label: 'Instalações no Android no primeiro ano após o lançamento',
				},
				{
					value: 'iOS + Android',
					label: 'Uma experiência coerente entre as duas plataformas',
				},
				{
					value: 'Ponta a ponta',
					label: 'Da definição do produto ao apoio à implementação',
				},
			],
		},
	},
} as const;

export const vetPointContent = {
	en: {
		hero: {
			title:
				'Turning product concepts into a complete veterinary staffing platform.',
			metrics: '3 platforms · 5 core workflows · 1,900+ hospitals & clinics',
			lede: 'I expanded Petco’s initial mobile concepts into production-ready flows, edge cases, detailed views and responsive desktop experiences. Then I built much of it in React.',
		},
		galleryLabel: 'VetPoint product walkthrough',
		intro: {
			label: 'Intro',
			term: {
				label: 'relief veterinarians',
				definition:
					'A veterinarian who temporarily fills in for permanent staff and typically works across multiple hospitals.',
				triggerLabel: 'Learn what a relief veterinarian is',
			},
			blocks: [
				{
					title: 'Context',
					paragraphs: [
						'Petco operates a large veterinary care network that includes vaccination clinics and full-service hospitals across the United States.',
						'VetPoint helps relief veterinarians find open shifts across that network, compare opportunities, submit bids, manage upcoming shifts, maintain professional credentials and review completed work.',
					],
				},
				{
					title: 'The challenge',
					paragraphs: [
						'Petco had already established the initial visual direction through mobile concepts for a few primary screens and components.',
						'Those concepts established how the product should look, but did not yet cover the full operational experience. The platform still needed alternative states, complex details, responsive behavior and the many exceptions created by real scheduling and bidding workflows.',
					],
				},
				{
					title: 'What I did',
					paragraphs: [
						'I turned a limited set of mobile concepts into a more complete product system, designing missing flows, secondary pages, edge cases, transactional emails (welcome, confirmation, password reset, etc.) and responsive desktop versions across device sizes. I also implemented much of the interface in React with CSS and Styled Components, testing design decisions against real content and component constraints.',
					],
				},
				{
					title: 'Outcome',
					paragraphs: [
						'The responsive web version I worked on shipped in under 6 months, expanding VetPoint from a small set of concept screens into a complete veterinary staffing platform.',
						'It supported 5 core workflows across a network of approximately 300 hospitals and 1,600 weekly clinics.',
					],
				},
			],
		},
		images: [
			{
				src: '/assets/vetpoint/easy-login.webp',
				alt: 'VetPoint mobile login screen introducing the veterinary staffing platform.',
				caption: 'Easy login',
			},
			{
				src: '/assets/vetpoint/organized-home-screen.webp',
				alt: 'VetPoint mobile home screen showing an upcoming veterinary shift and yearly totals.',
				caption: 'Organized home screen',
			},
			{
				src: '/assets/vetpoint/streamlined-bidding.webp',
				alt: 'VetPoint open shifts screen with filters and bid inputs.',
				caption: 'Streamlined bidding',
			},
			{
				src: '/assets/vetpoint/quick-shift-details.webp',
				alt: 'VetPoint mobile screen displaying expanded details for veterinary shifts.',
				caption: 'Quick shift details',
			},
			{
				src: '/assets/vetpoint/place-your-bids.webp',
				alt: 'VetPoint bid confirmation screen with editable bid amounts.',
				caption: 'Place your bids',
			},
			{
				src: '/assets/vetpoint/submit-your-bids.webp',
				alt: 'VetPoint confirmation screen shown after bids are submitted.',
				caption: 'Submit your bids',
			},
			{
				src: '/assets/vetpoint/manage-your-bids.webp',
				alt: 'VetPoint screen for filtering and managing past bids.',
				caption: 'Manage your bids',
			},
		],
		sections: {
			challenge: {
				label: 'The challenge',
				quote:
					'The work was less about inventing a visual language from scratch and more about making an early concept complete, scalable and ready to build.',
				paragraphs: [
					'The initial material covered key screens, but not the many alternative states required by a staffing and bidding platform: empty states, validation, loading, failures, expired opportunities, bid changes, credential requirements, desktop behavior and information-dense detail pages.',
				],
			},
			role: {
				label: 'My role',
				cards: [
					{
						title: 'Product expansion',
						text: 'Mapped missing states, edge cases and secondary flows around shifts, bids, schedules and profile requirements.',
					},
					{
						title: 'Responsive design',
						text: 'Translated mobile-first concepts into desktop layouts without simply stretching the original screens.',
					},
					{
						title: 'Frontend implementation',
						text: 'Implemented interfaces in React with Styled Components, reducing the gap between design intent and production behavior.',
					},
				],
			},
			approach: {
				label: 'Approach',
				paragraphs: [
					'I audited each supplied screen and treated it as one state within a larger system. For every component and flow, I asked what happened before, after and when something went wrong.',
					'This produced a broader set of patterns for status, filtering, forms, tables, cards, confirmations, errors and navigation. Reusing them kept the platform consistent while also speeding up implementation.',
				],
			},
			workstreams: {
				label: 'Key workflows',
				paragraphs: [
					'The core experience had to help veterinarians move from finding an opportunity to committing to it with enough context to make confident decisions. I worked through different shift statuses, bid values, pending and accepted states, filters, confirmations and follow-up actions.',
					'Desktop versions increased information density and made comparison easier, while mobile layouts preserved focus and clarity for veterinarians checking opportunities on the go.',
				],
			},
			engineering: {
				label: 'Design engineering',
				paragraphs: [
					'Because the same team designed and implemented much of the interface, interaction details could be validated earlier. Responsive behavior, component constraints and real content were considered during design instead of being deferred to handoff.',
					'This reduced interpretation loss and helped turn Sketch files into maintainable React components rather than isolated screens.',
				],
			},
			outcome: {
				label: 'Outcome',
				paragraphs: [
					'VetPoint evolved from a limited set of concept screens into a cross-platform experience capable of supporting real veterinary staffing workflows. The final product included mobile and desktop views, detailed operational states and reusable frontend patterns.',
					'The responsive web experience and its reusable patterns later became the foundation for VetPoint’s mobile app, built in React Native.',
					'The public platform now supports opportunity discovery, bidding, profile and credential management, upcoming shift tracking and reviews of completed work.',
				],
			},
		},
	},
	'pt-BR': {
		hero: {
			title:
				'Transformando conceitos de produto em uma plataforma completa de gestão de turnos veterinários.',
			metrics:
				'3 plataformas · 5 fluxos principais · 1.900+ hospitais e clínicas',
			lede: 'Expandi os conceitos mobile iniciais da Petco em fluxos prontos para produção, casos de exceção, telas detalhadas e experiências responsivas para desktop. Depois, implementei boa parte em React.',
		},
		galleryLabel: 'Visão geral do produto VetPoint',
		intro: {
			label: 'Intro',
			term: {
				label: 'veterinários temporários',
				definition:
					'Veterinários que substituem temporariamente profissionais fixos e costumam trabalhar em diferentes hospitais.',
				triggerLabel: 'Saiba o que são veterinários temporários',
			},
			blocks: [
				{
					title: 'Contexto',
					paragraphs: [
						'A Petco opera uma ampla rede de cuidados veterinários, incluindo clínicas de vacinação e hospitais veterinários com atendimento completo nos Estados Unidos.',
						'O VetPoint ajuda veterinários temporários a encontrar turnos disponíveis nessa rede, avaliar cada oportunidade, enviar propostas, gerenciar os próximos trabalhos, manter suas credenciais profissionais e avaliar as experiências concluídas.',
					],
				},
				{
					title: 'O desafio',
					paragraphs: [
						'A Petco já havia definido a direção visual inicial por meio de conceitos mobile para algumas telas e componentes principais.',
						'Esses conceitos definiam a aparência do produto, mas ainda não cobriam toda a experiência operacional. A plataforma precisava de estados alternativos, detalhes complexos, comportamento responsivo e suporte às muitas exceções criadas por fluxos reais de agendamento e propostas.',
					],
				},
				{
					title: 'O que eu fiz',
					paragraphs: [
						'Transformei um conjunto limitado de conceitos mobile em um sistema de produto mais completo, projetando fluxos ausentes, páginas secundárias, casos de exceção, emails transacionais (boas-vindas, confirmação, redefinição de senha etc.) e versões responsivas para desktop. Também implementei grande parte da interface em React com CSS e Styled Components, validando decisões de design com conteúdo real e restrições dos componentes.',
					],
				},
				{
					title: 'Resultado final',
					paragraphs: [
						'A versão web responsiva em que trabalhei foi lançada em menos de 6 meses, levando o VetPoint de um pequeno conjunto de telas conceituais a uma plataforma completa de gestão de turnos veterinários.',
						'Ela passou a atender 5 fluxos principais em uma rede de aproximadamente 300 hospitais e 1.600 clínicas semanais.',
					],
				},
			],
		},
		images: [
			{
				src: '/assets/vetpoint/easy-login.webp',
				alt: 'Tela de login mobile do VetPoint apresentando a plataforma de alocação de veterinários.',
				caption: 'Login simples',
			},
			{
				src: '/assets/vetpoint/organized-home-screen.webp',
				alt: 'Tela inicial mobile do VetPoint mostrando um próximo turno veterinário e totais anuais.',
				caption: 'Tela inicial organizada',
			},
			{
				src: '/assets/vetpoint/streamlined-bidding.webp',
				alt: 'Tela de turnos abertos do VetPoint com filtros e campos para propostas.',
				caption: 'Propostas simplificadas',
			},
			{
				src: '/assets/vetpoint/quick-shift-details.webp',
				alt: 'Tela mobile do VetPoint exibindo detalhes expandidos de turnos veterinários.',
				caption: 'Detalhes do turno',
			},
			{
				src: '/assets/vetpoint/place-your-bids.webp',
				alt: 'Tela de confirmação de propostas do VetPoint com valores editáveis.',
				caption: 'Faça suas propostas',
			},
			{
				src: '/assets/vetpoint/submit-your-bids.webp',
				alt: 'Tela de confirmação do VetPoint exibida após o envio das propostas.',
				caption: 'Envie suas propostas',
			},
			{
				src: '/assets/vetpoint/manage-your-bids.webp',
				alt: 'Tela do VetPoint para filtrar e gerenciar propostas anteriores.',
				caption: 'Gerencie suas propostas',
			},
		],
		sections: {
			challenge: {
				label: 'O desafio',
				quote:
					'O trabalho não era tanto criar uma linguagem visual do zero, mas tornar um conceito inicial completo, escalável e viável para produção.',
				paragraphs: [
					'O material inicial cobria telas importantes, mas não os muitos estados alternativos exigidos por uma plataforma de turnos e propostas: estados vazios, validação, carregamento, falhas, oportunidades expiradas, alterações de propostas, requisitos de credenciais, comportamento em desktop e páginas detalhadas com alta densidade de informação.',
				],
			},
			role: {
				label: 'Meu papel',
				cards: [
					{
						title: 'Expansão do produto',
						text: 'Mapeei estados ausentes, casos de exceção e fluxos secundários relacionados a turnos, propostas, agendas e requisitos de perfil.',
					},
					{
						title: 'Design responsivo',
						text: 'Adaptei conceitos mobile-first para layouts desktop sem simplesmente ampliar as telas originais.',
					},
					{
						title: 'Implementação frontend',
						text: 'Implementei interfaces em React com Styled Components, reduzindo a distância entre a intenção do design e o comportamento em produção.',
					},
				],
			},
			approach: {
				label: 'Abordagem',
				paragraphs: [
					'Auditei cada tela fornecida e a tratei como um estado dentro de um sistema maior. Para cada componente e fluxo, perguntei o que acontecia antes, depois e quando algo desse errado.',
					'Isso produziu um conjunto mais amplo de padrões para status, filtros, formulários, tabelas, cards, confirmações, erros e navegação. Reutilizá-los manteve a plataforma consistente e também acelerou a implementação.',
				],
			},
			workstreams: {
				label: 'Fluxos principais',
				paragraphs: [
					'A experiência principal precisava ajudar veterinários a passar da descoberta de uma oportunidade ao compromisso com contexto suficiente para tomar decisões seguras. Trabalhei com diferentes status de turnos, valores de propostas, estados pendentes e aceitos, filtros, confirmações e ações posteriores.',
					'As versões desktop aumentaram a densidade de informação e facilitaram comparações, enquanto os layouts mobile preservaram foco e clareza para veterinários consultando oportunidades em movimento.',
				],
			},
			engineering: {
				label: 'Engenharia de design',
				paragraphs: [
					'Como a mesma equipe projetou e implementou grande parte da interface, os detalhes de interação puderam ser validados mais cedo. O comportamento responsivo, as restrições dos componentes e o conteúdo real foram considerados durante o design, em vez de serem deixados para o handoff.',
					'Isso reduziu perdas de interpretação e ajudou a transformar arquivos do Sketch em componentes React manuteníveis, em vez de telas isoladas.',
				],
			},
			outcome: {
				label: 'Resultado',
				paragraphs: [
					'O VetPoint evoluiu de um conjunto limitado de telas conceituais para uma experiência multiplataforma capaz de sustentar fluxos reais de gestão de turnos veterinários. O produto final incluiu visualizações mobile e desktop, estados operacionais detalhados e padrões frontend reutilizáveis.',
					'A experiência web responsiva e seus padrões reutilizáveis serviram posteriormente de base para o aplicativo mobile do VetPoint, desenvolvido em React Native.',
					'A plataforma pública agora oferece descoberta de oportunidades, propostas, gestão de perfil e credenciais, acompanhamento de próximos turnos e avaliações de trabalhos concluídos.',
				],
			},
		},
	},
} as const;

export function pathWithoutLocale(pathname: string) {
	const cleanPath = pathname.replace(/^\/br(?=\/|$)/, '');

	return cleanPath === '' ? '/' : cleanPath;
}

export function localizedPath(locale: Locale, path: string) {
	// Remove locale prefix if present
	let cleanPath = path.replace(/^\/br\/?/, '') || '/';
	const normalized =
		cleanPath === '/' ? '/' : `/${cleanPath.replace(/^\/+|\/+$/g, '')}`;
	return locale === 'pt-BR'
		? normalized === '/'
			? '/br/'
			: `/br${normalized}`
		: normalized;
}
