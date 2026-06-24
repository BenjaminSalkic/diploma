import { useRef, useState } from 'react'
import { uploadFile } from '../../../../api/client'

function ImageRow({ src, onRemove }) {
  return (
    <div className="flex items-center gap-3 p-2 border border-gray-200 rounded">
      <img src={src} alt="" className="w-16 h-16 object-cover rounded bg-gray-100" />
      <span className="flex-1 text-sm text-gray-500 truncate">{src}</span>
      <button
        onClick={onRemove}
        className="text-sm text-red-600 hover:underline flex-shrink-0"
      >
        Remove
      </button>
    </div>
  )
}

export default function HeroVariant1Form({ props, onChange }) {
  const images = props.images || []
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  async function handleFileChange(e) {
    const files = Array.from(e.target.files)
    if (!files.length) return

    setUploading(true)
    setUploadError('')
    try {
      const paths = await Promise.all(files.map(uploadFile))
      onChange({ ...props, images: [...images, ...paths] })
    } catch {
      setUploadError('Upload failed — try again')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  function removeImage(index) {
    onChange({ ...props, images: images.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
        <textarea
          rows={3}
          value={props.heading || ''}
          onChange={e => onChange({ ...props, heading: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
        <div className="space-y-2">
          {images.map((src, i) => (
            <ImageRow key={i} src={src} onRemove={() => removeImage(i)} />
          ))}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          onClick={() => inputRef.current.click()}
          disabled={uploading}
          className="mt-3 px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
        >
          {uploading ? 'Uploading…' : '+ Upload image'}
        </button>
        {uploadError && <p className="mt-1 text-sm text-red-500">{uploadError}</p>}
      </div>
    </div>
  )
}
