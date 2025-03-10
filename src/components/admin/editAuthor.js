import React, { useState, useEffect } from 'react';
import { updateAuthor } from '../../api/server';

const EditAuthor = ({ initialData, onClose, onEditSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    bio: ''
  });
  const [error, setError] = useState('');

  // Prefill form với dữ liệu từ initialData khi modal được mở
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        bio: initialData.bio || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Cập nhật tác giả sử dụng id từ initialData
      const updatedAuthor = await updateAuthor(initialData._id, form);
      alert('Tác giả đã được cập nhật thành công!');
      console.log('Tác giả cập nhật thành công:', updatedAuthor);
      // Nếu có callback cập nhật danh sách ở component cha, gọi nó
      if (onEditSuccess) onEditSuccess(updatedAuthor);
      // Đóng modal
      if (onClose) onClose();
    } catch (err) {
      console.error('Có lỗi xảy ra khi cập nhật tác giả:', err);
      setError('Có lỗi xảy ra khi cập nhật tác giả');
    }
  };

  return (
    <div className="editPro-container">
      <h1>Chỉnh sửa tác giả</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên tác giả:</label>
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
          <label htmlFor="bio">Mô tả tác giả:</label>
          <textarea
            id="bio"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Sửa Tác Giả</button>
      </form>
    </div>
  );
};

export default EditAuthor;
