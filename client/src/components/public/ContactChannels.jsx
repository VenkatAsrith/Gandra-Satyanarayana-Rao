import React, { useState } from 'react';
import { api } from '../../services/api';
import { useLanguage } from '../../i18n/LanguageContext';
import { useToast } from '../../context/ToastContext';

export default function ContactChannels({ settings, showForm = true }) {
  const { isTelugu, t } = useLanguage();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    mandal: 'Bhupalpalle',
    village: '',
    representationType: 'grievance',
    subject: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const phone = settings?.officialPhone || '9849051228';
  const email = settings?.officialEmail || 'gandra.satyanarayanarao@gmail.com';
  const address = settings?.officeAddress || {
    line1: 'H.No: 3-12',
    village: 'Buddharam Village',
    mandal: 'Ghanapuram Mandal',
    district: 'Jayashankar Bhupalpally',
    state: 'Telangana'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await api.submitRepresentation(formData);
      const msg = res.message || t('contact.successMsg');
      setSuccessMsg(msg);
      toast.success(msg, t('contact.successTitle'));
      setFormData({
        name: '',
        phone: '',
        email: '',
        mandal: 'Bhupalpalle',
        village: '',
        representationType: 'grievance',
        subject: '',
        message: ''
      });
    } catch (err) {
      const msg = err.message || t('contact.errorMsg');
      setErrorMsg(msg);
      toast.error(msg, t('contact.errorTitle'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section bg-off-white">
      <div className="container">
        <div className="contact-grid">
          <div>
            <div className="tag-label">
              {isTelugu ? 'అధికారిక సంప్రదింపులు' : 'Official Information'}
            </div>
            <h2 className="section-title">
              {isTelugu ? 'క్యాంపు కార్యాలయం & సంప్రదింపు మార్గాలు' : 'Constituency & Office Channels'}
            </h2>
            <p className="section-subtitle" style={{ marginTop: '1rem' }}>
              {isTelugu
                ? 'తెలంగాణ శాసనసభ డైరెక్టరీ వివరాలు మరియు బుద్ధారం క్యాంపు కార్యాలయంలో ప్రజా దర్బార్ ద్వారా సంప్రదించే మార్గాలు.'
                : 'Public representative directory listing and official constituency office location for grievance representations and constituent interaction.'}
            </p>

            <div className="contact-card-box" style={{ marginTop: '2rem' }}>
              {/* Phone Channel */}
              <div className="contact-channel-item">
                <div className="contact-icon-bubble">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <div className="contact-detail-title">{t('contact.phoneTitle')}</div>
                  <div className="contact-detail-val" style={{ fontSize: '1.35rem', color: 'var(--orange-dark)' }}>
                    {phone}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray)', marginTop: '2px' }}>
                    {isTelugu ? 'తెలంగాణ శాసనసభ అధికారిక డైరెక్టరీ (2023–2028)' : 'Listed in Telangana State MLA Directory (2023–2028)'}
                  </div>
                </div>
              </div>

              {/* Office Location */}
              <div className="contact-channel-item">
                <div className="contact-icon-bubble">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <div className="contact-detail-title">{t('contact.officeTitle')}</div>
                  <div className="contact-detail-val">{address.line1}, {address.village}</div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--gray-dark)', marginTop: '2px' }}>
                    {address.mandal}, {address.district}, {address.state}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--green-dark)', marginTop: '4px', fontWeight: 600 }}>
                    {t('contact.officeNote')}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="contact-channel-item">
                <div className="contact-icon-bubble">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div style={{ minWidth: 0 }}>
                  <div className="contact-detail-title">{t('contact.emailTitle')}</div>
                  <div className="contact-detail-val" style={{ fontSize: '1rem', wordBreak: 'break-word' }}>
                    {email}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Citizen Representation Intake Form */}
          {showForm && (
            <div id="grievances" className="contact-form-card">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                {t('contact.formHeading')}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--gray)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                {t('contact.formDescription')}
              </p>

              {successMsg && (
                <div style={{ background: '#DCFCE7', color: '#166534', padding: '0.85rem', borderRadius: '8px', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                  ✓ {successMsg}
                </div>
              )}

              {errorMsg && (
                <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '0.85rem', borderRadius: '8px', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                  ✕ {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                      {t('contact.nameLabel')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact.namePlaceholder')}
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border)', borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                      {t('contact.phoneLabel')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('contact.phonePlaceholder')}
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border)', borderRadius: '8px' }}
                    />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                      {t('contact.mandalLabel')}
                    </label>
                    <select
                      name="mandal"
                      value={formData.mandal}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border)', borderRadius: '8px', background: '#FFFFFF' }}
                    >
                      <option value="Bhupalpalle">Bhupalpalle (భూపాలపల్లి)</option>
                      <option value="Ghanpur (Mulug)">Ghanpur (Mulug) (ఘనపూర్)</option>
                      <option value="Regonda">Regonda (రేగొండ)</option>
                      <option value="Shayampet">Shayampet (శాయంపేట)</option>
                      <option value="Chityal">Chityal (చిట్యాల)</option>
                      <option value="Mogullapalle">Mogullapalle (మొగుళ్లపల్లి)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                      {isTelugu ? 'గ్రామం / ఆవాసం' : 'Village / Habitation'}
                    </label>
                    <input
                      type="text"
                      name="village"
                      value={formData.village}
                      onChange={handleChange}
                      placeholder={isTelugu ? 'ఉదా: బుద్ధారం' : 'e.g. Buddharam'}
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border)', borderRadius: '8px' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                    {t('contact.subjectLabel')}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t('contact.subjectPlaceholder')}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border)', borderRadius: '8px' }}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                    {t('contact.messageLabel')}
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.messagePlaceholder')}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border)', borderRadius: '8px', resize: 'vertical' }}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-pill btn-primary"
                  style={{ width: '100%', justifyContent: 'center', cursor: submitting ? 'not-allowed' : 'pointer' }}
                >
                  {submitting ? t('contact.submittingBtn') : t('contact.submitBtn')}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
