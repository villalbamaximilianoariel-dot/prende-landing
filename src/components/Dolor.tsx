import { Box, Container, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';

const Dolor = () => {
  const slides = [
    {
      nombre: 'Dependencia del dueño',
      titulo: 'Todo depende de vos',
      textoPrincipal: 'El negocio funciona, pero solo cuando estás presente.',
      comoSeSiente: [
        'Tenés que estar en todo',
        'Cuesta delegar con tranquilidad',
        'Si te ausentás, algo se desordena'
      ],
      consecuencias: [
        'Cansancio constante',
        'Falta de previsibilidad',
        'Crecimiento limitado'
      ]
    },
    {
      nombre: 'Falta de control real',
      titulo: 'No todo está bajo control',
      textoPrincipal: 'Se trabaja mucho, pero no siempre se mide lo que pasa.',
      comoSeSiente: [
        'Sensación de estar "a ciegas"',
        'Problemas que aparecen tarde',
        'Decisiones tomadas por intuición'
      ],
      consecuencias: [
        'Errores que se repiten',
        'Poco aprendizaje',
        'Dificultad para mejorar'
      ]
    },
    {
      nombre: 'Calidad irregular',
      titulo: 'La calidad cambia según quién esté',
      textoPrincipal: 'La experiencia del cliente no siempre es la misma.',
      comoSeSiente: [
        'Algunos días todo sale bien',
        'Otros días aparecen reclamos',
        'No hay un criterio claro y compartido'
      ],
      consecuencias: [
        'Clientes insatisfechos',
        'Imagen poco consistente',
        'Pérdida de oportunidades'
      ]
    },
    {
      nombre: 'Desorden operativo silencioso',
      titulo: 'Funciona, pero no está ordenado',
      textoPrincipal: 'No es un caos, pero tampoco hay claridad.',
      comoSeSiente: [
        'Tareas poco definidas',
        'Retrabajo constante',
        'Falta de prioridades claras'
      ],
      consecuencias: [
        'Pérdida de tiempo',
        'Costos ocultos',
        'Desgaste diario'
      ]
    },
    {
      nombre: 'Decisiones con incertidumbre',
      titulo: 'Decidir sin información desgasta',
      textoPrincipal: 'Tomar decisiones sin datos claros genera dudas.',
      comoSeSiente: [
        'Inseguridad al decidir',
        'Cambios de rumbo frecuentes',
        'Sensación de improvisar'
      ],
      consecuencias: [
        'Estrés',
        'Resultados irregulares',
        'Falta de foco'
      ]
    }
  ];

  const handleVerComoAyuda = () => {
    const element = document.getElementById('por-que-prende-bloque-2');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: '#F5F5F5'
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 6 }}
        >
          Crecer trae nuevos desafíos en el día a día
        </Typography>

        <Box sx={{ position: 'relative', mb: 4 }}>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
            navigation
            pagination={{ 
              clickable: true,
              dynamicBullets: true
            }}
            loop={true}
            style={{
              paddingBottom: '50px'
            }}
            className="problemas-carousel"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <Card
                  sx={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 3,
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                    p: { xs: 4, md: 6 },
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    {/* Título - Jerarquía máxima */}
                    <Typography 
                      variant="h3" 
                      component="h3" 
                      textAlign="center"
                      sx={{ 
                        fontWeight: 700,
                        mb: 3,
                        fontSize: { xs: '1.75rem', md: '2.5rem' },
                        lineHeight: 1.2,
                        color: '#000',
                      }}
                    >
                      {slide.titulo}
                    </Typography>

                    {/* Texto principal - Segunda jerarquía */}
                    <Typography 
                      variant="h6"
                      textAlign="center"
                      sx={{ 
                        mb: 5,
                        fontSize: { xs: '1.1rem', md: '1.3rem' },
                        lineHeight: 1.5,
                        color: '#333',
                        fontWeight: 500,
                      }}
                    >
                      {slide.textoPrincipal}
                    </Typography>

                    {/* Dos columnas: Cómo se siente | Consecuencias */}
                    <Grid container spacing={3}>
                      {/* Columna izquierda: Cómo se siente */}
                      <Grid item xs={12} md={6}>
                        <Box
                          sx={{
                            backgroundColor: '#F8F8F8',
                            borderRadius: 2,
                            p: 3,
                            height: '100%',
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 700,
                              mb: 2,
                              fontSize: { xs: '1rem', md: '1.1rem' },
                              color: '#666',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                            }}
                          >
                            Cómo se siente
                          </Typography>
                          <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
                            {slide.comoSeSiente.map((item, idx) => (
                              <Box
                                key={idx}
                                component="li"
                                sx={{
                                  mb: 1.5,
                                  '&:last-child': { mb: 0 },
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: 1.5,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    backgroundColor: '#999',
                                    mt: 1,
                                    flexShrink: 0,
                                  }}
                                />
                                <Typography
                                  variant="body1"
                                  sx={{
                                    fontSize: { xs: '0.95rem', md: '1rem' },
                                    lineHeight: 1.6,
                                    color: '#444',
                                  }}
                                >
                                  {item}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      </Grid>

                      {/* Columna derecha: Consecuencias */}
                      <Grid item xs={12} md={6}>
                        <Box
                          sx={{
                            backgroundColor: '#FFFEF5',
                            border: '2px solid #FFEB5D',
                            borderRadius: 2,
                            p: 3,
                            height: '100%',
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 700,
                              mb: 2,
                              fontSize: { xs: '1rem', md: '1.1rem' },
                              color: '#000',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                            }}
                          >
                            Cómo se manifiesta
                          </Typography>
                          <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
                            {slide.consecuencias.map((item, idx) => (
                              <Box
                                key={idx}
                                component="li"
                                sx={{
                                  mb: 1.5,
                                  '&:last-child': { mb: 0 },
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: 1.5,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    backgroundColor: '#000',
                                    mt: 1,
                                    flexShrink: 0,
                                  }}
                                />
                                <Typography
                                  variant="body1"
                                  sx={{
                                    fontSize: { xs: '0.95rem', md: '1rem' },
                                    lineHeight: 1.6,
                                    color: '#000',
                                    fontWeight: 500,
                                  }}
                                >
                                  {item}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleVerComoAyuda}
            sx={{
              backgroundColor: '#FFEB5D',
              color: '#000',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: '#FFE030',
              },
            }}
          >
            Ver cómo Prende ayuda
          </Button>
        </Box>
      </Container>

      <style>
        {`
          .problemas-carousel .swiper-button-next,
          .problemas-carousel .swiper-button-prev {
            color: #000;
            background: #FFEB5D;
            width: 44px;
            height: 44px;
            border-radius: 50%;
          }

          .problemas-carousel .swiper-button-next:after,
          .problemas-carousel .swiper-button-prev:after {
            font-size: 20px;
            font-weight: bold;
          }

          .problemas-carousel .swiper-pagination-bullet {
            background: #000;
            opacity: 0.3;
            width: 12px;
            height: 12px;
          }

          .problemas-carousel .swiper-pagination-bullet-active {
            opacity: 1;
            background: #FFEB5D;
          }

          .problemas-carousel .swiper-button-next:hover,
          .problemas-carousel .swiper-button-prev:hover {
            background: #FFE030;
          }
        `}
      </style>
    </Box>
  );
};

export default Dolor;
