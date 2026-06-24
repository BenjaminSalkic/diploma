import React from 'react';

const Contact5 = ({ styles, props }) => {
  const { 
    description = "It's not client and supplier. It's equals; partners. Teamwork - smooth, enjoyable and incredibly productive. And from experience, the results are so much better for it.",
    lists = [
      {
        title: "STUDIO",
        items: [
          { name: "About", url: "#" },
          { name: "Work", url: "#" },
          { name: "Journal", url: "#" },
          { name: "Contact", url: "#" }
        ]
      },
      {
        title: "SOCIALS",
        items: [
          { name: "LinkedIn", url: "#" },
          { name: "Dribbble", url: "#" },
          { name: "Behance", url: "#" },
          { name: "Instagram", url: "#" }
        ]
      },
      {
        title: "STUDIO",
        items: [
          { name: "Airborne Studio\nNeighbourhood\n3 Sheaf Street\nLeeds LS10 1HD", isAddress: true },
          { name: "hello@airborne.studio", url: "mailto:hello@airborne.studio" }
        ]
      }
    ],
    bigText = "AIRBORNE"
  } = props || {};

  return (
    <section 
      className="w-full pt-20 px-8 lg:px-16" 
      style={{ 
        backgroundColor: styles?.bgColor || '#000000', 
        color: styles?.textColor || '#F5F5DC' 
      }}
    >
      <div className="w-full max-w-screen-2xl mx-auto flex flex-col gap-24">
        {/* Description */}
        <div className="max-w-xl text-lg md:text-xl lg:text-2xl leading-normal font-medium">
          {description}
        </div>

        {/* Lists */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
          {lists.map((list, index) => (
            <div key={index} className="flex flex-col">
              <h3 className="uppercase tracking-widest text-lg mb-6 font-semibold">{list.title}</h3>
              <ul className="flex flex-col gap-2 text-sm md:text-base opacity-90">
                {list.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {item.isAddress ? (
                      <span className="whitespace-pre-wrap leading-relaxed block">{item.name}</span>
                    ) : item.url ? (
                      <a href={item.url} className="hover:opacity-75 transition-opacity">{item.name}</a>
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Big Text */}
        <div className="w-full flex justify-center items-center mt-8 overflow-hidden">
          <h1 className="text-[15vw] sm:text-[18vw] font-black leading-none uppercase tracking-tighter w-full text-center select-none translate-y-[10%]" style={{ fontFamily: 'Impact, sans-serif' }}>
            {bigText}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Contact5;