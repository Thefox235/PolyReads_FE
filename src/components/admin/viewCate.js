import React, { useState, useEffect } from 'react';
import { getCategory, deleteCategory } from '../../api/server';
import '../../asset/css/adminPro.css';
import CreateCate from './createCate'; // Component tạo danh mục dưới dạng popup
import EditCate from './editCate';     // Component sửa danh mục dưới dạng popup
import Modal from '../model';           // Component Modal chung

const ViewCate = () => {
  const [categories, setCategories] = useState([]);

  // State cho modal thêm danh mục
  const [showCreateModal, setShowCreateModal] = useState(false);
  // State cho modal sửa danh mục
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch danh mục khi component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategory();
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
      alert('Danh mục đã được xóa');
      setCategories(prev => prev.filter(category => category._id !== id));
    } catch (error) {
      alert('Xóa danh mục thất bại do danh mục đang được sử dụng');
      console.error('Có lỗi xảy ra khi xóa danh mục:', error);
    }
  };

  // Mở modal tạo danh mục
  const openCreateModal = () => setShowCreateModal(true);
  const closeCreateModal = () => setShowCreateModal(false);

  // Mở modal sửa danh mục
  const openEditModal = (category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedCategory(null);
  };

  // Callback sau khi tạo danh mục thành công để cập nhật danh sách
  const handleCreateSuccess = (newCate) => {
    setCategories(prev => [...prev, newCate]);
  };

  // Nếu cần callback cập nhật sau khi chỉnh sửa, bạn có thể cập nhật danh sách ở đây.
  const handleEditSuccess = (updatedCate) => {
    setCategories(prev => prev.map(cat => cat._id === updatedCate._id ? updatedCate : cat));
  };

  return (
    <div className="admin-product">
      {/* Action: Tiêu đề + Thêm Danh Mục */}
      <div className="admin-product__action">
        <span className="admin-product__category-title">
          Danh Mục: {categories.length} Danh Mục Hiện Có
        </span>
        <button
          className="admin-product__btn-add-category"
          onClick={openCreateModal}
        >
          Thêm Danh Mục
        </button>
      </div>

      {/* Bảng hiển thị danh mục */}
      <table className="admin-product__table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên danh mục</th>
            <th>Type</th>
            <th>Active</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {categories && categories.length > 0 ? (
            categories.map((dm, index) => (
              <tr key={dm._id || index}>
                <td>{index+1}</td>
                <td>{dm.name}</td>
                <td>{dm.type}</td>
                <td>{dm.is_active ? 'Active' : 'Inactive'}</td>
                <td>
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
                  <button
                    onClick={() => openEditModal(dm)}
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
              <td colSpan="3">Đang tải danh mục...</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal CreateCate */}
      {showCreateModal && (
        <Modal onClose={closeCreateModal}>
          <CreateCate
            onClose={closeCreateModal}
            onCreateSuccess={handleCreateSuccess}
          />
        </Modal>
      )}

      {/* Modal EditCate */}
      {showEditModal && selectedCategory && (
        <Modal onClose={closeEditModal}>
          <EditCate
            initialData={selectedCategory}
            onClose={closeEditModal}
            onEditSuccess={handleEditSuccess}
          /* Nếu bạn có callback sau khi edit thành công: onEditSuccess={handleEditSuccess} */
          />
        </Modal>
      )}
    </div>
  );
};

export default ViewCate;
