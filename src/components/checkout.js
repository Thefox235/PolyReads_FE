import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllAddresses, createVNPAYPaymentIntent, deleteAddress } from "../api/server";
import { useCart } from "../components/context/cartContext"; // Điều chỉnh đường dẫn theo project của bạn
import CreateAddress from "./admin/createAddress"; // Component tạo địa chỉ
import EditAddress from "./admin/editAddress";     // Component chỉnh sửa địa chỉ
import Modal from "./model"; // Component Modal
import "../asset/css/checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Lấy userId từ sessionStorage
  const userId = sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))._id
    : null;
  // Dữ liệu đơn hàng được chuyển qua location.state (ví dụ từ trang Cart)
  const orderData = location.state;
  const hasOrderData =
    orderData && orderData.orderItems && orderData.orderItems.length > 0;
  // Nếu có dữ liệu đơn hàng thì lấy danh sách sản phẩm và tổng tiền
  const orderItems = hasOrderData ? orderData.orderItems : [];
  const totalPrice = hasOrderData ? Math.round(orderData.totalPrice) : 0;

  // Lấy hàm checkout từ Cart Context (xử lý tạo đơn hàng, payment, cập nhật giỏ hàng, …)
  const { checkout } = useCart();

  // --- Quản lý địa chỉ giao hàng ---
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  // Các state và hàm điều khiển modal cho phần CRUD địa chỉ
  const [showCreateAddressModal, setShowCreateAddressModal] = useState(false);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Lấy danh sách địa chỉ từ API và tự động chọn địa chỉ mặc định (nếu có) hoặc chọn địa chỉ đầu tiên
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await getAllAddresses();
        // Nếu API trả về dạng { addresses: [...] } hoặc mảng trực tiếp
        const allAddresses = res.addresses || res;
        // Lọc ra các địa chỉ của user hiện tại (so sánh chuỗi)
        const userAddresses = allAddresses.filter(
          (addr) => String(addr.userId) === String(userId)
        );
        setAddresses(userAddresses);
        if (userAddresses.length > 0) {
          // Tìm địa chỉ mặc định (default === true), nếu có thì chọn nó, nếu không thì chọn địa chỉ đầu tiên
          const defaultAddress = userAddresses.find((addr) => addr.default === true);
          setSelectedAddressId(
            defaultAddress ? defaultAddress._id : userAddresses[0]._id
          );
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, [userId]);

  // --- Các hàm xử lý modal CRUD địa chỉ ---
  const handleAddAddress = () => {
    setShowCreateAddressModal(true);
  };

  const handleCloseCreateAddressModal = () => {
    setShowCreateAddressModal(false);
  };

  const handleCreateAddressSuccess = (newAddress) => {
    setAddresses((prev) => [...prev, newAddress]);
    // Nếu chưa có địa chỉ nào được chọn, cập nhật với địa chỉ mới tạo
    if (!selectedAddressId) {
      setSelectedAddressId(newAddress._id);
    }
    setShowCreateAddressModal(false);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowEditAddressModal(true);
  };

  const handleCloseEditAddressModal = () => {
    setShowEditAddressModal(false);
    setEditingAddress(null);
  };

  const handleEditAddressSuccess = (updatedAddress) => {
    setAddresses((prev) =>
      prev.map((addr) => (addr._id === updatedAddress._id ? updatedAddress : addr))
    );
    setShowEditAddressModal(false);
    setEditingAddress(null);
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này không?")) {
      try {
        await deleteAddress(addressId);
        setAddresses((prev) =>
          prev.filter((addr) => addr._id !== addressId)
        );
        alert("Xóa địa chỉ thành công!");
        // Nếu địa chỉ đang được chọn bị xóa, cập nhật lại selectedAddressId
        if (selectedAddressId === addressId && addresses.length > 0) {
          setSelectedAddressId(addresses[0]._id);
        }
      } catch (err) {
        console.error("Lỗi xóa địa chỉ:", err);
        alert("Có lỗi xảy ra khi xóa địa chỉ!");
      }
    }
  };

  // --- Xử lý phương thức thanh toán ---
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("vnpay");
  const handleChangePaymentMethod = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  // Hàm xử lý thanh toán online (VNPay)
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

      // Dữ liệu đơn hàng được chuyển qua location.state phải chứa cả trường checkedItems
      const orderData = location.state;
      if (!orderData || !orderData.checkedItems) {
        alert("Không có thông tin sản phẩm được chọn!");
        return;
      }

      // Gọi hàm checkout, truyền thêm checkedItems (danh sách các sản phẩm tick được chọn)
      const orderId = await checkout(
        user._id,
        selectedAddressId,
        orderData.checkedItems,
        "vnpay"  // hoặc selectedPaymentMethod nếu nó có giá trị "vnpay"
      );
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

      console.log("Payload gửi lên BE:", payload);
      const data = await createVNPAYPaymentIntent(payload);
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

  // Hàm xử lý thanh toán COD (thanh toán khi nhận hàng)
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
      const orderData = location.state;
      if (!orderData || !orderData.checkedItems) {
        alert("Không có thông tin sản phẩm được chọn!");
        return;
      }
      // Gọi hàm checkout với checkedItems
      const orderId = await checkout(
        user._id,
        selectedAddressId,
        orderData.checkedItems,
        "cash"  // hoặc selectedPaymentMethod nếu nó có giá trị "cash"
      );

      if (orderId) {
        alert("Đơn hàng được tạo thành công với mã đơn: " + orderId);
        navigate(`/account`);
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
              {/* Cột danh sách sản phẩm và phương thức thanh toán */}
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
                      <div className=""
                        style={{ color: '#007bff' }}
                        onClick={handleAddAddress}>
                        <i class="bi bi-plus-circle"></i> Địa chỉ
                      </div>
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
                          <label style={{ flex: 1 }}>
                            {addr.address_line || addr.street},{" "}
                            {addr.ward ? addr.ward + ", " : ""}
                            {addr.district ? addr.district + ", " : ""}
                            {addr.city || addr.province}
                          </label>
                          <button className="btn btn-link p-0" onClick={() => handleEditAddress(addr)}>
                            Sửa
                          </button>
                          <button
                            className="btn btn-link text-danger p-0"
                            onClick={() => handleDeleteAddress(addr._id)}
                          >
                            <i class="bi bi-trash"></i>
                          </button>
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

      {/* Modal cho CreateAddress */}
      {showCreateAddressModal && (
        <Modal onClose={handleCloseCreateAddressModal}>
          <CreateAddress
            userId={userId}
            onSubmit={handleCreateAddressSuccess}
            onClose={handleCloseCreateAddressModal}
          />
        </Modal>
      )}

      {/* Modal cho EditAddress */}
      {showEditAddressModal && editingAddress && (
        <Modal onClose={handleCloseEditAddressModal}>
          <EditAddress
            initialAddress={editingAddress}
            onSubmit={handleEditAddressSuccess}
            onClose={handleCloseEditAddressModal}
          />
        </Modal>
      )}
    </>
  );
};

export default Checkout;