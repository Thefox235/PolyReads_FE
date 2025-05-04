import React, { useState, useEffect } from "react";
import "../asset/css/cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTrashCan, faRectangleList } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "./context/cartContext";
import { getDiscounts, getAllAddresses, createOrder, createOrderDetail } from "../api/server"; // API từ server
import { useNavigate } from "react-router-dom";
const Cart = () => {
  // Lấy thông tin user từ sessionStorage
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem("user");
    return stored ? JSON.parse(stored) : {};
  });
  // Lấy giỏ hàng và hàm xử lý từ context
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    removeFromCart,
    checkout, // hàm checkout từ CartContext đã được cập nhật để nhận (userId, addressId)
  } = useCart();
  const navigate = useNavigate();
  // State cho discount
  const [discount, setDiscount] = useState([]);
  // State cho danh sách địa chỉ
  const [addresses, setAddresses] = useState([]);
  // State để lưu ID của địa chỉ được chọn
  const [selectedAddressId, setSelectedAddressId] = useState("");
  // State cho trạng thái tick sản phẩm
  const [selectedItems, setSelectedItems] = useState({});
  // Khi cart thay đổi, khởi tạo selectedItems với tất cả false
  useEffect(() => {
    const selections = {};
    cart.forEach((item) => {
      // Giả sử mỗi item có thuộc tính product._id
      selections[item.product._id] = false;
    });
    setSelectedItems(selections);
  }, [cart]);
  // Lấy discount từ API
  useEffect(() => {
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
  // Lấy danh sách địa chỉ từ API
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await getAllAddresses();
        // Nếu API trả về { addresses: [...] } hoặc mảng trực tiếp
        setAddresses(response.addresses || response);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, []);
  // Khi danh sách địa chỉ hoặc user cập nhật, tự động chọn địa chỉ của user (địa chỉ mặc định nếu có)
  useEffect(() => {
    if (addresses.length > 0 && user._id) {
      const userAddresses = addresses.filter(
        (addr) => String(addr.userId) === String(user._id)
      );
      if (userAddresses.length > 0) {
        const defaultAddress = userAddresses.find((addr) => addr.default === true);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress._id);
        } else {
          setSelectedAddressId(userAddresses[0]._id);
        }
      }
    }
  }, [addresses, user._id]);
  // Tính tổng số sản phẩm trong giỏ (không liên quan đến tick)
  const numbercart = cart.reduce(
    (total, item) => total + item.cartQuantity,
    0
  );
  // Tính tổng tiền cho các sản phẩm được tick, sử dụng giá sau giảm nếu có discount
  const selectedTotal = cart.reduce((acc, item) => {
    if (selectedItems[item.product._id]) {
      const prod = item.product;
      const productDiscount = discount.find(
        (dis) => dis && dis._id === prod.discount
      );
      const discountPercent = productDiscount ? Number(productDiscount.value) : 0;
      const currentPrice = Number(prod.price) * ((100 - discountPercent) / 100);
      return acc + currentPrice * item.cartQuantity;
    }
    return acc;
  }, 0);
  // Tính số lượng sản phẩm được tick
  const selectedCount = cart.reduce(
    (acc, item) => (selectedItems[item.product._id] ? acc + item.cartQuantity : acc),
    0
  );
  // Kiểm tra xem tất cả sản phẩm có được tick hay không
  const allSelected =
    cart.length > 0 && cart.every((item) => selectedItems[item.product._id]);
  // Hàm xử lý tick cho từng sản phẩm
  const handleSelectItem = (productId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };
  // Hàm chọn tất cả/bỏ chọn tất cả
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
  // Hàm xử lý thanh toán (sửa lại)
const handleCheckout = () => {
  if (selectedCount === 0) {
    alert("Vui lòng tick chọn sản phẩm bạn muốn mua!");
    return;
  }

  // Lấy các sản phẩm được tick chọn từ cart
  const checkedItems = cart.filter((item) => selectedItems[item.product._id]);

  // Xây dựng danh sách order items dựa trên dữ liệu từ giỏ hàng
  const orderItems = checkedItems.map((item) => {
    const prod = item.product;
    const productDiscount = discount.find(
      (dis) => dis && dis._id === prod.discount
    );
    const discountPercent = productDiscount ? Number(productDiscount.value) : 0;
    // Tính giá sau discount
    const currentPrice = Number(prod.price) * ((100 - discountPercent) / 100);
    return {
      productId: prod._id,
      quantily: item.cartQuantity || 1, // Sử dụng "quantily" theo schema của Order Detail
      price: currentPrice,
      total: currentPrice * (item.cartQuantity || 1),
      name: prod.name,
      img: item.img,
    };
  });

  // Tính tổng số lượng và tổng tiền từ danh sách orderItems
  const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantily, 0);
  const totalPrice = orderItems.reduce((sum, item) => sum + item.total, 0);  

  // Xây dựng đối tượng chứa thông tin thanh toán cần chuyển sang trang Checkout
  const checkoutData = {
    orderItems,        // Danh sách sản phẩm (đã tick) trong giỏ hàng
    totalQuantity,     // Tổng số lượng sản phẩm
    totalPrice,        // Tổng tiền
    selectedAddressId, // Địa chỉ giao hàng được chọn
    checkedItems
    // Bạn có thể bổ sung thêm dữ liệu như thông tin user nếu cần
  };

  // Chuyển hướng sang trang Checkout, chuyển dữ liệu qua state
  navigate("/checkout", { state: checkoutData });
};

  return (
    <>
      <section className="banner">
        <div className="banner-overlay">
          <h1>Giỏ hàng</h1>
          <p style={{ fontSize: 20, fontWeight: 400 }}>
            <a href="/">Trang chủ</a> &gt; Giỏ hàng
          </p>
        </div>
      </section>

      <div className="container mt-5 mb-5 cart-container">
        <h4 className="heading-cart">
          GIỎ HÀNG ({numbercart} sản phẩm) - Đã chọn {selectedCount} sản phẩm
        </h4>
        <div className="row">
          <div className="col-lg-8">
            <div className="cart-row">
              <div className="cart-header mb-2">

                <div className="cart-header-item">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                  />{" "}
                  <span className="ms-2">
                    Chọn tất cả ({cart.length} sản phẩm)
                  </span>
                </div>

                <div className="cart-header-item">Số lượng</div>
                <div className="cart-header-item">Thành tiền</div>
              </div>
              
              {/* Hiển thị các sản phẩm trong giỏ hàng */}
              {cart && cart.length > 0 ? (
                cart.map((item) => {
                  const prod = item.product;
                  const productDiscount = discount.find(
                    (dis) => dis && dis._id === prod.discount
                  );
                  const discountPercent = productDiscount ? Number(productDiscount.value) : 0;
                  const currentPrice = Number(prod.price) * ((100 - discountPercent) / 100);
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
                          <span className="discount-price">
                            {currentPrice.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                          <span className="original-price">
                            {Number(prod.price).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </p>
                      </div>
                      <div className="quantity">
                        <button onClick={() => decreaseQuantity(prod._id)}>-</button>
                        <input
                          type="number"
                          value={item.cartQuantity}
                          min={1}
                          readOnly
                        />
                        <button onClick={() => increaseQuantity(prod._id)}>+</button>
                      </div>
                      <span className="cart-price">
                        {(currentPrice * item.cartQuantity).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                      <button
                        className="delete-btn"
                        onClick={() => removeFromCart(prod._id)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  );
                })
              ) : (
                <div>Giỏ hàng trống</div>
              )}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="promo-section">
              <div className="title-promotion">
                <h4>
                  <FontAwesomeIcon icon={faRectangleList} /> Khuyến mãi
                </h4>
                <span>
                  Xem thêm <FontAwesomeIcon icon={faChevronRight} />
                </span>
              </div>
              <div className="title-discount">
                <h5 className="text-uppercase fw-bold">
                  Mã giảm 50k - toàn sàn
                </h5>
                <span className="text-decoration-underline">
                  <a href="#">Chi tiết</a>
                </span>
              </div>
              <p>
                Đơn hàng từ 550k - Xem chi tiết để biết thêm về thể lệ chương trình
              </p>
              <div className="progress-container">
                <div className="row align-items-center">
                  <div className="col-9">
                    {/* <div className="progress">
                      <div className="progress-bar" style={{ width: "80%" }} />
                    </div> */}
                    {/* <div className="progress-info d-flex justify-content-between mt-2">
                      <span>Mua thêm 115,000đ để nhận mã </span>
                      <span>550,000đ</span>
                    </div> */}
                  </div>
                  {/* <div className="col-3 text-end">
                    <button className="btn btn-primary btn-sm w-100">
                      Mua Thêm
                    </button>
                  </div> */}
                </div>
              </div>
              <div className="line" />
              {/* <div className="title-discount discount">
                <p>6 khuyến mãi đủ điều kiện</p>
                <FontAwesomeIcon icon={faChevronRight} />
              </div> */}
              <p className="mt-1">Có thể áp dụng đồng thời nhiều khuyến mãi</p>
            </div>
            <div className="total-section mt-2">
              <div className="d-flex justify-content-between align-items-center">
                <p>Thành tiền</p>
                <span>
                  {selectedTotal.toLocaleString("vi-VN", {
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
                <span>
                  {selectedTotal.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
              <div>
                <button className="btn btn-danger w-100 mt-3" onClick={handleCheckout}>
                  <span className="fw-bold text-uppercase">Thanh Toán</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
