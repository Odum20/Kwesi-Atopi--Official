import React, { useState, useEffect } from 'react';
import { X, Lock, Plus, Trash2, Pencil, ShieldCheck, Sparkles, Image, Link as LinkIcon, Tag, Eye, EyeOff } from 'lucide-react';
import { Project } from '../types';
import { resolveAssetUrl } from '../lib/resolveAsset';
import { ProjectImage } from './ProjectImage';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  experiments: Project[];
  onAddProject: (project: Omit<Project, 'id'>) => Promise<void>;
  onUpdateProject: (id: string, project: Omit<Project, 'id'>) => Promise<void>;
  onDeleteProject: (id: string) => Promise<void>;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  projects,
  experiments,
  onAddProject,
  onUpdateProject,
  onDeleteProject
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [selectedTag, setSelectedTag] = useState('SYSTEMS');
  const [isExperiment, setIsExperiment] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Project | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleStartEdit = (item: Project) => {
    setEditingProjectId(item.id);
    setTitle(item.title);
    setSubtitle(item.subtitle);
    setDescription(item.description);
    setImageUrl(item.image);
    setLiveUrl(item.liveUrl || '');
    setGithubUrl(item.githubUrl || '');
    setSelectedTag(item.tags[0] || 'SYSTEMS');
    setIsExperiment(!!item.isExperiment);
  };

  const handleCancelEdit = () => {
    setEditingProjectId(null);
    setTitle('');
    setSubtitle('');
    setDescription('');
    setImageUrl('');
    setLiveUrl('');
    setGithubUrl('');
    setSelectedTag('SYSTEMS');
    setIsExperiment(false);
  };

  const availableTags = ['SYSTEMS', 'FINTECH', 'GIS', 'Sat intel', 'AI', 'GAMING', 'AUDIO', 'PHYSICS', 'WEB3'];

  if (!isOpen) return null;

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = document.createElement('img');
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_DIM = 600;

          if (width > height) {
            if (width > MAX_DIM) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            }
          } else {
            if (height > MAX_DIM) {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
            setImageUrl(dataUrl);
          } else {
            if (typeof event.target?.result === 'string') {
              setImageUrl(event.target.result);
            }
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = (import.meta.env.VITE_ADMIN_PASSWORD || 'admin').trim();
    if (password.trim() === adminPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('⚠️ Incorrect credentials. Access denied.');
    }
  };

  const handleSubmitNewWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) {
      alert('Please fill in at least Title and Image URL');
      return;
    }

    setIsSubmitting(true);
    try {
      const projectData: any = {
        title,
        subtitle: subtitle || title,
        description: description || 'New work deployed via admin dashboard.',
        image: imageUrl,
        tags: [selectedTag],
        year: '2026',
        role: 'Lead Creator',
        technologies: ['TypeScript', 'React', 'Cloud'],
        problem: 'Engineering new workflow efficiencies and high-performance digital solutions.',
        process: 'Developed and deployed with zero-copy pipelines and real-time synchronization.',
        result: 'Successfully deployed and verified on cloud infrastructure.',
        screenshots: [imageUrl],
        isExperiment
      };

      if (liveUrl.trim()) {
        projectData.liveUrl = liveUrl.trim();
      }
      if (githubUrl.trim()) {
        projectData.githubUrl = githubUrl.trim();
      }

      if (editingProjectId) {
        await onUpdateProject(editingProjectId, projectData);
        setSuccessMessage('Successfully updated! Your changes are now live on the public view.');
      } else {
        await onAddProject(projectData);
        setSuccessMessage('Successfully published! Your work is now live on the public view.');
      }

      handleCancelEdit();
    } catch (err) {
      console.error(err);
      alert('Failed to save work.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#0c3016] border border-[#0c3016] text-neutral-200 shadow-sm">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-semibold text-neutral-100 text-base">Admin Dashboard & Cloud Publisher</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Password Screen */
          <div className="p-8 md:p-12 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center mx-auto mb-4 text-neutral-300">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-neutral-100 mb-2">Admin Authentication Required</h2>
            <p className="text-sm text-neutral-400 mb-6">Enter your administrator password to access the cloud publishing dashboard.</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter administrator password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-11 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-600 text-sm font-mono text-center"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-neutral-400 hover:text-neutral-100 transition-colors cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-neutral-400 hover:text-neutral-200" />
                  ) : (
                    <Eye className="w-4 h-4 text-neutral-400 hover:text-neutral-200" />
                  )}
                </button>
              </div>
              {error && (
                <div className="p-3 rounded-lg bg-red-950/80 border border-red-800 text-red-300 text-xs font-medium flex items-center justify-center gap-2 animate-shake">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-neutral-100 text-neutral-950 font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
              >
                Authenticate Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto space-y-6">
            
            {/* Success Notification Banner */}
            {successMessage && (
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#0c3016] border border-[#0c3016] text-white text-sm shadow-xl animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-900/60 border border-neutral-700/60 flex items-center justify-center text-neutral-100">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Published to Public View</div>
                    <div className="text-xs text-neutral-300">{successMessage}</div>
                  </div>
                </div>
                <button
                  onClick={() => setSuccessMessage(null)}
                  className="p-1.5 text-neutral-300 hover:text-white rounded-lg hover:bg-neutral-900/40 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Post New Work Form */}
            <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-neutral-100 flex items-center gap-2.5">
                  {editingProjectId ? (
                    <>
                      <div className="p-1 rounded-md bg-[#0c3016] text-neutral-200">
                        <Pencil className="w-3.5 h-3.5" />
                      </div>
                      <span>Editing Work: <span className="text-neutral-300 font-normal">{title}</span></span>
                    </>
                  ) : (
                    <>
                      <div className="p-1 rounded-md bg-[#0c3016] text-neutral-200">
                        <Plus className="w-3.5 h-3.5" />
                      </div>
                      <span>Post New Work to Cloud</span>
                    </>
                  )}
                </h3>
                {editingProjectId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-medium transition-colors cursor-pointer border border-neutral-700"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmitNewWork} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Project Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Neural Network Visualizer"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 text-sm focus:outline-none focus:border-neutral-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Subtitle / Tagline</label>
                    <input
                      type="text"
                      placeholder="e.g. Real-time GPU transformer inference"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 text-sm focus:outline-none focus:border-neutral-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Describe the architecture, problem solved, and impact..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 text-sm focus:outline-none focus:border-neutral-600 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Square Image Upload Dropzone */}
                  <div className="md:col-span-4 flex flex-col items-center">
                    <label className="w-full block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">Thumbnail Image (Square)</label>
                    <label className="relative group w-full aspect-square rounded-xl bg-neutral-900 border-2 border-dashed border-neutral-700 hover:border-neutral-500 transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden p-2">
                      {imageUrl ? (
                        <>
                          <div className="absolute inset-0">
                            <ProjectImage src={imageUrl} alt="Thumbnail preview" hoverZoom={false} />
                          </div>
                          <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-xs text-neutral-200 font-medium z-20 pointer-events-none">
                            <Image className="w-6 h-6 mb-1 text-neutral-200" />
                            <span>Click to change image</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-4">
                          <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center mx-auto mb-2 text-neutral-300 group-hover:text-white transition-colors">
                            <Image className="w-5 h-5 text-neutral-300" />
                          </div>
                          <span className="text-xs font-medium text-neutral-300 block mb-0.5">Click to upload</span>
                          <span className="text-[10px] text-neutral-500 block">PNG, JPG, WebP from device</span>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* URLs Column */}
                  <div className="md:col-span-8 space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Live Demo URL</label>
                      <input
                        type="url"
                        placeholder="https://yourproject.vercel.app"
                        value={liveUrl}
                        onChange={(e) => setLiveUrl(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 text-sm focus:outline-none focus:border-neutral-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">GitHub URL</label>
                      <input
                        type="url"
                        placeholder="https://github.com/Odum20/repo"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 text-sm focus:outline-none focus:border-neutral-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Or Paste Image URL (Optional)</label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={imageUrl.startsWith('data:') ? '' : imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 text-sm focus:outline-none focus:border-neutral-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1.5">Select Tag / Category</label>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setSelectedTag(tag)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${selectedTag === tag ? 'bg-neutral-100 text-neutral-950 font-semibold' : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-neutral-200'}`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isExperiment}
                        onChange={(e) => setIsExperiment(e.target.checked)}
                        className="rounded bg-neutral-900 border-neutral-700 text-neutral-100 focus:ring-0"
                      />
                      <span>Post as Experiment</span>
                    </label>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-xl bg-neutral-100 hover:opacity-90 text-neutral-950 font-medium text-sm transition-opacity cursor-pointer shadow-sm flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Saving...</span>
                      ) : editingProjectId ? (
                        <>
                          <Pencil className="w-4 h-4 text-neutral-950" />
                          <span>Update Work Live</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Post Work Live</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Manage Existing Works */}
            <div>
              <h3 className="text-base font-semibold text-neutral-100 mb-4">Manage Published Works ({projects.length + experiments.length})</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {[...projects, ...experiments].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div className="flex items-center gap-3">
                      <img src={resolveAssetUrl(item.image)} alt={item.title} className="w-10 h-10 rounded-lg object-cover bg-neutral-900" />
                      <div>
                        <div className="text-sm font-medium text-neutral-200">{item.title}</div>
                        <div className="text-xs text-neutral-400">{item.tags.join(', ')} {item.isExperiment && '• Experiment'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleStartEdit(item)}
                        className="p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900 rounded-lg transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setItemToDelete(item)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-neutral-900 rounded-lg transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Custom Delete Confirmation Modal Popup */}
        {itemToDelete && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-neutral-950/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in duration-200">
              <div className="w-12 h-12 rounded-full bg-red-950/80 border border-red-800 text-red-400 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-100">Are you sure you want to delete this work?</h3>
              <p className="text-sm text-neutral-400">
                "<span className="text-neutral-200 font-medium">{itemToDelete.title}</span>" will be permanently removed from the cloud database and front view.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setItemToDelete(null)}
                  className="flex-1 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-sm transition-colors cursor-pointer border border-neutral-700"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    await onDeleteProject(itemToDelete.id);
                    setItemToDelete(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium text-sm transition-colors cursor-pointer shadow-sm"
                >
                  Delete / OK
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
