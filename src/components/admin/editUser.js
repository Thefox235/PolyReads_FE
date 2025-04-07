import React, { useState } from 'react';
import { updateUser } from '../../api/server';

const EditUser = ({ initialData, onClose, onEditSuccess }) => {
  // Khởi tạo state role với giá trị từ user ban đầu
  const [role, setRole] = useState(initialData.role);
  const [loading, setLoading] = useState(false);

  // Xử lý submit form cập nhật thông tin user (ở đây chỉ cập nhật role)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedUser = await updateUser(initialData._id, { role });
      onEditSuccess(updatedUser);
    } catch (error) {
      console.error('Lỗi cập nhật người dùng:', error);
      alert('Cập nhật người dùng thất bại!');
    }
    setLoading(false);
  };

  return (
    <div className="edit-user">
      <h3>Sửa người dùng</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Role: </label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {/* Giả sử có 2 role cơ bản: "0" cho User, "1" cho Admin */}
            <option value="0">User</option>
            <option value="1">Admin</option>
          </select>
        </div>
        <div className="form-group" style={{ marginTop: '10px' }}>
          <button type="submit" disabled={loading}>
            {loading ? 'Đang lưu...' : 'Lưu'}
          </button>
          <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;