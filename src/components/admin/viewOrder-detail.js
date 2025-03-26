import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getOrderDetail, getImages } from "../../api/server";
import "../../asset/css/orderDetail.css";

const ViewOrderDetail = ({ orderId, orderTotal, onClose }) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch chi tiết đơn hàng
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await getOrderDetail(orderId);
        // Giả sử API trả về { orderDetails: [...] }
        setOrderDetails(data.orderDetails || []);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError(err.message || "Đã có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrderDetails();
  }, [orderId]);

  // Fetch hình ảnh sản phẩm
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesData = await getImages();
        setImages(imagesData);
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Chi tiết hóa đơn</h5>
              <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Đang tải chi tiết hóa đơn...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Chi tiết hóa đơn</h5>
              <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p className="text-danger">Lỗi: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tính tổng tiền đơn hàng dựa trên đơn giá và số lượng từng sản phẩm
  const computedGrandTotal = orderDetails.reduce((acc, item) => {
    const quantity = Number(item.quantity || item.quantily || 0);
    const price = Number(item.price || 0);
    return acc + price * quantity;
  }, 0);

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          {/* Header hóa đơn */}
          <div
            className="modal-header bg-primary text-white ">
            <h5 className="modal-title">Hóa đơn đơn hàng: {orderId}</h5>
            <button type="button" className="close text-white" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>

          {/* Body với thông tin hóa đơn */}
          <div className="modal-body">
            <div className="container">
              {/* Thông tin cửa hàng và hóa đơn */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <h4 className="mb-0">PolyReads</h4>
                  <address>
                    QTSC 9 Building, Đ. Tô Ký, Tân Chánh Hiệp, Quận 12, TP. HCM<br />
                    Điện thoại: (84) 0123456789
                  </address>
                </div>
                <div className="col-md-6 text-right">
                  <h4 className="mb-0">Hóa đơn</h4>
                  <p className="mb-0">
                    <strong>Mã đơn hàng: </strong> {orderId}
                  </p>
                  <p className="mb-0">
                    <strong>Ngày: </strong>
                    {new Date().toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>
              <hr />

              {/* Bảng danh sách sản phẩm */}
              <div className="row">
                <div className="col-12">
                  <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                      <tr>
                        <th>STT</th>
                        <th>Sản phẩm</th>
                        <th>Hình ảnh</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails.map((item, index) => {
                        const key =
                          item._id ||
                          (item.productId && item.productId._id) ||
                          index;

                        const productName =
                          item.name ||
                          (item.productId &&
                            typeof item.productId === "object" &&
                            item.productId.name) ||
                          item.productId ||
                          "Không xác định";

                        // Tìm hình ảnh sản phẩm từ mảng images
                        let productImage = "";
                        let productIdForLookup = null;
                        if (item.productId) {
                          productIdForLookup =
                            typeof item.productId === "object"
                              ? item.productId._id
                              : item.productId;
                        }
                        if (productIdForLookup) {
                          const foundImage = images.find(
                            (img) => img.productId === productIdForLookup
                          );
                          productImage = foundImage ? foundImage.url : "";
                        }

                        const quantity = Number(item.quantity || item.quantily || 0);
                        const price = Number(item.price || 0);
                        // Tính thành tiền là đơn giá nhân với số lượng
                        const computedTotal = price * quantity;

                        return (
                          <tr key={key}>
                            <td>{index + 1}</td>
                            <td>{productName}</td>
                            <td>
                              {productImage ? (
                                <img
                                  src={productImage}
                                  alt={productName}
                                  style={{ width: "100px", height: "auto" }}
                                />
                              ) : (
                                "Không có ảnh"
                              )}
                            </td>
                            <td>{quantity}</td>
                            <td>
                              {price > 0 &&
                                price.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                            </td>
                            <td>
                              {computedTotal > 0 &&
                                computedTotal.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="5" className="text-right">
                          <strong>Tổng cộng:</strong>
                        </td>
                        <td>
                          {computedGrandTotal.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              {/* Footer hóa đơn */}
              <div className="row mt-4">
                <div className="col-12 text-right">
                  <p className="font-italic">Cảm ơn quý khách đã mua hàng!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer modal: nút hành động */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Đóng
            </button>
            <button type="button" className="btn btn-primary">
              In hóa đơn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ViewOrderDetail.propTypes = {
  orderId: PropTypes.string.isRequired,
  // Nếu không truyền orderTotal, chúng ta vẫn tính lại dựa trên từng dòng
  orderTotal: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

export default ViewOrderDetail;