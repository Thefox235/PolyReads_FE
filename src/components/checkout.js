import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../asset/css/checkout.css";

const Checkout = () => {
  // Lấy dữ liệu được chuyển từ trang Cart qua navigation state
  const location = useLocation();
  const navigate = useNavigate();

  // Giả sử dữ liệu được chuyển có cấu trúc như sau:
  // {
  //   orderItems: [{ productId, quantily, price, total, name, img }, ...],
  //   totalQuantity,
  //   totalPrice,
  //   selectedAddressId
  // }
  const { orderItems, totalQuantity, totalPrice, selectedAddressId } = location.state || {};

  // Nếu không có dữ liệu chuyển qua (vì user truy cập trực tiếp trang thanh toán),
  // bạn có thể chuyển hướng trở lại trang giỏ hàng hoặc hiển thị 1 thông báo
  if (!orderItems || orderItems.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h3>Không có thông tin đơn hàng</h3>
        <button className="btn btn-primary" onClick={() => navigate("/cart")}>
          Quay lại giỏ hàng
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Banner */}
      <section className="banner">
        <div className="banner-overlay">
          <h1>Thanh Toán</h1>
          <p style={{ fontSize: 20, fontWeight: 400 }}>
            <a href="/">Trang chủ</a> &gt; Thanh Toán
          </p>
        </div>
      </section>

      {/* Nội dung thanh toán */}
      <main className="checkout-session">
        <div className="checkout-container" style={{ fontSize: "1.4rem", textAlign: "left" }}>
          <h4>Thanh toán</h4>
        </div>
        <div className="checkout-container">
          <div className="row">
            {/* Cột sản phẩm và phương thức thanh toán */}
            <div className="col-md-8 order-md-1 col-12">
              <div className="container-box">
                <div className="border-box">
                  <span>
                    <i className="bi bi-box-seam-fill" style={{ marginRight: 10 }}></i>
                    Các sản phẩm của bạn
                  </span>
                  {/* Hiển thị danh sách sản phẩm (orderItems) */}
                  {orderItems.map((item) => (
                    <div className="item" key={item.productId}>
                      <div className="item-img">
                        <img src={item.img} alt={item.name} />
                      </div>

                      <div className="item-info">
                        <div className="item-title">{item.name}</div>
                        <div className="item-details">
                          <div>Số lượng: {item.quantily}</div>
                          <div className="price">
                            {item.total.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <br />
              <div className="paymen">
                <div className="payment-box">
                  <div className="pttt">Phương thức thanh toán</div>
                  <div className="d-flex gap-3 pb-4">
                    <input type="radio" name="pay" id="cash" defaultChecked />
                    <label htmlFor="cash" className="d-flex gap-1" style={{ alignItems: "center" }}>
                      <i className="bi bi-cash-coin"></i>
                      Thanh toán khi nhận hàng
                    </label>
                  </div>
                  <div className="d-flex gap-3 pb-2">
                    <input type="radio" name="pay" id="vnpay" />
                    <label htmlFor="vnpay" className="d-flex gap-1" style={{ alignItems: "center" }}>
                      <i className="bi bi-credit-card-2-back"></i>
                      Thanh toán bằng VNpay
                    </label>
                  </div>
                </div>


              </div>
            </div>

            {/* Cột thông tin đơn hàng và địa chỉ giao hàng */}
            <div className="col-md-4 order-md-2 col-12">
              <div className="container-box">
                <div className="dc">
                  <div className="shipping-address">
                    <div>Địa chỉ giao hàng</div>
                    <div className="text-info">Thay đổi</div>
                  </div>
                  <hr />
                  {/* Giả sử bạn sẽ hiển thị địa chỉ dựa trên selectedAddressId */}
                  <div className="d-flex gap-2 align-items-start address" style={{ marginLeft: "15px" }}>
                    <input type="radio" name="dc" id="address" style={{ marginTop: "8px" }} checked readOnly />
                    <label htmlFor="address">
                      {/* Đây là địa chỉ mẫu, bạn cần thay đổi để hiển thị địa chỉ của user dựa trên selectedAddressId */}
                      Số 1234, đường Nguyễn Văn Cừ, ấp Mỹ Long, xã Mỹ Phước Tây, huyện Cai Lậy, tỉnh Tiền Giang, Việt Nam.
                    </label>
                  </div>
                </div>
              </div>
              <br />
              <div className="container-box">
                <div className="d-flex justify-content-between align-items-center">
                  <span>Tạm tính</span>
                  <span>
                    {totalPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
                <div className="line-total" />
                <div className="d-flex justify-content-between align-items-center total-footer">
                  <p>
                    <strong>Tổng Số Tiền (gồm VAT)</strong>
                  </p>
                  <span className="text-danger">
                    {totalPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
                <div>
                  <button className="thanhtoan mt-2" onClick={() => alert("Xử lý thanh toán tiếp")}>
                    THANH TOÁN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Checkout;