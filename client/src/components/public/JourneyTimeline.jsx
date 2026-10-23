import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export default function JourneyTimeline({ timeline }) {
  const { isTelugu, t } = useLanguage();

  const teluguMilestoneOverrides = [
    {
      yearOrPeriod: 'ఆరంభం',
      role: 'గ్రామ సర్పంచ్',
      title: 'బుద్ధారం గ్రామ సర్పంచ్‌గా ప్రజా ప్రస్థానం',
      description: 'స్వగ్రామమైన బుద్ధారంలో గ్రామ సర్పంచ్‌గా ప్రజాసేవ ప్రారంభించి, గ్రామ పరిపాలన, స్థానిక సాగునీటి చెరువులు, రైతు సమస్యల పరిష్కారంలో కీలక పాత్ర.',
      citation: 'స్థానిక ఎన్నికల రికార్డులు & రాజకీయ ప్రస్థానం'
    },
    {
      yearOrPeriod: '1996',
      role: 'జెడ్పీటీసీ సభ్యులు',
      title: 'ఘనపురం మండల జెడ్పీటీసీగా ఎన్నిక',
      description: 'ఘనపురం మండలం జెడ్పీటీసీ సభ్యునిగా ఎన్నికై, మండల వ్యాప్తంగా విద్యా సంస్థలు, ఆస్పత్రులు మరియు గ్రామీణ మౌలిక వసతుల కల్పనలో విశేష కృషి.',
      citation: 'టీవీ9 తెలుగు పొలిటికల్ ఫీచర్'
    },
    {
      yearOrPeriod: '2014 & 18',
      role: 'అసెంబ్లీ అభ్యర్థి',
      title: 'భూపాలపల్లి అసెంబ్లీ నియోజకవర్గ పోటీ',
      description: 'భూపాలపల్లి నియోజకవర్గం నుండి 2014 మరియు 2018 శాసనసభ ఎన్నికల్లో పోటీ చేసి (2018లో 53,982 ఓట్లు సాధించి), అన్ని మండలాల ప్రజల మన్ననలు పొందారు.',
      citation: 'భారత ఎన్నికల సంఘం / మైనేత'
    },
    {
      yearOrPeriod: '2021',
      role: 'సెప్టెంబర్ 30 · కాంగ్రెస్',
      title: 'భారత జాతీయ కాంగ్రెస్ పార్టీలో చేరిక',
      description: 'టీపీసీసీ అధ్యక్షులు ఎ. రేవంత్ రెడ్డి గారి సమక్షంలో 2021 సెప్టెంబర్ 30న కాంగ్రెస్ పార్టీలో చేరి, నియోజకవర్గ స్థాయిలో పార్టీ శ్రేణులను బలోపేతం చేశారు.',
      citation: 'ది న్యూ ఇండియన్ ఎక్స్‌ప్రెస్ / ది హన్స్ ఇండియా'
    },
    {
      yearOrPeriod: '2023',
      role: 'ఎమ్మెల్యేగా ఎన్నిక',
      title: 'డిసెంబర్ 3, 2023: 52,699 ఓట్ల మెజారిటీతో చారిత్రాత్మక విజయం',
      description: 'తెలంగాణ శాసనసభ ఎన్నికల్లో భూపాలపల్లి నియోజకవర్గం (108) నుండి 1,23,116 ఓట్లతో (54.55% ఓట్ల శాతం) మరియు 52,699 ఓట్ల అఖండ మెజారిటీతో విజయం సాధించి 3వ శాసనసభ్యునిగా బాధ్యతలు స్వీకరించారు.',
      citation: 'భారత ఎన్నికల సంఘం / పిఆర్ఎస్ లెజిస్లేటివ్ రీసెర్చ్'
    }
  ];

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
      description: 'Contested the Bhupalpalle Assembly constituency in 2014 and in 2018 under All India Forward Bloc (securing 53,982 votes), consolidating deep rural support across all major mandals.',
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
      title: 'Dec 3, 2023: Decisive Victory in 3rd Telangana Assembly',
      description: 'Elected to the Telangana Legislative Assembly representing Bhupalpalle constituency (108) with 123,116 votes (54.55% of the total poll), recording a winning margin of 52,699 votes. Currently serving 2023–2028 legislative term.',
      citation: 'Election Commission of India / PRS Legislative Research',
      accentColor: '#86EFAC',
      isCurrentIncumbent: true
    }
  ];

  const rawItems = timeline && timeline.length ? timeline : defaultTimeline;

  return (
    <section id="journey" className="journey-section">
      <div className="container">
        <div className="journey-header">
          <div className="tag-label dark">
            <span className="live-pulse-dot" aria-hidden="true"></span>
            {isTelugu ? 'మైలురాళ్ళు & ప్రస్థానం' : 'Documented Timeline'}
          </div>
          <h2 className="section-title">
            {isTelugu ? 'ప్రజాసేవా జీవన ప్రస్థానం' : 'The Public Journey'}
          </h2>
          <p className="journey-header-desc">
            {isTelugu
              ? 'నాలుగు దశాబ్దాల పాటు జయశంకర్ భూపాలపల్లి ప్రాంత ప్రజలతో మమేకమైన ప్రజా ప్రాతినిధ్య రికార్డు.'
              : 'A four-decade record of electoral representation, grassroots mobilization, and public service across Jayashankar Bhupalpally.'}
          </p>
        </div>

        {/* Connected Chronological Journey Track */}
        <div className="editorial-timeline">
          <div className="journey-track-rail" aria-hidden="true"></div>

          {rawItems.map((item, index) => {
            const isLatest = index === rawItems.length - 1;
            const te = teluguMilestoneOverrides[index] || {};

            const title = isTelugu
              ? (item.translations?.te?.title || te.title || item.title)
              : item.title;

            const desc = isTelugu
              ? (item.translations?.te?.description || te.description || item.description)
              : item.description;

            const role = isTelugu
              ? (item.translations?.te?.role || te.role || item.role)
              : item.role;

            const yearOrPeriod = isTelugu
              ? (item.translations?.te?.yearOrPeriod || te.yearOrPeriod || (item.yearOrPeriod === 'EARLY' ? 'ఆరంభం' : item.yearOrPeriod))
              : item.yearOrPeriod;

            const citation = isTelugu
              ? (item.translations?.te?.citation || te.citation || item.citation)
              : item.citation;

            const stepNum = String(index + 1).padStart(2, '0');

            return (
              <div
                key={index}
                className={`editorial-timeline-row ${isLatest ? 'is-incumbent-row' : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Year, Step Number, and Role Column */}
                <div className="timeline-year-col">
                  <div className="timeline-step-indicator">
                    <span className="timeline-step-num">{stepNum}</span>
                    <span className="timeline-node-dot" aria-hidden="true"></span>
                  </div>

                  <span className={`editorial-year-huge ${isLatest ? 'green-accent' : ''}`}>
                    {yearOrPeriod}
                  </span>

                  <span
                    className="timeline-role-pill"
                    style={isLatest ? { color: '#86EFAC', borderColor: 'rgba(134, 239, 172, 0.3)' } : {}}
                  >
                    {role}
                  </span>

                  {isLatest && (
                    <span className="timeline-incumbent-badge">
                      {isTelugu ? 'ప్రస్తుత శాసనసభ్యులు (2023–28)' : 'Current MLA (2023–28)'}
                    </span>
                  )}
                </div>

                {/* Milestone Detail Column */}
                <div className="timeline-desc-col">
                  <h3
                    className="timeline-heading-editorial"
                    style={isLatest ? { color: '#FFFFFF' } : {}}
                  >
                    {title}
                  </h3>
                  <p
                    className="timeline-paragraph"
                    style={isLatest ? { color: '#F1F5F9' } : {}}
                  >
                    {desc}
                  </p>
                  {citation && (
                    <span
                      className="timeline-citation"
                      style={isLatest ? { color: '#86EFAC' } : {}}
                    >
                      <strong>{isTelugu ? 'ఆధార మూలం:' : 'Source:'}</strong> {citation}
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
