import { AppBar, Toolbar, Container, Button, Box } from '@mui/material';

const Header = () => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: '#FFFFFF',
        borderBottom: '1px solid #E0E0E0',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 64, md: 80 },
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Box
            component="a"
            href="#"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <Box
              component="img"
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Prende"
              sx={{
                height: { xs: 40, md: 50 },
                width: 'auto',
              }}
            />
          </Box>

          {/* Navigation */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              gap: { sm: 2, md: 4 },
              alignItems: 'center',
            }}
          >
            <Button
              href="#servicios"
              sx={{
                color: '#000000',
                fontSize: { sm: '0.9375rem', md: '1rem' },
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: 'transparent',
                  color: '#666666',
                },
              }}
            >
              Servicios
            </Button>

            <Button
              href="#contacto"
              variant="contained"
              sx={{
                bgcolor: '#FFEB5D',
                color: '#000000',
                px: { sm: 2.5, md: 3 },
                py: 1,
                fontSize: { sm: '0.9375rem', md: '1rem' },
                fontWeight: 600,
                borderRadius: 1,
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#FFE135',
                  boxShadow: 'none',
                },
              }}
            >
              Contacto
            </Button>
          </Box>

          {/* Mobile CTA */}
          <Button
            href="#contacto"
            variant="contained"
            size="small"
            sx={{
              display: { xs: 'flex', sm: 'none' },
              bgcolor: '#FFEB5D',
              color: '#000000',
              px: 2,
              py: 0.75,
              fontSize: '0.875rem',
              fontWeight: 600,
              borderRadius: 1,
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#FFE135',
                boxShadow: 'none',
              },
            }}
          >
            Contacto
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
