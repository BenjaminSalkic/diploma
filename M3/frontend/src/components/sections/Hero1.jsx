import React from 'react';

export default function Hero1({ props }) {
  const { headline, images } = props || {};

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-transparent py-20">
      {/* Decorative Images */}
      {images && images.map((img, idx) => {
        // Larger edge-positioned images
        const positions = [
          "bottom-0 left-0",
          "bottom-0 right-0",
          "bottom-0 left-1/2 -translate-x-1/2"
        ];
        const posClass = positions[idx % positions.length];
        
        return (
          <img 
            key={idx} 
            src={img.url || img} 
            alt={`Hero decorative ${idx + 1}`} 
            className={`absolute w-80 h-[28rem] md:w-[450px] md:h-[550px] object-cover ${posClass}`}
          />
        );
      })}

      {/* Main Headline */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center sm:text-left text-inherit">
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold font-heading leading-tight tracking-tight">
          {headline || "Creative agency building powerful digital solutions."}
        </h1>
      </div>
    </section>
  );
}
