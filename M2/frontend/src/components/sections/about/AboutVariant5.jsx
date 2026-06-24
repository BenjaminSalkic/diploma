export default function AboutVariant5({ props, global }) {
  const p           = props || {}
  const description = p.description ?? ''
  const awards      = Array.isArray(p.awards) ? p.awards : []

  const { theme, font } = global
  const dim = `${theme.textColor}30`

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.backgroundColor,
      color: theme.textColor,
      fontFamily: font.body || font.heading,
      padding: '10vh 5vw',
    }}>

      {/* Description — offset to right half */}
      {description && (
        <p style={{
          fontSize: 'clamp(0.95rem, 1.35vw, 1.45rem)',
          lineHeight: 1.6,
          maxWidth: '62ch',
          marginLeft: '38%',
          marginBottom: '8vh',
          fontWeight: 400,
        }}>
          {description}
        </p>
      )}

      {/* Awards table */}
      <div style={{ marginLeft: '38%' }}>
        {awards.map((row, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '22% 16% 1fr 6ch',
              alignItems: 'baseline',
              padding: '0.55rem 0',
              borderTop: `1px solid ${dim}`,
              fontSize: 'clamp(0.75rem, 1vw, 0.95rem)',
              fontWeight: 400,
            }}
          >
            <span>{row.name}</span>
            <span style={{ opacity: 0.6 }}>{row.giver}</span>
            <span style={{ opacity: 0.6 }}>{row.award}</span>
            <span style={{ textAlign: 'right', opacity: 0.5 }}>
              {row.year ? `'${String(row.year).replace(/^'/, '')}` : ''}
            </span>
          </div>
        ))}
        {awards.length > 0 && (
          <div style={{ borderTop: `1px solid ${dim}` }} />
        )}
      </div>
    </div>
  )
}
