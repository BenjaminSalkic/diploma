export default function AboutVariant4Form({ props, onChange }) {
  const p = props || {}

  function update(field, value) {
    onChange({ ...p, [field]: value })
  }

  const fields = [
    { key: 'greeting',    label: 'Greeting',               placeholder: 'HELLO,'                            },
    { key: 'namePrefix',  label: 'Name prefix',            placeholder: "I'M"                               },
    { key: 'name',        label: 'Name (shown in primary color)', placeholder: 'SANNI SAHIL'               },
    { key: 'description', label: 'Description',            placeholder: 'A dedicated web designer…'         },
    { key: 'cta',         label: 'CTA text (bottom)',      placeholder: "LET'S DESIGN-DIVE! EXPLORE…"       },
    { key: 'ellipseText', label: 'Ellipse rotating text',  placeholder: 'CONTINUE THE JOURNEY /'            },
    { key: 'col1Text',    label: 'Waterfall column 1 text', placeholder: 'PORTFOLIO'                        },
    { key: 'col2Text',    label: 'Waterfall column 2 text', placeholder: 'SANNISAHIL'                       },
  ]

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-400">The accent / primary color is set in Global Settings and used for the name and ellipse text.</p>
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
