<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { useState, useEffect, useRef } from 'react';
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
import { updateBanner } from '../../api/server';

const EditBanner = ({ initialData, onClose, onEditSuccess }) => {
  const [form, setForm] = useState({
    title: '',
    image_url: '',
<<<<<<< HEAD
    position: '',
    is_active: true
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        image_url: initialData.image_url || '',
        position: initialData.position || '',
        is_active: initialData.is_active
      });
=======
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
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
<<<<<<< HEAD
=======
    if (name === 'position') {
      console.log("New position selected:", value);
    }
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBanner = await updateBanner(initialData._id, form);
<<<<<<< HEAD
      alert('Banner đã được cập nhật thành công!');
      if (onEditSuccess) onEditSuccess(updatedBanner);
=======
      // console.log("Updated banner:", updatedBanner);
      alert('Banner đã được cập nhật thành công!');
      if (onEditSuccess) onEditSuccess(updatedBanner);
      // Thay vì reload trang, hãy đóng modal và để parent cập nhật state
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
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
<<<<<<< HEAD
        {/* Position */}
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <input
            type="text"
=======
        {/* Position: Dropdown */}
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <select
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
            id="position"
            name="position"
            value={form.position}
            onChange={handleChange}
            className="form-control"
<<<<<<< HEAD
          />
        </div>
        {/* is_active */}
=======
          >
            <option value="header-banner">Header</option>
            <option value="line-banner">Body</option>
          </select>
        </div>
        {/* Active Checkbox */}
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
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
<<<<<<< HEAD
        <button type="submit" className="btn btn-primary">Submit</button>
=======
        <button type="submit" className="btn btn-primary">Sửa Banner</button>
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
      </form>
    </div>
  );
};

export default EditBanner;
