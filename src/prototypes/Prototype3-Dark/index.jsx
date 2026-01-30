import React, { useState } from 'react';
import './styles.css';
import HomePage from './HomePage';
import BlogPostPage from './BlogPostPage';
import CategoryPage from './CategoryPage';

// Header Component
const Header = ({ currentPage, onNavigate }) => {
  return (
    <header className="header-dark">
      <div className="container header-inner-dark">
        <a href="#" className="logo-dark" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
          Lumière
        </a>
        <nav className="nav-dark">
          <a
            href="#"
            className={`nav-link-dark ${currentPage === 'home' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
          >
            Home
          </a>
          <a
            href="#"
            className={`nav-link-dark ${currentPage === 'category' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onNavigate('category'); }}
          >
            Essays
          </a>
          <a
            href="#"
            className="nav-link-dark"
            onClick={(e) => e.preventDefault()}
          >
            About
          </a>
          <a
            href="#"
            className="nav-link-dark"
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
    <footer className="footer-dark">
      <div className="container footer-inner-dark">
        <a href="#" className="footer-logo-dark" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
          Lumière
        </a>
        <nav className="footer-links-dark">
          <a href="#" className="footer-link-dark" onClick={(e) => e.preventDefault()}>About</a>
          <a href="#" className="footer-link-dark" onClick={(e) => e.preventDefault()}>Contact</a>
          <a href="#" className="footer-link-dark" onClick={(e) => e.preventDefault()}>Privacy</a>
        </nav>
        <p className="footer-copy-dark">© 2024 Lumière. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Main Prototype Component
const Prototype3Dark = () => {
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
    <div className="dark-wrapper">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      {renderPage()}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export { HomePage, BlogPostPage, CategoryPage };
export default Prototype3Dark;
