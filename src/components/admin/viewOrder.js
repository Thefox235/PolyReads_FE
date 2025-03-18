import React, { useState, useEffect } from 'react';
import { getAllOrder, deleteOrder } from '../../api/server';

import Modal from '../model'; // Component modal tùy chỉnh
import EditOrder from './editOrder'; // Component form sửa đơn hàng

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Lấy danh sách đơn hàng từ API khi component khởi tạo
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getAllOrder();
        // Giả sử API trả về đối tượng: { orders: [...] }
        setOrders(ordersData.orders || []);
      } catch (error) {
        console.error("Lỗi lấy danh sách đơn hàng:", error);
      }
    };
    fetchOrders();
  }, []);

  // Hàm xử lý xóa đơn hàng
  const handleDelete = async (id) => {
    try {
      if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này không?")) {
        await deleteOrder(id);
        alert("Đơn hàng đã được xóa thành công");
        setOrders(prevOrders => prevOrders.filter(order => order._id !== id));
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi xóa đơn hàng:", error);
    }
  };

  // Hàm mở modal chỉnh sửa đơn hàng
  const openEditModal = (order) => {
    setSelectedOrder(order);
    setShowEditModal(true);
  };

  // Đóng modal chỉnh sửa đơn hàng
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedOrder(null);
  };

  // Khi chỉnh sửa thành công, cập nhật trong state và đóng modal
  const handleEditSuccess = (updatedOrder) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order._id === updatedOrder._id ? updatedOrder : order
      )
    );
    closeEditModal();
  };

  return (
    <div className="admin-order">
      <div className="admin-order__header">
        <h2>Danh sách Đơn Hàng</h2>
        <span>Số lượng đơn hàng: {orders.length}</span>
      </div>

      <table className="admin-order__table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên Đơn Hàng</th>
            <th>Ngày Tạo</th>
            <th>Số Lượng</th>
            <th>Tổng Tiền</th>
            <th>Trạng Thái</th>
            <th>Thanh Toán</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={order._id || index}>
                <td>{index + 1}</td>
                <td>{order.name}</td>
                <td>{new Date(order.date).toLocaleString()}</td>
                <td>{order.quantity}</td>
                <td>
                  {order.total
                    ? order.total.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND"
                      })
                    : ''}
                </td>
                <td>{order.status}</td>
                <td>{order.payment_status}</td>
                <td className="order-action">
                  <button onClick={() => openEditModal(order)} className="edit-btn">
                    <i className="bi bi-pen"></i>
                  </button>
                  <button onClick={() => handleDelete(order._id)} className="delete-btn">
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Không có đơn hàng nào</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal chỉnh sửa đơn hàng */}
      {showEditModal && selectedOrder && (
        <Modal onClose={closeEditModal}>
          <EditOrder 
            initialData={selectedOrder}
            onClose={closeEditModal}
            onEditSuccess={handleEditSuccess}
          />
        </Modal>
      )}
    </div>
  );
};

export default ViewOrder;
