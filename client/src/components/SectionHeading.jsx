import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <Box sx={{ mb: { xs: 5, md: 7 }, textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="overline"
          sx={{ color: 'primary.main', letterSpacing: 4, fontWeight: 700 }}
        >
          {eyebrow}
        </Typography>
        <Typography variant="h3" sx={{ mt: 1, fontSize: { xs: 32, md: 44 } }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary', maxWidth: 640, mx: 'auto' }}>
            {subtitle}
          </Typography>
        )}
      </motion.div>
    </Box>
  );
}
