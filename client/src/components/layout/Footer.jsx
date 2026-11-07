import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

export default function Footer({ settings }) {
  const currentYear = new Date().getFullYear();
  const { isTelugu, t } = useLanguage();

  const brandName = isTelugu
    ? (settings?.teluguTitle || 'గండ్ర సత్యనారాయణ రావు (సత్తన్న)')
    : (settings?.siteTitle ? settings.siteTitle.split('|')[0].trim() : 'Gandra Satyanarayana Rao');

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--black)' }}>
              {brandName}
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, maxWidth: '420px', marginTop: '8px', color: 'var(--gray-dark)' }}>
              {isTelugu
                ? `భూపాలపల్లి నియోజకవర్గం (నెం. 108), జయశంకర్ భూపాలపల్లి జిల్లా, తెలంగాణ శాసనసభ్యులు. కాంగ్రెస్ పార్టీ శాసనసభ ప్రతినిధి.`
                : `Member of Legislative Assembly (MLA) for ${settings?.constituencyName || 'Bhupalpalle'} constituency (${settings?.constituencyNo || 108}), ${settings?.district || 'Jayashankar Bhupalpally'} district, ${settings?.state || 'Telangana'}. Representing the ${settings?.partyAffiliation || 'Indian National Congress'}.`}
            </p>
          </div>

          <div className="footer-nav-col">
            <span className="footer-nav-title">{t('footer.quickLinks')}</span>
            <Link to="/" className="footer-nav-link">{t('nav.home')}</Link>
            <Link to="/about" className="footer-nav-link">{t('nav.about')}</Link>
            <Link to="/work" className="footer-nav-link">{t('nav.work')}</Link>
            <Link to="/gallery" className="footer-nav-link">{t('nav.gallery')}</Link>
            <Link to="/constituency" className="footer-nav-link">{t('nav.constituency')}</Link>
          </div>

          <div className="footer-nav-col">
            <span className="footer-nav-title">{t('footer.legislativeOffice')}</span>
            <Link to="/contact" className="footer-nav-link">{t('nav.contact')}</Link>
            <Link to="/contact#grievances" className="footer-nav-link">{isTelugu ? 'ప్రజా సమస్యల నమోదు' : 'Public Grievance Intake'}</Link>
            <Link to="/work" className="footer-nav-link">{isTelugu ? 'శాసనసభ అభివృద్ధి పనులు' : 'Sanctioned Works Tracker'}</Link>
            <Link to="/developers" className="footer-nav-link">{isTelugu ? 'డెవలపర్స్ (Pendela Sunny & VenkatAsrith)' : 'Developers (Sunny & VenkatAsrith)'}</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright-wrap">
            <span>&copy; {currentYear} {brandName} · {t('footer.rightsReserved')}</span>
            <span className="footer-sep" aria-hidden="true"> | </span>
            <Link to="/copyright" className="footer-legal-link">
              {isTelugu ? 'కాపీరైట్ & సమాచార నిరాకరణ' : 'Copyright & Information Disclaimer'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
