export default function HeroVariant4({ theme, font, name, quote, description }) {
  const textColor = theme?.textColor ?? '#ffffff'
  const backgroundColor = theme?.backgroundColor ?? '#111111'
  const primaryColor = theme?.primaryColor ?? '#f5f5f5'
  const headingFont = font?.heading ?? 'Inter, system-ui, sans-serif'
  const bodyFont = font?.body ?? 'Roboto, system-ui, sans-serif'

  return (
    <section className="relative flex min-h-[90vh] flex-col">
      <h1
        className="max-w-none text-center text-[16vw] font-extrabold uppercase leading-[0.85] tracking-[0.04em]"
        style={{ color: textColor, fontFamily: headingFont }}
      >
        {name}
      </h1>
      <div className="flex flex-1 items-center justify-center text-center">
        <p
          className="max-w-[22rem] text-xs uppercase leading-relaxed tracking-[0.3em]"
          style={{ color: primaryColor, fontFamily: bodyFont }}
        >
          {quote}
        </p>
      </div>
      <div
        className="max-w-md text-left text-sm leading-relaxed"
        style={{ color: textColor, fontFamily: bodyFont }}
      >
        {description}
      </div>
      <div className="absolute inset-0 -z-10" style={{ backgroundColor }} />
    </section>
  )
}
