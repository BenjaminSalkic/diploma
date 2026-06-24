export default function HeroVariant2({ props, global }) {
  const { name = '', role = '', description = '' } = props
  const { theme, font } = global
  const { backgroundColor: bg, primaryColor: primary, textColor: text } = theme

  return (
    <section
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: bg, fontFamily: font.heading }}
    >
      {/* Broad sky atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 130% 90% at 50% 32%,
            ${primary}bb 0%,
            ${primary}88 20%,
            ${primary}44 45%,
            ${primary}11 68%,
            transparent 85%
          )`,
        }}
      />

      {/* Edge vignette — darkens corners and sides */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `radial-gradient(ellipse 65% 65% at 50% 45%,
            transparent 30%,
            ${bg}66 60%,
            ${bg}cc 80%,
            ${bg}ee 100%
          )`,
        }}
      />

      {/* Tight horizon sun-spot */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 28% 18% at 50% 54%,
            ${primary}ff 0%,
            ${primary}cc 25%,
            ${primary}44 55%,
            transparent 75%
          )`,
        }}
      />

      <svg
        className="absolute bottom-0 left-0 w-full z-[2]"
        viewBox="0 0 1440 540"
        preserveAspectRatio="none"
        style={{ height: '65%' }}
      >
        <defs>
          <filter id="v2-blur-far" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="v2-blur-mid" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <filter id="v2-blur-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="20" />
          </filter>
        </defs>

        {/* Mist bleeding through far-range valleys */}
        <ellipse cx="720" cy="270" rx="380" ry="70" fill={primary} fillOpacity="0.28" filter="url(#v2-blur-glow)" />
        <ellipse cx="280" cy="300" rx="200" ry="45" fill={primary} fillOpacity="0.14" filter="url(#v2-blur-glow)" />
        <ellipse cx="1160" cy="290" rx="220" ry="50" fill={primary} fillOpacity="0.14" filter="url(#v2-blur-glow)" />

        {/* Far mountain range — blurry, atmospheric */}
        <path
          d="M-60,230 C40,120 160,250 300,150 C420,65 540,195 660,120
             C780,50 900,185 1040,105 C1160,35 1300,170 1500,90 L1500,540 L-60,540 Z"
          fill={bg}
          fillOpacity="0.52"
          filter="url(#v2-blur-far)"
        />

        {/* Mist seeping between far and mid range */}
        <ellipse cx="480" cy="340" rx="160" ry="32" fill={primary} fillOpacity="0.10" filter="url(#v2-blur-mid)" />
        <ellipse cx="960" cy="325" rx="180" ry="35" fill={primary} fillOpacity="0.10" filter="url(#v2-blur-mid)" />

        {/* Mid mountain range — slightly soft */}
        <path
          d="M-60,340 C60,248 210,345 390,272 C550,208 690,305 860,252
             C1010,204 1160,295 1320,248 C1420,218 1500,265 1500,265 L1500,540 L-60,540 Z"
          fill={bg}
          fillOpacity="0.78"
          filter="url(#v2-blur-mid)"
        />

        {/* Front mountain range — sharp, fully opaque */}
        <path
          d="M-60,428 C60,355 210,438 400,382 C570,330 710,415 900,368
             C1060,325 1220,400 1400,358 C1460,338 1500,375 1500,375 L1500,540 L-60,540 Z"
          fill={bg}
        />

        {/* Solid ground */}
        <rect x="-60" y="488" width="1560" height="60" fill={bg} />
      </svg>

      {/* Name + role */}
      <div className="relative z-10 text-center px-8">
        <h1
          className="font-normal leading-none"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: text }}
        >
          {name}
        </h1>
        {role && (
          <p
            className="mt-4 tracking-widest text-sm"
            style={{ color: text, opacity: 0.7 }}
          >
            {role}
          </p>
        )}
      </div>

      {/* Bottom-right description */}
      {description && (
        <p
          className="absolute bottom-8 right-8 max-w-xs text-right text-sm leading-relaxed z-10"
          style={{ color: text, opacity: 0.65 }}
        >
          {description}
        </p>
      )}
    </section>
  )
}
