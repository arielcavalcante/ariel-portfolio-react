import type { Locale } from "../content"
import { localizedPath, siteContent } from "../content"
import { SiteFooter } from "../components/SiteFooter"
import { SiteHeader } from "../components/SiteHeader"

type NotFoundPageProps = {
    locale: Locale
}

export function NotFoundPage({ locale }: NotFoundPageProps) {
    const content = siteContent[locale]

    return (
        <div className="page-shell not-found-page">
            <SiteHeader locale={locale} currentPage="404" />
            <main className="not-found page-width">
                <div className="not-found__number">404</div>
                <img className="not-found__mark" src="/assets/ariel-mark.svg" alt="" />
                <a className="case-link" href={localizedPath(locale, "/")}>
                    <span>{content.common.home}</span>
                    <span aria-hidden="true">↗</span>
                </a>
            </main>
            <SiteFooter locale={locale} />
        </div>
    )
}
