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
        minHeight: { xs: 'calc(100vh - 80px)', md: '90vh' },
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#FFFFFF',
        pt: { xs: 12, md: 8 },
        pb: { xs: 8, md: 6 },
      }}
    >
      <Container maxWidth="lg">
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
              color: '#000000',
              mb: { xs: 2, md: 3 },
              lineHeight: 1.2,
            }}
          >
            Controlá tu negocio con datos reales
          </Typography>

          {/* Subtítulo */}
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
              fontWeight: 400,
              color: '#666666',
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
              Solicitar Demo
            </Button>

            {/* CTA Secundario */}
            <Button
              variant="outlined"
              size="large"
              href="#servicios"
              sx={{
                borderColor: '#000000',
                color: '#000000',
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1rem', md: '1.125rem' },
                fontWeight: 600,
                borderRadius: 1,
                borderWidth: 2,
                textTransform: 'none',
                minWidth: { xs: '280px', sm: 'auto' },
                '&:hover': {
                  borderWidth: 2,
                  borderColor: '#000000',
                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              Ver Servicios
            </Button>
          </Box>

          {/* Badge de ubicación */}
          <Box sx={{ mt: { xs: 6, md: 8 } }}>
            <Typography
              variant="body2"
              sx={{
                color: '#999999',
                fontSize: { xs: '0.875rem', md: '0.9375rem' },
                fontWeight: 500,
              }}
            >
              📍 Buenos Aires, Argentina (AMBA)
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
