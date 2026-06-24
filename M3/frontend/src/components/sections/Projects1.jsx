import React from 'react';

export default function Projects1({ props }) {
  const { title = "Selected projects", projects = [] } = props || {};

  return (
    <section className="relative w-full min-h-screen bg-transparent py-20 overflow-hidden">
      
      {/* Title */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-lg md:text-xl font-medium tracking-wide">{title}</h2>
      </div>

      <div className="relative w-full mx-auto">
        
        {/* Central Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 transform -translate-x-1/2 opacity-50 z-0 hidden md:block"></div>

        <div className="space-y-32">
          {projects && projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
                  <div key={index} className="relative flex flex-col md:flex-row items-center w-full z-10 mb-16 md:mb-32 group">
                    
                    {/* Image Container on the Edges */}
                    <div className={`w-full md:w-1/2 flex ${isEven ? 'ml-auto justify-end' : 'mr-auto justify-start'}`}>
                      {project.image ? (
                        <img 
                          src={project.image.url || project.image} 
                          alt={project.name} 
                          className="w-full h-[400px] md:h-[600px] object-cover shadow-xl"
                        />
                      ) : (
                        <div className="w-full h-[400px] md:h-[600px] bg-gray-200 shadow-xl flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Centered Text overlapping image */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-20 pointer-events-none flex flex-col justify-center items-center text-center px-4">
                      <p className="text-sm text-gray-500 mb-3 uppercase tracking-widest">{project.type || "Website"}</p>
                      <h3 className="text-4xl md:text-5xl lg:text-7xl font-heading font-medium leading-none text-inherit pointer-events-auto">
                        {project.name || "Project Name"}
                      </h3>
                    </div>

                  </div>
                );
              })}
            </div>

      </div>

    </section>
  );
}