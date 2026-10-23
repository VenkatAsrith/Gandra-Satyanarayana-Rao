import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { api, resolveMediaUrl } from '../../services/api';
import { useLanguage } from '../../i18n/LanguageContext';

export default function ConstituencyPage() {
  const { t, isTelugu, tc } = useLanguage();
  const [constituency, setConstituency] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function loadData() {
      try {
        const res = await api.getConstituency();
        setConstituency(res.data);
      } catch (err) {
        console.error('Failed to load constituency data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const mandalDescriptionsTe = {
    'Bhupalpalle': 'జిల్లా కేంద్రం, సింగరేణి బొగ్గు గనులు (KTK ఓపెన్‌కాస్ట్ మరియు అండర్‌గ్రౌండ్), కేటీపీఎస్ థర్మల్ విద్యుత్ కేంద్రం.',
    'Ghanpur (Mulug)': 'వ్యవసాయ ప్రాధాన్యత కలిగిన ప్రాంతం, ఘనపూర్ రిజర్వాయర్ ఆయకట్టు మరియు దేవాదుల కాలువలు.',
    'Regonda': 'రైతాంగ మండలం, ప్రసిద్ధ కోటంచ శ్రీ లక్ష్మీ నరసింహ స్వామి క్షేత్రం, దేవాదుల ప్యాకేజీ-3 కాలువలు.',
    'Shayampet': 'గ్రామీణ వ్యవసాయ ఆర్థిక వ్యవస్థ, విద్యా సంస్థలు మరియు పత్తి, వరి సాగు విస్తీర్ణం.',
    'Chityal': 'రవాణా కూడలి, వాణిజ్య కేంద్రం, నూతన అత్యాధునిక ఆర్టీసీ బస్ స్టేషన్ మరియు మార్కెట్ యార్డ్.',
    'Mogullapalle': 'గ్రామీణ చెరువుల ఆయకట్టు, రైతు కుటుంబాలు మరియు మిర్చి, పత్తి సాగు ప్రాంతాలు.'
  };

  return (
    <div className="page-wrapper">
      <Header />

      <main className="main-content">
        {/* Page Banner */}
        <section className="page-header-banner">
          <div className="site-container">
            <span className="category-pill mb-3">
              {t('common.constituencyBadge')} · {isTelugu ? 'జయశంకర్ భూపాలపల్లి జిల్లా' : 'Jayashankar Bhupalpally District'}
            </span>
            <h1 className="page-banner-title">{t('constituency.pageTitle')}</h1>
            <p className="page-banner-subtitle">{t('constituency.pageSubtitle')}</p>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="section-wrap" style={{ paddingTop: '2.5rem' }}>
          <div className="site-container">
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-number">2,293</div>
                <div className="stat-label">{t('constituency.totalArea')} (sq. km)</div>
                <div className="stat-source">Census of India</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">4,16,763</div>
                <div className="stat-label">{t('constituency.population')}</div>
                <div className="stat-source">Census Demographic Data</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">92.2%</div>
                <div className="stat-label">{t('constituency.ruralPercentage')}</div>
                <div className="stat-source">Agrarian Base</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">60.32%</div>
                <div className="stat-label">{t('constituency.literacyRate')}</div>
                <div className="stat-source">District Census Profile</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">200+</div>
                <div className="stat-label">{t('constituency.revenueVillages')}</div>
                <div className="stat-source">Revenue Roster</div>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Overview Narrative */}
        <section className="section-wrap bg-surface-alt">
          <div className="site-container">
            <div className="two-col-feature">
              <div className="feature-text-block">
                <span className="category-pill">{isTelugu ? 'ప్రాంతీయ స్వరూపం' : 'Regional Profile'}</span>
                <h2 className="section-heading mt-2">{t('constituency.overviewTitle')}</h2>
                <p className="section-lead">
                  {isTelugu
                    ? 'జయశంకర్ భూపాలపల్లి జిల్లా వ్యవసాయ భూములు, సింగరేణి బొగ్గు నిల్వలు మరియు కేటీపీఎస్ థర్మల్ విద్యుత్ కేంద్రంతో ప్రత్యేకతను సంతరించుకుంది.'
                    : 'Jayashankar Bhupalpally is uniquely distinguished by extensive agrarian command areas, deep Singareni coal seams, and thermal power stations that fuel Telangana.'}
                </p>
                <div className="narrative-body">
                  <p>
                    {isTelugu
                      ? 'ఈ నియోజకవర్గంలో భూపాలపల్లి, ఘనపూర్ (ములుగు), రేగొండ, శాయంపేట, చిట్యాల మరియు మొగుళ్లపల్లి మండలాలు ఉన్నాయి. దేవాదుల మరియు ఘనపూర్ రిజర్వాయర్ ద్వారా చివరి ఆయకట్టు రైతులకు సాగునీటి సరఫరా, గ్రామీణ బీటీ రోడ్ల అనుసంధానం మరియు సింగరేణి కార్మికుల సంక్షేమం ఎమ్మెల్యే గండ్ర సత్యనారాయణ రావు గారి ప్రధాన కర్తవ్యాలు.'
                      : 'Encompassing the key mandals of Bhupalpalle, Ghanpur (Mulug), Regonda, Shayampet, Chityal, and Mogullapalle, local governance demands focused legislative attention on tail-end irrigation canals, rural road networks, Singareni miner welfare, and tribal hamlet empowerment.'}
                  </p>
                  <p>
                    {isTelugu
                      ? 'బుద్ధారం క్యాంపు కార్యాలయంలో జరిగే ప్రజా దర్బార్ ద్వారా ప్రతి మండల ప్రజలకు అందుబాటులో ఉంటూ ప్రజా సమస్యలను ఎప్పటికప్పుడు పరిష్కరిస్తున్నారు.'
                      : 'Through the weekly Praja Darbar at Buddharam Camp Office, MLA Sathenna maintains direct contact with rural families across all 6 mandals.'}
                  </p>
                </div>
              </div>

              <div className="feature-image-block">
                <div className="image-frame-editorial">
                  <img
                    src={resolveMediaUrl(constituency?.landscapeImageUrl || '/images/work/landscape.jpg')}
                    alt="Bhupalpalle rural landscapes"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/images/work/irrigation.jpg';
                    }}
                  />
                  <div className="image-caption">
                    {isTelugu
                      ? 'భూపాలపల్లి నియోజకవర్గ వ్యవసాయ క్షేత్రాలు మరియు గ్రామీణ ఆయకట్టు'
                      : 'Agrarian landscapes and command areas of Bhupalpalle constituency.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mandals Breakdown */}
        <section className="section-wrap">
          <div className="site-container">
            <div className="section-header-centered">
              <span className="category-pill">{isTelugu ? 'పరిపాలనా విభాగాలు' : 'Administrative Roster'}</span>
              <h2 className="section-heading">{t('constituency.mandalsTitle')}</h2>
              <p className="section-lead">
                {isTelugu
                  ? 'భూపాలపల్లి నియోజకవర్గ పరిధిలోని 6 ప్రధాన మండలాల వివరాలు మరియు ప్రాధాన్యతలు'
                  : 'Key mandals constituting Assembly Constituency No. 108'}
              </p>
            </div>

            <div className="cards-grid-3">
              {(constituency?.mandals || [
                { name: 'Bhupalpalle', description: 'District Headquarter, Singareni Collieries coal belt & thermal station' },
                { name: 'Ghanpur (Mulug)', description: 'Agrarian heartland & Ghanapur reservoir command ayacut' },
                { name: 'Regonda', description: 'Agricultural mandal & Kotanchu temple pilgrimage site' },
                { name: 'Shayampet', description: 'Rural agricultural economy & village education institutions' },
                { name: 'Chityal', description: 'Transit junction, modern bus terminus & commercial center' },
                { name: 'Mogullapalle', description: 'Farming communities and tank irrigation command areas' }
              ]).map((mandal, idx) => (
                <div key={idx} className="content-card">
                  <div className="card-top-meta">
                    <span className="badge badge-subtle">
                      {isTelugu ? `మండలం 0${idx + 1}` : `Mandal 0${idx + 1}`}
                    </span>
                    <span className="text-secondary font-mono text-xs">108 AC</span>
                  </div>
                  <h3 className="card-heading">{mandal.name}</h3>
                  <p className="card-description">
                    {isTelugu && mandalDescriptionsTe[mandal.name]
                      ? mandalDescriptionsTe[mandal.name]
                      : mandal.description}
                  </p>
                  <div className="card-footer-meta">
                    <span className="status-indicator-tag status-tag-wip">
                      {isTelugu ? 'ప్రాధాన్యతా మండలం' : 'Key Command Area'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
