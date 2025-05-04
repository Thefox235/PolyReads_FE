// src/components/VoucherWallet.jsx
import React, { useState, useEffect } from "react";
import { getUserCoupons, getGlobalCoupons } from "../api/server";

const VoucherWallet = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoupons() {
      try {
        let userCoupons = [];
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
          const userId = JSON.parse(storedUser)._id;
          const resUser = await getUserCoupons(userId);
          console.log(resUser);
          userCoupons = resUser || [];
        }
        const resGlobal = await getGlobalCoupons();
        const globalCoupons = resGlobal.coupons || [];
        // Gộp voucher cá nhân và voucher chung lại với nhau
        const allCoupons = [...userCoupons, ...globalCoupons];
        setCoupons(allCoupons);
      } catch (error) {
        console.error("Lỗi khi lấy voucher:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCoupons();
  }, []);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div id="voucher-wallet">
      <h2 className="voucher-title">Ví Voucher</h2>
      <div className="voucher-container">
        {coupons.length > 0 ? (
          coupons.map((voucher) => (
            <div className="voucher-card" key={voucher._id}>
              <div className="voucher-icon">
                <i className="fa-solid fa-percent" />
              </div>
              <div className="voucher-content">
                <div className="voucher-details">
                  <h3>
                    {voucher.code} -{" "}
                    {voucher.discountValue
                      ? `Giảm ${Number(voucher.discountValue).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}`
                      : `Giảm ${voucher.discountPercentage}%`}
                  </h3>
                  <p>
                    {voucher.description ||
                      "Voucher áp dụng cho đơn hàng từ một mức nhất định hoặc sản phẩm cụ thể."}
                  </p>
                  <span className="voucher-expiry">
                    HSD:{" "}
                    <span className="date">
                      {new Date(voucher.validUntil).toLocaleDateString("vi-VN")}
                    </span>
                  </span>
                  <div className="voucher-code">
                    <i className="fa-solid fa-ticket" /> {voucher.code}
                  </div>
                </div>
                <div className="voucher-action">
                  <a href={`/coupon/${voucher._id}`} className="voucher-link">
                    Chi tiết
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Không có voucher nào.</p>
        )}
      </div>
    </div>
  );
};

export default VoucherWallet;