export default function ContactVariant1Form({ props, onChange }) {
  const p     = props || {}
  const links = Array.isArray(p.links) ? p.links : []

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
    <div className="space-y-3">
      <p className="text-xs text-gray-400">Links are displayed centered on the page. Use mailto: for email addresses.</p>

      {links.map((link, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            type="text"
            value={link.label ?? ''}
            onChange={e => updateLink(i, 'label', e.target.value)}
            placeholder="Display name (e.g. Email)"
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          <input
            type="text"
            value={link.url ?? ''}
            onChange={e => updateLink(i, 'url', e.target.value)}
            placeholder="URL (e.g. mailto:you@email.com)"
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

      <button
        onClick={addLink}
        className="text-xs px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 w-full"
      >
        + Add link
      </button>
    </div>
  )
}
