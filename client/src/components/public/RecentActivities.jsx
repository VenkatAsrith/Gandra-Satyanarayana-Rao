import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

export default function RecentActivities({ activities }) {
  const { isTelugu, t, formatDate } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const defaultActivities = [
    {
      _id: 'act-1',
      formattedDate: isTelugu ? '21 సెప్టెంబర్, 2026' : 'Sep 21, 2026',
      activityDate: '2026-09-21',
      category: 'civic',
      categoryLabel: isTelugu ? 'సంస్మరణ ప్రసంగం' : 'Memorial Address',
      title: isTelugu ? 'ఆచార్య కొండా లక్ష్మణ్ బాపూజీ జయంతి సంస్మరణ సభ' : 'Konda Laxman Bapuji Memorial Commemoration',
      location: isTelugu ? 'భూపాలపల్లి అర్బన్ · ముఖ్య అతిథిగా సంస్మరణ ప్రసంగం' : 'Bhupalpally Urban · Chief Guest & Memorial Address',
      summary: isTelugu
        ? 'తెలంగాణ తొలితరం విముక్తి యోధుడు, స్వాతంత్ర్య సమరయోధుడు ఆచార్య కొండా లక్ష్మణ్ బాపూజీ జయంతి సందర్భంగా ముఖ్య అతిథిగా పాల్గొని ఘనంగా నివాళులర్పించారు.'
        : 'Participated as Chief Guest paying tribute to freedom fighter and Telangana stalwart Acharya Konda Laxman Bapuji, emphasizing rural empowerment.',
      sourceLabel: isTelugu ? 'జిల్లా సమాచార పౌరసంబంధాల శాఖ' : 'District Information Office'
    },
    {
      _id: 'act-2',
      formattedDate: isTelugu ? '20 సెప్టెంబర్, 2026' : 'Sep 20, 2026',
      activityDate: '2026-09-20',
      category: 'civic',
      categoryLabel: isTelugu ? 'విద్యా సమ్మేళనం' : 'Civic Recognition',
      title: isTelugu ? 'నియోజకవర్గ ఉపాధ్యాయులు & విద్యావేత్తల సన్మానం' : 'Constituency Educators & Teachers Recognition',
      location: isTelugu ? 'భూపాలపల్లి · గ్రామీణ విద్యా వికాసంలో ఉపాధ్యాయుల పాత్ర' : 'Bhupalpally · Role of teachers in civic foundation',
      summary: isTelugu
        ? 'గ్రామీణ విద్యాభివృద్ధిలో ఉపాధ్యాయుల పాత్ర అత్యంత కీలకమని కొనియాడుతూ, నియోజకవర్గ ఉత్తమ ఉపాధ్యాయులను శాలువాలతో ఘనంగా సత్కరించారు.'
        : 'Addressed local school teachers and educational leaders on the indispensable role of primary and secondary schooling in rural transformation.',
      sourceLabel: isTelugu ? 'ఎమ్మెల్యే మీడియా విభాగం' : 'Constituency Media Desk'
    },
    {
      _id: 'act-3',
      formattedDate: isTelugu ? '18 సెప్టెంబర్, 2026' : 'Sep 18, 2026',
      activityDate: '2026-09-18',
      category: 'legislative',
      categoryLabel: isTelugu ? 'శాసనసభ ప్రసంగం' : 'Assembly Intervention',
      title: isTelugu ? 'సింగరేణి బొగ్గు గని కార్మికులు & భూ నిర్వాసిత కుటుంబాలకై శాసనసభలో పోరాటం' : 'Advocacy for Singareni Coal Miners & Displaced Families',
      location: isTelugu ? 'తెలంగాణ శాసనసభ వేదిక · జీరో అవర్ చర్చ' : 'Telangana Legislative Assembly · Zero Hour',
      summary: isTelugu
        ? 'తెలంగాణ శాసనసభ సమావేశాల్లో గండ్ర సత్యనారాయణ రావు గారు సింగరేణి కార్మికుల దీర్ఘకాలిక సమస్యలను లేవనెత్తారు. భూ నిర్వాసితులకు మెరుగైన పునరావాస ప్యాకేజీలు, రిటైర్డ్ ఉద్యోగులకు కార్పొరేట్ వైద్య భద్రతకై డిమాండ్ చేశారు.'
        : 'During the Telangana Legislative Assembly session, forcefully raised the long-standing welfare concerns of Singareni Collieries workers and displaced families.',
      sourceLabel: isTelugu ? 'అసెంబ్లీ హన్సార్డ్ రికార్డు & ఆంధ్రప్రభ' : 'Assembly Hansard & Andhra Prabha'
    },
    {
      _id: 'act-4',
      formattedDate: isTelugu ? '16 సెప్టెంబర్, 2026' : 'Sep 16, 2026',
      activityDate: '2026-09-16',
      category: 'agriculture',
      categoryLabel: isTelugu ? 'శాసనసభ ప్రశ్న' : 'Legislative Question',
      title: isTelugu ? 'రైతాంగానికి కోల్డ్ స్టోరేజ్ & ఆయిల్ పామ్ సబ్సిడీలకై అసెంబ్లీలో డిమాండ్' : 'Legislative Assembly Demand for Agricultural Cold Storage',
      location: isTelugu ? 'తెలంగాణ శాసనసభ · వ్యవసాయ శాఖ డిమాండ్లు' : 'Telangana Assembly · Agriculture Demands',
      summary: isTelugu
        ? 'కూరగాయల రైతులు దళారుల బారిన పడకుండా భూపాలపల్లిలో కోల్డ్ స్టోరేజ్ యూనిట్లు ఏర్పాటు చేయాలని, అలాగే ఆయిల్ పామ్ రైతులకు సబ్సిడీలను పెంచాలని శాసనసభలో డిమాండ్ చేశారు.'
        : 'Advocated on the floor of the Assembly for cold storage facilities in Bhupalpalle to protect vegetable farmers from distress sales, while requesting government subsidies.',
      sourceLabel: isTelugu ? 'శాసనసభ ప్రొసీడింగ్స్' : 'Assembly Hansard'
    },
    {
      _id: 'act-5',
      formattedDate: isTelugu ? '07 ఆగస్టు, 2026' : 'Aug 07, 2026',
      activityDate: '2026-08-07',
      category: 'infrastructure',
      categoryLabel: isTelugu ? 'క్షేత్రస్థాయి పరిశీలన' : 'On-site Inspection',
      title: isTelugu ? 'చలివాగు ప్రాజెక్టు నీటిమట్టాల పరిశీలన & అక్రమ నీటి తరలింపు నిరోధం' : 'Chalivagu Project Water Level Inspection & Stand',
      location: isTelugu ? 'చలివాగు ప్రాజెక్ట్ ఆయకట్టు · ఘనపూర్' : 'Chalivagu Project · Ghanapur',
      summary: isTelugu
        ? 'చలివాగు రిజర్వాయర్ నీటిమట్టాలను స్వయంగా పరిశీలించి, స్థానిక ఆయకట్టు రైతుల ప్రయోజనాలను కాపాడేందుకు అక్రమ నీటి మళ్లింపులను అడ్డుకోవాలని అధికారులను హెచ్చరించారు.'
        : 'Monitored water retention levels at Chalivagu project and warned against unauthorized water diversion to safeguard irrigation for farmers across local command areas.',
      sourceLabel: isTelugu ? 'నమస్తే తెలంగాణ & సాక్షి' : 'Namasthe Telangana & Sakshi'
    }
  ];

  const rawItems = activities && activities.length ? activities : defaultActivities;

  const categories = [
    { key: 'all', label: isTelugu ? 'అన్ని కార్యక్రమాలు' : 'All Activities' },
    { key: 'legislative', label: isTelugu ? 'శాసనసభ వేదిక' : 'Legislative Floor' },
    { key: 'agriculture', label: isTelugu ? 'రైతు & వ్యవసాయం' : 'Agriculture & Irrigation' },
    { key: 'civic', label: isTelugu ? 'ప్రజా సమ్మేళనాలు' : 'Civic Engagements' },
    { key: 'infrastructure', label: isTelugu ? 'క్షేత్ర పరిశీలనలు' : 'Field Inspections' }
  ];

  const filteredItems = rawItems.filter((act) => {
    if (selectedCategory === 'all') return true;
    return act.category === selectedCategory;
  });

  return (
    <section className="section bg-off-white activities-chronology-section">
      <div className="container">
        {/* Section Header */}
        <div className="activities-header-group">
          <div className="tag-label green">
            <span className="live-pulse-dot" aria-hidden="true"></span>
            {isTelugu ? 'కార్యక్రమాల కాలక్రమం' : 'Documented Chronology'}
          </div>
          <h2 className="section-title">
            {isTelugu ? 'ధృవీకరించబడిన ప్రజా కార్యక్రమాలు' : 'Documented Public Activities'}
          </h2>
          <p className="section-subtitle">
            {isTelugu
              ? 'నియోజకవర్గ సమీక్షలు, శంకుస్థాపనలు, శాసనసభ ప్రశ్నలు మరియు ప్రజా సమావేశాల కాలక్రమ రికార్డు.'
              : 'Verified chronological ledger of legislative interventions, constituency reviews, and grassroots assemblies.'}
          </p>
        </div>

        {/* Time-Based Category Filter Bar */}
        <div className="activity-filter-bar" role="tablist" aria-label="Filter activities by category">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat.key}
              className={`activity-filter-pill ${selectedCategory === cat.key ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Animated Chronological Timeline Container */}
        <div className="activity-timeline-wrapper">
          {/* Central animated vertical line */}
          <div className="activity-timeline-line" aria-hidden="true">
            <div className="activity-timeline-line-glow"></div>
          </div>

          <div className="activity-timeline-items">
            {filteredItems.map((act, index) => {
              const dateStr = act.activityDate
                ? formatDate(act.activityDate)
                : act.formattedDate || (isTelugu ? 'ఇటీవల' : 'Recent');

              const title = (isTelugu && act.translations?.te?.title) ? act.translations.te.title : act.title;
              const location = (isTelugu && act.translations?.te?.location) ? act.translations.te.location : act.location;
              const summary = (isTelugu && act.translations?.te?.summary) ? act.translations.te.summary : (act.summary || '');
              const categoryLabel = (isTelugu && act.translations?.te?.categoryLabel) ? act.translations.te.categoryLabel : (act.categoryLabel || act.category);
              const sourceLabel = (isTelugu && act.translations?.te?.sourceLabel) ? act.translations.te.sourceLabel : (act.sourceLabel || 'Official Record');

              const isLatest = index === 0;

              return (
                <div
                  key={act._id || index}
                  className={`activity-timeline-row ${isLatest ? 'is-latest' : ''}`}
                  style={{ animationDelay: `${index * 0.12}s` }}
                >
                  {/* Left Column: Animated Time Node & Date Pill */}
                  <div className="activity-time-column">
                    <div className="activity-time-badge">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>{dateStr}</span>
                    </div>

                    {isLatest && (
                      <span className="activity-latest-pill">
                        {isTelugu ? 'ఇటీవలి కార్యక్రమం' : 'Latest Entry'}
                      </span>
                    )}

                    {/* Timeline Node Point with Glowing Rings */}
                    <div className="activity-timeline-node" aria-hidden="true">
                      <div className="activity-node-core"></div>
                      <div className="activity-node-halo"></div>
                    </div>
                  </div>

                  {/* Right Column: Editorial Activity Card */}
                  <div className="activity-card-editorial">
                    <div className="activity-card-top">
                      <span className="activity-cat-tag">
                        {categoryLabel}
                      </span>
                      <span className="activity-location-tag">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        {location}
                      </span>
                    </div>

                    <h3 className="activity-card-title">{title}</h3>

                    {summary && (
                      <p className="activity-card-desc">{summary}</p>
                    )}

                    <div className="activity-card-footer">
                      <span className="activity-source-cite">
                        <strong>{isTelugu ? 'ఆధార మూలం:' : 'Source:'}</strong> {sourceLabel}
                      </span>

                      <Link
                        to="/work"
                        className="activity-action-btn"
                        aria-label={`View documentation for ${title}`}
                      >
                        <span>{isTelugu ? 'వివరాలు చూడండి' : 'View Hansard Record'}</span>
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {filteredItems.length === 0 && (
          <div className="activity-empty-state">
            <p>{t('common.emptyList')}</p>
          </div>
        )}
      </div>
    </section>
  );
}
