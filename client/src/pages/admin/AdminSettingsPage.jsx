import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState({
    siteTitle: '',
    teluguTitle: '',
    tagline: '',
    emblemUrl: '',
    partyAffiliation: '',
    constituencyName: '',
    constituencyNo: 108,
    district: '',
    state: '',
    legislativeTerm: '',
    officialPhone: '',
    officialEmail: '',
    officeAddress: {
      line1: '',
      village: '',
      mandal: '',
      district: '',
      state: '',
      notes: ''
    },
    metaDescription: '',
    verificationNotice: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.getSettings();
        if (res.data) {
          setFormData((prev) => ({
            ...prev,
            ...res.data,
            officeAddress: { ...prev.officeAddress, ...(res.data.officeAddress || {}) }
          }));
        }
      } catch (err) {
        setError(err.message || 'Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      officeAddress: { ...prev.officeAddress, [name]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess('');
    setError('');

    try {
      await api.updateSettings(formData);
      setSuccess('Site and branding settings updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading configuration...</div>;

  return (
    <div>
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h2 className="admin-card-title">Site Branding & Configuration</h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>
              Maintain verified office contact information, legislative term, and branding metadata
            </span>
          </div>
        </div>

        {success && <div className="admin-alert success">{success}</div>}
        {error && <div className="admin-alert error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Official Site Title</label>
              <input
                type="text"
                name="siteTitle"
                value={formData.siteTitle}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Telugu Moniker / Title</label>
              <input
                type="text"
                name="teluguTitle"
                value={formData.teluguTitle}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Party Affiliation</label>
              <input
                type="text"
                name="partyAffiliation"
                value={formData.partyAffiliation}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Legislative Term</label>
              <input
                type="text"
                name="legislativeTerm"
                value={formData.legislativeTerm}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Constituency Name</label>
              <input
                type="text"
                name="constituencyName"
                value={formData.constituencyName}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Assembly Constituency No.</label>
              <input
                type="number"
                name="constituencyNo"
                value={formData.constituencyNo}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Official Phone Number</label>
              <input
                type="text"
                name="officialPhone"
                value={formData.officialPhone}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Official Public Email</label>
              <input
                type="email"
                name="officialEmail"
                value={formData.officialEmail}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>
          </div>

          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '1.5rem 0 0.75rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
            Office & Residence Address
          </h3>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Door / House No.</label>
              <input
                type="text"
                name="line1"
                value={formData.officeAddress.line1}
                onChange={handleAddressChange}
                className="admin-form-input"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Native Village</label>
              <input
                type="text"
                name="village"
                value={formData.officeAddress.village}
                onChange={handleAddressChange}
                className="admin-form-input"
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Mandal</label>
              <input
                type="text"
                name="mandal"
                value={formData.officeAddress.mandal}
                onChange={handleAddressChange}
                className="admin-form-input"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">District</label>
              <input
                type="text"
                name="district"
                value={formData.officeAddress.district}
                onChange={handleAddressChange}
                className="admin-form-input"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Verification Attribution Disclaimer</label>
            <textarea
              name="verificationNotice"
              rows="2"
              value={formData.verificationNotice}
              onChange={handleChange}
              className="admin-form-textarea"
            />
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
              {saving ? 'Saving Changes...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
