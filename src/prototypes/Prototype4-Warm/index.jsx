import React, { useState } from 'react';
import './styles.css';
import HomePage from './HomePage';
import BlogPostPage from './BlogPostPage';
import CategoryPage from './CategoryPage';

// Leaf Icon for logo
const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

// Header Component
const Header = ({ currentPage, onNavigate }) => {
  return (
    <header className="header-warm">
      <div className="container header-inner-warm">
        <a href="#" className="logo-warm" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
          <span className="logo-icon">
            <LeafIcon />
          </span>
          Honeybee
        </a>
        <nav className="nav-warm">
          <a
            href="#"
            className={`nav-link-warm ${currentPage === 'home' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
          >
            Home
          </a>
          <a
            href="#"
            className={`nav-link-warm ${currentPage === 'category' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onNavigate('category'); }}
          >
            Recipes
          </a>
          <a
            href="#"
            className="nav-link-warm"
            onClick={(e) => e.preventDefault()}
          >
            About
          </a>
          <a
            href="#"
            className="nav-link-warm"
            onClick={(e) => e.preventDefault()}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

// Footer Component
const Footer = ({ onNavigate }) => {
  return (
    <footer className="footer-warm">
      <div className="container footer-inner-warm">
        <a href="#" className="footer-logo-warm" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
          Honeybee Journal
        </a>
        <nav className="footer-links-warm">
          <a href="#" className="footer-link-warm" onClick={(e) => e.preventDefault()}>About</a>
          <a href="#" className="footer-link-warm" onClick={(e) => e.preventDefault()}>Contact</a>
          <a href="#" className="footer-link-warm" onClick={(e) => e.preventDefault()}>Privacy</a>
        </nav>
        <p className="footer-copy-warm">© 2024 Honeybee Journal. Made with love.</p>
      </div>
    </footer>
  );
};

// Main Prototype Component
const Prototype4Warm = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'post':
        return <BlogPostPage onNavigate={handleNavigate} />;
      case 'category':
        return <CategoryPage onNavigate={handleNavigate} />;
      case 'home':
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="warm-wrapper">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      {renderPage()}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export { HomePage, BlogPostPage, CategoryPage };
export default Prototype4Warm;
