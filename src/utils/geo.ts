// ─────────────────────────────────────────────
// Geo detection via ipapi.co (free tier: 1000 req/day, no auth)
// Devuelve el código ISO-2 del país del visitante, o null si falla.
// ─────────────────────────────────────────────

export async function detectCountryCode(): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000); // 3s timeout
    const res = await fetch('https://ipapi.co/country/', {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const text = await res.text();
    const code = text.trim().toUpperCase();
    // Validar que sea un código de 2 letras
    return /^[A-Z]{2}$/.test(code) ? code : null;
  } catch {
    return null;
  }
}
