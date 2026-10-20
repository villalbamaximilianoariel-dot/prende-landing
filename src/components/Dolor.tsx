import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight, KeyboardArrowDown } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
// @ts-ignore
import 'swiper/css';
import { useEffect, useRef, useState } from 'react';

const Dolor = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activo, setActivo] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);

  // En celular la fila de temas se desliza: mantener visible el tema activo
  useEffect(() => {
    const row = tabsRef.current;
    const el = row?.children[activo] as HTMLElement | undefined;
    if (row && el) row.scrollTo({ left: el.offsetLeft - (row.clientWidth - el.clientWidth) / 2, behavior: 'smooth' });
  }, [activo]);
  
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
      nombre: 'Costos y gastos',
      pregunta: '¿Sabés cuánto te cuesta realmente cada venta?',
      puntos: [
        'Comprás y pagás, pero a fin de mes no sabés bien en qué se fue la **plata**.',
        'Los precios los pusiste hace tiempo y nunca los volviste a **revisar** con los costos de hoy.',
        'Hay gastos que te **aparecen** sin que los hayas visto venir.',
        'Sentís que **vendés** todo el tiempo, pero no siempre te queda margen real.'
      ]
    },
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
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const irA = (i: number) => swiperInstance?.slideToLoop(i);
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <Box sx={{ pt: { xs: 8, md: 12 }, pb: 0, backgroundColor: '#F5F5F5' }}>
      <Container maxWidth="lg">
        {/* Temas: sirven de navegación y dicen de qué trata cada pantalla */}
        <Box
          ref={tabsRef}
          role="tablist"
          aria-label="Temas"
          sx={{
            position: 'relative',
            display: 'flex',
            gap: 1,
            mb: 2.5,
            overflowX: 'auto',
            pb: 0.5,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            justifyContent: { md: 'center' },
          }}
        >
          {slides.map((slide, i) => (
            <Box
              key={slide.nombre}
              component="button"
              role="tab"
              aria-selected={i === activo}
              onClick={() => irA(i)}
              sx={{
                flexShrink: 0,
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '0.875rem',
                fontWeight: 600,
                px: 2,
                py: 1,
                borderRadius: '999px',
                bgcolor: i === activo ? '#111111' : '#FFFFFF',
                color: i === activo ? '#FFFFFF' : '#6b6b70',
                transition: 'background-color 0.2s, color 0.2s',
                '&:hover': { color: i === activo ? '#FFFFFF' : '#111111' },
              }}
            >
              {slide.nombre}
            </Box>
          ))}
        </Box>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 10000, disableOnInteraction: true }}
          loop
          onSwiper={setSwiperInstance}
          onSlideChange={(sw) => setActivo(sw.realIndex)}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  bgcolor: '#FFFFFF',
                  borderRadius: '28px',
                  p: { xs: 3, sm: 4, md: 6 },
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
                  gap: { xs: 3, md: 7 },
                  alignItems: 'center',
                  minHeight: { md: 340 },
                }}
              >
                {/* Pregunta */}
                <Box>
                  <Typography
                    sx={{
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#6b6b70',
                      mb: 2,
                    }}
                  >
                    <Box component="span" sx={{ bgcolor: '#FFEB5D', color: '#111', px: 1, py: 0.25, borderRadius: '6px', mr: 1 }}>
                      {pad(index + 1)}
                    </Box>
                    {slide.nombre}
                  </Typography>
                  <Typography
                    variant="h3"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '1.5rem', sm: '1.875rem', md: '2.25rem' },
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                      color: '#111111',
                    }}
                  >
                    {slide.pregunta}
                  </Typography>
                </Box>

                {/* Señales: lista simple con separadores, sin cajas */}
                <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
                  {slide.puntos.map((item, idx) => (
                    <Box
                      component="li"
                      key={idx}
                      sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'baseline',
                        py: { xs: 1.75, md: 2 },
                        borderTop: idx === 0 ? 'none' : '1px solid #ECECF0',
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          bgcolor: '#FFEB5D',
                          border: '2px solid #111',
                          flexShrink: 0,
                          transform: 'translateY(1px)',
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: { xs: '1rem', md: '1.125rem' },
                          lineHeight: 1.55,
                          color: '#3a3a3f',
                        }}
                      >
                        {renderTextWithBold(item)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Controles debajo de la tarjeta (ya no tapan el contenido) */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3 }}>
          <Typography aria-live="polite" sx={{ fontSize: '0.9375rem', fontWeight: 600, color: '#6b6b70', fontVariantNumeric: 'tabular-nums' }}>
            <Box component="span" sx={{ color: '#111111' }}>{pad(activo + 1)}</Box> / {pad(slides.length)}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {[
              { label: 'Anterior', icon: <ChevronLeft />, onClick: () => swiperInstance?.slidePrev() },
              { label: 'Siguiente', icon: <ChevronRight />, onClick: () => swiperInstance?.slideNext() },
            ].map((b) => (
              <IconButton
                key={b.label}
                aria-label={b.label}
                onClick={b.onClick}
                sx={{ bgcolor: '#111111', color: '#FFFFFF', width: 44, height: 44, '&:hover': { bgcolor: '#333333' } }}
              >
                {b.icon}
              </IconButton>
            ))}
          </Box>
        </Box>

        {/* Puente hacia el bloque siguiente: la línea baja hasta la tarjeta negra */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: { xs: 5, md: 6 } }}>
          <Box sx={{ width: 2, height: { xs: 28, md: 36 }, bgcolor: '#111111', opacity: 0.18 }} />
          <Button
            variant="contained"
            onClick={handleVerComoAyuda}
            endIcon={<KeyboardArrowDown />}
            sx={{
              backgroundColor: '#FFEB5D',
              color: '#000',
              fontWeight: 600,
              px: 3,
              py: 1.25,
              fontSize: '1rem',
              borderRadius: '999px',
              boxShadow: 'none',
              '& .MuiButton-endIcon': { animation: 'bajar 1.6s ease-in-out infinite' },
              '@keyframes bajar': {
                '0%, 100%': { transform: 'translateY(-2px)' },
                '50%': { transform: 'translateY(3px)' },
              },
              '&:hover': { backgroundColor: '#FFE135', boxShadow: 'none' },
            }}
          >
            ¿Cómo podemos ayudarte?
          </Button>
          <Box sx={{ width: 2, height: { xs: 44, md: 64 }, background: 'linear-gradient(180deg, rgba(17,17,17,0.18), #FFEB5D)' }} />
        </Box>
      </Container>
    </Box>
  );
};

export default Dolor;
