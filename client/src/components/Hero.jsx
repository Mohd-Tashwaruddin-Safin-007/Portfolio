import { Box, Container, Typography, Button, Stack, Avatar, Chip, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { scrollToSection } from '../utils/scroll.js';

export default function Hero({ profile }) {
  const socials = profile?.socials || {};

  return (
    <Box
      id="home"
      className="grid-bg"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        pt: 12,
        '&::before': {
          content: '""',
          position: 'absolute',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(99,102,241,0.35), transparent 70%)',
          top: -200,
          left: -150,
          filter: 'blur(60px)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(6,182,212,0.25), transparent 70%)',
          bottom: -200,
          right: -150,
          filter: 'blur(60px)',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          spacing={{ xs: 6, md: 8 }}
          justifyContent="space-between"
        >
          <Box sx={{ flex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Chip
                label="👋 Available for opportunities"
                sx={{
                  background: 'rgba(99,102,241,0.15)',
                  color: 'primary.main',
                  border: '1px solid rgba(99,102,241,0.3)',
                  mb: 3,
                  fontWeight: 600,
                }}
              />
              <Typography variant="h2" sx={{ fontSize: { xs: 40, md: 64 }, lineHeight: 1.1 }}>
                Hi, I&apos;m <span className="gradient-text">{profile?.name?.split(' ').slice(-1)[0] || 'Safin'}</span>
                <br />
                <span style={{ color: '#94a3b8' }}>a MERN Stack Developer.</span>
              </Typography>
              <Typography variant="body1" sx={{ mt: 3, color: 'text.secondary', maxWidth: 560, fontSize: 18 }}>
                {profile?.tagline ||
                  'Final-year CSE student building polished full-stack experiences with React, Node, and modern AI tooling.'}
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
                <Button
                  onClick={() => scrollToSection('contact')}
                  variant="contained"
                  size="large"
                  startIcon={<EmailIcon />}
                >
                  Get in touch
                </Button>
                <Button
                  component="a"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener"
                  download="Mohd-Tashwaruddin-Safin-CV.pdf"
                  variant="outlined"
                  size="large"
                  color="inherit"
                  sx={{ borderColor: 'rgba(255,255,255,0.15)' }}
                  startIcon={<DownloadIcon />}
                >
                  Download CV
                </Button>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                {socials.github && (
                  <IconButton href={socials.github} target="_blank" rel="noreferrer">
                    <GitHubIcon />
                  </IconButton>
                )}
                {socials.linkedin && (
                  <IconButton href={socials.linkedin} target="_blank" rel="noreferrer">
                    <LinkedInIcon />
                  </IconButton>
                )}
                {profile?.email && (
                  <IconButton href={`mailto:${profile.email}`}>
                    <EmailIcon />
                  </IconButton>
                )}
              </Stack>
            </motion.div>
          </Box>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Box sx={{ position: 'relative' }}>
              <Box
                className="avatar-ring"
                sx={{
                  width: { xs: 220, md: 300 },
                  height: { xs: 220, md: 300 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Avatar
                  src={profile?.photoUrl || '/safin.jpg'}
                  alt={profile?.name || 'Safin'}
                  sx={{
                    width: '100%',
                    height: '100%',
                    bgcolor: '#1e293b',
                    border: '4px solid #0a0f1c',
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -10,
                  right: -10,
                  bgcolor: 'background.paper',
                  px: 2,
                  py: 1,
                  borderRadius: 999,
                  border: '1px solid rgba(99,102,241,0.4)',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                🎓 CGPA 3.91
              </Box>
            </Box>
          </motion.div>
        </Stack>

        <Box
          sx={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0.7,
          }}
        >
          <IconButton
            onClick={() => scrollToSection('about')}
            sx={{
              animation: 'bounce 2s infinite',
              '@keyframes bounce': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(6px)' },
              },
            }}
            aria-label="Scroll down"
          >
            <ArrowDownwardIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
