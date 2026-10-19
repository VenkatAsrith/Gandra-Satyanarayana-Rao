import React from 'react';
import { Link } from 'react-router-dom';

export default function WorkSpreads({ projects }) {
  // If projects from API are passed, use them; otherwise use defaults
  const featureCanal = projects?.find((p) => p.slug?.includes('canal') || p.slug?.includes('ghanapur')) || {
    title: 'Ghanapur Reservoir Crop Canals Modernization',
    summary: 'Announced sanction of ₹31 crore for the comprehensive modernization and lining of four major crop canals under the Ghanapur reservoir. Works will safeguard water security for 44,000 acres utilizing Devadula lift irrigation networks and Sriram Sagar Project (SRSP) allocations.',
    categoryLabel: 'Irrigation Modernization',
    amountFormatted: '₹31 Crore Sanction',
    statusNote: 'Tenders initiated · 12-month completion timeframe · Reported by The Hans India & Dailyhunt',
    mediaUrl: '/images/work/irrigation.jpg'
  };

  const featureTemple = projects?.find((p) => p.slug?.includes('temple') || p.slug?.includes('kotanchu')) || {
    title: 'Kotanchu Sri Lakshmi Narasimha Swamy Temple Upgrade',
    summary: 'Special development initiative securing ₹12.15 crore for temple conservation, pilgrim queue complexes, dining halls, and tourism amenities at Sri Lakshmi Narasimha Swamy Temple in Kotanchu, Regonda mandal.',
    categoryLabel: 'Heritage & Tourism',
    amountFormatted: '₹12.15 Crore Sanction',
    statusNote: 'Construction progressing · Reported by The Hans India & V6 Velugu',
    mediaUrl: '/images/work/temple.jpg'
  };

  const secondaryProjects = projects
    ?.filter((p) => p._id !== featureCanal._id && p._id !== featureTemple._id)
    .slice(0, 3) || [];

  return (
    <section id="work" className="section bg-off-white">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div className="tag-label">Documented Initiatives</div>
            <h2 className="section-title">Public Work & Legislative Action</h2>
          </div>
          <div>
            <Link to="/work" className="btn-pill btn-secondary">
              View All Public Work
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="work-editorial-spread">
          {/* Feature Spread 1: Ghanapur Canal */}
          <article className="work-feature-row">
            <div className="work-feature-media">
              <img
                src={featureCanal.mediaUrl || '/images/work/irrigation.jpg'}
                alt="Ghanapur canal network and lush paddy fields"
                loading="lazy"
              />
            </div>
            <div className="work-feature-content">
              <div className="work-meta-tag">
                <span className="tag-label">{featureCanal.categoryLabel || 'Irrigation Modernization'}</span>
                <span style={{ fontWeight: 800, color: 'var(--green-dark)' }}>
                  {featureCanal.amountFormatted || '₹31 Crore Sanction'}
                </span>
              </div>
              <h3 className="work-feature-title">{featureCanal.title}</h3>
              <p className="work-feature-desc">{featureCanal.summary}</p>
              <div className="work-feature-status">
                <strong>Status:</strong> {featureCanal.statusNote || 'Tenders initiated · 12-month completion timeframe'}
              </div>
            </div>
          </article>

          {/* Feature Spread 2: Kotanchu Temple */}
          <article className="work-feature-row reverse">
            <div className="work-feature-media">
              <img
                src={featureTemple.mediaUrl || '/images/work/temple.jpg'}
                alt="Ancient stone temple architecture in Kotanchu"
                loading="lazy"
              />
            </div>
            <div className="work-feature-content">
              <div className="work-meta-tag">
                <span className="tag-label green">{featureTemple.categoryLabel || 'Heritage & Tourism'}</span>
                <span style={{ fontWeight: 800, color: 'var(--green-dark)' }}>
                  {featureTemple.amountFormatted || '₹12.15 Crore Sanction'}
                </span>
              </div>
              <h3 className="work-feature-title">{featureTemple.title}</h3>
              <p className="work-feature-desc">{featureTemple.summary}</p>
              <div className="work-feature-status">
                <strong>Status:</strong> {featureTemple.statusNote || 'Construction progressing · V6 Velugu'}
              </div>
            </div>
          </article>
        </div>

        {/* Secondary Work Cards Grid */}
        <div className="work-cards-grid">
          {secondaryProjects.length > 0 ? (
            secondaryProjects.map((proj) => (
              <article key={proj._id} className="work-card">
                <div className="work-card-media">
                  <img src={proj.mediaUrl || '/images/work/landscape.jpg'} alt={proj.title} loading="lazy" />
                  <span className="work-card-pill">{proj.categoryLabel || 'Public Welfare'}</span>
                </div>
                <div className="work-card-content">
                  <div className="work-meta-row">
                    <span>{proj.amountFormatted || 'State Sanction'}</span>
                    <span>{proj.mandal || 'Bhupalpally'}</span>
                  </div>
                  <h3 className="work-title">{proj.title}</h3>
                  <p className="work-text">{proj.summary}</p>
                  <div className="work-attribution">
                    Role: {proj.representativeAction || 'Documented Initiative'} · {proj.sourceLabel || 'Verified'}
                  </div>
                </div>
              </article>
            ))
          ) : (
            <>
              <article className="work-card">
                <div className="work-card-media">
                  <img src="/images/work/housing.jpg" alt="Indiramma housing residential units" loading="lazy" />
                  <span className="work-card-pill">Housing & Welfare</span>
                </div>
                <div className="work-card-content">
                  <div className="work-meta-row">
                    <span>September 2026</span>
                    <span>Bhupalpally</span>
                  </div>
                  <h3 className="work-title">Indiramma Housing Monitoring</h3>
                  <p className="work-text">
                    Convened departmental review meetings directing officials to accelerate construction timelines and ensure transparent delivery of housing to eligible families.
                  </p>
                  <div className="work-attribution">
                    Role: Directed officials & reviewed execution · Sakshi
                  </div>
                </div>
              </article>

              <article className="work-card">
                <div className="work-card-media">
                  <img src="/images/work/landscape.jpg" alt="Chityal bus station and rural roads" loading="lazy" />
                  <span className="work-card-pill">Transit & Roads</span>
                </div>
                <div className="work-card-content">
                  <div className="work-meta-row">
                    <span>January 2026</span>
                    <span>Chityal</span>
                  </div>
                  <h3 className="work-title">Chityal Bus Station & BT Roads</h3>
                  <p className="work-text">
                    Laid foundation stone for ₹3.75 crore modern bus terminus in Chityal alongside District Collector, following ₹4.16 crore rural BT road projects.
                  </p>
                  <div className="work-attribution">
                    Role: Foundation stone laying · Sakshi
                  </div>
                </div>
              </article>

              <article className="work-card">
                <div className="work-card-media">
                  <img src="/images/work/landscape.jpg" alt="33/11 KV electrical substation infrastructure" loading="lazy" />
                  <span className="work-card-pill">Energy & Agriculture</span>
                </div>
                <div className="work-card-content">
                  <div className="work-meta-row">
                    <span>June 2025</span>
                    <span>Manjunagar & Nawabupeta</span>
                  </div>
                  <h3 className="work-title">Three 33/11 KV Sub-stations</h3>
                  <p className="work-text">
                    Inaugurated three 33/11 KV power sub-stations (₹2 crore each) with Deputy Chief Minister Bhatti Vikramarka, stabilizing agricultural and domestic feeder supply.
                  </p>
                  <div className="work-attribution">
                    Role: Inaugurated with Deputy CM · Andhra Prabha
                  </div>
                </div>
              </article>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
