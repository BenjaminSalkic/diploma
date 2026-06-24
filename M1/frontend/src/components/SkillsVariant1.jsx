import { useEffect, useState } from 'react'
import { getImageUrl } from '../utils/imageStore'

export default function SkillsVariant1({
  theme,
  font,
  titleLine1,
  titleLine2,
  interestText,
  skills,
  background,
}) {
  const [backgroundSrc, setBackgroundSrc] = useState(background?.src || '')
  const textColor = theme?.textColor ?? '#ffffff'
  const headingFont = font?.heading ?? 'Inter, system-ui, sans-serif'
  const bodyFont = font?.body ?? 'Roboto, system-ui, sans-serif'

  useEffect(() => {
    let active = true
    let objectUrl = null
    const src = background?.src || ''

    if (!src) {
      setBackgroundSrc('')
      return () => {}
    }

    if (src.startsWith('idb:')) {
      const id = src.slice(4)
      getImageUrl(id).then((url) => {
        if (!active) {
          if (url) {
            URL.revokeObjectURL(url)
          }
          return
        }
        objectUrl = url
        setBackgroundSrc(url || '')
      })
    } else {
      setBackgroundSrc(src)
    }

    return () => {
      active = false
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [background?.src])

  const safeSkills = Array.isArray(skills) ? skills.filter(Boolean) : []

  return (
    <section className="skills1-stage" style={{ color: textColor }}>
      {backgroundSrc ? (
        <>
          <img
            className="skills1-bg"
            src={backgroundSrc}
            alt={background?.alt || 'Skills background'}
          />
          <div className="skills1-overlay" />
        </>
      ) : null}
      <div className="skills1-content">
        <div className="skills1-title" style={{ fontFamily: headingFont }}>
          <span>{titleLine1}</span>
          <span>{titleLine2}</span>
        </div>
        <div className="skills1-side">
          {interestText ? (
            <p className="skills1-intro" style={{ fontFamily: bodyFont }}>
              {interestText}
            </p>
          ) : null}
          <div className="skills1-chips" style={{ fontFamily: bodyFont }}>
            {safeSkills.map((skill, index) => (
              <span key={`${skill}-${index}`} className="skills1-chip">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
