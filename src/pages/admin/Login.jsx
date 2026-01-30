import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect to posts
  if (isAuthenticated) {
    navigate('/admin/posts', { replace: true });
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (login(password)) {
      navigate('/admin/posts');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <h1>Hasanxo'ja</h1>
          <p>Admin Panel</p>
        </div>
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="password">Parol</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin parolini kiriting"
              autoFocus
            />
          </div>
          {error && <p className="form-error">Noto'g'ri parol</p>}
          <button type="submit" className="admin-login-button">
            Kirish
          </button>
        </form>
      </div>
    </div>
  );
}
