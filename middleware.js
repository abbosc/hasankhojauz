// Vercel Edge Middleware for bot detection, SEO, and sitemap
import { createClient } from '@supabase/supabase-js';

// Social media bots - need meta tags for previews, then redirect
const SOCIAL_BOTS = [
  'telegrambot',
  'facebookexternalhit',
  'facebot',
  'twitterbot',
  'linkedinbot',
  'whatsapp',
  'slackbot',
  'discordbot',
  'pinterest',
  'vkshare',
];

// Search engine bots - need full content for indexing
const SEARCH_BOTS = [
  'googlebot',
  'bingbot',
  'yandexbot',
  'duckduckbot',
  'baiduspider',
  'yahoo',
  'sogou',
  'exabot',
  'ia_archiver',
];

export default async function middleware(request) {
  const url = new URL(request.url);
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();

  // Handle sitemap.xml
  if (url.pathname === '/sitemap.xml') {
    return handleSitemap(url);
  }

  // Only process /blog/* paths for bot detection
  if (!url.pathname.startsWith('/blog/')) {
    return;
  }

  // Check bot type
  const isSocialBot = SOCIAL_BOTS.some(bot => userAgent.includes(bot));
  const isSearchBot = SEARCH_BOTS.some(bot => userAgent.includes(bot));

  if (!isSocialBot && !isSearchBot) {
    return;
  }

  // Extract slug from URL path
  const slug = url.pathname.replace('/blog/', '').split('/')[0];

  if (!slug) {
    return;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY env vars');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: post, error } = await supabase
    .from('posts')
    .select('title, excerpt, thumbnail, slug, content, published_at, updated_at, created_at, category:categories(name)')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !post) {
    return;
  }

  const siteUrl = `https://${url.host}`;
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = post.thumbnail || `${siteUrl}/og-image.jpg`;

  // JSON-LD Article schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': post.title,
    'description': post.excerpt || '',
    'image': imageUrl,
    'datePublished': post.published_at || post.created_at,
    'dateModified': post.updated_at || post.published_at || post.created_at,
    'author': {
      '@type': 'Person',
      'name': "Hasanxo'ja MuhammadSodiq"
    },
    'publisher': {
      '@type': 'Person',
      'name': "Hasanxo'ja MuhammadSodiq"
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': postUrl
    }
  };

  // Extract plain text from content for search engines
  const plainTextContent = extractTextFromContent(post.content);
  const categoryName = post.category?.name || '';

  // For search bots: full content, no redirect
  // For social bots: meta tags only, with redirect
  const html = isSearchBot
    ? `<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(post.title)} | hasanxoja.uz</title>
  <meta name="description" content="${escapeHtml(post.excerpt || '')}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${postUrl}">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="hasanxoja.uz">
  <meta property="og:title" content="${escapeHtml(post.title)}">
  <meta property="og:description" content="${escapeHtml(post.excerpt || '')}">
  <meta property="og:url" content="${postUrl}">
  <meta property="og:image" content="${escapeHtml(imageUrl)}">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(post.title)}">
  <meta name="twitter:description" content="${escapeHtml(post.excerpt || '')}">
  <meta name="twitter:image" content="${escapeHtml(imageUrl)}">

  <!-- JSON-LD -->
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
  <article>
    <header>
      ${categoryName ? `<span>${escapeHtml(categoryName)}</span>` : ''}
      <h1>${escapeHtml(post.title)}</h1>
      ${post.excerpt ? `<p><em>${escapeHtml(post.excerpt)}</em></p>` : ''}
      <time datetime="${post.published_at || post.created_at}">${new Date(post.published_at || post.created_at).toLocaleDateString('uz-UZ')}</time>
    </header>
    ${post.thumbnail ? `<img src="${escapeHtml(post.thumbnail)}" alt="${escapeHtml(post.title)}">` : ''}
    <div>
      ${plainTextContent}
    </div>
    <footer>
      <p>Muallif: Hasanxo'ja MuhammadSodiq</p>
      <a href="${siteUrl}">hasanxoja.uz</a>
    </footer>
  </article>
</body>
</html>`
    : `<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(post.title)} | hasanxoja.uz</title>
  <meta name="description" content="${escapeHtml(post.excerpt || '')}">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="hasanxoja.uz">
  <meta property="og:title" content="${escapeHtml(post.title)}">
  <meta property="og:description" content="${escapeHtml(post.excerpt || '')}">
  <meta property="og:url" content="${postUrl}">
  <meta property="og:image" content="${escapeHtml(imageUrl)}">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(post.title)}">
  <meta name="twitter:description" content="${escapeHtml(post.excerpt || '')}">
  <meta name="twitter:image" content="${escapeHtml(imageUrl)}">

  <!-- JSON-LD -->
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>

  <!-- Redirect to actual page -->
  <meta http-equiv="refresh" content="0;url=${postUrl}">
</head>
<body>
  <p>Redirecting to <a href="${postUrl}">${escapeHtml(post.title)}</a>...</p>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

async function handleSitemap(url) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY env vars');
    return new Response('Server configuration error', { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const siteUrl = `https://${url.host}`;

  // Fetch all published posts
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('slug, updated_at, published_at, created_at')
    .eq('published', true)
    .order('published_at', { ascending: false });

  // Fetch all categories
  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('slug');

  // Build sitemap XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static pages -->
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;

  // Add blog posts
  if (posts && !postsError) {
    for (const post of posts) {
      const lastmod = post.updated_at || post.published_at || post.created_at;
      xml += `  <url>
    <loc>${siteUrl}/blog/${escapeXml(post.slug)}</loc>
    <lastmod>${new Date(lastmod).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;
    }
  }

  // Add categories
  if (categories && !categoriesError) {
    for (const category of categories) {
      xml += `  <url>
    <loc>${siteUrl}/category/${escapeXml(category.slug)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    }
  }

  xml += `</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeXml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Extract plain text/HTML from rich text editor content (TipTap/ProseMirror JSON format)
function extractTextFromContent(content) {
  if (!content) return '';

  // If content is a string, try to parse as JSON
  let parsed = content;
  if (typeof content === 'string') {
    try {
      parsed = JSON.parse(content);
    } catch {
      // If not JSON, return as escaped HTML paragraphs
      return content.split('\n').map(p => `<p>${escapeHtml(p)}</p>`).join('\n');
    }
  }

  // If it's TipTap/ProseMirror JSON format
  if (parsed && parsed.type === 'doc' && Array.isArray(parsed.content)) {
    return renderNodes(parsed.content);
  }

  // Fallback: stringify and escape
  return `<p>${escapeHtml(String(content))}</p>`;
}

function renderNodes(nodes) {
  if (!Array.isArray(nodes)) return '';

  return nodes.map(node => {
    switch (node.type) {
      case 'paragraph':
        const pText = renderNodes(node.content || []);
        return pText ? `<p>${pText}</p>` : '<p></p>';

      case 'heading':
        const level = node.attrs?.level || 2;
        const hText = renderNodes(node.content || []);
        return `<h${level}>${hText}</h${level}>`;

      case 'text':
        let text = escapeHtml(node.text || '');
        // Apply marks (bold, italic, etc.)
        if (node.marks) {
          for (const mark of node.marks) {
            if (mark.type === 'bold') text = `<strong>${text}</strong>`;
            if (mark.type === 'italic') text = `<em>${text}</em>`;
            if (mark.type === 'link') text = `<a href="${escapeHtml(mark.attrs?.href || '')}">${text}</a>`;
          }
        }
        return text;

      case 'bulletList':
        return `<ul>${renderNodes(node.content || [])}</ul>`;

      case 'orderedList':
        return `<ol>${renderNodes(node.content || [])}</ol>`;

      case 'listItem':
        return `<li>${renderNodes(node.content || [])}</li>`;

      case 'blockquote':
        return `<blockquote>${renderNodes(node.content || [])}</blockquote>`;

      case 'codeBlock':
        const code = node.content?.map(n => n.text || '').join('') || '';
        return `<pre><code>${escapeHtml(code)}</code></pre>`;

      case 'image':
        const src = node.attrs?.src || '';
        const alt = node.attrs?.alt || '';
        return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}">`;

      case 'hardBreak':
        return '<br>';

      default:
        // Recursively render unknown nodes
        if (node.content) {
          return renderNodes(node.content);
        }
        return '';
    }
  }).join('\n');
}

export const config = {
  matcher: ['/blog/:path*', '/sitemap.xml'],
};
