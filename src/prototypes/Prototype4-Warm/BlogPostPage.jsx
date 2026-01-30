import React, { useState } from 'react';

const postData = {
  title: 'A Cozy Weekend Guide to Autumn Baking',
  subtitle: 'There\'s something magical about filling your home with the scent of cinnamon and fresh bread on a crisp fall morning.',
  category: 'Food',
  date: 'December 15, 2024',
  readTime: '7 min read',
  author: {
    name: 'Emma Hartley',
    bio: 'Home baker, tea enthusiast, and firm believer that cookies solve most problems. Sharing recipes that feel like a warm hug.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&fit=crop&crop=face',
  },
  heroImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&h=900&fit=crop',
  content: `
    <p>Autumn has always been my favorite season to bake. There's something about the cooling air and golden light that makes me want to fill every corner of my kitchen with warmth and sweetness.</p>

    <p>This past weekend, I spent two glorious days experimenting with some new recipes and revisiting old favorites. The result? A kitchen that smelled like heaven and a very happy family.</p>

    <h2>The Magic of Slow Baking</h2>

    <p>In our rush-everything world, baking forces us to slow down. You can't hurry bread—it rises when it's ready. You can't rush caramelization—it happens in its own sweet time. And honestly? That's the whole point.</p>

    <blockquote>
      Baking is love made visible. Every loaf of bread, every batch of cookies, is a small act of care—for yourself, for the people you feed, for the simple joy of creating something delicious.
    </blockquote>

    <p>I've learned to see waiting time as meditation time. While the dough proofs, I make tea. While the cookies bake, I read. The kitchen becomes less of a workspace and more of a sanctuary.</p>

    <h2>My Favorite Fall Recipes</h2>

    <p>Here are the recipes that made this weekend so special:</p>

    <h3>Apple Cinnamon Bread</h3>

    <ul>
      <li>Uses seasonal apples from the farmer's market</li>
      <li>A swirl of brown sugar and cinnamon throughout</li>
      <li>Perfect with butter and a cup of tea</li>
      <li>Makes the whole house smell incredible</li>
    </ul>

    <p>The secret is in the apple preparation—I dice them small and toss them with lemon juice and a pinch of cardamom before folding them into the batter. It prevents browning and adds an unexpected warmth.</p>

    <h3>Maple Pecan Scones</h3>

    <p>These are best eaten warm, split open and slathered with salted butter. The maple glaze is optional but highly recommended. I like to make the dough the night before and bake them fresh in the morning—there's no better way to start a Saturday.</p>

    <p>Whatever you choose to bake this season, I hope it brings you as much joy as it brings me. Happy baking, friends.</p>
  `,
};

const comments = [
  {
    id: 1,
    author: 'Sarah M.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=88&h=88&fit=crop&crop=face',
    date: 'December 16, 2024',
    content: 'Made the apple bread this morning and my kitchen smells AMAZING! The cardamom tip was genius. Thank you for sharing! 🍎',
  },
  {
    id: 2,
    author: 'Michael T.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=88&h=88&fit=crop&crop=face',
    date: 'December 16, 2024',
    content: 'The part about baking forcing us to slow down really resonated with me. I\'ve started seeing my weekend baking as self-care time.',
  },
  {
    id: 3,
    author: 'Lily Chen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=88&h=88&fit=crop&crop=face',
    date: 'December 17, 2024',
    content: 'Would love to see the full recipe for those maple pecan scones! They sound dreamy.',
  },
];

const relatedPosts = [
  {
    id: 2,
    title: 'Plant-Based Comfort Food for Cold Days',
    category: 'Food',
    date: 'November 20, 2024',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=450&fit=crop',
  },
  {
    id: 3,
    title: 'Creating Your Perfect Morning Routine',
    category: 'Wellness',
    date: 'December 10, 2024',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=450&fit=crop',
  },
  {
    id: 4,
    title: 'The Joy of Handwritten Letters',
    category: 'Life',
    date: 'November 28, 2024',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=450&fit=crop',
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

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L13.09 8.26L19 7L14.74 11.27L21 12L14.74 12.73L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 12.73L3 12L9.26 11.27L5 7L10.91 8.26L12 2Z" />
  </svg>
);

const BlogPostPage = ({ onNavigate }) => {
  const [commentText, setCommentText] = useState('');

  return (
    <main>
      {/* Article Header */}
      <header className="article-header-warm">
        <div className="container">
          <div className="article-meta-warm">
            <span className="featured-category-warm">{postData.category}</span>
            <span className="featured-date-warm">{postData.date} · {postData.readTime}</span>
          </div>
          <h1 className="article-title-warm">{postData.title}</h1>
          <p className="article-subtitle-warm">{postData.subtitle}</p>
        </div>
      </header>

      {/* Hero Image */}
      <div className="container">
        <div className="article-hero-warm">
          <img
            src={postData.heroImage}
            alt={postData.title}
            className="article-hero-image-warm"
          />
        </div>
      </div>

      {/* Article Content */}
      <article className="article-body-warm">
        <div className="container content-narrow">
          <div
            className="article-content-warm"
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />
        </div>
      </article>

      {/* Social Share */}
      <section className="share-section-warm">
        <div className="container content-narrow">
          <div className="share-inner-warm">
            <span className="share-label-warm">Enjoyed this? Share the love!</span>
            <div className="share-buttons-warm">
              <button className="share-btn-warm" aria-label="Share on Twitter">
                <TwitterIcon />
              </button>
              <button className="share-btn-warm" aria-label="Share on Facebook">
                <FacebookIcon />
              </button>
              <button className="share-btn-warm" aria-label="Share on LinkedIn">
                <LinkedInIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="author-section-warm">
        <div className="container content-narrow">
          <div className="author-card-warm">
            <img
              src={postData.author.avatar}
              alt={postData.author.name}
              className="author-avatar-warm"
            />
            <div className="author-info-warm">
              <span className="author-label-warm">Written by</span>
              <h4>{postData.author.name}</h4>
              <p className="author-bio-warm">{postData.author.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="comments-section-warm">
        <div className="container content-narrow">
          <div className="comments-header-warm">
            <h3 className="comments-title-warm">
              <ChatIcon />
              Join the Conversation
            </h3>
            <span className="comments-count-warm">{comments.length} comments</span>
          </div>

          <form className="comment-form-warm" onSubmit={(e) => e.preventDefault()}>
            <textarea
              className="comment-textarea-warm"
              placeholder="Share your thoughts, tips, or just say hello..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit" className="comment-submit-warm">
              Post Comment
            </button>
          </form>

          <div className="comments-list-warm">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-warm">
                <div className="comment-header-warm">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="comment-avatar-warm"
                  />
                  <div>
                    <div className="comment-author-warm">{comment.author}</div>
                    <div className="comment-date-warm">{comment.date}</div>
                  </div>
                </div>
                <p className="comment-body-warm">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="related-section-warm">
        <div className="container">
          <div className="related-header-warm">
            <h3 className="related-title-warm">
              <SparkleIcon />
              You Might Also Love
            </h3>
          </div>
          <div className="posts-grid-warm">
            {relatedPosts.map((post) => (
              <article key={post.id} className="post-card-warm">
                <div className="post-image-wrapper-warm">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="post-image-warm"
                  />
                </div>
                <div className="post-content-warm">
                  <div className="post-meta-warm">
                    <span className="post-category-warm">{post.category}</span>
                    <span className="post-date-warm">{post.date}</span>
                  </div>
                  <h3 className="post-title-warm">
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
