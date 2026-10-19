import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ settings }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

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
        setMenuOpen(false);
        document.body.classList.remove('menu-open');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const emblem = settings?.emblemUrl || '/images/party-symbol.png';
  const constituencyMeta = `MLA · ${settings?.constituencyName || 'Bhupalpalle'} (${settings?.constituencyNo || 108}) · ${settings?.state || 'Telangana'}`;

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <Link to="/" className="brand-identity" aria-label="Gandra Satyanarayana Rao Public Profile Home">
            <div className="brand-badge">
              <img src={emblem} alt="Indian National Congress Affiliation Emblem" />
            </div>
            <div className="brand-info">
              <span className="brand-name">Gandra Satyanarayana Rao</span>
              <span className="brand-meta">{constituencyMeta}</span>
            </div>
          </Link>

          <nav className="nav-links" aria-label="Primary Navigation">
            <Link to="/" className={`nav-link ${location.pathname === '/' && !location.hash ? 'active' : ''}`}>
              Home
            </Link>
            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
              About
            </Link>
            <a href="/#journey" className="nav-link">
              Journey
            </a>
            <Link to="/work" className={`nav-link ${location.pathname === '/work' ? 'active' : ''}`}>
              Public Work
            </Link>
            <Link to="/gallery" className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}>
              Gallery
            </Link>
            <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
              Contact
            </Link>
          </nav>

          <div className="header-cta">
            <Link to="/contact" className="btn-pill btn-primary">
              Constituency Office
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
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
            toggleMenu();
          }
        }}
      >
        <div className="mobile-nav-content">
          <div className="mobile-nav-links">
            <Link to="/" className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
            <Link to="/about" className={`mobile-nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
              About
            </Link>
            <a href="/#journey" className="mobile-nav-link">
              Journey
            </a>
            <Link to="/work" className={`mobile-nav-link ${location.pathname === '/work' ? 'active' : ''}`}>
              Public Work
            </Link>
            <Link to="/gallery" className={`mobile-nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}>
              Gallery
            </Link>
            <Link to="/contact" className={`mobile-nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
              Contact
            </Link>
          </div>
          <div className="mobile-nav-footer">
            <p><strong>{settings?.constituencyName || 'Bhupalpalle'} Constituency ({settings?.constituencyNo || 108})</strong></p>
            <p>{settings?.district || 'Jayashankar Bhupalpally District'}, {settings?.state || 'Telangana'}</p>
          </div>
        </div>
      </div>
    </>
  );
}
