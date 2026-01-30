import React, { useState } from 'react';

// Sample post data
const postData = {
  title: 'Finding Stillness in the Mountains of Northern Italy',
  subtitle: 'A week in the Dolomites that changed how I think about travel',
  category: 'Travel',
  date: 'December 15, 2024',
  readTime: '8 min read',
  author: {
    name: 'Elena Crawford',
    bio: 'Writer, wanderer, and perpetual seeker of quiet corners. I write about slow travel, intentional living, and the art of finding beauty in the ordinary.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=face',
  },
  heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop',
  content: `
    <p>There's a particular kind of silence you find in the mountains. Not the absence of sound—there's always wind threading through pine needles, distant cowbells, the occasional call of a bird—but a quality of quietness that seems to expand the space around you.</p>

    <p>I arrived in the Dolomites in late October, that liminal time between autumn's blaze and winter's first whispers. The summer crowds had long departed, and the ski season hadn't yet begun. I had the trails largely to myself.</p>

    <h2>Learning to Stay</h2>

    <p>My original plan was ambitious: five different rifugios in seven days, a grand loop through the peaks. But on the second morning, standing on the terrace of Rifugio Lagazuoi as the sun painted the Cinque Torri in shades of amber and rose, I made a different choice. I stayed.</p>

    <blockquote>
      "The real voyage of discovery consists not in seeking new landscapes, but in having new eyes." — Marcel Proust
    </blockquote>

    <p>I spent three days at that single rifugio. Each morning, I walked the same paths. Each afternoon, I sat in the same chair with the same view. And each day, I saw something different—noticed something I'd missed before.</p>

    <h2>The Gift of Repetition</h2>

    <p>We're conditioned to seek novelty in travel. New cities, new experiences, new photographs for our collections. But there's a profound intimacy that comes from returning to the same place again and again.</p>

    <p>By the third morning, I knew which rocks to avoid on the path, where the chamois liked to graze at dawn, how the light changed through the valley as the hours passed. The landscape stopped being scenery and became something closer to a companion.</p>

    <h3>What I Brought Home</h3>

    <p>I returned with fewer photographs than usual but a fullness I hadn't expected. Some lessons from that week:</p>

    <ul>
      <li>Slowness isn't laziness—it's a different kind of attention</li>
      <li>Repetition reveals what novelty conceals</li>
      <li>Sometimes the most adventurous thing you can do is stay put</li>
      <li>Silence, like any language, takes time to understand</li>
    </ul>

    <p>The Dolomites will always be there, those ancient coral reefs turned to stone. And I suspect I'll return, not to cover new ground, but to sit again with what I've already found—to see it, once more, with new eyes.</p>
  `,
};

const comments = [
  {
    id: 1,
    author: 'Sarah Mitchell',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    date: 'December 16, 2024',
    content: 'This resonates so deeply. I\'ve been guilty of trying to "maximize" every trip, and it always leaves me exhausted rather than renewed. Thank you for this reminder.',
  },
  {
    id: 2,
    author: 'James Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    date: 'December 16, 2024',
    content: 'The Proust quote is perfect here. I spent two weeks in Kyoto once, visiting the same temple every morning. By the end, it felt like a friend.',
  },
  {
    id: 3,
    author: 'Maria Santos',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&h=80&fit=crop&crop=face',
    date: 'December 17, 2024',
    content: 'Beautiful writing, Elena. The Dolomites in autumn must be magical. Adding Rifugio Lagazuoi to my list—not for a tour, but for a proper stay.',
  },
];

const relatedPosts = [
  {
    id: 2,
    title: 'A Weekend in Lisbon',
    category: 'Travel',
    date: 'November 20, 2024',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'The Art of Slow Mornings',
    category: 'Wellness',
    date: 'December 10, 2024',
    image: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Learning to Rest Without Guilt',
    category: 'Wellness',
    date: 'November 28, 2024',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
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
      <header className="article-header">
        <div className="container content-narrow">
          <div className="article-meta">
            <span className="article-category">{postData.category}</span>
            <span>·</span>
            <span>{postData.date}</span>
            <span>·</span>
            <span>{postData.readTime}</span>
          </div>
          <h1 className="article-title">{postData.title}</h1>
          <p className="article-subtitle">{postData.subtitle}</p>
        </div>
      </header>

      {/* Hero Image */}
      <div className="article-hero">
        <div className="container">
          <img
            src={postData.heroImage}
            alt={postData.title}
            className="article-hero-image"
          />
        </div>
      </div>

      {/* Article Content */}
      <article className="article-body">
        <div className="container content-narrow">
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />
        </div>
      </article>

      {/* Social Share */}
      <section className="share-section">
        <div className="container content-narrow">
          <div className="share-inner">
            <span className="share-label">Share this story</span>
            <div className="share-buttons">
              <button className="share-btn" aria-label="Share on Twitter">
                <TwitterIcon />
              </button>
              <button className="share-btn" aria-label="Share on Facebook">
                <FacebookIcon />
              </button>
              <button className="share-btn" aria-label="Share on LinkedIn">
                <LinkedInIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="author-section">
        <div className="container content-narrow">
          <div className="author-card">
            <img
              src={postData.author.avatar}
              alt={postData.author.name}
              className="author-avatar"
            />
            <div className="author-info">
              <h4>{postData.author.name}</h4>
              <p className="author-bio">{postData.author.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="comments-section">
        <div className="container content-narrow">
          <div className="comments-header">
            <h3 className="comments-title">Comments</h3>
            <span className="comments-count">{comments.length} responses</span>
          </div>

          {/* Comment Form */}
          <form className="comment-form" onSubmit={(e) => e.preventDefault()}>
            <textarea
              className="comment-textarea"
              placeholder="Share your thoughts..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit" className="comment-submit">
              Post Comment
            </button>
          </form>

          {/* Comments List */}
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="comment-avatar"
                  />
                  <div>
                    <div className="comment-author">{comment.author}</div>
                    <div className="comment-date">{comment.date}</div>
                  </div>
                </div>
                <p className="comment-body">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="related-section">
        <div className="container">
          <h3 className="related-title">You might also enjoy</h3>
          <div className="related-grid">
            {relatedPosts.map((post) => (
              <article key={post.id} className="post-card">
                <div className="post-image-wrapper">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="post-image"
                  />
                </div>
                <div className="post-content">
                  <div className="post-meta">
                    <span className="post-category">{post.category}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="post-title">
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
