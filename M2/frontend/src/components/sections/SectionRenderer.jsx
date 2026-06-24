import HeroVariant1 from './hero/HeroVariant1'
import HeroVariant2 from './hero/HeroVariant2'
import HeroVariant3 from './hero/HeroVariant3'
import HeroVariant4 from './hero/HeroVariant4'
import ProjectsVariant1 from './projects/ProjectsVariant1'
import ProjectsVariant2 from './projects/ProjectsVariant2'
import ProjectsVariant3 from './projects/ProjectsVariant3'
import ProjectsVariant4 from './projects/ProjectsVariant4'
import ProjectsVariant5 from './projects/ProjectsVariant5'
import SkillsVariant1 from './skills/SkillsVariant1'
import SkillsVariant2 from './skills/SkillsVariant2'
import AboutVariant1 from './about/AboutVariant1'
import AboutVariant2 from './about/AboutVariant2'
import AboutVariant3 from './about/AboutVariant3'
import AboutVariant4 from './about/AboutVariant4'
import AboutVariant5 from './about/AboutVariant5'
import ContactVariant1 from './contact/ContactVariant1'
import ContactVariant2 from './contact/ContactVariant2'
import ContactVariant3 from './contact/ContactVariant3'
import ContactVariant4 from './contact/ContactVariant4'
import ContactVariant5 from './contact/ContactVariant5'

const SECTION_MAP = {
  hero: {
    1: HeroVariant1,
    2: HeroVariant2,
    3: HeroVariant3,
    4: HeroVariant4,
  },
  projects: {
    1: ProjectsVariant1,
    2: ProjectsVariant2,
    3: ProjectsVariant3,
    4: ProjectsVariant4,
    5: ProjectsVariant5,
  },
  skills: {
    1: SkillsVariant1,
    2: SkillsVariant2,
  },
  about: {
    1: AboutVariant1,
    2: AboutVariant2,
    3: AboutVariant3,
    4: AboutVariant4,
    5: AboutVariant5,
  },
  contact: {
    1: ContactVariant1,
    2: ContactVariant2,
    3: ContactVariant3,
    4: ContactVariant4,
    5: ContactVariant5,
  },
}

export default function SectionRenderer({ section, global }) {
  const variants = SECTION_MAP[section.id]
  if (!variants) return null

  const Component = variants[section.variant]
  if (!Component) return null

  return <Component props={section.props} global={global} />
}
