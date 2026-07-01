import { useEffect, useState } from 'react';
import { Box, Backdrop, CircularProgress, Typography, Stack } from '@mui/material';
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
  const [loading, setLoading] = useState(true);

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
        if (p.status === 'fulfilled' && p.value) setProfile((cur) => ({ ...cur, ...p.value }));
        if (pr.status === 'fulfilled' && Array.isArray(pr.value) && pr.value.length) setProjects(pr.value);
        if (ex.status === 'fulfilled' && Array.isArray(ex.value) && ex.value.length) setExperience(ex.value);
      } catch {
        /* keep fallback data — never block first paint */
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
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

      {loading && (
        <Backdrop
          open
          sx={{
            zIndex: (t) => t.zIndex.drawer + 1,
            background: 'rgba(10, 15, 28, 0.85)',
            backdropFilter: 'blur(6px)',
            flexDirection: 'column',
          }}
        >
          <Stack alignItems="center" spacing={2}>
            <CircularProgress color="primary" />
            <Typography variant="body2" color="text.secondary">
              Loading portfolio…
            </Typography>
          </Stack>
        </Backdrop>
      )}
    </Box>
  );
}
