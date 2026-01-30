import React, { useState } from 'react';

// Sample data
const featuredPost = {
  id: 1,
  title: 'Chasing Light in the Streets of Marrakech',
  excerpt: 'The medina swallowed me whole—a maze of copper, spices, and shadows. Here\'s what I found when I stopped trying to find my way out.',
  category: 'Travel',
  date: 'Dec 15, 2024',
  readTime: '8 min',
  image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&h=600&fit=crop',
};

const recentPosts = [
  {
    id: 2,
    title: 'Why I Quit My Job to Learn Pottery',
    excerpt: 'Sometimes you have to destroy everything to create something real.',
    category: 'Life',
    date: 'Dec 10, 2024',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=375&fit=crop',
  },
  {
    id: 3,
    title: 'The Hottest New Restaurant in Brooklyn',
    excerpt: 'Where fusion meets fire—and the wait is worth every minute.',
    category: 'Food',
    date: 'Dec 5, 2024',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=375&fit=crop',
  },
  {
    id: 4,
    title: '5 AM Workouts Changed My Brain',
    excerpt: 'I was a night owl. Then everything shifted.',
    category: 'Wellness',
    date: 'Nov 28, 2024',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=375&fit=crop',
  },
  {
    id: 5,
    title: '48 Hours in Tokyo\'s Underground',
    excerpt: 'Neon dreams, hidden bars, and the city that never sleeps.',
    category: 'Travel',
    date: 'Nov 20, 2024',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=375&fit=crop',
  },
  {
    id: 6,
    title: 'The Art of Saying No',
    excerpt: 'Boundaries aren\'t walls—they\'re architecture.',
    category: 'Life',
    date: 'Nov 15, 2024',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=375&fit=crop',
  },
  {
    id: 7,
    title: 'Fermentation: A Beginner\'s Obsession',
    excerpt: 'From kimchi to kombucha, my kitchen became a lab.',
    category: 'Food',
    date: 'Nov 10, 2024',
    image: 'https://images.unsplash.com/photo-1589135716294-6b11c1e9b10d?w=600&h=375&fit=crop',
  },
];

const categories = ['All', 'Travel', 'Food', 'Wellness', 'Life'];

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
      <section className="hero-bold">
        <div className="container">
          <div className="hero-content-bold">
            <span className="hero-label">Welcome to the Journal</span>
            <h1 className="hero-title-bold">
              <span className="line">Stories That</span>
              <span className="line"><span className="highlight">Move</span> You</span>
              <span className="line outline">Forward</span>
            </h1>
            <p className="hero-description-bold">
              Raw takes on travel, food, wellness, and the messy business of being alive.
              No filters. No fluff. Just life, amplified.
            </p>
            <a
              href="#"
              className="hero-cta"
              onClick={(e) => { e.preventDefault(); onNavigate('category'); }}
            >
              <span>Explore Stories</span>
              <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section-bold">
        <div className="container">
          <div className="search-wrapper-bold">
            <span className="search-icon-bold">
              <SearchIcon />
            </span>
            <input
              type="text"
              className="search-input-bold"
              placeholder="Search for something..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section-bold">
        <div className="container">
          <ul className="categories-list-bold">
            {categories.map((category) => (
              <li key={category}>
                <button
                  className={`category-btn-bold ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  <span>{category}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured Post */}
      <section className="featured-section-bold">
        <div className="container">
          <div className="section-header-bold">
            <span className="section-label-bold">Featured</span>
            <div className="section-line"></div>
          </div>
          <article className="featured-post-bold">
            <div className="featured-image-wrapper-bold">
              <span className="featured-number">01</span>
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="featured-image-bold"
              />
            </div>
            <div className="featured-content-bold">
              <div className="featured-meta-bold">
                <span className="featured-category-bold">{featuredPost.category}</span>
                <span className="featured-date">{featuredPost.date} · {featuredPost.readTime}</span>
              </div>
              <h2 className="featured-title-bold">
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('post'); }}>
                  {featuredPost.title}
                </a>
              </h2>
              <p className="featured-excerpt-bold">{featuredPost.excerpt}</p>
              <a
                href="#"
                className="read-more-bold"
                onClick={(e) => { e.preventDefault(); onNavigate('post'); }}
              >
                Read Story <ArrowRight />
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* Recent Posts Grid */}
      <section className="posts-section-bold">
        <div className="container">
          <div className="section-header-bold">
            <span className="section-label-bold">Latest</span>
            <div className="section-line"></div>
          </div>
          <div className="posts-grid-bold">
            {filteredPosts.map((post) => (
              <article key={post.id} className="post-card-bold">
                <div className="post-image-wrapper-bold">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="post-image-bold"
                  />
                </div>
                <div className="post-content-bold">
                  <div className="post-meta-bold">
                    <span className="post-category-bold">{post.category}</span>
                    <span className="post-date-bold">{post.date}</span>
                  </div>
                  <h3 className="post-title-bold">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('post'); }}>
                      {post.title}
                    </a>
                  </h3>
                  <p className="post-excerpt-bold">{post.excerpt}</p>
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
