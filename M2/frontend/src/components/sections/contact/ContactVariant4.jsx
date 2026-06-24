export default function ContactVariant4({ props, global }) {
  const p           = props || {}
  const label       = p.label       ?? 'Get in touch'
  const description = p.description ?? ''
  const links       = Array.isArray(p.links) ? p.links : []

  const { theme, font } = global

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.backgroundColor,
      color: theme.textColor,
      fontFamily: font.body || font.heading,
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{
        marginLeft: '52%',
        paddingRight: '5vw',
        paddingTop: '8vh',
        paddingBottom: '8vh',
        maxWidth: '600px',
      }}>
        {/* Label */}
        <div style={{
          fontSize: 'clamp(0.75rem, 0.9vw, 0.95rem)',
          opacity: 0.6,
          marginBottom: '1.5rem',
          letterSpacing: '0.02em',
        }}>
          {label} ↗
        </div>

        {/* Description */}
        {description && (
          <p style={{
            fontSize: 'clamp(1.2rem, 1.8vw, 2rem)',
            fontWeight: 500,
            lineHeight: 1.45,
            margin: '0 0 2.5rem 0',
          }}>
            {description}
          </p>
        )}

        {/* Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '1.5rem',
                color: theme.textColor,
                textDecoration: 'none',
                fontSize: 'clamp(0.8rem, 1vw, 1rem)',
                fontWeight: 400,
                letterSpacing: '0.04em',
              }}
            >
              <span style={{ opacity: 0.6 }}>↗</span>
              <span>({link.label.toUpperCase()})</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
