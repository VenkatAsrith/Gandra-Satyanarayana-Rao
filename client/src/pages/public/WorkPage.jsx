import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { api, resolveMediaUrl } from '../../services/api';
import { useLanguage } from '../../i18n/LanguageContext';

export default function WorkPage() {
  const { isTelugu, t, formatDate } = useLanguage();
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
    { key: 'all', label: isTelugu ? 'అన్ని ప్రాజెక్టులు' : 'All Projects' },
    { key: 'irrigation', label: isTelugu ? 'సాగునీరు & కాలువలు' : 'Irrigation & Canals' },
    { key: 'heritage', label: isTelugu ? 'ఆలయాలు & ఆధ్యాత్మికం' : 'Heritage & Temples' },
    { key: 'housing', label: isTelugu ? 'ఇందిరమ్మ ఇళ్ళు & సంక్షేమం' : 'Housing & Welfare' },
    { key: 'transit', label: isTelugu ? 'రవాణా & రోడ్లు' : 'Transit & Roads' },
    { key: 'energy', label: isTelugu ? 'విద్యుత్ & సబ్‌స్టేషన్లు' : 'Power & Sub-stations' }
  ];

  return (
    <>
      <Header settings={settings} />
      <main id="main-content">
        {/* Header */}
        <section className="page-header-section">
          <div className="container">
            <div className="page-header-content">
              <div className="tag-label">
                {isTelugu ? 'మంజూరైన నిధులు & అభివృద్ధి' : 'Documented Initiatives'}
              </div>
              <h1 className="page-header-title">{t('works.pageTitle')}</h1>
              <p className="page-header-subtitle">{t('works.pageSubtitle')}</p>
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
                  type="button"
                  onClick={() => setCategoryFilter(cat.key)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.88rem',
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
              {filteredProjects.map((proj) => {
                const title = (isTelugu && proj.translations?.te?.title) ? proj.translations.te.title : proj.title;
                const summary = (isTelugu && proj.translations?.te?.summary) ? proj.translations.te.summary : proj.summary;
                const categoryLabel = (isTelugu && proj.translations?.te?.categoryLabel) ? proj.translations.te.categoryLabel : (proj.categoryLabel || proj.category);

                return (
                  <article key={proj._id} className="work-card">
                    <div className="work-card-media" style={{ height: '220px' }}>
                      <img
                        src={resolveMediaUrl(proj.mediaUrl || '/images/work/irrigation.jpg')}
                        alt={title}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = '/images/work/landscape.jpg';
                        }}
                      />
                      <span className="work-card-pill">{categoryLabel}</span>
                    </div>
                    <div className="work-card-content">
                      <div className="work-meta-row">
                        <span style={{ fontWeight: 700, color: 'var(--green-dark)' }}>
                          {proj.amountFormatted || (isTelugu ? 'ప్రభుత్వ మంజూరు' : 'Government Sanction')}
                        </span>
                        <span>{proj.mandal}</span>
                      </div>
                      <h3 className="work-title">{title}</h3>
                      <p className="work-text">{summary}</p>
                      <div style={{ marginTop: '1rem', fontSize: '0.82rem', color: 'var(--gray)', borderTop: '1px solid var(--border-light)', paddingTop: '8px' }}>
                        <div>
                          <strong>{t('common.status')}:</strong> {proj.statusNote || (isTelugu ? 'రికార్డులలో నమోదైనది' : 'Documented on record')}
                        </div>
                        <div style={{ marginTop: '4px' }}>
                          <strong>{t('works.actionTaken')}:</strong> {proj.representativeAction} {proj.sourceLabel && `· ${proj.sourceLabel}`}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {filteredProjects.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--gray)' }}>
                {t('common.emptyList')}
              </div>
            )}
          </div>
        </section>

        {/* Legislative Interventions Section */}
        <section id="assembly" className="section bg-off-white">
          <div className="container">
            <div style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
              <div className="tag-label">
                {isTelugu ? 'తెలంగాణ శాసనసభ వేదిక' : 'Legislative Assembly Floor'}
              </div>
              <h2 className="section-title">{t('activities.pageTitle')}</h2>
              <p className="section-subtitle">{t('activities.pageSubtitle')}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {activities
                .filter((a) => a.category === 'legislative' || a.isHighlighted)
                .map((act) => {
                  const actTitle = (isTelugu && act.translations?.te?.title) ? act.translations.te.title : act.title;
                  const actSummary = (isTelugu && act.translations?.te?.summary) ? act.translations.te.summary : act.summary;
                  const dateStr = act.activityDate ? formatDate(act.activityDate) : (isTelugu ? 'సభా రికార్డు' : 'Session Record');

                  return (
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
                          {act.categoryLabel || (isTelugu ? 'శాసనసభ ప్రశ్న' : 'Legislative Question')}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--gray)', fontWeight: 600 }}>
                          {dateStr}
                        </span>
                      </div>

                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--black)', marginBottom: '0.75rem' }}>
                        {actTitle}
                      </h3>
                      <p style={{ fontSize: '0.95rem', color: 'var(--gray-dark)', lineHeight: 1.7 }}>
                        {actSummary}
                      </p>
                      <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--gray)' }}>
                        <strong>{isTelugu ? 'హన్సార్డ్ ప్రొసీడింగ్స్:' : 'Hansard Record:'}</strong> {act.sourceLabel || 'Telangana Legislative Assembly Proceedings'}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
