import React from 'react';
import { Link } from 'react-router-dom';

export default function RecentActivities({ activities }) {
  const defaultActivities = [
    {
      formattedDate: 'Sep 21, 2026',
      title: 'Konda Laxman Bapuji Memorial Commemoration',
      location: 'Bhupalpally Urban · Chief Guest & Memorial Address'
    },
    {
      formattedDate: 'Sep 20, 2026',
      title: 'Constituency Educators & Teachers Recognition',
      location: 'Bhupalpally · Addressed role of teachers in civic foundation'
    },
    {
      formattedDate: 'Sep 16, 2026',
      title: 'Legislative Assembly Demand for Agricultural Cold Storage',
      location: 'Telangana Assembly · Raised vegetable crop diversification & sapling issues'
    },
    {
      formattedDate: 'Aug 07, 2026',
      title: 'Chalivagu Project Water Level Inspection & Stand',
      location: 'Chalivagu Project · Opposed unauthorized diversion to protect command ayacut'
    }
  ];

  const items = activities && activities.length ? activities : defaultActivities;

  return (
    <section className="section bg-off-white">
      <div className="container">
        <div>
          <div className="tag-label">Chronology</div>
          <h2 className="section-title">Documented Public Activities</h2>
          <p className="section-subtitle">
            Verified constituent reviews, development inaugurations, and community programs.
          </p>
        </div>

        <div className="activity-list">
          {items.map((act, index) => {
            const dateStr = act.activityDate
              ? new Date(act.activityDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric'
                })
              : act.formattedDate || 'Recent';

            return (
              <div key={act._id || index} className="activity-item">
                <span className="activity-date">{dateStr}</span>
                <div className="activity-info">
                  <h3 className="activity-title">{act.title}</h3>
                  <span className="activity-loc">{act.location}</span>
                </div>
                <Link to="/work" className="activity-btn" aria-label={`View details for ${act.title}`}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
