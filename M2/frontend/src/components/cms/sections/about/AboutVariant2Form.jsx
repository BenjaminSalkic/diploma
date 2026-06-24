import { useState } from 'react'

function BlockEditor({ block, onChange, onDelete }) {
  const [newItem, setNewItem] = useState('')

  function update(field, value) {
    onChange({ ...block, [field]: value })
  }

  function addItem() {
    const s = newItem.trim()
    if (!s) return
    update('items', [...(block.items || []), s])
    setNewItem('')
  }

  function removeItem(i) {
    update('items', block.items.filter((_, idx) => idx !== i))
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={block.label || ''}
          onChange={e => update('label', e.target.value)}
          placeholder="Label (optional, e.g. WORKED WITH)"
          className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <select
          value={block.type || 'text'}
          onChange={e => update('type', e.target.value)}
          className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        >
          <option value="text">Text</option>
          <option value="list">List</option>
        </select>
        <button onClick={onDelete} className="text-red-400 hover:text-red-600 text-sm">Remove</button>
      </div>

      {block.type === 'text' && (
        <textarea
          value={block.content || ''}
          onChange={e => update('content', e.target.value)}
          rows={3}
          placeholder="Text content…"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
        />
      )}

      {block.type === 'list' && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500">Columns:</label>
            <select
              value={block.columns || 1}
              onChange={e => update('columns', Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(block.items || []).map((item, i) => (
              <span key={i} className="flex items-center gap-1 bg-gray-100 rounded px-2 py-0.5 text-xs font-medium">
                {item}
                <button onClick={() => removeItem(i)} className="text-gray-400 hover:text-red-500">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newItem}
              onChange={e => setNewItem(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addItem()}
              placeholder="Add item…"
              className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button onClick={addItem} className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AboutVariant2Form({ props, onChange }) {
  const p      = props || {}
  const desc1  = p.desc1  ?? ''
  const desc2  = p.desc2  ?? ''
  const blocks = Array.isArray(p.blocks) ? p.blocks : []

  function update(field, value) {
    onChange({ ...p, [field]: value })
  }

  function addBlock(type) {
    const block = type === 'list'
      ? { label: '', type: 'list', items: [], columns: 1 }
      : { label: '', type: 'text', content: '' }
    update('blocks', [...blocks, block])
  }

  function updateBlock(i, updated) {
    update('blocks', blocks.map((b, idx) => idx === i ? updated : b))
  }

  function deleteBlock(i) {
    update('blocks', blocks.filter((_, idx) => idx !== i))
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs text-gray-500 mb-1">Description paragraph 1</label>
        <textarea
          value={desc1}
          onChange={e => update('desc1', e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">Description paragraph 2</label>
        <textarea
          value={desc2}
          onChange={e => update('desc2', e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-2">Right-side blocks</label>
        <div className="space-y-2">
          {blocks.map((block, i) => (
            <BlockEditor
              key={i}
              block={block}
              onChange={updated => updateBlock(i, updated)}
              onDelete={() => deleteBlock(i)}
            />
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => addBlock('text')}
            className="flex-1 py-2 border border-dashed border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50"
          >
            + Add text block
          </button>
          <button
            onClick={() => addBlock('list')}
            className="flex-1 py-2 border border-dashed border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50"
          >
            + Add list block
          </button>
        </div>
      </div>
    </div>
  )
}
