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
    icon: <AssignmentIcon sx={{ fontSize: 48 }} />,
    title: 'Auditorías comerciales y operativas',
    description:
      'Evaluación presencial o remota del cumplimiento operativo, atención al cliente y estándares comerciales.',
    price: 'desde $79.999',
    route: '/auditorias',
  },
  {
    id: 2,
    icon: <DashboardIcon sx={{ fontSize: 48 }} />,
    title: 'Sistema de auditoría Prende',
    description:
      'Plataforma para registrar auditorías, generar puntajes, informes y KPIs de forma simple.',
    price: 'desde $39.999',
    route: '/sistema',
  },
  {
    id: 3,
    icon: <TrendingUpIcon sx={{ fontSize: 48 }} />,
    title: 'Consultoría comercial aplicada',
    description:
      'Análisis de resultados, recomendaciones prácticas y acompañamiento para mejorar ventas y procesos.',
    price: 'desde $129.999',
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
        bgcolor: '#F5F5F5',
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
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                    borderColor: '#FFEB5D',
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 3, md: 4 },
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
                      width: 80,
                      height: 80,
                      bgcolor: '#FFEB5D',
                      borderRadius: 2,
                      mb: 3,
                      color: '#000000',
                    }}
                  >
                    {servicio.icon}
                  </Box>

                  {/* Título */}
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      fontWeight: 700,
                      color: '#000000',
                      mb: 2,
                      minHeight: { md: '60px' },
                    }}
                  >
                    {servicio.title}
                  </Typography>

                  {/* Descripción */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: '0.9375rem', md: '1rem' },
                      color: '#666666',
                      mb: 3,
                      flexGrow: 1,
                      lineHeight: 1.6,
                    }}
                  >
                    {servicio.description}
                  </Typography>

                  {/* Precio */}
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: '1.125rem', md: '1.25rem' },
                      fontWeight: 700,
                      color: '#000000',
                      mt: 'auto',
                    }}
                  >
                    {servicio.price}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Badge adicional */}
        <Box sx={{ textAlign: 'center', mt: { xs: 6, md: 8 } }}>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: '0.875rem', md: '0.9375rem' },
              color: '#999999',
              fontWeight: 500,
            }}
          >
            💼 Auditorías presenciales y remotas · Sistema simple y accionable · Enfoque 100% práctico
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Servicios;
