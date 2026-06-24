import { useEffect, useState } from 'react'
import { api } from '../api/client'
import GlobalSettingsForm from '../components/cms/GlobalSettingsForm'
import SectionEditor from '../components/cms/SectionEditor'

export default function AdminPage() {
  const [config, setConfig] = useState(null)
  const [saving, setSaving] = useState(false)
  const [statusMsg, setStatusMsg] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    api.get('/api/page-config').then(setConfig).catch(() => setError('Failed to load config'))
  }, [])

  function updateGlobal(newGlobal) {
    setConfig(c => ({ ...c, global: newGlobal }))
  }

  function updateSection(index, newSection) {
    setConfig(c => {
      const sections = [...c.sections]
      sections[index] = newSection
      return { ...c, sections }
    })
  }

  async function save() {
    setSaving(true)
    setStatusMsg('')
    try {
      await api.put('/api/page-config', config)
      setStatusMsg('Saved')
      setTimeout(() => setStatusMsg(''), 2000)
    } catch {
      setStatusMsg('Error saving')
    } finally {
      setSaving(false)
    }
  }

  if (error) return <p className="text-red-500">{error}</p>
  if (!config) return <p className="text-gray-400">Loading…</p>

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">CMS</h1>
        <div className="flex items-center gap-3">
          {statusMsg && (
            <span className={`text-sm ${statusMsg === 'Saved' ? 'text-green-600' : 'text-red-500'}`}>
              {statusMsg}
            </span>
          )}
          <button
            onClick={save}
            disabled={saving}
            className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-700 disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Global Settings</h2>
        <GlobalSettingsForm global={config.global} onChange={updateGlobal} />
      </div>

      {config.sections.map((section, i) => (
        <SectionEditor
          key={section.id}
          section={section}
          onChange={newSection => updateSection(i, newSection)}
        />
      ))}
    </div>
  )
}
