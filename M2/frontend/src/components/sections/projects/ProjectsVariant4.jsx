import { useEffect, useRef, useState } from 'react'
import { api } from '../../../api/client'

// Fixed image slots: 2 left, 4 right — filled with current project's images
const LEFT_SLOTS = [
  { left: '3%',  top: '28%', width: '14vw', height: '26vh' },
  { left: '19%', top: '57%', width: '10vw', height: '18vh' },
]
const RIGHT_SLOTS = [
  { right: '18%', top: '10%', width: '12vw', height: '10vh' },
  { right: '4%',  top: '8%',  width: '12vw', height: '10vh' },
  { right: '19%', top: '44%', width: '13vw', height: '23vh' },
  { right: '4%',  top: '42%', width: '13vw', height: '23vh' },
]
const ALL_SLOTS = [...LEFT_SLOTS, ...RIGHT_SLOTS]

export default function ProjectsVariant4({ props, global }) {
  const [projects, setProjects]     = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [opacity, setOpacity]       = useState(1)
  const sectionRef = useRef(null)
  const { theme, font } = global

  useEffect(() => {
    api.get('/api/projects').then(data => setProjects(data || []))
  }, [])

  useEffect(() => {
    if (!projects.length) return
    const n = projects.length

    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const scrolledIn = -section.getBoundingClientRect().top
      if (scrolledIn < 0) return

      const t   = Math.min(scrolledIn / window.innerHeight, n)
      const idx = Math.min(Math.floor(t), n - 1)
      setActiveIndex(idx)

      const progress = t - Math.floor(t)
      const isEdge   = t < 0.15 || t > n - 0.15
      const dist     = Math.min(progress, 1 - progress)
      setOpacity(isEdge ? 1 : Math.min(1, dist * 10))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [projects.length])

  if (!projects.length) return null

  const current = projects[activeIndex]
  const images  = current?.images || []

  return (
    <div ref={sectionRef} style={{ height: `${(projects.length + 1) * 100}vh` }}>
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: '100vh', backgroundColor: theme.backgroundColor, fontFamily: font.heading }}
      >
        {/* Scattered images */}
        {ALL_SLOTS.map((slot, i) => {
          const img = images[i]
          if (!img) return null
          return (
            <div
              key={`${activeIndex}-${i}`}
              className="absolute overflow-hidden"
              style={{ ...slot, opacity, transition: 'opacity 0.3s ease' }}
            >
              <img src={img.image_path} alt="" className="w-full h-full object-cover" />
            </div>
          )
        })}

        {/* Large project number — bottom left */}
        <div
          className="absolute bottom-10 left-8 font-black leading-none select-none"
          style={{
            fontSize: 'clamp(5rem, 12vw, 11rem)',
            color: theme.textColor,
            opacity: 0.08,
          }}
        >
          {String(activeIndex + 1).padStart(2, '0')}
        </div>

        {/* Center project list */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ pointerEvents: 'none' }}
        >
          <div className="flex flex-col" style={{ gap: '0.55rem' }}>
            {projects.map((p, i) => {
              const isActive = i === activeIndex
              return (
                <div
                  key={p.id}
                  className="flex items-center gap-3"
                  style={{
                    color: theme.textColor,
                    opacity: isActive ? 1 : 0.25,
                    fontWeight: isActive ? 700 : 400,
                    fontSize: isActive ? 'clamp(0.85rem, 1.1vw, 1.1rem)' : 'clamp(0.75rem, 0.95vw, 0.95rem)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    transition: 'all 0.4s ease',
                  }}
                >
                  <span>{p.name}</span>
                  <span
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(-6px)',
                      transition: 'all 0.4s ease',
                      fontSize: '0.7em',
                    }}
                  >
                    ◄
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Total count — bottom right */}
        <div
          className="absolute bottom-10 right-8 text-xs tracking-widest uppercase"
          style={{ color: theme.textColor, opacity: 0.35 }}
        >
          {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  )
}
