import { useEffect, useRef, useState } from 'react'
import { api } from '../../../api/client'

function sr(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

const COLS   = 4
const ROWS   = 3
const CELL_W = 100 / COLS        // 25% of viewport width per cell
const CELL_H = 76  / ROWS        // ~25.3% of viewport height per cell (bottom 24% reserved)

function computePositions(count, projectIndex) {
  // Shuffle cell assignments so images are spread across the grid
  const cells = Array.from({ length: COLS * ROWS }, (_, i) => i)
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(sr(projectIndex * 100 + i + 1) * (i + 1))
    ;[cells[i], cells[j]] = [cells[j], cells[i]]
  }

  return cells.slice(0, count).map((cell, idx) => {
    const col = cell % COLS
    const row = Math.floor(cell / COLS)
    const s   = projectIndex * 20 + idx

    // Image size: 65–95% of its cell, in viewport % units
    const w = CELL_W * (0.65 + sr(s + 4) * 0.30)
    const h = CELL_H * (0.65 + sr(s + 5) * 0.30)

    // Position: random within the cell, guaranteed not to overflow the cell
    const left = col * CELL_W + 0.5 + sr(s + 6) * (CELL_W - w - 1)
    const top  = row * CELL_H + 0.5 + sr(s + 7) * (CELL_H - h - 1)

    return { left, top, w, h }
  })
}

function ProjectImages({ images, projectIndex }) {
  const positions = computePositions(images.length, projectIndex)
  return (
    <>
      {images.map((img, j) => {
        const p = positions[j]
        if (!p) return null
        return (
          <div
            key={img.id}
            className="absolute overflow-hidden"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: `${p.w}%`, height: `${p.h}%` }}
          >
            <img src={img.image_path} alt="" className="w-full h-full object-cover" />
          </div>
        )
      })}
    </>
  )
}

export default function ProjectsVariant2({ props, global }) {
  const [projects, setProjects] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [opacity, setOpacity]         = useState(1)
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

      // Each project owns exactly [i, i+1) of t — 1 full viewport each
      const progress = t - Math.floor(t)
      const isEdge   = t < 0.2 || t > n - 0.2
      const dist     = Math.min(progress, 1 - progress)
      setOpacity(isEdge ? 1 : Math.min(1, dist * 8))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [projects.length])

  if (!projects.length) return null

  const current = projects[activeIndex]

  return (
    <div ref={sectionRef} style={{ height: `${(projects.length + 1) * 100}vh` }}>
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: '100vh', backgroundColor: theme.backgroundColor, fontFamily: font.heading }}
      >
        {/* Only one project rendered at a time — no bleed between projects */}
        <div className="absolute inset-0" style={{ opacity }}>
          <ProjectImages images={current.images || []} projectIndex={activeIndex} />
        </div>

        {current.year && (
          <div className="absolute bottom-10 left-8 text-sm z-10"
            style={{ color: theme.textColor, opacity: 0.5 }}>
            {current.year}
          </div>
        )}

        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
          <div
            className="flex items-center gap-6 px-8 py-3 rounded-full"
            style={{ backgroundColor: theme.textColor, color: theme.backgroundColor }}
          >
            <span className="text-sm font-medium tracking-widest uppercase">
              {current.name}
            </span>
            <span className="text-sm" style={{ opacity: 0.55 }}>
              N°{activeIndex + 1}/{projects.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
