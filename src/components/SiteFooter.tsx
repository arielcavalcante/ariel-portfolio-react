import type { Locale } from '../content';
import { contact, localizedPath, siteContent } from '../content';
import { FooterCrabGame } from './FooterCrabGame';

const crabGameSounds = {
	hit: '/assets/soundfx/hit.wav',
	win: '/assets/soundfx/victory.wav',
	lose: '/assets/soundfx/defeat.wav',
};

type SiteFooterProps = {
	locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
	const content = siteContent[locale];

	return (
		<footer className='site-footer' id='contact'>
			<div className='site-footer__inner'>
				<div className='footer-brand'>
					<a
						href={localizedPath(locale, '/')}
						className='footer-mark'
						aria-label={content.nav.home}
					>
						<img src='/assets/icons/logo/ariel cavalcante logo.svg' alt='' />
					</a>
					<FooterCrabGame locale={locale} sounds={crabGameSounds} />
				</div>

				<div className='footer-columns'>
					<section>
						<a className='footer-contact-link' href={`mailto:${contact.email}`}>
							<span
								className='footer-contact-link__icon footer-contact-link__icon--mail'
								aria-hidden='true'
							/>
							<span>{contact.email}</span>
						</a>
						<a
							className='footer-contact-link'
							href={contact.phoneHref}
							target='_blank'
							rel='noreferrer'
						>
							<span
								className='footer-contact-link__icon footer-contact-link__icon--whatsapp'
								aria-hidden='true'
							/>
							{contact.phoneLabel}
						</a>
						<a
							className='footer-contact-link'
							href={contact.linkedinHref}
							target='_blank'
							rel='noreferrer'
						>
							<span
								className='footer-contact-link__icon footer-contact-link__icon--linkedin'
								aria-hidden='true'
							/>
							{contact.linkedinLabel}
						</a>
					</section>
				</div>
			</div>
		</footer>
	);
}
