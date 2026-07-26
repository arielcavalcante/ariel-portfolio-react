type ProjectCardProps = {
    labels: {
        client: string
        role: string
    }
    project: {
        id: string
        client: string
        name: string
        title: string
        roles: readonly string[]
        cta: string
        href: string
        art: string
        icon: string
        available: boolean
    }
}

export function ProjectCard({ labels, project }: ProjectCardProps) {
    return (
        <article
            className={`project-card project-card--${project.id}`}
            id={project.id}
            aria-labelledby={`${project.id}-title`}
        >
            <div className="project-card__visual">
                <img src={project.art} alt="" />
            </div>

            <div className="project-card__content">
                <div className="project-card__metadata">
                    <div>
                        <span className="micro-label">{labels.client}</span>
                        <p>{project.client}</p>
                    </div>
                    <div>
                        <span className="micro-label">{labels.role}</span>
                        <ul>
                            {project.roles.map((role) => (
                                <li key={role}>{role}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="project-card__summary">
                    <div className="project-card__name">
                        <img src={project.icon} alt="" />
                        <h2 id={`${project.id}-title`}>{project.name}</h2>
                    </div>
                    <h3>{project.title}</h3>
                    {project.available ? (
                        <a className="case-link" href={project.href}>
                            <span>{project.cta}</span>
                            <span className="case-link__icon" aria-hidden="true" />
                        </a>
                    ) : (
                        <span className="coming-soon">
                            <span>{project.cta}</span>
                            <span className="case-link__icon" aria-hidden="true" />
                        </span>
                    )}
                </div>
            </div>
        </article>
    )
}
