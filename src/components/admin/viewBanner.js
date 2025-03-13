import React, { useState, useEffect } from 'react';
import { getBanners, deleteBanner } from '../../api/server';
import '../../asset/css/adminPro.css';
import CreateBanner from './createBanner';
import EditBanner from './editBanner';
import Modal from '../model';

const ViewBanner = () => {
  const [banners, setBanners] = useState([]);

  // State quản lý modal tạo banner
  const [showCreateModal, setShowCreateModal] = useState(false);
  const openCreateModal = () => setShowCreateModal(true);
  const closeCreateModal = () => setShowCreateModal(false);

  // State quản lý modal sửa banner và banner được chọn
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const openEditModal = (banner) => {
    setSelectedBanner(banner);
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedBanner(null);
  };

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getBanners();
        setBanners(data);
      } catch (error) {
        console.error("Lỗi khi lấy banner:", error);
      }
    };
    fetchBanners();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBanner(id);
      alert("Banner đã được xóa");
      setBanners(prev => prev.filter(banner => banner._id !== id));
    } catch (error) {
      alert("Xóa banner thất bại");
      console.error("Lỗi khi xóa banner:", error);
    }
  };

  const handleCreateSuccess = (newBanner) => {
    setBanners(prev => [...prev, newBanner]);
  };

  const handleEditSuccess = (updatedBanner) => {
    setBanners(prev =>
      prev.map(banner => (banner._id === updatedBanner._id ? updatedBanner : banner))
    );
  };

  return (
    <div className="admin-product">
      <div className="admin-product__action">
        <span className="admin-product__category-title">
          Banner: {banners.length} banner hiện có
        </span>
        <button 
          className="admin-product__btn-add-category" 
          onClick={openCreateModal}
        >
          Thêm Banner
        </button>
      </div>

      <table className="admin-product__table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Position</th>
            <th>Active</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {banners && banners.length > 0 ? (
            banners.map((banner, index) => (
              <tr key={banner._id || index}>
                <td>{banner.title}</td>
                <td>
                  {banner.image_url && (
                    <img
                      src={banner.image_url}
                      alt={banner.title}
                      style={{ width: '150px', height: '80px', objectFit: 'cover' }}
                    />
                  )}
                </td>
                <td>{banner.position}</td>
                <td>{banner.is_active ? 'Active' : 'Inactive'}</td>
                <td>
                  <button 
                    onClick={() => {
                      if (window.confirm("Bạn có chắc chắn muốn xóa banner này không?")) {
                        handleDelete(banner._id);
                      }
                    }}
                    className="trash"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <button 
                    onClick={() => openEditModal(banner)}
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
              <td colSpan="5">Đang tải banner...</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal CreateBanner */}
      {showCreateModal && (
        <Modal onClose={closeCreateModal}>
          <CreateBanner 
            onClose={closeCreateModal}
            onCreateSuccess={handleCreateSuccess}
          />
        </Modal>
      )}

      {/* Modal EditBanner */}
      {showEditModal && selectedBanner && (
        <Modal onClose={closeEditModal}>
          <EditBanner 
            initialData={selectedBanner}
            onClose={closeEditModal}
            onEditSuccess={handleEditSuccess}
          />
        </Modal>
      )}
    </div>
  );
};

export default ViewBanner;
