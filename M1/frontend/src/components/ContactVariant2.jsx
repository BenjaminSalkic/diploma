export default function ContactVariant2({ theme, font, text, buttonLabel, buttonHref }) {
  const backgroundColor = theme?.backgroundColor ?? '#ffffff'
  const textColor = theme?.textColor ?? '#111111'
  const headingFont = font?.heading ?? 'Inter, system-ui, sans-serif'

  return (
    <section className="contact2-stage" style={{ backgroundColor, color: textColor }}>
      <div className="contact2-wrap">
        <div className="contact2-text" style={{ fontFamily: headingFont }}>
          {text}
        </div>
        <a
          className="contact2-button"
          href={buttonHref || '#'}
          style={{ fontFamily: headingFont, color: textColor }}
        >
          {buttonLabel}
        </a>
      </div>
    </section>
  )
}
