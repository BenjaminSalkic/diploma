export default function AboutVariant3({ props, global }) {
  const p          = props || {}
  const paragraphs = Array.isArray(p.paragraphs) ? p.paragraphs : []
  const aboutLabel = p.aboutLabel ?? 'About'
  const blocks     = Array.isArray(p.blocks) ? p.blocks : []

  const { theme, font } = global

  const labelStyle = {
    fontSize: 'clamp(0.7rem, 0.85vw, 0.9rem)',
    fontWeight: 500,
    opacity: 0.55,
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    marginBottom: '0.9rem',
    fontFamily: font.body || font.heading,
  }

  const arrow = <span style={{ fontSize: '0.8em', opacity: 0.7 }}>↘</span>

  return (
    <div
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        display: 'flex',
        gap: '4vw',
        padding: '6vh 4vw',
        minHeight: '100vh',
        fontFamily: font.body || font.heading,
      }}
    >
      {/* Left — dynamic blocks */}
      <div style={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column', gap: '3rem', paddingTop: '0.3rem' }}>
        {blocks.map((block, i) => (
          <div key={i}>
            {block.label && (
              <div style={labelStyle}>
                {block.label} {arrow}
              </div>
            )}

            {block.type === 'text' && block.content && (
              <p style={{ fontSize: 'clamp(0.75rem, 0.9vw, 1rem)', lineHeight: 1.6, margin: 0, opacity: 0.85 }}>
                {block.content}
              </p>
            )}

            {block.type === 'list' && Array.isArray(block.items) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {block.items.map((item, j) => (
                  <div key={j} style={{ display: 'flex', gap: '1.5rem', alignItems: 'baseline' }}>
                    {item.prefix && (
                      <span style={{
                        fontSize: 'clamp(0.75rem, 0.9vw, 1rem)',
                        fontWeight: 500,
                        opacity: 0.55,
                        minWidth: '2.5rem',
                        flexShrink: 0,
                      }}>
                        {item.prefix}
                      </span>
                    )}
                    <span style={{ fontSize: 'clamp(0.75rem, 0.9vw, 1rem)', fontWeight: 500 }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right — paragraphs */}
      <div style={{ flex: 1 }}>
        {aboutLabel && (
          <div style={{ ...labelStyle, marginBottom: '2rem' }}>
            {aboutLabel} {arrow}
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
          {paragraphs.map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: 'clamp(1.3rem, 2.4vw, 2.8rem)',
                fontWeight: 700,
                lineHeight: 1.25,
                margin: 0,
              }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
