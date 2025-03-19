import React, { useState, useEffect } from "react";
import { useCart } from "./context/cartContext";
import { useNavigate } from "react-router-dom";
import { createOrder, getDiscounts, createOrderDetail, getAllAddresses } from "../api/server"; // API cho Order và Discount


const Checkout = () => {
  const {
    cart,
    checkout,
    selectedItems,
    setSelectedItems,
  } = useCart();

  const navigate = useNavigate();
  const [discount, setDiscount] = useState([]);
  useEffect(() => {
    // Khi cart thay đổi, khởi tạo selectedItems với tất cả false
    const selections = {};
    cart.forEach((item) => {
      // Giả sử product có trường _id
      selections[item.product._id] = false;
    });
    setSelectedItems(selections);

    // Lấy mã giảm giá từ API
    const fetchDiscounts = async () => {
      try {
        const discountData = await getDiscounts();
        setDiscount(discountData);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy mã giảm giá:", error);
      }
    };
    fetchDiscounts();
  }, [cart]);

  // Lấy thông tin user từ sessionStorage
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem("user");
    return stored ? JSON.parse(stored) : {};
  });

  // Lấy danh sách địa chỉ giao hàng của user
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  useEffect(() => {
    // Ví dụ dùng fetch; thay bằng axios nếu cần
    const fetchAddresses = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/address`);
        const data = await response.json();
        // Giả sử API trả về { addresses: [ ... ] }
        setAddresses(data.addresses || []);
      } catch (error) {
        console.error("Lỗi khi lấy địa chỉ:", error);
      }
    };
    fetchAddresses();
  }, []);

  // Khi danh sách địa chỉ cập nhật, tự động chọn địa chỉ mặc định nếu có
  useEffect(() => {
    if (addresses.length > 0 && user._id) {
      const userAddresses = addresses.filter(
        (addr) => String(addr.userId) === String(user._id)
      );
      if (userAddresses.length > 0) {
        const defaultAddress = userAddresses.find((addr) => addr.default);
        // Nếu có địa chỉ mặc định, chọn nó; nếu không, chọn địa chỉ đầu tiên
        setSelectedAddressId(defaultAddress ? defaultAddress._id : userAddresses[0]._id);
      }
    }
  }, [addresses, user._id]);

  // Nếu bạn muốn cho phép người dùng thay đổi địa chỉ giao hàng, bạn có thể tạo giao diện
  // chọn địa chỉ dưới dạng radio button (ví dụ bên dưới):
  const renderAddressSelector = () => {
    const userAddresses = addresses.filter(
      (addr) => String(addr.userId) === String(user._id)
    );
    if (userAddresses.length === 0) {
      return <p>Chưa có địa chỉ giao hàng. Vui lòng tạo địa chỉ mới.</p>;
    }
    return (
      <div className="address-selector">
        <h3>Chọn địa chỉ giao hàng</h3>
        {userAddresses.map((addr) => (
          <label key={addr._id} className="address-radio">
            <input
              type="radio"
              name="address"
              value={addr._id}
              checked={selectedAddressId === addr._id}
              onChange={() => setSelectedAddressId(addr._id)}
            />
            {addr.address_line}, {addr.ward}, {addr.district}, {addr.province}{" "}
            {addr.default && <strong>(Mặc định)</strong>}
          </label>
        ))}
      </div>
    );
  };

  // Tính toán thông tin đơn hàng từ cart (chỉ sử dụng các sản phẩm được chọn theo selectedItems)
  const numbercart = cart.reduce(
    (total, item) => total + item.cartQuantity,
    0
  );

  // Tính tổng tiền cho các sản phẩm tick
  const selectedTotal = cart.reduce((acc, item) => {
    if (selectedItems[item.product._id]) {
      const prod = item.product;
      // Tìm discount nếu có
      const productDiscount = typeof prod.discount !== "undefined"
        ? discount.find((dis) => dis && dis._id === prod.discount)
        : null;
      const discountPercent = productDiscount ? Number(productDiscount.value) : 0;
      const currentPrice = Number(prod.price) * ((100 - discountPercent) / 100);
      return acc + currentPrice * item.cartQuantity;
    }
    return acc;
  }, 0);

  // Tính số lượng sản phẩm được tick
  const selectedCount = cart.reduce(
    (acc, item) =>
      selectedItems[item.product._id] ? acc + item.cartQuantity : acc,
    0
  );

  const allSelected =
    cart.length > 0 &&
    cart.every((item) => selectedItems[item.product._id]);

  const handleSelectItem = (productId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleSelectAll = () => {
    if (allSelected) {
      const newSelections = {};
      cart.forEach((item) => {
        newSelections[item.product._id] = false;
      });
      setSelectedItems(newSelections);
    } else {
      const newSelections = {};
      cart.forEach((item) => {
        newSelections[item.product._id] = true;
      });
      setSelectedItems(newSelections);
    }
  };

  // Hàm xử lý thanh toán: tạo Order và Order Detail sau khi kiểm tra chọn sản phẩm, và chọn địa chỉ giao hàng
  const handleCheckout = async () => {
    if (selectedCount === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
      return;
    }
    if (!selectedAddressId || selectedAddressId.trim() === "") {
      alert("Vui lòng chọn địa chỉ giao hàng!");
      return;
    }
    try {
      // Tính tổng số lượng và tổng tiền cho các sản phẩm tick chọn
      const checkedItems = cart.filter((item) => selectedItems[item.product._id]);
      const totalQuantity = checkedItems.reduce(
        (sum, item) => sum + item.cartQuantity,
        0
      );
      const totalPrice = checkedItems.reduce(
        (sum, item) => sum + item.price * item.cartQuantity,
        0
      );

      // Xây dựng danh sách Order Items
      const orderItems = checkedItems.map((item) => {
        const prod = item.product;
        return {
          productId: prod._id,
          quantily: item.cartQuantity, // Lưu ý: sử dụng "quantily" theo schema của Order Detail
          price: item.price,
          total: item.price * item.cartQuantity,
        };
      });

      // Payload cho Order
      const orderPayload = {
        userId: user._id,
        addressId: selectedAddressId, // Thêm địa chỉ giao hàng
        name: "Đơn hàng của khách hàng",
        quantity: totalQuantity,
        img: checkedItems[0]?.img || "",
        price: totalPrice,
        total: totalPrice,
        status: 0,
        payment_status: 0,
      };

      const orderRes = await checkout(user._id, selectedAddressId);
      
      // Nếu hàm checkout trong CartContext tự xử lý tạo Order và Order Detail,
      // thì phần này không cần gọi lại, nhưng nếu bạn muốn làm riêng:
      //
      // const orderRes = await createOrder(orderPayload);
      // const orderId = orderRes.order._id;
      // const orderDetailPayload = {
      //   orderId,
      //   items: orderItems.map((item) => ({ ...item, orderId })),
      // };
      // await createOrderDetail(orderDetailPayload);
      // clearCart();
      // alert("Đơn hàng được tạo thành công với Order ID: " + orderId);
      // navigate(`/order/${orderId}`);
      
    } catch (error) {
      console.error("Lỗi tạo đơn hàng:", error);
      alert("Có lỗi xảy ra khi tạo đơn hàng");
    }
  };

  return (
    <>
      <section className="banner">
        <div className="banner-overlay">
          <h1>Thanh Toán</h1>
          <p style={{ fontSize: 20, fontWeight: 400 }}>
            <a href="/">Trang chủ</a> &gt; Thanh Toán
          </p>
        </div>
      </section>
      <div className="container mt-5 mb-5 cart-container">
      
        <div className="row">
          <div className="col-lg-8">
            {/* Phần xem lại đơn hàng: hiển thị danh sách sản phẩm từ cart */}
            <div className="cart-row">

              {cart && cart.length > 0 ? (
                cart.map((item) => {
                  const prod = item.product;
                  return (
                    <div className="cart-item" key={prod._id}>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={!!selectedItems[prod._id]}
                        onChange={() => handleSelectItem(prod._id)}
                      />
                      <img src={item.img} alt={prod.name} className="cart-img" />
                      <div className="cart-info">
                        <h6 className="book-title">{prod.name}</h6>
                        <p className="price">
                          {Number(prod.price).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </div>
                      <div className="quantity">

                        <input
                          type="number"
                          value={item.cartQuantity}
                          min={1}
                          readOnly
                        />
       
                      </div>
                      <span className="cart-price">
                        {(prod.price * item.cartQuantity).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div>Giỏ hàng trống</div>
              )}
            </div>
          </div>
          <div className="col-lg-4">
            {/* Phần xem trước khuyến mãi, tổng tiền… */}
            <div className="promo-section">
              <div className="title-promotion">
                <h4>Khuyến mãi</h4>
                <span>
                  Xem thêm
                </span>
              </div>
              {/* Giả sử hiển thị thông tin khuyến mãi */}
              <div className="title-discount">
                <h5 className="text-uppercase fw-bold">Mã giảm 50k - toàn sàn</h5>
                <span className="text-decoration-underline">
                  <a href="#">Chi tiết</a>
                </span>
              </div>
              <p>Đơn hàng từ 550k - Xem chi tiết để biết thêm</p>
              {/* Progress Bar */}
            </div>
            <div className="total-section mt-2">
              <div className="d-flex justify-content-between align-items-center">
                <p>Tạm tính</p>
                <span>
                  {cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
              <div className="line-total" />
              <div className="d-flex justify-content-between align-items-center total-footer">
                <p><strong>Tổng Số Tiền (gồm VAT)</strong></p>
                <span>
                  {selectedTotal.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
              {/* Phần chọn địa chỉ giao hàng */}
              <div className="shipping-address mt-3">
                <h4>Địa chỉ giao hàng</h4>
                {addresses.length > 0 ? (
                  addresses
                    .filter((addr) => String(addr.userId) === String(user._id))
                    .map((addr) => (
                      <label key={addr._id} className="d-block mb-1">
                        <input
                          type="radio"
                          name="selectedAddress"
                          value={addr._id}
                          checked={selectedAddressId === addr._id}
                          onChange={() => setSelectedAddressId(addr._id)}
                        />{" "}
                        {addr.address_line}, {addr.ward}, {addr.district}, {addr.province}{" "}
                        {addr.default && <span>(Mặc định)</span>}
                      </label>
                    ))
                ) : (
                  <p>Chưa có địa chỉ nào. Vui lòng tạo địa chỉ.</p>
                )}
              </div>
              <button className="btn btn-danger w-100 mt-3" onClick={handleCheckout}>
                <span className="fw-bold text-uppercase">Thanh Toán</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
