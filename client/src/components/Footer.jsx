import { Box, Container, Typography, Stack, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer({ profile }) {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(255,255,255,0.015)',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} {profile?.name || 'Mohd Tashwaruddin Safin'}. Built with the MERN stack on Vercel.
          </Typography>
          <Stack direction="row" spacing={1}>
            {profile?.socials?.github && (
              <IconButton size="small" href={profile.socials.github} target="_blank" rel="noreferrer">
                <GitHubIcon fontSize="small" />
              </IconButton>
            )}
            {profile?.socials?.linkedin && (
              <IconButton size="small" href={profile.socials.linkedin} target="_blank" rel="noreferrer">
                <LinkedInIcon fontSize="small" />
              </IconButton>
            )}
            {profile?.email && (
              <IconButton size="small" href={`mailto:${profile.email}`}>
                <EmailIcon fontSize="small" />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
