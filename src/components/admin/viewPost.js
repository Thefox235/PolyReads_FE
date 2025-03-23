import React, { useState, useEffect } from 'react';
import { getPosts, deletePost } from '../../api/server';

import CreatePost from './createPost'; // Component tạo bài viết dưới dạng popup
import EditPost from './editPost';     // Component sửa bài viết dưới dạng popup
import Modal from '../model';           // Component Modal chung

const ViewPost = () => {
  const [posts, setPosts] = useState([]);
  // State cho modal thêm bài viết
  const [showCreateModal, setShowCreateModal] = useState(false);
  // State cho modal sửa bài viết
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Fetch danh sách bài viết khi component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy bài viết:', error);
      }
    };
    fetchPosts();
  }, []);

  // Hàm xóa bài viết
  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      alert('Bài viết đã được xóa');
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (error) {
      alert('Xóa bài viết thất bại');
      console.error('Có lỗi xảy ra khi xóa bài viết:', error);
    }
  };

  // Mở đóng modal tạo bài viết
  const openCreateModal = () => setShowCreateModal(true);
  const closeCreateModal = () => setShowCreateModal(false);

  // Mở đóng modal sửa bài viết
  const openEditModal = (post) => {
    setSelectedPost(post);
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedPost(null);
  };

  // Callback sau khi tạo bài viết thành công để cập nhật danh sách
  const handleCreateSuccess = (newPost) => {
    setPosts((prev) => [...prev, newPost]);
  };

  // Callback sau khi chỉnh sửa bài viết để cập nhật danh sách
  const handleEditSuccess = (updatedPost) => {
    setPosts((prev) =>
      prev.map((post) => (post._id === updatedPost._id ? updatedPost : post))
    );
  };

  return (
    <div className="admin-product">
      {/* Header: Tiêu đề và nút Thêm bài viết */}
      <div className="admin-product__action">
        <span className="admin-product__category-title">
          Bài Viết: {posts.length} bài viết hiện có
        </span>
        <button
          className="admin-product__btn-add-category"
          onClick={openCreateModal}
        >
          Thêm Bài Viết
        </button>
      </div>

      {/* Bảng hiển thị danh sách bài viết */}
      <table className="admin-product__table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tiêu đề</th>
            <th>Slug</th>
            <th>Danh mục</th>
            <th>Ngày tạo</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {posts && posts.length > 0 ? (
            posts.map((post, index) => (
              <tr key={post._id || index}>
                <td>{index + 1}</td>
                <td>{post.title}</td>
                <td>{post.slug}</td>
                <td>
                  {post.tag && post.tag.name
                    ? post.tag.name
                    : post.tag || 'N/A'}
                </td>
                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          'Bạn có chắc chắn muốn xóa bài viết này không?'
                        )
                      ) {
                        handleDelete(post._id);
                      }
                    }}
                    className="trash"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <button
                    onClick={() => openEditModal(post)}
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
              <td colSpan="6">Đang tải bài viết...</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal CreatePost */}
      {showCreateModal && (
        <Modal onClose={closeCreateModal}>
          <CreatePost
            onClose={closeCreateModal}
            onCreateSuccess={handleCreateSuccess}
          />
        </Modal>
      )}

      {/* Modal EditPost */}
      {showEditModal && selectedPost && (
        <Modal onClose={closeEditModal}>
          <EditPost
            initialData={selectedPost}
            onClose={closeEditModal}
            onEditSuccess={handleEditSuccess}
          />
        </Modal>
      )}
    </div>
  );
};

export default ViewPost;