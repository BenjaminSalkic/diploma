export default function ContactVariant1({ theme, font, links }) {
  const backgroundColor = theme?.backgroundColor ?? '#0f0f0f'
  const textColor = theme?.textColor ?? '#ffffff'
  const bodyFont = font?.body ?? 'Roboto, system-ui, sans-serif'
  const safeLinks = Array.isArray(links) ? links.filter((item) => item?.label) : []

  return (
    <section className="contact1-stage" style={{ backgroundColor, color: textColor }}>
      <ul className="contact1-list" style={{ fontFamily: bodyFont }}>
        {safeLinks.map((link, index) => (
          <li key={`${link.label}-${index}`} className="contact1-item">
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
    </section>
  )
}
