import { Box, Button, Container, Typography, Paper, Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
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

const Sistema = () => {
  const handleWhatsAppClick = () => {
    const whatsappNumber = '5491100000000';
    const message = encodeURIComponent('Hola! Me interesa el Sistema de Auditoría Prende. ¿Podrían darme una demo?');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const funcionalidades = [
    { icon: <DashboardIcon />, titulo: 'Dashboard con KPIs', descripcion: 'Visualizá indicadores clave en tiempo real: auditorías completadas, problemas detectados, tendencias' },
    { icon: <AssignmentIcon />, titulo: 'Formularios personalizables', descripcion: 'Creá checklists adaptados a tu negocio con 8 tipos de preguntas (texto, sí/no, opciones múltiples, etc.)' },
    { icon: <CloudOffIcon />, titulo: 'Modo offline', descripcion: 'Completá auditorías sin internet y sincronizá automáticamente cuando vuelvas online' },
    { icon: <PhotoCameraIcon />, titulo: 'Evidencias fotográficas', descripcion: 'Capturá fotos directamente desde el móvil y asocialas a cada hallazgo' },
    { icon: <PictureAsPdfIcon />, titulo: 'Reportes automáticos', descripcion: 'Generá PDFs profesionales y exportaciones a Excel con un click' },
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
    { numero: '3', titulo: 'Período de prueba', descripcion: 'Empezás a usar el sistema con soporte activo durante 15 días' },
    { numero: '4', titulo: 'Go-live', descripcion: 'Sistema en producción con tu equipo operando de forma autónoma' },
    { numero: '5', titulo: 'Soporte continuo', descripcion: 'Asistencia por email y actualizaciones automáticas sin costo adicional' }
  ];

  const faqs = [
    {
      pregunta: '¿Funciona sin internet?',
      respuesta: 'Sí, el sistema tiene modo offline completo. Podés completar auditorías sin conexión y cuando vuelvas a tener internet, se sincroniza automáticamente. Ideal para locales con WiFi inestable o auditorías en campo.'
    },
    {
      pregunta: '¿Puedo personalizar los formularios?',
      respuesta: 'Totalmente. Tenés 8 tipos de preguntas disponibles: texto corto/largo, sí/no, opción múltiple, escala numérica, fecha, hora y evidencia fotográfica. Podés crear formularios ilimitados adaptados a tus procesos.'
    },
    {
      pregunta: '¿Incluye capacitación?',
      respuesta: 'Sí, incluye 1 hora de capacitación virtual para tu equipo. Además, el sistema es intuitivo y tiene tooltips en cada sección. Si necesitás capacitación adicional, podemos cotizarla.'
    },
    {
      pregunta: '¿Es mensual o anual el pago?',
      respuesta: 'El precio base de $39.999 es mensual. Ofrecemos 2 meses de regalo si pagás anual (10 meses por el precio de 12). Sin compromiso de permanencia, podés cancelar cuando quieras.'
    },
    {
      pregunta: '¿Qué pasa si necesito más de 5 usuarios?',
      respuesta: 'Cada usuario adicional tiene un costo de $5.999/mes. También tenemos un plan Pro con 15 usuarios por $79.999/mes que incluye soporte prioritario.'
    },
    {
      pregunta: '¿Los datos están seguros?',
      respuesta: 'Sí, usamos encriptación de datos, backups diarios automáticos y servidores seguros. Cada usuario tiene su propio login y los permisos se manejan por roles.'
    },
    {
      pregunta: '¿Desde qué dispositivos puedo usarlo?',
      respuesta: 'Desde cualquier dispositivo con navegador web: computadoras (Windows/Mac), tablets y celulares (iOS/Android). Responsive y optimizado para móviles.'
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
                Tu negocio bajo control con el sistema web que usamos nosotros: formularios personalizables, modo offline y reportes automáticos
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
                    desde 39990/mes
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
            
            <Box 
              component="img"
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
              alt="Dashboard del sistema"
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

      {/* Funcionalidades Principales */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
          Funcionalidades principales
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 4 }}>
          {funcionalidades.map((func, index) => (
            <Paper 
              key={index}
              elevation={0}
              sx={{ 
                p: 4,
                border: '1px solid #F5F5F5',
                transition: 'all 0.3s',
                '&:hover': {
                  borderColor: '#FFEB5D',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Box sx={{ color: '#FFEB5D', mb: 2 }}>
                {func.icon}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {func.titulo}
              </Typography>
              <Typography variant="body2" sx={{ color: '#757575', lineHeight: 1.7 }}>
                {func.descripcion}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>

      {/* Qué Incluye */}
      <Box sx={{ bgcolor: '#E0E0E0', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
            ¿Qué incluye el plan?
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
                  bgcolor: '#FFFFFF'
                }}
              >
                <CheckCircleOutlineIcon sx={{ color: '#FFEB5D', fontSize: 28 }} />
                <Typography variant="body1">{item}</Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Qué NO Incluye */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
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
                border: '1px solid #F5F5F5'
              }}
            >
              <CancelOutlinedIcon sx={{ color: '#757575', fontSize: 28 }} />
              <Typography variant="body2" sx={{ color: '#757575' }}>{item}</Typography>
            </Paper>
          ))}
        </Box>
      </Container>

      {/* Casos de Uso */}
      <Box sx={{ bgcolor: '#000000', color: '#FFFFFF', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
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
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
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
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
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
