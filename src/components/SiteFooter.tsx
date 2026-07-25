import type { Locale } from "../content"
import { contact, localizedPath, siteContent } from "../content"
import { FooterCrabGame } from "./FooterCrabGame"

type SiteFooterProps = {
    locale: Locale
}

export function SiteFooter({ locale }: SiteFooterProps) {
    const content = siteContent[locale]

    return (
        <footer className="site-footer">
            <div className="site-footer__inner">
                <div className="footer-brand">
                    <a
                        href={localizedPath(locale, "/")}
                        className="footer-mark"
                        aria-label={content.nav.home}
                    >
                        <img src="/assets/icons/logo/ariel cavalcante logo.svg" alt="" />
                    </a>
                    <FooterCrabGame locale={locale} />
                </div>

                <div className="footer-columns">
                    <section>
                        <h2>{content.common.projects}</h2>
                        <a href={localizedPath(locale, "/somapay-pf")}>Somapay PF</a>
                        <span className="muted-link">Somapay PJ</span>
                    </section>
                    <section>
                        <h2>{content.common.contacts}</h2>
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                        <a href={contact.phoneHref} target="_blank" rel="noreferrer">
                            {contact.phoneLabel}
                        </a>
                    </section>
                </div>
            </div>
        </footer>
    )
}
