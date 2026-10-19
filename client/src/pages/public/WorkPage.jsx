import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { api } from '../../services/api';

export default function WorkPage() {
  const [settings, setSettings] = useState(null);
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadData = async () => {
      try {
        const [settRes, projRes, actRes] = await Promise.all([
          api.getSettings(),
          api.getProjects('limit=100'),
          api.getActivities('limit=100')
        ]);
        if (settRes?.data) setSettings(settRes.data);
        if (projRes?.data) setProjects(projRes.data);
        if (actRes?.data) setActivities(actRes.data);
      } catch (err) {
        console.error('Error loading work page:', err);
      }
    };

    loadData();
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (categoryFilter === 'all') return true;
    return p.category === categoryFilter;
  });

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'irrigation', label: 'Irrigation & Canals' },
    { key: 'heritage', label: 'Heritage & Temples' },
    { key: 'housing', label: 'Housing & Welfare' },
    { key: 'transit', label: 'Transit & Roads' },
    { key: 'energy', label: 'Power & Feeder Grid' }
  ];

  return (
    <>
      <Header settings={settings} />
      <main id="main-content">
        {/* Header */}
        <section className="page-header-section">
          <div className="container">
            <div className="page-header-content">
              <div className="tag-label">Documented Initiatives</div>
              <h1 className="page-header-title">Public Work & Legislative Record</h1>
              <p className="page-header-subtitle">
                Developmental sanctions, infrastructure modernizations, and floor interventions representing Bhupalpalle (108).
              </p>
            </div>
          </div>
        </section>

        {/* Filter Pills */}
        <section className="section-sm" style={{ background: 'var(--surface-alt)', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setCategoryFilter(cat.key)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: categoryFilter === cat.key ? 'var(--orange)' : 'var(--border)',
                    background: categoryFilter === cat.key ? 'var(--orange-dark)' : '#FFFFFF',
                    color: categoryFilter === cat.key ? '#FFFFFF' : 'var(--charcoal)',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section">
          <div className="container">
            <div className="work-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
              {filteredProjects.map((proj) => (
                <article key={proj._id} className="work-card">
                  <div className="work-card-media" style={{ height: '220px' }}>
                    <img src={proj.mediaUrl || '/images/work/irrigation.jpg'} alt={proj.title} loading="lazy" />
                    <span className="work-card-pill">{proj.categoryLabel || proj.category}</span>
                  </div>
                  <div className="work-card-content">
                    <div className="work-meta-row">
                      <span style={{ fontWeight: 700, color: 'var(--green-dark)' }}>
                        {proj.amountFormatted || 'Government Sanction'}
                      </span>
                      <span>{proj.mandal}</span>
                    </div>
                    <h3 className="work-title">{proj.title}</h3>
                    <p className="work-text">{proj.summary}</p>
                    <div style={{ marginTop: '1rem', fontSize: '0.82rem', color: 'var(--gray)', borderTop: '1px solid var(--border-light)', paddingTop: '8px' }}>
                      <div><strong>Status:</strong> {proj.statusNote || 'Documented on record'}</div>
                      <div style={{ marginTop: '4px' }}>
                        <strong>Attribution:</strong> {proj.representativeAction} · {proj.sourceLabel}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--gray)' }}>
                No documented projects found under this category.
              </div>
            )}
          </div>
        </section>

        {/* Legislative Interventions Section */}
        <section id="assembly" className="section bg-off-white">
          <div className="container">
            <div style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
              <div className="tag-label">Legislative Assembly Floor</div>
              <h2 className="section-title">Legislative Speeches & Interventions</h2>
              <p className="section-subtitle">
                Verbatim public concerns articulated during official sessions of the 3rd Telangana Legislative Assembly.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {activities
                .filter((a) => a.category === 'legislative' || a.isHighlighted)
                .map((act) => (
                  <div
                    key={act._id}
                    style={{
                      background: '#FFFFFF',
                      padding: '2rem',
                      borderRadius: '16px',
                      border: '1px solid var(--border)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '0.75rem' }}>
                      <span className="tag-label green">
                        {act.categoryLabel || 'Legislative Question'}
                      </span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--gray)', fontWeight: 600 }}>
                        {act.activityDate ? new Date(act.activityDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Session Record'}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--black)', marginBottom: '0.75rem' }}>
                      {act.title}
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--gray-dark)', lineHeight: 1.7 }}>
                      {act.summary}
                    </p>
                    <div style={{ marginTop: '1rem', fontSize: '0.78rem', color: 'var(--gray)' }}>
                      <strong>Hansard Record:</strong> {act.sourceLabel || 'Telangana Legislative Assembly Proceedings'}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
