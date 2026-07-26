import { useState } from "react"
import { localizedPath, type Locale } from "../content"
import { SiteFooter } from "../components/SiteFooter"
import { SiteHeader } from "../components/SiteHeader"

type NotFoundPageProps = {
    locale: Locale
}

export function NotFoundPage({ locale }: NotFoundPageProps) {
    const [animationRun] = useState(() => Date.now())

    return (
        <div className="page-shell not-found-page">
            <SiteHeader locale={locale} currentPage="404" />
            <main className="not-found">
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
