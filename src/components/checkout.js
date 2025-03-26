import React from "react";
import "../asset/css/checkout.css";

const Checkout = () => {
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

      <main className="checkout-session">
        <div
          style={{ fontSize: "1.4rem", textAlign: "left" }}
          className="checkout-container"
        >
          <h4>Thanh toán</h4>
        </div>
        <div class="checkout-container ">
          <div className="row">
            <div className="col-md-8 order-md-1 col-12">
              <div className="container-box">
                <div class="border-box">
                  <span>
                    {" "}
                    <img
                      src="https://s3-alpha-sig.figma.com/img/ee9a/05df/38e96fd9785a5c166c0c81ba281b7dc8?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Kdt2xBSI75j6QNdW3xjIJJC5hLTbZ9a2Nb9-KQNMRwN8sl4gMQ5NMYbanOfRizsYhyj5kIjneqSpNQmVtI4hjcPMXPm1DlikNdwbJtIdbhEQBAfqBOfFAFST75o5yTTZG~D65v9A5F2jItpUu2-fpIEdS6rEwlKNTUacPmHLGPq4J69Z~qd6KcPa-K0rH-ch721-YwsaV0bPdRPeLaHU7SEXJi8WQI5sbf1cPTofjtEM6BwRT1nCBAcW5JwRnDUaxDNAa0FgBozLjLiHeuLMrkZkA1iM0dHcQPrea7FsWbcCLkF0goP574faTXruGMYNdUQjArHD-Lmj28VP~rj6tQ__"
                      width={20}
                      style={{ marginRight: "5px" }}
                      alt=""
                    />
                    Các sản phẩm của bạn
                  </span>
                  <div class="item">
                    <img
                      src="https://s3-alpha-sig.figma.com/img/cc5a/262f/5fb08b0d0a67cd2a02caf9667529b2f5?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qN5sQ3OhUvTnkIQupADbba-u9v1-uTqIxRwe9n1cxvof5GHFeac8Uwm9V-MCVgrmStYM9bKDVeV1OVtUws3jS-l7eLRH6VPV1mZCiloLDlEkRXOd6gM39Sg-5oeKcm444zym2OhY5zUZ3vHrG5DrjAu-4j4kdxWWhoWvVvT-gO4il5-X1Xa332cBGmgEJ9hAW7WjUDRldl~j-r6AbZO-3bo-rGXHxJSSISQOP3Pp1vnMOJgR9Vh9jLqnKDN-Sdi90eBvoMHg~VBkt1YeiIWHaL6X8NCjnMKzWjy-6C3SVm7SjYgU7W6gAcPbWApuPm731wabPjwQAbltbBhnRTxz5Q__"
                      alt="Sách Thám tử đã chết"
                    />
                    <div class="item-info">
                      <div class="item-title">
                        Sách Thám tử đã chết - Lẻ tập 1 2 3 4 5 6 - Light Novel
                      </div>
                      <div class="item-details">
                        <div>Số lượng: 1</div>
                        <div className="price">145,000 đ</div>
                      </div>
                    </div>
                  </div>
                  <div class="item">
                    <img
                      src="https://s3-alpha-sig.figma.com/img/cc5a/262f/5fb08b0d0a67cd2a02caf9667529b2f5?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qN5sQ3OhUvTnkIQupADbba-u9v1-uTqIxRwe9n1cxvof5GHFeac8Uwm9V-MCVgrmStYM9bKDVeV1OVtUws3jS-l7eLRH6VPV1mZCiloLDlEkRXOd6gM39Sg-5oeKcm444zym2OhY5zUZ3vHrG5DrjAu-4j4kdxWWhoWvVvT-gO4il5-X1Xa332cBGmgEJ9hAW7WjUDRldl~j-r6AbZO-3bo-rGXHxJSSISQOP3Pp1vnMOJgR9Vh9jLqnKDN-Sdi90eBvoMHg~VBkt1YeiIWHaL6X8NCjnMKzWjy-6C3SVm7SjYgU7W6gAcPbWApuPm731wabPjwQAbltbBhnRTxz5Q__"
                      alt="Sách Thám tử đã chết"
                    />
                    <div class="item-info">
                      <div class="item-title">
                        Sách Thám tử đã chết - Lẻ tập 1 2 3 4 5 6 - Light Novel
                      </div>
                      <div class="item-details">
                        <div>Số lượng: 1</div>
                        <div className="price">145,000 đ</div>
                      </div>
                    </div>
                  </div>
                  <div class="item">
                    <img
                      src="https://s3-alpha-sig.figma.com/img/cc5a/262f/5fb08b0d0a67cd2a02caf9667529b2f5?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qN5sQ3OhUvTnkIQupADbba-u9v1-uTqIxRwe9n1cxvof5GHFeac8Uwm9V-MCVgrmStYM9bKDVeV1OVtUws3jS-l7eLRH6VPV1mZCiloLDlEkRXOd6gM39Sg-5oeKcm444zym2OhY5zUZ3vHrG5DrjAu-4j4kdxWWhoWvVvT-gO4il5-X1Xa332cBGmgEJ9hAW7WjUDRldl~j-r6AbZO-3bo-rGXHxJSSISQOP3Pp1vnMOJgR9Vh9jLqnKDN-Sdi90eBvoMHg~VBkt1YeiIWHaL6X8NCjnMKzWjy-6C3SVm7SjYgU7W6gAcPbWApuPm731wabPjwQAbltbBhnRTxz5Q__"
                      alt="Sách Thám tử đã chết"
                    />
                    <div class="item-info">
                      <div class="item-title">
                        Sách Thám tử đã chết - Lẻ tập 1 2 3 4 5 6 - Light Novel
                      </div>
                      <div class="item-details">
                        <div>Số lượng: 1</div>
                        <div className="price">145,000 đ</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="paymen">
                <div className="pttt">Phương thức thanh toán</div>
                <div className="d-flex gap-3 pb-4">
                  <input type="radio" name="pay" id="" />
                  <label
                    htmlFor=""
                    className="d-flex gap-1"
                    style={{ alignItems: "center" }}
                  >
                    <img
                      src="https://s3-alpha-sig.figma.com/img/f5ea/debb/02cee35ae0c3347fe5a5c14f5f0e696c?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bFpIBjE3RVkAMrA3U02h92GIbfnThqUbGjjWsD4MFmky1F-kMJL2asrysPXqW-cFEMzNNTmuVVuSTvCSt56oOjggFxxewzKzokeNhG1XBDtJtScg1~7PynOr5zNZdViX~biwtYDf9aOmm7r3kM5N49Qevv~AIBvTyPAYK2hsXURhjDT4gzSgqTv8lwclxSS2Uqlt2-Wmb07-EnAqGgGQdQogUv~Ksy7k7c0y8IRSXtQ~D6FlpnzUAWK97PE4AW6EGLN3CmJ5pVeoe9c0OD-mq9r85zmPngAy36XCe89lP6miokn-408LgqeZl86~NUzYjgCYNaJRN4w~wNwkf3SPsQ__"
                      width={20}
                      alt=""
                    />
                    Thanh toán khi nhận hàng
                  </label>
                </div>
                <div className="d-flex gap-3 gap-3 pb-2">
                  <input type="radio" name="pay" id="" />
                  <label
                    htmlFor=""
                    className="d-flex gap-1"
                    style={{ alignItems: "center" }}
                  >
                    <img
                      src="https://s3-alpha-sig.figma.com/img/a90f/7f72/2f966edbc60ed7615aed5160878529e6?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=kcXc12J-yRuZv3YRO0BFKlq1Meh52BjKkis5EFp~8HwLPecdDRmKql8q7sEiRVU1eHl2~bcW9qTxzdfk3CH~ym-ZA~lb7taZYekXLUSsrldjyA-D~cgA39HQA2JgnQHaDujIRS2gIRck9ZzdA9VYZOVZe-xP85R~wtXpdswmcqerrOAU4URXH36grwJT0zup~cI5-bDcZgOAkb1FUdqK9yCDA5kL~81xkHnHWtDfgkDR0FCrdsiRv7F2cWydiJCuR7IkHTvqbbtNHkj7M3Uy0af~VuuHbRHCoUdlwo~d60ZrYipbA~jYOVIAbE-p0HJOi84ZzuV13h6ByuqeH8N6QA__"
                      width={20}
                      alt=""
                    />
                    Thanh toán bằng VNpay
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-4 order-md-2 col-12 ">
              <div className="container-box">
                <div className="dc">
                  <div className="shipping-address">
                    <div>Địa chỉ giao hàng</div>
                    <div className="text-info">Thay đổi</div>
                  </div>
                  <hr />
                  <div>
                    <div
                      className="d-flex gap-2 align-items-start address"
                      style={{ marginLeft: "15px" }}
                    >
                      <input
                        type="radio"
                        name="dc"
                        id=""
                        style={{ marginTop: "8px" }}
                        checked
                      />
                      <label htmlFor="">
                        Số 1234, đường Nguyễn Văn Cừ, ấp Mỹ Long, xã Mỹ Phước Tây,
                        huyện Cai Lậy, tỉnh Tiền Giang, Việt Nam.Số 1234, đường
                        Nguyễn Văn Cừ, ấp Mỹ Long, xã Mỹ Phước Tây, huyện Cai Lậy,
                        tỉnh Tiền Giang, Việt Nam.
                      </label>
                    </div>
                    <br />
                    <div
                      className="d-flex gap-2 align-items-start address"
                      style={{ marginLeft: "15px" }}
                    >
                      <input
                        type="radio"
                        name="dc"
                        id=""
                        style={{ marginTop: "8px" }}
                      />
                      <label htmlFor="">
                        Số 1234, đường Nguyễn Văn Cừ, ấp Mỹ Long, xã Mỹ Phước Tây,
                        huyện Cai Lậy, tỉnh Tiền Giang, Việt Nam.Số 1234, đường
                        Nguyễn Văn Cừ, ấp Mỹ Long, xã Mỹ Phước Tây, huyện Cai Lậy,
                        tỉnh Tiền Giang, Việt Nam.
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="container-box">
                <div className="d-flex justify-content-between pb-2">
                  <span>Tạm tính</span>
                  <span>440.000 đ</span>
                </div>
                <div className="d-flex justify-content-between pb-2">
                  <span>Phí vận chuyển</span>
                  <span>50.000đ</span>
                </div>
                <div className="d-flex justify-content-between pb-2">
                  <span>Giảm giá</span>
                  <span>20.000đ</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between pb-2">
                  <span className="fw-medium " style={{ fontSize: "17px" }}>Tổng Số Tiền (gồm VAT)</span>
                  <span className="text-danger " style={{ fontSize: "17px" }}>
                    440.000 VNĐ
                  </span>
                </div>
                <button className="thanhtoan mt-2">THANH TOÁN</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Checkout;
