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
  const constituencyName = settings?.constituencyName || 'Bhupalpalle';
  const constituencyNo = settings?.constituencyNo || 108;

  return (
    <section className="hero-wrapper" aria-label="Official Public Profile Hero">
      <div className="container">
        <div className="hero-editorial-canvas">
          {/* Architectural Watermark */}
          <div className="hero-bg-watermark" aria-hidden="true">
            {isTelugu ? 'ప్రజా నాయకుడు' : 'PROFILE'}
          </div>

          {/* Top Metadata Navigation Row */}
          <div className="hero-top-bar">
            <div className="hero-meta-nav">
              <div className="hero-meta-item">
                <span className="hero-meta-num">01</span>
                <span className="hero-meta-text">{isTelugu ? 'ప్రజా నాయకత్వం' : 'Public Profile'}</span>
              </div>
              <span className="hero-meta-sep" aria-hidden="true">—</span>
              <div className="hero-meta-item">
                <span className="hero-meta-num">02</span>
                <span className="hero-meta-text">{isTelugu ? 'శాసనసభ రికార్డు' : 'Legislative Record'}</span>
              </div>
              <span className="hero-meta-sep" aria-hidden="true">—</span>
              <div className="hero-meta-item">
                <span className="hero-meta-num">03</span>
                <span className="hero-meta-text">
                  {isTelugu ? `భూపాలపల్లి (${constituencyNo})` : `${constituencyName} (${constituencyNo})`}
                </span>
              </div>
            </div>

            <div className="hero-top-badge">
              <span className="hero-badge-dot" aria-hidden="true"></span>
              <span>{isTelugu ? 'తెలంగాణ శాసనసభ' : 'Telangana Legislative Assembly'}</span>
            </div>
          </div>

          {/* Asymmetrical Two-Column Main Stage */}
          <div className="hero-main-grid">
            {/* Left Content Column */}
            <div className="hero-content-col">
              <div className="hero-name-pill-wrapper">
                <span className="hero-telugu-pill">
                  {teluguName}
                </span>
                <span className="hero-verified-badge">
                  <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '14px', height: '14px' }}>
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {isTelugu ? 'అధికారిక ప్రజా రికార్డు' : 'Verified Public Representative'}
                </span>
              </div>

              {/* Responsive Controlled Display Name */}
              {isTelugu ? (
                <h1 className="hero-display-heading hero-telugu-heading">
                  <span className="hero-name-line line-1">గండ్ర</span>
                  <span className="hero-name-line line-2">సత్యనారాయణ</span>
                  <span className="hero-name-line line-3">రావు</span>
                </h1>
              ) : (
                <h1 className="hero-display-heading">
                  <span className="hero-name-line line-1">GANDRA</span>
                  <span className="hero-name-line line-2">SATYANARAYANA</span>
                  <span className="hero-name-line line-3">RAO</span>
                </h1>
              )}

              {/* Role Title & Factual Summary */}
              <div className="hero-role-group">
                <div className="hero-role-decor-line" aria-hidden="true"></div>
                <div className="hero-role-text-wrap">
                  <h2 className="hero-role-title">
                    {isTelugu ? 'శాసనసభ్యులు (MLA) — భూపాలపల్లి నియోజకవర్గం' : 'Member of Legislative Assembly (MLA)'}
                  </h2>
                  <div className="hero-role-subline">
                    {isTelugu
                      ? 'భూపాలపల్లి అసెంబ్లీ నియోజకవర్గం నెం. 108 · తెలంగాణ శాసనసభ'
                      : `${constituencyName} Assembly Constituency No. ${constituencyNo} · Telangana Legislature`}
                  </div>
                  <p className="hero-role-summary">
                    {isTelugu
                      ? `డిసెంబర్ 2023లో కాంగ్రెస్ పార్టీ తరఫున ${stats.votesSecured ? stats.votesSecured.toLocaleString('en-IN') : '1,23,116'} ఓట్లతో (${stats.voteSharePercentage || 54.55}% ఓట్ల శాతం) మరియు ${stats.voteMargin ? stats.voteMargin.toLocaleString('en-IN') : '52,699'} ఓట్ల భారీ మెజారిటీతో ఎన్నికై, నియోజకవర్గ రైతాంగం, విద్యార్థులు, యువత మరియు సింగరేణి కార్మికుల సంక్షేమానికి కట్టుబడి పనిచేస్తున్న ప్రజా నాయకుడు.`
                      : `Grassroots public representative elected in December 2023 on an Indian National Congress mandate, securing ${stats.votesSecured ? stats.votesSecured.toLocaleString() : '123,116'} votes (${stats.voteSharePercentage || 54.55}% vote share) with a historic ${stats.voteMargin ? stats.voteMargin.toLocaleString() : '52,699'} victory margin. Committed to farmers' water rights, student welfare, rural infrastructure, and Singareni workers.`}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Working Internal Routes */}
              <div className="hero-cta-group">
                <Link to="/work" className="btn-pill btn-primary">
                  {t('hero.viewWorks', isTelugu ? 'అభివృద్ధి పనుల రికార్డు' : 'Explore Development Works')}
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>

                <Link to="/about" className="btn-pill btn-secondary">
                  {isTelugu ? 'జీవిత ప్రస్థానం & చరిత్ర' : 'Biography & Journey'}
                </Link>

                <a href="#contact" className="btn-pill btn-outline">
                  {isTelugu ? 'క్యాంపు ఆఫీస్ / వినతులు' : 'Camp Office / Contact'}
                </a>
              </div>

              {/* Compact Electoral Credentials Strip */}
              <div className="hero-credentials-strip">
                <div className="hero-cred-card">
                  <span className="hero-cred-val">
                    {stats.voteMargin ? stats.voteMargin.toLocaleString('en-IN') : '52,699'}
                  </span>
                  <span className="hero-cred-lbl">{t('hero.voteMarginLabel', isTelugu ? 'మెజారిటీ ఓట్లు' : 'Vote Margin')}</span>
                </div>

                <div className="hero-cred-divider" aria-hidden="true"></div>

                <div className="hero-cred-card">
                  <span className="hero-cred-val">{stats.tenureYears || '2023–28'}</span>
                  <span className="hero-cred-lbl">{isTelugu ? 'శాసనసభ కాలపరిమితి' : 'Tenure (3rd Assembly)'}</span>
                </div>

                <div className="hero-cred-divider" aria-hidden="true"></div>

                <div className="hero-cred-card">
                  <span className="hero-cred-val">{stats.voteSharePercentage || 54.55}%</span>
                  <span className="hero-cred-lbl">{t('hero.voteShareLabel', isTelugu ? 'ఓట్ల శాతం' : 'Vote Share')}</span>
                </div>
              </div>
            </div>

            {/* Right Visual Column (Portrait & Inset Badge) */}
            <div className="hero-visual-col">
              <div className="hero-portrait-card">
                <div className="hero-portrait-frame">
                  <img
                    src={portrait}
                    alt="Gandra Satyanarayana Rao, Member of Legislative Assembly for Bhupalpalle"
                    className="hero-portrait-image"
                    loading="eager"
                  />
                  <div className="hero-portrait-gradient-overlay" aria-hidden="true"></div>
                </div>

                {/* Floating Glassmorphism Credentials Tag */}
                <div className="hero-portrait-tag">
                  <div className="hero-tag-icon-circle">
                    <img src="/images/party-symbol.png" alt="Emblem" style={{ width: '22px', height: '22px' }} />
                  </div>
                  <div className="hero-tag-text-block">
                    <span className="hero-tag-primary">
                      {isTelugu ? `ఎమ్మెల్యే · భూపాలపల్లి (${constituencyNo})` : `MLA · ${constituencyName} (${constituencyNo})`}
                    </span>
                    <span className="hero-tag-meta">
                      {isTelugu ? '3వ తెలంగాణ శాసనసభ · INC' : '3rd Telangana Assembly · INC'}
                    </span>
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
