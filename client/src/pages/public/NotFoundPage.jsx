import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { useLanguage } from '../../i18n/LanguageContext';

export default function NotFoundPage({ settings }) {
  const { isTelugu } = useLanguage();

  useEffect(() => {
    document.title = isTelugu
      ? 'పేజీ లభించలేదు (404) | గండ్ర సత్యనారాయణ రావు'
      : 'Page Not Found (404) | Gandra Satyanarayana Rao';
  }, [isTelugu]);

  return (
    <div className="page-wrapper" style={{ background: 'var(--canvas, #F7F6F2)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header settings={settings} />

      <main id="main-content" style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(4rem, 8vw, 7rem) 1.5rem' }}>
        <div className="container" style={{ maxWidth: '680px', textAlign: 'center' }}>
          <div className="not-found-num-wrap">
            <span className="not-found-large-num">404</span>
            <div className="not-found-tricolor-line" aria-hidden="true"></div>
          </div>

          <h1 className="not-found-title">
            {isTelugu ? 'ఈ పేజీ అధికారిక రికార్డులో లేదు.' : 'This page is not in the record.'}
          </h1>

          <p className="not-found-desc">
            {isTelugu
              ? 'మీరు వెతుకుతున్న పేజీ చిరునామా మార్చబడి ఉండవచ్చు లేదా శాసనసభ ఆర్కైవ్‌లో ప్రస్తుతం అందుబాటులో లేదు.'
              : 'The page you are looking for may have moved, been archived, or may no longer be available in the public dossier.'}
          </p>

          <div className="not-found-actions">
            <Link to="/" className="btn-pill btn-primary">
              <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              {isTelugu ? 'హోమ్‌పేజీకి తిరిగి వెళ్లండి' : 'Return Home'}
            </Link>

            <Link to="/work" className="btn-pill btn-secondary">
              {isTelugu ? 'అభివృద్ధి పనుల రికార్డు' : 'Explore Development Works'}
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
