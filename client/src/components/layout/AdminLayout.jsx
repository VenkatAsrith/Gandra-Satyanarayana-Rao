import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/admin.css';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navLinks = [
    { label: 'Overview Dashboard', path: '/admin' },
    { label: 'Site & Brand Settings', path: '/admin/settings' },
    { label: 'Biography & Journey', path: '/admin/profile' },
    { label: 'Public Works & Projects', path: '/admin/projects' },
    { label: 'Public Activities & Speeches', path: '/admin/activities' },
    { label: 'Media & Gallery Archive', path: '/admin/gallery' },
    { label: 'Constituency & Mandals', path: '/admin/constituency' },
    { label: 'Citizen Submissions', path: '/admin/submissions' }
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-logo-badge">
            <img src="/images/party-symbol.png" alt="Emblem" />
          </div>
          <div>
            <div className="admin-brand-title">Sathenna CMS</div>
            <div className="admin-brand-sub">MLA Office Bhupalpalle</div>
          </div>
        </div>

        <nav className="admin-nav">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-pill">
            <div className="admin-user-avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="admin-user-info">
              <span className="admin-user-name">{user?.name || 'Administrator'}</span>
              <span className="admin-user-email">{user?.email || 'admin@sathenna.in'}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Link
              to="/"
              target="_blank"
              className="admin-logout-btn"
              style={{ flex: 1, textDecoration: 'none' }}
            >
              Public Site ↗
            </Link>
            <button
              onClick={handleLogout}
              className="admin-logout-btn"
              style={{ flex: 1 }}
            >
              Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        <header className="admin-topbar">
          <h1 className="admin-topbar-title">Content Management Administration</h1>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>
            Session Active · Secure TLS
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
