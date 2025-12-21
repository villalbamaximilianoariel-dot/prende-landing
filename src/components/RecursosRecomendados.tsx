import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
  Grid,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
} from '@mui/material';
import { RssFeed, Star } from '@mui/icons-material';
import { fetchAllFeeds, formatDate } from '../utils/fetchRSSFeeds';
import type { RSSItem } from '../utils/fetchRSSFeeds';
import recursosConfig from '../data/recursos-config.json';
import Header from './Header';
import Footer from './Footer';

interface RecursoDestacado {
  title: string;
  url: string;
  description: string;
  image: string;
  category: string;
  date: string;
}

export default function RecursosRecomendados() {
  const [rssItems, setRssItems] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    loadRSSFeeds();
  }, []);

  const loadRSSFeeds = async () => {
    try {
      setLoading(true);
      setError(null);
      const items = await fetchAllFeeds(recursosConfig.rssFeeds, 5);
      setRssItems(items);
    } catch (err) {
      setError('Error al cargar los recursos. Por favor, intenta más tarde.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const destacados = recursosConfig.destacados as RecursoDestacado[];

  // Combinar y filtrar según la pestaña
  const getFilteredItems = () => {
    if (tabValue === 0) {
      // Todos: Destacados + RSS
      return {
        destacados,
        rss: rssItems,
      };
    } else if (tabValue === 1) {
      // Solo destacados
      return {
        destacados,
        rss: [],
      };
    } else {
      // Solo automáticos (RSS)
      return {
        destacados: [],
        rss: rssItems,
      };
    }
  };

  const filteredData = getFilteredItems();

  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: '#FFFFFF',
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
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Blogs Recomendados
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#666666',
              maxWidth: '700px',
              mx: 'auto',
              mb: 4,
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            Contenidos seleccionados sobre negocios, gestión y emprendimiento
            para ayudarte a tomar mejores decisiones
          </Typography>
        </Box>

        {/* Tabs para filtrar */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            sx={{
              '& .MuiTab-root': {
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
              },
              '& .Mui-selected': {
                color: '#000000',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#FFEB5D',
                height: 3,
              },
            }}
          >
            <Tab label="Todos" />
            <Tab label="Destacados" />
            <Tab label="Últimas Publicaciones" />
          </Tabs>
        </Box>

        {/* Loading */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#FFEB5D' }} />
          </Box>
        )}

        {/* Error */}
        {error && (
          <Alert severity="warning" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Contenido */}
        {!loading && !error && (
          <>
            {/* Destacados Manuales */}
            {filteredData.destacados.length > 0 && (
              <Box sx={{ mb: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Star sx={{ color: '#FFEB5D', mr: 1 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Destacados
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  {filteredData.destacados.map((recurso, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        sx={{
                          height: '480px',
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
                          sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                        >
                          {recurso.image && (
                            <CardMedia
                              component="img"
                              height="200"
                              image={recurso.image}
                              alt={recurso.title}
                              sx={{ objectFit: 'cover', flexShrink: 0 }}
                            />
                          )}
                          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', p: 3 }}>
                            <Chip
                              label={recurso.category}
                              size="small"
                              sx={{
                                bgcolor: '#FFEB5D',
                                color: '#000000',
                                fontWeight: 600,
                                mb: 2,
                                alignSelf: 'flex-start',
                              }}
                            />
                            <Typography
                              variant="h6"
                              sx={{ 
                                fontWeight: 600, 
                                mb: 1, 
                                color: '#000000',
                                fontSize: '1.1rem',
                                lineHeight: 1.3,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                minHeight: '2.6rem',
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
                                flexGrow: 1,
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
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Contenido Automático RSS */}
            {filteredData.rss.length > 0 && (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <RssFeed sx={{ color: '#FFEB5D', mr: 1 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Últimas Publicaciones
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  {filteredData.rss.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        sx={{
                          height: '480px',
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
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                        >
                          {item.thumbnail && (
                            <CardMedia
                              component="img"
                              height="200"
                              image={item.thumbnail}
                              alt={item.title}
                              sx={{ objectFit: 'cover', flexShrink: 0 }}
                            />
                          )}
                          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', p: 3 }}>
                            <Chip
                              label={item.source}
                              size="small"
                              sx={{
                                bgcolor: '#FFEB5D',
                                color: '#000000',
                                fontWeight: 600,
                                mb: 2,
                                alignSelf: 'flex-start',
                              }}
                            />
                            <Typography
                              variant="h6"
                              sx={{ 
                                fontWeight: 600, 
                                mb: 1, 
                                color: '#000000', 
                                fontSize: '1.1rem',
                                lineHeight: 1.3,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                minHeight: '2.6rem',
                              }}
                            >
                              {item.title}
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
                                flexGrow: 1,
                              }}
                            >
                              {item.description}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {formatDate(item.pubDate)}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Sin resultados */}
            {filteredData.destacados.length === 0 && filteredData.rss.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  No hay recursos disponibles en este momento
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
    <Footer />
    </>
  );
}
