import { AppBar, Toolbar, Container, Button, Box, Drawer, List, ListItem, ListItemButton, ListItemText, IconButton, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setDrawerOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavLink = (href: string) => {
    setDrawerOpen(false);
    navigate(href);
    window.scrollTo(0, 0);
  };

  return (
    <>
    <AppBar
      position="fixed"
      elevation={scrolled ? 2 : 0}
      sx={{
        bgcolor: scrolled ? '#000000' : 'rgba(0, 0, 0, 0.3)',
        backdropFilter: scrolled ? 'none' : 'blur(10px)',
        borderBottom: scrolled ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 64, md: 80 },
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Box
            component="a"
            href="/#"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <Box
              component="img"
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Prende"
              sx={{
                height: { xs: 40, md: 50 },
                width: 'auto',
              }}
            />
          </Box>

          {/* Navigation desktop */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              gap: { sm: 2, md: 4 },
              alignItems: 'center',
            }}
          >
            <Button
              onClick={() => scrollToSection('servicios')}
              sx={{
                color: '#FFFFFF',
                fontSize: { sm: '0.9375rem', md: '1rem' },
                fontWeight: 500,
                textTransform: 'none',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'transparent',
                  color: '#FFEB5D',
                },
              }}
            >
              Servicios
            </Button>

            <Button
              href="/#/blog"
              sx={{
                color: '#FFFFFF',
                fontSize: { sm: '0.9375rem', md: '1rem' },
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: 'transparent',
                  color: '#FFEB5D',
                },
              }}
            >
              Blog
            </Button>

            <Button
              href="/#/implementacion"
              sx={{
                color: '#FFFFFF',
                fontSize: { sm: '0.9375rem', md: '1rem' },
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: 'transparent',
                  color: '#FFEB5D',
                },
              }}
            >
              A tu medida
            </Button>

            <Button
              href="/#/calculadora"
              sx={{
                color: '#FFFFFF',
                fontSize: { sm: '0.9375rem', md: '1rem' },
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: 'transparent',
                  color: '#FFEB5D',
                },
              }}
            >
              Calculadora
            </Button>

            <Button
              onClick={() => scrollToSection('contacto')}
              variant="contained"
              sx={{
                bgcolor: '#FFEB5D',
                color: '#000000',
                px: { sm: 2.5, md: 3 },
                py: 1,
                fontSize: { sm: '0.9375rem', md: '1rem' },
                fontWeight: 600,
                borderRadius: 1,
                textTransform: 'none',
                boxShadow: 'none',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: '#FFE135',
                  boxShadow: 'none',
                },
              }}
            >
              Contacto
            </Button>
          </Box>

          {/* Mobile: hamburger */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{
              display: { xs: 'flex', sm: 'none' },
              color: '#FFFFFF',
            }}
            aria-label="Abrir menú"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>

    {/* Mobile Drawer */}
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: 260,
          bgcolor: '#000000',
          color: '#FFFFFF',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#FFFFFF' }} aria-label="Cerrar menú">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      <List sx={{ pt: 1 }}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => scrollToSection('servicios')}>
            <ListItemText primary="Servicios" primaryTypographyProps={{ fontWeight: 500 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavLink('/blog')}>
            <ListItemText primary="Blog" primaryTypographyProps={{ fontWeight: 500 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavLink('/implementacion')}>
            <ListItemText primary="A tu medida" primaryTypographyProps={{ fontWeight: 500 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavLink('/calculadora')}>
            <ListItemText primary="Calculadora" primaryTypographyProps={{ fontWeight: 500 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ mt: 2, px: 2 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => scrollToSection('contacto')}
            sx={{
              bgcolor: '#FFEB5D',
              color: '#000000',
              fontWeight: 600,
              borderRadius: 1,
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': { bgcolor: '#FFE135', boxShadow: 'none' },
            }}
          >
            Contacto
          </Button>
        </ListItem>
      </List>
    </Drawer>
    </>
  );
};

export default Header;
