import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

export default function FeaturedAdvocacy() {
  const { isTelugu } = useLanguage();

  return (
    <section className="section irrigation-priority-section" id="irrigation-priority">
      <div className="container">
        {/* Desktop Asymmetric Showcase (Hidden on Mobile) */}
        <div className="irrigation-desktop-showcase">
          <div className="irrigation-header-row">
            <div className="tag-label green">
              {isTelugu ? 'ప్రాధాన్యత ప్రణాళిక · సాగునీటి ప్రాధాన్యత' : 'Priority Initiative · సాగునీటి ప్రాధాన్యత'}
            </div>
            <div className="irrigation-accent-line" aria-hidden="true"></div>
          </div>

          <div className="irrigation-editorial-grid">
            {/* Left Column: Headline & Legislative Mandate */}
            <div className="irrigation-text-col">
              <h2 className="irrigation-main-title">
                {isTelugu
                  ? 'ప్రతి ఎకరాకూ సాగునీరు: దేవాదుల & ఘనపూర్ కాల్వల ఆధునీకరణ'
                  : 'Safeguarding Every Acre: Devadula & Ghanapur Irrigation Networks'}
              </h2>
              <p className="irrigation-lead-summary">
                {isTelugu
                  ? 'చివరి ఆయకట్టు వరకు నిరంతరాయంగా సాగునీరు అందించేందుకు గండ్ర సత్యనారాయణ రావు (సత్తన్న) చేసిన రాజీలేని శాసనసభ కృషి.'
                  : 'Uncompromising legislative push to ensure dependable canal water reaching tail-end agricultural fields.'}
              </p>
              <p className="irrigation-detailed-text">
                {isTelugu
                  ? 'రాష్ట్ర నీటిపారుదల శాఖ ఉన్నతాధికారులతో సమన్వయం సాధించి, ఘనపూర్ రిజర్వాయర్ పరిధిలోని 4 ప్రధాన పంట కాల్వల ఆధునీకరణకు ₹31 కోట్లు మంజూరు చేయించారు. జే. చొక్కారావు దేవాదుల లిఫ్ట్ ఇరిగేషన్ స్కీమ్ మరియు శ్రీరాం సాగర్ ప్రాజెక్ట్ (SRSP) ఫీడర్ కాలువల ద్వారా ఘనపూర్, రేగొండ, మొగుళ్లపల్లి మండలాల్లోని 44,000 కంటే ఎక్కువ ఆయకట్టు ఎకరాలకు సాగునీటి భద్రత చేకూరింది.'
                  : 'Through coordinated representation with state irrigation authorities, ₹31 Crore has been sanctioned for modernizing the 4 major crop canals under Ghanapur reservoir. With direct oversight on the Devadula Lift Irrigation Scheme and Sriram Sagar Project (SRSP) feeders, water distribution is secured for over 44,000 agrarian acres across Ghanapur, Regonda, and Mogullapalle mandals.'}
              </p>

              <div className="irrigation-cta-wrap">
                <Link to="/work" className="btn-pill btn-primary">
                  {isTelugu ? 'సాగునీటి ప్రాజెక్టులను వీక్షించండి' : 'Explore Irrigation Projects'} →
                </Link>
              </div>
            </div>

            {/* Middle Column: Large Authentic Irrigation Photo */}
            <div className="irrigation-media-col">
              <div className="irrigation-media-frame">
                <img
                  src="/images/work/irrigation.jpg"
                  alt="Ghanapur reservoir canals modernization in Bhupalpalle"
                  loading="lazy"
                  className="irrigation-img"
                  onError={(e) => {
                    e.target.src = '/images/work/landscape.jpg';
                  }}
                />
                <div className="irrigation-img-caption">
                  <span className="caption-badge">AC 108 Command Area</span>
                  <span className="caption-text">
                    {isTelugu ? 'ఘనపూర్ రిజర్వాయర్ పంట కాల్వల ఆధునీకరణ' : 'Ghanapur Reservoir & Devadula Lift Feeder Network'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Impact Sanction & Coverage Cards */}
            <div className="irrigation-metrics-col">
              <div className="irrigation-metric-card metric-funds">
                <span className="metric-tag">{isTelugu ? 'ప్రభుత్వ మంజూరు' : 'State Sanction'}</span>
                <div className="metric-giant-num">₹31 Cr</div>
                <div className="metric-label">
                  {isTelugu ? '4 ప్రధాన పంట కాల్వల ఆధునీకరణ' : '4 Major Crop Canals Modernization'}
                </div>
                <p className="metric-subtext">
                  {isTelugu ? 'ఘనపూర్ రిజర్వాయర్ కింద కాంక్రీట్ లైనింగ్ & పూడికతీత పనులు' : 'Canal lining, de-silting, and distribution sluice repairs'}
                </p>
              </div>

              <div className="irrigation-metric-card metric-acres">
                <span className="metric-tag green">{isTelugu ? 'ఆయకట్టు భద్రత' : 'Agrarian Security'}</span>
                <div className="metric-giant-num">44,000+</div>
                <div className="metric-label">
                  {isTelugu ? 'రైతాంగ ఎకరాలకు సాగునీరు' : 'Agrarian Acres Secured'}
                </div>
                <p className="metric-subtext">
                  {isTelugu ? 'ఘనపూర్, రేగొండ, మొగుళ్లపల్లి మండలాల రైతులకు ప్రయోజనం' : 'Direct tail-end water security for Ghanapur, Regonda & Mogullapalle'}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Strip: Mandals In Focus */}
          <div className="irrigation-mandals-strip">
            <span className="strip-title">
              {isTelugu ? 'ప్రయోజనం పొందే ప్రధాన మండలాలు:' : 'Key Beneficiary Mandals:'}
            </span>
            <div className="strip-badges">
              <span className="mandal-pill">🌾 Ghanpur (Mulug)</span>
              <span className="mandal-pill">🌾 Regonda</span>
              <span className="mandal-pill">🌾 Mogullapalle</span>
              <span className="mandal-pill highlight">💧 Devadula & SRSP Networks</span>
            </div>
          </div>
        </div>

        {/* Mobile Dedicated ScrollStack (Hidden on Desktop) */}
        <div className="irrigation-mobile-scrollstack">
          <div className="mobile-section-header">
            <div className="tag-label green">
              {isTelugu ? 'ప్రాధాన్యత ప్రణాళిక' : 'Priority Initiative · సాగునీటి ప్రాధాన్యత'}
            </div>
            <h2 className="mobile-main-title">
              {isTelugu
                ? 'ప్రతి ఎకరాకూ సాగునీరు'
                : 'Safeguarding Every Acre: Devadula & Ghanapur Irrigation'}
            </h2>
          </div>

          <ScrollStack className="irrigation-stack">
            {/* Card 1: Context & Priority */}
            <ScrollStackItem accent="saffron">
              <div className="stack-badge saffron">
                {isTelugu ? 'సాగునీటి భద్రత' : 'Priority Initiative'}
              </div>
              <h3 className="stack-title">
                {isTelugu
                  ? 'చివరి ఆయకట్టు వరకూ నీటిపారుదల హక్కు'
                  : 'Uncompromising Legislative Push for Tail-End Farmers'}
              </h3>
              <p className="stack-desc">
                {isTelugu
                  ? 'భూపాలపల్లి నియోజకవర్గంలో వ్యవసాయానికి జీవనాడి అయిన సాగునీటి ప్రాజెక్టులను సకాలంలో పూర్తి చేయించేందుకు గండ్ర సత్యనారాయణ రావు గారు ప్రత్యేక కార్యాచరణ చేపట్టారు.'
                  : 'Direct oversight and legislative representation to guarantee that every farmer in the tail-end command areas receives reliable canal water during crucial crop stages.'}
              </p>
            </ScrollStackItem>

            {/* Card 2: Headline & Core Project */}
            <ScrollStackItem accent="green">
              <div className="stack-badge green">
                {isTelugu ? 'కాల్వల పునరుద్ధరణ' : 'Canal Network Modernization'}
              </div>
              <h3 className="stack-title">
                {isTelugu
                  ? 'దేవాదుల & ఘనపూర్ రిజర్వాయర్ కాల్వల అనుసంధానం'
                  : 'Safeguarding Every Acre: Devadula & Ghanapur Networks'}
              </h3>
              <p className="stack-desc">
                {isTelugu
                  ? 'జే. చొక్కారావు దేవాదుల ఎత్తిపోతల పథకం మరియు శ్రీరాం సాగర్ ప్రాజెక్ట్ (SRSP) ఫీడర్ కాలువలను ఘనపూర్ రిజర్వాయర్‌తో అనుసంధానించి సాగునీటి నిల్వలను పెంచడం.'
                  : 'Synchronizing Devadula Lift Irrigation Scheme and SRSP feeders to maintain peak reservoir capacities throughout the agrarian season.'}
              </p>
            </ScrollStackItem>

            {/* Card 3: Large Authentic Irrigation Photo */}
            <ScrollStackItem accent="neutral">
              <div className="stack-img-card">
                <img
                  src="/images/work/irrigation.jpg"
                  alt="Irrigation Canal Project in Bhupalpalle"
                  className="stack-photo"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/images/work/landscape.jpg';
                  }}
                />
                <div className="stack-img-overlay">
                  <span className="stack-overlay-pill">🌾 AC 108 Command Area</span>
                  <p className="stack-overlay-text">
                    {isTelugu ? 'ఘనపూర్ రిజర్వాయర్ పంట కాల్వలు' : 'Ghanapur Reservoir Modernization Works'}
                  </p>
                </div>
              </div>
            </ScrollStackItem>

            {/* Card 4: ₹31 Crore Funding Highlight */}
            <ScrollStackItem accent="saffron">
              <div className="stack-stat-box">
                <span className="stat-sub">
                  {isTelugu ? 'రాష్ట్ర ప్రభుత్వం మంజూరు' : 'Sanctioned Investment'}
                </span>
                <div className="stat-val highlight-saffron">₹31 Crore</div>
                <h4 className="stat-heading">
                  {isTelugu ? '4 ప్రధాన పంట కాల్వల సమగ్ర ఆధునీకరణ' : '4 Major Crop Canals Modernization'}
                </h4>
                <p className="stack-desc">
                  {isTelugu
                    ? 'కాలువల కాంక్రీట్ లైనింగ్, పూడికతీత మరియు తూముల మరమ్మతులకు రాష్ట్ర ప్రభుత్వం ద్వారా ₹31 కోట్లు మంజూరు చేయించారు.'
                    : 'Sanctioned for comprehensive canal bed lining, structural strengthening, and distribution sluices under Ghanapur reservoir.'}
                </p>
              </div>
            </ScrollStackItem>

            {/* Card 5: 44,000+ Acre Coverage Highlight */}
            <ScrollStackItem accent="green">
              <div className="stack-stat-box">
                <span className="stat-sub">
                  {isTelugu ? 'రైతాంగ ఆయకట్టు రక్షణ' : 'Agrarian Footprint'}
                </span>
                <div className="stat-val highlight-green">44,000+</div>
                <h4 className="stat-heading">
                  {isTelugu ? 'ఎకరాలకు సాగునీటి భద్రత' : 'Agrarian Acres Water Security'}
                </h4>
                <p className="stack-desc">
                  {isTelugu
                    ? 'వేలాది రైతు కుటుంబాలకు సాగునీటి భరోసా కల్పిస్తూ పంట దిగుబడులకు రక్షణ కల్పించారు.'
                    : 'Ensuring dependable canal water reach to over 44,000 acres, safeguarding crops for thousands of hardworking farming families.'}
                </p>
              </div>
            </ScrollStackItem>

            {/* Card 6: Mandals Information */}
            <ScrollStackItem accent="neutral">
              <div className="stack-badge blue">
                {isTelugu ? 'ప్రయోజనం పొందే మండలాలు' : 'Command Area Mandals'}
              </div>
              <h3 className="stack-title">
                {isTelugu
                  ? 'ఘనపూర్, రేగొండ & మొగుళ్లపల్లి ఆయకట్టు'
                  : 'Ghanapur, Regonda & Mogullapalle Mandals'}
              </h3>
              <p className="stack-desc">
                {isTelugu
                  ? 'ఈ మూడు కీలక మండలాలలోని చెరువులు, కుంటలు మరియు చివరి ఆయకట్టు భూములకు దేవాదుల మరియు ఘనపూర్ నీరు నేరుగా చేరుతుంది.'
                  : 'Canal distributaries directly nourish villages, agricultural command zones, and rejuvenated irrigation tanks across these three key mandals.'}
              </p>
              <div className="stack-tags-row">
                <span className="stack-tag">📍 Ghanpur (Mulug)</span>
                <span className="stack-tag">📍 Regonda</span>
                <span className="stack-tag">📍 Mogullapalle</span>
              </div>
            </ScrollStackItem>

            {/* Card 7: Explore CTA */}
            <ScrollStackItem accent="saffron">
              <div className="stack-cta-card">
                <h3 className="stack-cta-title">
                  {isTelugu
                    ? 'నియోజకవర్గ అభివృద్ధి పనులను పరిశీలించండి'
                    : 'Explore All Irrigation & Development Works'}
                </h3>
                <p className="stack-desc">
                  {isTelugu
                    ? 'భూపాలపల్లి నియోజకవర్గంలో పూర్తయిన మరియు పురోగతిలో ఉన్న అన్ని ప్రాజెక్టుల రికార్డులను వీక్షించండి.'
                    : 'Browse verifiable legislative records, road infrastructure, education facilities, and civic works across AC 108.'}
                </p>
                <Link to="/work" className="btn-pill btn-primary stack-btn">
                  {isTelugu ? 'సాగునీటి ప్రాజెక్టులు వీక్షించండి' : 'Explore Irrigation Projects'} →
                </Link>
              </div>
            </ScrollStackItem>
          </ScrollStack>
        </div>
      </div>
    </section>
  );
}
