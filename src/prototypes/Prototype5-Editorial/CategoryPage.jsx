import React, { useState } from 'react';

const categoryData = {
  name: 'Travel',
  description: 'Dispatches from around the world. Stories of place, people, and the transformative power of going somewhere new.',
};

const posts = [
  {
    id: 1,
    title: 'The Last Great American Road Trip',
    excerpt: 'From the Pacific Coast Highway to Route 66, we drove 4,000 miles in search of the landscapes and stories that define a nation in transition.',
    date: 'December 15, 2024',
    author: 'Sarah Mitchell',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=333&fit=crop',
  },
  {
    id: 2,
    title: 'Winter in Hokkaido',
    excerpt: 'Japan\'s northern island offers powder snow, hot springs, and a serenity that feels almost impossible in the modern world.',
    date: 'December 8, 2024',
    author: 'Sarah Mitchell',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&h=333&fit=crop',
  },
  {
    id: 3,
    title: 'The Trains of Sri Lanka',
    excerpt: 'The island nation\'s colonial-era railway system is one of the most scenic—and slowest—ways to see the country.',
    date: 'November 28, 2024',
    author: 'David Park',
    image: 'https://images.unsplash.com/photo-1586100345582-4e7e4a2d7b2c?w=500&h=333&fit=crop',
  },
  {
    id: 4,
    title: 'Patagonia: Edge of the World',
    excerpt: 'At the southern tip of South America, where glaciers meet the sea and the wind never stops.',
    date: 'November 15, 2024',
    author: 'Sarah Mitchell',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&h=333&fit=crop',
  },
  {
    id: 5,
    title: 'A Week in the Outer Hebrides',
    excerpt: 'Scotland\'s remote island chain offers wild beaches, ancient standing stones, and a pace of life from another era.',
    date: 'October 30, 2024',
    author: 'Emma Walsh',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=500&h=333&fit=crop',
  },
  {
    id: 6,
    title: 'Morocco by Night Train',
    excerpt: 'From Tangier to Marrakech, watching the country transform through the windows of a sleeper car.',
    date: 'October 15, 2024',
    author: 'David Park',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=500&h=333&fit=crop',
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
      <header className="category-header-editorial">
        <div className="container">
          <h1 className="category-page-title-editorial">{categoryData.name}</h1>
          <p className="category-description-editorial">{categoryData.description}</p>
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
              placeholder="Search articles..."
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

      {/* Posts List */}
      <section className="category-posts-editorial">
        <div className="container">
          <div className="posts-list-editorial">
            {posts.map((post) => (
              <article key={post.id} className="post-list-item-editorial">
                <img
                  src={post.image}
                  alt={post.title}
                  className="post-list-image-editorial"
                />
                <div className="post-list-content-editorial">
                  <span className="post-list-category-editorial">{categoryData.name}</span>
                  <h2 className="post-list-title-editorial">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('post'); }}>
                      {post.title}
                    </a>
                  </h2>
                  <p className="post-list-excerpt-editorial">{post.excerpt}</p>
                  <p className="post-list-meta-editorial">By {post.author} · {post.date}</p>
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
