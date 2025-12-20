import { AppBar, Toolbar, Container, Button, Box } from '@mui/material';
import { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
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
            href="#"
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

          {/* Navigation */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              gap: { sm: 2, md: 4 },
              alignItems: 'center',
            }}
          >
            <Button
              href="#servicios"
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
              Servicios
            </Button>

            <Button
              href="/prende-landing/recursos"
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
              Recursos
            </Button>

            <Button
              href="#contacto"
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
                '&:hover': {
                  bgcolor: '#FFE135',
                  boxShadow: 'none',
                },
              }}
            >
              Contacto
            </Button>
          </Box>

          {/* Mobile CTA */}
          <Button
            href="#contacto"
            variant="contained"
            size="small"
            sx={{
              display: { xs: 'flex', sm: 'none' },
              bgcolor: '#FFEB5D',
              color: '#000000',
              px: 2,
              py: 0.75,
              fontSize: '0.875rem',
              fontWeight: 600,
              borderRadius: 1,
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#FFE135',
                boxShadow: 'none',
              },
            }}
          >
            Contacto
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
