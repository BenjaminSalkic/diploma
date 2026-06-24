const DEFAULT_API_BASE = 'http://localhost:8080'

function buildImageUrl(path) {
  if (!path) {
    return ''
  }
  if (path.startsWith('http')) {
    return path
  }
  const base = import.meta.env.VITE_API_URL || DEFAULT_API_BASE
  return `${base}${path}`
}

export default function ProjectsVariant5({ projects, theme, font }) {
  if (!projects || projects.length === 0) {
    return null
  }

  const backgroundColor = theme?.backgroundColor ?? '#ffffff'
  const textColor = theme?.textColor ?? '#111111'
  const headingFont = font?.heading ?? 'Inter, system-ui, sans-serif'
  const bodyFont = font?.body ?? 'Roboto, system-ui, sans-serif'

  return (
    <section className="project5-stage" style={{ backgroundColor, color: textColor }}>
      <div className="project5-list">
        {projects.map((project, index) => {
          const imageSource = project.imageUrls?.length
            ? project.imageUrls[0]
            : project.imageUrl
          const imageUrl = buildImageUrl(imageSource)
          const isEven = index % 2 === 0
          const number = String(index + 1).padStart(2, '0')

          return (
            <div
              key={project.id || `${project.name}-${index}`}
              className={`project5-item${isEven ? ' is-left' : ' is-right'}`}
            >
              <div className="project5-text" style={{ fontFamily: headingFont }}>
                <div className="project5-number" style={{ fontFamily: bodyFont }}>
                  {number}
                </div>
                <div className="project5-name">{project.name || `Project ${index + 1}`}</div>
              </div>
              <div className="project5-media">
                {imageUrl ? (
                  <img
                    className="project5-image"
                    src={imageUrl}
                    alt={project.name}
                    loading="lazy"
                  />
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
