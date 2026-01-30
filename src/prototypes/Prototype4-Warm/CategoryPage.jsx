import React, { useState } from 'react';

const categoryData = {
  name: 'Food',
  description: 'Recipes, kitchen adventures, and the simple joy of cooking for the people you love. From weeknight dinners to special occasion treats.',
};

const posts = [
  {
    id: 1,
    title: 'A Cozy Weekend Guide to Autumn Baking',
    excerpt: 'There\'s something magical about filling your home with the scent of cinnamon and fresh bread on a crisp fall morning.',
    date: 'December 15, 2024',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=440&h=330&fit=crop',
  },
  {
    id: 2,
    title: 'Plant-Based Comfort Food for Cold Days',
    excerpt: 'Hearty, warming recipes that prove healthy eating doesn\'t mean sacrificing flavor or satisfaction.',
    date: 'November 20, 2024',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=440&h=330&fit=crop',
  },
  {
    id: 3,
    title: 'The Perfect Homemade Pasta Guide',
    excerpt: 'From flour to fork: everything you need to know to make restaurant-quality pasta in your own kitchen.',
    date: 'October 28, 2024',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=440&h=330&fit=crop',
  },
  {
    id: 4,
    title: 'Summer Preserves: A Beginner\'s Journey',
    excerpt: 'Jams, pickles, and the satisfaction of opening a jar of sunshine in the middle of winter.',
    date: 'September 15, 2024',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1597714026720-8f74c62310ba?w=440&h=330&fit=crop',
  },
  {
    id: 5,
    title: 'The Art of Sunday Dinner',
    excerpt: 'How gathering around the table became our family\'s most treasured weekly tradition.',
    date: 'August 22, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=440&h=330&fit=crop',
  },
  {
    id: 6,
    title: 'Baking Bread: A Love Story',
    excerpt: 'How learning to bake sourdough changed my relationship with food, time, and patience.',
    date: 'July 10, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=440&h=330&fit=crop',
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
  const [activeCategory, setActiveCategory] = useState('Food');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main>
      {/* Category Header */}
      <header className="category-header-warm">
        <div className="container">
          <h1 className="category-page-title-warm">{categoryData.name}</h1>
          <p className="category-description-warm">{categoryData.description}</p>
        </div>
      </header>

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
              placeholder="Search recipes and stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Categories Filter */}
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

      {/* Posts List */}
      <section className="category-posts-warm">
        <div className="container">
          <div className="posts-list-warm">
            {posts.map((post) => (
              <article key={post.id} className="post-list-item-warm">
                <img
                  src={post.image}
                  alt={post.title}
                  className="post-list-image-warm"
                />
                <div className="post-list-content-warm">
                  <h2 className="post-list-title-warm">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('post'); }}>
                      {post.title}
                    </a>
                  </h2>
                  <p className="post-list-excerpt-warm">{post.excerpt}</p>
                  <div className="post-list-meta-warm">
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
