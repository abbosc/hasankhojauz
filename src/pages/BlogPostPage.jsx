import { useParams, Link } from 'react-router-dom';
import { usePost, usePosts } from '../hooks/usePosts.jsx';
import { useMeta } from '../hooks/useMeta.jsx';
import { RenderContent } from '../components/RichTextEditor';
import PostCard from '../components/PostCard';

// Icons
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function BlogPostPage() {
  const { slug } = useParams();
  const { post, loading, error } = usePost(slug);
  const { posts: relatedPosts } = usePosts({ published: true, limit: 3 });

  // Build JSON-LD for BlogPosting
  const jsonLd = post ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.excerpt || '',
    'image': post.thumbnail || 'https://hasanxoja.uz/og-image.jpg',
    'datePublished': post.published_at || post.created_at,
    'dateModified': post.updated_at || post.published_at || post.created_at,
    'author': {
      '@type': 'Person',
      'name': "Hasanxo'ja MuhammadSodiq",
      'url': 'https://hasanxoja.uz/about'
    },
    'publisher': {
      '@type': 'Person',
      'name': "Hasanxo'ja MuhammadSodiq"
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://hasanxoja.uz/blog/${post.slug}`
    }
  } : null;

  // Set meta tags for social sharing
  useMeta({
    title: post?.title,
    description: post?.excerpt,
    image: post?.thumbnail,
    url: typeof window !== 'undefined' ? window.location.href : '',
    canonical: post ? `https://hasanxoja.uz/blog/${post.slug}` : undefined,
    jsonLd,
  });

  if (loading) {
    return (
      <main>
        <div className="container">
          <div className="loading-state">Maqola yuklanmoqda...</div>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main>
        <div className="container">
          <div className="error-state">
            <h1>Maqola topilmadi</h1>
            <p>Siz qidirayotgan maqola mavjud emas.</p>
            <Link to="/">Bosh sahifaga qaytish</Link>
          </div>
        </div>
      </main>
    );
  }

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('uz-UZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date(post.created_at).toLocaleDateString('uz-UZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  // Filter out current post from related posts
  const filteredRelated = relatedPosts.filter((p) => p.id !== post.id).slice(0, 3);

  // Share URLs
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = encodeURIComponent(post.title);

  return (
    <main>
      {/* Article Header */}
      <header className="article-header-editorial">
        <div className="container">
          {post.category && (
            <Link to={`/category/${post.category.slug}`} className="article-category-editorial">
              {post.category.name}
            </Link>
          )}
          <h1 className="article-title-editorial">{post.title}</h1>
          {post.excerpt && (
            <p className="article-subtitle-editorial">{post.excerpt}</p>
          )}
          <p className="article-byline">
            {formattedDate}
          </p>
        </div>
      </header>

      {/* Hero Image */}
      {post.thumbnail && (
        <div className="article-hero-editorial">
          <div className="container">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="article-hero-image-editorial"
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="article-body-editorial">
        <div className="container content-narrow">
          <div className="article-content-editorial">
            {post.content ? (
              <RenderContent content={post.content} />
            ) : (
              <p>Kontent mavjud emas.</p>
            )}
          </div>
        </div>
      </article>

      {/* Social Share */}
      <section className="share-section-editorial">
        <div className="container content-narrow">
          <div className="share-inner-editorial">
            <span className="share-label-editorial">Ulashish</span>
            <div className="share-buttons-editorial">
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn-editorial"
                aria-label="Share on Twitter"
              >
                <TwitterIcon />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn-editorial"
                aria-label="Share on Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn-editorial"
                aria-label="Share on LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {filteredRelated.length > 0 && (
        <section className="related-section-editorial">
          <div className="container">
            <div className="section-header-editorial">
              <h2 className="section-title-editorial">Boshqa maqolalar</h2>
              <div className="section-line"></div>
            </div>
            <div className="related-grid">
              {filteredRelated.map((relatedPost) => (
                <PostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
