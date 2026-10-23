import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { resolveMediaUrl } from '../../services/api';

export default function WorkSpreads({ projects }) {
  const { isTelugu, t } = useLanguage();

  const rawCanal = projects?.find((p) => p.slug?.includes('canal') || p.slug?.includes('ghanapur'));
  const rawTemple = projects?.find((p) => p.slug?.includes('temple') || p.slug?.includes('kotanchu'));

  const featureCanal = {
    title: (isTelugu && rawCanal?.translations?.te?.title)
      ? rawCanal.translations.te.title
      : (rawCanal?.title || (isTelugu ? 'ఘనపూర్ రిజర్వాయర్ పంట కాలువల ఆధునికీకరణ' : 'Ghanapur Reservoir Crop Canals Modernization')),
    summary: (isTelugu && rawCanal?.translations?.te?.summary)
      ? rawCanal.translations.te.summary
      : (rawCanal?.summary || (isTelugu
        ? 'ఘనపూర్ రిజర్వాయర్ పరిధిలోని 4 ప్రధాన పంట కాలువల ఆధునికీకరణ మరియు లైనింగ్ పనుల కోసం ₹31 కోట్లు మంజూరు. దేవాదుల మరియు ఎస్సారెస్పీ కాల్వల ద్వారా 44,000 ఎకరాల రైతులకు సాగునీటి భద్రత.'
        : 'Announced sanction of ₹31 crore for the comprehensive modernization and lining of four major crop canals under the Ghanapur reservoir. Works will safeguard water security for 44,000 acres utilizing Devadula lift irrigation networks and Sriram Sagar Project (SRSP) allocations.')),
    categoryLabel: (isTelugu && rawCanal?.translations?.te?.categoryLabel)
      ? rawCanal.translations.te.categoryLabel
      : (rawCanal?.categoryLabel || (isTelugu ? 'సాగునీటి ఆధునికీకరణ' : 'Irrigation Modernization')),
    amountFormatted: rawCanal?.amountFormatted || (isTelugu ? '₹31 కోట్ల మంజూరు' : '₹31 Crore Sanction'),
    statusNote: (isTelugu && rawCanal?.translations?.te?.statusNote)
      ? rawCanal.translations.te.statusNote
      : (rawCanal?.statusNote || (isTelugu ? 'టెండర్లు ప్రారంభం · 12 నెలల కాలపరిమితి' : 'Tenders initiated · 12-month completion timeframe')),
    mediaUrl: rawCanal?.mediaUrl || '/images/work/irrigation.jpg'
  };

  const featureTemple = {
    title: (isTelugu && rawTemple?.translations?.te?.title)
      ? rawTemple.translations.te.title
      : (rawTemple?.title || (isTelugu ? 'కోటంచ శ్రీ లక్ష్మీ నరసింహ స్వామి ఆలయ అభివృద్ధి' : 'Kotanchu Sri Lakshmi Narasimha Swamy Temple Upgrade')),
    summary: (isTelugu && rawTemple?.translations?.te?.summary)
      ? rawTemple.translations.te.summary
      : (rawTemple?.summary || (isTelugu
        ? 'రేగొండ మండలంలోని ప్రసిద్ధ కోటంచ లక్ష్మీ నరసింహ స్వామి ఆలయ పరిరక్షణ, భక్తుల క్యూ కాంప్లెక్స్, అన్నదాన సత్రాలు మరియు పర్యాటక వసతుల కోసం ₹12.15 కోట్లు మంజూరు.'
        : 'Special development initiative securing ₹12.15 crore for temple conservation, pilgrim queue complexes, dining halls, and tourism amenities at Sri Lakshmi Narasimha Swamy Temple in Kotanchu, Regonda mandal.')),
    categoryLabel: (isTelugu && rawTemple?.translations?.te?.categoryLabel)
      ? rawTemple.translations.te.categoryLabel
      : (rawTemple?.categoryLabel || (isTelugu ? 'ఆధ్యాత్మికం & పర్యాటకం' : 'Heritage & Tourism')),
    amountFormatted: rawTemple?.amountFormatted || (isTelugu ? '₹12.15 కోట్ల మంజూరు' : '₹12.15 Crore Sanction'),
    statusNote: (isTelugu && rawTemple?.translations?.te?.statusNote)
      ? rawTemple.translations.te.statusNote
      : (rawTemple?.statusNote || (isTelugu ? 'నిర్మాణ పనులు పురోగతిలో ఉన్నాయి' : 'Construction progressing · V6 Velugu')),
    mediaUrl: rawTemple?.mediaUrl || '/images/work/temple.jpg'
  };

  const secondaryProjects =
    projects?.filter((p) => p._id !== rawCanal?._id && p._id !== rawTemple?._id).slice(0, 3) || [];

  return (
    <section id="work" className="section bg-off-white">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div>
            <div className="tag-label">
              {isTelugu ? 'మంజూరైన ప్రాజెక్టులు' : 'Documented Initiatives'}
            </div>
            <h2 className="section-title">
              {isTelugu ? 'ప్రజా అభివృద్ధి పనులు & శాసనసభ ఫలితాలు' : 'Public Work & Legislative Action'}
            </h2>
          </div>
          <div>
            <Link to="/work" className="btn-pill btn-secondary">
              {t('common.viewAll')} {t('nav.work')}
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

        <div className="work-editorial-spread">
          {/* Feature Spread 1: Ghanapur Canal */}
          <article className="work-feature-row">
            <div className="work-feature-media">
              <img
                src={resolveMediaUrl(featureCanal.mediaUrl || '/images/work/irrigation.jpg')}
                alt="Ghanapur canal network and lush paddy fields"
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/images/work/irrigation.jpg';
                }}
              />
            </div>
            <div className="work-feature-content">
              <div className="work-meta-tag">
                <span className="tag-label">{featureCanal.categoryLabel}</span>
                <span style={{ fontWeight: 800, color: 'var(--green-dark)' }}>
                  {featureCanal.amountFormatted}
                </span>
              </div>
              <h3 className="work-feature-title">{featureCanal.title}</h3>
              <p className="work-feature-desc">{featureCanal.summary}</p>
              <div className="work-feature-status">
                <strong>{t('common.status')}:</strong> {featureCanal.statusNote}
              </div>
            </div>
          </article>

          {/* Feature Spread 2: Kotanchu Temple */}
          <article className="work-feature-row reverse">
            <div className="work-feature-media">
              <img
                src={resolveMediaUrl(featureTemple.mediaUrl || '/images/work/temple.jpg')}
                alt="Ancient stone temple architecture in Kotanchu"
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/images/work/temple.jpg';
                }}
              />
            </div>
            <div className="work-feature-content">
              <div className="work-meta-tag">
                <span className="tag-label green">{featureTemple.categoryLabel}</span>
                <span style={{ fontWeight: 800, color: 'var(--green-dark)' }}>
                  {featureTemple.amountFormatted}
                </span>
              </div>
              <h3 className="work-feature-title">{featureTemple.title}</h3>
              <p className="work-feature-desc">{featureTemple.summary}</p>
              <div className="work-feature-status">
                <strong>{t('common.status')}:</strong> {featureTemple.statusNote}
              </div>
            </div>
          </article>
        </div>

        {/* Secondary Work Cards Grid */}
        <div className="work-cards-grid">
          {secondaryProjects.length > 0 ? (
            secondaryProjects.map((proj) => {
              const projTitle = (isTelugu && proj.translations?.te?.title) ? proj.translations.te.title : proj.title;
              const projSummary = (isTelugu && proj.translations?.te?.summary) ? proj.translations.te.summary : proj.summary;
              const projCategory = (isTelugu && proj.translations?.te?.categoryLabel) ? proj.translations.te.categoryLabel : (proj.categoryLabel || 'Public Welfare');
              const projAction = (isTelugu && proj.translations?.te?.representativeAction) ? proj.translations.te.representativeAction : (proj.representativeAction || 'Documented Initiative');

              return (
                <article key={proj._id} className="work-card">
                  <div className="work-card-media">
                    <img
                      src={resolveMediaUrl(proj.mediaUrl || '/images/work/landscape.jpg')}
                      alt={projTitle}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '/images/work/landscape.jpg';
                      }}
                    />
                    <span className="work-card-pill">{projCategory}</span>
                  </div>
                  <div className="work-card-content">
                    <div className="work-meta-row">
                      <span>{proj.amountFormatted || (isTelugu ? 'ప్రభుత్వ మంజూరు' : 'State Sanction')}</span>
                      <span>{proj.mandal || (isTelugu ? 'భూపాలపల్లి' : 'Bhupalpalle')}</span>
                    </div>
                    <h3 className="work-title">{projTitle}</h3>
                    <p className="work-text">{projSummary}</p>
                    <div className="work-attribution">
                      {t('works.actionTaken')}: {projAction}
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <>
              <article className="work-card">
                <div className="work-card-media">
                  <img src="/images/work/housing.jpg" alt="Indiramma housing residential units" loading="lazy" />
                  <span className="work-card-pill">
                    {isTelugu ? 'ఇందిరమ్మ ఇళ్ళు' : 'Housing & Welfare'}
                  </span>
                </div>
                <div className="work-card-content">
                  <div className="work-meta-row">
                    <span>{isTelugu ? 'నిరంతర పరిశీలన' : 'Field Review'}</span>
                    <span>{isTelugu ? 'భూపాలపల్లి' : 'Bhupalpally'}</span>
                  </div>
                  <h3 className="work-title">
                    {isTelugu ? 'ఇందిరమ్మ ఇళ్ళ నిర్మాణ పురోగతి సమీక్ష' : 'Indiramma Housing Monitoring'}
                  </h3>
                  <p className="work-text">
                    {isTelugu
                      ? 'అర్హులైన పేద కుటుంబాలకు పారదర్శకంగా ఇందిరమ్మ ఇళ్ళ నిర్మాణాలు వేగవంతం చేయాలని అధికారులతో సమీక్షా సమావేశాలు.'
                      : 'Convened departmental review meetings directing officials to accelerate construction timelines and ensure transparent delivery of housing.'}
                  </p>
                  <div className="work-attribution">
                    {t('works.actionTaken')}: {isTelugu ? 'క్షేత్రస్థాయి సమీక్ష & అధికారుల ఆదేశాలు' : 'Directed officials & reviewed execution'}
                  </div>
                </div>
              </article>

              <article className="work-card">
                <div className="work-card-media">
                  <img src="/images/work/landscape.jpg" alt="Chityal bus station and rural roads" loading="lazy" />
                  <span className="work-card-pill">
                    {isTelugu ? 'రవాణా & రహదారులు' : 'Transit & Roads'}
                  </span>
                </div>
                <div className="work-card-content">
                  <div className="work-meta-row">
                    <span>{isTelugu ? '₹3.75 కోట్లు' : '₹3.75 Crore'}</span>
                    <span>{isTelugu ? 'చిట్యాల' : 'Chityal'}</span>
                  </div>
                  <h3 className="work-title">
                    {isTelugu ? 'చిట్యాల అత్యాధునిక బస్ స్టేషన్ & బీటీ రోడ్లు' : 'Chityal Bus Station & BT Roads'}
                  </h3>
                  <p className="work-text">
                    {isTelugu
                      ? 'చిట్యాలలో ₹3.75 కోట్ల ఆధునిక బస్ టెర్మినస్‌కు శంకుస్థాపన, మరియు వ్యవసాయ మార్కెట్లను కలిపే ₹4.16 కోట్ల గ్రామీణ బీటీ రోడ్ల నిర్మాణం.'
                      : 'Laid foundation stone for ₹3.75 crore modern bus terminus in Chityal alongside District Collector, following ₹4.16 crore rural BT road projects.'}
                  </p>
                  <div className="work-attribution">
                    {t('works.actionTaken')}: {isTelugu ? 'శంకుస్థాపన & నిధుల మంజూరు' : 'Foundation stone laying'}
                  </div>
                </div>
              </article>

              <article className="work-card">
                <div className="work-card-media">
                  <img src="/images/work/landscape.jpg" alt="33/11 KV electrical substation infrastructure" loading="lazy" />
                  <span className="work-card-pill">
                    {isTelugu ? 'విద్యుత్ & వ్యవసాయం' : 'Energy & Agriculture'}
                  </span>
                </div>
                <div className="work-card-content">
                  <div className="work-meta-row">
                    <span>{isTelugu ? '₹6 కోట్లు (ఒక్కొక్కటి ₹2 కోట్లు)' : '₹6 Crore Total'}</span>
                    <span>{isTelugu ? 'మంజునగర్ & నవాబుపేట' : 'Manjunagar & Nawabupeta'}</span>
                  </div>
                  <h3 className="work-title">
                    {isTelugu ? 'మూడు 33/11 కేవీ విద్యుత్ సబ్‌స్టేషన్ల ప్రారంభం' : 'Three 33/11 KV Sub-stations'}
                  </h3>
                  <p className="work-text">
                    {isTelugu
                      ? 'ఉప ముఖ్యమంత్రి భట్టి విక్రమార్క గారితో కలిసి ₹6 కోట్ల వ్యయంతో నిర్మించిన మూడు 33/11 కేవీ విద్యుత్ సబ్‌స్టేషన్లు ప్రారంభం.'
                      : 'Inaugurated three 33/11 KV power sub-stations (₹2 crore each) with Deputy CM Bhatti Vikramarka, stabilizing agricultural and domestic feeder supply.'}
                  </p>
                  <div className="work-attribution">
                    {t('works.actionTaken')}: {isTelugu ? 'ఉప ముఖ్యమంత్రితో కలిసి ప్రారంభం' : 'Inaugurated with Deputy CM'}
                  </div>
                </div>
              </article>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
