import { Box, Container, Typography, Card, CardContent, Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProblemasCarousel = () => {
  const slides = [
    {
      nombre: 'Desorden silencioso',
      titulo: 'El desorden no siempre se ve',
      puntos: [
        'Los números parecen bien, pero hay pagos que se atrasan, materiales que faltan y productos que se pierden sin que nadie sepa por qué.',
        'Nadie controla realmente lo que pasa, y cuando algo falla, la respuesta es siempre la misma: "no sé qué pasó".'
      ]
    },
    {
      nombre: 'Calidad y experiencia',
      titulo: 'La calidad no siempre es pareja',
      puntos: [
        'El resultado depende de quién esté trabajando ese día. A veces sale perfecto, otras veces hay que rehacer todo.',
        'Los clientes no saben qué esperar, y eso termina afectando tu reputación.'
      ]
    },
    {
      nombre: 'Falta de control',
      titulo: 'Poco control, muchas decisiones',
      puntos: [
        'Decidís por intuición porque no tenés datos claros. No sabés qué funciona, qué falla o dónde estás perdiendo plata.',
        'Los problemas aparecen cuando ya es tarde, y cada solución es una urgencia.',
        'El negocio crece, pero sentís que todo el tiempo estás apagando incendios.'
      ]
    },
    {
      nombre: 'Dependencia del dueño',
      titulo: 'Si no estás, nada funciona del todo',
      puntos: [
        'Sos el único que sabe cómo resolver los problemas. Si no estás, todo se traba o se hace mal.',
        'Tu equipo espera que vos decidas todo, porque no hay claridad sobre cómo hacer las cosas.'
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
        backgroundColor: '#f5f5f5'
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 1 }}
        >
          Cuando el negocio crece, el control se vuelve más difícil
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Problemas comunes que enfrentan los dueños de negocio
        </Typography>

        <Box sx={{ position: 'relative', mb: 4 }}>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 7000,
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
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 4 }}>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom
                      sx={{ fontWeight: 'bold', mb: 3 }}
                    >
                      {slide.titulo}
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {slide.puntos.map((punto, idx) => (
                        <Box 
                          component="li" 
                          key={idx}
                          sx={{ 
                            mb: 2,
                            '&:last-child': { mb: 0 },
                            lineHeight: 1.7
                          }}
                        >
                          <Typography variant="body1">
                            {punto}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
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

export default ProblemasCarousel;
