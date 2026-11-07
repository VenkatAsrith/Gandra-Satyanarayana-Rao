import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { resolveMediaUrl } from '../../services/api';

// Current active latest updates data (easily updated with new dispatches)
export const LATEST_UPDATE_RECORD = {
  id: 'update-gorukothapalli-2026-11-06',
  date: '2026-11-06',
  dateFormattedEn: '06 November 2026',
  dateFormattedTe: '06 నవంబర్ 2026',
  pressNoteLabelEn: 'Official Press Note',
  pressNoteLabelTe: 'అధికారిక ప్రెస్ నోట్',
  locationEn: 'Gorukothapalli Mandal',
  locationTe: 'గోరుకొత్తపల్లి మండలం',
  categoryEn: 'Public Welfare & Social Security',
  categoryTe: 'ప్రజా సంక్షేమం & సామాజిక భద్రత',
  titleEn: 'Distribution of Kalyana Lakshmi & Shaadi Mubarak Cheques in Gorukothapalli Mandal – MLA Sri Gandra Satyanarayana Rao',
  titleTe: 'గోరుకొత్తపల్లి మండలంలో కళ్యాణలక్ష్మి, షాదీ ముబారక్ చెక్కుల పంపిణీ చేసిన - ఎమ్మెల్యే శ్రీ గండ్ర సత్యనారాయణ రావు',
  leadEn: 'Bhupalpalle MLA Sri Gandra Satyanarayana Rao attended as the Chief Guest at the Kalyana Lakshmi and Shaadi Mubarak cheque distribution ceremony held in Gorukothapalli Mandal.',
  leadTe: 'భూపాలపల్లి ఎమ్మెల్యే శ్రీ గండ్ర సత్యనారాయణ రావు గారు గోరుకొత్తపల్లి మండలంలో నిర్వహించిన కళ్యాణలక్ష్మి, షాదీ ముబారక్ చెక్కుల పంపిణీ కార్యక్రమానికి ముఖ్య అతిథిగా హాజరయ్యారు.',
  bodyEn: [
    'On this occasion, financial aid cheques were distributed to 21 beneficiaries across the mandal.',
    'Speaking at the gathering, the MLA emphasized that providing financial security for the marriage of young women from underprivileged families is the paramount objective of the people\'s government led by Chief Minister Sri A. Revanth Reddy, and tireless efforts are being made to ensure that all welfare schemes reach every eligible household directly without hurdles.',
    'Local public representatives, Congress party leaders, former civic leaders, and beneficiaries participated in the event in large numbers.'
  ],
  bodyTe: [
    'ఈ సందర్భంగా 21 మంది లబ్ధిదారులకు కళ్యాణలక్ష్మి, షాదీ ముబారక్ చెక్కులను స్వయంగా పంపిణీ చేశారు.',
    'ఈ సందర్భంగా ఎమ్మెల్యే గారు మాట్లాడుతూ పేద కుటుంబాల్లోని ఆడపిల్లల వివాహాలకు ఆర్థిక భరోసా కల్పించడమే ముఖ్యమంత్రి రేవంత్ రెడ్డి గారి ప్రజా ప్రభుత్వ లక్ష్యమని, అర్హులైన ప్రతి ఒక్కరికీ ప్రభుత్వ సంక్షేమ పథకాలు అందేలా నిరంతరం కృషి చేస్తున్నామని తెలిపారు.',
    'ఈ కార్యక్రమంలో స్థానిక ప్రజాప్రతినిధులు, కాంగ్రెస్ పార్టీ నాయకులు, మాజీ ప్రజాప్రతినిధులు, లబ్ధిదారులు పెద్ద సంఖ్యలో పాల్గొన్నారు.'
  ],
  metrics: [
    { labelEn: 'Beneficiaries', labelTe: 'లబ్ధిదారులు', val: '21' },
    { labelEn: 'Mandal', labelTe: 'మండలం', val: 'Gorukothapalli' },
    { labelEn: 'Scheme', labelTe: 'పథకం', val: 'Kalyana Lakshmi' }
  ],
  photos: [
    {
      id: 'gk-1',
      url: '/media/images/gorukothapalli-kalyanalakshmi-cheques-1.jpg',
      titleEn: 'Kalyana Lakshmi & Shaadi Mubarak Cheque Handover to Beneficiaries',
      titleTe: 'లబ్ధిదారులకు కళ్యాణలక్ష్మి & షాదీ ముబారక్ చెక్కుల పంపిణీ',
      captionEn: 'MLA Gandra Satyanarayana Rao handing over financial assistance cheques to 21 beneficiary families in Gorukothapalli Mandal.',
      captionTe: 'గోరుకొత్తపల్లి మండలంలో 21 మంది లబ్ధిదారుల కుటుంబాలకు చెక్కులను స్వయంగా అందజేస్తున్న ఎమ్మెల్యే గండ్ర సత్యనారాయణ రావు.'
    },
    {
      id: 'gk-2',
      url: '/media/images/gorukothapalli-kalyanalakshmi-cheques-2.jpg',
      titleEn: 'Blessings & Civic Interaction with Recipient Families',
      titleTe: 'లబ్ధిదారుల కుటుంబాలకు ఆశీస్సులు & ఆత్మీయ సంభాషణ',
      captionEn: 'Interacting warmly with mothers and brides, reassuring continued state welfare support.',
      captionTe: 'పేదింటి ఆడపిల్లల తల్లిదండ్రులతో ఆత్మీయంగా ముచ్చటిస్తూ ప్రభుత్వ అండదండలు ఉంటాయని భరోసా ఇచ్చిన సత్తెన్న.'
    },
    {
      id: 'gk-3',
      url: '/media/images/gorukothapalli-kalyanalakshmi-cheques-3.jpg',
      titleEn: 'Keynote Address on People’s Welfare and Financial Security',
      titleTe: 'ప్రజా సంక్షేమం & ఆడపిల్లల ఆర్థిక భరోసాపై ప్రసంగం',
      captionEn: 'Highlighting state welfare schemes reaching every eligible household under Praja Palana governance.',
      captionTe: 'అర్హులైన ప్రతి పేద కుటుంబానికి సంక్షేమ ఫలాలు దక్కేలా ప్రజా ప్రభుత్వం పనిచేస్తోందని ప్రసంగిస్తున్న ఎమ్మెల్యే.'
    },
    {
      id: 'gk-4',
      url: '/media/images/gorukothapalli-kalyanalakshmi-cheques-4.jpg',
      titleEn: 'Cheque Distribution with Local Public Representatives & Congress Leaders',
      titleTe: 'స్థానిక ప్రజాప్రతినిధులు & కాంగ్రెస్ నాయకుల సమక్షంలో పంపిణీ',
      captionEn: 'Civic leaders and local officials joined the stage in Gorukothapalli Mandal.',
      captionTe: 'స్థానిక సర్పంచులు, ప్రజాప్రతినిధులు, పార్టీ శ్రేణులతో కలిసి చెక్కుల పంపిణీ కార్యక్రమం.'
    },
    {
      id: 'gk-5',
      url: '/media/images/gorukothapalli-kalyanalakshmi-cheques-5.jpg',
      titleEn: 'Community Participation & Warm Civic Gathering',
      titleTe: 'గ్రామ ప్రజల పెద్ద ఎత్తున భాగస్వామ్యం & ప్రజా స్వాగతం',
      captionEn: 'Beneficiaries and village elders expressing heartfelt gratitude to MLA Sathanna.',
      captionTe: 'సకాలంలో ఆర్థిక సహాయం అందించినందుకు ఎమ్మెల్యే సత్తెన్నకు ధన్యవాదాలు తెలిపిన గ్రామస్తులు.'
    },
    {
      id: 'gk-6',
      url: '/media/images/gorukothapalli-kalyanalakshmi-cheques-6.jpg',
      titleEn: 'Group Felicitation & Beneficiary Group Photograph',
      titleTe: 'లబ్ధిదారులతో సామూహిక ఛాయాచిత్రం',
      captionEn: 'Commemorative group photograph with all 21 beneficiaries and their families in Gorukothapalli.',
      captionTe: 'గోరుకొత్తపల్లి మండలంలోని 21 మంది లబ్ధిదారులు మరియు స్థానిక నాయకులతో గ్రూప్ ఫోటో.'
    }
  ]
};

export default function LatestUpdatesSection() {
  const { isTelugu } = useLanguage();
  const update = LATEST_UPDATE_RECORD;

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const openLightbox = (index = 0) => {
    setActivePhotoIdx(index);
    setModalOpen(true);
    document.body.classList.add('menu-open');
  };

  const closeLightbox = () => {
    setModalOpen(false);
    document.body.classList.remove('menu-open');
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : update.photos.length - 1));
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setActivePhotoIdx((prev) => (prev < update.photos.length - 1 ? prev + 1 : 0));
  };

  const handleInlinePrev = (e) => {
    e.stopPropagation();
    setCarouselIdx((prev) => (prev > 0 ? prev - 1 : update.photos.length - 1));
  };

  const handleInlineNext = (e) => {
    e.stopPropagation();
    setCarouselIdx((prev) => (prev < update.photos.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalOpen]);

  // Touch swipe support for modal
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndXRef.current = e.changedTouches[0].screenX;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  const currentPhoto = update.photos[activePhotoIdx] || update.photos[0];

  return (
    <section className="latest-updates-section" aria-label="Latest Constituency News and Dispatches">
      <div className="container">
        <div className="latest-updates-canvas">
          {/* Header Strip with Pulse Badge */}
          <div className="latest-updates-top-bar">
            <div className="latest-pulse-badge">
              <span className="live-pulse-dot" aria-hidden="true"></span>
              <span className="latest-badge-tag">
                {isTelugu ? 'తాజా నియోజకవర్గ సమాచారం' : 'Latest Field Dispatch'}
              </span>
              <span className="latest-badge-sep">•</span>
              <span className="latest-badge-date">
                {isTelugu ? update.dateFormattedTe : update.dateFormattedEn}
              </span>
            </div>

            <div className="latest-press-chip">
              📜 {isTelugu ? update.pressNoteLabelTe : update.pressNoteLabelEn}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="latest-updates-grid">
            {/* Left: Press Matter & Narrative */}
            <div className="latest-matter-col">
              <h2 className="latest-headline-title">
                {isTelugu ? update.titleTe : update.titleEn}
              </h2>

              {/* Quick Info Tags */}
              <div className="latest-chips-row">
                <span className="latest-meta-pill">
                  🏛️ {isTelugu ? update.locationTe : update.locationEn}
                </span>
                <span className="latest-meta-pill highlight">
                  🤝 {isTelugu ? '21 మంది లబ్ధిదారులు' : '21 Beneficiary Families'}
                </span>
                <span className="latest-meta-pill green">
                  ✨ {isTelugu ? 'కళ్యాణలక్ష్మి / షాదీ ముబారక్' : 'Kalyana Lakshmi & Shaadi Mubarak'}
                </span>
              </div>

              {/* Lead Paragraph */}
              <p className="latest-lead-paragraph">
                {isTelugu ? update.leadTe : update.leadEn}
              </p>

              {/* Detailed Body Paragraphs */}
              <div className="latest-body-paragraphs">
                {(isTelugu ? update.bodyTe : update.bodyEn).map((para, i) => (
                  <p key={i} className="latest-paragraph">
                    {para}
                  </p>
                ))}
              </div>

              {/* Metrics Strip */}
              <div className="latest-metrics-strip">
                <div className="latest-metric-box">
                  <span className="latest-metric-val">21</span>
                  <span className="latest-metric-lbl">{isTelugu ? 'లబ్ధిదారులకు చెక్కులు' : 'Cheques Handed'}</span>
                </div>
                <div className="latest-metric-box">
                  <span className="latest-metric-val">100%</span>
                  <span className="latest-metric-lbl">{isTelugu ? 'ప్రజా సంక్షేమ భరోసా' : 'Direct Welfare Delivery'}</span>
                </div>
                <div className="latest-metric-box">
                  <span className="latest-metric-val">{isTelugu ? 'గోరుకొత్తపల్లి' : 'Gorukothapalli'}</span>
                  <span className="latest-metric-lbl">{isTelugu ? 'మండల కేంద్రం' : 'Mandal Headquarter'}</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive Pictures Deck (Horizontal Click-to-Scroll Viewer) */}
            <div className="latest-photos-col">
              <div className="latest-deck-container">
                {/* Main Featured Photo Box */}
                <div
                  className="latest-deck-main-card"
                  onClick={() => openLightbox(carouselIdx)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View photo ${carouselIdx + 1}: Click to open horizontal scroll gallery`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox(carouselIdx);
                    }
                  }}
                >
                  <img
                    src={resolveMediaUrl(update.photos[carouselIdx].url)}
                    alt={isTelugu ? update.photos[carouselIdx].titleTe : update.photos[carouselIdx].titleEn}
                    className="latest-deck-img"
                    loading="lazy"
                  />
                  <div className="latest-deck-overlay"></div>

                  {/* Top Overlay Badge */}
                  <div className="latest-deck-badge-bar">
                    <span className="latest-deck-photo-count">
                      📷 0{carouselIdx + 1} / 0{update.photos.length}
                    </span>
                    <span className="latest-deck-click-hint">
                      {isTelugu ? 'ఆల్బమ్ చూడటానికి క్లిక్ చేయండి' : 'Click to View Album'}
                    </span>
                  </div>

                  {/* Bottom Inline Caption */}
                  <div className="latest-deck-caption-bar">
                    <p className="latest-deck-caption-title">
                      {isTelugu ? update.photos[carouselIdx].titleTe : update.photos[carouselIdx].titleEn}
                    </p>
                  </div>

                  {/* Inline Horizontal Scroll Arrows */}
                  <button
                    type="button"
                    className="latest-deck-arrow prev"
                    onClick={handleInlinePrev}
                    aria-label="Previous Photo"
                    title="Previous Photo"
                  >
                    &#10094;
                  </button>
                  <button
                    type="button"
                    className="latest-deck-arrow next"
                    onClick={handleInlineNext}
                    aria-label="Next Photo"
                    title="Next Photo"
                  >
                    &#10095;
                  </button>
                </div>

                {/* 2-3 Thumbnail Preview Row */}
                <div className="latest-thumbnails-row">
                  {update.photos.slice(0, 3).map((ph, idx) => (
                    <div
                      key={ph.id}
                      className={`latest-thumb-chip ${carouselIdx === idx ? 'active' : ''}`}
                      onClick={() => setCarouselIdx(idx)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Select photo ${idx + 1}`}
                    >
                      <img src={resolveMediaUrl(ph.url)} alt="" />
                      <span className="latest-thumb-chip-idx">0{idx + 1}</span>
                    </div>
                  ))}

                  {/* View All Button */}
                  <button
                    type="button"
                    className="latest-all-photos-btn"
                    onClick={() => openLightbox(0)}
                  >
                    <span>+{update.photos.length - 3}</span>
                    <span className="view-more-txt">{isTelugu ? 'అన్ని ఫోటోలు' : 'More'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Horizontal Scroll Modal / Lightbox */}
      {modalOpen && (
        <div
          className="latest-lightbox-modal active"
          role="dialog"
          aria-modal="true"
          aria-label="Horizontal Photo Album Viewer"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Control Bar */}
          <div className="latest-modal-top-bar" onClick={(e) => e.stopPropagation()}>
            <div className="latest-modal-counter">
              <span className="modal-num-active">0{activePhotoIdx + 1}</span>
              <span className="modal-sep">/</span>
              <span className="modal-num-total">0{update.photos.length}</span>
              <span className="modal-sep">•</span>
              <span className="modal-photo-headline">
                {isTelugu ? currentPhoto.titleTe : currentPhoto.titleEn}
              </span>
            </div>

            <button
              type="button"
              className="latest-modal-close-btn"
              onClick={closeLightbox}
              aria-label="Close Lightbox (Esc)"
              title="Close"
            >
              &times;
            </button>
          </div>

          {/* Main Slide Stage with Horizontal Arrow Triggers */}
          <div className="latest-modal-stage" onClick={(e) => e.stopPropagation()}>
            {/* Left Prev Arrow */}
            <button
              type="button"
              className="latest-modal-arrow-btn prev"
              onClick={handlePrev}
              aria-label="Previous Photo (Left Arrow)"
              title="Previous (Left Arrow)"
            >
              &#10094;
            </button>

            {/* Centered Large High-Res Picture */}
            <div className="latest-modal-viewport">
              <div className="latest-modal-slide">
                <img
                  src={resolveMediaUrl(currentPhoto.url)}
                  alt={isTelugu ? currentPhoto.titleTe : currentPhoto.titleEn}
                  className="latest-modal-img"
                />
              </div>

              {/* Caption Card */}
              <div className="latest-modal-caption-card">
                <h3 className="modal-caption-heading">
                  {isTelugu ? currentPhoto.titleTe : currentPhoto.titleEn}
                </h3>
                <p className="modal-caption-text">
                  {isTelugu ? currentPhoto.captionTe : currentPhoto.captionEn}
                </p>
              </div>
            </div>

            {/* Right Next Arrow */}
            <button
              type="button"
              className="latest-modal-arrow-btn next"
              onClick={handleNext}
              aria-label="Next Photo (Right Arrow)"
              title="Next (Right Arrow)"
            >
              &#10095;
            </button>
          </div>

          {/* Bottom Thumbnails Navigation Strip */}
          <div className="latest-modal-bottom-strip" onClick={(e) => e.stopPropagation()}>
            {update.photos.map((ph, idx) => (
              <div
                key={ph.id}
                className={`latest-modal-thumb ${activePhotoIdx === idx ? 'active' : ''}`}
                onClick={() => setActivePhotoIdx(idx)}
                role="button"
                tabIndex={0}
                aria-label={`Jump to photo ${idx + 1}`}
              >
                <img src={resolveMediaUrl(ph.url)} alt="" />
                <span className="modal-thumb-num">0{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
