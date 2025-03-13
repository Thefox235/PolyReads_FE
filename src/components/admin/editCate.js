import React, { useState, useEffect } from 'react';
import { updateCategory } from '../../api/server';

<<<<<<< HEAD
const EditCate = ({ initialData, onClose }) => {
  // Khởi tạo trạng thái form với dữ liệu từ initialData (nếu có)
=======
const EditCate = ({ initialData, onClose, onEditSuccess }) => {  // Đổi tên prop ở đây
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
  const [form, setForm] = useState({
    name: '',
    type: 'Product',
    is_active: true
  });

  const [error, setError] = useState('');

  // Khi initialData thay đổi (ví dụ: khi mở modal), prefill form
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
<<<<<<< HEAD
        description: initialData.description || ''
=======
        type: initialData.type || 'Product',
        is_active: initialData.is_active
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
      });
    }
  }, [initialData]);

  // Handler khi người dùng thay đổi input
  const handleChange = (e) => {
<<<<<<< HEAD
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
=======
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
  };

  // Submit cập nhật danh mục
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sử dụng initialData._id làm id của danh mục cần cập nhật
<<<<<<< HEAD
      await updateCategory(initialData._id, form);
      alert('Danh mục đã được cập nhật thành công!');
      // Sau khi cập nhật thành công, đóng modal
      window.location.reload();
=======
      const updatedCategory = await updateCategory(initialData._id, form);
      alert('Danh mục đã được cập nhật thành công!');
      if (onEditSuccess) onEditSuccess(updatedCategory);  // Gọi đúng prop onEditSuccess
      // Nếu không reload trang, state sẽ cập nhật ngay
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
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
<<<<<<< HEAD
          <label htmlFor="description">Mô tả danh mục:</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
=======
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
        <button type="submit" className="btn btn-primary">Sửa Danh Mục</button>
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
      </form>
    </div>
  );
};

export default EditCate;
