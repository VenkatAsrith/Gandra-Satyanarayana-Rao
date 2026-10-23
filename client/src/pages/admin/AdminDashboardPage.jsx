import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.getDashboardStats();
        setData(res.data);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading dashboard telemetry...</div>;
  }

  const stats = data?.stats || {};
  const recentSubmissions = data?.recentSubmissions || [];
  const recentProjects = data?.recentProjects || [];

  return (
    <div>
      {error && <div className="admin-alert error">{error}</div>}

      {/* Operational Stats Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <span className="admin-stat-label">Published Projects</span>
          <span className="admin-stat-val" style={{ color: 'var(--green-dark)' }}>
            {stats.publishedProjectsCount ?? 0}
          </span>
          <span className="admin-stat-meta">Active on public site</span>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-label">Draft / Internal Projects</span>
          <span className="admin-stat-val" style={{ color: 'var(--orange-dark)' }}>
            {stats.draftProjectsCount ?? 0}
          </span>
          <span className="admin-stat-meta">Pending publication</span>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-label">Documented Activities</span>
          <span className="admin-stat-val">{stats.publishedActivitiesCount ?? 0}</span>
          <span className="admin-stat-meta">Speeches & inspections</span>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-label">Media Archive</span>
          <span className="admin-stat-val">{stats.totalGalleryMediaCount ?? 0}</span>
          <span className="admin-stat-meta">
            {stats.isCloudinaryConnected ? 'Cloudinary Connected' : 'Local Storage Mode'}
          </span>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-label">Citizen Submissions</span>
          <span className="admin-stat-val" style={{ color: stats.newSubmissionsCount > 0 ? '#1E40AF' : 'inherit' }}>
            {stats.newSubmissionsCount ?? 0}
          </span>
          <span className="admin-stat-meta">Unreviewed / total {stats.totalSubmissionsCount ?? 0}</span>
        </div>
      </div>

      {/* Quick Navigation / Action Bar */}
      <div className="admin-card" style={{ padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Content Management Modules</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--gray)', margin: '2px 0 0' }}>
              Direct access to maintain website sections
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Link to="/admin/sections" className="admin-btn admin-btn-primary admin-btn-sm">
              ⚡ Dynamic Section Builder
            </Link>
            <Link to="/admin/projects" className="admin-btn admin-btn-secondary admin-btn-sm">
              + Manage Projects
            </Link>
            <Link to="/admin/activities" className="admin-btn admin-btn-secondary admin-btn-sm">
              + Manage Activities
            </Link>
            <Link to="/admin/gallery" className="admin-btn admin-btn-secondary admin-btn-sm">
              + Upload Media
            </Link>
            <Link to="/admin/submissions" className="admin-btn admin-btn-secondary admin-btn-sm">
              Review Submissions ({stats.newSubmissionsCount ?? 0})
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Submissions Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h2 className="admin-card-title">Recent Citizen Representations</h2>
            <span style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>
              Latest communications received through the constituent intake portal
            </span>
          </div>
          <Link to="/admin/submissions" className="admin-btn admin-btn-secondary admin-btn-sm">
            View All Submissions →
          </Link>
        </div>

        {recentSubmissions.length > 0 ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Citizen Name</th>
                  <th>Phone</th>
                  <th>Mandal</th>
                  <th>Subject</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentSubmissions.map((sub) => (
                  <tr key={sub._id}>
                    <td>
                      {new Date(sub.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td style={{ fontWeight: 600 }}>{sub.name}</td>
                    <td>{sub.phone}</td>
                    <td>{sub.mandal}</td>
                    <td>{sub.subject}</td>
                    <td>
                      <span className={`admin-badge ${sub.status}`}>
                        {sub.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--gray)', fontSize: '0.9rem' }}>
            No citizen submissions received yet.
          </div>
        )}
      </div>

      {/* Recent Projects Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h2 className="admin-card-title">Development Projects Overview</h2>
            <span style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>
              Recently updated public work records
            </span>
          </div>
          <Link to="/admin/projects" className="admin-btn admin-btn-secondary admin-btn-sm">
            Manage All Projects →
          </Link>
        </div>

        {recentProjects.length > 0 ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Sanction Amount</th>
                  <th>Status</th>
                  <th>Visibility</th>
                </tr>
              </thead>
              <tbody>
                {recentProjects.map((p) => (
                  <tr key={p._id}>
                    <td style={{ fontWeight: 600 }}>{p.title}</td>
                    <td>{p.categoryLabel || p.category}</td>
                    <td>{p.amountFormatted || 'Government Sanction'}</td>
                    <td>{p.status.replace('_', ' ')}</td>
                    <td>
                      <span className={`admin-badge ${p.isPublished ? 'published' : 'draft'}`}>
                        {p.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--gray)' }}>
            No projects found.
          </div>
        )}
      </div>
    </div>
  );
}
