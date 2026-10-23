import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { resolveMediaUrl } from '../../services/api';

export default function GalleryGrid({ mediaItems, showFilter = true, isTeaser = false }) {
  const { isTelugu, t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeItem, setActiveItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const defaultMedia = [
    {
      publicId: 'local_public-address',
      secureUrl: '/images/events/public-address.png',
      title: 'Constituency Mass Meeting Address with Chief Minister A. Revanth Reddy',
      titleTe: 'ముఖ్యమంత్రి ఎ. రేవంత్ రెడ్డి గారితో నియోజకవర్గ ప్రజా సభ',
      category: 'events',
      categoryLabel: 'Public Events · Stage Address',
      categoryLabelTe: 'ప్రజా సభలు · వేదిక ప్రసంగం',
      altText: 'Public speech on stage with Chief Minister A. Revanth Reddy',
      spanClass: 'span-8'
    },
    {
      publicId: 'local_portrait-namaste',
      secureUrl: '/images/about/portrait-namaste.png',
      title: 'Weekly "Praja Darbar" Greeting Portrait',
      titleTe: 'వారపు ప్రజా దర్బార్‌లో ప్రజలకు నమస్కరిస్తున్న సత్తెన్న',
      category: 'portraits',
      categoryLabel: 'Official Portraits · Grassroots',
      categoryLabelTe: 'అధికారిక చిత్రాలు · ప్రజా నాయకత్వం',
      altText: 'Constituent greeting portrait with folded hands',
      spanClass: 'span-4'
    },
    {
      publicId: 'local_profile-formal',
      secureUrl: '/images/about/profile-formal.png',
      title: 'Formal Legislative Profile & Studio Portrait',
      titleTe: 'శాసనసభ్యుల అధికారిక ప్రొఫైల్ చిత్రం',
      category: 'portraits',
      categoryLabel: 'Official Portraits · Leadership',
      categoryLabelTe: 'అధికారిక చిత్రాలు · నాయకత్వం',
      altText: 'Formal studio leadership portrait of Gandra Satyanarayana Rao',
      spanClass: 'span-4'
    },
    {
      publicId: 'local_family-revanth',
      secureUrl: '/images/about/family-revanth.png',
      title: 'Smt. Gandra Padma & Sathenna with CM Revanth Reddy',
      titleTe: 'ముఖ్యమంత్రితో శ్రీమతి గండ్ర పద్మ మరియు సత్తెన్న సంప్రదింపులు',
      category: 'constituency',
      categoryLabel: 'Governance · State Coordination',
      categoryLabelTe: 'పాలన · రాష్ట్ర సమన్వయం',
      altText: 'Gandra Satyanarayana Rao and Smt. Gandra Padma meeting Chief Minister A. Revanth Reddy',
      spanClass: 'span-4'
    },
    {
      publicId: 'local_hero-portrait',
      secureUrl: '/images/hero/hero-portrait.png',
      title: 'Elected MLA for Bhupalpalle (108)',
      titleTe: 'భూపాలపల్లి నియోజకవర్గ ఎన్నికల విజయం (నెం. 108)',
      category: 'portraits',
      categoryLabel: 'Official Portraits · Assembly Mandate',
      categoryLabelTe: 'అధికారిక చిత్రాలు · ప్రజా తీర్పు',
      altText: 'Official portrait of Gandra Satyanarayana Rao with INC scarf',
      spanClass: 'span-4'
    }
  ];

  const items = mediaItems && mediaItems.length ? mediaItems : defaultMedia;

  const filterLabels = {
    all: isTelugu ? 'అన్నీ' : 'All',
    portraits: isTelugu ? 'అధికారిక చిత్రాలు' : 'Portraits',
    events: isTelugu ? 'ప్రజా సభలు & పర్యటనలు' : 'Public Events',
    constituency: isTelugu ? 'రాష్ట్ర సమన్వయం' : 'Constituency',
    work: isTelugu ? 'అభివృద్ధి పనులు' : 'Public Works'
  };

  const filteredItems = items.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.category === selectedFilter;
  });

  const openLightbox = (item, index) => {
    setActiveItem(item);
    setCurrentIndex(index);
    document.body.classList.add('menu-open');
  };

  const closeLightbox = () => {
    setActiveItem(null);
    setCurrentIndex(-1);
    document.body.classList.remove('menu-open');
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    if (filteredItems.length === 0) return;
    const newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setCurrentIndex(newIndex);
    setActiveItem(filteredItems[newIndex]);
  };

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    if (filteredItems.length === 0) return;
    const newIndex = (currentIndex + 1) % filteredItems.length;
    setCurrentIndex(newIndex);
    setActiveItem(filteredItems[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeItem) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem, currentIndex, filteredItems]);

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div className="tag-label">
              {isTelugu ? 'చిత్రమాలిక & రికార్డులు' : 'Media & Documentation'}
            </div>
            <h2 className="section-title">
              {isTelugu ? 'అధికారిక చిత్రమాలిక' : 'Photographic Archive'}
            </h2>
          </div>
          {isTeaser && (
            <div>
              <Link to="/gallery" className="btn-pill btn-secondary">
                {t('gallery.pageTitle')}
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>

        {/* Filter Pills */}
        {showFilter && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            {['all', 'portraits', 'events', 'constituency', 'work'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedFilter(cat)}
                style={{
                  padding: '6px 16px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: selectedFilter === cat ? 'var(--orange)' : 'var(--border)',
                  background: selectedFilter === cat ? 'var(--orange-dark)' : '#FFFFFF',
                  color: selectedFilter === cat ? '#FFFFFF' : 'var(--charcoal)',
                  transition: 'var(--transition-fast)'
                }}
              >
                {filterLabels[cat] || cat}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        <div className="gallery-grid" style={{ marginTop: '2rem' }}>
          {filteredItems.map((item, idx) => {
            const spanClass = item.spanClass || (idx === 0 && isTeaser ? 'span-8' : 'span-4');
            const itemTitle = (isTelugu && item.titleTe) ? item.titleTe : item.title;
            const categoryLabel = (isTelugu && item.categoryLabelTe) ? item.categoryLabelTe : (item.categoryLabel || item.category);

            return (
              <div
                key={item._id || item.publicId || idx}
                className={`gallery-card ${spanClass}`}
                tabIndex={0}
                role="button"
                aria-label={`View photo: ${itemTitle}`}
                onClick={() => openLightbox(item, idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(item, idx);
                  }
                }}
              >
                <div className="gallery-thumb">
                  <img
                    src={resolveMediaUrl(item.secureUrl)}
                    alt={item.altText || itemTitle}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/images/events/public-address.png';
                    }}
                  />
                </div>
                <div className="gallery-card-info">
                  <span className="gallery-card-category">{categoryLabel}</span>
                  <h3 className="gallery-card-title">{itemTitle}</h3>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--gray)' }}>
            {t('common.emptyList')}
          </div>
        )}

        {/* Lightbox Modal */}
        {activeItem && (
          <div
            className="lightbox-modal active"
            role="dialog"
            aria-modal="true"
            aria-label="Image Lightbox"
            onClick={(e) => {
              if (e.target.classList.contains('lightbox-modal')) {
                closeLightbox();
              }
            }}
          >
            <div className="lightbox-container">
              <button className="lightbox-close-btn" aria-label="Close Lightbox" onClick={closeLightbox}>
                &times;
              </button>
              <button className="lightbox-nav-btn lightbox-prev" aria-label="Previous Image" onClick={prevImage}>
                &#10094;
              </button>
              <button className="lightbox-nav-btn lightbox-next" aria-label="Next Image" onClick={nextImage}>
                &#10095;
              </button>
              <div className="lightbox-img-wrap">
                <img
                  className="lightbox-img"
                  src={resolveMediaUrl(activeItem.secureUrl)}
                  alt={activeItem.altText || activeItem.title}
                />
              </div>
              <div className="lightbox-caption">
                <h4 className="lightbox-title">
                  {(isTelugu && activeItem.titleTe) ? activeItem.titleTe : activeItem.title}
                </h4>
                <p className="lightbox-desc">
                  {(isTelugu && activeItem.categoryLabelTe)
                    ? activeItem.categoryLabelTe
                    : (activeItem.caption || activeItem.categoryLabel || activeItem.category)}
                </p>
                <small style={{ color: 'rgba(255,255,255,0.6)', marginTop: '4px', display: 'block' }}>
                  {t('gallery.lightboxHelp')}
                </small>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
