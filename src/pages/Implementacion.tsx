import { Box, Button, Container, Typography, Paper, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Implementacion = () => {
  const navigate = useNavigate();

  const handleWhatsAppClick = () => {
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
        'Analizamos tus procesos actuales: cómo gestionás ventas, reservas, costos, stock o lo que sea relevante para tu negocio. Identificamos brechas y definimos el alcance exacto del sistema.',
    },
    {
      numero: '02',
      titulo: 'Diseño del sistema',
      duracion: 'Semanas 3-4',
      descripcion:
        'Diseñamos la arquitectura de la solución: qué herramientas usar, cómo se conectan y qué hace cada parte. Presentamos la propuesta y ajustamos con vos antes de empezar a implementar.',
    },
    {
      numero: '03',
      titulo: 'Implementación',
      duracion: 'Mes 2',
      descripcion:
        'Configuramos las herramientas, armamos las bases de datos, las vistas y los flujos automatizados. Conectamos integraciones si se necesitan (WhatsApp, Google, etc.). Iteramos hasta que funcione.',
    },
    {
      numero: '04',
      titulo: 'Capacitación y entrega',
      duracion: 'Mes 3',
      descripcion:
        'Capacitamos al equipo en el uso del sistema. Verificamos que se cumplen los objetivos del diagnóstico. Entregamos la documentación y queda todo operativo de forma autónoma.',
    },
  ];

  const incluye = [
    'Relevamiento y análisis de procesos',
    'Diseño de arquitectura del sistema',
    'Configuración de Airtable y/o Notion',
    'Integraciones con herramientas externas',
    'Documentación de uso y procesos',
    'Capacitación del equipo',
    'Verificación de objetivos al cierre',
    'Soporte durante todo el proyecto',
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

  const herramientas = [
    {
      nombre: 'Airtable',
      descripcion:
        'Bases de datos flexibles para gestionar reservas, inventario, ventas, CRM o cualquier proceso que necesite estructura.',
    },
    {
      nombre: 'Notion',
      descripcion:
        'Documentación operativa, wikis internas, tableros de seguimiento y organización del equipo en un solo lugar.',
    },
    {
      nombre: 'Integraciones',
      descripcion:
        'WhatsApp API, Google Sheets, formularios, automatizaciones y más. Lo que el proyecto necesite.',
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

          <Box sx={{ maxWidth: 720 }}>
            <Chip
              label="Proyecto · 2-3 meses · Airtable + Notion"
              sx={{ bgcolor: '#FFEB5D', color: '#000000', fontWeight: 600, mb: 2 }}
            />
            <Typography
              component="h1"
              variant="h2"
              sx={{ fontWeight: 700, mb: 3, fontSize: { xs: '2rem', md: '3rem' } }}
            >
              Implementación a medida
            </Typography>
            <Typography
              variant="h5"
              sx={{ mb: 3, color: '#F5F5F5', fontWeight: 300, lineHeight: 1.6 }}
            >
              Organizamos la operación de tu negocio con herramientas digitales accesibles: Airtable,
              Notion y las integraciones que necesitás. Sin sistemas caros ni desarrollos a medida.
            </Typography>
            <Typography variant="body1" sx={{ color: '#CCCCCC', mb: 5, lineHeight: 1.8 }}>
              En 2-3 meses diseñamos e implementamos un sistema hecho para tu negocio específico. Al
              terminar, tu equipo opera solo — sin depender de nosotros.
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

      {/* Herramientas */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 2, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}
        >
          Herramientas que usamos
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#666', textAlign: 'center', mb: 6, maxWidth: 600, mx: 'auto' }}
        >
          No estamos atados a una sola herramienta. Elegimos según el negocio y sus necesidades.
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {herramientas.map((tool) => (
            <Paper
              key={tool.nombre}
              elevation={0}
              sx={{
                p: 4,
                textAlign: 'center',
                border: '2px solid #E0E0E0',
                borderRadius: 2,
                transition: 'all 0.3s',
                '&:hover': {
                  borderColor: '#FFEB5D',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                {tool.nombre}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.7 }}>
                {tool.descripcion}
              </Typography>
            </Paper>
          ))}
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
