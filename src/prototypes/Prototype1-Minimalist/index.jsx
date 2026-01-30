import React, { useState } from 'react';
import './styles.css';
import HomePage from './HomePage';
import BlogPostPage from './BlogPostPage';
import CategoryPage from './CategoryPage';

// Header Component
const Header = ({ currentPage, onNavigate }) => {
  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
          The Quiet Life
        </a>
        <nav className="nav">
          <a
            href="#"
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
          >
            Home
          </a>
          <a
            href="#"
            className={`nav-link ${currentPage === 'category' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onNavigate('category'); }}
          >
            Categories
          </a>
          <a
            href="#"
            className="nav-link"
            onClick={(e) => e.preventDefault()}
          >
            About
          </a>
          <a
            href="#"
            className="nav-link"
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
    <footer className="footer">
      <div className="container footer-inner">
        <a href="#" className="footer-logo" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
          The Quiet Life
        </a>
        <nav className="footer-links">
          <a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>About</a>
          <a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>Contact</a>
          <a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>Privacy</a>
        </nav>
        <p className="footer-copy">© 2024 The Quiet Life. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Main Prototype Component
const Prototype1Minimalist = () => {
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
    <div className="minimalist-wrapper">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      {renderPage()}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export { HomePage, BlogPostPage, CategoryPage };
export default Prototype1Minimalist;
