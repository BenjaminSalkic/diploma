import { useEffect, useState } from 'react'
import { getImageUrl } from '../utils/imageStore'

export default function HeroVariant1({
  theme,
  font,
  kicker,
  headline,
  subheadline,
  images,
}) {
  const [mainSrc, setMainSrc] = useState(images?.main?.src || '')
  const [accentSrc, setAccentSrc] = useState(images?.accent?.src || '')
  const textColor = theme?.textColor ?? '#111111'
  const primaryColor = theme?.primaryColor ?? '#2563eb'
  const headingFont = font?.heading ?? 'Inter, system-ui, sans-serif'
  const bodyFont = font?.body ?? 'Roboto, system-ui, sans-serif'

  useEffect(() => {
    let active = true
    let objectUrl = null
    const src = images?.main?.src || ''

    if (!src) {
      setMainSrc('')
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
        setMainSrc(url || '')
      })
    } else {
      setMainSrc(src)
    }

    return () => {
      active = false
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [images?.main?.src])

  useEffect(() => {
    let active = true
    let objectUrl = null
    const src = images?.accent?.src || ''

    if (!src) {
      setAccentSrc('')
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
        setAccentSrc(url || '')
      })
    } else {
      setAccentSrc(src)
    }

    return () => {
      active = false
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [images?.accent?.src])

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:grid-cols-[1.2fr_0.8fr] sm:px-6 lg:px-8">
        <div>
          {kicker ? (
            <p
              className="text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: primaryColor, fontFamily: bodyFont }}
            >
              {kicker}
            </p>
          ) : null}
          <h1
            className="mt-5 text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-[4.5rem]"
            style={{ color: textColor, fontFamily: headingFont }}
          >
            {headline}
          </h1>
          {subheadline ? (
            <p
              className="mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl"
              style={{ color: textColor, fontFamily: bodyFont }}
            >
              {subheadline}
            </p>
          ) : null}
        </div>
        <div className="relative flex justify-end">
          {mainSrc ? (
            <img
              className="w-full max-w-lg rounded-2xl object-cover shadow-xl"
              src={mainSrc}
              alt={images.main.alt || 'Hero image'}
            />
          ) : null}
          {accentSrc ? (
            <img
              className="-left-6 -bottom-6 w-48 rounded-2xl object-cover shadow-lg sm:absolute"
              src={accentSrc}
              alt={images.accent.alt || 'Hero accent'}
            />
          ) : null}
        </div>
      </div>
    </section>
  )
}
