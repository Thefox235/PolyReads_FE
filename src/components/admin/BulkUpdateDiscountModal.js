// BulkUpdateDiscountModal.js
import React, { useState } from 'react';
import Modal from '../model'; // Modal component của bạn (ưu tiên sử dụng React Portal)
import { updateProductsDiscount } from '../../api/server'; // API update discount hàng loạt
import '../../asset/css/bulkUpdateModal.css'; // Import CSS vừa tạo

/**
 * BulkUpdateDiscountModal
 * @param {Object} props
 * @param {Array} props.categories - Mảng danh mục (mỗi đối tượng có ít nhất _id và name)
 * @param {Array} props.discounts - Mảng discount (mỗi đối tượng có _id, value, và có thể code)
 * @param {Function} props.onClose - Hàm gọi khi đóng modal
 * @param {Function} props.onUpdateSuccess - Callback sau khi cập nhật thành công (ví dụ: reload dữ liệu)
 */
const BulkUpdateDiscountModal = ({ categories, discounts, onClose, onUpdateSuccess }) => {
  // State cập nhật: map categoryId => discountId (nếu không chọn thì giá trị là empty string)
  const [updates, setUpdates] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State tìm kiếm danh mục

  const handleSelectChange = (categoryId, discountId) => {
    setUpdates(prev => ({ ...prev, [categoryId]: discountId }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    try {
      // Với mỗi danh mục, nếu trong state updates có giá trị mới, tiến hành gọi API cập nhật
      for (const category of categories) {
        if (updates.hasOwnProperty(category._id)) {
          // Nếu giá trị là empty string, chuyển thành null để gỡ bỏ discount
          const discountId = updates[category._id] || null;
          await updateProductsDiscount(category._id, discountId);
        }
      }
      if (onUpdateSuccess) onUpdateSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setError('Có lỗi xảy ra khi cập nhật discount.');
    }
    setLoading(false);
  };

  // Lọc danh mục theo từ khóa tìm kiếm (không phân biệt hoa thường)
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal onClose={onClose}>
      <h2>Sale Hàng Loạt</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Input tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm danh mục..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: '10px',
          width: '100%',
          padding: '5px'
        }}
      />

      {/* Bọc bảng trong container có chiều cao cố định để hiển thị thanh cuộn */}
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f7f7f7', borderBottom: '1px solid #ccc' }}>
              <th style={{ padding: '10px' }}>STT</th>
              <th style={{ padding: '10px' }}>Danh mục</th>
              <th style={{ padding: '10px' }}>Chọn Discount mới</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((cat, index) => (
              <tr key={cat._id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ padding: '10px' }}>{cat.name}</td>
                <td style={{ padding: '10px' }}>
                  <select
                    value={updates[cat._id] || ''}
                    onChange={(e) => handleSelectChange(cat._id, e.target.value)}
                    style={{ padding: '5px', width: '100%' }}
                  >
                    <option value="">Không có discount</option>
                    {discounts.map((dis) => (
                      <option key={dis._id} value={dis._id}>
                        {dis.value}%
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
          {loading ? 'Đang cập nhật...' : 'Lưu tất cả'}
        </button>
        <button className="btn btn-secondary" onClick={onClose} style={{ marginLeft: '10px' }}>
          Hủy
        </button>
      </div>
    </Modal>
  );
};

export default BulkUpdateDiscountModal;