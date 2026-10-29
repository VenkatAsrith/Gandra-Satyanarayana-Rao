import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

export default function JourneyTimeline({ timeline }) {
  const { isTelugu } = useLanguage();

  const teluguMilestoneOverrides = [
    {
      yearOrPeriod: 'ఆరంభం',
      role: 'గ్రామ సర్పంచ్',
      chapterNum: '01',
      title: 'బుద్ధారం గ్రామ సర్పంచ్‌గా ప్రజా ప్రస్థానం',
      description: 'స్వగ్రామమైన బుద్ధారంలో గ్రామ సర్పంచ్‌గా ప్రజాసేవ ప్రారంభించి, గ్రామ పరిపాలన, స్థానిక సాగునీటి చెరువులు, రైతు సమస్యల పరిష్కారంలో కీలక పాత్ర పోషించారు.',
      citation: 'స్థానిక ఎన్నికల రికార్డులు & రాజకీయ ప్రస్థానం',
      accent: 'green'
    },
    {
      yearOrPeriod: '1996',
      role: 'జెడ్పీటీసీ సభ్యులు',
      chapterNum: '02',
      title: 'ఘనపురం మండల జెడ్పీటీసీగా ఎన్నిక',
      description: 'ఘనపురం మండలం జెడ్పీటీసీ సభ్యునిగా ఎన్నికై, మండల వ్యాప్తంగా విద్యా సంస్థలు, ఆస్పత్రులు మరియు గ్రామీణ మౌలిక వసతుల కల్పనలో విశేష కృషి చేశారు.',
      citation: 'టీవీ9 తెలుగు పొలిటికల్ ఫీచర్',
      accent: 'saffron'
    },
    {
      yearOrPeriod: '2014 & 2018',
      role: 'అసెంబ్లీ అభ్యర్థి',
      chapterNum: '03',
      title: 'భూపాలపల్లి అసెంబ్లీ నియోజకవర్గ పోటీ',
      description: 'భూపాలపల్లి నియోజకవర్గం నుండి 2014 మరియు 2018 శాసనసభ ఎన్నికల్లో పోటీ చేసి (2018లో 53,982 ఓట్లు సాధించి), అన్ని మండలాల ప్రజలతో బలమైన ప్రజా సంబంధాలు ఏర్పరచుకున్నారు.',
      citation: 'భారత ఎన్నికల సంఘం / మైనేత',
      accent: 'saffron'
    },
    {
      yearOrPeriod: '2021',
      role: 'సెప్టెంబర్ 30 · కాంగ్రెస్',
      chapterNum: '04',
      title: 'భారత జాతీయ కాంగ్రెస్ పార్టీలో చేరిక',
      description: 'టీపీసీసీ అధ్యక్షులు ఎ. రేవంత్ రెడ్డి గారి సమక్షంలో 2021 సెప్టెంబర్ 30న కాంగ్రెస్ పార్టీలో చేరి, నియోజకవర్గ స్థాయిలో పార్టీ శ్రేణులను బలోపేతం చేసి ప్రజా ఉద్యమాలకు నాయకత్వం వహించారు.',
      citation: 'ది న్యూ ఇండియన్ ఎక్స్‌ప్రెస్ / ది హన్స్ ఇండియా',
      accent: 'green'
    },
    {
      yearOrPeriod: '2023',
      role: 'ఎమ్మెల్యేగా ఎన్నిక (2023–2028)',
      chapterNum: '05',
      title: 'డిసెంబర్ 3, 2023: 52,699 ఓట్ల మెజారిటీతో చారిత్రాత్మక విజయం',
      description: 'తెలంగాణ శాసనసభ ఎన్నికల్లో భూపాలపల్లి నియోజకవర్గం (108) నుండి 1,23,116 ఓట్లతో (54.55% ఓట్ల శాతం) మరియు 52,699 ఓట్ల అఖండ మెజారిటీతో విజయం సాధించి శాసనసభ్యునిగా బాధ్యతలు స్వీకరించారు.',
      citation: 'భారత ఎన్నికల సంఘం / పిఆర్ఎస్ లెజిస్లేటివ్ రీసెర్చ్',
      accent: 'saffron',
      isLatest: true
    }
  ];

  const defaultTimeline = [
    {
      yearOrPeriod: 'EARLY',
      role: 'Village Sarpanch',
      chapterNum: '01',
      title: 'Grassroots Foundations: Sarpanch of Buddharam Village',
      description: 'Commenced public representation in native Buddharam village, Ghanapuram mandal, overseeing village civic administration, irrigation tank conservation, and agrarian grievance resolution.',
      citation: 'Regional Electoral Records & Political Biographies',
      accent: 'green'
    },
    {
      yearOrPeriod: '1996',
      role: 'ZPTC Member',
      chapterNum: '02',
      title: 'Decentralized Leadership: Elected ZPTC Member, Ghanapuram',
      description: 'Elected to the Zilla Parishad Territorial Constituency (ZPTC) representing Ghanapuram mandal, directing public works, school infrastructure, and community health centers.',
      citation: 'TV9 Telugu Political Feature',
      accent: 'saffron'
    },
    {
      yearOrPeriod: '2014 & 2018',
      role: 'Assembly Candidate',
      chapterNum: '03',
      title: 'Constituency Mobilization: Bhupalpalle Assembly Contests',
      description: 'Contested the Bhupalpalle Assembly constituency in 2014 and 2018 (polling 53,982 votes in 2018), building deep grassroots connection across the rural and mining communities.',
      citation: 'Election Commission of India / MyNeta',
      accent: 'saffron'
    },
    {
      yearOrPeriod: '2021',
      role: 'Sep 30 · Congress',
      chapterNum: '04',
      title: 'Congress Alignment: Formal Induction Under A. Revanth Reddy',
      description: 'Formally joined the Indian National Congress on September 30, 2021, under the leadership of TPCC President A. Revanth Reddy, galvanizing cadre across all 6 mandals for people-first governance.',
      citation: 'The New Indian Express / The Hans India',
      accent: 'green'
    },
    {
      yearOrPeriod: '2023',
      role: 'Elected MLA (2023–2028)',
      chapterNum: '05',
      title: 'Decisive Mandate: Historic 52,699-Vote Legislative Assembly Victory',
      description: 'Elected to the 3rd Telangana Legislative Assembly representing Bhupalpalle (No. 108) with 123,116 votes (54.55% total vote share) and an emphatic 52,699-vote margin. Actively delivering on irrigation, welfare, and mining reforms.',
      citation: 'Election Commission of India / PRS Legislative Research',
      accent: 'saffron',
      isLatest: true
    }
  ];

  const rawItems = timeline && timeline.length ? timeline : defaultTimeline;

  return (
    <section id="journey" className="journey-section">
      <div className="container">
        {/* Section Header */}
        <div className="journey-header">
          <div className="tag-label dark">
            <span className="live-pulse-dot" aria-hidden="true"></span>
            {isTelugu ? 'మైలురాళ్ళు & ప్రస్థానం' : 'Documented Political Record'}
          </div>
          <h2 className="section-title text-white journey-title" style={{ color: '#FFFFFF' }}>
            {isTelugu ? 'ప్రజాసేవా జీవన ప్రస్థానం' : 'The Political Journey & Legislative Record'}
          </h2>
          <p className="journey-header-desc" style={{ color: '#E2E8F0' }}>
            {isTelugu
              ? 'నాలుగు దశాబ్దాల పాటు జయశంకర్ భూపాలపల్లి ప్రాంత ప్రజలతో మమేకమైన ప్రజా ప్రాతినిధ్య రికార్డు.'
              : 'A four-decade verified record of grassroots democracy, agricultural advocacy, and electoral representation across Jayashankar Bhupalpally.'}
          </p>
        </div>

        {/* ScrollStack Interactive Journey Timeline */}
        <div className="political-timeline">
          <ScrollStack stackOffset={32}>
            {rawItems.map((item, index) => {
              const te = teluguMilestoneOverrides[index] || {};
              const title = isTelugu
                ? (item.translations?.te?.title || te.title || item.title)
                : (item.title || te.title);
              const desc = isTelugu
                ? (item.translations?.te?.description || te.description || item.description)
                : (item.description || te.description);
              const role = isTelugu
                ? (item.translations?.te?.role || te.role || item.role)
                : (item.role || te.role);
              const yearOrPeriod = isTelugu
                ? (item.translations?.te?.yearOrPeriod || te.yearOrPeriod || item.yearOrPeriod)
                : (item.yearOrPeriod || te.yearOrPeriod);
              const citation = isTelugu
                ? (item.translations?.te?.citation || te.citation || item.citation)
                : (item.citation || te.citation);
              const chapterNum = te.chapterNum || String(index + 1).padStart(2, '0');
              const accent = te.accent || (index % 2 === 0 ? 'saffron' : 'green');
              const isLatest = te.isLatest || index === rawItems.length - 1;

              return (
                <ScrollStackItem
                  key={index}
                  accent={accent}
                  className={isLatest ? 'is-incumbent-card' : ''}
                >
                  <div className="timeline-card-header">
                    <div className="timeline-chapter-badge">
                      <span className="chapter-num">{chapterNum}</span>
                      <span className="chapter-sep">/</span>
                      <span className="chapter-total">05</span>
                    </div>

                    <div className="timeline-year-pill">
                      <span className="year-text">{yearOrPeriod}</span>
                    </div>

                    <div className="timeline-role-pill">
                      <span>{role}</span>
                    </div>
                  </div>

                  <div className="timeline-card-body">
                    <h3 className="timeline-card-title">{title}</h3>
                    <p className="timeline-card-desc">{desc}</p>
                  </div>

                  <div className="timeline-card-footer">
                    <div className="timeline-citation">
                      <span className="citation-icon" aria-hidden="true">📜</span>
                      <span className="citation-text">
                        <strong>{isTelugu ? 'ధృవీకరణ ఆధారాలు:' : 'Verified Record:'}</strong> {citation}
                      </span>
                    </div>

                    {isLatest && (
                      <div className="timeline-incumbent-badge">
                        <span className="incumbent-dot"></span>
                        {isTelugu ? 'ప్రస్తుత శాసనసభ్యులు (2023–2028)' : 'Serving MLA (2023–2028)'}
                      </div>
                    )}
                  </div>
                </ScrollStackItem>
              );
            })}
          </ScrollStack>
        </div>
      </div>
    </section>
  );
}
