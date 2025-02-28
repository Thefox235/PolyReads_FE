import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateCategory, getCategoryById } from '../../api/server';

const EditCate = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: '',
    description: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await getCategoryById(id);
        setForm(categoryData);
      } catch (error) {
        setError('Có lỗi xảy ra khi lấy dữ liệu danh mục');
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedCategory = await updateCategory(id, form);
      alert('danh mục đã được cập nhật thành công!');
      console.log('Danh mục đã cập nhật:', updatedCategory);
      // Xử lý sau khi cập nhật danh mục thành công (ví dụ: thông báo thành công, chuyển hướng, v.v.)
    } catch (error) {
      setError('Có lỗi xảy ra khi cập nhật danh mục');
    }
  };

  return (
    <div className="editPro-container">
      <h1>Chỉnh sửa danh mục</h1>
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
          {error && <div className="alert alert-danger">{error}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Mô tả danh mục</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
          />
          {error && <div className="alert alert-danger">{error}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default EditCate;
