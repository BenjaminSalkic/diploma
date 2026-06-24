export default function ContactVariant4Form({ props, onChange }) {
  const p     = props || {}
  const links = Array.isArray(p.links) ? p.links : []

  function updateField(field, value) {
    onChange({ ...p, [field]: value })
  }

  function updateLink(index, field, value) {
    const next = links.map((l, i) => i === index ? { ...l, [field]: value } : l)
    onChange({ ...p, links: next })
  }

  function addLink() {
    onChange({ ...p, links: [...links, { label: '', url: '' }] })
  }

  function removeLink(index) {
    onChange({ ...p, links: links.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs text-gray-500 mb-1">Label (top)</label>
        <input
          type="text"
          value={p.label ?? ''}
          onChange={e => updateField('label', e.target.value)}
          placeholder="Get in touch"
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">Description</label>
        <textarea
          rows={4}
          value={p.description ?? ''}
          onChange={e => updateField('description', e.target.value)}
          placeholder="Here are several ways you can reach me…"
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs text-gray-500">Links</label>
          <button
            onClick={addLink}
            className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-50"
          >
            + Add link
          </button>
        </div>

        <div className="space-y-2">
          {links.map((link, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                type="text"
                value={link.label ?? ''}
                onChange={e => updateLink(i, 'label', e.target.value)}
                placeholder="Twitter"
                className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <input
                type="text"
                value={link.url ?? ''}
                onChange={e => updateLink(i, 'url', e.target.value)}
                placeholder="URL"
                className="flex-[2] border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <button
                onClick={() => removeLink(i)}
                className="text-xs text-red-400 hover:text-red-600 shrink-0"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
