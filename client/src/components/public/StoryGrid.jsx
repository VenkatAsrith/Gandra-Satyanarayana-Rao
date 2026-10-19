import React from 'react';
import { Link } from 'react-router-dom';

export default function StoryGrid({ profile }) {
  const leadTitle = profile?.leadTitle || 'A lifetime dedicated to agriculture, grassroots democracy, and direct constituent representation.';
  const summary = profile?.biographySummary || 'Born in 1965 to agrarian elder Late Sri Gandra Samma Rao in Buddharam village, Ghanapuram mandal, Gandra Satyanarayana Rao (Sathenna) completed his Bachelor of Arts from Kakatiya University and an ITI Civil diploma. Over nearly four decades of dedicated public service—starting as Village Sarpanch in Buddharam, then ZPTC Member, and ultimately winning the Bhupalpalle Assembly seat in December 2023 with 123,116 votes and a historic 52,699-vote victory margin—he has stood as an unwavering champion for farmers\' canal waters, Singareni coal miners, and rural infrastructure.';

  return (
    <section className="section">
      <div className="container">
        <div className="intro-grid">
          <div>
            <div className="tag-label">About the Person</div>
          </div>
          <div>
            <h2 className="intro-lead-title">{leadTitle}</h2>
          </div>
          <div>
            <p className="intro-desc">{summary}</p>
            <div style={{ marginTop: '1.75rem' }}>
              <Link to="/about" className="link-arrow">
                Read full documented biography
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
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
              <span className="story-category">Public Address & Representation</span>
              <h3 className="story-title">Articulating People's Voice on Stage & in State Assembly</h3>
              <p className="story-text">
                Addressing thousands of constituents alongside Chief Minister A. Revanth Reddy, championing welfare allocations, crop loan waivers, and Singareni mining workers' rights across Jayashankar Bhupalpally.
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
              <span className="story-category">Academic & Technical Background</span>
              <h3 className="story-title">Kakatiya University BA & Civil ITI Qualifications</h3>
              <p className="story-text">
                Combining a humanities degree from Kakatiya University with technical training in civil engineering draughtsmanship, bringing practical engineering insight to rural irrigation and public works.
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
              <span className="story-category">Grassroots Accessibility</span>
              <h3 className="story-title">Weekly "Praja Darbar"</h3>
              <p className="story-text">
                Direct open court at the MLA Camp Office where Sathenna resolves citizen representations on the spot alongside administrative officers.
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
              <span className="story-category">Civic Partnership & State Alignment</span>
              <h3 className="story-title">Coordination with State Executive</h3>
              <p className="story-text">
                Partnering with spouse Smt. Gandra Padma to secure high-priority government sanctions including the ₹31 Cr Ghanapur canal upgrade and ₹12.15 Cr Kotanchu temple project.
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
              <span className="story-category">Decisive Electoral Mandate</span>
              <h3 className="story-title">123,116 Votes & 52,699 Margin</h3>
              <p className="story-text">
                Historic victory in the 2023 Telangana Legislative Assembly elections, winning 54.55% of the total vote in Bhupalpalle constituency (No. 108).
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
