import { useEffect, useState } from 'react'
import { api } from '../../../api/client'

export default function ProjectsVariant5({ props, global }) {
  const [projects, setProjects] = useState([])
  const { theme, font } = global

  useEffect(() => {
    api.get('/api/projects').then(data => setProjects(data || []))
  }, [])

  if (!projects.length) return null

  return (
    <div style={{ backgroundColor: theme.backgroundColor }}>
      {projects.map((project, i) => {
        const imageOnLeft = i % 2 === 0
        const img = project.images?.[0]?.image_path

        const imagePanel = (
          <div style={{ width: '50%', height: '100vh', flexShrink: 0, overflow: 'hidden' }}>
            {img
              ? <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <div style={{ width: '100%', height: '100%', backgroundColor: theme.textColor, opacity: 0.05 }} />
            }
          </div>
        )

        const textPanel = (
          <div
            style={{
              width: '50%',
              height: '100vh',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              padding: '0 4% 2.5%',
              fontFamily: font.heading,
              color: theme.textColor,
            }}
          >
            <div
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 2rem)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
              }}
            >
              {project.name}
            </div>
            <div
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 2rem)',
                fontWeight: 900,
                opacity: 0.3,
                letterSpacing: '-0.02em',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
          </div>
        )

        return (
          <div key={project.id} style={{ display: 'flex', height: '100vh' }}>
            {imageOnLeft
              ? <>{imagePanel}{textPanel}</>
              : <>{textPanel}{imagePanel}</>
            }
          </div>
        )
      })}
    </div>
  )
}
