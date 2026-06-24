export default function AboutVariant5({ theme, font, description, awards }) {
  const backgroundColor = theme?.backgroundColor ?? '#ffffff'
  const textColor = theme?.textColor ?? '#111111'
  const headingFont = font?.heading ?? 'Inter, system-ui, sans-serif'
  const bodyFont = font?.body ?? 'Roboto, system-ui, sans-serif'
  const safeAwards = Array.isArray(awards) ? awards : []

  return (
    <section className="about5-stage" style={{ backgroundColor, color: textColor }}>
      <div className="about5-inner">
        <p className="about5-description" style={{ fontFamily: headingFont }}>
          {description}
        </p>
        <div className="about5-list" style={{ fontFamily: bodyFont }}>
          {safeAwards.map((award, index) => (
            <div key={`award-${index}`} className="about5-row">
              <span className="about5-project">{award?.project || ''}</span>
              <span className="about5-giver">{award?.giver || ''}</span>
              <span className="about5-award">{award?.award || ''}</span>
              <span className="about5-year">{award?.year || ''}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
