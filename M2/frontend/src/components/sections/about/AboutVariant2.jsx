export default function AboutVariant2({ props, global }) {
  const p    = props || {}
  const desc1  = p.desc1  ?? ''
  const desc2  = p.desc2  ?? ''
  const blocks = Array.isArray(p.blocks) ? p.blocks : []

  const { theme, font } = global

  return (
    <div
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: font.body || font.heading,
        display: 'flex',
        gap: '4vw',
        padding: '7vh 4vw',
        minHeight: '100vh',
      }}
    >
      {/* Left — large descriptions */}
      <div style={{ flex: '0 0 58%' }}>
        {desc1 && (
          <p
            style={{
              fontSize: 'clamp(1.6rem, 3.2vw, 4rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '1.4em',
              margin: '0 0 1.4em 0',
            }}
          >
            {desc1}
          </p>
        )}
        {desc2 && (
          <p
            style={{
              fontSize: 'clamp(1.6rem, 3.2vw, 4rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {desc2}
          </p>
        )}
      </div>

      {/* Right — dynamic blocks */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2.4rem', paddingTop: '0.2rem' }}>
        {blocks.map((block, i) => (
          <div key={i}>
            {block.label && (
              <div
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  opacity: 0.5,
                  marginBottom: '0.8rem',
                }}
              >
                {block.label}
              </div>
            )}

            {block.type === 'text' && block.content && (
              <p
                style={{
                  fontSize: 'clamp(0.6rem, 0.8vw, 0.85rem)',
                  lineHeight: 1.6,
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                  margin: 0,
                  opacity: 0.8,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {block.content}
              </p>
            )}

            {block.type === 'list' && Array.isArray(block.items) && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: block.columns === 2 ? '1fr 1fr' : '1fr',
                  gap: '0.15rem 1rem',
                }}
              >
                {block.items.map((item, j) => (
                  <div
                    key={j}
                    style={{
                      fontSize: 'clamp(0.6rem, 0.8vw, 0.85rem)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
