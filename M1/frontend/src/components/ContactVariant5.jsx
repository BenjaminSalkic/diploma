export default function ContactVariant5({ theme, font, description, lists, bigText }) {
  const backgroundColor = theme?.backgroundColor ?? '#0f0f0f'
  const textColor = theme?.textColor ?? '#f5f0e6'
  const headingFont = font?.heading ?? 'Inter, system-ui, sans-serif'
  const bodyFont = font?.body ?? 'Roboto, system-ui, sans-serif'
  const safeLists = Array.isArray(lists) ? lists : []

  return (
    <section className="contact5-stage" style={{ backgroundColor, color: textColor }}>
      <div className="contact5-top" style={{ fontFamily: bodyFont }}>
        {description}
      </div>
      <div className="contact5-lists" style={{ fontFamily: bodyFont }}>
        {safeLists.map((list, index) => (
          <div key={`contact5-list-${index}`} className="contact5-list">
            {list?.title ? <p className="contact5-list-title">{list.title}</p> : null}
            <ul className="contact5-list-items">
              {(list?.items || []).map((item, itemIndex) => (
                <li key={`${item}-${itemIndex}`}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="contact5-big" style={{ fontFamily: headingFont }}>
        {bigText}
      </div>
    </section>
  )
}
