import { useEffect, useRef, useState } from 'react'
import { api, uploadFile } from '../../../../api/client'

function ProjectCard({ project, onUpdate, onDelete, onAddImage, onDeleteImage }) {
  const [name, setName] = useState(project.name)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef(null)

  function handleNameBlur() {
    if (name !== project.name) onUpdate({ ...project, name })
  }

  async function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const path = await uploadFile(file)
      await onAddImage(project.id, path)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const img = project.images?.[0]

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex gap-4 items-start">
      <div className="w-24 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0">
        {img
          ? <img src={img.image_path} alt="" className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No image</div>
        }
      </div>

      <div className="flex-1 space-y-2">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={handleNameBlur}
          placeholder="Project name"
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <div className="flex gap-2">
          {!img && (
            <>
              <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              <button
                onClick={() => inputRef.current.click()}
                disabled={uploading}
                className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                {uploading ? 'Uploading…' : 'Add image'}
              </button>
            </>
          )}
          {img && (
            <button onClick={() => onDeleteImage(img.id)} className="text-xs text-red-400 hover:text-red-600">
              Remove image
            </button>
          )}
          <button onClick={onDelete} className="text-xs text-red-400 hover:text-red-600 ml-auto">
            Delete project
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsVariant5Form({ props, onChange }) {
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
      <p className="text-xs text-gray-400">Each project shows a full-height image on one side, name + number on the other. Sides alternate.</p>
      {projects.map(p => (
        <ProjectCard
          key={p.id}
          project={p}
          onUpdate={updateProject}
          onDelete={() => deleteProject(p.id)}
          onAddImage={addImage}
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
