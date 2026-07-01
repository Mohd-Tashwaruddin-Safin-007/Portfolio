import { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as ScrollLink } from 'react-scroll';
import { useScrollSpy } from '../hooks/useScrollSpy.js';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const active = useScrollSpy();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const drawer = (
    <Box sx={{ width: 260, p: 2 }} onClick={() => setOpen(false)}>
      <List>
        {links.map((l) => (
          <ListItem key={l.id} disablePadding>
            <ListItemButton component={ScrollLink} to={l.id} smooth offset={-70} duration={500}>
              <ListItemText primary={l.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: scrolled ? 'rgba(10, 15, 28, 0.85)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 } }}>
          <Box
            component={ScrollLink}
            to="home"
            smooth
            duration={500}
            sx={{
              cursor: 'pointer',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: '-0.02em',
            }}
            className="gradient-text"
          >
            safin.dev
          </Box>

          <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {links.map((l) => (
              <Button
                key={l.id}
                component={ScrollLink}
                to={l.id}
                smooth
                offset={-70}
                duration={500}
                spy
                color={active === l.id ? 'primary' : 'inherit'}
                sx={{
                  color: active === l.id ? 'text.primary' : 'text.secondary',
                  fontWeight: active === l.id ? 700 : 500,
                  '&:hover': { color: 'text.primary' },
                }}
              >
                {l.label}
              </Button>
            ))}
          </Stack>

          <IconButton
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        {drawer}
      </Drawer>
    </AppBar>
  );
}
