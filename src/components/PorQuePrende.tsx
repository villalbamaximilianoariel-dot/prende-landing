import { Box, Container, Typography, Button } from '@mui/material';

const PorQuePrende = () => {
  const scrollToServicios = () => {
    const element = document.getElementById('servicios');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box
      id="por-que-prende-bloque-2"
      sx={{
        bgcolor: '#000000',
        py: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            component="h2"
            variant="h4"
            sx={{
              fontSize: { xs: '1.375rem', sm: '1.75rem', md: '2rem' },
              fontWeight: 700,
              color: '#FFFFFF',
              mb: 2,
              lineHeight: 1.4,
            }}
          >
            ¿Te sentiste identificado con alguno de estos? Estás en el lugar correcto.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              color: '#CCCCCC',
              mb: 4,
              maxWidth: '650px',
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            No importa cuál de estos sea tu caso: tenemos el servicio justo para arrancar, y te acompañamos hasta que el cambio se note.
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.125rem', md: '1.375rem' },
              fontWeight: 700,
              color: '#FFEB5D',
              mb: 4,
            }}
          >
            Menos intuición, mejores decisiones.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={scrollToServicios}
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
              '&:hover': {
                bgcolor: '#FFE135',
                boxShadow: '0 4px 12px rgba(255, 235, 93, 0.4)',
              },
            }}
          >
            Ver todos los servicios
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PorQuePrende;
