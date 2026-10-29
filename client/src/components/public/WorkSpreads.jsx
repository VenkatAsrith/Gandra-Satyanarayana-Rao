import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { resolveMediaUrl } from '../../services/api';

const DEFAULT_PROJECTS = [
  {
    _id: 'proj-canal',
    slug: 'ghanapur-canal-modernization',
    category: 'agriculture',
    categoryLabel: 'Irrigation Modernization',
    categoryLabelTe: 'సాగునీటి ఆధునికీకరణ',
    title: 'Ghanapur Reservoir Crop Canals Modernization',
    titleTe: 'ఘనపూర్ రిజర్వాయర్ పంట కాలువల ఆధునికీకరణ',
    summary: 'Announced sanction of ₹31 crore for the comprehensive modernization and lining of four major crop canals under the Ghanapur reservoir. Works will safeguard water security for 44,000 acres utilizing Devadula lift irrigation networks and Sriram Sagar Project (SRSP) allocations.',
    summaryTe: 'ఘనపూర్ రిజర్వాయర్ పరిధిలోని 4 ప్రధాన పంట కాలువల ఆధునికీకరణ మరియు లైనింగ్ పనుల కోసం ₹31 కోట్లు మంజూరు. దేవాదుల మరియు ఎస్సారెస్పీ కాల్వల ద్వారా 44,000 ఎకరాల రైతులకు సాగునీటి భద్రత.',
    amountFormatted: '₹31 Crore Sanction',
    amountFormattedTe: '₹31 కోట్ల మంజూరు',
    statusNote: 'Tenders initiated · 12-month completion timeframe',
    statusNoteTe: 'టెండర్లు ప్రారంభం · 12 నెలల కాలపరిమితి',
    representativeAction: 'Secured state government cabinet approval and budgetary allocation',
    representativeActionTe: 'రాష్ట్ర కేబినెట్ ఆమోదం & నిధుల కేటాయింపు సాధించారు',
    mediaUrl: '/images/work/irrigation.jpg',
    mandal: 'Ghanapuram',
    mandalTe: 'ఘనపూర్',
    stats: [
      { val: '₹31 Cr', valTe: '₹31 కోట్లు', lbl: 'Sanction', lblTe: 'మంజూరు నిధులు' },
      { val: '44,000', valTe: '44,000', lbl: 'Acres Irrigated', lblTe: 'సాగునీటి విస్తీర్ణం (ఎకరాలు)' },
      { val: '4 Canals', valTe: '4 కాలువలు', lbl: 'Major Canals', lblTe: 'ప్రధాన పంట కాల్వలు' }
    ]
  },
  {
    _id: 'proj-temple',
    slug: 'kotanchu-temple-restoration',
    category: 'heritage',
    categoryLabel: 'Heritage & Tourism',
    categoryLabelTe: 'ఆధ్యాత్మికం & పర్యాటకం',
    title: 'Kotanchu Sri Lakshmi Narasimha Swamy Temple Upgrade',
    titleTe: 'కోటంచ శ్రీ లక్ష్మీ నరసింహ స్వామి ఆలయ అభివృద్ధి',
    summary: 'Special development initiative securing ₹12.15 crore for temple conservation, pilgrim queue complexes, dining halls, and tourism amenities at Sri Lakshmi Narasimha Swamy Temple in Kotanchu, Regonda mandal.',
    summaryTe: 'రేగొండ మండలంలోని ప్రసిద్ధ కోటంచ లక్ష్మీ నరసింహ స్వామి ఆలయ పరిరక్షణ, భక్తుల క్యూ కాంప్లెక్స్, అన్నదాన సత్రాలు మరియు పర్యాటక వసతుల కోసం ₹12.15 కోట్లు మంజూరు.',
    amountFormatted: '₹12.15 Crore Sanction',
    amountFormattedTe: '₹12.15 కోట్ల మంజూరు',
    statusNote: 'Construction progressing on pilgrim amenities',
    statusNoteTe: 'నిర్మాణ పనులు పురోగతిలో ఉన్నాయి',
    representativeAction: 'Spearheaded proposal to Tourism & Endowments department',
    representativeActionTe: 'దేవాదాయ శాఖ ద్వారా ప్రత్యేక నిధుల మంజూరు సాధించారు',
    mediaUrl: '/images/work/temple.jpg',
    mandal: 'Regonda',
    mandalTe: 'రేగొండ',
    stats: [
      { val: '₹12.15 Cr', valTe: '₹12.15 కోట్లు', lbl: 'Tourism Sanction', lblTe: 'పర్యాటక నిధులు' },
      { val: 'Regonda', valTe: 'రేగొండ', lbl: 'Mandal', lblTe: 'మండలం' }
    ]
  },
  {
    _id: 'proj-housing',
    slug: 'indiramma-housing-monitoring',
    category: 'welfare',
    categoryLabel: 'Housing & Welfare',
    categoryLabelTe: 'సంక్షేమం & గృహనిర్మాణం',
    title: 'Indiramma Housing Scheme Implementation & Monitoring',
    titleTe: 'ఇందిరమ్మ ఇళ్ళ నిర్మాణ పురోగతి క్షేత్రస్థాయి సమీక్ష',
    summary: 'Convened departmental review meetings directing district officials to accelerate construction timelines and ensure transparent delivery of Indiramma residential units to eligible impoverished families.',
    summaryTe: 'అర్హులైన పేద కుటుంబాలకు పారదర్శకంగా ఇందిరమ్మ ఇళ్ళ నిర్మాణాలు వేగవంతం చేయాలని అధికారులతో నిరంతర సమీక్షా సమావేశాలు.',
    amountFormatted: 'State Priority Welfare',
    amountFormattedTe: 'ప్రజా సంక్షేమ ప్రాధాన్యత',
    statusNote: 'Active execution across all 6 mandals',
    statusNoteTe: 'అన్ని 6 మండలాల్లో నిర్మాణ పనులు పురోగతిలో ఉన్నాయి',
    representativeAction: 'Conducted field inspections and grievance hearings for beneficiaries',
    representativeActionTe: 'లబ్ధిదారులతో ప్రత్యక్ష సమావేశాలు & అధికారులకు ఆదేశాలు',
    mediaUrl: '/images/work/housing.jpg',
    mandal: 'Constituency Wide',
    mandalTe: 'నియోజకవర్గవ్యాప్తంగా'
  },
  {
    _id: 'proj-transit',
    slug: 'chityal-bus-station-roads',
    category: 'infrastructure',
    categoryLabel: 'Transit & Roads',
    categoryLabelTe: 'రవాణా & రహదారులు',
    title: 'Chityal Modern Bus Station & Rural BT Roads',
    titleTe: 'చిట్యాల అత్యాధునిక బస్ టెర్మినస్ & గ్రామీణ బీటీ రోడ్లు',
    summary: 'Laid foundation stone for ₹3.75 crore modern bus terminus in Chityal alongside District Collector, following ₹4.16 crore rural BT road projects connecting agricultural markets.',
    summaryTe: 'చిట్యాలలో ₹3.75 కోట్ల అత్యాధునిక బస్ టెర్మినస్‌కు శంకుస్థాపన, మరియు వ్యవసాయ మార్కెట్లను కలిపే ₹4.16 కోట్ల గ్రామీణ బీటీ రోడ్ల నిర్మాణం.',
    amountFormatted: '₹7.91 Crore Total',
    amountFormattedTe: '₹7.91 కోట్ల మొత్తం పనులు',
    statusNote: 'Bus depot foundation laid; civil works active',
    statusNoteTe: 'శంకుస్థాపన పూర్తి · పనులు పురోగతిలో ఉన్నాయి',
    representativeAction: 'Secured TSRTC budget allocation with Transport Ministry',
    representativeActionTe: 'రవాణా శాఖతో సమన్వయం చేసి నిధులు మంజూరు',
    mediaUrl: '/images/work/landscape.jpg',
    mandal: 'Chityal',
    mandalTe: 'చిట్యాల'
  },
  {
    _id: 'proj-substation',
    slug: 'electrical-substations',
    category: 'infrastructure',
    categoryLabel: 'Energy & Power',
    categoryLabelTe: 'విద్యుత్ & మౌలిక వసతులు',
    title: 'Three 33/11 KV Power Sub-stations Commissioned',
    titleTe: 'మూడు 33/11 కేవీ విద్యుత్ సబ్‌స్టేషన్ల ప్రారంభం',
    summary: 'Inaugurated three 33/11 KV power sub-stations (₹2 crore each) with Deputy CM Bhatti Vikramarka, stabilizing agricultural and domestic feeder supply in Manjunagar and Nawabupeta.',
    summaryTe: 'ఉప ముఖ్యమంత్రి భట్టి విక్రమార్క గారితో కలిసి ₹6 కోట్ల వ్యయంతో నిర్మించిన మూడు 33/11 కేవీ విద్యుత్ సబ్‌స్టేషన్లు ప్రారంభం.',
    amountFormatted: '₹6 Crore Total',
    amountFormattedTe: '₹6 కోట్ల వ్యయం',
    statusNote: 'Fully operational & synchronized to grid',
    statusNoteTe: 'ప్రారంభించబడి రైతులకు నిరంతర విద్యుత్ సరఫరా',
    representativeAction: 'Inaugurated alongside Deputy CM & Energy Minister',
    representativeActionTe: 'ఉప ముఖ్యమంత్రి గారితో కలిసి అధికారిక ప్రారంభం',
    mediaUrl: '/images/work/landscape.jpg',
    mandal: 'Manjunagar & Nawabupeta',
    mandalTe: 'మంజునగర్ & నవాబుపేట'
  }
];

export default function WorkSpreads({ projects }) {
  const { isTelugu, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: isTelugu ? 'అన్ని పనులు' : 'All Projects' },
    { id: 'agriculture', label: isTelugu ? 'సాగునీరు & వ్యవసాయం' : 'Irrigation & Farming' },
    { id: 'heritage', label: isTelugu ? 'ఆలయాలు & పర్యాటకం' : 'Heritage & Tourism' },
    { id: 'welfare', label: isTelugu ? 'సంక్షేమం & ఇళ్ళు' : 'Welfare & Housing' },
    { id: 'infrastructure', label: isTelugu ? 'రహదారులు & విద్యుత్' : 'Roads & Energy' }
  ];

  // Merge database projects or fall back to verified default dataset
  const allItems = useMemo(() => {
    if (projects && projects.length > 0) {
      return projects.map((p) => {
        // Find matching defaults to enrich missing stats if needed
        const matched = DEFAULT_PROJECTS.find(
          (d) => d.slug === p.slug || (p.title && p.title.toLowerCase().includes(d.slug.split('-')[0]))
        );
        return {
          ...p,
          category: p.category || matched?.category || 'infrastructure',
          stats: matched?.stats || null
        };
      });
    }
    return DEFAULT_PROJECTS;
  }, [projects]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return allItems;
    return allItems.filter((item) => {
      const cat = (item.category || '').toLowerCase();
      const catLabel = (item.categoryLabel || '').toLowerCase();
      return cat.includes(activeCategory) || catLabel.includes(activeCategory);
    });
  }, [allItems, activeCategory]);

  const leadProject = filteredItems[0] || null;
  const secondaryProjects = filteredItems.slice(1);

  return (
    <section id="work" className="section bg-off-white">
      <div className="container">
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
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

        {/* Horizontal Category Filters (Layout B requirement) */}
        <div className="dev-category-filter-bar" role="tablist" aria-label="Development Categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`dev-filter-chip ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
              {cat.id === 'all' && (
                <span className="dev-chip-count">{allItems.length}</span>
              )}
            </button>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <div className="dev-empty-state">
            <p>{isTelugu ? 'ఈ విభాగంలో ప్రాజెక్టులు లేవు.' : 'No projects found in this category.'}</p>
            <button
              type="button"
              className="btn-pill btn-secondary"
              onClick={() => setActiveCategory('all')}
              style={{ marginTop: '1rem' }}
            >
              {isTelugu ? 'అన్ని పనులు చూడండి' : 'Show All Projects'}
            </button>
          </div>
        ) : (
          <div className="dev-asymmetric-grid">
            {/* Lead Featured Project (Asymmetric Hero Card) */}
            {leadProject && (
              <article className="dev-lead-card">
                <div className="dev-lead-media">
                  <img
                    src={resolveMediaUrl(leadProject.mediaUrl || '/images/work/irrigation.jpg')}
                    alt={isTelugu ? (leadProject.translations?.te?.title || leadProject.titleTe || leadProject.title) : leadProject.title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/images/work/irrigation.jpg';
                    }}
                  />
                  <div className="dev-lead-overlay-badge">
                    <span className="dev-lead-pill">
                      {isTelugu
                        ? (leadProject.translations?.te?.categoryLabel || leadProject.categoryLabelTe || leadProject.categoryLabel)
                        : (leadProject.categoryLabel || 'Key Initiative')}
                    </span>
                    <span className="dev-lead-amount">
                      {isTelugu
                        ? (leadProject.amountFormattedTe || leadProject.amountFormatted || 'ప్రభుత్వ మంజూరు')
                        : (leadProject.amountFormatted || 'State Sanction')}
                    </span>
                  </div>
                </div>

                <div className="dev-lead-content">
                  <div className="dev-lead-meta">
                    <span className="dev-mandal-tag">
                      📍 {isTelugu ? (leadProject.mandalTe || leadProject.mandal || 'భూపాలపల్లి') : (leadProject.mandal || 'Bhupalpalle')}
                    </span>
                    <span className="dev-status-tag">
                      ✓ {isTelugu ? (leadProject.translations?.te?.statusNote || leadProject.statusNoteTe || leadProject.statusNote) : leadProject.statusNote}
                    </span>
                  </div>

                  <h3 className="dev-lead-title">
                    {isTelugu
                      ? (leadProject.translations?.te?.title || leadProject.titleTe || leadProject.title)
                      : leadProject.title}
                  </h3>

                  <p className="dev-lead-desc">
                    {isTelugu
                      ? (leadProject.translations?.te?.summary || leadProject.summaryTe || leadProject.summary)
                      : leadProject.summary}
                  </p>

                  {/* Compact Statistics Strip */}
                  {leadProject.stats && leadProject.stats.length > 0 && (
                    <div className="dev-lead-stats-strip">
                      {leadProject.stats.map((st, i) => (
                        <div key={i} className="dev-lead-stat-item">
                          <span className="dev-stat-number">
                            {isTelugu ? (st.valTe || st.val) : st.val}
                          </span>
                          <span className="dev-stat-label">
                            {isTelugu ? (st.lblTe || st.lbl) : st.lbl}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="dev-lead-action">
                    <div className="dev-action-note">
                      <strong>{t('works.actionTaken')}:</strong>{' '}
                      {isTelugu
                        ? (leadProject.translations?.te?.representativeAction || leadProject.representativeActionTe || leadProject.representativeAction)
                        : leadProject.representativeAction}
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Supporting Masonry Cards */}
            {secondaryProjects.length > 0 && (
              <div className="dev-secondary-grid">
                {secondaryProjects.map((proj) => {
                  const projTitle = isTelugu
                    ? (proj.translations?.te?.title || proj.titleTe || proj.title)
                    : proj.title;
                  const projSummary = isTelugu
                    ? (proj.translations?.te?.summary || proj.summaryTe || proj.summary)
                    : proj.summary;
                  const projCat = isTelugu
                    ? (proj.translations?.te?.categoryLabel || proj.categoryLabelTe || proj.categoryLabel)
                    : (proj.categoryLabel || 'Public Welfare');
                  const projAction = isTelugu
                    ? (proj.translations?.te?.representativeAction || proj.representativeActionTe || proj.representativeAction)
                    : (proj.representativeAction || 'Documented Initiative');
                  const projAmount = isTelugu
                    ? (proj.amountFormattedTe || proj.amountFormatted || 'ప్రభుత్వ మంజూరు')
                    : (proj.amountFormatted || 'State Sanction');
                  const projMandal = isTelugu
                    ? (proj.mandalTe || proj.mandal || 'భూపాలపల్లి')
                    : (proj.mandal || 'Bhupalpalle');

                  return (
                    <article key={proj._id} className="dev-secondary-card">
                      <div className="dev-sec-media">
                        <img
                          src={resolveMediaUrl(proj.mediaUrl || '/images/work/landscape.jpg')}
                          alt={projTitle}
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = '/images/work/landscape.jpg';
                          }}
                        />
                        <span className="dev-sec-pill">{projCat}</span>
                      </div>
                      <div className="dev-sec-content">
                        <div className="dev-sec-meta">
                          <span className="dev-sec-amount">{projAmount}</span>
                          <span className="dev-sec-mandal">{projMandal}</span>
                        </div>
                        <h4 className="dev-sec-title">{projTitle}</h4>
                        <p className="dev-sec-text">{projSummary}</p>
                        <div className="dev-sec-attribution">
                          <strong>{t('works.actionTaken')}:</strong> {projAction}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
