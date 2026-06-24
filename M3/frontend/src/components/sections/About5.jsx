import React from 'react';

export default function About5({ props }) {
  const {
    logo = "T—M",
    breadcrumb = "INDEX / ABOUT",
    description = "Thomas Monavon is a freelance designer based in Lyon, France. No I'm kidding, I'm not going to start talking about myself in the third person, so we'll start by being familiar with each other and you can call me toto. Summing up because I don't have much space to do a clean layout with my joke above, I'd say I like to create original web experiences based on a lot of motion and creative layouts.",
    awards = [
      { project: "Grégory Lallé", giver: "Awwwards", name: "Site of the Day & Developer Award", year: "24'" },
      { project: "Angus Emmerson", giver: "Awwwards", name: "Site of the Day & Developer Award", year: "24'" },
      { project: "Makepill Agency", giver: "Awwwards", name: "Site of the Day & Developer Award", year: "23'" },
      { project: "", giver: "CSSDA", name: "Website of the Day", year: "" },
      { project: "", giver: "FWA", name: "Site of the Day", year: "" },
      { project: "Theud Portfolio", giver: "Awwwards", name: "Site of the Day & Developer Award", year: "22'" },
      { project: "", giver: "CSSDA", name: "Website of the day", year: "" },
      { project: "", giver: "FWA", name: "Site of the Day", year: "" },
      { project: "TM Portfolio", giver: "Awwwards", name: "Mobile of the week, Honorable mention", year: "22'" },
      { project: "", giver: "CSSDA", name: "Website of the day", year: "" },
      { project: "", giver: "FWA", name: "Site of the Day", year: "" }
    ],
    footer = {
      devBy: "DEV BY BENJAMIN ROBINET",
      social1: "TWITTER",
      social2: "INSTAGRAM",
      close: "CLOSE",
      location: "LYON, FR",
      contact: "CONTACT"
    },
    styles = {}
  } = props || {};

  return (
    <section 
      className="relative w-full min-h-screen flex flex-col p-8 md:p-12 font-sans overflow-hidden text-xs md:text-sm"
      style={{
        backgroundColor: styles.bgColor || 'var(--color-bg, #fff)',
        color: styles.textColor || 'var(--color-text, #000)'
      }}
    >
      {/* Top Header */}
      <header className="flex justify-between w-full mb-16 uppercase tracking-wider font-medium">
        <div className="flex space-x-12">
          <span>{logo}</span>
          <span className="text-gray-400">{breadcrumb}</span>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col w-full">
        {/* Top Right Description */}
        <div className="w-full flex justify-end mb-24">
          <div className="w-full md:w-[65%] lg:w-[60%]">
            <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-snug tracking-tight">
              {description}
            </p>
          </div>
        </div>

        {/* Awards List */}
        <div className="w-full flex justify-end mb-24">
          <div className="w-full md:w-[65%] lg:w-[60%]">
            <div className="flex flex-col space-y-4">
              {awards.map((award, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-3 font-medium">{award.project}</div>
                  <div className="col-span-3">{award.giver}</div>
                  <div className="col-span-5">{award.name}</div>
                  <div className="col-span-1 text-right">{award.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full flex justify-between items-end uppercase tracking-wider font-medium mt-auto">
        <div className="flex space-x-2">
          <span className="text-gray-500">DEV BY</span>
          <span>{footer.devBy.replace('DEV BY ', '')}</span>
        </div>
        
        <div className="absolute left-1/2 bottom-8 -translate-x-1/2 text-gray-500 hover:text-black cursor-pointer transition-colors">
          {footer.close}
        </div>

        <div className="flex items-center space-x-4 md:space-x-12">
          <div className="flex space-x-4">
            <a href="#" className="hover:opacity-60 transition-opacity">{footer.social1}</a>
            <a href="#" className="hover:opacity-60 transition-opacity">{footer.social2}</a>
          </div>
          <div className="flex space-x-4">
            <span>{footer.location}</span>
            <a href="#" className="hover:opacity-60 transition-opacity">{footer.contact}</a>
          </div>
        </div>
      </footer>
    </section>
  );
}