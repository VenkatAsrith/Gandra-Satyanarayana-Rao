import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSub, setSelectedSub] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [editNotes, setEditNotes] = useState('');
  const [editStatus, setEditStatus] = useState('new');

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (search) params.append('search', search);

      const res = await api.adminGetSubmissions(params.toString());
      setSubmissions(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, [statusFilter]);

  const openDetailModal = (sub) => {
    setSelectedSub(sub);
    setEditStatus(sub.status || 'new');
    setEditNotes(sub.adminNotes || '');
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedSub) return;
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await api.adminUpdateSubmission(selectedSub._id, {
        status: editStatus,
        adminNotes: editNotes,
        isRead: true
      });
      setSuccess('Representation status and review notes updated.');
      setSelectedSub(null);
      loadSubmissions();
    } catch (err) {
      setError(err.message || 'Failed to update submission');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (sub) => {
    if (!window.confirm(`Delete representation from "${sub.name}"?`)) return;

    try {
      await api.adminDeleteSubmission(sub._id);
      setSuccess('Submission removed from database.');
      if (selectedSub?._id === sub._id) setSelectedSub(null);
      loadSubmissions();
    } catch (err) {
      setError(err.message || 'Failed to delete submission');
    }
  };

  return (
    <div>
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h2 className="admin-card-title">Citizen Grievances & Representations</h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>
              Official constituent desk intake log, status tracking, and internal review notes
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="admin-form-select"
              style={{ width: 'auto' }}
            >
              <option value="all">All Statuses</option>
              <option value="new">New / Unread</option>
              <option value="under_review">Under Review</option>
              <option value="action_taken">Action Taken</option>
              <option value="resolved">Resolved</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {success && <div className="admin-alert success">{success}</div>}
        {error && <div className="admin-alert error">{error}</div>}

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Loading submissions...</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Citizen Name</th>
                  <th>Phone Number</th>
                  <th>Mandal & Village</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => (
                  <tr key={sub._id}>
                    <td>
                      {new Date(sub.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td style={{ fontWeight: 600 }}>{sub.name}</td>
                    <td>{sub.phone}</td>
                    <td>
                      {sub.village ? `${sub.village}, ` : ''}
                      {sub.mandal}
                    </td>
                    <td style={{ maxWidth: '240px' }}>{sub.subject}</td>
                    <td>
                      <span className={`admin-badge ${sub.status}`}>
                        {sub.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          onClick={() => openDetailModal(sub)}
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                        >
                          Review
                        </button>
                        <button
                          onClick={() => handleDelete(sub)}
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

        {!loading && submissions.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--gray)' }}>
            No citizen submissions found matching the criteria.
          </div>
        )}
      </div>

      {/* Review & Update Modal */}
      {selectedSub && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
                Review Citizen Representation
              </h3>
              <button
                type="button"
                onClick={() => setSelectedSub(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdateStatus}>
              <div className="admin-modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gray)', textTransform: 'uppercase' }}>Citizen</span>
                    <div style={{ fontWeight: 700 }}>{selectedSub.name}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gray)', textTransform: 'uppercase' }}>Phone</span>
                    <div>
                      <a href={`tel:${selectedSub.phone}`} style={{ color: 'var(--orange-dark)', fontWeight: 600 }}>
                        {selectedSub.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gray)', textTransform: 'uppercase' }}>Location</span>
                    <div>{selectedSub.village ? `${selectedSub.village}, ` : ''}{selectedSub.mandal}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gray)', textTransform: 'uppercase' }}>Received Date</span>
                    <div>{new Date(selectedSub.createdAt).toLocaleString()}</div>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--gray)', textTransform: 'uppercase' }}>Subject</span>
                  <div style={{ fontWeight: 600, fontSize: '0.98rem' }}>{selectedSub.subject}</div>
                </div>

                <div style={{ marginBottom: '1.5rem', background: '#F8F9FA', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--gray)', textTransform: 'uppercase' }}>Message</span>
                  <p style={{ margin: '4px 0 0', whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: '0.9rem' }}>
                    {selectedSub.message}
                  </p>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Update Processing Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="admin-form-select"
                  >
                    <option value="new">New / Unread</option>
                    <option value="under_review">Under Review</option>
                    <option value="action_taken">Action Taken / Forwarded to Dept</option>
                    <option value="resolved">Resolved</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Internal MLA Desk Notes</label>
                  <textarea
                    rows="3"
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    className="admin-form-textarea"
                    placeholder="Enter departmental action references, endorsement dates, or follow-up notes..."
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  onClick={() => setSelectedSub(null)}
                  className="admin-btn admin-btn-secondary"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="admin-btn admin-btn-primary"
                >
                  {saving ? 'Updating...' : 'Save Status & Notes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
