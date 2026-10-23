import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import DynamicSectionRenderer from '../../components/public/DynamicSectionRenderer';

const SECTION_TYPES = [
  { value: 'feature', label: 'Feature (Split Media & Narrative)' },
  { value: 'quote_callout', label: 'Quote Callout (Editorial Stance)' },
  { value: 'statistics', label: 'Statistics (Multi-metric Grid)' },
  { value: 'faq', label: 'FAQ (Accordion Q&A)' },
  { value: 'announcements', label: 'Public Announcement Banner' },
  { value: 'custom_rich_text', label: 'Custom Editorial Content' }
];

const LAYOUTS = [
  { value: 'split_media', label: 'Split Media (50/50 Column)' },
  { value: 'full_width', label: 'Full Width Editorial' },
  { value: 'two_column', label: 'Two Column Text' },
  { value: 'three_card_grid', label: 'Three Card Grid' },
  { value: 'banner', label: 'Horizontal Alert Banner' }
];

const initialForm = {
  key: '',
  page: 'home',
  type: 'feature',
  layout: 'split_media',
  title: '',
  subtitle: '',
  badge: '',
  content: '',
  mediaUrl: '',
  mediaAlt: '',
  ctaText: '',
  ctaLink: '',
  order: 0,
  isEnabled: true,
  status: 'published',
  translations: {
    te: {
      title: '',
      subtitle: '',
      badge: '',
      content: '',
      ctaText: '',
      mediaAlt: ''
    }
  }
};

export default function AdminSectionsPage() {
  const toast = useToast();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState('settings'); // settings, en, te, preview
  const [previewLang, setPreviewLang] = useState('en');
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const res = await api.adminGetSections('home');
      setSections(res.data || []);
    } catch (err) {
      toast.error(err.message || 'Failed to load sections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      ...initialForm,
      order: sections.length + 1
    });
    setActiveTab('settings');
    setShowModal(true);
  };

  const handleOpenEdit = (sec) => {
    setEditingId(sec._id);
    setFormData({
      key: sec.key || '',
      page: sec.page || 'home',
      type: sec.type || 'feature',
      layout: sec.layout || 'split_media',
      title: sec.title || '',
      subtitle: sec.subtitle || '',
      badge: sec.badge || '',
      content: typeof sec.content === 'string' ? sec.content : JSON.stringify(sec.content, null, 2),
      mediaUrl: sec.mediaUrl || '',
      mediaAlt: sec.mediaAlt || '',
      ctaText: sec.ctaText || '',
      ctaLink: sec.ctaLink || '',
      order: sec.order || 0,
      isEnabled: sec.isEnabled !== false,
      status: sec.status || 'published',
      translations: {
        te: {
          title: sec.translations?.te?.title || '',
          subtitle: sec.translations?.te?.subtitle || '',
          badge: sec.translations?.te?.badge || '',
          content: typeof sec.translations?.te?.content === 'string'
            ? sec.translations.te.content
            : JSON.stringify(sec.translations?.te?.content || '', null, 2),
          ctaText: sec.translations?.te?.ctaText || '',
          mediaAlt: sec.translations?.te?.mediaAlt || ''
        }
      }
    });
    setActiveTab('settings');
    setShowModal(true);
  };

  const handleToggle = async (id) => {
    try {
      const res = await api.adminToggleSection(id);
      setSections((prev) =>
        prev.map((s) => (s._id === id ? { ...s, isEnabled: res.data.isEnabled } : s))
      );
      toast.success(res.message || 'Status updated');
    } catch (err) {
      toast.error(err.message || 'Failed to update section status');
    }
  };

  const handleMoveOrder = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    // Recalculate order values
    const items = newSections.map((sec, idx) => ({
      id: sec._id,
      order: idx + 1
    }));

    setSections(newSections.map((sec, idx) => ({ ...sec, order: idx + 1 })));

    try {
      await api.adminReorderSections(items);
      toast.success('Section ordering updated');
    } catch (err) {
      toast.error(err.message || 'Failed to persist order');
      fetchSections();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.key.trim() || !formData.title.trim()) {
      toast.warning('Key identifier and English Title are required');
      return;
    }

    try {
      setSubmitting(true);
      if (editingId) {
        await api.adminUpdateSection(editingId, formData);
        toast.success('Section updated successfully');
      } else {
        await api.adminCreateSection(formData);
        toast.success('New dynamic section created');
      }
      setShowModal(false);
      fetchSections();
    } catch (err) {
      toast.error(err.message || 'Failed to save section');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.adminDeleteSection(id);
      toast.success('Section deleted successfully');
      setDeleteConfirmId(null);
      fetchSections();
    } catch (err) {
      toast.error(err.message || 'Failed to delete section');
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dynamic Section Builder</h1>
          <p className="admin-page-subtitle">
            Create, reorder, translate, and manage dynamic content sections for the public website.
          </p>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleOpenCreate}>
          + Create New Section
        </button>
      </div>

      {loading ? (
        <div className="admin-loading-skeleton">Loading dynamic sections...</div>
      ) : sections.length === 0 ? (
        <div className="admin-empty-card">
          <h3>No dynamic sections created yet</h3>
          <p>Click the button above to add a new customizable feature, statistics strip, or quote.</p>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Order</th>
                <th>Section Title & Key</th>
                <th>Type</th>
                <th>Layout</th>
                <th>Telugu Status</th>
                <th>Status</th>
                <th>Enabled</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((sec, idx) => (
                <tr key={sec._id}>
                  <td>
                    <div className="order-controls">
                      <span className="order-badge">#{sec.order || idx + 1}</span>
                      <button
                        type="button"
                        className="btn-icon-subtle"
                        disabled={idx === 0}
                        onClick={() => handleMoveOrder(idx, -1)}
                        title="Move Up"
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        className="btn-icon-subtle"
                        disabled={idx === sections.length - 1}
                        onClick={() => handleMoveOrder(idx, 1)}
                        title="Move Down"
                      >
                        ▼
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong>{sec.title}</strong>
                    <div className="admin-text-subtle font-mono text-xs">
                      key: {sec.key} {sec.badge && `· [${sec.badge}]`}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-subtle">{sec.type}</span>
                  </td>
                  <td>
                    <span className="text-secondary text-xs">{sec.layout}</span>
                  </td>
                  <td>
                    {sec.translations?.te?.title ? (
                      <span className="badge badge-success text-xs">✓ Telugu Added</span>
                    ) : (
                      <span className="badge badge-warning text-xs">Missing Telugu</span>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${sec.status === 'published' ? 'badge-primary' : 'badge-draft'}`}>
                      {sec.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`toggle-btn ${sec.isEnabled ? 'active' : ''}`}
                      onClick={() => handleToggle(sec._id)}
                    >
                      {sec.isEnabled ? 'Active' : 'Hidden'}
                    </button>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      style={{ marginRight: '6px' }}
                      onClick={() => handleOpenEdit(sec)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => setDeleteConfirmId(sec._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this section? This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setDeleteConfirmId(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(deleteConfirmId)}
              >
                Delete Section
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Section Modal */}
      {showModal && (
        <div className="modal-backdrop modal-large">
          <div className="modal-card modal-card-scrollable">
            <div className="modal-header">
              <h2>{editingId ? 'Edit Dynamic Section' : 'Create New Section'}</h2>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="admin-tabs">
              <button
                type="button"
                className={`admin-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                1. Settings & Layout
              </button>
              <button
                type="button"
                className={`admin-tab-btn ${activeTab === 'en' ? 'active' : ''}`}
                onClick={() => setActiveTab('en')}
              >
                2. English Content
              </button>
              <button
                type="button"
                className={`admin-tab-btn ${activeTab === 'te' ? 'active' : ''}`}
                onClick={() => setActiveTab('te')}
              >
                3. Telugu Content (తెలుగు)
              </button>
              <button
                type="button"
                className={`admin-tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
                onClick={() => setActiveTab('preview')}
              >
                4. Live Preview
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Tab 1: Settings & Layout */}
              {activeTab === 'settings' && (
                <div className="form-tab-content">
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Section Unique Key (slug) *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., farmers-water-security"
                        value={formData.key}
                        onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                        disabled={!!editingId}
                      />
                      <small className="form-help">Unique lowercase identifier without spaces</small>
                    </div>

                    <div className="form-group">
                      <label>Target Page</label>
                      <input
                        type="text"
                        value={formData.page}
                        onChange={(e) => setFormData({ ...formData, page: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Section Type *</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      >
                        {SECTION_TYPES.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Visual Layout</label>
                      <select
                        value={formData.layout}
                        onChange={(e) => setFormData({ ...formData, layout: e.target.value })}
                      >
                        {LAYOUTS.map((l) => (
                          <option key={l.value} value={l.value}>
                            {l.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Media Image URL (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g., /images/work/irrigation.jpg or Cloudinary URL"
                        value={formData.mediaUrl}
                        onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>CTA Button Link (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g., /work or /contact"
                        value={formData.ctaLink}
                        onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-grid-3">
                    <div className="form-group">
                      <label>Display Order</label>
                      <input
                        type="number"
                        value={formData.order}
                        onChange={(e) =>
                          setFormData({ ...formData, order: parseInt(e.target.value, 10) || 0 })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>Publish Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft (Private)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Visibility</label>
                      <select
                        value={formData.isEnabled ? 'true' : 'false'}
                        onChange={(e) =>
                          setFormData({ ...formData, isEnabled: e.target.value === 'true' })
                        }
                      >
                        <option value="true">Enabled (Visible)</option>
                        <option value="false">Disabled (Hidden)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: English Content */}
              {activeTab === 'en' && (
                <div className="form-tab-content">
                  <div className="form-group">
                    <label>Eyebrow Badge Label (English)</label>
                    <input
                      type="text"
                      placeholder="e.g., Priority Initiative"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Section Title (English) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Safeguarding Every Acre: Devadula & Ghanapur Irrigation"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Subtitle / Lead Description (English)</label>
                    <input
                      type="text"
                      placeholder="e.g., Uncompromising push to ensure dependable canal water..."
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Body Content (English)</label>
                    <textarea
                      rows={5}
                      placeholder="Enter detailed narrative or copy..."
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>CTA Button Text (English)</label>
                      <input
                        type="text"
                        placeholder="e.g., Explore Projects"
                        value={formData.ctaText}
                        onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Image Alt Text (English)</label>
                      <input
                        type="text"
                        placeholder="Accessible description of image"
                        value={formData.mediaAlt}
                        onChange={(e) => setFormData({ ...formData, mediaAlt: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Telugu Content */}
              {activeTab === 'te' && (
                <div className="form-tab-content">
                  <div className="alert-box-info" style={{ marginBottom: '14px' }}>
                    💡 <strong>తెలుగు సమాచారం:</strong> తెలుగు భాషను ఎంచుకున్నప్పుడు ఈ వివరాలు ప్రదర్శించబడతాయి. వివరాలు లేకపోతే ఆంగ్ల సమాచారం సురక్షితంగా ప్రదర్శించబడుతుంది.
                  </div>

                  <div className="form-group">
                    <label>Eyebrow Badge Label (తెలుగు)</label>
                    <input
                      type="text"
                      placeholder="ఉదాహరణ: రైతాంగ ప్రాధాన్యత"
                      value={formData.translations?.te?.badge || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          translations: {
                            ...formData.translations,
                            te: { ...formData.translations.te, badge: e.target.value }
                          }
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Section Title (తెలుగు శీర్షిక)</label>
                    <input
                      type="text"
                      placeholder="ఉదాహరణ: ప్రతి ఎకరాకూ సాగునీరు: దేవాదుల & ఘనపూర్ ఆయకట్టు రక్షణ"
                      value={formData.translations?.te?.title || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          translations: {
                            ...formData.translations,
                            te: { ...formData.translations.te, title: e.target.value }
                          }
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Subtitle / Lead Description (తెలుగు సారాంశం)</label>
                    <input
                      type="text"
                      placeholder="ఉదాహరణ: చివరి ఆయకట్టు వరకు సాగునీరందించడమే లక్ష్యంగా..."
                      value={formData.translations?.te?.subtitle || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          translations: {
                            ...formData.translations,
                            te: { ...formData.translations.te, subtitle: e.target.value }
                          }
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Body Content (తెలుగు పూర్తి సమాచారం)</label>
                    <textarea
                      rows={5}
                      placeholder="వివరాలు నమోదు చేయండి..."
                      value={formData.translations?.te?.content || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          translations: {
                            ...formData.translations,
                            te: { ...formData.translations.te, content: e.target.value }
                          }
                        })
                      }
                    />
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>CTA Button Text (తెలుగు బటన్ టెక్స్ట్)</label>
                      <input
                        type="text"
                        placeholder="ఉదాహరణ: ప్రాజెక్టుల వివరాలు"
                        value={formData.translations?.te?.ctaText || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            translations: {
                              ...formData.translations,
                              te: { ...formData.translations.te, ctaText: e.target.value }
                            }
                          })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>Image Alt Text (తెలుగు చిత్రం వివరణ)</label>
                      <input
                        type="text"
                        placeholder="చిత్రం వివరణ"
                        value={formData.translations?.te?.mediaAlt || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            translations: {
                              ...formData.translations,
                              te: { ...formData.translations.te, mediaAlt: e.target.value }
                            }
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Live Preview */}
              {activeTab === 'preview' && (
                <div className="form-tab-content">
                  <div className="preview-toolbar">
                    <span>Preview Language:</span>
                    <button
                      type="button"
                      className={`btn btn-sm ${previewLang === 'en' ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setPreviewLang('en')}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      className={`btn btn-sm ${previewLang === 'te' ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setPreviewLang('te')}
                    >
                      తెలుగు
                    </button>
                  </div>

                  <div className="preview-frame">
                    <DynamicSectionRenderer
                      section={{
                        ...formData,
                        translations: {
                          te: previewLang === 'te' ? formData.translations.te : {}
                        }
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="modal-actions" style={{ marginTop: '20px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Saving...' : editingId ? 'Update Section' : 'Create Section'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
