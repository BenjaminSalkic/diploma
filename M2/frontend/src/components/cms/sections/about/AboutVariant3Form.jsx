import { useState } from 'react'

function BlockEditor({ block, onChange, onDelete }) {
  const [newPrefix, setNewPrefix] = useState('')
  const [newText, setNewText]     = useState('')

  function update(field, value) {
    onChange({ ...block, [field]: value })
  }

  function addItem() {
    const t = newText.trim()
    if (!t) return
    update('items', [...(block.items || []), { prefix: newPrefix.trim(), text: t }])
    setNewPrefix('')
    setNewText('')
  }

  function removeItem(i) {
    update('items', block.items.filter((_, idx) => idx !== i))
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={block.label || ''}
          onChange={e => update('label', e.target.value)}
          placeholder="Section label (e.g. Achievements)"
          className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <select
          value={block.type || 'list'}
          onChange={e => update('type', e.target.value)}
          className="border border-gray-300 rounded px-2 py-1.5 text-sm"
        >
          <option value="list">List</option>
          <option value="text">Text</option>
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

      {(block.type === 'list' || !block.type) && (
        <div className="space-y-2">
          <div className="space-y-1">
            {(block.items || []).map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="text-gray-400 w-10 shrink-0 text-xs">{item.prefix || '—'}</span>
                <span className="flex-1">{item.text}</span>
                <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600">×</button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newPrefix}
              onChange={e => setNewPrefix(e.target.value)}
              placeholder="Prefix (1x, ↗, '24…)"
              className="w-20 border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <input
              type="text"
              value={newText}
              onChange={e => setNewText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addItem()}
              placeholder="Item text…"
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

export default function AboutVariant3Form({ props, onChange }) {
  const p          = props || {}
  const paragraphs = Array.isArray(p.paragraphs) ? p.paragraphs : []
  const aboutLabel = p.aboutLabel ?? 'About'
  const blocks     = Array.isArray(p.blocks) ? p.blocks : []

  const [newPara, setNewPara] = useState('')

  function update(field, value) {
    onChange({ ...p, [field]: value })
  }

  function addParagraph() {
    const t = newPara.trim()
    if (!t) return
    update('paragraphs', [...paragraphs, t])
    setNewPara('')
  }

  function removeParagraph(i) {
    update('paragraphs', paragraphs.filter((_, idx) => idx !== i))
  }

  function updateParagraph(i, val) {
    update('paragraphs', paragraphs.map((p, idx) => idx === i ? val : p))
  }

  function addBlock() {
    update('blocks', [...blocks, { label: '', type: 'list', items: [] }])
  }

  function updateBlock(i, updated) {
    update('blocks', blocks.map((b, idx) => idx === i ? updated : b))
  }

  function deleteBlock(i) {
    update('blocks', blocks.filter((_, idx) => idx !== i))
  }

  return (
    <div className="space-y-5">
      {/* About label */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">Right-side label (above paragraphs)</label>
        <input
          type="text"
          value={aboutLabel}
          onChange={e => update('aboutLabel', e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      {/* Paragraphs */}
      <div>
        <label className="block text-xs text-gray-500 mb-2">Right-side paragraphs</label>
        <div className="space-y-2 mb-2">
          {paragraphs.map((para, i) => (
            <div key={i} className="flex gap-2 items-start">
              <textarea
                value={para}
                onChange={e => updateParagraph(i, e.target.value)}
                rows={2}
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
              />
              <button onClick={() => removeParagraph(i)} className="text-red-400 hover:text-red-600 text-sm mt-1">×</button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <textarea
            value={newPara}
            onChange={e => setNewPara(e.target.value)}
            rows={2}
            placeholder="New paragraph…"
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
          />
          <button onClick={addParagraph} className="px-3 text-sm border border-gray-300 rounded hover:bg-gray-50">
            Add
          </button>
        </div>
      </div>

      {/* Left blocks */}
      <div>
        <label className="block text-xs text-gray-500 mb-2">Left-side blocks</label>
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
        <button
          onClick={addBlock}
          className="mt-2 w-full py-2 border border-dashed border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50"
        >
          + Add block
        </button>
      </div>
    </div>
  )
}
