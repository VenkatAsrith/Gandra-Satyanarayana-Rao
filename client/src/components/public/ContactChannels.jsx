import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

export default function ContactChannels({ settings }) {
  const { isTelugu } = useLanguage();

  const phone = settings?.officialPhone || '9849051228';
  const email = settings?.officialEmail || 'gandra.satyanarayanarao@gmail.com';
  const address = settings?.officeAddress || {
    line1: 'H.No: 3-12',
    village: 'Buddharam Village',
    mandal: 'Ghanapuram Mandal',
    district: 'Jayashankar Bhupalpally',
    state: 'Telangana'
  };

  return (
    <section id="contact" className="section bg-off-white">
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="tag-label">
            {isTelugu ? 'ప్రజా సంబంధాలు & క్యాంపు కార్యాలయం' : 'People-Connect & Constituent Services'}
          </div>
          <h2 className="section-title">
            {isTelugu ? 'క్యాంపు కార్యాలయం & సంప్రదింపు మార్గాలు' : 'Camp Office & Constituency Channels'}
          </h2>
          <p className="section-subtitle" style={{ marginTop: '0.75rem', maxWidth: '780px' }}>
            {isTelugu
              ? 'భూపాలపల్లి నియోజకవర్గ ప్రజల సమస్యల పరిష్కారానికై బుద్ధారం క్యాంపు కార్యాలయంలో నిరంతరం ప్రజా దర్బార్ మరియు శాసనసభ అధికారిక సంప్రదింపు వేదిక.'
              : 'Direct access to Gandra Satyanarayana Rao (Sathenna) through the Buddharam Camp Office open Praja Darbar and official legislative contact channels.'}
          </p>
        </div>

        {/* Layout H: People-Connect Bento Cards (4 distinct actionable cards) */}
        <div className="people-bento-grid">
          {/* Card 1: Camp Office & Praja Darbar */}
          <div className="people-bento-card bento-office">
            <div className="bento-badge-row">
              <span className="bento-pill green">
                {isTelugu ? 'ప్రజా దర్బార్' : 'Open Praja Darbar'}
              </span>
              <span className="bento-status-indicator">
                <span className="status-dot"></span>
                {isTelugu ? 'సోమవారం & బుధవారం' : 'Mon & Wed 9:30 AM'}
              </span>
            </div>
            <div className="bento-icon-frame">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h3 className="bento-card-title">
              {isTelugu ? 'బుద్ధారం క్యాంపు కార్యాలయం' : 'Buddharam Camp Office'}
            </h3>
            <p className="bento-card-desc">
              {address.line1}, {address.village}, {address.mandal}, {address.district}. {isTelugu ? 'ప్రత్యక్ష ప్రజా విచారణ మరియు అధికారులతో తక్షణ సమస్య పరిష్కారం.' : 'Direct public interaction for on-the-spot resolution with administrative nodal officers.'}
            </p>
            <div className="bento-card-footer">
              <a href={`tel:${phone}`} className="bento-link">
                <span>{isTelugu ? 'కార్యాలయానికి కాల్ చేయండి' : 'Call Camp Office'}</span>
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Card 2: Representation Protocol */}
          <div className="people-bento-card bento-grievance">
            <div className="bento-badge-row">
              <span className="bento-pill orange">
                {isTelugu ? 'ప్రజా సమస్యల పరిష్కారం' : 'Direct Redressal'}
              </span>
            </div>
            <div className="bento-icon-frame">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h3 className="bento-card-title">
              {isTelugu ? 'వినతుల సమర్పణ పద్ధతి' : 'Grievance Submission Desk'}
            </h3>
            <p className="bento-card-desc">
              {isTelugu
                ? 'వ్యవసాయం, సాగునీరు, రోడ్లు, ఇందిరమ్మ ఇళ్ళు లేదా స్థానిక సమస్యలపై రాతపూర్వక వినతులను నేరుగా క్యాంపు కార్యాలయంలో లేదా అధికారిక ఈమెయిల్ ద్వారా సమర్పించవచ్చు.'
                : 'Submit written constituent representations directly during Praja Darbar or dispatch scanned petitions to the official email for legislative follow-up.'}
            </p>
            <div className="bento-card-footer">
              <a href={`mailto:${email}?subject=Constituent%20Representation%20-%20Bhupalpalle`} className="bento-link">
                <span>{isTelugu ? 'వినతి పంపండి' : 'Dispatch Representation'}</span>
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Card 3: MLA Direct Hotline & Official Directory */}
          <div className="people-bento-card bento-helpline">
            <div className="bento-badge-row">
              <span className="bento-pill">
                {isTelugu ? 'శాసనసభ డైరెక్టరీ' : 'Official Hotline'}
              </span>
            </div>
            <div className="bento-icon-frame">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <h3 className="bento-card-title">
              {phone}
            </h3>
            <p className="bento-card-desc">
              {email}<br />
              {isTelugu ? 'తెలంగాణ శాసనసభ అధికారిక గెజిట్ (2023–2028) ద్వారా ధృవీకరించబడిన సంప్రదింపు వివరాలు.' : 'Direct telephone & email listed in the Telangana Legislative Assembly 2023–2028 official directory.'}
            </p>
            <div className="bento-card-footer">
              <a href={`mailto:${email}`} className="bento-link">
                <span>{isTelugu ? 'ఇమెయిల్ పంపండి' : 'Send Official Email'}</span>
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Card 4: Constituency Demographics */}
          <div className="people-bento-card bento-constituency">
            <div className="bento-badge-row">
              <span className="bento-pill">
                {isTelugu ? 'నియోజకవర్గం 108' : 'AC No. 108'}
              </span>
            </div>
            <div className="bento-icon-frame">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
            </div>
            <h3 className="bento-card-title">
              {isTelugu ? '6 మండలాలు · 2,63,948 ఓటర్లు' : '6 Mandals · 263,948 Electors'}
            </h3>
            <p className="bento-card-desc">
              {isTelugu
                ? 'భూపాలపల్లి, ఘనపూర్, రేగొండ, శాయంపేట, చిట్యాల, మొగుళ్లపల్లి మండలాల ప్రజల సేవల సమగ్ర సమాచారం.'
                : 'Demographic profiles, revenue mandal jurisdictions, and local grievance officers for Bhupalpalle AC.'}
            </p>
            <div className="bento-card-footer">
              <Link to="/constituency" className="bento-link">
                <span>{isTelugu ? 'నియోజకవర్గ వివరాలు' : 'Explore Constituency'}</span>
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Camp Office Visiting Protocol Card */}
        <div className="camp-protocol-banner">
          <div className="camp-protocol-inner">
            <div className="protocol-icon-col">
              <div className="protocol-seal">
                <img src="/images/party-symbol.png" alt="Indian National Congress Emblem" />
              </div>
            </div>
            <div className="protocol-text-col">
              <h3 className="protocol-title">
                {isTelugu
                  ? 'క్యాంపు కార్యాలయ ప్రజా దర్శన నిబంధనలు'
                  : 'Constituent Visiting Hours & Praja Darbar Protocol'}
              </h3>
              <p className="protocol-desc">
                {isTelugu
                  ? 'బుద్ధారం క్యాంపు కార్యాలయంలో ప్రతి సోమవారం మరియు బుధవారం ఉదయం 9:30 గంటల నుండి శ్రీ గండ్ర సత్యనారాయణ రావు గారు ప్రత్యక్షంగా ప్రజల నుండి వినతులు స్వీకరిస్తారు. సంబంధిత మండలాల తహశీల్దార్లు, నీటిపారుదల మరియు విద్యుత్ శాఖ అధికారులు కూడా సమన్వయం చేస్తారు.'
                  : 'Constituents may attend the weekly Praja Darbar at the Buddharam Camp Office every Monday and Wednesday starting at 9:30 AM to submit petitions directly to Sri Gandra Satyanarayana Rao. Revenue and public works nodal officers remain present for expedited administrative action.'}
              </p>
              <div className="protocol-badges-strip">
                <span className="proto-badge">📍 {address.village}, {address.mandal}</span>
                <span className="proto-badge">⏰ {isTelugu ? 'ఉదయం 9:30 నుండి' : 'From 9:30 AM'}</span>
                <span className="proto-badge">📞 {phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
