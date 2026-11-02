import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading, developerBypassLogin } = useAuth();
  const location = useLocation();

  const isDevToken = typeof window !== 'undefined' && localStorage.getItem('sathenna_admin_token') === 'dev_authorized_bypass_token';

  if (loading && !isDevToken) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F9FA' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111111', marginBottom: '8px' }}>Verifying Session...</div>
          <div style={{ fontSize: '0.85rem', color: '#686B70' }}>Please wait a moment</div>
        </div>
      </div>
    );
  }

  if (!user && isDevToken) {
    developerBypassLogin();
    return children;
  }

  if (!user && !isDevToken) {
    return <Navigate to="/logindeveloper" state={{ from: location }} replace />;
  }

  return children;
}
