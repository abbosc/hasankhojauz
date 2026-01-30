import { useState, useEffect } from 'react';
import { useSiteSettings, updateSiteSettings } from '../../hooks/useSiteSettings';
import ImageUploader from '../../components/ImageUploader';

export default function AboutEditor() {
  const { data: aboutData, loading } = useSiteSettings('about_page');
  const [formData, setFormData] = useState({
    photo: '',
    name: '',
    subtitle: '',
    bio: '',
    email: '',
    telegram: '',
    instagram: '',
    linkedin: '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (aboutData) {
      setFormData({
        photo: aboutData.photo || '',
        name: aboutData.name || '',
        subtitle: aboutData.subtitle || '',
        bio: aboutData.bio || '',
        email: aboutData.email || '',
        telegram: aboutData.telegram || '',
        instagram: aboutData.instagram || '',
        linkedin: aboutData.linkedin || '',
      });
    }
  }, [aboutData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (url) => {
    setFormData((prev) => ({ ...prev, photo: url }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      await updateSiteSettings('about_page', formData);
      setMessage({ type: 'success', text: 'Saqlandi!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-loading">Yuklanmoqda...</div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Men haqimda sahifasi</h1>
        <button
          onClick={handleSave}
          className="admin-button primary"
          disabled={saving}
        >
          {saving ? 'Saqlanmoqda...' : 'Saqlash'}
        </button>
      </div>

      {message && (
        <div className={`admin-message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="admin-form">
        <div className="form-section">
          <h3>Shaxsiy rasm</h3>
          <div className="about-photo-upload">
            <ImageUploader
              currentImage={formData.photo}
              onUpload={handlePhotoChange}
            />
            {formData.photo && (
              <div className="photo-preview">
                <img src={formData.photo} alt="Preview" />
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <h3>Asosiy ma'lumotlar</h3>

          <div className="form-group">
            <label htmlFor="name">Ism</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="To'liq ismingiz"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subtitle">Qisqa tavsif</label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Masalan: Dasturchi va blogger"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio (O'zingiz haqingizda)</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="O'zingiz haqingizda batafsil yozing..."
              rows={6}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Aloqa ma'lumotlari</h3>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="telegram">Telegram</label>
            <input
              type="url"
              id="telegram"
              name="telegram"
              value={formData.telegram}
              onChange={handleChange}
              placeholder="https://t.me/username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="instagram">Instagram</label>
            <input
              type="url"
              id="instagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="linkedin">LinkedIn</label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
