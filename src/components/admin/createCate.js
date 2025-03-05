import React, { useState } from 'react';
import { createCategory } from '../../api/server';

const CreateCate = () => {
  const [form, setForm] = useState({ name: '', description: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Khi người dùng thay đổi input, reset lỗi nếu đã nhập
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra validate: yêu cầu cả trường name và description phải không rỗng
    if (!form.name.trim() || !form.description.trim()) {
      setError('Vui lòng điền đầy đủ Tên danh mục và Mô tả.');
      return;
    }
    try {
      const newCategory = await createCategory(form);
      console.log('Danh mục mới:', newCategory);
      alert('Thêm danh mục thành công');
      // Reset form sau khi submit thành công
      window.location.reload(); // Reload lại trang sau khi thêm danh mục thành công
      // setForm({ name: '', description: '' });
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
          <label htmlFor="description">Mô tả:</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Nhập mô tả"
            className="form-control"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateCate;
