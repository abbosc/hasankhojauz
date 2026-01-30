import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePosts, deletePost } from '../../hooks/usePosts.jsx';

export default function PostsList() {
  const [filter, setFilter] = useState('all');
  const { posts, loading, error, refetch } = usePosts({ published: null });
  const navigate = useNavigate();

  const filteredPosts = posts.filter((post) => {
    if (filter === 'all') return true;
    if (filter === 'published') return post.published;
    if (filter === 'draft') return !post.published;
    return true;
  });

  const handleDelete = async (post) => {
    if (window.confirm(`Are you sure you want to delete "${post.title}"?`)) {
      try {
        await deletePost(post.id);
        refetch();
      } catch (err) {
        alert('Failed to delete post: ' + err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-page-header">
          <h1>Posts</h1>
        </div>
        <div className="admin-loading">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <div className="admin-page-header">
          <h1>Posts</h1>
        </div>
        <div className="admin-error">Error loading posts: {error}</div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Posts</h1>
        <Link to="/admin/posts/new" className="admin-button primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Post
        </Link>
      </div>

      <div className="admin-filters">
        <button
          className={`admin-filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({posts.length})
        </button>
        <button
          className={`admin-filter-btn ${filter === 'published' ? 'active' : ''}`}
          onClick={() => setFilter('published')}
        >
          Published ({posts.filter((p) => p.published).length})
        </button>
        <button
          className={`admin-filter-btn ${filter === 'draft' ? 'active' : ''}`}
          onClick={() => setFilter('draft')}
        >
          Drafts ({posts.filter((p) => !p.published).length})
        </button>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id}>
                  <td className="post-title-cell">
                    <Link to={`/admin/posts/${post.id}`}>{post.title}</Link>
                    {post.thumbnail && (
                      <img
                        src={post.thumbnail}
                        alt=""
                        className="post-thumbnail-preview"
                      />
                    )}
                  </td>
                  <td>{post.category?.name || '—'}</td>
                  <td>
                    <span className={`status-badge ${post.published ? 'published' : 'draft'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="actions-cell">
                    <button
                      onClick={() => navigate(`/admin/posts/${post.id}`)}
                      className="admin-action-btn edit"
                      title="Edit"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    {post.published && (
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-action-btn view"
                        title="View"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15,3 21,3 21,9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}
                    <button
                      onClick={() => handleDelete(post)}
                      className="admin-action-btn delete"
                      title="Delete"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3,6 5,6 21,6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="admin-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14,2 14,8 20,8" />
          </svg>
          <h3>No posts found</h3>
          <p>Get started by creating your first post.</p>
          <Link to="/admin/posts/new" className="admin-button primary">
            Create Post
          </Link>
        </div>
      )}
    </div>
  );
}
