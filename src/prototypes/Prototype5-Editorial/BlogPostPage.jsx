import React, { useState } from 'react';

const postData = {
  title: 'The Last Great American Road Trip',
  subtitle: 'From the Pacific Coast Highway to Route 66, we drove 4,000 miles in search of the landscapes and stories that define a nation in transition',
  category: 'Travel',
  date: 'December 15, 2024',
  author: {
    name: 'Sarah Mitchell',
    bio: 'Travel correspondent covering the American landscape. Author of "Roads Less Traveled" and three-time National Magazine Award finalist.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=face',
  },
  heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&h=685&fit=crop',
  heroCaption: 'Highway 1 near Big Sur, California. Photo by Sarah Mitchell.',
  content: `
    <p>The American road trip is supposed to be dead. Gas prices are up, environmental guilt is real, and why drive when you can fly? But standing on the edge of the Pacific Coast Highway, watching the sun sink into the ocean near Big Sur, I understood why people still do this—why they always will.</p>

    <p>We started in San Francisco on a foggy Tuesday morning, my partner and I, with a rental car, too much luggage, and a rough idea of where we wanted to go. Three weeks later, we'd crossed deserts and mountains, slept in motels that time forgot, eaten at diners where the coffee was burnt but the pie was transcendent. We'd seen America—or at least, a version of it.</p>

    <h2>The Pacific Coast Highway</h2>

    <p>Everyone tells you about Highway 1, but no one can prepare you for the reality of it. The road clings to cliffs that drop hundreds of feet to churning surf below. Around every curve, a new vista: elephant seals lounging on beaches, sea otters floating in kelp forests, the occasional whale spout on the horizon.</p>

    <blockquote>
      "The road is long, but the view is worth every mile. In America, the journey has always been the destination."
    </blockquote>

    <p>We stopped in towns with names like Cambria and Cayucos, places that feel suspended in some gentler era. We ate fish tacos on a pier and watched pelicans dive-bomb for their dinner. The coast taught us to slow down before we'd even started.</p>

    <h2>Desert Crossings</h2>

    <p>From California, we turned inland toward the desert. The landscape transformed dramatically—green gave way to brown, then to red, then to colors that don't have names. In Joshua Tree, we hiked among the twisted trees that give the park its name, their silhouettes like something from a Dr. Seuss fever dream.</p>

    <h3>Route 66: What Remains</h3>

    <p>The Mother Road, as Steinbeck called it, is mostly gone now—replaced by interstate highways that prioritize efficiency over experience. But fragments remain:</p>

    <ul>
      <li>The Wigwam Motel in Holbrook, Arizona, where you sleep in concrete teepees</li>
      <li>The Cadillac Ranch in Amarillo, a field of half-buried cars covered in graffiti</li>
      <li>Countless diners serving breakfast 24 hours a day</li>
      <li>Towns that refuse to be forgotten</li>
    </ul>

    <p>Driving Route 66 today is an exercise in reading between the lines. Every abandoned gas station, every faded sign, tells a story of boom and bust, of American optimism and American abandonment. It's melancholy, but it's also deeply moving.</p>

    <h2>What We Found</h2>

    <p>After 4,000 miles, what did we learn? That America is simultaneously more beautiful and more troubled than the postcards suggest. That the best conversations happen with strangers at gas stations. That the road doesn't care about your plans—flat tires happen, detours appear, and sometimes getting lost is the whole point.</p>

    <p>The road trip isn't dead. It's just waiting for you to turn off the GPS and see where it leads.</p>
  `,
};

const comments = [
  {
    id: 1,
    author: 'Michael R.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=88&h=88&fit=crop&crop=face',
    date: 'December 16, 2024',
    content: 'Drove Route 66 with my father in 1985. Reading this brought back so many memories. The road has changed, but that feeling of possibility—that\'s still there.',
  },
  {
    id: 2,
    author: 'Jennifer L.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=88&h=88&fit=crop&crop=face',
    date: 'December 16, 2024',
    content: 'The Wigwam Motel is exactly as weird and wonderful as it sounds. Highly recommend.',
  },
  {
    id: 3,
    author: 'David K.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=88&h=88&fit=crop&crop=face',
    date: 'December 17, 2024',
    content: 'Beautiful writing. The line about getting lost being the point really hit home. We\'ve become so obsessed with optimization that we\'ve forgotten the value of wandering.',
  },
];

const relatedPosts = [
  {
    id: 2,
    title: 'Winter in Hokkaido',
    category: 'Travel',
    date: 'December 8, 2024',
    author: 'Sarah Mitchell',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=375&fit=crop',
  },
  {
    id: 3,
    title: 'Inside Copenhagen\'s Michelin Underground',
    category: 'Food',
    date: 'December 11, 2024',
    author: 'James Chen',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=375&fit=crop',
  },
  {
    id: 4,
    title: 'Digital Detox: One Month Offline',
    category: 'Wellness',
    date: 'December 10, 2024',
    author: 'Emily Roberts',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&h=375&fit=crop',
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
      <header className="article-header-editorial">
        <div className="container">
          <span className="article-category-editorial">{postData.category}</span>
          <h1 className="article-title-editorial">{postData.title}</h1>
          <p className="article-subtitle-editorial">{postData.subtitle}</p>
          <p className="article-byline">
            By <strong>{postData.author.name}</strong> · {postData.date}
          </p>
        </div>
      </header>

      {/* Hero Image */}
      <div className="article-hero-editorial">
        <div className="container">
          <img
            src={postData.heroImage}
            alt={postData.title}
            className="article-hero-image-editorial"
          />
          <p className="article-hero-caption">{postData.heroCaption}</p>
        </div>
      </div>

      {/* Article Content */}
      <article className="article-body-editorial">
        <div className="container content-narrow">
          <div
            className="article-content-editorial"
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />
        </div>
      </article>

      {/* Social Share */}
      <section className="share-section-editorial">
        <div className="container content-narrow">
          <div className="share-inner-editorial">
            <span className="share-label-editorial">Share Article</span>
            <div className="share-buttons-editorial">
              <button className="share-btn-editorial" aria-label="Share on Twitter">
                <TwitterIcon />
              </button>
              <button className="share-btn-editorial" aria-label="Share on Facebook">
                <FacebookIcon />
              </button>
              <button className="share-btn-editorial" aria-label="Share on LinkedIn">
                <LinkedInIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="author-section-editorial">
        <div className="container content-narrow">
          <div className="author-card-editorial">
            <img
              src={postData.author.avatar}
              alt={postData.author.name}
              className="author-avatar-editorial"
            />
            <div className="author-info-editorial">
              <span className="author-label-editorial">About the Author</span>
              <h4>{postData.author.name}</h4>
              <p className="author-bio-editorial">{postData.author.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="comments-section-editorial">
        <div className="container content-narrow">
          <div className="comments-header-editorial">
            <h3 className="comments-title-editorial">Comments</h3>
            <span className="comments-count-editorial">{comments.length} responses</span>
          </div>

          <form className="comment-form-editorial" onSubmit={(e) => e.preventDefault()}>
            <textarea
              className="comment-textarea-editorial"
              placeholder="Join the discussion..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit" className="comment-submit-editorial">
              Post Comment
            </button>
          </form>

          <div className="comments-list-editorial">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-editorial">
                <div className="comment-header-editorial">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="comment-avatar-editorial"
                  />
                  <div>
                    <div className="comment-author-editorial">{comment.author}</div>
                    <div className="comment-date-editorial">{comment.date}</div>
                  </div>
                </div>
                <p className="comment-body-editorial">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="related-section-editorial">
        <div className="container">
          <div className="section-header-editorial">
            <h2 className="section-title-editorial">More Stories</h2>
            <div className="section-line"></div>
          </div>
          <div className="related-grid">
            {relatedPosts.map((post) => (
              <article key={post.id} className="post-card-editorial">
                <div className="post-image-wrapper-editorial">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="post-image-editorial"
                  />
                </div>
                <div className="post-content-editorial">
                  <span className="post-category-editorial">{post.category}</span>
                  <h3 className="post-title-editorial">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('post'); }}>
                      {post.title}
                    </a>
                  </h3>
                  <p className="post-meta-editorial">By {post.author} · {post.date}</p>
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
