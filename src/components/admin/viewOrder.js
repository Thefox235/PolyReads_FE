import React, { useState, useEffect } from "react";
import { getAllOrder, deleteOrder, updateOrder } from "../../api/server"; // API cần có updateOrder, deleteOrder
import ViewOrderDetail from "./viewOrder-detail"; // Component hiển thị chi tiết đơn hàng trong modal
import "../../asset/css/adminPro.css";

const ViewOrder = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editedStatus, setEditedStatus] = useState(null);
  // State để hiển thị modal chi tiết đơn hàng
  const [showOrderDetailModal, setShowOrderDetailModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const statusOptions = [
    { value: 0, label: "Đang xử lý" },
    { value: 1, label: "Đang giao" },
    { value: 2, label: "Hoàn tất" },
    { value: -1, label: "Bị hủy" },
    { value: 3, label: "Đổi trả" },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrder();
        setOrders(data);
      } catch (error) {
        console.error("Lỗi lấy đơn hàng:", error);
      }
    };
    fetchOrders();
  });

  // Callback mở modal chi tiết khi nhấn vào mã đơn hàng
  const handleViewDetail = (orderId) => {
    setSelectedOrderId(orderId);
    setShowOrderDetailModal(true);
  };

  const closeOrderDetailModal = () => {
    setShowOrderDetailModal(false);
    setSelectedOrderId(null);
  };

  // Hàm xử lý trình inline edit trạng thái (nếu cần)
  const handleEditClick = (order) => {
    setEditingOrderId(order._id);
    setEditedStatus(order.status);
  };

  const handleStatusChange = async (e, orderId) => {
    const newStatus = Number(e.target.value);
    setEditedStatus(newStatus);
    try {
      const updatedOrder = await updateOrder(orderId, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? updatedOrder.order : order
        )
      );
      setEditingOrderId(null);
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
      alert("Có lỗi khi cập nhật trạng thái đơn hàng.");
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await deleteOrder(orderId);
      alert("Đơn hàng đã được xóa");
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      alert("Xóa đơn hàng thất bại");
      console.error("Lỗi xóa đơn hàng:", error);
    }
  };

  return (
    <div className="admin-product">
      <div className="admin-product__action">
        <span className="admin-product__category-title">
          Đơn hàng: {orders.length} đơn hàng
        </span>
      </div>
      <table className="admin-product__table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã đơn hàng</th>
            <th>Khách hàng</th>
            <th>Số lượng</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleViewDetail(order._id);
                    }}
                    className="order-id"
                  >
                    {order._id}
                  </a>
                </td>
                <td>{order.userId && order.userId.name}</td>
                <td>{order.quantity}</td>
                <td>
                  {order.total &&
                    order.total.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                </td>
                <td>
                  {editingOrderId === order._id ? (
                    <select
                      value={editedStatus}
                      onChange={(e) => handleStatusChange(e, order._id)}
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    statusOptions.find(
                      (opt) => String(opt.value) === String(order.status)
                    )?.label || "Khác"
                  )}
                </td>
                <td>{new Date(order.date).toLocaleString("vi-VN")}</td>
                <td>
                  <button
                    onClick={() => handleEditClick(order)}
                    className="fix"
                    style={{ marginRight: "5px" }}
                  >
                    <i className="bi bi-pen"></i>
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này không?")) {
                        handleDelete(order._id);
                      }
                    }}
                    className="trash"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Đang tải đơn hàng...</td>
            </tr>
          )}
        </tbody>
      </table>
      
      {/* Modal hiển thị chi tiết đơn hàng */}
      {showOrderDetailModal && selectedOrderId && (
        <ViewOrderDetail orderId={selectedOrderId} onClose={closeOrderDetailModal} />
      )}
    </div>
  );
};

export default ViewOrder;
