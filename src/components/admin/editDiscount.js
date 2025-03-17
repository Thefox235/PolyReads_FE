// EditDiscount.js
import React, { useState, useEffect } from 'react';
import { updateDiscount } from '../../api/server';

const EditDiscount = ({ initialData, onClose, onEditSuccess }) => {
  const [form, setForm] = useState({
    value: "",
    code: "",
    start_date: "",
    end_date: "",
    is_active: true,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm({
        value: initialData.value || "",
        code: initialData.code || "",
        start_date: initialData.start_date ? new Date(initialData.start_date).toISOString().substr(0, 10) : "",
        end_date: initialData.end_date ? new Date(initialData.end_date).toISOString().substr(0, 10) : "",
        is_active: initialData.is_active,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedDiscount = await updateDiscount(initialData._id, form);
      alert("Discount đã được cập nhật thành công!");
      if (onEditSuccess) onEditSuccess(updatedDiscount);
      if (onClose) onClose();
    } catch (err) {
      console.error(err);
      setError("Có lỗi xảy ra khi cập nhật discount.");
    }
  };

  return (
    <div className="editPro-container">
      <h1>Chỉnh sửa Discount</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="code">Mã Discount:</label>
          <input
            type="text"
            id="code"
            name="code"
            value={form.code}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="value">Giá trị (Phần trăm giảm):</label>
          <input
            type="number"
            id="value"
            name="value"
            value={form.value}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="start_date">Ngày bắt đầu:</label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="end_date">Ngày kết thúc:</label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            value={form.end_date}
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
            />{" "}
            Active
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Sửa Discount
        </button>
      </form>
    </div>
  );
};

export default EditDiscount;
