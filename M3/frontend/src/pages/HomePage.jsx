import { useEffect, useState } from 'react';
import { api } from '../api/client';
import Hero1 from '../components/sections/Hero1';
import Hero2 from '../components/sections/Hero2';
import Hero3 from '../components/sections/Hero3';
import Hero4 from '../components/sections/Hero4';
import Projects1 from '../components/sections/Projects1';
import Projects2 from '../components/sections/Projects2';
import Projects3 from '../components/sections/Projects3';
import Projects4 from '../components/sections/Projects4';
import Projects5 from '../components/sections/Projects5';
import Skills1 from '../components/sections/Skills1';
import Skills2 from '../components/sections/Skills2';
import About1 from '../components/sections/About1';
import About2 from '../components/sections/About2';
import About3 from '../components/sections/About3';
import About4 from '../components/sections/About4';
import About5 from '../components/sections/About5';
import Contact1 from '../components/sections/Contact1';
import Contact2 from '../components/sections/Contact2';
import Contact3 from '../components/sections/Contact3';
import Contact4 from '../components/sections/Contact4';
import Contact5 from '../components/sections/Contact5';

// Component registry for dynamic rendering
const SECTION_COMPONENTS = {
  hero: {
    1: Hero1,
    2: Hero2,
    3: Hero3,
    4: Hero4,
  },
  projects: {
    1: Projects1,
    2: Projects2,
    3: Projects3,
    4: Projects4,
    5: Projects5,
  },
  skills: {
    1: Skills1,
    2: Skills2,
  },
  about: {
    1: About1,
    2: About2,
    3: About3,
    4: About4,
    5: About5,
  },
  contact: {
    1: Contact1,
    2: Contact2,
    3: Contact3,
    4: Contact4,
    5: Contact5,
  },
  // Add other sections here as they are created
};

export default function HomePage() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    api.get('/api/page-config')
      .then(setConfig)
      .catch(err => console.error("Error loading config:", err));
  }, []);

  if (!config) return <div className="p-8 text-center text-gray-500">Loading...</div>;

  return (
    <div 
      style={{ 
        backgroundColor: config.global?.theme?.backgroundColor, 
        color: config.global?.theme?.textColor,
        fontFamily: config.global?.font?.body,
        '--font-heading': config.global?.font?.heading,
        '--color-primary': config.global?.theme?.primaryColor,
        '--color-bg': config.global?.theme?.backgroundColor,
        '--color-text': config.global?.theme?.textColor,
      }}
      className="min-h-screen"
    >
      <style>{`
        h1, h2, h3, h4, h5, h6, .font-heading {
          font-family: var(--font-heading, inherit) !important;
        }
        .text-primary { color: var(--color-primary) !important; }
        .bg-primary { background-color: var(--color-primary) !important; }
      `}</style>
      
      {config.sections.filter(s => s.active !== false).map((section, idx) => {
        const SectionComponent = SECTION_COMPONENTS[section.id]?.[section.variant];
        
        if (!SectionComponent) {
          return null; // Skip rendering if component doesn't exist
        }

        return <SectionComponent key={`${section.id}-${idx}`} props={section.props} />;
      })}
    </div>
  )
}
