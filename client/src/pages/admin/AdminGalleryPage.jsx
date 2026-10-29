import React, { useState, useEffect } from 'react';
import { api, resolveMediaUrl } from '../../services/api';

export default function AdminGalleryPage() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [uploadData, setUploadData] = useState({
    title: '',
    caption: '',
    altText: '',
    category: 'events',
    categoryLabel: 'Public Events',
    credit: 'Official Public Record',
    isPublished: true
  });

  const loadGallery = async () => {
    try {
      setLoading(true);
      const res = await api.adminGetGallery();
      setMediaList(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setFilePreview(URL.createObjectURL(selected));
      if (!uploadData.title) {
        setUploadData((prev) => ({
          ...prev,
          title: selected.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
        }));
      }
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image file to upload.');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('media', file);
      formData.append('title', uploadData.title);
      formData.append('caption', uploadData.caption);
      formData.append('altText', uploadData.altText || uploadData.title);
      formData.append('category', uploadData.category);
      formData.append('categoryLabel', uploadData.categoryLabel);
      formData.append('credit', uploadData.credit);
      formData.append('isPublished', uploadData.isPublished);

      await api.adminUploadMedia(formData);
      setSuccess(`Media "${uploadData.title}" uploaded and archived successfully.`);
      setUploadModalOpen(false);
      setFile(null);
      setFilePreview('');
      setUploadData({
        title: '',
        caption: '',
        altText: '',
        category: 'events',
        categoryLabel: 'Public Events',
        credit: 'Official Public Record',
        isPublished: true
      });
      loadGallery();
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (media) => {
    if (!window.confirm(`Delete media photograph "${media.title}"?`)) return;

    try {
      await api.adminDeleteMedia(media._id);
      setSuccess(`Media asset "${media.title}" deleted.`);
      loadGallery();
    } catch (err) {
      setError(err.message || 'Failed to delete media asset');
    }
  };

  return (
    <div>
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h2 className="admin-card-title">Media Archive & Cloudinary Integration</h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>
              Upload, optimize, and manage verified photo assets with accessibility alt-text metadata
            </span>
          </div>
          <button onClick={() => setUploadModalOpen(true)} className="admin-btn admin-btn-primary">
            + Upload New Photograph
          </button>
        </div>

        {success && <div className="admin-alert success">{success}</div>}
        {error && <div className="admin-alert error">{error}</div>}

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Loading media archive...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {mediaList.map((m) => (
              <div
                key={m._id}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ height: '170px', background: '#F0EFEA', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={resolveMediaUrl(m.thumbnailUrl || m.secureUrl)}
                    alt={m.altText || m.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {m.mediaType === 'video' && (
                    <span style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
                      ▶ {m.duration || 'VIDEO'}
                    </span>
                  )}
                </div>
                <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <span className="admin-badge" style={{ alignSelf: 'flex-start' }}>
                      {m.category}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--gray)', textTransform: 'uppercase' }}>
                      {m.mediaType === 'video' ? 'Video' : 'Photo'}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, margin: '2px 0', lineHeight: 1.3 }}>
                    {m.title}
                  </h4>
                  {m.caption && (
                    <p style={{ fontSize: '0.78rem', color: 'var(--gray)', margin: 0, lineHeight: 1.4 }}>
                      {m.caption}
                    </p>
                  )}
                  <div style={{ marginTop: 'auto', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--gray)' }}>
                      {m.publicId?.startsWith('local_') ? 'Local File' : 'Cloudinary'}
                    </span>
                    <button
                      onClick={() => handleDelete(m)}
                      className="admin-btn admin-btn-danger admin-btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
                Upload Photograph to Media Archive
              </h3>
              <button
                type="button"
                onClick={() => setUploadModalOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUploadSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">Select Image File (JPEG, PNG, WEBP, AVIF) *</label>
                  <input
                    type="file"
                    required
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    onChange={handleFileChange}
                    className="admin-form-input"
                  />
                </div>

                {filePreview && (
                  <div style={{ margin: '1rem 0', maxHeight: '180px', overflow: 'hidden', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <img src={filePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}

                <div className="admin-form-group">
                  <label className="admin-form-label">Photo Title *</label>
                  <input
                    type="text"
                    required
                    value={uploadData.title}
                    onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                    className="admin-form-input"
                    placeholder="e.g. Mass meeting in Bhupalpally urban"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Accessibility Alt Text *</label>
                  <input
                    type="text"
                    required
                    value={uploadData.altText}
                    onChange={(e) => setUploadData({ ...uploadData, altText: e.target.value })}
                    className="admin-form-input"
                    placeholder="Descriptive text for screen readers..."
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Category</label>
                    <select
                      value={uploadData.category}
                      onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
                      className="admin-form-select"
                    >
                      <option value="events">Public Events</option>
                      <option value="portraits">Official Portraits</option>
                      <option value="constituency">Constituency Coordination</option>
                      <option value="work">Public Works</option>
                      <option value="general">General</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Photo Credit</label>
                    <input
                      type="text"
                      value={uploadData.credit}
                      onChange={(e) => setUploadData({ ...uploadData, credit: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Caption / Description</label>
                  <textarea
                    rows="2"
                    value={uploadData.caption}
                    onChange={(e) => setUploadData({ ...uploadData, caption: e.target.value })}
                    className="admin-form-textarea"
                    placeholder="Contextual details regarding attendees, location, or project..."
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="admin-btn admin-btn-primary"
                >
                  {uploading ? 'Uploading to Server / Cloudinary...' : 'Upload & Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
