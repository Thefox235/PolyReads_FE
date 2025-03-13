import React, { useState, useEffect } from 'react';
import { updateAuthor } from '../../api/server';

const EditAuthor = ({ initialData, onClose, onEditSuccess }) => {
<<<<<<< HEAD
  const [form, setForm] = useState({
    name: '',
    bio: ''
  });
  const [error, setError] = useState('');

  // Prefill form với dữ liệu từ initialData khi modal được mở
=======
  const [form, setForm] = useState({ name: '', bio: '' });
  const [error, setError] = useState('');

  // Prefill form dựa trên dữ liệu từ initialData khi modal mở
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
<<<<<<< HEAD
        bio: initialData.bio || ''
=======
        bio: initialData.bio || '',
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
<<<<<<< HEAD
    setForm(prev => ({ ...prev, [name]: value }));
=======
    setForm((prev) => ({ ...prev, [name]: value }));
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      // Cập nhật tác giả sử dụng id từ initialData
      const updatedAuthor = await updateAuthor(initialData._id, form);
      alert('Tác giả đã được cập nhật thành công!');
      console.log('Tác giả cập nhật thành công:', updatedAuthor);
      // Nếu có callback cập nhật danh sách ở component cha, gọi nó
      if (onEditSuccess) onEditSuccess(updatedAuthor);
      // Đóng modal
=======
      const updatedAuthor = await updateAuthor(initialData._id, form);
      alert('Tác giả đã được cập nhật thành công!');
      console.log('Tác giả cập nhật thành công:', updatedAuthor);
      // Gọi callback cập nhật state từ component cha
      if (onEditSuccess) onEditSuccess(updatedAuthor);
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
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
<<<<<<< HEAD
        <button type="submit" className="btn btn-primary">Submit</button>
=======
        <button type="submit" className="btn btn-primary">
          Sửa Tác Giả
        </button>
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
      </form>
    </div>
  );
};

export default EditAuthor;
