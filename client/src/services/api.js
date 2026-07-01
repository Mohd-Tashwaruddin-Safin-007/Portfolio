import axios from 'axios';

// In production we rely on the Vercel rewrite (/api/* → serverless function),
// so we use a relative base. In local dev, vite.config proxies /api → :5000.
// VITE_API_BASE can override this when the API lives on a different host.
const baseURL = import.meta.env.VITE_API_BASE || '';

export const api = axios.create({
  baseURL,
  timeout: 12000,
});

export const portfolioApi = {
  getProfile: () => api.get('/api/profile').then((r) => r.data),
  getProjects: () => api.get('/api/projects').then((r) => r.data),
  getExperience: () => api.get('/api/experience').then((r) => r.data),
  sendMessage: (payload) => api.post('/api/messages', payload).then((r) => r.data),
};
