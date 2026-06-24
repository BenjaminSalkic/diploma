export default function HeroVariant4({ props, global }) {
  const { name = '', quote = '', description = '' } = props
  const { theme, font } = global

  return (
    <section
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{ backgroundColor: theme.backgroundColor, fontFamily: font.heading, color: theme.textColor }}
    >
      {/* Name — top, bleeds off edges */}
      <h1
        className="font-black leading-none whitespace-nowrap w-full text-center flex-shrink-0"
        style={{ fontSize: '19vw', color: theme.textColor, transform: 'scaleY(1.15)', transformOrigin: 'top' }}
      >
        {name}
      </h1>

      {/* Quote — centered in remaining space */}
      {quote && (
        <div className="flex-1 flex items-center justify-center px-8">
          <p
            className="text-center text-lg tracking-widest uppercase leading-relaxed"
            style={{ color: theme.textColor, opacity: 0.85, maxWidth: '280px' }}
          >
            {quote}
          </p>
        </div>
      )}

      {/* Description — bottom left */}
      {description && (
        <div className="px-6 pb-10 max-w-xs">
          <p
            className="text-sm tracking-widest uppercase leading-relaxed"
            style={{ color: theme.textColor, opacity: 0.7 }}
          >
            {description}
          </p>
        </div>
      )}
    </section>
  )
}
