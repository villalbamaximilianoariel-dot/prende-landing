/**
 * Analytics Tracking Utilities
 * 
 * Para configurar:
 * 1. Google Analytics 4: Reemplazar G-XXXXXXXXXX en index.html
 * 2. Meta Pixel: Reemplazar YOUR_PIXEL_ID en index.html
 * 3. Google Ads: Agregar AW-CONVERSION_ID abajo
 */

// Declaraciones TypeScript para las funciones globales
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

/**
 * Trackea evento de Lead (click en WhatsApp)
 * @param servicio - Nombre del servicio desde donde se hace click
 * @param ubicacion - Ubicación del botón (hero, cta-final, contacto, etc.)
 */
export const trackWhatsAppClick = (servicio: string, ubicacion: string) => {
  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', 'generate_lead', {
      currency: 'ARS',
      value: 0,
      event_category: 'WhatsApp',
      event_label: `${servicio} - ${ubicacion}`,
      servicio: servicio,
      ubicacion: ubicacion,
    });
  }

  // Meta Pixel
  if (window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: servicio,
      content_category: 'WhatsApp Click',
      source: ubicacion,
    });
  }

  // Google Ads Conversion (opcional)
  // TODO: Descomentar y agregar tu AW-CONVERSION_ID cuando configures Google Ads
  // if (window.gtag) {
  //   window.gtag('event', 'conversion', {
  //     'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
  //     'value': 1.0,
  //     'currency': 'ARS'
  //   });
  // }

  console.log(`[Analytics] Lead tracked: ${servicio} - ${ubicacion}`);
};

/**
 * Trackea navegación a página de servicio
 * @param servicio - Nombre del servicio visitado
 */
export const trackServicePageView = (servicio: string) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: servicio,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }

  if (window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: servicio,
      content_type: 'service_page',
    });
  }

  console.log(`[Analytics] Service page view: ${servicio}`);
};

/**
 * Trackea scroll a sección de servicios
 */
export const trackServicesScroll = () => {
  if (window.gtag) {
    window.gtag('event', 'scroll_to_services', {
      event_category: 'Engagement',
      event_label: 'Services Section',
    });
  }

  console.log('[Analytics] Scrolled to services section');
};
