import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCategories } from '../hooks/usePosts.jsx';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { categories } = useCategories();

  const today = new Date().toLocaleDateString('uz-UZ', {
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
          <span className="header-tagline">"Fikrlar, tajribalar va ilhom"</span>
        </div>
        <div className="header-main">
          <Link to="/" className="logo-editorial">
            Hasanxo'ja <span className="accent">MuhammadSodiq</span>
          </Link>
        </div>
        <nav className={`nav-editorial ${mobileMenuOpen ? 'open' : ''}`}>
          <NavLink to="/" className={({ isActive }) => `nav-link-editorial ${isActive ? 'active' : ''}`}>
            Bosh sahifa
          </NavLink>
          {categories.slice(0, 4).map((category) => (
            <NavLink
              key={category.id}
              to={`/category/${category.slug}`}
              className={({ isActive }) => `nav-link-editorial ${isActive ? 'active' : ''}`}
            >
              {category.name}
            </NavLink>
          ))}
          <NavLink to="/about" className={({ isActive }) => `nav-link-editorial ${isActive ? 'active' : ''}`}>
            Men haqimda
          </NavLink>
        </nav>
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>Bosh sahifa</NavLink>
          {categories.map((category) => (
            <NavLink
              key={category.id}
              to={`/category/${category.slug}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {category.name}
            </NavLink>
          ))}
          <NavLink to="/about" onClick={() => setMobileMenuOpen(false)}>Men haqimda</NavLink>
        </div>
      )}
    </header>
  );
}
