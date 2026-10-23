import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { useLanguage } from '../../i18n/LanguageContext';

export default function NotFoundPage() {
  const { t, isTelugu } = useLanguage();

  return (
    <div className="page-wrapper">
      <Header />

      <main className="main-content" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center' }}>
        <div className="site-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <div className="error-404-badge">404</div>
          <h1 className="error-404-title">{t('notFound.title')}</h1>
          <p className="error-404-text">{t('notFound.message')}</p>

          <div className="error-404-actions">
            <Link to="/" className="btn btn-primary">
              {t('notFound.returnHome')}
            </Link>
            <Link to="/work" className="btn btn-secondary">
              {t('notFound.browseWork')}
            </Link>
            <Link to="/about" className="btn btn-secondary">
              {t('notFound.browseBiography')}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
