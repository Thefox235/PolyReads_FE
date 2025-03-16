import React, { useEffect, useState } from "react";
import "../asset/css/cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faTrashCan,
  faRectangleList,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "./context/cartContext";

// Hàm changeQuantity chỉ là dummy để tránh lỗi, bạn có thể thay bằng logic cụ thể của bạn.
const changeQuantity = (delta) => {
  console.log("Change quantity by", delta);
};
// localStorage.clear();
const Cart = () => {

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    removeFromCart,
  } = useCart();
  const [product, setProduct] = useState();
  useEffect(() => {
    const items = cart.length ? cart.map((item) => item.product || {}) : [];
    setProduct(items);
  }, [cart]);

  const numbercart = cart.reduce((total, item) => total + item.cartQuantity, 0);
  const total = cart.reduce(
    (total, item) => total + item.cartQuantity * item.product.price,
    0
  );
  const cartItem = localStorage.getItem("cart");
  console.log(cartItem);

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
        <h4 className="heading-cart">GIỎ HÀNG ({numbercart} SẢN PHẨM)</h4>
        <div className="row">
          <div className="col-lg-8">
            <div className="cart-row">
              <div className="cart-header mb-2">
                <div className="cart-header-item">
                  <input type="checkbox" />{" "}
                  <span className="ms-2">
                    Chọn tất cả ({numbercart} sản phẩm)
                  </span>
                </div>
                <div className="cart-header-item">Số lượng</div>
                <div className="cart-header-item">Thành tiền</div>
              </div>
              {/* Cart item */}
              {product &&
                product.map((item, index) => (
                  <div className="cart-item" key={item._id || `cart-item-${index}`}>
                    <input type="checkbox" className="checkbox" />
                    <img
                      src={cart[index]?.img}
                      alt="Sách 1"
                      className="cart-img"
                    />
                    <div className="cart-info">
                      <h6 className="book-title">{item.name}</h6>
                      <p className="price">
                        <span className="discount-price">{item.price}</span>
                        <span className="original-price">145,000₫</span>
                      </p>
                    </div>
                    <div className="quantity">
                      <button onClick={() => decreaseQuantity(item._id)}>
                        -
                      </button>
                      <input
                        type="number"
                        id="quantity"
                        value={cart[index]?.cartQuantity}
                        min={1}
                      />
                      <button onClick={() => increaseQuantity(item._id)}>
                        +
                      </button>
                    </div>
                    <span className="cart-price">
                      {(item.price * cart[index]?.cartQuantity).toLocaleString(
                        "vi-VN",
                        { style: "currency", currency: "VND" }
                      )}
                    </span>
                    <button
                      className="delete-btn"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                ))}
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
                Đơn hàng từ 550k - Xem chi tiết để biết thêm về thể lệ chương
                trình
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
                    <button className="btn btn-primary btn-sm w-100">
                      Mua Thêm
                    </button>
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
              <div className="d-flex justify-content-between align-items-center ">
                <p>Thành tiền</p>
                <span>
                  {total.toLocaleString("vi-VN", {
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
                  {total.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
              <div>
                <button className="btn btn-danger w-100 mt-3">
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
