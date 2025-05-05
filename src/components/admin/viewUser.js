import React, { useState, useEffect } from 'react';
import { getAllUser, updateUser } from '../../api/server';

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  // State để lưu id người dùng đang chỉnh sửa và giá trị role được chọn
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingRole, setEditingRole] = useState('');

  // Lấy danh sách người dùng khi component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUser();
        setUsers(data);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy thông tin người dùng:', error);
      }
    };
    fetchUsers();
  }, []);

  // Khi bấm nút edit, lưu lại id của user và role hiện tại của user đó
  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditingRole(user.role);
  };

  // Thay đổi giá trị role khi chọn dropdown
  const handleRoleChange = (e) => {
    setEditingRole(e.target.value);
  };

  // Xử lý lưu thay đổi role sau khi chỉnh sửa
  const handleSave = async (userId) => {
    try {
      const updatedUser = await updateUser(userId, { role: editingRole });
      setUsers(prev =>
        prev.map(user => user._id === userId ? updatedUser : user)
      );
      setEditingUserId(null);
      setEditingRole('');
    } catch (error) {
      console.error('Lỗi cập nhật user:', error);
      alert('Cập nhật người dùng thất bại');
    }
  };

  // Hủy inline editing
  const handleCancel = () => {
    setEditingUserId(null);
    setEditingRole('');
  };

  return (
    <div className="admin-product">
      <div className="admin-product__action">
        <span className="admin-product__category-title">
          Người dùng: {users.length} người dùng hiện có
        </span>
      </div>
      <table className="admin-product__table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên người dùng</th>
            <th>Email</th>
            <th>Role</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {editingUserId === user._id ? (
                    <select
                      value={editingRole}
                      onChange={handleRoleChange}
                      className="form-control"
                    >
                      {/* Theo nghiệp vụ: role "1" là User, còn lại là Admin */}
                      <option value="0">User</option>
                      <option value="1">Admin</option>
                    </select>
                  ) : (
                    user.role === "0" ? 'User' : 'Admin'
                  )}
                </td>
                <td>
                  {editingUserId === user._id ? (
                    <>
                      <button
                        onClick={() => handleSave(user._id)}
                        className="btn btn-primary"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn btn-secondary"
                        style={{ marginLeft: '5px' }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEditClick(user)}
                      className="fix"
                      style={{ marginLeft: '5px' }}
                    >
                      <i className="bi bi-pen"></i>
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Đang tải danh sách người dùng...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUser;