# 📊 Configuración de Analytics y Tracking

Este documento explica cómo configurar Google Analytics, Meta Pixel y Google Ads para trackear conversiones en Prende.

## ✅ Tareas completadas

- ✅ Google Analytics 4 instalado (pendiente ID)
- ✅ Meta Pixel instalado (pendiente ID)
- ✅ Funciones de tracking implementadas
- ✅ Eventos configurados en todos los CTAs
- ✅ H1 semánticos agregados
- ✅ Meta descriptions optimizadas
- ✅ Landing pages específicas creadas

## 🔧 Configuración necesaria

### 1. Google Analytics 4

**¿Dónde?** `index.html` línea ~40

**Qué hacer:**
1. Ir a [Google Analytics](https://analytics.google.com/)
2. Crear una propiedad GA4 para prende.com.ar
3. Copiar tu ID de medición (formato: `G-XXXXXXXXXX`)
4. Reemplazar en `index.html`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=TU-ID-AQUI"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'TU-ID-AQUI');
   </script>
   ```

**Eventos trackeados:**
- `generate_lead`: Cuando alguien hace click en WhatsApp
- `page_view`: Cada vez que se visita una página de servicio
- `scroll_to_services`: Cuando alguien hace scroll a servicios

### 2. Meta Pixel (Facebook/Instagram Ads)

**¿Dónde?** `index.html` línea ~48

**Qué hacer:**
1. Ir a [Facebook Events Manager](https://business.facebook.com/events_manager)
2. Crear un Pixel para Prende
3. Copiar tu Pixel ID (formato: números)
4. Reemplazar `YOUR_PIXEL_ID` por tu ID en ambas ubicaciones en `index.html`

**Eventos trackeados:**
- `Lead`: Cuando alguien hace click en WhatsApp
- `ViewContent`: Cuando alguien visita una página de servicio
- `PageView`: Automático en cada página

### 3. Google Ads (Opcional)

**¿Dónde?** `src/utils/analytics.ts` línea ~42

**Qué hacer:**
1. Crear una campaña en Google Ads
2. Configurar una conversión de tipo "Lead"
3. Copiar tu `AW-CONVERSION_ID/CONVERSION_LABEL`
4. Descomentar las líneas en `analytics.ts`:
   ```typescript
   if (window.gtag) {
     window.gtag('event', 'conversion', {
       'send_to': 'AW-TU-ID/TU-LABEL',
       'value': 1.0,
       'currency': 'ARS'
     });
   }
   ```

## 📈 Eventos disponibles

### trackWhatsAppClick(servicio, ubicacion)
Trackea cuando alguien hace click en un botón de WhatsApp.

**Parámetros:**
- `servicio`: 'Sistema', 'Auditorías', 'Consultoría', 'Homepage'
- `ubicacion`: 'Hero', 'CTA Final', 'Contacto'

**Ejemplo:**
```typescript
trackWhatsAppClick('Sistema', 'Hero');
```

### trackServicePageView(servicio)
Trackea la visita a una página de servicio.

**Parámetros:**
- `servicio`: Nombre del servicio visitado

**Ejemplo:**
```typescript
trackServicePageView('Sistema de Auditoría');
```

### trackServicesScroll()
Trackea cuando alguien hace scroll a la sección de servicios.

## 🎯 Landing Pages para Pauta

### /sistema-prueba
Diseñada para campañas enfocadas en "Prueba gratis 15 días".
- **Uso:** Google Ads búsqueda "sistema de auditoría gratis"
- **UTM recomendado:** `?utm_source=google&utm_medium=cpc&utm_campaign=sistema-prueba`

### /auditoria-gratis
Diseñada para campañas enfocadas en "Primera auditoría".
- **Uso:** Meta Ads enfocadas en auditorías presenciales
- **UTM recomendado:** `?utm_source=facebook&utm_medium=cpc&utm_campaign=auditoria-primera`

### /consultoria
Página estándar de consultoría.
- **Uso:** Leads más calificados que buscan acompañamiento
- **UTM recomendado:** `?utm_source=google&utm_medium=cpc&utm_campaign=consultoria`

## 📊 Métricas clave a monitorear

Una vez configurado Analytics, monitorear:

1. **Tasa de conversión por página:**
   - Homepage → WhatsApp
   - Sistema → WhatsApp
   - Auditorías → WhatsApp
   - Consultoría → WhatsApp

2. **Fuentes de tráfico:**
   - Orgánico (Google)
   - Directo
   - Referencia
   - Pauta (Google Ads / Meta Ads)

3. **Bounce rate por landing:**
   - Objetivo: < 60%
   - Si es mayor, revisar copy o segmentación de pauta

4. **Tiempo en página:**
   - Homepage: objetivo > 1 min
   - Páginas de servicio: objetivo > 2 min

## ⚠️ Importante antes de lanzar pauta

- [ ] Configurar Google Analytics 4
- [ ] Configurar Meta Pixel
- [ ] Testear que eventos se trackean correctamente
- [ ] Actualizar número de WhatsApp (actualmente es placeholder)
- [ ] Crear conversiones en Google Ads
- [ ] Configurar audiencias en Meta para remarketing

## 🔍 Cómo verificar que funciona

1. **Google Analytics:**
   - Ir a Realtime en GA4
   - Navegar por el sitio
   - Ver eventos en tiempo real

2. **Meta Pixel:**
   - Instalar extensión "Meta Pixel Helper" en Chrome
   - Navegar por el sitio
   - Verificar que muestra el Pixel activo

3. **Console del navegador:**
   - Abrir DevTools (F12)
   - Ver mensajes `[Analytics] Lead tracked: ...`

## 📞 Siguiente paso crítico

⚠️ **ACTUALIZAR NÚMERO DE WHATSAPP**

Actualmente todos los botones usan: `5491100000000`

Buscar y reemplazar en:
- src/components/Hero.tsx
- src/components/Contacto.tsx
- src/pages/Sistema.tsx
- src/pages/Auditorias.tsx
- src/pages/Consultoria.tsx

**Buscar:** `5491100000000`
**Reemplazar por:** Tu número real en formato internacional

---

**Cualquier duda, revisar `src/utils/analytics.ts` que tiene toda la lógica de tracking documentada.**
