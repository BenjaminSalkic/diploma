export default function ContactVariant3({ props, global }) {
  const p        = props || {}
  const links    = Array.isArray(p.links) ? p.links : []
  const bigText  = p.bigText ?? "LET'S TALK"

  const { theme, font } = global

  return (
    <div style={{
      backgroundColor: theme.backgroundColor,
      color: theme.textColor,
      fontFamily: font.heading,
      overflow: 'hidden',
    }}>
      {/* Top — link list */}
      <div style={{ padding: '2vh 3vw 1.5vh' }}>
        {links.map((link, i) => (
          <a
            key={i}
            href={link.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              color: theme.textColor,
              textDecoration: 'none',
              fontSize: 'clamp(0.8rem, 1vw, 1rem)',
              fontWeight: 400,
              lineHeight: 1.7,
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Separator */}
      <div style={{ borderTop: `1px solid ${theme.textColor}`, margin: '0 3vw' }} />

      {/* Big text — sized by vw, section height follows */}
      <div style={{
        fontSize: 'clamp(4rem, 22vw, 28rem)',
        fontWeight: 900,
        lineHeight: 0.9,
        whiteSpace: 'nowrap',
        letterSpacing: '-0.02em',
        paddingLeft: '1vw',
        marginTop: '0.5vh',
      }}>
        {bigText}
      </div>
    </div>
  )
}
