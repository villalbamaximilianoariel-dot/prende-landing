import { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, CardMedia, CardActionArea, Chip, Button } from '@mui/material';
import { ArrowForward, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';
import { fetchAllFeeds, formatDate } from '../utils/fetchRSSFeeds';
import type { RSSItem } from '../utils/fetchRSSFeeds';
import recursosConfig from '../data/recursos-config.json';

interface RecursoDestacado {
  title: string;
  url: string;
  description: string;
  image: string;
  category: string;
  date: string;
}

export default function RecursosCarousel() {
  const [recursos, setRecursos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    loadRecursos();
  }, []);

  const loadRecursos = async () => {
    try {
      setLoading(true);
      
      // Obtener más RSS items (3 items por feed = 9 total)
      const rssItems = await fetchAllFeeds(recursosConfig.rssFeeds, 3);
      
      // Obtener destacados
      const destacados = recursosConfig.destacados as RecursoDestacado[];
      
      // Combinar y transformar a formato uniforme
      const recursosRSS = rssItems.map((item: RSSItem) => ({
        title: item.title,
        url: item.link,
        description: item.description,
        image: item.thumbnail || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
        category: item.source,
        date: item.pubDate,
      }));

      const recursosDestacados = destacados;
      
      // Mezclar: destacados + RSS (hasta 9 items)
      const todosCombinados = [...recursosDestacados, ...recursosRSS];
      
      setRecursos(todosCombinados.slice(0, 9));
    } catch (error) {
      console.error('Error cargando recursos:', error);
      setRecursos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      id="blog"
      sx={{
        bgcolor: '#F5F5F5',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: '#000000',
              mb: 2,
            }}
          >
            Blogs recomendados
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#666666',
              maxWidth: '700px',
              mx: 'auto',
              mb: 4,
            }}
          >
            Contenidos seleccionados sobre negocios, gestión y emprendimiento
            para ayudarte a tomar mejores decisiones
          </Typography>
        </Box>

        {/* Carousel */}
        {!loading && recursos.length > 0 && (
          <Box sx={{ position: 'relative', mb: 4 }}>
            <Swiper
              modules={[Navigation, Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              loop={recursos.length > 3}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={800}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: Math.min(2, recursos.length),
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: Math.min(3, recursos.length),
                  spaceBetween: 30,
                },
              }}
              onSwiper={setSwiperInstance}
              style={{
                paddingBottom: '50px',
              }}
            >
              {recursos.map((recurso, index) => (
                <SwiperSlide key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: 'none',
                      border: '1px solid #E0E0E0',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <CardActionArea
                      href={recurso.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="220"
                        image={recurso.image}
                        alt={recurso.title}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Chip
                          label={recurso.category}
                          size="small"
                          sx={{
                            bgcolor: '#FFEB5D',
                            color: '#000000',
                            fontWeight: 600,
                            mb: 2,
                          }}
                        />
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: '#000000',
                            mb: 1,
                            fontSize: '1.1rem',
                            lineHeight: 1.3,
                          }}
                        >
                          {recurso.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {recurso.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(recurso.date)}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
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
            </Box>
          </Box>
        )}

        {/* CTA Button */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            href="/blog"
            variant="contained"
            endIcon={<ArrowForward />}
            sx={{
              bgcolor: '#000000',
              color: '#FFFFFF',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: 2,
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#333333',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.2s',
            }}
          >
            Ver todos los recursos
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
