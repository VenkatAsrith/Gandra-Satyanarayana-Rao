import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

export default function RecentActivities({ activities }) {
  const { isTelugu, formatDate } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);

  const defaultActivities = [
    {
      _id: 'act-gorukothapalli-2026',
      formattedDate: isTelugu ? '06 నవంబర్, 2026' : 'Nov 06, 2026',
      activityDate: '2026-11-06',
      category: 'welfare',
      categoryLabel: isTelugu ? 'కళ్యాణలక్ష్మి చెక్కుల పంపిణీ' : 'Welfare Cheques Distribution',
      title: isTelugu
        ? 'గోరుకొత్తపల్లి మండలంలో 21 మందికి కళ్యాణలక్ష్మి, షాదీ ముబారక్ చెక్కుల పంపిణీ'
        : 'Distribution of Kalyana Lakshmi & Shaadi Mubarak Cheques to 21 Beneficiaries in Gorukothapalli',
      location: isTelugu ? 'గోరుకొత్తపల్లి మండలం · ప్రజా సమక్షం' : 'Gorukothapalli Mandal · Public Meeting',
      summary: isTelugu
        ? 'గోరుకొత్తపల్లి మండలంలో నిర్వహించిన కార్యక్రమంలో 21 మంది లబ్ధిదారులకు కళ్యాణలక్ష్మి, షాదీ ముబారక్ చెక్కులను ఎమ్మెల్యే శ్రీ గండ్ర సత్యనారాయణ రావు గారు పంపిణీ చేశారు. పేద కుటుంబాల్లోని ఆడపిల్లల వివాహాలకు ఆర్థిక భరోసా కల్పించడమే ప్రజా ప్రభుత్వ లక్ష్యమని తెలిపారు.'
        : 'MLA Sri Gandra Satyanarayana Rao attended as Chief Guest in Gorukothapalli Mandal distributing Kalyana Lakshmi and Shaadi Mubarak cheques to 21 beneficiaries, reiterating the government\'s commitment to financial security for underprivileged daughters.',
      sourceLabel: isTelugu ? 'ఎమ్మెల్యే మీడియా విభాగం & ప్రెస్ నోట్' : 'MLA Media Desk & Press Note'
    },
    {
      _id: 'act-chityal-2026',
      formattedDate: isTelugu ? '03 నవంబర్, 2026' : 'Nov 03, 2026',
      activityDate: '2026-11-03',
      category: 'infrastructure',
      categoryLabel: isTelugu ? 'అభివృద్ధి పనుల శంకుస్థాపన' : 'Development Groundbreaking',
      title: isTelugu
        ? 'రూ. 2.14 కోట్లతో చిట్యాల మండలంలో పలు అభివృద్ధి పనులకు శంకుస్థాపనలు'
        : 'Foundation Laid for ₹2.14 Cr Comprehensive Development Works in Chityal Mandal',
      location: isTelugu ? 'చిట్యాల మండలం · చైన్పాక, అందుకు తండా, రామచంద్రాపురం' : 'Chityal Mandal · Chainpaka, Anduku Thanda, Ramachandrapuram',
      summary: isTelugu
        ? 'చిట్యాల మండలంలో రూ. 2.14 కోట్ల వ్యయంతో మహిళా సంఘ భవనాలు, మహిళా సమైక్య భవనాలు, అంగన్వాడీ కేంద్రాలు మరియు గ్రామ పంచాయతీ భవనాల నిర్మాణానికి ఎమ్మెల్యే గండ్ర సత్యనారాయణ రావు గారు శంకుస్థాపనలు చేశారు. మహిళా సాధికారత, గ్రామీణ మౌలిక వసతుల కల్పనే లక్ష్యంగా ప్రభుత్వం నిధులు మంజూరు చేస్తోందని తెలిపారు.'
        : 'MLA Sri Gandra Satyanarayana Rao laid the foundation stones for public works worth ₹2.14 Crores in Chityal Mandal, including Mahila Sangha Bhavans, modern Anganwadi Centres, and a Gram Panchayat building across Chainpaka, Giddemutharam, Bawoosinghpalli, and Ramachandrapuram villages, reaffirming top priority to women empowerment and rural progress under CM A. Revanth Reddy.',
      sourceLabel: isTelugu ? 'ఎమ్మెల్యే మీడియా విభాగం' : 'Constituency Media Desk'
    },
    {
      _id: 'act-1',
      formattedDate: isTelugu ? '21 సెప్టెంబర్, 2026' : 'Sep 21, 2026',
      activityDate: '2026-09-21',
      category: 'civic',
      categoryLabel: isTelugu ? 'సంస్మరణ ప్రసంగం' : 'Memorial Address',
      title: isTelugu ? 'ఆచార్య కొండా లక్ష్మణ్ బాపూజీ జయంతి సంస్మరణ సభ' : 'Konda Laxman Bapuji Memorial Commemoration',
      location: isTelugu ? 'భూపాలపల్లి అర్బన్ · ముఖ్య అతిథిగా సంస్మరణ ప్రసంగం' : 'Bhupalpally Urban · Chief Guest & Memorial Address',
      summary: isTelugu
        ? 'తెలంగాణ తొలితరం విముక్తి యోధుడు ఆచార్య కొండా లక్ష్మణ్ బాపూజీ జయంతి సందర్భంగా ముఖ్య అతిథిగా పాల్గొని ఘనంగా నివాళులర్పించారు.'
        : 'Participated as Chief Guest paying tribute to freedom fighter Acharya Konda Laxman Bapuji, emphasizing rural empowerment.',
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
        ? 'గ్రామీణ విద్యాభివృద్ధిలో ఉపాధ్యాయుల పాత్రను కొనియాడుతూ ఉత్తమ ఉపాధ్యాయులను ఘనంగా సత్కరించారు.'
        : 'Addressed local school teachers and educational leaders on the indispensable role of schooling in rural transformation.',
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
        ? 'తెలంగాణ శాసనసభలో సింగరేణి కార్మికుల సమస్యలు, భూ నిర్వాసితులకు మెరుగైన పునరావాస ప్యాకేజీలు, రిటైర్డ్ ఉద్యోగుల వైద్య భద్రతకై డిమాండ్ చేశారు.'
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
        ? 'కూరగాయల రైతులు దళారుల బారిన పడకుండా భూపాలపల్లిలో కోల్డ్ స్టోరేజ్ యూనిట్లు, ఆయిల్ పామ్ రైతులకు సబ్సిడీలను శాసనసభలో డిమాండ్ చేశారు.'
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
        ? 'చలివాగు రిజర్వాయర్ నీటిమట్టాలను స్వయంగా పరిశీలించి, స్థానిక రైతుల సాగునీటి రక్షణకై అక్రమ నీటి మళ్లింపులను అడ్డుకోవాలని అధికారులను ఆదేశించారు.'
        : 'Monitored water retention levels at Chalivagu project and warned against unauthorized water diversion to safeguard irrigation for farmers across local command areas.',
      sourceLabel: isTelugu ? 'నమస్తే తెలంగాణ & సాక్షి' : 'Namasthe Telangana & Sakshi'
    }
  ];

  const rawItems = activities && activities.length ? activities : defaultActivities;

  const categories = [
    { key: 'all', label: isTelugu ? 'అన్ని కార్యక్రమాలు' : 'All Activities' },
    { key: 'legislative', label: isTelugu ? 'శాసనసభ వేదిక' : 'Legislative Floor' },
    { key: 'agriculture', label: isTelugu ? 'రైతు & సాగునీరు' : 'Agriculture & Irrigation' },
    { key: 'civic', label: isTelugu ? 'ప్రజా సమ్మేళనాలు' : 'Civic Engagements' },
    { key: 'infrastructure', label: isTelugu ? 'క్షేత్ర పరిశీలనలు' : 'Field Inspections' }
  ];

  const filteredItems = rawItems.filter((act) => {
    if (selectedCategory === 'all') return true;
    return act.category === selectedCategory;
  });

  // Calculate scroll position and active item
  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const currentScroll = el.scrollLeft;

    if (maxScroll > 0) {
      setScrollProgress(Math.min(100, Math.max(0, (currentScroll / maxScroll) * 100)));
    } else {
      setScrollProgress(0);
    }

    // Determine which card is most centered/visible in track
    const trackRect = el.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = Math.abs(cardCenter - trackCenter);
      if (dist < closestDistance) {
        closestDistance = dist;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  };

  // Smooth scroll trigger to specific card
  const scrollToCard = (index) => {
    const targetCard = cardRefs.current[index];
    if (targetCard && trackRef.current) {
      targetCard.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
      setActiveIndex(index);
    }
  };

  const handlePrev = () => {
    const nextIdx = Math.max(0, activeIndex - 1);
    scrollToCard(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(filteredItems.length - 1, activeIndex + 1);
    scrollToCard(nextIdx);
  };

  // Listen to horizontal scroll events
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let rafId = null;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScrollState);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    updateScrollState();

    return () => {
      el.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [filteredItems]);

  // Reset active card on category switch
  useEffect(() => {
    setActiveIndex(0);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [selectedCategory]);

  return (
    <section id="activities" className="section bg-off-white activities-chronology-section" aria-label="Public Activities Timeline">
      <div className="container">
        {/* Section Header with Horizontal Trigger Control Deck */}
        <div className="activities-header-horizontal-deck">
          <div className="activities-header-meta">
            <div className="tag-label green">
              <span className="live-pulse-dot" aria-hidden="true"></span>
              {isTelugu ? 'నియోజకవర్గ ప్రస్థానం' : 'Constituency Engagements'}
            </div>
            <h2 className="section-title">
              {isTelugu ? 'ప్రజా కార్యక్రమాలు & అభివృద్ధి ప్రస్థానం' : 'Public Activities & Community Engagement'}
            </h2>
            <p className="section-subtitle">
              {isTelugu
                ? 'నియోజకవర్గ సమీక్షలు, శంకుస్థాపనలు, శాసనసభ ప్రశ్నలు మరియు ప్రజా సమావేశాల కాలక్రమ దృశ్యం.'
                : 'Chronological overview of constituency reviews, legislative interventions, and grassroots public meetings.'}
            </p>
          </div>

          {/* Premium Horizontal Scroll Trigger Controls */}
          <div className="h-trigger-dock" aria-label="Horizontal Carousel Controls">
            <div className="h-trigger-info">
              <span className="h-trigger-badge">
                <span className="h-trigger-dot" aria-hidden="true"></span>
                {isTelugu ? 'హారిజాంటల్ క్రోనాలజీ' : 'Horizontal Chronicle'}
              </span>
              <div className="h-trigger-counter">
                <span className="h-trigger-current">{String(activeIndex + 1).padStart(2, '0')}</span>
                <span className="h-trigger-sep">/</span>
                <span className="h-trigger-total">{String(filteredItems.length).padStart(2, '0')}</span>
              </div>
            </div>

            <div className="h-trigger-nav-buttons">
              <button
                type="button"
                className="h-trigger-btn prev"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                aria-label="Previous Activity"
                title="Scroll Left"
              >
                &#10094;
              </button>
              <button
                type="button"
                className="h-trigger-btn next"
                onClick={handleNext}
                disabled={activeIndex >= filteredItems.length - 1}
                aria-label="Next Activity"
                title="Scroll Right"
              >
                &#10095;
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills Bar */}
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

        {/* Animated Horizontal Progress Track Indicator */}
        <div className="h-scroll-progress-line" aria-hidden="true">
          <div
            className="h-scroll-progress-fill"
            style={{ width: `${Math.max(12, scrollProgress)}%` }}
          ></div>
        </div>

        {/* High-Class Smooth Horizontal Scroll Track */}
        <div
          className="activity-horizontal-track"
          ref={trackRef}
          role="region"
          aria-label="Chronological Activities Horizontal Track"
        >
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
            const isActive = index === activeIndex;

            return (
              <article
                key={act._id || index}
                ref={(el) => (cardRefs.current[index] = el)}
                data-index={index}
                className={`activity-h-card ${isActive ? 'is-active-trigger' : ''} ${isLatest ? 'is-latest' : ''}`}
                onClick={() => scrollToCard(index)}
              >
                {/* Top Badge & Time Header */}
                <div className="activity-h-top">
                  <div className="activity-h-date-chip">
                    <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{dateStr}</span>
                  </div>

                  {isLatest && (
                    <span className="activity-latest-badge">
                      <span className="live-pulse-dot" aria-hidden="true"></span>
                      {isTelugu ? 'తాజా నమోదు' : 'Latest Entry'}
                    </span>
                  )}
                </div>

                {/* Category & Location */}
                <div className="activity-h-meta">
                  <span className="activity-cat-tag">{categoryLabel}</span>
                  <span className="activity-h-loc" title={location}>{location}</span>
                </div>

                {/* Title */}
                <h3 className="activity-h-title">{title}</h3>

                {/* Fitted, Concise Summary (Matter optimized for clean mobile/desktop reading) */}
                <p className="activity-h-summary">{summary}</p>

                {/* Bottom Source & Hansard Link */}
                <div className="activity-h-footer">
                  <div className="activity-h-source">
                    <span className="source-label-txt">{isTelugu ? 'ఆధారం:' : 'Source:'}</span>
                    <span className="source-value-txt">{sourceLabel}</span>
                  </div>

                  <Link to="/work" className="activity-h-link" onClick={(e) => e.stopPropagation()}>
                    <span>{isTelugu ? 'హన్సార్డ్ రికార్డు' : 'View Record'}</span>
                    <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile Swipe Guidance Hint */}
        <div className="activity-h-swipe-hint" aria-hidden="true">
          <span>&larr;</span>
          <span>{isTelugu ? 'కార్యక్రమాలను చూడడానికి పక్కకు స్క్రోల్ చేయండి' : 'Swipe or scroll horizontally to explore activities'}</span>
          <span>&rarr;</span>
        </div>
      </div>
    </section>
  );
}
