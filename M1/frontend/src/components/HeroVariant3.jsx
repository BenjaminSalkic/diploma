export default function HeroVariant3({ theme, font, name, description, label }) {
  const textColor = theme?.textColor ?? '#ffffff'
  const backgroundColor = theme?.backgroundColor ?? '#111111'
  const headingFont = font?.heading ?? 'Inter, system-ui, sans-serif'
  const bodyFont = font?.body ?? 'Roboto, system-ui, sans-serif'

  return (
    <section className="relative flex min-h-[85vh] flex-col px-8 py-8">
      <div className="text-left text-xs" style={{ color: textColor, fontFamily: bodyFont }}>
        {label}
      </div>
      <div className="mt-12 flex-1">
        <h1
          className="max-w-none whitespace-nowrap text-[18vw] font-extrabold uppercase leading-[1.06] tracking-[0.06em]"
          style={{
            color: textColor,
            fontFamily: headingFont,
            transform: 'scaleX(0.9)',
            transformOrigin: 'left center',
          }}
        >
          {name}
        </h1>
      </div>
      <p
        className="-mt-6 max-w-md text-left text-sm leading-relaxed"
        style={{ color: textColor, fontFamily: bodyFont }}
      >
        {description}
      </p>
      <div className="absolute inset-0 -z-10" style={{ backgroundColor }} />
    </section>
  )
}
