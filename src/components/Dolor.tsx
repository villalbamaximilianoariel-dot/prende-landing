import { Box, Container, Typography, Card, CardContent, Button } from '@mui/material';
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
      pregunta: '¿Sentís que el negocio funciona solo cuando estás presente?',
      subtitulo: 'Es una señal de crecimiento, no de fracaso. Pasa cuando:',
      puntos: [
        'Tenés que estar en todo',
        'Cuesta delegar con tranquilidad',
        'Si te ausentás, algo se desordena'
      ]
    },
    {
      nombre: 'Falta de control real',
      pregunta: '¿Trabajás mucho pero no sabés bien qué está pasando?',
      subtitulo: 'La intuición te trajo hasta acá, pero ahora necesitás datos. Esto se nota cuando:',
      puntos: [
        'Tomás decisiones sin información clara',
        'Los problemas aparecen tarde',
        'Te cuesta anticiparte'
      ]
    },
    {
      nombre: 'Calidad irregular',
      pregunta: '¿La experiencia del cliente cambia según quién atiende?',
      subtitulo: 'No es culpa del equipo, es falta de criterio compartido. Se ve en:',
      puntos: [
        'Algunos días todo sale bien, otros no',
        'Aparecen reclamos inesperados',
        'No hay un estándar claro'
      ]
    },
    {
      nombre: 'Desorden operativo silencioso',
      pregunta: '¿Funciona pero no está ordenado?',
      subtitulo: 'No es caos, pero tampoco hay claridad. Esto genera:',
      puntos: [
        'Tareas poco definidas',
        'Retrabajo constante',
        'Pérdida de tiempo'
      ]
    },
    {
      nombre: 'Decisiones con incertidumbre',
      pregunta: '¿Decidir te genera más dudas que certezas?',
      subtitulo: 'Sin información clara, cada decisión cuesta. Se manifiesta en:',
      puntos: [
        'Inseguridad al decidir',
        'Cambios de rumbo frecuentes',
        'Sensación de estar improvisando'
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
                    {/* Pregunta interpeladora como título */}
                    <Typography 
                      variant="h4" 
                      component="h3" 
                      textAlign="center"
                      sx={{ 
                        fontWeight: 700,
                        mb: 3,
                        fontSize: { xs: '1.4rem', md: '1.75rem' },
                        lineHeight: 1.3,
                        color: '#000',
                        px: { xs: 1, md: 2 }
                      }}
                    >
                      {slide.pregunta}
                    </Typography>

                    {/* Subtítulo empático */}
                    <Typography 
                      variant="body1"
                      textAlign="center"
                      sx={{ 
                        fontSize: { xs: '1rem', md: '1.05rem' },
                        lineHeight: 1.6,
                        color: '#666',
                        fontWeight: 400,
                        mb: 4,
                        px: { xs: 2, md: 4 },
                      }}
                    >
                      {slide.subtitulo}
                    </Typography>

                    {/* Lista simple y limpia */}
                    <Box
                      sx={{
                        maxWidth: '600px',
                        mx: 'auto',
                        px: { xs: 2, md: 4 },
                      }}
                    >
                      <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
                        {slide.puntos.map((item, idx) => (
                          <Box
                            key={idx}
                            component="li"
                            sx={{
                              mb: 2.5,
                              '&:last-child': { mb: 0 },
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 2,
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                transform: 'translateX(4px)',
                              }
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: '1.3rem',
                                flexShrink: 0,
                                color: '#FFEB5D',
                                fontWeight: 'bold',
                                mt: 0.2,
                              }}
                            >
                              •
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                fontSize: { xs: '1rem', md: '1.1rem' },
                                lineHeight: 1.6,
                                color: '#333',
                                fontWeight: 400,
                              }}
                            >
                              {item}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
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
