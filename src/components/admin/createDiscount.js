// CreateDiscount.js
import React, { useState } from 'react';
import { createDiscount } from '../../api/server'; // API POST để tạo discount

const CreateDiscount = ({ onClose, onCreateSuccess }) => {
  const [form, setForm] = useState({
    value: "",
    start_date: "",
    end_date: "",
    is_active: true,
  });
  const [error, setError] = useState("");

  // Xử lý thay đổi của input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  // Hàm submit form: gọi e.preventDefault() để ngăn việc reload trang và đẩy dữ liệu lên URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra các trường bắt buộc
    if (!form.value || !form.start_date || !form.end_date) {
      setError("Vui lòng nhập đầy đủ thông tin discount.");
      return;
    }
    try {
      // Gọi API POST để tạo discount mới
      const newDiscount = await createDiscount(form);
      alert("Tạo discount thành công!");
      if (onCreateSuccess) onCreateSuccess(newDiscount);
      if (onClose) onClose();
    } catch (err) {
      console.error("Lỗi tạo discount:", err);
      setError("Có lỗi xảy ra khi tạo discount.");
    }
  };

  return (
    <div className="addPro-container">
      <h1>Thêm Discount</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Dùng onSubmit và thêm noValidate để tránh hiển thị lỗi default của HTML */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="value">Giá trị (Phần trăm giảm):</label>
          <input
            type="number"
            id="value"
            name="value"
            value={form.value}
            onChange={handleChange}
            className="form-control"
            placeholder="Nhập phần trăm giảm"
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
          Tạo Discount
        </button>
      </form>
    </div>
  );
};

export default CreateDiscount;