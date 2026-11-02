import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { resolveMediaUrl } from '../../services/api';

const EVENT_PHOTOS = [
  {
    id: 'img-constituency-event-1',
    secureUrl: '/media/images/constituency-event-1.jpg',
    thumbnailUrl: '/media/images/constituency-event-1.jpg',
    title: 'Grassroots Mass Outreach & Field Review',
    titleTe: 'నియోజకవర్గ క్షేత్రస్థాయి ప్రజా పర్యటన & సమీక్ష',
    part: '01',
    category: 'Constituency Tour',
    categoryTe: 'ప్రజా పర్యటన',
    location: 'Bhupalpalle Rural & Mandals',
    locationTe: 'భూపాలపల్లి గ్రామీణ మండలాలు',
    caption: 'MLA Gandra Satyanarayana Rao directly engaging with constituents during field inspection.',
    captionTe: 'నియోజకవర్గ పర్యటనలో స్థానిక ప్రజలు మరియు రైతులతో నేరుగా ముఖాముఖి సమీక్ష.',
    studyNotes: 'Detailed village inspection assessing drinking water supply, road works, and local grievances. Direct instructions issued to concerned executive engineers.',
    studyNotesTe: 'తాగునీటి సౌకర్యాలు, అంతర్గత రహదారుల నిర్మాణం మరియు గ్రామ సమస్యలపై క్షేత్రస్థాయి సమీక్ష. సంబంధిత అధికారులకు తక్షణ పరిష్కార ఆదేశాలు.'
  },
  {
    id: 'img-constituency-event-2',
    secureUrl: '/media/images/constituency-event-2.jpg',
    thumbnailUrl: '/media/images/constituency-event-2.jpg',
    title: 'Community Reception & Village Welfare Review',
    titleTe: 'గ్రామీణ సంక్షేమ పనుల పరిశీలన & ప్రజా స్వాగతం',
    part: '02',
    category: 'Village Welfare',
    categoryTe: 'గ్రామ సంక్షేమం',
    location: 'Regonda & Ghanapuram Mandals',
    locationTe: 'రేగొండ & ఘనపురం మండలాలు',
    caption: 'Constituents according a warm reception to MLA Sathenna during village developmental inspections.',
    captionTe: 'గ్రామ పర్యటన సందర్భంగా స్థానిక ప్రజలు, వృద్ధులు మరియు మహిళలతో ఆత్మీయంగా ముచ్చటిస్తున్న శాసనసభ్యులు.',
    studyNotes: 'Reviewing Indiramma housing allocation lists and pension disbursements across grassroots panchayats to eliminate delays.',
    studyNotesTe: 'ఇందిరమ్మ ఇండ్ల మంజూరు జాబితాలు, పింఛన్ల పంపిణీని పరిశీలిస్తూ అర్హులైన ప్రతి ఒక్కరికీ లబ్ధి చేకూరేలా పర్యవేక్షణ.'
  },
  {
    id: 'img-constituency-event-3',
    secureUrl: '/media/images/constituency-event-3.jpg',
    thumbnailUrl: '/media/images/constituency-event-3.jpg',
    title: 'Direct Civic Interaction & Grievance Listening',
    titleTe: 'ప్రజల నుండి వినతుల స్వీకరణ & సమస్యల పరిష్కార పరిశీలన',
    part: '03',
    category: 'Public Darbar',
    categoryTe: 'ప్రజా దర్బార్',
    location: 'Chityal & Mogullapalle Mandals',
    locationTe: 'చిట్యాల & మొగుళ్లపల్లి మండలాలు',
    caption: 'Listening to citizen representations and issuing direct instructions to local officials for immediate resolution.',
    captionTe: 'గ్రామాల్లోని సమస్యలను స్వయంగా తెలుసుకుంటూ అక్కడికక్కడే అధికారులతో సమీక్షించి పరిష్కారానికి ఆదేశాలు జారీ.',
    studyNotes: 'On-spot grievance redressal mechanism connecting mandal revenue and agricultural officers to resolve farmer documentation disputes.',
    studyNotesTe: 'రైతుల పాస్‌బుక్, విద్యుత్ సమస్యలపై రెవెన్యూ మరియు వ్యవసాయ అధికారులతో ముఖాముఖి సమాచార మార్పిడి ద్వారా అక్కడికక్కడే పరిష్కారాలు.'
  },
  {
    id: 'img-constituency-event-4',
    secureUrl: '/media/images/constituency-event-4.jpg',
    thumbnailUrl: '/media/images/constituency-event-4.jpg',
    title: 'Development Works On-Site Assessment',
    titleTe: 'గ్రామీణ అభివృద్ధి పనుల ప్రగతి పరిశీలన',
    part: '04',
    category: 'Work Assessment',
    categoryTe: 'పనుల పరిశీలన',
    location: 'Tekumatla & Manthani Borders',
    locationTe: 'టేకుమట్ల & పరిసర గ్రామాలు',
    caption: 'On-ground review of sanctioned infrastructure projects ensuring high execution quality for the people.',
    captionTe: 'మంజూరైన రోడ్లు, డ్రైనేజీలు మరియు సాగునీటి పనుల నాణ్యతను క్షేత్రస్థాయిలో పరిశీలించిన ఎమ్మెల్యే.',
    studyNotes: 'Civil engineering quality check of canal revetments and BT road works to verify adherence to sanctioned PWD standards.',
    studyNotesTe: 'సాగునీటి కాలువల పూడికతీత, బీటీ రోడ్ల నాణ్యతను స్వయంగా పర్యవేక్షిస్తూ ప్రభుత్వ నిధుల సద్వినియోగానికి భరోసా.'
  }
];

export default function ConstituencyPhotoShowcase() {
  const { isTelugu } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [showStudyNotes, setShowStudyNotes] = useState(false);
  const modalTrackRef = useRef(null);
  const slideRefs = useRef([]);

  const openLightbox = (index = 0) => {
    setActivePhotoIndex(index);
    setLightboxOpen(true);
    setShowStudyNotes(false);
    document.body.classList.add('menu-open');
    setTimeout(() => {
      scrollToSlide(index);
    }, 60);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setShowStudyNotes(false);
    document.body.classList.remove('menu-open');
  };

  const scrollToSlide = (index) => {
    const slide = slideRefs.current[index];
    if (slide && modalTrackRef.current) {
      slide.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
      setActivePhotoIndex(index);
    }
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    const nextIdx = Math.max(0, activePhotoIndex - 1);
    scrollToSlide(nextIdx);
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    const nextIdx = Math.min(EVENT_PHOTOS.length - 1, activePhotoIndex + 1);
    scrollToSlide(nextIdx);
  };

  // Keyboard navigation & scroll observer inside lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);

    // Track scroll position to update active index
    const track = modalTrackRef.current;
    if (track) {
      const handleScroll = () => {
        const trackRect = track.getBoundingClientRect();
        const trackCenter = trackRect.left + trackRect.width / 2;

        let closestIndex = 0;
        let minDiff = Infinity;

        slideRefs.current.forEach((slide, idx) => {
          if (!slide) return;
          const rect = slide.getBoundingClientRect();
          const slideCenter = rect.left + rect.width / 2;
          const diff = Math.abs(slideCenter - trackCenter);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = idx;
          }
        });

        setActivePhotoIndex(closestIndex);
      };

      track.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        track.removeEventListener('scroll', handleScroll);
      };
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, activePhotoIndex]);

  const currentPhoto = EVENT_PHOTOS[activePhotoIndex] || EVENT_PHOTOS[0];

  return (
    <section id="field-photos" className="section bg-light-sand constituency-photos-section" aria-label="Field Inspection Photographic Series">
      <div className="container">
        {/* Section Header */}
        <div className="constituency-photos-header">
          <div>
            <div className="tag-label saffron">
              {isTelugu ? 'ప్రత్యేక క్షేత్రస్థాయి చిత్రమాలిక' : 'Field Photo Series'}
            </div>
            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
              {isTelugu ? 'ప్రజా పర్యటన & క్షేత్రస్థాయి సమీక్షలు' : 'Grassroots Outreach & Field Inspections'}
            </h2>
            <p className="section-subtitle" style={{ maxWidth: '680px' }}>
              {isTelugu
                ? 'భూపాలపల్లి నియోజకవర్గంలోని వివిధ గ్రామాలలో పర్యటిస్తూ ప్రజా సమస్యలను తెలుసుకుంటూ పనులను పర్యవేక్షిస్తున్న దృశ్యాలు (4 ప్రత్యేక చిత్రాల ఆల్బమ్).'
                : 'Direct photographic chronicle of MLA Sathenna inspecting developmental works and meeting citizens across the mandals (4-part visual series).'}
            </p>
          </div>
        </div>

        {/* Master Album Card — Opens Horizontal Scroll Deck on Click */}
        <div className="photo-master-album-container">
          <div
            className="photo-master-album-card"
            onClick={() => openLightbox(0)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => e.key === 'Enter' && openLightbox(0)}
            aria-label={isTelugu ? '4 ఛాయాచిత్రాల ఆల్బమ్‌ను తెరవండి' : 'Open 4-Photo Field Album'}
          >
            {/* Visual Cover Stage with Elevated Visual Backdrop */}
            <div className="photo-master-media-stage">
              <img
                src={resolveMediaUrl(EVENT_PHOTOS[0].secureUrl)}
                alt={isTelugu ? EVENT_PHOTOS[0].titleTe : EVENT_PHOTOS[0].title}
                className="photo-master-img"
              />
              <div className="photo-master-overlay"></div>

              {/* Badges */}
              <div className="photo-master-top-badges">
                <span className="photo-album-chip">
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  {isTelugu ? 'ప్రత్యేక ఆల్బమ్ (4 ఫోటోలు)' : 'Special Album (4 Photos)'}
                </span>
                <span className="photo-ac-chip">108 AC</span>
              </div>

              {/* Center Trigger Banner */}
              <div className="photo-master-center-trigger">
                <div className="photo-trigger-play-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                </div>
                <span>{isTelugu ? '4 ఫోటోల ఆల్బమ్ చూడటానికి క్లిక్ చేయండి' : 'Click to Open & Scroll 4-Photo Album'}</span>
              </div>

              {/* Bottom Thumbnails Peek Strip */}
              <div className="photo-master-peek-strip">
                {EVENT_PHOTOS.map((p, i) => (
                  <div key={p.id} className="photo-peek-thumb" style={{ zIndex: 4 - i }}>
                    <img src={resolveMediaUrl(p.thumbnailUrl)} alt="" />
                    <span className="photo-peek-num">0{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Album Summary Row */}
            <div className="photo-master-info-row">
              <div>
                <span className="photo-card-category">
                  {isTelugu ? 'క్షేత్రస్థాయి ప్రజా పర్యటనల రికార్డు' : 'Field Inspection & Grassroots Record'}
                </span>
                <h3 className="photo-master-title">
                  {isTelugu ? 'భూపాలపల్లి నియోజకవర్గ ప్రజా పర్యటన — 4 చిత్రాల ప్రత్యేక ప్రదర్శన' : 'Bhupalpalle Mass Outreach & Development Field Inspections (4-Part Series)'}
                </h3>
                <p className="photo-master-desc">
                  {isTelugu
                    ? 'నియోజకవర్గంలోని వివిధ గ్రామాలలో పర్యటిస్తూ పనుల నాణ్యతను పరిశీలించి ప్రజలతో ముచ్చటించిన 4 ప్రత్యేక చిత్రాల ఆల్బమ్.'
                    : 'A verified photographic chronicle of MLA Sathenna inspecting developmental works and listening to citizens across the mandals.'}
                </p>
              </div>

              <div className="photo-master-cta-wrap">
                <button
                  type="button"
                  className="btn-pill btn-theatre-archive"
                  onClick={() => openLightbox(0)}
                >
                  <span>{isTelugu ? 'ఆల్బమ్ తెరవండి (4 ఫోటోలు)' : 'Open 4-Photo Album'}</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal with Native Smooth Horizontal Scroll Option */}
      {lightboxOpen && (
        <div
          className="lightbox-modal active clean-photo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="4-Photo Field Album Horizontal Viewer"
        >
          {/* Top Control Bar */}
          <div className="clean-lightbox-top-bar">
            <div className="clean-lightbox-counter">
              <span className="photo-counter-active">0{activePhotoIndex + 1}</span>
              <span className="clean-lightbox-sep">/</span>
              <span className="photo-counter-total">0{EVENT_PHOTOS.length}</span>
              <span className="clean-lightbox-sep">•</span>
              <span className="photo-counter-title">
                {isTelugu ? currentPhoto.titleTe : currentPhoto.title}
              </span>
            </div>

            <div className="clean-top-actions">
              {/* Study Matter Toggle Button */}
              <button
                type="button"
                className={`clean-info-toggle-btn ${showStudyNotes ? 'active' : ''}`}
                onClick={() => setShowStudyNotes(!showStudyNotes)}
                aria-label={showStudyNotes ? 'Hide Study Notes' : 'Study Record Details'}
                title="Toggle Study Matter"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>
                  {showStudyNotes
                    ? (isTelugu ? 'వివరాలు దాచు' : 'Hide Matter')
                    : (isTelugu ? 'వివరాల అధ్యయనం' : 'Study Matter')}
                </span>
              </button>

              <button
                type="button"
                className="lightbox-close-btn"
                onClick={closeLightbox}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Left / Right Nav Triggers */}
          <button
            type="button"
            className="lightbox-nav-btn lightbox-prev"
            onClick={handlePrev}
            disabled={activePhotoIndex === 0}
            aria-label="Previous Photo"
          >
            &#10094;
          </button>
          <button
            type="button"
            className="lightbox-nav-btn lightbox-next"
            onClick={handleNext}
            disabled={activePhotoIndex >= EVENT_PHOTOS.length - 1}
            aria-label="Next Photo"
          >
            &#10095;
          </button>

          {/* Horizontal Scroll Stage with Snapping Slides */}
          <div className="album-horizontal-scroll-stage" ref={modalTrackRef}>
            {EVENT_PHOTOS.map((photo, idx) => (
              <div
                key={photo.id}
                ref={(el) => (slideRefs.current[idx] = el)}
                className={`album-scroll-slide ${idx === activePhotoIndex ? 'is-active-slide' : ''}`}
              >
                <div className="album-slide-photo-wrapper">
                  <img
                    src={resolveMediaUrl(photo.secureUrl)}
                    alt={isTelugu ? photo.titleTe : photo.title}
                    className="album-elevated-photo"
                  />
                  <div className="album-slide-badge">
                    <span>{photo.part} / 04</span>
                    <span>•</span>
                    <span>{isTelugu ? photo.categoryTe : photo.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Study Matter Bottom Drawer (Elevating the Picture, Clean Matter for Studying) */}
          {showStudyNotes && (
            <div className="study-matter-drawer">
              <div className="study-matter-inner">
                <div className="study-matter-header">
                  <div>
                    <span className="study-matter-tag">
                      {isTelugu ? currentPhoto.categoryTe : currentPhoto.category} · {isTelugu ? currentPhoto.locationTe : currentPhoto.location}
                    </span>
                    <h4 className="study-matter-title">
                      {isTelugu ? currentPhoto.titleTe : currentPhoto.title}
                    </h4>
                  </div>
                  <button
                    type="button"
                    className="study-close-btn"
                    onClick={() => setShowStudyNotes(false)}
                    aria-label="Close Study Matter"
                  >
                    &times;
                  </button>
                </div>
                <p className="study-matter-caption">
                  {isTelugu ? currentPhoto.captionTe : currentPhoto.caption}
                </p>
                <div className="study-matter-box">
                  <strong className="study-matter-box-lbl">
                    {isTelugu ? 'అధికారిక పరిశీలన నివేదిక:' : 'Official Inspection Finding:'}
                  </strong>
                  <p>{isTelugu ? currentPhoto.studyNotesTe : currentPhoto.studyNotes}</p>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Horizontal Thumbnails Bar with Direct Scroll Option */}
          <div className="clean-lightbox-thumbs-bar">
            {EVENT_PHOTOS.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                className={`clean-thumb-btn ${idx === activePhotoIndex ? 'active' : ''}`}
                onClick={() => scrollToSlide(idx)}
                aria-label={`Jump to photo ${idx + 1}`}
              >
                <img src={resolveMediaUrl(p.thumbnailUrl)} alt="" />
                <span className="clean-thumb-index">0{idx + 1}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
