// ViewCoupon.js
import React, { useState, useEffect } from 'react';
import { getCoupons, deleteCoupon } from '../../api/server';
import '../../asset/css/adminPro.css';
import CreateCoupon from './createCoupon';
import EditCoupon from './editCoupon';
import Modal from '../model';

const ViewCoupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // Lấy danh sách coupon khi component mount
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const data = await getCoupons();
        setCoupons(data);
      } catch (error) {
        console.error("Lỗi khi lấy coupon:", error);
      }
    };
    fetchCoupons();
  }, []);

  const openCreateModal = () => setShowCreateModal(true);
  const closeCreateModal = () => setShowCreateModal(false);

  const openEditModal = (coupon) => {
    setSelectedCoupon(coupon);
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedCoupon(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCoupon(id);
      alert("Xóa coupon thành công");
      setCoupons((prev) => prev.filter((coupon) => coupon._id !== id));
    } catch (error) {
      alert("Lỗi khi xóa coupon");
      console.error("Lỗi khi xóa coupon:", error);
    }
  };

  const handleCreateSuccess = (newCoupon) => {
    setCoupons((prev) => [...prev, newCoupon]);
  };

  const handleEditSuccess = (updatedCoupon) => {
    setCoupons((prev) =>
      prev.map((coupon) =>
        coupon._id === updatedCoupon._id ? updatedCoupon : coupon
      )
    );
  };

  return (
    <div className="admin-product">
      {/* Tiêu đề và nút tạo coupon */}
      <div className="admin-product__action">
        <span className="admin-product__category-title">
          Coupon: {coupons.length} coupon hiện có
        </span>
        <button className="admin-product__btn-add-category" onClick={openCreateModal}>
          Tạo Coupon
        </button>
      </div>

      {/* Bảng hiển thị coupon */}
      <table className="admin-product__table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã Coupon</th>
            <th>Giảm giá (%)</th>
            <th>Loại Coupon</th>
            <th>Phạm vi</th>
            <th>Hiệu lực từ</th>
            <th>Hiệu lực đến</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {coupons && coupons.length > 0 ? (
            coupons.map((coupon, index) => (
              <tr key={coupon._id}>
                <td>{index + 1}</td>
                <td>{coupon.code}</td>
                <td>{coupon.discountPercentage}%</td>
                <td>{coupon.couponType}</td>
                <td>{coupon.scope}</td>
                <td>{new Date(coupon.validFrom).toLocaleDateString()}</td>
                <td>{new Date(coupon.validUntil).toLocaleDateString()}</td>
                <td>{coupon.isActive ? "Hoạt động" : "Không hoạt động"}</td>
                <td>
                  <button
                    className="trash"
                    onClick={() => {
                      if (window.confirm("Bạn có chắc muốn xóa coupon này không?")) {
                        handleDelete(coupon._id);
                      }
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <button
                    className="fix"
                    style={{ marginLeft: "5px" }}
                    onClick={() => openEditModal(coupon)}
                  >
                    <i className="bi bi-pen"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">Đang tải coupon...</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Tạo Coupon */}
      {showCreateModal && (
        <Modal onClose={closeCreateModal}>
          <CreateCoupon
            onClose={closeCreateModal}
            onCreateSuccess={handleCreateSuccess}
          />
        </Modal>
      )}

      {/* Modal Chỉnh sửa Coupon */}
      {showEditModal && selectedCoupon && (
        <Modal onClose={closeEditModal}>
          <EditCoupon
            initialData={selectedCoupon}
            onClose={closeEditModal}
            onEditSuccess={handleEditSuccess}
          />
        </Modal>
      )}
    </div>
  );
};

export default ViewCoupon;