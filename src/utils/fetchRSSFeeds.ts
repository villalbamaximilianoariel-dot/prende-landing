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
  
  // Detectar si es RSS o Atom
  const isAtom = xmlDoc.querySelector('feed') !== null;
  
  if (isAtom) {
    return parseAtomFeed(xmlDoc, feed, maxItems);
  } else {
    return parseRSSFeed(xmlDoc, feed, maxItems);
  }
}

/**
 * Parsea un feed RSS 2.0
 */
function parseRSSFeed(xmlDoc: Document, feed: FeedSource, maxItems: number): RSSItem[] {
  const items = xmlDoc.querySelectorAll('item');
  const results: RSSItem[] = [];
  
  for (let i = 0; i < Math.min(items.length, maxItems); i++) {
    const item = items[i];
    
    const title = item.querySelector('title')?.textContent || 'Sin título';
    const link = item.querySelector('link')?.textContent || '#';
    const description = item.querySelector('description')?.textContent || '';
    const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString();
    
    // Intentar obtener imagen
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
    
    // Limpiar HTML de la descripción
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

/**
 * Parsea un feed Atom
 */
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
    
    // Intentar obtener imagen
    let thumbnail = '';
    const mediaContent = entry.querySelector('media\\:content, content[type^="image"]');
    if (mediaContent) {
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

/**
 * Elimina tags HTML de una cadena
 */
function stripHtml(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

/**
 * Obtiene items de un feed RSS individual usando CORS proxy
 */
export async function fetchSingleFeed(
  feed: FeedSource,
  maxItems: number = 5
): Promise<RSSItem[]> {
  try {
    // Usar corsproxy.io como CORS proxy
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(feed.url)}`;
    
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const xmlText = await response.text();
    return parseRSSFromXML(xmlText, feed, maxItems);
    
  } catch (error) {
    console.error(`Error fetching feed ${feed.name}:`, error);
    return [];
  }
}

/**
 * Obtiene items de múltiples feeds RSS
 */
export async function fetchAllFeeds(
  feeds: FeedSource[],
  maxItemsPerFeed: number = 5
): Promise<RSSItem[]> {
  const enabledFeeds = feeds.filter((feed) => feed.enabled);
  
  const results = await Promise.allSettled(
    enabledFeeds.map((feed) => fetchSingleFeed(feed, maxItemsPerFeed))
  );

  const allItems: RSSItem[] = [];
  
  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      allItems.push(...result.value);
    }
  });

  // Ordenar por fecha (más reciente primero)
  return allItems.sort((a, b) => {
    const dateA = new Date(a.pubDate).getTime();
    const dateB = new Date(b.pubDate).getTime();
    return dateB - dateA;
  });
}

/**
 * Formatea una fecha legible
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
