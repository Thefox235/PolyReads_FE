import React, { useState } from 'react';
import { createCategory } from '../../api/server';

const CreateCate = ({ onClose, onCreateSuccess }) => {
  const [form, setForm] = useState({ name: '', type: 'line-banner', is_active: true });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Reset lỗi khi có thay đổi input
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra validate: yêu cầu cả trường name và type phải không rỗng
    if (!form.name.trim()) {
      setError('Vui lòng điền Tên danh mục.');
      return;
    }
    try {
      const newCategory = await createCategory(form);
      console.log('Danh mục mới:', newCategory);
      alert('Thêm danh mục thành công');
      // Reset form sau khi submit thành công
      if (onCreateSuccess) onCreateSuccess(newCategory);
      // window.location.reload(); // Reload lại trang sau khi thêm danh mục thành công
      // setForm({ name: '', type: '' });
      setError('');
    } catch (error) {
      setError('Có lỗi xảy ra khi thêm danh mục');
    }
  };

  return (
    <div className="addPro-container">
      <h1>Thêm Danh Mục</h1>
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
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            className="form-control"
          >
            <option value="Product">Product</option>
            <option value="Blog">Blog</option>
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
        <button type="submit" className="btn btn-primary">Thêm Danh Mục</button>
      </form>
    </div>
  );
};

export default CreateCate;
