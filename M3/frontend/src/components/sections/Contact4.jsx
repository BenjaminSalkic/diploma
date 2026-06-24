import React from 'react';

export default function Contact4({ props }) {
  const {
    subtitle = "Get in touch ↴",
    description = "Here several ways you can slide into my DMs, but be aware, I might be busy aping on the fresh new memecoin in cryptoland or curating <u style=\"text-underline-offset: 4px;\">deathcore</u> — <u style=\"text-underline-offset: 4px;\">metal</u> — <u style=\"text-underline-offset: 4px;\">electro</u> playlists on spotify.",
    links = [
      { name: "(TWITTER)", url: "#" },
      { name: "(MAIL)", url: "#" },
      { name: "(LINKEDIN)", url: "#" }
    ],
    styles = {}
  } = props || {};

  return (
    <section 
      className="relative w-full min-h-[70vh] flex flex-col md:flex-row items-center font-sans tracking-tight"
      style={{
        backgroundColor: styles.bgColor || 'var(--color-bg, #2a2a2a)',
        color: styles.textColor || 'var(--color-text, #ffffff)'
      }}
    >
      <div className="w-full md:w-1/2"></div>
      
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
        <p className="text-sm opacity-70 mb-8">{subtitle}</p>
        
        <h2 
          className="text-2xl md:text-3xl lg:text-4xl font-medium leading-normal mb-16 max-w-2xl"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        
        <div className="flex flex-col space-y-3 font-medium text-sm md:text-base">
          {links.map((link, index) => (
            <a 
              key={index} 
              href={link.url} 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-6 hover:opacity-60 transition-opacity w-fit"
            >
              <span className="text-xs">↗</span>
              <span>{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}