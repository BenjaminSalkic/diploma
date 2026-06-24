import { useRef, useState } from 'react'
import { uploadFile } from '../../../../api/client'

export default function AboutVariant1Form({ props, onChange }) {
  const p           = props || {}
  const title       = p.title       ?? 'HELLO. I AM'
  const subtitle    = p.subtitle    ?? ''
  const description = p.description ?? ''
  const image       = p.image       ?? ''

  const [uploading, setUploading] = useState(false)
  const inputRef = useRef(null)

  function update(field, value) {
    onChange({ ...p, [field]: value })
  }

  async function handleImage(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const path = await uploadFile(file)
      update('image', path)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs text-gray-500 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={e => update('title', e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">Subtitle (optional, shown below title in italic)</label>
        <input
          type="text"
          value={subtitle}
          onChange={e => update('subtitle', e.target.value)}
          placeholder="e.g. Patrick David"
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">Description</label>
        <textarea
          value={description}
          onChange={e => update('description', e.target.value)}
          rows={5}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-2">Image (right side)</label>
        {image ? (
          <div className="flex items-center gap-3">
            <img src={image} alt="" className="w-20 h-24 object-cover rounded border border-gray-200" />
            <button onClick={() => update('image', '')} className="text-sm text-red-400 hover:text-red-600">
              Remove
            </button>
          </div>
        ) : (
          <>
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
            <button
              onClick={() => inputRef.current.click()}
              disabled={uploading}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            >
              {uploading ? 'Uploading…' : '+ Upload image'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
