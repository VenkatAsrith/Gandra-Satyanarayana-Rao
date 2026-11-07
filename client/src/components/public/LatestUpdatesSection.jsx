import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { resolveMediaUrl } from '../../services/api';

// Current active latest updates data (authentic verified field dispatch)
export const LATEST_UPDATE_RECORD = {
  id: 'update-gorukothapalli-2026-11-06',
  date: '2026-11-06',
  dateFormattedEn: '06 November 2026',
  dateFormattedTe: '06 నవంబర్ 2026',
  pressNoteLabelEn: 'Official Press Note',
  pressNoteLabelTe: 'అధికారిక పత్రికా ప్రకటన',
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
  photos: [
    {
      id: 'gk-1',
      url: '/media/images/gorukothapalli-kalyanalakshmi-cheques-1.jpg',
      titleEn: 'Kalyana Lakshmi & Shaadi Mubarak Cheque Handover to Beneficiaries',
      titleTe: 'లబ్ధిదారులకు కళ్యాణలక్ష్మి & షాదీ ముబారక్ చెక్కుల పంపిణీ',
      captionEn: 'MLA Gandra Satyanarayana Rao handing over financial assistance cheques to 21 beneficiary families in Gorukothapalli Mandal.',
      captionTe: 'గోరుకొత్తపల్లి మండలంలో 21 మంది లబ్ధిదారుల కుటుంబాలకు చెక్కులను స్వయంగా అందజేస్తున్న ఎమ్మెల్యే గండ్ర సత్యనారాయణ రావు గారు.'
    },
    {
      id: 'gk-2',
      url: '/media/images/gorukothapalli-kalyanalakshmi-cheques-2.jpg',
      titleEn: 'MLA Sathanna Addressing Public Representatives and Beneficiary Families',
      titleTe: 'కార్యక్రమంలో ప్రసంగిస్తున్న ఎమ్మెల్యే శ్రీ గండ్ర సత్యనారాయణ రావు',
      captionEn: 'Highlighting state welfare schemes and direct benefit delivery under the leadership of CM Revanth Reddy.',
      captionTe: 'ముఖ్యమంత్రి రేవంత్ రెడ్డి గారి నాయకత్వంలో సంక్షేమ పథకాల అమలుపై ప్రసంగిస్తున్న సత్తన్న.'
    },
    {
      id: 'gk-3',
      url: '/media/images/gorukothapalli-kalyanalakshmi-cheques-3.jpg',
      titleEn: 'Cheque Distribution to Rural Beneficiary Families',
      titleTe: 'గ్రామీణ లబ్ధిదారుల కుటుంబాలకు సంక్షేమ చెక్కుల పంపిణీ',
      captionEn: 'Ensuring transparent, doorstep reach of financial assistance to rural households in Gorukothapalli.',
      captionTe: 'గోరుకొత్తపల్లి మండల పరిధిలోని అర్హులైన కుటుంబాలకు నేరుగా సంక్షేమ పథకాల పంపిణీ.'
    },
    {
      id: 'gk-4',
      url: '/media/images/gorukothapalli-kalyanalakshmi-cheques-4.jpg',
      titleEn: 'Ceremonial Welcome & Civic Participation',
      titleTe: 'ఎమ్మెల్యే సత్తన్న గారికి ఘన స్వాగతం',
      captionEn: 'Local leaders, women delegations, and party representatives welcoming MLA Gandra Satyanarayana Rao.',
      captionTe: 'కార్యక్రమానికి విచ్చేసిన ఎమ్మెల్యే గారికి స్థానిక నాయకులు, మహిళలు మరియు ప్రజల ఘన స్వాగతం.'
    },
    {
      id: 'gk-5',
      url: '/media/images/gorukothapalli-kalyanalakshmi-cheques-5.jpg',
      titleEn: 'Community Participation & Civic Gathering',
      titleTe: 'గ్రామ ప్రజల పెద్ద ఎత్తున భాగస్వామ్యం & ప్రజా సంభాషణ',
      captionEn: 'Beneficiaries and village elders expressing heartfelt appreciation to MLA Sathanna.',
      captionTe: 'సకాలంలో ఆర్థిక సహాయం అందించినందుకు ఎమ్మెల్యే సత్తన్న గారికి ధన్యవాదాలు తెలిపిన గ్రామస్తులు.'
    },
    {
      id: 'gk-6',
      url: '/media/images/gorukothapalli-kalyanalakshmi-cheques-6.jpg',
      titleEn: 'Group Felicitation & Beneficiary Group Photograph',
      titleTe: 'లబ్ధిదారులతో సామూహిక ఛాయాచిత్రం',
      captionEn: 'Commemorative group photograph with beneficiaries and local public representatives in Gorukothapalli.',
      captionTe: 'గోరుకొత్తపల్లి మండలంలోని లబ్ధిదారులు మరియు స్థానిక నాయకులతో గ్రూప్ ఫోటో.'
    }
  ]
};

export default function LatestUpdatesSection() {
  const { isTelugu } = useLanguage();
  const update = LATEST_UPDATE_RECORD;

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [copyFeedback, setCopyFeedback] = useState('');
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

  // Social Sharing Handlers
  const shareTitle = isTelugu ? update.titleTe : update.titleEn;
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/#latest-updates` : 'https://gandrasatyanarayanarao.in/#latest-updates';

  const handleWhatsAppShare = () => {
    const text = `${shareTitle}\n\n${shareUrl}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShareOrCopy = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: isTelugu ? update.leadTe : update.leadEn,
          url: shareUrl
        });
        return;
      } catch (err) {
        // Fall back to clipboard copy if cancelled or unsupported
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareTitle}\n${shareUrl}`);
      setCopyFeedback(isTelugu ? 'లింక్ కాపీ చేయబడింది!' : 'Link copied! Ready to paste in Instagram Story / WhatsApp Status.');
      setTimeout(() => setCopyFeedback(''), 4000);
    } catch (err) {
      setCopyFeedback('URL: ' + shareUrl);
    }
  };

  const currentPhoto = update.photos[activePhotoIdx] || update.photos[0];

  return (
    <section className="latest-updates-section" id="latest-updates" aria-label="New Updates and Field Dispatches">
      <div className="container">
        <div className="latest-updates-canvas">
          {/* Section Heading: "New Updates" */}
          <div className="new-updates-section-header">
            <div className="tag-label green">
              {isTelugu ? 'తాజా సమాచారం · NEW UPDATES' : 'NEW UPDATES'}
            </div>
            <h2 className="section-title" style={{ marginTop: '0.65rem' }}>
              {isTelugu ? 'నియోజకవర్గ తాజా సమాచారం' : 'New Updates & Field Dispatches'}
            </h2>
          </div>

          {/* Grid Layout: In Mobile, Photos are on TOP (Order -1), Headline & News on BOTTOM */}
          <div className="latest-updates-grid-reordered">
            {/* Pictures Deck Column (Appears FIRST on mobile) */}
            <div className="latest-photos-column">
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
                      0{carouselIdx + 1} / 0{update.photos.length}
                    </span>
                    <span className="latest-deck-hint">
                      {isTelugu ? 'గ్యాలరీని చూడండి' : 'Click to View Full Gallery'}
                    </span>
                  </div>

                  {/* Bottom Caption Pill */}
                  <div className="latest-deck-bottom-caption">
                    <p className="latest-deck-caption-text">
                      {isTelugu ? update.photos[carouselIdx].titleTe : update.photos[carouselIdx].titleEn}
                    </p>
                  </div>
                </div>

                {/* Thumbnail Preview Strip */}
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

            {/* Matter & News Column (Appears below photos on mobile) */}
            <div className="latest-matter-column">
              {/* Meta Date & Press Label Bar */}
              <div className="latest-meta-header-bar">
                <div className="latest-pulse-badge">
                  <span className="live-pulse-dot" aria-hidden="true"></span>
                  <span className="latest-badge-tag">
                    {isTelugu ? 'ఫీల్డ్ సమాచారం' : 'Field Dispatch'}
                  </span>
                  <span className="latest-badge-sep">•</span>
                  <span className="latest-badge-date">
                    {isTelugu ? update.dateFormattedTe : update.dateFormattedEn}
                  </span>
                </div>

                <div className="latest-press-chip">
                  {isTelugu ? update.pressNoteLabelTe : update.pressNoteLabelEn}
                </div>
              </div>

              {/* Headline */}
              <h3 className="latest-headline-title">
                {isTelugu ? update.titleTe : update.titleEn}
              </h3>

              {/* Lead Paragraph */}
              <p className="latest-lead-paragraph">
                {isTelugu ? update.leadTe : update.leadEn}
              </p>

              {/* Detailed News Paragraphs */}
              <div className="latest-body-paragraphs">
                {(isTelugu ? update.bodyTe : update.bodyEn).map((para, i) => (
                  <p key={i} className="latest-paragraph">
                    {para}
                  </p>
                ))}
              </div>

              {/* Dedicated Share Bar */}
              <div className="latest-share-container">
                <div className="latest-share-label">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>
                  <span>{isTelugu ? 'ఈ వార్తను పంచుకోండి:' : 'Share this update:'}</span>
                </div>

                <div className="latest-share-actions">
                  <button
                    type="button"
                    className="share-btn share-whatsapp"
                    onClick={handleWhatsAppShare}
                    aria-label="Share on WhatsApp Status & Chat"
                    title="Share on WhatsApp"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.06c-1.49 0-2.94-.4-4.21-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.03 8.03 0 0 1-1.23-4.29c0-4.43 3.61-8.05 8.05-8.05 2.15 0 4.17.84 5.69 2.36a8.01 8.01 0 0 1 2.36 5.69c0 4.44-3.62 8.05-8.07 8.05zm4.41-6.03c-.24-.12-1.43-.71-1.65-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.41-.41-.56-.42h-.48c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.15.2-.56.2-1.04.14-1.15-.06-.1-.22-.16-.46-.28z"/>
                    </svg>
                    <span>WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    className="share-btn share-facebook"
                    onClick={handleFacebookShare}
                    aria-label="Share on Facebook"
                    title="Share on Facebook"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook</span>
                  </button>

                  <button
                    type="button"
                    className="share-btn share-story"
                    onClick={handleNativeShareOrCopy}
                    aria-label="Share to Instagram Story or Copy Link"
                    title="Share to Instagram Story / Copy Link"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <span>{isTelugu ? 'ఇన్‌స్టాగ్రామ్ / లింక్' : 'Instagram / Copy'}</span>
                  </button>
                </div>

                {copyFeedback && (
                  <div className="share-feedback-toast" role="status">
                    {copyFeedback}
                  </div>
                )}
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
            <button
              type="button"
              className="latest-modal-arrow-btn prev"
              onClick={handlePrev}
              aria-label="Previous Photo (Left Arrow)"
              title="Previous (Left Arrow)"
            >
              &#10094;
            </button>

            <div className="latest-modal-viewport">
              <div className="latest-modal-slide">
                <img
                  src={resolveMediaUrl(currentPhoto.url)}
                  alt={isTelugu ? currentPhoto.titleTe : currentPhoto.titleEn}
                  className="latest-modal-img"
                />
              </div>

              <div className="latest-modal-caption-card">
                <h3 className="modal-caption-heading">
                  {isTelugu ? currentPhoto.titleTe : currentPhoto.titleEn}
                </h3>
                <p className="modal-caption-text">
                  {isTelugu ? currentPhoto.captionTe : currentPhoto.captionEn}
                </p>
              </div>
            </div>

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
