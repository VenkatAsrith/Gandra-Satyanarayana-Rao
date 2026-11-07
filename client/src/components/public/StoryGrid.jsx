import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

export default function StoryGrid({ profile }) {
  const { isTelugu } = useLanguage();

  const journeyCards = [
    {
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

  return (
    <section className="section story-section" id="journey-stories">
      <div className="container">
        {/* Editorial Section Header */}
        <div className="section-head-editorial">
          <div className="tag-label">
            {isTelugu ? 'ప్రజా సేవ, నాయకత్వం & శాసనసభ ప్రస్థానం' : 'Public Service, Leadership & Legislative Journey'}
          </div>
          <h2 className="section-title">
            {isTelugu
              ? 'ప్రజాస్వామ్య విలువలు, వ్యవసాయం & నిరంతర ప్రజాసేవకే అంకితం'
              : 'A Lifetime Dedicated to Grassroots Democracy & People’s Mandate'}
          </h2>
          <p className="section-subtitle">
            {isTelugu
              ? 'నాలుగు దశాబ్దాల ప్రజా జీవితం — బుద్ధారం గ్రామ సర్పంచ్‌గా మొదలై, జెడ్పీటీసీగా ఎదిగి, నేడు భూపాలపల్లి ఎమ్మెల్యేగా ప్రజా సమస్యల పరిష్కారానికై నిరంతర పోరాటం.'
              : 'Over nearly four decades of dedicated public service—starting as Village Sarpanch in Buddharam, then ZPTC Member, and ultimately winning the Bhupalpalle Assembly seat in 2023 with a historic 52,699-vote victory margin.'}
          </p>
        </div>

        {/* Desktop Presentation: Asymmetric Documentary Image Grid (Hidden on Mobile) */}
        <div className="story-desktop-grid">
          {/* Featured Large Card */}
          <article className="story-card story-card-featured">
            <div className="story-img-wrap">
              <img
                src={journeyCards[0].image}
                alt={journeyCards[0].alt}
                loading="lazy"
                style={{ objectPosition: journeyCards[0].pos }}
              />
              <div className="story-img-badge">
                {isTelugu ? journeyCards[0].categoryTe : journeyCards[0].categoryEn}
              </div>
            </div>
            <div className="story-body">
              <h3 className="story-title">
                {isTelugu ? journeyCards[0].titleTe : journeyCards[0].titleEn}
              </h3>
              <p className="story-text">
                {isTelugu ? journeyCards[0].descTe : journeyCards[0].descEn}
              </p>
            </div>
          </article>

          {/* 4 Supporting Documentary Cards */}
          <div className="story-sub-grid">
            {journeyCards.slice(1).map((c, idx) => (
              <article key={idx} className="story-card story-card-sub">
                <div className="story-img-wrap">
                  <img
                    src={c.image}
                    alt={c.alt}
                    loading="lazy"
                    style={{ objectPosition: c.pos }}
                  />
                  <div className="story-img-badge">
                    {isTelugu ? c.categoryTe : c.categoryEn}
                  </div>
                </div>
                <div className="story-body">
                  <h3 className="story-title">
                    {isTelugu ? c.titleTe : c.titleEn}
                  </h3>
                  <p className="story-text">
                    {isTelugu ? c.descTe : c.descEn}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="story-read-more-wrap">
            <Link to="/about" className="link-arrow">
              {isTelugu ? 'సంపూర్ణ జీవిత విశేషాలు చదవండి' : 'Read full documented biography'}
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Mobile Presentation: Dedicated ScrollStack (Hidden on Desktop) */}
        <div className="story-mobile-scrollstack">
          <ScrollStack className="journey-stack">
            {journeyCards.map((c, idx) => (
              <ScrollStackItem key={idx} accent={c.accent}>
                <div className="stack-journey-card">
                  <div className="stack-journey-img-frame">
                    <img
                      src={c.image}
                      alt={c.alt}
                      className="stack-journey-img"
                      loading="lazy"
                      style={{ objectPosition: c.pos }}
                    />
                    <span className="stack-journey-badge">
                      {isTelugu ? c.categoryTe : c.categoryEn}
                    </span>
                  </div>
                  <div className="stack-journey-content">
                    <h3 className="stack-journey-title">
                      {isTelugu ? c.titleTe : c.titleEn}
                    </h3>
                    <p className="stack-journey-desc">
                      {isTelugu ? c.descTe : c.descEn}
                    </p>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>

          <div className="mobile-story-cta-wrap">
            <Link to="/about" className="btn-pill btn-secondary full-width">
              {isTelugu ? 'సంపూర్ణ జీవిత ప్రస్థానం చదవండి' : 'Read Full Documented Biography'} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
