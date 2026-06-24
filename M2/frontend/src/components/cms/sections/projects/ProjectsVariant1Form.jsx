import { useEffect, useRef, useState } from 'react'
import { api, uploadFile } from '../../../../api/client'

function ProjectRow({ project, onUpdate, onDelete }) {
  const [local, setLocal] = useState(project)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef(null)

  function update(field, value) {
    const updated = { ...local, [field]: value }
    setLocal(updated)
    onUpdate(updated)
  }

  async function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const path = await uploadFile(file)
      update('image_path', path)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Name</label>
          <input
            type="text"
            value={local.name}
            onChange={e => update('name', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>
        <div className="w-36">
          <label className="block text-xs text-gray-500 mb-1">Category</label>
          <input
            type="text"
            value={local.category}
            onChange={e => update('category', e.target.value)}
            placeholder="Website"
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {local.image_path && (
          <img src={local.image_path} alt="" className="w-16 h-12 object-cover rounded border border-gray-200" />
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        <button
          onClick={() => inputRef.current.click()}
          disabled={uploading}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
        >
          {uploading ? 'Uploading…' : local.image_path ? 'Change image' : 'Upload image'}
        </button>
        <button onClick={onDelete} className="ml-auto text-sm text-red-500 hover:underline">
          Remove
        </button>
      </div>
    </div>
  )
}

export default function ProjectsVariant1Form({ props, onChange }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/projects').then(data => {
      setProjects(data || [])
      setLoading(false)
    })
  }, [])

  async function addProject() {
    const p = await api.post('/api/projects', { name: 'New project', category: '', image_path: '', order_index: projects.length })
    setProjects(prev => [...prev, p])
  }

  async function updateProject(updated) {
    await api.put(`/api/projects/${updated.id}`, updated)
    setProjects(prev => prev.map(p => p.id === updated.id ? updated : p))
  }

  async function deleteProject(id) {
    await api.delete(`/api/projects/${id}`)
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  if (loading) return <p className="text-sm text-gray-400">Loading projects…</p>

  return (
    <div className="space-y-3">
      {projects.map(p => (
        <ProjectRow
          key={p.id}
          project={p}
          onUpdate={updateProject}
          onDelete={() => deleteProject(p.id)}
        />
      ))}
      <button
        onClick={addProject}
        className="w-full py-2 border border-dashed border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50"
      >
        + Add project
      </button>
    </div>
  )
}
