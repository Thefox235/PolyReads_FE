import React, { useState, useEffect } from "react";
import { getUserOrder, deleteOrder, updateOrder, createComment } from "../api/server";
import ViewOrderDetail from "./admin/viewOrder-detail"; // Modal hiển thị chi tiết đơn hàng (đã có)
import OrderReviewModal from "./OrderReviewModal"; // Modal hiển thị chi tiết đơn hàng (đã có)
// Component mới: OrderReviewModal (sẽ được định nghĩa dưới đây)

const OrderManagement = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  // State để hiển thị modal chi tiết đơn hàng
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetailModal, setShowOrderDetailModal] = useState(false);

  // State cho modal đánh giá đơn hàng
  const [selectedOrderForReview, setSelectedOrderForReview] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Mapping activeTab thành giá trị status
  const statusMapping = {
    processing: 0,
    shipping: 1,
    completed: 2,
    canceled: -1,
    returns: 3,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrder(userId);
        const ordersData = Array.isArray(data.orders) ? data.orders : [];
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (userId) fetchOrders();
  }, [userId]);

  // Lọc đơn hàng dựa trên activeTab
  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter(
          (order) =>
            String(order.status) === String(statusMapping[activeTab])
        );

  // Mở modal chi tiết đơn hàng
  const handleViewOrderDetail = (order) => {
    setSelectedOrder(order);
    setShowOrderDetailModal(true);
  };

  const closeOrderDetailModal = () => {
    setShowOrderDetailModal(false);
    setSelectedOrder(null);
  };

  // Mở modal đánh giá (chỉ hiển thị cho đơn hàng đã hoàn tất)
  const handleOpenReview = (order) => {
    setSelectedOrderForReview(order);
    setShowReviewModal(true);
  };

  const closeReviewModal = () => {
    setShowReviewModal(false);
    setSelectedOrderForReview(null);
  };

  // Các hàm xử lý sửa, xóa đơn hàng (nếu cần)
  const handleDelete = async (orderId) => {
    try {
      await deleteOrder(orderId);
      alert("Đơn hàng đã được xóa");
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      alert("Xóa đơn hàng thất bại");
      console.error("Lỗi xóa đơn hàng:", error);
    }
  };

  const handleStatusChange = async (e, orderId) => {
    const newStatus = Number(e.target.value);
    try {
      const updatedOrder = await updateOrder(orderId, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? updatedOrder.order : order
        )
      );
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
      alert("Có lỗi khi cập nhật trạng thái đơn hàng.");
    }
  };

  return (
    <div id="order-management">
      <h2>Quản lý đơn hàng</h2>
      {/* Các tab lọc đơn hàng */}
      <div className="order-summary">
        <span
          className={`tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
          data-target="all"
        >
          Tất cả
        </span>
        <span
          className={`tab ${activeTab === "processing" ? "active" : ""}`}
          onClick={() => setActiveTab("processing")}
          data-target="processing"
        >
          Đang xử lý
        </span>
        <span
          className={`tab ${activeTab === "shipping" ? "active" : ""}`}
          onClick={() => setActiveTab("shipping")}
          data-target="shipping"
        >
          Đang giao
        </span>
        <span
          className={`tab ${activeTab === "completed" ? "active" : ""}`}
          onClick={() => setActiveTab("completed")}
          data-target="completed"
        >
          Hoàn tất
        </span>
        <span
          className={`tab ${activeTab === "canceled" ? "active" : ""}`}
          onClick={() => setActiveTab("canceled")}
          data-target="canceled"
        >
          Bị hủy
        </span>
        <span
          className={`tab ${activeTab === "returns" ? "active" : ""}`}
          onClick={() => setActiveTab("returns")}
          data-target="returns"
        >
          Đổi trả
        </span>
      </div>

      {filteredOrders.length > 0 ? (
        filteredOrders.map((order, index) => (
          <div className="order-item" key={order._id}>
            <img
              src={order.img || "https://via.placeholder.com/150"}
              alt={order.name}
              className="order-img"
            />
            <div className="order-info">
              <a
                href="#"
                className="order-id"
                onClick={(e) => {
                  e.preventDefault();
                  handleViewOrderDetail(order);
                }}
              >
                {order._id}
              </a>
              <p className="order-title">{order.name}</p>
              <p className="order-date">
                {new Date(order.date).toLocaleString("vi-VN")}
              </p>
              <p className="order-total">
                Tổng tiền:{" "}
                <strong>
                  {order.total &&
                    order.total.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                </strong>
              </p>
              <div className="order-actions">
                {/* Hiển thị nút “Đánh giá” chỉ khi đơn hàng đã hoàn tất (status === 2) */}
                {String(order.status) === String(statusMapping.completed) && (
                  <a
                    href="#"
                    className="review-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleOpenReview(order);
                    }}
                  >
                    Đánh giá đơn hàng
                  </a>
                )}
                <button className="btn buy-again">Mua lại</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Không có đơn hàng nào.</p>
      )}

      {/* Modal chi tiết đơn hàng */}
      {showOrderDetailModal && selectedOrder && (
        <ViewOrderDetail
          orderId={selectedOrder._id}
          orderTotal={selectedOrder.total}
          onClose={closeOrderDetailModal}
        />
      )}

      {/* Modal đánh giá đơn hàng */}
      {showReviewModal && selectedOrderForReview && (
        <OrderReviewModal
          order={selectedOrderForReview}
          onClose={closeReviewModal}
        />
      )}
    </div>
  );
};

export default OrderManagement;