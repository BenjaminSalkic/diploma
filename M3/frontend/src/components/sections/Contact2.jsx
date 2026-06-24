import React, { useState } from 'react';

export default function Contact2({ props }) {
  const {
    title = "Let's work together",
    email = "hello@example.com",
    buttonText = "COPY EMAIL TO CLIPBOARD",
    footerName = "DEN.COOL",
    footerYear = "© 2024",
    styles = {}
  } = props || {};

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      className="relative w-full min-h-screen flex flex-col items-center justify-center font-sans"
      style={{
        backgroundColor: styles.bgColor || 'var(--color-bg, #f5f5f5)',
        color: styles.textColor || 'var(--color-text, #000)'
      }}
    >
      {/* 3D Perspective Container */}
      <div className="relative group perspective-[1000px] flex items-center justify-center cursor-pointer" onClick={handleCopy}>
        
        {/* Main Title */}
        <h2 
          className="text-5xl md:text-7xl lg:text-[7rem] font-bold tracking-tight text-center transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-30 group-hover:[transform:rotateX(20deg)_rotateY(-15deg)_rotateZ(-3deg)_scale(0.95)]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {title}
        </h2>

        {/* Hover Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <button 
            className="opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold tracking-wide pointer-events-auto shadow-xl"
            style={{ 
              backgroundColor: 'var(--color-text, #000)',
              color: 'var(--color-bg, #fff)'
            }}
          >
            {copied ? "COPIED!" : buttonText}
          </button>
        </div>
      </div>

      {/* Footer Elements */}
      <div className="absolute bottom-12 flex flex-col items-center justify-center space-y-2 pointer-events-none">
        {/* Smiley Icon */}
        <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center relative">
          <div className="w-1 h-1 bg-current rounded-full absolute top-[30%] left-[25%]"></div>
          <div className="w-1 h-1 bg-current rounded-full absolute top-[30%] right-[25%]"></div>
          <div className="w-4 h-2 border-b-2 border-current absolute bottom-[20%] rounded-b-full"></div>
        </div>
        
        <div className="text-[0.65rem] font-bold text-center leading-tight tracking-wider uppercase mt-4">
          <div>{footerName}</div>
          <div>{footerYear}</div>
        </div>
      </div>
    </section>
  );
}