import React, { useState } from "react";
import tinh_tp from "hanhchinhvn/dist/tinh_tp.json";
import quan_huyen from "hanhchinhvn/dist/quan_huyen.json";
import xa_phuong from "hanhchinhvn/dist/xa_phuong.json";
import CustomSelect from "./customSelect";
import { createAddress } from "../../api/server";

const CreateAddress = ({ onSubmit, userId, onClose }) => {
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [formData, setFormData] = useState({
    userId: userId || "",               // Cần đảm bảo đây là một ObjectId hợp lệ
    name: "",                           // Tên người nhận
    phone: "",
    address_line: "",
    city: "",                           // Sẽ gán từ Tỉnh/Thành phố
    province: "",                       // Lưu mã của Tỉnh/Thành phố
    provinceName: "",
    district: "",                       // Mã Quận/Huyện
    districtName: "",
    ward: "",                           // Mã Xã/Phường
    wardName: "",
    default: false,
  });

  const handleProvinceChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      province: value, // mã
      provinceName: tinh_tp[value]?.name || "", // tên tỉnh
      district: "",
      districtName: "",
      ward: "",
      wardName: "",
    }));
    // Cập nhật danh sách quận/huyện
    const filteredDistricts = Object.values(quan_huyen).filter(
      (district) => district.parent_code === value
    );
    setDistricts(
      filteredDistricts.map((district) => ({
        value: district.code,
        label: district.name,
      }))
    );
    setWards([]);
  };
  
  
  const handleDistrictChange = (value) => {
    // Tìm option đã chọn dựa trên mã
    const selectedDistrict = districts.find((option) => option.value === value);
    setFormData((prev) => ({
      ...prev,
      // Lưu mã vào field dùng cho dropdown
      district: value,
      // Lưu tên được lấy từ option để sử dụng cho API payload
      districtName: selectedDistrict ? selectedDistrict.label : "",
      // Reset xã/phường:
      ward: "",
      wardName: "",
    }));
    const filteredWards = Object.values(xa_phuong).filter(
      (ward) => ward.parent_code === value
    );
    setWards(
      filteredWards.map((ward) => ({
        value: ward.code,
        label: ward.name,
      }))
    );
  };
  
  const handleWardChange = (value) => {
    const selectedWard = wards.find((option) => option.value === value);
    setFormData((prev) => ({
      ...prev,
      ward: value,                    // Lưu mã cho dropdown
      wardName: selectedWard ? selectedWard.label : "",  // Lưu tên để gửi payload
    }));
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userId: formData.userId,
      name: formData.name,
      phone: formData.phone,
      address_line: formData.address_line,
      province: formData.provinceName,     // Lưu tên của tỉnh/thành phố
      city: formData.provinceName,           // Nếu bạn dùng tên tỉnh làm city
      district: formData.districtName,       // Lưu tên của quận/huyện
      ward: formData.wardName,               // Lưu tên của xã/phường
      default: formData.default,
    };
  
    console.log("Payload:", payload);
  
    try {
      const res = await createAddress(payload);
      if (onSubmit) {
        onSubmit(res.address);
      }
      onClose();
      alert("Địa chỉ đã được tạo thành công!");
    } catch (error) {
      console.error("Lỗi tạo địa chỉ:", error);
      alert("Có lỗi xảy ra khi tạo địa chỉ!");
    }
  };  
  
  return (
    <div className="create-address">
      <h2>Thêm địa chỉ mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          {/* Chọn Tỉnh/Thành */}
          <div className="form-group">
            <CustomSelect
              label="Tỉnh/Thành phố"
              options={Object.entries(tinh_tp).map(([code, province]) => ({
                value: code,
                label: province.name,
              }))}
              value={formData.province}
              onChange={(val) => handleProvinceChange(val)}
              placeholder="Chọn Tỉnh/Thành phố"
            />
          </div>
          {/* Chọn Quận/Huyện */}
          <div className="form-group">
            <CustomSelect
              label="Quận/Huyện"
              options={districts}
              value={formData.district}
              onChange={(val) => handleDistrictChange(val)}
              placeholder="Chọn Quận/Huyện"
            />
          </div>
        </div>
        <div className="form-row">

          {/* Chọn Xã/Phường */}
          <div className="form-group">
            <CustomSelect
              label="Xã/Phường"
              options={wards}
              value={formData.ward}
              onChange={(val) => handleWardChange(val)}
              placeholder="Chọn Xã/Phường"
            />
          </div>
          {/* Địa chỉ cụ thể */}
          <div className="form-group">
            <label htmlFor="address_line">Địa chỉ cụ thể:</label>
            <input
              type="text"
              id="address_line"
              name="address_line"
              value={formData.address_line}
              onChange={handleChange}
              placeholder="Nhập số nhà, đường, ngõ, v.v..."
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="form-row">
          {/* Số điện thoại */}
          <div className="form-group">
            <label htmlFor="phone">Số điện thoại:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Nhập số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          {/* Tên người nhận */}
          <div className="form-group">
            <label htmlFor="name">Họ và tên người nhận:</label>
            <input
              type="text"
              id="name"
              placeholder="nhập họ và tên"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        {/* Checkbox địa chỉ mặc định */}
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="default"
              checked={formData.default}
              onChange={handleChange}
            />
            Đặt làm địa chỉ mặc định
          </label>
        </div>
        {/* Nút submit */}
        <button type="submit" className="btn btn-primary">
          Lưu địa chỉ
        </button>
      </form>
    </div>
  );
};

export default CreateAddress;
