import React, { useState } from "react";

const AddressSelectionModal = ({
  addresses,           // Mảng danh sách địa chỉ (đã lọc từ component cha)
  defaultAddressId,    // ID của địa chỉ mặc định (nếu có)
  onSelect,            // Callback khi người dùng chọn địa chỉ
  onClose,             // Callback để đóng modal
  handleAddAddress,    // Callback thêm "thêm địa chỉ" được truyền từ Detail
  checkuser,           // Nếu cần sử dụng checkuser, truyền vào để dùng nếu cần
}) => {
  const [selectedAddressId, setSelectedAddressId] = useState(defaultAddressId || "");

  const handleSelect = () => {
    const selectedAddress = addresses.find(addr => addr._id === selectedAddressId);
    if (selectedAddress) {
      onSelect(selectedAddress);
    }
    onClose();
  };

  return (
    <div className="address-modal">
      <div className="container-box">
        <div className="dc">
          {/* Header: hiển thị tiêu đề và nút thêm địa chỉ */}
          <div className="shipping-address">
            <div>Địa chỉ giao hàng</div>
            <div
              style={{ color: '#007bff', cursor: 'pointer' }}
              onClick={handleAddAddress}
            >
              <i className="bi bi-plus-circle"></i> Địa chỉ
            </div>
          </div>
          <hr />
          {/* Danh sách địa chỉ */}
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
              </div>
            ))
          ) : (
            <div style={{ marginLeft: "15px" }}>Không có địa chỉ</div>
          )}
        </div>
      </div>
      {/* Nút xác nhận chọn địa chỉ */}
      <div style={{ marginTop: "15px", textAlign: "right" }}>
        <button className="btn btn-primary" onClick={handleSelect}>
          Chọn địa chỉ
        </button>
        <button
          className="btn btn-secondary"
          style={{ marginLeft: "10px" }}
          onClick={onClose}
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default AddressSelectionModal;