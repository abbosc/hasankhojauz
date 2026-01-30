import React, { useState } from 'react';

// Sample data
const featuredPost = {
  id: 1,
  title: 'The Art of Slow Living in the South of France',
  excerpt: 'In a small village between lavender fields and ancient olive groves, I discovered what it truly means to savor time. A meditation on presence, pleasure, and the French art of doing nothing beautifully.',
  category: 'Travel',
  date: 'December 15, 2024',
  readTime: '10 min read',
  image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=1000&fit=crop',
};

const recentPosts = [
  {
    id: 2,
    title: 'Evening Rituals for the Restless Mind',
    excerpt: 'A curated guide to winding down with intention and grace.',
    category: 'Wellness',
    date: 'December 10, 2024',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'The Perfect Winter Dinner Party',
    excerpt: 'Candlelight, comfort food, and conversations that matter.',
    category: 'Food',
    date: 'December 5, 2024',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'On Solitude and Self-Discovery',
    excerpt: 'Learning to be alone without being lonely.',
    category: 'Life',
    date: 'November 28, 2024',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'A Weekend in Vienna',
    excerpt: 'Coffee houses, opera, and the city that perfected elegance.',
    category: 'Travel',
    date: 'November 20, 2024',
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=600&h=400&fit=crop',
  },
  {
    id: 6,
    title: 'The Case for Quiet Luxury',
    excerpt: 'Why less is infinitely more in a world of excess.',
    category: 'Life',
    date: 'November 15, 2024',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
  },
  {
    id: 7,
    title: 'Mastering the Art of Tea',
    excerpt: 'A journey through rituals, leaves, and mindful moments.',
    category: 'Wellness',
    date: 'November 10, 2024',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop',
  },
];

const categories = ['All', 'Travel', 'Food', 'Wellness', 'Life'];

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const HomePage = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = activeCategory === 'All'
    ? recentPosts
    : recentPosts.filter(post => post.category === activeCategory);

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-dark">
        <div className="container">
          <div className="hero-content-dark">
            <p className="hero-eyebrow">A Journal of Refined Living</p>
            <h1 className="hero-title-dark">
              Where <em>elegance</em> meets<br />everyday life
            </h1>
            <p className="hero-description-dark">
              Curated reflections on travel, taste, and the pursuit of a life
              well-lived. For those who believe that beauty lies in the details.
            </p>
            <a
              href="#"
              className="hero-cta-dark"
              onClick={(e) => { e.preventDefault(); onNavigate('category'); }}
            >
              <span>Begin Reading</span>
              <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider">
        <span className="divider-line"></span>
        <span className="divider-icon"></span>
        <span className="divider-line"></span>
      </div>

      {/* Search Section */}
      <section className="search-section-dark">
        <div className="container">
          <div className="search-wrapper-dark">
            <span className="search-icon-dark">
              <SearchIcon />
            </span>
            <input
              type="text"
              className="search-input-dark"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section-dark">
        <div className="container">
          <ul className="categories-list-dark">
            {categories.map((category) => (
              <li key={category}>
                <button
                  className={`category-btn-dark ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured Post */}
      <section className="featured-section-dark">
        <div className="container">
          <div className="section-header-dark">
            <span className="section-label-dark">Featured Story</span>
          </div>
          <article className="featured-post-dark">
            <div className="featured-image-wrapper-dark">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="featured-image-dark"
              />
            </div>
            <div className="featured-content-dark">
              <div className="featured-meta-dark">
                <span className="featured-category-dark">{featuredPost.category}</span>
                <span className="featured-date-dark">{featuredPost.date}</span>
              </div>
              <h2 className="featured-title-dark">
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('post'); }}>
                  {featuredPost.title}
                </a>
              </h2>
              <p className="featured-excerpt-dark">{featuredPost.excerpt}</p>
              <a
                href="#"
                className="read-more-dark"
                onClick={(e) => { e.preventDefault(); onNavigate('post'); }}
              >
                Continue Reading <ArrowRight />
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* Divider */}
      <div className="divider">
        <span className="divider-line"></span>
        <span className="divider-icon"></span>
        <span className="divider-line"></span>
      </div>

      {/* Recent Posts Grid */}
      <section className="posts-section-dark">
        <div className="container">
          <div className="section-header-dark">
            <span className="section-label-dark">Recent Essays</span>
          </div>
          <div className="posts-grid-dark">
            {filteredPosts.map((post) => (
              <article key={post.id} className="post-card-dark">
                <div className="post-image-wrapper-dark">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="post-image-dark"
                  />
                </div>
                <div className="post-content-dark">
                  <div className="post-meta-dark">
                    <span className="post-category-dark">{post.category}</span>
                    <span className="post-date-dark">{post.date}</span>
                  </div>
                  <h3 className="post-title-dark">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('post'); }}>
                      {post.title}
                    </a>
                  </h3>
                  <p className="post-excerpt-dark">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
