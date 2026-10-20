import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

const PorQuePrende = () => {
  const ref = useRef<HTMLDivElement>(null);
  // Con menos movimiento (o sin IntersectionObserver) la tarjeta ya está visible desde el inicio
  const [visible, setVisible] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)
  );

  // La tarjeta aparece suavemente al llegar a ella (si el navegador pide menos movimiento, ya está visible)
  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  const scrollToServicios = () => {
    const element = document.getElementById('servicios');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box
      id="por-que-prende-bloque-2"
      sx={{
        bgcolor: '#F5F5F5',
        pt: 0,
        pb: { xs: 8, md: 12 },
        px: { xs: 2, md: 0 },
      }}
    >
      <Container maxWidth="md" disableGutters sx={{ position: 'relative' }}>
        {/* Punto de llegada del puente */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            top: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 16,
            height: 16,
            borderRadius: '50%',
            bgcolor: '#FFEB5D',
            border: '3px solid #F5F5F5',
            zIndex: 2,
          }}
        />
        <Box
          ref={ref}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(24px) scale(0.98)',
            transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -120,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 420,
              height: 240,
              background: 'radial-gradient(closest-side, rgba(255,235,93,0.22), rgba(255,235,93,0))',
              pointerEvents: 'none',
            },
            textAlign: 'center',
            bgcolor: '#000000',
            border: '2px solid #FFEB5D',
            borderRadius: '24px',
            px: { xs: 3, md: 8 },
            py: { xs: 5, md: 8 },
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            sx={{
              fontSize: { xs: '1.375rem', sm: '1.75rem', md: '2rem' },
              fontWeight: 700,
              color: '#FFFFFF',
              mb: 2.5,
              lineHeight: 1.35,
              letterSpacing: '-0.01em',
            }}
          >
            ¿Te sentiste identificado con alguno de estos?{' '}
            <Box component="span" sx={{ color: '#FFEB5D' }}>Estás en el lugar correcto.</Box>
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
              color: '#FFFFFF',
              mb: 4,
              pt: 3,
              maxWidth: 460,
              mx: 'auto',
              borderTop: '1px solid #333333',
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
              borderRadius: '14px',
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#FFE135',
                boxShadow: 'none',
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
