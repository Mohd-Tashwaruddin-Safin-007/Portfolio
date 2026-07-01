import { Box, Container, Paper, Stack, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';

export default function Experience({ experience = [] }) {
  return (
    <Box id="experience" sx={{ py: { xs: 10, md: 14 }, background: 'rgba(255,255,255,0.015)' }}>
      <Container maxWidth="lg">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've contributed"
          subtitle="A timeline of teaching, building, and shipping alongside teams."
        />
        <Box sx={{ position: 'relative', pl: { xs: 2, md: 4 }, ml: { xs: 1, md: 2 } }}>
          {/* Vertical line */}
          <Box
            sx={{
              position: 'absolute',
              left: { xs: 0, md: 8 },
              top: 0,
              bottom: 0,
              width: 2,
              background: 'linear-gradient(180deg, rgba(99,102,241,0.5), rgba(6,182,212,0.1))',
            }}
          />
          <Stack spacing={4}>
            {experience.map((e, i) => (
              <motion.div
                key={e._id || i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Box sx={{ position: 'relative' }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      left: { xs: -10, md: -2 },
                      top: 18,
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      background: '#6366f1',
                      boxShadow: '0 0 0 4px rgba(99,102,241,0.2)',
                    }}
                  />
                  <Paper sx={{ p: 3, ml: { xs: 2, md: 3 } }} elevation={0}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="h6">{e.role}</Typography>
                        <Typography color="primary.main" sx={{ fontWeight: 600 }}>
                          {e.organization}
                          {e.location ? ` · ${e.location}` : ''}
                        </Typography>
                      </Box>
                      <Chip
                        label={`${e.startDate}${e.endDate ? ` — ${e.endDate}` : ' — Present'}`}
                        size="small"
                        sx={{ mt: { xs: 1, sm: 0 }, background: 'rgba(99,102,241,0.15)', color: 'primary.main' }}
                      />
                    </Stack>
                    <Box component="ul" sx={{ pl: 2.5, mt: 1.5, color: 'text.secondary' }}>
                      {(e.responsibilities || []).map((r, j) => (
                        <Typography key={j} component="li" variant="body2" sx={{ mb: 0.5 }}>
                          {r}
                        </Typography>
                      ))}
                    </Box>
                  </Paper>
                </Box>
              </motion.div>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
