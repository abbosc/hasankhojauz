import React, { useState } from 'react';
import './styles.css';
import HomePage from './HomePage';
import BlogPostPage from './BlogPostPage';
import CategoryPage from './CategoryPage';

// Header Component
const Header = ({ currentPage, onNavigate }) => {
  return (
    <header className="header-bold">
      <div className="container header-inner-bold">
        <a href="#" className="logo-bold" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
          VIVID
        </a>
        <nav className="nav-bold">
          <a
            href="#"
            className={`nav-link-bold ${currentPage === 'home' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
          >
            Home
          </a>
          <a
            href="#"
            className={`nav-link-bold ${currentPage === 'category' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onNavigate('category'); }}
          >
            Stories
          </a>
          <a
            href="#"
            className="nav-link-bold"
            onClick={(e) => e.preventDefault()}
          >
            About
          </a>
          <a
            href="#"
            className="nav-link-bold"
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
    <footer className="footer-bold">
      <div className="container footer-inner-bold">
        <a href="#" className="footer-logo-bold" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
          VIVID
        </a>
        <nav className="footer-links-bold">
          <a href="#" className="footer-link-bold" onClick={(e) => e.preventDefault()}>About</a>
          <a href="#" className="footer-link-bold" onClick={(e) => e.preventDefault()}>Contact</a>
          <a href="#" className="footer-link-bold" onClick={(e) => e.preventDefault()}>Privacy</a>
        </nav>
        <p className="footer-copy-bold">© 2024 VIVID. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Main Prototype Component
const Prototype2Bold = () => {
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
    <div className="bold-wrapper">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      {renderPage()}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export { HomePage, BlogPostPage, CategoryPage };
export default Prototype2Bold;
