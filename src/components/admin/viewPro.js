import React, { useState, useEffect } from 'react';
import { getAllProduct, deleteProduct, getImages, getCategory, getAuthor } from '../../api/server';
import '../../asset/css/adminPro.css';
// Giả sử CreatePro đã được dùng cho modal thêm sản phẩm
import CreatePro from './createPro'; 
// Giả sử EditPro là phiên bản form sửa sản phẩm
import EditPro from './editPro'; 
import Modal from '../model';

const ViewPro = () => {
  // State cho modal thêm sản phẩm
  const [showCreateModal, setShowCreateModal] = useState(false);
  const openCreateModal = () => setShowCreateModal(true);
  const closeCreateModal = () => setShowCreateModal(false);

  // State cho modal sửa sản phẩm
  const [showEditModal, setShowEditModal] = useState(false);
  // Sản phẩm đang được chọn để sửa
  const [selectedProduct, setSelectedProduct] = useState(null);
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedProduct(null);
  };

  // Các state khác:
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [authorName, setAuthorName] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProduct();
        setProducts(productsData);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy sản phẩm:', error);
      }
    };
    fetchProducts();

    const fetchImages = async () => {
      try {
        const imagesData = await getImages();
        setImages(imagesData);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy hình ảnh:', error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryData = await getCategory();
        setCategoryName(categoryData);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy danh mục:', error);
      }
    };
    fetchCategory();

    const fetchAuthor = async () => {
      try {
        const authorData = await getAuthor();
        setAuthorName(authorData);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy tác giả:', error);
      }
    };
    fetchAuthor();
  }, []);

  // Hàm xóa sản phẩm
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      alert('Sản phẩm đã được xóa');
      setProducts(prev => prev.filter(sp => sp._id !== id));
    } catch (error) {
      console.error('Có lỗi xảy ra khi xóa sản phẩm:', error);
    }
  };

  return (
    <div>
      <div className="admin-product">
        {/* Phần Thêm Sản Phẩm & tiêu đề */}
        <div className="admin-product__action">
          <span className="admin-product__category-title">
            Sách: {products.length} Quyển Hiện Có
          </span>
          {/* Nút mở modal thêm sản phẩm */}
          <button 
            className="admin-product__btn-add-category" 
            onClick={openCreateModal}
          >
            Thêm Sản Phẩm
          </button>
        </div>

        {/* Bảng sản phẩm */}
        <table className="admin-product__table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Hình Ảnh</th>
              <th>Tên Sách</th>
              <th>Nhà NXB</th>
              <th>Giá</th>
              <th>Danh Mục</th>
              <th>Tác Giả</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 && images && images.length > 0 ? (
              products.map((product, index) => {
                const productImage = images.find((img) => img.productId === product._id);
                const productCate = categoryName.find((cate) => cate._id === product.category);
                const productAuthor = authorName.find((auth) => auth._id === product.author);
                return (
                  <tr key={product._id || index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={productImage ? productImage.url : ''}
                        alt={product.name}
                      />
                    </td>
                    <td className="book-name">{product.name}</td>
                    <td>{product.publisher}</td>
                    <td>
                      {product.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND"
                      })}
                    </td>
                    <td>{productCate ? productCate.name : ''}</td>
                    <td>{productAuthor ? productAuthor.name : ''}</td>
                    <td className="action-button">
                      <button
                        onClick={() => {
                          if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
                            handleDelete(product._id);
                          }
                        }}
                        className="trash"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                      {/* Nút Edit mở modal chứa EditPro, truyền sản phẩm được chọn */}
                      <button onClick={() => openEditModal(product)} className="fix">
                        <i className="bi bi-pen"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8">Đang tải sản phẩm...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal CreatePro */}
      {showCreateModal && (
        <Modal onClose={closeCreateModal}>
          <CreatePro />
        </Modal>
      )}

      {/* Modal EditPro */}
      {showEditModal && selectedProduct && (
        <Modal onClose={closeEditModal}>
          {/* EditPro nhận dữ liệu ban đầu qua props (initialData) */}
          <EditPro initialData={selectedProduct} onClose={closeEditModal} />
        </Modal>
      )}
    </div>
  );
};

export default ViewPro;
