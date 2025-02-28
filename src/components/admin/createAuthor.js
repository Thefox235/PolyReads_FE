import React, { useState } from 'react';
import { createAuthor } from '../../api/server';

const CreateAuthor = () => {
  const [form, setForm] = useState({ name: '', bio: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Reset lỗi khi có thay đổi input
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate: bắt buộc nhập cả name và bio
    if (!form.name.trim() || !form.bio.trim()) {
      setError('Vui lòng nhập đầy đủ Tên Tác Giả và Bio.');
      return;
    }
    try {
      const newAuthor = await createAuthor(form);
      console.log('Tác giả mới:', newAuthor);
      alert('Thêm tác giả thành công');
      // Reset form sau khi submit thành công
      setForm({ name: '', bio: '' });
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
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Nhập Bio"
            className="form-control"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateAuthor;
