import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

export default function StoryGrid({ profile }) {
  const { isTelugu, t } = useLanguage();

  const leadTitle = isTelugu
    ? (profile?.translations?.te?.leadTitle || 'ప్రజాస్వామ్య విలువలు, వ్యవసాయం & నిరంతర ప్రజాసేవకే అంకితమైన జీవితం.')
    : (profile?.leadTitle || 'A lifetime dedicated to agriculture, grassroots democracy, and direct constituent representation.');

  const summary = isTelugu
    ? (profile?.translations?.te?.biographySummary ||
        '1965లో జయశంకర్ భూపాలపల్లి జిల్లా ఘనపురం మండలం బుద్ధారం గ్రామంలో వ్యవసాయ కుటుంబంలో జన్మించిన గండ్ర సత్యనారాయణ రావు (సత్తెన్న), కాకతీయ విశ్వవిద్యాలయం నుండి బి.ఎ. మరియు సివిల్ ఐటీఐ డిప్లొమా పూర్తి చేశారు. నాలుగు దశాబ్దాలుగా బుద్ధారం గ్రామ సర్పంచ్‌గా, జెడ్పీటీసీగా ప్రజాసేవలో కొనసాగుతూ, 2023 డిసెంబర్ శాసనసభ ఎన్నికల్లో 1,23,116 ఓట్లతో 52,699 ఓట్ల భారీ మెజారిటీతో విజయం సాధించి భూపాలపల్లి ఎమ్మెల్యేగా నిరంతరం ప్రజాసేవలో నిమగ్నమై ఉన్నారు.')
    : (profile?.biographySummary ||
        'Born in 1965 to agrarian elder Late Sri Gandra Samma Rao in Buddharam village, Ghanapuram mandal, Gandra Satyanarayana Rao (Sathenna) completed his Bachelor of Arts from Kakatiya University and an ITI Civil diploma. Over nearly four decades of dedicated public service—starting as Village Sarpanch in Buddharam, then ZPTC Member, and ultimately winning the Bhupalpalle Assembly seat in December 2023 with 123,116 votes and a historic 52,699-vote victory margin—he has stood as an unwavering champion for farmers\' canal waters, Singareni coal miners, and rural infrastructure.');

  return (
    <section className="section">
      <div className="container">
        <div className="intro-grid">
          <div>
            <div className="tag-label">
              {isTelugu ? 'నాయకత్వ విశేషాలు' : 'About the Person'}
            </div>
          </div>
          <div>
            <h2 className="intro-lead-title">{leadTitle}</h2>
          </div>
          <div>
            <p className="intro-desc">{summary}</p>
            <div style={{ marginTop: '1.75rem' }}>
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
        </div>

        {/* Asymmetric Visual Story Grid */}
        <div className="story-grid">
          <article className="story-card story-card-large">
            <div className="story-img-wrap">
              <img
                src="/images/events/public-address.png"
                alt="Gandra Satyanarayana Rao addressing the public alongside Chief Minister A. Revanth Reddy"
                loading="lazy"
                style={{ objectPosition: 'center 20%' }}
              />
            </div>
            <div className="story-body">
              <span className="story-category">
                {isTelugu ? 'ప్రజా గళం & శాసనసభ ప్రాతినిధ్యం' : 'Public Address & Representation'}
              </span>
              <h3 className="story-title">
                {isTelugu
                  ? 'ప్రజల పక్షాన ప్రజా వేదికలపై మరియు శాసనసభలో బలమైన గళం'
                  : "Articulating People's Voice on Stage & in State Assembly"}
              </h3>
              <p className="story-text">
                {isTelugu
                  ? 'ముఖ్యమంత్రి ఎ. రేవంత్ రెడ్డి గారితో కలిసి భారీ బహిరంగ సభల్లో పాల్గొంటూ, భూపాలపల్లి జిల్లా రైతు రుణమాఫీ, సంక్షేమ పథకాలు మరియు సింగరేణి కార్మికుల హక్కులకై ప్రాధాన్యతనిస్తున్నారు.'
                  : "Addressing thousands of constituents alongside Chief Minister A. Revanth Reddy, championing welfare allocations, crop loan waivers, and Singareni mining workers' rights across Jayashankar Bhupalpally."}
              </p>
            </div>
          </article>

          <article className="story-card story-card-medium">
            <div className="story-img-wrap">
              <img
                src="/images/about/profile-formal.png"
                alt="Official formal portrait of Gandra Satyanarayana Rao"
                loading="lazy"
                style={{ objectPosition: 'center 10%' }}
              />
            </div>
            <div className="story-body">
              <span className="story-category">
                {isTelugu ? 'విద్యార్హతలు & సాంకేతిక పరిజ్ఞానం' : 'Academic & Technical Background'}
              </span>
              <h3 className="story-title">
                {isTelugu
                  ? 'కాకతీయ విశ్వవిద్యాలయం బి.ఎ. & సివిల్ ఐటీఐ అర్హతలు'
                  : 'Kakatiya University BA & Civil ITI Qualifications'}
              </h3>
              <p className="story-text">
                {isTelugu
                  ? 'కాకతీయ విశ్వవిద్యాలయం డిగ్రీతో పాటు సివిల్ ఇంజనీరింగ్ ఐటీఐ శిక్షణ ఉండటం వలన గ్రామీణ సాగునీటి ప్రాజెక్టులు మరియు రోడ్డు నిర్మాణాల్లో క్షేత్రస్థాయి అవగాహనతో నిర్ణయాలు.'
                  : 'Combining a humanities degree from Kakatiya University with technical training in civil engineering draughtsmanship, bringing practical engineering insight to rural irrigation and public works.'}
              </p>
            </div>
          </article>

          <article className="story-card story-card-tri">
            <div className="story-img-wrap">
              <img
                src="/images/about/portrait-namaste.png"
                alt="Gandra Satyanarayana Rao greeting citizens with folded hands"
                loading="lazy"
                style={{ objectPosition: 'center 15%' }}
              />
            </div>
            <div className="story-body">
              <span className="story-category">
                {isTelugu ? 'నిరంతరం ప్రజా సేవ' : 'Grassroots Accessibility'}
              </span>
              <h3 className="story-title">
                {isTelugu ? 'వారపు "ప్రజా దర్బార్"' : 'Weekly "Praja Darbar"'}
              </h3>
              <p className="story-text">
                {isTelugu
                  ? 'బుద్ధారం క్యాంపు కార్యాలయంలో నిరంతరం ప్రజా దర్బార్ నిర్వహిస్తూ, ప్రజల సమస్యలను ప్రత్యక్షంగా పరిశీలించి తక్షణ పరిష్కారాలు చూపిస్తున్నారు.'
                  : 'Direct open court at the MLA Camp Office where Sathenna resolves citizen representations on the spot alongside administrative officers.'}
              </p>
            </div>
          </article>

          <article className="story-card story-card-tri">
            <div className="story-img-wrap">
              <img
                src="/images/about/family-revanth.png"
                alt="Gandra Satyanarayana Rao and Smt. Gandra Padma meeting Chief Minister Revanth Reddy"
                loading="lazy"
                style={{ objectPosition: 'center 20%' }}
              />
            </div>
            <div className="story-body">
              <span className="story-category">
                {isTelugu ? 'ప్రభుత్వంతో సమన్వయం' : 'Civic Partnership & State Alignment'}
              </span>
              <h3 className="story-title">
                {isTelugu ? 'రాష్ట్ర ప్రభుత్వంతో సమన్వయం' : 'Coordination with State Executive'}
              </h3>
              <p className="story-text">
                {isTelugu
                  ? 'సతీమణి శ్రీమతి గండ్ర పద్మ గారితో కలిసి ముఖ్యమంత్రితో సమన్వయం చేస్తూ ₹31 కోట్ల ఘనపూర్ కాలువలు, ₹12.15 కోట్ల కోటంచ ఆలయ నిధులు సాధించారు.'
                  : 'Partnering with spouse Smt. Gandra Padma to secure high-priority government sanctions including the ₹31 Cr Ghanapur canal upgrade and ₹12.15 Cr Kotanchu temple project.'}
              </p>
            </div>
          </article>

          <article className="story-card story-card-tri">
            <div className="story-img-wrap">
              <img
                src="/images/hero/hero-portrait.png"
                alt="Gandra Satyanarayana Rao with tricolor scarf after 2023 victory"
                loading="lazy"
                style={{ objectPosition: 'center 15%' }}
              />
            </div>
            <div className="story-body">
              <span className="story-category">
                {isTelugu ? 'చారిత్రాత్మక ప్రజా తీర్పు' : 'Decisive Electoral Mandate'}
              </span>
              <h3 className="story-title">
                {isTelugu ? '1,23,116 ఓట్లు & 52,699 మెజారిటీ' : '123,116 Votes & 52,699 Margin'}
              </h3>
              <p className="story-text">
                {isTelugu
                  ? '2023 తెలంగాణ శాసనసభ ఎన్నికల్లో 54.55% ఓట్ల శాతంతో చారిత్రాత్మక ఘనవిజయం సాధించి భూపాలపల్లి నియోజకవర్గ ప్రతినిధిగా ఎన్నిక.'
                  : 'Historic victory in the 2023 Telangana Legislative Assembly elections, winning 54.55% of the total vote in Bhupalpalle constituency (No. 108).'}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
