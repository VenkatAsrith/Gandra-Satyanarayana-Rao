import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function GalleryGrid({ mediaItems, showFilter = true, isTeaser = false }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeItem, setActiveItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const defaultMedia = [
    {
      publicId: 'local_public-address',
      secureUrl: '/images/events/public-address.png',
      title: 'Constituency Mass Meeting Address with Chief Minister A. Revanth Reddy',
      category: 'events',
      categoryLabel: 'Public Events · Stage Address',
      altText: 'Public speech on stage with Chief Minister A. Revanth Reddy',
      spanClass: 'span-8'
    },
    {
      publicId: 'local_portrait-namaste',
      secureUrl: '/images/about/portrait-namaste.png',
      title: 'Weekly "Praja Darbar" Greeting Portrait',
      category: 'portraits',
      categoryLabel: 'Official Portraits · Grassroots',
      altText: 'Constituent greeting portrait with folded hands',
      spanClass: 'span-4'
    },
    {
      publicId: 'local_profile-formal',
      secureUrl: '/images/about/profile-formal.png',
      title: 'Formal Legislative Profile & Studio Portrait',
      category: 'portraits',
      categoryLabel: 'Official Portraits · Leadership',
      altText: 'Formal studio leadership portrait of Gandra Satyanarayana Rao',
      spanClass: 'span-4'
    },
    {
      publicId: 'local_family-revanth',
      secureUrl: '/images/about/family-revanth.png',
      title: 'Smt. Gandra Padma & Sathenna with CM Revanth Reddy',
      category: 'constituency',
      categoryLabel: 'Governance · State Coordination',
      altText: 'Gandra Satyanarayana Rao and Smt. Gandra Padma meeting Chief Minister A. Revanth Reddy',
      spanClass: 'span-4'
    },
    {
      publicId: 'local_hero-portrait',
      secureUrl: '/images/hero/hero-portrait.png',
      title: 'Elected MLA for Bhupalpalle (108)',
      category: 'portraits',
      categoryLabel: 'Official Portraits · Assembly Mandate',
      altText: 'Official portrait of Gandra Satyanarayana Rao with INC scarf',
      spanClass: 'span-4'
    }
  ];

  const items = mediaItems && mediaItems.length ? mediaItems : defaultMedia;

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
            <div className="tag-label">Media & Documentation</div>
            <h2 className="section-title">Photographic Archive</h2>
          </div>
          {isTeaser && (
            <div>
              <Link to="/gallery" className="btn-pill btn-secondary">
                View Full Gallery
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
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
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: selectedFilter === cat ? 'var(--orange)' : 'var(--border)',
                  background: selectedFilter === cat ? 'var(--orange-dark)' : '#FFFFFF',
                  color: selectedFilter === cat ? '#FFFFFF' : 'var(--charcoal)',
                  transition: 'var(--transition-fast)'
                }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        <div className="gallery-grid" style={{ marginTop: '2rem' }}>
          {filteredItems.map((item, idx) => {
            const spanClass = item.spanClass || (idx === 0 && isTeaser ? 'span-8' : 'span-4');
            return (
              <div
                key={item._id || item.publicId || idx}
                className={`gallery-card ${spanClass}`}
                tabIndex={0}
                role="button"
                aria-label={`View photo: ${item.title}`}
                onClick={() => openLightbox(item, idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(item, idx);
                  }
                }}
              >
                <div className="gallery-thumb">
                  <img src={item.secureUrl} alt={item.altText || item.title} loading="lazy" />
                </div>
                <div className="gallery-card-info">
                  <span className="gallery-card-category">{item.categoryLabel || item.category}</span>
                  <h3 className="gallery-card-title">{item.title}</h3>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--gray)' }}>
            No photographic records in this category.
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
                <img className="lightbox-img" src={activeItem.secureUrl} alt={activeItem.altText || activeItem.title} />
              </div>
              <div className="lightbox-caption">
                <h4 className="lightbox-title">{activeItem.title}</h4>
                <p className="lightbox-desc">{activeItem.caption || activeItem.categoryLabel || activeItem.category}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
