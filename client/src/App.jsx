import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './i18n/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import WorkPage from './pages/public/WorkPage';
import GalleryPage from './pages/public/GalleryPage';
import ContactPage from './pages/public/ContactPage';
import ConstituencyPage from './pages/public/ConstituencyPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminSectionsPage from './pages/admin/AdminSectionsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminProfilePage from './pages/admin/AdminProfilePage';
import AdminProjectsPage from './pages/admin/AdminProjectsPage';
import AdminActivitiesPage from './pages/admin/AdminActivitiesPage';
import AdminGalleryPage from './pages/admin/AdminGalleryPage';
import AdminConstituencyPage from './pages/admin/AdminConstituencyPage';
import AdminSubmissionsPage from './pages/admin/AdminSubmissionsPage';

import SmoothScrollProvider from './components/common/SmoothScrollProvider';

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ToastProvider>
          <AuthProvider>
            <SmoothScrollProvider>
              <BrowserRouter>
                <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/work" element={<WorkPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/constituency" element={<ConstituencyPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Admin Authentication */}
                <Route path="/admin/login" element={<AdminLoginPage />} />

                {/* Protected Admin CMS Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="sections" element={<AdminSectionsPage />} />
                  <Route path="settings" element={<AdminSettingsPage />} />
                  <Route path="profile" element={<AdminProfilePage />} />
                  <Route path="projects" element={<AdminProjectsPage />} />
                  <Route path="activities" element={<AdminActivitiesPage />} />
                  <Route path="gallery" element={<AdminGalleryPage />} />
                  <Route path="constituency" element={<AdminConstituencyPage />} />
                  <Route path="submissions" element={<AdminSubmissionsPage />} />
                </Route>

                {/* 404 Fallback */}
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </SmoothScrollProvider>
        </AuthProvider>
        </ToastProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
