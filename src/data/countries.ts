// ─────────────────────────────────────────────
// Configuración de países, monedas y precios
// Última actualización de tasas: abril 2026
// Para actualizar tasas: modificar tasaVsUSD en cada país.
// Nuevos países: agregar un objeto al array PAISES.
// ─────────────────────────────────────────────

export interface PaisConfig {
  code: string;       // código ISO-2 del país (para match con ipapi)
  nombre: string;
  bandera: string;
  moneda: string;     // código ISO de moneda
  simbolo: string;    // símbolo a mostrar
  tasaVsUSD: number;  // cuántas unidades de moneda = 1 USD
  // Si se definen, se usan estos valores en lugar de convertir desde USD
  preciosCustom?: {
    sistema: number;
    auditorias: number;
    consultoria: number;
  };
  // Formato numérico local
  locale: string;
}

export const PAISES: PaisConfig[] = [
  {
    code: 'AR',
    nombre: 'Argentina',
    bandera: '🇦🇷',
    moneda: 'ARS',
    simbolo: '$',
    tasaVsUSD: 1345,
    locale: 'es-AR',
    // Precios en ARS definidos manualmente por el negocio
    preciosCustom: {
      sistema: 74000,
      auditorias: 99000,
      consultoria: 129000,
    },
  },
  {
    code: 'CL',
    nombre: 'Chile',
    bandera: '🇨🇱',
    moneda: 'CLP',
    simbolo: '$',
    tasaVsUSD: 950,
    locale: 'es-CL',
  },
  {
    code: 'CO',
    nombre: 'Colombia',
    bandera: '🇨🇴',
    moneda: 'COP',
    simbolo: '$',
    tasaVsUSD: 4300,
    locale: 'es-CO',
  },
  {
    code: 'EC',
    nombre: 'Ecuador',
    bandera: '🇪🇨',
    moneda: 'USD',
    simbolo: 'USD',
    tasaVsUSD: 1,
    locale: 'es-EC',
  },
  {
    code: 'MX',
    nombre: 'México',
    bandera: '🇲🇽',
    moneda: 'MXN',
    simbolo: '$',
    tasaVsUSD: 17,
    locale: 'es-MX',
  },
  {
    code: 'PA',
    nombre: 'Panamá',
    bandera: '🇵🇦',
    moneda: 'USD',
    simbolo: 'USD',
    tasaVsUSD: 1,
    locale: 'es-PA',
  },
  {
    code: 'PY',
    nombre: 'Paraguay',
    bandera: '🇵🇾',
    moneda: 'PYG',
    simbolo: '₲',
    tasaVsUSD: 7700,
    locale: 'es-PY',
  },
  {
    code: 'UY',
    nombre: 'Uruguay',
    bandera: '🇺🇾',
    moneda: 'UYU',
    simbolo: '$',
    tasaVsUSD: 43,
    locale: 'es-UY',
  },
  {
    code: 'CR',
    nombre: 'Costa Rica',
    bandera: '🇨🇷',
    moneda: 'CRC',
    simbolo: '₡',
    tasaVsUSD: 520,
    locale: 'es-CR',
  },
];

// Fallback cuando no se puede detectar país
export const PAIS_DEFAULT = PAISES.find((p) => p.code === 'AR')!;

// ─────────────────────────────────────────────
// Precios base en USD
// ─────────────────────────────────────────────
export const PRECIOS_USD = {
  sistema: 55,
  auditorias: 80,
  consultoria: 120,
};

// ─────────────────────────────────────────────
// Helper: devuelve el precio de un servicio en la moneda del país dado
// ─────────────────────────────────────────────
export function getPrecio(
  pais: PaisConfig,
  servicio: keyof typeof PRECIOS_USD
): string {
  const valor = pais.preciosCustom
    ? pais.preciosCustom[servicio]
    : Math.round(PRECIOS_USD[servicio] * pais.tasaVsUSD);

  // Para monedas de alta denominación (PYG, COP) no mostramos decimales
  const sinDecimales = valor >= 10000;

  // Ecuador y Panamá usan USD → mostrar "USD 55"
  if (pais.moneda === 'USD') {
    return `desde USD ${valor.toLocaleString(pais.locale)}`;
  }

  return `desde ${pais.simbolo}${valor.toLocaleString(pais.locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: sinDecimales ? 0 : 0,
  })}`;
}
