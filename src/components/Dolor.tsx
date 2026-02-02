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
  
  // Función para renderizar texto con negritas
  const renderTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <Box key={index} component="span" sx={{ fontWeight: 700 }}>
            {part.slice(2, -2)}
          </Box>
        );
      }
      return part;
    });
  };

  const slides = [
    {
      nombre: 'Experiencia del cliente',
      pregunta: '¿Tus clientes reciben siempre la misma experiencia?',
      puntos: [
        'La **atención** depende de quién esté atendiendo en ese momento.',
        'Hay días en que todo funciona bien y otros en los que aparecen **quejas** o reclamos.',
        'No está **claro** qué se hace bien y qué se hace distinto entre turnos o sucursales.',
        'Falta una **mirada objetiva** sobre cómo vive el cliente la experiencia real.'
      ]
    },
    {
      nombre: 'Control y supervisión',
      pregunta: '¿Sabés realmente qué está pasando en tu negocio?',
      puntos: [
        'Hay mucha información, pero está **dispersa** o no queda registrada.',
        'Te enterás de los problemas cuando ya **impactaron** en ventas o en el equipo.',
        'Las decisiones se toman más por **percepción** que por datos concretos.',
        'No hay una **foto clara** del funcionamiento diario del negocio.'
      ]
    },
    {
      nombre: 'Toma de decisiones',
      pregunta: '¿Te cuesta decidir sin tener información clara?',
      puntos: [
        'Surgen ideas de mejora, pero no sabés **por dónde empezar**.',
        'Cambiás cosas sin poder **medir** si realmente funcionan.',
        'Falta **información confiable** para priorizar qué ajustar primero.',
        'Decidir implica **riesgo** porque no hay datos que acompañen.'
      ]
    },
    {
      nombre: 'Orden y organización',
      pregunta: '¿Falta orden aunque las cosas funcionen?',
      puntos: [
        'El negocio avanza, pero con procesos **poco claros** o poco documentados.',
        'Cada persona resuelve a su manera y eso genera **desorden** con el tiempo.',
        'Lo **urgente** tapa lo importante y no se revisan formas de trabajar.',
        'Funciona, pero podría funcionar **mejor** y con menos esfuerzo.'
      ]
    },
    {
      nombre: 'Dependencia del dueño',
      pregunta: '¿El negocio funciona mejor si estás presente?',
      puntos: [
        'Cuando no estás, aparecen **errores** que no se dan cuando supervisás.',
        'El equipo **depende** demasiado de vos para resolver situaciones simples.',
        'Te cuesta delegar porque no tenés **visibilidad** de lo que pasa.',
        'El negocio avanza, pero con una carga operativa muy **alta** para vos.'
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
        py: 6,
        backgroundColor: '#F5F5F5'
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 4 }}
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
                    p: { xs: 3, md: 4 },
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
                        mb: 4,
                        fontSize: { xs: '1.4rem', md: '1.75rem' },
                        lineHeight: 1.3,
                        color: '#000',
                        px: { xs: 1, md: 2 }
                      }}
                    >
                      {slide.pregunta}
                    </Typography>

                    {/* Lista simple y limpia */}
                    <Box
                      sx={{
                        maxWidth: '550px',
                        mx: 'auto',
                        px: { xs: 2, md: 3 },
                      }}
                    >
                      <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
                        {slide.puntos.map((item, idx) => (
                          <Box
                            key={idx}
                            component="li"
                            sx={{
                              mb: 1.5,
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
                              {renderTextWithBold(item)}
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
