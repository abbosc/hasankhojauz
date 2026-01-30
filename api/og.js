import { createClient } from '@supabase/supabase-js';

// Use non-VITE prefixed vars for server-side (add these in Vercel dashboard)
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const url = new URL(req.url);
  const slug = url.searchParams.get('slug');

  if (!slug || !supabaseUrl || !supabaseKey) {
    return new Response('Not found', { status: 404 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: post } = await supabase
    .from('posts')
    .select('title, excerpt, thumbnail, slug')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!post) {
    return new Response('Not found', { status: 404 });
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
