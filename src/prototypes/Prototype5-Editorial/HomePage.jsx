import React, { useState } from 'react';

// Sample data
const heroPost = {
  id: 1,
  title: 'The Last Great American Road Trip',
  excerpt: 'From the Pacific Coast Highway to Route 66, we drove 4,000 miles in search of the landscapes and stories that define a nation in transition.',
  category: 'Travel',
  date: 'December 15, 2024',
  author: 'Sarah Mitchell',
  image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1000&h=625&fit=crop',
};

const sidebarPosts = [
  {
    id: 2,
    title: 'Why Everyone Is Obsessed With Fermentation',
    category: 'Food',
    date: 'December 14, 2024',
    author: 'James Chen',
  },
  {
    id: 3,
    title: 'The Science of Better Sleep',
    category: 'Wellness',
    date: 'December 13, 2024',
    author: 'Dr. Emily Roberts',
  },
  {
    id: 4,
    title: 'Letter to My Younger Self',
    category: 'Life',
    date: 'December 12, 2024',
    author: 'Maria Santos',
  },
];

const gridPosts = [
  {
    id: 5,
    title: 'Inside Copenhagen\'s Michelin Underground',
    excerpt: 'The Danish capital\'s food scene has evolved far beyond Noma. We explore the chefs pushing boundaries in unexpected places.',
    category: 'Food',
    date: 'December 11, 2024',
    author: 'James Chen',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop',
    size: 'large',
  },
  {
    id: 6,
    title: 'Digital Detox: One Month Offline',
    excerpt: 'What happens when you disconnect completely in the age of infinite scroll.',
    category: 'Wellness',
    date: 'December 10, 2024',
    author: 'Emily Roberts',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&h=375&fit=crop',
    size: 'normal',
  },
  {
    id: 7,
    title: 'The Art of Doing Nothing',
    excerpt: 'In praise of boredom, daydreaming, and unscheduled time.',
    category: 'Life',
    date: 'December 9, 2024',
    author: 'Maria Santos',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=375&fit=crop',
    size: 'normal',
  },
  {
    id: 8,
    title: 'Winter in Hokkaido',
    category: 'Travel',
    date: 'December 8, 2024',
    author: 'Sarah Mitchell',
    size: 'small',
  },
  {
    id: 9,
    title: 'Sourdough Troubleshooting Guide',
    category: 'Food',
    date: 'December 7, 2024',
    author: 'James Chen',
    size: 'small',
  },
  {
    id: 10,
    title: 'Morning Yoga: A Beginner\'s Sequence',
    category: 'Wellness',
    date: 'December 6, 2024',
    author: 'Emily Roberts',
    size: 'small',
  },
  {
    id: 11,
    title: 'On Friendship After 40',
    category: 'Life',
    date: 'December 5, 2024',
    author: 'Maria Santos',
    size: 'small',
  },
];

const categories = ['All', 'Travel', 'Food', 'Wellness', 'Life'];

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const HomePage = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main>
      {/* Breaking News Bar */}
      <div className="breaking-bar">
        <div className="container">
          <p className="breaking-text">
            <span className="breaking-label">Featured</span>
            This week: Our guide to mindful travel in the age of overtourism
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-editorial">
        <div className="container">
          <div className="hero-grid">
            <article className="hero-main">
              <div className="hero-image-wrapper">
                <img
                  src={heroPost.image}
                  alt={heroPost.title}
                  className="hero-image"
                />
              </div>
              <span className="hero-category">{heroPost.category}</span>
              <h1 className="hero-title">
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('post'); }}>
                  {heroPost.title}
                </a>
              </h1>
              <p className="hero-excerpt">{heroPost.excerpt}</p>
              <p className="hero-meta">By {heroPost.author} · {heroPost.date}</p>
            </article>

            <aside className="hero-sidebar">
              {sidebarPosts.map((post) => (
                <article key={post.id} className="sidebar-post">
                  <span className="sidebar-category">{post.category}</span>
                  <h3 className="sidebar-title">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('post'); }}>
                      {post.title}
                    </a>
                  </h3>
                  <p className="sidebar-meta">By {post.author}</p>
                </article>
              ))}
            </aside>
          </div>
        </div>
      </section>

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
              placeholder="Search articles..."
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
            {categories.map((category) => (
              <li key={category}>
                <button
                  className={`category-btn-editorial ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="posts-section-editorial">
        <div className="container">
          <div className="section-header-editorial">
            <h2 className="section-title-editorial">Latest Stories</h2>
            <div className="section-line"></div>
          </div>
          <div className="posts-grid-editorial">
            {gridPosts.map((post) => (
              <article
                key={post.id}
                className={`post-card-editorial ${post.size}`}
              >
                {post.image && (
                  <div className="post-image-wrapper-editorial">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="post-image-editorial"
                    />
                  </div>
                )}
                <div className="post-content-editorial">
                  <span className="post-category-editorial">{post.category}</span>
                  <h3 className="post-title-editorial">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('post'); }}>
                      {post.title}
                    </a>
                  </h3>
                  {post.excerpt && (
                    <p className="post-excerpt-editorial">{post.excerpt}</p>
                  )}
                  <p className="post-meta-editorial">By {post.author} · {post.date}</p>
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
