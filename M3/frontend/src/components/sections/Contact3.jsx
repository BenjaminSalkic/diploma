import React from 'react';

export default function Contact3({ props }) {
  const {
    links = [
      { name: "Linkedin", url: "#" },
      { name: "Github", url: "#" },
      { name: "Mail", url: "#" }
    ],
    bottomText = "LET'S TALK",
    styles = {}
  } = props || {};

  return (
    <section 
      className="relative w-full min-h-screen flex flex-col justify-end font-sans overflow-hidden"
      style={{
        backgroundColor: styles.bgColor || 'var(--color-bg, #dcedc8)',
        color: styles.textColor || 'var(--color-text, #000)'
      }}
    >
      <div className="w-full px-8 md:px-16 pt-24 pb-6 flex flex-col items-start text-lg md:text-xl font-medium space-y-2 relative z-10">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity"
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="w-full px-8 md:px-16 relative z-10 mb-8 md:mb-12">
        <div className="w-full border-t border-current opacity-30"></div>
      </div>

      <div className="w-full overflow-hidden relative flex items-end justify-center pointer-events-none">
        {/* Large bottom text, truncated / overflowing */}
        <h1 
          className="text-[10rem] md:text-[16rem] lg:text-[22rem] font-black leading-[0.75] tracking-tighter whitespace-nowrap"
          style={{ transform: 'translateY(15%)' }}
        >
          {bottomText}
        </h1>
      </div>
    </section>
  );
}