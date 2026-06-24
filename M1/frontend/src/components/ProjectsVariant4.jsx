import { useEffect, useMemo, useRef, useState } from 'react'

const DEFAULT_API_BASE = 'http://localhost:8080'

const IMAGE_POSITIONS = [
  { top: '8%', left: '8%', width: '180px', rotate: '-6deg' },
  { top: '18%', right: '10%', width: '200px', rotate: '5deg' },
  { top: '58%', left: '6%', width: '220px', rotate: '4deg' },
  { top: '64%', right: '12%', width: '190px', rotate: '-5deg' },
  { top: '36%', left: '72%', width: '160px', rotate: '-3deg' },
  { top: '34%', right: '70%', width: '170px', rotate: '6deg' },
]

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

function getProjectImages(project) {
  const images = []
  if (project?.imageUrls?.length) {
    images.push(...project.imageUrls)
  } else if (project?.imageUrl) {
    images.push(project.imageUrl)
  }
  return images.map(buildImageUrl).filter(Boolean)
}

export default function ProjectsVariant4({ projects, theme, font }) {
  const containerRef = useRef(null)
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [lockScroll, setLockScroll] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const headingFont = font?.heading ?? 'Roboto, system-ui, sans-serif'
  const bodyFont = font?.body ?? 'Roboto, system-ui, sans-serif'
  const textColor = theme?.textColor ?? '#111111'
  const backgroundColor = theme?.backgroundColor ?? '#ffffff'

  const safeProjects = useMemo(() => projects || [], [projects])

  useEffect(() => {
    if (!scrollRef.current || safeProjects.length === 0) {
      return
    }

    const onScroll = () => {
      const target = scrollRef.current
      if (!target) {
        return
      }

      const total = target.scrollHeight - target.clientHeight
      const raw = total > 0 ? Math.min(Math.max(target.scrollTop / total, 0), 1) : 0
      const index = Math.min(safeProjects.length - 1, Math.floor(raw * safeProjects.length))
      setActiveIndex(index)
      setIsComplete(target.scrollTop + target.clientHeight >= target.scrollHeight - 1)
    }

    onScroll()
    const target = scrollRef.current
    target.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      target.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [safeProjects.length])

  useEffect(() => {
    if (lockScroll) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [lockScroll])

  const handleWheel = (event) => {
    const container = containerRef.current
    const target = scrollRef.current
    if (!container || !target) {
      return
    }

    const rect = container.getBoundingClientRect()
    const viewport = window.innerHeight
    const inView = rect.top <= viewport * 0.35 && rect.bottom >= viewport * 0.65
    if (!inView) {
      return
    }

    if (!isComplete && !lockScroll) {
      setLockScroll(true)
    }

    const atBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 1
    const atTop = target.scrollTop <= 0

    if (event.deltaY < 0 && atTop && rect.top >= 0) {
      setLockScroll(false)
      document.body.style.overflow = ''
      return
    }

    if (event.deltaY > 0 && atBottom) {
      setIsComplete(true)
      setLockScroll(false)
      document.body.style.overflow = ''
      return
    }

    event.preventDefault()
    target.scrollTop += event.deltaY
  }

  const handleKeyDown = (event) => {
    const container = containerRef.current
    const target = scrollRef.current
    if (!container || !target) {
      return
    }

    const rect = container.getBoundingClientRect()
    const viewport = window.innerHeight
    const inView = rect.top <= viewport * 0.35 && rect.bottom >= viewport * 0.65
    if (!inView) {
      return
    }

    if (!isComplete && !lockScroll) {
      setLockScroll(true)
    }

    const step = event.shiftKey ? target.clientHeight : target.clientHeight * 0.6
    if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
      event.preventDefault()
      target.scrollTop += step
    } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault()
      target.scrollTop -= step
    }
  }

  if (safeProjects.length === 0) {
    return null
  }

  const activeProject = safeProjects[activeIndex]
  const activeImages = getProjectImages(activeProject)
  const listRowHeight = 34

  return (
    <section
      ref={containerRef}
      className="project4-stage"
      style={{ backgroundColor, color: textColor }}
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div ref={scrollRef} className="project4-scroll">
        <div style={{ height: `${Math.max(safeProjects.length, 1) * 120}vh` }} />
      </div>
      <div className="project4-sticky">
        <div className="project4-header" style={{ fontFamily: headingFont }}>
          <span className="project4-title">Works,</span>
          <span className="project4-count">{String(activeIndex + 1).padStart(2, '0')}</span>
        </div>

        <div className="project4-center">
          <div className="project4-pointer" style={{ transform: `translateY(${activeIndex * listRowHeight}px)` }}>
            <span className="project4-arrow">&#9656;</span>
          </div>
          <ul className="project4-list" style={{ fontFamily: bodyFont }}>
            {safeProjects.map((project, index) => (
              <li
                key={`${project.id || project.name}-${index}`}
                className={`project4-item${index === activeIndex ? ' is-active' : ''}`}
              >
                {project.name || `Project ${index + 1}`}
              </li>
            ))}
          </ul>
        </div>

        <div className="project4-images">
          {IMAGE_POSITIONS.map((slot, index) => {
            const image = activeImages[index % Math.max(activeImages.length, 1)]
            if (!image) {
              return null
            }
            return (
              <img
                key={`${image}-${index}`}
                src={image}
                alt={activeProject?.name || 'Project'}
                className="project4-image"
                style={{
                  top: slot.top,
                  left: slot.left,
                  right: slot.right,
                  width: slot.width,
                  transform: `rotate(${slot.rotate})`,
                }}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
