import React, { useState } from 'react';
import { createBanner } from '../../api/server';

const CreateBanner = ({ onClose, onCreateSuccess }) => {
  // Sử dụng các trường theo schema: image_url, title, position, is_active
  const [form, setForm] = useState({
    title: '',
    image_url: '',
<<<<<<< HEAD
    position: '',
=======
    position: 'line-banner', // giá trị mặc định
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
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

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBanner = await createBanner(form);
      alert('Banner đã được tạo thành công!');
      if (onCreateSuccess) onCreateSuccess(newBanner);
      if (onClose) onClose();
=======
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
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
    } catch (err) {
      console.error('Lỗi khi tạo banner:', err);
      setError('Có lỗi xảy ra khi tạo banner');
    }
  };

  return (
    <div className="createBanner-container">
      <h1>Create Banner</h1>
      {error && <div className="alert alert-danger">{error}</div>}
<<<<<<< HEAD
=======
      
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
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
        {/* Position với dropdown */}
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
        {/* Có hoạt động hay không */}
=======
          >
            <option value="header-banner">Header</option>
            <option value="line-banner">Body</option>
          </select>
        </div>
        {/* Active checkbox */}
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
        <button type="submit" className="btn btn-primary">Thêm Banner</button>
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
      </form>
    </div>
  );
};

export default CreateBanner;
