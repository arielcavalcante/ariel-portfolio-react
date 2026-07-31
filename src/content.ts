export type Locale = 'en' | 'pt-BR';

export const contact = {
	email: 'hello@arielcavalcante.com',
	phoneLabel: '+55 85 9 9918 8678',
	phoneHref: 'https://wa.me/+5585999188678',
	linkedinLabel: 'Ariel Cavalcante',
	linkedinHref: 'https://linkedin.com/in/arielcavalcante',
};

export const siteContent = {
	en: {
		seo: {
			homeTitle: 'Ariel Cavalcante · Product Designer',
			homeDescription:
				'2026 portfolio of product designer Ariel Cavalcante. Offering 6 plus years of design and product expertise in design system, fintech and more.',
			caseTitle: 'Somapay PF · Ariel Cavalcante',
			caseDescription:
				'+24% increase in Play Store rating through research and end-to-end product redesign',
			workerCreditTitle: 'Crédito do Trabalhador · Ariel Cavalcante',
			workerCreditDescription:
				'Product design case study for Somapay’s Crédito do Trabalhador experience.',
			notFoundTitle: '404 · Ariel Cavalcante',
			notFoundDescription: 'The requested page could not be found.',
		},
		nav: {
			primaryLabel: 'Primary navigation',
			home: 'Home',
			projects: 'Projects',
			resume: 'Resume',
			downloadResume: 'Download resume PDF',
			contact: 'Contact',
			menu: 'Menu',
			close: 'Close',
			language: 'Come to Brazil',
		},
		common: {
			skipToContent: 'Skip to main content',
			client: 'Client',
			role: 'My role',
			projects: 'Projects',
			home: 'Home',
		},
		home: {
			available: 'Available for work',
			title: 'Product Design &\nDesign Systems',
			intro:
				'Bridging the gap between design & engineering with a touch of that Brazilian sauce.',
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
						'+24% increase in Play Store rating through research and end-to-end product redesign',
					roles: [
						'Product Redesign',
						'Product Strategy',
						'User Interviews + User Tests',
						'Process Optimization',
					],
					cta: 'View Case Study',
					href: '/somapay-pf',
					art: '/assets/somapay-pf-art.svg',
					icon: '/assets/somapay-pf-icon.svg',
					available: true,
				},
				{
					id: 'somapay-pj',
					client: 'Somapay',
					name: 'Somapay PJ',
					title:
						"Expanded the company's portfolio for another target audience. Same base, different aesthetics",
					roles: [
						'End-to-end Product Design',
						'Design Team Management',
						'Design System Foundation',
						'Interaction Design',
					],
					cta: 'Coming soon!',
					href: '',
					art: '/assets/somapay-pj-art.svg',
					icon: '/assets/somapay-pj-icon.svg',
					available: false,
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
							'Led end-to-end design across credit, payments, onboarding, support, and account experiences. Built Crédito do Trabalhador from discovery to launch, evolved the design system, and contributed to a 28% increase in the app’s Google Play rating.',
						period: 'Nov 2024 – 2026',
					},
					{
						company: 'Instituto Atlântico',
						industry: 'Technology and innovation consultancy',
						role: 'UX Designer',
						description:
							'Designed complex enterprise products for Dell and other international clients, covering research, user flows, prototyping, accessibility assessments, design systems, and implementation support.',
						period: 'Nov 2021 – Jul 2024',
					},
					{
						company: 'Garimpo UX',
						industry: 'UX consultancy',
						role: 'UX Designer',
						description:
							'Designed B2C retail and travel experiences through user research, service mapping, prototyping, responsive UI, usability testing, and data analysis.',
						period: 'Jan 2020 – Nov 2021',
					},
					{
						company: 'Oowlish',
						industry: 'Software development company',
						role: 'Frontend Designer',
						description:
							'Designed and implemented responsive interfaces for Petco, building reusable React components and design system patterns with Styled-Components and Storybook.',
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
				'Portfólio de 2026 do designer de produto Ariel Cavalcante. Mais de 6 anos de experiência em design e produto, incluindo design systems, fintech e muito mais.',
			caseTitle: 'Somapay PF · Ariel Cavalcante',
			caseDescription:
				'+24% de aumento na nota da Play Store por meio de pesquisa e redesign de produto de ponta a ponta',
			workerCreditTitle: 'Crédito do Trabalhador · Ariel Cavalcante',
			workerCreditDescription:
				'Estudo de caso de design de produto da experiência de Crédito do Trabalhador da Somapay.',
			notFoundTitle: '404 · Ariel Cavalcante',
			notFoundDescription: 'A página solicitada não foi encontrada.',
		},
		nav: {
			primaryLabel: 'Navegação principal',
			home: 'Início',
			projects: 'Projetos',
			resume: 'Currículo',
			downloadResume: 'Baixar currículo em PDF',
			contact: 'Contato',
			menu: 'Menu',
			close: 'Fechar',
			language: 'Come to Brazil',
		},
		common: {
			skipToContent: 'Pular para o conteúdo principal',
			client: 'Cliente',
			role: 'Meu papel',
			projects: 'Projetos',
			contacts: 'Contatos',
			home: 'Início',
		},
		home: {
			available: 'Disponível para trabalho',
			title: 'Design de Produto &\nSistemas de Design',
			intro:
				'Unindo design e engenharia com um toque daquele tempero cearense.',
			skills: [
				'Design Systems',
				'Product Strategy',
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
						'+24% de aumento na nota da Play Store por meio de pesquisa e redesign de produto de ponta a ponta',
					roles: [
						'Redesign de Produto',
						'Estratégia de Produto',
						'Entrevistas + Testes com Usuários',
						'Otimização de Processos',
					],
					cta: 'Ver estudo de caso',
					href: '/somapay-pf',
					art: '/assets/somapay-pf-art.svg',
					icon: '/assets/somapay-pf-icon.svg',
					available: true,
				},
				{
					id: 'somapay-pj',
					client: 'Somapay',
					name: 'Somapay PJ',
					title:
						'Expansão do portfólio da empresa para outro público-alvo. A mesma base, uma estética diferente',
					roles: [
						'Design de Produto de ponta a ponta',
						'Gestão da Equipe de Design',
						'Fundação do Sistema de Design',
						'Design de Interação',
					],
					cta: 'Em breve!',
					href: '',
					art: '/assets/somapay-pj-art.svg',
					icon: '/assets/somapay-pj-icon.svg',
					available: false,
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
							'Liderei o design de ponta a ponta em experiências de crédito, pagamentos, onboarding, suporte e conta. Construí o Crédito do Trabalhador da descoberta ao lançamento, evoluí o design system e contribuí para um aumento de 28% na avaliação do app na Google Play.',
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
