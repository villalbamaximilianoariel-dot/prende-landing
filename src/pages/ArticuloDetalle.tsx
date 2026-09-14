import { useEffect } from 'react';
import { Box, Button, Container, Typography, Chip } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { trackServicePageView } from '../utils/analytics';
import recursosConfig from '../data/recursos-config.json';

interface BloqueTexto {
  tipo: 'parrafo';
  texto: string;
}

interface BloqueImagen {
  tipo: 'imagen';
  src: string;
  alt: string;
  caption?: string;
}

type BloqueCuerpo = BloqueTexto | BloqueImagen | string; // string = formato legado (solo párrafo)

interface Destacado {
  slug: string;
  title: string;
  url: string;
  description: string;
  cuerpo?: BloqueCuerpo[];
  video?: string; // URL de embed de YouTube, para sumar a futuro
  image: string;
  category: string;
  date: string;
}

const ArticuloDetalle = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const destacados = recursosConfig.destacados as Destacado[];
  const articulo = destacados.find((d) => d.slug === slug);

  useEffect(() => {
    if (articulo) {
      trackServicePageView(`Artículo: ${articulo.title}`);
    }
  }, [articulo]);

  const handleVolverBlog = () => {
    navigate('/blog');
    window.scrollTo(0, 0);
  };

  const handleWhatsAppClick = () => {
    const whatsappNumber = '5491125453990';
    const message = encodeURIComponent('Hola! Quiero agendar una Primera Consulta con Prende.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  if (!articulo) {
    return (
      <Box sx={{ bgcolor: '#FFFFFF' }}>
        <Header />
        <Container maxWidth="md" sx={{ py: { xs: 12, md: 16 }, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            No encontramos este artículo
          </Typography>
          <Button variant="contained" onClick={handleVolverBlog} sx={{ bgcolor: '#000', color: '#FFEB5D', mt: 2 }}>
            Volver al blog
          </Button>
        </Container>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#FFFFFF' }}>
      <Header />

      {/* Hero */}
      <Box
        sx={{
          bgcolor: '#000000',
          color: '#FFFFFF',
          pt: { xs: 14, md: 18 },
          pb: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="md">
          <Button
            onClick={handleVolverBlog}
            startIcon={<ArrowBackIcon />}
            sx={{ color: '#FFEB5D', mb: 3, '&:hover': { bgcolor: 'rgba(255, 235, 93, 0.1)' } }}
          >
            Volver al blog
          </Button>

          <Chip
            label={articulo.category}
            sx={{ bgcolor: '#FFEB5D', color: '#000000', fontWeight: 600, mb: 2 }}
          />
          <Typography component="h1" variant="h2" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '1.75rem', md: '2.75rem' }, lineHeight: 1.2 }}>
            {articulo.title}
          </Typography>
        </Container>
      </Box>

      {/* Imagen */}
      <Box
        component="img"
        src={articulo.image}
        alt={articulo.title}
        sx={{ width: '100%', maxHeight: 420, objectFit: 'cover', display: 'block' }}
      />

      {/* Video (opcional, a futuro) */}
      {articulo.video && (
        <Box sx={{ bgcolor: '#000', py: { xs: 4, md: 6 } }}>
          <Container maxWidth="md">
            <Box
              sx={{
                position: 'relative',
                paddingTop: '56.25%',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Box
                component="iframe"
                src={articulo.video}
                title={articulo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                }}
              />
            </Box>
          </Container>
        </Box>
      )}

      {/* Cuerpo del artículo */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
        {(articulo.cuerpo ?? [articulo.description]).map((bloque, index) => {
          // Formato legado: string suelto = párrafo
          if (typeof bloque === 'string') {
            return (
              <Typography
                key={index}
                variant="body1"
                sx={{ fontSize: { xs: '1rem', md: '1.125rem' }, lineHeight: 1.8, color: '#222', mb: 3 }}
              >
                {bloque}
              </Typography>
            );
          }
          if (bloque.tipo === 'imagen') {
            return (
              <Box key={index} sx={{ my: 5 }}>
                <Box
                  component="img"
                  src={bloque.src}
                  alt={bloque.alt}
                  sx={{ width: '100%', borderRadius: 2, display: 'block' }}
                />
                {bloque.caption && (
                  <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: '#999', mt: 1.5 }}>
                    {bloque.caption}
                  </Typography>
                )}
              </Box>
            );
          }
          return (
            <Typography
              key={index}
              variant="body1"
              sx={{ fontSize: { xs: '1rem', md: '1.125rem' }, lineHeight: 1.8, color: '#222', mb: 3 }}
            >
              {bloque.texto}
            </Typography>
          );
        })}
      </Container>

      {/* CTA final */}
      <Box sx={{ bgcolor: '#FFEB5D', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, textAlign: 'center', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
            ¿Querés ver esto aplicado a tu negocio?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleWhatsAppClick}
              startIcon={<WhatsAppIcon />}
              sx={{ bgcolor: '#000000', color: '#FFFFFF', fontWeight: 600, px: 5, py: 2, fontSize: '1.1rem', '&:hover': { bgcolor: '#333333' } }}
            >
              Agendar Primera Consulta
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default ArticuloDetalle;
