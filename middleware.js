// Vercel Edge Middleware for social media bot detection

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

  if (isBot) {
    // Extract slug from URL path
    const slug = url.pathname.replace('/blog/', '').split('/')[0];

    if (slug) {
      // Fetch from OG API endpoint and return response
      const ogUrl = new URL('/api/og', request.url);
      ogUrl.searchParams.set('slug', slug);

      const response = await fetch(ogUrl.toString());
      return response;
    }
  }
}

export const config = {
  matcher: '/blog/:path*',
};
