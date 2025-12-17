import { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, Paper, Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SchoolIcon from '@mui/icons-material/School';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Consultoria = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  const carouselImages = [
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const handleWhatsAppClick = () => {
    const whatsappNumber = '5491100000000';
    const message = encodeURIComponent('Hola! Me interesa el servicio de Consultoría Comercial Aplicada. ¿Podrían darme más información?');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const areas = [
    { 
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />, 
      titulo: 'Estrategia comercial', 
      descripcion: 'Plan de ventas, segmentación de clientes, pricing, canales de venta y estrategia de crecimiento' 
    },
    { 
      icon: <AssessmentIcon sx={{ fontSize: 40 }} />, 
      titulo: 'Análisis de márgenes', 
      descripcion: 'Revisión de costos, rentabilidad por producto/servicio, optimización de precios y estructura de gastos' 
    },
    { 
      icon: <PeopleIcon sx={{ fontSize: 40 }} />, 
      titulo: 'Capacitación comercial', 
      descripcion: 'Entrenamiento en técnicas de venta, atención al cliente, gestión de objeciones y cierre de ventas' 
    },
    { 
      icon: <SchoolIcon sx={{ fontSize: 40 }} />, 
      titulo: 'Implementación acompañada', 
      descripcion: 'No solo te decimos qué hacer, trabajamos juntos en la implementación con seguimiento semanal' 
    }
  ];

  const incluye = [
    'Diagnóstico comercial completo',
    'Análisis de costos y márgenes',
    'Plan estratégico personalizado',
    'Reuniones semanales de seguimiento',
    'Capacitación al equipo comercial',
    'Herramientas y templates de gestión',
    'Tablero de control con KPIs',
    'Acompañamiento en implementación',
    'Soporte vía WhatsApp ilimitado',
    'Ajustes y revisión mensual del plan'
  ];

  const noIncluye = [
    'Ejecución completa sin participación tuya (trabajamos juntos)',
    'Software de gestión o CRM (te recomendamos y ayudamos a implementar)',
    'Publicidad paga o campañas de marketing digital (podemos gestionarlas con costo aparte)',
    'Garantía de resultados específicos (depende de la implementación)',
    'Viajes y viáticos fuera de CABA/GBA (se cotizan aparte)'
  ];

  const proceso = [
    { 
      numero: '1', 
      titulo: 'Diagnóstico inicial (Semana 1)', 
      descripcion: 'Entrevistas con equipo, revisión de números, análisis de procesos comerciales. Entregamos diagnóstico con hallazgos críticos.' 
    },
    { 
      numero: '2', 
      titulo: 'Plan estratégico (Semanas 2-3)', 
      descripcion: 'Co-diseñamos el plan comercial con objetivos, acciones priorizadas, responsables y timeline. Presentación y aprobación.' 
    },
    { 
      numero: '3', 
      titulo: 'Implementación Fase 1 (Mes 2)', 
      descripcion: 'Arrancamos con acciones de alto impacto. Reuniones semanales de seguimiento, ajustes según avance.' 
    },
    { 
      numero: '4', 
      titulo: 'Implementación Fase 2 (Mes 3)', 
      descripcion: 'Profundizamos con mejoras en procesos, capacitación al equipo y optimización de herramientas.' 
    },
    { 
      numero: '5', 
      titulo: 'Consolidación (Meses 4-6)', 
      descripcion: 'Tu equipo opera de forma autónoma con nuestro soporte. Reuniones quincenales de revisión y ajuste.' 
    },
    { 
      numero: '6', 
      titulo: 'Cierre y evaluación', 
      descripcion: 'Medición de resultados vs objetivos, documentación de aprendizajes y recomendaciones para continuar.' 
    }
  ];

  const resultadosEsperados = [
    'Aumento del 20-40% en ventas en 6 meses',
    'Mejora de 5-10 puntos en margen operativo',
    'Procesos comerciales documentados y estandarizados',
    'Equipo capacitado en técnicas de venta',
    'Tablero de control con métricas clave',
    'Autonomía operativa sin dependencia del consultor'
  ];

  const paraQuien = [
    {
      perfil: 'Negocios estancados',
      descripcion: 'Venís facturando lo mismo hace meses, necesitás una estrategia clara para crecer.'
    },
    {
      perfil: 'Márgenes ajustados',
      descripcion: 'Vendés mucho pero no te queda rentabilidad. Necesitás revisar costos y precios.'
    },
    {
      perfil: 'Expansión',
      descripcion: 'Querés abrir nuevos locales o canales de venta y necesitás planificación.'
    },
    {
      perfil: 'Equipo sin dirección',
      descripcion: 'Tu equipo comercial no tiene objetivos claros ni procesos definidos.'
    }
  ];

  const faqs = [
    {
      pregunta: '¿Trabajan conmigo o lo hacen por mí?',
      respuesta: 'Trabajamos juntos. No somos un servicio "llave en mano". Nosotros aportamos la estrategia, metodología y acompañamiento, pero vos y tu equipo ejecutan con nuestro apoyo. Esto garantiza que cuando terminemos, tengan las capacidades instaladas.'
    },
    {
      pregunta: '¿Cuánto dura el proyecto?',
      respuesta: 'El proyecto estándar es de 3-6 meses dependiendo de los objetivos. Los primeros 3 meses son intensivos (reuniones semanales) y los últimos 3 son de consolidación (reuniones quincenales). Podemos adaptar la duración según necesidades.'
    },
    {
      pregunta: '¿Qué pasa si no veo resultados?',
      respuesta: 'Los resultados dependen de la implementación conjunta. En el primer mes hacemos diagnóstico y plan. Si al mes 2 no ves avances, revisamos el enfoque sin costo adicional. No garantizamos resultados mágicos, pero sí compromiso total.'
    },
    {
      pregunta: '¿Es presencial o remoto?',
      respuesta: 'Híbrido. Primera reunión presencial obligatoria para diagnóstico. Luego, reuniones semanales por videollamada y 1-2 visitas presenciales por mes. Para negocios fuera de CABA/GBA, se cotizan viáticos.'
    },
    {
      pregunta: '¿Puedo combinar con otros servicios?',
      respuesta: 'Sí, de hecho es recomendable. Muchos clientes arrancan con una Auditoría para identificar problemas, luego Consultoría para implementar mejoras, y finalmente adoptan nuestro Sistema para mantener el control.'
    },
    {
      pregunta: '¿Incluye capacitación al equipo?',
      respuesta: 'Sí, incluye capacitación práctica al equipo comercial en técnicas de venta, atención al cliente y uso de herramientas. No son capacitaciones teóricas, sino aplicadas a tu negocio específico.'
    },
    {
      pregunta: '¿Qué industrias atienden?',
      respuesta: 'Especializados en pymes de gastronomía, retail y servicios. Tenemos experiencia en restaurantes, locales comerciales, gimnasios, clínicas y empresas de servicios. Si tu rubro es distinto, consultanos disponibilidad.'
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
                label="Para negocios que quieren crecer" 
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
                Consultoría Comercial Aplicada
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
                Estrategia + implementación + resultados. No solo te decimos qué hacer, trabajamos juntos hasta que funcione
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
                    desde 129990
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#F5F5F5' }}>
                  Duración: 3-6 meses • Reuniones semanales • Soporte ilimitado
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
                  alt={`Consultoría ${index + 1}`}
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

      {/* Áreas de Trabajo */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
          En qué trabajamos juntos
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 4 }}>
          {areas.map((area, index) => (
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
                {area.icon}
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#000000' }}>
                {area.titulo}
              </Typography>
              <Typography variant="body1" sx={{ color: '#424242', lineHeight: 1.7 }}>
                {area.descripcion}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>

      {/* Qué Incluye */}
      <Box sx={{ bgcolor: '#E0E0E0', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
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
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2, maxWidth: 1000, mx: 'auto' }}>
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

      {/* Cómo Funciona */}
      <Box sx={{ bgcolor: '#000000', color: '#FFFFFF', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
            ¿Cómo funciona el proceso?
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
                  borderBottom: index < proceso.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                }}
              >
                <Box 
                  sx={{
                    width: { xs: 50, md: 60 },
                    height: { xs: 50, md: 60 },
                    borderRadius: '50%',
                    bgcolor: '#FFEB5D',
                    color: '#000000',
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
                  <Typography variant="body1" sx={{ color: '#F5F5F5', lineHeight: 1.7 }}>
                    {step.descripcion}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Resultados Esperados */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
          Resultados que buscamos juntos
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, maxWidth: 900, mx: 'auto' }}>
          {resultadosEsperados.map((resultado, index) => (
            <Paper 
              key={index}
              elevation={0}
              sx={{ 
                p: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                border: '2px solid #FFEB5D',
                bgcolor: '#FFFEF5'
              }}
            >
              <TrendingUpIcon sx={{ color: '#FFEB5D', fontSize: 32 }} />
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {resultado}
              </Typography>
            </Paper>
          ))}
        </Box>
        <Typography 
          variant="body2" 
          sx={{ 
            textAlign: 'center', 
            mt: 4, 
            color: '#757575',
            fontStyle: 'italic',
            maxWidth: 700,
            mx: 'auto'
          }}
        >
          *Los resultados dependen del compromiso en la implementación y condiciones del mercado. No garantizamos números específicos, pero sí metodología probada y acompañamiento total.
        </Typography>
      </Container>

      {/* Para Quién Es */}
      <Box sx={{ bgcolor: '#E0E0E0', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
            ¿Para quién es este servicio?
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 4 }}>
            {paraQuien.map((item, index) => (
              <Paper 
                key={index}
                elevation={0}
                sx={{ 
                  p: 4,
                  bgcolor: '#FFFFFF',
                  border: '1px solid #E0E0E0'
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#FFEB5D' }}>
                  {item.perfil}
                </Typography>
                <Typography variant="body1" sx={{ color: '#757575', lineHeight: 1.7 }}>
                  {item.descripcion}
                </Typography>
              </Paper>
            ))}
          </Box>
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
            ¿Listo para hacer crecer tu negocio?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, textAlign: 'center', fontWeight: 300 }}>
            Charlemos sobre tus objetivos y armemos un plan a medida
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

export default Consultoria;
