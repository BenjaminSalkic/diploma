import { useEffect, useState } from 'react'
import { api } from '../api/client'
import SectionRenderer from '../components/sections/SectionRenderer'

export default function HomePage() {
  const [config, setConfig] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.get('/api/page-config')
      .then(setConfig)
      .catch(() => setError('Failed to load page config'))
  }, [])

  if (error) return <p className="p-8 text-red-500">{error}</p>
  if (!config) return null

  return (
    <div style={{ backgroundColor: config.global.theme.backgroundColor }}>
      {config.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} global={config.global} />
      ))}
    </div>
  )
}
