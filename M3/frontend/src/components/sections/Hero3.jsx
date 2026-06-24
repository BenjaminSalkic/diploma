import React from 'react';

export default function Hero3({ props }) {
  const { name, description } = props || {};

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center bg-transparent py-20 overflow-hidden">
      
      {/* Top Left Optional Tag/Date */}
      <div className="absolute top-8 left-8 lg:top-12 lg:left-12">
        <p className="text-sm font-medium tracking-wide">
          © {new Date().getFullYear()}:V.0
        </p>
      </div>

      {/* Massive Left-Aligned Name */}
      <div className="w-full flex items-center justify-start my-auto whitespace-nowrap">
        <h1 
          className="font-heading font-black leading-none uppercase tracking-tighter inline-block scale-y-[1.3] origin-left"
          style={{ fontSize: 'clamp(8rem, 25vw, 30rem)' }}
        >
          {name || "ROBERT BORG"}
        </h1>
      </div>

      {/* Bottom Left Small Description */}
      <div className="absolute bottom-8 left-8 lg:bottom-16 lg:left-16 max-w-sm">
        <p className="text-base md:text-lg font-medium leading-tight">
          {description || "I'm Robert Borghesi an economist turned into a Creative Coder specialised in WebGL and immersive experiences."}
        </p>
      </div>

    </section>
  );
}
