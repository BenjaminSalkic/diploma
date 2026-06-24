export default function AboutVariant2({ theme, font, description, blocks }) {
  const backgroundColor = theme?.backgroundColor ?? '#ffffff'
  const textColor = theme?.textColor ?? '#111111'
  const headingFont = font?.heading ?? 'Inter, system-ui, sans-serif'
  const bodyFont = font?.body ?? 'Roboto, system-ui, sans-serif'
  const safeBlocks = Array.isArray(blocks) ? blocks : []

  return (
    <section className="about2-stage" style={{ backgroundColor, color: textColor }}>
      <div className="about2-inner">
        <div className="about2-left" style={{ fontFamily: headingFont }}>
          {description}
        </div>
        <div className="about2-right" style={{ fontFamily: bodyFont }}>
          {safeBlocks.map((block, index) => {
            const items = Array.isArray(block?.items) ? block.items.filter(Boolean) : []
            const text = block?.text || ''
            return (
              <div key={`${block?.title || 'block'}-${index}`} className="about2-block">
                {block?.title ? (
                  <p className="about2-block-title">{block.title}</p>
                ) : null}
                {text ? <p className="about2-block-text">{text}</p> : null}
                {items.length ? (
                  <div className="about2-block-list">
                    {items.map((item, itemIndex) => (
                      <span key={`${item}-${itemIndex}`}>{item}</span>
                    ))}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
