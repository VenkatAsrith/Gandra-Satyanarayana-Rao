import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import GalleryGrid from '../../components/public/GalleryGrid';
import { api } from '../../services/api';
import { useLanguage } from '../../i18n/LanguageContext';

export default function GalleryPage() {
  const { isTelugu, t } = useLanguage();
  const [settings, setSettings] = useState(null);
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadData = async () => {
      try {
        const [settRes, galRes] = await Promise.all([
          api.getSettings(),
          api.getGallery('limit=100')
        ]);
        if (settRes?.data) setSettings(settRes.data);
        if (galRes?.data) setMediaItems(galRes.data);
      } catch (err) {
        console.error('Error loading gallery page:', err);
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
                {isTelugu ? 'అధికారిక చిత్రమాలిక' : 'Photographic Archive'}
              </div>
              <h1 className="page-header-title">{t('gallery.pageTitle')}</h1>
              <p className="page-header-subtitle">{t('gallery.pageSubtitle')}</p>
            </div>
          </div>
        </section>

        <GalleryGrid mediaItems={mediaItems} showFilter={true} isTeaser={false} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
