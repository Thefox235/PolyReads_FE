import React, { useState, useEffect } from "react";
import tinh_tp from "hanhchinhvn/dist/tinh_tp.json";
import quan_huyen from "hanhchinhvn/dist/quan_huyen.json";
import xa_phuong from "hanhchinhvn/dist/xa_phuong.json";
import CustomSelect from "./customSelect";
import { updateAddress } from "../../api/server"; // Giả sử có hàm updateAddress

// --- Các helper function để lấy mã dựa trên tên ---
const getProvinceCodeByName = (provinceName) => {
  if (!provinceName) return "";
  const entry = Object.entries(tinh_tp).find(
    ([code, province]) =>
      province.name.trim().toLowerCase() === provinceName.trim().toLowerCase()
  );
  return entry ? entry[0] : "";
};

const getDistrictCodeByName = (districtName, provinceCode) => {
  if (!districtName || !provinceCode) return "";
  const districtArray = Object.values(quan_huyen).filter(
    (district) => district.parent_code === provinceCode
  );
  const entry = districtArray.find(
    (district) =>
      district.name.trim().toLowerCase() === districtName.trim().toLowerCase()
  );
  return entry ? entry.code : "";
};

const getWardCodeByName = (wardName, districtCode) => {
  if (!wardName || !districtCode) return "";
  const wardArray = Object.values(xa_phuong).filter(
    (ward) => ward.parent_code === districtCode
  );
  const entry = wardArray.find(
    (ward) =>
      ward.name.trim().toLowerCase() === wardName.trim().toLowerCase()
  );
  return entry ? entry.code : "";
};

const EditAddress = ({ initialAddress, onSubmit, onClose }) => {
  // Khởi tạo formData với dữ liệu từ initialAddress và dùng helper để lấy mã nếu có
  const initialProvinceCode = getProvinceCodeByName(initialAddress?.province);
  const initialDistrictCode = getDistrictCodeByName(
    initialAddress?.district,
    initialProvinceCode
  );
  const initialWardCode = getWardCodeByName(
    initialAddress?.ward,
    initialDistrictCode
  );

  const [formData, setFormData] = useState({
    id: initialAddress?._id || "",
    userId: initialAddress?.userId || "",
    name: initialAddress?.name || "",
    phone: initialAddress?.phone || "",
    address_line: initialAddress?.address_line || "",
    // Nếu DB không có field mã thì dùng tên để tra cứu mã
    province: initialProvinceCode, // Mã Tỉnh/Thành từ JSON dựa trên tên
    provinceName: initialAddress?.province || "",
    district: initialDistrictCode,
    districtName: initialAddress?.district || "",
    ward: initialWardCode,
    wardName: initialAddress?.ward || "",
    default: initialAddress?.default || false,
  });

  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // Khi chọn Tỉnh/Thành
  const handleProvinceChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      province: value,
      provinceName: tinh_tp[value]?.name || "",
      district: "",
      districtName: "",
      ward: "",
      wardName: "",
    }));
    // Lọc danh sách Quận/Huyện dựa vào mã của Tỉnh/Thành
    const filteredDistricts = Object.values(quan_huyen).filter(
      (d) => d.parent_code === value
    );
    setDistricts(
      filteredDistricts.map((district) => ({
        value: district.code,
        label: district.name,
      }))
    );
    setWards([]);
  };

  // Khi chọn Quận/Huyện
  const handleDistrictChange = (value) => {
    const selectedDistrict = districts.find((opt) => opt.value === value);
    setFormData((prev) => ({
      ...prev,
      district: value,
      districtName: selectedDistrict ? selectedDistrict.label : "",
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

  // Khi chọn Xã/Phường
  const handleWardChange = (value) => {
    const selectedWard = wards.find((opt) => opt.value === value);
    setFormData((prev) => ({
      ...prev,
      ward: value,
      wardName: selectedWard ? selectedWard.label : "",
    }));
  };

  // Xử lý thay đổi các input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Khi component load (hoặc khi province có thay đổi) load danh sách quận/huyện
  useEffect(() => {
    if (formData.province) {
      const filteredDistricts = Object.values(quan_huyen).filter(
        (district) => district.parent_code === formData.province
      );
      setDistricts(
        filteredDistricts.map((district) => ({
          value: district.code,
          label: district.name,
        }))
      );
    }
  }, [formData.province]);

  // Khi district thay đổi load danh sách xã/phường
  useEffect(() => {
    if (formData.district) {
      const filteredWards = Object.values(xa_phuong).filter(
        (ward) => ward.parent_code === formData.district
      );
      setWards(
        filteredWards.map((ward) => ({
          value: ward.code,
          label: ward.name,
        }))
      );
    }
  }, [formData.district]);

  // Submit form chỉnh sửa địa chỉ
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userId: formData.userId,
      name: formData.name,
      phone: formData.phone,
      address_line: formData.address_line,
      province: formData.provinceName, // Gửi tên
      city: formData.provinceName,
      district: formData.districtName, // Gửi tên
      ward: formData.wardName,         // Gửi tên
      default: formData.default,
    };

    try {
      const updatedAddress = await updateAddress(formData.id, payload);
      if (onSubmit) {
        onSubmit(updatedAddress);
      }
      onClose();
      alert("Địa chỉ đã được cập nhật thành công!");
    } catch (error) {
      console.error("Lỗi cập nhật địa chỉ:", error);
      alert("Có lỗi xảy ra khi cập nhật địa chỉ!");
    }
  };

  return (
    <div className="edit-address">
      <h2>Chỉnh sửa địa chỉ</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          {/* Chọn Tỉnh/Thành phố */}
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
              value={formData.phone}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
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
          Cập nhật địa chỉ
        </button>
      </form>
    </div>
  );
};

export default EditAddress;