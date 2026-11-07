import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

export default function ConstituencyOverview({ constituency }) {
  const { isTelugu } = useLanguage();
  const trackRef = useRef(null);
  const [activeMandalIdx, setActiveMandalIdx] = useState(0);

  const mandalsData = [
    {
      no: '01',
      nameEn: 'Bhupalpalle',
      nameTe: 'భూపాలపల్లి',
      catEn: 'District Headquarter & Mining',
      catTe: 'జిల్లా కేంద్రం & బొగ్గు గనులు',
      descEn:
        'District administrative center, housing Singareni Collieries Company Limited (SCCL) underground and opencast coal mines, alongside Kakatiya Thermal Power Station (KTPS).',
      descTe:
        'జిల్లా పరిపాలనా కేంద్రం. సింగరేణి బొగ్గు గనులు (SCCL), కార్మిక కాలనీలు మరియు కాకతీయ థర్మల్ విద్యుత్ కేంద్రం (KTPS) కలిగిన పారిశ్రామిక కేంద్రం.',
      accent: 'saffron',
      image: '/images/events/public-address.png'
    },
    {
      no: '02',
      nameEn: 'Ghanpur (Mulug)',
      nameTe: 'ఘనపూర్ (ములుగు)',
      catEn: 'Irrigation & Agriculture',
      catTe: 'సాగునీరు & రైతాంగం',
      descEn:
        'Agricultural heartland anchored by the Ghanapur reservoir canal network, benefiting from J. Chokka Rao Devadula Lift Irrigation and SRSP canal modernizations.',
      descTe:
        'వ్యవసాయ ఆయకట్టు కేంద్రం. ఘనపూర్ రిజర్వాయర్, ₹31 కోట్ల కాలువల ఆధునీకరణ, దేవాదుల లిఫ్ట్ ఇరిగేషన్ మరియు శ్రీరాం సాగర్ ప్రాజెక్ట్ ఫీడర్ కాలువలతో సమగ్ర ఆయకట్టు.',
      accent: 'green',
      image: '/images/work/irrigation.jpg'
    },
    {
      no: '03',
      nameEn: 'Regonda',
      nameTe: 'రేగొండ',
      catEn: 'Heritage & Pilgrimage',
      catTe: 'ఆధ్యాత్మికం & వారసత్వం',
      descEn:
        'Agrarian mandal home to the historic Sri Lakshmi Narasimha Swamy Temple at Kotanchu, alongside Devadula Package-3 irrigation distribution networks.',
      descTe:
        'చారిత్రాత్మక కోటంచ శ్రీ లక్ష్మీ నరసింహ స్వామి క్షేత్రం, దేవాదుల ప్యాకేజీ-3 సాగునీటి పంపిణీ కాల్వలతో విలసిల్లుతున్న వ్యవసాయ మండలం.',
      accent: 'saffron',
      image: '/images/work/temple.jpg'
    },
    {
      no: '04',
      nameEn: 'Shayampet',
      nameTe: 'శాయంపేట',
      catEn: 'Rural Civic & Education',
      catTe: 'గ్రామీణ వికాసం & విద్య',
      descEn:
        'Rural agricultural community known for cotton and paddy cultivation, regional educational institutions, and village tank rejuvenation programs.',
      descTe:
        'పత్తి, వరి పంటలకు ప్రసిద్ధి చెందిన వ్యవసాయ మండలం. విద్యా సంస్థలు, చెరువుల పునరుద్ధరణ మరియు గ్రామీణ అనుసంధాన రోడ్ల అభివృద్ధి.',
      accent: 'neutral',
      image: '/images/work/housing.jpg'
    },
    {
      no: '05',
      nameEn: 'Chityal',
      nameTe: 'చిట్యాల',
      catEn: 'Transit & Commerce',
      catTe: 'రవాణా & వాణిజ్యం',
      descEn:
        'Key transit junction connecting agricultural markets, featuring the newly sanctioned modern RTC bus station and extensive rural BT road networks.',
      descTe:
        'వ్యవసాయ మార్కెట్లను అనుసంధానించే కీలక రవాణా కూడలి. నూతన ఆర్టీసీ బస్టాండ్, మహిళా సంఘాల భవనాలు మరియు రూ.2.14 కోట్ల మండల అభివృద్ధి పనులు.',
      accent: 'green',
      image: '/images/work/landscape.jpg'
    },
    {
      no: '06',
      nameEn: 'Mogullapalle',
      nameTe: 'మొగుళ్లపల్లి',
      catEn: 'Agrarian Command & Tanks',
      catTe: 'చెరువులు & ఆయకట్టు',
      descEn:
        'Farming communities reliant on tank irrigation and groundwater networks, cultivating commercial chilli, cotton, and oilseed varieties.',
      descTe:
        'చెరువుల సాగునీరు మరియు భూగర్భ జలాల ఆధారిత రైతాంగ మండలం. మిర్చి, పత్తి, నూనెగింజల వాణిజ్య పంటల సాగు మరియు ఉపాధి అవకాశాలు.',
      accent: 'neutral',
      image: '/images/work/irrigation.jpg'
    }
  ];

  // Horizontal Trigger Animation & Smooth Scroll Handlers
  const scrollToMandal = (index) => {
    setActiveMandalIdx(index);
    if (!trackRef.current) return;
    const cards = trackRef.current.children;
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  };

  const handlePrev = () => {
    const nextIdx = activeMandalIdx > 0 ? activeMandalIdx - 1 : mandalsData.length - 1;
    scrollToMandal(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = activeMandalIdx < mandalsData.length - 1 ? activeMandalIdx + 1 : 0;
    scrollToMandal(nextIdx);
  };

  const handleTrackScroll = () => {
    if (!trackRef.current) return;
    const scrollLeft = trackRef.current.scrollLeft;
    const cardWidth = trackRef.current.children[0]?.offsetWidth || 320;
    const index = Math.round(scrollLeft / cardWidth);
    if (index >= 0 && index < mandalsData.length && index !== activeMandalIdx) {
      setActiveMandalIdx(index);
    }
  };

  return (
    <section className="section constituency-dossier-section" id="constituency" aria-label="Constituency Dossier and Mandals">
      <div className="container">
        {/* Section 10: Bhupalpalle Assembly Constituency — Geographical & Public Dossier */}
        <div className="dossier-header-block">
          <div className="tag-label green">
            {isTelugu ? 'శాసనసభ నియోజకవర్గం నెం. 108' : 'Assembly Constituency No. 108'}
          </div>
          <h2 className="section-title" style={{ marginTop: '0.65rem' }}>
            {isTelugu
              ? 'భూపాలపల్లి శాసనసభ నియోజకవర్గం — భౌగోళిక & ప్రజా సమాచారం'
              : 'Bhupalpalle Assembly Constituency — Geographical & Public Dossier'}
          </h2>
          <p className="section-subtitle" style={{ marginTop: '0.5rem' }}>
            {isTelugu
              ? 'జయశంకర్ భూపాలపల్లి జిల్లా అధికారిక జనాభా గణాంకాలు, సింగరేణి బొగ్గు గనుల ప్రాంతం, సాగునీటి ఆయకట్టు మరియు 6 పరిపాలనా మండలాల సమగ్ర సమీక్ష.'
              : 'Official demographic overview, Singareni coal belt, irrigation command acreage, and administrative mandal breakdown across Jayashankar Bhupalpally.'}
          </p>
        </div>

        {/* 5 Verified Metrics + Authentic Landscape Showcase */}
        <div className="dossier-metrics-showcase">
          {/* Landscape Photo Frame */}
          <div className="dossier-landscape-frame">
            <img
              src="/images/work/landscape.jpg"
              alt="Rural terrain and agrarian canals of Bhupalpalle"
              className="dossier-landscape-img"
              loading="lazy"
            />
            <div className="dossier-landscape-badge">
              <span>Jayashankar Bhupalpally AC 108</span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="dossier-metrics-grid">
            <div className="dossier-stat-card featured-stat">
              <span className="stat-source-tag">Census of India</span>
              <div className="stat-num saffron">4,16,763</div>
              <div className="stat-name">{isTelugu ? 'మొత్తం జనాభా (2011 రికార్డు)' : 'Total Population (2011)'}</div>
              <div className="stat-sub">{isTelugu ? 'నియోజకవర్గ పరిధి' : 'Constituency Population Scope'}</div>
            </div>

            <div className="dossier-stat-card">
              <span className="stat-source-tag">Demographic Census</span>
              <div className="stat-num">2,293 <span className="stat-unit">sq km</span></div>
              <div className="stat-name">{isTelugu ? 'భౌగోళిక విస్తీర్ణం' : 'Total Geographical Area'}</div>
              <div className="stat-sub">{isTelugu ? 'నియోజకవర్గ భూభాగం' : 'Agrarian & Forested Basin'}</div>
            </div>

            <div className="dossier-stat-card">
              <span className="stat-source-tag">Agrarian Footprint</span>
              <div className="stat-num green">92.2%</div>
              <div className="stat-name">{isTelugu ? 'గ్రామీణ జనాభా నిష్పత్తి' : 'Rural Ratio'}</div>
              <div className="stat-sub">{isTelugu ? 'వ్యవసాయ ఆధారిత జనాభా' : 'Predominantly Agrarian Base'}</div>
            </div>

            <div className="dossier-stat-card">
              <span className="stat-source-tag">District Education Dossier</span>
              <div className="stat-num">60.32%</div>
              <div className="stat-name">{isTelugu ? 'అక్షరాస్యత శాతం' : 'Literacy Rate'}</div>
              <div className="stat-sub">{isTelugu ? 'విద్యారంగ అభివృద్ధి' : 'Educational Advancement'}</div>
            </div>

            <div className="dossier-stat-card">
              <span className="stat-source-tag">Revenue Administration</span>
              <div className="stat-num saffron">200+</div>
              <div className="stat-name">{isTelugu ? 'రెవెన్యూ గ్రామాలు' : 'Revenue Villages'}</div>
              <div className="stat-sub">{isTelugu ? 'పంచాయతీలు & గిరిజన తండాలు' : 'Hamlets & Grama Panchayats'}</div>
            </div>
          </div>
        </div>

        {/* Regional Profile Narrative */}
        <div className="dossier-narrative-card">
          <div className="narrative-accent-bar" aria-hidden="true"></div>
          <div className="narrative-content">
            <h3 className="narrative-title">
              {isTelugu
                ? 'వ్యవసాయం, బొగ్గు గనులు & పారిశ్రామిక శక్తి సంగమం'
                : 'A Confluence of Agriculture, Coal Mining & Industrial Energy'}
            </h3>
            <p className="narrative-text">
              {isTelugu
                ? 'జయశంకర్ భూపాలపల్లి తెలంగాణ రాష్ట్రానికి అన్నపూర్ణగాను, బొగ్గు గనుల విద్యుత్ శక్తి కేంద్రంగాను నిలుస్తోంది. భూపాలపల్లి, ఘనపూర్ (ములుగు), రేగొండ, శాయంపేట, చిట్యాల, మొగుళ్లపల్లి మండలాల ప్రజల సంక్షేమం, సాగునీటి కాలువలు, సింగరేణి కార్మికుల భద్రత, విద్యార్థుల విద్య మరియు గిరిజన తండాల అభివృద్ధికి సమతుల్య శాసనసభ నాయకత్వం అవసరం. బుద్ధారం క్యాంపు కార్యాలయంలో జరిగే వారపు ప్రజా దర్బార్ ద్వారా ఎమ్మెల్యే సత్తన్న నిరంతరం ప్రజలకు అందుబాటులో ఉంటారు.'
                : 'Jayashankar Bhupalpally stands as both an agricultural breadbasket and an industrial powerplant for Telangana, requiring balanced legislative leadership across rural command areas and mining colonies. Encompassing the key mandals of Bhupalpalle, Ghanpur (Mulug), Regonda, Shayampet, Chityal, and Mogullapalle, local governance demands focused legislative attention on tail-end irrigation canals, rural road networks, Singareni miner welfare, and tribal hamlet empowerment. Through the weekly Praja Darbar at Buddharam Camp Office, MLA Sathanna maintains direct accessibility with rural families across all six mandals.'}
            </p>
          </div>
        </div>

        {/* =========================================================================
            SECTION 11: SIX ADMINISTRATIVE MANDALS — HORIZONTAL TRIGGER ANIMATION TRACK
            ========================================================================= */}
        <div className="mandals-section-divider">
          <div className="mandals-header-split">
            <div>
              <div className="tag-label">
                {isTelugu ? 'పరిపాలనా మండలాలు (06)' : 'Administrative Mandals (06)'}
              </div>
              <h2 className="section-title" style={{ marginTop: '0.65rem' }}>
                {isTelugu ? 'నియోజకవర్గ మండలాలు & ప్రధాన ప్రాధాన్యతలు' : 'Constituency Mandals & Key Focus Areas'}
              </h2>
              <p className="section-subtitle" style={{ marginTop: '0.5rem' }}>
                {isTelugu
                  ? 'శాసనసభ నియోజకవర్గం నెం. 108 పరిధిలోని ఆరు పరిపాలనా మండలాల సమగ్ర స్వరూపం.'
                  : 'Detailed profile of all six administrative mandals constituting Assembly Constituency No. 108.'}
              </p>
            </div>

            {/* Horizontal Trigger Arrows */}
            <div className="mandals-nav-controls">
              <button
                type="button"
                className="mandal-arrow-btn prev"
                onClick={handlePrev}
                aria-label="Previous Mandal"
                title="Previous Mandal"
              >
                &#10094;
              </button>
              <span className="mandal-counter-pill">
                0{activeMandalIdx + 1} / 0{mandalsData.length}
              </span>
              <button
                type="button"
                className="mandal-arrow-btn next"
                onClick={handleNext}
                aria-label="Next Mandal"
                title="Next Mandal"
              >
                &#10095;
              </button>
            </div>
          </div>

          {/* Smooth Snapping Horizontal Scroll Stage */}
          <div
            className="mandals-horizontal-track"
            ref={trackRef}
            onScroll={handleTrackScroll}
            role="region"
            aria-label="Six Administrative Mandals Horizontal Track"
          >
            {mandalsData.map((m, idx) => (
              <div
                key={idx}
                className={`mandal-h-card accent-${m.accent} ${idx === activeMandalIdx ? 'is-active-mandal' : ''}`}
                onClick={() => scrollToMandal(idx)}
              >
                <div className="mandal-h-card-top">
                  <span className="mandal-no-badge">Mandal {m.no} | AC 108</span>
                  <span className="mandal-cat-badge">{isTelugu ? m.catTe : m.catEn}</span>
                </div>

                <div className="mandal-h-img-wrap">
                  <img
                    src={m.image}
                    alt={isTelugu ? m.nameTe : m.nameEn}
                    className="mandal-h-img"
                    loading="lazy"
                  />
                </div>

                <div className="mandal-h-content">
                  <h3 className="mandal-h-title">{isTelugu ? m.nameTe : m.nameEn}</h3>
                  <p className="mandal-h-desc">{isTelugu ? m.descTe : m.descEn}</p>
                </div>

                <div className="mandal-h-footer">
                  <Link to="/work" className="btn-pill btn-primary mandal-work-btn">
                    {isTelugu ? 'అభివృద్ధి పనులు వీక్షించండి' : 'Command Area Profile / View Works'} →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Dot Progress Indicators */}
          <div className="mandals-dots-row">
            {mandalsData.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`mandal-dot-btn ${idx === activeMandalIdx ? 'active' : ''}`}
                onClick={() => scrollToMandal(idx)}
                aria-label={`Jump to Mandal 0${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="constituency-all-cta-wrap" style={{ marginTop: '2.5rem' }}>
          <Link to="/constituency" className="btn-pill btn-secondary">
            {isTelugu ? 'నియోజకవర్గం పూర్తి పేజీని చూడండి' : 'Explore Detailed Constituency Dossier'} →
          </Link>
        </div>
      </div>
    </section>
  );
}
