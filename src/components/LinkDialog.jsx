import { useState, useEffect, useRef } from 'react';

export default function LinkDialog({ isOpen, onClose, onSubmit, initialUrl = '' }) {
  const [url, setUrl] = useState(initialUrl);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setUrl(initialUrl);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    }
  }, [isOpen, initialUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(url);
    onClose();
  };

  const handleRemove = () => {
    onSubmit('');
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="link-dialog-overlay" onClick={onClose}>
      <div className="link-dialog" onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
        <div className="link-dialog-header">
          <h3>Add Link</h3>
          <button type="button" className="link-dialog-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="link-dialog-body">
            <label htmlFor="link-url">URL</label>
            <input
              ref={inputRef}
              type="url"
              id="link-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
            {url && (
              <div className="link-preview">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <span>{url}</span>
              </div>
            )}
          </div>
          <div className="link-dialog-footer">
            {initialUrl && (
              <button type="button" className="link-dialog-btn remove" onClick={handleRemove}>
                Remove Link
              </button>
            )}
            <div className="link-dialog-footer-right">
              <button type="button" className="link-dialog-btn cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="link-dialog-btn confirm">
                {initialUrl ? 'Update' : 'Add'} Link
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
