import { useEffect, useState } from 'react'
import { api } from '../../../api/client'

export default function ProjectsVariant1({ props, global }) {
  const [projects, setProjects] = useState([])
  const { theme, font } = global

  useEffect(() => {
    api.get('/api/projects').then(data => setProjects(data || []))
  }, [])

  return (
    <section style={{ backgroundColor: theme.backgroundColor, color: theme.textColor, fontFamily: font.body }}>

      {/* Section header */}
      <div className="relative flex justify-center pt-20 pb-0">
        <span className="text-sm" style={{ opacity: 0.5 }}>Selected projects</span>
      </div>

      {/* Center line + project rows */}
      <div className="relative">
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px"
          style={{ backgroundColor: theme.textColor, opacity: 0.15 }}
        />

        {projects.map((project, i) => {
          const imageRight = i % 2 === 0

          return (
            <div key={project.id} className="relative flex items-center min-h-[75vh]">

              {/* Text — always centered in its half, close to the center line */}
              <div
                className={`w-1/2 flex flex-col justify-center ${imageRight ? 'items-end text-right pr-16' : 'items-start text-left pl-16'}`}
                style={{ order: imageRight ? 1 : 2 }}
              >
                {project.category && (
                  <span className="text-xs mb-3 tracking-widest uppercase" style={{ opacity: 0.45 }}>
                    {project.category}
                  </span>
                )}
                <h2
                  className="font-light leading-tight"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)', fontFamily: font.heading }}
                >
                  {project.name}
                </h2>
              </div>

              {/* Image — doesn't touch the center line, has inner gap */}
              <div
                className="w-1/2 flex"
                style={{ order: imageRight ? 2 : 1, justifyContent: imageRight ? 'flex-end' : 'flex-start' }}
              >
                <div
                  className="h-[45vh] overflow-hidden"
                  style={{ width: '80%' }}
                >
                  {project.image_path
                    ? <img src={project.image_path} alt={project.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full" style={{ backgroundColor: theme.textColor, opacity: 0.05 }} />
                  }
                </div>
              </div>

            </div>
          )
        })}
      </div>
    </section>
  )
}
