import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePostById, useCategories, createPost, updatePost, checkSlugAvailable } from '../../hooks/usePosts.jsx';
import RichTextEditor from '../../components/RichTextEditor';
import ImageUploader from '../../components/ImageUploader';
import CategorySelector from '../../components/CategorySelector';

export default function PostEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const { post: existingPost, loading: postLoading } = usePostById(isNew ? null : id);
  const { categories, loading: categoriesLoading } = useCategories();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: null,
    thumbnail: '',
    category_id: '',
    published: false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [slugError, setSlugError] = useState(null);
  const [checkingSlug, setCheckingSlug] = useState(false);

  useEffect(() => {
    if (existingPost) {
      setFormData({
        title: existingPost.title || '',
        slug: existingPost.slug || '',
        excerpt: existingPost.excerpt || '',
        content: existingPost.content || null,
        thumbnail: existingPost.thumbnail || '',
        category_id: existingPost.category_id || '',
        published: existingPost.published || false,
      });
    }
  }, [existingPost]);

  // Debounced slug validation
  useEffect(() => {
    if (!formData.slug) {
      setSlugError(null);
      return;
    }
    const timer = setTimeout(async () => {
      setCheckingSlug(true);
      try {
        const available = await checkSlugAvailable(formData.slug, isNew ? null : id);
        setSlugError(available ? null : 'This slug is already in use');
      } catch (err) {
        setSlugError(null);
      }
      setCheckingSlug(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [formData.slug, id, isNew]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: isNew ? generateSlug(title) : prev.slug,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  const handleThumbnailChange = (url) => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: url,
    }));
  };

  const handleSave = async (publish = false) => {
    setError(null);
    setSaving(true);

    try {
      const postData = {
        ...formData,
        published: publish ? true : formData.published,
        published_at: publish ? new Date().toISOString() : existingPost?.published_at,
      };

      if (isNew) {
        const newPost = await createPost(postData);
        if (publish) {
          navigate('/admin/posts');
        } else {
          navigate(`/admin/posts/${newPost.id}`);
        }
      } else {
        await updatePost(id, postData);
        if (publish && !existingPost?.published) {
          navigate('/admin/posts');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (postLoading || categoriesLoading) {
    return (
      <div className="admin-page">
        <div className="admin-loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="admin-page editor-page">
      <div className="admin-page-header">
        <h1>{isNew ? 'New Post' : 'Edit Post'}</h1>
        <div className="editor-actions">
          <button
            onClick={() => handleSave(false)}
            className="admin-button secondary"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            onClick={() => handleSave(true)}
            className="admin-button primary"
            disabled={saving || slugError}
          >
            {saving ? 'Publishing...' : formData.published ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      {error && <div className="admin-error">{error}</div>}

      <div className="editor-layout">
        <div className="editor-main">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Enter post title"
              className="editor-title-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="slug">Slug</label>
            <div className="slug-input-wrapper">
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="post-url-slug"
                className={slugError ? 'input-error' : ''}
              />
              {checkingSlug && <span className="slug-checking">Checking...</span>}
            </div>
            {slugError && <p className="slug-error">{slugError}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Excerpt</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Brief description of the post"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Content</label>
            <RichTextEditor
              content={formData.content}
              onChange={handleContentChange}
              placeholder="Start writing your post..."
            />
          </div>
        </div>

        <div className="editor-sidebar">
          <div className="editor-sidebar-section">
            <h3>Status</h3>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
              />
              <span>Published</span>
            </label>
            {existingPost?.published_at && (
              <p className="editor-meta">
                Published: {new Date(existingPost.published_at).toLocaleDateString()}
              </p>
            )}
          </div>

          <div className="editor-sidebar-section">
            <h3>Category</h3>
            <CategorySelector
              categories={categories}
              value={formData.category_id}
              onChange={(categoryId) =>
                setFormData((prev) => ({ ...prev, category_id: categoryId }))
              }
            />
          </div>

          <div className="editor-sidebar-section">
            <h3>Featured Image</h3>
            <ImageUploader
              currentImage={formData.thumbnail}
              onUpload={handleThumbnailChange}
            />
          </div>

          {!isNew && existingPost?.published && (
            <div className="editor-sidebar-section">
              <h3>Preview</h3>
              <a
                href={`/blog/${formData.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="admin-button secondary full-width"
              >
                View Post
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
