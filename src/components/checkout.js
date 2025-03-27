import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllAddresses } from "../api/server";
import { createVNPAYPaymentIntent } from "../api/server"; // Module API bạn đã tạo cho thanh toán
import { useCart } from "../components/context/cartContext"; // Đường dẫn thay đổi theo project của bạn
import "../asset/css/checkout.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderItems, totalQuantity, totalPrice } = location.state || {};
  const { checkout } = useCart();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await getAllAddresses();
        const allAddresses = res.addresses || res;
        const storedUser = sessionStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;
        if (user) {
          const userAddresses = allAddresses.filter(
            (addr) => String(addr.userId) === String(user._id)
          );
          setAddresses(userAddresses);
          if (userAddresses.length > 0) {
            const defaultAddress = userAddresses.find((addr) => addr.default === true);
            setSelectedAddressId(defaultAddress ? defaultAddress._id : userAddresses[0]._id);
          }
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, []);

  const handleAddressChange = (e) => {
    setSelectedAddressId(e.target.value);
  };

  const hasOrderData = orderItems && orderItems.length > 0;

  // Hàm xử lý thanh toán online (VNPay)
  const handleOnlinePayment = async () => {
    try {
      const storedUser = sessionStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;
      if (!user) {
        alert("Bạn cần đăng nhập!");
        return;
      }
      if (!selectedAddressId || selectedAddressId.trim() === "") {
        alert("Vui lòng chọn địa chỉ giao hàng!");
        return;
      }
      // Gọi checkout để tạo order từ toàn bộ giỏ hàng
      const orderId = await checkout(user._id, selectedAddressId);
      if (!orderId) {
        alert("Đơn hàng không được tạo!");
        return;
      }
      // Payload cho Payment Intent của VNPay
      const payload = {
        orderId, // sử dụng orderId đã tạo
        amount: totalPrice, // Số tiền từ trang checkout. Bạn nên đảm bảo dùng số tiền tính từ đơn hàng mới tạo nếu cần
        orderInfo: "Thanh toán đơn hàng tại Shop",
      };
      const data = await createVNPAYPaymentIntent(payload);
      if (data && data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        alert("Không thể tạo thanh toán. Vui lòng thử lại sau!");
      }
    } catch (error) {
      console.error("Lỗi khi tạo thanh toán online:", error);
      alert("Có lỗi xảy ra khi tạo thanh toán online!");
    }
  };

  // Hàm xử lý thanh toán tiền mặt
  const handleCashPayment = () => {
    alert("Bạn đã chọn thanh toán khi nhận hàng. Đơn hàng của bạn sẽ được giao và thanh toán khi nhận hàng.");
    navigate("/order-success");
  };

  const handlePayment = () => {
    if (selectedPaymentMethod === "vnpay") {
      handleOnlinePayment();
    } else {
      handleCashPayment();
    }
  };

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

      {!hasOrderData ? (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h3>Không có thông tin đơn hàng</h3>
          <button className="btn btn-primary" onClick={() => navigate("/cart")}>
            Quay lại giỏ hàng
          </button>
        </div>
      ) : (
        <main className="checkout-session">
          <div className="checkout-container" style={{ fontSize: "1.4rem", textAlign: "left" }}>
            <h4>Thanh toán</h4>
          </div>
          <div className="checkout-container">
            <div className="row">
              {/* Cột sản phẩm và lựa chọn phương thức thanh toán */}
              <div className="col-md-8 order-md-1 col-12">
                {/* Hiển thị danh sách sản phẩm trong đơn hàng */}
                <div className="container-box">
                  <div className="border-box">
                    <span>
                      <i className="bi bi-box-seam-fill" style={{ marginRight: 10 }}></i>
                      Các sản phẩm của bạn
                    </span>
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
                {/* Phương thức thanh toán */}
                <div className="paymen">
                  <div className="payment-box">
                    <div className="pttt">Phương thức thanh toán</div>
                    <div className="d-flex gap-3 pb-4">
                      <input
                        type="radio"
                        name="pay"
                        id="cash"
                        checked={selectedPaymentMethod === "cash"}
                        onChange={() => setSelectedPaymentMethod("cash")}
                      />
                      <label htmlFor="cash" className="d-flex gap-1" style={{ alignItems: "center" }}>
                        <i className="bi bi-cash-coin"></i> Thanh toán khi nhận hàng
                      </label>
                    </div>
                    <div className="d-flex gap-3 pb-2">
                      <input
                        type="radio"
                        name="pay"
                        id="vnpay"
                        checked={selectedPaymentMethod === "vnpay"}
                        onChange={() => setSelectedPaymentMethod("vnpay")}
                      />
                      <label htmlFor="vnpay" className="d-flex gap-1" style={{ alignItems: "center" }}>
                        <i className="bi bi-credit-card-2-back"></i> Thanh toán bằng thẻ
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* Cột địa chỉ giao hàng và tóm tắt đơn hàng */}
              <div className="col-md-4 order-md-2 col-12">
                <div className="container-box">
                  <div className="dc">
                    <div className="shipping-address">
                      <div>Địa chỉ giao hàng</div>
                      <div className="text-info">Thay đổi</div>
                    </div>
                    <hr />
                    {addresses && addresses.length > 0 ? (
                      addresses.map((addr) => (
                        <div
                          key={addr._id}
                          className="d-flex gap-2 align-items-start address"
                          style={{ marginLeft: "15px" }}
                        >
                          <input
                            type="radio"
                            name="address"
                            value={addr._id}
                            style={{ marginTop: "8px" }}
                            checked={selectedAddressId === addr._id}
                            onChange={handleAddressChange}
                          />
                          <label>
                            {addr.address_line || addr.street},{" "}
                            {addr.ward ? addr.ward + ", " : ""}
                            {addr.district ? addr.district + ", " : ""}
                            {addr.city || addr.province}
                          </label>
                        </div>
                      ))
                    ) : (
                      <div style={{ marginLeft: "15px" }}>Không có địa chỉ</div>
                    )}
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
                    <button className="thanhtoan mt-2" onClick={handlePayment}>
                      THANH TOÁN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Checkout;