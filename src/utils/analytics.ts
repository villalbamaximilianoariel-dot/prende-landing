/**
 * Analytics Tracking Utilities
 * 
 * Configuración completada:
 * 1. Google Analytics 4: G-HGH6BFCHW9
 * 2. Meta Pixel: 2353397001844472
 * 3. Google Ads: Agregar AW-CONVERSION_ID si usas Google Ads
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
      value: 1,
      currency: 'ARS',
    });
    window.gtag('event', 'whatsapp_click', {
      event_category: 'engagement',
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
    });
  }

};

/**
 * Trackea navegación a página de servicio
 * @param servicio - Nombre del servicio visitado
 */
export const trackServicePageView = (servicio: string) => {
  // Meta Pixel: ViewContent (evento de alto valor para retargeting)
  if (window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: servicio,
      content_type: 'service_page',
    });
  }
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
};
