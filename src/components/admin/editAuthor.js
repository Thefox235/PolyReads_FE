import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateAuthor, getAuthorById } from '../../api/server';

const EditAuthor = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: '',
    bio: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorData = await getAuthorById(id);
        setForm(authorData);
      } catch (error) {
        setError('Có lỗi xảy ra khi lấy dữ liệu tác giả');
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
      const updatedAuthor = await updateAuthor(id, form);
      alert('tác  giả đã được cập nhật thành công!');
      console.log('tác  giả đã cập nhật:', updatedAuthor);
      // Xử lý sau khi cập nhật tác  giả thành công (ví dụ: thông báo thành công, chuyển hướng, v.v.)
    } catch (error) {
      setError('Có lỗi xảy ra khi cập nhật tác giả');
    }
  };

  return (
    <div className="editPro-container">
      <h1>Chỉnh sửa tác giả</h1>
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
          {error && <div className="alert alert-danger">{error}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="bio">Mô tả tác  giả</label>
          <textarea
            type="text"
            id="bio"
            name="bio"
            value={form.bio}
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

export default EditAuthor;
