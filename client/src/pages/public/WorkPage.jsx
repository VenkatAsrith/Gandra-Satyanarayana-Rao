import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { api, resolveMediaUrl } from '../../services/api';
import { useLanguage } from '../../i18n/LanguageContext';
import { DEFAULT_PROJECTS } from '../../components/public/WorkSpreads';

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

  const categories = useMemo(() => [
    { key: 'all', label: isTelugu ? 'అన్ని ప్రాజెక్టులు' : 'All Projects' },
    { key: 'irrigation', label: isTelugu ? 'సాగునీరు & కాలువలు' : 'Irrigation & Canals' },
    { key: 'heritage', label: isTelugu ? 'ఆలయాలు & ఆధ్యాత్మికం' : 'Heritage & Temples' },
    { key: 'housing', label: isTelugu ? 'ఇందిరమ్మ ఇళ్ళు & సంక్షేమం' : 'Housing & Welfare' },
    { key: 'transit', label: isTelugu ? 'రవాణా & రోడ్లు' : 'Transit & Roads' },
    { key: 'energy', label: isTelugu ? 'విద్యుత్ & సబ్‌స్టేషన్లు' : 'Power & Sub-stations' }
  ], [isTelugu]);

  // Only display projects directly from the live database
  const combinedProjects = useMemo(() => {
    return projects || [];
  }, [projects]);

  // Delete/hide categories that do not have related projects
  const availableCategories = useMemo(() => {
    return categories.filter((cat) => {
      if (cat.key === 'all') return true;
      return combinedProjects.some((p) => p.category === cat.key);
    });
  }, [categories, combinedProjects]);

  const filteredProjects = useMemo(() => {
    return combinedProjects.filter((p) => {
      if (categoryFilter === 'all') return true;
      return p.category === categoryFilter;
    });
  }, [combinedProjects, categoryFilter]);

  return (
    <>
      <Header settings={settings} />
      <main id="main-content">
        {/* Header */}
        <section className="page-header-section">
          <div className="container">
            <div className="page-header-content">
              <div className="tag-label green">
                {isTelugu ? 'తెలంగాణ శాసనసభ వేదిక' : 'Telangana Legislative Assembly'}
              </div>
              <h1 className="page-header-title">
                {isTelugu ? 'శాసనసభ ప్రసంగాలు & ప్రజా సమస్యల ప్రాతినిధ్యం' : 'Legislative Interventions & Floor Record'}
              </h1>
              <p className="page-header-subtitle">
                {isTelugu
                  ? 'భూపాలపల్లి నియోజకవర్గ రైతాంగం, సింగరేణి కార్మికులు మరియు ప్రజా సమస్యలపై తెలంగాణ శాసనసభలో లేవనెత్తిన అధికారిక ప్రశ్నలు మరియు ప్రసంగాలు.'
                  : 'Official Hansard record of legislative questions, zero-hour interventions, and floor demands representing the people of Bhupalpalle in the Telangana Legislative Assembly.'}
              </p>
            </div>
          </div>
        </section>

        {/* Legislative Interventions Section */}
        <section id="assembly" className="section bg-off-white">
          <div className="container">
            <div style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
              <div className="tag-label">
                {isTelugu ? 'అధికారిక హన్సార్డ్ రికార్డు' : 'Official Hansard Proceedings'}
              </div>
              <h2 className="section-title">
                {isTelugu ? 'ప్రజా సమస్యలకై శాసనసభలో గళం' : 'Documented Assembly Interventions'}
              </h2>
              <p className="section-subtitle">
                {isTelugu
                  ? 'శాసనసభ రికార్డుల ద్వారా నమోదైన ముఖ్యమైన ప్రసంగాలు మరియు విధానపరమైన డిమాండ్లు.'
                  : 'Chronological proceedings and policy interventions delivered on the floor of the House.'}
              </p>
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
