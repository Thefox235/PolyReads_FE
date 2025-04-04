import React, { useState, useEffect } from "react";
import axios from "axios";
import { createAddress, getCities, getDistrictsByCity, getWardsByDistrict } from "../../api/server"; // Hàm tạo địa chỉ trên backend
import CustomSelect from "./customSelect";

const CreateAddress = ({ onSubmit, userId, onClose }) => {
  // Các state chứa mảng dữ liệu sau khi gọi API
  const [cities, setCities] = useState([]);         // Danh sách thành phố
  const [districts, setDistricts] = useState([]);     // Danh sách quận/huyện
  const [wards, setWards] = useState([]);
  // Danh sách phường/xã
  console.log(districts);
  
  // State chứa dữ liệu form
  const [formData, setFormData] = useState({
    userId: userId || "",
    name: "",
    phone: "",
    address_line: "",
    city: "",       // Mã của thành phố (được CustomSelect trả về)
    cityName: "",   // Tên của thành phố (lookup từ mảng cities)
    district: "",   // Mã của quận/huyện
    districtName: "",
    ward: "",       // Mã của phường/xã
    wardName: "",
    default: false,
  });

  // Khi component mount, load danh sách thành phố từ API
  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await getCities(); // Ví dụ trả về { data: { data: [ ... ] } }
        setCities(response.data || []);
      } catch (error) {
        console.error("Lỗi load cities:", error);
      }
    }
    fetchCities();
  }, []);

  // Khi chọn thành phố
  const handleCityChange = async (selectedCityId) => {
    console.log("Selected city id:", selectedCityId);
    // So sánh bằng property `id`
    const selectedCity = cities.find(
      city => String(city.id) === String(selectedCityId)
    );
    console.log("Lookup selectedCity:", selectedCity);

    setFormData(prev => ({
      ...prev,
      city: selectedCityId,
      cityName: selectedCity ? selectedCity.name : "",
      district: "",
      districtName: "",
      ward: "",
      wardName: ""
    }));

    try {
      const response = await getDistrictsByCity(selectedCityId);
      setDistricts(response.data || []);
      setWards([]);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách quận/huyện:", error);
    }
  };

  // Khi chọn quận/huyện
  const handleDistrictChange = async (selectedDistrictId) => {
    const selectedDistrict = districts.find(
      d => String(d.id) === String(selectedDistrictId)
    );
    setFormData(prev => ({
      ...prev,
      district: selectedDistrictId,
      districtName: selectedDistrict ? selectedDistrict.name : "",
      ward: "",
      wardName: ""
    }));

    try {
      const response = await getWardsByDistrict(selectedDistrictId);
      setWards(response.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách phường/xã:", error);
    }
  };

  const handleWardChange = (selectedWardId) => {
    const selectedWard = wards.find(
      w => String(w.id) === String(selectedWardId)
    );
    setFormData(prev => ({
      ...prev,
      ward: selectedWardId,
      wardName: selectedWard ? selectedWard.name : "",
    }));
  };

  // Hàm xử lý input thay đổi thông thường
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Hàm submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userId: formData.userId,
      name: formData.name,
      phone: formData.phone,
      address_line: formData.address_line,
      province: formData.cityName, // Sử dụng tên thành phố cho payload
      city: formData.cityName,
      district: formData.districtName,
      ward: formData.wardName,
      default: formData.default,
      extraCodes: {
        provinceCode: formData.city,      // Mã thành phố
        districtCode: formData.district,    // Mã quận/huyện
        wardCode: formData.ward,            // Mã phường/xã
      },
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
          {/* Dropdown chọn thành phố */}
          <div className="form-group">
            <CustomSelect
              label="Tỉnh/Thành phố"
              options={cities.map(city => ({
                value: String(city.id),  // ép về string
                label: city.name,
              }))}
              value={formData.city}
              onChange={val => handleCityChange(val)}
              placeholder="Chọn Tỉnh/Thành phố"
            />
          </div>
          {/* Dropdown chọn quận/huyện */}
          <div className="form-group">
            <CustomSelect
              label="Quận/Huyện"
              options={districts.map((district) => ({
                value: district.id,
                label: district.name,
              }))}
              value={formData.district}
              onChange={(val) => handleDistrictChange(val)}
              placeholder="Chọn Quận/Huyện"
            />
          </div>
        </div>
        <div className="form-row">
          {/* Dropdown chọn phường/xã */}
          <div className="form-group">
            <CustomSelect
              label="Xã/Phường"
              options={wards.map((ward) => ({
                value: ward.id,
                label: ward.name,
              }))}
              value={formData.ward}
              onChange={(val) => handleWardChange(val)}
              placeholder="Chọn Xã/Phường"
            />
          </div>
          {/* Ô nhập địa chỉ cụ thể */}
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
          {/* Input số điện thoại */}
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
          {/* Input tên người nhận */}
          <div className="form-group">
            <label htmlFor="name">Họ và tên người nhận:</label>
            <input
              type="text"
              id="name"
              placeholder="Nhập họ và tên"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>
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
        <button type="submit" className="btn btn-primary">
          Lưu địa chỉ
        </button>
      </form>
    </div>
  );
};

export default CreateAddress;