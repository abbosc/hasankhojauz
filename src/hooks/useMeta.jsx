import { useEffect } from 'react';

const DEFAULT_IMAGE = 'https://hasanxoja.uz/og-image.jpg';

export function useMeta({ title, description, image, url, canonical, jsonLd }) {
  useEffect(() => {
    // Update title
    if (title) {
      document.title = `${title} | hasanxoja.uz`;
    }

    // Helper to set or create meta tag
    const setMeta = (property, content, isName = false) => {
      if (!content) return;

      const attr = isName ? 'name' : 'property';
      let meta = document.querySelector(`meta[${attr}="${property}"]`);

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, property);
        document.head.appendChild(meta);
      }

      meta.setAttribute('content', content);
    };

    // Helper to set or create link tag
    const setLink = (rel, href) => {
      if (!href) return;

      let link = document.querySelector(`link[rel="${rel}"]`);

      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }

      link.setAttribute('href', href);
    };

    // Use provided image or fallback to default
    const imageUrl = image || DEFAULT_IMAGE;

    // Open Graph tags (Facebook, Telegram, etc.)
    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:image', imageUrl);
    setMeta('og:url', url || window.location.href);
    setMeta('og:type', 'article');
    setMeta('og:site_name', 'hasanxoja.uz');

    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image', true);
    setMeta('twitter:title', title, true);
    setMeta('twitter:description', description, true);
    setMeta('twitter:image', imageUrl, true);

    // Standard description
    setMeta('description', description, true);

    // Canonical URL
    if (canonical) {
      setLink('canonical', canonical);
    }

    // JSON-LD structured data
    let scriptElement = null;
    if (jsonLd) {
      scriptElement = document.createElement('script');
      scriptElement.type = 'application/ld+json';
      scriptElement.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(scriptElement);
    }

    // Cleanup on unmount
    return () => {
      document.title = 'hasanxoja.uz';
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, [title, description, image, url, canonical, jsonLd]);
}
