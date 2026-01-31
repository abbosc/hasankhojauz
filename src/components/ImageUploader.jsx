import { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';

export default function ImageUploader({ onUpload, currentImage }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(currentImage || null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `thumbnails/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setPreview(publicUrl);
      onUpload(publicUrl);
    } catch (err) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleUrlInput = () => {
    const url = window.prompt('Enter image URL:', preview || '');
    if (url !== null) {
      setPreview(url);
      onUpload(url);
    }
  };

  const uploadFile = async (file) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop() || 'png';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `thumbnails/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setPreview(publicUrl);
      onUpload(publicUrl);
    } catch (err) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const item of clipboardItems) {
        const imageType = item.types.find(type => type.startsWith('image/'));
        if (imageType) {
          const blob = await item.getType(imageType);
          const file = new File([blob], `pasted-${Date.now()}.png`, { type: imageType });
          await uploadFile(file);
          return;
        }
      }
      setError('No image found in clipboard');
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setError('Clipboard access denied. Please allow clipboard access.');
      } else {
        setError('Failed to paste: ' + err.message);
      }
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="image-uploader">
      {preview ? (
        <div className="image-preview">
          <img src={preview} alt="Preview" />
          <div className="image-preview-actions">
            <button type="button" onClick={() => fileInputRef.current?.click()}>
              Change
            </button>
            <button type="button" onClick={handleRemove} className="remove">
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="upload-area">
          <div className="upload-content">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17,8 12,3 7,8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p>Drop an image here or click to upload</p>
            <div className="upload-buttons">
              <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Choose File'}
              </button>
              <button type="button" onClick={handlePaste} className="secondary" disabled={uploading}>
                Paste
              </button>
              <button type="button" onClick={handleUrlInput} className="secondary" disabled={uploading}>
                Use URL
              </button>
            </div>
          </div>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        style={{ display: 'none' }}
      />
      {error && <p className="upload-error">{error}</p>}
    </div>
  );
}
