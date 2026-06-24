export default function ContactVariant2Form({ props, onChange }) {
  const p = props || {}

  function update(field, value) {
    onChange({ ...p, [field]: value })
  }

  const fields = [
    { key: 'headline',  label: 'Headline',              placeholder: "Let's work together"    },
    { key: 'email',     label: 'Email (copied on click)', placeholder: 'you@example.com'      },
    { key: 'ctaText',   label: 'Button text',           placeholder: 'COPY EMAIL TO CLIPBOARD' },
    { key: 'brandName', label: 'Brand name (footer)',   placeholder: 'DEN.COOL'               },
    { key: 'copyright', label: 'Copyright line (footer)', placeholder: '© 2024'              },
  ]

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-400">Hovering the section tilts the text back and reveals a copy-email button.</p>
      {fields.map(({ key, label, placeholder }) => (
        <div key={key}>
          <label className="block text-xs text-gray-500 mb-1">{label}</label>
          <input
            type="text"
            value={p[key] ?? ''}
            onChange={e => update(key, e.target.value)}
            placeholder={placeholder}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>
      ))}
    </div>
  )
}
