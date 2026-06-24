export default function SkillsVariant2({ theme, font, titleLine1, titleLine2, skills }) {
  const backgroundColor = theme?.backgroundColor ?? '#0f0f0f'
  const textColor = theme?.textColor ?? '#ffffff'
  const headingFont = font?.heading ?? 'Inter, system-ui, sans-serif'
  const bodyFont = font?.body ?? 'Roboto, system-ui, sans-serif'
  const safeSkills = Array.isArray(skills) ? skills.filter(Boolean) : []

  return (
    <section className="skills2-stage" style={{ backgroundColor, color: textColor }}>
      <div className="skills2-inner">
        <div className="skills2-title" style={{ fontFamily: headingFont }}>
          <span>{titleLine1}</span>
          <span>{titleLine2}</span>
        </div>
        <div className="skills2-rule" />
        <div className="skills2-grid" style={{ fontFamily: bodyFont }}>
          {safeSkills.map((skill, index) => (
            <span key={`${skill}-${index}`} className="skills2-skill">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
