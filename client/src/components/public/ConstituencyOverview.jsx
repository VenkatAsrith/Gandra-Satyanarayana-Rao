import React from 'react';

export default function ConstituencyOverview({ constituency }) {
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
    overviewText: 'Jayashankar Bhupalpally district is characterized by agricultural agrarian landscapes, Singareni Collieries coal deposits, and thermal power generation. Encompassing key mandals including Bhupalpalle, Ghanpur (Mulug), Regonda, Shayampet, Chityal, and Mogullapalle, the area demands sustained policy focus on canal water tail-end delivery, rural road connectivity, tribal hamlets welfare, and mining worker safety.'
  };

  return (
    <section className="section">
      <div className="container">
        <div className="constituency-editorial-grid">
          <div className="constituency-visual-frame">
            <img
              src="/images/work/landscape.jpg"
              alt="Jayashankar Bhupalpally rural topography and agricultural fields"
              loading="lazy"
            />
            <div className="constituency-floating-stats">
              <div>
                <span className="constituency-stat-label">District Area</span>
                <div className="constituency-stat-value">{data.totalAreaSqKm.toLocaleString()} sq km</div>
              </div>
              <div>
                <span className="constituency-stat-label">Rural Population</span>
                <div className="constituency-stat-value">{data.ruralPercentage}%</div>
              </div>
              <div>
                <span className="constituency-stat-label">Literacy Rate</span>
                <div className="constituency-stat-value">{data.literacyRatePercentage}%</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="tag-label green">The Constituency</div>
            <h2 className="section-title">
              {data.constituencyName} Assembly Constituency ({data.assemblyNo})
            </h2>
            <p className="section-subtitle">
              {data.overviewText}
            </p>

            <div>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gray)' }}>
                Administrative Mandals
              </span>
              <div className="mandals-grid">
                {data.mandals?.map((mandal, i) => (
                  <span key={i} className="mandal-badge">
                    {mandal.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="demo-facts-row">
              <div className="demo-fact-item">
                <span className="demo-fact-num">{data.totalPopulation2011 ? data.totalPopulation2011.toLocaleString() : '416,763'}</span>
                <span className="demo-fact-label">District Population (2011)</span>
              </div>
              <div className="demo-fact-item">
                <span className="demo-fact-num">{data.revenueVillagesText || '200+'}</span>
                <span className="demo-fact-label">Revenue Villages</span>
              </div>
              <div className="demo-fact-item">
                <span className="demo-fact-num">No. {data.assemblyNo || 108}</span>
                <span className="demo-fact-label">Assembly Seat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
