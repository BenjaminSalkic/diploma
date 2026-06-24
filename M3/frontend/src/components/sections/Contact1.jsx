import React from 'react';

export default function Contact1({ props }) {
  const {
    links = [
      { name: "Email", url: "#" },
      { name: "LinkedIn", url: "#" },
      { name: "Behance", url: "#" },
      { name: "Instagram", url: "#" }
    ],
    styles = {}
  } = props || {};

  return (
    <section 
      className="relative w-full min-h-screen flex flex-col items-center justify-center font-sans tracking-wide"
      style={{
        backgroundColor: styles.bgColor || 'var(--color-bg, #000)',
        color: styles.textColor || 'var(--color-text, #fff)'
      }}
    >
      <div className="flex flex-col items-center space-y-6 md:space-y-8 text-sm md:text-base font-medium">
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
    </section>
  );
}