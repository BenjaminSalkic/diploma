export default function AboutVariant3({ theme, font, description, blocks }) {
  const backgroundColor = theme?.backgroundColor ?? '#1f1f1f'
  const textColor = theme?.textColor ?? '#f5f5f5'
  const headingFont = font?.heading ?? 'Inter, system-ui, sans-serif'
  const bodyFont = font?.body ?? 'Roboto, system-ui, sans-serif'
  const safeBlocks = Array.isArray(blocks) ? blocks : []

  return (
    <section className="about3-stage" style={{ backgroundColor, color: textColor }}>
      <div className="about3-inner">
        <div className="about3-left" style={{ fontFamily: bodyFont }}>
          {safeBlocks.map((block, index) => {
            const items = Array.isArray(block?.items) ? block.items.filter(Boolean) : []
            const text = block?.text || ''
            return (
              <div key={`${block?.title || 'block'}-${index}`} className="about3-block">
                {block?.title ? (
                  <p className="about3-block-title">{block.title}</p>
                ) : null}
                {text ? <p className="about3-block-text">{text}</p> : null}
                {items.length ? (
                  <div className="about3-block-list">
                    {items.map((item, itemIndex) => (
                      <span key={`${item}-${itemIndex}`}>{item}</span>
                    ))}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
        <div className="about3-right" style={{ fontFamily: headingFont }}>
          {description}
        </div>
      </div>
    </section>
  )
}
