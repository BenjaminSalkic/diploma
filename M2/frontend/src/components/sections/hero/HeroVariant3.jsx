export default function HeroVariant3({ props, global }) {
  const { name = '', badge = '', description = '' } = props
  const { theme, font } = global

  return (
    <section
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{ backgroundColor: theme.backgroundColor, fontFamily: font.heading, color: theme.textColor }}
    >
      {/* Top-left badge */}
      {badge && (
        <div className="absolute top-6 left-6 text-xs tracking-widest z-10" style={{ opacity: 0.7 }}>
          {badge}
        </div>
      )}

      {/* Giant name + description grouped together, centered */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1
          className="font-black leading-none whitespace-nowrap select-none w-full text-center"
          style={{ fontSize: '19vw', color: theme.textColor, transform: 'scaleY(1.65)', transformOrigin: 'center' }}
        >
          {name}
        </h1>

        {description && (
          <div className="mt-16 px-6 max-w-xs self-start">
            <p className="text-sm leading-relaxed" style={{ opacity: 0.75 }}>
              {description}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
