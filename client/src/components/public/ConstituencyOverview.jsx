import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

export default function ConstituencyOverview({ constituency }) {
  const { isTelugu } = useLanguage();

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
      image: '/images/events/public-address.png',
      featured: true
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
      image: '/images/work/irrigation.jpg',
      featured: true
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
      image: '/images/work/temple.jpg',
      featured: false
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
      image: '/images/work/housing.jpg',
      featured: false
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
      image: '/images/work/landscape.jpg',
      featured: false
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
      image: '/images/work/irrigation.jpg',
      featured: false
    }
  ];

  return (
    <section className="section constituency-dossier-section" id="constituency">
      <div className="container">
        {/* Section 10: Bhupalpalle Assembly Constituency — Geographical & Public Dossier */}
        <div className="dossier-header-block">
          <div className="tag-label green">
            {isTelugu ? 'శాసనసభ నియోజకవర్గం నెం. 108' : 'Assembly Constituency No. 108'}
          </div>
          <h2 className="section-title">
            {isTelugu
              ? 'భూపాలపల్లి శాసనసభ నియోజకవర్గం — భౌగోళిక & ప్రజా సమాచారం'
              : 'Bhupalpalle Assembly Constituency — Geographical & Public Dossier'}
          </h2>
          <p className="section-subtitle">
            {isTelugu
              ? 'జయశంకర్ భూపాలపల్లి జిల్లా అధికారిక జనాభా గణాంకాలు, సింగరేణి బొగ్గు గనుల ప్రాంతం, సాగునీటి ఆయకట్టు మరియు 6 పరిపాలనా మండలాల సమగ్ర సమీక్ష.'
              : 'Official demographic overview, Singareni coal belt, irrigation command acreage, and administrative mandal breakdown across Jayashankar Bhupalpally.'}
          </p>
        </div>

        {/* 5 Verified Metrics + Authentic Landscape Showcase */}
        <div className="dossier-metrics-showcase">
          {/* Left/Top Landscape Frame */}
          <div className="dossier-landscape-frame">
            <img
              src="/images/work/landscape.jpg"
              alt="Rural terrain and agrarian canals of Bhupalpalle"
              className="dossier-landscape-img"
              loading="lazy"
            />
            <div className="dossier-landscape-badge">
              <span>🌾 Jayashankar Bhupalpally AC 108</span>
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
              <div className="stat-name">{isTelugu ? 'రెవెన్యూ గ్రామాలు & తండాలు' : 'Revenue Villages'}</div>
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

        {/* Section 11: Six Administrative Mandals (AC 108) */}
        <div className="mandals-section-divider">
          <div className="tag-label">
            {isTelugu ? 'పరిపాలనా మండలాలు (06)' : 'Administrative Mandals (06)'}
          </div>
          <h2 className="section-title">
            {isTelugu ? 'నియోజకవర్గ మండలాలు & ప్రధాన ప్రాధాన్యతలు' : 'Constituency Mandals & Key Focus Areas'}
          </h2>
          <p className="section-subtitle">
            {isTelugu
              ? 'శాసనసభ నియోజకవర్గం నెం. 108 పరిధిలోని ఆరు పరిపాలనా మండలాల సమగ్ర స్వరూపం.'
              : 'Detailed profile of all six administrative mandals constituting Assembly Constituency No. 108.'}
          </p>
        </div>

        {/* Desktop Layout: Asymmetric 6-Item Grid (Hidden on Mobile) */}
        <div className="mandals-desktop-grid">
          {mandalsData.map((m, idx) => (
            <div
              key={idx}
              className={`mandal-desktop-card ${m.featured ? 'is-featured' : ''} accent-${m.accent}`}
            >
              <div className="mandal-card-header">
                <span className="mandal-no-badge">Mandal {m.no} | AC 108</span>
                <span className="mandal-cat-badge">{isTelugu ? m.catTe : m.catEn}</span>
              </div>
              <h3 className="mandal-name">{isTelugu ? m.nameTe : m.nameEn}</h3>
              <p className="mandal-desc">{isTelugu ? m.descTe : m.descEn}</p>
              <div className="mandal-card-footer">
                <Link to="/work" className="mandal-cta-link">
                  <span>{isTelugu ? 'అభివృద్ధి పనులు వీక్షించండి' : 'Command Area Profile / View Works'}</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Layout: Dedicated ScrollStack for All 6 Mandals (Hidden on Desktop) */}
        <div className="mandals-mobile-scrollstack">
          <ScrollStack className="mandals-stack">
            {mandalsData.map((m, idx) => (
              <ScrollStackItem key={idx} accent={m.accent}>
                <div className="stack-mandal-card">
                  <div className="stack-mandal-top">
                    <span className="stack-mandal-num">Mandal {m.no} · AC 108</span>
                    <span className="stack-mandal-cat">{isTelugu ? m.catTe : m.catEn}</span>
                  </div>
                  <h3 className="stack-mandal-title">{isTelugu ? m.nameTe : m.nameEn}</h3>
                  <p className="stack-mandal-desc">{isTelugu ? m.descTe : m.descEn}</p>
                  <div className="stack-mandal-action">
                    <Link to="/work" className="btn-pill btn-primary stack-btn">
                      {isTelugu ? 'మండల అభివృద్ధి పనులు' : 'View Mandals Works'} →
                    </Link>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

        <div className="constituency-all-cta-wrap">
          <Link to="/constituency" className="btn-pill btn-secondary">
            {isTelugu ? 'నియోజకవర్గం పూర్తి పేజీని చూడండి' : 'Explore Detailed Constituency Dossier'} →
          </Link>
        </div>
      </div>
    </section>
  );
}
