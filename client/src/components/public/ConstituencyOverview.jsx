import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { resolveMediaUrl } from '../../services/api';

export default function ConstituencyOverview({ constituency }) {
  const { isTelugu, t } = useLanguage();

  const data = constituency || {
    assemblyNo: 108,
    constituencyName: 'Bhupalpalle',
    districtName: 'Jayashankar Bhupalpally',
    totalAreaSqKm: 2293,
    ruralPercentage: 92.2,
    literacyRatePercentage: 60.32,
    totalPopulation2011: 416763,
    revenueVillagesText: '200+',
    mandals: [
      { name: 'Bhupalpalle' },
      { name: 'Ghanpur (Mulug)' },
      { name: 'Regonda' },
      { name: 'Shayampet' },
      { name: 'Chityal' },
      { name: 'Mogullapalle' }
    ],
    overviewText:
      'Jayashankar Bhupalpally district is characterized by agricultural agrarian landscapes, Singareni Collieries coal deposits, and thermal power generation. Encompassing key mandals including Bhupalpalle, Ghanpur (Mulug), Regonda, Shayampet, Chityal, and Mogullapalle, the area demands sustained policy focus on canal water tail-end delivery, rural road connectivity, tribal hamlets welfare, and mining worker safety.'
  };

  const title = isTelugu
    ? `భూపాలపల్లి శాసనసభ నియోజకవర్గం (నెం. ${data.assemblyNo})`
    : `${data.constituencyName} Assembly Constituency (${data.assemblyNo})`;

  const overview = isTelugu
    ? 'జయశంకర్ భూపాలపల్లి జిల్లా వ్యవసాయ భూములు, సింగరేణి బొగ్గు నిల్వలు మరియు కేటీపీఎస్ థర్మల్ విద్యుత్ కేంద్రంతో ప్రత్యేకతను సంతరించుకుంది. భూపాలపల్లి, ఘనపూర్, రేగొండ, శాయంపేట, చిట్యాల మరియు మొగుళ్లపల్లి మండలాల ప్రజల సంక్షేమం, సాగునీటి సరఫరా మరియు గ్రామీణ రహదారుల అనుసంధానమే ప్రధాన లక్ష్యం.'
    : data.overviewText;

  return (
    <section className="section">
      <div className="container">
        <div className="constituency-editorial-grid">
          <div className="constituency-visual-frame">
            <img
              src={resolveMediaUrl(data.landscapeImageUrl || '/images/work/landscape.jpg')}
              alt="Jayashankar Bhupalpally rural topography"
              loading="lazy"
              onError={(e) => {
                e.target.src = '/images/work/landscape.jpg';
              }}
            />
            <div className="constituency-floating-stats">
              <div>
                <span className="constituency-stat-label">
                  {isTelugu ? 'విస్తీర్ణం' : 'District Area'}
                </span>
                <div className="constituency-stat-value">
                  {data.totalAreaSqKm ? data.totalAreaSqKm.toLocaleString() : '2,293'} sq km
                </div>
              </div>
              <div>
                <span className="constituency-stat-label">
                  {isTelugu ? 'గ్రామీణ జనాభా' : 'Rural Ratio'}
                </span>
                <div className="constituency-stat-value">{data.ruralPercentage}%</div>
              </div>
              <div>
                <span className="constituency-stat-label">
                  {isTelugu ? 'అక్షరాస్యత' : 'Literacy Rate'}
                </span>
                <div className="constituency-stat-value">{data.literacyRatePercentage}%</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="tag-label green">
              {isTelugu ? 'నియోజకవర్గం సమగ్ర సమాచారం' : 'The Constituency'}
            </div>
            <h2 className="section-title">{title}</h2>
            <p className="section-subtitle">{overview}</p>

            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gray)' }}>
                {t('constituency.mandalsTitle')}
              </span>
              <div className="mandals-grid" style={{ marginTop: '0.5rem' }}>
                {data.mandals?.map((mandal, i) => (
                  <span key={i} className="mandal-badge">
                    {mandal.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="demo-facts-row">
              <div className="demo-fact-item">
                <span className="demo-fact-num">
                  {data.totalPopulation2011 ? data.totalPopulation2011.toLocaleString('en-IN') : '4,16,763'}
                </span>
                <span className="demo-fact-label">{isTelugu ? 'జనాభా (2011)' : 'Census Population (2011)'}</span>
              </div>
              <div className="demo-fact-item">
                <span className="demo-fact-num">{data.revenueVillagesText || '200+'}</span>
                <span className="demo-fact-label">{isTelugu ? 'రెవెన్యూ గ్రామాలు' : 'Revenue Villages'}</span>
              </div>
              <div className="demo-fact-item">
                <span className="demo-fact-num">No. {data.assemblyNo || 108}</span>
                <span className="demo-fact-label">{isTelugu ? 'శాసనసభ స్థానం' : 'Assembly Seat'}</span>
              </div>
            </div>

            <div>
              <Link to="/constituency" className="btn-pill btn-secondary">
                {isTelugu ? 'నియోజకవర్గ పూర్తి వివరాలు' : 'Explore Detailed Constituency Profile'} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
