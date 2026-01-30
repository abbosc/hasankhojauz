import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <main>
      {/* About Header */}
      <header className="category-header-editorial">
        <div className="container">
          <h1 className="category-page-title-editorial">Men haqimda</h1>
          <p className="category-description-editorial">
            Hasanxo'ja MuhammadSodiq - shaxsiy blog va fikrlar maydoni
          </p>
        </div>
      </header>

      {/* About Content */}
      <section className="article-body-editorial">
        <div className="container content-narrow">
          <div className="article-content-editorial about-content">
            <p>
              Assalomu alaykum! Men <strong>Hasanxo'ja MuhammadSodiq</strong>man.
              Bu shaxsiy blogimga xush kelibsiz. Bu yerda men o'z fikrlarim,
              tajribalarim va qiziqarli mavzular haqida yozaman.
            </p>

            <h2>Blog haqida</h2>
            <p>
              Bu blog mening shaxsiy maydonim bo'lib, u yerda turli mavzularda
              o'z fikrlarimni baham ko'raman. Maqsadim - foydali ma'lumotlar ulashish,
              ilhomlantirish va o'quvchilar bilan aloqa o'rnatish.
            </p>

            <h2>Qiziqishlarim</h2>
            <p>
              Men turli sohalarga qiziqaman va bu blogda quyidagi mavzular haqida yozaman:
            </p>
            <ul>
              <li><strong>Texnologiya</strong> &mdash; Yangi texnologiyalar va dasturlash haqida</li>
              <li><strong>Hayot</strong> &mdash; Kundalik hayot, tajribalar va fikrlar</li>
              <li><strong>Ta'lim</strong> &mdash; O'rganish va o'z ustida ishlash haqida</li>
              <li><strong>Sayohat</strong> &mdash; Yangi joylar va madaniyatlar kashfiyoti</li>
            </ul>

            <h2>Aloqa</h2>
            <p>
              Men bilan bog'lanishni xohlasangiz, quyidagi manzilga yozing:
            </p>
            <p>
              <a href="mailto:hasankhoja@example.com">hasankhoja@example.com</a>
            </p>

            <h2>Ijtimoiy tarmoqlar</h2>
            <p>
              Meni ijtimoiy tarmoqlarda ham kuzatib boring:
            </p>
            <div className="about-social">
              <a href="https://t.me/hasankhoja" target="_blank" rel="noopener noreferrer">Telegram</a>
              <a href="https://instagram.com/hasankhoja" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://linkedin.com/in/hasankhoja" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
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
