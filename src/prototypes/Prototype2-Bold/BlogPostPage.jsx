import React, { useState } from 'react';

const postData = {
  title: 'Chasing Light in the Streets of Marrakech',
  subtitle: 'The medina swallowed me whole—a maze of copper, spices, and shadows. Here\'s what I found when I stopped trying to find my way out.',
  category: 'Travel',
  date: 'Dec 15, 2024',
  readTime: '8 min read',
  author: {
    name: 'Maya Rodriguez',
    bio: 'Travel photographer & storyteller. Chasing light, collecting moments, and getting lost on purpose since 2015.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
  },
  heroImage: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1600&h=685&fit=crop',
  content: `
    <p>I didn't come to Marrakech to find myself. I came because someone told me the light there would change the way I see color forever. They were right—but not in the way I expected.</p>

    <p>The medina hit me like a wave the moment I stepped through Bab Agnaou. Narrow alleys twisted in impossible directions, vendors called out in Arabic and French and broken English, and everywhere—everywhere—there was color. Saffron yellow, copper orange, the deep blue of Berber indigo.</p>

    <h2>Getting Lost on Purpose</h2>

    <p>For three days, I tried to navigate with maps. Google Maps laughed at me. Paper maps betrayed me. The medina doesn't want to be understood—it wants to be experienced. So on day four, I put my phone away and started walking.</p>

    <blockquote>
      "The best camera is the one you have with you. The best direction is the one you're facing. The best moment is now."
    </blockquote>

    <p>That's when Marrakech opened up. Without the anxiety of finding my way back, I could finally see what was in front of me. A grandmother weaving silk in a doorway. Children playing football in a courtyard the size of my bedroom. Light falling through latticed windows like liquid gold.</p>

    <h2>The Golden Hour Never Ends</h2>

    <p>Photographers talk about golden hour like it's some magical 60-minute window. In Marrakech, every hour is golden. The ochre walls soak up sunlight and throw it back warm and amber. Even at noon, when any other city would be harsh and flat, Marrakech glows.</p>

    <h3>What I Learned</h3>

    <ul>
      <li>Get lost. Seriously. Turn off your phone and just walk.</li>
      <li>Bring a small camera. The medina is tight, and you'll want to be invisible.</li>
      <li>Wake up at 5 AM. The empty streets are surreal.</li>
      <li>Talk to people. Buy tea. Sit down. The best stories aren't on the streets—they're in the homes.</li>
    </ul>

    <p>I left Marrakech with 3,000 photos, a new respect for getting lost, and a completely recalibrated understanding of what "warm tones" actually means. Some cities you visit. Marrakech you experience—whether you're ready for it or not.</p>
  `,
};

const comments = [
  {
    id: 1,
    author: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
    date: 'Dec 16, 2024',
    content: 'This is exactly what I needed to read before my trip next month. Putting the maps away and just going to wander. Thanks for the permission! 🙌',
  },
  {
    id: 2,
    author: 'Sophie Laurent',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face',
    date: 'Dec 16, 2024',
    content: 'The way you describe light is incredible. As a painter, this makes me want to book a flight immediately.',
  },
  {
    id: 3,
    author: 'Marcus Webb',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face',
    date: 'Dec 17, 2024',
    content: 'Been to Marrakech twice and you nailed it. That golden light is real. The medina chaos is real. All of it.',
  },
];

const relatedPosts = [
  {
    id: 2,
    title: '48 Hours in Tokyo\'s Underground',
    category: 'Travel',
    date: 'Nov 20, 2024',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=375&fit=crop',
  },
  {
    id: 3,
    title: 'Why I Quit My Job to Learn Pottery',
    category: 'Life',
    date: 'Dec 10, 2024',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=375&fit=crop',
  },
  {
    id: 4,
    title: 'The Hottest New Restaurant in Brooklyn',
    category: 'Food',
    date: 'Dec 5, 2024',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=375&fit=crop',
  },
];

// Icons
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const BlogPostPage = ({ onNavigate }) => {
  const [commentText, setCommentText] = useState('');

  return (
    <main>
      {/* Article Header */}
      <header className="article-header-bold">
        <div className="container">
          <div className="article-meta-bold">
            <span className="featured-category-bold">{postData.category}</span>
            <span className="featured-date">{postData.date} · {postData.readTime}</span>
          </div>
          <h1 className="article-title-bold">{postData.title}</h1>
          <p className="article-subtitle-bold">{postData.subtitle}</p>
        </div>
      </header>

      {/* Hero Image */}
      <div className="article-hero-bold">
        <img
          src={postData.heroImage}
          alt={postData.title}
          className="article-hero-image-bold"
        />
        <div className="article-hero-overlay"></div>
      </div>

      {/* Article Content */}
      <article className="article-body-bold">
        <div className="container content-narrow">
          <div
            className="article-content-bold"
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />
        </div>
      </article>

      {/* Social Share */}
      <section className="share-section-bold">
        <div className="container content-narrow">
          <div className="share-inner-bold">
            <span className="share-label-bold">Share This Story</span>
            <div className="share-buttons-bold">
              <button className="share-btn-bold" aria-label="Share on Twitter">
                <TwitterIcon />
              </button>
              <button className="share-btn-bold" aria-label="Share on Facebook">
                <FacebookIcon />
              </button>
              <button className="share-btn-bold" aria-label="Share on LinkedIn">
                <LinkedInIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="author-section-bold">
        <div className="container content-narrow">
          <div className="author-card-bold">
            <img
              src={postData.author.avatar}
              alt={postData.author.name}
              className="author-avatar-bold"
            />
            <div className="author-info-bold">
              <span className="author-label">Written By</span>
              <h4>{postData.author.name}</h4>
              <p className="author-bio-bold">{postData.author.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="comments-section-bold">
        <div className="container content-narrow">
          <div className="comments-header-bold">
            <h3 className="comments-title-bold">Discussion</h3>
            <span className="comments-count-bold">{comments.length} Comments</span>
          </div>

          <form className="comment-form-bold" onSubmit={(e) => e.preventDefault()}>
            <textarea
              className="comment-textarea-bold"
              placeholder="Join the conversation..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit" className="comment-submit-bold">
              Post Comment
            </button>
          </form>

          <div className="comments-list-bold">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-bold">
                <div className="comment-header-bold">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="comment-avatar-bold"
                  />
                  <div>
                    <div className="comment-author-bold">{comment.author}</div>
                    <div className="comment-date-bold">{comment.date}</div>
                  </div>
                </div>
                <p className="comment-body-bold">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="related-section-bold">
        <div className="container">
          <div className="related-header-bold">
            <h3 className="related-title-bold">Keep Reading</h3>
          </div>
          <div className="posts-grid-bold">
            {relatedPosts.map((post) => (
              <article key={post.id} className="post-card-bold">
                <div className="post-image-wrapper-bold">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="post-image-bold"
                  />
                </div>
                <div className="post-content-bold">
                  <div className="post-meta-bold">
                    <span className="post-category-bold">{post.category}</span>
                    <span className="post-date-bold">{post.date}</span>
                  </div>
                  <h3 className="post-title-bold">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('post'); }}>
                      {post.title}
                    </a>
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogPostPage;
