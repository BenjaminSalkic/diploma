export default function ContactVariant4({ theme, font, kicker, description, links }) {
  const backgroundColor = theme?.backgroundColor ?? '#2a2a2a'
  const textColor = theme?.textColor ?? '#f5f5f5'
  const headingFont = font?.heading ?? 'Inter, system-ui, sans-serif'
  const bodyFont = font?.body ?? 'Roboto, system-ui, sans-serif'
  const safeLinks = Array.isArray(links) ? links.filter((item) => item?.label) : []

  return (
    <section className="contact4-stage" style={{ backgroundColor, color: textColor }}>
      <div className="contact4-inner">
        {kicker ? (
          <p className="contact4-kicker" style={{ fontFamily: bodyFont }}>
            {kicker}
          </p>
        ) : null}
        <p className="contact4-description" style={{ fontFamily: headingFont }}>
          {description}
        </p>
        <ul className="contact4-links" style={{ fontFamily: bodyFont }}>
          {safeLinks.map((link, index) => (
            <li key={`${link.label}-${index}`}>
              {link.href ? (
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ) : (
                <span>{link.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
