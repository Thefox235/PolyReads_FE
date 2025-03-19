import React, { useState, useEffect } from 'react';
import { getOrderDetail } from '../../api/server'; // Giả sử hàm này đã được định nghĩa trong API
import '../../asset/css/orderDetail.css'; // Tạo file CSS riêng cho modal chi tiết đơn hàng

const ViewOrderDetail = ({ orderId, onClose }) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await getOrderDetail(orderId);
        // Giả sử API trả về { orderDetails: [...] }
        setOrderDetails(data.orderDetails || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (orderId) fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="order-detail-modal">
        <div className="order-detail-modal-content">
          <p>Đang tải chi tiết đơn hàng...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-detail-modal">
        <div className="order-detail-modal-content">
          <button className="order-detail-close" onClick={onClose}>×</button>
          <p>Lỗi: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-detail-modal">
      <div className="order-detail-modal-content">
        <button className="order-detail-close" onClick={onClose}>×</button>
        <h2>Chi tiết đơn hàng: {orderId}</h2>
        {orderDetails.length > 0 ? (
          <ul className="order-detail-list">
            {orderDetails.map((item, index) => (
              <li className="order-detail-item" key={index}>
                <p>
                  <strong>Sản phẩm:</strong> {item.name ? item.name : item.productId}
                </p>
                <p>
                  <strong>Số lượng:</strong> {item.quantily}
                </p>
                <p>
                  <strong>Giá:</strong>{" "}
                  {item.price &&
                    Number(item.price).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                </p>
                <p>
                  <strong>Thành tiền:</strong>{" "}
                  {item.total &&
                    Number(item.total).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Không có chi tiết đơn hàng nào.</p>
        )}
      </div>
    </div>
  );
};

export default ViewOrderDetail;
