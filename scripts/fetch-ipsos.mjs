#!/usr/bin/env node
/**
 * scripts/fetch-ipsos.mjs
 *
 * Fetches the Ipsos Argentina RSS feed and writes a JSON cache to
 * public/ipsos-cache.json. Runs in GitHub Actions (no proxy needed —
 * Cloudflare allows GitHub's IPs). Uses only Node.js built-in modules.
 *
 * Output format matches RSSItem[] from src/utils/fetchRSSFeeds.ts:
 *   { updatedAt: string, items: RSSItem[] }
 */

import https from 'node:https';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FEED_URL = 'https://www.ipsos.com/es-ar/rss.xml';
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'ipsos-cache.json');
const MAX_ITEMS = 5;
const SOURCE_NAME = 'Ipsos Argentina';
const CATEGORY = 'Insights';

// ─── HTTP fetch con soporte de redirects ─────────────────────────────────────

function fetchUrl(url, redirects = 0) {
  if (redirects > 5) return Promise.reject(new Error('Too many redirects'));

  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(
      url,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; PrendeLanding/1.0; +https://prende.com.ar)',
          Accept: 'application/rss+xml, application/xml, text/xml, */*',
        },
      },
      (res) => {
        if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) {
          const location = res.headers.location;
          if (!location) return reject(new Error('Redirect without Location header'));
          res.resume();
          return fetchUrl(location, redirects + 1).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
      }
    );
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy(new Error('Request timeout'));
    });
  });
}

// ─── XML helpers (no deps) ───────────────────────────────────────────────────

/**
 * Extrae el contenido de un tag XML, manejando CDATA y texto plano.
 * Solo extrae el primer match.
 */
function extractTag(xml, tag) {
  // Con CDATA
  const cdataRe = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[[\\s\\S]*?\\]\\]><\\/${tag}>`, 'i');
  const cdataMatch = xml.match(cdataRe);
  if (cdataMatch) {
    const inner = cdataMatch[0].match(/\[CDATA\[([\s\S]*?)\]\]/i);
    return inner ? inner[1].trim() : '';
  }
  // Texto plano
  const plainRe = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const plainMatch = xml.match(plainRe);
  return plainMatch ? plainMatch[1].trim() : '';
}

/**
 * Decodifica entidades XML/HTML básicas y numéricas.
 * Se aplica dos veces para cubrir entidades doblemente escapadas.
 */
function decodeEntities(str) {
  const pass = (s) =>
    s
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&rsquo;/g, '\u2019')
      .replace(/&lsquo;/g, '\u2018')
      .replace(/&rdquo;/g, '\u201D')
      .replace(/&ldquo;/g, '\u201C')
      .replace(/&ndash;/g, '\u2013')
      .replace(/&mdash;/g, '\u2014')
      .replace(/&hellip;/g, '\u2026')
      .replace(/&nbsp;/g, ' ')
      .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
      .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
  // Double pass for double-escaped entities
  return pass(pass(str));
}

/** Elimina tags HTML y recorta el texto. */
function stripHtml(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

// ─── Parser RSS ──────────────────────────────────────────────────────────────

function parseRSS(xml) {
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  const items = [];
  let match;

  while ((match = itemRegex.exec(xml)) !== null && items.length < MAX_ITEMS) {
    const itemXml = match[1];

    const title = decodeEntities(extractTag(itemXml, 'title'));
    // <link> en RSS 2.0 puede estar como texto o como sibling text node sin tags
    const link =
      extractTag(itemXml, 'link') ||
      extractTag(itemXml, 'guid') ||
      '#';
    const rawDesc = extractTag(itemXml, 'description');
    const description = stripHtml(decodeEntities(rawDesc)).substring(0, 200);
    const pubDate = extractTag(itemXml, 'pubDate') || new Date().toISOString();

    // Thumbnail: media:thumbnail → enclosure image → primera img en description
    let thumbnail = '';
    const mediaThumbnail = itemXml.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i);
    const enclosure = itemXml.match(/<enclosure[^>]+type=["']image[^"']*["'][^>]+url=["']([^"']+)["']|<enclosure[^>]+url=["']([^"']+)["'][^>]+type=["']image/i);
    const imgInDesc = rawDesc.match(/src=["']([^"']+)["']/i);

    if (mediaThumbnail) thumbnail = mediaThumbnail[1];
    else if (enclosure) thumbnail = enclosure[1] || enclosure[2] || '';
    else if (imgInDesc) thumbnail = imgInDesc[1];

    if (title && link) {
      items.push({
        title,
        link,
        description: description ? description + '...' : '',
        pubDate,
        thumbnail,
        source: SOURCE_NAME,
        category: CATEGORY,
      });
    }
  }

  return items;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`[fetch-ipsos] Fetching ${FEED_URL}...`);
  const xml = await fetchUrl(FEED_URL);

  const items = parseRSS(xml);
  if (items.length === 0) {
    throw new Error('No items parsed — feed may have changed structure');
  }

  const output = {
    updatedAt: new Date().toISOString(),
    items,
  };

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`[fetch-ipsos] Written ${items.length} items to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error('[fetch-ipsos] Error:', err.message);
  process.exit(1);
});
