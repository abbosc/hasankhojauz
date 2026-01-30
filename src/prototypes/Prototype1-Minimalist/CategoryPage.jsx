import React, { useState } from 'react';

const categoryData = {
  name: 'Travel',
  description: 'Stories from places near and far—slow journeys, quiet discoveries, and the art of being present wherever you find yourself.',
  postCount: 24,
};

const posts = [
  {
    id: 1,
    title: 'Finding Stillness in the Mountains of Northern Italy',
    excerpt: 'Sometimes the most profound journeys are the ones where we simply stop moving. A week in the Dolomites taught me more about presence than any meditation retreat ever could.',
    date: 'December 15, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=267&fit=crop',
  },
  {
    id: 2,
    title: 'A Weekend in Lisbon',
    excerpt: 'Faded tiles, pastéis de nata at sunrise, and the particular light that makes this city unforgettable. Notes from three unhurried days.',
    date: 'November 20, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=267&fit=crop',
  },
  {
    id: 3,
    title: 'The Quiet Villages of the Cotswolds',
    excerpt: 'Honey-colored stone, winding lanes, and afternoons that stretch like taffy. Why I keep returning to this corner of England.',
    date: 'October 28, 2024',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=400&h=267&fit=crop',
  },
  {
    id: 4,
    title: 'Tokyo in the Rain',
    excerpt: 'There\'s a particular magic to the city when it rains—the way neon reflects on wet pavement, the quiet of temples, the warmth of crowded ramen shops.',
    date: 'September 15, 2024',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=267&fit=crop',
  },
  {
    id: 5,
    title: 'Driving the Amalfi Coast, Slowly',
    excerpt: 'Forget the tour buses. The real beauty of this legendary coastline reveals itself only when you take your time—one seaside village at a time.',
    date: 'August 22, 2024',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=400&h=267&fit=crop',
  },
  {
    id: 6,
    title: 'A Month in Provence',
    excerpt: 'Lavender fields, village markets, and the slow rhythm of French country life. What I learned from living like a local.',
    date: 'July 10, 2024',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=400&h=267&fit=crop',
  },
];

const categories = ['All', 'Travel', 'Food', 'Wellness', 'Life'];

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <header className="category-header">
        <div className="container">
          <h1 className="category-page-title">{categoryData.name}</h1>
          <p className="category-description">{categoryData.description}</p>
        </div>
      </header>

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
              placeholder="Search in this category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Categories Filter */}
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

      {/* Posts List */}
      <section className="category-posts">
        <div className="container">
          <div className="posts-list">
            {posts.map((post) => (
              <article key={post.id} className="post-list-item">
                <img
                  src={post.image}
                  alt={post.title}
                  className="post-list-image"
                />
                <div className="post-list-content">
                  <h2 className="post-list-title">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('post'); }}>
                      {post.title}
                    </a>
                  </h2>
                  <p className="post-list-excerpt">{post.excerpt}</p>
                  <div className="post-list-meta">
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
