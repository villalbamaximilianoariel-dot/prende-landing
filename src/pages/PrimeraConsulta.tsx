import { useEffect, useState } from 'react';
import { Box, Button, Container, Typography, Chip, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { trackWhatsAppClick, trackServicePageView } from '../utils/analytics';
import { PAISES, PAIS_DEFAULT, getPrecio } from '../data/countries';
import type { PaisConfig } from '../data/countries';
import { detectCountryCode } from '../utils/geo';

const PrimeraConsulta = () => {
  const navigate = useNavigate();
  const [paisSeleccionado, setPaisSeleccionado] = useState<PaisConfig>(PAIS_DEFAULT);

  useEffect(() => {
    trackServicePageView('Primera Consulta');
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
    trackWhatsAppClick('PrimeraConsulta', 'Hero');
    const whatsappNumber = '5491125453990';
    const message = encodeURIComponent('Hola! Quiero agendar una Primera Consulta con Prende.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleVolverServicios = () => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('servicios');
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const incluye = [
    'Reunión de 1 hora, presencial o por videollamada',
    'Contás tu situación y resolvemos tus dudas puntuales',
    'Te damos una primera mirada sobre lo que está pasando',
    'Te decimos con claridad si conviene avanzar, y con qué servicio',
    'Si contratás otro servicio después, lo pagado acá se descuenta del costo',
  ];

  const otrosServicios = [
    { titulo: 'Plan de Acción', descripcion: 'Una investigación a fondo de tu negocio y un plan para resolverlo', route: '/plan-de-accion' },
    { titulo: 'Supervisión de Calidad', descripcion: 'Supervisión periódica para sostener el estándar de tu negocio', route: '/supervision-calidad' },
    { titulo: 'Tu Sistema a Medida', descripcion: 'Un sistema a medida para gestionar ventas, costos, stock y más', route: '/tu-sistema-a-medida' },
  ];

  const proceso = [
    { numero: '1', titulo: 'Agendás', descripcion: 'Coordinamos día y horario por WhatsApp' },
    { numero: '2', titulo: 'Charlamos', descripcion: '1 hora, contás tu situación, resolvemos dudas' },
    { numero: '3', titulo: 'Te decimos el camino', descripcion: 'Con claridad, si conviene seguir y con qué servicio' },
  ];

  const faqs = [
    { pregunta: '¿Cuánto dura?', respuesta: '1 hora.' },
    { pregunta: '¿Es presencial o virtual?', respuesta: 'Como prefieras.' },
    { pregunta: '¿Qué pasa si después no contrato nada más?', respuesta: 'Nada — pagaste solo la consulta, sin compromiso.' },
    { pregunta: '¿Cómo se descuenta si avanzo con otro servicio?', respuesta: 'Se resta directo del presupuesto del servicio que contrates.' },
    { pregunta: '¿Puedo ir directo a Plan de Acción sin pasar por acá?', respuesta: 'Sí, es un punto de entrada opcional, no obligatorio.' },
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
            label="Punto de partida"
            sx={{ bgcolor: '#FFEB5D', color: '#000000', fontWeight: 600, mb: 2 }}
          />
          <Typography
            component="h1"
            variant="h2"
            sx={{ fontWeight: 700, mb: 3, fontSize: { xs: '2rem', md: '3rem' } }}
          >
            Primera Consulta
          </Typography>
          <Typography
            variant="h5"
            sx={{ mb: 4, color: '#F5F5F5', fontWeight: 300, lineHeight: 1.6 }}
          >
            Una charla de una hora para contarnos qué te pasa en el negocio, resolver tus dudas
            puntuales y saber con claridad qué conviene hacer. Si después avanzás con nosotros,
            lo que pagaste acá se descuenta.
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
                {getPrecio(paisSeleccionado, 'consulta')} · la consulta
              </Typography>
            </Box>
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
            Agendar consulta
          </Button>
        </Container>
      </Box>

      {/* Qué incluye */}
      <Box sx={{ bgcolor: '#E0E0E0', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 6, justifyContent: 'center' }}>
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
              <QuestionAnswerIcon sx={{ fontSize: 36, color: '#FFEB5D' }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
              ¿Qué incluye?
            </Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, maxWidth: 900, mx: 'auto' }}>
            {incluye.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <CheckCircleOutlineIcon sx={{ color: '#000000', fontSize: 28, flexShrink: 0, mt: 0.3 }} />
                <Typography variant="body1" sx={{ color: '#000', lineHeight: 1.6 }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Qué más podés sumar */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
          ¿Qué más podés sumar?
        </Typography>
        <Typography variant="body1" sx={{ mb: 5, textAlign: 'center', color: '#666', maxWidth: '600px', mx: 'auto' }}>
          Según lo que hablemos en la consulta, estos son los pasos que podés seguir
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {otrosServicios.map((item, index) => (
            <Box
              key={index}
              onClick={() => { navigate(item.route); window.scrollTo(0, 0); }}
              sx={{
                border: '1.5px solid #E0E0E0',
                borderRadius: 2,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#FFEB5D',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <ArrowForwardIcon sx={{ color: '#000', fontSize: 24 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {item.titulo}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                {item.descripcion}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Cómo funciona */}
      <Box sx={{ bgcolor: '#E0E0E0', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 6, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
            ¿Cómo funciona?
          </Typography>
          <Box sx={{ position: 'relative', maxWidth: 900, mx: 'auto' }}>
            {proceso.map((step, index) => (
              <Box
                key={index}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '60px 1fr', md: '80px 1fr' },
                  gap: 3,
                  mb: 4,
                  pb: 4,
                  borderBottom: index < proceso.length - 1 ? '1px solid #F5F5F5' : 'none',
                }}
              >
                <Box
                  sx={{
                    width: { xs: 50, md: 60 },
                    height: { xs: 50, md: 60 },
                    borderRadius: '50%',
                    bgcolor: '#FFEB5D',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                  }}
                >
                  {step.numero}
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                    {step.titulo}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7 }}>
                    {step.descripcion}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Para quién es */}
      <Box sx={{ bgcolor: '#000000', color: '#FFFFFF', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
            ¿Para quién es este servicio?
          </Typography>
          <Typography variant="h6" sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', lineHeight: 1.8, fontWeight: 300 }}>
            Dueños de <Box component="span" sx={{ color: '#FFEB5D', fontWeight: 600 }}>pymes</Box> que
            sienten que algo no anda del todo bien pero no saben bien qué, o que tienen dudas
            puntuales sobre costos, procesos o cómo poner orden, y quieren{' '}
            <Box component="span" sx={{ color: '#FFEB5D', fontWeight: 600 }}>una mirada externa</Box>{' '}
            antes de comprometerse a algo más grande.
          </Typography>
        </Container>
      </Box>

      {/* FAQs */}
      <Box sx={{ bgcolor: '#E0E0E0', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 6, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
            Preguntas Frecuentes
          </Typography>
          <Box sx={{ maxWidth: 900, mx: 'auto' }}>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                elevation={0}
                sx={{
                  mb: 2,
                  bgcolor: '#FFFFFF',
                  border: '1px solid #E0E0E0',
                  '&:before': { display: 'none' },
                  borderRadius: '8px !important',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ py: 2, '& .MuiAccordionSummary-content': { my: 1 } }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {faq.pregunta}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0, pb: 3 }}>
                  <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7 }}>
                    {faq.respuesta}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Final */}
      <Box sx={{ bgcolor: '#FFEB5D', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
            ¿Hablamos?
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
              Agendar consulta
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default PrimeraConsulta;
