import { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, Chip, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import GavelIcon from '@mui/icons-material/Gavel';
import RuleIcon from '@mui/icons-material/Rule';
import BuildIcon from '@mui/icons-material/Build';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PaymentsIcon from '@mui/icons-material/Payments';
import GroupsIcon from '@mui/icons-material/Groups';
import DescriptionIcon from '@mui/icons-material/Description';
import PublicIcon from '@mui/icons-material/Public';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { trackWhatsAppClick, trackServicePageView } from '../utils/analytics';
import { PAISES, PAIS_DEFAULT, getPrecio } from '../data/countries';
import type { PaisConfig } from '../data/countries';
import { detectCountryCode } from '../utils/geo';

const SupervisionCalidad = () => {
  const navigate = useNavigate();
  const [paisSeleccionado, setPaisSeleccionado] = useState<PaisConfig>(PAIS_DEFAULT);

  useEffect(() => {
    trackServicePageView('Supervisión de Calidad');
  }, []);

  useEffect(() => {
    detectCountryCode().then((code) => {
      if (code) {
        const match = PAISES.find((p) => p.code === code);
        if (match) setPaisSeleccionado(match);
      }
    });
  }, []);

  const handleWhatsAppClick = (modalidad: string) => {
    trackWhatsAppClick('SupervisionCalidad', modalidad);
    const whatsappNumber = '5491125453990';
    const message = encodeURIComponent(`Hola! Me interesa Supervisión de Calidad (${modalidad}). ¿Podrían darme más información?`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleVolverServicios = () => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('servicios');
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const funcionalidadesSistema = [
    { icon: <DashboardIcon />, titulo: 'Tablero de control', descripcion: 'Mirá todo lo importante en pantalla: cuántas revisiones se hicieron hoy, qué problemas se repiten más, cómo viene la semana' },
    { icon: <AssignmentIcon />, titulo: 'Formularios personalizables', descripcion: 'Armá tus propias listas de control según lo que necesités revisar. Con 8 tipos de preguntas diferentes' },
    { icon: <CloudOffIcon />, titulo: 'Modo sin internet', descripcion: 'Completá tus revisiones aunque no haya conexión. Cuando vuelve internet, se actualiza todo automáticamente' },
    { icon: <PhotoCameraIcon />, titulo: 'Registro con fotos', descripcion: 'Tomá fotos con el celular y asocialas a cada punto: un baño sucio, un producto mal exhibido, una máquina rota' },
    { icon: <PictureAsPdfIcon />, titulo: 'Reportes automáticos', descripcion: 'Bajá informes en PDF o Excel con un solo click' },
    { icon: <CheckCircleOutlineIcon />, titulo: 'Gestión de roles', descripcion: 'Administradores, auditores y clientes con permisos específicos' },
  ];

  const aspectosRelevables = [
    { icon: <PersonSearchIcon sx={{ fontSize: 32 }} />, titulo: 'Atención y experiencia del cliente', descripcion: 'Mandamos a alguien a comprar, comer o usar tu servicio como un cliente más, sin que tu equipo lo sepa, para evaluar la atención real que reciben.' },
    { icon: <HealthAndSafetyIcon sx={{ fontSize: 32 }} />, titulo: 'Higiene y seguridad', descripcion: 'Revisamos que la limpieza y las condiciones de seguridad se cumplan siempre, no solo cuando saben que los estamos evaluando — clave en una cocina, un consultorio o una planta de producción.' },
    { icon: <GavelIcon sx={{ fontSize: 32 }} />, titulo: 'Cumplimiento normativo', descripcion: 'Verificamos que tengas en regla lo que tu rubro exige: habilitación bromatológica si cocinás, habilitación sanitaria si atendés pacientes, certificaciones si fabricás.' },
    { icon: <RuleIcon sx={{ fontSize: 32 }} />, titulo: 'Procesos y procedimientos', descripcion: 'Evaluamos si tu equipo sigue los procedimientos establecidos, ya sea armar un pedido, atender un turno médico o preparar una instalación para su uso.' },
    { icon: <BuildIcon sx={{ fontSize: 32 }} />, titulo: 'Mantenimiento de equipos e instalaciones', descripcion: 'Revisamos el estado de máquinas, equipamiento e instalaciones, para anticipar una falla antes de que te interrumpa la operación.' },
    { icon: <WorkspacePremiumIcon sx={{ fontSize: 32 }} />, titulo: 'Calidad de producto o servicio', descripcion: 'Comparamos lo que ofrecés con lo que prometés: que el producto salga como corresponde, que el servicio cumpla el estándar esperado, en cualquier rubro.' },
    { icon: <StorefrontIcon sx={{ fontSize: 32 }} />, titulo: 'Imagen y presentación del local', descripcion: 'Evaluamos cómo se ve tu negocio por dentro y por fuera: la fachada, el orden, la exhibición — la primera impresión que se lleva cualquiera que entra.' },
    { icon: <Inventory2Icon sx={{ fontSize: 32 }} />, titulo: 'Stock e inventario', descripcion: 'Contamos la mercadería o los insumos físicos y los comparamos con lo que indica el sistema, para detectar faltantes o errores de carga.' },
    { icon: <PaymentsIcon sx={{ fontSize: 32 }} />, titulo: 'Manejo de caja y valores', descripcion: 'Verificamos el efectivo contra lo que debería haber, para detectar diferencias a tiempo.' },
    { icon: <GroupsIcon sx={{ fontSize: 32 }} />, titulo: 'Desempeño del personal', descripcion: 'Evaluamos puntualidad, cumplimiento de tareas y trato hacia quien tiene enfrente, sea un cliente, un paciente o un socio.' },
    { icon: <DescriptionIcon sx={{ fontSize: 32 }} />, titulo: 'Documentación y registros', descripcion: 'Verificamos que los registros obligatorios estén completos y al día: legajos, certificados, controles — esenciales en rubros como salud o industria.' },
    { icon: <PublicIcon sx={{ fontSize: 32 }} />, titulo: 'Presencia digital', descripcion: 'Revisamos cómo se presenta tu negocio en internet — reseñas, redes, respuesta a comentarios — y si coincide con la experiencia real.' },
  ];

  const proceso = [
    { numero: '1', titulo: 'Elegís tu modalidad', descripcion: 'Solo el sistema, o sistema + auditorías externas' },
    { numero: '2', titulo: 'Alta y capacitación', descripcion: 'Damos de alta a tu equipo y lo capacitamos en el sistema (1 hora)' },
    { numero: '3', titulo: 'Se pone en marcha', descripcion: 'Empezás a usar el sistema y, si sumaste auditorías, coordinamos la primera visita' },
    { numero: '4', titulo: 'Todo ordenado', descripcion: 'Recibís reportes automáticos y, si corresponde, el informe de cada auditoría con plan de mejora' },
  ];

  const otrosServicios = [
    { titulo: 'Plan de Acción', descripcion: 'Una investigación a fondo de tu negocio y un plan para resolverlo' },
    { titulo: 'Tu Sistema a Medida', descripcion: 'Un sistema a medida para gestionar ventas, costos, stock y más' },
  ];

  const faqs = [
    { pregunta: '¿Puedo empezar solo con el sistema y sumar auditorías después?', respuesta: 'Sí, podés cambiar de modalidad cuando quieras, sin perder la información que ya cargaste.' },
    { pregunta: '¿Puedo combinar varios aspectos a relevar?', respuesta: 'Sí, elegís los que tengan sentido para tu negocio — por ejemplo, atención al cliente todos los meses y documentación cada tanto.' },
    { pregunta: '¿Con qué frecuencia se hacen las auditorías externas?', respuesta: 'Lo definimos juntos según tu negocio — lo habitual es cada 3-6 meses, dentro de tu cuota mensual.' },
    { pregunta: '¿El sistema funciona sin internet?', respuesta: 'Sí, tiene modo offline completo. Completás revisiones sin conexión y cuando vuelve internet, se sincroniza solo.' },
    { pregunta: '¿Puedo personalizar los formularios?', respuesta: 'Totalmente. Tenés 8 tipos de preguntas disponibles y formularios ilimitados adaptados a tus procesos.' },
    { pregunta: '¿Es mensual sin compromiso?', respuesta: 'Sí. Si pagás anual, te regalamos 2 meses.' },
    { pregunta: '¿Qué pasa si necesito más de 5 usuarios?', respuesta: 'Cada usuario adicional se cotiza aparte. También tenemos un plan con más usuarios incluidos.' },
    { pregunta: '¿Los datos están seguros?', respuesta: 'Sí, usamos encriptación, backups diarios automáticos y servidores seguros, con login y permisos por rol.' },
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
            sx={{ color: '#FFEB5D', mb: 3, '&:hover': { bgcolor: 'rgba(255, 235, 93, 0.1)' } }}
          >
            Volver a servicios
          </Button>

          <Chip
            label="Elegí tu modalidad"
            sx={{ bgcolor: '#FFEB5D', color: '#000000', fontWeight: 600, mb: 2 }}
          />
          <Typography component="h1" variant="h2" sx={{ fontWeight: 700, mb: 3, fontSize: { xs: '2rem', md: '3rem' } }}>
            Supervisión de Calidad
          </Typography>
          <Typography variant="h5" sx={{ mb: 2, color: '#F5F5F5', fontWeight: 300, lineHeight: 1.6 }}>
            Un sistema propio para controlar tu negocio en todo momento — solo, o con nuestro
            equipo auditando desde afuera para sostener el estándar en el tiempo.
          </Typography>
        </Container>
      </Box>

      {/* Elegí tu modalidad */}
      <Box sx={{ bgcolor: '#E0E0E0', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 4 }}>
            {/* Modalidad 1 */}
            <Box sx={{ bgcolor: '#FFFFFF', borderRadius: 2, border: '2px solid #000000', p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <DashboardIcon sx={{ fontSize: 40 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>Solo el Sistema</Typography>
              <Typography variant="body1" sx={{ color: '#444', lineHeight: 1.6, flexGrow: 1 }}>
                Vos y tu equipo controlan el negocio con nuestra herramienta, sin que nadie de
                Prende vaya a auditar. Ideal si ya tenés quien se encargue de mirar todo, y solo
                te falta dónde anotarlo.
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {getPrecio(paisSeleccionado, 'sistema')} por mes
              </Typography>
              <Button
                variant="contained"
                onClick={() => handleWhatsAppClick('Solo el Sistema')}
                startIcon={<WhatsAppIcon />}
                sx={{ bgcolor: '#25D366', color: '#FFFFFF', fontWeight: 600, '&:hover': { bgcolor: '#1ebe57' } }}
              >
                Probar Gratis 15 Días
              </Button>
            </Box>

            {/* Modalidad 2 */}
            <Box sx={{ bgcolor: '#000000', color: '#FFFFFF', borderRadius: 2, border: '2px solid #FFEB5D', p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <AssignmentIcon sx={{ fontSize: 40, color: '#FFEB5D' }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>Sistema + Auditorías Externas</Typography>
              <Typography variant="body1" sx={{ color: '#F5F5F5', lineHeight: 1.6, flexGrow: 1 }}>
                Además de la herramienta, alguien de Prende va a mirar tu negocio desde afuera
                cada tanto: en persona, por cámara, o como un cliente más. Ideal si querés una
                mirada de afuera que te diga cómo está tu negocio de verdad.
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFEB5D' }}>
                {getPrecio(paisSeleccionado, 'auditorias')} por mes
              </Typography>
              <Button
                variant="contained"
                onClick={() => handleWhatsAppClick('Sistema + Auditorías Externas')}
                startIcon={<WhatsAppIcon />}
                sx={{ bgcolor: '#FFEB5D', color: '#000000', fontWeight: 600, '&:hover': { bgcolor: '#FFE135' } }}
              >
                Consultar
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Aspectos que podés relevar */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
          Aspectos que podés relevar
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, textAlign: 'center', color: '#666', maxWidth: '650px', mx: 'auto' }}>
          Disponibles con la modalidad Sistema + Auditorías Externas — combinalos según lo que tu negocio necesite
        </Typography>
        <Typography variant="body2" sx={{ mb: 6, textAlign: 'center', color: '#999', maxWidth: '650px', mx: 'auto' }}>
          Cada relevamiento se hace de la forma que corresponda: en persona, por cámara, o de incógnito como un cliente más.
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {aspectosRelevables.map((aspecto, index) => (
            <Box key={index} sx={{ border: '1.5px solid #E0E0E0', borderRadius: 2, p: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ color: '#000' }}>{aspecto.icon}</Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{aspecto.titulo}</Typography>
              <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>{aspecto.descripcion}</Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Qué incluye el sistema */}
      <Box sx={{ bgcolor: '#E0E0E0', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
            ¿Qué incluye el sistema?
          </Typography>
          <Typography variant="body1" sx={{ mb: 6, textAlign: 'center', color: '#666' }}>
            Disponible en las dos modalidades
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
            {funcionalidadesSistema.map((func, index) => (
              <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ color: '#000' }}>{func.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{func.titulo}</Typography>
                <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>{func.descripcion}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Cómo funciona */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
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
                borderBottom: index < proceso.length - 1 ? '1px solid #E0E0E0' : 'none',
              }}
            >
              <Box sx={{ width: { xs: 50, md: 60 }, height: { xs: 50, md: 60 }, borderRadius: '50%', bgcolor: '#FFEB5D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                {step.numero}
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>{step.titulo}</Typography>
                <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7 }}>{step.descripcion}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Para quién es */}
      <Box sx={{ bgcolor: '#000000', color: '#FFFFFF', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
            ¿Para quién es este servicio?
          </Typography>
          <Typography variant="h6" sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', lineHeight: 1.8, fontWeight: 300 }}>
            Dueños de <Box component="span" sx={{ color: '#FFEB5D', fontWeight: 600 }}>pymes</Box> que
            quieren saber qué pasa en su negocio en todo momento — sea porque ya trabajaron un
            problema puntual con nosotros y quieren sostener lo logrado, o porque directamente
            buscan <Box component="span" sx={{ color: '#FFEB5D', fontWeight: 600 }}>control constante</Box>,
            con o sin auditorías externas.
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
            <Box key={index} sx={{ border: '1.5px solid #E0E0E0', borderRadius: 2, p: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <ArrowForwardIcon sx={{ color: '#000', fontSize: 24 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{item.titulo}</Typography>
              <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>{item.descripcion}</Typography>
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
                sx={{ mb: 2, bgcolor: '#FFFFFF', border: '1px solid #E0E0E0', '&:before': { display: 'none' }, borderRadius: '8px !important' }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ py: 2, '& .MuiAccordionSummary-content': { my: 1 } }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{faq.pregunta}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0, pb: 3 }}>
                  <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7 }}>{faq.respuesta}</Typography>
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
            ¿Con cuál arrancamos?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => handleWhatsAppClick('Solo el Sistema')}
              startIcon={<WhatsAppIcon />}
              sx={{ bgcolor: '#000000', color: '#FFFFFF', fontWeight: 600, px: 4, py: 2, '&:hover': { bgcolor: '#333333' } }}
            >
              Probar Gratis 15 Días
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => handleWhatsAppClick('Sistema + Auditorías Externas')}
              startIcon={<WhatsAppIcon />}
              sx={{ borderColor: '#000000', color: '#000000', fontWeight: 600, px: 4, py: 2, '&:hover': { borderColor: '#000', bgcolor: 'rgba(0,0,0,0.05)' } }}
            >
              Consultar Auditorías
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default SupervisionCalidad;
