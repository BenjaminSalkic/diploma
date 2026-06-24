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

export default function ProjectsVariant1({ projects, theme, font }) {
  if (!projects || projects.length === 0) {
    return null
  }

  const backgroundColor = theme?.backgroundColor ?? '#ffffff'
  const textColor = theme?.textColor ?? '#111111'
  const primaryColor = theme?.primaryColor ?? '#2563eb'
  const headingFont = font?.heading ?? 'Inter, system-ui, sans-serif'
  const bodyFont = font?.body ?? 'Roboto, system-ui, sans-serif'

  return (
    <section className="py-20" style={{ backgroundColor, color: textColor }}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center">
          <p
            className="text-xs uppercase tracking-[0.3em]"
            style={{ color: primaryColor, fontFamily: bodyFont }}
          >
            Selected projects
          </p>
          <div className="mt-6 h-16 w-px" style={{ backgroundColor: primaryColor }} />
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-24 px-6">
        {projects.map((project, index) => {
          const imageSource = project.imageUrls?.length
            ? project.imageUrls[0]
            : project.imageUrl
          const imageUrl = buildImageUrl(imageSource)
          const isEven = index % 2 === 0

          return (
            <div key={project.id} className="grid items-center gap-10 md:grid-cols-2">
              <div className={isEven ? 'order-2 md:order-2' : 'order-2 md:order-1'}>
                {imageUrl ? (
                  <img
                    className="w-full rounded-none object-cover"
                    src={imageUrl}
                    alt={project.name}
                    loading="lazy"
                  />
                ) : null}
              </div>
              <div className={isEven ? 'order-1 md:order-1' : 'order-1 md:order-2'}>
                <p
                  className="text-xs uppercase tracking-[0.3em]"
                  style={{ color: primaryColor, fontFamily: bodyFont }}
                >
                  Website
                </p>
                <h3
                  className="mt-3 text-3xl font-medium sm:text-4xl"
                  style={{ fontFamily: headingFont }}
                >
                  {project.name}
                </h3>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
