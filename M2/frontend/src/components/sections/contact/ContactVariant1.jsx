export default function ContactVariant1({ props, global }) {
  const p     = props || {}
  const links = Array.isArray(p.links) ? p.links : []

  const { theme, font } = global

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.backgroundColor,
      fontFamily: font.body || font.heading,
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.6rem',
      }}>
        {links.map((link, i) => (
          <a
            key={i}
            href={link.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: theme.textColor,
              fontSize: 'clamp(0.9rem, 1.1vw, 1.1rem)',
              fontWeight: 400,
              textDecoration: 'none',
              letterSpacing: '0.02em',
              opacity: 0.9,
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}
