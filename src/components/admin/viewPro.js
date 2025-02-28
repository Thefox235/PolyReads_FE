import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProduct, deleteProduct, getImages, getCategory, getAuthor } from '../../api/server';
import '../../asset/css/adminPro.css';

const ViewPro = () => {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [categoryName, setCategoryName] = useState([]); // sửa từ '' thành []
  const [authorName, setAuthorName] = useState([]);     // sửa từ '' thành []

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

  // hàm xóa
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      console.log('Sản phẩm đã được xóa');
      alert('Sản phẩm đã được xóa');
      // Cập nhật lại danh sách sản phẩm sau khi xóa
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
          {/* Hiển thị số lượng sản phẩm */}
          <span className="admin-product__category-title">
            Sách: {products.length} Quyển Hiện Có
          </span>
          <a className="admin-product__btn-add-category" href="/createPro">
            Thêm Sản Phẩm
          </a>
        </div>

        {/* Bảng sản phẩm */}
        <table className="admin-product__table">
          <thead>
            <tr>
              <th>STT</th>
              <th>HÌnh Ảnh</th>
              <th>Tên Sách</th>
              <th>Mô Tả Sách</th>
              <th>Giá</th>
              <th>Danh Mục</th>
              <th>Tác Giả</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 && images && images.length > 0 ? (
              products.map((product, index) => {
                const productImage = images.find(
                  (image) => image.productId === product._id
                );
                const productCate = categoryName.find(
                  (cate) => cate._id === product.category
                );
                const productAuthor = authorName.find(
                  (author) => author._id === product.author
                );

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
                    <td className="book-description">{product.description}</td>
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
                          if (
                            window.confirm(
                              "Bạn có chắc chắn muốn xóa sản phẩm này không?"
                            )
                          ) {
                            handleDelete(product._id);
                          }
                        }}
                        className="trash"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                      <Link to={`/editSp/${product._id}`} className="fix">
                        <i className="bi bi-pen"></i>
                      </Link>
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

        {/* Phân trang: nếu có */}
        {/* <div className="admin-product__pagination">
          <button className="admin-product__pagination-btn">«</button>
          <button className="admin-product__pagination-btn admin-product__pagination-btn--active">
            1
          </button>
          <button className="admin-product__pagination-btn">2</button>
          <button className="admin-product__pagination-btn">»</button>
        </div> */}
      </div>
    </div>
  );
};

export default ViewPro;
