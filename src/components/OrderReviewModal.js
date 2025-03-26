import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createComment, getOrderDetail } from "../api/server";

// Hàm helper để lấy user hiện tại (đảm bảo user đã đăng nhập)
const getCurrentUser = () => {
  try {
    return JSON.parse(sessionStorage.getItem("user"));
  } catch (error) {
    return null;
  }
};

const OrderReviewModal = ({ order, onClose }) => {
  // State để lưu trữ orderDetails được fetch nếu order không có chi tiết
  const [orderDetails, setOrderDetails] = useState(
    order.orderDetails || []
  );
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Nếu order.orderDetails không tồn tại, fetch từ API
  useEffect(() => {
    if (!order.orderDetails || order.orderDetails.length === 0) {
      const fetchDetails = async () => {
        setLoadingDetails(true);
        try {
          const data = await getOrderDetail(order._id);
          // Giả sử API trả về { orderDetails: [...] }
          setOrderDetails(data.orderDetails || []);
        } catch (error) {
          console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
        } finally {
          setLoadingDetails(false);
        }
      };
      fetchDetails();
    }
  }, [order]);

  // Sử dụng luôn orderDetails để đánh giá; không cần fallback vì nếu không có, chúng ta đã fetch ở trên.
  const productsToReview = orderDetails;

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const currentUser = getCurrentUser();

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Vui lòng đăng nhập để đánh giá!");
      return;
    }
    if (productsToReview.length === 0) {
      alert("Không tìm thấy thông tin chi tiết sản phẩm cho đơn hàng này!");
      return;
    }
    setSubmitting(true);
    try {
      // Gửi bình luận cho mỗi sản phẩm trong orderDetails
      for (const detail of productsToReview) {
        // Lấy product id từ detail; Nếu productId là object thì dùng _id, nếu không thì dùng luôn
        const prodId = detail?.productId?._id || detail.productId;
        if (!prodId) {
          console.warn("Không tìm thấy productId ở chi tiết:", detail);
          continue;
        }

        const payload = {
          userId: currentUser._id,
          productId: prodId,
          content: comment,
          rating: Number(rating),
        };
        console.log("Gửi payload:", payload);
        await createComment(payload);
      }
      alert("Đánh giá thành công!");
      onClose();
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
      alert("Có lỗi xảy ra khi gửi đánh giá");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header bg-info text-white">
            <h5 className="modal-title">
              Đánh giá đơn hàng: {order._id}
            </h5>
            <button
              type="button"
              className="close text-white"
              onClick={onClose}
            >
              <span>&times;</span>
            </button>
          </div>
          {loadingDetails ? (
            <div className="modal-body">
              <p>Đang tải chi tiết đơn hàng...</p>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit}>
              <div className="modal-body">
                <p>
                  Vui lòng đánh giá tất cả các sản phẩm trong đơn hàng với
                  cùng nội dung.
                </p>
                <div className="form-group">
                  <label htmlFor="rating">Số sao:</label>
                  <select
                    id="rating"
                    className="form-control"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>
                        {r} sao
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="comment">Bình luận:</label>
                  <textarea
                    id="comment"
                    className="form-control"
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Nhập bình luận (từ 5 đến 500 ký tự)"
                    required
                    minLength={5}
                    maxLength={500}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                  disabled={submitting}
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? "Đang gửi..." : "Gửi đánh giá"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

OrderReviewModal.propTypes = {
  order: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OrderReviewModal;