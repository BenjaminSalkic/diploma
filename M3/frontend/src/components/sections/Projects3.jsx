import React, { useEffect, useRef, useState } from 'react';

export default function Projects3({ props }) {
  const { images = [] } = props || {};
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      // Calculate how far we've scrolled inside the container
      // When rect.top === 0, we are at the top of the container. 
      const scrollDistance = rect.height - viewHeight;
      if (scrollDistance <= 0) return; // Not enough slides to scroll
      
      const scrolled = -rect.top;
      
      let p = scrolled / scrollDistance;
      p = Math.max(0, Math.min(1, p)); // clamp to 0-1
      setProgress(p);
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial setup
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [images.length]);

  if (!images || images.length === 0) {
    return (
      <section className="h-screen flex items-center justify-center bg-transparent">
        <p className="text-gray-500">No project images added for carousel.</p>
      </section>
    );
  }

  const numSlides = images.length;
  // Create a smooth float index based on scroll progress
  const activeFloatIndex = progress * (numSlides - 1);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[var(--color-bg,#000)]"
      // Height allows scrolling. E.g. 150vh per slide to make it slow and smooth.
      style={{ height: `${numSlides * 150}vh` }} 
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
        {images.map((img, idx) => {
          // Calculate distance from center (0 is active, >0 is below/next, <0 is above/prev)
          const offset = idx - activeFloatIndex;
          
          // Math to spin around center
          // offset 1 = 60 degrees down (bottom)
          // offset -1 = -60 degrees up (top)
          const rotateX = offset * -60; 
          
          // Push items back based on how far they are from active, to give the "carousel/cylinder" feel
          const translateZ = -Math.abs(offset) * 400;
          
          // Pull items down/up slightly for extra clearance
          const translateY = offset * 50; // vh or %

          // Fade out items that are too far away
          const opacity = Math.max(0, 1 - Math.abs(offset) / 1.5);
          
          const src = img.url || img;
          if (typeof src !== 'string') return null;

          return (
            <div 
              key={idx} 
              className="absolute inset-0 m-auto flex items-center justify-center w-[85vw] md:w-[70vw] h-[70vh] max-w-5xl rounded-2xl overflow-hidden shadow-2xl"
              style={{
                transform: `rotateX(${rotateX}deg) translateZ(${translateZ}px) translateY(${translateY}%)`,
                opacity: opacity,
                zIndex: Math.round(100 - Math.abs(offset) * 10),
                transition: 'transform 0.1s linear, opacity 0.1s linear', // slight trailing smoothness
                willChange: 'transform, opacity'
              }}
            >
              <img src={src} alt={`Warping slide ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
          );
        })}
      </div>
    </section>
  );
}