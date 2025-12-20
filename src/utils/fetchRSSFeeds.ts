import Parser from 'rss-parser';

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

const parser = new Parser({
  customFields: {
    item: [
      ['media:thumbnail', 'thumbnail'],
      ['media:content', 'mediaContent'],
      ['enclosure', 'enclosure'],
    ],
  },
});

/**
 * Obtiene items de un feed RSS individual
 */
export async function fetchSingleFeed(
  feed: FeedSource,
  maxItems: number = 5
): Promise<RSSItem[]> {
  try {
    const feedData = await parser.parseURL(feed.url);
    
    return feedData.items.slice(0, maxItems).map((item) => {
      // Intentar obtener imagen de diferentes fuentes
      let thumbnail = '';
      
      if (item.thumbnail) {
        thumbnail = typeof item.thumbnail === 'string' 
          ? item.thumbnail 
          : (item.thumbnail as any)?.$?.url || '';
      } else if (item.enclosure?.url) {
        thumbnail = item.enclosure.url;
      } else if (item.mediaContent) {
        thumbnail = (item.mediaContent as any)?.$ ?.url || '';
      }

      // Limpiar descripción HTML
      const cleanDescription = item.contentSnippet || item.content || (item as any).description || '';
      const shortDescription = cleanDescription.substring(0, 200) + '...';

      return {
        title: item.title || 'Sin título',
        link: item.link || '#',
        description: shortDescription,
        pubDate: item.pubDate || new Date().toISOString(),
        thumbnail,
        source: feed.name,
        category: feed.category,
      };
    });
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
