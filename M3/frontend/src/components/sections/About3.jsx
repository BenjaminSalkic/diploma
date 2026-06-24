import React from 'react';

export default function About3({ props }) {
  const { 
    rightTitle = "About ⤵",
    description = "Hey there. I'm Robert and I'm a creative\ndeveloper. I've been in the industry since 2018\nand I work in the intersection between\ngenerative art and creative coding with some\nsparkles of web3 on top.\n\nI've been working with top notch clients in the\nlikes of Gucci, Google, Adidas, Longines,\nValentino, LG, Sap, MaxMara, Metamask, Blitz\nand creative agencies as Immersive Garden,\nOddCommon, Demodern, Outpost, Wildlife,\nDotDotDash, Antinomy, Dentsu and more.\n\nIn 2023, 2024 and 2025 I hosted an IRL\nworkshop at Harbour Space University in\nBarcelona pretending I know WebGL.\n\nIn Sept 2024, reached my dev-prime after\nattending the AWWWARDS Conference in\nValencia as speaker. Yay, bragging.",
    fields = [
      {
        title: "Achievements ⤵",
        list: "1x FWA SOTM\n8x AWWWARDS SOTD\n16x FWA SOTD\n5x WEBBY"
      },
      {
        title: "Conferences Talks ⤵",
        list: "'24 AWWW ARDS – Valencia\n'24 TOUCH – Tblisi"
      },
      {
        title: "Publications ⤵",
        list: "↗ DO — How to React-Three-Fiber\n↗ Codrops — Procedural Clouds"
      },
      {
        title: "Special thanks ⤵",
        list: "↗ Mike (thrax)\n↗ Lorenzo Cadamuro\n↗ Valentino Borghesi"
      }
    ],
    styles = {}
  } = props || {};

  // Split description paragraphs by double newline to match the spaced paragraph look
  const paragraphs = description.split('\n\n').filter(Boolean);

  return (
    <section 
      className={`relative w-full min-h-screen overflow-hidden font-sans flex items-start ${styles.paddingY || 'py-20 md:py-32 lg:py-40'}`}
      style={{
        backgroundColor: styles.bgColor || 'var(--color-bg, #222)',
        color: styles.textColor || 'var(--color-text, #fff)'
      }}
    >
      <div className={`w-full px-6 md:px-12 lg:px-24 flex flex-col-reverse lg:flex-row gap-16 lg:gap-24 relative z-10 ${styles.paddingX || ''}`}>
        
        {/* Left Side: Dynamic List Fields */}
        <div className="w-full lg:w-[35%] flex flex-col justify-start space-y-12">
          {fields && fields.map((field, idx) => {
            const listItems = field.list 
                ? field.list.split('\n').map(i => i.trim()).filter(Boolean) 
                : [];

            return (
              <div key={idx} className="flex flex-col space-y-5">
                {/* Field Title */}
                {field.title && (
                  <h4 className="text-sm md:text-base font-medium opacity-50 tracking-wide">
                    {field.title}
                  </h4>
                )}
                
                {/* List Items */}
                {listItems.length > 0 && (
                  <ul className="flex flex-col space-y-2 text-sm md:text-base font-medium tracking-wide">
                    {listItems.map((item, idxi) => {
                      // Attempt to create a neat two-column prefix look from the mockup 
                      // (e.g. "1x", "'24", "↗") by splitting at the first space
                      const firstSpaceIdx = item.indexOf(' ');
                      if (firstSpaceIdx > 0 && firstSpaceIdx <= 5) {
                        const prefix = item.substring(0, firstSpaceIdx);
                        const rest = item.substring(firstSpaceIdx + 1);
                        return (
                          <li key={idxi} className="flex gap-4">
                            <span className="w-6 md:w-8 opacity-90 shrink-0">{prefix}</span>
                            <span className="opacity-90">{rest}</span>
                          </li>
                        );
                      }
                      // Fallback if no short prefix matches
                      return <li key={idxi} className="opacity-90">{item}</li>;
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Side: Header + Large Description */}
        <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col justify-start lg:ml-auto">
          {rightTitle && (
             <h4 className="text-sm md:text-base font-medium opacity-50 tracking-wide mb-6">
               {rightTitle}
             </h4>
          )}
          <div className="flex flex-col space-y-6 md:space-y-8">
            {paragraphs.map((para, idx) => (
              <p key={idx} className="text-lg md:text-xl lg:text-[1.35rem] xl:text-[1.5rem] leading-[1.35] md:leading-[1.4] lg:leading-[1.5] tracking-tight font-medium opacity-90 whitespace-pre-line">
                {para}
              </p>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}