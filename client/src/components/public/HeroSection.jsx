import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection({ profile, settings }) {
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
            PROFILE
          </div>

          {/* Top metadata micro navigation bar */}
          <div className="hero-top-bar">
            <div className="hero-meta-nav">
              <div className="hero-meta-item">
                <span className="hero-meta-num">01</span>
                <span className="hero-meta-text">Public Profile</span>
              </div>
              <div className="hero-meta-item">
                <span className="hero-meta-num">02</span>
                <span className="hero-meta-text">Legislative Record</span>
              </div>
              <div className="hero-meta-item">
                <span className="hero-meta-num">03</span>
                <span className="hero-meta-text">
                  {settings?.constituencyName || 'Bhupalpalle'} ({settings?.constituencyNo || 108})
                </span>
              </div>
            </div>

            <div className="tag-label">
              Telangana Legislative Assembly
            </div>
          </div>

          {/* Centerpiece: Typography + Intersecting Portrait Layer */}
          <div className="hero-editorial-stage">
            <div className="hero-title-group">
              <div className="hero-title-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: 'var(--orange-dark)',
                    background: 'rgba(243, 107, 33, 0.1)',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid rgba(243, 107, 33, 0.2)'
                  }}
                >
                  {teluguName}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--gray)', fontWeight: 600 }}>
                  · Verified Public Representative
                </span>
              </div>

              <h1 style={{ margin: 0, fontSize: 0, lineHeight: 0 }}>
                <span className="hero-title-line line-1">GANDRA</span>
                <span className="hero-title-line line-2">SATYANARAYANA</span>
                <span className="hero-title-line line-3">RAO</span>
              </h1>
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
                  MLA · {settings?.constituencyName || 'Bhupalpalle'} ({settings?.constituencyNo || 108})
                </span>
                <span className="hero-portrait-tag-meta">3rd Telangana Assembly</span>
              </div>
            </div>
          </div>

          {/* Lower editorial footer */}
          <div className="hero-editorial-footer">
            <div className="hero-role-block">
              <div className="hero-role-line"></div>
              <div className="hero-role-content">
                <h2 className="hero-role-heading">Member of Legislative Assembly (MLA)</h2>
                <p className="hero-role-sub">
                  {settings?.constituencyName || 'Bhupalpalle'} Assembly Constituency No. {settings?.constituencyNo || 108} · Telangana Legislature
                </p>
                <p className="hero-role-desc">
                  Grassroots public representative elected in December 2023 on an Indian National Congress mandate, securing {stats.votesSecured ? stats.votesSecured.toLocaleString() : '123,116'} votes ({stats.voteSharePercentage || 54.55}% vote share) in {settings?.district || 'Jayashankar Bhupalpally'} district.
                </p>

                <div className="hero-meta-actions-group">
                  <div className="hero-stats-row">
                    <div className="hero-stat-item">
                      <span className="hero-stat-val">
                        {stats.voteMargin ? stats.voteMargin.toLocaleString() : '52,699'}
                      </span>
                      <span className="hero-stat-lbl">Vote Margin</span>
                    </div>
                    <div className="hero-stat-item">
                      <span className="hero-stat-val">{stats.tenureYears || '2023–28'}</span>
                      <span className="hero-stat-lbl">Tenure</span>
                    </div>
                    <div className="hero-stat-item">
                      <span className="hero-stat-val">{stats.voteSharePercentage || 54.55}%</span>
                      <span className="hero-stat-lbl">Vote Share</span>
                    </div>
                  </div>

                  <div className="hero-actions-row">
                    <Link to="/work" className="btn-pill btn-primary">
                      Explore Public Work
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                    <Link to="/about" className="btn-pill btn-secondary">
                      Biographical Record
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
