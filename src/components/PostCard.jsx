import { Link } from 'react-router-dom';

export default function PostCard({ post, size = 'normal' }) {
  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('uz-UZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date(post.created_at).toLocaleDateString('uz-UZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  return (
    <article className={`post-card-editorial ${size}`}>
      {post.thumbnail && size !== 'small' && (
        <div className="post-image-wrapper-editorial">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="post-image-editorial"
          />
        </div>
      )}
      <div className="post-content-editorial">
        {post.category && (
          <Link to={`/category/${post.category.slug}`} className="post-category-editorial">
            {post.category.name}
          </Link>
        )}
        <h3 className="post-title-editorial">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        {post.excerpt && size !== 'small' && (
          <p className="post-excerpt-editorial">{post.excerpt}</p>
        )}
        <p className="post-meta-editorial">{formattedDate}</p>
      </div>
    </article>
  );
}
