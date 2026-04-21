/**
 * Landing page específica para pauta de Sistema
 * URL: /sistema-prueba
 * Énfasis en "Prueba 15 días gratis"
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sistema from './Sistema';

const SistemaPrueba = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirige a la página principal de Sistema (que tiene su propio tracking)
    navigate('/sistema', { replace: true });
  }, [navigate]);

  return <Sistema />;
};

export default SistemaPrueba;
