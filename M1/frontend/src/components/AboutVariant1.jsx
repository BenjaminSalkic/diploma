import { useEffect, useState } from 'react'
import { getImageUrl } from '../utils/imageStore'

export default function AboutVariant1({ theme, font, title, description, image }) {
  const [imageSrc, setImageSrc] = useState(image?.src || '')
  const textColor = theme?.textColor ?? '#ffffff'
  const backgroundColor = theme?.backgroundColor ?? '#0f0f0f'
  const headingFont = font?.heading ?? 'Inter, system-ui, sans-serif'
  const bodyFont = font?.body ?? 'Roboto, system-ui, sans-serif'

  useEffect(() => {
    let active = true
    let objectUrl = null
    const src = image?.src || ''

    if (!src) {
      setImageSrc('')
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
        setImageSrc(url || '')
      })
    } else {
      setImageSrc(src)
    }

    return () => {
      active = false
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [image?.src])

  return (
    <section className="about1-stage" style={{ backgroundColor, color: textColor }}>
      <div className="about1-inner">
        <div className="about1-text">
          <h2 className="about1-title" style={{ fontFamily: headingFont }}>
            {title}
          </h2>
          <p className="about1-description" style={{ fontFamily: bodyFont }}>
            {description}
          </p>
        </div>
        {imageSrc ? (
          <div className="about1-media">
            <img
              className="about1-image"
              src={imageSrc}
              alt={image?.alt || 'About image'}
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
