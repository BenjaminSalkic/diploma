import React from 'react';

export default function About1({ props }) {
  const { 
    title = "HELLO. I AM DAVID",
    subtitle = "Patrick David",
    description = "I USE MY PASSION AND SKILLS\nTO CREATE DIGITAL PRODUCTS AND\nEXPERIENCES. NATIONAL AND INTERNATIONAL\nCUSTOMERS RELY ON ME FOR DESIGN,\nIMPLEMENTATION, AND MANAGEMENT OF\nTHEIR DIGITAL PRODUCTS. AS AN\nINDEPENDENT, I WORK ALSO WITH WEB\nAGENCIES, COMPANIES, STARTUPS AND\nINDIVIDUALS TO CREATE A BLUEPRINT FOR THE\nDIGITAL BUSINESS. ADVISOR AND PARTNER OF\nSOME DIGITAL AND FINTECH STARTUPS. ALSO,\nJUDGE AT CSSDA AND THE WEBBY.",
    image = "" 
  } = props || {};

  return (
    <section className="relative w-full min-h-screen bg-[var(--color-bg,#111)] text-[var(--color-text,#fff)] flex justify-center items-center py-32 md:py-48 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8 relative z-10 w-full max-w-7xl">
        
        {/* Left Box */}
        <div className="w-full md:w-1/2 flex flex-col items-start z-10 relative">
           <div className="w-full flex flex-col items-start space-y-6">
              
              {/* Header Box */}
              <div className="w-full flex flex-col items-start pt-16">
                 {/* Title: uses scale-y to emulate that condensed tall font look without requiring a custom font */}
                 <h2 className="text-[4rem] md:text-[5rem] lg:text-[5.5rem] font-bold uppercase tracking-tighter transform scale-y-[1.6] md:scale-y-[1.8] origin-top font-heading leading-[0.8] drop-shadow-md text-left w-full whitespace-pre-wrap break-words">
                   {title}
                 </h2>
                 {/* Subtitle */}
                 {subtitle && (
                  <div className="text-left mt-32 md:mt-40 lg:mt-48 font-serif text-sm tracking-wide text-[#d9c7b1] w-full relative z-20">
                    {subtitle}
                  </div>
                 )}
              </div>

              {/* Description body */}
              <div className="w-full pt-8">
                 <p className="text-sm md:text-base lg:text-lg leading-relaxed tracking-wider font-semibold uppercase opacity-90 text-left whitespace-pre-wrap max-w-xl">
                    {description}
                 </p>
              </div>

           </div>
        </div>

        {/* Right Box (Image with custom mask to integrate with dark background) */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end z-0 md:-ml-8 pointer-events-none mt-12 md:mt-0">
           {image ? (
             <div className="relative">
               <img src={image} alt="about" className="max-w-xs md:max-w-xl lg:max-w-2xl w-full h-auto object-contain drop-shadow-2xl brightness-75 contrast-125 mix-blend-screen" />
               {/* Edge gradients to blend the image seamlessly into the background color */}
               <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg,#111)] via-transparent to-transparent opacity-80" />
               <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg,#111)] via-transparent to-transparent opacity-80" />
               <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg,#111)] via-transparent to-transparent opacity-50" />
             </div>
           ) : (
             <div className="w-64 h-64 bg-gray-800 rounded flex items-center justify-center text-gray-500">No Image</div>
           )}
        </div>
        
      </div>
    </section>
  );
}