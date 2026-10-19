import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import JourneyTimeline from '../../components/public/JourneyTimeline';
import { api } from '../../services/api';

export default function AboutPage() {
  const [settings, setSettings] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadData = async () => {
      try {
        const [settRes, profRes] = await Promise.all([
          api.getSettings(),
          api.getProfile()
        ]);
        if (settRes?.data) setSettings(settRes.data);
        if (profRes?.data) setProfile(profRes.data);
      } catch (err) {
        console.error('Error loading about page data:', err);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <Header settings={settings} />
      <main id="main-content">
        {/* Page Header */}
        <section className="page-header-section">
          <div className="container">
            <div className="page-header-content">
              <div className="tag-label">Documented Biography</div>
              <h1 className="page-header-title">About Gandra Satyanarayana Rao</h1>
              <p className="page-header-subtitle">
                Comprehensive biographical record, educational credentials, and grassroots trajectory across Jayashankar Bhupalpally.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: Biography & Agrarian Roots */}
        <section className="section">
          <div className="container">
            <div className="intro-grid">
              <div>
                <div className="tag-label">Lineage & Upbringing</div>
              </div>
              <div>
                <h2 className="intro-lead-title">
                  Rooted in the agricultural soil of Buddharam village.
                </h2>
              </div>
              <div>
                <p className="intro-desc">
                  Born in 1965 in Buddharam (Bhudharam) village, Ghanapuram mandal, Gandra Satyanarayana Rao—affectionately known across the constituency as <strong>"Sathenna"</strong>—was raised in an agrarian family under the guidance of his father, <strong>Late Sri Gandra Samma Rao</strong>. His formative years in rural Warangal (now Jayashankar Bhupalpally district) shaped his enduring perspective on the primacy of irrigation water, dependable agricultural electricity, and the dignity of rural labor.
                </p>
                <p className="intro-desc" style={{ marginTop: '1rem' }}>
                  Alongside his spouse, <strong>Smt. Gandra Padma</strong>, he has maintained direct community accessibility for over three decades, resolving everyday land, irrigation, and civic matters for rural residents.
                </p>
              </div>
            </div>

            <div className="story-grid" style={{ marginTop: '3.5rem' }}>
              <article className="story-card story-card-large">
                <div className="story-img-wrap">
                  <img
                    src="/images/about/portrait-namaste.png"
                    alt="Gandra Satyanarayana Rao greeting constituents"
                    loading="lazy"
                    style={{ objectPosition: 'center 15%' }}
                  />
                </div>
                <div className="story-body">
                  <span className="story-category">Constituent Philosophy</span>
                  <h3 className="story-title">Direct Accessibility through Weekly "Praja Darbar"</h3>
                  <p className="story-text">
                    A cornerstone of Sathenna's public representation is the weekly open court held at the MLA Camp Office. Every constituent—regardless of political background—receives direct personal hearing, with representations endorsed immediately to the relevant department officials.
                  </p>
                </div>
              </article>

              <article className="story-card story-card-medium">
                <div className="story-img-wrap">
                  <img
                    src="/images/about/profile-formal.png"
                    alt="Gandra Satyanarayana Rao formal portrait"
                    loading="lazy"
                    style={{ objectPosition: 'center 10%' }}
                  />
                </div>
                <div className="story-body">
                  <span className="story-category">Academic & Technical Training</span>
                  <h3 className="story-title">Kakatiya University & Civil Engineering Literacy</h3>
                  <p className="story-text">
                    Earned his Bachelor of Arts degree from Kakatiya University, Warangal in 1983, complemented by an ITI diploma in Civil Engineering. This unique qualification empowers him with direct technical comprehension of reservoir canal gradients, check dam masonry, and highway alignment.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Section 2: Full Documented Journey Timeline */}
        <JourneyTimeline timeline={profile?.timeline} />

        {/* Section 3: Electoral Record Dossier */}
        <section className="section">
          <div className="container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
              <div className="tag-label">ECI Verified Record</div>
              <h2 className="section-title">The 2023 Decisive Mandate</h2>
              <p className="section-subtitle">
                Official election statistics recorded by the Election Commission of India for Bhupalpalle Assembly Constituency No. 108.
              </p>
            </div>

            <div className="admin-stats-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div className="admin-stat-card">
                <span className="admin-stat-label">Total Votes Polled</span>
                <span className="admin-stat-val" style={{ color: 'var(--orange-dark)' }}>
                  {profile?.electoralStats?.votesSecured ? profile.electoralStats.votesSecured.toLocaleString() : '123,116'}
                </span>
                <span className="admin-stat-meta">54.55% of total valid votes</span>
              </div>
              <div className="admin-stat-card">
                <span className="admin-stat-label">Winning Margin</span>
                <span className="admin-stat-val" style={{ color: 'var(--green-dark)' }}>
                  {profile?.electoralStats?.voteMargin ? profile.electoralStats.voteMargin.toLocaleString() : '52,699'}
                </span>
                <span className="admin-stat-meta">Decisive historical record</span>
              </div>
              <div className="admin-stat-card">
                <span className="admin-stat-label">Tenure & Assembly</span>
                <span className="admin-stat-val">2023–2028</span>
                <span className="admin-stat-meta">3rd Telangana Legislature</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
