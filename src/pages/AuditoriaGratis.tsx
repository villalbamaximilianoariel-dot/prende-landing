/**
 * Landing page específica para pauta de Auditorías
 * URL: /auditoria-gratis
 * Énfasis en "Primera auditoría con descuento"
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auditorias from './Auditorias';

const AuditoriaGratis = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirige a la página principal de Auditorías (que tiene su propio tracking)
    navigate('/auditorias', { replace: true });
  }, [navigate]);

  return <Auditorias />;
};

export default AuditoriaGratis;
