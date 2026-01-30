import React, { useState } from 'react';

const postData = {
  title: 'The Art of Slow Living in the South of France',
  subtitle: 'In a small village between lavender fields and ancient olive groves, I discovered what it truly means to savor time',
  category: 'Travel',
  date: 'December 15, 2024',
  readTime: '10 min read',
  author: {
    name: 'Isabelle Laurent',
    bio: 'Curator of quiet moments and seeker of beauty in the everyday. Writing from wherever the light is loveliest.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=180&h=180&fit=crop&crop=face',
  },
  heroImage: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1600&h=685&fit=crop',
  content: `
    <p>There is a particular quality to time in Provence that defies explanation. Minutes stretch like honey, afternoons dissolve into evenings without urgency, and the very notion of rushing anywhere feels almost absurd.</p>

    <p>I arrived in late September, when the summer crowds had departed and the locals had reclaimed their villages. The light was golden, heavy with warmth yet gentled by the approaching autumn. In this borrowed time between seasons, I found something I hadn't known I was searching for.</p>

    <h2>The Village That Time Remembered</h2>

    <p>Gordes sits perched on a hillside like a scene from a Renaissance painting. Stone houses cascade down the slope, their shutters painted in faded blues and greens that speak of decades in the Mediterranean sun. There is no grand hotel here, no tourist center—only narrow streets that reveal their secrets slowly.</p>

    <blockquote>
      "The art of living is the art of knowing how to believe lies. The secret to happiness lies in the ability to hold time in your hands like water—knowing it will slip through, savoring it anyway."
    </blockquote>

    <p>My days found their own rhythm without my intervention. Morning coffee on the terrace, watching the valley emerge from mist. A slow walk to the bakery, where the same woman greeted me each day with increasing warmth. Afternoons spent reading in the shade of an olive tree, the silence broken only by cicadas and distant church bells.</p>

    <h2>Lessons in Slowness</h2>

    <p>We speak of "slow living" as though it were a lifestyle choice, a conscious decision to resist the modern pace. But here, among people who have lived this way for generations, I understood it differently. This is not resistance—it is simply how life flows when you stop fighting it.</p>

    <h3>What I Carried Home</h3>

    <ul>
      <li>The courage to leave white space in my calendar</li>
      <li>A recipe for tapenade that tastes like summer</li>
      <li>The knowledge that presence is a practice, not a destination</li>
      <li>A deeper appreciation for the hours between obligations</li>
    </ul>

    <p>As my train pulled away from Avignon, I watched the lavender fields blur past the window and made a quiet promise. Not to return—though I will—but to carry this feeling forward. To remember that time is not something to be managed but to be inhabited. To let some afternoons dissolve without purpose, and to find, in that dissolution, everything.</p>
  `,
};

const comments = [
  {
    id: 1,
    author: 'Charlotte M.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=88&h=88&fit=crop&crop=face',
    date: 'December 16, 2024',
    content: 'This piece touched something deep. I\'ve been planning a trip to Provence, and now I understand I shouldn\'t plan it too precisely at all. Thank you for this reminder.',
  },
  {
    id: 2,
    author: 'Thomas H.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=88&h=88&fit=crop&crop=face',
    date: 'December 16, 2024',
    content: 'The line about time being something to inhabit rather than manage—I\'ve read it three times now. Beautiful writing, as always.',
  },
  {
    id: 3,
    author: 'Elena V.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=88&h=88&fit=crop&crop=face',
    date: 'December 17, 2024',
    content: 'Gordes is magic. Your words captured exactly what I felt there ten years ago. Some places change us without asking permission.',
  },
];

const relatedPosts = [
  {
    id: 2,
    title: 'A Weekend in Vienna',
    category: 'Travel',
    date: 'November 20, 2024',
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Evening Rituals for the Restless Mind',
    category: 'Wellness',
    date: 'December 10, 2024',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'The Case for Quiet Luxury',
    category: 'Life',
    date: 'November 15, 2024',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
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
      <header className="article-header-dark">
        <div className="container">
          <div className="article-meta-dark">
            <span className="featured-category-dark">{postData.category}</span>
            <span className="featured-date-dark">{postData.date} · {postData.readTime}</span>
          </div>
          <h1 className="article-title-dark">{postData.title}</h1>
          <p className="article-subtitle-dark">{postData.subtitle}</p>
        </div>
      </header>

      {/* Hero Image */}
      <div className="article-hero-dark">
        <div className="container">
          <img
            src={postData.heroImage}
            alt={postData.title}
            className="article-hero-image-dark"
          />
        </div>
      </div>

      {/* Article Content */}
      <article className="article-body-dark">
        <div className="container content-narrow">
          <div
            className="article-content-dark"
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />
        </div>
      </article>

      {/* Social Share */}
      <section className="share-section-dark">
        <div className="container content-narrow">
          <div className="share-inner-dark">
            <span className="share-label-dark">Share This Essay</span>
            <div className="share-buttons-dark">
              <button className="share-btn-dark" aria-label="Share on Twitter">
                <TwitterIcon />
              </button>
              <button className="share-btn-dark" aria-label="Share on Facebook">
                <FacebookIcon />
              </button>
              <button className="share-btn-dark" aria-label="Share on LinkedIn">
                <LinkedInIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="author-section-dark">
        <div className="container content-narrow">
          <div className="author-card-dark">
            <img
              src={postData.author.avatar}
              alt={postData.author.name}
              className="author-avatar-dark"
            />
            <div className="author-info-dark">
              <span className="author-label-dark">Written By</span>
              <h4>{postData.author.name}</h4>
              <p className="author-bio-dark">{postData.author.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="comments-section-dark">
        <div className="container content-narrow">
          <div className="comments-header-dark">
            <h3 className="comments-title-dark">Reflections</h3>
            <span className="comments-count-dark">{comments.length} Responses</span>
          </div>

          <form className="comment-form-dark" onSubmit={(e) => e.preventDefault()}>
            <textarea
              className="comment-textarea-dark"
              placeholder="Share your thoughts..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit" className="comment-submit-dark">
              Submit
            </button>
          </form>

          <div className="comments-list-dark">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-dark">
                <div className="comment-header-dark">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="comment-avatar-dark"
                  />
                  <div>
                    <div className="comment-author-dark">{comment.author}</div>
                    <div className="comment-date-dark">{comment.date}</div>
                  </div>
                </div>
                <p className="comment-body-dark">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="related-section-dark">
        <div className="container">
          <div className="related-header-dark">
            <h3 className="related-title-dark">Further Reading</h3>
          </div>
          <div className="posts-grid-dark">
            {relatedPosts.map((post) => (
              <article key={post.id} className="post-card-dark">
                <div className="post-image-wrapper-dark">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="post-image-dark"
                  />
                </div>
                <div className="post-content-dark">
                  <div className="post-meta-dark">
                    <span className="post-category-dark">{post.category}</span>
                    <span className="post-date-dark">{post.date}</span>
                  </div>
                  <h3 className="post-title-dark">
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
