import React, { useEffect, useState, useRef } from 'react';

export default function Projects2({ props }) {
  const { projects = [] } = props || {};
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const containerRef = useRef(null);

  // Generate random positions once so they don't jump around on re-renders
  // Uses a distributed zone grid so images don't stack on top of each other
  const randomPositions = React.useMemo(() => {
    return projects.map(p => {
      // 8 distinct safe zones across the screen to prevent overlay stacking
      const zones = [
        { top: 25, left: 20 }, { top: 25, left: 50 }, { top: 25, left: 80 },
        { top: 50, left: 20 }, { top: 50, left: 80 },
        { top: 75, left: 20 }, { top: 75, left: 50 }, { top: 75, left: 80 },
      ];
      
      // Shuffle the zones randomly for this specific project
      const shuffledZones = [...zones].sort(() => 0.5 - Math.random());

      return (p.images || []).map((_, i) => {
        // Grab a unique zone, fallback to pure random if they upload >8 images
        const zone = shuffledZones[i] || { 
          top: Math.floor(Math.random() * 60) + 20, 
          left: Math.floor(Math.random() * 60) + 20 
        };
        
        // Add a small randomized jitter (±5%) so it doesn't look too much like a rigid grid
        const finalTop = zone.top + (Math.random() * 10 - 5);
        const finalLeft = zone.left + (Math.random() * 10 - 5);

        return {
          top: `${finalTop}%`,
          left: `${finalLeft}%`,
          width: `${Math.floor(Math.random() * 14) + 20}rem`, // Wider: 20rem to 34rem
          height: `${Math.floor(Math.random() * 12) + 24}rem`, // Proportionally taller
          rotation: `${Math.floor(Math.random() * 16) - 8}deg`
        };
      });
    });
  }, [projects]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Use IntersectionObserver to determine which project section is currently taking up the screen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.getAttribute('data-index'), 10);
          setActiveProjectIdx(idx);
        }
      });
    }, {
      root: null,
      threshold: 0.5 // Trigger when at least 50% of the project container is visible
    });

    const projectNodes = containerRef.current.querySelectorAll('.project-section');
    projectNodes.forEach(node => observer.observe(node));

    return () => observer.disconnect();
  }, [projects]);

  if (!projects || projects.length === 0) {
    return <section className="h-screen flex items-center justify-center">No projects added yet.</section>;
  }

  const activeProject = projects[activeProjectIdx];

  return (
    <section ref={containerRef} className="relative w-full bg-transparent text-inherit">
      
      {/* 
        Sticky Project Pill 
        Sticks to the bottom center of the screen while scrolling through these projects.
      */}
      <div className="sticky top-0 h-0 z-50">
        <div className="absolute top-[85vh] left-1/2 transform -translate-x-1/2">
          {/* Inherit global colors if we want, or invert them. Assuming standard invert for visibility. */}
          <div className="bg-[var(--color-text,#111111)] text-[var(--color-bg,#ffffff)] px-8 py-4 rounded-lg shadow-xl inline-block transition-all duration-300">
            <h2 className="text-sm md:text-base font-bold font-heading tracking-widest uppercase m-0 leading-none">
              {activeProject?.name || "PROJECT NAME"}
            </h2>
          </div>
        </div>
      </div>

      {projects.map((project, idx) => (
        <div 
          key={idx} 
          data-index={idx}
          className="project-section relative w-full h-screen overflow-hidden"
        >
          {/* Scatter Images */}
          {(project.images || []).map((imgUrl, imgIdx) => {
            // Grab the securely generated random position for this exact image
            const pos = randomPositions[idx]?.[imgIdx] || { top: '50%', left: '50%', width: '15rem', height: '15rem', rotation: '0deg' };
            return (
              <img 
                key={imgIdx}
                src={imgUrl}
                alt={`${project.name} preview ${imgIdx}`}
                className="absolute object-cover shadow-2xl bg-black"
                style={{
                  top: pos.top,
                  left: pos.left,
                  width: pos.width,
                  height: pos.height,
                  transform: `translate(-50%, -50%) rotate(${pos.rotation})`,
                }}
              />
            );
          })}
          
          {/* Numbers in corners as seen in the mockup */}
          <div className="absolute bottom-8 left-8 text-sm font-medium tracking-wide">
            2023
          </div>
          <div className="absolute bottom-8 right-8 text-sm font-medium tracking-wide">
            N°{idx + 1}/{projects.length}
          </div>
        </div>
      ))}
      
    </section>
  );
}