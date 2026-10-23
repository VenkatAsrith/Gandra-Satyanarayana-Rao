import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

export default function Header({ settings }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, isTelugu, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    document.body.classList.remove('menu-open');
  }, [location.pathname, location.hash]);

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove('menu-open');
  };

  const toggleMenu = () => {
    const nextState = !menuOpen;
    setMenuOpen(nextState);
    if (nextState) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        closeMenu();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const emblem = settings?.emblemUrl || '/images/party-symbol.png';
  const constituencyMeta = isTelugu
    ? `ఎమ్మెల్యే · భూపాలపల్లి (108) · తెలంగాణ`
    : `MLA · ${settings?.constituencyName || 'Bhupalpalle'} (${settings?.constituencyNo || 108}) · ${settings?.state || 'Telangana'}`;

  const displayName = isTelugu
    ? (settings?.teluguTitle || 'గండ్ర సత్యనారాయణ రావు (సత్తెన్న)')
    : (settings?.siteTitle?.split('|')[0]?.trim() || 'Gandra Satyanarayana Rao');

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <Link
            to="/"
            className="brand-identity"
            aria-label="Gandra Satyanarayana Rao Public Profile Home"
            onClick={closeMenu}
          >
            <div className="brand-badge">
              <img src={emblem} alt="Indian National Congress Emblem" />
            </div>
            <div className="brand-info">
              <span className="brand-name">{displayName}</span>
              <span className="brand-meta">{constituencyMeta}</span>
            </div>
          </Link>

          <nav className="nav-links" aria-label="Primary Navigation">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' && !location.hash ? 'active' : ''}`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/about"
              className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/work"
              className={`nav-link ${location.pathname === '/work' ? 'active' : ''}`}
            >
              {t('nav.work')}
            </Link>
            <Link
              to="/gallery"
              className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}
            >
              {t('nav.gallery')}
            </Link>
            <Link
              to="/constituency"
              className={`nav-link ${location.pathname === '/constituency' ? 'active' : ''}`}
            >
              {t('nav.constituency')}
            </Link>
            <Link
              to="/contact"
              className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
            >
              {t('nav.contact')}
            </Link>
          </nav>

          <div className="header-actions-group">
            {/* Language Switcher */}
            <div className="lang-switcher-pill" role="group" aria-label="Language selection">
              <button
                type="button"
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
                aria-pressed={language === 'en'}
              >
                EN
              </button>
              <button
                type="button"
                className={`lang-btn ${language === 'te' ? 'active' : ''}`}
                onClick={() => setLanguage('te')}
                aria-pressed={language === 'te'}
              >
                తెలుగు
              </button>
            </div>

            <div className="header-cta">
              <Link to="/contact" className="btn-pill btn-primary">
                {isTelugu ? 'క్యాంపు ఆఫీస్' : 'Camp Office'}
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <button
            className="mobile-toggle"
            aria-label={menuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`mobile-nav-drawer ${menuOpen ? 'active' : ''}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => {
          if (e.target.classList.contains('mobile-nav-drawer')) {
            closeMenu();
          }
        }}
      >
        <div className="mobile-nav-content">
          {/* Mobile Language Switcher */}
          <div className="mobile-lang-row">
            <span className="text-secondary text-sm">భాష / Language:</span>
            <div className="lang-switcher-pill">
              <button
                type="button"
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
              >
                English
              </button>
              <button
                type="button"
                className={`lang-btn ${language === 'te' ? 'active' : ''}`}
                onClick={() => setLanguage('te')}
              >
                తెలుగు
              </button>
            </div>
          </div>

          <div className="mobile-nav-links">
            <Link
              to="/"
              className={`mobile-nav-link ${location.pathname === '/' && !location.hash ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/about"
              className={`mobile-nav-link ${location.pathname === '/about' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/work"
              className={`mobile-nav-link ${location.pathname === '/work' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {t('nav.work')}
            </Link>
            <Link
              to="/gallery"
              className={`mobile-nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {t('nav.gallery')}
            </Link>
            <Link
              to="/constituency"
              className={`mobile-nav-link ${location.pathname === '/constituency' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {t('nav.constituency')}
            </Link>
            <Link
              to="/contact"
              className={`mobile-nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {t('nav.contact')}
            </Link>

            <Link
              to="/contact"
              className="btn-pill btn-primary"
              style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}
              onClick={closeMenu}
            >
              {isTelugu ? 'క్యాంపు ఆఫీస్ వినతులు' : 'Camp Office & Praja Darbar'}
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          <div className="mobile-nav-footer">
            <p>
              <strong>
                {isTelugu ? 'భూపాలపల్లి నియోజకవర్గం (108)' : `${settings?.constituencyName || 'Bhupalpalle'} Constituency (${settings?.constituencyNo || 108})`}
              </strong>
            </p>
            <p>
              {isTelugu
                ? 'జయశంకర్ భూపాలపల్లి జిల్లా, తెలంగాణ రాష్ట్రం'
                : `${settings?.district || 'Jayashankar Bhupalpally District'}, ${settings?.state || 'Telangana'}`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
