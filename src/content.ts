export type Locale = 'en' | 'pt-BR';

export const contact = {
	email: 'hello@arielcavalcante.com',
	phoneLabel: '+55 85 9 9918 8678',
	phoneHref: 'https://wa.me/+5585999188678',
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
			notFoundTitle: '404 · Ariel Cavalcante',
		},
		nav: {
			home: 'Home',
			projects: 'Projects',
			contact: 'Contact',
			menu: 'Menu',
			close: 'Close',
			language: 'Come to Brazil',
		},
		common: {
			client: 'Client',
			role: 'My role',
			projects: 'Projects',
			contacts: 'Contacts',
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
					cta: 'VIEW CASE STUDY',
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
			notFoundTitle: '404 · Ariel Cavalcante',
		},
		nav: {
			home: 'Início',
			projects: 'Projetos',
			contact: 'Contato',
			menu: 'Menu',
			close: 'Fechar',
			language: 'Come to Brazil',
		},
		common: {
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
					cta: 'VER ESTUDO DE CASO',
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
