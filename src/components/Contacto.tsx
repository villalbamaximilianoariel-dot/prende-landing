import { Box, Container, Typography, Button } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Contacto = () => {
  const whatsappNumber = '5491100000000'; // Placeholder
  const email = 'hola@prende.com.ar'; // Placeholder
  const instagramUrl = 'https://instagram.com/prende.ar';
  const linkedinUrl = 'https://linkedin.com/company/prende.ar'; // Placeholder

  const handleWhatsAppClick = () => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=Hola%20Prende%2C%20quiero%20saber%20más%20sobre%20sus%20servicios`,
      '_blank'
    );
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}?subject=Consulta desde la web`;
  };

  return (
    <Box
      id="contacto"
      sx={{
        bgcolor: '#FFFFFF',
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="md">
        {/* Encabezado */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
              fontWeight: 700,
              color: '#000000',
              mb: 2,
            }}
          >
            Hablemos de tu negocio
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              color: '#666666',
              maxWidth: '500px',
              mx: 'auto',
            }}
          >
            Contactanos para recibir más información sobre nuestros servicios
          </Typography>
        </Box>

        {/* Botones principales de contacto */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
            },
            gap: 3,
            mb: 6,
          }}
        >
          {/* WhatsApp */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<WhatsAppIcon sx={{ fontSize: '28px !important' }} />}
            onClick={handleWhatsAppClick}
            sx={{
              bgcolor: '#25D366',
              color: '#FFFFFF',
              py: { xs: 2, md: 2.5 },
              fontSize: { xs: '1rem', md: '1.125rem' },
              fontWeight: 600,
              borderRadius: 2,
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#20BA5A',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
              },
            }}
          >
            WhatsApp
          </Button>

          {/* Email */}
          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={<EmailIcon sx={{ fontSize: '28px !important' }} />}
            onClick={handleEmailClick}
            sx={{
              borderColor: '#000000',
              color: '#000000',
              py: { xs: 2, md: 2.5 },
              fontSize: { xs: '1rem', md: '1.125rem' },
              fontWeight: 600,
              borderRadius: 2,
              borderWidth: 2,
              textTransform: 'none',
              '&:hover': {
                borderWidth: 2,
                borderColor: '#000000',
                bgcolor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            Email
          </Button>
        </Box>

        {/* Divisor */}
        <Box
          sx={{
            height: 1,
            bgcolor: '#E0E0E0',
            my: { xs: 5, md: 6 },
          }}
        />

        {/* Redes sociales */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              fontWeight: 600,
              color: '#000000',
              mb: 3,
              textAlign: 'center',
            }}
          >
            Seguinos en redes
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            {/* Instagram */}
            <Button
              variant="outlined"
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                minWidth: { xs: 56, md: 64 },
                minHeight: { xs: 56, md: 64 },
                borderRadius: 2,
                borderColor: '#000000',
                borderWidth: 2,
                color: '#000000',
                p: 0,
                '&:hover': {
                  borderWidth: 2,
                  borderColor: '#000000',
                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <InstagramIcon sx={{ fontSize: { xs: 28, md: 32 } }} />
            </Button>

            {/* LinkedIn */}
            <Button
              variant="outlined"
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                minWidth: { xs: 56, md: 64 },
                minHeight: { xs: 56, md: 64 },
                borderRadius: 2,
                borderColor: '#000000',
                borderWidth: 2,
                color: '#000000',
                p: 0,
                '&:hover': {
                  borderWidth: 2,
                  borderColor: '#000000',
                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <LinkedInIcon sx={{ fontSize: { xs: 28, md: 32 } }} />
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contacto;
