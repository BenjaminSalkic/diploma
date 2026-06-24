import { useMemo } from 'react'

export default function AboutVariant4({
  theme,
  font,
  title,
  description,
  waterfallItems,
  circleText,
}) {
  const backgroundColor = theme?.backgroundColor ?? '#ffffff'
  const textColor = theme?.textColor ?? '#111111'
  const primaryColor = theme?.primaryColor ?? '#16a34a'
  const headingFont = font?.heading ?? 'Inter, system-ui, sans-serif'
  const bodyFont = font?.body ?? 'Roboto, system-ui, sans-serif'

  const items = useMemo(() => {
    const base = Array.isArray(waterfallItems) ? waterfallItems.filter(Boolean) : []
    if (!base.length) {
      return []
    }
    return [...base, ...base]
  }, [waterfallItems])

  const waterfallText = useMemo(() => {
    if (!items.length) {
      return ''
    }
    const phrase = items.join(' \u2022 ')
    return Array.from({ length: 12 }).map(() => phrase).join(' \u2022 ')
  }, [items])

  const loopText = useMemo(() => {
    const base = (circleText || '').trim()
    if (!base) {
      return ''
    }
    return Array.from({ length: 6 }).map(() => base).join(' • ')
  }, [circleText])

  const ghostColor = `rgba(0, 0, 0, 0.35)`

  return (
    <section className="about4-stage" style={{ backgroundColor, color: textColor }}>
      <div className="about4-inner">
        <div className="about4-circle">
          <svg className="about4-circle-svg" viewBox="0 0 240 320" aria-hidden="true">
            <defs>
              <path
                id="about4CirclePath"
                d="M120,20 a90,140 0 1,1 0,280 a90,140 0 1,1 0,-280"
              />
              <path
                id="about4CirclePathGhost"
                d="M120,20 a90,140 0 1,1 0,280 a90,140 0 1,1 0,-280"
              />
            </defs>
            <text className="about4-circle-text" fill={primaryColor}>
              <textPath href="#about4CirclePath" startOffset="0%">
                {loopText}
              </textPath>
            </text>
            <text className="about4-circle-text is-ghost" fill={primaryColor}>
              <textPath href="#about4CirclePath" startOffset="50%">
                {loopText}
              </textPath>
            </text>
            <g className="about4-circle-ghost" style={{ color: ghostColor }}>
              <text className="about4-circle-text" fill="currentColor">
                <textPath href="#about4CirclePathGhost" startOffset="0%">
                  {loopText}
                </textPath>
              </text>
              <text className="about4-circle-text is-ghost" fill="currentColor">
                <textPath href="#about4CirclePathGhost" startOffset="50%">
                  {loopText}
                </textPath>
              </text>
            </g>
          </svg>
        </div>

        <div className="about4-waterfall" style={{ fontFamily: bodyFont, color: primaryColor }}>
          <div className="about4-column is-down">
            <div className="about4-track">
              <span className="about4-item">{waterfallText}</span>
            </div>
          </div>
          <div className="about4-column is-up">
            <div className="about4-track">
              <span className="about4-item">{waterfallText}</span>
            </div>
          </div>
        </div>

        <div className="about4-right">
          <h2 className="about4-title" style={{ fontFamily: headingFont }}>
            {title}
          </h2>
          <p className="about4-description" style={{ fontFamily: bodyFont }}>
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}
