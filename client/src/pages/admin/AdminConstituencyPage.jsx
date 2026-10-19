import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export default function AdminConstituencyPage() {
  const [formData, setFormData] = useState({
    assemblyNo: 108,
    constituencyName: 'Bhupalpalle',
    districtName: 'Jayashankar Bhupalpally',
    totalAreaSqKm: 2293,
    ruralPercentage: 92.2,
    literacyRatePercentage: 60.32,
    totalPopulation2011: 416763,
    revenueVillagesText: '200+',
    overviewText: '',
    verifiedSources: '',
    mandals: []
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchConstituency = async () => {
      try {
        const res = await api.getConstituency();
        if (res.data) {
          setFormData((prev) => ({
            ...prev,
            ...res.data,
            mandals: res.data.mandals || []
          }));
        }
      } catch (err) {
        setError(err.message || 'Failed to load constituency data');
      } finally {
        setLoading(false);
      }
    };

    fetchConstituency();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMandalChange = (index, field, value) => {
    const updated = [...formData.mandals];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, mandals: updated }));
  };

  const addMandal = () => {
    setFormData((prev) => ({
      ...prev,
      mandals: [...prev.mandals, { name: '', description: '' }]
    }));
  };

  const removeMandal = (index) => {
    const updated = formData.mandals.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, mandals: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess('');
    setError('');

    try {
      await api.updateConstituency(formData);
      setSuccess('Constituency demographics and mandal roster saved successfully.');
    } catch (err) {
      setError(err.message || 'Failed to update constituency info');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading constituency data...</div>;

  return (
    <div>
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h2 className="admin-card-title">Constituency Demographics & Mandals</h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>
              Maintain verified Census figures, geographical area, and administrative mandals
            </span>
          </div>
        </div>

        {success && <div className="admin-alert success">{success}</div>}
        {error && <div className="admin-alert error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Total Geographical Area (sq km)</label>
              <input
                type="number"
                name="totalAreaSqKm"
                value={formData.totalAreaSqKm}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Rural Population Percentage (%)</label>
              <input
                type="number"
                step="0.01"
                name="ruralPercentage"
                value={formData.ruralPercentage}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Literacy Rate (%)</label>
              <input
                type="number"
                step="0.01"
                name="literacyRatePercentage"
                value={formData.literacyRatePercentage}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Total Population (2011 Census)</label>
              <input
                type="number"
                name="totalPopulation2011"
                value={formData.totalPopulation2011}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Revenue Villages Text</label>
              <input
                type="text"
                name="revenueVillagesText"
                value={formData.revenueVillagesText}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Overview Demographic Narrative</label>
            <textarea
              rows="3"
              name="overviewText"
              value={formData.overviewText}
              onChange={handleChange}
              className="admin-form-textarea"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Census & Official Gazette Citation</label>
            <input
              type="text"
              name="verifiedSources"
              value={formData.verifiedSources}
              onChange={handleChange}
              className="admin-form-input"
            />
          </div>

          {/* Mandals List */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '2rem 0 1rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>
              Administrative Mandals ({formData.mandals.length})
            </h3>
            <button
              type="button"
              onClick={addMandal}
              className="admin-btn admin-btn-secondary admin-btn-sm"
            >
              + Add Mandal
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {formData.mandals.map((mandal, index) => (
              <div key={index} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Mandal Name"
                  value={mandal.name}
                  onChange={(e) => handleMandalChange(index, 'name', e.target.value)}
                  className="admin-form-input"
                  style={{ flex: 1 }}
                />
                <input
                  type="text"
                  placeholder="Description / Key Focus"
                  value={mandal.description}
                  onChange={(e) => handleMandalChange(index, 'description', e.target.value)}
                  className="admin-form-input"
                  style={{ flex: 2 }}
                />
                <button
                  type="button"
                  onClick={() => removeMandal(index)}
                  style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '0 8px' }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
              {saving ? 'Saving...' : 'Save Constituency Data'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
