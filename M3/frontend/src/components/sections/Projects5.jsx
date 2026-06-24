import React from 'react';

export default function Projects5({ props }) {
  const { projects = [] } = props || {};

  if (!projects || projects.length === 0) {
    return (
      <section className="h-screen flex items-center justify-center">
        <p className="text-gray-500">No projects added yet.</p>
      </section>
    );
  }

  return (
    <section className="w-full bg-[var(--color-bg,#fff)] text-[var(--color-text,#000)] overflow-hidden">
      {projects.map((proj, idx) => {
        const isEven = idx % 2 === 0;
        const src = (proj.images && proj.images.length > 0) ? (proj.images[0].url || proj.images[0]) : '';
        
        return (
          <div 
            key={idx} 
            className={`flex flex-col md:flex-row w-full h-[60vh] md:h-[100vh] ${isEven ? '' : 'md:flex-row-reverse'}`}
          >
            {/* Text Side (Exchanging left/right) */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-end p-8 md:px-[10%] md:pb-4">
              <div className="flex items-baseline justify-between w-full">
                <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-none mb-0">
                  {proj.name || 'Untitled'}
                </h3>
                <span className="text-3xl md:text-5xl font-bold mb-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Image Side (Exchanging right/left) */}
            <div className="w-full md:w-1/2 h-full">
              {src ? (
                <img src={src} alt={proj.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}