import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

export default function StoryGrid({ profile }) {
  const { isTelugu } = useLanguage();
  const trackRef = useRef(null);
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  const journeyCards = [
    {
      no: '01',
      categoryEn: 'Public Address & Representation',
      categoryTe: 'ప్రజా గళం & శాసనసభ ప్రాతినిధ్యం',
      titleEn: "Articulating People's Voice on Stage & in State Assembly",
      titleTe: 'ప్రజల పక్షాన ప్రజా వేదికలపై మరియు శాసనసభలో బలమైన గళం',
      descEn:
        "Addressing thousands of constituents alongside Chief Minister A. Revanth Reddy, championing welfare allocations, crop loan waivers, and Singareni mining workers' rights across Jayashankar Bhupalpally.",
      descTe:
        'ముఖ్యమంత్రి ఎ. రేవంత్ రెడ్డి గారితో కలిసి భారీ బహిరంగ సభల్లో పాల్గొంటూ, భూపాలపల్లి నియోజకవర్గ రైతాంగం రుణమాఫీ, సంక్షేమ పథకాలు మరియు సింగరేణి కార్మికుల సమస్యలను శాసనసభలో గట్టిగా వినిపించారు.',
      image: '/images/events/public-address.png',
      alt: 'Gandra Satyanarayana Rao addressing the public alongside Chief Minister A. Revanth Reddy',
      accent: 'saffron',
      pos: 'center 20%'
    },
    {
      no: '02',
      categoryEn: 'Academic & Technical Background',
      categoryTe: 'విద్యా నేపథ్యం & సాంకేతిక పరిజ్ఞానం',
      titleEn: 'Kakatiya University BA & Civil ITI Qualifications',
      titleTe: 'కాకతీయ యూనివర్సిటీ బి.ఎ. & సివిల్ ఐటీఐ అర్హతలు',
      descEn:
        'Combining a humanities degree from Kakatiya University with technical training in civil engineering draughtsmanship, bringing practical engineering insight to rural irrigation and public works.',
      descTe:
        'కాకతీయ విశ్వవిద్యాలయం నుంచి ఆర్ట్స్ డిగ్రీ, సివిల్ ఇంజనీరింగ్ ఐటీఐ శిక్షణతో గ్రామీణ నీటిపారుదల, రోడ్లు, తాగునీటి వ్యవస్థల నిర్మాణాలపై క్షేత్రస్థాయి అవగాహనతో నిర్ణయాలు.',
      image: '/images/about/profile-formal.png',
      alt: 'Gandra Satyanarayana Rao formal portrait',
      accent: 'green',
      pos: 'center 10%'
    },
    {
      no: '03',
      categoryEn: 'Grassroots Accessibility',
      categoryTe: 'నిరంతరం ప్రజా సేవ',
      titleEn: 'Weekly Praja Darbar',
      titleTe: 'వారపు "ప్రజా దర్బార్"',
      descEn:
        'Direct open court at the MLA Camp Office where Sathanna resolves citizen representations on the spot alongside administrative officers.',
      descTe:
        'బుద్ధారం క్యాంపు కార్యాలయంలో నిరంతరం ప్రజా దర్బార్ నిర్వహిస్తూ, ప్రజల సమస్యలను ప్రత్యక్షంగా పరిశీలించి తక్షణ పరిష్కారాలు చూపిస్తున్నారు.',
      image: '/images/about/portrait-namaste.png',
      alt: 'Gandra Satyanarayana Rao greeting citizens with folded hands',
      accent: 'saffron',
      pos: 'center 15%'
    },
    {
      no: '04',
      categoryEn: 'Civic Partnership & State Alignment',
      categoryTe: 'ప్రభుత్వంతో సమన్వయం',
      titleEn: 'Coordination with State Executive',
      titleTe: 'రాష్ట్ర ప్రభుత్వంతో సమన్వయం',
      descEn:
        'Partnering with spouse Smt. Gandra Padma to secure high-priority government sanctions including the ₹31 Cr Ghanapur canal upgrade and ₹12.15 Cr Kotanchu temple project.',
      descTe:
        'సతీమణి శ్రీమతి గండ్ర పద్మ గారితో కలిసి ముఖ్యమంత్రితో సమన్వయం చేస్తూ ₹31 కోట్ల ఘనపూర్ కాలువలు, ₹12.15 కోట్ల కోటంచ ఆలయ నిధులు సాధించారు.',
      image: '/images/about/family-revanth.png',
      alt: 'Gandra Satyanarayana Rao and Smt. Gandra Padma meeting Chief Minister Revanth Reddy',
      accent: 'green',
      pos: 'center 20%'
    },
    {
      no: '05',
      categoryEn: 'Decisive Electoral Mandate',
      categoryTe: 'చారిత్రాత్మక ప్రజా తీర్పు',
      titleEn: '123,116 Votes & 52,699 Margin',
      titleTe: '1,23,116 ఓట్లు & 52,699 మెజారిటీ',
      descEn:
        'Historic victory in the 2023 Telangana Legislative Assembly elections, winning 54.55% of the total vote in Bhupalpalle constituency (No. 108).',
      descTe:
        '2023 తెలంగాణ శాసనసభ ఎన్నికల్లో 54.55% ఓట్ల శాతంతో చారిత్రాత్మక ఘనవిజయం సాధించి భూపాలపల్లి నియోజకవర్గ ప్రతినిధిగా ఎన్నిక.',
      image: '/images/hero/hero-portrait.png',
      alt: 'Gandra Satyanarayana Rao after 2023 victory',
      accent: 'saffron',
      pos: 'center 15%'
    }
  ];

  // Horizontal Trigger Animation & Smooth Scroll Handlers
  const scrollToStory = (index) => {
    setActiveStoryIdx(index);
    if (!trackRef.current) return;
    const cards = trackRef.current.children;
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  };

  const handlePrev = () => {
    const nextIdx = activeStoryIdx > 0 ? activeStoryIdx - 1 : journeyCards.length - 1;
    scrollToStory(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = activeStoryIdx < journeyCards.length - 1 ? activeStoryIdx + 1 : 0;
    scrollToStory(nextIdx);
  };

  const handleTrackScroll = () => {
    if (!trackRef.current) return;
    const scrollLeft = trackRef.current.scrollLeft;
    const cardWidth = trackRef.current.children[0]?.offsetWidth || 340;
    const index = Math.round(scrollLeft / cardWidth);
    if (index >= 0 && index < journeyCards.length && index !== activeStoryIdx) {
      setActiveStoryIdx(index);
    }
  };

  return (
    <section className="section story-section" id="journey-stories" aria-label="Public Service and Leadership Journey">
      <div className="container">
        {/* Editorial Section Header */}
        <div className="story-header-split">
          <div>
            <div className="tag-label">
              {isTelugu ? 'ప్రజా సేవ, నాయకత్వం & శాసనసభ ప్రస్థానం' : 'Public Service, Leadership & Legislative Journey'}
            </div>
            <h2 className="section-title" style={{ marginTop: '0.65rem' }}>
              {isTelugu
                ? 'ప్రజాస్వామ్య విలువలు, వ్యవసాయం & నిరంతర ప్రజాసేవకే అంకితం'
                : 'A Lifetime Dedicated to Grassroots Democracy & People’s Mandate'}
            </h2>
          </div>

          {/* Interactive Trigger Navigation Controls */}
          <div className="story-nav-controls">
            <button
              type="button"
              className="story-arrow-btn prev"
              onClick={handlePrev}
              aria-label="Previous Milestone"
              title="Previous Milestone"
            >
              &#10094;
            </button>
            <span className="story-counter-pill">
              0{activeStoryIdx + 1} / 0{journeyCards.length}
            </span>
            <button
              type="button"
              className="story-arrow-btn next"
              onClick={handleNext}
              aria-label="Next Milestone"
              title="Next Milestone"
            >
              &#10095;
            </button>
          </div>
        </div>

        {/* Side Scroll / Horizontal Snapping Track Across Desktop & Mobile */}
        <div
          className="story-horizontal-track"
          ref={trackRef}
          onScroll={handleTrackScroll}
          role="region"
          aria-label="Leadership Journey Horizontal Track"
        >
          {journeyCards.map((c, idx) => (
            <article
              key={idx}
              className={`story-h-card accent-${c.accent} ${idx === activeStoryIdx ? 'is-active-story' : ''}`}
              onClick={() => scrollToStory(idx)}
            >
              <div className="story-h-img-wrap">
                <img
                  src={c.image}
                  alt={c.alt}
                  className="story-h-img"
                  loading="lazy"
                  style={{ objectPosition: c.pos }}
                />
                <span className="story-h-badge">
                  {isTelugu ? c.categoryTe : c.categoryEn}
                </span>
                <span className="story-h-chapter">0{idx + 1}</span>
              </div>

              <div className="story-h-body">
                <h3 className="story-h-title">
                  {isTelugu ? c.titleTe : c.titleEn}
                </h3>
                <p className="story-h-desc">
                  {isTelugu ? c.descTe : c.descEn}
                </p>
              </div>

              <div className="story-h-footer">
                <Link to="/about" className="link-arrow story-h-link">
                  <span>{isTelugu ? 'పూర్తి వివరాలు చదవండి' : 'Read Full History'}</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Dot Progress Row */}
        <div className="story-dots-row">
          {journeyCards.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`story-dot-btn ${idx === activeStoryIdx ? 'active' : ''}`}
              onClick={() => scrollToStory(idx)}
              aria-label={`Jump to Story 0${idx + 1}`}
            />
          ))}
        </div>

        <div className="story-read-more-wrap" style={{ marginTop: '2.5rem' }}>
          <Link to="/about" className="btn-pill btn-secondary">
            {isTelugu ? 'సంపూర్ణ జీవిత చరిత్ర చదవండి' : 'Read Full Documented Biography'} →
          </Link>
        </div>
      </div>
    </section>
  );
}
