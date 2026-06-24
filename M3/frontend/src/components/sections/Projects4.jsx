import React, { useEffect, useRef, useState, useMemo } from 'react';

export default function Projects4({ props }) {
  const { title = "Works,", index = "02", projects = [] } = props || {};
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      const scrollDistance = rect.height - viewHeight;
      if (scrollDistance <= 0) return;
      
      const scrolled = -rect.top;
      let p = scrolled / scrollDistance;
      p = Math.max(0, Math.min(1, p));
      setProgress(p);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [projects.length]);

  if (!projects || projects.length === 0) {
    return (
      <section className="h-screen flex items-center justify-center">
        <p className="text-gray-500">No projects added yet.</p>
      </section>
    );
  }

  const numProjects = projects.length;
  let activeIndex = Math.floor(progress * numProjects);
  if (activeIndex >= numProjects) activeIndex = numProjects - 1;

  // We want the active project to be perfectly centered vertically inside its list container.
  // We'll translate the whole list up based on the active index.
  const activeProject = projects[activeIndex];
  const listOffset = -(activeIndex * 32); // Each item is 32px tall (e.g., h-8)

  // Pre-calculate randomized positions for images up to 6 per project
  // We'll use fixed layout zones so they scatter nicely around the center.
  const imageZones = [
    { top: '15%', left: '10%', width: 'w-64 md:w-80' },
    { top: '50%', right: '10%', width: 'w-72 md:w-96', transform: 'translateY(-50%)' },
    { bottom: '15%', left: '15%', width: 'w-56 md:w-72' },
    { top: '20%', right: '15%', width: 'w-60 md:w-80' },
    { bottom: '20%', right: '20%', width: 'w-64 md:w-80' },
    { top: '40%', left: '5%', width: 'w-48 md:w-64', transform: 'translateY(-50%)' },
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[var(--color-bg,#fff)] text-[var(--color-text,#000)]"
      style={{ height: `${numProjects * 75}vh` }} // Scrolling container height
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        
        {/* Top Left Title */}
        <div className="absolute top-10 left-10 z-20">
          <h2 className="text-6xl md:text-[8rem] font-bold tracking-tighter leading-none">{title}</h2>
        </div>

        {/* Huge background index number (just for aesthetic based on mockup) */}
        {index && (
          <div className="absolute top-1/2 left-10 md:left-32 -translate-y-1/2 z-0 font-bold">
            <span className="text-[10rem] md:text-[15rem] leading-none">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
          </div>
        )}

        {/* Scattered Images for Active Project */}
        <div className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500">
          {(activeProject?.images || []).map((img, idx) => {
            const src = img.url || img;
            if (typeof src !== 'string') return null;
            const zone = imageZones[idx % imageZones.length];

            return (
              <div 
                key={`${activeIndex}-${idx}`} // Key ties to active index so React mounts/unmounts allowing CSS animations
                className={`absolute ${zone.width} overflow-hidden shadow-xl animate-fade-in-up`}
                style={{
                  top: zone.top,
                  bottom: zone.bottom,
                  left: zone.left,
                  right: zone.right,
                  transform: zone.transform,
                }}
              >
                <img src={src} alt="" className="w-full h-auto object-cover" />
              </div>
            );
          })}
        </div>

        {/* Centered Scrolling List */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          {/* A fixed height wrapper that masks the list slightly and shows the pointer in the exact center */}
          <div className="relative w-full max-w-sm" style={{ height: '300px' }}>
            
            {/* The Pointer (Fixed vertically in center) */}
            <div className="absolute top-1/2 right-[10%] md:-right-8 -translate-y-1/2 text-xl font-bold flex items-center gap-4">
              <span>◄</span>
            </div>

            {/* The Scrollable List inside the mask */}
            <div 
              className="absolute w-full top-1/2 left-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: `translateY(calc(-50% + ${listOffset}px))` }}
            >
              {projects.map((proj, idx) => {
                const isActive = idx === activeIndex;
                const isClose = Math.abs(idx - activeIndex) === 1;

                return (
                  <div 
                    key={idx} 
                    className="h-[32px] flex items-center uppercase tracking-widest font-heading transition-all duration-300"
                    style={{
                      opacity: isActive ? 1 : isClose ? 0.4 : 0.1,
                      fontWeight: isActive ? 800 : 500,
                      transform: isActive ? 'scale(1.05)' : 'scale(1)',
                      transformOrigin: 'left center'
                    }}
                  >
                    {proj.name || 'Untitled Project'}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
      </div>

      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}