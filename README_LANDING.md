# 🚀 Landing Page Prende

Landing page profesional y minimalista para **Prende** - Auditoría Comercial Clara. Decisiones Inteligentes.

## 📋 Descripción

Página de presentación de servicios con diseño mobile-first, paleta de colores corporativa (blanco/negro/amarillo) y CTAs optimizados para conversión.

## 🎨 Diseño

- **Colores**: 
  - Primario: Negro #000000
  - Acento: Amarillo #FFEB5D
  - Fondo: Blanco #FFFFFF
  - Secundario: Gris #F5F5F5
- **Tipografía**: Montserrat
- **Responsive**: Mobile-first

## 🔧 Tecnología

- React 19.2.0
- TypeScript 5.9.3
- Vite 7.3.0
- Material-UI 7.3.6
- Emotion (styled components)

## 📦 Instalación

```bash
npm install
```

## 🚀 Desarrollo

```bash
npm run dev
```

Servidor disponible en: `http://localhost:5173`

## 🏗️ Build

```bash
npm run build
```

Los archivos se generan en `/dist`

## 🌐 Deploy

Deploy automático a GitHub Pages con dominio personalizado.

**URL Producción**: https://prende.com.ar
**GitHub Pages**: https://villalbamaximilianoariel-dot.github.io/

## 📝 Secciones

1. **Header** - Navegación sticky con logo
2. **Hero** - Título + subtítulo + CTAs (Solicitar Demo / Ver Servicios)
3. **Servicios** - 3 cards con descripción y precios
4. **Contacto** - WhatsApp, Email y redes sociales
5. **Footer** - Copyright y enlaces

## 🔄 Actualizar Información

### WhatsApp
Archivo: `src/components/Hero.tsx` y `src/components/Contacto.tsx`
```typescript
const whatsappNumber = '5491100000000'; // Cambiar por número real
```

### Email
Archivo: `src/components/Contacto.tsx`
```typescript
const email = 'hola@prende.com.ar'; // Actualizar si es necesario
```

### LinkedIn
Archivo: `src/components/Contacto.tsx` y `src/components/Footer.tsx`
```typescript
const linkedinUrl = 'https://linkedin.com/company/prende.ar'; // Actualizar cuando esté disponible
```

## 📱 Testing

Probar en múltiples dispositivos y navegadores:
- Chrome, Firefox, Safari, Edge
- iOS Safari, Android Chrome
- Desktop, Tablet, Mobile

## 🐛 Issues

Reportar en el repositorio principal.

---

**© 2025 Prende. Todos los derechos reservados.**
