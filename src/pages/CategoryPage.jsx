import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePosts, useCategories } from '../hooks/usePosts.jsx';
import { supabase } from '../lib/supabase';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

export default function CategoryPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { posts, loading, error } = usePosts({ published: true, categorySlug: slug });
  const { categories } = useCategories();

  useEffect(() => {
    async function fetchCategory() {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single();
      setCategory(data);
    }
    if (slug) {
      fetchCategory();
    }
  }, [slug]);

  // Filter posts by search
  const filteredPosts = posts.filter((post) => {
    if (!searchQuery) return true;
    return (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (loading) {
    return (
      <main>
        <div className="container">
          <div className="loading-state">Maqolalar yuklanmoqda...</div>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Category Header */}
      <header className="category-header-editorial">
        <div className="container">
          <h1 className="category-page-title-editorial">
            {category?.name || slug}
          </h1>
          {category?.description && (
            <p className="category-description-editorial">{category.description}</p>
          )}
        </div>
      </header>

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

      {/* Categories Filter */}
      <section className="categories-section-editorial">
        <div className="container">
          <ul className="categories-list-editorial">
            <li>
              <Link to="/" className="category-btn-editorial">
                Barchasi
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/category/${cat.slug}`}
                  className={`category-btn-editorial ${cat.slug === slug ? 'active' : ''}`}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Posts List */}
      <section className="category-posts-editorial">
        <div className="container">
          {filteredPosts.length > 0 ? (
            <div className="posts-list-editorial">
              {filteredPosts.map((post) => {
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

                return (
                  <article key={post.id} className="post-list-item-editorial">
                    {post.thumbnail && (
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="post-list-image-editorial"
                      />
                    )}
                    <div className="post-list-content-editorial">
                      {post.category && (
                        <span className="post-list-category-editorial">
                          {post.category.name}
                        </span>
                      )}
                      <h2 className="post-list-title-editorial">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      {post.excerpt && (
                        <p className="post-list-excerpt-editorial">{post.excerpt}</p>
                      )}
                      <p className="post-list-meta-editorial">{formattedDate}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <h2>Maqolalar topilmadi</h2>
              <p>Bu kategoriyada hali maqolalar mavjud emas.</p>
              <Link to="/">Bosh sahifaga qaytish</Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
