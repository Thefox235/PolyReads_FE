import React, { useState } from 'react';
import { createPublisher } from '../../api/server';

const CreatePublisher = ({onClose, onCreateSuccess }) => {
  const [form, setForm] = useState({ name: '', is_active: true });
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
    // Validate: bắt buộc nhập cả name và is_active
    if (!form.name.trim()) {
      setError('Vui lòng nhập Tên NXB');
      return;
    }
    try {
      const newPublisher = await createPublisher(form);
      console.log('NXB mới:', newPublisher);
      alert('Thêm NXB thành công');
      if (onCreateSuccess) onCreateSuccess(newPublisher);

      // Reset form sau khi submit thành công
      // setForm({ name: '', is_active: true });
      setError('');
    } catch (error) {
      setError('Có lỗi xảy ra khi thêm NXB');
    }
  };

  return (
    <div className="addPro-container">
      <h1>Thêm NXB</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên NXB:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
          />
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

        <button type="submit" className="btn btn-primary">Thêm NXB</button>
      </form>
    </div>
  );
};

export default CreatePublisher;
