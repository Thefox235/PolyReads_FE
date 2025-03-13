import React, { useState, useEffect } from 'react';
import { getAuthors, deleteAuthor } from '../../api/server';
import '../../asset/css/adminPro.css';
<<<<<<< HEAD
import CreateAuthor from './createAuthor'; // Component tạo tác giả (popup)
import EditAuthor from './editAuthor';     // Component sửa tác giả (popup)
import Modal from '../model';              // Component Modal chung
=======
import CreateAuthor from './createAuthor';
import EditAuthor from './editAuthor';
import Modal from '../model';
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869

const ViewAuthor = () => {
  const [authors, setAuthors] = useState([]);

<<<<<<< HEAD
  // State quản lý modal tạo tác giả
  const [showCreateModal, setShowCreateModal] = useState(false);
  // State quản lý modal sửa tác giả
  const [showEditModal, setShowEditModal] = useState(false);
  // Lưu tác giả được chọn để sửa
=======
  // State quản lý modal tạo và sửa tác giả
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
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
<<<<<<< HEAD
      setAuthors(prev => prev.filter(author => author._id !== id));
=======
      setAuthors((prev) => prev.filter((author) => author._id !== id));
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
    } catch (error) {
      alert('Xóa tác giả thất bại do tác giả đang được sử dụng');
      console.error('Có lỗi xảy ra khi xóa tác giả:', error);
    }
  };

<<<<<<< HEAD
  // Mở modal tạo tác giả
  const openCreateModal = () => setShowCreateModal(true);
  const closeCreateModal = () => setShowCreateModal(false);

  // Mở modal sửa tác giả
=======
  // Modal mở và đóng
  const openCreateModal = () => setShowCreateModal(true);
  const closeCreateModal = () => setShowCreateModal(false);
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
  const openEditModal = (author) => {
    setSelectedAuthor(author);
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedAuthor(null);
  };

<<<<<<< HEAD
  // Callback sau khi tạo tác giả thành công để cập nhật danh sách
  const handleCreateSuccess = (newAuthor) => {
    setAuthors(prev => [...prev, newAuthor]);
  };

  // Callback sau khi chỉnh sửa tác giả thành công để cập nhật danh sách
  const handleEditSuccess = (updatedAuthor) => {
    setAuthors(prev =>
      prev.map(author => (author._id === updatedAuthor._id ? updatedAuthor : author))
=======
  // Callback khi tạo mới
  const handleCreateSuccess = (newAuthor) => {
    setAuthors((prev) => [...prev, newAuthor]);
  };

  // Callback khi chỉnh sửa thành công
  const handleEditSuccess = (updatedAuthor) => {
    setAuthors((prev) =>
      prev.map((author) =>
        author._id === updatedAuthor._id ? updatedAuthor : author
      )
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
    );
  };

  return (
    <div className="admin-product">
<<<<<<< HEAD
      {/* Phần Action: tiêu đề + nút Thêm Tác Giả */}
=======
      {/* Header */}
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
      <div className="admin-product__action">
        <span className="admin-product__category-title">
          Tác Giả: {authors.length} Tác Giả Hiện Có
        </span>
<<<<<<< HEAD
        <button 
          className="admin-product__btn-add-category" 
=======
        <button
          className="admin-product__btn-add-category"
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
          onClick={openCreateModal}
        >
          Thêm Tác Giả
        </button>
      </div>

<<<<<<< HEAD
      {/* Bảng hiển thị tác giả */}
=======
      {/* Bang danh sách tác giả */}
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
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
<<<<<<< HEAD
                      if (window.confirm("Bạn có chắc chắn muốn xóa tác giả này không?")) {
=======
                      if (window.confirm('Bạn có chắc chắn muốn xóa tác giả này không?')) {
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
                        handleDelete(author._id);
                      }
                    }}
                    className="trash"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
<<<<<<< HEAD
                  <button 
                    onClick={() => openEditModal(author)} 
                    className="fix" 
=======
                  <button
                    onClick={() => openEditModal(author)}
                    className="fix"
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
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

<<<<<<< HEAD
      {/* Modal CreateAuthor */}
=======
      {/* Modal Tạo mới Tác Giả */}
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
      {showCreateModal && (
        <Modal onClose={closeCreateModal}>
          <CreateAuthor
            onClose={closeCreateModal}
            onCreateSuccess={handleCreateSuccess}
          />
        </Modal>
      )}

<<<<<<< HEAD
      {/* Modal EditAuthor */}
=======
      {/* Modal Chỉnh sửa Tác Giả */}
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
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
