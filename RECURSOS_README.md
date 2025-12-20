# 📚 Gestión de Recursos Recomendados

Esta guía te ayudará a gestionar fácilmente los contenidos de la sección "Recursos Recomendados".

## 📁 Archivo de Configuración

Todo se maneja desde un único archivo:
```
src/data/recursos-config.json
```

## 🔄 RSS Feeds Automáticos

### Ver feeds actuales

Abre `src/data/recursos-config.json` y busca la sección `rssFeeds`:

```json
{
  "rssFeeds": [
    {
      "name": "Nombre del Blog",
      "url": "https://ejemplo.com/feed",
      "category": "Categoría",
      "enabled": true
    }
  ]
}
```

### ➕ Agregar un nuevo feed RSS

1. Abre `src/data/recursos-config.json`
2. Copia un bloque existente dentro de `rssFeeds`
3. Modifica los valores:
   - `name`: Nombre del blog/podcast
   - `url`: URL del feed RSS (generalmente termina en `/feed`, `/rss` o `.xml`)
   - `category`: Categoría (ej: "Negocios", "Emprendimiento", "Marketing")
   - `enabled`: `true` para activar, `false` para desactivar

**Ejemplo:**
```json
{
  "name": "Mi Blog Favorito",
  "url": "https://miblog.com/feed",
  "category": "Negocios",
  "enabled": true
}
```

### 🔍 Encontrar URLs de feeds RSS

La mayoría de blogs tienen RSS. Busca:
- `/feed` al final de la URL
- `/rss` al final de la URL  
- `/rss.xml` o `/feed.xml`
- Icono RSS en el sitio web
- Usa herramientas como: https://www.feedspot.com/

### ⏸️ Desactivar temporalmente un feed

Cambia `enabled` a `false`:

```json
{
  "name": "Blog Temporal",
  "url": "https://ejemplo.com/feed",
  "category": "Negocios",
  "enabled": false
}
```

### ❌ Eliminar un feed definitivamente

Simplemente borra todo el bloque `{ ... }` correspondiente al feed.

---

## ⭐ Recursos Destacados (Manuales)

### Ver recursos destacados actuales

Busca la sección `destacados` en el mismo archivo:

```json
{
  "destacados": [
    {
      "title": "Título del recurso",
      "url": "https://ejemplo.com",
      "description": "Descripción breve",
      "image": "https://ejemplo.com/imagen.jpg",
      "category": "Destacado",
      "date": "2025-12-20"
    }
  ]
}
```

### ➕ Agregar un recurso destacado

1. Abre `src/data/recursos-config.json`
2. Copia un bloque dentro de `destacados`
3. Modifica los valores:
   - `title`: Título del contenido
   - `url`: Link directo al recurso
   - `description`: Descripción de 1-2 líneas
   - `image`: URL de imagen (puede ser de cualquier sitio público)
   - `category`: Etiqueta (ej: "Video", "Artículo", "Podcast")
   - `date`: Fecha en formato `YYYY-MM-DD`

**Ejemplo:**
```json
{
  "title": "Cómo mejorar tus ventas en 30 días",
  "url": "https://youtube.com/watch?v=ejemplo",
  "description": "Video práctico con estrategias comprobadas para aumentar conversiones.",
  "image": "https://img.youtube.com/vi/ejemplo/maxresdefault.jpg",
  "category": "Video",
  "date": "2025-12-15"
}
```

### 💡 Tips para recursos destacados

- **Mantén entre 3-6 recursos** para no saturar
- **Ordena por fecha** (más reciente primero)
- **Usa imágenes de buena calidad** (al menos 800x600px)
- **Agrega 1-2 por mes** para mantener fresco
- **Mezcla formatos**: artículos, videos, podcasts, infografías

### 🖼️ Obtener imágenes

Para YouTube:
```
https://img.youtube.com/vi/[VIDEO_ID]/maxresdefault.jpg
```

Para otras URLs, puedes usar:
- Captura de pantalla del sitio
- Imagen destacada del artículo (click derecho > copiar dirección de imagen)
- Servicios como https://www.opengraph.xyz/ para ver la imagen OG

---

## 🚀 Aplicar Cambios

Después de editar `recursos-config.json`:

1. Guarda el archivo
2. Ejecuta en terminal:
```bash
npm run build
npm run deploy
```

3. Los cambios estarán live en 1-2 minutos

---

## 📊 Recomendaciones de Contenido

### Feeds RSS sugeridos (negocios/pymes):

- **Harvard Business Review**: `https://hbr.org/feed`
- **Entrepreneur**: `https://www.entrepreneur.com/feed`
- **Forbes**: `https://www.forbes.com/real-time/feed2/`
- **Inc.**: `https://www.inc.com/rss`
- **Fast Company**: `https://www.fastcompany.com/rss`

### En Español:

- **América Economía**: `https://www.americaeconomia.com/rss.xml`
- **Emprendedores**: `https://www.emprendedores.es/rss`

---

## ❓ Solución de Problemas

### ¿Un feed no se muestra?

- Verifica que `enabled: true`
- Confirma que la URL del feed es correcta
- Algunos feeds pueden estar caídos temporalmente

### ¿Las imágenes no se ven?

- Verifica que la URL de la imagen es pública
- Algunas imágenes tienen protección CORS (prueba con otra imagen)

### ¿Quiero cambiar cuántos posts se muestran por feed?

En `src/utils/fetchRSSFeeds.ts` cambia el valor `maxItemsPerFeed` (actualmente 5).

---

## 🎨 Personalización Avanzada

Si quieres cambiar el diseño, colores o layout:
- Edita `src/components/RecursosRecomendados.tsx`

Si quieres cambiar la lógica de fetch:
- Edita `src/utils/fetchRSSFeeds.ts`

---

**¿Preguntas?** Revisa el código o consulta la documentación de React + Material-UI.
