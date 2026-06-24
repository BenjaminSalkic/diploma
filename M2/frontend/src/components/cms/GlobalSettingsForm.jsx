const COLOR_FIELDS = [
  { key: 'backgroundColor', label: 'Background' },
  { key: 'textColor', label: 'Text' },
  { key: 'primaryColor', label: 'Primary' },
]

const FONT_FIELDS = [
  { key: 'heading', label: 'Heading font' },
  { key: 'body', label: 'Body font' },
]

export default function GlobalSettingsForm({ global: g, onChange }) {
  function updateTheme(key, value) {
    onChange({ ...g, theme: { ...g.theme, [key]: value } })
  }

  function updateFont(key, value) {
    onChange({ ...g, font: { ...g.font, [key]: value } })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Theme</h3>
        <div className="grid grid-cols-3 gap-4">
          {COLOR_FIELDS.map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm text-gray-600 mb-1">{label}</label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={g.theme[key]}
                  onChange={e => updateTheme(key, e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border border-gray-200 p-0.5"
                />
                <input
                  type="text"
                  value={g.theme[key]}
                  onChange={e => updateTheme(key, e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Fonts</h3>
        <div className="grid grid-cols-2 gap-4">
          {FONT_FIELDS.map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm text-gray-600 mb-1">{label}</label>
              <input
                type="text"
                value={g.font[key]}
                onChange={e => updateFont(key, e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
