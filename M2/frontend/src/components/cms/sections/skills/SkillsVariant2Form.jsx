import { useState } from 'react'

export default function SkillsVariant2Form({ props, onChange }) {
  const p          = props || {}
  const topLabel   = p.topLabel   ?? '(OPEN TO)'
  const line1      = p.line1      ?? 'PROFESSIONAL OPPORTUNITIES'
  const line2      = p.line2      ?? 'FREELANCE PROJECTS'
  const stackLabel = p.stackLabel ?? 'STACK'
  const skills     = Array.isArray(p.skills) ? p.skills : []

  const [newSkill, setNewSkill] = useState('')

  function update(field, value) {
    onChange({ ...p, [field]: value })
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

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs text-gray-500 mb-1">Top label (small text above heading)</label>
        <input
          type="text"
          value={topLabel}
          onChange={e => update('topLabel', e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Large text line 1</label>
          <input
            type="text"
            value={line1}
            onChange={e => update('line1', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Large text line 2</label>
          <input
            type="text"
            value={line2}
            onChange={e => update('line2', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">Stack label</label>
        <input
          type="text"
          value={stackLabel}
          onChange={e => update('stackLabel', e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-2">Skills / Stack items</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {skills.map((skill, i) => (
            <span key={i} className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1 text-xs font-medium">
              {skill}
              <button onClick={() => removeSkill(i)} className="text-gray-400 hover:text-red-500 ml-1">×</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={e => setNewSkill(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addSkill()}
            placeholder="Add skill…"
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          <button onClick={addSkill} className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
