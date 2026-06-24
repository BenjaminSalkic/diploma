import { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function AdminPage() {
  const [config, setConfig] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/api/page-config')
      .then(setConfig)
      .catch(err => console.error("Error loading config:", err));
  }, []);

  const handleToggleSection = (id) => {
    if (!config) return;
    const newSections = config.sections.map(s => {
      if (s.id === id) {
        return { ...s, active: s.active === false ? true : false };
      }
      return s;
    });
    setConfig({ ...config, sections: newSections });
  };

  const handleVariantChange = (id, variant) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === id ? { ...s, variant: parseInt(variant, 10) } : s)
    }));
  };

  const handleGlobalChange = (category, field, value) => {
    setConfig(prev => ({
      ...prev,
      global: {
        ...prev.global,
        [category]: {
          ...(prev.global?.[category] || {}),
          [field]: value
        }
      }
    }));
  };

  const handlePropChange = (id, field, value) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(s => 
        s.id === id ? { ...s, props: { ...s.props, [field]: value } } : s
      )
    }));
  };

  const handleImageChange = (id, idx, value) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(s => {
        if (s.id !== id) return s;
        const images = [...(s.props.images || [])];
        images[idx] = value;
        return { ...s, props: { ...s.props, images } };
      })
    }));
  };

  const addImage = (id) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(s => {
        if (s.id !== id) return s;
        const images = [...(s.props.images || []), ""];
        return { ...s, props: { ...s.props, images } };
      })
    }));
  };

  const handleFileUpload = async (id, idx, file, isProject = false, projectIdx = null) => {
    if (!file) return;
    try {
      const res = await api.upload('/api/uploads', file);
      if (isProject) {
        handleProjectFieldChange(id, projectIdx, 'image', res.path);
      } else {
        handleImageChange(id, idx, res.path);
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  const handleProjectFieldChange = (sectionId, projectIdx, field, value) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(s => {
        if (s.id !== sectionId) return s;
        const projects = [...(s.props.projects || [])];
        projects[projectIdx] = { ...projects[projectIdx], [field]: value };
        return { ...s, props: { ...s.props, projects } };
      })
    }));
  };

  const handleProjectMultiImageUpload = async (sectionId, projectIdx, file) => {
    if (!file) return;
    try {
      const res = await api.upload('/api/uploads', file);
      setConfig(prev => ({
        ...prev,
        sections: prev.sections.map(s => {
          if (s.id !== sectionId) return s;
          const projects = [...(s.props.projects || [])];
          const images = [...(projects[projectIdx].images || [])];
          images.push(res.path);
          projects[projectIdx] = { ...projects[projectIdx], images };
          return { ...s, props: { ...s.props, projects } };
        })
      }));
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  const removeProjectMultiImage = (sectionId, projectIdx, imgIdx) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(s => {
        if (s.id !== sectionId) return s;
        const projects = [...(s.props.projects || [])];
        const images = [...(projects[projectIdx].images || [])];
        images.splice(imgIdx, 1);
        projects[projectIdx] = { ...projects[projectIdx], images };
        return { ...s, props: { ...s.props, projects } };
      })
    }));
  };

  const addProject = (sectionId) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(s => {
        if (s.id !== sectionId) return s;
        const projects = [...(s.props.projects || []), { name: '', type: '', image: '' }];
        return { ...s, props: { ...s.props, projects } };
      })
    }));
  };

  const removeProject = (sectionId, projectIdx) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(s => {
        if (s.id !== sectionId) return s;
        const projects = [...(s.props.projects || [])];
        projects.splice(projectIdx, 1);
        return { ...s, props: { ...s.props, projects } };
      })
    }));
  };

  const addSection = (sectionId) => {
    if (config.sections.find(s => s.id === sectionId)) return;
    setConfig(prev => ({
      ...prev,
      sections: [...prev.sections, { id: sectionId, variant: 1, active: true, props: {} }]
    }));
  };

  const removeImage = (id, idx) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(s => {
        if (s.id !== id) return s;
        const images = [...(s.props.images || [])];
        images.splice(idx, 1);
        return { ...s, props: { ...s.props, images } };
      })
    }));
  };

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);
    try {
      await api.put('/api/page-config', config);
      alert('Saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving');
    }
    setSaving(false);
  };

  if (!config) return <div className="p-8 text-center text-gray-500">Loading admin...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 mb-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Global Settings</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Background Color</label>
            <input 
              type="color" 
              value={config.global?.theme?.backgroundColor || "#ffffff"} 
              onChange={(e) => handleGlobalChange('theme', 'backgroundColor', e.target.value)}
              className="w-full h-10 px-1 py-1 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Text Color</label>
            <input 
              type="color" 
              value={config.global?.theme?.textColor || "#000000"} 
              onChange={(e) => handleGlobalChange('theme', 'textColor', e.target.value)}
              className="w-full h-10 px-1 py-1 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Primary Color</label>
            <input 
              type="color" 
              value={config.global?.theme?.primaryColor || "#3b82f6"} 
              onChange={(e) => handleGlobalChange('theme', 'primaryColor', e.target.value)}
              className="w-full h-10 px-1 py-1 border rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Body Font</label>
            <select 
              value={config.global?.font?.body || "Roboto"}
              onChange={(e) => handleGlobalChange('font', 'body', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="Roboto">Roboto</option>
              <option value="Inter">Inter</option>
              <option value="sans-serif">System Sans</option>
              <option value="serif">System Serif</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Heading Font</label>
            <select 
              value={config.global?.font?.heading || "Inter"}
              onChange={(e) => handleGlobalChange('font', 'heading', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="sans-serif">System Sans</option>
              <option value="serif">System Serif</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Manage Sections</h2>
          <div className="flex gap-2">
            {!config.sections.find(s => s.id === 'hero') && (
              <button onClick={() => addSection('hero')} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">+ Add Hero</button>
            )}
            {!config.sections.find(s => s.id === 'projects') && (
              <button onClick={() => addSection('projects')} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">+ Add Projects</button>
            )}
            {!config.sections.find(s => s.id === 'skills') && (
              <button onClick={() => addSection('skills')} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">+ Add Skills</button>
            )}
            {!config.sections.find(s => s.id === 'about') && (
              <button onClick={() => addSection('about')} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">+ Add About</button>
            )}
            {!config.sections.find(s => s.id === 'contact') && (
              <button onClick={() => addSection('contact')} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">+ Add Contact</button>
            )}
          </div>
        </div>
        <div className="space-y-6">
          {config.sections.map((section) => (
            <div key={section.id} className="p-4 border rounded-md">
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <div>
                  <p className="text-lg font-medium capitalize">{section.id} Section</p>
                  <label className="text-sm text-gray-500 mr-2">Variant:</label>
                  <select 
                    value={section.variant}
                    onChange={(e) => handleVariantChange(section.id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm bg-gray-50"
                  >
                    <option value={1}>Variant 1</option>
                    <option value={2}>Variant 2</option>
                    <option value={3}>Variant 3</option>
                    <option value={4}>Variant 4</option>
                    <option value={5}>Variant 5</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center cursor-pointer">
                    <span className="mr-3 text-sm text-gray-700">
                      {section.active !== false ? 'Visible' : 'Hidden'}
                    </span>
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={section.active !== false}
                      onChange={() => handleToggleSection(section.id)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 relative"></div>
                  </label>
                </div>
              </div>

              {/* Specific Section Content Editing */}
              {section.id === 'hero' && section.variant === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Headline Text</label>
                    <input 
                      type="text" 
                      value={section.props?.headline || ''} 
                      onChange={(e) => handlePropChange(section.id, 'headline', e.target.value)}
                      placeholder="e.g. Creative agency building powerful digital solutions."
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Images</label>
                    {(section.props?.images || []).map((img, idx) => (
                      <div key={idx} className="flex items-center mb-2 gap-2">
                        {img ? (
                          <>
                            <img src={img} alt="preview" className="w-10 h-10 object-cover rounded" />
                            <input 
                              type="text" 
                              value={img} 
                              onChange={(e) => handleImageChange(section.id, idx, e.target.value)}
                              className="flex-1 px-3 py-1 border rounded text-sm"
                            />
                          </>
                        ) : (
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleFileUpload(section.id, idx, e.target.files[0])}
                            className="flex-1 px-3 py-1 border rounded text-sm"
                          />
                        )}
                        <button 
                          onClick={() => removeImage(section.id, idx)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => addImage(section.id)}
                      className="text-sm bg-gray-100 px-3 py-1 rounded border hover:bg-gray-200"
                    >
                      + Add Image Slot
                    </button>
                  </div>
                </div>
              )}

              {section.id === 'hero' && section.variant === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input 
                      type="text" 
                      value={section.props?.name || ''} 
                      onChange={(e) => handlePropChange(section.id, 'name', e.target.value)}
                      placeholder="e.g. Steven Mengin"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Position</label>
                    <input 
                      type="text" 
                      value={section.props?.position || ''} 
                      onChange={(e) => handlePropChange(section.id, 'position', e.target.value)}
                      placeholder="e.g. Creative Director"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea 
                      value={section.props?.description || ''} 
                      onChange={(e) => handlePropChange(section.id, 'description', e.target.value)}
                      placeholder="e.g. Clients include Google, adidas..."
                      className="w-full px-3 py-2 border rounded"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {section.id === 'hero' && section.variant === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Massive Name</label>
                    <input 
                      type="text" 
                      value={section.props?.name || ''} 
                      onChange={(e) => handlePropChange(section.id, 'name', e.target.value)}
                      placeholder="e.g. ROBERT BORG"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Bottom Left Description</label>
                    <textarea 
                      value={section.props?.description || ''} 
                      onChange={(e) => handlePropChange(section.id, 'description', e.target.value)}
                      placeholder="e.g. I'm Robert Borghesi an economist turned..."
                      className="w-full px-3 py-2 border rounded"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {section.id === 'hero' && section.variant === 4 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Top Name</label>
                    <input 
                      type="text" 
                      value={section.props?.name || ''} 
                      onChange={(e) => handlePropChange(section.id, 'name', e.target.value)}
                      placeholder="e.g. AIRBORNE"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Center Quote</label>
                    <textarea 
                      value={section.props?.quote || ''} 
                      onChange={(e) => handlePropChange(section.id, 'quote', e.target.value)}
                      placeholder="e.g. LEAD THE CHANGE..."
                      className="w-full px-3 py-2 border rounded"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Bottom Left Description</label>
                    <textarea 
                      value={section.props?.description || ''} 
                      onChange={(e) => handlePropChange(section.id, 'description', e.target.value)}
                      placeholder="e.g. BRAND, CREATIVE AND..."
                      className="w-full px-3 py-2 border rounded"
                      rows={3}
                    />
                  </div>
                </div>
              )}
              
              {/* Other sections would have their editable fields here later */}
              
              {section.id === 'projects' && section.variant === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Section Title</label>
                    <input 
                      type="text" 
                      value={section.props?.title || ''} 
                      onChange={(e) => handlePropChange(section.id, 'title', e.target.value)}
                      placeholder="e.g. Selected projects"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Projects</label>
                    {(section.props?.projects || []).map((project, pIdx) => (
                      <div key={pIdx} className="p-4 border rounded bg-gray-50 mb-4 space-y-3 relative">
                        <button 
                          onClick={() => removeProject(section.id, pIdx)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium mb-1">Project Name</label>
                            <input 
                              type="text" 
                              value={project.name || ''} 
                              onChange={(e) => handleProjectFieldChange(section.id, pIdx, 'name', e.target.value)}
                              placeholder="e.g. Mémorial de Verdun"
                              className="w-full px-2 py-1 border rounded text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1">Type / Category</label>
                            <input 
                              type="text" 
                              value={project.type || ''} 
                              onChange={(e) => handleProjectFieldChange(section.id, pIdx, 'type', e.target.value)}
                              placeholder="e.g. Website"
                              className="w-full px-2 py-1 border rounded text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium mb-1">Project Image</label>
                          <div className="flex items-center gap-2">
                            {project.image ? (
                              <>
                                <img src={project.image} alt="preview" className="w-10 h-10 object-cover rounded" />
                                <input 
                                  type="text" 
                                  value={project.image} 
                                  onChange={(e) => handleProjectFieldChange(section.id, pIdx, 'image', e.target.value)}
                                  className="flex-1 px-2 py-1 border rounded text-sm"
                                />
                              </>
                            ) : (
                              <input 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => handleFileUpload(section.id, null, e.target.files[0], true, pIdx)}
                                className="flex-1 px-2 py-1 border rounded text-sm bg-white"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <button 
                      onClick={() => addProject(section.id)}
                      className="text-sm bg-blue-50 text-blue-600 px-3 py-2 rounded border border-blue-200 hover:bg-blue-100 w-full"
                    >
                      + Add New Project
                    </button>
                  </div>
                </div>
              )}

              {section.id === 'projects' && section.variant === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Projects (Scattered Images)</label>
                    {(section.props?.projects || []).map((project, pIdx) => (
                      <div key={pIdx} className="p-4 border rounded bg-gray-50 mb-4 space-y-3 relative">
                        <button 
                          onClick={() => removeProject(section.id, pIdx)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                        
                        <div>
                          <label className="block text-xs font-medium mb-1">Project Name (Shows in pill)</label>
                          <input 
                            type="text" 
                            value={project.name || ''} 
                            onChange={(e) => handleProjectFieldChange(section.id, pIdx, 'name', e.target.value)}
                            placeholder="e.g. ARX RESEARCH"
                            className="w-full px-2 py-1 border rounded text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium mb-1">Multiple Images</label>
                          <div className="space-y-2 mb-2">
                            {(project.images || []).map((imgUrl, imgIdx) => (
                              <div key={imgIdx} className="flex items-center gap-2">
                                <img src={imgUrl} alt="preview" className="w-10 h-10 object-cover rounded" />
                                <input 
                                  type="text" 
                                  value={imgUrl} 
                                  readOnly
                                  className="flex-1 px-2 py-1 border rounded text-sm bg-gray-100"
                                />
                                <button 
                                  onClick={() => removeProjectMultiImage(section.id, pIdx, imgIdx)}
                                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                                >
                                  X
                                </button>
                              </div>
                            ))}
                          </div>
                          
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleProjectMultiImageUpload(section.id, pIdx, e.target.files[0])}
                            className="w-full px-2 py-1 border rounded text-sm bg-white"
                          />
                        </div>
                      </div>
                    ))}
                    <button 
                      onClick={() => addProject(section.id)}
                      className="text-sm bg-blue-50 text-blue-600 px-3 py-2 rounded border border-blue-200 hover:bg-blue-100 w-full"
                    >
                      + Add New Project
                    </button>
                  </div>
                </div>
              )}

              {section.id === 'projects' && section.variant === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Project Images (Cinematic Lens Scroll)</label>
                    <p className="text-xs text-gray-500 mb-4">Scrolling down the page will cycle these images using a 3D perspective warp transition.</p>
                    {(section.props?.images || []).map((img, idx) => (
                      <div key={idx} className="flex items-center mb-2 gap-2">
                        {img ? (
                          <>
                            <img src={img} alt="preview" className="w-10 h-10 object-cover rounded" />
                            <input 
                              type="text" 
                              value={img} 
                              onChange={(e) => handleImageChange(section.id, idx, e.target.value)}
                              className="flex-1 px-3 py-1 border rounded text-sm"
                            />
                          </>
                        ) : (
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleFileUpload(section.id, idx, e.target.files[0])}
                            className="flex-1 px-3 py-1 border rounded text-sm bg-white"
                          />
                        )}
                        <button 
                          onClick={() => removeImage(section.id, idx)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => addImage(section.id)}
                      className="text-sm bg-blue-50 text-blue-600 px-3 py-2 rounded border hover:bg-blue-100 w-full"
                    >
                      + Add Image Slide
                    </button>
                  </div>
                </div>
              )}

              {section.id === 'projects' && section.variant === 4 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Section Title</label>
                    <input 
                      type="text" 
                      value={section.props?.title || ''} 
                      onChange={(e) => handlePropChange(section.id, 'title', e.target.value)}
                      placeholder="e.g. Works,"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Index Display (e.g. 02, 03)</label>
                    <input 
                      type="text" 
                      value={section.props?.index || ''} 
                      onChange={(e) => handlePropChange(section.id, 'index', e.target.value)}
                      placeholder="e.g. 02"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Projects (Scattered around list)</label>
                    {(section.props?.projects || []).map((project, pIdx) => (
                      <div key={pIdx} className="p-4 border rounded bg-gray-50 mb-4 space-y-3 relative">
                        <button 
                          onClick={() => removeProject(section.id, pIdx)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                        
                        <div>
                          <label className="block text-xs font-medium mb-1">Project Name</label>
                          <input 
                            type="text" 
                            value={project.name || ''} 
                            onChange={(e) => handleProjectFieldChange(section.id, pIdx, 'name', e.target.value)}
                            placeholder="e.g. THUNDERSTORM"
                            className="w-full px-2 py-1 border rounded text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium mb-1">Multiple Images</label>
                          <div className="space-y-2 mb-2">
                            {(project.images || []).map((imgUrl, imgIdx) => (
                              <div key={imgIdx} className="flex items-center gap-2">
                                <img src={imgUrl} alt="preview" className="w-10 h-10 object-cover rounded" />
                                <input 
                                  type="text" 
                                  value={imgUrl} 
                                  onChange={(e) => handleProjectImageChange(section.id, pIdx, imgIdx, e.target.value)}
                                  className="flex-1 px-2 py-1 border rounded text-sm"
                                />
                                <button 
                                  onClick={() => removeProjectImage(section.id, pIdx, imgIdx)}
                                  className="text-red-500 text-xs px-2"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex gap-2">
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={(e) => handleProjectFileUpload(section.id, pIdx, e.target.files[0])}
                              className="text-sm flex-1"
                            />
                            <button 
                              onClick={() => addProjectImage(section.id, pIdx)}
                              className="bg-gray-200 px-2 py-1 rounded text-sm hover:bg-gray-300"
                            >
                              Add Image URL
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button 
                      onClick={() => addProject(section.id)}
                      className="text-sm bg-blue-50 text-blue-600 px-3 py-2 rounded border border-blue-200 hover:bg-blue-100 w-full"
                    >
                      + Add New Project
                    </button>
                  </div>
                </div>
              )}

              {section.id === 'projects' && section.variant === 5 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Projects (Alternating Checkerboard)</label>
                    {(section.props?.projects || []).map((project, pIdx) => (
                      <div key={pIdx} className="p-4 border rounded bg-gray-50 mb-4 space-y-3 relative">
                        <button 
                          onClick={() => removeProject(section.id, pIdx)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                        
                        <div>
                          <label className="block text-xs font-medium mb-1">Project Name</label>
                          <input 
                            type="text" 
                            value={project.name || ''} 
                            onChange={(e) => handleProjectFieldChange(section.id, pIdx, 'name', e.target.value)}
                            placeholder="e.g. ANGUS EMMERSON"
                            className="w-full px-2 py-1 border rounded text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium mb-1">Main Image</label>
                          <div className="flex gap-2">
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={(e) => handleProjectFileUpload(section.id, pIdx, e.target.files[0])}
                              className="text-sm flex-1"
                            />
                            {project.images && project.images[0] && (
                              <img src={project.images[0]} alt="preview" className="w-10 h-10 object-cover rounded" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <button 
                      onClick={() => addProject(section.id)}
                      className="text-sm bg-blue-50 text-blue-600 px-3 py-2 rounded border border-blue-200 hover:bg-blue-100 w-full"
                    >
                      + Add New Project
                    </button>
                  </div>
                </div>
              )}

              {section.id === 'skills' && section.variant === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Background Image</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          const formData = new FormData();
                          formData.append('file', file);
                          try {
                            const res = await api.post('/api/uploads', formData, {
                              headers: { 'Content-Type': 'multipart/form-data' }
                            });
                            handlePropChange(section.id, 'backgroundImage', res.path);
                          } catch (err) {
                            console.error('Failed to upload', err);
                          }
                        }}
                        className="text-sm flex-1"
                      />
                      {section.props?.backgroundImage && (
                        <div className="flex items-center gap-2">
                          <img src={section.props.backgroundImage} className="w-10 h-10 object-cover rounded" />
                          <button 
                            onClick={() => handlePropChange(section.id, 'backgroundImage', '')}
                            className="text-xs text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Large Text (Row 1)</label>
                    <input 
                      type="text" 
                      value={section.props?.largeText1 || ''} 
                      onChange={(e) => handlePropChange(section.id, 'largeText1', e.target.value)}
                      placeholder="e.g. LET'S"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Large Text (Row 2)</label>
                    <input 
                      type="text" 
                      value={section.props?.largeText2 || ''} 
                      onChange={(e) => handlePropChange(section.id, 'largeText2', e.target.value)}
                      placeholder="e.g. CONNECT"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Subtitle</label>
                    <input 
                      type="text" 
                      value={section.props?.subtitle || ''} 
                      onChange={(e) => handlePropChange(section.id, 'subtitle', e.target.value)}
                      placeholder="e.g. I'M ALWAYS INTERESTED ABOUT"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Skills (Pills)</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(section.props?.skills || []).map((skill, sIdx) => (
                        <div key={sIdx} className="flex items-center bg-gray-100 border rounded-full px-3 py-1">
                          <input 
                            type="text"
                            value={skill}
                            onChange={(e) => {
                              const newSkills = [...(section.props?.skills || [])];
                              newSkills[sIdx] = e.target.value;
                              handlePropChange(section.id, 'skills', newSkills);
                            }}
                            className="bg-transparent text-sm w-24 focus:outline-none"
                          />
                          <button 
                            onClick={() => {
                              const newSkills = [...(section.props?.skills || [])];
                              newSkills.splice(sIdx, 1);
                              handlePropChange(section.id, 'skills', newSkills);
                            }}
                            className="ml-2 text-gray-500 hover:text-red-500 text-xs"
                          >×</button>
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => {
                        const newSkills = [...(section.props?.skills || []), "New Skill"];
                        handlePropChange(section.id, 'skills', newSkills);
                      }}
                      className="text-xs bg-gray-50 border px-2 py-1 rounded hover:bg-gray-100"
                    >
                      + Add Skill
                    </button>
                  </div>
                </div>
              )}

              {section.id === 'skills' && section.variant === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Small Top Text</label>
                    <input 
                      type="text" 
                      value={section.props?.smallText || ''} 
                      onChange={(e) => handlePropChange(section.id, 'smallText', e.target.value)}
                      placeholder="e.g. (ACTUALLY OPEN TO)"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Large Text (Use enters for multiple lines)</label>
                    <textarea 
                      value={section.props?.largeText || ''} 
                      onChange={(e) => handlePropChange(section.id, 'largeText', e.target.value)}
                      placeholder="e.g. PROFESSIONAL OPPORTUNITIES&#10;FREELANCE PROJECTS"
                      className="w-full px-3 py-2 border rounded"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Stack Label</label>
                    <input 
                      type="text" 
                      value={section.props?.stackLabel || ''} 
                      onChange={(e) => handlePropChange(section.id, 'stackLabel', e.target.value)}
                      placeholder="e.g. STACK"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Skills List</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(section.props?.skills || []).map((skill, sIdx) => (
                        <div key={sIdx} className="flex items-center bg-gray-100 border rounded-full px-3 py-1">
                          <input 
                            type="text"
                            value={skill}
                            onChange={(e) => {
                              const newSkills = [...(section.props?.skills || [])];
                              newSkills[sIdx] = e.target.value;
                              handlePropChange(section.id, 'skills', newSkills);
                            }}
                            className="bg-transparent text-sm w-24 focus:outline-none"
                          />
                          <button 
                            onClick={() => {
                              const newSkills = [...(section.props?.skills || [])];
                              newSkills.splice(sIdx, 1);
                              handlePropChange(section.id, 'skills', newSkills);
                            }}
                            className="ml-2 text-gray-500 hover:text-red-500 text-xs"
                          >×</button>
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => {
                        const newSkills = [...(section.props?.skills || []), "NEW SKILL"];
                        handlePropChange(section.id, 'skills', newSkills);
                      }}
                      className="text-xs bg-gray-50 border px-2 py-1 rounded hover:bg-gray-100"
                    >
                      + Add Skill
                    </button>
                  </div>
                </div>
              )}

              {section.id === 'about' && section.variant === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input 
                      type="text" 
                      value={section.props?.title || ''} 
                      onChange={(e) => handlePropChange(section.id, 'title', e.target.value)}
                      placeholder="e.g. HELLO. I AM DAVID"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Subtitle</label>
                    <input 
                      type="text" 
                      value={section.props?.subtitle || ''} 
                      onChange={(e) => handlePropChange(section.id, 'subtitle', e.target.value)}
                      placeholder="e.g. Patrick David"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea 
                      value={section.props?.description || ''} 
                      onChange={(e) => handlePropChange(section.id, 'description', e.target.value)}
                      placeholder="e.g. I USE MY PASSION AND SKILLS..."
                      className="w-full px-3 py-2 border rounded"
                      rows={5}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Image</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          const formData = new FormData();
                          formData.append('file', file);
                          try {
                            const res = await api.post('/api/uploads', formData, {
                              headers: { 'Content-Type': 'multipart/form-data' }
                            });
                            handlePropChange(section.id, 'image', res.path);
                          } catch (err) {
                            console.error('Failed to upload', err);
                          }
                        }}
                        className="text-sm flex-1"
                      />
                      {section.props?.image && (
                        <div className="flex items-center gap-2">
                          <img src={section.props.image} className="w-10 h-10 object-contain rounded bg-black" />
                          <button 
                            onClick={() => handlePropChange(section.id, 'image', '')}
                            className="text-xs text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {section.id === 'about' && section.variant === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Main Description (Left Side)</label>
                    <textarea 
                      value={section.props?.description || ''} 
                      onChange={(e) => handlePropChange(section.id, 'description', e.target.value)}
                      placeholder="e.g. Built on principle and driven by passion..."
                      className="w-full px-3 py-2 border rounded"
                      rows={6}
                    />
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-sm font-bold mb-3">Right Side Fields</h4>
                    <p className="text-xs text-gray-500 mb-4">Add headers, descriptive text, and multi-line lists.</p>
                    
                    <div className="space-y-4">
                      {(section.props?.fields || []).map((field, idx) => (
                        <div key={idx} className="p-4 border rounded relative bg-gray-50">
                          <button 
                            onClick={() => {
                              const newFields = [...(section.props?.fields || [])];
                              newFields.splice(idx, 1);
                              handlePropChange(section.id, 'fields', newFields);
                            }}
                            className="absolute top-2 right-2 text-red-500 text-xs hover:underline"
                          >
                            Remove
                          </button>

                          <div className="mb-3">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Header Title</label>
                            <input 
                              type="text" 
                              value={field.title || ''} 
                              onChange={(e) => {
                                const newFields = [...(section.props?.fields || [])];
                                newFields[idx] = { ...field, title: e.target.value };
                                handlePropChange(section.id, 'fields', newFields);
                              }}
                              placeholder="e.g. INPUT / OUTPUT"
                              className="w-full px-2 py-1 text-sm border rounded"
                            />
                          </div>

                          <div className="mb-3">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Descriptive Text (Optional)</label>
                            <textarea 
                              value={field.text || ''} 
                              onChange={(e) => {
                                const newFields = [...(section.props?.fields || [])];
                                newFields[idx] = { ...field, text: e.target.value };
                                handlePropChange(section.id, 'fields', newFields);
                              }}
                              placeholder="Any introductory paragraph before the list..."
                              className="w-full px-2 py-1 text-sm border rounded"
                              rows={2}
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">List Items (One per line)</label>
                            <textarea 
                              value={field.list || ''} 
                              onChange={(e) => {
                                const newFields = [...(section.props?.fields || [])];
                                newFields[idx] = { ...field, list: e.target.value };
                                handlePropChange(section.id, 'fields', newFields);
                              }}
                              placeholder="ITEM 1&#10;ITEM 2&#10;ITEM 3"
                              className="w-full px-2 py-1 text-sm border rounded font-mono"
                              rows={4}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => {
                        const newFields = [...(section.props?.fields || []), { title: '', text: '', list: '' }];
                        handlePropChange(section.id, 'fields', newFields);
                      }}
                      className="mt-4 text-sm bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
                    >
                      + Add Field
                    </button>
                  </div>
                </div>
              )}

              {section.id === 'about' && section.variant === 3 && (
                <div className="space-y-6">
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Right Side Title</label>
                    <input 
                      type="text" 
                      value={section.props?.rightTitle || ''} 
                      onChange={(e) => handlePropChange(section.id, 'rightTitle', e.target.value)}
                      placeholder="e.g. About ⤵"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Right Side Description</label>
                    <p className="text-xs text-gray-500 mb-2">Use double blank lines (enter twice) to separate paragraphs visually.</p>
                    <textarea 
                      value={section.props?.description || ''} 
                      onChange={(e) => handlePropChange(section.id, 'description', e.target.value)}
                      placeholder="Hey there. I'm Robert..."
                      className="w-full px-3 py-2 border rounded"
                      rows={8}
                    />
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-sm font-bold mb-3">Left Side Fields (Lists)</h4>
                    <p className="text-xs text-gray-500 mb-4">Add headers and lists here. Use a space to separate a short prefix (e.g. "1x FWA SOTM" or "↗ Mike (thrax)").</p>
                    
                    <div className="space-y-4">
                      {(section.props?.fields || []).map((field, idx) => (
                        <div key={idx} className="p-4 border rounded relative bg-gray-50">
                          <button 
                            onClick={() => {
                              const newFields = [...(section.props?.fields || [])];
                              newFields.splice(idx, 1);
                              handlePropChange(section.id, 'fields', newFields);
                            }}
                            className="absolute top-2 right-2 text-red-500 text-xs hover:underline"
                          >
                            Remove
                          </button>

                          <div className="mb-3">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Header Title</label>
                            <input 
                              type="text" 
                              value={field.title || ''} 
                              onChange={(e) => {
                                const newFields = [...(section.props?.fields || [])];
                                newFields[idx] = { ...field, title: e.target.value };
                                handlePropChange(section.id, 'fields', newFields);
                              }}
                              placeholder="e.g. Achievements ⤵"
                              className="w-full px-2 py-1 text-sm border rounded"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">List Items (One per line)</label>
                            <textarea 
                              value={field.list || ''} 
                              onChange={(e) => {
                                const newFields = [...(section.props?.fields || [])];
                                newFields[idx] = { ...field, list: e.target.value };
                                handlePropChange(section.id, 'fields', newFields);
                              }}
                              placeholder="1x FWA SOTM&#10;8x AWWWARDS SOTD"
                              className="w-full px-2 py-1 text-sm border rounded font-mono"
                              rows={4}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => {
                        const newFields = [...(section.props?.fields || []), { title: '', list: '' }];
                        handlePropChange(section.id, 'fields', newFields);
                      }}
                      className="mt-4 text-sm bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
                    >
                      + Add Field
                    </button>
                  </div>
                </div>
              )}

              {section.id === 'about' && section.variant === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title Line 1</label>
                      <input 
                        type="text" 
                        value={section.props?.titleLine1 || ''} 
                        onChange={(e) => handlePropChange(section.id, 'titleLine1', e.target.value)}
                        placeholder="e.g. HELLO,"
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Title Line 2</label>
                      <input 
                        type="text" 
                        value={section.props?.titleLine2 || ''} 
                        onChange={(e) => handlePropChange(section.id, 'titleLine2', e.target.value)}
                        placeholder="e.g. I'M"
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Title Highlight (Primary Color)</label>
                    <input 
                      type="text" 
                      value={section.props?.titleHighlight || ''} 
                      onChange={(e) => handlePropChange(section.id, 'titleHighlight', e.target.value)}
                      placeholder="e.g. SANNI SAHIL"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Short Description</label>
                    <textarea 
                      value={section.props?.description || ''} 
                      onChange={(e) => handlePropChange(section.id, 'description', e.target.value)}
                      placeholder="A DEDICATED WEB DESIGNER..."
                      className="w-full px-3 py-2 border rounded"
                      rows={3}
                    />
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-sm font-bold mb-3">Animation Content</h4>
                    
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Ellipse Text (Left Canvas)</label>
                      <input 
                        type="text" 
                        value={section.props?.ellipseText || ''} 
                        onChange={(e) => handlePropChange(section.id, 'ellipseText', e.target.value)}
                        placeholder="e.g. CONTINUE THE JOURNEY / "
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div>
                         <label className="block text-sm font-medium mb-1">Waterfall Left (Down)</label>
                         <input 
                           type="text" 
                           value={section.props?.marquee1 || ''} 
                           onChange={(e) => handlePropChange(section.id, 'marquee1', e.target.value)}
                           placeholder="e.g. SANNISAHIL"
                           className="w-full px-3 py-2 border rounded font-mono text-xs"
                         />
                       </div>
                       <div>
                         <label className="block text-sm font-medium mb-1">Waterfall Right (Up)</label>
                         <input 
                           type="text" 
                           value={section.props?.marquee2 || ''} 
                           onChange={(e) => handlePropChange(section.id, 'marquee2', e.target.value)}
                           placeholder="e.g. PORTFOLIO"
                           className="w-full px-3 py-2 border rounded font-mono text-xs"
                         />
                       </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <label className="block text-sm font-medium mb-1">Footer Text</label>
                    <input 
                      type="text" 
                      value={section.props?.footerText || ''} 
                      onChange={(e) => handlePropChange(section.id, 'footerText', e.target.value)}
                      placeholder="e.g. LET'S DESIGN-DIVE!..."
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                </div>
              )}

              {section.id === 'about' && section.variant === 5 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Logo Text</label>
                      <input 
                        type="text" 
                        value={section.props?.logo || ''} 
                        onChange={(e) => handlePropChange(section.id, 'logo', e.target.value)}
                        placeholder="e.g. T—M"
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Breadcrumb</label>
                      <input 
                        type="text" 
                        value={section.props?.breadcrumb || ''} 
                        onChange={(e) => handlePropChange(section.id, 'breadcrumb', e.target.value)}
                        placeholder="e.g. INDEX / ABOUT"
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea 
                      value={section.props?.description || ''} 
                      onChange={(e) => handlePropChange(section.id, 'description', e.target.value)}
                      placeholder="Thomas Monavon is a freelance designer based in Lyon..."
                      className="w-full px-3 py-2 border rounded"
                      rows={4}
                    />
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-sm font-bold">Awards & Features</h4>
                      <button 
                        onClick={() => {
                          const awards = section.props?.awards || [];
                          handlePropChange(section.id, 'awards', [...awards, { project: '', giver: '', name: '', year: '' }]);
                        }}
                        className="text-white bg-green-600 px-3 py-1 rounded text-xs hover:bg-green-700"
                      >
                        + Add Row
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {(section.props?.awards || [{ project: 'Grégory Lallé', giver: 'Awwwards', name: 'Site of the Day', year: `24'` }]).map((award, i) => (
                        <div key={i} className="flex space-x-2">
                          <input 
                            type="text" 
                            placeholder="Project" 
                            value={award.project}
                            onChange={(e) => {
                              const newAwards = [...(section.props?.awards || [])];
                              newAwards[i] = { ...newAwards[i], project: e.target.value };
                              handlePropChange(section.id, 'awards', newAwards);
                            }}
                            className="w-1/4 px-2 py-1 border rounded text-sm"
                          />
                          <input 
                            type="text" 
                            placeholder="Giver" 
                            value={award.giver}
                            onChange={(e) => {
                              const newAwards = [...(section.props?.awards || [])];
                              newAwards[i] = { ...newAwards[i], giver: e.target.value };
                              handlePropChange(section.id, 'awards', newAwards);
                            }}
                            className="w-1/4 px-2 py-1 border rounded text-sm"
                          />
                          <input 
                            type="text" 
                            placeholder="Award Name" 
                            value={award.name}
                            onChange={(e) => {
                              const newAwards = [...(section.props?.awards || [])];
                              newAwards[i] = { ...newAwards[i], name: e.target.value };
                              handlePropChange(section.id, 'awards', newAwards);
                            }}
                            className="w-1/3 px-2 py-1 border rounded text-sm"
                          />
                          <input 
                            type="text" 
                            placeholder="Year" 
                            value={award.year}
                            onChange={(e) => {
                              const newAwards = [...(section.props?.awards || [])];
                              newAwards[i] = { ...newAwards[i], year: e.target.value };
                              handlePropChange(section.id, 'awards', newAwards);
                            }}
                            className="w-[10%] px-2 py-1 border rounded text-sm"
                          />
                          <button 
                            onClick={() => {
                              const newAwards = [...(section.props?.awards || [])];
                              newAwards.splice(i, 1);
                              handlePropChange(section.id, 'awards', newAwards);
                            }}
                            className="text-red-500 hover:text-red-700 px-2"
                          >
                            ✖
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                     <h4 className="text-sm font-bold mb-3">Footer Elements</h4>
                     <div className="grid grid-cols-2 gap-4 text-sm">
                       <div>
                         <label className="block text-gray-600 mb-1 leading-none text-xs uppercase font-medium">Dev By</label>
                         <input 
                           type="text" 
                           value={section.props?.footer?.devBy || ''}
                           onChange={(e) => handlePropChange(section.id, 'footer', { ...(section.props?.footer || {}), devBy: e.target.value })}
                           placeholder="DEV BY BENJAMIN ROBINET"
                           className="w-full px-2 py-1 border rounded"
                         />
                       </div>
                       <div>
                         <label className="block text-gray-600 mb-1 leading-none text-xs uppercase font-medium">Social 1</label>
                         <input 
                           type="text" 
                           value={section.props?.footer?.social1 || ''}
                           onChange={(e) => handlePropChange(section.id, 'footer', { ...(section.props?.footer || {}), social1: e.target.value })}
                           placeholder="TWITTER"
                           className="w-full px-2 py-1 border rounded"
                         />
                       </div>
                       <div>
                         <label className="block text-gray-600 mb-1 leading-none text-xs uppercase font-medium">Social 2</label>
                         <input 
                           type="text" 
                           value={section.props?.footer?.social2 || ''}
                           onChange={(e) => handlePropChange(section.id, 'footer', { ...(section.props?.footer || {}), social2: e.target.value })}
                           placeholder="INSTAGRAM"
                           className="w-full px-2 py-1 border rounded"
                         />
                       </div>
                       <div>
                         <label className="block text-gray-600 mb-1 leading-none text-xs uppercase font-medium">Close Text</label>
                         <input 
                           type="text" 
                           value={section.props?.footer?.close || ''}
                           onChange={(e) => handlePropChange(section.id, 'footer', { ...(section.props?.footer || {}), close: e.target.value })}
                           placeholder="CLOSE"
                           className="w-full px-2 py-1 border rounded"
                         />
                       </div>
                       <div>
                         <label className="block text-gray-600 mb-1 leading-none text-xs uppercase font-medium">Location</label>
                         <input 
                           type="text" 
                           value={section.props?.footer?.location || ''}
                           onChange={(e) => handlePropChange(section.id, 'footer', { ...(section.props?.footer || {}), location: e.target.value })}
                           placeholder="LYON, FR"
                           className="w-full px-2 py-1 border rounded"
                         />
                       </div>
                       <div>
                         <label className="block text-gray-600 mb-1 leading-none text-xs uppercase font-medium">Contact Text</label>
                         <input 
                           type="text" 
                           value={section.props?.footer?.contact || ''}
                           onChange={(e) => handlePropChange(section.id, 'footer', { ...(section.props?.footer || {}), contact: e.target.value })}
                           placeholder="CONTACT"
                           className="w-full px-2 py-1 border rounded"
                         />
                       </div>
                     </div>
                  </div>
                </div>
              )}

              {section.id === 'contact' && section.variant === 1 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-bold">Contact Links</h4>
                    <button 
                      onClick={() => {
                        const links = section.props?.links || [];
                        handlePropChange(section.id, 'links', [...links, { name: '', url: '' }]);
                      }}
                      className="text-white bg-green-600 px-3 py-1 rounded text-xs hover:bg-green-700"
                    >
                      + Add Link
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {(section.props?.links || [
                      { name: 'Email', url: '#' },
                      { name: 'LinkedIn', url: '#' },
                      { name: 'Behance', url: '#' },
                      { name: 'Instagram', url: '#' }
                    ]).map((link, i) => (
                      <div key={i} className="flex space-x-2">
                        <input 
                          type="text" 
                          placeholder="Link Name" 
                          value={link.name}
                          onChange={(e) => {
                            const newLinks = [...(section.props?.links || [])];
                            newLinks[i] = { ...newLinks[i], name: e.target.value };
                            handlePropChange(section.id, 'links', newLinks);
                          }}
                          className="w-1/2 px-2 py-1 border rounded text-sm"
                        />
                        <input 
                          type="text" 
                          placeholder="URL" 
                          value={link.url}
                          onChange={(e) => {
                            const newLinks = [...(section.props?.links || [])];
                            newLinks[i] = { ...newLinks[i], url: e.target.value };
                            handlePropChange(section.id, 'links', newLinks);
                          }}
                          className="w-1/2 px-2 py-1 border rounded text-sm"
                        />
                        <button 
                          onClick={() => {
                            const newLinks = [...(section.props?.links || [])];
                            newLinks.splice(i, 1);
                            handlePropChange(section.id, 'links', newLinks);
                          }}
                          className="text-red-500 hover:text-red-700 px-2"
                        >
                          ✖
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {section.id === 'contact' && section.variant === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title Text</label>
                    <input 
                      type="text" 
                      value={section.props?.title || ''} 
                      onChange={(e) => handlePropChange(section.id, 'title', e.target.value)}
                      placeholder="e.g. Let's work together"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Text</label>
                    <input 
                      type="text" 
                      value={section.props?.email || ''} 
                      onChange={(e) => handlePropChange(section.id, 'email', e.target.value)}
                      placeholder="hello@example.com"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Button Text</label>
                    <input 
                      type="text" 
                      value={section.props?.buttonText || ''} 
                      onChange={(e) => handlePropChange(section.id, 'buttonText', e.target.value)}
                      placeholder="COPY EMAIL TO CLIPBOARD"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Footer Name</label>
                      <input 
                        type="text" 
                        value={section.props?.footerName || ''} 
                        onChange={(e) => handlePropChange(section.id, 'footerName', e.target.value)}
                        placeholder="DEN.COOL"
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Footer Year</label>
                      <input 
                        type="text" 
                        value={section.props?.footerYear || ''} 
                        onChange={(e) => handlePropChange(section.id, 'footerYear', e.target.value)}
                        placeholder="© 2024"
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                  </div>
                </div>
              )}

              {section.id === 'contact' && section.variant === 3 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-bold">Contact Links</h4>
                    <button 
                      onClick={() => {
                        const links = section.props?.links || [];
                        handlePropChange(section.id, 'links', [...links, { name: '', url: '' }]);
                      }}
                      className="text-white bg-green-600 px-3 py-1 rounded text-xs hover:bg-green-700"
                    >
                      + Add Link
                    </button>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {(section.props?.links || [
                      { name: 'Linkedin', url: '#' },
                      { name: 'Github', url: '#' },
                      { name: 'Mail', url: '#' }
                    ]).map((link, i) => (
                      <div key={i} className="flex space-x-2">
                        <input 
                          type="text" 
                          placeholder="Link Name" 
                          value={link.name}
                          onChange={(e) => {
                            const newLinks = [...(section.props?.links || [])];
                            newLinks[i] = { ...newLinks[i], name: e.target.value };
                            handlePropChange(section.id, 'links', newLinks);
                          }}
                          className="w-1/2 px-2 py-1 border rounded text-sm"
                        />
                        <input 
                          type="text" 
                          placeholder="URL" 
                          value={link.url}
                          onChange={(e) => {
                            const newLinks = [...(section.props?.links || [])];
                            newLinks[i] = { ...newLinks[i], url: e.target.value };
                            handlePropChange(section.id, 'links', newLinks);
                          }}
                          className="w-1/2 px-2 py-1 border rounded text-sm"
                        />
                        <button 
                          onClick={() => {
                            const newLinks = [...(section.props?.links || [])];
                            newLinks.splice(i, 1);
                            handlePropChange(section.id, 'links', newLinks);
                          }}
                          className="text-red-500 hover:text-red-700 px-2"
                        >
                          ✖
                        </button>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Bottom Large Text</label>
                    <input 
                      type="text" 
                      value={section.props?.bottomText || ''} 
                      onChange={(e) => handlePropChange(section.id, 'bottomText', e.target.value)}
                      placeholder="e.g. LET'S TALK"
                      className="w-full px-3 py-2 border rounded font-mono text-sm"
                    />
                  </div>
                </div>
              )}

              {section.id === 'contact' && section.variant === 4 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Subtitle</label>
                    <input 
                      type="text" 
                      value={section.props?.subtitle || ''} 
                      onChange={(e) => handlePropChange(section.id, 'subtitle', e.target.value)}
                      placeholder="e.g. Get in touch ↴"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Description (HTML allowed)</label>
                    <textarea 
                      value={section.props?.description || ''} 
                      onChange={(e) => handlePropChange(section.id, 'description', e.target.value)}
                      placeholder="Here several ways you can slide into my DMs..."
                      className="w-full px-3 py-2 border rounded"
                      rows={4}
                    />
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-sm font-bold">Contact Links</h4>
                      <button 
                        onClick={() => {
                          const links = section.props?.links || [];
                          handlePropChange(section.id, 'links', [...links, { name: '', url: '' }]);
                        }}
                        className="text-white bg-green-600 px-3 py-1 rounded text-xs hover:bg-green-700"
                      >
                        + Add Link
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {(section.props?.links || [
                        { name: '(TWITTER)', url: '#' },
                        { name: '(MAIL)', url: '#' },
                        { name: '(LINKEDIN)', url: '#' }
                      ]).map((link, i) => (
                        <div key={i} className="flex space-x-2">
                          <input 
                            type="text" 
                            placeholder="Link Name" 
                            value={link.name}
                            onChange={(e) => {
                              const newLinks = [...(section.props?.links || [])];
                              newLinks[i] = { ...newLinks[i], name: e.target.value };
                              handlePropChange(section.id, 'links', newLinks);
                            }}
                            className="w-1/2 px-2 py-1 border rounded text-sm"
                          />
                          <input 
                            type="text" 
                            placeholder="URL" 
                            value={link.url}
                            onChange={(e) => {
                              const newLinks = [...(section.props?.links || [])];
                              newLinks[i] = { ...newLinks[i], url: e.target.value };
                              handlePropChange(section.id, 'links', newLinks);
                            }}
                            className="w-1/2 px-2 py-1 border rounded text-sm"
                          />
                          <button 
                            onClick={() => {
                              const newLinks = [...(section.props?.links || [])];
                              newLinks.splice(i, 1);
                              handlePropChange(section.id, 'links', newLinks);
                            }}
                            className="text-red-500 hover:text-red-700 px-2"
                          >
                            ✖
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {section.id === 'contact' && section.variant === 5 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea 
                      value={section.props?.description || ''} 
                      onChange={(e) => handlePropChange(section.id, 'description', e.target.value)}
                      placeholder="It's not client and supplier. It's equals; partners..."
                      className="w-full px-3 py-2 border rounded"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Big Text (e.g. AIRBORNE)</label>
                    <input 
                      type="text" 
                      value={section.props?.bigText || ''} 
                      onChange={(e) => handlePropChange(section.id, 'bigText', e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-sm font-bold">Lists Configuration</h4>
                      <button 
                        onClick={() => {
                          const lists = section.props?.lists || [];
                          handlePropChange(section.id, 'lists', [...lists, { title: 'NEW LIST', items: [] }]);
                        }}
                        className="text-white bg-green-600 px-3 py-1 rounded text-xs hover:bg-green-700"
                      >
                        + Add List
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {(section.props?.lists || [
                        {
                          title: "STUDIO",
                          items: [
                            { name: "About", url: "#" },
                            { name: "Work", url: "#" },
                            { name: "Journal", url: "#" },
                            { name: "Contact", url: "#" }
                          ]
                        },
                        {
                          title: "SOCIALS",
                          items: [
                            { name: "LinkedIn", url: "#" },
                            { name: "Dribbble", url: "#" },
                            { name: "Behance", url: "#" },
                            { name: "Instagram", url: "#" }
                          ]
                        },
                        {
                          title: "STUDIO",
                          items: [
                            { name: "Airborne Studio\nNeighbourhood\n...", isAddress: true },
                            { name: "hello@airborne.studio", url: "mailto:hello@airborne.studio" }
                          ]
                        }
                      ]).map((list, listIndex) => (
                        <div key={listIndex} className="p-3 border rounded bg-gray-50 mb-2 pt-1 pb-1">
                          <div className="flex flex-col bg-white p-2">
                          <div className="flex gap-2 items-center mb-2">
                            <input 
                              type="text" 
                              value={list.title}
                              onChange={(e) => {
                                const newLists = [...(section.props?.lists || [])];
                                newLists[listIndex] = { ...newLists[listIndex], title: e.target.value };
                                handlePropChange(section.id, 'lists', newLists);
                              }}
                              className="px-2 py-1 border rounded font-bold flex-1"
                              placeholder="List Title"
                            />
                            <button
                              onClick={() => {
                                const newLists = [...(section.props?.lists || [])];
                                newLists.splice(listIndex, 1);
                                handlePropChange(section.id, 'lists', newLists);
                              }}
                              className="text-red-500 hover:text-red-700 px-2"
                            >
                              ✖ Remove List
                            </button>
                          </div>
                          
                          <div className="pl-4 space-y-2 border-l-2">
                             {list.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex gap-2">
                                  <textarea 
                                    placeholder="Item text (can be multiline for addresses)" 
                                    value={item.name}
                                    onChange={(e) => {
                                      const newLists = [...(section.props?.lists || [])];
                                      const newItems = [...newLists[listIndex].items];
                                      newItems[itemIndex] = { ...newItems[itemIndex], name: e.target.value };
                                      newLists[listIndex].items = newItems;
                                      handlePropChange(section.id, 'lists', newLists);
                                    }}
                                    className="w-1/2 px-2 py-1 border rounded text-xs"
                                    rows={1}
                                  />
                                   <input 
                                    type="text"
                                    placeholder="URL (optional)" 
                                    value={item.url || ''}
                                    onChange={(e) => {
                                      const newLists = [...(section.props?.lists || [])];
                                      const newItems = [...newLists[listIndex].items];
                                      newItems[itemIndex] = { ...newItems[itemIndex], url: e.target.value };
                                      newLists[listIndex].items = newItems;
                                      handlePropChange(section.id, 'lists', newLists);
                                    }}
                                    disabled={item.isAddress}
                                    className="w-1/3 px-2 py-1 border rounded text-xs"
                                  />
                                  <div className="flex flex-col justify-center items-center w-12 text-[10px]">
                                    <label>Raw<br/>Text?</label>
                                    <input 
                                      type="checkbox"
                                      checked={item.isAddress || false}
                                      onChange={(e) => {
                                        const newLists = [...(section.props?.lists || [])];
                                        const newItems = [...newLists[listIndex].items];
                                        newItems[itemIndex] = { ...newItems[itemIndex], isAddress: e.target.checked };
                                        newLists[listIndex].items = newItems;
                                        handlePropChange(section.id, 'lists', newLists);
                                      }}
                                    />
                                  </div>
                                  <button 
                                    onClick={() => {
                                      const newLists = [...(section.props?.lists || [])];
                                      newLists[listIndex].items.splice(itemIndex, 1);
                                      handlePropChange(section.id, 'lists', newLists);
                                    }}
                                    className="text-red-400 hover:text-red-700 text-xs px-1"
                                  >
                                    ✖
                                  </button>
                                </div>
                             ))}
                             <button
                               onClick={() => {
                                  const newLists = [...(section.props?.lists || [])];
                                  if (!newLists[listIndex].items) newLists[listIndex].items = [];
                                  newLists[listIndex].items.push({ name: '', url: '' });
                                  handlePropChange(section.id, 'lists', newLists);
                               }}
                               className="text-xs bg-gray-200 px-2 py-1 rounded"
                             >
                               + Add Item to {list.title}
                             </button>
                          </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {section.id !== 'hero' && section.id !== 'projects' && section.id !== 'skills' && section.id !== 'about' && section.id !== 'contact' && (
                <p className="text-sm text-gray-500 italic">Editing features for "{section.id}" will be added as it is implemented.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
