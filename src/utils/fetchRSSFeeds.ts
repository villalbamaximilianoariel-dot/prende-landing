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
  category: string;
  enabled: boolean;
}

/**
 * Parsea un feed RSS usando DOMParser nativo del navegador
 */
function parseRSSFromXML(xmlText: string, feed: FeedSource, maxItems: number): RSSItem[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

  const isAtom = xmlDoc.querySelector('feed') !== null;

  if (isAtom) {
    return parseAtomFeed(xmlDoc, feed, maxItems);
  } else {
    return parseRSSFeed(xmlDoc, feed, maxItems);
  }
}

function parseRSSFeed(xmlDoc: Document, feed: FeedSource, maxItems: number): RSSItem[] {
  const items = xmlDoc.querySelectorAll('item');
  const results: RSSItem[] = [];

  for (let i = 0; i < Math.min(items.length, maxItems); i++) {
    const item = items[i];

    const title = item.querySelector('title')?.textContent || 'Sin título';
    const link = item.querySelector('link')?.textContent || '#';
    const description = item.querySelector('description')?.textContent || '';
    const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString();

    let thumbnail = '';
    const enclosure = item.querySelector('enclosure');
    const mediaThumbnail = item.querySelector('media\\:thumbnail, thumbnail');
    const mediaContent = item.querySelector('media\\:content, content');

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

    const title = entry.querySelector('title')?.textContent || 'Sin título';
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

function stripHtml(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

/**
 * Intenta cargar el feed vía rss2json.com (devuelve JSON, soporta YouTube/Ipsos).
 */
async function fetchViaRss2Json(feed: FeedSource, maxItems: number): Promise<RSSItem[]> {
  const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}&count=${maxItems}`;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 8000);

  const response = await fetch(url, { signal: controller.signal, mode: 'cors' });
  clearTimeout(id);

  if (!response.ok) throw new Error(`rss2json HTTP ${response.status}`);

  const data = await response.json();
  if (data.status !== 'ok' || !Array.isArray(data.items)) throw new Error('rss2json status not ok');

  return data.items.slice(0, maxItems).map((item: any) => {
    // thumbnail: rss2json lo expone directamente o dentro de enclosure
    const thumbnail =
      item.thumbnail ||
      item.enclosure?.link ||
      extractFirstImage(item.description || item.content || '') ||
      '';

    const cleanDescription = stripHtml(item.description || item.content || '').substring(0, 200);

    return {
      title: item.title || 'Sin título',
      link: item.link || '#',
      description: cleanDescription ? cleanDescription + '...' : '',
      pubDate: item.pubDate || new Date().toISOString(),
      thumbnail,
      source: feed.name,
      category: feed.category,
    } as RSSItem;
  });
}

function extractFirstImage(html: string): string {
  const match = html.match(/src=["']([^"']+\.(?:jpg|jpeg|png|webp|gif)[^"']*?)["']/i);
  return match ? match[1] : '';
}

/**
 * Intenta cargar el feed vía proxy CORS que devuelve XML.
 */
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

/**
 * Obtiene items de un feed RSS individual.
 * Prueba en orden: rss2json → allorigins → corsproxy.
 */
export async function fetchSingleFeed(feed: FeedSource, maxItems = 5): Promise<RSSItem[]> {
  // 1. rss2json (mejor soporte para YouTube e Ipsos)
  try {
    const items = await fetchViaRss2Json(feed, maxItems);
    if (items.length > 0) return items;
  } catch (_) {
    // continuar con siguiente proxy
  }

  // 2. allorigins (XML)
  try {
    const items = await fetchViaXmlProxy('https://api.allorigins.win/raw?url=', feed, maxItems);
    if (items.length > 0) return items;
  } catch (_) {
    // continuar
  }

  // 3. corsproxy.io (XML)
  try {
    const items = await fetchViaXmlProxy('https://corsproxy.io/?', feed, maxItems);
    if (items.length > 0) return items;
  } catch (_) {
    // todos fallaron
  }

  console.warn(`Feed "${feed.name}" no disponible temporalmente.`);
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

