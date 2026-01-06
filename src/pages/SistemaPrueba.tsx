/**
 * Landing page específica para pauta de Sistema
 * URL: /sistema-prueba
 * Énfasis en "Prueba 15 días gratis"
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sistema from './Sistema';
import { trackServicePageView } from '../utils/analytics';

const SistemaPrueba = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Track específicamente esta landing
    trackServicePageView('Sistema - Landing Prueba Gratis');
    
    // Por ahora redirigimos a la página principal de Sistema
    // TODO: En el futuro, crear una versión específica con más énfasis en prueba gratis
    navigate('/sistema', { replace: true });
  }, [navigate]);

  return <Sistema />;
};

export default SistemaPrueba;
