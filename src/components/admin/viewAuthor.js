import React, { useState, useEffect } from 'react';
import { getAuthors, deleteAuthor, getAllProduct } from '../../api/server';
import '../../asset/css/adminPro.css';
import CreateAuthor from './createAuthor';
import EditAuthor from './editAuthor';
import Modal from '../model';

const ViewAuthor = () => {
  const [authors, setAuthors] = useState([]);
  const [products, setProducts] = useState([]); // Danh sách sản phẩm để đếm tác phẩm của tác giả

  // State quản lý modal tạo và sửa tác giả
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
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

  // Fetch danh sách sản phẩm để tính số tác phẩm của tác giả
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProduct();
        setProducts(response);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy sản phẩm:', error);
      }
    };
    fetchProducts();
  }, []);

  // Hàm xóa tác giả
  const handleDelete = async (id) => {
    try {
      await deleteAuthor(id);
      alert('Tác giả đã được xóa');
      setAuthors((prev) => prev.filter((author) => author._id !== id));
    } catch (error) {
      alert('Xóa tác giả thất bại do tác giả đang được sử dụng');
      console.error('Có lỗi xảy ra khi xóa tác giả:', error);
    }
  };

  // Modal mở và đóng
  const openCreateModal = () => setShowCreateModal(true);
  const closeCreateModal = () => setShowCreateModal(false);
  const openEditModal = (author) => {
    setSelectedAuthor(author);
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedAuthor(null);
  };

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
    );
  };

  return (
    <div className="admin-product">
      {/* Header */}
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

      {/* Bảng danh sách tác giả */}
      <table className="admin-product__table">
        <thead>
          <tr>
            <th>Tên tác giả</th>
            <th>Số tác phẩm</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {authors && authors.length > 0 ? (
            authors.map((author, index) => {
              // Tính số lượng tác phẩm của tác giả dựa vào danh sách sản phẩm
              const worksCount = products.filter(
                (product) =>
                  product.author &&
                  // Nếu product.author là một đối tượng được populate
                  (product.author._id === author._id ||
                   product.author === author._id)
              ).length;
              return (
                <tr key={author._id || index}>
                  <td>{author.name}</td>
                  <td>{worksCount}</td>
                  <td>{author.is_active ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            'Bạn có chắc chắn muốn xóa tác giả này không?'
                          )
                        ) {
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
              );
            })
          ) : (
            <tr>
              <td colSpan="4">Đang tải tác giả...</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Tạo mới Tác Giả */}
      {showCreateModal && (
        <Modal onClose={closeCreateModal}>
          <CreateAuthor
            onClose={closeCreateModal}
            onCreateSuccess={handleCreateSuccess}
          />
        </Modal>
      )}

      {/* Modal Chỉnh sửa Tác Giả */}
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