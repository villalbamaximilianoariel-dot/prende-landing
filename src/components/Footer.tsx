import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#000000',
        color: '#FFFFFF',
        py: { xs: 4, md: 5 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Copyright */}
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: '0.875rem', md: '0.9375rem' },
              color: '#CCCCCC',
            }}
          >
            © {currentYear} Prende. Todos los derechos reservados.
          </Typography>

          {/* Enlaces */}
          <Box
            sx={{
              display: 'flex',
              gap: 3,
            }}
          >
            <Link
              href="https://instagram.com/prende.ar"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#CCCCCC',
                fontSize: { xs: '0.875rem', md: '0.9375rem' },
                textDecoration: 'none',
                '&:hover': {
                  color: '#FFEB5D',
                },
              }}
            >
              Instagram
            </Link>
            <Link
              href="https://linkedin.com/company/prende.ar"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#CCCCCC',
                fontSize: { xs: '0.875rem', md: '0.9375rem' },
                textDecoration: 'none',
                '&:hover': {
                  color: '#FFEB5D',
                },
              }}
            >
              LinkedIn
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
