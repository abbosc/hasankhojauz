import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer-editorial">
      <div className="container footer-inner-editorial">
        <Link to="/" className="footer-logo-editorial">
          Hasanxo'ja MuhammadSodiq
        </Link>
        <nav className="footer-links-editorial">
          <Link to="/about" className="footer-link-editorial">Men haqimda</Link>
          <a href="mailto:hasankhoja@example.com" className="footer-link-editorial">Aloqa</a>
        </nav>
        <p className="footer-copy-editorial">
          &copy; {new Date().getFullYear()} Hasanxo'ja MuhammadSodiq. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </footer>
  );
}
