import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';

const PorQuePrende = () => {
  const scrollToServicios = () => {
    const element = document.getElementById('servicios');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box 
      id="por-que-prende-bloque-2"
      sx={{ bgcolor: '#FFFFFF' }}
    >
      {/* BLOQUE 2 - QUÉ OFRECEMOS + PROMESA */}
      <Box
        sx={{
          bgcolor: '#FFFFFF',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.5rem', sm: '1.875rem', md: '2.25rem' },
                fontWeight: 700,
                color: '#000000',
                mb: 3,
              }}
            >
              ¿Qué ofrecemos?
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem' },
                color: '#333333',
                lineHeight: 1.7,
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              Somos el socio externo que te ayuda a ver lo que no ves cuando estás metido en el día a día. Te damos el sistema para auditar y el criterio profesional para interpretar y mejorar.
            </Typography>
          </Box>

          {/* Las dos columnas */}
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {/* Columna izquierda - Sistema */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  bgcolor: '#FFFEF5',
                  boxShadow: 'none',
                  border: '2px solid #FFEB5D',
                  borderRadius: 3,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(255, 235, 93, 0.2)',
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 4, md: 5 } }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      mb: 4,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: '#FFEB5D',
                        borderRadius: 2,
                        width: 64,
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <DashboardIcon sx={{ fontSize: 36, color: '#000000' }} />
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: { xs: '1.25rem', md: '1.375rem' },
                        fontWeight: 700,
                        color: '#000000',
                      }}
                    >
                      Un sistema de auditoría
                    </Typography>
                  </Box>

                  <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
                    {[
                      'Procesos estandarizados',
                      'Formularios personalizados',
                      'Evidencias y puntajes',
                      'Información clara en tiempo real',
                    ].map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 2,
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: '#FFEB5D',
                            mt: 1,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            color: '#333333',
                            lineHeight: 1.6,
                          }}
                        >
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Columna derecha - Criterio profesional */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  bgcolor: '#FAFAFA',
                  boxShadow: 'none',
                  border: '2px solid #000000',
                  borderRadius: 3,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 4, md: 5 } }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      mb: 4,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: '#000000',
                        borderRadius: 2,
                        width: 64,
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <PeopleIcon sx={{ fontSize: 36, color: '#FFEB5D' }} />
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: { xs: '1.25rem', md: '1.375rem' },
                        fontWeight: 700,
                        color: '#000000',
                      }}
                    >
                      Una mirada profesional
                    </Typography>
                  </Box>

                  <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
                    {[
                      'Auditorías externas',
                      'Análisis operativo y comercial',
                      'Informes simples y accionables',
                    ].map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 2,
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: '#000000',
                            mt: 1,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            color: '#333333',
                            lineHeight: 1.6,
                          }}
                        >
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Promesa + CTA */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.5rem', sm: '1.875rem', md: '2.25rem' },
                fontWeight: 700,
                color: '#000000',
                mb: 5,
              }}
            >
              Menos intuición, mejores decisiones
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={scrollToServicios}
              sx={{
                bgcolor: '#FFEB5D',
                color: '#000000',
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1rem', md: '1.125rem' },
                fontWeight: 600,
                borderRadius: 1,
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#FFE135',
                  boxShadow: '0 4px 12px rgba(255, 235, 93, 0.4)',
                },
              }}
            >
              Conocé cómo funciona
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default PorQuePrende;
