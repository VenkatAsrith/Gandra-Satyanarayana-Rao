import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { api, resolveMediaUrl } from '../../services/api';
import { useLanguage } from '../../i18n/LanguageContext';
import { Link } from 'react-router-dom';

export default function ConstituencyPage() {
  const { t, isTelugu } = useLanguage();
  const [constituency, setConstituency] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function loadData() {
      try {
        const [cRes, sRes] = await Promise.all([
          api.getConstituency(),
          api.getSettings()
        ]);
        if (cRes?.data) setConstituency(cRes.data);
        if (sRes?.data) setSettings(sRes.data);
      } catch (err) {
        console.error('Failed to load constituency data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const mandalsData = [
    {
      code: '01',
      nameEn: 'Bhupalpalle',
      nameTe: 'భూపాలపల్లి',
      categoryEn: 'District Headquarter & Mining',
      categoryTe: 'జిల్లా కేంద్రం & సింగరేణి బొగ్గు గనులు',
      descEn: 'District administrative center, housing Singareni Collieries Company Limited (SCCL) underground and opencast coal mines, alongside Kakatiya Thermal Power Station (KTPS).',
      descTe: 'జయశంకర్ భూపాలపల్లి జిల్లా పరిపాలనా కేంద్రం, సింగరేణి సంస్థ బొగ్గు గనులు (కేటీకే ఓపెన్‌కాస్ట్ మరియు అండర్‌గ్రౌండ్) మరియు కేటీపీఎస్ థర్మల్ విద్యుత్ కేంద్రం కలిగిన ప్రధాన పారిశ్రామిక ప్రాంతం.'
    },
    {
      code: '02',
      nameEn: 'Ghanpur (Mulug)',
      nameTe: 'ఘనపూర్ (ములుగు)',
      categoryEn: 'Irrigation & Agriculture',
      categoryTe: 'వ్యవసాయం & ఘనపూర్ ఆయకట్టు',
      descEn: 'Agricultural heartland anchored by the Ghanapur reservoir canal network, benefiting from J. Chokka Rao Devadula Lift Irrigation and SRSP canal modernizations.',
      descTe: 'వ్యవసాయ ప్రాధాన్యత కలిగిన ప్రాంతం. ఘనపూర్ రిజర్వాయర్ పరిధిలోని పంట కాలువలు, దేవాదుల మరియు ఎస్సారెస్పీ కాల్వల ద్వారా 44,000 ఎకరాల విస్తీర్ణానికి సాగునీరు అందించే ఆయకట్టు.'
    },
    {
      code: '03',
      nameEn: 'Regonda',
      nameTe: 'రేగొండ',
      categoryEn: 'Heritage & Pilgrimage',
      categoryTe: 'ఆధ్యాత్మికం & కోటంచ క్షేత్రం',
      descEn: 'Agrarian mandal home to the historic Sri Lakshmi Narasimha Swamy Temple at Kotanchu, alongside Devadula Package-3 irrigation distribution networks.',
      descTe: 'రైతాంగ మండలం. ప్రముఖ పుణ్యక్షేత్రమైన కోటంచ శ్రీ లక్ష్మీ నరసింహ స్వామి దేవస్థానం, యాత్రికుల వసతులు మరియు దేవాదుల ప్యాకేజీ-3 కాలువల ద్వారా సాగునీరు పొందే ప్రాంతం.'
    },
    {
      code: '04',
      nameEn: 'Shayampet',
      nameTe: 'శాయంపేట',
      categoryEn: 'Rural Civic & Education',
      categoryTe: 'గ్రామీణ విద్యా & వ్యవసాయం',
      descEn: 'Rural agricultural community known for cotton and paddy cultivation, regional educational institutions, and village tank rejuvenation programs.',
      descTe: 'గ్రామీణ వ్యవసాయ ఆర్థిక వ్యవస్థ. వరి మరియు పత్తి పంటల ప్రధాన కేంద్రం, ప్రభుత్వ ఉన్నత విద్యా సంస్థలు మరియు మిషన్ కాకతీయ పునరుద్ధరించిన చెరువుల ఆయకట్టు.'
    },
    {
      code: '05',
      nameEn: 'Chityal',
      nameTe: 'చిట్యాల',
      categoryEn: 'Transit & Commerce',
      categoryTe: 'రవాణా కూడలి & మార్కెట్ కేంద్రం',
      descEn: 'Key transit junction connecting agricultural markets, featuring the newly sanctioned modern RTC bus station and extensive rural BT road networks.',
      descTe: 'నియోజకవర్గ ప్రధాన వాణిజ్య మరియు రవాణా కూడలి. ₹3.75 కోట్ల వ్యయంతో అత్యాధునిక ఆర్టీసీ బస్టాండ్, మార్కెట్ యార్డులు మరియు మండల అనుసంధాన బీటీ రోడ్లు కలిగిన ప్రాంతం.'
    },
    {
      code: '06',
      nameEn: 'Mogullapalle',
      nameTe: 'మొగుళ్లపల్లి',
      categoryEn: 'Agrarian Command & Tanks',
      categoryTe: 'చెరువుల ఆయకట్టు & రైతాంగం',
      descEn: 'Farming communities reliant on tank irrigation and groundwater networks, cultivating commercial chilli, cotton, and oilseed varieties.',
      descTe: 'రైతు కుటుంబాలు అధికంగా ఉండే ప్రాంతం. గ్రామీణ సాగునీటి చెరువులు, వ్యవసాయ బోర్ల ద్వారా మిర్చి, పత్తి మరియు ఆయిల్ పామ్ సాగు విస్తరించిన మండలం.'
    }
  ];

  return (
    <>
      <Header settings={settings} />

      <main id="main-content">
        {/* Page Header */}
        <section className="page-header-section">
          <div className="container">
            <div className="page-header-content">
              <div className="tag-label green">
                <span className="live-pulse-dot" aria-hidden="true"></span>
                {isTelugu ? 'శాసనసభ నియోజకవర్గం 108' : 'Assembly Constituency No. 108'}
              </div>
              <h1 className="page-header-title">
                {isTelugu
                  ? 'భూపాలపల్లి నియోజకవర్గం — సమగ్ర భౌగోళిక & ప్రజా సమాచారం'
                  : 'Bhupalpalle Assembly Constituency — Geographical & Public Dossier'}
              </h1>
              <p className="page-header-subtitle">
                {isTelugu
                  ? 'జయశంకర్ భూపాలపల్లి జిల్లాలోని 6 ప్రధాన మండలాలు, జనాభా లెక్కలు, సింగరేణి బొగ్గు నిల్వలు మరియు సాగునీటి ఆయకట్టు వివరాలు.'
                  : 'Official demographic overview, Singareni coal belt, irrigation command acreage, and administrative mandal breakdown across Jayashankar Bhupalpally.'}
              </p>
            </div>
          </div>
        </section>

        {/* 5 Stats Cards Grid */}
        <section className="section bg-off-white" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
          <div className="container">
            <div className="constituency-stats-grid">
              <div className="c-stat-box">
                <span className="c-stat-val">2,293</span>
                <span className="c-stat-unit">sq km</span>
                <span className="c-stat-lbl">{isTelugu ? 'మొత్తం విస్తీర్ణం' : 'Total Area'}</span>
                <span className="c-stat-src">Census of India</span>
              </div>
              <div className="c-stat-box">
                <span className="c-stat-val">4,16,763</span>
                <span className="c-stat-unit">{isTelugu ? 'పౌరులు' : 'Citizens'}</span>
                <span className="c-stat-lbl">{isTelugu ? 'జనాభా (2011 రికార్డు)' : 'Population (2011)'}</span>
                <span className="c-stat-src">Demographic Census</span>
              </div>
              <div className="c-stat-box">
                <span className="c-stat-val highlight-green">92.2%</span>
                <span className="c-stat-unit">{isTelugu ? 'గ్రామీణ ప్రాంతం' : 'Rural'}</span>
                <span className="c-stat-lbl">{isTelugu ? 'గ్రామీణ జనాభా నిష్పత్తి' : 'Rural Ratio'}</span>
                <span className="c-stat-src">Agrarian Footprint</span>
              </div>
              <div className="c-stat-box">
                <span className="c-stat-val">60.32%</span>
                <span className="c-stat-unit">{isTelugu ? 'శాతం' : 'Rate'}</span>
                <span className="c-stat-lbl">{isTelugu ? 'అక్షరాస్యత రేటు' : 'Literacy Rate'}</span>
                <span className="c-stat-src">District Education Dossier</span>
              </div>
              <div className="c-stat-box">
                <span className="c-stat-val highlight-orange">200+</span>
                <span className="c-stat-unit">{isTelugu ? 'గ్రామాలు' : 'Villages'}</span>
                <span className="c-stat-lbl">{isTelugu ? 'రెవెన్యూ గ్రామాలు' : 'Revenue Villages'}</span>
                <span className="c-stat-src">Revenue Administration</span>
              </div>
            </div>
          </div>
        </section>

        {/* Two-Column Regional Narrative */}
        <section className="section">
          <div className="container">
            <div className="constituency-editorial-grid">
              <div className="constituency-visual-frame">
                <img
                  src={resolveMediaUrl(constituency?.landscapeImageUrl || '/images/work/landscape.jpg')}
                  alt="Rural terrain and agrarian canals of Bhupalpalle"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/images/work/landscape.jpg';
                  }}
                />
                <div className="constituency-floating-stats">
                  <div className="floating-stat-item">
                    <span className="constituency-stat-label">
                      {isTelugu ? 'ఎమ్మెల్యే ప్రాతినిధ్యం' : 'MLA Representation'}
                    </span>
                    <div className="constituency-stat-value">
                      {isTelugu ? 'గండ్ర సత్యనారాయణ రావు' : 'Gandra Satyanarayana Rao'}
                    </div>
                  </div>
                  <div className="floating-stat-item">
                    <span className="constituency-stat-label">
                      {isTelugu ? 'విజయం మెజారిటీ' : 'Mandate Margin'}
                    </span>
                    <div className="constituency-stat-value" style={{ color: 'var(--green-dark)' }}>
                      52,699
                    </div>
                  </div>
                </div>
              </div>

              <div className="constituency-narrative-column">
                <div className="tag-label">
                  {isTelugu ? 'ప్రాంతీయ స్వరూపం & విశేషాలు' : 'Regional Profile'}
                </div>
                <h2 className="section-title">
                  {isTelugu
                    ? 'వ్యవసాయం, బొగ్గు గనులు & పరిశ్రమల సమన్వయం'
                    : 'A Confluence of Agriculture, Coal Mining & Industrial Energy'}
                </h2>
                <p className="section-subtitle">
                  {isTelugu
                    ? 'జయశంకర్ భూపాలపల్లి జిల్లా తెలంగాణ రాష్ట్రానికి అన్నపూర్ణగా, విద్యుత్ కేంద్రంగా నిలుస్తోంది. నాలుగు దశాబ్దాలుగా ఈ గడ్డతో మమేకమైన ఎమ్మెల్యే సత్తెన్న ప్రజా సంక్షేమానికి అగ్రతాంబూలం ఇస్తున్నారు.'
                    : 'Jayashankar Bhupalpally stands as both an agricultural breadbasket and an industrial powerplant for Telangana, requiring balanced legislative leadership across rural command areas and mining colonies.'}
                </p>
                <div className="narrative-paragraphs">
                  <p>
                    {isTelugu
                      ? 'ఈ నియోజకవర్గంలో భూపాలపల్లి, ఘనపూర్ (ములుగు), రేగొండ, శాయంపేట, చిట్యాల మరియు మొగుళ్లపల్లి మండలాలు ఉన్నాయి. దేవాదుల మరియు ఘనపూర్ రిజర్వాయర్ ద్వారా చివరి ఆయకట్టు రైతులకు సాగునీటి సరఫరా, గ్రామీణ బీటీ రోడ్ల అనుసంధానం మరియు సింగరేణి కార్మికుల సంక్షేమం ప్రధాన ప్రాధాన్యతలు.'
                      : 'Encompassing the key mandals of Bhupalpalle, Ghanpur (Mulug), Regonda, Shayampet, Chityal, and Mogullapalle, local governance demands focused legislative attention on tail-end irrigation canals, rural road networks, Singareni miner welfare, and tribal hamlet empowerment.'}
                  </p>
                  <p>
                    {isTelugu
                      ? 'బుద్ధారం క్యాంపు కార్యాలయంలో జరిగే ప్రజా దర్బార్ ద్వారా ప్రతి మండల ప్రజలకు అందుబాటులో ఉంటూ ప్రజా సమస్యలను ఎప్పటికప్పుడు పరిష్కరిస్తున్నారు.'
                      : 'Through the weekly Praja Darbar at Buddharam Camp Office, MLA Sathenna maintains direct accessibility with rural families across all six mandals.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 Mandals Cards Grid */}
        <section className="section bg-off-white">
          <div className="container">
            <div style={{ maxWidth: '800px', marginBottom: '3rem' }}>
              <div className="tag-label green">
                {isTelugu ? 'పరిపాలనా మండలాలు (06)' : 'Administrative Mandals (06)'}
              </div>
              <h2 className="section-title">
                {isTelugu ? 'నియోజకవర్గంలోని 6 ప్రధాన మండలాలు' : 'Constituency Mandals & Key Focus Areas'}
              </h2>
              <p className="section-subtitle">
                {isTelugu
                  ? 'భూపాలపల్లి నియోజకవర్గ పరిధిలోని ప్రతి మండలం ప్రత్యేక భౌగోళిక లక్షణాలు, ప్రాజెక్టులు మరియు ప్రాధాన్యతల వివరణ.'
                  : 'Detailed profile of all six administrative mandals constituting Assembly Constituency No. 108.'}
              </p>
            </div>

            <div className="constituency-mandals-grid">
              {mandalsData.map((m, idx) => {
                const name = isTelugu ? m.nameTe : m.nameEn;
                const category = isTelugu ? m.categoryTe : m.categoryEn;
                const desc = isTelugu ? m.descTe : m.descEn;

                return (
                  <article key={idx} className="mandal-card-editorial">
                    <div className="mandal-card-top">
                      <span className="mandal-code-badge">
                        {isTelugu ? `మండలం 0${idx + 1}` : `Mandal 0${idx + 1}`}
                      </span>
                      <span className="mandal-ac-tag">108 AC</span>
                    </div>

                    <h3 className="mandal-card-title">{name}</h3>

                    <div className="mandal-card-cat">
                      <span className="live-pulse-dot" aria-hidden="true"></span>
                      {category}
                    </div>

                    <p className="mandal-card-desc">{desc}</p>

                    <div className="mandal-card-footer">
                      <span className="mandal-focus-tag">
                        {isTelugu ? 'అధికారిక రికార్డు' : 'Verified Command Area'}
                      </span>
                      <Link to="/work" className="mandal-action-link">
                        {isTelugu ? 'ప్రాజెక్టులు' : 'View Works'} →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </>
  );
}
