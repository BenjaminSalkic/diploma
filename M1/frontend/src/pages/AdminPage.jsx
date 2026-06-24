import { useEffect, useRef, useState } from 'react'
import { loadPageConfig, savePageConfig } from '../config/pageConfig'
import { API_BASE_URL } from '../api/client'
import { saveImage } from '../utils/imageStore'

const SECTION_LABELS = {
  hero: 'Hero',
  projects: 'Projects',
  skills: 'Skills',
  about: 'About',
  contact: 'Contact',
}

const SECTION_VARIANTS = {
  hero: [
    { value: 1, label: 'Hero 1' },
    { value: 2, label: 'Hero 2' },
    { value: 3, label: 'Hero 3' },
    { value: 4, label: 'Hero 4' },
  ],
  projects: [
    { value: 1, label: 'Projects 1' },
    { value: 2, label: 'Projects 2' },
    { value: 3, label: 'Projects 3' },
    { value: 4, label: 'Projects 4' },
    { value: 5, label: 'Projects 5' },
  ],
  skills: [
    { value: 1, label: 'Skills 1' },
    { value: 2, label: 'Skills 2' },
  ],
  about: [
    { value: 1, label: 'About 1' },
    { value: 2, label: 'About 2' },
    { value: 3, label: 'About 3' },
    { value: 4, label: 'About 4' },
    { value: 5, label: 'About 5' },
  ],
  contact: [
    { value: 1, label: 'Contact 1' },
    { value: 2, label: 'Contact 2' },
    { value: 3, label: 'Contact 3' },
    { value: 4, label: 'Contact 4' },
    { value: 5, label: 'Contact 5' },
  ],
}

export default function AdminPage() {
  const [config, setConfig] = useState(() => loadPageConfig())
  const [projects, setProjects] = useState([])
  const [projectName, setProjectName] = useState('')
  const [projectImages, setProjectImages] = useState([])
  const [projectsError, setProjectsError] = useState('')
  const projectImagesInputRef = useRef(null)

  useEffect(() => {
    savePageConfig(config)
  }, [config])

  useEffect(() => {
    let active = true

    fetch(`${API_BASE_URL}/api/projects`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Request failed'))))
      .then((data) => {
        if (active) {
          setProjects(data)
          setProjectsError('')
        }
      })
      .catch(() => {
        if (active) {
          setProjects([])
          setProjectsError('Failed to load projects.')
        }
      })

    return () => {
      active = false
    }
  }, [])

  const updateTheme = (key, value) => {
    setConfig((prev) => ({
      ...prev,
      global: {
        ...prev.global,
        theme: {
          ...prev.global.theme,
          [key]: value,
        },
      },
    }))
  }

  const updateFont = (key, value) => {
    setConfig((prev) => ({
      ...prev,
      global: {
        ...prev.global,
        font: {
          ...prev.global.font,
          [key]: value,
        },
      },
    }))
  }

  const moveSection = (index, direction) => {
    setConfig((prev) => {
      const nextSections = [...prev.sections]
      const targetIndex = index + direction
      if (targetIndex < 0 || targetIndex >= nextSections.length) {
        return prev
      }
      const temp = nextSections[index]
      nextSections[index] = nextSections[targetIndex]
      nextSections[targetIndex] = temp
      return { ...prev, sections: nextSections }
    })
  }

  const updateSection = (sectionId, updater) => {
    setConfig((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId ? updater(section) : section,
      ),
    }))
  }

  const updateHeroProps = (key, value) => {
    updateSection('hero', (section) => ({
      ...section,
      props: {
        ...section.props,
        [key]: value,
      },
    }))
  }

  const updateAboutProps = (key, value) => {
    updateSection('about', (section) => ({
      ...section,
      props: {
        ...section.props,
        [key]: value,
      },
    }))
  }

  const updateContactProps = (value) => {
    updateSection('contact', (section) => ({
      ...section,
      props: {
        ...section.props,
        links: value,
      },
    }))
  }

  const updateContactField = (key, value) => {
    updateSection('contact', (section) => ({
      ...section,
      props: {
        ...section.props,
        [key]: value,
      },
    }))
  }

  const updateAboutBlock = (index, updater) => {
    updateSection('about', (section) => {
      const blocks = Array.isArray(section.props.about2Blocks)
        ? [...section.props.about2Blocks]
        : []
      const current = blocks[index] || {}
      blocks[index] = updater(current)
      return {
        ...section,
        props: {
          ...section.props,
          about2Blocks: blocks,
        },
      }
    })
  }

  const addAboutBlock = () => {
    updateSection('about', (section) => ({
      ...section,
      props: {
        ...section.props,
        about2Blocks: [
          ...(Array.isArray(section.props.about2Blocks) ? section.props.about2Blocks : []),
          { title: '', text: '', items: [] },
        ],
      },
    }))
  }

  const removeAboutBlock = (index) => {
    updateSection('about', (section) => {
      const blocks = Array.isArray(section.props.about2Blocks)
        ? section.props.about2Blocks.filter((_, idx) => idx !== index)
        : []
      return {
        ...section,
        props: {
          ...section.props,
          about2Blocks: blocks,
        },
      }
    })
  }

  const updateAboutImage = (field, value) => {
    updateSection('about', (section) => ({
      ...section,
      props: {
        ...section.props,
        image: {
          ...section.props.image,
          [field]: value,
        },
      },
    }))
  }

  const handleAboutImageUpload = async (file) => {
    if (!file) {
      return
    }

    try {
      const id = await saveImage(file)
      updateAboutImage('src', `idb:${id}`)
    } catch (error) {
      console.error('Failed to save image.', error)
      window.alert('Failed to save image. Please try again.')
    }
  }

  const updateSkillsProps = (key, value) => {
    updateSection('skills', (section) => ({
      ...section,
      props: {
        ...section.props,
        [key]: value,
      },
    }))
  }

  const updateSkillsBackground = (field, value) => {
    updateSection('skills', (section) => ({
      ...section,
      props: {
        ...section.props,
        background: {
          ...section.props.background,
          [field]: value,
        },
      },
    }))
  }

  const handleSkillsBackgroundUpload = async (file) => {
    if (!file) {
      return
    }

    try {
      const id = await saveImage(file)
      updateSkillsBackground('src', `idb:${id}`)
    } catch (error) {
      console.error('Failed to save image.', error)
      window.alert('Failed to save image. Please try again.')
    }
  }

  const updateHeroImage = (imageKey, field, value) => {
    updateSection('hero', (section) => ({
      ...section,
      props: {
        ...section.props,
        images: {
          ...section.props.images,
          [imageKey]: {
            ...section.props.images?.[imageKey],
            [field]: value,
          },
        },
      },
    }))
  }

  const handleHeroImageUpload = async (imageKey, file) => {
    if (!file) {
      return
    }

    try {
      const id = await saveImage(file)
      updateHeroImage(imageKey, 'src', `idb:${id}`)
    } catch (error) {
      console.error('Failed to save image.', error)
      window.alert('Failed to save image. Please try again.')
    }
  }

  const handleProjectSubmit = async (event) => {
    event.preventDefault()

    if (!projectName || projectImages.length === 0) {
      setProjectsError('Please provide a project name and image.')
      return
    }

    const formData = new FormData()
    formData.append('name', projectName)
    projectImages.forEach((file) => {
      formData.append('images', file)
      formData.append('images[]', file)
    })

    try {
      const res = await fetch(`${API_BASE_URL}/api/projects`, {
        method: 'POST',
        body: formData,
      })

      const payload = await res.json()

      if (!res.ok) {
        const message = payload?.error || 'Failed to add project.'
        setProjectsError(message)
        return
      }

      const created = payload
      setProjects((prev) => [created, ...prev])
      setProjectName('')
      setProjectImages([])
      if (projectImagesInputRef.current) {
        projectImagesInputRef.current.value = ''
      }
      setProjectsError('')
    } catch (error) {
      setProjectsError('Failed to add project.')
    }
  }

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-semibold text-gray-900">Admin</h1>
        <p className="mt-2 text-sm text-gray-500">Edit theme, fonts, and section order.</p>
      </header>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Theme</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-2 text-sm text-gray-600">
            Background color
            <input
              className="h-10 w-full cursor-pointer rounded-lg border border-gray-200"
              type="color"
              value={config.global.theme.backgroundColor}
              onChange={(event) => updateTheme('backgroundColor', event.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-gray-600">
            Text color
            <input
              className="h-10 w-full cursor-pointer rounded-lg border border-gray-200"
              type="color"
              value={config.global.theme.textColor}
              onChange={(event) => updateTheme('textColor', event.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-gray-600">
            Primary color
            <input
              className="h-10 w-full cursor-pointer rounded-lg border border-gray-200"
              type="color"
              value={config.global.theme.primaryColor}
              onChange={(event) => updateTheme('primaryColor', event.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Fonts</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-gray-600">
            Heading font
            <input
              className="h-10 rounded-lg border border-gray-200 px-3"
              type="text"
              value={config.global.font.heading}
              onChange={(event) => updateFont('heading', event.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-gray-600">
            Body font
            <input
              className="h-10 rounded-lg border border-gray-200 px-3"
              type="text"
              value={config.global.font.body}
              onChange={(event) => updateFont('body', event.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Sections</h2>
        <p className="mt-2 text-sm text-gray-500">Choose variants, edit hero content, and reorder sections.</p>
        <div className="mt-4 space-y-4">
          {config.sections.map((section, index) => (
            <div
              key={`${section.id}-${index}`}
              className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm font-medium text-gray-800">
                  {SECTION_LABELS[section.id] || section.id}
                </span>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                    Variant
                    <select
                      className="h-8 rounded-lg border border-gray-200 bg-white px-2 text-xs text-gray-700"
                      value={section.variant}
                      onChange={(event) =>
                        updateSection(section.id, (current) => ({
                          ...current,
                          variant: Number(event.target.value),
                        }))
                      }
                    >
                      {(SECTION_VARIANTS[section.id] || []).map((variant) => (
                        <option key={variant.value} value={variant.value}>
                          {variant.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600"
                    type="button"
                    onClick={() => moveSection(index, -1)}
                    disabled={index === 0}
                  >
                    Up
                  </button>
                  <button
                    className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600"
                    type="button"
                    onClick={() => moveSection(index, 1)}
                    disabled={index === config.sections.length - 1}
                  >
                    Down
                  </button>
                </div>
              </div>

              {section.id === 'hero' && section.variant === 1 ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Kicker
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.kicker || ''}
                      onChange={(event) => updateHeroProps('kicker', event.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600 sm:col-span-2">
                    Headline
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.headline || ''}
                      onChange={(event) => updateHeroProps('headline', event.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600 sm:col-span-2">
                    Subheadline
                    <textarea
                      className="min-h-[96px] rounded-lg border border-gray-200 px-3 py-2"
                      value={section.props.subheadline || ''}
                      onChange={(event) => updateHeroProps('subheadline', event.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    CTA label
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.ctaLabel || ''}
                      onChange={(event) => updateHeroProps('ctaLabel', event.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    CTA link
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.ctaHref || ''}
                      onChange={(event) => updateHeroProps('ctaHref', event.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Main image URL
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.images?.main?.src || ''}
                      onChange={(event) => updateHeroImage('main', 'src', event.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Main image upload
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3 py-1"
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        handleHeroImageUpload('main', event.target.files?.[0])
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Main image alt
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.images?.main?.alt || ''}
                      onChange={(event) => updateHeroImage('main', 'alt', event.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Accent image URL
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.images?.accent?.src || ''}
                      onChange={(event) => updateHeroImage('accent', 'src', event.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Accent image upload
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3 py-1"
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        handleHeroImageUpload('accent', event.target.files?.[0])
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Accent image alt
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.images?.accent?.alt || ''}
                      onChange={(event) => updateHeroImage('accent', 'alt', event.target.value)}
                    />
                  </label>
                </div>
              ) : null}

              {section.id === 'hero' && section.variant === 2 ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-gray-600 sm:col-span-2">
                    Name
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.name || ''}
                      onChange={(event) => updateHeroProps('name', event.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Role
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.role || ''}
                      onChange={(event) => updateHeroProps('role', event.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600 sm:col-span-2">
                    Footer note
                    <textarea
                      className="min-h-[96px] rounded-lg border border-gray-200 px-3 py-2"
                      value={section.props.footerNote || ''}
                      onChange={(event) => updateHeroProps('footerNote', event.target.value)}
                    />
                  </label>
                </div>
              ) : null}

              {section.id === 'hero' && section.variant === 3 ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Top-left label
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.hero3Label || ''}
                      onChange={(event) => updateHeroProps('hero3Label', event.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600 sm:col-span-2">
                    Name
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.hero3Name || ''}
                      onChange={(event) => updateHeroProps('hero3Name', event.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600 sm:col-span-2">
                    Description
                    <textarea
                      className="min-h-[96px] rounded-lg border border-gray-200 px-3 py-2"
                      value={section.props.hero3Description || ''}
                      onChange={(event) => updateHeroProps('hero3Description', event.target.value)}
                    />
                  </label>
                </div>
              ) : null}

              {section.id === 'hero' && section.variant === 4 ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Name
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.hero4Name || ''}
                      onChange={(event) => updateHeroProps('hero4Name', event.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600 sm:col-span-2">
                    Quote
                    <textarea
                      className="min-h-[96px] rounded-lg border border-gray-200 px-3 py-2"
                      value={section.props.hero4Quote || ''}
                      onChange={(event) => updateHeroProps('hero4Quote', event.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600 sm:col-span-2">
                    Description
                    <textarea
                      className="min-h-[96px] rounded-lg border border-gray-200 px-3 py-2"
                      value={section.props.hero4Description || ''}
                      onChange={(event) => updateHeroProps('hero4Description', event.target.value)}
                    />
                  </label>
                </div>
              ) : null}

              {section.id === 'skills' ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Title line 1
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.titleLine1 || ''}
                      onChange={(event) => updateSkillsProps('titleLine1', event.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Title line 2
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.titleLine2 || ''}
                      onChange={(event) => updateSkillsProps('titleLine2', event.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600 sm:col-span-2">
                    Interest text
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.interestText || ''}
                      onChange={(event) => updateSkillsProps('interestText', event.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600 sm:col-span-2">
                    Skills list (comma-separated)
                    <textarea
                      className="min-h-[96px] rounded-lg border border-gray-200 px-3 py-2"
                      value={(section.props.skills || []).join(', ')}
                      onChange={(event) =>
                        updateSkillsProps(
                          'skills',
                          event.target.value
                            .split(',')
                            .map((item) => item.trim())
                            .filter(Boolean),
                        )
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Background image URL
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.background?.src || ''}
                      onChange={(event) => updateSkillsBackground('src', event.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Background image upload
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3 py-1"
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        handleSkillsBackgroundUpload(event.target.files?.[0])
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600 sm:col-span-2">
                    Background image alt
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.background?.alt || ''}
                      onChange={(event) => updateSkillsBackground('alt', event.target.value)}
                    />
                  </label>
                </div>
              ) : null}

              {section.id === 'about' && section.variant === 1 ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-gray-600 sm:col-span-2">
                    Title
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.title || ''}
                      onChange={(event) => updateAboutProps('title', event.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600 sm:col-span-2">
                    Description
                    <textarea
                      className="min-h-[120px] rounded-lg border border-gray-200 px-3 py-2"
                      value={section.props.description || ''}
                      onChange={(event) => updateAboutProps('description', event.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Image URL
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.image?.src || ''}
                      onChange={(event) => updateAboutImage('src', event.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Image upload
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3 py-1"
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleAboutImageUpload(event.target.files?.[0])}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600 sm:col-span-2">
                    Image alt
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.image?.alt || ''}
                      onChange={(event) => updateAboutImage('alt', event.target.value)}
                    />
                  </label>
                </div>
              ) : null}

              {section.id === 'about' && (section.variant === 2 || section.variant === 3) ? (
                <div className="mt-4 space-y-6">
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Description
                    <textarea
                      className="min-h-[140px] rounded-lg border border-gray-200 px-3 py-2"
                      value={section.props.about2Description || ''}
                      onChange={(event) =>
                        updateAboutProps('about2Description', event.target.value)
                      }
                    />
                  </label>
                  <div className="space-y-4">
                    {(section.props.about2Blocks || []).map((block, index) => (
                      <div key={`about-block-${index}`} className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-gray-700">Block {index + 1}</p>
                          <button
                            className="text-xs font-semibold text-red-500"
                            type="button"
                            onClick={() => removeAboutBlock(index)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          <label className="flex flex-col gap-2 text-sm text-gray-600 sm:col-span-2">
                            Block title
                            <input
                              className="h-10 rounded-lg border border-gray-200 px-3"
                              type="text"
                              value={block?.title || ''}
                              onChange={(event) =>
                                updateAboutBlock(index, (current) => ({
                                  ...current,
                                  title: event.target.value,
                                }))
                              }
                            />
                          </label>
                          <label className="flex flex-col gap-2 text-sm text-gray-600 sm:col-span-2">
                            Block text (optional)
                            <textarea
                              className="min-h-[90px] rounded-lg border border-gray-200 px-3 py-2"
                              value={block?.text || ''}
                              onChange={(event) =>
                                updateAboutBlock(index, (current) => ({
                                  ...current,
                                  text: event.target.value,
                                }))
                              }
                            />
                          </label>
                          <label className="flex flex-col gap-2 text-sm text-gray-600 sm:col-span-2">
                            Block list items (one per line)
                            <textarea
                              className="min-h-[90px] rounded-lg border border-gray-200 px-3 py-2"
                              value={(block?.items || []).join('\n')}
                              onChange={(event) =>
                                updateAboutBlock(index, (current) => ({
                                  ...current,
                                  items: event.target.value
                                    .split('\n')
                                    .map((item) => item.trim())
                                    .filter(Boolean),
                                }))
                              }
                            />
                          </label>
                        </div>
                      </div>
                    ))}
                    <button
                      className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600"
                      type="button"
                      onClick={addAboutBlock}
                    >
                      Add block
                    </button>
                  </div>
                </div>
              ) : null}

              {section.id === 'about' && section.variant === 4 ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-gray-600 sm:col-span-2">
                    Title
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.about4Title || ''}
                      onChange={(event) => updateAboutProps('about4Title', event.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600 sm:col-span-2">
                    Description
                    <textarea
                      className="min-h-[110px] rounded-lg border border-gray-200 px-3 py-2"
                      value={section.props.about4Description || ''}
                      onChange={(event) =>
                        updateAboutProps('about4Description', event.target.value)
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600 sm:col-span-2">
                    Waterfall items (one per line)
                    <textarea
                      className="min-h-[110px] rounded-lg border border-gray-200 px-3 py-2"
                      value={(section.props.about4Waterfall || []).join('\n')}
                      onChange={(event) =>
                        updateAboutProps(
                          'about4Waterfall',
                          event.target.value
                            .split('\n')
                            .map((item) => item.trim())
                            .filter(Boolean),
                        )
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600 sm:col-span-2">
                    Circle text
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.about4CircleText || ''}
                      onChange={(event) =>
                        updateAboutProps('about4CircleText', event.target.value)
                      }
                    />
                  </label>
                </div>
              ) : null}

              {section.id === 'about' && section.variant === 5 ? (
                <div className="mt-4 space-y-6">
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Description
                    <textarea
                      className="min-h-[140px] rounded-lg border border-gray-200 px-3 py-2"
                      value={section.props.about5Description || ''}
                      onChange={(event) =>
                        updateAboutProps('about5Description', event.target.value)
                      }
                    />
                  </label>
                  <div className="space-y-4">
                    {(section.props.about5Awards || []).map((award, index) => (
                      <div key={`about5-award-${index}`} className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-gray-700">Award {index + 1}</p>
                          <button
                            className="text-xs font-semibold text-red-500"
                            type="button"
                            onClick={() =>
                              updateAboutProps(
                                'about5Awards',
                                (section.props.about5Awards || []).filter((_, idx) => idx !== index),
                              )
                            }
                          >
                            Remove
                          </button>
                        </div>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          <label className="flex flex-col gap-2 text-sm text-gray-600">
                            Project
                            <input
                              className="h-10 rounded-lg border border-gray-200 px-3"
                              type="text"
                              value={award?.project || ''}
                              onChange={(event) => {
                                const next = [...(section.props.about5Awards || [])]
                                next[index] = { ...next[index], project: event.target.value }
                                updateAboutProps('about5Awards', next)
                              }}
                            />
                          </label>
                          <label className="flex flex-col gap-2 text-sm text-gray-600">
                            Award giver
                            <input
                              className="h-10 rounded-lg border border-gray-200 px-3"
                              type="text"
                              value={award?.giver || ''}
                              onChange={(event) => {
                                const next = [...(section.props.about5Awards || [])]
                                next[index] = { ...next[index], giver: event.target.value }
                                updateAboutProps('about5Awards', next)
                              }}
                            />
                          </label>
                          <label className="flex flex-col gap-2 text-sm text-gray-600 sm:col-span-2">
                            Award name
                            <input
                              className="h-10 rounded-lg border border-gray-200 px-3"
                              type="text"
                              value={award?.award || ''}
                              onChange={(event) => {
                                const next = [...(section.props.about5Awards || [])]
                                next[index] = { ...next[index], award: event.target.value }
                                updateAboutProps('about5Awards', next)
                              }}
                            />
                          </label>
                          <label className="flex flex-col gap-2 text-sm text-gray-600">
                            Year
                            <input
                              className="h-10 rounded-lg border border-gray-200 px-3"
                              type="text"
                              value={award?.year || ''}
                              onChange={(event) => {
                                const next = [...(section.props.about5Awards || [])]
                                next[index] = { ...next[index], year: event.target.value }
                                updateAboutProps('about5Awards', next)
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    ))}
                    <button
                      className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600"
                      type="button"
                      onClick={() =>
                        updateAboutProps('about5Awards', [
                          ...(section.props.about5Awards || []),
                          { project: '', giver: '', award: '', year: '' },
                        ])
                      }
                    >
                      Add award
                    </button>
                  </div>
                </div>
              ) : null}

              {section.id === 'contact' && section.variant === 1 ? (
                <div className="mt-4 space-y-4">
                  {(section.props.links || []).map((link, index) => (
                    <div key={`contact-link-${index}`} className="grid gap-3 sm:grid-cols-2">
                      <label className="flex flex-col gap-2 text-sm text-gray-600">
                        Label
                        <input
                          className="h-10 rounded-lg border border-gray-200 px-3"
                          type="text"
                          value={link.label || ''}
                          onChange={(event) => {
                            const next = [...(section.props.links || [])]
                            next[index] = { ...next[index], label: event.target.value }
                            updateContactProps(next)
                          }}
                        />
                      </label>
                      <label className="flex flex-col gap-2 text-sm text-gray-600">
                        Link URL
                        <input
                          className="h-10 rounded-lg border border-gray-200 px-3"
                          type="text"
                          value={link.href || ''}
                          onChange={(event) => {
                            const next = [...(section.props.links || [])]
                            next[index] = { ...next[index], href: event.target.value }
                            updateContactProps(next)
                          }}
                        />
                      </label>
                      <div className="sm:col-span-2">
                        <button
                          className="text-xs font-semibold text-red-500"
                          type="button"
                          onClick={() =>
                            updateContactProps(
                              (section.props.links || []).filter((_, idx) => idx !== index),
                            )
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600"
                    type="button"
                    onClick={() =>
                      updateContactProps([
                        ...(section.props.links || []),
                        { label: '', href: '' },
                      ])
                    }
                  >
                    Add link
                  </button>
                </div>
              ) : null}

              {section.id === 'contact' && section.variant === 2 ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-gray-600 sm:col-span-2">
                    Text
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.contact2Text || ''}
                      onChange={(event) =>
                        updateContactField('contact2Text', event.target.value)
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Button label
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.contact2ButtonLabel || ''}
                      onChange={(event) =>
                        updateContactField('contact2ButtonLabel', event.target.value)
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Button link
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.contact2ButtonHref || ''}
                      onChange={(event) =>
                        updateContactField('contact2ButtonHref', event.target.value)
                      }
                    />
                  </label>
                </div>
              ) : null}

              {section.id === 'contact' && section.variant === 3 ? (
                <div className="mt-4 space-y-4">
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Large text
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.contact3Text || ''}
                      onChange={(event) =>
                        updateContactField('contact3Text', event.target.value)
                      }
                    />
                  </label>
                  <div className="space-y-4">
                    {(section.props.contact3Links || []).map((link, index) => (
                      <div key={`contact3-link-${index}`} className="grid gap-3 sm:grid-cols-2">
                        <label className="flex flex-col gap-2 text-sm text-gray-600">
                          Label
                          <input
                            className="h-10 rounded-lg border border-gray-200 px-3"
                            type="text"
                            value={link.label || ''}
                            onChange={(event) => {
                              const next = [...(section.props.contact3Links || [])]
                              next[index] = { ...next[index], label: event.target.value }
                              updateContactField('contact3Links', next)
                            }}
                          />
                        </label>
                        <label className="flex flex-col gap-2 text-sm text-gray-600">
                          Link URL
                          <input
                            className="h-10 rounded-lg border border-gray-200 px-3"
                            type="text"
                            value={link.href || ''}
                            onChange={(event) => {
                              const next = [...(section.props.contact3Links || [])]
                              next[index] = { ...next[index], href: event.target.value }
                              updateContactField('contact3Links', next)
                            }}
                          />
                        </label>
                        <div className="sm:col-span-2">
                          <button
                            className="text-xs font-semibold text-red-500"
                            type="button"
                            onClick={() =>
                              updateContactField(
                                'contact3Links',
                                (section.props.contact3Links || []).filter((_, idx) => idx !== index),
                              )
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600"
                      type="button"
                      onClick={() =>
                        updateContactField('contact3Links', [
                          ...(section.props.contact3Links || []),
                          { label: '', href: '' },
                        ])
                      }
                    >
                      Add link
                    </button>
                  </div>
                </div>
              ) : null}

              {section.id === 'contact' && section.variant === 4 ? (
                <div className="mt-4 space-y-4">
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Kicker
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.contact4Kicker || ''}
                      onChange={(event) =>
                        updateContactField('contact4Kicker', event.target.value)
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Description
                    <textarea
                      className="min-h-[120px] rounded-lg border border-gray-200 px-3 py-2"
                      value={section.props.contact4Description || ''}
                      onChange={(event) =>
                        updateContactField('contact4Description', event.target.value)
                      }
                    />
                  </label>
                  <div className="space-y-4">
                    {(section.props.contact4Links || []).map((link, index) => (
                      <div key={`contact4-link-${index}`} className="grid gap-3 sm:grid-cols-2">
                        <label className="flex flex-col gap-2 text-sm text-gray-600">
                          Label
                          <input
                            className="h-10 rounded-lg border border-gray-200 px-3"
                            type="text"
                            value={link.label || ''}
                            onChange={(event) => {
                              const next = [...(section.props.contact4Links || [])]
                              next[index] = { ...next[index], label: event.target.value }
                              updateContactField('contact4Links', next)
                            }}
                          />
                        </label>
                        <label className="flex flex-col gap-2 text-sm text-gray-600">
                          Link URL
                          <input
                            className="h-10 rounded-lg border border-gray-200 px-3"
                            type="text"
                            value={link.href || ''}
                            onChange={(event) => {
                              const next = [...(section.props.contact4Links || [])]
                              next[index] = { ...next[index], href: event.target.value }
                              updateContactField('contact4Links', next)
                            }}
                          />
                        </label>
                        <div className="sm:col-span-2">
                          <button
                            className="text-xs font-semibold text-red-500"
                            type="button"
                            onClick={() =>
                              updateContactField(
                                'contact4Links',
                                (section.props.contact4Links || []).filter((_, idx) => idx !== index),
                              )
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600"
                      type="button"
                      onClick={() =>
                        updateContactField('contact4Links', [
                          ...(section.props.contact4Links || []),
                          { label: '', href: '' },
                        ])
                      }
                    >
                      Add link
                    </button>
                  </div>
                </div>
              ) : null}

              {section.id === 'contact' && section.variant === 5 ? (
                <div className="mt-4 space-y-6">
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Description
                    <textarea
                      className="min-h-[120px] rounded-lg border border-gray-200 px-3 py-2"
                      value={section.props.contact5Description || ''}
                      onChange={(event) =>
                        updateContactField('contact5Description', event.target.value)
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-600">
                    Big text
                    <input
                      className="h-10 rounded-lg border border-gray-200 px-3"
                      type="text"
                      value={section.props.contact5BigText || ''}
                      onChange={(event) =>
                        updateContactField('contact5BigText', event.target.value)
                      }
                    />
                  </label>
                  <div className="space-y-4">
                    {(section.props.contact5Lists || []).map((list, index) => (
                      <div key={`contact5-list-${index}`} className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-gray-700">List {index + 1}</p>
                          <button
                            className="text-xs font-semibold text-red-500"
                            type="button"
                            onClick={() =>
                              updateContactField(
                                'contact5Lists',
                                (section.props.contact5Lists || []).filter((_, idx) => idx !== index),
                              )
                            }
                          >
                            Remove
                          </button>
                        </div>
                        <div className="mt-3 grid gap-3">
                          <label className="flex flex-col gap-2 text-sm text-gray-600">
                            List title
                            <input
                              className="h-10 rounded-lg border border-gray-200 px-3"
                              type="text"
                              value={list?.title || ''}
                              onChange={(event) => {
                                const next = [...(section.props.contact5Lists || [])]
                                next[index] = { ...next[index], title: event.target.value }
                                updateContactField('contact5Lists', next)
                              }}
                            />
                          </label>
                          <label className="flex flex-col gap-2 text-sm text-gray-600">
                            List items (one per line)
                            <textarea
                              className="min-h-[90px] rounded-lg border border-gray-200 px-3 py-2"
                              value={(list?.items || []).join('\n')}
                              onChange={(event) => {
                                const next = [...(section.props.contact5Lists || [])]
                                next[index] = {
                                  ...next[index],
                                  items: event.target.value
                                    .split('\n')
                                    .map((item) => item.trim())
                                    .filter(Boolean),
                                }
                                updateContactField('contact5Lists', next)
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    ))}
                    <button
                      className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600"
                      type="button"
                      onClick={() =>
                        updateContactField('contact5Lists', [
                          ...(section.props.contact5Lists || []),
                          { title: '', items: [] },
                        ])
                      }
                    >
                      Add list
                    </button>
                  </div>
                </div>
              ) : null}

              {section.id === 'projects' ? (
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Add projects with a name and image.</p>
                  <form className="mt-4 grid gap-4 sm:grid-cols-2" onSubmit={handleProjectSubmit}>
                    <label className="flex flex-col gap-2 text-sm text-gray-600">
                      Project name
                      <input
                        className="h-10 rounded-lg border border-gray-200 px-3"
                        type="text"
                        value={projectName}
                        onChange={(event) => setProjectName(event.target.value)}
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-gray-600">
                      Project images
                      <input
                        className="h-10 rounded-lg border border-gray-200 px-3 py-1"
                        type="file"
                        accept="image/*"
                        multiple
                        ref={projectImagesInputRef}
                        onChange={(event) => setProjectImages(Array.from(event.target.files || []))}
                      />
                      {projectImages.length ? (
                        <span className="text-xs text-gray-500">
                          {projectImages.length} files selected
                        </span>
                      ) : null}
                    </label>
                    <div className="sm:col-span-2">
                      <button
                        className="rounded-full bg-gray-900 px-6 py-2 text-sm font-semibold text-white"
                        type="submit"
                      >
                        Add project
                      </button>
                    </div>
                  </form>
                  {projectsError ? (
                    <p className="mt-4 text-sm text-red-600">{projectsError}</p>
                  ) : null}
                  {projects.length ? (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {projects.map((project) => (
                        <div key={project.id} className="rounded-xl border border-gray-100 p-4">
                          <p className="text-sm font-semibold text-gray-900">{project.name}</p>
                          {project.imageUrls?.length ? (
                            <img
                              className="mt-3 h-40 w-full object-cover"
                              src={`${API_BASE_URL}${project.imageUrls[0]}`}
                              alt={project.name}
                            />
                          ) : project.imageUrl ? (
                            <img
                              className="mt-3 h-40 w-full object-cover"
                              src={`${API_BASE_URL}${project.imageUrl}`}
                              alt={project.name}
                            />
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
