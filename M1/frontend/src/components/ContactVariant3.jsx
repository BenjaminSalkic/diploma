export default function ContactVariant3({ theme, font, links, bigText }) {
  const backgroundColor = theme?.backgroundColor ?? '#d6ecb8'
  const textColor = theme?.textColor ?? '#111111'
  const headingFont = font?.heading ?? 'Inter, system-ui, sans-serif'
  const bodyFont = font?.body ?? 'Roboto, system-ui, sans-serif'
  const safeLinks = Array.isArray(links) ? links.filter((item) => item?.label) : []

  return (
    <section className="contact3-stage" style={{ backgroundColor, color: textColor }}>
      <div className="contact3-top">
        <ul className="contact3-list" style={{ fontFamily: bodyFont }}>
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
      <div className="contact3-divider" />
      <div className="contact3-bottom" style={{ fontFamily: headingFont }}>
        {bigText}
      </div>
    </section>
  )
}
