import React, { useState, useEffect } from "react";
import "../asset/css/cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faTrashCan,
  faRectangleList,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "./context/cartContext";
import { createOrder, getDiscounts } from "../api/server"; // Các API của bạn
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    removeFromCart,
  } = useCart();
  
  // discount được lấy từ API discounts
  const [discount, setDiscount] = useState([]);
  const navigate = useNavigate();

  // selectedItems: lưu trạng thái tick của từng sản phẩm với key là product._id và value là true/false.
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    // Khi cart thay đổi, khởi tạo selectedItems với tất cả false
    const selections = {};
    cart.forEach((item) => {
      selections[item.product._id] = false;
    });
    setSelectedItems(selections);
    
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

  // Tính tổng số sản phẩm trong giỏ (không liên quan đến tick)
  const numbercart = cart.reduce(
    (total, item) => total + item.cartQuantity,
    0
  );

  // Tính tổng tiền của các sản phẩm được tick (sử dụng giá sau discount)
  const selectedTotal = cart.reduce((acc, item) => {
    if (selectedItems[item.product._id]) {
      const prod = item.product;
      // Tìm discount nếu có (so sánh ID discount của sản phẩm với các discount từ API)
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
  const selectedCount = cart.reduce((acc, item) => {
    return selectedItems[item.product._id] ? acc + item.cartQuantity : acc;
  }, 0);

  // Kiểm tra nếu tất cả sản phẩm đều được tick
  const allSelected =
    cart.length > 0 &&
    cart.every((item) => selectedItems[item.product._id]);

  // Hàm xử lý tick từng sản phẩm
  const handleSelectItem = (productId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Hàm chọn tất cả / bỏ chọn tất cả
  const handleSelectAll = () => {
    if (allSelected) {
      // Bỏ chọn tất cả
      const newSelections = {};
      cart.forEach((item) => {
        newSelections[item.product._id] = false;
      });
      setSelectedItems(newSelections);
    } else {
      // Chọn hết
      const newSelections = {};
      cart.forEach((item) => {
        newSelections[item.product._id] = true;
      });
      setSelectedItems(newSelections);
    }
  };

  // Hàm thanh toán, tạo order từ các sản phẩm được tick
  const handleCheckout = async () => {
    // Kiểm tra xem có sản phẩm nào được tick không
    if (selectedCount === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
      return;
    }
    try {
      const orderData = {
        name: "Đơn hàng của khách hàng",
        quantity: selectedCount,
        // Dùng ảnh của sản phẩm đầu tiên được tick làm đại diện, nếu có
        img: cart.find((item) => selectedItems[item.product._id])?.img || "",
        price: selectedTotal,
        status: 0,
        payment_status: 0,
        total: selectedTotal,
      };

      // Gọi API tạo order
      const result = await createOrder(orderData);
      alert("Đơn hàng được tạo thành công!");
      clearCart();
      navigate(`/order/${result.order._id}`);
    } catch (error) {
      console.error("Lỗi tạo đơn hàng:", error);
      alert("Có lỗi xảy ra khi tạo đơn hàng");
    }
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
                cart.map((item, index) => {
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
                    <div className="progress">
                      <div className="progress-bar" style={{ width: "80%" }} />
                    </div>
                    <div className="progress-info d-flex justify-content-between mt-2">
                      <span>Mua thêm 115,000đ để nhận mã </span>
                      <span>550,000đ</span>
                    </div>
                  </div>
                  <div className="col-3 text-end">
                    <button className="btn btn-primary btn-sm w-100">Mua Thêm</button>
                  </div>
                </div>
              </div>
              <div className="line" />
              <div className="title-discount discount">
                <p>6 khuyến mãi đủ điều kiện</p>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
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
                <button
                  className="btn btn-danger w-100 mt-3"
                  onClick={handleCheckout}
                >
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
