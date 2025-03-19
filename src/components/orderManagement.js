import React, { useState, useEffect } from "react";
import { getUserOrder } from "../api/server";
const OrderManagement = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  // State activeTab, mặc định "all"
  const [activeTab, setActiveTab] = useState("all");

  // Mapping activeTab thành giá trị status
  const statusMapping = {
    processing: 0,
    shipping: 1,
    completed: 2,
    canceled: -1,
    returns: 3, // Nếu bạn dùng giá trị khác cho "Đổi trả", thay đổi tại đây
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrder(userId);
        // Giả sử API trả về { orders: [...] } và các order có trường userId là object { _id: ... }
        // Chuyển đổi cho dễ so sánh nếu cần
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
      : orders.filter((order) => String(order.status) === String(statusMapping[activeTab]));

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
        filteredOrders.map((order) => (
          <div className="order-item" key={order._id}>
            <img
              src={order.img || "https://via.placeholder.com/150"}
              alt={order.name}
              className="order-img"
            />
            <div className="order-info">
              <a href="#" className="order-id">
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
                <a href="#" className="review-link">
                  Đánh giá đơn hàng
                </a>
                <button className="btn buy-again">Mua lại</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Không có đơn hàng nào.</p>
      )}
    </div>
  );
};

export default OrderManagement;
