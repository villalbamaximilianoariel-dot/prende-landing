import { useEffect, useState } from 'react';
import { Box, Button, Container, Typography, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { trackWhatsAppClick, trackServicePageView } from '../utils/analytics';
import { PAISES, PAIS_DEFAULT, getPrecio } from '../data/countries';
import type { PaisConfig } from '../data/countries';
import { detectCountryCode } from '../utils/geo';

const Costos = () => {
  const navigate = useNavigate();
  const [paisSeleccionado, setPaisSeleccionado] = useState<PaisConfig>(PAIS_DEFAULT);

  useEffect(() => {
    trackServicePageView('Diagnóstico de Costos y Gastos');
  }, []);

  useEffect(() => {
    detectCountryCode().then((code) => {
      if (code) {
        const match = PAISES.find((p) => p.code === code);
        if (match) setPaisSeleccionado(match);
      }
    });
  }, []);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('Costos', 'Hero');
    const whatsappNumber = '5491125453990';
    const message = encodeURIComponent('Hola! Me interesa el Diagnóstico de Costos y Gastos. ¿Podrían darme más información?');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleVolverServicios = () => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('servicios');
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const diagnosticoInicial = [
    'Relevamiento de costos fijos y variables (alquiler, sueldos, insumos, servicios)',
    'Costeo real de tus productos o servicios principales',
    'Comparación contra tus precios actuales para ver el margen real',
    'Informe simple con los puntos a ajustar',
  ];

  return (
    <Box sx={{ bgcolor: '#FFFFFF' }}>
      <Header />

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: '#000000',
          color: '#FFFFFF',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          pt: { xs: 14, md: 18 },
          pb: { xs: 10, md: 14 },
        }}
      >
        <Container maxWidth="md">
          <Button
            onClick={handleVolverServicios}
            startIcon={<ArrowBackIcon />}
            sx={{
              color: '#FFEB5D',
              mb: 3,
              '&:hover': { bgcolor: 'rgba(255, 235, 93, 0.1)' },
            }}
          >
            Volver a servicios
          </Button>

          <Chip
            label="Nuevo"
            sx={{ bgcolor: '#FFEB5D', color: '#000000', fontWeight: 600, mb: 2 }}
          />
          <Typography
            component="h1"
            variant="h2"
            sx={{ fontWeight: 700, mb: 3, fontSize: { xs: '2rem', md: '3rem' } }}
          >
            Diagnóstico de Costos y Gastos
          </Typography>
          <Typography
            variant="h5"
            sx={{ mb: 4, color: '#F5F5F5', fontWeight: 300, lineHeight: 1.6 }}
          >
            Cruzamos tus compras, tus gastos fijos y tus precios de venta para mostrarte
            cuánto te cuesta cada cosa y cuánto te queda de verdad.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3, alignItems: 'flex-start' }}>
            <Box
              sx={{
                bgcolor: '#FFEB5D',
                color: '#000000',
                px: 3,
                py: 1.5,
                borderRadius: 1,
              }}
            >
              <Typography variant="h6" sx={{ color: '#000000', fontWeight: 700 }}>
                {getPrecio(paisSeleccionado, 'costos')} por proyecto
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#F5F5F5' }}>
              Diagnóstico inicial · Seguimiento mensual opcional, se cotiza aparte
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={handleWhatsAppClick}
            startIcon={<WhatsAppIcon />}
            sx={{
              bgcolor: '#25D366',
              color: '#FFFFFF',
              fontWeight: 600,
              px: 4,
              py: 1.5,
              '&:hover': { bgcolor: '#1ebe57' },
            }}
          >
            Consultar precio
          </Button>
        </Container>
      </Box>

      {/* Etapa 1: Diagnóstico inicial */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 5, justifyContent: 'center' }}>
          <Box
            sx={{
              bgcolor: '#FFEB5D',
              borderRadius: 2,
              width: 64,
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ReceiptLongIcon sx={{ fontSize: 36, color: '#000000' }} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
            Etapa 1 · Diagnóstico inicial
          </Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, maxWidth: 900, mx: 'auto' }}>
          {diagnosticoInicial.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <CheckCircleOutlineIcon sx={{ color: '#FFEB5D', fontSize: 28, flexShrink: 0, mt: 0.3 }} />
              <Typography variant="body1" sx={{ color: '#333', lineHeight: 1.6 }}>
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Etapa 2: Seguimiento mensual */}
      <Box sx={{ bgcolor: '#E0E0E0', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, justifyContent: 'center' }}>
            <Box
              sx={{
                bgcolor: '#000000',
                borderRadius: 2,
                width: 64,
                height: 64,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <TrendingUpIcon sx={{ fontSize: 36, color: '#FFEB5D' }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
              Etapa 2 · Seguimiento mensual (opcional)
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ textAlign: 'center', color: '#333', lineHeight: 1.7, maxWidth: 700, mx: 'auto' }}>
            Actualizamos el panorama todos los meses, para que el diagnóstico no se quede viejo,
            y te avisamos si algo se corrió de precio o de margen.
          </Typography>
        </Container>
      </Box>

      {/* CTA Final */}
      <Box sx={{ bgcolor: '#FFEB5D', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
            ¿Querés saber cuánto te está costando no saberlo?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleWhatsAppClick}
              startIcon={<WhatsAppIcon />}
              sx={{
                bgcolor: '#000000',
                color: '#FFFFFF',
                fontWeight: 600,
                px: 5,
                py: 2,
                fontSize: '1.1rem',
                '&:hover': { bgcolor: '#333333' },
              }}
            >
              Consultar precio
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default Costos;
