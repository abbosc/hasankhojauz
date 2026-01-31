import { useRouteError, Link, useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  const is404 = error?.status === 404;
  const errorCode = error?.status || '500';
  const errorMessage = is404
    ? "Sahifa topilmadi"
    : "Kutilmagan xatolik yuz berdi";

  return (
    <div className="error-page">
      <div className="error-content">
        <span className="error-code">{errorCode}</span>
        <h1 className="error-title">{errorMessage}</h1>
        <p className="error-description">
          {is404
            ? "Siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan bo'lishi mumkin."
            : "Nimadir xato ketdi. Iltimos, keyinroq qayta urinib ko'ring."}
        </p>
        <div className="error-actions">
          <button onClick={() => navigate(-1)} className="error-btn error-btn-secondary">
            Orqaga qaytish
          </button>
          <Link to="/" className="error-btn error-btn-primary">
            Bosh sahifa
          </Link>
        </div>
      </div>
      <div className="error-decoration">
        <svg viewBox="0 0 200 200" className="error-illustration">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.1" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.15" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" />
          <text x="100" y="115" textAnchor="middle" fontSize="48" fontFamily="var(--font-display)" fill="currentColor" opacity="0.1">
            {errorCode}
          </text>
        </svg>
      </div>
    </div>
  );
}
