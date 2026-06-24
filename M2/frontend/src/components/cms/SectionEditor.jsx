import SectionFormRegistry from './SectionFormRegistry'

const VARIANTS_BY_SECTION = {
  hero:     [1, 2, 3, 4],
  projects: [1, 2, 3, 4, 5],
  skills:   [1, 2],
  about:    [1, 2, 3, 4, 5],
  contact:  [1, 2, 3, 4, 5],
}

export default function SectionEditor({ section, onChange }) {
  const availableVariants = VARIANTS_BY_SECTION[section.id] || [1, 2, 3, 4]

  return (
    <div className="border border-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900 capitalize">{section.id}</h2>
        <div className="flex items-center gap-2 text-sm">
          <label className="text-gray-500">Variant</label>
          <select
            value={section.variant}
            onChange={e => onChange({ ...section, variant: Number(e.target.value) })}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            {availableVariants.map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      <SectionFormRegistry
        section={section}
        onChange={newProps => onChange({ ...section, props: newProps })}
      />
    </div>
  )
}
