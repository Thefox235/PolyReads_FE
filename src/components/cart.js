import React, { useState } from 'react';
import '../asset/css/cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faTrashCan, faRectangleList } from '@fortawesome/free-solid-svg-icons';

// Hàm changeQuantity chỉ là dummy để tránh lỗi, bạn có thể thay bằng logic cụ thể của bạn.
const changeQuantity = (delta) => {
  console.log("Change quantity by", delta);
};

const Cart = () => {
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
        <h4 className="heading-cart">GIỎ HÀNG (3 SẢN PHẨM)</h4>
        <div className="row">
          <div className="col-lg-8">
            <div className="cart-row">
              <div className="cart-header mb-2">
                <div className="cart-header-item">
                  <input type="checkbox" />{" "}
                  <span className="ms-2">Chọn tất cả (3 sản phẩm)</span>
                </div>
                <div className="cart-header-item">Số lượng</div>
                <div className="cart-header-item">Thành tiền</div>
              </div>
              {/* Cart item */}
              <div className="cart-item">
                <input type="checkbox" className="checkbox" />
                <img
                  src="https://upload.wikimedia.org/wikipedia/vi/9/97/Tantei_wa_M%C5%8D%2C_Shindeiru_b%C3%ACa_t%E1%BA%ADp_1.jpg"
                  alt="Sách 1"
                  className="cart-img"
                />
                <div className="cart-info">
                  <h6 className="book-title">
                    Sách Thám tử đã chết - Lẻ tập 1 2 3 4 5 6
                  </h6>
                  <p className="price">
                    <span className="discount-price">145,000₫</span>
                    <span className="original-price">145,000₫</span>
                  </p>
                </div>
                <div className="quantity">
                  <button onClick={() => changeQuantity(-1)}>-</button>
                  <input type="number" id="quantity" defaultValue={1} min={1} />
                  <button onClick={() => changeQuantity(1)}>+</button>
                </div>
                <span className="cart-price">145,000₫</span>
                <button className="delete-btn">
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
              {/* Cart item */}
              <div className="cart-item">
                <input type="checkbox" className="checkbox" />
                <img
                  src="https://upload.wikimedia.org/wikipedia/vi/9/97/Tantei_wa_M%C5%8D%2C_Shindeiru_b%C3%ACa_t%E1%BA%ADp_1.jpg"
                  alt="Sách 1"
                  className="cart-img"
                />
                <div className="cart-info">
                  <h6 className="book-title">
                    Sách Thám tử đã chết - Lẻ tập 1 2 3 4 5 6
                  </h6>
                  <p className="price">
                    <span className="discount-price">145,000₫</span>
                    <span className="original-price">145,000₫</span>
                  </p>
                </div>
                <div className="quantity">
                  <button onClick={() => changeQuantity(-1)}>-</button>
                  <input type="number" id="quantity" defaultValue={1} min={1} />
                  <button onClick={() => changeQuantity(1)}>+</button>
                </div>
                <span className="cart-price">145,000₫</span>
                <button className="delete-btn">
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
              {/* Cart item */}
              <div className="cart-item">
                <input type="checkbox" className="checkbox" />
                <img
                  src="https://upload.wikimedia.org/wikipedia/vi/9/97/Tantei_wa_M%C5%8D%2C_Shindeiru_b%C3%ACa_t%E1%BA%ADp_1.jpg"
                  alt="Sách 1"
                  className="cart-img"
                />
                <div className="cart-info">
                  <h6 className="book-title">
                    Sách Thám tử đã chết - Lẻ tập 1 2 3 4 5 6
                  </h6>
                  <p className="price">
                    <span className="discount-price">145,000₫</span>
                    <span className="original-price">145,000₫</span>
                  </p>
                </div>
                <div className="quantity">
                  <button onClick={() => changeQuantity(-1)}>-</button>
                  <input type="number" id="quantity" defaultValue={1} min={1} />
                  <button onClick={() => changeQuantity(1)}>+</button>
                </div>
                <span className="cart-price">145,000₫</span>
                <button className="delete-btn">
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
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
                <h5 className="text-uppercase fw-bold">Mã giảm 50k - toàn sàn</h5>
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
                      <div className="progress-bar" style={{ width: '80%' }} />
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
              <div className="d-flex justify-content-between align-items-center ">
                <p>Thành tiền</p>
                <span>145,000₫</span>
              </div>
              <div className="line-total" />
              <div className="d-flex justify-content-between align-items-center total-footer">
                <p>
                  <strong>Tổng Số Tiền (gồm VAT)</strong>
                </p>
                <span>145,000₫</span>
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
