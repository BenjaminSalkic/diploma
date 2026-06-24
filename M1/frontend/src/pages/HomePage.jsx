import { useEffect, useState } from 'react'
import HeroVariant1 from '../components/HeroVariant1'
import HeroVariant2 from '../components/HeroVariant2'
import HeroVariant3 from '../components/HeroVariant3'
import HeroVariant4 from '../components/HeroVariant4'
import ProjectsVariant1 from '../components/ProjectsVariant1'
import ProjectsVariant2 from '../components/ProjectsVariant2'
import ProjectsVariant3 from '../components/ProjectsVariant3'
import ProjectsVariant4 from '../components/ProjectsVariant4'
import ProjectsVariant5 from '../components/ProjectsVariant5'
import SkillsVariant1 from '../components/SkillsVariant1'
import SkillsVariant2 from '../components/SkillsVariant2'
import AboutVariant1 from '../components/AboutVariant1'
import AboutVariant2 from '../components/AboutVariant2'
import AboutVariant3 from '../components/AboutVariant3'
import AboutVariant4 from '../components/AboutVariant4'
import AboutVariant5 from '../components/AboutVariant5'
import ContactVariant1 from '../components/ContactVariant1'
import ContactVariant2 from '../components/ContactVariant2'
import ContactVariant3 from '../components/ContactVariant3'
import ContactVariant4 from '../components/ContactVariant4'
import ContactVariant5 from '../components/ContactVariant5'
import { api } from '../api/client'
import { loadPageConfig } from '../config/pageConfig'

export default function HomePage() {
  const [pageConfig] = useState(() => loadPageConfig())
  const heroSection = pageConfig.sections.find((section) => section.id === 'hero')
  const projectsSection = pageConfig.sections.find((section) => section.id === 'projects')
  const skillsSection = pageConfig.sections.find((section) => section.id === 'skills')
  const aboutSection = pageConfig.sections.find((section) => section.id === 'about')
  const contactSection = pageConfig.sections.find((section) => section.id === 'contact')
  const [projects, setProjects] = useState([])

  useEffect(() => {
    let active = true

    api
      .get('/api/projects')
      .then((data) => {
        if (active) {
          setProjects(data)
        }
      })
      .catch(() => {
        if (active) {
          setProjects([])
        }
      })

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    const previous = document.body.style.backgroundColor
    document.body.style.backgroundColor = pageConfig.global.theme.backgroundColor

    return () => {
      document.body.style.backgroundColor = previous
    }
  }, [pageConfig.global.theme.backgroundColor])

  if (!heroSection) {
    return null
  }

  return (
    <div>
      {heroSection.variant === 1 ? (
        <HeroVariant1
          theme={pageConfig.global.theme}
          font={pageConfig.global.font}
          {...heroSection.props}
        />
      ) : null}
      {heroSection.variant === 2 ? (
        <HeroVariant2
          theme={pageConfig.global.theme}
          font={pageConfig.global.font}
          name={heroSection.props.name}
          role={heroSection.props.role}
          footerNote={heroSection.props.footerNote}
        />
      ) : null}
      {heroSection.variant === 3 ? (
        <HeroVariant3
          theme={pageConfig.global.theme}
          font={pageConfig.global.font}
          name={heroSection.props.hero3Name}
          description={heroSection.props.hero3Description}
          label={heroSection.props.hero3Label}
        />
      ) : null}
      {heroSection.variant === 4 ? (
        <HeroVariant4
          theme={pageConfig.global.theme}
          font={pageConfig.global.font}
          name={heroSection.props.hero4Name}
          quote={heroSection.props.hero4Quote}
          description={heroSection.props.hero4Description}
        />
      ) : null}
      {projectsSection?.variant === 1 ? (
        <ProjectsVariant1
          projects={projects}
          theme={pageConfig.global.theme}
          font={pageConfig.global.font}
        />
      ) : null}
      {projectsSection?.variant === 2 ? (
        <ProjectsVariant2
          projects={projects}
          theme={pageConfig.global.theme}
          font={pageConfig.global.font}
        />
      ) : null}
      {projectsSection?.variant === 3 ? (
        <ProjectsVariant3
          projects={projects}
          theme={pageConfig.global.theme}
          font={pageConfig.global.font}
        />
      ) : null}
      {projectsSection?.variant === 4 ? (
        <ProjectsVariant4
          projects={projects}
          theme={pageConfig.global.theme}
          font={pageConfig.global.font}
        />
      ) : null}
      {projectsSection?.variant === 5 ? (
        <ProjectsVariant5
          projects={projects}
          theme={pageConfig.global.theme}
          font={pageConfig.global.font}
        />
      ) : null}
      {skillsSection?.variant === 1 ? (
        <SkillsVariant1
          theme={pageConfig.global.theme}
          font={pageConfig.global.font}
          titleLine1={skillsSection.props.titleLine1}
          titleLine2={skillsSection.props.titleLine2}
          interestText={skillsSection.props.interestText}
          skills={skillsSection.props.skills}
          background={skillsSection.props.background}
        />
      ) : null}
      {skillsSection?.variant === 2 ? (
        <SkillsVariant2
          theme={pageConfig.global.theme}
          font={pageConfig.global.font}
          titleLine1={skillsSection.props.titleLine1}
          titleLine2={skillsSection.props.titleLine2}
          skills={skillsSection.props.skills}
        />
      ) : null}
      {aboutSection?.variant === 1 ? (
        <AboutVariant1
          theme={pageConfig.global.theme}
          font={pageConfig.global.font}
          title={aboutSection.props.title}
          description={aboutSection.props.description}
          image={aboutSection.props.image}
        />
      ) : null}
      {aboutSection?.variant === 2 ? (
        <AboutVariant2
          theme={pageConfig.global.theme}
          font={pageConfig.global.font}
          description={aboutSection.props.about2Description}
          blocks={aboutSection.props.about2Blocks}
        />
      ) : null}
      {aboutSection?.variant === 3 ? (
        <AboutVariant3
          theme={pageConfig.global.theme}
          font={pageConfig.global.font}
          description={aboutSection.props.about2Description}
          blocks={aboutSection.props.about2Blocks}
        />
      ) : null}
      {aboutSection?.variant === 4 ? (
        <AboutVariant4
          theme={pageConfig.global.theme}
          font={pageConfig.global.font}
          title={aboutSection.props.about4Title}
          description={aboutSection.props.about4Description}
          waterfallItems={aboutSection.props.about4Waterfall}
          circleText={aboutSection.props.about4CircleText}
        />
      ) : null}
      {aboutSection?.variant === 5 ? (
        <AboutVariant5
          theme={pageConfig.global.theme}
          font={pageConfig.global.font}
          description={aboutSection.props.about5Description}
          awards={aboutSection.props.about5Awards}
        />
      ) : null}
      {contactSection?.variant === 1 ? (
        <ContactVariant1
          theme={pageConfig.global.theme}
          font={pageConfig.global.font}
          links={contactSection.props.links}
        />
      ) : null}
      {contactSection?.variant === 2 ? (
        <ContactVariant2
          theme={pageConfig.global.theme}
          font={pageConfig.global.font}
          text={contactSection.props.contact2Text}
          buttonLabel={contactSection.props.contact2ButtonLabel}
          buttonHref={contactSection.props.contact2ButtonHref}
        />
      ) : null}
      {contactSection?.variant === 3 ? (
        <ContactVariant3
          theme={pageConfig.global.theme}
          font={pageConfig.global.font}
          links={contactSection.props.contact3Links}
          bigText={contactSection.props.contact3Text}
        />
      ) : null}
      {contactSection?.variant === 4 ? (
        <ContactVariant4
          theme={pageConfig.global.theme}
          font={pageConfig.global.font}
          kicker={contactSection.props.contact4Kicker}
          description={contactSection.props.contact4Description}
          links={contactSection.props.contact4Links}
        />
      ) : null}
      {contactSection?.variant === 5 ? (
        <ContactVariant5
          theme={pageConfig.global.theme}
          font={pageConfig.global.font}
          description={contactSection.props.contact5Description}
          lists={contactSection.props.contact5Lists}
          bigText={contactSection.props.contact5BigText}
        />
      ) : null}
    </div>
  )
}
