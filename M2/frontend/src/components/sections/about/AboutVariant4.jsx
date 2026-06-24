const KEYFRAMES = `
  @keyframes av4-cw  { from { transform: rotate(0deg); }     to { transform: rotate(360deg);  } }
  @keyframes av4-ccw { from { transform: rotate(0deg); }     to { transform: rotate(-360deg); } }
  @keyframes av4-dn  { from { transform: translateY(-50%); } to { transform: translateY(0%);  } }
  @keyframes av4-up  { from { transform: translateY(0%);   } to { transform: translateY(-50%); } }
`

// Both ellipses share the SAME bottom point at y=490 in the 500×500 viewBox.
// Outer: cx=250 cy=260 rx=155 ry=230  → top=30,  bottom=490
// Inner: cx=250 cy=345 rx=100 ry=145  → top=200, bottom=490  (shifted down to share tangent)
const OUTER_PATH = 'M 250,30  A 155,230 0 1,0 250,490 A 155,230 0 1,0 250,30'
const INNER_PATH = 'M 250,200 A 100,145 0 1,0 250,490 A 100,145 0 1,0 250,200'

function WaterfallCol({ words, direction, color, font }) {
  // 30 repetitions → enough height for any viewport, seamless at -50%
  const items = Array.from({ length: 30 }, (_, i) => words[i % words.length])
  const doubled = [...items, ...items]

  return (
    <div style={{ flex: 1, overflow: 'hidden' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: `${direction === 'down' ? 'av4-dn' : 'av4-up'} 35s linear infinite`,
      }}>
        {doubled.map((word, i) => (
          <div
            key={i}
            style={{
              writingMode: 'vertical-rl',
              fontFamily: font,
              fontSize: 'clamp(1rem, 1.4vw, 1.6rem)',
              fontWeight: 900,
              letterSpacing: '0.1em',
              color,
              textTransform: 'uppercase',
              padding: '0.5rem 0',
              lineHeight: 1,
            }}
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AboutVariant4({ props, global }) {
  const p           = props || {}
  const greeting    = p.greeting    ?? 'HELLO,'
  const namePrefix  = p.namePrefix  ?? "MY NAME IS"
  const name        = p.name        ?? 'YOUR NAME'
  const description = p.description ?? ''
  const ellipseText = p.ellipseText ?? 'CONTINUE THE JOURNEY /'
  const col1Text    = p.col1Text    ?? 'PORTFOLIO'
  const col2Text    = p.col2Text    ?? name.replace(/\s/g, '')

  const { theme, font } = global
  const primary  = theme.primaryColor || '#00ff00'
  const repeated = Array(40).fill(ellipseText).join('   ')

  const ellipseContainer = {
    position: 'absolute', inset: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div style={{
        height: '100vh',
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: font.heading,
      }}>

        {/* LEFT — two rotating ellipses sharing bottom tangent */}
        <div style={{ width: '40%', flexShrink: 0, position: 'relative' }}>
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <path id="av4-outer" d={OUTER_PATH} />
              <path id="av4-inner" d={INNER_PATH} />
            </defs>
          </svg>

          {/* Outer ellipse — full primary, clockwise */}
          <div style={ellipseContainer}>
            <div style={{ width: '86%', aspectRatio: '1', animation: 'av4-cw 30s linear infinite' }}>
              <svg viewBox="0 0 500 500" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <text fill={primary} fontSize="12" fontWeight="800" letterSpacing="5">
                  <textPath href="#av4-outer">{repeated}</textPath>
                </text>
              </svg>
            </div>
          </div>

          {/* Inner ellipse — dimmer primary, counter-clockwise */}
          <div style={ellipseContainer}>
            <div style={{ width: '86%', aspectRatio: '1', animation: 'av4-ccw 20s linear infinite' }}>
              <svg viewBox="0 0 500 500" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <text fill={primary} fontSize="12" fontWeight="800" letterSpacing="5" opacity="0.35">
                  <textPath href="#av4-inner">{repeated}</textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* MIDDLE — infinite dual waterfall */}
        <div style={{
          width: '7%', flexShrink: 0,
          display: 'flex',
          overflow: 'hidden',
          borderLeft: `1px solid ${theme.textColor}`,
          borderRight: `1px solid ${theme.textColor}`,
          opacity: 0.9,
        }}>
          <WaterfallCol words={[col1Text, col2Text]} direction="down" color={primary} font={font.heading} />
          <WaterfallCol words={[col2Text, col1Text]} direction="up"   color={primary} font={font.heading} />
        </div>

        {/* RIGHT — greeting + name + description */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 5vw',
        }}>
          <div style={{ fontSize: '1.2rem', marginBottom: '1.2rem' }}>•</div>

          <div style={{ fontSize: 'clamp(1.8rem, 3.8vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1 }}>
            <div>{greeting}</div>
            <div>
              {namePrefix}{' '}
              <span style={{ color: primary }}>{name}</span>
            </div>
          </div>

          {description && (
            <p style={{
              marginTop: '2.5rem',
              fontSize: 'clamp(0.65rem, 0.9vw, 1rem)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              lineHeight: 1.65,
              opacity: 0.7,
              maxWidth: '40ch',
            }}>
              {description}
            </p>
          )}
        </div>
      </div>
    </>
  )
}
