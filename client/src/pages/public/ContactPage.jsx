import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ContactChannels from '../../components/public/ContactChannels';
import { api } from '../../services/api';

export default function ContactPage() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadData = async () => {
      try {
        const settRes = await api.getSettings();
        if (settRes?.data) setSettings(settRes.data);
      } catch (err) {
        console.error('Error loading contact page:', err);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <Header settings={settings} />
      <main id="main-content">
        <section className="page-header-section">
          <div className="container">
            <div className="page-header-content">
              <div className="tag-label">Official Directory</div>
              <h1 className="page-header-title">Constituency Office & Contact</h1>
              <p className="page-header-subtitle">
                Official contact channels, Camp Office location in Buddharam, and direct citizen grievance representation submission.
              </p>
            </div>
          </div>
        </section>

        <ContactChannels settings={settings} showForm={true} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
