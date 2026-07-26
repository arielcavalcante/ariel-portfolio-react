import type { MouseEventHandler } from 'react';

type Locale = 'en' | 'pt-BR';

type LanguageSwitchProps = {
	locale: Locale;
	languageHref: string;
	label: string;
	className?: string;
	onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export default function LanguageSwitch({
	locale,
	languageHref,
	label,
	className = '',
	onClick,
}: LanguageSwitchProps) {
	const isEnglish = locale === 'en';

	const classes = ['language-switch', isEnglish ? '' : ' active', className]
		.filter(Boolean)
		.join(' ');

	return (
		<a
			className={classes}
			href={languageHref}
			hrefLang={isEnglish ? 'pt-BR' : 'en'}
			onClick={onClick}
			aria-label={
				isEnglish ? 'Mudar idioma para português' : 'Switch language to English'
			}
		>
			<span>{label}</span>

			<span className='language-switch__track' aria-hidden='true'>
				<span className='language-switch__thumb' />
			</span>
		</a>
	);
}
