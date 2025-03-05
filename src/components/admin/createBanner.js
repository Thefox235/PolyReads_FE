import React, { useState } from 'react';
import { createBanner } from '../../api/server';

const CreateBanner = ({ onClose, onCreateSuccess }) => {
  // Sử dụng các trường theo schema: image_url, title, position, is_active
  const [form, setForm] = useState({
    title: '',
    image_url: '',
    position: '',
    is_active: true  // mặc định active
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBanner = await createBanner(form);
      alert('Banner đã được tạo thành công!');
      if (onCreateSuccess) onCreateSuccess(newBanner);
      window.location.reload();
    } catch (err) {
      console.error('Lỗi khi tạo banner:', err);
      setError('Có lỗi xảy ra khi tạo banner');
    }
  };

  return (
    <div className="createBanner-container">
      <h1>Create Banner</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* Image URL */}
        <div className="form-group">
          <label htmlFor="image_url">Image URL:</label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* Position */}
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            name="position"
            value={form.position}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* Có hoạt động hay không */}
        <div className="form-group">
          <label htmlFor="is_active">
            <input
              type="checkbox"
              id="is_active"
              name="is_active"
              checked={form.is_active}
              onChange={handleChange}
            />{' '}
            Active
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateBanner;
