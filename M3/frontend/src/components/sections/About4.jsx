import React from 'react';

export default function About4({ props }) {
  const {
    ellipseText = "CONTINUE THE JOURNEY / ",
    marquee1 = "SANNISAHIL",
    marquee2 = "PORTFOLIO",
    titleLine1 = "HELLO,",
    titleLine2 = "I'M",
    titleHighlight = "SANNI SAHIL",
    description = "A DEDICATED WEB DESIGNER AND DESIGN DIRECTOR\nWITH OVER 8 YEARS OF EXPERIENCE IN THE INDUSTRY.",
    footerText = "LET'S DESIGN-DIVE! EXPLORE SELECTED PROJECTS.",
    styles = {}
  } = props || {};

  // Repeat texts to ensure smooth wrapping and marquee flow
  const repeatedEllipse = Array(10).fill(ellipseText).join('');
  const repeatedMarquee1 = Array(15).fill(marquee1);
  const repeatedMarquee2 = Array(15).fill(marquee2);

  return (
    <section 
      className="relative w-full min-h-screen flex flex-col md:flex-row overflow-hidden font-sans"
      style={{
        backgroundColor: styles.bgColor || 'var(--color-bg, #fff)',
        color: styles.textColor || 'var(--color-text, #000)'
      }}
    >
      <style>{`
        @keyframes marquee-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0%); }
        }
        @keyframes marquee-up {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-50%); }
        }
        .animate-marquee-down {
          /* Using h-max logic to run -50% perfectly, needs sufficient items */
          animation: marquee-down 15s linear infinite;
        }
        .animate-marquee-up {
          animation: marquee-up 15s linear infinite;
        }
      `}</style>

      {/* Left Canvas: Black area with Ellipse */}
      <div className="w-full md:w-[45%] h-[50vh] md:h-screen bg-[var(--color-bg,#000)] relative flex items-center justify-center overflow-hidden" style={{ backgroundColor: styles.bgColor || 'var(--color-text, #000)' }}>
        {/* SVG Ellipse Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 1000 1000" className="w-[110%] h-[110%] max-w-none origin-center scale-100 md:scale-100">
            
            <defs>
              <path id="ellipse-path-circle" d="M 500, 500 m -350, 0 a 350,350 0 1,1 700,0 a 350,350 0 1,1 -700,0" />
            </defs>

            {/* Darker background shadow text - tilted more */}
            <g transform="rotate(20 500 500) scale(0.65, 1.4) translate(280, -140)">
              <text className="text-[15px] uppercase font-bold" fill="var(--color-primary)" opacity="0.3" letterSpacing="4">
                <textPath href="#ellipse-path-circle" startOffset="0%">{repeatedEllipse}</textPath>
              </text>
              <text className="text-[15px] uppercase font-bold" fill="var(--color-primary)" opacity="0.3" letterSpacing="4">
                <textPath href="#ellipse-path-circle" startOffset="50%">{repeatedEllipse}</textPath>
              </text>
            </g>

            {/* Brighter foreground text - tilted less */}
            <g transform="rotate(-15 500 500) scale(0.6, 1.4) translate(340, -140)">
              <text className="text-[16px] uppercase font-extrabold" fill="var(--color-primary)" letterSpacing="5">
                <textPath href="#ellipse-path-circle" startOffset="10%">{repeatedEllipse}</textPath>
              </text>
              <text className="text-[16px] uppercase font-extrabold" fill="var(--color-primary)" letterSpacing="5">
                <textPath href="#ellipse-path-circle" startOffset="60%">{repeatedEllipse}</textPath>
              </text>
            </g>

          </svg>
        </div>
      </div>

      {/* Middle Marquee Strip */}
      <div 
        className="hidden md:flex w-[8%] h-screen border-x relative overflow-hidden shrink-0" 
        style={{ 
          borderColor: 'var(--color-primary)', 
          backgroundColor: styles.bgColor || 'var(--color-bg, #fff)' 
        }}
      >
        
        {/* Waterfall Down */}
        <div className="w-1/2 h-full relative overflow-hidden flex justify-center border-r" style={{ borderColor: 'var(--color-primary)' }}>
           <div className="absolute top-0 flex flex-col font-bold tracking-widest uppercase animate-marquee-down h-max" style={{ color: 'var(--color-text, #aaa)' }}>
             {/* Double the array so animating to -50% perfectly aligns without empty jumping */}
             {[...repeatedMarquee1, ...repeatedMarquee1].map((txt, i) => (
               <div 
                 key={i} 
                 className={`py-1 text-[0.65rem] ${i % 2 === 0 ? 'text-[var(--color-primary)]' : ''}`} 
                 style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
               >
                 {txt}
               </div>
             ))}
           </div>
        </div>
        
        {/* Waterfall Up */}
        <div className="w-1/2 h-full relative overflow-hidden flex justify-center">
           <div className="absolute top-0 flex flex-col font-bold tracking-widest uppercase animate-marquee-up h-max" style={{ color: 'var(--color-text, #222)' }}>
             {[...repeatedMarquee2, ...repeatedMarquee2].map((txt, i) => (
               <div 
                 key={i} 
                 className={`py-1 text-[0.65rem] ${i % 2 !== 0 ? 'text-[var(--color-primary)]' : ''}`} 
                 style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
               >
                 {txt}
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* Right Side Canvas */}
      <div className="w-full md:w-[47%] h-screen flex flex-col justify-center relative" style={{ backgroundColor: styles.bgColor || 'var(--color-bg, #fff)', color: styles.textColor || 'var(--color-text, #000)' }}>
        <div className="px-12 lg:px-24 flex flex-col flex-1 justify-center space-y-12">
          
          {/* Decorative Dot */}
          <div className="w-3 h-3 rounded-full self-center mb-8" style={{ backgroundColor: 'var(--color-text, #000)' }}></div>

          {/* Huge Welcome Title */}
          <div>
            <h2 className="text-5xl lg:text-[4rem] xl:text-[5rem] font-bold leading-none tracking-tight">
              {titleLine1}
              <br />
              {titleLine2} <span className="text-[var(--color-primary)]">{titleHighlight}</span>
            </h2>
          </div>

          {/* Description */}
          <div className="max-w-lg mt-8">
            <p className="text-sm md:text-base lg:text-lg font-medium leading-relaxed tracking-wide opacity-90 whitespace-pre-wrap">
              {description}
            </p>
          </div>
        </div>
        
        {/* Bottom Footer Border Layout */}
        <div className="w-full border-t border-b py-6 px-12 lg:px-24 mt-auto mb-20 flex justify-between items-center text-xs font-bold tracking-widest uppercase" style={{ borderColor: 'var(--color-primary)' }}>
          <span>{footerText}</span>
          <span>→</span>
        </div>
      </div>

    </section>
  );
}