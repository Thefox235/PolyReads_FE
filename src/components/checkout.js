import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllAddresses, createVNPAYPaymentIntent } from "../api/server";
import { useCart } from "../components/context/cartContext"; // Đường dẫn thay đổi theo project của bạn
import "../asset/css/checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Nếu bạn chuyển dữ liệu đơn hàng qua location state (ví dụ từ giỏ hàng)
  const userId = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user"))._id : null;
  const orderData = location.state;
  const hasOrderData =
    orderData && orderData.orderItems && orderData.orderItems.length > 0;
  // Nếu có đơn hàng, hiển thị danh sách sản phẩm và tổng tiền
  const orderItems = hasOrderData ? orderData.orderItems : [];
  const totalPrice = hasOrderData ? Math.round(orderData.totalPrice) : 0;

  const { checkout } = useCart();

  // Lấy danh sách địa chỉ từ API
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  // State cho phương thức thanh toán: "vnpay" (online) hoặc "cash" (COD)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("vnpay");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await getAllAddresses();
        // Giả sử API trả về dạng { addresses: [...] } hoặc mảng trực tiếp
        const allAddresses = res.addresses || res;
        const userAddresss = allAddresses.filter((addr) => addr.userId === userId);
        setAddresses(userAddresss);
        if (allAddresses.length > 0) {
          // Lấy địa chỉ mặc định nếu có, hoặc địa chỉ đầu tiên
          const defaultAddress = allAddresses.find((addr) => addr.default === true);
          setSelectedAddressId(
            defaultAddress ? defaultAddress._id : allAddresses[0]._id
          );
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  // Xử lý thay đổi phương thức thanh toán
  const handleChangePaymentMethod = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleOnlinePayment = async () => {
    try {
      // Lấy thông tin user từ sessionStorage
      const storedUser = sessionStorage.getItem("user");
      if (!storedUser) {
        alert("Bạn cần đăng nhập!");
        return;
      }
      const user = JSON.parse(storedUser);
  
      if (!selectedAddressId.trim()) {
        alert("Vui lòng chọn địa chỉ giao hàng!");
        return;
      }
  
      // Tạo đơn hàng qua hàm checkout
      const orderId = await checkout(user._id, selectedAddressId);
      if (!orderId) {
        alert("Đơn hàng không được tạo, vui lòng thử lại!");
        return;
      }
  
      // Tạo payload để gửi lên backend cho thanh toán VNPay
      const payload = {
        orderId,     
        amount: totalPrice,
        language: "vn",
        orderInfo: "Thanh toán đơn hàng tại Shop",
        bankCode: ""
      };
  
      // Log dữ liệu payload trước khi gửi để kiểm tra
      console.log("Payload gửi lên BE:", payload);
      
      // Gọi API createVNPAYPaymentIntent để post payload đến backend
      // const data = null;
      const data = await createVNPAYPaymentIntent(payload);
      
      // Log kết quả trả về từ backend
      console.log("Dữ liệu trả về từ BE:", data);
      
      if (data && data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        alert("Không thể tạo thanh toán online, vui lòng thử lại sau!");
      }
    } catch (error) {
      console.error("Lỗi khi thanh toán online:", error);
      alert("Có lỗi xảy ra khi thanh toán online, vui lòng kiểm tra console!");
    }
  };

  // Hàm thanh toán khi nhận hàng (COD)
  const handleCashPayment = async () => {
    try {
      const storedUser = sessionStorage.getItem("user");
      if (!storedUser) {
        alert("Bạn cần đăng nhập!");
        return;
      }
      const user = JSON.parse(storedUser);
      if (!selectedAddressId.trim()) {
        alert("Vui lòng chọn địa chỉ giao hàng!");
        return;
      }
      // Tạo đơn hàng trực tiếp qua hàm checkout
      const orderId = await checkout(user._id, selectedAddressId);
      if (orderId) {
        alert("Đơn hàng được tạo thành công với mã đơn: " + orderId);
        navigate(`/order/${orderId}`);
      } else {
        alert("Tạo đơn hàng thất bại, vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi khi thanh toán khi nhận hàng:", error);
      alert("Có lỗi xảy ra khi tạo đơn hàng, vui lòng kiểm tra console!");
    }
  };

  // Hàm xử lý khi nhấn nút thanh toán dựa theo phương thức đã chọn
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
          <div
            className="checkout-container"
            style={{ fontSize: "1.4rem", textAlign: "left" }}
          >
            <h4>Thanh toán</h4>
          </div>
          <div className="checkout-container">
            <div className="row">
              {/* Cột sản phẩm và lựa chọn phương thức thanh toán */}
              <div className="col-md-8 order-md-1 col-12">
                <div className="container-box">
                  <div className="border-box">
                    <span>
                      <i
                        className="bi bi-box-seam-fill"
                        style={{ marginRight: 10 }}
                      ></i>
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
                      <label
                        htmlFor="cash"
                        className="d-flex gap-1"
                        style={{ alignItems: "center" }}
                      >
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
                      <label
                        htmlFor="vnpay"
                        className="d-flex gap-1"
                        style={{ alignItems: "center" }}
                      >
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
                            onChange={(e) => setSelectedAddressId(e.target.value)}
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