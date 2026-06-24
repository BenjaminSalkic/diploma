const STORAGE_KEY = 'portfolio_page_config_v2'

export const defaultPageConfig = {
  global: {
    theme: {
      backgroundColor: '#ffffff',
      textColor: '#111111',
      primaryColor: '#111827',
    },
    font: {
      heading: 'Inter',
      body: 'Roboto',
    },
  },
  sections: [
    {
      id: 'hero',
      variant: 1,
      props: {
        kicker: 'Creative studio',
        headline: 'Rezo Zero is a creative agency that builds powerful digital solutions.',
        subheadline:
          'We partner with ambitious teams to craft expressive brands, purposeful products, and memorable digital experiences.',
        name: 'Steven Mengin',
        role: 'Creative Director',
        footerNote:
          'Clients include Google, adidas, Sonos, Spotify, X, LuluLemon, Oculus, La Mer, Instagram, META, eBay, THX, Warner Brothers and more.',
        hero3Name: 'Robert Borghesi',
        hero3Description:
          'I am an economist turned creative coder specialized in WebGL and immersive experiences.',
        hero3Label: '©2024:V.0',
        hero4Name: 'Airborne',
        hero4Quote: 'Lead the change, don\'t let the change lead you',
        hero4Description:
          'Brand, creative and development partners to tech and cultural changemakers.',
        images: {
          main: {
            src: 'https://placehold.co/640x800',
            alt: 'Black and white abstract art',
          },
          accent: {
            src: 'https://placehold.co/240x320',
            alt: 'Studio workspace detail',
          },
        },
      },
    },
    { id: 'projects', variant: 1, props: {} },
    {
      id: 'skills',
      variant: 1,
      props: {
        titleLine1: "Let's",
        titleLine2: 'Connect',
        interestText: "I'm always interested about",
        skills: [
          'UX/UI Design',
          'Frontend Development',
          'Webflow Development',
          'Digital Consultant',
          'WordPress Development',
          'New Businesses',
          'Startups',
          'Pizza',
        ],
        background: {
          src: '',
          alt: 'Background artwork',
        },
      },
    },
    {
      id: 'about',
      variant: 1,
      props: {
        title: 'Hello. I am David',
        description:
          'I use my passion and skills to create digital products and experiences. National and international customers rely on me for design, implementation, and management of their digital products. As an independent, I work also with web agencies, companies, startups and individuals to create a blueprint for the digital business.',
        image: {
          src: '',
          alt: 'About portrait',
        },
        about2Description:
          'Built on principle and driven by passion, this is a long-form statement that introduces the person or studio and sets the tone for the work. Use this space to describe your approach, experience, and philosophy in a bold, narrative way.',
        about2Blocks: [
          {
            title: 'Input / Output',
            text: 'Always fascinated by fresh perspectives, I love hearing from new people about their ideas, projects, or potential collaborations.',
            items: [
              'Branding',
              'Identity',
              'Digital',
              'Motion',
              'Print',
              'CGI',
            ],
          },
          {
            title: 'Worked With',
            items: ['Nike', 'Google', 'Adobe', 'Spotify', 'Toyota', 'Square'],
          },
        ],
        about4Title: "Hello, I'm Sanni Sahil",
        about4Description:
          'A dedicated web designer and design director with over 8 years of experience in the industry.',
        about4Waterfall: ['Portfolio', 'Sanni Sahil'],
        about4CircleText: 'Continue the journey',
        about5Description:
          'Thomas Monavon is a freelance designer based in Lyon, France. No I\'m kidding, I\'m not going to start talking about myself in the third person, so we\'ll start by being familiar with each other and you can call me toto.',
        about5Awards: [
          {
            project: 'Gregory Lalle',
            giver: 'Awwwards',
            award: 'Site of the Day & Developer Award',
            year: "24'",
          },
          {
            project: 'Angus Emmerson',
            giver: 'Awwwards',
            award: 'Site of the Day & Developer Award',
            year: "24'",
          },
          {
            project: 'Makepill Agency',
            giver: 'CSSDA',
            award: 'Website of the Day',
            year: "23'",
          },
        ],
      },
    },
    {
      id: 'contact',
      variant: 1,
      props: {
        links: [
          { label: 'Email', href: 'mailto:hello@example.com' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com' },
          { label: 'Behance', href: 'https://www.behance.net' },
          { label: 'Instagram', href: 'https://www.instagram.com' },
        ],
        contact2Text: "Let's work together",
        contact2ButtonLabel: 'Contact me',
        contact2ButtonHref: 'mailto:hello@example.com',
        contact3Text: "Let's talk",
        contact3Links: [
          { label: 'LinkedIn', href: 'https://www.linkedin.com' },
          { label: 'Github', href: 'https://github.com' },
          { label: 'Mail', href: 'mailto:hello@example.com' },
        ],
        contact4Kicker: 'Get in touch',
        contact4Description:
          'Here are several ways you can slide into my DMs, but be aware, I might be busy aping on the fresh new memecoin in cryptoland or curating playlists on Spotify.',
        contact4Links: [
          { label: '(Twitter)', href: 'https://twitter.com' },
          { label: '(Mail)', href: 'mailto:hello@example.com' },
          { label: '(LinkedIn)', href: 'https://www.linkedin.com' },
        ],
        contact5Description:
          "It's not client and supplier. It's equals; partners. Teamwork - smooth, enjoyable and incredibly productive.",
        contact5Lists: [
          { title: 'Studio', items: ['About', 'Work', 'Journal', 'Contact'] },
          { title: 'Socials', items: ['LinkedIn', 'Dribbble', 'Behance', 'Instagram'] },
          {
            title: 'Studio',
            items: ['Airborne Studio', 'Neighbourhood', '3 Sheaf Street', 'Leeds LS10 1HD'],
          },
        ],
        contact5BigText: 'Airborne',
      },
    },
  ],
}

function normalizeConfig(input) {
  const safeInput = input && typeof input === 'object' ? input : {}
  const inputSections = Array.isArray(safeInput.sections) ? safeInput.sections : []

  return {
    global: {
      theme: {
        ...defaultPageConfig.global.theme,
        ...(safeInput.global?.theme ?? {}),
      },
      font: {
        ...defaultPageConfig.global.font,
        ...(safeInput.global?.font ?? {}),
      },
    },
    sections: defaultPageConfig.sections.map((section) => {
      const matched = inputSections.find((item) => item.id === section.id) || {}
      return {
        ...section,
        ...matched,
        props: {
          ...section.props,
          ...(matched.props ?? {}),
        },
      }
    }),
  }
}

export function loadPageConfig() {
  if (typeof window === 'undefined') {
    return defaultPageConfig
  }

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return defaultPageConfig
  }

  try {
    const parsed = JSON.parse(raw)
    return normalizeConfig(parsed)
  } catch (error) {
    return defaultPageConfig
  }
}

export function savePageConfig(config) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  } catch (error) {
    console.warn('Failed to save page config to localStorage.', error)
  }
}
