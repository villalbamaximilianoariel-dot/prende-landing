/**
 * Landing page específica para pauta de Auditorías
 * URL: /auditoria-gratis
 * Énfasis en "Primera auditoría con descuento"
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SupervisionCalidad from './SupervisionCalidad';

const AuditoriaGratis = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirige a la página principal de Supervisión de Calidad (que tiene su propio tracking)
    navigate('/supervision-calidad', { replace: true });
  }, [navigate]);

  return <SupervisionCalidad />;
};

export default AuditoriaGratis;
