import { useEffect, useRef, useState } from 'react'
import { api, uploadFile } from '../../../../api/client'

function ProjectCard({ project, onUpdate, onDelete, onAddImages, onDeleteImage }) {
  const [name, setName] = useState(project.name)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef(null)

  function handleNameBlur() {
    if (name !== project.name) onUpdate({ ...project, name })
  }

  async function handleFiles(e) {
    const files = Array.from(e.target.files)
    if (!files.length) return
    setUploading(true)
    try {
      for (const file of files) {
        const path = await uploadFile(file)
        await onAddImages(project.id, path)
      }
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            onBlur={handleNameBlur}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>
        <button onClick={onDelete} className="text-sm text-red-400 hover:text-red-600 mt-4">
          Remove
        </button>
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-2">
          Images ({(project.images || []).length} / 6) — up to 6 shown (2 left, 4 right)
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {(project.images || []).map((img, idx) => (
            <div key={img.id} className="relative group">
              <img src={img.image_path} alt="" className="w-16 h-16 object-cover rounded border border-gray-200" />
              <span className="absolute bottom-0 left-0 bg-black/50 text-white text-[10px] px-1 rounded-br">
                {idx + 1}
              </span>
              <button
                onClick={() => onDeleteImage(img.id)}
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs leading-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
        <button
          onClick={() => inputRef.current.click()}
          disabled={uploading}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
        >
          {uploading ? 'Uploading…' : '+ Add images'}
        </button>
      </div>
    </div>
  )
}

export default function ProjectsVariant4Form({ props, onChange }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    api.get('/api/projects').then(data => {
      setProjects(data || [])
      setLoading(false)
    })
  }, [])

  async function addProject() {
    const p = await api.post('/api/projects', {
      name: 'New project', category: '', image_path: '', year: '', order_index: projects.length,
    })
    p.images = []
    setProjects(prev => [...prev, p])
  }

  async function updateProject(updated) {
    await api.put(`/api/projects/${updated.id}`, updated)
    setProjects(prev => prev.map(p => p.id === updated.id ? { ...p, ...updated } : p))
  }

  async function deleteProject(id) {
    await api.delete(`/api/projects/${id}`)
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  async function addImage(projectId, imagePath) {
    const img = await api.post(`/api/projects/${projectId}/images`, { image_path: imagePath, order_index: 0 })
    setProjects(prev => prev.map(p =>
      p.id === projectId ? { ...p, images: [...(p.images || []), img] } : p
    ))
  }

  async function deleteImage(imageId) {
    await api.delete(`/api/project-images/${imageId}`)
    setProjects(prev => prev.map(p => ({
      ...p,
      images: (p.images || []).filter(img => img.id !== imageId),
    })))
  }

  if (loading) return <p className="text-sm text-gray-400">Loading projects…</p>

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-400">Project names appear as a list in the center. Images (up to 6) scatter around it.</p>
      {projects.map(p => (
        <ProjectCard
          key={p.id}
          project={p}
          onUpdate={updateProject}
          onDelete={() => deleteProject(p.id)}
          onAddImages={addImage}
          onDeleteImage={deleteImage}
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
