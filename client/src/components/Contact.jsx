import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Button,
  Typography,
  Alert,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import SectionHeading from './SectionHeading.jsx';
import { portfolioApi } from '../services/api.js';

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', body: '' });
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ state: 'idle', message: '' });
    try {
      await portfolioApi.sendMessage(form);
      setStatus({ state: 'success', message: 'Thanks! Your message has been sent.' });
      setForm({ name: '', email: '', subject: '', body: '' });
    } catch (err) {
      const msg =
        err?.response?.data?.errors?.[0]?.msg ||
        err?.response?.data?.message ||
        err.message ||
        'Something went wrong. Please try again or email me directly.';
      setStatus({ state: 'error', message: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box id="contact" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <SectionHeading
          eyebrow="Get in touch"
          title="Let's build something great"
          subtitle="Have an opportunity, a project, or just want to say hi? Drop a message."
        />
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 4, height: '100%' }} elevation={0}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Contact details
              </Typography>
              <Stack spacing={2}>
                {profile?.email && (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <EmailIcon color="primary" />
                    <Typography component="a" href={`mailto:${profile.email}`} sx={{ color: 'text.primary', textDecoration: 'none' }}>
                      {profile.email}
                    </Typography>
                  </Stack>
                )}
                {profile?.phone && (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <PhoneIcon color="primary" />
                    <Typography>{profile.phone}</Typography>
                  </Stack>
                )}
                {profile?.location && (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <LocationOnIcon color="primary" />
                    <Typography>{profile.location}</Typography>
                  </Stack>
                )}
              </Stack>
              <Stack direction="row" spacing={1} sx={{ mt: 4 }}>
                {profile?.socials?.github && (
                  <IconButton href={profile.socials.github} target="_blank" rel="noreferrer">
                    <GitHubIcon />
                  </IconButton>
                )}
                {profile?.socials?.linkedin && (
                  <IconButton href={profile.socials.linkedin} target="_blank" rel="noreferrer">
                    <LinkedInIcon />
                  </IconButton>
                )}
                {profile?.email && (
                  <IconButton href={`mailto:${profile.email}`}>
                    <EmailIcon />
                  </IconButton>
                )}
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 4 }} elevation={0}>
              <motion.form
                onSubmit={onSubmit}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Stack spacing={2}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Your name"
                      required
                      value={form.name}
                      onChange={onChange('name')}
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      required
                      value={form.email}
                      onChange={onChange('email')}
                    />
                  </Stack>
                  <TextField
                    label="Subject"
                    value={form.subject}
                    onChange={onChange('subject')}
                    fullWidth
                  />
                  <TextField
                    label="Message"
                    multiline
                    minRows={5}
                    required
                    value={form.body}
                    onChange={onChange('body')}
                    fullWidth
                  />
                  {status.state !== 'idle' && (
                    <Alert severity={status.state === 'success' ? 'success' : 'error'}>
                      {status.message}
                    </Alert>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={submitting}
                    endIcon={<SendIcon />}
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    {submitting ? 'Sending…' : 'Send message'}
                  </Button>
                </Stack>
              </motion.form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
