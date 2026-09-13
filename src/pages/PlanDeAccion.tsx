import { useEffect } from 'react';
import { Box, Button, Container, Typography, Chip, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PsychologyIcon from '@mui/icons-material/Psychology';
import Rule from '@mui/icons-material/Rule';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { trackWhatsAppClick, trackServicePageView } from '../utils/analytics';

const PlanDeAccion = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackServicePageView('Plan de Acción');
  }, []);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('PlanDeAccion', 'Hero');
    const whatsappNumber = '5491125453990';
    const message = encodeURIComponent('Hola! Me interesa el Plan de Acción de Prende. ¿Podrían darme más información?');
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
    'Investigación a fondo del negocio (no solo lo comercial — lo que haga falta según tu problema)',
    'Un plan de acción concreto, con pasos y plazos claros',
    'Acompañamiento semanal durante la ejecución',
    'Capacitación al equipo en lo que el plan requiera',
    'Revisión final de resultados, con números concretos de las mejoras logradas',
  ];

  const casos = [
    {
      icon: <ReceiptLongIcon sx={{ fontSize: 32 }} />,
      titulo: 'Costos y gastos',
      descripcion: 'Vendés todo el tiempo pero no sabés si te queda margen real. Investigamos tu estructura de costos y precios, armamos un plan y te acompañamos a ponerlo en marcha.',
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 32 }} />,
      titulo: 'Experiencia del cliente',
      descripcion: 'Sentís que algo falla en la atención pero no identificás bien qué. Investigamos el recorrido completo del cliente y armamos un plan para mejorar lo que más impacta.',
    },
    {
      icon: <VisibilityIcon sx={{ fontSize: 32 }} />,
      titulo: 'Control y supervisión',
      descripcion: 'No tenés forma de saber qué pasa en el negocio cuando no estás. Armamos un plan para que puedas controlar lo importante sin tener que estar encima todo el día.',
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 32 }} />,
      titulo: 'Toma de decisiones',
      descripcion: 'Decidís sobre la marcha porque no tenés la información a mano. Ordenamos los datos que necesitás y armamos un plan para que decidir deje de ser una apuesta.',
    },
    {
      icon: <Rule sx={{ fontSize: 32 }} />,
      titulo: 'Orden y organización',
      descripcion: 'Todo se hace medio de memoria, sin un proceso claro. Investigamos cómo funciona hoy tu negocio y armamos un plan para que cada cosa tenga su lugar.',
    },
    {
      icon: <PersonOffIcon sx={{ fontSize: 32 }} />,
      titulo: 'Dependencia del dueño',
      descripcion: 'Si vos faltás un día, el negocio se resiente. Armamos un plan para que el equipo pueda sostener lo importante sin que dependa 100% de vos.',
    },
  ];

  const proceso = [
    { numero: '1', titulo: 'El problema', descripcion: 'Nos contás qué está pasando (podés venir de una Primera Consulta, o entrar directo)' },
    { numero: '2', titulo: 'Investigación', descripcion: 'Indagamos a fondo tu negocio para entender qué pasa de verdad' },
    { numero: '3', titulo: 'Plan de acción', descripcion: 'Armamos el plan concreto para resolverlo' },
    { numero: '4', titulo: 'Acompañamiento', descripcion: 'Te acompañamos y supervisamos mientras se ejecuta' },
    { numero: '5', titulo: 'Revisión de resultados', descripcion: 'Cerramos mostrando las mejoras alcanzadas, en números' },
  ];

  const otrosServicios = [
    { titulo: 'Supervisión de Calidad', descripcion: 'Supervisión periódica para sostener lo logrado', route: '/supervision-calidad' },
    { titulo: 'Tu Sistema a Medida', descripcion: 'Un sistema a medida para gestionar lo que definimos en el plan', route: '/tu-sistema-a-medida' },
  ];

  const faqs = [
    { pregunta: '¿Trabajan conmigo o lo hacen por mí?', respuesta: 'Trabajamos juntos. Aportamos el plan y el acompañamiento, pero vos y tu equipo ejecutan. Así cuando terminamos, quedan capacidades instaladas.' },
    { pregunta: '¿Cuánto dura el proyecto?', respuesta: '3-6 meses según el problema. Primeros 3 meses intensivos (reuniones semanales), últimos de consolidación (quincenales).' },
    { pregunta: '¿Qué pasa si no veo resultados?', respuesta: 'Si al mes 2 no ves avances, revisamos el enfoque sin costo adicional.' },
    { pregunta: '¿Es presencial o remoto?', respuesta: 'Híbrido: primera reunión presencial, después videollamadas semanales y visitas periódicas.' },
    { pregunta: '¿Puedo combinar con otros servicios?', respuesta: 'Sí. Podés llegar acá después de una Primera Consulta, y al terminar, muchos suman Supervisión de Calidad para sostener lo logrado, o Tu Sistema a Medida si lo que hace falta es una herramienta.' },
    { pregunta: '¿Incluye capacitación al equipo?', respuesta: 'Sí, en lo que el plan requiera — no solo ventas.' },
  ];

  return (
    <Box sx={{ bgcolor: '#FFFFFF' }}>
      <Header />

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: '#000000',
          color: '#FFFFFF',
          minHeight: '90vh',
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
            label="Manos a la obra"
            sx={{ bgcolor: '#FFEB5D', color: '#000000', fontWeight: 600, mb: 2 }}
          />
          <Typography
            component="h1"
            variant="h2"
            sx={{ fontWeight: 700, mb: 3, fontSize: { xs: '2rem', md: '3rem' } }}
          >
            Plan de Acción
          </Typography>
          <Typography
            variant="h5"
            sx={{ mb: 4, color: '#F5F5F5', fontWeight: 300, lineHeight: 1.6 }}
          >
            Miramos de cerca qué está pasando en tu negocio, armamos un plan concreto para
            solucionarlo, y te acompañamos a llevarlo adelante — hasta mostrarte las mejoras
            en números.
          </Typography>

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
              mt: 1,
              '&:hover': { bgcolor: '#1ebe57' },
            }}
          >
            Consultar por mi negocio
          </Button>
        </Container>
      </Box>

      {/* Qué incluye */}
      <Box sx={{ bgcolor: '#E0E0E0', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 6, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
            ¿Qué incluye?
          </Typography>
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

      {/* Casos posibles */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
          Casos posibles
        </Typography>
        <Typography variant="body1" sx={{ mb: 6, textAlign: 'center', color: '#666', maxWidth: '650px', mx: 'auto' }}>
          Un Plan de Acción puede aplicarse a cualquiera de estos problemas — y a otros que no estén en esta lista
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {casos.map((caso, index) => (
            <Box
              key={index}
              sx={{
                border: '1.5px solid #E0E0E0',
                borderRadius: 2,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              <Box sx={{ color: '#000' }}>{caso.icon}</Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {caso.titulo}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                {caso.descripcion}
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
          <Box sx={{ maxWidth: 900, mx: 'auto' }}>
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
            ya identificaron un problema concreto en su negocio — de costos, ventas, procesos,
            equipo u organización — y quieren resolverlo con{' '}
            <Box component="span" sx={{ color: '#FFEB5D', fontWeight: 600 }}>un plan de acción real</Box>,
            no solo un consejo.
          </Typography>
        </Container>
      </Box>

      {/* Qué más podés sumar */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 5, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
          ¿Qué más podés sumar?
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
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
            ¿Encontraste tu problema en la lista?
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
              Consultar por mi negocio
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default PlanDeAccion;
