import { Box, Container, Grid, Paper, Stack, Typography, Chip, Button } from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SectionHeading from './SectionHeading.jsx';

export default function Projects({ projects = [] }) {
  return (
    <Box id="projects" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects I'm proud of"
          subtitle="Production-grade MERN builds with real users, real data, and modern integrations."
        />
        <Grid container spacing={4}>
          {projects.map((p, i) => (
            <Grid item xs={12} md={6} key={p._id || p.name}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ height: '100%' }}
              >
                <Paper sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }} elevation={0}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Typography variant="overline" color="primary.main" sx={{ fontWeight: 700, letterSpacing: 2 }}>
                      0{i + 1}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      {p.liveUrl && (
                        <Button size="small" href={p.liveUrl} target="_blank" startIcon={<OpenInNewIcon />}>
                          Live
                        </Button>
                      )}
                      {p.repoUrl && (
                        <Button size="small" href={p.repoUrl} target="_blank" startIcon={<GitHubIcon />}>
                          Code
                        </Button>
                      )}
                    </Stack>
                  </Stack>
                  <Typography variant="h4" sx={{ mt: 1, mb: 1.5 }}>
                    {p.name}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {p.description}
                  </Typography>
                  <Box component="ul" sx={{ pl: 2.5, m: 0, color: 'text.secondary' }}>
                    {(p.features || []).slice(0, 4).map((f, j) => (
                      <Typography key={j} component="li" variant="body2" sx={{ mb: 0.5 }}>
                        {f}
                      </Typography>
                    ))}
                  </Box>
                  <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 'auto', pt: 3 }}>
                    {(p.techStack || []).map((t) => (
                      <Chip
                        key={t}
                        label={t}
                        size="small"
                        sx={{
                          background: 'rgba(6,182,212,0.12)',
                          color: 'secondary.main',
                          border: '1px solid rgba(6,182,212,0.3)',
                        }}
                      />
                    ))}
                  </Stack>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
