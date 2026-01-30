import { Link } from 'react-router-dom';
import { useSiteSettings } from '../hooks/useSiteSettings';

export default function AboutPage() {
  const { data: about, loading } = useSiteSettings('about_page');

  if (loading) {
    return (
      <main>
        <div className="container">
          <div className="loading-state">Yuklanmoqda...</div>
        </div>
      </main>
    );
  }

  // Default values if no data
  const name = about?.name || "Hasanxo'ja MuhammadSodiq";
  const subtitle = about?.subtitle || "Shaxsiy blog va fikrlar maydoni";
  const bio = about?.bio || "Assalomu alaykum! Bu shaxsiy blogimga xush kelibsiz.";
  const photo = about?.photo || '';
  const email = about?.email || '';
  const telegram = about?.telegram || '';
  const instagram = about?.instagram || '';
  const linkedin = about?.linkedin || '';

  return (
    <main>
      {/* About Header */}
      <header className="category-header-editorial">
        <div className="container">
          <h1 className="category-page-title-editorial">Men haqimda</h1>
          <p className="category-description-editorial">{subtitle}</p>
        </div>
      </header>

      {/* About Content */}
      <section className="article-body-editorial">
        <div className="container content-narrow">
          <div className="article-content-editorial about-content">
            {/* Photo and Name */}
            <div className="about-intro">
              {photo && (
                <div className="about-photo">
                  <img src={photo} alt={name} />
                </div>
              )}
              <div className="about-name-section">
                <h2>{name}</h2>
                <p className="about-subtitle">{subtitle}</p>
              </div>
            </div>

            {/* Bio */}
            <div className="about-bio">
              {bio.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Contact */}
            {email && (
              <>
                <h2>Aloqa</h2>
                <p>
                  <a href={`mailto:${email}`}>{email}</a>
                </p>
              </>
            )}

            {/* Social Links */}
            {(telegram || instagram || linkedin) && (
              <>
                <h2>Ijtimoiy tarmoqlar</h2>
                <div className="about-social">
                  {telegram && (
                    <a href={telegram} target="_blank" rel="noopener noreferrer">
                      Telegram
                    </a>
                  )}
                  {instagram && (
                    <a href={instagram} target="_blank" rel="noopener noreferrer">
                      Instagram
                    </a>
                  )}
                  {linkedin && (
                    <a href={linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container content-narrow">
          <div className="about-cta-content">
            <h3>Maqolalarni o'qing</h3>
            <p>Eng so'nggi maqolalar va fikrlar bilan tanishing.</p>
            <Link to="/" className="about-cta-button">Barcha maqolalar</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
