import axios from 'axios';

// Production: VITE_API_BASE must be set in Vercel env to your Render URL
// (e.g. https://safin-portfolio-api.onrender.com). Without it, requests hit
// the Vercel domain itself and 404 — the App gracefully falls back to the
// bundled static data and shows the page anyway.
//
// Local dev: leave VITE_API_BASE empty. vite.config.js proxies /api/* → :5000.
const baseURL = import.meta.env.VITE_API_BASE || '';

export const api = axios.create({
  baseURL,
  timeout: 10000,
});

export const portfolioApi = {
  getProfile: () => api.get('/api/profile').then((r) => r.data),
  getProjects: () => api.get('/api/projects').then((r) => r.data),
  getExperience: () => api.get('/api/experience').then((r) => r.data),
  sendMessage: (payload) => api.post('/api/messages', payload).then((r) => r.data),
};
