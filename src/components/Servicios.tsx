import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface Servicio {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  route: string;
}

const servicios: Servicio[] = [
  {
    id: 1,
    icon: <DashboardIcon sx={{ fontSize: 48 }} />,
    title: 'Sistema de auditoría Prende',
    description:
      'Plataforma para registrar auditorías, generar puntajes, informes y KPIs de forma simple.',
    price: 'desde $39990/mes',
    route: '/sistema',
  },
  {
    id: 2,
    icon: <AssignmentIcon sx={{ fontSize: 48 }} />,
    title: 'Auditorías comerciales y operativas',
    description:
      'Evaluación presencial o remota del cumplimiento operativo, atención al cliente y estándares comerciales.',
    price: 'desde $79990/mes',
    route: '/auditorias',
  },
  {
    id: 3,
    icon: <TrendingUpIcon sx={{ fontSize: 48 }} />,
    title: 'Consultoría comercial aplicada',
    description:
      'Análisis de resultados, recomendaciones prácticas y acompañamiento para mejorar ventas y procesos.',
    price: 'desde $129990',
    route: '/consultoria',
  },
];

const Servicios = () => {
  const navigate = useNavigate();

  const handleServicioClick = (route: string) => {
    navigate(route);
    window.scrollTo(0, 0);
  };

  return (
    <Box
      id="servicios"
      sx={{
        bgcolor: '#E0E0E0',
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        {/* Encabezado de sección */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
              fontWeight: 700,
              color: '#000000',
              mb: 2,
            }}
          >
            Servicios
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              color: '#666666',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Soluciones prácticas para que tu negocio funcione mejor y venda más
          </Typography>
        </Box>

        {/* Grid de servicios */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
            },
            gap: { xs: 3, md: 4 },
          }}
        >
          {servicios.map((servicio) => (
            <Box 
              key={servicio.id}
              onClick={() => handleServicioClick(servicio.route)}
              sx={{ cursor: 'pointer' }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: '#FFFFFF',
                  border: '2px solid #000000',
                  borderRadius: 2,
                  boxShadow: 'none',
                  position: 'relative',
                  overflow: 'visible',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                    borderColor: '#FFEB5D',
                  },
                }}
              >
                {/* Badge de precio en la esquina */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -12,
                    right: 16,
                    bgcolor: '#FFEB5D',
                    color: '#000000',
                    px: 2,
                    py: 0.75,
                    borderRadius: 1,
                    border: '2px solid #000000',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    zIndex: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {servicio.price}
                  </Typography>
                </Box>

                <CardContent
                  sx={{
                    p: { xs: 2.5, md: 4 },
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                  }}
                >
                  {/* Ícono */}
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: { xs: 64, md: 80 },
                      height: { xs: 64, md: 80 },
                      bgcolor: '#FFEB5D',
                      borderRadius: 2,
                      mb: { xs: 2, md: 3 },
                      color: '#000000',
                    }}
                  >
                    {servicio.icon}
                  </Box>

                  {/* Título */}
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: '1.125rem', md: '1.5rem' },
                      fontWeight: 700,
                      color: '#000000',
                      mb: { xs: 1.5, md: 2 },
                      minHeight: { md: '60px' },
                      lineHeight: 1.3,
                    }}
                  >
                    {servicio.title}
                  </Typography>

                  {/* Descripción */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      color: '#666666',
                      mb: 2,
                      flexGrow: 1,
                      lineHeight: 1.5,
                    }}
                  >
                    {servicio.description}
                  </Typography>

                  {/* Texto CTA */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: '0.875rem', md: '0.95rem' },
                      fontWeight: 600,
                      color: '#000000',
                      textAlign: 'center',
                      mt: 'auto',
                      pt: 2,
                      borderTop: '1px solid #E0E0E0',
                    }}
                  >
                    Ver detalles →
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>


      </Container>
    </Box>
  );
};

export default Servicios;
