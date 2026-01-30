import React, { useState } from 'react';

// Sample data
const featuredPost = {
  id: 1,
  title: 'Finding Stillness in the Mountains of Northern Italy',
  excerpt: 'Sometimes the most profound journeys are the ones where we simply stop moving. A week in the Dolomites taught me more about presence than any meditation retreat ever could.',
  category: 'Travel',
  date: 'December 15, 2024',
  readTime: '8 min read',
  image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
};

const recentPosts = [
  {
    id: 2,
    title: 'The Art of Slow Mornings',
    excerpt: 'How reclaiming my first hours transformed everything that followed. A gentle guide to morning rituals.',
    category: 'Wellness',
    date: 'December 10, 2024',
    image: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Winter Comfort: A Simple Vegetable Soup',
    excerpt: 'The kind of nourishing bowl that makes cold evenings feel like a gift rather than something to endure.',
    category: 'Food',
    date: 'December 5, 2024',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Learning to Rest Without Guilt',
    excerpt: 'In a world that celebrates constant productivity, choosing rest is a quiet act of rebellion.',
    category: 'Wellness',
    date: 'November 28, 2024',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'A Weekend in Lisbon',
    excerpt: 'Faded tiles, pastéis de nata at sunrise, and the particular light that makes this city unforgettable.',
    category: 'Travel',
    date: 'November 20, 2024',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=400&fit=crop',
  },
  {
    id: 6,
    title: 'The Books That Shaped My Year',
    excerpt: 'Twelve months, countless pages, and the stories that left their mark on how I see the world.',
    category: 'Life',
    date: 'November 15, 2024',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
  },
];

const categories = ['All', 'Travel', 'Food', 'Wellness', 'Life'];

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <section className="hero">
        <div className="container">
          <p className="hero-subtitle">A Personal Journal</p>
          <h1 className="hero-title">
            Thoughts on <em>living well</em>, traveling slowly, and finding beauty in the everyday
          </h1>
          <p className="hero-description">
            Welcome to my corner of the internet where I share stories about food, travel,
            wellness, and the small moments that make life meaningful.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="container">
          <div className="search-wrapper">
            <span className="search-icon">
              <SearchIcon />
            </span>
            <input
              type="text"
              className="search-input"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <ul className="categories-list">
            {categories.map((category) => (
              <li key={category}>
                <button
                  className={`category-btn ${activeCategory === category ? 'active' : ''}`}
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
      <section className="featured-section">
        <div className="container">
          <p className="section-label">Featured</p>
          <article className="featured-post">
            <div className="featured-image-wrapper">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="featured-image"
              />
            </div>
            <div className="featured-content">
              <div className="featured-meta">
                <span className="featured-category">{featuredPost.category}</span>
                <span>·</span>
                <span>{featuredPost.date}</span>
                <span>·</span>
                <span>{featuredPost.readTime}</span>
              </div>
              <h2 className="featured-title">
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('post'); }}>
                  {featuredPost.title}
                </a>
              </h2>
              <p className="featured-excerpt">{featuredPost.excerpt}</p>
              <a
                href="#"
                className="read-more"
                onClick={(e) => { e.preventDefault(); onNavigate('post'); }}
              >
                Continue Reading <ArrowRight />
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* Recent Posts Grid */}
      <section className="posts-section">
        <div className="container">
          <p className="section-label">Recent Stories</p>
          <div className="posts-grid">
            {filteredPosts.map((post) => (
              <article key={post.id} className="post-card">
                <div className="post-image-wrapper">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="post-image"
                  />
                </div>
                <div className="post-content">
                  <div className="post-meta">
                    <span className="post-category">{post.category}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="post-title">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('post'); }}>
                      {post.title}
                    </a>
                  </h3>
                  <p className="post-excerpt">{post.excerpt}</p>
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
