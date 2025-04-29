import React, { useState } from 'react';
import { createBanner, uploadImageToCloudinary } from '../../api/server';

const CreateBanner = ({ onClose, onCreateSuccess }) => {
  // Sử dụng các trường theo schema: image_url, title, position, is_active
  const [form, setForm] = useState({
    title: '',
    image_url: '',
    position: 'line-banner', // giá trị mặc định
    is_active: true  // mặc định active
  });
  const [error, setError] = useState('');

  // Xử lý khi input file thay đổi
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const url = await uploadImageToCloudinary(file);
        setForm((prev) => ({ ...prev, image_url: url }));
      } catch (err) {
        console.error('Lỗi upload ảnh:', err);
        setError('Lỗi upload ảnh lên Cloudinary');
      }
    }
  };

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
      setError("Vui lòng upload hình ảnh");
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
      window.location.reload(); // Reload lại trang sau khi thêm banner thành công
      if (onCreateSuccess) onCreateSuccess(newBanner);
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
        {/* Upload Image */}
        <div className="form-group">
          <label htmlFor="fileInput">Chọn hình ảnh:</label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="form-control"
            accept="image/*"
          />
          {form.image_url && (
            <div style={{ marginTop: '10px' }}>
              <p>
                Ảnh đã được upload:{" "}
                <a href={form.image_url} target="_blank" rel="noopener noreferrer">
                  {form.image_url}
                </a>
              </p>
              <img
                src={form.image_url}
                alt="Banner Preview"
                style={{ maxWidth: '200px' }}
              />
            </div>
          )}
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