import { useEffect, useRef, useState } from 'react'
import { api } from '../../../api/client'

// Curved-edge clip paths use objectBoundingBox so coords are 0–1 fractions of element size.
// The quadratic bezier control point can go outside 0–1 to make the edge bow beyond the rectangle.
function ClipDefs({ outBow, inBow }) {
  // Outgoing: bottom edge bows downward (away from viewer as image tilts overhead)
  const outPath = `M 0,0 L 1,0 L 1,${1 - outBow} Q 0.5,${1 + outBow} 0,${1 - outBow} Z`
  // Incoming: top edge bows upward (leading edge curving toward viewer as it enters)
  const inPath  = `M 0,${inBow} Q 0.5,${-inBow} 1,${inBow} L 1,1 L 0,1 Z`
  // Resting: very slight bottom bow — the "screen" look
  const restPath = `M 0,0 L 1,0 L 1,0.97 Q 0.5,1.03 0,0.97 Z`

  return (
    <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      <defs>
        <clipPath id="pv3-out"  clipPathUnits="objectBoundingBox"><path d={outPath}  /></clipPath>
        <clipPath id="pv3-in"   clipPathUnits="objectBoundingBox"><path d={inPath}   /></clipPath>
        <clipPath id="pv3-rest" clipPathUnits="objectBoundingBox"><path d={restPath} /></clipPath>
      </defs>
    </svg>
  )
}

function CRTOverlay() {
  return (
    <>
      {/* Scanlines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)',
      }} />
      {/* Screen vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 11,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.72) 100%)',
      }} />
      {/* Phosphor tint */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 12,
        background: 'rgba(8,24,8,0.09)',
        mixBlendMode: 'overlay',
      }} />
    </>
  )
}

export default function ProjectsVariant3({ props, global }) {
  const [projects, setProjects] = useState([])
  const [idx, setIdx]           = useState(0)
  const [nextIdx, setNextIdx]   = useState(null)
  const [progress, setProgress] = useState(0)
  const sectionRef = useRef(null)
  const { theme }  = global

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

      const t       = Math.min(scrolledIn / window.innerHeight, n)
      const current = Math.min(Math.floor(t), n - 1)
      const p       = t - Math.floor(t)

      setIdx(current)
      if (p > 0 && current < n - 1) {
        setNextIdx(current + 1)
        setProgress(p)
      } else {
        setNextIdx(null)
        setProgress(0)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [projects.length])

  if (!projects.length) return null

  const currentImg = projects[idx]?.images?.[0]?.image_path
  const nextImg    = nextIdx !== null ? projects[nextIdx]?.images?.[0]?.image_path : null

  // Bow increases as image exits / enters — leading edge curves more mid-transition
  const outBow = progress * 0.09
  const inBow  = (1 - progress) * 0.09

  // Stagger: outgoing moves out in first 70%, incoming enters in last 70% → gap in middle
  const outProgress = Math.min(progress / 0.7, 1)
  const inProgress  = Math.max(0, (progress - 0.3) / 0.7)

  const W = '62vw'
  const H = '70vh'

  const slideBase = {
    position: 'absolute',
    width: W,
    height: H,
    overflow: 'hidden',
  }

  return (
    <div ref={sectionRef} style={{ height: `${(projects.length + 1) * 100}vh` }}>
      <ClipDefs outBow={outBow} inBow={inBow} />

      {/* perspective on parent — close distance = immersive inside-the-wheel feel */}
      <div
        className="sticky top-0 flex items-center justify-center overflow-hidden"
        style={{ height: '100vh', backgroundColor: theme.backgroundColor, perspective: '480px' }}
      >
        {/* Outgoing: rotates up and over viewer, bottom edge curves toward viewer */}
        {currentImg && (
          <div
            style={{
              ...slideBase,
              clipPath: progress > 0 ? 'url(#pv3-out)' : 'url(#pv3-rest)',
              transform: `translateY(${-outProgress * 115}%) rotateX(${-outProgress * 42}deg)`,
              transformOrigin: 'center center',
            }}
          >
            <img src={currentImg} alt="" className="w-full h-full object-cover" />
            <CRTOverlay />
          </div>
        )}

        {/* Incoming: rises from below, top edge curves as it settles flat */}
        {nextImg && (
          <div
            style={{
              ...slideBase,
              clipPath: 'url(#pv3-in)',
              transform: `translateY(${(1 - inProgress) * 115}%) rotateX(${(1 - inProgress) * 42}deg)`,
              transformOrigin: 'center center',
            }}
          >
            <img src={nextImg} alt="" className="w-full h-full object-cover" />
            <CRTOverlay />
          </div>
        )}
      </div>
    </div>
  )
}
