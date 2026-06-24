import { useState } from 'react'

export default function ContactVariant2({ props, global }) {
  const p         = props || {}
  const headline  = p.headline  ?? "Let's work together"
  const email     = p.email     ?? ''
  const ctaText   = p.ctaText   ?? 'COPY EMAIL TO CLIPBOARD'
  const brandName = p.brandName ?? ''
  const copyright = p.copyright ?? ''

  const [hovered, setHovered] = useState(false)
  const [copied,  setCopied]  = useState(false)

  const { theme, font } = global

  function copyEmail() {
    if (!email) return
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: font.heading,
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Hover zone — sized to the text */}
      <div
        style={{ position: 'relative', cursor: 'pointer' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={copyEmail}
      >
        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 6rem)',
          fontWeight: 800,
          margin: 0,
          lineHeight: 1,
          transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1), color 0.4s ease',
          transform: hovered ? 'rotate(-6deg) scale(0.82) translateX(-3%)' : 'rotate(0deg) scale(1) translateX(0)',
          color: hovered ? `color-mix(in srgb, ${theme.textColor} 25%, ${theme.backgroundColor})` : theme.textColor,
        }}>
          {headline}
        </h1>

        {/* CTA pill — centred over the text, fades in on hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0px)' : 'translateY(8px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            pointerEvents: 'none',
          }}
        >
          <button
            style={{
              backgroundColor: theme.textColor,
              color: theme.backgroundColor,
              border: 'none',
              borderRadius: '999px',
              padding: '0.7rem 1.8rem',
              fontSize: 'clamp(0.6rem, 0.8vw, 0.8rem)',
              fontWeight: 700,
              letterSpacing: '0.09em',
              cursor: 'pointer',
              fontFamily: font.heading,
              pointerEvents: 'none',
            }}
          >
            {copied ? 'COPIED!' : ctaText}
          </button>
        </div>
      </div>

      {/* Footer */}
      {(brandName || copyright) && (
        <div style={{
          position: 'absolute',
          bottom: '5vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.35rem',
          opacity: 0.45,
          fontSize: '0.7rem',
          letterSpacing: '0.04em',
          lineHeight: 1.5,
          textAlign: 'center',
          pointerEvents: 'none',
        }}>
          <span style={{ fontSize: '1.1rem' }}>☺</span>
          {brandName && <div>{brandName}</div>}
          {copyright && <div>{copyright}</div>}
        </div>
      )}
    </div>
  )
}
