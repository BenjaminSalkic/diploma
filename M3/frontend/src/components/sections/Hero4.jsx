import React from 'react';

export default function Hero4({ props }) {
  const { name, quote, description } = props || {};

  return (
    <section className="relative w-full min-h-screen flex flex-col bg-transparent overflow-hidden">
      
      {/* Massive Top-Aligned Name */}
      <div className="w-full flex justify-start pt-0">
        <h1 
          className="font-heading font-black leading-none uppercase tracking-tighter inline-block scale-y-[1.2] origin-top-left"
          style={{ fontSize: 'clamp(6rem, 21vw, 25rem)' }}
        >
          {name || "AIRBORNE"}
        </h1>
      </div>

      {/* Centered Quote */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-center text-sm md:text-base font-semibold tracking-widest uppercase max-w-[12rem] md:max-w-[14rem] mx-auto">
          {quote || "LEAD THE\nCHANGE, DON'T\nLET THE CHANGE\nLEAD YOU"}
        </p>
      </div>

      {/* Bottom Left Description */}
      <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 max-w-sm md:max-w-md">
        <p className="text-xs md:text-sm font-semibold tracking-wider uppercase leading-tight">
          {description || "BRAND, CREATIVE AND\nDEVELOPMENT PARTNERS TO\nTECH AND CULTURAL\nCHANGEMAKERS"}
        </p>
      </div>

    </section>
  );
}