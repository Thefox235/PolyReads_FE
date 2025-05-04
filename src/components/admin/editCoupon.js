// EditCoupon.js
import React, { useState, useEffect } from 'react';
import { updateCoupon, getAllUser } from '../../api/server';
import '../../asset/css/adminPro.css';
import CustomSelectMulti from './customSelectMulti';

const EditCoupon = ({ initialData, onClose, onEditSuccess }) => {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
        code: "",
        discountPercentage: "",
        couponType: "order",
        description: "",
        validFrom: "",
        validUntil: "",
        usageLimit: 1,
        minimumOrderValue: 0,
        isActive: true,
        scope: "global",
        eligibleUserIds: "",
    });
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await getAllUser();
            // Giả sử response.data chứa danh sách user dưới dạng mảng
            console.log(response);
            setUsers(response);
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };
        fetchUsers();
      }, []); // Thêm dependency array để chạy một lần khi mount


      useEffect(() => {
        if (initialData) {
          setForm({
            code: initialData.code || "",
            discountPercentage: initialData.discountPercentage || "",
            couponType: initialData.couponType || "order",
            description: initialData.description || "",
            validFrom: initialData.validFrom
              ? new Date(initialData.validFrom).toISOString().substr(0, 10)
              : "",
            validUntil: initialData.validUntil
              ? new Date(initialData.validUntil).toISOString().substr(0, 10)
              : "",
            usageLimit: initialData.usageLimit || 1,
            minimumOrderValue: initialData.minimumOrderValue || 0,
            isActive: !!initialData.isActive,
            scope: initialData.scope || "global",
            // Giữ nguyên dưới dạng mảng
            eligibleUserIds: initialData.eligibleUserIds || [],
          });
        }
      }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate các trường bắt buộc
        if (!form.code || !form.discountPercentage || !form.validFrom || !form.validUntil) {
          setError("Vui lòng điền đầy đủ các trường bắt buộc.");
          return;
        }
        
        const payload = { ...form };
      
        if (form.scope === "limited") {
          // Nếu form.eligibleUserIds là chuỗi thì chuyển thành mảng,
          // ngược lại nếu đã là mảng thì giữ nguyên.
          if (typeof form.eligibleUserIds === "string") {
            payload.eligibleUserIds = form.eligibleUserIds
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s);
          } else if (Array.isArray(form.eligibleUserIds)) {
            payload.eligibleUserIds = form.eligibleUserIds;
          } else {
            payload.eligibleUserIds = [];
          }
          
          if (payload.eligibleUserIds.length === 0) {
            setError("Với coupon hạn chế, vui lòng chọn người dùng được áp dụng.");
            return;
          }
        } else {
          payload.eligibleUserIds = [];
        }
        
        try {
          const updatedCoupon = await updateCoupon(initialData._id, payload);
          alert("Cập nhật coupon thành công!");
          if (onEditSuccess) onEditSuccess(updatedCoupon);
          if (onClose) onClose();
        } catch (err) {
          console.error(err);
          setError("Lỗi khi cập nhật coupon.");
        }
      };

    return (
        <div className="editPro-container">
            <h1>Chỉnh sửa Coupon</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                {/* Mã Coupon */}
                <div className="form-group">
                    <label htmlFor="code">Mã Coupon:</label>
                    <input
                        type="text"
                        id="code"
                        name="code"
                        value={form.code}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                {/* Giảm giá (%) */}
                <div className="form-group">
                    <label htmlFor="discountPercentage">Giảm giá (%):</label>
                    <input
                        type="number"
                        id="discountPercentage"
                        name="discountPercentage"
                        value={form.discountPercentage}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                {/* Loại Coupon */}
                <div className="form-group">
                    <label htmlFor="couponType">Loại Coupon:</label>
                    <select
                        id="couponType"
                        name="couponType"
                        value={form.couponType}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="order">Giảm đơn hàng</option>
                        <option value="shipping">Giảm phí vận chuyển</option>
                    </select>
                </div>
                {/* Mô tả */}
                <div className="form-group">
                    <label htmlFor="description">Mô tả:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="form-control"
                    ></textarea>
                </div>
                {/* Hiệu lực từ */}
                <div className="form-group">
                    <label htmlFor="validFrom">Hiệu lực từ:</label>
                    <input
                        type="date"
                        id="validFrom"
                        name="validFrom"
                        value={form.validFrom}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                {/* Hiệu lực đến */}
                <div className="form-group">
                    <label htmlFor="validUntil">Hiệu lực đến:</label>
                    <input
                        type="date"
                        id="validUntil"
                        name="validUntil"
                        value={form.validUntil}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                {/* Giới hạn Sử dụng */}
                <div className="form-group">
                    <label htmlFor="usageLimit">Giới hạn Sử dụng:</label>
                    <input
                        type="number"
                        id="usageLimit"
                        name="usageLimit"
                        value={form.usageLimit}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                {/* Giá trị đơn tối thiểu */}
                <div className="form-group">
                    <label htmlFor="minimumOrderValue">Giá trị đơn tối thiểu:</label>
                    <input
                        type="number"
                        id="minimumOrderValue"
                        name="minimumOrderValue"
                        value={form.minimumOrderValue}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                {/* Trạng thái Hoạt động */}
                <div className="form-group">
                    <label htmlFor="isActive">
                        <input
                            type="checkbox"
                            id="isActive"
                            name="isActive"
                            checked={form.isActive}
                            onChange={handleChange}
                        />{" "}
                        Hoạt động
                    </label>
                </div>
                {/* Phạm vi */}
                <div className="form-group">
                    <label htmlFor="scope">Phạm vi:</label>
                    <select
                        id="scope"
                        name="scope"
                        value={form.scope}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="global">Toàn cầu (Tất cả người dùng)</option>
                        <option value="limited">Hạn chế (Người dùng cụ thể)</option>
                    </select>
                </div>
                {/* Danh sách ID người dùng được áp dụng (chỉ hiển thị nếu phạm vi là hạn chế) */}
                {form.scope === "limited" && (
                    <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                        <CustomSelectMulti
                            label="Chọn người dùng"
                            options={(users || []).map(user => ({
                                value: user._id,
                                label: user.name
                            }))}
                            isMulti={true}
                            value={
                                (Array.isArray(form.eligibleUserIds) ? form.eligibleUserIds : [])
                                    .map(id => {
                                        const user = (users || []).find(u => u._id === id);
                                        return user ? { value: user._id, label: user.name } : null;
                                    })
                                    .filter(Boolean)
                            }
                            onChange={(selectedOptions) => {
                                const uniqueIds = [...new Set(selectedOptions.map(option => option.value))];
                                setForm(prev => ({
                                    ...prev,
                                    eligibleUserIds: uniqueIds
                                }));
                            }}
                            placeholder="Chọn người dùng được áp dụng"
                        />
                    </div>
                )}
                <button type="submit" className="btn btn-primary">
                    Cập nhật Coupon
                </button>
            </form>
        </div>
    );
};

export default EditCoupon;