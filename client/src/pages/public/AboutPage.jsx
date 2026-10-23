import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import JourneyTimeline from '../../components/public/JourneyTimeline';
import { api } from '../../services/api';
import { useLanguage } from '../../i18n/LanguageContext';

export default function AboutPage() {
  const { isTelugu, t } = useLanguage();
  const [settings, setSettings] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadData = async () => {
      try {
        const [settRes, profRes] = await Promise.all([
          api.getSettings(),
          api.getProfile()
        ]);
        if (settRes?.data) setSettings(settRes.data);
        if (profRes?.data) setProfile(profRes.data);
      } catch (err) {
        console.error('Error loading about page data:', err);
      }
    };

    loadData();
  }, []);

  const pageTitle = isTelugu
    ? 'గండ్ర సత్యనారాయణ రావు (సత్తెన్న) — జీవిత విశేషాలు'
    : 'About Gandra Satyanarayana Rao';

  const pageSubtitle = isTelugu
    ? 'జయశంకర్ భూపాలపల్లి జిల్లాలో నాలుగు దశాబ్దాల ప్రజా ప్రాతినిధ్యం, విద్యా నేపథ్యం మరియు చారిత్రాత్మక ఎన్నికల రికార్డు.'
    : 'Comprehensive biographical record, educational credentials, and grassroots trajectory across Jayashankar Bhupalpally.';

  return (
    <>
      <Header settings={settings} />
      <main id="main-content">
        {/* Page Header */}
        <section className="page-header-section">
          <div className="container">
            <div className="page-header-content">
              <div className="tag-label">
                {isTelugu ? 'అధికారిక జీవిత రికార్డు' : 'Documented Biography'}
              </div>
              <h1 className="page-header-title">{pageTitle}</h1>
              <p className="page-header-subtitle">{pageSubtitle}</p>
            </div>
          </div>
        </section>

        {/* Section 1: Biography & Agrarian Roots */}
        <section className="section">
          <div className="container">
            <div className="intro-grid">
              <div>
                <div className="tag-label">
                  {isTelugu ? 'నేపథ్యం & కుటుంబం' : 'Lineage & Upbringing'}
                </div>
              </div>
              <div>
                <h2 className="intro-lead-title">
                  {isTelugu
                    ? 'బుద్ధారం గ్రామ మట్టితో పెనవేసుకున్న రైతుబిడ్డ ప్రజా జీవితం.'
                    : 'Rooted in the agricultural soil of Buddharam village.'}
                </h2>
              </div>
              <div>
                <p className="intro-desc">
                  {isTelugu
                    ? '1965లో జయశంకర్ భూపాలపల్లి జిల్లా ఘనపురం మండలం బుద్ధారం గ్రామంలో వ్యవసాయ కుటుంబంలో జన్మించిన గండ్ర సత్యనారాయణ రావు—ప్రజలందరూ అభిమానంతో "సత్తెన్న" అని పిలుచుకునే నేత—తండ్రి స్వర్గీయ గండ్ర సమ్మారావు గారి మార్గదర్శకంలో పెరిగారు. గ్రామీణ వాతావరణంలో పెరగడం వల్లనే సాగునీటి ప్రాముఖ్యత, రైతు కష్టం మరియు గ్రామీణ కార్మికుల ఆత్మగౌరవంపై ఆయనకు అపారమైన గౌరవం ఉంది.'
                    : 'Born in 1965 in Buddharam (Bhudharam) village, Ghanapuram mandal, Gandra Satyanarayana Rao—affectionately known across the constituency as "Sathenna"—was raised in an agrarian family under the guidance of his father, Late Sri Gandra Samma Rao. His formative years in rural Warangal shaped his enduring perspective on the primacy of irrigation water, dependable agricultural electricity, and the dignity of rural labor.'}
                </p>
                <p className="intro-desc" style={{ marginTop: '1rem' }}>
                  {isTelugu
                    ? 'సతీమణి శ్రీమతి గండ్ర పద్మ గారితో కలిసి మూడు దశాబ్దాలుగా నియోజకవర్గ ప్రజలకు నిరంతరం అందుబాటులో ఉంటూ భూమి, సాగునీరు మరియు ప్రజా సమస్యల పరిష్కారంలో తోడ్పడుతున్నారు.'
                    : 'Alongside his spouse, Smt. Gandra Padma, he has maintained direct community accessibility for over three decades, resolving everyday land, irrigation, and civic matters for rural residents.'}
                </p>
              </div>
            </div>

            <div className="story-grid" style={{ marginTop: '3.5rem' }}>
              <article className="story-card story-card-large">
                <div className="story-img-wrap">
                  <img
                    src="/images/about/portrait-namaste.png"
                    alt="Gandra Satyanarayana Rao greeting constituents"
                    loading="lazy"
                    style={{ objectPosition: 'center 15%' }}
                  />
                </div>
                <div className="story-body">
                  <span className="story-category">
                    {isTelugu ? 'పాలనా విధానం' : 'Constituent Philosophy'}
                  </span>
                  <h3 className="story-title">
                    {isTelugu ? 'వారపు "ప్రజా దర్బార్" ద్వారా ప్రత్యక్ష పరిష్కారాలు' : 'Direct Accessibility through Weekly "Praja Darbar"'}
                  </h3>
                  <p className="story-text">
                    {isTelugu
                      ? 'బుద్ధారం ఎమ్మెల్యే క్యాంపు కార్యాలయంలో ప్రతి సోమవారం, బుధవారం జరిగే ప్రజా దర్బార్‌లో రాజకీయాలకు అతీతంగా ప్రతి పౌరుడి సమస్యను నేరుగా విని, సంబంధిత ప్రభుత్వ అధికారులకు తక్షణ ఆదేశాలు జారీ చేస్తారు.'
                      : "A cornerstone of Sathenna's public representation is the weekly open court held at the MLA Camp Office. Every constituent—regardless of political background—receives direct personal hearing, with representations endorsed immediately to relevant department officials."}
                  </p>
                </div>
              </article>

              <article className="story-card story-card-medium">
                <div className="story-img-wrap">
                  <img
                    src="/images/about/profile-formal.png"
                    alt="Gandra Satyanarayana Rao formal portrait"
                    loading="lazy"
                    style={{ objectPosition: 'center 10%' }}
                  />
                </div>
                <div className="story-body">
                  <span className="story-category">
                    {isTelugu ? 'విద్యా నేపథ్యం' : 'Academic & Technical Training'}
                  </span>
                  <h3 className="story-title">
                    {isTelugu ? 'కాకతీయ యూనివర్సిటీ బి.ఎ. & సివిల్ ఇంజనీరింగ్ ఐటీఐ' : 'Kakatiya University & Civil Engineering Literacy'}
                  </h3>
                  <p className="story-text">
                    {isTelugu
                      ? '1983లో వరంగల్ కాకతీయ విశ్వవిద్యాలయం నుండి బి.ఎ. డిగ్రీ, అలాగే సివిల్ డ్రాఫ్ట్స్‌మెన్ ఐటీఐ పూర్తి చేశారు. దీనివల్ల కాలువల లెవల్స్, చెక్ డ్యామ్‌ల నిర్మాణాలు మరియు రహదారుల నాణ్యతపై సాంకేతిక అవగాహనతో పనిచేస్తారు.'
                      : 'Earned his Bachelor of Arts degree from Kakatiya University, Warangal in 1983, complemented by an ITI diploma in Civil Engineering. This unique qualification empowers him with direct technical comprehension of reservoir canal gradients, check dam masonry, and highway alignment.'}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Section 2: Full Documented Journey Timeline */}
        <JourneyTimeline timeline={profile?.timeline} />

        {/* Section 3: Electoral Record Dossier */}
        <section className="section">
          <div className="container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
              <div className="tag-label">
                {isTelugu ? 'ఎన్నికల సంఘం ధృవీకరించిన రికార్డు' : 'ECI Verified Record'}
              </div>
              <h2 className="section-title">
                {isTelugu ? '2023 చారిత్రాత్మక ఎన్నికల ఘనవిజయం' : 'The 2023 Decisive Mandate'}
              </h2>
              <p className="section-subtitle">
                {isTelugu
                  ? 'భారత ఎన్నికల సంఘం (ECI) అధికారికంగా నమోదు చేసిన భూపాలపల్లి శాసనసభ నియోజకవర్గం (నెం. 108) గణాంకాలు.'
                  : 'Official election statistics recorded by the Election Commission of India for Bhupalpalle Assembly Constituency No. 108.'}
              </p>
            </div>

            <div className="electoral-stats-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div className="electoral-stat-card">
                <span className="electoral-stat-label">
                  {isTelugu ? 'పోలైన ఓట్లు' : 'Total Votes Polled'}
                </span>
                <span className="electoral-stat-val" style={{ color: 'var(--orange-dark)' }}>
                  {profile?.electoralStats?.votesSecured ? profile.electoralStats.votesSecured.toLocaleString('en-IN') : '1,23,116'}
                </span>
                <span className="electoral-stat-meta">
                  {isTelugu ? '54.55% ఓట్ల శాతం' : '54.55% of total valid votes'}
                </span>
              </div>
              <div className="electoral-stat-card">
                <span className="electoral-stat-label">
                  {isTelugu ? 'విజయం మెజారిటీ' : 'Winning Margin'}
                </span>
                <span className="electoral-stat-val" style={{ color: 'var(--green-dark)' }}>
                  {profile?.electoralStats?.voteMargin ? profile.electoralStats.voteMargin.toLocaleString('en-IN') : '52,699'}
                </span>
                <span className="electoral-stat-meta">
                  {isTelugu ? 'నియోజకవర్గ చరిత్రలో రికార్డు' : 'Decisive historical record'}
                </span>
              </div>
              <div className="electoral-stat-card">
                <span className="electoral-stat-label">
                  {isTelugu ? 'పదవీ కాలం' : 'Tenure & Assembly'}
                </span>
                <span className="electoral-stat-val">2023–2028</span>
                <span className="electoral-stat-meta">
                  {isTelugu ? '3వ తెలంగాణ శాసనసభ' : '3rd Telangana Legislature'}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
