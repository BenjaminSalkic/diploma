export default function SkillsVariant2({ props, global }) {
  const p          = props || {}
  const topLabel   = p.topLabel   ?? '(OPEN TO)'
  const line1      = p.line1      ?? 'PROFESSIONAL OPPORTUNITIES'
  const line2      = p.line2      ?? 'FREELANCE PROJECTS'
  const stackLabel = p.stackLabel ?? 'STACK'
  const skills     = Array.isArray(p.skills) ? p.skills : []

  const { theme, font } = global

  return (
    <div
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: font.heading,
        overflow: 'hidden',
        paddingBottom: '6vh',
      }}
    >
      {/* Top label */}
      <div style={{ paddingTop: '8vh', paddingLeft: '2vw', marginBottom: '0.5rem' }}>
        <span
          style={{
            display: 'inline-block',
            fontSize: '12px',
            transform: 'scale(0.6)',
            transformOrigin: 'left center',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            opacity: 0.6,
          }}
        >
          {topLabel}
        </span>
      </div>

      {/* Overflowing large text */}
      {[line1, line2].map((line, i) => (
        <div
          key={i}
          style={{
            fontSize: 'clamp(5rem, 16.5vw, 20rem)',
            fontWeight: 900,
            lineHeight: 0.88,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            letterSpacing: '-0.02em',
            paddingLeft: '1vw',
          }}
        >
          {line}
        </div>
      ))}

      {/* Separator */}
      <div
        style={{
          borderTop: `1px solid ${theme.textColor}`,
          margin: '4vh 2vw 3vh',
          opacity: 0.4,
        }}
      />

      {/* Stack section */}
      <div
        style={{
          display: 'flex',
          gap: '4vw',
          paddingLeft: '2vw',
          paddingRight: '2vw',
          alignItems: 'flex-start',
        }}
      >
        {/* Label */}
        <div
          style={{
            fontSize: 'clamp(0.65rem, 0.85vw, 0.9rem)',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            opacity: 0.5,
            flexShrink: 0,
            paddingTop: '0.15rem',
            minWidth: '6rem',
          }}
        >
          {stackLabel}
        </div>

        {/* Skills grid */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem 3.5vw',
            flex: 1,
          }}
        >
          {skills.map((skill, i) => (
            <span
              key={i}
              style={{
                fontSize: 'clamp(0.85rem, 1.2vw, 1.3rem)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
