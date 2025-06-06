import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { getOrderById, getOrderDetail, getImages, updateOrder } from "../../api/server";
import "../../asset/css/orderDetail.css";

const statusOptions = [
  { value: 0, label: "Đang xử lý" },
  { value: 1, label: "Đang giao" },
  { value: 2, label: "Hoàn tất" },
  { value: -1, label: "Bị hủy" },
  { value: 3, label: "Đổi trả" },
];

const EditOrder = ({ orderId, onClose, onUpdateSuccess }) => {
  // State cho thông tin tóm tắt đơn hàng (lấy từ getOrderById)
  const [orderInfo, setOrderInfo] = useState(null);
  // State cho danh sách chi tiết sản phẩm đơn hàng (lấy từ getOrderDetail)
  const [orderDetails, setOrderDetails] = useState([]);
  // State cho danh sách hình ảnh sản phẩm
  const [images, setImages] = useState([]);
  // Các trạng thái loading, lỗi và cập nhật đơn hàng
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState(null);
  // State để lưu trạng thái chỉnh sửa của đơn hàng
  const [editedStatus, setEditedStatus] = useState(null);

  // Fetch thông tin đơn hàng tổng quát qua getOrderById
  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        // Giả sử API trả về { order: { ... } }
        const data = await getOrderById(orderId);
        if (data.order) {
          setOrderInfo(data.order);
          setEditedStatus(data.order.status);
        }
      } catch (err) {
        console.error("Error fetching order info:", err);
        setError(err.message || "Đã có lỗi xảy ra khi lấy thông tin đơn hàng");
      }
    };

    if (orderId) fetchOrderInfo();
  }, [orderId]);

  // Fetch danh sách chi tiết đơn hàng qua getOrderDetail
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Giả sử API trả về { orderDetails: [...] }
        const data = await getOrderDetail(orderId);
        setOrderDetails(data.orderDetails || []);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError(err.message || "Đã có lỗi xảy ra khi lấy chi tiết đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrderDetails();
  }, [orderId]);
  // State để lưu trạng thái chỉnh sửa của đơn hàng
  const finalStatuses = [2, -1, 3];

  // Fetch danh sách hình ảnh sản phẩm
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imgs = await getImages();
        setImages(imgs);
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };
    fetchImages();
  }, []);

  // Tính tổng tiền dựa trên từng sản phẩm trong orderDetails
  const computedGrandTotal = useMemo(() => {
    return orderDetails.reduce((acc, item) => {
      const quantity = Number(item.quantity || item.quantily || 0);
      const price = Number(item.price || 0);
      return acc + price * quantity;
    }, 0);
  }, [orderDetails]);

  // Hàm cập nhật trạng thái đơn hàng
  const handleStatusUpdate = async () => {
    if (!orderInfo) return;
    setUpdateLoading(true);
    try {
      const updated = await updateOrder(orderId, { status: editedStatus });
      // Giả sử API trả về { message, order: { ... } }
      setOrderInfo(updated.order);
      if (onUpdateSuccess) onUpdateSuccess(updated.order);
      alert("Đơn hàng đã được cập nhật!");
    } catch (err) {
      console.error("Lỗi cập nhật đơn hàng:", err);
      alert("Có lỗi khi cập nhật đơn hàng!");
    } finally {
      setUpdateLoading(false);
    }
  };
  console.log(orderInfo);
  if (loading) {
    return (
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Loading chi tiết đơn hàng...</h5>
              <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Đang tải dữ liệu...</p>
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
              <h5 className="modal-title">Chi tiết đơn hàng</h5>
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

  return (
    <div className="modal show d-block edit-order-modal" tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          {/* Header modal */}
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Chỉnh sửa đơn hàng: {orderId}</h5>
            <button type="button" className="close text-white" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          {/* Body modal */}
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                {/* Bên trái: Hiển thị các mặt hàng của đơn hàng */}
                <div className="col-md-8">
                  <h5>Chi tiết đơn hàng</h5>
                  <table className="table custom-table">
                    <thead className="thead-dark">
                      <tr>
                        {/* <th>STT</th> */}
                        <th>Hình</th>
                        <th>Sản phẩm</th>
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
                        let productImage = "";
                        if (item.productId) {
                          const productIdForLookup =
                            typeof item.productId === "object"
                              ? item.productId._id
                              : item.productId;
                          const foundImage = images.find(
                            (img) => img.productId === productIdForLookup
                          );
                          productImage = foundImage ? foundImage.url : "";
                        }
                        const quantity = Number(item.quantity || item.quantily || 0);
                        const price = Number(item.price || 0);
                        const computedTotal = price * quantity;
                        return (
                          <tr key={key}>
                            {/* <td>{index + 1}</td> */}
                            <td className="order-detail-img">
                              {productImage ? (
                                <img
                                  src={productImage}
                                  alt={productName}
                                //   style={{ width: "100px", height: "auto" }}
                                />
                              ) : (
                                "Không có ảnh"
                              )}
                            </td>
                            <td
                              style={{ maxWidth: "340px" }}
                            >{productName}</td>
                            <td>x{quantity}</td>
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
                        <td
                          // style={{textAlign: "right"}}
                          colSpan="4" className="text-right">
                          <p>Tổng cộng:</p>
                        </td>
                        <td>
                          {computedGrandTotal.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                      </tr>

                      <tr>
                        <td
                          // style={{textAlign: "right"}}
                          colSpan="4" className="text-right">
                          <p>Tiền Shiping:</p>
                        </td>
                        <td>
                          {/* {computedGrandTotal.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })} */}
                        </td>
                      </tr>

                      <tr>
                        <td
                          // style={{textAlign: "right"}}
                          colSpan="4" className="text-right">
                          <strong>Thành tiền:</strong>
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
                {/* Bên phải: Hiển thị thông tin tóm tắt đơn hàng và cho phép chỉnh sửa trạng thái */}
                <div className="col-md-4">
                  <h5>Thông tin đơn hàng</h5>
                  {orderInfo && (
                    <div className="orderDetail-summary">
                      <p>
                        <strong>Mã đơn hàng:</strong> {orderInfo._id}
                      </p>
                      <p>
                        <strong>Ngày tạo:</strong>{" "}
                        {new Date(orderInfo.date).toLocaleString("vi-VN")}
                      </p>
                      <p>
                        <strong>Số lượng:</strong> {orderInfo.quantity}
                      </p>
                      <p>
                        <strong>Trạng thái thanh toán:</strong> {orderInfo.paymentId.status}
                      </p>
                      <p>
                        <strong>Phương thức thanh toán:</strong> {orderInfo.paymentId.method}
                      </p>
                      <p>
                        <strong>Tổng tiền:</strong>{" "}
                        {orderInfo.total &&
                          Number(orderInfo.total).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                      </p>
                      <p>
                        <strong>Trạng thái hiện tại:</strong>{" "}
                        {
                          statusOptions.find(
                            (opt) => String(opt.value) === String(orderInfo.status)
                          )?.label
                        }

                      </p>
                      <div className="form-group">
                        <label htmlFor="statusSelect">
                          {finalStatuses.includes(orderInfo.status)
                            ? "Đơn hàng đã hoàn thành, không thể chỉnh sửa"
                            : "Chọn trạng thái mới:"}
                        </label>
                        <select
                          id="statusSelect"
                          className="form-control"
                          value={editedStatus}
                          onChange={(e) => setEditedStatus(Number(e.target.value))}
                          disabled={finalStatuses.includes(orderInfo.status)}
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>

                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={handleStatusUpdate}
                        disabled={updateLoading}
                      >
                        {updateLoading ? "Đang cập nhật..." : "Cập nhật trạng thái"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Footer modal */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

EditOrder.propTypes = {
  orderId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateSuccess: PropTypes.func,
};

export default EditOrder;