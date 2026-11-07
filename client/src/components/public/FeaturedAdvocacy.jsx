import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

export default function FeaturedAdvocacy() {
  const { isTelugu } = useLanguage();

  return (
    <section className="section irrigation-priority-section" id="irrigation-priority" aria-label="Priority Irrigation Initiative">
      <div className="container">
        {/* Section Header */}
        <div className="irrigation-section-header">
          <div className="tag-label green">
            {isTelugu ? 'ప్రాధాన్యత ప్రణాళిక · సాగునీటి ప్రాధాన్యత' : 'Priority Initiative · సాగునీటి ప్రాధాన్యత'}
          </div>
          <h2 className="section-title" style={{ marginTop: '0.65rem' }}>
            {isTelugu
              ? 'ప్రతి ఎకరాకూ సాగునీరు: దేవాదుల & ఘనపూర్ కాల్వల ఆధునీకరణ'
              : 'Safeguarding Every Acre: Devadula & Ghanapur Irrigation Networks'}
          </h2>
          <p className="section-subtitle" style={{ marginTop: '0.5rem' }}>
            {isTelugu
              ? 'చివరి ఆయకట్టు వరకు నిరంతరాయంగా సాగునీరు అందించేందుకు గండ్ర సత్యనారాయణ రావు (సత్తన్న) చేసిన రాజీలేని శాసనసభ కృషి.'
              : 'Uncompromising legislative push to ensure dependable canal water reaching tail-end agricultural fields.'}
          </p>
        </div>

        {/* Unified Editorial Showcase Card */}
        <div className="irrigation-showcase-card">
          <div className="irrigation-showcase-grid">
            {/* Visual Column */}
            <div className="irrigation-showcase-visual">
              <div className="irrigation-showcase-frame">
                <img
                  src="/images/work/irrigation.jpg"
                  alt="Ghanapur reservoir canals modernization in Bhupalpalle"
                  loading="lazy"
                  className="irrigation-showcase-img"
                  onError={(e) => {
                    e.target.src = '/images/work/landscape.jpg';
                  }}
                />
                <div className="irrigation-frame-badge">
                  <span>AC 108 Command Area · Ghanapur</span>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="irrigation-showcase-content">
              <h3 className="irrigation-content-heading">
                {isTelugu
                  ? 'రూ. 31 కోట్ల వ్యయంతో 4 ప్రధాన పంట కాల్వల పునరుద్ధరణ'
                  : '₹31 Crore Sanctioned for 4 Major Crop Canals'}
              </h3>

              <p className="irrigation-content-desc">
                {isTelugu
                  ? 'రాష్ట్ర నీటిపారుదల శాఖ ఉన్నతాధికారులతో సమన్వయం సాధించి, ఘనపూర్ రిజర్వాయర్ పరిధిలోని 4 ప్రధాన పంట కాల్వల ఆధునీకరణకు ₹31 కోట్లు మంజూరు చేయించారు. జే. చొక్కారావు దేవాదుల లిఫ్ట్ ఇరిగేషన్ స్కీమ్ మరియు శ్రీరాం సాగర్ ప్రాజెక్ట్ (SRSP) ఫీడర్ కాలువల ద్వారా ఘనపూర్, రేగొండ, మొగుళ్లపల్లి మండలాల్లోని 44,000 కంటే ఎక్కువ ఆయకట్టు ఎకరాలకు సాగునీటి భద్రత చేకూరింది.'
                  : 'Through coordinated representation with state irrigation authorities, ₹31 Crore has been sanctioned for modernizing the 4 major crop canals under Ghanapur reservoir. With direct oversight on the Devadula Lift Irrigation Scheme and Sriram Sagar Project (SRSP) feeders, water distribution is secured for over 44,000 agrarian acres across Ghanapur, Regonda, and Mogullapalle mandals.'}
              </p>

              {/* Data Callout Strip */}
              <div className="irrigation-pills-row">
                <div className="irrigation-stat-pill">
                  <span className="stat-pill-num">₹31 Cr</span>
                  <span className="stat-pill-label">
                    {isTelugu ? 'ప్రభుత్వ మంజూరు' : 'Sanctioned Outlay'}
                  </span>
                </div>

                <div className="irrigation-stat-pill green">
                  <span className="stat-pill-num">44,000+</span>
                  <span className="stat-pill-label">
                    {isTelugu ? 'ఆయకట్టు ఎకరాల రక్షణ' : 'Agrarian Acres Secured'}
                  </span>
                </div>
              </div>

              {/* Mandals List */}
              <div className="irrigation-mandals-info">
                <span className="mandals-info-label">
                  {isTelugu ? 'ప్రధాన ఆయకట్టు మండలాలు:' : 'Key Command Mandals:'}
                </span>
                <span className="mandals-info-list">
                  Ghanpur (Mulug) · Regonda · Mogullapalle
                </span>
              </div>

              {/* Action Button */}
              <div className="irrigation-action-wrap">
                <Link to="/work" className="btn-pill btn-primary">
                  {isTelugu ? 'సాగునీటి ప్రాజెక్టులను వీక్షించండి' : 'Explore Irrigation Projects'} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
