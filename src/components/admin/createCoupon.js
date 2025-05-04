import React, { useEffect, useState } from 'react';
import { createCoupon, getAllUser } from '../../api/server';
import '../../asset/css/adminPro.css';
import CustomSelectMulti from './customSelectMulti';

const CreateCoupon = ({ onClose, onCreateSuccess }) => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    code: "",
    discountPercentage: "",
    couponType: "order", // 'order' hoặc 'shipping'
    description: "",
    validFrom: "",
    validUntil: "",
    usageLimit: 1,
    minimumOrderValue: 0,
    isActive: true,
    scope: "global", // 'global' hoặc 'limited'
    eligibleUserIds: []  // Khởi tạo là mảng rỗng
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUser();
        // Giả sử response.data chứa danh sách user dưới dạng mảng
        console.log(response);
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []); // Thêm dependency array để chạy một lần khi mount

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate các trường bắt buộc
    if (!form.code || !form.discountPercentage || !form.validFrom || !form.validUntil) {
      setError("Vui lòng điền đầy đủ các trường bắt buộc.");
      return;
    }

    // Nếu coupon hạn chế, kiểm tra và chuyển eligibleUserIds thành mảng
    const payload = { ...form };
    if (form.scope === "limited") {
      // Nếu form.eligibleUserIds đang được lưu dưới dạng mảng thì không cần split
      if (!Array.isArray(form.eligibleUserIds) || form.eligibleUserIds.length === 0) {
        setError("Với coupon hạn chế, vui lòng chọn người dùng được áp dụng.");
        return;
      }
    } else {
      payload.eligibleUserIds = [];
    }

    try {
      const newCoupon = await createCoupon(payload);
      alert("Tạo coupon thành công!");
      if (onCreateSuccess) onCreateSuccess(newCoupon);
      if (onClose) onClose();
    } catch (err) {
      console.error(err);
      setError("Lỗi khi tạo coupon.");
    }
  };

  return (
    <div className="addPro-container">
      <h1>Tạo Coupon</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Mã Coupon */}
        <div className="form-group">
          <label htmlFor="code">Mã Coupon:</label>
          <input
            type="text"
            id="code"
            name="code"
            value={form.code}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* Giảm giá (%) */}
        <div className="form-group">
          <label htmlFor="discountPercentage">Giảm giá (%):</label>
          <input
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            value={form.discountPercentage}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* Loại Coupon */}
        <div className="form-group">
          <label htmlFor="couponType">Loại Coupon:</label>
          <select
            id="couponType"
            name="couponType"
            value={form.couponType}
            onChange={handleChange}
            className="form-control"
          >
            <option value="order">Giảm đơn hàng</option>
            <option value="shipping">Giảm phí vận chuyển</option>
          </select>
        </div>
        {/* Mô tả */}
        <div className="form-group">
          <label htmlFor="description">Mô tả:</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>
        {/* Hiệu lực từ */}
        <div className="form-group">
          <label htmlFor="validFrom">Hiệu lực từ:</label>
          <input
            type="date"
            id="validFrom"
            name="validFrom"
            value={form.validFrom}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* Hiệu lực đến */}
        <div className="form-group">
          <label htmlFor="validUntil">Hiệu lực đến:</label>
          <input
            type="date"
            id="validUntil"
            name="validUntil"
            value={form.validUntil}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* Giới hạn Sử dụng */}
        <div className="form-group">
          <label htmlFor="usageLimit">Giới hạn Sử dụng:</label>
          <input
            type="number"
            id="usageLimit"
            name="usageLimit"
            value={form.usageLimit}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* Giá trị đơn tối thiểu */}
        <div className="form-group">
          <label htmlFor="minimumOrderValue">Giá trị đơn tối thiểu:</label>
          <input
            type="number"
            id="minimumOrderValue"
            name="minimumOrderValue"
            value={form.minimumOrderValue}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* Trạng thái Hoạt động */}
        <div className="form-group">
          <label htmlFor="isActive">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            {" "}Hoạt động
          </label>
        </div>
        {/* Phạm vi */}
        <div className="form-group">
          <label htmlFor="scope">Phạm vi:</label>
          <select
            id="scope"
            name="scope"
            value={form.scope}
            onChange={handleChange}
            className="form-control"
          >
            <option value="global">Toàn cầu (Tất cả người dùng)</option>
            <option value="limited">Hạn chế (Người dùng cụ thể)</option>
            <option value="new">Người dùng mới</option>
          </select>
        </div>
        {/* Dropdown chọn người dùng nếu phạm vi là hạn chế */}
        {form.scope === "limited" && (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <CustomSelectMulti
              label="Chọn người dùng"
              options={(users || []).map(user => ({
                value: user._id,
                label: user.name
              }))}
              isMulti={true}
              value={
                (Array.isArray(form.eligibleUserIds) ? form.eligibleUserIds : []).map(id => {
                  const user = (users || []).find(u => u._id === id);
                  return user ? { value: user._id, label: user.name } : null;
                }).filter(Boolean)
              }
              onChange={(selectedOptions) => {
                const uniqueIds = [...new Set(selectedOptions.map(option => option.value))];
                setForm(prev => ({
                  ...prev,
                  eligibleUserIds: uniqueIds
                }));
              }}
              placeholder="Chọn người dùng được áp dụng"
            />
          </div>
        )}

        {form.scope === "new" && (
          <div className="alert alert-info">
            Coupon này sẽ tự động áp dụng cho tất cả người dùng mới đăng ký.
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Tạo Coupon
        </button>
      </form>
    </div>
  );
};

export default CreateCoupon;