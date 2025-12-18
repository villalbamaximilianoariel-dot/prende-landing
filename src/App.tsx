import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Servicios from './components/Servicios';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import Auditorias from './pages/Auditorias';
import Sistema from './pages/Sistema';
import Consultoria from './pages/Consultoria';

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
    <Servicios />
    <Contacto />
    <Footer />
  </Box>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename="/prende-landing">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auditorias" element={<Auditorias />} />
          <Route path="/sistema" element={<Sistema />} />
          <Route path="/consultoria" element={<Consultoria />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
