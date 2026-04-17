import { Box, Button, Container, Typography, Paper, Chip } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { trackWhatsAppClick, trackServicePageView } from '../utils/analytics';

const Implementacion = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackServicePageView('Proyectos a medida');
  }, []);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('Proyectos a medida', 'Hero');
    const whatsappNumber = '5491125453990';
    const message = encodeURIComponent(
      'Hola! Me interesa el servicio de Implementación a medida. ¿Podrían darme más información sobre mi proyecto?'
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleVolverServicios = () => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('servicios');
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const fases = [
    {
      numero: '01',
      titulo: 'Diagnóstico',
      duracion: 'Semanas 1-2',
      descripcion:
        'Analizamos tus procesos actuales: cómo gestionás ventas, reservas, costos, stock o lo que sea relevante para tu negocio. Identificamos qué falla y definimos el alcance del trabajo.',
    },
    {
      numero: '02',
      titulo: 'Diseño de la solución',
      duracion: 'Semanas 3-4',
      descripcion:
        'Diseñamos cómo va a funcionar todo: qué procesos resolvemos, cómo se conectan y qué va a ver cada persona. Presentamos la propuesta y ajustamos con vos antes de arrancar.',
    },
    {
      numero: '03',
      titulo: 'Implementación',
      duracion: 'Semanas 5-8',
      descripcion:
        'Configuramos todo lo necesario: bases de datos, vistas, automatizaciones e integraciones. Iteramos con vos hasta que funcione tal como lo necesitás.',
    },
    {
      numero: '04',
      titulo: 'Capacitación y entrega',
      duracion: 'Semanas finales',
      descripcion:
        'Capacitamos al equipo para que usen todo sin depender de nosotros. Verificamos que se cumplieron los objetivos del diagnóstico y entregamos la documentación.',
    },
  ];

  const incluye = [
    'Relevamiento y análisis de procesos',
    'Diseño de la solución a medida',
    'Configuración e implementación completa',
    'Integraciones con otras herramientas',
    'Documentación de uso y procesos',
    'Capacitación del equipo',
    'Verificación de objetivos al cierre',
    'Soporte durante todo el proyecto',
  ];

  const alcance = [
    {
      titulo: 'Seguimiento de clientes y ventas',
      descripcion:
        'Un lugar centralizado para gestionar leads, oportunidades y clientes activos. Tu equipo sabe en qué estado está cada relación comercial y qué tiene que hacer.',
    },
    {
      titulo: 'Reservas, turnos y agenda',
      descripcion:
        'Gestión de disponibilidad, reservas de espacios o recursos. Sin idas y vueltas por WhatsApp, sin hojas de papel ni planillas que nadie actualiza.',
    },
    {
      titulo: 'Control de costos y rentabilidad',
      descripcion:
        'Registro de gastos por proyecto o producto, análisis de márgenes, seguimiento de presupuesto. Sabés cuánto ganás antes de cobrar.',
    },
    {
      titulo: 'Operaciones del equipo',
      descripcion:
        'Checklists, tareas y procesos documentados. Tu equipo sabe qué tiene que hacer en cada momento sin que estés presente ni repitas lo mismo siempre.',
    },
    {
      titulo: 'Stock e inventario',
      descripcion:
        'Seguimiento de materiales, insumos o productos. Alertas de reposición y consumos por trabajo o período. Dejás de perder plata por desorden.',
    },
    {
      titulo: 'Reportes y tableros de control',
      descripcion:
        'Resúmenes automáticos de lo que más importa: ventas, rentabilidad, estado de proyectos. Sin armar planillas a mano ni buscar datos en mil lugares.',
    },
  ];

  const modalidades = [
    {
      titulo: 'Módulo puntual',
      descripcion:
        'Resolvemos un problema específico en pocas semanas. Ideal si ya sabés qué falla y querés atacarlo rápido.',
    },
    {
      titulo: 'Proyecto integral',
      descripcion:
        'Ordenamos varios procesos en simultáneo o por etapas. Cada módulo se conecta con el siguiente para que todo funcione como un solo flujo.',
    },
    {
      titulo: 'Con seguimiento',
      descripcion:
        'Además de implementar, nos quedamos acompañando por un período. Para los proyectos que necesitan ajustes en movimiento.',
    },
  ];

  const paraQuien = [
    {
      perfil: 'Gestión en papel o Excel',
      descripcion:
        'Llevás reservas, ventas o costos en planillas o a mano y querés un sistema que realmente funcione.',
    },
    {
      perfil: 'Procesos que dependen de vos',
      descripcion:
        'Tu equipo no sabe qué hacer sin que estés presente. Todo el conocimiento operativo está en tu cabeza.',
    },
    {
      perfil: 'Querés crecer con orden',
      descripcion:
        'El negocio crece y la forma en que lo manejabas antes ya no alcanza. Necesitás una base sólida.',
    },
    {
      perfil: 'Sin querer un sistema complejo',
      descripcion:
        'Buscás algo que funcione, que puedas mantener y que no requiera soporte técnico permanente.',
    },
  ];



  return (
    <Box sx={{ bgcolor: '#FFFFFF' }}>
      <Header />

      {/* Hero */}
      <Box
        sx={{
          bgcolor: '#000000',
          color: '#FFFFFF',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          pt: { xs: 14, md: 18 },
          pb: { xs: 10, md: 14 },
        }}
      >
        <Container maxWidth="lg">
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

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
            <Box>
              <Chip
                label="Consultoría operativa · A medida"
                sx={{ bgcolor: '#FFEB5D', color: '#000000', fontWeight: 600, mb: 2 }}
              />
              <Typography
                component="h1"
                variant="h2"
                sx={{ fontWeight: 700, mb: 3, fontSize: { xs: '2rem', md: '3rem' } }}
              >
                Proyectos a medida
              </Typography>
              <Typography
                variant="h5"
                sx={{ mb: 3, color: '#F5F5F5', fontWeight: 300, lineHeight: 1.6 }}
              >
                Cada negocio es distinto. Por eso diseñamos soluciones concretas,
                pensadas para cómo trabajás vos.
              </Typography>
              <Typography variant="body1" sx={{ color: '#CCCCCC', mb: 5, lineHeight: 1.8 }}>
                Arrancamos entendiendo tu operación. Diseñamos la solución, la implementamos
                y capacitamos a tu equipo — en pocas semanas, con resultados concretos.
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
                  fontSize: '1rem',
                  '&:hover': { bgcolor: '#1ebe57' },
                }}
              >
                Consultá tu proyecto
              </Button>
            </Box>

            <Box
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(255, 235, 93, 0.15)',
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop"
                alt="Panel de gestión de negocio"
                sx={{
                  width: '100%',
                  height: { xs: 240, md: 420 },
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Para quién */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 2, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}
        >
          ¿Para quién es esto?
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#666', textAlign: 'center', mb: 6, maxWidth: 600, mx: 'auto' }}
        >
          Pensado para negocios pequeños y medianos que necesitan orden operativo sin complejidad técnica.
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 3,
          }}
        >
          {paraQuien.map((item, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 3,
                bgcolor: '#F5F5F5',
                border: '2px solid #E0E0E0',
                borderRadius: 2,
                transition: 'all 0.3s',
                '&:hover': {
                  borderColor: '#FFEB5D',
                  transform: 'translateY(-4px)',
                  bgcolor: '#FFFFFF',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                {item.perfil}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.7 }}>
                {item.descripcion}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>

      {/* Fases */}
      <Box sx={{ bgcolor: '#E0E0E0', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, mb: 2, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}
          >
            Cómo trabajamos
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#666', textAlign: 'center', mb: 6, maxWidth: 600, mx: 'auto' }}
          >
            Cuatro fases claras, con entregables concretos en cada etapa.
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: 3,
            }}
          >
            {fases.map((fase) => (
              <Paper
                key={fase.numero}
                elevation={0}
                sx={{ p: 4, bgcolor: '#FFFFFF', borderRadius: 2, border: '2px solid #E0E0E0' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      bgcolor: '#FFEB5D',
                      color: '#000',
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      flexShrink: 0,
                    }}
                  >
                    {fase.numero}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                      {fase.titulo}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#888' }}>
                      {fase.duracion}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.7 }}>
                  {fase.descripcion}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Alcance: qué podemos resolver */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 2, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}
        >
          ¿Qué podemos resolver?
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#666', textAlign: 'center', mb: 6, maxWidth: 640, mx: 'auto' }}
        >
          Cada proyecto es distinto, pero siempre parte del mismo lugar: hay algo que no funciona y
          queremos dejarlo funcionando. Algunos ejemplos de lo que podemos trabajar:
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 3,
          }}
        >
          {alcance.map((item) => (
            <Paper
              key={item.titulo}
              elevation={0}
              sx={{
                p: 3,
                bgcolor: '#F5F5F5',
                border: '2px solid #E0E0E0',
                borderRadius: 2,
                transition: 'all 0.3s',
                '&:hover': {
                  borderColor: '#FFEB5D',
                  transform: 'translateY(-4px)',
                  bgcolor: '#FFFFFF',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                {item.titulo}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.7 }}>
                {item.descripcion}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* Modalidades */}
        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}
          >
            ¿Cómo se estructura el trabajo?
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#666', textAlign: 'center', mb: 4, maxWidth: 560, mx: 'auto' }}
          >
            Cada proyecto puede tomar distintas formas según lo que necesitás.
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {modalidades.map((m) => (
              <Paper
                key={m.titulo}
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  border: '2px solid #000000',
                  borderRadius: 2,
                  bgcolor: '#FFFFFF',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                  {m.titulo}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.7 }}>
                  {m.descripcion}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Qué incluye */}
      <Box sx={{ bgcolor: '#E0E0E0', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, mb: 6, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}
          >
            ¿Qué incluye el proyecto?
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: 3,
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            {incluye.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircleOutlineIcon sx={{ color: '#000', fontSize: 28, flexShrink: 0 }} />
                <Typography variant="body1" sx={{ color: '#000', fontWeight: 500 }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Final */}
      <Box sx={{ bgcolor: '#000000', color: '#FFFFFF', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Contanos tu proyecto
          </Typography>
          <Typography variant="body1" sx={{ color: '#CCCCCC', mb: 4, lineHeight: 1.7 }}>
            Cada negocio es distinto. Cuánto antes nos contás qué necesitás, más rápido podemos armar
            una propuesta concreta.
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
              px: 5,
              py: 2,
              fontSize: '1.1rem',
              '&:hover': { bgcolor: '#1ebe57' },
            }}
          >
            Escribinos por WhatsApp
          </Button>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default Implementacion;
