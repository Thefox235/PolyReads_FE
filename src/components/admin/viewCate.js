import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategory, deleteCategory } from '../../api/server';
import '../../asset/css/adminPro.css';

const ViewCate = () => {
  const [categories, setCategories] = useState([]);

  // Fetch danh mục khi component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategory(); // Giả sử hàm này trả về mảng đối tượng danh mục
        setCategories(data);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy danh mục:', error);
      }
    };

    fetchCategories();
  }, []);

  // Hàm xóa danh mục
  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      console.log('Danh mục đã được xóa');
      alert('Danh mục đã được xóa');
      setCategories(prev => prev.filter(category => category._id !== id));
    } catch (error) {
      alert('Xóa danh mục thất bại do danh mục đang được sử dụng');
      console.error('Có lỗi xảy ra khi xóa danh mục:', error);
    }
  };

  return (
    <div className="admin-product">
      {/* Action: tiêu đề + nút thêm danh mục */}
      <div className="admin-product__action">
        <span className="admin-product__category-title">Danh Mục: {categories.length} Danh Mục Hiện Có</span>
        <Link to="/createCate" className="admin-product__btn-add-category">
          Thêm Danh Mục
        </Link>
      </div>

      {/* Bảng hiển thị danh mục */}
      <table className="admin-product__table">
        <thead>
          <tr>
            <th>Tên danh mục</th>
            <th>Mô tả</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {categories && categories.length > 0 ? (
            categories.map((dm, index) => (
              <tr key={dm._id || index}>
                <td>{dm.name}</td>
                <td className='book-description'>
                  {dm.description}
                </td>
                <td >
                  <button
                    onClick={() => {
                      if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) {
                        handleDelete(dm._id);
                      }
                    }}
                    className="trash"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <Link to={`/editCate/${dm._id}`} className="fix"><i className="bi bi-pen"></i></Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Đang tải danh mục...</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Nếu cần tích hợp phân trang, bạn có thể thêm phần này */}
      {/* 
      <div className="admin-product__pagination">
        <button className="admin-product__pagination-btn">«</button>
        <button className="admin-product__pagination-btn admin-product__pagination-btn--active">1</button>
        <button className="admin-product__pagination-btn">2</button>
        <button className="admin-product__pagination-btn">»</button>
      </div> 
      */}
    </div>
  );
};

export default ViewCate;
