import React from 'react';

export default function Skills2({ props }) {
  const { 
    smallText = "(ACTUALLY OPEN TO)",
    largeText = "PROFESSIONAL OPPORTUNITIES\nFREELANCE PROJECTS",
    stackLabel = "STACK",
    skills = [
      "NUXT.JS", "VUE.JS", "REACT", "NEXT.JS", "TYPESCRIPT", "SUPABASE", "REDIS", "TRPC",
      "MYSQL", "POSTGRESQL", "STORYBOOK", "SVELTE", "HTML", "SCSS", "STYLUS", "WEBGL",
      "THREE.JS", "GSAP", "WORDPRESS", "PRISMIC", "BLENDER"
    ]
  } = props || {};

  return (
    <section className="relative w-full min-h-screen bg-[var(--color-bg,#111)] text-[var(--color-text,#fff)] overflow-hidden flex flex-col justify-between py-12 md:py-16 gap-20">
      
      {/* Top Part: Massive Text */}
      <div className="w-full flex-grow flex flex-col justify-center">
        {smallText && (
          <div className="px-6 md:px-12 mb-8">
            <span className="text-xs md:text-sm font-bold tracking-widest uppercase opacity-90">{smallText}</span>
          </div>
        )}
        
        {/* Massive Text (overflowing and un-wrapping) */}
        <div className="w-full overflow-hidden flex flex-col gap-2">
          {largeText.split('\n').map((line, idx) => (
            <div 
              key={idx} 
              className={`whitespace-nowrap flex `}
            >
              {/* If it's an even line index (0, 2), shift left slightly. If odd (1), push right slightly to offset like the design */}
              <h2 
                className="text-[17vw] md:text-[13rem] lg:text-[16rem] font-bold uppercase tracking-tighter leading-[0.8] m-0 font-heading drop-shadow-sm" 
                style={{ marginLeft: idx % 2 !== 0 ? '-3vw' : '-1vw' }}
              >
                {line}
              </h2>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Part: Stack Line and Details */}
      <div className="w-full px-6 md:px-12 shrink-0">
        {/* Thin Separator Line */}
        <hr className="w-full border-t border-white/30 mb-8 md:mb-12" />
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-20">
          
          {/* Label side */}
          <div className="w-full md:w-[15%]">
            <h3 className="text-xs md:text-sm font-bold tracking-widest uppercase opacity-90">
              {stackLabel}
            </h3>
          </div>
          
          {/* Skills Grid */}
          <div className="w-full md:w-[85%]">
            {/* The mockup shows about 8 columns densely packed but neatly wrapping */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-y-6 md:gap-y-8 gap-x-4">
              {skills.map((skill, idx) => (
                <div key={idx} className="flex items-center">
                  <span className="text-xs md:text-[13px] font-bold tracking-widest uppercase opacity-90">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}