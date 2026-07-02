import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import { portfolioApi } from './services/api.js';
import { fallbackProfile, fallbackProjects, fallbackExperience } from './data/fallback.js';

export default function App() {
  // Render with static data immediately so the page is never blank.
  const [profile, setProfile] = useState(fallbackProfile);
  const [projects, setProjects] = useState(fallbackProjects);
  const [experience, setExperience] = useState(fallbackExperience);
  const [apiStatus, setApiStatus] = useState('loading'); // 'loading' | 'live' | 'fallback'

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [p, pr, ex] = await Promise.allSettled([
          portfolioApi.getProfile(),
          portfolioApi.getProjects(),
          portfolioApi.getExperience(),
        ]);
        if (cancelled) return;
        const anySuccess = [p, pr, ex].some((r) => r.status === 'fulfilled' && r.value);
        if (p.status === 'fulfilled' && p.value) setProfile((cur) => ({ ...cur, ...p.value }));
        if (pr.status === 'fulfilled' && Array.isArray(pr.value) && pr.value.length) setProjects(pr.value);
        if (ex.status === 'fulfilled' && Array.isArray(ex.value) && ex.value.length) setExperience(ex.value);
        setApiStatus(anySuccess ? 'live' : 'fallback');
      } catch {
        setApiStatus('fallback');
      }
    }

    // Hard cap: never let the API block the UI for more than 5s.
    const timeout = setTimeout(() => {
      if (!cancelled) setApiStatus('fallback');
    }, 5000);

    load();
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navbar />
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills profile={profile} />
      <Projects projects={projects} />
      <Experience experience={experience} />
      <Contact profile={profile} />
      <Footer profile={profile} />

      {apiStatus === 'loading' && (
        <Box
          aria-hidden
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1,
            borderRadius: 999,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'text.secondary',
            fontSize: 13,
          }}
        >
          <CircularProgress size={14} color="primary" />
          <Typography variant="caption" color="text.secondary">
            Refreshing data…
          </Typography>
        </Box>
      )}
    </Box>
  );
}
