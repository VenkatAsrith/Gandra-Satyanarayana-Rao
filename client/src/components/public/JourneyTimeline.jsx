import React from 'react';

export default function JourneyTimeline({ timeline }) {
  const defaultTimeline = [
    {
      yearOrPeriod: 'EARLY',
      role: 'Village Sarpanch',
      title: 'Sarpanch, Buddharam Village',
      description: 'Commenced public representation in native Buddharam village, Ghanapuram mandal, overseeing village administration, irrigation tanks, and rural civic matters.',
      citation: 'Regional Electoral Records & Political Biographies'
    },
    {
      yearOrPeriod: '1996',
      role: 'ZPTC Member',
      title: 'Elected ZPTC, Ghanapuram Mandal',
      description: 'Elected to the Zilla Parishad Territorial Constituency (ZPTC) representing Ghanapuram mandal under Telugu Desam Party, coordinating mandal development works and school facilities.',
      citation: 'TV9 Telugu Political Feature'
    },
    {
      yearOrPeriod: '2014 & 18',
      role: 'Assembly Candidate',
      title: 'Bhupalpalle Assembly Contests',
      description: 'Contested the Bhupalpalle Assembly constituency in 2014 (securing 50,000+ votes) and in 2018 under All India Forward Bloc (securing 53,982 votes), consolidating deep rural support across all major mandals.',
      citation: 'Election Commission of India / MyNeta'
    },
    {
      yearOrPeriod: '2021',
      role: 'Sep 30 · Congress',
      title: 'Induction into Indian National Congress',
      description: 'Formally joined the Indian National Congress on September 30, 2021, under the leadership of TPCC President A. Revanth Reddy, actively coordinating district party cadre and constituent outreach.',
      citation: 'The New Indian Express / The Hans India'
    },
    {
      yearOrPeriod: '2023',
      role: 'Elected MLA',
      title: 'Dec 3, 2023: Victory in 3rd Telangana Assembly',
      description: 'Elected to the Telangana Legislative Assembly representing Bhupalpalle constituency (108) with 123,116 votes (54.55% of the total poll), recording a winning margin of 52,699 votes over his nearest opponent. Currently serving his five-year legislative term (2023–2028).',
      citation: 'Election Commission of India / PRS Legislative Research',
      accentColor: '#86EFAC'
    }
  ];

  const items = timeline && timeline.length ? timeline : defaultTimeline;

  return (
    <section id="journey" className="journey-section">
      <div className="container">
        <div className="journey-header">
          <div className="tag-label dark">Documented Timeline</div>
          <h2 className="section-title">The Public Journey</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            A three-decade record of electoral representation and public service across Jayashankar Bhupalpally.
          </p>
        </div>

        <div className="editorial-timeline">
          {items.map((item, index) => {
            const isLatest = index === items.length - 1;
            return (
              <div key={index} className="editorial-timeline-row">
                <div className="timeline-year-col">
                  <span className={`editorial-year-huge ${isLatest ? 'green-accent' : ''}`}>
                    {item.yearOrPeriod}
                  </span>
                  <span
                    className="timeline-role-pill"
                    style={isLatest ? { color: '#86EFAC' } : {}}
                  >
                    {item.role}
                  </span>
                </div>
                <div className="timeline-desc-col">
                  <h3
                    className="timeline-heading-editorial"
                    style={isLatest ? { color: '#FFFFFF' } : {}}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="timeline-paragraph"
                    style={isLatest ? { color: '#E2E8F0' } : {}}
                  >
                    {item.description}
                  </p>
                  {item.citation && (
                    <span
                      className="timeline-citation"
                      style={isLatest ? { color: '#86EFAC' } : {}}
                    >
                      Source: {item.citation}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
