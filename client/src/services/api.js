// Deployed backend endpoint on Render
const getApiBase = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && envUrl.trim()) {
    const clean = envUrl.trim().replace(/\/+$/, '');
    return clean.endsWith('/api/v1') ? clean : `${clean}/api/v1`;
  }
  return 'https://gandra-satyanarayana-rao.onrender.com/api/v1';
};

const API_BASE = getApiBase();

export function resolveMediaUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/uploads')) {
    const raw = (import.meta.env.VITE_API_URL || 'https://gandra-satyanarayana-rao.onrender.com').replace(/\/+$/, '');
    const origin = raw.replace(/\/api\/v1\/?$/, '');
    return `${origin}${url}`;
  }
  return url;
}

export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = { ...options.headers };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  // Retrieve stored token if available
  const token = localStorage.getItem('sathenna_admin_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include' // Sends HttpOnly cookie
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.message || `Request failed with status ${response.status}`;
    const err = new Error(errorMsg);
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
}

export const api = {
  // Public
  getSettings: () => apiRequest('/site-settings'),
  getProfile: () => apiRequest('/profile'),
  getProjects: (params = '') => apiRequest(`/projects${params ? '?' + params : ''}`),
  getProjectBySlug: (slug) => apiRequest(`/projects/${slug}`),
  getActivities: (params = '') => apiRequest(`/activities${params ? '?' + params : ''}`),
  getGallery: (params = '') => apiRequest(`/gallery${params ? '?' + params : ''}`),
  getConstituency: () => apiRequest('/constituency'),
  submitRepresentation: (payload) =>
    apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  // Auth
  login: (credentials) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),
  logout: () =>
    apiRequest('/auth/logout', {
      method: 'POST'
    }),
  getMe: () => apiRequest('/auth/me'),

  // Admin CMS
  getDashboardStats: () => apiRequest('/admin/dashboard'),
  updateSettings: (payload) =>
    apiRequest('/site-settings', {
      method: 'PUT',
      body: JSON.stringify(payload)
    }),
  updateProfile: (payload) =>
    apiRequest('/profile', {
      method: 'PUT',
      body: JSON.stringify(payload)
    }),

  // Admin Projects
  adminGetProjects: (params = '') => apiRequest(`/projects/admin/all${params ? '?' + params : ''}`),
  adminCreateProject: (payload) =>
    apiRequest('/projects/admin', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  adminUpdateProject: (id, payload) =>
    apiRequest(`/projects/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    }),
  adminDeleteProject: (id) =>
    apiRequest(`/projects/admin/${id}`, {
      method: 'DELETE'
    }),

  // Admin Activities
  adminGetActivities: (params = '') => apiRequest(`/activities/admin/all${params ? '?' + params : ''}`),
  adminCreateActivity: (payload) =>
    apiRequest('/activities/admin', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  adminUpdateActivity: (id, payload) =>
    apiRequest(`/activities/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    }),
  adminDeleteActivity: (id) =>
    apiRequest(`/activities/admin/${id}`, {
      method: 'DELETE'
    }),

  // Admin Gallery
  adminGetGallery: (params = '') => apiRequest(`/gallery/admin/all${params ? '?' + params : ''}`),
  adminUploadMedia: (formData) =>
    apiRequest('/gallery/admin/upload', {
      method: 'POST',
      body: formData
    }),
  adminUpdateMedia: (id, payload) =>
    apiRequest(`/gallery/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    }),
  adminDeleteMedia: (id) =>
    apiRequest(`/gallery/admin/${id}`, {
      method: 'DELETE'
    }),

  // Admin Constituency
  updateConstituency: (payload) =>
    apiRequest('/constituency', {
      method: 'PUT',
      body: JSON.stringify(payload)
    }),

  // Admin Submissions
  adminGetSubmissions: (params = '') => apiRequest(`/contact/admin/all${params ? '?' + params : ''}`),
  adminUpdateSubmission: (id, payload) =>
    apiRequest(`/contact/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    }),
  adminDeleteSubmission: (id) =>
    apiRequest(`/contact/admin/${id}`, {
      method: 'DELETE'
    })
};
