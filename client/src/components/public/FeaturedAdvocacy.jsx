import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { resolveMediaUrl } from '../../services/api';

export default function FeaturedAdvocacy({ activity }) {
  const { isTelugu, t } = useLanguage();

  const title = isTelugu
    ? (activity?.translations?.te?.title || 'సింగరేణి బొగ్గు గని కార్మికులు & భూ నిర్వాసిత కుటుంబాలకై శాసనసభలో పోరాటం')
    : (activity?.title || 'Advocacy for Singareni Coal Miners & Displaced Families');

  const summary = isTelugu
    ? (activity?.translations?.te?.summary ||
        'తెలంగాణ శాసనసభ సమావేశాల్లో గండ్ర సత్యనారాయణ రావు గారు సింగరేణి కార్మికుల దీర్ఘకాలిక సమస్యలను లేవనెత్తారు. భూ నిర్వాసితులకు మెరుగైన పునరావాస ప్యాకేజీలు, రిటైర్డ్ ఉద్యోగులకు కార్పొరేట్ వైద్య భద్రత, కాంట్రాక్ట్ కార్మికులకు న్యాయమైన వేతనాల అమలుకై ప్రభుత్వంపై ఒత్తిడి తెచ్చారు.')
    : (activity?.summary ||
        'During the Telangana Legislative Assembly session, Gandra Satyanarayana Rao forcefully raised the long-standing welfare concerns of Singareni Collieries workers, seeking comprehensive rehabilitation packages for land-displaced families, medical security for retired employees, and fair terms for contract laborers.');

  const categoryLabel = isTelugu
    ? 'ప్రధాన శాసనసభ ప్రసంగం · సెప్టెంబర్ 18, 2026'
    : (activity?.categoryLabel || 'Assembly Intervention · September 18, 2026');

  const mediaUrl = resolveMediaUrl(activity?.mediaUrl || '/images/events/public-address.png');

  return (
    <section className="section">
      <div className="container">
        <div className="featured-banner">
          <div className="featured-grid">
            <div className="featured-content">
              <div className="featured-meta-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                {categoryLabel}
              </div>
              <h2 className="featured-title">{title}</h2>
              <p className="featured-desc">{summary}</p>
              <div>
                <Link to="/work" className="btn-pill btn-dark">
                  {isTelugu ? 'శాసనసభ రికార్డులను వీక్షించండి' : 'Read Legislative Interventions'}
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <div className="featured-img-frame">
                <img
                  src={mediaUrl}
                  alt={title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/images/events/public-address.png';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
