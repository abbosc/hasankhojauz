import React, { useState } from 'react';
import './styles.css';
import HomePage from './HomePage';
import BlogPostPage from './BlogPostPage';
import CategoryPage from './CategoryPage';

// Header Component
const Header = ({ currentPage, onNavigate }) => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="header-editorial">
      <div className="container">
        <div className="header-top">
          <span className="header-date">{today}</span>
          <span className="header-tagline">"Stories that matter, beautifully told"</span>
        </div>
        <div className="header-main">
          <a href="#" className="logo-editorial" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
            The <span className="accent">Chronicle</span>
          </a>
        </div>
        <nav className="nav-editorial">
          <a
            href="#"
            className={`nav-link-editorial ${currentPage === 'home' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
          >
            Home
          </a>
          <a
            href="#"
            className={`nav-link-editorial ${currentPage === 'category' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onNavigate('category'); }}
          >
            Travel
          </a>
          <a
            href="#"
            className="nav-link-editorial"
            onClick={(e) => e.preventDefault()}
          >
            Food
          </a>
          <a
            href="#"
            className="nav-link-editorial"
            onClick={(e) => e.preventDefault()}
          >
            Wellness
          </a>
          <a
            href="#"
            className="nav-link-editorial"
            onClick={(e) => e.preventDefault()}
          >
            Life
          </a>
          <a
            href="#"
            className="nav-link-editorial"
            onClick={(e) => e.preventDefault()}
          >
            About
          </a>
        </nav>
      </div>
    </header>
  );
};

// Footer Component
const Footer = ({ onNavigate }) => {
  return (
    <footer className="footer-editorial">
      <div className="container footer-inner-editorial">
        <a href="#" className="footer-logo-editorial" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
          The Chronicle
        </a>
        <nav className="footer-links-editorial">
          <a href="#" className="footer-link-editorial" onClick={(e) => e.preventDefault()}>About</a>
          <a href="#" className="footer-link-editorial" onClick={(e) => e.preventDefault()}>Contact</a>
          <a href="#" className="footer-link-editorial" onClick={(e) => e.preventDefault()}>Subscribe</a>
          <a href="#" className="footer-link-editorial" onClick={(e) => e.preventDefault()}>Privacy</a>
        </nav>
        <p className="footer-copy-editorial">© 2024 The Chronicle. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Main Prototype Component
const Prototype5Editorial = () => {
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
    <div className="editorial-wrapper">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      {renderPage()}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export { HomePage, BlogPostPage, CategoryPage };
export default Prototype5Editorial;
