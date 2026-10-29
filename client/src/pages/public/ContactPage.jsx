import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ContactChannels from '../../components/public/ContactChannels';
import { api } from '../../services/api';
import { useLanguage } from '../../i18n/LanguageContext';

export default function ContactPage() {
  const { isTelugu, t } = useLanguage();
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
              <div className="tag-label">
                {isTelugu ? 'అధికారిక సంప్రదింపులు' : 'Official Directory'}
              </div>
              <h1 className="page-header-title">{t('contact.pageTitle')}</h1>
              <p className="page-header-subtitle">{t('contact.pageSubtitle')}</p>
            </div>
          </div>
        </section>

        <ContactChannels settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
