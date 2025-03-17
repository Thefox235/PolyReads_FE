// ViewDiscount.js
import React, { useState, useEffect } from 'react';
import { getDiscounts, deleteDiscount } from '../../api/server';
import '../../asset/css/adminPro.css';
import CreateDiscount from './createDiscount';
import EditDiscount from './editDiscount';
import Modal from '../model';

const ViewDiscount = () => {
  const [discounts, setDiscounts] = useState([]);

  // State quản lý modal tạo discount
  const [showCreateModal, setShowCreateModal] = useState(false);
  // State quản lý modal chỉnh sửa discount
  const [showEditModal, setShowEditModal] = useState(false);
  // Discount được chọn để chỉnh sửa
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  // Mở/đóng modal tạo discount
  const openCreateModal = () => setShowCreateModal(true);
  const closeCreateModal = () => setShowCreateModal(false);

  // Mở/đóng modal chỉnh sửa discount
  const openEditModal = (discount) => {
    setSelectedDiscount(discount);
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedDiscount(null);
  };

  // Lấy danh sách discount khi component mount
  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const data = await getDiscounts();
        setDiscounts(data);
      } catch (error) {
        console.error("Có lỗi khi lấy discount:", error);
      }
    };
    fetchDiscounts();
  }, []);

  // Hàm xóa discount
  const handleDelete = async (id) => {
    try {
      await deleteDiscount(id);
      alert("Discount đã được xóa");
      setDiscounts(prev => prev.filter(discount => discount._id !== id));
    } catch (error) {
      alert("Xóa discount thất bại");
      console.error("Có lỗi khi xóa discount:", error);
    }
  };

  // Callback sau khi tạo discount thành công
  const handleCreateSuccess = (newDiscount) => {
    setDiscounts(prev => [...prev, newDiscount]);
  };

  // Callback sau khi chỉnh sửa discount thành công
  const handleEditSuccess = (updatedDiscount) => {
    setDiscounts(prev =>
      prev.map(discount =>
        discount._id === updatedDiscount._id ? updatedDiscount : discount
      )
    );
  };

  return (
    <div className="admin-product">
      {/* Phần Action: tiêu đề + nút Thêm Discount */}
      <div className="admin-product__action">
        <span className="admin-product__category-title">
          Discount: {discounts.length} Discount Hiện Có
        </span>
        <button className="admin-product__btn-add-category" onClick={openCreateModal}>
          Thêm Discount
        </button>
      </div>

      {/* Bảng hiển thị Discount */}
      <table className="admin-product__table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Code</th>
            <th>Value (%)</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Active</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {discounts && discounts.length > 0 ? (
            discounts.map((discount, index) => (
              <tr key={discount._id || index}>
                <td>{index + 1}</td>
                <td>{discount.code}</td>
                <td>{discount.value}%</td>
                <td>{new Date(discount.start_date).toLocaleDateString()}</td>
                <td>{new Date(discount.end_date).toLocaleDateString()}</td>
                <td>{discount.is_active ? 'Active' : 'Inactive'}</td>
                <td>
                  <button
                    onClick={() => {
                      if (window.confirm("Bạn có chắc muốn xóa discount này không?")) {
                        handleDelete(discount._id);
                      }
                    }}
                    className="trash"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <button onClick={() => openEditModal(discount)} className="fix" style={{ marginLeft: '5px' }}>
                    <i className="bi bi-pen"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Đang tải discount...</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal CreateDiscount */}
      {showCreateModal && (
        <Modal onClose={closeCreateModal}>
          <CreateDiscount
            onClose={closeCreateModal}
            onCreateSuccess={handleCreateSuccess}
          />
        </Modal>
      )}

      {/* Modal EditDiscount */}
      {showEditModal && selectedDiscount && (
        <Modal onClose={closeEditModal}>
          <EditDiscount
            initialData={selectedDiscount}
            onClose={closeEditModal}
            onEditSuccess={handleEditSuccess}
          />
        </Modal>
      )}
    </div>
  );
};

export default ViewDiscount;
