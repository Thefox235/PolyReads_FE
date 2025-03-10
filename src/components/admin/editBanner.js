import React, { useState, useEffect, useRef } from 'react';
import { updateBanner } from '../../api/server';

const EditBanner = ({ initialData, onClose, onEditSuccess }) => {
  const [form, setForm] = useState({
    title: '',
    image_url: '',
    position: 'line-banner',
    is_active: true
  });
  const [error, setError] = useState('');
  
  // Sử dụng ref để tránh setForm lại khi re-render
  const isInitialized = useRef(false);

  useEffect(() => {
    if (initialData && !isInitialized.current) {
      setForm({
        title: initialData.title || '',
        image_url: initialData.image_url || '',
        position: initialData.position || 'line-banner',
        is_active: initialData.is_active
      });
      isInitialized.current = true;
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'position') {
      console.log("New position selected:", value);
    }
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBanner = await updateBanner(initialData._id, form);
      console.log("Updated banner:", updatedBanner);
      alert('Banner đã được cập nhật thành công!');
      if (onEditSuccess) onEditSuccess(updatedBanner);
      // Thay vì reload trang, hãy đóng modal và để parent cập nhật state
      if (onClose) onClose();
    } catch (err) {
      console.error('Lỗi cập nhật banner:', err);
      setError('Có lỗi xảy ra khi cập nhật banner');
    }
  };

  return (
    <div className="editBanner-container">
      <h1>Edit Banner</h1>
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
        {/* Position: Dropdown */}
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <select
            id="position"
            name="position"
            value={form.position}
            onChange={handleChange}
            className="form-control"
          >
            <option value="header-banner">Header</option>
            <option value="line-banner">Body</option>
          </select>
        </div>
        {/* Active Checkbox */}
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
        <button type="submit" className="btn btn-primary">Sửa Banner</button>
      </form>
    </div>
  );
};

export default EditBanner;
