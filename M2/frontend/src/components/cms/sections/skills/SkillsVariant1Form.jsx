import { useRef, useState } from 'react'
import { uploadFile } from '../../../../api/client'

export default function SkillsVariant1Form({ props, onChange }) {
  const {
    line1           = "LET'S",
    line2           = 'CONNECT',
    subtext         = "I'M ALWAYS INTERESTED ABOUT",
    skills          = [],
    backgroundImage = '',
  } = props || {}

  const [newSkill, setNewSkill]   = useState('')
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef(null)

  function update(field, value) {
    onChange({ ...props, [field]: value })
  }

  function addSkill() {
    const s = newSkill.trim()
    if (!s) return
    update('skills', [...skills, s])
    setNewSkill('')
  }

  function removeSkill(i) {
    update('skills', skills.filter((_, idx) => idx !== i))
  }

  async function handleImage(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const path = await uploadFile(file)
      update('backgroundImage', path)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div className="space-y-4">
      {/* Heading lines */}
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Heading line 1</label>
          <input
            type="text"
            value={line1}
            onChange={e => update('line1', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Heading line 2</label>
          <input
            type="text"
            value={line2}
            onChange={e => update('line2', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>
      </div>

      {/* Subtext */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">Subtext above skills</label>
        <input
          type="text"
          value={subtext}
          onChange={e => update('subtext', e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      {/* Skills */}
      <div>
        <label className="block text-xs text-gray-500 mb-2">Skills</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1 text-xs font-medium"
            >
              {skill}
              <button
                onClick={() => removeSkill(i)}
                className="text-gray-400 hover:text-red-500 leading-none ml-1"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={e => setNewSkill(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addSkill()}
            placeholder="Add a skill…"
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          <button
            onClick={addSkill}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50"
          >
            Add
          </button>
        </div>
      </div>

      {/* Background image */}
      <div>
        <label className="block text-xs text-gray-500 mb-2">Background image (optional)</label>
        {backgroundImage ? (
          <div className="flex items-center gap-3">
            <img src={backgroundImage} alt="" className="w-24 h-14 object-cover rounded border border-gray-200" />
            <button
              onClick={() => update('backgroundImage', '')}
              className="text-sm text-red-400 hover:text-red-600"
            >
              Remove
            </button>
          </div>
        ) : (
          <>
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
            <button
              onClick={() => inputRef.current.click()}
              disabled={uploading}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            >
              {uploading ? 'Uploading…' : '+ Upload image'}
            </button>
            <p className="text-xs text-gray-400 mt-1">Leave empty for a plain background colour.</p>
          </>
        )}
      </div>
    </div>
  )
}
