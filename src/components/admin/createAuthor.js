import React, { useState } from 'react';
import { createAuthor } from '../../api/server';

const CreateAuthor = ({ onClose, onCreateSuccess }) => {
  // Khởi tạo is_active dưới dạng boolean
  const [form, setForm] = useState({ name: '', is_active: false });
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
    // Chỉ validate trường name, vì is_active hiện là boolean
    if (!form.name.trim()) {
      setError('Vui lòng nhập tên Tác Giả.');
      return;
    }
    try {
      const newAuthor = await createAuthor(form);
      console.log('Tác giả mới:', newAuthor);
      alert('Thêm tác giả thành công');
      // Gọi callback cập nhật state ở component cha
      if (onCreateSuccess) onCreateSuccess(newAuthor);
      // Đóng modal sau khi tạo thành công
      if (onClose) onClose();
      // Reset lại form
      setForm({ name: '', is_active: false });
      setError('');
    } catch (error) {
      setError('Có lỗi xảy ra khi thêm tác giả');
    }
  };

  return (
    <div className="addPro-container">
      <h1>Thêm Tác Giả</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên Tác Giả:</label>
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
        <button type="submit" className="btn btn-primary">
          Thêm Tác Giả
        </button>
      </form>
    </div>
  );
};

export default CreateAuthor;