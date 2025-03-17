import React, { useState, useEffect } from 'react';
import { getAllProduct, deleteProduct, getImages, getCategory, getAuthor, getPublishers, getDiscounts } from '../../api/server';
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
  const [publisherName, setPublisherName] = useState([]);
  const [discountValue, setDiscountValue] = useState([]);


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

    const fetchPublisher = async () => {
      try {
        const publisherData = await getPublishers();
        setPublisherName(publisherData);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy NXB:', error);
      }
    };
    fetchPublisher();

    const fetchDiscount = async () => {
      try {
        const discountData = await getDiscounts();
        setDiscountValue(discountData);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy discount:', error);
      }
    };
    fetchDiscount();

  }, []);

  const handleCreateSuccess = async (newProduct) => {
    // Thêm sản phẩm mới vào state tạm thời, nếu cần hiển thị ngay
    setProducts(prev => [...prev, newProduct]);

    // Re-fetch lại các dữ liệu để đảm bảo toàn bộ thông tin, kể cả danh mục, tác giả và NXB
    const freshProducts = await getAllProduct();
    setProducts(freshProducts);

    const freshImages = await getImages();
    setImages(freshImages);

    // Re-fetch lại danh mục, vì có thể danh mục mới đã được tạo hoặc đã được add trước đó
    const freshCategories = await getCategory();
    setCategoryName(freshCategories);

    // Re-fetch lại tác giả
    const freshAuthors = await getAuthor();
    setAuthorName(freshAuthors);

    // Re-fetch lại nhà xuất bản (NXB)
    const freshPublishers = await getPublishers();
    setPublisherName(freshPublishers);

    // Re-fetch lại discount
    const freshDiscount = await getDiscounts();
    setDiscountValue(freshDiscount);
  };


  // Khi sửa sản phẩm thành công
  const handleEditSuccess = (updatedProduct) => {
    setProducts(prev =>
      prev.map(product =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };



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
                const productCate = categoryName.filter(cate => cate).find((cate) => cate._id === product.category);
                const productAuthor = authorName.filter(auth => auth).find((auth) => auth._id === product.author);
                const productPublisher = publisherName.filter(pub => pub).find((pub) => pub._id === product.publisher);
                const productImage = images.find((img) => img.productId === product._id);
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
                    <td>{productPublisher ? productPublisher.name : ''}</td>
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
          <CreatePro
            onClose={closeCreateModal}
            onCreateSuccess={handleCreateSuccess} />
        </Modal>
      )}

      {/* Modal EditPro */}
      {showEditModal && selectedProduct && (
        <Modal onClose={closeEditModal}>
          {/* EditPro nhận dữ liệu ban đầu qua props (initialData) */}
          <EditPro
            initialData={selectedProduct}
            onClose={closeEditModal}
            onEditSuccess={handleEditSuccess}
          />
        </Modal>
      )}
    </div>
  );
};

export default ViewPro;
