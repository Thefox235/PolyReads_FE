import React, { useState, useEffect, useRef } from 'react';
import { updatePublisher } from '../../api/server';

const EditPublisher = ({ initialData, onClose, onEditSuccess }) => {
  const [form, setForm] = useState({ 
    name: '', 
    is_active: true 
  });
  const [error, setError] = useState('');
  
  const isInitialized = useRef(false);

  useEffect(() => {
    if (initialData && !isInitialized.current) {
      setForm({
        name: initialData.name || '',
        is_active: initialData.is_active
      });
      isInitialized.current = true;
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPublisher = await updatePublisher(initialData._id, form);
      alert('NXB đã được cập nhật thành công!');
      if (onEditSuccess) onEditSuccess(updatedPublisher);
      
      if (onClose) onClose();
    } catch (err) {
      console.error('Có lỗi xảy ra khi cập nhật NXB:', err);
      setError('Có lỗi xảy ra khi cập nhật NXB');
    }
  };

  return (
    <div className="editPro-container">
      <h1>Chỉnh sửa NXB</h1>
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
          Sửa NXB
        </button>
      </form>
    </div>
  );
};

export default EditPublisher;
