import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuthors, deleteAuthor } from '../../api/server';

const ViewAuthor = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await getAuthors();
        setAuthors(response);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy tác giả:', error);
      }
    };

    fetchAuthors();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteAuthor(id);
      console.log('tác giả đã được xóa');
      setAuthors(authors.filter(author => author._id !== id));
    } catch (error) {
      alert('Xóa tác giả thất bại do tác giả đang được sử dụng');
      console.error('Có lỗi xảy ra khi xóa tác giả:', error);
    }
  };

  return (
    <div>
      <div className="admin-product">
        {/* Action: tiêu đề + nút thêm danh mục */}
        <div className="admin-product__action">
          <span className="admin-product__category-title">Tác giả</span>
          <Link to="/createAuthor" className="admin-product__btn-add-category">
            Thêm Tác Giả
          </Link>
        </div>

        {/* Bảng hiển thị danh mục */}
        <table className="admin-product__table">
          <thead>
            <tr>
              <th>Tên tác giả</th>
              <th>Bio</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {authors && authors.length > 0 ? (
              authors.map((dm, index) => (
                <tr key={dm._id || index}>
                  <td>{dm.name}</td>
                  <td className='book-description'>
                    {dm.bio}
                  </td>
                  <td >
                    <button
                      onClick={() => {
                        if (window.confirm("Bạn có chắc chắn muốn xóa tác giả này không?")) {
                          handleDelete(dm._id);
                        }
                      }}
                      className="trash"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                    <Link to={`/editAuthor/${dm._id}`} className="fix"><i className="bi bi-pen"></i></Link>
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
    </div>
  );
};

export default ViewAuthor;
