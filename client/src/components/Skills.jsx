import { Box, Container, Grid, Paper, Stack, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';

const groups = [
  { key: 'languages', title: 'Languages', icon: '💻' },
  { key: 'frameworks', title: 'Frameworks', icon: '⚛️' },
  { key: 'tools', title: 'Developer Tools', icon: '🛠️' },
  { key: 'libraries', title: 'Libraries', icon: '📚' },
];

export default function Skills({ profile }) {
  const skills = profile?.skills || {};
  return (
    <Box id="skills" sx={{ py: { xs: 10, md: 14 }, background: 'rgba(255,255,255,0.015)' }}>
      <Container maxWidth="lg">
        <SectionHeading
          eyebrow="Toolkit"
          title="Technologies I work with"
          subtitle="A pragmatic stack focused on shipping fast, polished experiences end-to-end."
        />
        <Grid container spacing={3}>
          {groups.map((g, i) => (
            <Grid item xs={12} sm={6} md={3} key={g.key}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Paper sx={{ p: 3, height: '100%' }} elevation={0}>
                  <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                    <Typography sx={{ fontSize: 22 }}>{g.icon}</Typography>
                    <Typography variant="h6">{g.title}</Typography>
                  </Stack>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {(skills[g.key] || []).map((s) => (
                      <Chip
                        key={s}
                        label={s}
                        size="small"
                        sx={{
                          background: 'rgba(99,102,241,0.12)',
                          color: 'text.primary',
                          border: '1px solid rgba(99,102,241,0.25)',
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
