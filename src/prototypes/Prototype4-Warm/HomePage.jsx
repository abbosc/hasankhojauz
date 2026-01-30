import React, { useState } from 'react';

// Sample data
const featuredPost = {
  id: 1,
  title: 'A Cozy Weekend Guide to Autumn Baking',
  excerpt: 'There\'s something magical about filling your home with the scent of cinnamon and fresh bread on a crisp fall morning. Here are my favorite recipes to make this season extra special.',
  category: 'Food',
  date: 'December 15, 2024',
  readTime: '7 min read',
  image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
};

const recentPosts = [
  {
    id: 2,
    title: 'Creating Your Perfect Morning Routine',
    excerpt: 'Small rituals that transform your entire day, starting with how you wake up.',
    category: 'Wellness',
    date: 'December 10, 2024',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=450&fit=crop',
  },
  {
    id: 3,
    title: 'Hidden Gems of the Portuguese Coast',
    excerpt: 'Beyond Lisbon: charming villages, secret beaches, and the best pastéis de nata.',
    category: 'Travel',
    date: 'December 5, 2024',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=450&fit=crop',
  },
  {
    id: 4,
    title: 'The Joy of Handwritten Letters',
    excerpt: 'Why slowing down to write can bring unexpected happiness to both sender and receiver.',
    category: 'Life',
    date: 'November 28, 2024',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=450&fit=crop',
  },
  {
    id: 5,
    title: 'Plant-Based Comfort Food for Cold Days',
    excerpt: 'Hearty, warming recipes that prove healthy eating doesn\'t mean sacrificing flavor.',
    category: 'Food',
    date: 'November 20, 2024',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=450&fit=crop',
  },
  {
    id: 6,
    title: 'Finding Peace in a Busy World',
    excerpt: 'Simple mindfulness practices you can do anywhere, anytime.',
    category: 'Wellness',
    date: 'November 15, 2024',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&h=450&fit=crop',
  },
  {
    id: 7,
    title: 'A Week in the Scottish Highlands',
    excerpt: 'Misty mountains, cozy pubs, and the kind of beauty that stays with you.',
    category: 'Travel',
    date: 'November 10, 2024',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=450&fit=crop',
  },
];

const categories = ['All', 'Travel', 'Food', 'Wellness', 'Life'];

// Icons
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

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L13.09 8.26L19 7L14.74 11.27L21 12L14.74 12.73L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 12.73L3 12L9.26 11.27L5 7L10.91 8.26L12 2Z" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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
      <section className="hero-warm">
        <div className="container">
          <div className="hero-badge">
            <SparkleIcon />
            Welcome to Honeybee Journal
          </div>
          <h1 className="hero-title-warm">
            Stories for a <span className="highlight">cozier</span> life
          </h1>
          <p className="hero-description-warm">
            A little corner of the internet dedicated to good food, slow travel,
            mindful living, and finding joy in everyday moments.
          </p>
          <a
            href="#"
            className="hero-cta-warm"
            onClick={(e) => { e.preventDefault(); onNavigate('category'); }}
          >
            Start Exploring <ArrowRight />
          </a>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section-warm">
        <div className="container">
          <div className="search-wrapper-warm">
            <span className="search-icon-warm">
              <SearchIcon />
            </span>
            <input
              type="text"
              className="search-input-warm"
              placeholder="Search for recipes, travel tips, and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section-warm">
        <div className="container">
          <ul className="categories-list-warm">
            {categories.map((category) => (
              <li key={category}>
                <button
                  className={`category-btn-warm ${activeCategory === category ? 'active' : ''}`}
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
      <section className="featured-section-warm">
        <div className="container">
          <div className="section-header-warm">
            <span className="section-label-warm">
              <HeartIcon />
              Featured Story
            </span>
          </div>
          <article className="featured-post-warm">
            <div className="featured-image-wrapper-warm">
              <span className="featured-badge">Editor's Pick</span>
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="featured-image-warm"
              />
            </div>
            <div className="featured-content-warm">
              <div className="featured-meta-warm">
                <span className="featured-category-warm">{featuredPost.category}</span>
                <span className="featured-date-warm">{featuredPost.date}</span>
              </div>
              <h2 className="featured-title-warm">
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('post'); }}>
                  {featuredPost.title}
                </a>
              </h2>
              <p className="featured-excerpt-warm">{featuredPost.excerpt}</p>
              <a
                href="#"
                className="read-more-warm"
                onClick={(e) => { e.preventDefault(); onNavigate('post'); }}
              >
                Read More <ArrowRight />
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* Recent Posts Grid */}
      <section className="posts-section-warm">
        <div className="container">
          <div className="section-header-warm">
            <span className="section-label-warm">
              <SparkleIcon />
              Recent Stories
            </span>
          </div>
          <div className="posts-grid-warm">
            {filteredPosts.map((post) => (
              <article key={post.id} className="post-card-warm">
                <div className="post-image-wrapper-warm">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="post-image-warm"
                  />
                </div>
                <div className="post-content-warm">
                  <div className="post-meta-warm">
                    <span className="post-category-warm">{post.category}</span>
                    <span className="post-date-warm">{post.date}</span>
                  </div>
                  <h3 className="post-title-warm">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('post'); }}>
                      {post.title}
                    </a>
                  </h3>
                  <p className="post-excerpt-warm">{post.excerpt}</p>
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
