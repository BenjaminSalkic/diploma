import { useEffect, useState } from 'react'

export default function HeroVariant2({ theme, font, name, role, footerNote }) {
  const [viewportHeight, setViewportHeight] = useState('100vh')
  const textColor = theme?.textColor ?? '#ffffff'
  const primaryColor = theme?.primaryColor ?? '#f5f5f5'
  const backgroundColor = theme?.backgroundColor ?? '#111111'
  const headingFont = font?.heading ?? 'Inter, system-ui, sans-serif'
  const bodyFont = font?.body ?? 'Roboto, system-ui, sans-serif'

  useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(`${window.innerHeight}px`)
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)

    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  return (
    <section className="relative overflow-hidden" style={{ minHeight: viewportHeight }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundColor,
          backgroundImage: [
            `radial-gradient(circle at 50% 26%, ${primaryColor} 0%, ${primaryColor} 30%, rgba(255, 255, 255, 0.7) 45%, rgba(255, 255, 255, 0) 60%)`,
            `radial-gradient(circle at 50% 32%, rgba(0, 0, 0, 0.45) 58%, rgba(0, 0, 0, 0.85) 78%, ${backgroundColor} 92%)`,
            `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.95) 85%)`,
          ].join(', '),
        }}
      />
      <div className="absolute inset-0">
        <div
          className="absolute left-1/2 top-[-10%] h-[44rem] w-[44rem] -translate-x-1/2 rounded-full blur-[140px]"
          style={{ backgroundColor: primaryColor, opacity: 0.9 }}
        />
        <div
          className="absolute left-1/2 top-[8%] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full blur-[120px]"
          style={{ backgroundColor: backgroundColor, opacity: 0.55 }}
        />
        <div
          className="absolute -left-20 bottom-[-8%] h-64 w-[55%] rounded-[100%]"
          style={{ backgroundColor }}
        />
        <div
          className="absolute right-[-6%] bottom-[-6%] h-64 w-[58%] rounded-[100%]"
          style={{ backgroundColor }}
        />
        <div
          className="absolute left-1/2 bottom-[-14%] h-72 w-[62%] -translate-x-1/2 rounded-[100%]"
          style={{ backgroundColor }}
        />
        <div
          className="absolute -left-24 bottom-[-14%] h-72 w-[60%] rounded-[100%] blur-2xl"
          style={{ backgroundColor, opacity: 0.65 }}
        />
        <div
          className="absolute right-[-14%] bottom-[-16%] h-80 w-[68%] rounded-[100%] blur-2xl"
          style={{ backgroundColor, opacity: 0.65 }}
        />
      </div>
      <div className="relative flex h-full min-h-[80vh] flex-col items-center justify-center px-6 py-24 text-center">
        <h1
          className="text-4xl font-semibold sm:text-6xl"
          style={{ color: textColor, fontFamily: headingFont }}
        >
          {name}
        </h1>
        <p className="mt-3 text-sm uppercase tracking-[0.3em]" style={{ color: textColor, fontFamily: bodyFont }}>
          {role}
        </p>
      </div>
      <div className="relative flex justify-end px-6 pb-10 sm:px-10">
        <p
          className="max-w-xs text-right text-xs leading-relaxed sm:text-sm"
          style={{ color: textColor, fontFamily: bodyFont }}
        >
          {footerNote}
        </p>
      </div>
    </section>
  )
}
