import React, { useState, useEffect } from "react";
import { updateAddress, getCities, getDistrictsByCity, getWardsByDistrict } from "../../api/server";
import CustomSelect from "./customSelect";

const EditAddress = ({ initialAddress, onSubmit, onClose }) => {
  // Lấy giá trị mã từ DB nếu có (extraCodes)
  const initialProvinceCode = initialAddress?.extraCodes?.provinceCode || "";
  const initialDistrictCode = initialAddress?.extraCodes?.districtCode || "";
  const initialWardCode = initialAddress?.extraCodes?.wardCode || "";

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [formData, setFormData] = useState({
    id: initialAddress?._id || "",
    userId: initialAddress?.userId || "",
    name: initialAddress?.name || "",
    phone: initialAddress?.phone || "",
    address_line: initialAddress?.address_line || "",
    province: initialProvinceCode,
    provinceName: initialAddress?.province || "",
    district: initialDistrictCode,
    districtName: initialAddress?.district || "",
    ward: initialWardCode,
    wardName: initialAddress?.ward || "",
    default: initialAddress?.default || false,
  });

  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await getCities();
        setCities(response.data || []);
      } catch (error) {
        console.error("Lỗi load cities:", error);
      }
    }
    fetchCities();
  }, []);

  useEffect(() => {
    async function fetchDistricts() {
      if (formData.province) {
        try {
          const response = await getDistrictsByCity(formData.province);
          setDistricts(response.data || []);
        } catch (error) {
          console.error("Lỗi load districts:", error);
        }
      }
    }
    fetchDistricts();
  }, [formData.province]);

  useEffect(() => {
    async function fetchWards() {
      if (formData.district) {
        try {
          const response = await getWardsByDistrict(formData.district);
          setWards(response.data || []);
        } catch (error) {
          console.error("Lỗi load wards:", error);
        }
      }
    }
    fetchWards();
  }, [formData.district]);

  const handleProvinceChange = (selectedProvinceId) => {
    const selectedCity = cities.find(
      city => String(city.id) === String(selectedProvinceId)
    );
    setFormData(prev => ({
      ...prev,
      province: selectedProvinceId,
      provinceName: selectedCity ? selectedCity.name : "",
      district: "",
      districtName: "",
      ward: "",
      wardName: "",
    }));
    setDistricts([]);
    setWards([]);
  };

  const handleDistrictChange = (selectedDistrictId) => {
    const selectedDistrict = districts.find(
      d => String(d.id) === String(selectedDistrictId)
    );
    setFormData(prev => ({
      ...prev,
      district: selectedDistrictId,
      districtName: selectedDistrict ? selectedDistrict.name : "",
      ward: "",
      wardName: "",
    }));
    setWards([]);
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
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
      province: formData.provinceName,
      city: formData.provinceName,
      district: formData.districtName,
      ward: formData.wardName,
      default: formData.default,
      extraCodes: {
        provinceCode: formData.province,
        districtCode: formData.district,
        wardCode: formData.ward,
      },
    };

    try {
      const updatedAddress = await updateAddress(formData.id, payload);
      if (onSubmit) onSubmit(updatedAddress);
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
          <div className="form-group">
            <CustomSelect
              label="Tỉnh/Thành phố"
              options={cities.map(city => ({
                value: String(city.id),
                label: city.name,
              }))}
              value={formData.province}
              onChange={handleProvinceChange}
              placeholder="Chọn Tỉnh/Thành phố"
            />
          </div>
          <div className="form-group">
            <CustomSelect
              label="Quận/Huyện"
              options={districts.map(district => ({
                value: String(district.id),
                label: district.name,
              }))}
              value={formData.district}
              onChange={handleDistrictChange}
              placeholder="Chọn Quận/Huyện"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <CustomSelect
              label="Xã/Phường"
              options={wards.map(ward => ({
                value: String(ward.id),
                label: ward.name,
              }))}
              value={formData.ward}
              onChange={handleWardChange}
              placeholder="Chọn Xã/Phường"
            />
          </div>
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
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="default"
              checked={formData.default}
              onChange={handleChange}
            />{" "}
            Đặt làm địa chỉ mặc định
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Cập nhật địa chỉ
        </button>
      </form>
    </div>
  );
};

export default EditAddress;