import { Box, Container, Typography, Button } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import { useNavigate } from 'react-router-dom';
import { trackServicesScroll } from '../utils/analytics';

const Hero = () => {
  const navigate = useNavigate();

  const handleCalculadoraClick = () => {
    navigate('/calculadora');
    window.scrollTo(0, 0);
  };

  const scrollToServicios = () => {
    trackServicesScroll();
    const element = document.getElementById('servicios');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#000000',
        backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.62) 100%)',
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: '900px',
            mx: 'auto',
          }}
        >
          {/* Título principal */}
          <Typography
            component="h1"
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' },
              fontWeight: 700,
              color: '#FFFFFF',
              mb: { xs: 2.5, md: 3.5 },
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            Entender el negocio cambia la forma de decidir
          </Typography>

          {/* Subtítulo */}
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
              fontWeight: 400,
              color: '#F5F5F5',
              mb: { xs: 5, md: 6 },
              lineHeight: 1.6,
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            Te acompañamos en cada paso para que tu negocio funcione mejor.
          </Typography>

          {/* CTAs */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* CTA Principal */}
            <Button
              variant="contained"
              size="large"
              onClick={handleCalculadoraClick}
              startIcon={<CalculateIcon />}
              sx={{
                bgcolor: '#FFEB5D',
                color: '#000000',
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1rem', md: '1.125rem' },
                fontWeight: 600,
                borderRadius: '14px',
                textTransform: 'none',
                boxShadow: 'none',
                minWidth: { xs: '280px', sm: 'auto' },
                '&:hover': {
                  bgcolor: '#FFE135',
                  boxShadow: 'none',
                },
              }}
            >
              Calculá tus costos, gratis
            </Button>

            {/* CTA Secundario */}
            <Button
              variant="contained"
              size="large"
              onClick={scrollToServicios}
              sx={{
                color: '#FFFFFF',
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1rem', md: '1.125rem' },
                fontWeight: 600,
                borderRadius: '14px',
                textTransform: 'none',
                boxShadow: 'none',
                minWidth: { xs: '280px', sm: 'auto' },
                bgcolor: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.35)',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.2)',
                  boxShadow: 'none',
                },
              }}
            >
              Ver Servicios
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
