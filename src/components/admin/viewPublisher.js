import React, { useState, useEffect } from 'react';
import { getPublishers, deletePublisher } from '../../api/server';
import '../../asset/css/adminPro.css';
import CreatePublisher from './createPublisher'; // Component tạo NXB (popup)
import EditPublisher from './editPublisher';     // Component sửa NXB (popup)
import Modal from '../model';              // Component Modal chung

const ViewPublisher = () => {
  const [Publishers, setPublishers] = useState([]);

  // State quản lý modal tạo NXB
  const [showCreateModal, setShowCreateModal] = useState(false);
  // State quản lý modal sửa NXB
  const [showEditModal, setShowEditModal] = useState(false);
  // Lưu NXB được chọn để sửa
  const [selectedPublisher, setSelectedPublisher] = useState(null);

  // Mở modal tạo NXB
  const openCreateModal = () => setShowCreateModal(true);
  const closeCreateModal = () => setShowCreateModal(false);

  // Mở modal sửa NXB
  const openEditModal = (publisher) => {
    setSelectedPublisher(publisher);
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedPublisher(null);
  };
  // Fetch danh sách NXB khi component mount
  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const response = await getPublishers();
        setPublishers(response);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy nxb:', error);
      }
    };
    fetchPublishers();
  }, []);

  // Hàm xóa NXB
  const handleDelete = async (id) => {
    try {
      await deletePublisher(id);
      alert('NXB đã được xóa');
      setPublishers(prev => prev.filter(publisher => publisher._id !== id));
    } catch (error) {
      alert('Xóa NXB thất bại do NXB đang được sử dụng');
      console.error('Có lỗi xảy ra khi xóa NXB:', error);
    }
  };

  // Callback sau khi tạo NXB thành công để cập nhật danh sách
  const handleCreateSuccess = (newPublisher) => {
    setPublishers(prev => [...prev, newPublisher]);
  };

  // Callback sau khi chỉnh sửa NXB thành công để cập nhật danh sách
  const handleEditSuccess = (updatedPublisher) => {
    setPublishers(prev =>
      prev.map(publisher =>
        publisher._id === updatedPublisher._id ? updatedPublisher : publisher
      )
    );
  };
  
  
  return (
    <div className="admin-product">
      {/* Phần Action: tiêu đề + nút Thêm NXB */}
      <div className="admin-product__action">
        <span className="admin-product__category-title">
          NXB: {Publishers.length} NXB Hiện Có
        </span>
        <button
          className="admin-product__btn-add-category"
          onClick={openCreateModal}
        >
          Thêm NXB
        </button>
      </div>

      {/* Bảng hiển thị NXB */}
      <table className="admin-product__table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên NXB</th>
            <th>Active</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {Publishers && Publishers.length > 0 ? (
            Publishers.map((publisher, index) => (
              <tr key={publisher._id || index}>
                <td>{index + 1}</td>
                <td>{publisher.name}</td>
                <td>{publisher.is_active ? 'Active' : 'Inactive'}</td>
                <td>
                  <button
                    onClick={() => {
                      if (window.confirm("Bạn có chắc chắn muốn xóa NXB này không?")) {
                        handleDelete(publisher._id);
                      }
                    }}
                    className="trash"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <button
                    onClick={() => openEditModal(publisher)}
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
              <td colSpan="3">Đang tải NXB...</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal CreatePublisher */}
      {showCreateModal && (
        <Modal onClose={closeCreateModal}>
          <CreatePublisher
            onClose={closeCreateModal}
            onCreateSuccess={handleCreateSuccess}
          />
        </Modal>
      )}

      {/* Modal EditPublisher */}
      {showEditModal && selectedPublisher && (
        <Modal onClose={closeEditModal}>
          <EditPublisher
            initialData={selectedPublisher}
            onClose={closeEditModal}
            onEditSuccess={handleEditSuccess}
          />
        </Modal>
      )}
    </div>
  );
};

export default ViewPublisher;
