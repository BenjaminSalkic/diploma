import HeroVariant1Form from './sections/hero/HeroVariant1Form'
import HeroVariant2Form from './sections/hero/HeroVariant2Form'
import HeroVariant3Form from './sections/hero/HeroVariant3Form'
import HeroVariant4Form from './sections/hero/HeroVariant4Form'
import ProjectsVariant1Form from './sections/projects/ProjectsVariant1Form'
import ProjectsVariant2Form from './sections/projects/ProjectsVariant2Form'
import ProjectsVariant3Form from './sections/projects/ProjectsVariant3Form'
import ProjectsVariant4Form from './sections/projects/ProjectsVariant4Form'
import ProjectsVariant5Form from './sections/projects/ProjectsVariant5Form'
import SkillsVariant1Form from './sections/skills/SkillsVariant1Form'
import SkillsVariant2Form from './sections/skills/SkillsVariant2Form'
import AboutVariant1Form from './sections/about/AboutVariant1Form'
import AboutVariant2Form from './sections/about/AboutVariant2Form'
import AboutVariant3Form from './sections/about/AboutVariant3Form'
import AboutVariant4Form from './sections/about/AboutVariant4Form'
import AboutVariant5Form from './sections/about/AboutVariant5Form'
import ContactVariant1Form from './sections/contact/ContactVariant1Form'
import ContactVariant2Form from './sections/contact/ContactVariant2Form'
import ContactVariant3Form from './sections/contact/ContactVariant3Form'
import ContactVariant4Form from './sections/contact/ContactVariant4Form'
import ContactVariant5Form from './sections/contact/ContactVariant5Form'

const FORM_MAP = {
  hero: {
    1: HeroVariant1Form,
    2: HeroVariant2Form,
    3: HeroVariant3Form,
    4: HeroVariant4Form,
  },
  projects: {
    1: ProjectsVariant1Form,
    2: ProjectsVariant2Form,
    3: ProjectsVariant3Form,
    4: ProjectsVariant4Form,
    5: ProjectsVariant5Form,
  },
  skills: {
    1: SkillsVariant1Form,
    2: SkillsVariant2Form,
  },
  about: {
    1: AboutVariant1Form,
    2: AboutVariant2Form,
    3: AboutVariant3Form,
    4: AboutVariant4Form,
    5: AboutVariant5Form,
  },
  contact: {
    1: ContactVariant1Form,
    2: ContactVariant2Form,
    3: ContactVariant3Form,
    4: ContactVariant4Form,
    5: ContactVariant5Form,
  },
}

export default function SectionFormRegistry({ section, onChange }) {
  const variants = FORM_MAP[section.id]
  if (!variants) return <p className="text-sm text-gray-400">No editor for this section yet.</p>

  const Form = variants[section.variant]
  if (!Form) return <p className="text-sm text-gray-400">No editor for variant {section.variant}.</p>

  return <Form props={section.props} onChange={onChange} />
}
