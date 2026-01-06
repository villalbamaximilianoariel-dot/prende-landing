import { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { trackWhatsAppClick, trackServicePageView } from '../utils/analytics';

const Auditorias = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  
  // Track page view on mount
  useEffect(() => {
    trackServicePageView('Auditorías Operativas');
  }, []);
  
  const carouselImages = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const handleWhatsAppClick = () => {    trackWhatsAppClick('Auditorías', 'Hero');    const whatsappNumber = '5491100000000';
    const message = encodeURIComponent('Hola! Me interesa el servicio de Auditorías Comerciales y Operativas. ¿Podrían darme más información?');
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
      respuesta: 'Proceso completo: 2-3 semanas. La visita presencial dura 4-6 horas según tamaño del negocio.'
    },
    {
      pregunta: '¿Vienen realmente a mi local?',
      respuesta: 'Sí, es fundamental estar en el lugar para observar la operación real y procesos. No hacemos auditorías remotas.'
    },
    {
      pregunta: '¿Para qué rubros funciona?',
      respuesta: 'Especializados en gastronomía, retail y gimnasios. También trabajamos otros rubros consultando disponibilidad.'
    },
    {
      pregunta: '¿Qué pasa si no puedo implementar todas las mejoras?',
      respuesta: 'El informe prioriza por impacto. Podés implementar de a poco. Nuestro seguimiento de 30 días te ayuda a arrancar.'
    },
    {
      pregunta: '¿Incluye la implementación de cambios?',
      respuesta: 'No, se enfoca en diagnóstico. Si necesitás implementación, te cotizamos Consultoría Personalizada.'
    },
    {
      pregunta: '¿Puedo contratar auditorías recurrentes?',
      respuesta: 'Sí, recomendamos cada 3-6 meses. Ofrecemos descuentos por paquetes anuales.'
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
          pt: { xs: 14, md: 18 },
          pb: { xs: 10, md: 14 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Button
            onClick={handleVolverServicios}
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
                component="h1"
                variant="h2" 
                sx={{ 
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '3rem' }
                }}
              >
                Auditorías Operativas
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
                Realizamos auditorías apoyadas en nuestro sistema, observando la operacion real para detectar oportunidades de mejora y devolverte información clara y accionable.
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
                    desde $79990 por mes
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#F5F5F5' }}>
                  Incluye seguimiento de 30 días
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
                Agendar Primera Auditoría
              </Button>
            </Box>
            
            <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2, boxShadow: '0 8px 32px rgba(255, 235, 93, 0.2)' }}>
              {carouselImages.map((img, index) => (
                <Box
                  key={index}
                  component="img"
                  src={img}
                  alt={`Auditoría ${index + 1}`}
                  sx={{
                    width: '100%',
                    height: { xs: 250, md: 400 },
                    objectFit: 'cover',
                    position: index === 0 ? 'relative' : 'absolute',
                    top: 0,
                    left: 0,
                    opacity: currentImage === index ? 1 : 0,
                    transition: 'opacity 1s ease-in-out'
                  }}
                />
              ))}
              <Box sx={{ 
                position: 'absolute', 
                bottom: 16, 
                left: '50%', 
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 1
              }}>
                {carouselImages.map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      bgcolor: currentImage === index ? '#FFEB5D' : 'rgba(255,255,255,0.5)',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Qué Incluye */}
      <Box sx={{ bgcolor: '#E0E0E0', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 6, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
            ¿Qué incluye el servicio?
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
            {incluye.map((item, index) => (
              <Box 
                key={index}
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <CheckCircleOutlineIcon sx={{ color: '#FFEB5D', fontSize: 28, flexShrink: 0 }} />
                <Typography variant="body1" sx={{ color: '#000', fontWeight: 500 }}>{item}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Servicios adicionales */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
          ¿Qué más podés sumar?
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: '#666', maxWidth: '600px', mx: 'auto' }}>
          Estos servicios se cotizan aparte según lo que necesites
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
          {noIncluye.map((item, index) => (
            <Box 
              key={index}
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <CancelOutlinedIcon sx={{ color: '#757575', fontSize: 28, flexShrink: 0 }} />
              <Typography variant="body1" sx={{ color: '#666' }}>{item}</Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Cómo Funciona */}
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
                <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7 }}>
                  {step.descripcion}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        </Container>
      </Box>

      {/* Para Quién Es */}
      <Box sx={{ bgcolor: '#000000', color: '#FFFFFF', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
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
