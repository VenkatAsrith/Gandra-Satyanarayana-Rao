import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    category: 'irrigation',
    categoryLabel: 'Irrigation Modernization',
    mandal: 'Bhupalpalle',
    amountFormatted: '₹31 Crore',
    amountValueCrores: 31,
    status: 'tenders_initiated',
    statusNote: '',
    representativeAction: 'Announced sanction',
    mediaUrl: '/images/work/irrigation.jpg',
    sourceLabel: 'The Hans India',
    isFeatured: false,
    isPublished: true,
    internalNotes: ''
  });

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await api.adminGetProjects();
      setProjects(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      summary: '',
      category: 'irrigation',
      categoryLabel: 'Irrigation',
      mandal: 'Bhupalpalle',
      amountFormatted: '',
      amountValueCrores: null,
      status: 'tenders_initiated',
      statusNote: '',
      representativeAction: 'Documented Initiative',
      mediaUrl: '/images/work/irrigation.jpg',
      sourceLabel: 'Verified Regional Press',
      isFeatured: false,
      isPublished: true,
      internalNotes: ''
    });
    setModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingProject(p);
    setFormData({
      title: p.title || '',
      summary: p.summary || '',
      category: p.category || 'general',
      categoryLabel: p.categoryLabel || '',
      mandal: p.mandal || 'Bhupalpalle',
      amountFormatted: p.amountFormatted || '',
      amountValueCrores: p.amountValueCrores || '',
      status: p.status || 'sanctioned',
      statusNote: p.statusNote || '',
      representativeAction: p.representativeAction || '',
      mediaUrl: p.mediaUrl || '',
      sourceLabel: p.sourceLabel || '',
      isFeatured: Boolean(p.isFeatured),
      isPublished: Boolean(p.isPublished),
      internalNotes: p.internalNotes || ''
    });
    setModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      if (editingProject) {
        await api.adminUpdateProject(editingProject._id, formData);
        setSuccess(`Project "${formData.title}" updated successfully.`);
      } else {
        await api.adminCreateProject(formData);
        setSuccess(`Project "${formData.title}" created successfully.`);
      }
      setModalOpen(false);
      loadProjects();
    } catch (err) {
      setError(err.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (p) => {
    if (!window.confirm(`Are you sure you want to delete the record for "${p.title}"?`)) {
      return;
    }

    try {
      await api.adminDeleteProject(p._id);
      setSuccess(`Project "${p.title}" deleted.`);
      loadProjects();
    } catch (err) {
      setError(err.message || 'Failed to delete project');
    }
  };

  return (
    <div>
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h2 className="admin-card-title">Development Works & Projects</h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>
              Manage developmental sanctions, funding allocations, statuses, and verification citations
            </span>
          </div>
          <button onClick={openCreateModal} className="admin-btn admin-btn-primary">
            + New Project Record
          </button>
        </div>

        {success && <div className="admin-alert success">{success}</div>}
        {error && <div className="admin-alert error">{error}</div>}

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Loading project dossier...</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Mandal</th>
                  <th>Sanction Amount</th>
                  <th>Status</th>
                  <th>Published</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p._id}>
                    <td style={{ fontWeight: 600, maxWidth: '280px' }}>{p.title}</td>
                    <td>{p.categoryLabel || p.category}</td>
                    <td>{p.mandal}</td>
                    <td style={{ fontWeight: 700, color: 'var(--green-dark)' }}>
                      {p.amountFormatted || 'Government Sanction'}
                    </td>
                    <td>
                      <span className="admin-badge">{p.status.replace('_', ' ')}</span>
                    </td>
                    <td>
                      <span className={`admin-badge ${p.isPublished ? 'published' : 'draft'}`}>
                        {p.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          onClick={() => openEditModal(p)}
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          className="admin-btn admin-btn-danger admin-btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
                {editingProject ? 'Edit Project Record' : 'Create New Project Record'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">Project Title *</label>
                  <input
                    type="text"
                    required
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Summary Dossier *</label>
                  <textarea
                    required
                    rows="3"
                    name="summary"
                    value={formData.summary}
                    onChange={handleFormChange}
                    className="admin-form-textarea"
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleFormChange}
                      className="admin-form-select"
                    >
                      <option value="irrigation">Irrigation</option>
                      <option value="heritage">Heritage & Temples</option>
                      <option value="housing">Housing & Welfare</option>
                      <option value="transit">Transit & Roads</option>
                      <option value="energy">Energy & Power</option>
                      <option value="welfare">General Welfare</option>
                      <option value="general">General</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Category Badge Label</label>
                    <input
                      type="text"
                      name="categoryLabel"
                      value={formData.categoryLabel}
                      onChange={handleFormChange}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Mandal Location</label>
                    <input
                      type="text"
                      name="mandal"
                      value={formData.mandal}
                      onChange={handleFormChange}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Sanction Amount Display</label>
                    <input
                      type="text"
                      name="amountFormatted"
                      placeholder="e.g. ₹31 Crore"
                      value={formData.amountFormatted}
                      onChange={handleFormChange}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleFormChange}
                      className="admin-form-select"
                    >
                      <option value="sanctioned">Sanctioned</option>
                      <option value="tenders_initiated">Tenders Initiated</option>
                      <option value="work_in_progress">Work in Progress</option>
                      <option value="completed">Completed</option>
                      <option value="status_not_confirmed">Status Not Confirmed</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Representative Action</label>
                    <input
                      type="text"
                      name="representativeAction"
                      placeholder="e.g. Announced sanction, Laid foundation stone"
                      value={formData.representativeAction}
                      onChange={handleFormChange}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Status Details & Timeline</label>
                  <input
                    type="text"
                    name="statusNote"
                    placeholder="e.g. Tenders initiated · 12-month completion timeframe"
                    value={formData.statusNote}
                    onChange={handleFormChange}
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Media Asset URL / Path</label>
                  <input
                    type="text"
                    name="mediaUrl"
                    value={formData.mediaUrl}
                    onChange={handleFormChange}
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Press & Hansard Source Label</label>
                  <input
                    type="text"
                    name="sourceLabel"
                    placeholder="e.g. The Hans India / Sakshi"
                    value={formData.sourceLabel}
                    onChange={handleFormChange}
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Internal Verification Notes (Private to Admin)</label>
                  <textarea
                    rows="2"
                    name="internalNotes"
                    placeholder="Private notes, verified government order numbers, or review reminders..."
                    value={formData.internalNotes}
                    onChange={handleFormChange}
                    className="admin-form-textarea"
                  />
                </div>

                <div style={{ display: 'flex', gap: '20px', marginTop: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input
                      type="checkbox"
                      name="isPublished"
                      checked={formData.isPublished}
                      onChange={handleFormChange}
                    />
                    <strong>Publish on Public Website</strong>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleFormChange}
                    />
                    Feature on Homepage Spreads
                  </label>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="admin-btn admin-btn-primary"
                >
                  {saving ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
