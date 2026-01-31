import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePosts, useCategories, deletePost, bulkDeletePosts, bulkUpdatePosts } from '../../hooks/usePosts.jsx';

export default function PostsList() {
  const [filter, setFilter] = useState('all');
  const { posts, loading, error, refetch } = usePosts({ published: null });
  const { categories } = useCategories();
  const navigate = useNavigate();

  const [selectedIds, setSelectedIds] = useState(new Set());
  const [bulkCategoryOpen, setBulkCategoryOpen] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);

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

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(filteredPosts.map(p => p.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.size} post(s)?`)) return;

    setBulkLoading(true);
    try {
      await bulkDeletePosts(Array.from(selectedIds));
      setSelectedIds(new Set());
      refetch();
    } catch (err) {
      alert('Failed to delete posts: ' + err.message);
    } finally {
      setBulkLoading(false);
    }
  };

  const handleBulkPublish = async (publish) => {
    if (selectedIds.size === 0) return;

    setBulkLoading(true);
    try {
      const updates = { published: publish };
      if (publish) {
        updates.published_at = new Date().toISOString();
      }
      await bulkUpdatePosts(Array.from(selectedIds), updates);
      setSelectedIds(new Set());
      refetch();
    } catch (err) {
      alert('Failed to update posts: ' + err.message);
    } finally {
      setBulkLoading(false);
    }
  };

  const handleBulkCategoryChange = async (categoryId) => {
    if (selectedIds.size === 0) return;

    setBulkLoading(true);
    try {
      await bulkUpdatePosts(Array.from(selectedIds), { category_id: categoryId || null });
      setSelectedIds(new Set());
      setBulkCategoryOpen(false);
      refetch();
    } catch (err) {
      alert('Failed to update posts: ' + err.message);
    } finally {
      setBulkLoading(false);
    }
  };

  const isAllSelected = filteredPosts.length > 0 && filteredPosts.every(p => selectedIds.has(p.id));
  const isSomeSelected = selectedIds.size > 0;

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
                <th className="checkbox-cell">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="post-checkbox"
                  />
                </th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id} className={selectedIds.has(post.id) ? 'row-selected' : ''}>
                  <td className="checkbox-cell">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(post.id)}
                      onChange={() => handleSelectOne(post.id)}
                      className="post-checkbox"
                    />
                  </td>
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

      {isSomeSelected && (
        <div className="bulk-toolbar">
          <span className="bulk-count">{selectedIds.size} selected</span>
          <div className="bulk-actions">
            <div className="bulk-category-wrapper">
              <button
                className="bulk-action-btn"
                onClick={() => setBulkCategoryOpen(!bulkCategoryOpen)}
                disabled={bulkLoading}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
                Category
              </button>
              {bulkCategoryOpen && (
                <div className="bulk-category-dropdown">
                  <button onClick={() => handleBulkCategoryChange(null)}>
                    No Category
                  </button>
                  {categories.map(cat => (
                    <button key={cat.id} onClick={() => handleBulkCategoryChange(cat.id)}>
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              className="bulk-action-btn"
              onClick={() => handleBulkPublish(true)}
              disabled={bulkLoading}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20,6 9,17 4,12" />
              </svg>
              Publish
            </button>
            <button
              className="bulk-action-btn"
              onClick={() => handleBulkPublish(false)}
              disabled={bulkLoading}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              </svg>
              Unpublish
            </button>
            <button
              className="bulk-action-btn delete"
              onClick={handleBulkDelete}
              disabled={bulkLoading}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3,6 5,6 21,6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
