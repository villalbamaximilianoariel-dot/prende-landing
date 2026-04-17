import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Dolor from './components/Dolor';
import PorQuePrende from './components/PorQuePrende';
import Servicios from './components/Servicios';
import Contacto from './components/Contacto';
import Blog from './components/Blog';
import Footer from './components/Footer';
import RecursosRecomendados from './components/RecursosRecomendados';
import Auditorias from './pages/Auditorias';
import Sistema from './pages/Sistema';
import Consultoria from './pages/Consultoria';
import SistemaPrueba from './pages/SistemaPrueba';
import AuditoriaGratis from './pages/AuditoriaGratis';
import CalculadoraCostos from './pages/CalculadoraCostos';
import Implementacion from './pages/Implementacion';

// Tema personalizado Prende
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#FFEB5D',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

// Componente Home
const Home = () => (
  <Box sx={{ bgcolor: 'background.default' }}>
    <Header />
    <Hero />
    <Dolor />
    <PorQuePrende />
    <Servicios />
    <Contacto />
    <Blog />
    <Footer />
  </Box>
);

// Tracker de cambios de ruta para HashRouter + GA4 + Meta Pixel
const RouteTracker = () => {
  const location = useLocation();
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      });
    }
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location.pathname]);
  return null;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <RouteTracker />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auditorias" element={<Auditorias />} />
          <Route path="/sistema" element={<Sistema />} />
          <Route path="/consultoria" element={<Consultoria />} />
          <Route path="/blog" element={<RecursosRecomendados />} />
          <Route path="/calculadora" element={<CalculadoraCostos />} />
          <Route path="/implementacion" element={<Implementacion />} />
          {/* Landing pages específicas para pauta */}
          <Route path="/sistema-prueba" element={<SistemaPrueba />} />
          <Route path="/auditoria-gratis" element={<AuditoriaGratis />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
