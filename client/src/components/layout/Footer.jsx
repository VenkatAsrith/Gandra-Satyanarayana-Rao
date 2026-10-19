import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ settings }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--black)' }}>
              {settings?.siteTitle ? settings.siteTitle.split('|')[0].trim() : 'Gandra Satyanarayana Rao'}
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, maxWidth: '400px', marginTop: '8px' }}>
              Member of Legislative Assembly (MLA) for {settings?.constituencyName || 'Bhupalpalle'} constituency ({settings?.constituencyNo || 108}), {settings?.district || 'Jayashankar Bhupalpally'} district, {settings?.state || 'Telangana'}. Representing the {settings?.partyAffiliation || 'Indian National Congress'}.
            </p>
          </div>

          <div className="footer-nav-col">
            <span className="footer-nav-title">Profile Navigation</span>
            <Link to="/" className="footer-nav-link">Home Profile</Link>
            <Link to="/about" className="footer-nav-link">About & Biography</Link>
            <a href="/#journey" className="footer-nav-link">Public Journey</a>
            <Link to="/work" className="footer-nav-link">Public Work & Initiatives</Link>
            <Link to="/gallery" className="footer-nav-link">Media Gallery</Link>
          </div>

          <div className="footer-nav-col">
            <span className="footer-nav-title">Constituency & Office</span>
            <Link to="/contact" className="footer-nav-link">Constituency Office</Link>
            <Link to="/contact#grievances" className="footer-nav-link">Public Representations</Link>
            <Link to="/work#assembly" className="footer-nav-link">Legislative Interventions</Link>
            <Link to="/admin/login" className="footer-nav-link" style={{ opacity: 0.6 }}>Portal Administration</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {currentYear} Gandra Satyanarayana Rao · Factual Public Profile Website
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>
            {settings?.verificationNotice || 'Documented strictly from verifiable public records, legislative filings, and regional press reporting.'}
          </div>
        </div>
      </div>
    </footer>
  );
}
