/**
 * Landing page específica para pauta de Sistema
 * URL: /sistema-prueba
 * Énfasis en "Prueba 15 días gratis"
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SupervisionCalidad from './SupervisionCalidad';

const SistemaPrueba = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirige a la página principal de Supervisión de Calidad (que tiene su propio tracking)
    navigate('/supervision-calidad', { replace: true });
  }, [navigate]);

  return <SupervisionCalidad />;
};

export default SistemaPrueba;
