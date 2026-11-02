import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function DeveloperLoginPage() {
  const { developerBypassLogin } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Authorizing Developer Access...');

  useEffect(() => {
    // Auto unlock developer session
    developerBypassLogin();
    setStatus('Developer Authorization Verified. Redirecting to Admin Dashboard...');
    const timer = setTimeout(() => {
      navigate('/admin');
    }, 700);
    return () => clearTimeout(timer);
  }, [developerBypassLogin, navigate]);

  const handleManualEnter = () => {
    developerBypassLogin();
    navigate('/admin');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '480px', width: '100%', background: '#1E293B', borderRadius: '16px', padding: '2.5rem', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#FFFFFF', textAlign: 'center', boxShadow: '0 20px 48px rgba(0, 0, 0, 0.5)' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(243, 107, 33, 0.15)', border: '1px solid rgba(243, 107, 33, 0.4)', color: '#F36B21', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem' }}>
          ⚡
        </div>

        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: '#FFFFFF' }}>
          Developer CMS Gateway
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '1.75rem', lineHeight: 1.5 }}>
          Engineering Portal for <strong>VenkatAsrith Konam</strong> & <strong>Pendela Sunny</strong>. Direct administrative bypass enabled.
        </p>

        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#38BDF8' }}>
          {status}
        </div>

        <button
          type="button"
          onClick={handleManualEnter}
          className="btn-pill btn-theatre-archive"
          style={{ width: '100%', padding: '14px', fontSize: '0.95rem' }}
        >
          <span>Open Admin Dashboard Now →</span>
        </button>

        <div style={{ marginTop: '1.5rem' }}>
          <Link to="/developers" style={{ color: '#94A3B8', fontSize: '0.82rem', textDecoration: 'underline' }}>
            View Developers Profile Page
          </Link>
        </div>
      </div>
    </div>
  );
}
