import React from 'react';

export default function Hero2({ props }) {
  const { name, position, description } = props || {};

  return (
    <section 
      className="relative w-full min-h-screen flex flex-col items-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Background Effect Simulation */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ backgroundColor: 'var(--color-bg)' }}>
        {/* Core central light burst pushing upwards - Made brighter, taller, and larger */}
        <div className="absolute bottom-[0%] left-1/2 -translate-x-1/2 w-[200vw] h-[150vh] md:w-[150vw] md:h-[180vh] rounded-[100%] blur-[100px] opacity-100" 
             style={{ background: 'radial-gradient(ellipse at center, var(--color-primary) 15%, transparent 70%)' }}></div>

        {/* Top hanging clouds carving into the light to create moody shadows at the top */}
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vh] rounded-[100%] blur-[80px] opacity-100" style={{ backgroundColor: 'var(--color-bg)' }}></div>
        <div className="absolute top-[-30%] left-[20%] w-[50vw] h-[70vh] rounded-[100%] blur-[90px] opacity-100" style={{ backgroundColor: 'var(--color-bg)' }}></div>
        <div className="absolute top-[-15%] right-[-10%] w-[70vw] h-[65vh] rounded-[100%] blur-[100px] opacity-100" style={{ backgroundColor: 'var(--color-bg)' }}></div>
        
        {/* Inner moody wisps mapping inside the light */}
        <div className="absolute top-[10%] left-[15%] w-[40vw] h-[40vh] rounded-[100%] blur-[80px] opacity-90" style={{ backgroundColor: 'var(--color-bg)' }}></div>
        <div className="absolute top-[5%] right-[15%] w-[50vw] h-[45vh] rounded-[100%] blur-[85px] opacity-80" style={{ backgroundColor: 'var(--color-bg)' }}></div>

        {/* Side shadows wrapping the light */}
        <div className="absolute top-[30%] left-[-20%] w-[50vw] h-[80vh] rounded-[100%] blur-[90px] opacity-95" style={{ backgroundColor: 'var(--color-bg)' }}></div>
        <div className="absolute top-[25%] right-[-25%] w-[55vw] h-[85vh] rounded-[100%] blur-[95px] opacity-95" style={{ backgroundColor: 'var(--color-bg)' }}></div>
        
        {/* Sharp Foreground Valley (No blur, taller on sides) */}
        <div className="absolute bottom-[-1%] w-full h-[35vh]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Using a cubic bezier curve to create a wavy valley silhouette */}
            <path d="M0,35 C20,35 40,80 50,80 C60,80 80,35 100,5 L100,105 L0,105 Z" fill="var(--color-bg)" />
          </svg>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex-col items-center justify-center flex-1 flex w-full h-full pt-32" style={{ color: 'var(--color-text)' }}>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading mb-4 text-center tracking-tight" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
          {name || "Steven Mengin"}
        </h1>
        <p className="text-xl md:text-2xl text-center font-medium opacity-90" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
          {position || "Creative Director"}
        </p>
      </div>

      {/* Bottom Corner Overlays */}
      <div className="relative z-20 w-full flex justify-end items-end p-6 md:p-12 mt-auto" style={{ color: 'var(--color-text)' }}>
        <p className="max-w-sm text-xs md:text-sm text-right leading-relaxed font-semibold opacity-90">
          {description || "Clients include Google, adidas, Sonos, Spotify, X, LuluLemon, Oculus, La Mer, Instagram, META, eBay, THX, Warner Brothers and more."}
        </p>
      </div>
    </section>
  );
}
