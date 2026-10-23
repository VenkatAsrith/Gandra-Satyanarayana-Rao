import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

export default function HeroSection({ profile, settings }) {
  const { isTelugu, t } = useLanguage();

  const stats = profile?.electoralStats || {
    votesSecured: 123116,
    voteMargin: 52699,
    voteSharePercentage: 54.55,
    tenureYears: '2023–28'
  };

  const portrait = profile?.heroPortraitUrl || '/images/hero/hero-portrait.png';
  const teluguName = profile?.teluguName || 'గండ్ర సత్యనారాయణ రావు (సత్తెన్న)';

  return (
    <section className="hero-wrapper">
      <div className="container">
        <div className="hero-editorial-canvas">
          {/* Subtle graphic watermark element */}
          <div className="hero-bg-watermark" aria-hidden="true">
            {isTelugu ? 'ప్రజా నాయకుడు' : 'PROFILE'}
          </div>

          {/* Top metadata micro navigation bar */}
          <div className="hero-top-bar">
            <div className="hero-meta-nav">
              <div className="hero-meta-item">
                <span className="hero-meta-num">01</span>
                <span className="hero-meta-text">{isTelugu ? 'ప్రజా నాయకత్వం' : 'Public Profile'}</span>
              </div>
              <div className="hero-meta-item">
                <span className="hero-meta-num">02</span>
                <span className="hero-meta-text">{isTelugu ? 'శాసనసభ రికార్డు' : 'Legislative Record'}</span>
              </div>
              <div className="hero-meta-item">
                <span className="hero-meta-num">03</span>
                <span className="hero-meta-text">
                  {isTelugu ? 'భూపాలపల్లి (108)' : `${settings?.constituencyName || 'Bhupalpalle'} (${settings?.constituencyNo || 108})`}
                </span>
              </div>
            </div>

            <div className="tag-label">
              {isTelugu ? 'తెలంగాణ శాసనసభ' : 'Telangana Legislative Assembly'}
            </div>
          </div>

          {/* Centerpiece: Typography + Intersecting Portrait Layer */}
          <div className="hero-editorial-stage">
            <div className="hero-title-group">
              <div className="hero-title-badge">
                <span className="hero-telugu-pill">
                  {teluguName}
                </span>
                <span className="hero-verified-text">
                  {isTelugu ? '· ప్రజా ప్రతినిధి' : '· Verified Public Representative'}
                </span>
              </div>

              {isTelugu ? (
                <h1 className="hero-display-heading hero-telugu-heading">
                  <span className="hero-title-line line-1">గండ్ర</span>
                  <span className="hero-title-line line-2">సత్యనారాయణ</span>
                  <span className="hero-title-line line-3">రావు</span>
                </h1>
              ) : (
                <h1 className="hero-display-heading">
                  <span className="hero-title-line line-1">GANDRA</span>
                  <span className="hero-title-line line-2">SATYANARAYANA</span>
                  <span className="hero-title-line line-3">RAO</span>
                </h1>
              )}
            </div>

            {/* Intersecting Subject Portrait */}
            <div className="hero-portrait-stage">
              <img
                src={portrait}
                alt="Gandra Satyanarayana Rao, Member of Legislative Assembly for Bhupalpalle"
                className="hero-portrait-img"
                loading="eager"
              />
              <div className="hero-portrait-tag">
                <span className="hero-portrait-tag-text">
                  {isTelugu ? 'ఎమ్మెల్యే · భూపాలపల్లి (108)' : `MLA · ${settings?.constituencyName || 'Bhupalpalle'} (${settings?.constituencyNo || 108})`}
                </span>
                <span className="hero-portrait-tag-meta">
                  {isTelugu ? '3వ తెలంగాణ శాసనసభ' : '3rd Telangana Assembly'}
                </span>
              </div>
            </div>
          </div>

          {/* Lower editorial footer */}
          <div className="hero-editorial-footer">
            <div className="hero-role-block">
              <div className="hero-role-line"></div>
              <div className="hero-role-content">
                <h2 className="hero-role-heading">
                  {isTelugu ? 'శాసనసభ్యులు (MLA) — భూపాలపల్లి నియోజకవర్గం' : 'Member of Legislative Assembly (MLA)'}
                </h2>
                <p className="hero-role-sub">
                  {isTelugu
                    ? 'భూపాలపల్లి నియోజకవర్గం నెం. 108 · తెలంగాణ శాసనసభ'
                    : `${settings?.constituencyName || 'Bhupalpalle'} Assembly Constituency No. ${settings?.constituencyNo || 108} · Telangana Legislature`}
                </p>
                <p className="hero-role-desc">
                  {isTelugu
                    ? `డిసెంబర్ 2023లో కాంగ్రెస్ పార్టీ తరఫున ${stats.votesSecured ? stats.votesSecured.toLocaleString('en-IN') : '1,23,116'} ఓట్లతో (${stats.voteSharePercentage || 54.55}% ఓట్ల శాతం) మరియు ${stats.voteMargin ? stats.voteMargin.toLocaleString('en-IN') : '52,699'} ఓట్ల చారిత్రాత్మక మెజారిటీతో విజయం సాధించిన ప్రజా నాయకుడు.`
                    : `Grassroots public representative elected in December 2023 on an Indian National Congress mandate, securing ${stats.votesSecured ? stats.votesSecured.toLocaleString() : '123,116'} votes (${stats.voteSharePercentage || 54.55}% vote share) with a historic ${stats.voteMargin ? stats.voteMargin.toLocaleString() : '52,699'} victory margin.`}
                </p>

                <div className="hero-meta-actions-group">
                  <div className="hero-stats-row">
                    <div className="hero-stat-item">
                      <span className="hero-stat-val">
                        {stats.voteMargin ? stats.voteMargin.toLocaleString('en-IN') : '52,699'}
                      </span>
                      <span className="hero-stat-lbl">{t('hero.voteMarginLabel')}</span>
                    </div>
                    <div className="hero-stat-item">
                      <span className="hero-stat-val">{stats.tenureYears || '2023–28'}</span>
                      <span className="hero-stat-lbl">{isTelugu ? 'పదవీ కాలం' : 'Tenure'}</span>
                    </div>
                    <div className="hero-stat-item">
                      <span className="hero-stat-val">{stats.voteSharePercentage || 54.55}%</span>
                      <span className="hero-stat-lbl">{t('hero.voteShareLabel')}</span>
                    </div>
                  </div>

                  <div className="hero-actions-row">
                    <Link to="/work" className="btn-pill btn-primary">
                      {t('hero.viewWorks')}
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                    <Link to="/about" className="btn-pill btn-secondary">
                      {isTelugu ? 'జీవిత ప్రస్థానం' : 'Biographical Record'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
