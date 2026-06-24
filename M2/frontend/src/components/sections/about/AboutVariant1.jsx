export default function AboutVariant1({ props, global }) {
  const p           = props || {}
  const title       = p.title       ?? 'HELLO. I AM'
  const subtitle    = p.subtitle    ?? ''
  const description = p.description ?? ''
  const image       = p.image       ?? ''

  const { theme, font } = global

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: font.heading,
        display: 'flex',
        alignItems: 'center',
        padding: '8vh 5vw',
        gap: '4vw',
      }}
    >
      {/* Left — title + description */}
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 6.5rem)',
              fontWeight: 900,
              lineHeight: 1,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                fontSize: 'clamp(0.75rem, 1.1vw, 1.2rem)',
                fontStyle: 'italic',
                opacity: 0.55,
                marginTop: '0.4rem',
                fontWeight: 400,
                letterSpacing: '0.02em',
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {description && (
          <p
            style={{
              fontSize: 'clamp(0.9rem, 1.35vw, 1.5rem)',
              fontWeight: 700,
              textTransform: 'uppercase',
              lineHeight: 1.55,
              letterSpacing: '0.01em',
              maxWidth: '52ch',
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Right — image */}
      {image && (
        <div
          style={{
            width: '38%',
            flexShrink: 0,
            aspectRatio: '3/4',
            overflow: 'hidden',
          }}
        >
          <img
            src={image}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}
    </div>
  )
}
