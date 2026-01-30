// Vercel Edge Middleware for social media bot detection
import { createClient } from '@supabase/supabase-js';

const BOT_AGENTS = [
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

export default async function middleware(request) {
  const url = new URL(request.url);
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();

  // Only process /blog/* paths
  if (!url.pathname.startsWith('/blog/')) {
    return;
  }

  // Check if request is from a social media bot
  const isBot = BOT_AGENTS.some(bot => userAgent.includes(bot));

  if (!isBot) {
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
    .select('title, excerpt, thumbnail, slug')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !post) {
    return;
  }

  const siteUrl = `https://${url.host}`;
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  const html = `<!DOCTYPE html>
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
  ${post.thumbnail ? `<meta property="og:image" content="${escapeHtml(post.thumbnail)}">` : ''}

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(post.title)}">
  <meta name="twitter:description" content="${escapeHtml(post.excerpt || '')}">
  ${post.thumbnail ? `<meta name="twitter:image" content="${escapeHtml(post.thumbnail)}">` : ''}

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

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export const config = {
  matcher: '/blog/:path*',
};
