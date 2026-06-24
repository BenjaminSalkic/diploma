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

export default function ProjectsVariant3({ projects, theme, font }) {
  const containerRef = useRef(null)
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [lockScroll, setLockScroll] = useState(false)
  const backgroundColor = theme?.backgroundColor ?? '#111111'
  const textColor = theme?.textColor ?? '#ffffff'
  const bodyFont = font?.body ?? 'Roboto, system-ui, sans-serif'

  const images = useMemo(() => {
    return (projects || [])
      .flatMap((project) => {
        if (project.imageUrls?.length) {
          return project.imageUrls
        }
        if (project.imageUrl) {
          return [project.imageUrl]
        }
        return []
      })
      .map(buildImageUrl)
      .filter(Boolean)
  }, [projects])

  useEffect(() => {
    if (!scrollRef.current || images.length === 0) {
      return
    }

    const onScroll = () => {
      const target = scrollRef.current
      if (!target) {
        return
      }

      const total = target.scrollHeight - target.clientHeight
      const raw = total > 0 ? Math.min(Math.max(target.scrollTop / total, 0), 1) : 0
      const scaled = raw * images.length
      const index = Math.min(images.length - 1, Math.floor(scaled))
      let local = scaled - index
      if (index === images.length - 1) {
        local = 0
      }

      setActiveIndex(index)
      setProgress(local)
    }

    onScroll()
    const target = scrollRef.current
    target.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      target.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [images.length])

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setLockScroll(entry.isIntersecting)
      },
      { threshold: 0.2 },
    )

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const target = scrollRef.current
    const container = containerRef.current
    if (!target || !container) {
      return
    }

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
    if (!lockScroll) {
      return
    }

    const target = scrollRef.current
    if (!target) {
      return
    }

    const atTop = target.scrollTop <= 0
    const atBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 1

    if ((event.deltaY < 0 && atTop) || (event.deltaY > 0 && atBottom)) {
      setLockScroll(false)
      document.body.style.overflow = ''
      return
    }

    event.preventDefault()
    target.scrollTop += event.deltaY
  }

  const handleKeyDown = (event) => {
    if (!lockScroll) {
      return
    }

    const target = scrollRef.current
    if (!target) {
      return
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

  if (images.length === 0) {
    return null
  }

  const currentImage = images[activeIndex]
  const nextImage = images[Math.min(activeIndex + 1, images.length - 1)]
  const ease = progress * progress * (3 - 2 * progress)
  const currentStyle = {
    transform: `translateY(${-ease * 80}%) scale(${1 - ease * 0.1}) rotateX(${-ease * 25}deg)`,
    opacity: 1 - ease * 0.7,
  }
  const nextStyle = {
    transform: `translateY(${80 - ease * 80}%) scale(${0.75 + ease * 0.25}) rotateX(${(1 - ease) * 25}deg)`,
    opacity: ease,
  }

  return (
    <section
      ref={containerRef}
      className="project3-stage"
      style={{ backgroundColor }}
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div ref={scrollRef} className="project3-scroll">
        <div style={{ height: `${Math.max(images.length, 1) * 120}vh` }} />
      </div>
      <div className="project3-frame project3-sticky">
        <img className="project3-image" src={currentImage} alt="Project" style={currentStyle} />
        {nextImage && nextImage !== currentImage ? (
          <img className="project3-image" src={nextImage} alt="Project" style={nextStyle} />
        ) : null}
      </div>
      <p className="project3-caption" style={{ color: textColor, fontFamily: bodyFont }}>
        Project carousel
      </p>
    </section>
  )
}
