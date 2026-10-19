import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import GalleryGrid from '../../components/public/GalleryGrid';
import { api } from '../../services/api';

export default function GalleryPage() {
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
              <div className="tag-label">Photographic Archive</div>
              <h1 className="page-header-title">Media & Photographic Archive</h1>
              <p className="page-header-subtitle">
                Comprehensive documented photography of public events, legislative proceedings, and constituent engagements across Jayashankar Bhupalpally.
              </p>
            </div>
          </div>
        </section>

        <GalleryGrid mediaItems={mediaItems} showFilter={true} isTeaser={false} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
