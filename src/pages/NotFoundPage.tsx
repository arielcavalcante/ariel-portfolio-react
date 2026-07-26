import { useState } from "react"
import { localizedPath, siteContent, type Locale } from "../content"
import { SiteFooter } from "../components/SiteFooter"
import { SiteHeader } from "../components/SiteHeader"

type NotFoundPageProps = {
    locale: Locale
}

export function NotFoundPage({ locale }: NotFoundPageProps) {
    const [animationRun] = useState(() => Date.now())
    const content = siteContent[locale]

    return (
        <div className="page-shell not-found-page">
            <a className="skip-link" href="#main-content">
                {content.common.skipToContent}
            </a>
            <SiteHeader locale={locale} currentPage="404" />
            <main className="not-found" id="main-content" tabIndex={-1}>
                <h1 className="visually-hidden">{content.seo.notFoundDescription}</h1>
                <a
                    className="not-found__home-link"
                    href={localizedPath(locale, "/")}
                    aria-label={locale === "pt-BR" ? "Voltar ao início" : "Return home"}
                >
                    <img
                        className="not-found__icon"
                        src={`/assets/icons/404.svg?play=${animationRun}`}
                        alt=""
                    />
                </a>
            </main>
            <SiteFooter locale={locale} />
        </div>
    )
}
