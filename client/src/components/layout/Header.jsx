import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { api } from '../../services/api';

export default function Header({ settings: propSettings }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quickNavOpen, setQuickNavOpen] = useState(false);
  const [localSettings, setLocalSettings] = useState(null);
  const { language, setLanguage, isTelugu, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    if (!propSettings) {
      api.getSettings()
        .then((res) => {
          if (mounted && res?.data) setLocalSettings(res.data);
        })
        .catch((err) => console.error('Failed to load site settings for header:', err));
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      mounted = false;
      window.removeEventListener('scroll', handleScroll);
    };
  }, [propSettings]);

  const settings = propSettings || localSettings;

  const toggleMenu = () => {
    const nextState = !menuOpen;
    setMenuOpen(nextState);
    if (nextState) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setQuickNavOpen(false);
    document.body.classList.remove('menu-open');
  };

  const toggleQuickNav = () => {
    setQuickNavOpen(!quickNavOpen);
  };

  // Close menus on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname, location.hash]);

  const emblem = settings?.emblemUrl || '/images/party-symbol.png';

  const constituencyMeta = isTelugu
    ? `${settings?.constituencyNo || 108} - భూపాలపల్లి నియోజకవర్గం`
    : `${settings?.constituencyNo || 108} - ${settings?.constituencyName || 'Bhupalpalle'} Constituency`;

  const displayName = isTelugu
    ? (settings?.teluguTitle || 'గండ్ర సత్యనారాయణ రావు (సాతన్న)')
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

          {/* Mobile Actions: Correctly Aligned 3-Lines Hamburger & 3-Dots Quick Nav */}
          <div className="mobile-header-triggers">
            {/* Premium Aligned 3-Lines Hamburger Menu Button */}
            <button
              type="button"
              className={`mobile-hamburger-btn ${menuOpen ? 'active' : ''}`}
              aria-label={menuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu (3 Lines)'}
              aria-expanded={menuOpen}
              onClick={toggleMenu}
              title={menuOpen ? 'Close Menu' : 'Open Menu (3 Lines)'}
            >
              <div className="hamburger-box" aria-hidden="true">
                <span className="hamburger-line line-1"></span>
                <span className="hamburger-line line-2"></span>
                <span className="hamburger-line line-3"></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer with Quick Navigation Grid */}
      <div
        className={`mobile-nav-drawer ${menuOpen ? 'active' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        onClick={(e) => {
          if (e.target.classList.contains('mobile-nav-drawer')) {
            closeMenu();
          }
        }}
      >
        <div className="mobile-nav-content">
          {/* Mobile Header in Drawer */}
          <div className="mobile-drawer-header">
            <div className="mobile-drawer-brand">
              <span className="drawer-title">{displayName}</span>
              <span className="drawer-subtitle">{constituencyMeta}</span>
            </div>
            <button
              type="button"
              className="drawer-close-btn"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>

          {/* Quick Language Switcher */}
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

          {/* Quick Jump 3-Dots Grid */}
          <div className="drawer-quick-jump-section">
            <div className="drawer-section-heading">
              <span className="dots-mini" aria-hidden="true">• • •</span>
              <span>{isTelugu ? 'త్వరిత నావిగేషన్' : 'Quick Navigation'}</span>
            </div>
            <div className="quick-jump-grid">
              <Link to="/#activities" className="quick-jump-item" onClick={closeMenu}>
                <span className="quick-jump-icon">📅</span>
                <span className="quick-jump-text">{isTelugu ? 'కార్యక్రమాలు' : 'Activities'}</span>
              </Link>
              <Link to="/constituency" className="quick-jump-item" onClick={closeMenu}>
                <span className="quick-jump-icon">🏛️</span>
                <span className="quick-jump-text">{isTelugu ? 'మండలాలు' : 'Mandals'}</span>
              </Link>
              <Link to="/gallery" className="quick-jump-item" onClick={closeMenu}>
                <span className="quick-jump-icon">📸</span>
                <span className="quick-jump-text">{isTelugu ? 'గ్యాలరీ' : 'Gallery'}</span>
              </Link>
              <Link to="/work" className="quick-jump-item" onClick={closeMenu}>
                <span className="quick-jump-icon">🏛️</span>
                <span className="quick-jump-text">{isTelugu ? 'శాసనసభ' : 'Legislative'}</span>
              </Link>
            </div>
          </div>

          {/* Standard Navigation Links */}
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
              style={{ width: '100%', marginTop: '0.75rem', justifyContent: 'center' }}
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

      {/* Floating 3-Dots Quick Navigation Pill Dock on Mobile Devices (Visible after scrolling past hero) */}
      
    </>
  );
}
