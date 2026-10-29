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
                {isTelugu ? 'అధికారిక మీడియా & డాక్యుమెంటేషన్' : 'Official Media & Documentation'}
              </div>
              <h1 className="page-header-title">{t('gallery.pageTitle')}</h1>
              <p className="page-header-subtitle">{t('gallery.pageSubtitle')}</p>
            </div>

            {/* Quick Metrics Strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                marginTop: '2.5rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(0, 0, 0, 0.08)'
              }}
            >
              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--orange-dark)', lineHeight: 1 }}>
                  18
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: '6px' }}>
                  {isTelugu ? 'అధికారిక వీడియో రికార్డులు' : 'Field Video Records'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray)', marginTop: '2px' }}>
                  {isTelugu ? 'డ్రోన్లు, జాబ్ మేళా, సంక్షేమం' : 'Drones, Job Mela & Welfare'}
                </div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--green-dark)', lineHeight: 1 }}>
                  10+
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: '6px' }}>
                  {isTelugu ? 'ఛాయాచిత్ర రికార్డులు' : 'Photographic Stills'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray)', marginTop: '2px' }}>
                  {isTelugu ? 'అధికారిక చిత్రాలు & ప్రాజెక్టులు' : 'Official Portraits & Projects'}
                </div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--black)', lineHeight: 1 }}>
                  108
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: '6px' }}>
                  {isTelugu ? 'భూపాలపల్లి నియోజకవర్గం' : 'Bhupalpalle (No. 108)'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray)', marginTop: '2px' }}>
                  {isTelugu ? 'జయశంకర్ భూపాలపల్లి జిల్లా' : 'Jayashankar District'}
                </div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--orange)', lineHeight: 1 }}>
                  100%
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: '6px' }}>
                  {isTelugu ? 'పారదర్శక పౌర రికార్డు' : 'Verified Public Record'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray)', marginTop: '2px' }}>
                  {isTelugu ? 'క్షేత్రస్థాయి ప్రత్యక్ష సాక్ష్యాలు' : 'Direct Ground Documentation'}
                </div>
              </div>
            </div>
          </div>
        </section>

        <GalleryGrid mediaItems={mediaItems} showFilter={true} isTeaser={false} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
