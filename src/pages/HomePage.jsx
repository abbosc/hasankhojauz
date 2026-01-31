import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePosts, useCategories } from '../hooks/usePosts.jsx';
import { useMeta } from '../hooks/useMeta.jsx';
import PostCard from '../components/PostCard';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { posts, loading, error } = usePosts({ published: true });
  const { categories } = useCategories();

  // Set meta tags for homepage
  useMeta({
    title: 'Bosh sahifa',
    description: "Hasanxo'ja MuhammadSodiq - shaxsiy blog va fikrlar maydoni. Eng so'nggi maqolalar va fikrlar.",
    canonical: 'https://hasanxoja.uz',
  });

  // Filter posts based on category and search
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category?.name === activeCategory;
    const matchesSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Split posts for layout
  const heroPost = filteredPosts[0];
  const sidebarPosts = filteredPosts.slice(1, 4);
  const gridPosts = filteredPosts.slice(4);

  if (loading) {
    return (
      <main>
        <div className="container">
          <div className="loading-state">Maqolalar yuklanmoqda...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="container">
          <div className="error-state">Xatolik yuz berdi: {error}</div>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Breaking News Bar */}
      <div className="breaking-bar">
        <div className="container">
          <p className="breaking-text">
            <span className="breaking-label">Xush kelibsiz</span>
            Shaxsiy blogimga xush kelibsiz - bu yerda fikrlar, tajribalar va ilhom bilan o'rtoqlashaman
          </p>
        </div>
      </div>

      {/* Hero Section */}
      {heroPost && (
        <section className="hero-editorial">
          <div className="container">
            <div className="hero-grid">
              <article className="hero-main">
                {heroPost.thumbnail && (
                  <div className="hero-image-wrapper">
                    <img
                      src={heroPost.thumbnail}
                      alt={heroPost.title}
                      className="hero-image"
                    />
                  </div>
                )}
                {heroPost.category && (
                  <Link to={`/category/${heroPost.category.slug}`} className="hero-category">
                    {heroPost.category.name}
                  </Link>
                )}
                <h1 className="hero-title">
                  <Link to={`/blog/${heroPost.slug}`}>{heroPost.title}</Link>
                </h1>
                {heroPost.excerpt && (
                  <p className="hero-excerpt">{heroPost.excerpt}</p>
                )}
                <p className="hero-meta">
                  {heroPost.published_at
                    ? new Date(heroPost.published_at).toLocaleDateString('uz-UZ', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : new Date(heroPost.created_at).toLocaleDateString('uz-UZ', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                </p>
              </article>

              <aside className="hero-sidebar">
                {sidebarPosts.map((post) => (
                  <article key={post.id} className="sidebar-post">
                    {post.category && (
                      <Link to={`/category/${post.category.slug}`} className="sidebar-category">
                        {post.category.name}
                      </Link>
                    )}
                    <h3 className="sidebar-title">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="sidebar-meta">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString('uz-UZ', {
                            month: 'short',
                            day: 'numeric',
                          })
                        : new Date(post.created_at).toLocaleDateString('uz-UZ', {
                            month: 'short',
                            day: 'numeric',
                          })}
                    </p>
                  </article>
                ))}
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* Search Section */}
      <section className="search-section-editorial">
        <div className="container">
          <div className="search-wrapper-editorial">
            <span className="search-icon-editorial">
              <SearchIcon />
            </span>
            <input
              type="text"
              className="search-input-editorial"
              placeholder="Maqolalarni qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section-editorial">
        <div className="container">
          <ul className="categories-list-editorial">
            <li>
              <button
                className={`category-btn-editorial ${activeCategory === 'All' ? 'active' : ''}`}
                onClick={() => setActiveCategory('All')}
              >
                Barchasi
              </button>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  className={`category-btn-editorial ${activeCategory === category.name ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.name)}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Posts Grid */}
      {gridPosts.length > 0 && (
        <section className="posts-section-editorial">
          <div className="container">
            <div className="section-header-editorial">
              <h2 className="section-title-editorial">So'nggi maqolalar</h2>
              <div className="section-line"></div>
            </div>
            <div className="posts-grid-editorial">
              {gridPosts.map((post, index) => (
                <PostCard
                  key={post.id}
                  post={post}
                  size={index === 0 ? 'large' : index < 3 ? 'normal' : 'small'}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {filteredPosts.length === 0 && (
        <section className="posts-section-editorial">
          <div className="container">
            <div className="empty-state">
              <h2>Maqolalar topilmadi</h2>
              <p>Sizning so'rovingizga mos maqolalar mavjud emas.</p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
