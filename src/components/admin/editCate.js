import React, { useState, useEffect } from 'react';
import { updateCategory } from '../../api/server';

const EditCate = ({ initialData, onClose }) => {
  // Khởi tạo trạng thái form với dữ liệu từ initialData (nếu có)
  const [form, setForm] = useState({
    name: '',
    description: ''
  });

  const [error, setError] = useState('');

  // Khi initialData thay đổi (ví dụ: khi mở modal), prefill form
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        description: initialData.description || ''
      });
    }
  }, [initialData]);

  // Handler khi người dùng thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Submit cập nhật danh mục
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sử dụng initialData._id làm id của danh mục cần cập nhật
      await updateCategory(initialData._id, form);
      alert('Danh mục đã được cập nhật thành công!');
      // Sau khi cập nhật thành công, đóng modal
      window.location.reload();
    } catch (err) {
      console.error('Có lỗi xảy ra khi cập nhật danh mục:', err);
      setError('Có lỗi xảy ra khi cập nhật danh mục');
    }
  };

  return (
    <div className="editPro-container">
      <h1>Chỉnh sửa danh mục</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên Danh Mục:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Mô tả danh mục:</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Sửa Danh Mục</button>
      </form>
    </div>
  );
};

export default EditCate;
