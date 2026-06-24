export default function ContactVariant5Form({ props, onChange }) {
  const p     = props || {}
  const lists = Array.isArray(p.lists) ? p.lists : []

  function updateField(field, value) {
    onChange({ ...p, [field]: value })
  }

  function updateList(li, field, value) {
    const next = lists.map((l, i) => i === li ? { ...l, [field]: value } : l)
    onChange({ ...p, lists: next })
  }

  function addList() {
    onChange({ ...p, lists: [...lists, { label: '', items: [] }] })
  }

  function removeList(li) {
    onChange({ ...p, lists: lists.filter((_, i) => i !== li) })
  }

  function updateItem(li, ii, field, value) {
    const items = (lists[li].items || []).map((it, j) => j === ii ? { ...it, [field]: value } : it)
    updateList(li, 'items', items)
  }

  function addItem(li) {
    const items = [...(lists[li].items || []), { text: '', url: '' }]
    updateList(li, 'items', items)
  }

  function removeItem(li, ii) {
    const items = (lists[li].items || []).filter((_, j) => j !== ii)
    updateList(li, 'items', items)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs text-gray-500 mb-1">Description (top left)</label>
        <textarea
          rows={3}
          value={p.description ?? ''}
          onChange={e => updateField('description', e.target.value)}
          placeholder="It's not client and supplier…"
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">Large bottom text</label>
        <input
          type="text"
          value={p.bigText ?? ''}
          onChange={e => updateField('bigText', e.target.value)}
          placeholder="AIRBORNE"
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs text-gray-500">Columns</label>
          <button onClick={addList} className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
            + Add column
          </button>
        </div>

        <div className="space-y-3">
          {lists.map((col, li) => (
            <div key={li} className="border border-gray-200 rounded p-3 space-y-2">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={col.label ?? ''}
                  onChange={e => updateList(li, 'label', e.target.value)}
                  placeholder="Column label (e.g. SOCIALS)"
                  className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <button onClick={() => removeList(li)} className="text-xs text-red-400 hover:text-red-600">✕</button>
              </div>

              {(col.items || []).map((item, ii) => (
                <div key={ii} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={item.text ?? ''}
                    onChange={e => updateItem(li, ii, 'text', e.target.value)}
                    placeholder="Text"
                    className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                  <input
                    type="text"
                    value={item.url ?? ''}
                    onChange={e => updateItem(li, ii, 'url', e.target.value)}
                    placeholder="URL (optional)"
                    className="flex-[2] border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                  <button onClick={() => removeItem(li, ii)} className="text-xs text-red-400 hover:text-red-600">✕</button>
                </div>
              ))}

              <button onClick={() => addItem(li)} className="text-xs text-gray-500 hover:text-gray-700">
                + Add item
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
