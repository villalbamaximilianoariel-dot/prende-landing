import { Box, Container, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';
import { useState } from 'react';

const Dolor = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
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
          El crecimiento trae nuevos desafíos
        </Typography>

        <Box sx={{ position: 'relative', mb: 4 }}>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true
            }}
            loop={true}
            onSwiper={setSwiperInstance}
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
                    opacity: 0,
                    animation: 'fadeIn 0.6s ease-in-out forwards',
                    '@keyframes fadeIn': {
                      from: { opacity: 0, transform: 'translateY(10px)' },
                      to: { opacity: 1, transform: 'translateY(0)' }
                    },
                    '&:hover': {
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    {/* Título negro coherente con Blog */}
                    <Typography 
                      variant="h4" 
                      component="h3" 
                      textAlign="center"
                      sx={{ 
                        fontWeight: 700,
                        mb: 3,
                        fontSize: { xs: '1.5rem', md: '1.75rem' },
                        lineHeight: 1.2,
                        color: '#000',
                      }}
                    >
                      {slide.titulo}
                    </Typography>

                    {/* Texto principal con líneas decorativas */}
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 2, 
                        mb: 5,
                        px: { xs: 0, md: 4 }
                      }}
                    >
                      <Box 
                        sx={{ 
                          flex: 1, 
                          height: '2px', 
                          background: 'linear-gradient(to right, transparent, #FFEB5D)',
                          display: { xs: 'none', md: 'block' }
                        }} 
                      />
                      <Typography 
                        variant="body1"
                        textAlign="center"
                        sx={{ 
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          lineHeight: 1.5,
                          color: '#666',
                          fontWeight: 400,
                          flexShrink: 0,
                        }}
                      >
                        {slide.textoPrincipal}
                      </Typography>
                      <Box 
                        sx={{ 
                          flex: 1, 
                          height: '2px', 
                          background: 'linear-gradient(to left, transparent, #FFEB5D)',
                          display: { xs: 'none', md: 'block' }
                        }} 
                      />
                    </Box>

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
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    transform: 'translateX(4px)',
                                  }
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: '1.2rem',
                                    flexShrink: 0,
                                    color: '#999',
                                    fontWeight: 'bold',
                                    mt: 0.1,
                                  }}
                                >
                                  ✓
                                </Typography>
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
                            borderLeft: '6px solid #FFEB5D',
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
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    transform: 'translateX(4px)',
                                  }
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: '1.2rem',
                                    flexShrink: 0,
                                    color: '#000',
                                    fontWeight: 'bold',
                                    mt: 0.1,
                                  }}
                                >
                                  ✓
                                </Typography>
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
          {/* Flechas custom como en Blog */}
          <Box
            sx={{
              position: 'absolute',
              top: '40%',
              left: { xs: -10, md: -20 },
              transform: 'translateY(-50%)',
              zIndex: 10,
            }}
          >
            <Box
              onClick={() => swiperInstance?.slidePrev()}
              sx={{
                width: { xs: 40, md: 50 },
                height: { xs: 40, md: 50 },
                borderRadius: '50%',
                bgcolor: '#FFEB5D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: '1px solid #E0E0E0',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: '#FFE135',
                  transform: 'scale(1.05)',
                },
              }}
            >
              <ChevronLeft sx={{ color: '#000000', fontSize: { xs: 24, md: 30 } }} />
            </Box>
          </Box>

          <Box
            sx={{
              position: 'absolute',
              top: '40%',
              right: { xs: -10, md: -20 },
              transform: 'translateY(-50%)',
              zIndex: 10,
            }}
          >
            <Box
              onClick={() => swiperInstance?.slideNext()}
              sx={{
                width: { xs: 40, md: 50 },
                height: { xs: 40, md: 50 },
                borderRadius: '50%',
                bgcolor: '#FFEB5D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: '1px solid #E0E0E0',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: '#FFE135',
                  transform: 'scale(1.05)',
                },
              }}
            >
              <ChevronRight sx={{ color: '#000000', fontSize: { xs: 24, md: 30 } }} />
            </Box>
          </Box>        </Box>

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
            ¿Cómo podemos ayudarte?
          </Button>
        </Box>
      </Container>

      <style>
        {`
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

          .problemas-carousel .swiper-slide {
            transition: all 0.3s ease;
          }
        `}
      </style>
    </Box>
  );
};

export default Dolor;
