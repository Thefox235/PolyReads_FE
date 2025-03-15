import React, { useState, useEffect } from 'react';
import { getAuthors, deleteAuthor } from '../../api/server';
import '../../asset/css/adminPro.css';
import CreateAuthor from './createAuthor'; // Component tạo tác giả (popup)
import EditAuthor from './editAuthor';     // Component sửa tác giả (popup)
import Modal from '../model';              // Component Modal chung

const ViewAuthor = () => {
  const [authors, setAuthors] = useState([]);

  // State quản lý modal tạo tác giả
  const [showCreateModal, setShowCreateModal] = useState(false);
  // State quản lý modal sửa tác giả
  const [showEditModal, setShowEditModal] = useState(false);
  // Lưu tác giả được chọn để sửa
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  // Fetch danh sách tác giả khi component mount
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

  // Hàm xóa tác giả
  const handleDelete = async (id) => {
    try {
      await deleteAuthor(id);
      alert('Tác giả đã được xóa');
      setAuthors(prev => prev.filter(author => author._id !== id));
    } catch (error) {
      alert('Xóa tác giả thất bại do tác giả đang được sử dụng');
      console.error('Có lỗi xảy ra khi xóa tác giả:', error);
    }
  };

  // Mở modal tạo tác giả
  const openCreateModal = () => setShowCreateModal(true);
  const closeCreateModal = () => setShowCreateModal(false);

  // Mở modal sửa tác giả
  const openEditModal = (author) => {
    setSelectedAuthor(author);
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedAuthor(null);
  };

  // Callback sau khi tạo tác giả thành công để cập nhật danh sách
  const handleCreateSuccess = (newAuthor) => {
    setAuthors(prev => [...prev, newAuthor]);
  };

  // Callback sau khi chỉnh sửa tác giả thành công để cập nhật danh sách
  const handleEditSuccess = (updatedAuthor) => {
    setAuthors(prev =>
      prev.map(author => (author._id === updatedAuthor._id ? updatedAuthor : author))
    );
  };

  return (
    <div className="admin-product">
      {/* Phần Action: tiêu đề + nút Thêm Tác Giả */}
      <div className="admin-product__action">
        <span className="admin-product__category-title">
          Tác Giả: {authors.length} Tác Giả Hiện Có
        </span>
        <button 
          className="admin-product__btn-add-category" 
          onClick={openCreateModal}
        >
          Thêm Tác Giả
        </button>
      </div>

      {/* Bảng hiển thị tác giả */}
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
            authors.map((author, index) => (
              <tr key={author._id || index}>
                <td>{author.name}</td>
                <td className="book-description">{author.bio}</td>
                <td>
                  <button
                    onClick={() => {
                      if (window.confirm("Bạn có chắc chắn muốn xóa tác giả này không?")) {
                        handleDelete(author._id);
                      }
                    }}
                    className="trash"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <button 
                    onClick={() => openEditModal(author)} 
                    className="fix" 
                    style={{ marginLeft: '5px' }}
                  >
                    <i className="bi bi-pen"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Đang tải tác giả...</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal CreateAuthor */}
      {showCreateModal && (
        <Modal onClose={closeCreateModal}>
          <CreateAuthor
            onClose={closeCreateModal}
            onCreateSuccess={handleCreateSuccess}
          />
        </Modal>
      )}

      {/* Modal EditAuthor */}
      {showEditModal && selectedAuthor && (
        <Modal onClose={closeEditModal}>
          <EditAuthor
            initialData={selectedAuthor}
            onClose={closeEditModal}
            onEditSuccess={handleEditSuccess}
          />
        </Modal>
      )}
    </div>
  );
};

export default ViewAuthor;
