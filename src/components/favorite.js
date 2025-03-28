import React, { useState, useEffect } from 'react';
import "../asset/css/favorite.css"
const Favourite = () => {
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
      <main className='checkout-session'>
        <div className="favoraite-container " style={{ textAlign: "left" }}>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="searchyt mb-2"
          />
          <div>
            <hr />
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <img
                  src="https://s3-alpha-sig.figma.com/img/cc5a/262f/5fb08b0d0a67cd2a02caf9667529b2f5?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qN5sQ3OhUvTnkIQupADbba-u9v1-uTqIxRwe9n1cxvof5GHFeac8Uwm9V-MCVgrmStYM9bKDVeV1OVtUws3jS-l7eLRH6VPV1mZCiloLDlEkRXOd6gM39Sg-5oeKcm444zym2OhY5zUZ3vHrG5DrjAu-4j4kdxWWhoWvVvT-gO4il5-X1Xa332cBGmgEJ9hAW7WjUDRldl~j-r6AbZO-3bo-rGXHxJSSISQOP3Pp1vnMOJgR9Vh9jLqnKDN-Sdi90eBvoMHg~VBkt1YeiIWHaL6X8NCjnMKzWjy-6C3SVm7SjYgU7W6gAcPbWApuPm731wabPjwQAbltbBhnRTxz5Q__"
                  style={{ maxWidth: "150px" }}
                  alt=""
                />
                <div>
                  <div>
                    Sách Thám tử đã chết - Lẻ tập 1 2 3 4 5 6 - Light Novel
                  </div>
                  <div className="price">145,000 đ</div>
                  <div className="addcart-moblie">
                    <br />
                    <button className="addcart mb-2">Thêm vào giỏ hàng</button>
                    <div style={{ textAlign: "right" }}>
                      <span className="fw-bold">X </span>xóa sản phẩm
                    </div>
                  </div>
                </div>
              </div>
              <div className="addcart-table">
                <button className="addcart mb-2">Thêm vào giỏ hàng</button>
                <div style={{ textAlign: "right" }}>
                  <span className="fw-bold">X </span>xóa sản phẩm
                </div>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <img
                  src="https://s3-alpha-sig.figma.com/img/cc5a/262f/5fb08b0d0a67cd2a02caf9667529b2f5?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qN5sQ3OhUvTnkIQupADbba-u9v1-uTqIxRwe9n1cxvof5GHFeac8Uwm9V-MCVgrmStYM9bKDVeV1OVtUws3jS-l7eLRH6VPV1mZCiloLDlEkRXOd6gM39Sg-5oeKcm444zym2OhY5zUZ3vHrG5DrjAu-4j4kdxWWhoWvVvT-gO4il5-X1Xa332cBGmgEJ9hAW7WjUDRldl~j-r6AbZO-3bo-rGXHxJSSISQOP3Pp1vnMOJgR9Vh9jLqnKDN-Sdi90eBvoMHg~VBkt1YeiIWHaL6X8NCjnMKzWjy-6C3SVm7SjYgU7W6gAcPbWApuPm731wabPjwQAbltbBhnRTxz5Q__"
                  style={{ maxWidth: "150px" }}
                  alt=""
                />
                <div>
                  <div>
                    Sách Thám tử đã chết - Lẻ tập 1 2 3 4 5 6 - Light Novel
                  </div>
                  <div className="price">145,000 đ</div>
                  <div className="addcart-moblie">
                    <br />
                    <button className="addcart mb-2">Thêm vào giỏ hàng</button>
                    <div style={{ textAlign: "right" }}>
                      <span className="fw-bold">X </span>xóa sản phẩm
                    </div>
                  </div>
                </div>
              </div>
              <div className="addcart-table">
                <button className="addcart mb-2">Thêm vào giỏ hàng</button>
                <div style={{ textAlign: "right" }}>
                  <span className="fw-bold">X </span>xóa sản phẩm
                </div>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <img
                  src="https://s3-alpha-sig.figma.com/img/cc5a/262f/5fb08b0d0a67cd2a02caf9667529b2f5?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qN5sQ3OhUvTnkIQupADbba-u9v1-uTqIxRwe9n1cxvof5GHFeac8Uwm9V-MCVgrmStYM9bKDVeV1OVtUws3jS-l7eLRH6VPV1mZCiloLDlEkRXOd6gM39Sg-5oeKcm444zym2OhY5zUZ3vHrG5DrjAu-4j4kdxWWhoWvVvT-gO4il5-X1Xa332cBGmgEJ9hAW7WjUDRldl~j-r6AbZO-3bo-rGXHxJSSISQOP3Pp1vnMOJgR9Vh9jLqnKDN-Sdi90eBvoMHg~VBkt1YeiIWHaL6X8NCjnMKzWjy-6C3SVm7SjYgU7W6gAcPbWApuPm731wabPjwQAbltbBhnRTxz5Q__"
                  style={{ maxWidth: "150px" }}
                  alt=""
                />
                <div>
                  <div>
                    Sách Thám tử đã chết - Lẻ tập 1 2 3 4 5 6 - Light Novel
                  </div>
                  <div className="price">145,000 đ</div>
                  <div className="addcart-moblie">
                    <br />
                    <button className="addcart mb-2">Thêm vào giỏ hàng</button>
                    <div style={{ textAlign: "right" }}>
                      <span className="fw-bold">X </span>xóa sản phẩm
                    </div>
                  </div>
                </div>
              </div>
              <div className="addcart-table">
                <button className="addcart mb-2">Thêm vào giỏ hàng</button>
                <div style={{ textAlign: "right" }}>
                  <span className="fw-bold">X </span>xóa sản phẩm
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>

  );
};
export default Favourite;
