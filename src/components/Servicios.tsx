import { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { PAISES, PAIS_DEFAULT, getPrecio } from '../data/countries';
import type { PaisConfig } from '../data/countries';
import { detectCountryCode } from '../utils/geo';

type ServicioKey = 'sistema' | 'auditorias' | 'consultoria';

interface Servicio {
  id: number;
  key: ServicioKey;
  icon: React.ReactNode;
  title: string;
  description: string;
  sufijo: string;
  route: string;
}

const servicios: Servicio[] = [
  {
    id: 1,
    key: 'sistema',
    icon: <DashboardIcon sx={{ fontSize: 48 }} />,
    title: 'Sistema de Auditoría Prende',
    description:
      'Nuestro sistema de Auditoría Prende te permite relevar, registrar y visualizar lo que pasa en tus locales a través de formularios flexibles, carga simple y reportes automáticos.',
    sufijo: 'por mes',
    route: '/sistema',
  },
  {
    id: 2,
    key: 'auditorias',
    icon: <AssignmentIcon sx={{ fontSize: 48 }} />,
    title: 'Auditorías Operativas',
    description:
      'Realizamos auditorías apoyadas en nuestro sistema, observando la operacion real para detectar oportunidades de mejora y devolverte información clara y accionable.',
    sufijo: 'por mes',
    route: '/auditorias',
  },
  {
    id: 3,
    key: 'consultoria',
    icon: <TrendingUpIcon sx={{ fontSize: 48 }} />,
    title: 'Consultoría Personalizada',
    description:
      'No se trata solo de diagnósticos o recomendaciones: trabajamos junto a vos para ordenar procesos, mejorar resultados y encarar nuevos proyectos de manera concreta y realista.',
    sufijo: 'por proyecto',
    route: '/consultoria',
  },
];

const Servicios = () => {
  const navigate = useNavigate();
  const [paisSeleccionado, setPaisSeleccionado] = useState<PaisConfig>(PAIS_DEFAULT);
  const [detectando, setDetectando] = useState(true);

  useEffect(() => {
    detectCountryCode().then((code) => {
      if (code) {
        const match = PAISES.find((p) => p.code === code);
        if (match) setPaisSeleccionado(match);
      }
      setDetectando(false);
    });
  }, []);

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
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}>
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
              mb: 3,
            }}
          >
            Soluciones prácticas para que tu negocio funcione mejor y venda más
          </Typography>

          {/* Selector de país */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
            {PAISES.map((pais) => {
              const selected = pais.code === paisSeleccionado.code;
              return (
                <Tooltip key={pais.code} title={pais.nombre} placement="top">
                  <Box
                    component="button"
                    onClick={() => setPaisSeleccionado(pais)}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.75,
                      px: 1.5,
                      py: 0.6,
                      borderRadius: 5,
                      border: selected ? '2px solid #000' : '1.5px solid #bbb',
                      bgcolor: selected ? '#000' : '#fff',
                      color: selected ? '#FFEB5D' : '#444',
                      fontWeight: selected ? 700 : 500,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      transition: 'all 0.15s ease',
                      opacity: detectando ? 0.6 : 1,
                      '&:hover': {
                        borderColor: '#000',
                        bgcolor: selected ? '#000' : '#F5F5F5',
                      },
                    }}
                  >
                    <span style={{ fontSize: '1rem', lineHeight: 1 }}>{pais.bandera}</span>
                    {pais.nombre}
                  </Box>
                </Tooltip>
              );
            })}
          </Box>
          {detectando && (
            <Typography variant="caption" sx={{ color: '#999', display: 'block', mt: 1 }}>
              Detectando tu ubicación…
            </Typography>
          )}
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
            mt: 2,
          }}
        >
          {servicios.map((servicio) => {
            const precioStr = `${getPrecio(paisSeleccionado, servicio.key)} ${servicio.sufijo}`;
            return (
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
                    {precioStr}
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
            );
          })}
        </Box>

        {/* Teaser: Implementación a medida */}
        <Box
          sx={{
            mt: { xs: 5, md: 6 },
            p: { xs: 3, md: 5 },
            bgcolor: '#000000',
            borderRadius: 2,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: '#FFEB5D',
                fontWeight: 700,
                letterSpacing: 2,
                display: 'block',
                mb: 0.5,
              }}
            >
              Proyecto · 2-3 meses
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: '#FFFFFF', fontWeight: 700, mb: 1 }}
            >
              ¿Necesitás un sistema a medida para tu negocio?
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#AAAAAA', lineHeight: 1.6, maxWidth: 520 }}
            >
              Implementamos Airtable, Notion y las integraciones que necesitás para ordenar tu
              operación. Sin desarrollos caros ni herramientas complicadas.
            </Typography>
          </Box>
          <Box
            component="button"
            onClick={() => navigate('/implementacion')}
            sx={{
              color: '#FFEB5D',
              border: '2px solid #FFEB5D',
              bgcolor: 'transparent',
              fontWeight: 600,
              px: 4,
              py: 1.5,
              borderRadius: 1,
              whiteSpace: 'nowrap',
              flexShrink: 0,
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '1rem',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: '#FFEB5D',
                color: '#000000',
              },
            }}
          >
            Ver servicio →
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Servicios;
