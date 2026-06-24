import React from 'react';

export default function Skills1({ props }) {
  const { 
    backgroundImage = '',
    largeText1 = "LET'S",
    largeText2 = "CONNECT",
    subtitle = "I'M ALWAYS INTERESTED ABOUT",
    skills = [
      "UX/UI DESIGN", "FRONTEND DEVELOPMENT", 
      "WEBFLOW DEVELOPMENT", "DIGITAL CONSULTANT",
      "WORDPRESS DEVELOPMENT", "NEW BUSINESSES",
      "STARTUPS", "PIZZA"
    ]
  } = props || {};

  return (
    <section className="relative w-full h-screen bg-[var(--color-bg,#000)] text-[var(--color-text,#fff)] overflow-hidden flex items-center">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={backgroundImage} 
            alt="background" 
            className="w-full h-full object-cover" 
          />
        </div>
      )}

      {/* Left Side: Large Text */}
      <div className="absolute left-6 md:left-12 bottom-20 md:bottom-24 z-10 flex flex-col pointer-events-none origin-bottom-left transform scale-y-[1.5] md:scale-y-[1.8]">
        <h2 className="text-[15vw] md:text-[6rem] lg:text-[8rem] font-bold uppercase tracking-tighter leading-[0.8] m-0 font-heading drop-shadow-md">
          {largeText1}
        </h2>
        <h2 className="text-[15vw] md:text-[6rem] lg:text-[8rem] font-bold uppercase tracking-tighter leading-[0.8] m-0 font-heading drop-shadow-md">
          {largeText2}
        </h2>
      </div>

      {/* Center/Right Side: Skills Elements */}
      <div className="absolute inset-0 md:left-[30%] lg:left-[40%] flex flex-col items-center justify-center p-6 z-10 pointer-events-none">
        <div className="max-w-3xl flex flex-col items-center pt-20 md:pt-0 pointer-events-auto">
          {subtitle && (
            <h3 className="text-sm md:text-xl font-medium tracking-widest mb-6 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {subtitle}
            </h3>
          )}

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {skills.map((skill, idx) => (
              <div 
                key={idx} 
                className="px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-white/80 bg-transparent transition-colors hover:bg-white hover:text-black cursor-pointer backdrop-blur-[2px]"
              >
                <span className="text-xs md:text-[13px] font-medium tracking-widest uppercase">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Footer-ish elements from the mockup */}
      <div className="absolute bottom-6 md:bottom-8 left-0 w-full px-6 md:px-12 z-20 flex flex-col pointer-events-none">
        
        {/* Contact Block aligned to the right */}
        <div className="w-full flex items-center justify-center md:justify-end gap-4 mb-4 md:mb-6 pointer-events-auto pt-10">
          <p className="text-xs md:text-sm uppercase font-bold tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] m-0">
            ARE YOU MINDING A PROJECT?
          </p>
          <a href="#" className="px-5 py-2 md:px-6 md:py-2.5 bg-white text-black rounded-full text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors shadow-lg leading-none flex items-center">
            CONTACT ME
          </a>
        </div>

        {/* Thin Line */}
        <hr className="w-full border-t border-white/30 mb-4 md:mb-6" />

        {/* Bottom Links */}
        <div className="flex justify-between items-center w-full pointer-events-auto text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
            <a href="#" className="hover:opacity-100 transition-opacity">DRIBBBLE</a>
            <a href="#" className="hover:opacity-100 transition-opacity">BEHANCE</a>
            <a href="#" className="hover:opacity-100 transition-opacity">TWITTER</a>
            <a href="#" className="hover:opacity-100 transition-opacity">INSTAGRAM</a>
          </div>
          <div className="flex gap-4 hidden md:flex">
            <span>v1</span>
            <span>v2</span>
            <span>credits</span>
          </div>
        </div>
      </div>
    </section>
  );
}