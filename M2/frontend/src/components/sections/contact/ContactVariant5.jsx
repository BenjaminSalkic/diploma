export default function ContactVariant5({ props, global }) {
  const p           = props || {}
  const description = p.description ?? ''
  const lists       = Array.isArray(p.lists) ? p.lists : []
  const bigText     = p.bigText ?? ''

  const { theme, font } = global

  return (
    <div style={{
      backgroundColor: theme.backgroundColor,
      color: theme.textColor,
      fontFamily: font.body || font.heading,
      overflow: 'hidden',
      padding: '5vh 6vw 0',
    }}>
      {/* Top-left description */}
      {description && (
        <p style={{
          fontSize: 'clamp(1rem, 1.5vw, 1.6rem)',
          fontWeight: 500,
          lineHeight: 1.5,
          maxWidth: '36ch',
          marginBottom: '6vh',
        }}>
          {description}
        </p>
      )}

      {/* Evenly spaced columns */}
      {lists.length > 0 && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '5vh',
        }}>
          {lists.map((col, i) => (
            <div key={i} style={{ width: 'auto' }}>
              {col.label && (
                <div style={{
                  fontSize: 'clamp(0.6rem, 0.75vw, 0.8rem)',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  opacity: 0.6,
                }}>
                  {col.label}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {(col.items || []).map((item, j) =>
                  item.url ? (
                    <a
                      key={j}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: theme.textColor,
                        textDecoration: 'none',
                        fontSize: 'clamp(0.85rem, 1vw, 1.05rem)',
                        fontWeight: 400,
                        lineHeight: 1.7,
                      }}
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span key={j} style={{
                      fontSize: 'clamp(0.85rem, 1vw, 1.05rem)',
                      fontWeight: 400,
                      lineHeight: 1.7,
                    }}>
                      {item.text}
                    </span>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Big overflowing text */}
      {bigText && (
        <div style={{
          fontSize: 'clamp(5rem, 22vw, 28rem)',
          fontWeight: 900,
          lineHeight: 0.85,
          whiteSpace: 'nowrap',
          letterSpacing: '-0.02em',
          marginLeft: '-0.05em',
        }}>
          {bigText}
        </div>
      )}
    </div>
  )
}
