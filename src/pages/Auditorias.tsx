import { Box, Button, Container, Typography, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Auditorias = () => {
  const handleWhatsAppClick = () => {
    const whatsappNumber = '5491100000000';
    const message = encodeURIComponent('Hola! Me interesa el servicio de Auditorías Comerciales y Operativas. ¿Podrían darme más información?');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const incluye = [
    'Visita presencial a tu negocio',
    'Checklist personalizado según tu rubro',
    'Análisis de procesos operativos',
    'Evaluación de atención al cliente',
    'Revisión de stock y almacenamiento',
    'Informe detallado con hallazgos',
    'Recomendaciones priorizadas y accionables',
    'Sesión de devolución presencial o virtual',
    'Plan de mejora con timeline',
    'Seguimiento post-auditoría (30 días)'
  ];

  const noIncluye = [
    'Implementación de las mejoras (puede contratarse aparte)',
    'Software o herramientas adicionales',
    'Capacitación al personal (disponible como add-on)',
    'Consultoría continua (ver servicio de Consultoría)'
  ];

  const proceso = [
    { numero: '1', titulo: 'Contacto inicial', descripcion: 'Llamada o videollamada para entender tu negocio y necesidades específicas' },
    { numero: '2', titulo: 'Planificación', descripcion: 'Diseñamos el checklist personalizado y agendamos la visita' },
    { numero: '3', titulo: 'Auditoría presencial', descripcion: 'Visitamos tu local, observamos operación y entrevistamos al equipo (4-6 horas)' },
    { numero: '4', titulo: 'Análisis', descripcion: 'Procesamos hallazgos y preparamos el informe detallado (3-5 días)' },
    { numero: '5', titulo: 'Devolución', descripcion: 'Presentamos resultados y plan de mejora en reunión (1-2 horas)' },
    { numero: '6', titulo: 'Seguimiento', descripcion: 'Acompañamos implementación vía WhatsApp/email durante 30 días' }
  ];

  const faqs = [
    {
      pregunta: '¿Cuánto dura la auditoría?',
      respuesta: 'El proceso completo toma 2-3 semanas desde el contacto inicial hasta la entrega del informe. La visita presencial dura entre 4-6 horas dependiendo del tamaño del negocio.'
    },
    {
      pregunta: '¿Vienen realmente a mi local?',
      respuesta: 'Sí, es fundamental estar en el lugar para observar la operación real, flujos de trabajo, interacción con clientes y procesos operativos. No hacemos auditorías remotas para este servicio.'
    },
    {
      pregunta: '¿Para qué rubros funciona?',
      respuesta: 'Especializados en gastronomía (restaurantes, bares, cafeterías), retail (locales comerciales, boutiques) y gimnasios/centros deportivos. También trabajamos con otros rubros consultando disponibilidad.'
    },
    {
      pregunta: '¿Qué pasa si no puedo implementar todas las mejoras?',
      respuesta: 'El informe prioriza las recomendaciones por impacto y urgencia. Podés implementar de a poco, empezando por las críticas. Nuestro seguimiento de 30 días te ayuda a arrancar.'
    },
    {
      pregunta: '¿Incluye la implementación de cambios?',
      respuesta: 'No, el servicio se enfoca en diagnóstico y planificación. Si necesitás ayuda con la implementación, podemos cotizarte nuestro servicio de Consultoría Comercial Aplicada.'
    },
    {
      pregunta: '¿Puedo contratar auditorías recurrentes?',
      respuesta: 'Sí, recomendamos auditorías cada 3-6 meses para negocios en mejora continua. Ofrecemos descuentos por paquetes anuales.'
    }
  ];

  return (
    <Box sx={{ bgcolor: '#FFFFFF' }}>
      <Header />
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: '#000000',
          color: '#FFFFFF',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          pt: { xs: 12, md: 16 },
          pb: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Button
            component={RouterLink}
            to="/#servicios"
            startIcon={<ArrowBackIcon />}
            sx={{ 
              color: '#FFEB5D',
              mb: 3,
              '&:hover': { bgcolor: 'rgba(255, 235, 93, 0.1)' }
            }}
          >
            Volver a servicios
          </Button>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
            <Box>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '3rem' }
                }}
              >
                Auditorías Comerciales y Operativas
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4,
                  color: '#F5F5F5',
                  fontWeight: 300,
                  lineHeight: 1.6
                }}
              >
                Descubrí qué está fallando en tu negocio y cómo mejorarlo con una auditoría presencial profesional
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                <Box
                  sx={{
                    bgcolor: '#FFEB5D',
                    color: '#000000',
                    px: 3,
                    py: 1.5,
                    borderRadius: 1,
                    display: 'inline-block',
                    alignSelf: 'flex-start',
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#000000', fontWeight: 700 }}>
                    desde 79990
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#F5F5F5' }}>
                  Duración: 2-3 semanas • Incluye seguimiento de 30 días
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
                  '&:hover': {
                    bgcolor: '#1ebe57'
                  }
                }}
              >
                Probar Gratis 15 Días
              </Button>
            </Box>
            
            <Box 
              component="img"
              src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=600&fit=crop"
              alt="Auditoría en negocio"
              sx={{
                width: '100%',
                height: { xs: 250, md: 400 },
                objectFit: 'cover',
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(255, 235, 93, 0.2)'
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* Qué Incluye */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
          ¿Qué incluye el servicio?
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
          {incluye.map((item, index) => (
            <Paper 
              key={index}
              elevation={0}
              sx={{ 
                p: 2.5,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                border: '1px solid #F5F5F5',
                transition: 'all 0.3s',
                '&:hover': {
                  borderColor: '#FFEB5D',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <CheckCircleOutlineIcon sx={{ color: '#FFEB5D', fontSize: 28 }} />
              <Typography variant="body1">{item}</Typography>
            </Paper>
          ))}
        </Box>
      </Container>

      {/* Qué NO Incluye */}
      <Box sx={{ bgcolor: '#E0E0E0', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
            Qué NO incluye
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
            {noIncluye.map((item, index) => (
              <Paper 
                key={index}
                elevation={0}
                sx={{ 
                  p: 2.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  bgcolor: '#FFFFFF'
                }}
              >
                <CancelOutlinedIcon sx={{ color: '#757575', fontSize: 28 }} />
                <Typography variant="body2" sx={{ color: '#757575' }}>{item}</Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Cómo Funciona */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
          ¿Cómo funciona?
        </Typography>
        <Box sx={{ position: 'relative' }}>
          {proceso.map((step, index) => (
            <Box 
              key={index}
              sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '60px 1fr', md: '80px 1fr' },
                gap: 3,
                mb: 4,
                pb: 4,
                borderBottom: index < proceso.length - 1 ? '1px solid #F5F5F5' : 'none'
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
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}
              >
                {step.numero}
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  {step.titulo}
                </Typography>
                <Typography variant="body1" sx={{ color: '#757575', lineHeight: 1.7 }}>
                  {step.descripcion}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Para Quién Es */}
      <Box sx={{ bgcolor: '#000000', color: '#FFFFFF', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
            ¿Para quién es este servicio?
          </Typography>
          <Typography variant="h6" sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', lineHeight: 1.8, fontWeight: 300 }}>
            Ideal para dueños de <Box component="span" sx={{ color: '#FFEB5D', fontWeight: 600 }}>pymes</Box> que sienten que su negocio no rinde lo esperado, 
            tienen problemas operativos recurrentes, o quieren <Box component="span" sx={{ color: '#FFEB5D', fontWeight: 600 }}>vender más ordenando la operación</Box>. 
            Perfecto para restaurantes, locales comerciales, gimnasios y servicios con atención al público.
          </Typography>
        </Container>
      </Box>

      {/* FAQs */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
          Preguntas Frecuentes
        </Typography>
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
          {faqs.map((faq, index) => (
            <Accordion 
              key={index}
              elevation={0}
              sx={{ 
                mb: 2,
                border: '1px solid #F5F5F5',
                '&:before': { display: 'none' },
                borderRadius: '8px !important'
              }}
            >
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{ 
                  py: 2,
                  '& .MuiAccordionSummary-content': { my: 1 }
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {faq.pregunta}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0, pb: 3 }}>
                <Typography variant="body1" sx={{ color: '#757575', lineHeight: 1.7 }}>
                  {faq.respuesta}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>

      {/* CTA Final */}
      <Box sx={{ bgcolor: '#FFEB5D', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
            ¿Listo para mejorar tu negocio?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, textAlign: 'center', fontWeight: 300 }}>
            Hablemos de cómo podemos ayudarte a identificar oportunidades de mejora
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
                '&:hover': {
                  bgcolor: '#333333'
                }
              }}
            >
              Probar Gratis 15 Días
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default Auditorias;
