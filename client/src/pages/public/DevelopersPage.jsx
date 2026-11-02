import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { useLanguage } from '../../i18n/LanguageContext';

export default function DevelopersPage({ settings }) {
  const { isTelugu } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = isTelugu
      ? 'సాంకేతిక బృందం & డెవలపర్స్ | గండ్ర సత్యనారాయణ రావు'
      : 'Developers & Engineering Team | Gandra Satyanarayana Rao';
  }, [isTelugu]);

  const developers = [
    {
      name: 'VenkatAsrith Konam',
      nameTe: 'వెంకట్ అస్రిత్ కోనం',
      role: 'Lead Full-Stack Architect & System Engineer',
      roleTe: 'లీడ్ ఫుల్‌స్టాక్ ఆర్కిటెక్ట్ & సిస్టమ్ ఇంజనీర్',
      bio: 'Architected the end-to-end MERN monorepo platform, scalable REST API services, database models, and high-performance serverless deployment pipeline.',
      bioTe: 'పూర్తి ఎంఈఆర్ఎన్ (MERN) ప్లాట్‌ఫామ్, స్కేలబుల్ రెస్ట్ ఏపీఐ సర్వీసులు, డేటాబేస్ నిర్మాణం మరియు హై-పెర్ఫార్మెన్స్ డిప్లాయ్‌మెంట్ ఆర్కిటెక్చర్‌ను రూపొందించారు.',
      image: '/images/developers/venkatasrith.png',
      linkedin: 'https://www.linkedin.com/in/venkatasrith/',
      skills: ['MERN Architecture', 'REST APIs', 'Node.js', 'System Design']
    },
    {
      name: 'Pendela Sunny',
      nameTe: 'పెండెల సన్నీ',
      role: 'Frontend Architect & UI/UX Systems Engineer',
      roleTe: 'ఫ్రంట్‌ఎండ్ ఆర్కిటెక్ట్ & యూఐ/యూఎక్స్ ఇంజనీర్',
      bio: 'Engineered the editorial vanilla CSS3 design system, responsive touch gestures, scroll-stack animations, and interactive video theatre experience.',
      bioTe: 'ఎడిటోరియల్ సీఎస్‌ఎస్3 డిజైన్ సిస్టమ్, రెస్పాన్సివ్ మొబైల్ టచ్ యానిమేషన్లు, స్క్రోల్-స్టాక్ ఆర్కిటెక్చర్ మరియు ఇంటరాక్టివ్ వీడియో థియేటర్‌ను తీర్చిదిద్దారు.',
      image: null,
      initials: 'PS',
      linkedin: 'https://www.linkedin.com/in/sunny-pendela-280a69363/',
      skills: ['React 18', 'UI/UX Design', 'CSS3 Architecture', 'Fluid Responsive']
    }
  ];

  return (
    <div className="page-wrapper" style={{ background: 'var(--canvas, #F7F6F2)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header settings={settings} />

      <main id="main-content" style={{ flexGrow: 1, paddingBlock: 'clamp(3rem, 6vw, 5.5rem)' }}>
        <div className="container" style={{ maxWidth: '1080px' }}>
          {/* Header */}
          <div className="page-header-content" style={{ textAlign: 'left', marginBottom: '3rem' }}>
            <div className="tag-label saffron">
              {isTelugu ? 'సాంకేతిక బృందం & రూపకర్తలు' : 'Engineering & Development'}
            </div>
            <h1 className="page-header-title" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', marginBlock: '0.75rem' }}>
              {isTelugu ? 'సాంకేతిక బృందం & డెవలపర్స్' : 'Platform Developers & System Architects'}
            </h1>
            <p className="page-header-subtitle" style={{ maxWidth: '720px' }}>
              {isTelugu
                ? 'శ్రీ గండ్ర సత్యనారాయణ రావు గారి అధికారిక డిజిటల్ పోర్టల్ మరియు అడ్మిన్ సిఎమ్‌ఎస్‌ను అత్యున్నత ప్రమాణాలతో తీర్చిదిద్దిన సాంకేతిక రూపకర్తలు.'
                : 'Meet the engineers behind the high-performance editorial digital portal and administrative CMS built for MLA Gandra Satyanarayana Rao.'}
            </p>
          </div>

          {/* Simple Clean Developer Profile Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              marginBottom: '3.5rem'
            }}
          >
            {developers.map((dev, i) => (
              <div
                key={i}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-xl, 20px)',
                  padding: '2rem',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div>
                  {/* Photo / Avatar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
                    {dev.image ? (
                      <div
                        style={{
                          width: '90px',
                          height: '90px',
                          borderRadius: '50%',
                          overflow: 'hidden',
                          border: '3px solid var(--saffron, #F36B21)',
                          boxShadow: '0 4px 16px rgba(243, 107, 33, 0.25)',
                          flexShrink: 0
                        }}
                      >
                        <img
                          src={dev.image}
                          alt={dev.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: '90px',
                          height: '90px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #0F172A 0%, #334155 100%)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.8rem',
                          fontWeight: 800,
                          border: '3px solid var(--saffron, #F36B21)',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                          flexShrink: 0
                        }}
                      >
                        {dev.initials}
                      </div>
                    )}

                    <div>
                      <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                        {isTelugu ? dev.nameTe : dev.name}
                      </h2>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--saffron, #F36B21)', marginTop: '4px' }}>
                        {isTelugu ? dev.roleTe : dev.role}
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {isTelugu ? dev.bioTe : dev.bio}
                  </p>

                  {/* Skills tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.75rem' }}>
                    {dev.skills.map((s, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: 'var(--surface-alt, #F1F5F9)',
                          color: 'var(--charcoal, #334155)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '3px 10px',
                          borderRadius: 'var(--radius-pill, 9999px)'
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* LinkedIn Button */}
                <div>
                  <a
                    href={dev.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill"
                    style={{
                      background: '#0A66C2',
                      color: '#FFFFFF',
                      width: '100%',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      textDecoration: 'none',
                      boxShadow: '0 4px 14px rgba(10, 102, 194, 0.3)'
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.88 0-1.6.72-1.6 1.6 0 .89.72 1.6 1.6 1.6.89 0 1.61-.71 1.61-1.6 0-.88-.72-1.6-1.61-1.6Z" />
                    </svg>
                    <span>{isTelugu ? 'లింక్డ్‌ఇన్ ప్రొఫైల్ చూడండి' : 'Connect on LinkedIn'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Section for Further Discoveries */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-xl, 20px)',
              padding: 'clamp(1.75rem, 4vw, 3rem)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
              marginBottom: '3rem'
            }}
          >
            <div className="tag-label green" style={{ marginBottom: '0.75rem' }}>
              {isTelugu ? 'సాంకేతిక వివరాలు & భవిష్యత్ ఆవిష్కరణలు' : 'Platform Architecture & Further Discoveries'}
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              {isTelugu ? 'అత్యాధునిక సాంకేతిక రూపకల్పన విశేషాలు' : 'Architectural Innovations & Engineering Highlights'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '820px' }}>
              {isTelugu
                ? 'భూపాలపల్లి నియోజకవర్గ పౌరులకు మరియు మీడియా ప్రతినిధులకు వేగవంతమైన, సురక్షితమైన సమాచారాన్ని అందించడానికి ఆధునిక వెబ్ సాంకేతికతలతో ఈ పోర్టల్ రూపొందించబడింది.'
                : 'Engineered with a lightweight editorial architecture delivering sub-second page loads, accessible mobile touch gestures, and high-performance citizen redressal.'}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem'
              }}
            >
              <div style={{ background: 'var(--canvas, #F7F6F2)', padding: '1.25rem', borderRadius: '12px' }}>
                <div style={{ fontWeight: 800, color: 'var(--saffron, #F36B21)', marginBottom: '4px' }}>01 · Zero-Runtime CSS</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {isTelugu ? 'ప్యూర్ CSS3 కస్టమ్ ప్రాపర్టీలతో తక్కువ డేటా ఖర్చుతో వేగవంతమైన లోడింగ్.' : 'Pure CSS design system eliminating bloated CSS runtime overhead for instant rural connectivity.'}
                </div>
              </div>

              <div style={{ background: 'var(--canvas, #F7F6F2)', padding: '1.25rem', borderRadius: '12px' }}>
                <div style={{ fontWeight: 800, color: 'var(--saffron, #F36B21)', marginBottom: '4px' }}>02 · Dual-Language Engine</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {isTelugu ? 'పేజీ రీలోడ్ లేకుండా తక్షణ ఇంగ్లీష్ & తెలుగు అనువాదం.' : 'Instant real-time switching between English and authentic native Telugu typography.'}
                </div>
              </div>

              <div style={{ background: 'var(--canvas, #F7F6F2)', padding: '1.25rem', borderRadius: '12px' }}>
                <div style={{ fontWeight: 800, color: 'var(--saffron, #F36B21)', marginBottom: '4px' }}>03 · Responsive Gestures</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {isTelugu ? 'మొబైల్ టచ్ స్వైప్ మరియు స్క్రోల్-స్టాక్ యానిమేషన్లు.' : 'Mobile-first swipe navigation, horizontal photo triggers, and vertical scroll-driven indicators.'}
                </div>
              </div>

              <div style={{ background: 'var(--canvas, #F7F6F2)', padding: '1.25rem', borderRadius: '12px' }}>
                <div style={{ fontWeight: 800, color: 'var(--saffron, #F36B21)', marginBottom: '4px' }}>04 · Resilient CMS</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {isTelugu ? 'సురక్షితమైన అడ్మిన్ ప్యానెల్ మరియు సిటిజన్ గ్రీవెన్స్ పోర్టల్.' : 'Secured content management with Cloudinary remote media handling and local disk fallbacks.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
