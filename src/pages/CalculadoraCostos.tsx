import { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  TextField,
  Slider,
  Alert,
  IconButton,
  Divider,
  Stack,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Tooltip,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InventoryIcon from '@mui/icons-material/Inventory';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type ProductType = 'fabricacion' | 'receta' | 'reventa' | 'servicio';
type IndirectosMode = 'porcentaje' | 'fijo';

interface MateriaPrima {
  id: number;
  nombre: string;
  cantidad: string;
  costoUnitario: string;
  // receta mode: unit price calculation
  usarPrecioUnitario?: boolean;
  precioCompraUnitario?: string;  // precio del paquete (ej: $4000)
  cantidadPorPaquete?: string;    // cuánto rinde el paquete (ej: 1000 para 1kg)
  unidadMedida?: string;          // etiqueta de la unidad (gr, ml, u)
}

interface CostoAdicional {
  id: number;
  nombre: string;
  valor: string;
}

interface GastoVenta {
  id: number;
  nombre: string;
  tipo: 'porcentaje' | 'fijo';
  valor: string;
}

interface CostoDirecto {
  id: number;
  nombre: string;
  valor: string;
}

interface Resultados {
  costoMateriaPrima: number;
  costosIndirectos: number;
  manoDeObra: number;
  packaging: number;
  costoTotal: number;
  gastosVentaTotal: number;
  precioSugerido: number;
  margenReal: number;
  gananciaPorUnidad: number;
  // extras receta
  costoTanda?: number;
  rendimientoCalculado?: number;
  // extras servicio
  tarifaHorariaImplicita?: number;
}

// ─────────────────────────────────────────────
// Helper: format as Argentine pesos
// ─────────────────────────────────────────────
const fmt = (value: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const fmtPct = (value: number) => `${value.toFixed(1)}%`;

// ─────────────────────────────────────────────
// Helper: precio final ajustando gastos de venta
// precio = (costo×(1+recargo) + gastos_fijos) / (1 - gastos_%/100)
// Garantiza ganancia_neta = costo × recargo sin importar los gastos
// ─────────────────────────────────────────────
const calcPrecio = (costoTotal: number, margen: number, gastos: GastoVenta[]) => {
  const gastosFijos = gastos
    .filter((g) => g.tipo === 'fijo')
    .reduce((s, g) => s + (parseFloat(g.valor) || 0), 0);
  const gastosPctDecimal = gastos
    .filter((g) => g.tipo === 'porcentaje')
    .reduce((s, g) => s + (parseFloat(g.valor) || 0), 0) / 100;
  const divider = Math.max(1 - gastosPctDecimal, 0.01);
  const precioFinal = costoTotal > 0 ? (costoTotal * (1 + margen / 100) + gastosFijos) / divider : 0;
  const gastosVentaTotal = gastosFijos + precioFinal * gastosPctDecimal;
  const gananciaNeta = precioFinal - costoTotal - gastosVentaTotal;
  const margenNeto = precioFinal > 0 ? (gananciaNeta / precioFinal) * 100 : 0;
  return { precioFinal, gastosVentaTotal, gananciaNeta, margenNeto };
};

// ─────────────────────────────────────────────
// Sub-component: Section title
// ─────────────────────────────────────────────
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography
    variant="subtitle1"
    sx={{ fontWeight: 700, mb: 1.5, color: '#000', letterSpacing: '-0.3px' }}
  >
    {children}
  </Typography>
);

// ─────────────────────────────────────────────
// Sub-component: Result row
// ─────────────────────────────────────────────
const ResultRow = ({
  label,
  value,
  bold,
  highlight,
  small,
}: {
  label: string;
  value: string;
  bold?: boolean;
  highlight?: boolean;
  small?: boolean;
}) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      py: bold ? 1 : 0.5,
    }}
  >
    <Typography
      variant={small ? 'caption' : 'body2'}
      sx={{ color: bold ? '#000' : '#666', fontWeight: bold ? 700 : 400 }}
    >
      {label}
    </Typography>
    <Typography
      variant={bold ? 'subtitle1' : small ? 'caption' : 'body2'}
      sx={{
        fontWeight: bold ? 700 : 500,
        color: highlight ? '#000' : bold ? '#000' : '#333',
        bgcolor: highlight ? '#FFEB5D' : 'transparent',
        px: highlight ? 1 : 0,
        py: highlight ? 0.25 : 0,
        borderRadius: 1,
      }}
    >
      {value}
    </Typography>
  </Box>
);

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
const CalculadoraCostos = () => {
  const navigate = useNavigate();

  // ── Type selector ──
  const [productType, setProductType] = useState<ProductType>('fabricacion');

  // ── Fabricacion / Receta state (compartido) ──
  const [materias, setMaterias] = useState<MateriaPrima[]>([
    { id: 1, nombre: 'Materia prima 1', cantidad: '1', costoUnitario: '' },
  ]);
  const [indirectosMode, setIndirectosMode] = useState<IndirectosMode>('porcentaje');
  const [indirectosPct, setIndirectosPct] = useState<number>(10);
  const [indirectosFijo, setIndirectosFijo] = useState('');
  const [tiempoProduccion, setTiempoProduccion] = useState('30');
  const [valorHora, setValorHora] = useState('');
  const [packagingCosto, setPackagingCosto] = useState('');
  const [margenElaborado, setMargenElaborado] = useState<number>(30);

  // ── Receta state extra ──
  const [tiempoPreparacion, setTiempoPreparacion] = useState('60');
  const [rendimiento, setRendimiento] = useState('12');

  // ── Reventa state ──
  const [precioCompra, setPrecioCompra] = useState('');
  const [costosAdicionales, setCostosAdicionales] = useState<CostoAdicional[]>([
    { id: 1, nombre: 'Envío / flete', valor: '' },
  ]);
  const [margenReventa, setMargenReventa] = useState<number>(40);

  // ── Materias helpers ──
  const addMateria = () =>
    setMaterias((prev) => [
      ...prev,
      { id: Date.now(), nombre: `Materia prima ${prev.length + 1}`, cantidad: '1', costoUnitario: '' },
    ]);

  const removeMateria = (id: number) =>
    setMaterias((prev) => prev.filter((m) => m.id !== id));

  const updateMateria = (id: number, field: keyof MateriaPrima, value: string | boolean) =>
    setMaterias((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)));

  const toggleMateriaPrecioUnitario = (id: number) =>
    setMaterias((prev) => prev.map((m) => (m.id === id ? { ...m, usarPrecioUnitario: !m.usarPrecioUnitario } : m)));

  // ── Costos adicionales helpers ──
  const addCostoAdicional = () =>
    setCostosAdicionales((prev) => [
      ...prev,
      { id: Date.now(), nombre: '', valor: '' },
    ]);

  const removeCostoAdicional = (id: number) =>
    setCostosAdicionales((prev) => prev.filter((c) => c.id !== id));

  const updateCostoAdicional = (id: number, field: keyof CostoAdicional, value: string) =>
    setCostosAdicionales((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );

  // ── Gastos de venta state (compartido entre todos los modos) ──
  const [gastosVenta, setGastosVenta] = useState<GastoVenta[]>([]);

  const addGastoVenta = () =>
    setGastosVenta((prev) => [...prev, { id: Date.now(), nombre: '', tipo: 'porcentaje', valor: '' }]);
  const removeGastoVenta = (id: number) =>
    setGastosVenta((prev) => prev.filter((g) => g.id !== id));
  const updateGastoVenta = (id: number, updates: Partial<GastoVenta>) =>
    setGastosVenta((prev) => prev.map((g) => (g.id === id ? { ...g, ...updates } : g)));

  // ── Servicio state ──
  const [horasServicio, setHorasServicio] = useState('2');
  const [costosDirectos, setCostosDirectos] = useState<CostoDirecto[]>([
    { id: 1, nombre: '', valor: '' },
  ]);
  const [costoOperativoPct, setCostoOperativoPct] = useState<number>(15);
  const [margenServicio, setMargenServicio] = useState<number>(30);

  // ── Servicio helpers ──
  const addCostoDirecto = () =>
    setCostosDirectos((prev) => [...prev, { id: Date.now(), nombre: '', valor: '' }]);
  const removeCostoDirecto = (id: number) =>
    setCostosDirectos((prev) => prev.filter((c) => c.id !== id));
  const updateCostoDirecto = (id: number, field: keyof CostoDirecto, value: string) =>
    setCostosDirectos((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));

  // ── Calculations ──
  const resultados = useMemo((): Resultados => {
    const margen = productType === 'reventa' ? margenReventa : margenElaborado;

    if (productType === 'fabricacion') {
      const costoMateriaPrima = materias.reduce(
        (sum, m) => sum + (parseFloat(m.cantidad) || 0) * (parseFloat(m.costoUnitario) || 0),
        0
      );
      const costosIndirectos =
        indirectosMode === 'porcentaje'
          ? costoMateriaPrima * (indirectosPct / 100)
          : parseFloat(indirectosFijo) || 0;
      const manoDeObra =
        ((parseFloat(tiempoProduccion) || 0) / 60) * (parseFloat(valorHora) || 0);
      const packaging = parseFloat(packagingCosto) || 0;
      const costoTotal = costoMateriaPrima + costosIndirectos + manoDeObra + packaging;
      const { precioFinal, gastosVentaTotal, gananciaNeta, margenNeto } = calcPrecio(costoTotal, margen, gastosVenta);
      return { costoMateriaPrima, costosIndirectos, manoDeObra, packaging, costoTotal, gastosVentaTotal, precioSugerido: precioFinal, margenReal: margenNeto, gananciaPorUnidad: gananciaNeta };

    } else if (productType === 'receta') {
      const rend = Math.max(parseFloat(rendimiento) || 1, 1);
      const totalInsumosReceta = materias.reduce((sum, m) => {
        if (m.usarPrecioUnitario) {
          const cant = parseFloat(m.cantidad) || 0;
          const rindePaquete = parseFloat(m.cantidadPorPaquete || '') || 1;
          const precioPaquete = parseFloat(m.precioCompraUnitario || '') || 0;
          return sum + (cant / rindePaquete) * precioPaquete;
        }
        return sum + (parseFloat(m.cantidad) || 0) * (parseFloat(m.costoUnitario) || 0);
      }, 0);
      const indirectosTanda =
        indirectosMode === 'porcentaje'
          ? totalInsumosReceta * (indirectosPct / 100)
          : parseFloat(indirectosFijo) || 0;
      const manoObraTanda =
        ((parseFloat(tiempoPreparacion) || 0) / 60) * (parseFloat(valorHora) || 0);
      const costoTanda = totalInsumosReceta + indirectosTanda + manoObraTanda;
      const costoMateriaPrima = totalInsumosReceta / rend;
      const costosIndirectos = indirectosTanda / rend;
      const manoDeObra = manoObraTanda / rend;
      const packaging = parseFloat(packagingCosto) || 0;
      const costoTotal = costoMateriaPrima + costosIndirectos + manoDeObra + packaging;
      const { precioFinal, gastosVentaTotal, gananciaNeta, margenNeto } = calcPrecio(costoTotal, margen, gastosVenta);
      return { costoMateriaPrima, costosIndirectos, manoDeObra, packaging, costoTotal, gastosVentaTotal, precioSugerido: precioFinal, margenReal: margenNeto, gananciaPorUnidad: gananciaNeta, costoTanda, rendimientoCalculado: rend };

    } else if (productType === 'servicio') {
      const horas = parseFloat(horasServicio) || 0;
      const vHora = parseFloat(valorHora) || 0;
      const manoDeObra = horas * vHora;
      const costosDir = costosDirectos.reduce((s, c) => s + (parseFloat(c.valor) || 0), 0);
      const subtotal = manoDeObra + costosDir;
      const costoOperativo = subtotal * (costoOperativoPct / 100);
      const costoTotal = subtotal + costoOperativo;
      const { precioFinal, gastosVentaTotal, gananciaNeta, margenNeto } = calcPrecio(costoTotal, margenServicio, gastosVenta);
      const tarifaHorariaImplicita = horas > 0 ? precioFinal / horas : 0;
      return { costoMateriaPrima: manoDeObra, costosIndirectos: costoOperativo, manoDeObra, packaging: costosDir, costoTotal, gastosVentaTotal, precioSugerido: precioFinal, margenReal: margenNeto, gananciaPorUnidad: gananciaNeta, tarifaHorariaImplicita };
    } else {
      const costoCompra = parseFloat(precioCompra) || 0;
      const totalAdicionales = costosAdicionales.reduce(
        (sum, c) => sum + (parseFloat(c.valor) || 0),
        0
      );
      const costoTotal = costoCompra + totalAdicionales;
      const { precioFinal, gastosVentaTotal, gananciaNeta, margenNeto } = calcPrecio(costoTotal, margen, gastosVenta);
      return { costoMateriaPrima: costoCompra, costosIndirectos: totalAdicionales, manoDeObra: 0, packaging: 0, costoTotal, gastosVentaTotal, precioSugerido: precioFinal, margenReal: margenNeto, gananciaPorUnidad: gananciaNeta };
    }
  }, [
    productType,
    materias,
    indirectosMode,
    indirectosPct,
    indirectosFijo,
    tiempoProduccion,
    tiempoPreparacion,
    rendimiento,
    valorHora,
    packagingCosto,
    margenElaborado,
    precioCompra,
    costosAdicionales,
    margenReventa,
    gastosVenta,
    horasServicio,
    costosDirectos,
    costoOperativoPct,
    margenServicio,
  ]);

  const hayDatos = resultados.costoTotal > 0;
  const margenBajo = hayDatos && resultados.margenReal < 20;
  const margenMedio = hayDatos && resultados.margenReal >= 20 && resultados.margenReal < 30;
  const margenBueno = hayDatos && resultados.margenReal >= 30;

  // ── Render ──
  return (
    <Box sx={{ bgcolor: '#F9F9F9', minHeight: '100vh' }}>
      <Header />

      {/* Hero */}
      <Box sx={{ bgcolor: '#000', pt: { xs: 10, md: 14 }, pb: { xs: 5, md: 7 } }}>
        <Container maxWidth="lg">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ color: '#FFFFFF99', mb: 3, textTransform: 'none', pl: 0, '&:hover': { color: '#fff', bgcolor: 'transparent' } }}
          >
            Volver al inicio
          </Button>
          <Typography variant="h3" sx={{ color: '#fff', fontWeight: 700, mb: 1.5 }}>
            Calculadora de{' '}
            <Box component="span" sx={{ color: '#FFEB5D' }}>
              costos
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ color: '#FFFFFF99', maxWidth: 560 }}>
            Calculá el costo real de tu producto y obtené un precio de venta sugerido en menos
            de 2 minutos.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Product type selector */}
        <Paper
          elevation={0}
          sx={{
            border: '1.5px solid #E0E0E0',
            borderRadius: 2,
            p: 3,
            mb: 3,
            bgcolor: '#fff',
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#666', mb: 2, textTransform: 'uppercase', letterSpacing: 1 }}>
            ¿Qué tipo de producto querés calcular?
          </Typography>
          <ToggleButtonGroup
            value={productType}
            exclusive
            onChange={(_, val) => { if (val) setProductType(val); }}
            sx={{ gap: 1.5, flexWrap: 'wrap' }}
          >
            <ToggleButton
              value="fabricacion"
              sx={{
                border: '1.5px solid #E0E0E0 !important',
                borderRadius: '8px !important',
                px: 3,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                gap: 1,
                '&.Mui-selected': { bgcolor: '#000 !important', color: '#fff !important', borderColor: '#000 !important' },
                '&:hover': { bgcolor: '#F5F5F5' },
              }}
            >
              <InventoryIcon fontSize="small" />
              Fabricación
            </ToggleButton>
            <ToggleButton
              value="receta"
              sx={{
                border: '1.5px solid #E0E0E0 !important',
                borderRadius: '8px !important',
                px: 3,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                gap: 1,
                '&.Mui-selected': { bgcolor: '#000 !important', color: '#fff !important', borderColor: '#000 !important' },
                '&:hover': { bgcolor: '#F5F5F5' },
              }}
            >
              <MenuBookIcon fontSize="small" />
              Receta / Tanda
            </ToggleButton>
            <ToggleButton
              value="reventa"
              sx={{
                border: '1.5px solid #E0E0E0 !important',
                borderRadius: '8px !important',
                px: 3,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                gap: 1,
                '&.Mui-selected': { bgcolor: '#000 !important', color: '#fff !important', borderColor: '#000 !important' },
                '&:hover': { bgcolor: '#F5F5F5' },
              }}
            >
              <ShoppingCartIcon fontSize="small" />
              Reventa
            </ToggleButton>
            <ToggleButton
              value="servicio"
              sx={{
                border: '1.5px solid #E0E0E0 !important',
                borderRadius: '8px !important',
                px: 3,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                gap: 1,
                '&.Mui-selected': { bgcolor: '#000 !important', color: '#fff !important', borderColor: '#000 !important' },
                '&:hover': { bgcolor: '#F5F5F5' },
              }}
            >
              <WorkOutlineIcon fontSize="small" />
              Servicio / Proyecto
            </ToggleButton>
          </ToggleButtonGroup>
          <Typography variant="caption" sx={{ display: 'block', mt: 1.5, color: '#999' }}>
            {productType === 'fabricacion' && 'Producís de a una unidad: ropa, carpintería, joyería, electrónica...'}
            {productType === 'receta' && 'Tu preparación rinde varias unidades: gastronomía, velas, cosmética artesanal...'}
            {productType === 'reventa' && 'Comprás el producto terminado a un proveedor y lo revendés sin transformarlo.'}
            {productType === 'servicio' && 'Prestás un servicio o ejecutás un proyecto: consultoría, diseño, construcción, reparaciones...'}
          </Typography>
        </Paper>

        {/* Two-column layout */}
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            alignItems: 'flex-start',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          {/* ── LEFT: Inputs ── */}
          <Box sx={{ flex: '1 1 0', minWidth: 0 }}>
            {/* ━━ FABRICACIÓN ━━ */}
            {productType === 'fabricacion' && (
              <Stack spacing={2.5}>
                {/* Materias primas */}
                <Paper elevation={0} sx={{ border: '1.5px solid #E0E0E0', borderRadius: 2, p: 3, bgcolor: '#fff' }}>
                  <SectionTitle>1. Materias primas e insumos</SectionTitle>
                  <Stack spacing={1.5}>
                    {materias.map((m, idx) => (
                      <Box
                        key={m.id}
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 1fr auto' },
                          gap: 1,
                          alignItems: 'center',
                        }}
                      >
                        <TextField
                          size="small"
                          placeholder={`Insumo ${idx + 1}`}
                          value={m.nombre}
                          onChange={(e) => updateMateria(m.id, 'nombre', e.target.value)}
                          label="Nombre"
                          autoComplete="off"
                        />
                        <TextField
                          size="small"
                          type="number"
                          label="Cantidad"
                          placeholder="1"
                          value={m.cantidad}
                          onChange={(e) => updateMateria(m.id, 'cantidad', e.target.value)}
                          inputProps={{ min: 0, step: 'any' }}
                          autoComplete="off"
                        />
                        <TextField
                          size="small"
                          type="number"
                          label="Costo unitario"
                          placeholder="0"
                          value={m.costoUnitario}
                          onChange={(e) => updateMateria(m.id, 'costoUnitario', e.target.value)}
                          inputProps={{ min: 0, step: 'any' }}
                          InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                          autoComplete="off"
                        />
                        <IconButton
                          size="small"
                          onClick={() => removeMateria(m.id)}
                          disabled={materias.length === 1}
                          sx={{ color: '#999', '&:hover': { color: '#d32f2f' } }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Stack>
                  <Button
                    startIcon={<AddIcon />}
                    onClick={addMateria}
                    size="small"
                    sx={{
                      mt: 2,
                      textTransform: 'none',
                      color: '#000',
                      border: '1.5px dashed #CCC',
                      borderRadius: 1.5,
                      px: 2,
                      py: 0.75,
                      '&:hover': { bgcolor: '#F5F5F5', borderColor: '#999' },
                    }}
                  >
                    Agregar insumo
                  </Button>
                  {resultados.costoMateriaPrima > 0 && (
                    <Box sx={{ mt: 1.5, p: 1.5, bgcolor: '#F9F9F9', borderRadius: 1.5 }}>
                      <Typography variant="caption" sx={{ color: '#666' }}>
                        Subtotal materias primas:{' '}
                        <strong>{fmt(resultados.costoMateriaPrima)}</strong>
                      </Typography>
                    </Box>
                  )}
                </Paper>

                {/* Costos indirectos */}
                <Paper elevation={0} sx={{ border: '1.5px solid #E0E0E0', borderRadius: 2, p: 3, bgcolor: '#fff' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <SectionTitle>2. Costos indirectos</SectionTitle>
                    <Tooltip title="Gastos como luz, gas, alquiler, amortización de equipos, etc. que no se asignan directamente al producto." placement="top">
                      <InfoOutlinedIcon sx={{ fontSize: 16, color: '#999', cursor: 'help', mb: 0.5 }} />
                    </Tooltip>
                  </Box>

                  <FormControl component="fieldset" size="small">
                    <FormLabel sx={{ fontSize: '0.8rem', color: '#666', mb: 1 }}>Modo de cálculo</FormLabel>
                    <RadioGroup
                      row
                      value={indirectosMode}
                      onChange={(e) => setIndirectosMode(e.target.value as IndirectosMode)}
                    >
                      <FormControlLabel
                        value="porcentaje"
                        control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#000' } }} />}
                        label={<Typography variant="body2">% sobre materia prima</Typography>}
                      />
                      <FormControlLabel
                        value="fijo"
                        control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#000' } }} />}
                        label={<Typography variant="body2">Valor fijo por unidad</Typography>}
                      />
                    </RadioGroup>
                  </FormControl>

                  {indirectosMode === 'porcentaje' ? (
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" sx={{ color: '#333' }}>
                          Porcentaje de indirectos
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {indirectosPct}%
                        </Typography>
                      </Box>
                      <Slider
                        value={indirectosPct}
                        onChange={(_, val) => setIndirectosPct(val as number)}
                        min={0}
                        max={50}
                        step={1}
                        marks={[{ value: 0, label: '0%' }, { value: 25, label: '25%' }, { value: 50, label: '50%' }]}
                        sx={{
                          color: '#000',
                          '& .MuiSlider-thumb': { bgcolor: '#000' },
                          '& .MuiSlider-markLabel': { fontSize: '0.7rem', color: '#999' },
                        }}
                      />
                    </Box>
                  ) : (
                    <TextField
                      size="small"
                      type="number"
                      label="Costo indirecto por unidad"
                      placeholder="0"
                      value={indirectosFijo}
                      onChange={(e) => setIndirectosFijo(e.target.value)}
                      inputProps={{ min: 0, step: 'any' }}
                      InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                      sx={{ mt: 2, maxWidth: 240 }}
                      autoComplete="off"
                    />
                  )}
                </Paper>

                {/* Mano de obra */}
                <Paper elevation={0} sx={{ border: '1.5px solid #E0E0E0', borderRadius: 2, p: 3, bgcolor: '#fff' }}>
                  <SectionTitle>3. Mano de obra</SectionTitle>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                      gap: 2,
                    }}
                  >
                    <TextField
                      size="small"
                      type="number"
                      label="Tiempo de producción por unidad"
                      placeholder="30"
                      value={tiempoProduccion}
                      onChange={(e) => setTiempoProduccion(e.target.value)}
                      inputProps={{ min: 0, step: 'any' }}
                      InputProps={{ endAdornment: <InputAdornment position="end">min</InputAdornment> }}
                      autoComplete="off"
                    />
                    <TextField
                      size="small"
                      type="number"
                      label="Valor hora de trabajo"
                      placeholder="0"
                      value={valorHora}
                      onChange={(e) => setValorHora(e.target.value)}
                      inputProps={{ min: 0, step: 'any' }}
                      InputProps={{ startAdornment: <InputAdornment position="start">$/h</InputAdornment> }}
                      autoComplete="off"
                    />
                  </Box>
                  {resultados.manoDeObra > 0 && (
                    <Box sx={{ mt: 1.5, p: 1.5, bgcolor: '#F9F9F9', borderRadius: 1.5 }}>
                      <Typography variant="caption" sx={{ color: '#666' }}>
                        Mano de obra por unidad: <strong>{fmt(resultados.manoDeObra)}</strong>
                      </Typography>
                    </Box>
                  )}
                </Paper>

                {/* Packaging */}
                <Paper elevation={0} sx={{ border: '1.5px solid #E0E0E0', borderRadius: 2, p: 3, bgcolor: '#fff' }}>
                  <SectionTitle>4. Packaging</SectionTitle>
                  <TextField
                    size="small"
                    type="number"
                    label="Costo de packaging por unidad"
                    placeholder="0"
                    value={packagingCosto}
                    onChange={(e) => setPackagingCosto(e.target.value)}
                    inputProps={{ min: 0, step: 'any' }}
                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                    sx={{ maxWidth: 280 }}
                    autoComplete="off"
                  />
                </Paper>

                {/* Recargo */}
                <Paper elevation={0} sx={{ border: '1.5px solid #E0E0E0', borderRadius: 2, p: 3, bgcolor: '#fff' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <SectionTitle>5. ¿Cuánto querés ganar?</SectionTitle>
                    <Tooltip title="Este porcentaje se suma al costo para calcular el precio de venta. Ej: costo $100 + 50% recargo = precio $150. El margen real resultante (ganancia / precio) siempre será menor que este número." placement="top">
                      <InfoOutlinedIcon sx={{ fontSize: 16, color: '#999', cursor: 'help', mb: 0.5 }} />
                    </Tooltip>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#888', display: 'block', mb: 2 }}>
                    Recargo sobre el costo · Precio = Costo × (1 + recargo%)
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ color: '#333' }}>Recargo</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{margenElaborado}%</Typography>
                  </Box>
                  <Slider value={margenElaborado} onChange={(_, val) => setMargenElaborado(val as number)} min={0} max={200} step={1}
                    marks={[{ value: 0, label: '0%' }, { value: 50, label: '50%' }, { value: 100, label: '100%' }, { value: 200, label: '200%' }]}
                    sx={{ color: '#000', '& .MuiSlider-thumb': { bgcolor: '#000' }, '& .MuiSlider-markLabel': { fontSize: '0.7rem', color: '#999' } }}
                  />
                </Paper>
              </Stack>
            )}

            {/* ━━ RECETA / TANDA ━━ */}
            {productType === 'receta' && (
              <Stack spacing={2.5}>
                {/* Rendimiento — campo clave, va primero para dar contexto */}
                <Paper elevation={0} sx={{ border: '2px solid #000', borderRadius: 2, p: 3, bgcolor: '#FFFDE7' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <SectionTitle>¿Cuántas unidades rinde tu preparación?</SectionTitle>
                    <Tooltip title="Ej: si hacés 12 empanadas con esta receta, escribí 12. Todo el resto se cargará para la tanda completa." placement="top">
                      <InfoOutlinedIcon sx={{ fontSize: 16, color: '#999', cursor: 'help', mb: 0.5 }} />
                    </Tooltip>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <TextField
                      size="small"
                      type="number"
                      label="Rendimiento (unidades por tanda)"
                      placeholder="12"
                      value={rendimiento}
                      onChange={(e) => setRendimiento(e.target.value)}
                      inputProps={{ min: 1, step: 1 }}
                      InputProps={{ endAdornment: <InputAdornment position="end">unidades</InputAdornment> }}
                      sx={{ maxWidth: 280 }}
                      autoComplete="off"
                    />
                    {resultados.costoTanda && resultados.rendimientoCalculado && (
                      <Box sx={{ p: 1.5, bgcolor: '#fff', borderRadius: 1.5, border: '1px solid #E0E0E0' }}>
                        <Typography variant="caption" sx={{ color: '#666' }}>
                          Costo total de la tanda: <strong>{fmt(resultados.costoTanda)}</strong>
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Paper>

                {/* Insumos de la tanda */}
                <Paper elevation={0} sx={{ border: '1.5px solid #E0E0E0', borderRadius: 2, p: 3, bgcolor: '#fff' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <SectionTitle>1. Insumos de la receta</SectionTitle>
                    <Tooltip title="Cargá los insumos para preparar toda la tanda. Ej: 1kg de harina para 12 empanadas." placement="top">
                      <InfoOutlinedIcon sx={{ fontSize: 16, color: '#999', cursor: 'help', mb: 0.5 }} />
                    </Tooltip>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#888', display: 'block', mb: 1.5 }}>
                    Cantidades y costos para <strong>toda la tanda</strong>, no por unidad. Usá{' '}
                    <SwapHorizIcon sx={{ fontSize: 14, verticalAlign: 'middle', color: '#aaa' }} /> para calcular desde precio de paquete.
                  </Typography>
                  <Stack spacing={1.5}>
                    {materias.map((m, idx) => (
                      <Box key={m.id}>
                        {m.usarPrecioUnitario ? (
                          <Box sx={{ border: '1px solid #E0E0E0', borderRadius: 1.5, p: 1.5, bgcolor: '#FAFAFA' }}>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 80px auto auto' }, gap: 1, alignItems: 'center', mb: 1 }}>
                              <TextField size="small" placeholder={`Insumo ${idx + 1}`} value={m.nombre} onChange={(e) => updateMateria(m.id, 'nombre', e.target.value)} label="Nombre" autoComplete="off" />
                              <TextField size="small" type="number" label="Cantidad usada" placeholder="500" value={m.cantidad} onChange={(e) => updateMateria(m.id, 'cantidad', e.target.value)} inputProps={{ min: 0, step: 'any' }} autoComplete="off" />
                              <TextField size="small" label="Unidad" placeholder="gr" value={m.unidadMedida || ''} onChange={(e) => updateMateria(m.id, 'unidadMedida', e.target.value)} autoComplete="off" />
                              <Tooltip title="Volver a modo directo"><IconButton size="small" onClick={() => toggleMateriaPrecioUnitario(m.id)} sx={{ color: '#555', '&:hover': { color: '#000' } }}><SwapHorizIcon fontSize="small" /></IconButton></Tooltip>
                              <IconButton size="small" onClick={() => removeMateria(m.id)} disabled={materias.length === 1} sx={{ color: '#999', '&:hover': { color: '#d32f2f' } }}><DeleteOutlineIcon fontSize="small" /></IconButton>
                            </Box>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr auto' }, gap: 1, alignItems: 'center' }}>
                              <TextField size="small" type="number" label="Precio del paquete" placeholder="4000" value={m.precioCompraUnitario || ''} onChange={(e) => updateMateria(m.id, 'precioCompraUnitario', e.target.value)} inputProps={{ min: 0, step: 'any' }} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} autoComplete="off" />
                              <TextField size="small" type="number" label={`Paquete rinde (${m.unidadMedida || 'u'})`} placeholder="1000" value={m.cantidadPorPaquete || ''} onChange={(e) => updateMateria(m.id, 'cantidadPorPaquete', e.target.value)} inputProps={{ min: 0, step: 'any' }} autoComplete="off" />
                              {(() => {
                                const cant = parseFloat(m.cantidad) || 0;
                                const rinde = parseFloat(m.cantidadPorPaquete || '') || 0;
                                const precio = parseFloat(m.precioCompraUnitario || '') || 0;
                                const costoCalc = rinde > 0 ? (cant / rinde) * precio : 0;
                                return costoCalc > 0 ? (
                                  <Box sx={{ px: 1.5, py: 0.75, bgcolor: '#fff', border: '1px solid #E0E0E0', borderRadius: 1, whiteSpace: 'nowrap' }}>
                                    <Typography variant="caption" sx={{ color: '#666' }}>= <strong>{fmt(costoCalc)}</strong></Typography>
                                  </Box>
                                ) : null;
                              })()}
                            </Box>
                          </Box>
                        ) : (
                          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 1fr auto auto' }, gap: 1, alignItems: 'center' }}>
                            <TextField size="small" placeholder={`Insumo ${idx + 1}`} value={m.nombre} onChange={(e) => updateMateria(m.id, 'nombre', e.target.value)} label="Nombre" autoComplete="off" />
                            <TextField size="small" type="number" label="Cantidad" placeholder="1" value={m.cantidad} onChange={(e) => updateMateria(m.id, 'cantidad', e.target.value)} inputProps={{ min: 0, step: 'any' }} autoComplete="off" />
                            <TextField size="small" type="number" label="Costo" placeholder="0" value={m.costoUnitario} onChange={(e) => updateMateria(m.id, 'costoUnitario', e.target.value)} inputProps={{ min: 0, step: 'any' }} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} autoComplete="off" />
                            <Tooltip title="Calcular desde precio de paquete"><IconButton size="small" onClick={() => toggleMateriaPrecioUnitario(m.id)} sx={{ color: '#bbb', '&:hover': { color: '#555' } }}><SwapHorizIcon fontSize="small" /></IconButton></Tooltip>
                            <IconButton size="small" onClick={() => removeMateria(m.id)} disabled={materias.length === 1} sx={{ color: '#999', '&:hover': { color: '#d32f2f' } }}><DeleteOutlineIcon fontSize="small" /></IconButton>
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Stack>
                  <Button startIcon={<AddIcon />} onClick={addMateria} size="small"
                    sx={{ mt: 2, textTransform: 'none', color: '#000', border: '1.5px dashed #CCC', borderRadius: 1.5, px: 2, py: 0.75, '&:hover': { bgcolor: '#F5F5F5', borderColor: '#999' } }}
                  >
                    Agregar insumo
                  </Button>
                  {resultados.costoMateriaPrima > 0 && (
                    <Box sx={{ mt: 1.5, p: 1.5, bgcolor: '#F9F9F9', borderRadius: 1.5 }}>
                      <Typography variant="caption" sx={{ color: '#666' }}>
                        Costo de insumos por unidad: <strong>{fmt(resultados.costoMateriaPrima)}</strong>
                      </Typography>
                    </Box>
                  )}
                </Paper>

                {/* Costos indirectos */}
                <Paper elevation={0} sx={{ border: '1.5px solid #E0E0E0', borderRadius: 2, p: 3, bgcolor: '#fff' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <SectionTitle>2. Costos indirectos</SectionTitle>
                    <Tooltip title="Luz, gas, alquiler del local, amortización de equipos (horno, heladera, etc.). El porcentaje se aplica sobre el total de insumos de la tanda." placement="top">
                      <InfoOutlinedIcon sx={{ fontSize: 16, color: '#999', cursor: 'help', mb: 0.5 }} />
                    </Tooltip>
                  </Box>
                  <FormControl component="fieldset" size="small">
                    <FormLabel sx={{ fontSize: '0.8rem', color: '#666', mb: 1 }}>Modo de cálculo</FormLabel>
                    <RadioGroup row value={indirectosMode} onChange={(e) => setIndirectosMode(e.target.value as IndirectosMode)}>
                      <FormControlLabel value="porcentaje" control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#000' } }} />} label={<Typography variant="body2">% sobre insumos</Typography>} />
                      <FormControlLabel value="fijo" control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#000' } }} />} label={<Typography variant="body2">Valor fijo por tanda</Typography>} />
                    </RadioGroup>
                  </FormControl>
                  {indirectosMode === 'porcentaje' ? (
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" sx={{ color: '#333' }}>Porcentaje de indirectos</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{indirectosPct}%</Typography>
                      </Box>
                      <Slider value={indirectosPct} onChange={(_, val) => setIndirectosPct(val as number)} min={0} max={50} step={1}
                        marks={[{ value: 0, label: '0%' }, { value: 25, label: '25%' }, { value: 50, label: '50%' }]}
                        sx={{ color: '#000', '& .MuiSlider-thumb': { bgcolor: '#000' }, '& .MuiSlider-markLabel': { fontSize: '0.7rem', color: '#999' } }}
                      />
                    </Box>
                  ) : (
                    <TextField size="small" type="number" label="Costo indirecto por tanda" placeholder="0" value={indirectosFijo} onChange={(e) => setIndirectosFijo(e.target.value)}
                      inputProps={{ min: 0, step: 'any' }} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} sx={{ mt: 2, maxWidth: 240 }} autoComplete="off"
                    />
                  )}
                </Paper>

                {/* Mano de obra total de la tanda */}
                <Paper elevation={0} sx={{ border: '1.5px solid #E0E0E0', borderRadius: 2, p: 3, bgcolor: '#fff' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <SectionTitle>3. Mano de obra</SectionTitle>
                    <Tooltip title="Tiempo total para preparar toda la tanda. Se divide automáticamente por el rendimiento para obtener el costo por unidad." placement="top">
                      <InfoOutlinedIcon sx={{ fontSize: 16, color: '#999', cursor: 'help', mb: 0.5 }} />
                    </Tooltip>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    <TextField size="small" type="number" label="Tiempo total de preparación" placeholder="60" value={tiempoPreparacion} onChange={(e) => setTiempoPreparacion(e.target.value)}
                      inputProps={{ min: 0, step: 'any' }} InputProps={{ endAdornment: <InputAdornment position="end">min</InputAdornment> }} autoComplete="off"
                    />
                    <TextField size="small" type="number" label="Valor hora de trabajo" placeholder="0" value={valorHora} onChange={(e) => setValorHora(e.target.value)}
                      inputProps={{ min: 0, step: 'any' }} InputProps={{ startAdornment: <InputAdornment position="start">$/h</InputAdornment> }} autoComplete="off"
                    />
                  </Box>
                  {resultados.manoDeObra > 0 && (
                    <Box sx={{ mt: 1.5, p: 1.5, bgcolor: '#F9F9F9', borderRadius: 1.5 }}>
                      <Typography variant="caption" sx={{ color: '#666' }}>
                        Mano de obra por unidad: <strong>{fmt(resultados.manoDeObra)}</strong>
                      </Typography>
                    </Box>
                  )}
                </Paper>

                {/* Packaging */}
                <Paper elevation={0} sx={{ border: '1.5px solid #E0E0E0', borderRadius: 2, p: 3, bgcolor: '#fff' }}>
                  <SectionTitle>4. Packaging</SectionTitle>
                  <TextField size="small" type="number" label="Costo de packaging por unidad" placeholder="0" value={packagingCosto} onChange={(e) => setPackagingCosto(e.target.value)}
                    inputProps={{ min: 0, step: 'any' }} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} sx={{ maxWidth: 280 }} autoComplete="off"
                  />
                </Paper>

                {/* Recargo */}
                <Paper elevation={0} sx={{ border: '1.5px solid #E0E0E0', borderRadius: 2, p: 3, bgcolor: '#fff' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <SectionTitle>5. ¿Cuánto querés ganar?</SectionTitle>
                    <Tooltip title="Este porcentaje se suma al costo por unidad para calcular el precio. Ej: costo $100 + 50% recargo = precio $150. El margen real resultante (ganancia / precio) siempre será menor que este número." placement="top">
                      <InfoOutlinedIcon sx={{ fontSize: 16, color: '#999', cursor: 'help', mb: 0.5 }} />
                    </Tooltip>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#888', display: 'block', mb: 2 }}>
                    Recargo sobre el costo por unidad · Precio = Costo × (1 + recargo%)
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ color: '#333' }}>Recargo</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{margenElaborado}%</Typography>
                  </Box>
                  <Slider value={margenElaborado} onChange={(_, val) => setMargenElaborado(val as number)} min={0} max={200} step={1}
                    marks={[{ value: 0, label: '0%' }, { value: 50, label: '50%' }, { value: 100, label: '100%' }, { value: 200, label: '200%' }]}
                    sx={{ color: '#000', '& .MuiSlider-thumb': { bgcolor: '#000' }, '& .MuiSlider-markLabel': { fontSize: '0.7rem', color: '#999' } }}
                  />
                </Paper>
              </Stack>
            )}

            {/* ━━ REVENTA ━━ */}
            {productType === 'reventa' && (
              <Stack spacing={2.5}>
                {/* Precio de compra */}
                <Paper elevation={0} sx={{ border: '1.5px solid #E0E0E0', borderRadius: 2, p: 3, bgcolor: '#fff' }}>
                  <SectionTitle>1. Precio de compra</SectionTitle>
                  <TextField
                    size="small"
                    type="number"
                    label="Precio de compra al proveedor"
                    placeholder="0"
                    value={precioCompra}
                    onChange={(e) => setPrecioCompra(e.target.value)}
                    inputProps={{ min: 0, step: 'any' }}
                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                    sx={{ maxWidth: 320 }}
                    autoComplete="off"
                  />
                </Paper>

                {/* Costos adicionales */}
                <Paper elevation={0} sx={{ border: '1.5px solid #E0E0E0', borderRadius: 2, p: 3, bgcolor: '#fff' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <SectionTitle>2. Costos adicionales</SectionTitle>
                    <Tooltip title="Envío, impuestos, comisiones de plataformas (Mercado Pago, MercadoLibre), etc." placement="top">
                      <InfoOutlinedIcon sx={{ fontSize: 16, color: '#999', cursor: 'help', mb: 0.5 }} />
                    </Tooltip>
                  </Box>
                  <Stack spacing={1.5}>
                    {costosAdicionales.map((c) => (
                      <Box
                        key={c.id}
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr auto' },
                          gap: 1,
                          alignItems: 'center',
                        }}
                      >
                        <TextField
                          size="small"
                          placeholder="Ej: Envío, impuesto, comisión"
                          value={c.nombre}
                          onChange={(e) => updateCostoAdicional(c.id, 'nombre', e.target.value)}
                          label="Concepto"
                          autoComplete="off"
                        />
                        <TextField
                          size="small"
                          type="number"
                          label="Monto"
                          placeholder="0"
                          value={c.valor}
                          onChange={(e) => updateCostoAdicional(c.id, 'valor', e.target.value)}
                          inputProps={{ min: 0, step: 'any' }}
                          InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                          autoComplete="off"
                        />
                        <IconButton
                          size="small"
                          onClick={() => removeCostoAdicional(c.id)}
                          disabled={costosAdicionales.length === 1}
                          sx={{ color: '#999', '&:hover': { color: '#d32f2f' } }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Stack>
                  <Button
                    startIcon={<AddIcon />}
                    onClick={addCostoAdicional}
                    size="small"
                    sx={{
                      mt: 2,
                      textTransform: 'none',
                      color: '#000',
                      border: '1.5px dashed #CCC',
                      borderRadius: 1.5,
                      px: 2,
                      py: 0.75,
                      '&:hover': { bgcolor: '#F5F5F5', borderColor: '#999' },
                    }}
                  >
                    Agregar costo
                  </Button>
                </Paper>

                {/* Recargo */}
                <Paper elevation={0} sx={{ border: '1.5px solid #E0E0E0', borderRadius: 2, p: 3, bgcolor: '#fff' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <SectionTitle>3. ¿Cuánto querés ganar?</SectionTitle>
                    <Tooltip title="Este porcentaje se suma al costo total para calcular el precio de venta. Ej: costo $100 + 50% recargo = precio $150. El margen real resultante (ganancia / precio) siempre será menor que este número." placement="top">
                      <InfoOutlinedIcon sx={{ fontSize: 16, color: '#999', cursor: 'help', mb: 0.5 }} />
                    </Tooltip>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#888', display: 'block', mb: 2 }}>
                    Recargo sobre el costo · Precio = Costo × (1 + recargo%)
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ color: '#333' }}>Recargo</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{margenReventa}%</Typography>
                  </Box>
                  <Slider
                    value={margenReventa}
                    onChange={(_, val) => setMargenReventa(val as number)}
                    min={0}
                    max={200}
                    step={1}
                    marks={[
                      { value: 0, label: '0%' },
                      { value: 50, label: '50%' },
                      { value: 100, label: '100%' },
                      { value: 200, label: '200%' },
                    ]}
                    sx={{
                      color: '#000',
                      '& .MuiSlider-thumb': { bgcolor: '#000' },
                      '& .MuiSlider-markLabel': { fontSize: '0.7rem', color: '#999' },
                    }}
                  />
                </Paper>
              </Stack>
            )}

            {/* ━━ SERVICIO / PROYECTO ━━ */}
            {productType === 'servicio' && (
              <Stack spacing={2.5}>
                {/* Horas y valor hora */}
                <Paper elevation={0} sx={{ border: '2px solid #000', borderRadius: 2, p: 3, bgcolor: '#FFFDE7' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <SectionTitle>1. Tiempo del servicio</SectionTitle>
                    <Tooltip title="Estimá cuántas horas demanda el servicio o proyecto completo y cuánto vale tu hora de trabajo." placement="top">
                      <InfoOutlinedIcon sx={{ fontSize: 16, color: '#999', cursor: 'help', mb: 0.5 }} />
                    </Tooltip>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    <TextField
                      size="small"
                      type="number"
                      label="Horas estimadas"
                      placeholder="2"
                      value={horasServicio}
                      onChange={(e) => setHorasServicio(e.target.value)}
                      inputProps={{ min: 0, step: 'any' }}
                      InputProps={{ endAdornment: <InputAdornment position="end">hs</InputAdornment> }}
                      autoComplete="off"
                    />
                    <TextField
                      size="small"
                      type="number"
                      label="Valor hora"
                      placeholder="0"
                      value={valorHora}
                      onChange={(e) => setValorHora(e.target.value)}
                      inputProps={{ min: 0, step: 'any' }}
                      InputProps={{ startAdornment: <InputAdornment position="start">$/h</InputAdornment> }}
                      autoComplete="off"
                    />
                  </Box>
                  {resultados.costoMateriaPrima > 0 && (
                    <Box sx={{ mt: 1.5, p: 1.5, bgcolor: '#fff', borderRadius: 1.5, border: '1px solid #E0E0E0' }}>
                      <Typography variant="caption" sx={{ color: '#666' }}>
                        Costo de mano de obra: <strong>{fmt(resultados.costoMateriaPrima)}</strong>
                      </Typography>
                    </Box>
                  )}
                </Paper>

                {/* Costos directos del proyecto */}
                <Paper elevation={0} sx={{ border: '1.5px solid #E0E0E0', borderRadius: 2, p: 3, bgcolor: '#fff' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <SectionTitle>2. Costos directos del proyecto</SectionTitle>
                    <Tooltip title="Materiales, traslados, herramientas, subcontrataciones u otros gastos específicos de este servicio." placement="top">
                      <InfoOutlinedIcon sx={{ fontSize: 16, color: '#999', cursor: 'help', mb: 0.5 }} />
                    </Tooltip>
                  </Box>
                  <Stack spacing={1.5}>
                    {costosDirectos.map((c) => (
                      <Box key={c.id} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr auto' }, gap: 1, alignItems: 'center' }}>
                        <TextField size="small" placeholder="Ej: Materiales, traslado" value={c.nombre} onChange={(e) => updateCostoDirecto(c.id, 'nombre', e.target.value)} label="Concepto" autoComplete="off" />
                        <TextField size="small" type="number" label="Monto" placeholder="0" value={c.valor} onChange={(e) => updateCostoDirecto(c.id, 'valor', e.target.value)} inputProps={{ min: 0, step: 'any' }} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} autoComplete="off" />
                        <IconButton size="small" onClick={() => removeCostoDirecto(c.id)} disabled={costosDirectos.length === 1} sx={{ color: '#999', '&:hover': { color: '#d32f2f' } }}>
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Stack>
                  <Button startIcon={<AddIcon />} onClick={addCostoDirecto} size="small"
                    sx={{ mt: 2, textTransform: 'none', color: '#000', border: '1.5px dashed #CCC', borderRadius: 1.5, px: 2, py: 0.75, '&:hover': { bgcolor: '#F5F5F5', borderColor: '#999' } }}
                  >
                    Agregar costo
                  </Button>
                </Paper>

                {/* Gastos operativos (overhead) */}
                <Paper elevation={0} sx={{ border: '1.5px solid #E0E0E0', borderRadius: 2, p: 3, bgcolor: '#fff' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <SectionTitle>3. Gastos operativos (overhead)</SectionTitle>
                    <Tooltip title="Alquiler, servicios, internet, software, contador, etc. Se prorratean por proyecto como % del costo directo total." placement="top">
                      <InfoOutlinedIcon sx={{ fontSize: 16, color: '#999', cursor: 'help', mb: 0.5 }} />
                    </Tooltip>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#888', display: 'block', mb: 2 }}>
                    % aplicado sobre (mano de obra + costos directos)
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ color: '#333' }}>Overhead</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{costoOperativoPct}%</Typography>
                  </Box>
                  <Slider
                    value={costoOperativoPct}
                    onChange={(_, val) => setCostoOperativoPct(val as number)}
                    min={0} max={50} step={1}
                    marks={[{ value: 0, label: '0%' }, { value: 25, label: '25%' }, { value: 50, label: '50%' }]}
                    sx={{ color: '#000', '& .MuiSlider-thumb': { bgcolor: '#000' }, '& .MuiSlider-markLabel': { fontSize: '0.7rem', color: '#999' } }}
                  />
                </Paper>

                {/* Recargo */}
                <Paper elevation={0} sx={{ border: '1.5px solid #E0E0E0', borderRadius: 2, p: 3, bgcolor: '#fff' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <SectionTitle>4. ¿Cuánto querés ganar?</SectionTitle>
                    <Tooltip title="Recargo sobre el costo total del proyecto para calcular el precio de venta." placement="top">
                      <InfoOutlinedIcon sx={{ fontSize: 16, color: '#999', cursor: 'help', mb: 0.5 }} />
                    </Tooltip>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#888', display: 'block', mb: 2 }}>
                    Recargo sobre el costo · Precio = Costo × (1 + recargo%)
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ color: '#333' }}>Recargo</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{margenServicio}%</Typography>
                  </Box>
                  <Slider
                    value={margenServicio}
                    onChange={(_, val) => setMargenServicio(val as number)}
                    min={0} max={200} step={1}
                    marks={[{ value: 0, label: '0%' }, { value: 50, label: '50%' }, { value: 100, label: '100%' }, { value: 200, label: '200%' }]}
                    sx={{ color: '#000', '& .MuiSlider-thumb': { bgcolor: '#000' }, '& .MuiSlider-markLabel': { fontSize: '0.7rem', color: '#999' } }}
                  />
                </Paper>
              </Stack>
            )}

            {/* ┅┅ GASTOS DE VENTA (común a todos los modos) ┅┅ */}
            <Paper elevation={0} sx={{ mt: 2.5, border: '1.5px dashed #BDBDBD', borderRadius: 2, p: 3, bgcolor: '#fff' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <SectionTitle>Gastos de la venta</SectionTitle>
                <Tooltip
                  title="Comisiones y costos que se descuentan cuando vendés: plataformas (MercadoLibre, PedidosYa, Rappi), comisiones bancarias, Mercado Pago, etc. El precio sugerido se ajusta automáticamente para cubrirlos y mantener tu ganancia neta."
                  placement="top"
                >
                  <InfoOutlinedIcon sx={{ fontSize: 16, color: '#999', cursor: 'help', mb: 0.5 }} />
                </Tooltip>
              </Box>
              <Typography variant="caption" sx={{ color: '#888', display: 'block', mb: gastosVenta.length > 0 ? 2 : 1.5 }}>
                Opcional · El precio se ajusta automáticamente para que tu ganancia sea la indicada arriba
              </Typography>

              {gastosVenta.length > 0 && (
                <Stack spacing={1.5} sx={{ mb: 2 }}>
                  {gastosVenta.map((g) => (
                    <Box
                      key={g.id}
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '2fr 80px 1fr auto' },
                        gap: 1,
                        alignItems: 'center',
                      }}
                    >
                      <TextField
                        size="small"
                        placeholder="Ej: Comisión ML, Mercado Pago"
                        value={g.nombre}
                        onChange={(e) => updateGastoVenta(g.id, { nombre: e.target.value })}
                        label="Concepto"
                        autoComplete="off"
                      />
                      <ToggleButtonGroup
                        value={g.tipo}
                        exclusive
                        size="small"
                        onChange={(_, val) => { if (val) updateGastoVenta(g.id, { tipo: val as 'porcentaje' | 'fijo' }); }}
                        sx={{
                          height: 40,
                          '& .MuiToggleButton-root': {
                            px: 1.5,
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            border: '1.5px solid #E0E0E0 !important',
                            '&.Mui-selected': { bgcolor: '#000 !important', color: '#fff !important', borderColor: '#000 !important' },
                          },
                        }}
                      >
                        <ToggleButton value="porcentaje">%</ToggleButton>
                        <ToggleButton value="fijo">$</ToggleButton>
                      </ToggleButtonGroup>
                      <TextField
                        size="small"
                        type="number"
                        label={g.tipo === 'porcentaje' ? '% del precio' : 'Monto fijo'}
                        placeholder="0"
                        value={g.valor}
                        onChange={(e) => updateGastoVenta(g.id, { valor: e.target.value })}
                        inputProps={{ min: 0, step: 'any' }}
                        InputProps={
                          g.tipo === 'fijo'
                            ? { startAdornment: <InputAdornment position="start">$</InputAdornment> }
                            : { endAdornment: <InputAdornment position="end">%</InputAdornment> }
                        }
                        autoComplete="off"
                      />
                      <IconButton
                        size="small"
                        onClick={() => removeGastoVenta(g.id)}
                        sx={{ color: '#999', '&:hover': { color: '#d32f2f' } }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Stack>
              )}

              <Button
                startIcon={<AddIcon />}
                onClick={addGastoVenta}
                size="small"
                sx={{
                  textTransform: 'none',
                  color: '#000',
                  border: '1.5px dashed #CCC',
                  borderRadius: 1.5,
                  px: 2,
                  py: 0.75,
                  '&:hover': { bgcolor: '#F5F5F5', borderColor: '#999' },
                }}
              >
                Agregar gasto de venta
              </Button>
            </Paper>
          </Box>

          {/* ── RIGHT: Results ── */}
          <Box sx={{ width: { xs: '100%', md: 340 }, flexShrink: 0 }}>
            <Box sx={{ position: { md: 'sticky' }, top: { md: 96 } }}>
              {/* Alerts */}
              {margenBajo && (
                <Alert
                  icon={<WarningAmberIcon />}
                  severity="warning"
                  sx={{ mb: 2, borderRadius: 2, border: '1.5px solid #FF9800' }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Margen muy bajo
                  </Typography>
                  <Typography variant="caption">
                    Un margen real por debajo del 20% puede no cubrir gastos operativos. Revisá
                    tu estructura de costos o ajustá el precio.
                  </Typography>
                </Alert>
              )}
              {margenMedio && (
                <Alert
                  icon={<TrendingUpIcon />}
                  severity="info"
                  sx={{ mb: 2, borderRadius: 2, border: '1.5px solid #0288d1' }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Margen aceptable
                  </Typography>
                  <Typography variant="caption">
                    Estás en el rango del 20–30%. Considerá si podés mejorar el margen
                    optimizando costos o ajustando el precio.
                  </Typography>
                </Alert>
              )}
              {margenBueno && (
                <Alert
                  icon={<CheckCircleOutlineIcon />}
                  severity="success"
                  sx={{ mb: 2, borderRadius: 2, border: '1.5px solid #388e3c' }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    ¡Buen margen!
                  </Typography>
                  <Typography variant="caption">
                    Tu margen real supera el 30%. Tu producto tiene una estructura de costos
                    saludable.
                  </Typography>
                </Alert>
              )}

              {/* Results card */}
              <Paper
                elevation={0}
                sx={{
                  border: '1.5px solid #E0E0E0',
                  borderRadius: 2,
                  overflow: 'hidden',
                  bgcolor: '#fff',
                }}
              >
                {/* Card header */}
                <Box sx={{ bgcolor: '#000', px: 3, py: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700 }}>
                    Resultado
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#FFFFFF66' }}>
                    Se actualiza en tiempo real
                  </Typography>
                </Box>

                <Box sx={{ p: 3 }}>
                  {!hayDatos ? (
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="body2" sx={{ color: '#999' }}>
                        Completá los campos para ver los resultados
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      {/* Desglose de costos */}
                      <Typography
                        variant="caption"
                        sx={{
                          textTransform: 'uppercase',
                          letterSpacing: 1,
                          color: '#999',
                          fontWeight: 600,
                        }}
                      >
                        Desglose de costos
                      </Typography>
                      <Stack sx={{ mt: 1 }}>
                        {productType === 'fabricacion' && (
                          <>
                            <ResultRow label="Materia prima" value={fmt(resultados.costoMateriaPrima)} small />
                            <ResultRow label="Costos indirectos" value={fmt(resultados.costosIndirectos)} small />
                            <ResultRow label="Mano de obra" value={fmt(resultados.manoDeObra)} small />
                            <ResultRow label="Packaging" value={fmt(resultados.packaging)} small />
                          </>
                        )}
                        {productType === 'receta' && (
                          <>
                            {resultados.costoTanda != null && (
                              <Box sx={{ p: 1.5, bgcolor: '#F9F9F9', borderRadius: 1.5, mb: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <Typography variant="caption" sx={{ color: '#666' }}>Costo de toda la tanda</Typography>
                                  <Typography variant="caption" sx={{ fontWeight: 700 }}>{fmt(resultados.costoTanda)}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                                  <Typography variant="caption" sx={{ color: '#666' }}>Rendimiento</Typography>
                                  <Typography variant="caption" sx={{ fontWeight: 700 }}>{resultados.rendimientoCalculado} unidades</Typography>
                                </Box>
                              </Box>
                            )}
                            <Typography variant="caption" sx={{ color: '#999', fontStyle: 'italic', display: 'block', mb: 0.5 }}>Por unidad:</Typography>
                            <ResultRow label="Insumos" value={fmt(resultados.costoMateriaPrima)} small />
                            <ResultRow label="Indirectos" value={fmt(resultados.costosIndirectos)} small />
                            <ResultRow label="Mano de obra" value={fmt(resultados.manoDeObra)} small />
                            <ResultRow label="Packaging" value={fmt(resultados.packaging)} small />
                          </>
                        )}
                        {productType === 'reventa' && (
                          <>
                            <ResultRow label="Precio de compra" value={fmt(resultados.costoMateriaPrima)} small />
                            <ResultRow label="Costos adicionales" value={fmt(resultados.costosIndirectos)} small />
                          </>
                        )}
                        {productType === 'servicio' && (
                          <>
                            <ResultRow label="Mano de obra" value={fmt(resultados.costoMateriaPrima)} small />
                            <ResultRow label="Costos directos" value={fmt(resultados.packaging)} small />
                            <ResultRow label="Overhead operativo" value={fmt(resultados.costosIndirectos)} small />
                          </>
                        )}
                        {resultados.gastosVentaTotal > 0 && (
                          <Box sx={{ mt: 0.5 }}>
                            <Divider sx={{ mb: 0.5 }} />
                            <ResultRow label="Gastos de venta" value={`−${fmt(resultados.gastosVentaTotal)}`} small />
                          </Box>
                        )}
                      </Stack>

                      <Divider sx={{ my: 2 }} />

                      {/* Métricas clave */}
                      <Typography
                        variant="caption"
                        sx={{
                          textTransform: 'uppercase',
                          letterSpacing: 1,
                          color: '#999',
                          fontWeight: 600,
                        }}
                      >
                        Métricas clave
                      </Typography>
                      <Stack sx={{ mt: 1 }}>
                        <ResultRow label="Costo total" value={fmt(resultados.costoTotal)} bold />
                        <ResultRow label={productType === 'servicio' ? 'Ganancia por servicio' : 'Ganancia por unidad'} value={fmt(resultados.gananciaPorUnidad)} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Typography variant="body2" sx={{ color: '#666' }}>Margen</Typography>
                            <Tooltip title="Ganancia expresada como % del precio de venta. Ej: vendés $150, ganás $50 → margen = 33%. Así lo mide el mercado." placement="top">
                              <InfoOutlinedIcon sx={{ fontSize: 14, color: '#bbb', cursor: 'help' }} />
                            </Tooltip>
                          </Box>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
                            {fmtPct(resultados.margenReal)}
                            <Typography component="span" variant="caption" sx={{ color: '#999', ml: 0.5 }}>sobre precio</Typography>
                          </Typography>
                        </Box>
                        {productType === 'servicio' && (resultados.tarifaHorariaImplicita ?? 0) > 0 && (
                          <Box sx={{ mt: 0.5, p: 1.5, bgcolor: '#FFFDE7', borderRadius: 1.5, border: '1px solid #FFE082' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Typography variant="body2" sx={{ color: '#555', fontWeight: 600 }}>Tarifa hora implícita</Typography>
                                <Tooltip title="Precio de venta dividido horas estimadas. Es lo que cobrás por hora después de cubrir todos los costos y tu ganancia." placement="top">
                                  <InfoOutlinedIcon sx={{ fontSize: 14, color: '#bbb', cursor: 'help' }} />
                                </Tooltip>
                              </Box>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: '#000' }}>
                                {fmt(resultados.tarifaHorariaImplicita ?? 0)}/h
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </Stack>

                      <Divider sx={{ my: 2 }} />

                      {/* Precio sugerido */}
                      <Box
                        sx={{
                          bgcolor: '#FFEB5D',
                          borderRadius: 1.5,
                          p: 2,
                          textAlign: 'center',
                        }}
                      >
                        <Typography variant="caption" sx={{ fontWeight: 600, color: '#555' }}>
                          PRECIO SUGERIDO DE VENTA
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{ fontWeight: 800, color: '#000', mt: 0.5, lineHeight: 1.2 }}
                        >
                          {fmt(resultados.precioSugerido)}
                        </Typography>
                        <Chip
                          size="small"
                          label={`${fmtPct(resultados.margenReal)} margen sobre el precio`}
                          sx={{
                            mt: 1,
                            bgcolor: '#00000015',
                            fontWeight: 600,
                            fontSize: '0.7rem',
                          }}
                        />
                      </Box>

                      {/* Simulación hint */}
                      <Typography
                        variant="caption"
                        sx={{ display: 'block', color: '#999', mt: 2, textAlign: 'center' }}
                      >
                        Modificá el slider de margen para simular distintos escenarios de precio.
                      </Typography>
                    </>
                  )}
                </Box>
              </Paper>

              {/* CTA */}
              <Paper
                elevation={0}
                sx={{
                  mt: 2,
                  border: '1.5px solid #E0E0E0',
                  borderRadius: 2,
                  p: 2.5,
                  bgcolor: '#fff',
                  textAlign: 'center',
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  ¿Necesitás un análisis más profundo?
                </Typography>
                <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 2 }}>
                  En Prende te ayudamos a estructurar los costos y márgenes de todo tu negocio.
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  href="https://wa.me/5491125453990?text=Hola%2C%20me%20gustar%C3%ADa%20hablar%20sobre%20un%20an%C3%A1lisis%20de%20costos%20de%20mi%20negocio."
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    bgcolor: '#000',
                    color: '#FFEB5D',
                    fontWeight: 700,
                    textTransform: 'none',
                    py: 1.25,
                    '&:hover': { bgcolor: '#222' },
                  }}
                >
                  Hablemos por WhatsApp
                </Button>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default CalculadoraCostos;
