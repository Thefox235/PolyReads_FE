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
  // State để lưu trữ orderDetails; nếu order không có, fetch từ API.
  const [orderDetails, setOrderDetails] = useState(order.orderDetails || []);
  const [loadingDetails, setLoadingDetails] = useState(false);
  // console.log(order);
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

  // Sử dụng orderDetails để xác định các sản phẩm cần đánh giá
  const productsToReview = orderDetails;

  // State lưu trữ dữ liệu đánh giá riêng cho từng sản phẩm:
  // key là productId, value là { rating, comment }
  const [reviewsData, setReviewsData] = useState({});

  // Khi danh sách sản phẩm thay đổi, khởi tạo dữ liệu đánh giá mặc định (rating mặc định 5, comment = "")
  useEffect(() => {
    if (productsToReview && productsToReview.length > 0) {
      const newReviews = {};
      productsToReview.forEach((detail) => {
        const prodId = detail?.productId?._id || detail.productId;
        if (prodId && !newReviews[prodId]) {
          newReviews[prodId] = { rating: 5, comment: "" };
        }
      });
      setReviewsData(newReviews);
    }
  }, [productsToReview]);

  const [submitting, setSubmitting] = useState(false);
  const currentUser = getCurrentUser();

  // Hàm xử lý cập nhật dữ liệu đánh giá cho từng sản phẩm
  const handleReviewChange = (prodId, field, value) => {
    setReviewsData((prev) => ({
      ...prev,
      [prodId]: { ...prev[prodId], [field]: value },
    }));
  };

  // Hàm gửi bình luận, lặp qua từng sản phẩm và gửi API riêng lẻ
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
      // Vòng lặp qua mỗi sản phẩm trong order
      for (const detail of productsToReview) {
        const prodId = detail?.productId?._id || detail.productId;
        if (!prodId) {
          console.warn("Không tìm thấy productId ở chi tiết:", detail);
          continue;
        }
        const review = reviewsData[prodId];
        if (!review) {
          console.warn("Không có dữ liệu đánh giá cho sản phẩm:", prodId);
          continue;
        }
        // Kiểm tra dữ liệu: comment phải có ít nhất 5 ký tự
        if (!review.comment || review.comment.trim().length < 5) {
          alert("Vui lòng nhập bình luận (ít nhất 5 ký tự) cho sản phẩm " + prodId);
          continue;
        }
        const payload = {
          userId: currentUser._id,
          orderId: order._id,            // Thêm orderId vào payload
          productId: prodId,
          content: review.comment.trim(),
          rating: Number(review.rating)
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
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-info text-white">
            <h5 className="modal-title">Đánh giá đơn hàng: {order._id}</h5>
            <button type="button" className="close text-white" onClick={onClose}>
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
                <p>Vui lòng đánh giá từng sản phẩm riêng biệt:</p>
                {productsToReview.map((detail) => {
                  const prodId = detail?.productId?._id || detail.productId;
                  // Giả sử các detail có chứa thông tin sản phẩm ở trường productId
                  return (
                    <div key={prodId} className="product-review-item">
                      <h6>
                        Sản phẩm:{" "}
                        {detail.productId?.name ||
                          "Tên sản phẩm chưa có (cần populate)"}
                      </h6>
                      <div className="form-group">
                        <label>Số sao:</label>
                        <select
                          className="form-control"
                          value={reviewsData[prodId]?.rating || 5}
                          onChange={(e) =>
                            handleReviewChange(prodId, "rating", e.target.value)
                          }
                        >
                          {[5, 4, 3, 2, 1].map((r) => (
                            <option key={r} value={r}>
                              {r} sao
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Bình luận:</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          value={reviewsData[prodId]?.comment || ""}
                          onChange={(e) =>
                            handleReviewChange(prodId, "comment", e.target.value)
                          }
                          placeholder="Nhập bình luận (từ 5 đến 500 ký tự)"
                          required
                          minLength={5}
                          maxLength={500}
                        ></textarea>
                      </div>
                      <hr />
                    </div>
                  );
                })}
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
                <button type="submit" className="btn btn-primary" disabled={submitting}>
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