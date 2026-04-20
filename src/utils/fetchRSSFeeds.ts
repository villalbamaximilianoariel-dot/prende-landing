export interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  thumbnail?: string;
  source: string;
  category: string;
}

export interface FeedSource {
  name: string;
  url: string;
  type?: string;       // 'youtube' | 'rss' (por defecto 'rss')
  channelId?: string;  // solo para type === 'youtube'
  category: string;
  enabled: boolean;
}

// ─── parsers XML ────────────────────────────────────────────────────────────

function parseRSSFromXML(xmlText: string, feed: FeedSource, maxItems: number): RSSItem[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  const isAtom = xmlDoc.querySelector('feed') !== null;
  return isAtom ? parseAtomFeed(xmlDoc, feed, maxItems) : parseRSSFeed(xmlDoc, feed, maxItems);
}

function parseRSSFeed(xmlDoc: Document, feed: FeedSource, maxItems: number): RSSItem[] {
  const items = xmlDoc.querySelectorAll('item');
  const results: RSSItem[] = [];

  for (let i = 0; i < Math.min(items.length, maxItems); i++) {
    const item = items[i];

    const title = decodeTitle(item.querySelector('title')?.textContent || 'Sin título');
    const link = item.querySelector('link')?.textContent || '#';
    const description = item.querySelector('description')?.textContent || '';
    const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString();

    let thumbnail = '';
    const mediaThumbnail = item.querySelector('media\\:thumbnail, thumbnail');
    const mediaContent = item.querySelector('media\\:content, content');
    const enclosure = item.querySelector('enclosure');

    if (mediaThumbnail) {
      thumbnail = mediaThumbnail.getAttribute('url') || '';
    } else if (mediaContent) {
      thumbnail = mediaContent.getAttribute('url') || '';
    } else if (enclosure && enclosure.getAttribute('type')?.startsWith('image')) {
      thumbnail = enclosure.getAttribute('url') || '';
    }

    if (!thumbnail && description.includes('<img')) {
      const imgMatch = description.match(/src=["']([^"']+)["']/);
      if (imgMatch) thumbnail = imgMatch[1];
    }

    const cleanDescription = stripHtml(description).substring(0, 200);

    results.push({
      title,
      link,
      description: cleanDescription ? cleanDescription + '...' : '',
      pubDate,
      thumbnail,
      source: feed.name,
      category: feed.category,
    });
  }

  return results;
}

function parseAtomFeed(xmlDoc: Document, feed: FeedSource, maxItems: number): RSSItem[] {
  const entries = xmlDoc.querySelectorAll('entry');
  const results: RSSItem[] = [];

  for (let i = 0; i < Math.min(entries.length, maxItems); i++) {
    const entry = entries[i];

    const title = decodeTitle(entry.querySelector('title')?.textContent || 'Sin título');
    const linkEl = entry.querySelector('link[rel="alternate"], link');
    const link = linkEl?.getAttribute('href') || '#';
    const summary = entry.querySelector('summary, content')?.textContent || '';
    const published = entry.querySelector('published, updated')?.textContent || new Date().toISOString();

    let thumbnail = '';
    const mediaThumbnail = entry.querySelector('media\\:thumbnail, thumbnail');
    const mediaContent = entry.querySelector('media\\:content, content[type^="image"]');

    if (mediaThumbnail) {
      thumbnail = mediaThumbnail.getAttribute('url') || '';
    } else if (mediaContent) {
      thumbnail = mediaContent.getAttribute('url') || mediaContent.getAttribute('src') || '';
    }

    const cleanDescription = stripHtml(summary).substring(0, 200);

    results.push({
      title,
      link,
      description: cleanDescription ? cleanDescription + '...' : '',
      pubDate: published,
      thumbnail,
      source: feed.name,
      category: feed.category,
    });
  }

  return results;
}

function decodeHtmlEntities(text: string): string {
  const tmp = document.createElement('textarea');
  tmp.innerHTML = text;
  return tmp.value;
}

/**
 * Decodifica entidades HTML en títulos RSS/Atom.
 * A diferencia de stripHtml, no elimina tags (los títulos no suelen tenerlos),
 * pero sí resuelve named entities (&rsquo;, &ldquo;, &hellip;, etc.) y
 * entidades doblemente escapadas (&amp;rsquo; → &rsquo; → ').
 */
function decodeTitle(text: string): string {
  let decoded = decodeHtmlEntities(text);
  // Segunda pasada para entidades doblemente escapeadas
  if (decoded.includes('&') && decoded.includes(';')) {
    decoded = decodeHtmlEntities(decoded);
  }
  return decoded;
}

function stripHtml(html: string): string {
  // Primer paso: decodificar entidades HTML y eliminar tags
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  let text = tmp.textContent || tmp.innerText || '';

  // Segundo paso: si quedaron entidades residuales (ej: &amp;rsquo; → &rsquo;)
  // se produce cuando el XML tiene HTML doblemente escapado (caso Ipsos)
  if (text.includes('&') && text.includes(';')) {
    text = decodeHtmlEntities(text);
  }

  return text;
}

// ─── YouTube Data API v3 ────────────────────────────────────────────────────

/**
 * Obtiene los últimos videos de un canal usando YouTube Data API v3.
 * Requiere VITE_YOUTUBE_API_KEY en el archivo .env.local
 */
async function fetchViaYouTubeAPI(feed: FeedSource, maxItems: number): Promise<RSSItem[]> {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new Error('VITE_YOUTUBE_API_KEY no configurada');
  }
  if (!feed.channelId) {
    throw new Error(`Feed "${feed.name}" no tiene channelId configurado`);
  }

  const params = new URLSearchParams({
    part: 'snippet',
    channelId: feed.channelId,
    maxResults: String(maxItems),
    order: 'date',
    type: 'video',
    key: apiKey,
  });

  const url = `https://www.googleapis.com/youtube/v3/search?${params}`;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 8000);

  const response = await fetch(url, { signal: controller.signal });
  clearTimeout(id);

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`YouTube API HTTP ${response.status}: ${body.substring(0, 200)}`);
  }

  const data = await response.json();

  if (!Array.isArray(data.items)) throw new Error('YouTube API: formato inesperado');

  return data.items.map((item: any) => {
    const snippet = item.snippet || {};
    const videoId = item.id?.videoId || '';
    const thumbnail =
      snippet.thumbnails?.high?.url ||
      snippet.thumbnails?.medium?.url ||
      snippet.thumbnails?.default?.url ||
      '';

    return {
      title: snippet.title || 'Sin título',
      link: videoId ? `https://www.youtube.com/watch?v=${videoId}` : '#',
      description: (snippet.description || '').substring(0, 200) + ((snippet.description?.length ?? 0) > 200 ? '...' : ''),
      pubDate: snippet.publishedAt || new Date().toISOString(),
      thumbnail,
      source: feed.name,
      category: feed.category,
    } as RSSItem;
  });
}

// ─── allorigins /get (maneja Cloudflare con base64) ─────────────────────────

/**
 * Obtiene un feed RSS via allorigins /get?url= que devuelve JSON con el
 * contenido en base64 o text/plain. Funciona cuando el proxy raw (corsproxy,
 * allorigins/raw) es bloqueado por Cloudflare.
 */
async function fetchViaAlloriginsGet(feed: FeedSource, maxItems: number): Promise<RSSItem[]> {
  const url = `https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}`;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 10000);

  const response = await fetch(url, { signal: controller.signal, mode: 'cors' });
  clearTimeout(id);

  if (!response.ok) throw new Error(`allorigins/get HTTP ${response.status}`);

  const json = await response.json();
  let contents: string = json.contents || '';

  // allorigins puede devolver base64 data URI cuando el content-type no es texto
  // Ej: "data:application/rss+xml; charset=utf-8;base64,PD94bWw..."
  if (contents.startsWith('data:') && contents.includes('base64,')) {
    const b64 = contents.split('base64,')[1];
    contents = atob(b64);
  }

  if (!contents) throw new Error('allorigins/get: contenido vacío');

  const items = parseRSSFromXML(contents, feed, maxItems);
  if (items.length === 0) throw new Error('no items parsed');

  return items;
}

// ─── proxy XML genérico ─────────────────────────────────────────────────────

async function fetchViaXmlProxy(proxyBase: string, feed: FeedSource, maxItems: number): Promise<RSSItem[]> {
  const url = `${proxyBase}${encodeURIComponent(feed.url)}`;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 6000);

  const response = await fetch(url, { signal: controller.signal, mode: 'cors' });
  clearTimeout(id);

  if (!response.ok) throw new Error(`proxy HTTP ${response.status}`);

  const xmlText = await response.text();
  const items = parseRSSFromXML(xmlText, feed, maxItems);
  if (items.length === 0) throw new Error('no items parsed');

  return items;
}

// ─── lógica principal ────────────────────────────────────────────────────────

/**
 * Obtiene items de un feed RSS individual.
 * - Para feeds YouTube: usa YouTube Data API v3 directamente.
 * - Para feeds RSS: prueba allorigins/get → allorigins/raw → corsproxy.
 */
export async function fetchSingleFeed(feed: FeedSource, maxItems = 5): Promise<RSSItem[]> {
  if (feed.type === 'youtube') {
    try {
      return await fetchViaYouTubeAPI(feed, maxItems);
    } catch (err) {
      console.warn(`Feed YouTube "${feed.name}" falló:`, err);
      return [];
    }
  }

  // Feed RSS genérico — cascada de proxies
  // 1. allorigins /get (maneja Cloudflare con base64)
  try {
    const items = await fetchViaAlloriginsGet(feed, maxItems);
    if (items.length > 0) return items;
  } catch (_) {
    // continuar
  }

  // 2. allorigins /raw
  try {
    const items = await fetchViaXmlProxy('https://api.allorigins.win/raw?url=', feed, maxItems);
    if (items.length > 0) return items;
  } catch (_) {
    // continuar
  }

  // 3. corsproxy.io
  try {
    const items = await fetchViaXmlProxy('https://corsproxy.io/?', feed, maxItems);
    if (items.length > 0) return items;
  } catch (_) {
    // todos fallaron
  }

  return [];
}

/**
 * Obtiene items de múltiples feeds RSS en paralelo.
 */
export async function fetchAllFeeds(feeds: FeedSource[], maxItemsPerFeed = 5): Promise<RSSItem[]> {
  const enabledFeeds = feeds.filter((f) => f.enabled);

  const results = await Promise.allSettled(
    enabledFeeds.map((feed) => fetchSingleFeed(feed, maxItemsPerFeed))
  );

  const allItems: RSSItem[] = [];
  results.forEach((result) => {
    if (result.status === 'fulfilled') allItems.push(...result.value);
  });

  return allItems.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );
}

/**
 * Formatea una fecha legible.
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hoy';
  if (diffDays === 1) return 'Ayer';
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;

  return date.toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
