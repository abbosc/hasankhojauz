import React, { useState } from 'react';

const categoryData = {
  name: 'Travel',
  description: 'Journeys to places that change us—from grand adventures to quiet escapes, each story an invitation to see the world differently.',
};

const posts = [
  {
    id: 1,
    title: 'The Art of Slow Living in the South of France',
    excerpt: 'In a small village between lavender fields and ancient olive groves, I discovered what it truly means to savor time.',
    date: 'December 15, 2024',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=480&h=320&fit=crop',
  },
  {
    id: 2,
    title: 'A Weekend in Vienna',
    excerpt: 'Coffee houses, opera, and the city that perfected elegance. Notes from three days of unhurried wandering.',
    date: 'November 20, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=480&h=320&fit=crop',
  },
  {
    id: 3,
    title: 'The Temples of Kyoto at Dawn',
    excerpt: 'Before the crowds arrive, there is a stillness in Kyoto that feels like stepping into another century entirely.',
    date: 'October 28, 2024',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=480&h=320&fit=crop',
  },
  {
    id: 4,
    title: 'A Winter in the Swiss Alps',
    excerpt: 'When the world grows quiet under snow, and the only sound is the whisper of skis on powder.',
    date: 'September 15, 2024',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=480&h=320&fit=crop',
  },
  {
    id: 5,
    title: 'Venice in the Off-Season',
    excerpt: 'Without the summer crowds, the city reveals its true self—melancholic, beautiful, and utterly captivating.',
    date: 'August 22, 2024',
    readTime: '11 min read',
    image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=480&h=320&fit=crop',
  },
  {
    id: 6,
    title: 'The Gardens of Marrakech',
    excerpt: 'Behind ancient walls, oases of green and blue offer respite from the medina\'s beautiful chaos.',
    date: 'July 10, 2024',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=480&h=320&fit=crop',
  },
];

const categories = ['All', 'Travel', 'Food', 'Wellness', 'Life'];

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const CategoryPage = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('Travel');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main>
      {/* Category Header */}
      <header className="category-header-dark">
        <div className="container">
          <h1 className="category-page-title-dark">{categoryData.name}</h1>
          <p className="category-description-dark">{categoryData.description}</p>
        </div>
      </header>

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
              placeholder="Search essays..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Categories Filter */}
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

      {/* Posts List */}
      <section className="category-posts-dark">
        <div className="container">
          <div className="posts-list-dark">
            {posts.map((post) => (
              <article key={post.id} className="post-list-item-dark">
                <img
                  src={post.image}
                  alt={post.title}
                  className="post-list-image-dark"
                />
                <div className="post-list-content-dark">
                  <h2 className="post-list-title-dark">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('post'); }}>
                      {post.title}
                    </a>
                  </h2>
                  <p className="post-list-excerpt-dark">{post.excerpt}</p>
                  <div className="post-list-meta-dark">
                    {post.date} · {post.readTime}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CategoryPage;
