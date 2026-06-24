export default function HeroVariant3Form({ props, onChange }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          value={props.name || ''}
          onChange={e => onChange({ ...props, name: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Top-left badge</label>
        <input
          type="text"
          value={props.badge || ''}
          onChange={e => onChange({ ...props, badge: e.target.value })}
          placeholder="©2025:V.0"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description (bottom-left)</label>
        <textarea
          rows={3}
          value={props.description || ''}
          onChange={e => onChange({ ...props, description: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>
    </div>
  )
}
