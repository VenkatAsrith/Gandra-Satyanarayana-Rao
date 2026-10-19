import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export default function AdminActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    activityDate: new Date().toISOString().split('T')[0],
    location: '',
    category: 'civic',
    categoryLabel: 'Civic Engagement',
    summary: '',
    mediaUrl: '',
    sourceLabel: '',
    isHighlighted: false,
    isPublished: true,
    internalNotes: ''
  });

  const loadActivities = async () => {
    try {
      setLoading(true);
      const res = await api.adminGetActivities();
      setActivities(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load activities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const openCreateModal = () => {
    setEditingActivity(null);
    setFormData({
      title: '',
      activityDate: new Date().toISOString().split('T')[0],
      location: 'Bhupalpally',
      category: 'civic',
      categoryLabel: 'Civic Engagement',
      summary: '',
      mediaUrl: '',
      sourceLabel: 'Official Assembly Record',
      isHighlighted: false,
      isPublished: true,
      internalNotes: ''
    });
    setModalOpen(true);
  };

  const openEditModal = (act) => {
    setEditingActivity(act);
    setFormData({
      title: act.title || '',
      activityDate: act.activityDate ? new Date(act.activityDate).toISOString().split('T')[0] : '',
      location: act.location || '',
      category: act.category || 'civic',
      categoryLabel: act.categoryLabel || '',
      summary: act.summary || '',
      mediaUrl: act.mediaUrl || '',
      sourceLabel: act.sourceLabel || '',
      isHighlighted: Boolean(act.isHighlighted),
      isPublished: Boolean(act.isPublished),
      internalNotes: act.internalNotes || ''
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
      if (editingActivity) {
        await api.adminUpdateActivity(editingActivity._id, formData);
        setSuccess(`Activity "${formData.title}" updated.`);
      } else {
        await api.adminCreateActivity(formData);
        setSuccess(`Activity "${formData.title}" created.`);
      }
      setModalOpen(false);
      loadActivities();
    } catch (err) {
      setError(err.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (act) => {
    if (!window.confirm(`Delete activity record for "${act.title}"?`)) return;

    try {
      await api.adminDeleteActivity(act._id);
      setSuccess(`Activity "${act.title}" deleted.`);
      loadActivities();
    } catch (err) {
      setError(err.message || 'Failed to delete activity');
    }
  };

  return (
    <div>
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h2 className="admin-card-title">Public Activities & Legislative Speeches</h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>
              Manage floor questions, inspections, memorial commemorations, and community programs
            </span>
          </div>
          <button onClick={openCreateModal} className="admin-btn admin-btn-primary">
            + New Activity Record
          </button>
        </div>

        {success && <div className="admin-alert success">{success}</div>}
        {error && <div className="admin-alert error">{error}</div>}

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Loading activities...</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Banner Highlight</th>
                  <th>Published</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((act) => (
                  <tr key={act._id}>
                    <td>
                      {act.activityDate
                        ? new Date(act.activityDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })
                        : '—'}
                    </td>
                    <td style={{ fontWeight: 600, maxWidth: '280px' }}>{act.title}</td>
                    <td>{act.categoryLabel || act.category}</td>
                    <td>{act.location}</td>
                    <td>
                      {act.isHighlighted ? (
                        <span className="admin-badge published">★ Highlighted</span>
                      ) : (
                        <span style={{ color: 'var(--gray)', fontSize: '0.8rem' }}>Standard</span>
                      )}
                    </td>
                    <td>
                      <span className={`admin-badge ${act.isPublished ? 'published' : 'draft'}`}>
                        {act.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          onClick={() => openEditModal(act)}
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(act)}
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

      {modalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
                {editingActivity ? 'Edit Activity Record' : 'Create New Activity Record'}
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
                  <label className="admin-form-label">Activity Title *</label>
                  <input
                    type="text"
                    required
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Event Date *</label>
                    <input
                      type="date"
                      required
                      name="activityDate"
                      value={formData.activityDate}
                      onChange={handleFormChange}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Location *</label>
                    <input
                      type="text"
                      required
                      name="location"
                      value={formData.location}
                      onChange={handleFormChange}
                      className="admin-form-input"
                    />
                  </div>
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
                      <option value="legislative">Legislative Assembly</option>
                      <option value="agriculture">Agriculture & Farmers</option>
                      <option value="welfare">Welfare & Social</option>
                      <option value="infrastructure">Infrastructure</option>
                      <option value="civic">Civic Engagement</option>
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

                <div className="admin-form-group">
                  <label className="admin-form-label">Summary / Speech Highlights *</label>
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
                    <label className="admin-form-label">Press / Hansard Source Label</label>
                    <input
                      type="text"
                      name="sourceLabel"
                      value={formData.sourceLabel}
                      onChange={handleFormChange}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Media Photograph URL</label>
                    <input
                      type="text"
                      name="mediaUrl"
                      value={formData.mediaUrl}
                      onChange={handleFormChange}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', marginTop: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input
                      type="checkbox"
                      name="isPublished"
                      checked={formData.isPublished}
                      onChange={handleFormChange}
                    />
                    <strong>Publish on Website</strong>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input
                      type="checkbox"
                      name="isHighlighted"
                      checked={formData.isHighlighted}
                      onChange={handleFormChange}
                    />
                    Featured Assembly Intervention Banner
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
                  {saving ? 'Saving...' : editingActivity ? 'Update Activity' : 'Create Activity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
