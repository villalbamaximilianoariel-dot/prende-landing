/**
 * Landing page específica para pauta de Auditorías
 * URL: /auditoria-gratis
 * Énfasis en "Primera auditoría con descuento"
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auditorias from './Auditorias';
import { trackServicePageView } from '../utils/analytics';

const AuditoriaGratis = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Track específicamente esta landing
    trackServicePageView('Auditorías - Landing Primera Auditoría');
    
    // Por ahora redirigimos a la página principal de Auditorías
    // TODO: En el futuro, crear una versión específica con oferta de primera auditoría
    navigate('/auditorias', { replace: true });
  }, [navigate]);

  return <Auditorias />;
};

export default AuditoriaGratis;
