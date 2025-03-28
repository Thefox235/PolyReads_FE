import React, { useState, useEffect } from 'react';
import { getAllOrder, deleteOrder, updateOrder } from '../../api/server';
import ViewOrderDetail from "./viewOrder-detail"; // Modal hiển thị chi tiết đơn hàng
import EditOrder from "./editOrder"; // Modal chỉnh sửa đơn hàng
import "../../asset/css/adminPro.css";

// Nếu bạn đã khai báo các statusOptions trong EditOrder, có thể định nghĩa lại tại đây nếu cần
const statusOptions = [
  { value: 0, label: "Đang xử lý" },
  { value: 1, label: "Đang giao" },
  { value: 2, label: "Hoàn tất" },
  { value: -1, label: "Bị hủy" },
  { value: 3, label: "Đổi trả" },
];

const ViewOrder = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(null);

  // State cho modal hiển thị chi tiết đơn hàng
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetailModal, setShowOrderDetailModal] = useState(false);

  // State cho modal chỉnh sửa đơn hàng (EditOrder)
  const [selectedEditOrder, setSelectedEditOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrder();
        setOrders(data);
      } catch (err) {
        console.error("Lỗi lấy đơn hàng:", err);
        setError("Lỗi lấy đơn hàng");
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, []);

  // Mở modal chi tiết đơn hàng
  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    setShowOrderDetailModal(true);
  };

  const closeOrderDetailModal = () => {
    setShowOrderDetailModal(false);
    setSelectedOrder(null);
  };

  // Mở modal chỉnh sửa đơn hàng (EditOrder)
  const handleEditOrder = (order) => {
    setSelectedEditOrder(order);
  };

  const closeEditOrderModal = () => {
    setSelectedEditOrder(null);
  };

  // Handler xóa đơn hàng
  const handleDelete = async (orderId) => {
    try {
      await deleteOrder(orderId);
      alert("Đơn hàng đã được xóa");
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (err) {
      alert("Xóa đơn hàng thất bại");
      console.error("Lỗi xóa đơn hàng:", err);
    }
  };

  // Callback khi cập nhật đơn hàng thành công ở modal EditOrder
  const onUpdateSuccess = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === updatedOrder._id ? updatedOrder : order
      )
    );
    closeEditOrderModal();
  };

  if (loadingOrders) {
    return <div>Đang tải đơn hàng...</div>;
  }

  return (
    <div className="admin-product">
      <div className="admin-product__action">
        <span className="admin-product__category-title">
          Đơn hàng: {orders.length} đơn hàng
        </span>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="admin-product__table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Khách Hàng</th>
            <th>Địa Chỉ</th>
            <th>Ngày Tạo Đơn</th>
            <th>Tổng Tiền</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>
                  {/* Nhấn vào mã đơn hàng để xem chi tiết */}
                  {/* <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleViewDetail(order);
                    }}
                    className="order-id"
                  >
                    {order._id}
                  </a> */}
                 {order.userId && order.userId.name}<br/>
                 Phone: {order.userId && order.userId.phone}
                </td>
                <td
                 style={{maxWidth: "250px"}}
                >{order.addressId && (order.addressId.address_line)+' '+(order.addressId.ward)+' '+(order.addressId.province)+' '+(order.addressId.district)}</td>
                <td>{new Date(order.date).toLocaleString("vi-VN")}</td>
                <td>
                  {order.total &&
                    order.total.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                </td>
                <td>
                  {
                    statusOptions.find(
                      (opt) => String(opt.value) === String(order.status)
                    )?.label || "Khác"
                  }
                </td>
      
                <td>
                  <button
                    onClick={() => handleEditOrder(order)}
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
              <td colSpan="7">Không có đơn hàng nào.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal chi tiết đơn hàng */}
      {showOrderDetailModal && selectedOrder && (
        <ViewOrderDetail
          orderId={selectedOrder._id}
          orderTotal={selectedOrder.total}
          onClose={closeOrderDetailModal}
        />
      )}

      {/* Modal chỉnh sửa đơn hàng */}
      {selectedEditOrder && (
        <EditOrder
          orderId={selectedEditOrder._id}
          onClose={closeEditOrderModal}
          onUpdateSuccess={onUpdateSuccess}
        />
      )}
    </div>
  );
};

export default ViewOrder;