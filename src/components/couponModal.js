// CouponModal.jsx
import React from 'react';
import Modal from './model';

const CouponModal = ({ availableCoupons, onSelectCoupon, onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div className="coupon-modal">
        <h4>Chọn mã giảm giá</h4>
        {availableCoupons.length === 0 ? (
          <p>Không có coupon nào hợp lệ cho đơn hàng này.</p>
        ) : (
          <ul className="list-group">
            {availableCoupons.map((coupon) => (
              <li
                key={coupon._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{coupon.code}</strong>{" "}
                  {coupon.discountValue
                    ? `- Giảm ${coupon.discountValue.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}`
                    : `- Giảm ${coupon.discountPercentage}%`}
                </div>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => onSelectCoupon(coupon)}
                >
                  Chọn
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
};

export default CouponModal;