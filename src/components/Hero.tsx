import { Box, Container, Typography, Button } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Hero = () => {
  const handleWhatsAppClick = () => {
    // Placeholder - actualizar con número real
    window.open('https://wa.me/5491100000000?text=Hola%20Prende%2C%20quiero%20solicitar%20una%20demo', '_blank');
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
          bgcolor: 'rgba(0, 0, 0, 0.7)',
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
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' },
              fontWeight: 700,
              color: '#FFFFFF',
              mb: { xs: 2, md: 3 },
              lineHeight: 1.2,
            }}
          >
            Gestiona tu negocio con datos reales
          </Typography>

          {/* Subtítulo */}
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
              fontWeight: 400,
              color: '#F5F5F5',
              mb: { xs: 4, md: 5 },
              lineHeight: 1.6,
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            Auditorías operativas, sistema propio y consultoría comercial para pymes
            que quieren vender mejor y ordenar su operación.
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
              onClick={handleWhatsAppClick}
              startIcon={<WhatsAppIcon />}
              sx={{
                bgcolor: '#FFEB5D',
                color: '#000000',
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1rem', md: '1.125rem' },
                fontWeight: 600,
                borderRadius: 1,
                textTransform: 'none',
                boxShadow: 'none',
                minWidth: { xs: '280px', sm: 'auto' },
                '&:hover': {
                  bgcolor: '#FFE135',
                  boxShadow: '0 4px 12px rgba(255, 235, 93, 0.4)',
                },
              }}
            >
              Probar Gratis 15 Días
            </Button>

            {/* CTA Secundario */}
            <Button
              variant="contained"
              size="large"
              href="#servicios"
              sx={{
                bgcolor: '#000000',
                color: '#FFFFFF',
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1rem', md: '1.125rem' },
                fontWeight: 600,
                borderRadius: 1,
                textTransform: 'none',
                minWidth: { xs: '280px', sm: 'auto' },
                border: '2px solid #FFFFFF',
                '&:hover': {
                  bgcolor: '#333333',
                  borderColor: '#FFEB5D',
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
