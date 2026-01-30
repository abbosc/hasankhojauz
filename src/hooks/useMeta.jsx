import { useEffect } from 'react';

export function useMeta({ title, description, image, url }) {
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

    // Open Graph tags (Facebook, Telegram, etc.)
    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:image', image);
    setMeta('og:url', url || window.location.href);
    setMeta('og:type', 'article');
    setMeta('og:site_name', 'hasanxoja.uz');

    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image', true);
    setMeta('twitter:title', title, true);
    setMeta('twitter:description', description, true);
    setMeta('twitter:image', image, true);

    // Standard description
    setMeta('description', description, true);

    // Cleanup on unmount
    return () => {
      document.title = 'hasanxoja.uz';
    };
  }, [title, description, image, url]);
}
