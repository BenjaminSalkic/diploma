export default function HeroVariant1({ props, global }) {
  const { heading = '', images = [] } = props
  const { theme, font } = global

  return (
    <section
      className="min-h-screen relative overflow-hidden"
      style={{ color: theme.textColor, fontFamily: font.heading }}
    >
      <div className="relative px-8 pt-24 pb-8 z-10">
        <h1
          className="font-normal leading-none"
          style={{ fontSize: 'clamp(3rem, 7vw, 8rem)' }}
        >
          {heading}
        </h1>
      </div>

      {images[0] && (
        <div className="absolute bottom-0 left-0 w-[35vw] h-[75vh] overflow-hidden translate-y-1/4 z-0">
          <img src={images[0]} alt="" className="w-full h-full object-cover grayscale" />
        </div>
      )}
      {images[1] && (
        <div className="absolute bottom-0 right-0 w-[35vw] h-[75vh] overflow-hidden translate-y-1/4 z-0">
          <img src={images[1]} alt="" className="w-full h-full object-cover grayscale" />
        </div>
      )}
    </section>
  )
}
