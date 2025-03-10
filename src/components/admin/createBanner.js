import React, { useState } from 'react';
import { createBanner } from '../../api/server';

const CreateBanner = ({ onClose, onCreateSuccess }) => {
  // Sử dụng các trường theo schema: image_url, title, position, is_active
  const [form, setForm] = useState({
    title: '',
    image_url: '',
    position: 'line-banner', // giá trị mặc định
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

  const validateForm = () => {
    // Kiểm tra các trường bắt buộc không được để trống
    if (!form.title.trim()) {
      setError("Vui lòng nhập tiêu đề banner");
      return false;
    }
    if (!form.image_url.trim()) {
      setError("Vui lòng nhập URL của hình ảnh");
      return false;
    }
    // Nếu cần validate thêm các trường khác, bạn có thể thêm điều kiện ở đây.
    setError(""); // reset lỗi nếu hợp lệ
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return; // Dừng khi validate không hợp lệ
    }
    
    try {
      const newBanner = await createBanner(form);
      alert('Banner đã được tạo thành công!');
      window.location.reload(); // Reload lại trang sau khi thêm danh mục thành công
      if (onCreateSuccess) onCreateSuccess(newBanner);
      // window.location.reload(); // Nếu muốn reload trang; bạn có thể xử lý khác chẳng hạn đóng modal.
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
        {/* Position với dropdown */}
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
        {/* Active checkbox */}
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
        <button type="submit" className="btn btn-primary">Thêm Banner</button>
      </form>
    </div>
  );
};

export default CreateBanner;
