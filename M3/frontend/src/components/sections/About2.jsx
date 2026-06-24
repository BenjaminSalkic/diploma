import React from 'react';

export default function About2({ props }) {
  const { 
    description = "Built on principle and driven by passion,\nDen.Cool stands is the brainchild of Michele\nAngeloro, a free-spirited Creative and Art\nDirector based in Japan.\n\nWith a solid foundation in graphic design and\nover 15 years of experience across leading\nstudios and agencies in Italy, the United\nKingdom, and Japan, Den.Cool empowers\nbrands by weaving meaningful narratives into\ntheir designs, creating work that evokes a\ngenuine sense of wonder, togetherness and\nplay.",
    fields = [
      {
        title: "INPUT / OUTPUT",
        text: "ALWAYS FASCINATED BY FRESH PERSPECTIVES. I LOVE HEARING FROM NEW PEOPLE ABOUT THEIR IDEAS, PROJECTS, OR POTENTIAL COLLABORATIONS.\n\nUNSURE OF THE PATH TO STEER YOUR BRAND? LET'S TEAM UP TO CRAFT SOMETHING THAT TRULY CAPTURES YOUR BRAND ESSENCE AND SHINES BEAUTIFULLY.",
        list: "BRANDING\nIDENTITY\nDIGITAL\nMOTION\nPRINT\nCGI\nPACKAGING\nEXPERIENTIAL\nSIGNAGE\nINTERACTIVE\nWEB\nAPP"
      },
      {
        title: "WORKED WITH",
        text: "",
        list: "ARX RESEARCH\nCANADA GOOSE\nDOCOMO\nMERCARI\nMIZUNO\nMITSUKOSHI ISETAN\nNIKE\nRED BULL\nSHISEIDO\nSONY\nSQUARE\nSUBARU\nTOYOTA\nYAMAHA"
      },
      {
        title: "FEATURED ON",
        text: "",
        list: "AWWARDS\nFWA\nCSSDA\n365 BEST WEBSITES AROUND THE WORLD 2015&2017\nGREATEST CLICKS 2010&2016\nWEB DESIGNING YEAR BOOK 2016\nWEB DESIGNING (MULTIPLE ISSUES)\nCOMMUNICATION ARTS"
      }
    ]
  } = props || {};

  return (
    <section 
      className="relative w-full min-h-screen overflow-hidden font-sans flex items-center py-16 md:py-20 lg:py-24 bg-[var(--color-bg,#f3f3f3)] text-[var(--color-text,#111)]"
    >
      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 lg:gap-24 relative z-10 w-full max-w-[90rem]">
        
        {/* Left Side: Large Description */}
        <div className="w-full lg:w-[55%] flex flex-col justify-start">
          <p className="text-xl md:text-3xl lg:text-4xl xl:text-[2.1rem] leading-[1.15] md:leading-[1.2] lg:leading-[1.2] tracking-tight font-medium whitespace-pre-wrap opacity-90">
            {description}
          </p>
        </div>

        {/* Right Side: Dynamic Fields */}
        <div className="w-full lg:w-[45%] flex flex-col justify-start space-y-10 lg:pt-2 pl-0 lg:pl-10">
          {fields && fields.map((field, idx) => {
            // Split list by newlines and trim whitespace
            const listItems = field.list 
                ? field.list.split('\n').map(i => i.trim()).filter(Boolean) 
                : [];
            
            // Determine if we should split list into two columns
            // The mockup shows two columns for the first two and one straight column for the last,
            // we'll conditionally apply two columns if there are 4 or more short items.
            const useTwoColumns = listItems.length >= 4 && listItems.every(i => i.length < 25);

            return (
              <div key={idx} className="flex flex-col space-y-6">
                
                {field.title && (
                  <h4 className="text-[0.65rem] md:text-xs font-bold uppercase tracking-widest opacity-80">
                    {field.title}
                  </h4>
                )}
                
                {field.text && (
                  <div className="text-[0.65rem] leading-relaxed md:text-[0.7rem] md:leading-relaxed font-bold uppercase tracking-wider whitespace-pre-wrap opacity-90">
                    {field.text}
                  </div>
                )}
                
                {listItems.length > 0 && (
                  <ul className={`grid gap-x-4 gap-y-1 text-[0.65rem] md:text-[0.7rem] font-bold uppercase tracking-wider opacity-90 ${useTwoColumns ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {listItems.map((item, idxi) => (
                      <li key={idxi}>{item}</li>
                    ))}
                  </ul>
                )}
                
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}