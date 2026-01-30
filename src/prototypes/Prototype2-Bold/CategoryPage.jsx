import React, { useState } from 'react';

const categoryData = {
  name: 'Travel',
  description: 'Adventures, misadventures, and everything in between. Stories from the road less Instagrammed.',
  postCount: 24,
};

const posts = [
  {
    id: 1,
    title: 'Chasing Light in the Streets of Marrakech',
    excerpt: 'The medina swallowed me whole—a maze of copper, spices, and shadows. Here\'s what I found when I stopped trying to find my way out.',
    date: 'Dec 15, 2024',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=560&h=350&fit=crop',
  },
  {
    id: 2,
    title: '48 Hours in Tokyo\'s Underground',
    excerpt: 'Neon dreams, hidden bars, and the city that never sleeps. A guide to Tokyo after midnight.',
    date: 'Nov 20, 2024',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=560&h=350&fit=crop',
  },
  {
    id: 3,
    title: 'Iceland in Winter: A Survival Guide',
    excerpt: 'Chasing northern lights, dodging blizzards, and learning why Icelanders are the toughest people on earth.',
    date: 'Oct 28, 2024',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=560&h=350&fit=crop',
  },
  {
    id: 4,
    title: 'The Last Train Through Vietnam',
    excerpt: 'From Hanoi to Ho Chi Minh City, 30 hours of sleeper cars, instant noodles, and unexpected friendships.',
    date: 'Sep 15, 2024',
    readTime: '15 min',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=560&h=350&fit=crop',
  },
  {
    id: 5,
    title: 'Mexico City: Beyond the Tacos',
    excerpt: 'Art, architecture, and the chaos that makes CDMX one of the world\'s most underrated cities.',
    date: 'Aug 22, 2024',
    readTime: '9 min',
    image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=560&h=350&fit=crop',
  },
  {
    id: 6,
    title: 'Road Tripping the Scottish Highlands',
    excerpt: 'Castles, whisky, and the kind of landscapes that make you believe in magic.',
    date: 'Jul 10, 2024',
    readTime: '11 min',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=560&h=350&fit=crop',
  },
];

const categories = ['All', 'Travel', 'Food', 'Wellness', 'Life'];

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
      <header className="category-header-bold">
        <div className="container">
          <h1 className="category-page-title-bold">{categoryData.name}</h1>
          <p className="category-description-bold">{categoryData.description}</p>
          <div className="category-stats">{categoryData.postCount} Stories</div>
        </div>
      </header>

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
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Categories Filter */}
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

      {/* Posts List */}
      <section className="category-posts-bold">
        <div className="container">
          <div className="posts-list-bold">
            {posts.map((post) => (
              <article key={post.id} className="post-list-item-bold">
                <img
                  src={post.image}
                  alt={post.title}
                  className="post-list-image-bold"
                />
                <div className="post-list-content-bold">
                  <h2 className="post-list-title-bold">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('post'); }}>
                      {post.title}
                    </a>
                  </h2>
                  <p className="post-list-excerpt-bold">{post.excerpt}</p>
                  <div className="post-list-meta-bold">
                    {post.date} · {post.readTime} read
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
