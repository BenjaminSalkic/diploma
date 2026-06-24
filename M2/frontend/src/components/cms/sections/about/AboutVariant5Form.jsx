export default function AboutVariant5Form({ props, onChange }) {
  const p      = props || {}
  const awards = Array.isArray(p.awards) ? p.awards : []

  function updateField(field, value) {
    onChange({ ...p, [field]: value })
  }

  function updateAward(index, field, value) {
    const next = awards.map((a, i) => i === index ? { ...a, [field]: value } : a)
    onChange({ ...p, awards: next })
  }

  function addAward() {
    onChange({ ...p, awards: [...awards, { name: '', giver: '', award: '', year: '' }] })
  }

  function removeAward(index) {
    onChange({ ...p, awards: awards.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs text-gray-500 mb-1">Description</label>
        <textarea
          rows={4}
          value={p.description ?? ''}
          onChange={e => updateField('description', e.target.value)}
          placeholder="Thomas Monavon is a freelance designer…"
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs text-gray-500">Awards / list rows</label>
          <button
            onClick={addAward}
            className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-50"
          >
            + Add row
          </button>
        </div>

        <div className="space-y-2">
          {awards.map((row, i) => (
            <div key={i} className="border border-gray-200 rounded p-2 space-y-1.5">
              <div className="grid grid-cols-2 gap-1.5">
                <input
                  type="text"
                  value={row.name ?? ''}
                  onChange={e => updateAward(i, 'name', e.target.value)}
                  placeholder="Project / person name"
                  className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <input
                  type="text"
                  value={row.giver ?? ''}
                  onChange={e => updateAward(i, 'giver', e.target.value)}
                  placeholder="Award giver (Awwwards…)"
                  className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <input
                  type="text"
                  value={row.award ?? ''}
                  onChange={e => updateAward(i, 'award', e.target.value)}
                  placeholder="Award name"
                  className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <input
                  type="text"
                  value={row.year ?? ''}
                  onChange={e => updateAward(i, 'year', e.target.value)}
                  placeholder="Year (e.g. 24)"
                  className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
              <button
                onClick={() => removeAward(i)}
                className="text-xs text-red-400 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
