export default function SkillsVariant1({ props, global }) {
  const p               = props || {}
  const line1           = p.line1           ?? "LET'S"
  const line2           = p.line2           ?? 'CONNECT'
  const subtext         = p.subtext         ?? "I'M ALWAYS INTERESTED ABOUT"
  const skills          = Array.isArray(p.skills) ? p.skills : []
  const backgroundImage = p.backgroundImage ?? ''

  const { theme, font } = global

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: theme.backgroundColor,
        display: 'flex',
        fontFamily: font.heading,
      }}
    >
      {/* Background image — optional */}
      {backgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
        </>
      )}

      {/* Left — large two-line heading anchored to bottom */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '38%',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: '0',
          lineHeight: 0.82,
        }}
      >
        {[line1, line2].map((line, i) => (
          <div
            key={i}
            style={{
              fontSize: 'clamp(4.5rem, 12vw, 14rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: theme.textColor,
              letterSpacing: '-0.02em',
            }}
          >
            {line}
          </div>
        ))}
      </div>

      {/* Right — subtext + skill pills, vertically centered */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 5%',
        }}
      >
        {subtext && (
          <p
            style={{
              color: theme.textColor,
              fontSize: 'clamp(0.6rem, 0.85vw, 0.9rem)',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '1.8rem',
              opacity: 0.9,
            }}
          >
            {subtext}
          </p>
        )}

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.65rem',
            justifyContent: 'center',
            maxWidth: '580px',
          }}
        >
          {skills.map((skill, i) => (
            <span
              key={i}
              style={{
                border: `1.5px solid ${theme.textColor}`,
                borderRadius: '999px',
                padding: '0.45rem 1.3rem',
                fontSize: 'clamp(0.65rem, 0.9vw, 0.95rem)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: theme.textColor,
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
