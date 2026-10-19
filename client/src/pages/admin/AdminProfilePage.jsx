import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export default function AdminProfilePage() {
  const [formData, setFormData] = useState({
    fullName: '',
    commonName: '',
    teluguName: '',
    birthYear: 1965,
    parentName: '',
    spouseName: '',
    nativeVillage: '',
    education: '',
    leadTitle: '',
    biographySummary: '',
    electoralStats: {
      votesSecured: 123116,
      voteMargin: 52699,
      voteSharePercentage: 54.55,
      assemblyNo: 108,
      tenureYears: '2023–2028',
      verifiedSources: ''
    },
    timeline: []
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.getProfile();
        if (res.data) {
          setFormData((prev) => ({
            ...prev,
            ...res.data,
            electoralStats: { ...prev.electoralStats, ...(res.data.electoralStats || {}) },
            timeline: res.data.timeline || []
          }));
        }
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      electoralStats: { ...prev.electoralStats, [name]: value }
    }));
  };

  const handleTimelineChange = (index, field, value) => {
    const updated = [...formData.timeline];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, timeline: updated }));
  };

  const addTimelineItem = () => {
    setFormData((prev) => ({
      ...prev,
      timeline: [
        ...prev.timeline,
        {
          yearOrPeriod: 'YEAR',
          role: 'Role Title',
          title: 'Event Heading',
          description: 'Description of public service priority...',
          citation: 'Source citation'
        }
      ]
    }));
  };

  const removeTimelineItem = (index) => {
    const updated = formData.timeline.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, timeline: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess('');
    setError('');

    try {
      await api.updateProfile(formData);
      setSuccess('Biographical content and timeline updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading biography...</div>;

  return (
    <div>
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h2 className="admin-card-title">Biography & Public Record</h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>
              Edit verified facts, educational credentials, and the dark monograph political journey
            </span>
          </div>
        </div>

        {success && <div className="admin-alert success">{success}</div>}
        {error && <div className="admin-alert error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Common Name / Moniker</label>
              <input
                type="text"
                name="commonName"
                value={formData.commonName}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Telugu Script Moniker</label>
              <input
                type="text"
                name="teluguName"
                value={formData.teluguName}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Educational Qualifications</label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Parent's Name</label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Spouse's Name</label>
              <input
                type="text"
                name="spouseName"
                value={formData.spouseName}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Editorial Lead Headline</label>
            <input
              type="text"
              name="leadTitle"
              value={formData.leadTitle}
              onChange={handleChange}
              className="admin-form-input"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Biographical Narrative Summary</label>
            <textarea
              name="biographySummary"
              rows="4"
              value={formData.biographySummary}
              onChange={handleChange}
              className="admin-form-textarea"
            />
          </div>

          {/* Electoral Stats */}
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '1.5rem 0 0.75rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
            Election Commission Verified Metrics
          </h3>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Total Votes Secured (2023)</label>
              <input
                type="number"
                name="votesSecured"
                value={formData.electoralStats.votesSecured}
                onChange={handleStatsChange}
                className="admin-form-input"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Winning Vote Margin</label>
              <input
                type="number"
                name="voteMargin"
                value={formData.electoralStats.voteMargin}
                onChange={handleStatsChange}
                className="admin-form-input"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Vote Share Percentage (%)</label>
              <input
                type="number"
                step="0.01"
                name="voteSharePercentage"
                value={formData.electoralStats.voteSharePercentage}
                onChange={handleStatsChange}
                className="admin-form-input"
              />
            </div>
          </div>

          {/* Timeline Management */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '2rem 0 1rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>
              Political Journey Timeline ({formData.timeline.length} Milestones)
            </h3>
            <button
              type="button"
              onClick={addTimelineItem}
              className="admin-btn admin-btn-secondary admin-btn-sm"
            >
              + Add Milestone
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {formData.timeline.map((item, index) => (
              <div
                key={index}
                style={{
                  background: '#F9FAFB',
                  padding: '1.25rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Milestone #{index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeTimelineItem(index)}
                    style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}
                  >
                    ✕ Remove
                  </button>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Year / Era</label>
                    <input
                      type="text"
                      value={item.yearOrPeriod}
                      onChange={(e) => handleTimelineChange(index, 'yearOrPeriod', e.target.value)}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Role Pill</label>
                    <input
                      type="text"
                      value={item.role}
                      onChange={(e) => handleTimelineChange(index, 'role', e.target.value)}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Heading</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleTimelineChange(index, 'title', e.target.value)}
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Narrative Description</label>
                  <textarea
                    rows="2"
                    value={item.description}
                    onChange={(e) => handleTimelineChange(index, 'description', e.target.value)}
                    className="admin-form-textarea"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Verification Citation</label>
                  <input
                    type="text"
                    value={item.citation}
                    onChange={(e) => handleTimelineChange(index, 'citation', e.target.value)}
                    className="admin-form-input"
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
              {saving ? 'Saving Changes...' : 'Save Profile & Timeline'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
