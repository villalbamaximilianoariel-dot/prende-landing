import { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, Paper, Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { trackWhatsAppClick, trackServicePageView } from '../utils/analytics';

const Sistema = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  
  // Track page view on mount
  useEffect(() => {
    trackServicePageView('Sistema de Auditoría');
  }, []);
  
  const carouselImages = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('Sistema', 'Hero');
    const whatsappNumber = '5491100000000';
    const message = encodeURIComponent('Hola! Me interesa el Sistema de Auditoría Prende. ¿Podrían darme una demo?');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleVolverServicios = () => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('servicios');
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const funcionalidades = [
    { icon: <DashboardIcon />, titulo: 'Tablero de control', descripcion: 'Mirá todo lo importante en pantalla: cuántas revisiones se hicieron hoy, qué problemas se repiten más, cómo viene la semana' },
    { icon: <AssignmentIcon />, titulo: 'Formularios personalizables', descripcion: 'Armá tus propias listas de control según lo que necesités revisar. Con 8 tipos de preguntas diferentes (texto, sí/no, opciones, etc.)' },
    { icon: <CloudOffIcon />, titulo: 'Modo sin internet', descripcion: 'Completá tus revisiones aunque no haya conexión. Cuando vuelva internet, se actualiza todo automáticamente' },
    { icon: <PhotoCameraIcon />, titulo: 'Registro con fotos', descripcion: 'Tomá fotos con el celular y asocialas a cada punto: un baño sucio, un producto mal exhibido, una máquina rota' },
    { icon: <PictureAsPdfIcon />, titulo: 'Reportes automáticos', descripcion: 'Bajá informes en PDF o Excel con un solo click' },
    { icon: <CheckCircleOutlineIcon />, titulo: 'Gestión de roles', descripcion: 'Administradores, auditores y clientes con permisos específicos' }
  ];

  const incluye = [
    'Hasta 5 usuarios simultáneos',
    'Formularios ilimitados',
    'Auditorías ilimitadas',
    'Dashboard personalizado por rol',
    'Sincronización automática',
    'Reportes PDF y Excel',
    'Gestión de evidencias con fotos',
    'Soporte por email',
    'Actualizaciones automáticas',
    'Backup diario de datos',
    'Capacitación inicial (1 hora)',
    'Acceso desde cualquier dispositivo'
  ];

  const noIncluye = [
    'Usuarios adicionales (se cotizan aparte)',
    'Soporte telefónico 24/7 (disponible en plan Premium)',
    'Auditorías presenciales (ver servicio de Auditorías)',
    'Consultoría estratégica (ver servicio de Consultoría)',
    'Personalización avanzada de código',
    'Integración con otros sistemas externos'
  ];

  const casosUso = [
    {
      titulo: 'Restaurante con 3 sucursales',
      descripcion: 'Controla limpieza, stock y atención en cada local. Los encargados completan auditorías diarias y el dueño ve todo consolidado en el dashboard.'
    },
    {
      titulo: 'Cadena de gimnasios',
      descripcion: 'Audita estado de máquinas, limpieza de vestuarios y satisfacción de socios. Genera reportes semanales automáticos para gerencia.'
    },
    {
      titulo: 'Retail multilocal',
      descripcion: 'Verifica merchandising, inventario y experiencia del cliente. Captura evidencias fotográficas de exhibiciones y problemas.'
    }
  ];

  const proceso = [
    { numero: '1', titulo: 'Demo y capacitación', descripcion: 'Te mostramos el sistema y capacitamos a tu equipo (1 hora virtual)' },
    { numero: '2', titulo: 'Configuración inicial', descripcion: 'Creamos usuarios, personalizamos formularios y configuramos tu dashboard' },
    { numero: '3', titulo: 'Período de prueba gratuito', descripcion: 'Empezás a usar el sistema con soporte activo durante 15 días' },
    { numero: '4', titulo: 'Go-live', descripcion: 'Sistema en funcionamiento con tu equipo operando en forma autónoma' },
    { numero: '5', titulo: 'Soporte continuo', descripcion: 'Asistencia por Whatsapp sin costo adicional' }
  ];

  const faqs = [
    {
      pregunta: '¿Funciona sin internet?',
      respuesta: 'Sí, tiene modo offline completo. Completás auditorías sin conexión y cuando vuelve internet, se sincroniza automáticamente.'
    },
    {
      pregunta: '¿Puedo personalizar los formularios?',
      respuesta: 'Totalmente. Tenés 8 tipos de preguntas disponibles y podés crear formularios ilimitados adaptados a tus procesos.'
    },
    {
      pregunta: '¿Incluye capacitación?',
      respuesta: 'Sí, incluye 1 hora virtual para tu equipo. El sistema es intuitivo y tiene tooltips. Capacitación adicional se cotiza aparte.'
    },
    {
      pregunta: '¿Es mensual o anual el pago?',
      respuesta: 'Mensual sin compromiso. Si pagás anual, te regalamos 2 meses (10 por el precio de 12).'
    },
    {
      pregunta: '¿Qué pasa si necesito más de 5 usuarios?',
      respuesta: 'Cada usuario adicional cuesta $5.999/mes. También tenemos plan Pro con 15 usuarios por $79.999/mes.'
    },
    {
      pregunta: '¿Los datos están seguros?',
      respuesta: 'Sí, usamos encriptación, backups diarios automáticos y servidores seguros. Cada usuario tiene login y permisos por rol.'
    },
    {
      pregunta: '¿Desde qué dispositivos puedo usarlo?',
      respuesta: 'Desde cualquier dispositivo con navegador web: computadoras, tablets y celulares. Responsive y optimizado para móviles.'
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
              <Chip 
                label="Software desarrollado por Prende" 
                sx={{ 
                  bgcolor: '#FFEB5D', 
                  color: '#000000',
                  fontWeight: 600,
                  mb: 2
                }} 
              />
              <Typography 
                component="h1"
                variant="h2" 
                sx={{ 
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '3rem' }
                }}
              >
                Sistema de Auditoría Prende
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
                Nuestro sistema de Auditoría Prende te permite relevar, registrar y visualizar lo que pasa en tus locales a través de formularios flexibles, carga simple y reportes automáticos listos para analizar y decidir.
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
                    desde $39990 por mes
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#F5F5F5' }}>
                  Incluye 5 usuarios • Formularios ilimitados • Soporte
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
            
            <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2, boxShadow: '0 8px 32px rgba(255, 235, 93, 0.2)' }}>
              {carouselImages.map((img, index) => (
                <Box
                  key={index}
                  component="img"
                  src={img}
                  alt={`Sistema Prende ${index + 1}`}
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

      {/* Funcionalidades Principales */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 6, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
          Funcionalidades principales
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 4 }}>
          {funcionalidades.map((func, index) => (
            <Paper 
              key={index}
              elevation={0}
              sx={{ 
                p: 4,
                bgcolor: '#F5F5F5',
                border: '2px solid #E0E0E0',
                transition: 'all 0.3s',
                '&:hover': {
                  borderColor: '#FFEB5D',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  bgcolor: '#FFFFFF'
                }
              }}
            >
              <Box sx={{ color: '#000000', mb: 2 }}>
                {func.icon}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#000000' }}>
                {func.titulo}
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7 }}>
                {func.descripcion}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>

      {/* Qué Incluye */}
      <Box sx={{ bgcolor: '#E0E0E0', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 6, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
            ¿Qué incluye el plan?
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

      {/* Casos de Uso */}
      <Box sx={{ bgcolor: '#000000', color: '#FFFFFF', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 6, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
            ¿Cómo lo usan otros negocios?
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
            {casosUso.map((caso, index) => (
              <Paper 
                key={index}
                sx={{ 
                  p: 4,
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 235, 93, 0.2)',
                  color: '#FFFFFF'
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#FFEB5D' }}>
                  {caso.titulo}
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.7, color: '#F5F5F5' }}>
                  {caso.descripcion}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Cómo Empezar */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 6, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
          ¿Cómo empezar?
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
                <Typography variant="body1" sx={{ color: '#757575', lineHeight: 1.7 }}>
                  {step.descripcion}
                </Typography>
              </Box>
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
      </Box>

      {/* CTA Final */}
      <Box sx={{ bgcolor: '#FFEB5D', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
            ¿Querés ver el sistema en acción?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, textAlign: 'center', fontWeight: 300 }}>
            Agendá una demo gratuita de 30 minutos y te mostramos cómo funciona
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

export default Sistema;
