import { useEffect, useMemo, useRef, useState } from 'react'

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

function seededRandom(seed) {
  let value = seed % 2147483647
  if (value <= 0) value += 2147483646
  return () => {
    value = (value * 16807) % 2147483647
    return (value - 1) / 2147483646
  }
}

function buildScatter(imageCount, seed) {
  const rand = seededRandom(seed)
  return Array.from({ length: imageCount }).map(() => {
    const top = 10 + rand() * 70
    const left = 8 + rand() * 70
    const size = 120 + rand() * 180
    return { top, left, size }
  })
}

export default function ProjectsVariant2({ projects, theme, font }) {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const textColor = theme?.textColor ?? '#111111'
  const backgroundColor = theme?.backgroundColor ?? '#ffffff'
  const primaryColor = theme?.primaryColor ?? '#2563eb'
  const headingFont = font?.heading ?? 'Inter, system-ui, sans-serif'
  const bodyFont = font?.body ?? 'Roboto, system-ui, sans-serif'

  const normalizedProjects = useMemo(() => {
    return (projects || []).map((project) => {
      const images = project.imageUrls?.length
        ? project.imageUrls
        : project.imageUrl
          ? [project.imageUrl]
          : []
      return {
        ...project,
        images,
      }
    })
  }, [projects])

  useEffect(() => {
    if (!sectionRef.current || normalizedProjects.length === 0) {
      return
    }

    const panels = Array.from(sectionRef.current.querySelectorAll('[data-project-panel]'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setActiveIndex(index)
          }
        })
      },
      { threshold: 0.6 },
    )

    panels.forEach((panel) => observer.observe(panel))

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    sectionObserver.observe(sectionRef.current)

    return () => {
      observer.disconnect()
      sectionObserver.disconnect()
    }
  }, [normalizedProjects])

  if (!normalizedProjects.length) {
    return null
  }

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="pointer-events-none fixed bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div
          className="rounded-2xl px-10 py-4 text-base font-semibold transition-opacity duration-300"
          style={{
            backgroundColor: textColor,
            color: backgroundColor,
            fontFamily: bodyFont,
            opacity: isActive ? 1 : 0,
          }}
        >
          {normalizedProjects[activeIndex]?.name}
        </div>
      </div>
      {normalizedProjects.map((project, index) => {
        const positions = buildScatter(project.images.length, project.id || index + 1)
        return (
          <div
            key={project.id}
            data-project-panel
            data-index={index}
            className="relative h-[100vh] overflow-hidden"
          >
            <div className="relative h-full w-full">
              {project.images.map((src, imgIndex) => {
                const position = positions[imgIndex]
                const url = buildImageUrl(src)
                return (
                  <img
                    key={`${project.id}-${imgIndex}`}
                    className="absolute object-cover shadow-xl"
                    style={{
                      top: `${position.top}%`,
                      left: `${position.left}%`,
                      width: `${position.size}px`,
                      height: `${position.size}px`,
                    }}
                    src={url}
                    alt={project.name}
                    loading="lazy"
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </section>
  )
}
