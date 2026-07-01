import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CodeIcon from '@mui/icons-material/Code';
import GroupsIcon from '@mui/icons-material/Groups';
import SectionHeading from './SectionHeading.jsx';

const highlights = [
  { icon: <SchoolIcon />, label: 'CGPA', value: '3.92 / 4.00' },
  { icon: <CodeIcon />, label: 'Projects shipped', value: '2 flagship builds' },
  { icon: <EmojiEventsIcon />, label: 'Awards', value: 'Dean\'s List & Scholarship' },
  { icon: <GroupsIcon />, label: 'Teaching', value: 'CSE tutor @ BRAC' },
];

export default function About({ profile }) {
  return (
    <Box id="about" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <SectionHeading
          eyebrow="About me"
          title="A developer who cares about the craft."
          subtitle={profile?.bio || 'Final-year CSE student with a love for full-stack systems.'}
        />

        <Grid container spacing={3}>
          {highlights.map((h, i) => (
            <Grid item xs={6} md={3} key={h.label}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Paper sx={{ p: 3, height: '100%' }} elevation={0}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(6,182,212,0.25))',
                        color: 'primary.main',
                      }}
                    >
                      {h.icon}
                    </Box>
                    <Box>
                      <Typography variant="overline" color="text.secondary">
                        {h.label}
                      </Typography>
                      <Typography variant="h6">{h.value}</Typography>
                    </Box>
                  </Stack>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {profile?.education?.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Education
            </Typography>
            <Stack spacing={2}>
              {profile.education.map((ed, i) => (
                <Paper key={i} sx={{ p: 3 }} elevation={0}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
                    <Box>
                      <Typography variant="h6">{ed.institution}</Typography>
                      <Typography color="text.secondary">{ed.degree}</Typography>
                      {ed.details?.length > 0 && (
                        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                          {ed.details.join(' ')}
                        </Typography>
                      )}
                    </Box>
                    <Typography color="primary.main" sx={{ fontWeight: 600 }}>
                      {ed.startDate} {ed.endDate && `— ${ed.endDate}`}
                    </Typography>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
}
