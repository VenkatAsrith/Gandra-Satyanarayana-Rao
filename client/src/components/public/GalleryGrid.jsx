import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { resolveMediaUrl } from '../../services/api';
import { MEDIA_CATALOG } from '../../data/mediaCatalog';

export default function GalleryGrid({ mediaItems, showFilter = true, isTeaser = false, initialFormat = 'all' }) {
  const { isTelugu, t } = useLanguage();
  const [searchParams] = useSearchParams();

  // URL param support for deep linking: ?type=video or ?category=agriculture
  const urlType = searchParams.get('type');
  const urlCategory = searchParams.get('category');

  const [formatFilter, setFormatFilter] = useState(urlType || initialFormat || 'all');
  const [categoryFilter, setCategoryFilter] = useState(urlCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeItem, setActiveItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // Core fallback official media
  const defaultPortraits = [
    {
      publicId: 'local_public-address',
      secureUrl: '/images/events/public-address.png',
      thumbnailUrl: '/images/events/public-address.png',
      mediaType: 'image',
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
      thumbnailUrl: '/images/about/portrait-namaste.png',
      mediaType: 'image',
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
      thumbnailUrl: '/images/about/profile-formal.png',
      mediaType: 'image',
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
      thumbnailUrl: '/images/about/family-revanth.png',
      mediaType: 'image',
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
      thumbnailUrl: '/images/hero/hero-portrait.png',
      mediaType: 'image',
      title: 'Elected MLA for Bhupalpalle (108)',
      titleTe: 'భూపాలపల్లి నియోజకవర్గ ఎన్నికల విజయం (నెం. 108)',
      category: 'portraits',
      categoryLabel: 'Official Portraits · Assembly Mandate',
      categoryLabelTe: 'అధికారిక చిత్రాలు · ప్రజా తీర్పు',
      altText: 'Official portrait of Gandra Satyanarayana Rao with INC scarf',
      spanClass: 'span-4'
    }
  ];

  // Merge items: prioritize live API items if present and rich, plus ensure all catalog videos/photos are present
  const allCatalogMedia = [
    ...(MEDIA_CATALOG?.photos || []),
    ...(MEDIA_CATALOG?.videos || []),
    ...defaultPortraits
  ];

  // If backend returns mediaItems, merge them uniquely
  let itemsPool = allCatalogMedia;
  if (mediaItems && mediaItems.length > 5) {
    const seen = new Set();
    const merged = [];
    for (const item of [...mediaItems, ...allCatalogMedia]) {
      const idKey = item.publicId || item.slug || item._id;
      if (!seen.has(idKey)) {
        seen.add(idKey);
        merged.push(item);
      }
    }
    itemsPool = merged;
  }

  // Count items by format
  const videoCount = itemsPool.filter((m) => m.mediaType === 'video').length;
  const photoCount = itemsPool.filter((m) => m.mediaType !== 'video').length;

  const categoryLabels = {
    all: isTelugu ? 'అన్ని విభాగాలు' : 'All Categories',
    agriculture: isTelugu ? 'వ్యవసాయం & సాంకేతికత' : 'Agriculture & Tech',
    welfare: isTelugu ? 'యువత & సంక్షేమం' : 'Youth & Welfare',
    education: isTelugu ? 'విద్య & విద్యార్థులు' : 'Education & Welfare',
    events: isTelugu ? 'సంస్కృతి & పండుగలు' : 'Culture & Festivals',
    constituency: isTelugu ? 'నియోజకవర్గం & పర్యటనలు' : 'Constituency & Field',
    work: isTelugu ? 'అభివృద్ధి పనులు' : 'Public Works',
    portraits: isTelugu ? 'అధికారిక చిత్రాలు' : 'Official Portraits'
  };

  // Filter pipeline
  const filteredItems = itemsPool.filter((item) => {
    // 1. Format filter
    if (formatFilter === 'video' && item.mediaType !== 'video') return false;
    if (formatFilter === 'image' && item.mediaType === 'video') return false;

    // 2. Category filter
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;

    // 3. Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const titleMatch = (item.title || '').toLowerCase().includes(q) || (item.titleTe || '').includes(q);
      const capMatch = (item.caption || '').toLowerCase().includes(q) || (item.captionTe || '').includes(q);
      const catMatch = (item.categoryLabel || '').toLowerCase().includes(q) || (item.categoryLabelTe || '').includes(q);
      if (!titleMatch && !capMatch && !catMatch) return false;
    }

    return true;
  });

  // If teaser, slice to 6 items
  const displayItems = isTeaser ? filteredItems.slice(0, 6) : filteredItems;

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

  const prevItem = (e) => {
    if (e) e.stopPropagation();
    if (displayItems.length === 0) return;
    const newIndex = (currentIndex - 1 + displayItems.length) % displayItems.length;
    setCurrentIndex(newIndex);
    setActiveItem(displayItems[newIndex]);
  };

  const nextItem = (e) => {
    if (e) e.stopPropagation();
    if (displayItems.length === 0) return;
    const newIndex = (currentIndex + 1) % displayItems.length;
    setCurrentIndex(newIndex);
    setActiveItem(displayItems[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeItem) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevItem();
      if (e.key === 'ArrowRight') nextItem();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem, currentIndex, displayItems]);

  return (
    <section className="section" id="media-archive">
      <div className="container">
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div className="tag-label">
              {isTelugu ? 'అధికారిక మీడియా రికార్డులు' : 'Official Media Records'}
            </div>
            <h2 className="section-title">
              {isTelugu ? 'చిత్రమాలిక & క్షేత్రస్థాయి వీడియోలు' : 'Photographic & Video Archive'}
            </h2>
          </div>
          {isTeaser && (
            <div>
              <Link to="/gallery" className="btn-pill btn-secondary">
                {t('gallery.pageTitle', isTelugu ? 'పూర్తి మీడియా రికార్డులు' : 'Explore Full Archive')}
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

        {/* Filter Controls (Full view only) */}
        {showFilter && (
          <>
            {/* Format Tabs & Search Box */}
            <div className="media-tabs-wrapper">
              <div className="media-format-tabs" role="tablist" aria-label="Media Format">
                <button
                  type="button"
                  className={`media-tab-btn ${formatFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setFormatFilter('all')}
                  role="tab"
                  aria-selected={formatFilter === 'all'}
                >
                  {isTelugu ? 'అన్నీ' : 'All Media'}
                  <span className="media-tab-badge">{itemsPool.length}</span>
                </button>
                <button
                  type="button"
                  className={`media-tab-btn ${formatFilter === 'video' ? 'active' : ''}`}
                  onClick={() => setFormatFilter('video')}
                  role="tab"
                  aria-selected={formatFilter === 'video'}
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '15px', height: '15px' }}>
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                  {isTelugu ? 'వీడియో రికార్డులు' : 'Official Videos'}
                  <span className="media-tab-badge">{videoCount}</span>
                </button>
                <button
                  type="button"
                  className={`media-tab-btn ${formatFilter === 'image' ? 'active' : ''}`}
                  onClick={() => setFormatFilter('image')}
                  role="tab"
                  aria-selected={formatFilter === 'image'}
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '15px', height: '15px' }}>
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  {isTelugu ? 'చిత్రమాలిక' : 'Photographs'}
                  <span className="media-tab-badge">{photoCount}</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="media-search-box">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" style={{ width: '16px', height: '16px', color: 'var(--gray)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  className="media-search-input"
                  placeholder={t('gallery.searchPlaceholder', isTelugu ? 'శీర్షిక లేదా కీవర్డ్ ద్వారా వెతకండి...' : 'Search media by title or keyword...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search media"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray)', fontSize: '1rem' }}
                    aria-label="Clear search"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>

            {/* Category Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '1.25rem' }}>
              {['all', 'agriculture', 'welfare', 'education', 'events', 'constituency', 'work', 'portraits'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: categoryFilter === cat ? 'var(--orange)' : 'var(--border)',
                    background: categoryFilter === cat ? 'var(--orange-dark)' : '#FFFFFF',
                    color: categoryFilter === cat ? '#FFFFFF' : 'var(--charcoal)',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  {categoryLabels[cat] || cat}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Media Grid */}
        <div className="gallery-grid" style={{ marginTop: '2rem' }}>
          {displayItems.map((item, idx) => {
            const isVideo = item.mediaType === 'video';
            const spanClass = item.spanClass || (idx === 0 && isTeaser ? 'span-8' : 'span-4');
            const itemTitle = isTelugu && item.titleTe ? item.titleTe : item.title;
            const categoryLabel = isTelugu && item.categoryLabelTe ? item.categoryLabelTe : (item.categoryLabel || item.category);
            const thumbUrl = resolveMediaUrl(item.thumbnailUrl || item.secureUrl);

            return (
              <div
                key={item._id || item.publicId || item.slug || idx}
                className={`gallery-card ${spanClass} ${isVideo ? 'gallery-card-video' : ''}`}
                tabIndex={0}
                role="button"
                aria-label={`View ${isVideo ? 'video' : 'photo'}: ${itemTitle}`}
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
                    src={thumbUrl}
                    alt={item.altText || itemTitle}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/images/events/public-address.png';
                    }}
                  />

                  {/* Format Pill */}
                  <span className="video-format-pill">
                    {isVideo ? (
                      <>
                        <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '12px', height: '12px' }}>
                          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
                        {isTelugu ? 'వీడియో' : 'VIDEO'}
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '12px', height: '12px' }}>
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        {isTelugu ? 'చిత్రం' : 'PHOTO'}
                      </>
                    )}
                  </span>

                  {/* Center Play Button for Videos */}
                  {isVideo && (
                    <div className="video-play-btn-circle" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '22px', height: '22px', marginLeft: '3px' }}>
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  )}

                  {/* Duration pill for videos */}
                  {isVideo && item.duration && (
                    <span className="video-duration-pill">
                      ▶ {item.duration}
                    </span>
                  )}
                </div>

                <div className="gallery-card-info">
                  <span className="gallery-card-category">{categoryLabel}</span>
                  <h3 className="gallery-card-title">{itemTitle}</h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {displayItems.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--gray)' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
              {isTelugu ? 'ఎంచుకున్న విభాగంలో రికార్డులు కనిపించలేదు.' : 'No media records match your filter criteria.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setFormatFilter('all');
                setCategoryFilter('all');
                setSearchQuery('');
              }}
              className="btn-pill btn-secondary"
              style={{ marginTop: '1rem' }}
            >
              {isTelugu ? 'అన్ని రికార్డులను చూడండి' : 'Reset Filters & View All'}
            </button>
          </div>
        )}

        {/* Lightbox Modal (Supports both Video Player & High-Res Image) */}
        {activeItem && (
          <div
            className="lightbox-modal active"
            role="dialog"
            aria-modal="true"
            aria-label="Media Lightbox"
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
              <button className="lightbox-nav-btn lightbox-prev" aria-label="Previous Media" onClick={prevItem}>
                &#10094;
              </button>
              <button className="lightbox-nav-btn lightbox-next" aria-label="Next Media" onClick={nextItem}>
                &#10095;
              </button>

              {/* Video Player OR Photo View */}
              {activeItem.mediaType === 'video' ? (
                <div className="lightbox-video-container">
                  <video
                    key={activeItem.videoUrl || activeItem.secureUrl}
                    className="lightbox-video-player"
                    controls
                    autoPlay
                    playsInline
                    poster={resolveMediaUrl(activeItem.thumbnailUrl)}
                    src={resolveMediaUrl(activeItem.videoUrl || activeItem.secureUrl)}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div className="lightbox-img-wrap">
                  <img
                    className="lightbox-img"
                    src={resolveMediaUrl(activeItem.secureUrl)}
                    alt={activeItem.altText || activeItem.title}
                  />
                </div>
              )}

              {/* Caption and Action Row */}
              <div className="lightbox-caption">
                <div style={{ display: 'inline-flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                  <span
                    style={{
                      background: 'rgba(243, 107, 33, 0.85)',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-pill)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em'
                    }}
                  >
                    {activeItem.mediaType === 'video' ? (isTelugu ? 'వీడియో రికార్డు' : 'Video Record') : (isTelugu ? 'ఛాయాచిత్రం' : 'Photograph')}
                  </span>
                  {activeItem.duration && (
                    <span style={{ background: 'rgba(255, 255, 255, 0.2)', color: '#FFFFFF', fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: 'var(--radius-pill)' }}>
                      ▶ {activeItem.duration}
                    </span>
                  )}
                  <span style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.8rem' }}>
                    {isTelugu && activeItem.categoryLabelTe ? activeItem.categoryLabelTe : (activeItem.categoryLabel || activeItem.category)}
                  </span>
                </div>

                <h4 className="lightbox-title">
                  {isTelugu && activeItem.titleTe ? activeItem.titleTe : activeItem.title}
                </h4>
                <p className="lightbox-desc">
                  {isTelugu && activeItem.captionTe
                    ? activeItem.captionTe
                    : (activeItem.caption || (isTelugu && activeItem.categoryLabelTe ? activeItem.categoryLabelTe : activeItem.categoryLabel))}
                </p>

                {/* Direct Action Link */}
                <div className="lightbox-action-row">
                  <a
                    href={resolveMediaUrl(activeItem.videoUrl || activeItem.secureUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="lightbox-action-btn"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '15px', height: '15px' }}>
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    {t('gallery.downloadVideo', isTelugu ? 'పూర్తి ఫైల్ చూడండి / డౌన్‌లోడ్' : 'View Full Media / Download')}
                  </a>
                </div>

                <small style={{ color: 'rgba(255,255,255,0.5)', marginTop: '8px', display: 'block' }}>
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
