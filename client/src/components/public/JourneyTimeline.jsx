import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

export default function JourneyTimeline({ timeline }) {
  const { isTelugu } = useLanguage();

  const milestoneItems = [
    {
      yearOrPeriod: isTelugu ? 'ప్రారంభం' : 'Early Career',
      role: isTelugu ? 'గ్రామ సర్పంచ్' : 'Village Sarpanch',
      chapterNum: '01',
      titleEn: 'Grassroots Leadership as Buddharam Village Sarpanch',
      titleTe: 'బుద్ధారం గ్రామ సర్పంచ్‌గా ప్రజా ప్రస్థానం',
      descEn:
        'Commenced public life as Village Sarpanch in native Buddharam, leading village governance, community tank restoration, agricultural resolution, and rural public infrastructure.',
      descTe:
        'స్వగ్రామమైన బుద్ధారంలో గ్రామ సర్పంచ్‌గా ప్రజాసేవ ప్రారంభించి, గ్రామ పరిపాలన, స్థానిక సాగునీటి చెరువులు, రైతు సమస్యల పరిష్కారంలో కీలక పాత్ర పోషించారు.',
      citationEn: 'Local Electoral & Village Administration Records',
      citationTe: 'స్థానిక ఎన్నికల రికార్డులు & గ్రామ పంచాయతీ పరిపాలన',
      accent: 'green'
    },
    {
      yearOrPeriod: '1996',
      role: isTelugu ? 'జెడ్పీటీసీ సభ్యులు' : 'ZPTC Member',
      chapterNum: '02',
      titleEn: 'Elected ZPTC Member for Ghanapuram Mandal',
      titleTe: 'ఘనపురం మండల జెడ్పీటీసీగా ఎన్నిక',
      descEn:
        'Elected as Zilla Parishad Territorial Constituency (ZPTC) member for Ghanapuram Mandal, championing rural schools, healthcare centers, and extensive rural road connectivity.',
      descTe:
        'ఘనపురం మండలం జెడ్పీటీసీ సభ్యునిగా ఎన్నికై, మండల వ్యాప్తంగా విద్యా సంస్థలు, ఆస్పత్రులు మరియు గ్రామీణ మౌలిక వసతుల కల్పనలో విశేష కృషి చేశారు.',
      citationEn: 'District Zilla Parishad Gazette & Press Archives',
      citationTe: 'జిల్లా పరిషత్ రికార్డులు & పత్రికా నివేదికలు',
      accent: 'saffron'
    },
    {
      yearOrPeriod: '2014 & 2018',
      role: isTelugu ? 'శాసనసభ అభ్యర్థి' : 'Assembly Candidate',
      chapterNum: '03',
      titleEn: 'Bhupalpalle Assembly Contests & Grassroots Consolidation',
      titleTe: 'భూపాలపల్లి అసెంబ్లీ నియోజకవర్గ పోటీ',
      descEn:
        'Contested the Bhupalpalle Assembly seat in 2014 and 2018 (polling 53,982 votes in 2018), building enduring constituent rapport across all mandals.',
      descTe:
        'భూపాలపల్లి నియోజకవర్గం నుండి 2014 మరియు 2018 శాసనసభ ఎన్నికల్లో పోటీ చేసి (2018లో 53,982 ఓట్లు సాధించి), అన్ని మండలాల ప్రజలతో బలమైన ప్రజా సంబంధాలు ఏర్పరచుకున్నారు.',
      citationEn: 'Election Commission of India (ECI) Official Returns',
      citationTe: 'భారత ఎన్నికల సంఘం (ECI) అధికారిక గణాంకాలు',
      accent: 'saffron'
    },
    {
      yearOrPeriod: '2021',
      role: isTelugu ? 'కాంగ్రెస్ పార్టీ' : 'Indian National Congress',
      chapterNum: '04',
      titleEn: 'Joining the Indian National Congress in September 2021',
      titleTe: 'భారత జాతీయ కాంగ్రెస్ పార్టీలో చేరిక',
      descEn:
        'Joined the Indian National Congress on September 30, 2021, under the leadership of TPCC President Sri A. Revanth Reddy, strengthening grassroots organization.',
      descTe:
        'టీపీసీసీ అధ్యక్షులు ఎ. రేవంత్ రెడ్డి గారి సమక్షంలో 2021 సెప్టెంబర్ 30న కాంగ్రెస్ పార్టీలో చేరి, నియోజకవర్గ స్థాయిలో పార్టీ శ్రేణులను బలోపేతం చేసి ప్రజా సమస్యలపై పోరాడారు.',
      citationEn: 'The New Indian Express / The Hans India Legislative Reporting',
      citationTe: 'ది న్యూ ఇండియన్ ఎక్స్‌ప్రెస్ / ది హన్స్ ఇండియా నివేదికలు',
      accent: 'green'
    },
    {
      yearOrPeriod: '2023',
      role: isTelugu ? 'ఎమ్మెల్యే (2023–2028)' : 'Serving MLA (2023–2028)',
      chapterNum: '05',
      titleEn: 'Historic Victory with 52,699 Vote Margin',
      titleTe: 'డిసెంబర్ 2023: 52,699 ఓట్ల మెజారిటీతో చారిత్రాత్మక విజయం',
      descEn:
        'Decisive victory in the December 2023 Assembly elections from Bhupalpalle (108) with 123,116 votes (54.55% vote share) and an overwhelming 52,699 victory margin.',
      descTe:
        'తెలంగాణ శాసనసభ ఎన్నికల్లో భూపాలపల్లి నియోజకవర్గం (108) నుండి 1,23,116 ఓట్లతో (54.55% ఓట్ల శాతం) మరియు 52,699 ఓట్ల అఖండ మెజారిటీతో విజయం సాధించి శాసనసభ్యునిగా ఎన్నికయ్యారు.',
      citationEn: 'Election Commission of India / Telangana Legislative Assembly Gazette',
      citationTe: 'భారత ఎన్నికల సంఘం / తెలంగాణ శాసనసభ గెజిట్ రికార్డులు',
      accent: 'saffron',
      isLatest: true
    }
  ];

  return (
    <section className="section journey-timeline-section" id="journey" aria-label="Political Journey and Legislative Record">
      <div className="container">
        {/* Editorial Section Header */}
        <div className="timeline-head-block">
          <div className="tag-label">
            {isTelugu ? 'రాజకీయ ప్రస్థానం & ప్రజా రికార్డు' : 'Political Journey & Legislative Record'}
          </div>
          <h2 className="section-title">
            {isTelugu
              ? 'నాలుగు దశాబ్దాల ప్రజాసేవా ప్రస్థానం'
              : 'The Political Journey & Legislative Record'}
          </h2>
          <p className="section-subtitle">
            {isTelugu
              ? 'బుద్ధారం గ్రామ సర్పంచ్ నుండి తెలంగాణ శాసనసభ సభ్యునిగా ఎన్నికయ్యే వరకు క్రమబద్ధమైన ప్రజా పోరాటం మరియు చారిత్రాత్మక ఎన్నికల విజయాలు.'
              : 'Chronological progression of public leadership spanning four decades, starting from grassroots panchayat governance to the historic 2023 Assembly mandate.'}
          </p>
        </div>

        {/* ScrollStack Architecture for Political Journey */}
        <div className="timeline-scrollstack-wrapper">
          <ScrollStack className="timeline-stack">
            {milestoneItems.map((item, index) => {
              const title = isTelugu ? item.titleTe : item.titleEn;
              const desc = isTelugu ? item.descTe : item.descEn;
              const citation = isTelugu ? item.citationTe : item.citationEn;

              return (
                <ScrollStackItem key={index} accent={item.accent}>
                  <div className="timeline-stack-card">
                    <div className="timeline-card-header">
                      <div className="timeline-chapter-badge">
                        <span className="chapter-num">{item.chapterNum}</span>
                        <span className="chapter-sep">/</span>
                        <span className="chapter-total">05</span>
                      </div>

                      <div className="timeline-year-pill">
                        <span className="year-text">{item.yearOrPeriod}</span>
                      </div>

                      <div className="timeline-role-pill">
                        <span>{item.role}</span>
                      </div>
                    </div>

                    <div className="timeline-card-body">
                      <h3 className="timeline-card-title">{title}</h3>
                      <p className="timeline-card-desc">{desc}</p>
                    </div>

                    <div className="timeline-card-footer">
                      <div className="timeline-citation">
                        <span className="citation-text">
                          <strong>{isTelugu ? 'ధృవీకరణ రికార్డు:' : 'Verified Record:'}</strong> {citation}
                        </span>
                      </div>

                      {item.isLatest && (
                        <div className="timeline-incumbent-badge">
                          <span className="incumbent-dot"></span>
                          {isTelugu ? 'ప్రస్తుత శాసనసభ్యులు (2023–2028)' : 'Serving MLA (2023–2028)'}
                        </div>
                      )}
                    </div>
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
