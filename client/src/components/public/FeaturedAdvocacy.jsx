import React from 'react';
import { Link } from 'react-router-dom';

export default function FeaturedAdvocacy({ activity }) {
  const data = activity || {
    title: 'Advocacy for Singareni Coal Miners & Displaced Families',
    summary: 'During the Telangana Legislative Assembly session, Gandra Satyanarayana Rao forcefully raised the long-standing welfare concerns of Singareni Collieries workers, seeking comprehensive rehabilitation packages for land-displaced families, medical security for retired employees, and fair terms for contract laborers.',
    categoryLabel: 'Assembly Intervention · September 18, 2026',
    mediaUrl: '/images/events/public-address.png'
  };

  return (
    <section className="section">
      <div className="container">
        <div className="featured-banner">
          <div className="featured-grid">
            <div className="featured-content">
              <div className="featured-meta-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                {data.categoryLabel || 'Assembly Intervention'}
              </div>
              <h2 className="featured-title">{data.title}</h2>
              <p className="featured-desc">{data.summary}</p>
              <div>
                <Link to="/work#assembly" className="btn-pill btn-dark">
                  Read Legislative Interventions
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <div className="featured-img-frame">
                <img
                  src={data.mediaUrl || '/images/events/public-address.png'}
                  alt={data.title}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
