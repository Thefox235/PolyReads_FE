import React, { useState, useEffect } from 'react';
import {
  getCategory,
  getProductPage, // thay vì getProducts
  getImages,
  getDiscounts,
  getAuthor,
  getPublishers,
} from '../api/server';
import { Link } from 'react-router-dom';
import { useCart } from "./context/cartContext";
import '../asset/css/product.css';

const Product = () => {
  const [products, setProducts] = useState([]);
  // các state khác...
  const [categoryName, setCategoryName] = useState([]);
  const [images, setImages] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [authorName, setAuthorName] = useState([]);
  const [publishers, setPublisher] = useState([]);

  // State phân trang
  const [currentPage, setCurrentPage] = useState(1);
  // Thay đổi giới hạn theo ý bạn, đây ví dụ là 20 sản phẩm mỗi trang
  const limit = 20;

  const { addToCart } = useCart();

  // Các useEffect load category, images, discounts, tác giả, nxb...
  useEffect(() => {
    // Ví dụ fetch publishers
    const fetchPublisher = async () => {
      try {
        const publisherData = await getPublishers();
        setPublisher(publisherData);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy nxb:', error);
      }
    };
    fetchPublisher();

    // Fetch category
    const fetchCategory = async () => {
      try {
        const categoryData = await getCategory();
        const productCategories = categoryData.filter(category => category.type === 'Product');
        setCategoryName(productCategories);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy danh mục:', error);
      }
    };
    fetchCategory();

    // Fetch discounts
    const fetchDiscounts = async () => {
      try {
        const discountData = await getDiscounts();
        setDiscounts(discountData);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy mã giảm giá:', error);
      }
    };
    fetchDiscounts();

    // Fetch images
    const fetchImages = async () => {
      try {
        const imagesData = await getImages();
        setImages(imagesData);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy hình ảnh:', error);
      }
    };
    fetchImages();

    // Fetch tác giả
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

  // useEffect load sản phẩm theo trang sử dụng API phân trang mới getProductPage
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getProductPage(currentPage, limit);
        setProducts(productData);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy sản phẩm:', error);
      }
    };
    fetchProducts();
  }, [currentPage]);

  // Hàm thêm sản phẩm vào giỏ
  const addCart = (product, productImage) => {
    const data = {
      product: product,
      img: productImage?.url || "",
      quantity: 1,
    };
    addToCart(data);
  };

  // Hàm chuyển trang
  const doSearch = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <section className="banner">
        <div className="banner-overlay">
          <h1>Sản phẩm</h1>
          <p style={{ fontSize: 20, fontWeight: 400 }}>
            <a href="/">Trang chủ</a> &gt; Sản phẩm
          </p>
        </div>
      </section>
      <div className="product-container">
        <aside className="sidebar">
          {/* Sidebar cho danh mục */}
          <div className="d-flex justify-content-between align-items-center" style={{ borderBottom: "1px solid rgb(190, 188, 188)" }}>
            <div className="title_top_menu_product tab_link_module">
              <h3 className='product-title-h3'>
                <a href="new-arrivals" title="Sản phẩm hot">Tất cả danh mục</a>
              </h3>
            </div>
          </div>
          <div className='sidebar-item'>
            <ul>
              <li key="all">Tất cả</li>
              {categoryName && categoryName.length > 0 ? (
                categoryName.map((dm, index) => (
                  <li key={dm._id || index}>{dm.name}</li>
                ))
              ) : (
                <li>Đang tải danh mục...</li>
              )}
            </ul>
          </div>
          {/* Sidebar cho tác giả */}
          <div className="d-flex justify-content-between align-items-center" style={{ borderBottom: "1px solid rgb(190, 188, 188)" }}>
            <div className="title_top_menu_product tab_link_module">
              <h3 className='product-title-h3'>
                <a href="new-arrivals" title="Sản phẩm hot">Tác giả</a>
              </h3>
            </div>
          </div>
          <div className='sidebar-item'>
            <ul>
              {authorName && authorName.length > 0 ? (
                authorName.map((au, index) => (
                  <li key={au._id || index}>
                    <input type="checkbox" /> {au.name}
                  </li>
                ))
              ) : (
                <li>Đang tải danh mục...</li>
              )}
            </ul>
          </div>
          {/* Sidebar cho nhà xuất bản */}
          <div className="d-flex justify-content-between align-items-center" style={{ borderBottom: "1px solid rgb(190, 188, 188)" }}>
            <div className="title_top_menu_product tab_link_module">
              <h3 className='product-title-h3'>
                <a href="new-arrivals" title="Sản phẩm hot">Nhà xuất bản</a>
              </h3>
            </div>
          </div>
          <div className='sidebar-item'>
            <ul>
              {publishers && publishers.length > 0 ? (
                publishers.map((nxb, index) => (
                  <li key={nxb._id || index}>
                    <input type="checkbox" /> {nxb.name}
                  </li>
                ))
              ) : (
                <li>Đang tải danh mục...</li>
              )}
            </ul>
          </div>
          {/* Sidebar cho giá tiền */}
          <div className="d-flex justify-content-between align-items-center" style={{ borderBottom: "1px solid rgb(190, 188, 188)" }}>
            <div className="title_top_menu_product tab_link_module">
              <h3 className='product-title-h3'>
                <a href="new-arrivals" title="Sản phẩm hot">Giá tiền</a>
              </h3>
            </div>
          </div>
          <div className='sidebar-item'>
            <ul>
              <li>
                <input type="checkbox" /> Giá dưới 30.000đ
              </li>
              <li>
                <input type="checkbox" /> 40.000đ - 60.000đ
              </li>
              <li>
                <input type="checkbox" /> 60.000đ - 80.000đ
              </li>
              <li>
                <input type="checkbox" /> 80.000đ - 100.000đ
              </li>
              <li>
                <input type="checkbox" /> 100.000đ - 120.000đ
              </li>
              <li>
                <input type="checkbox" /> 120.000đ - 140.000đ
              </li>
              <li>
                <input type="checkbox" /> Giá trên 150.000đ
              </li>
            </ul>
          </div>
        </aside>
        <article>
          <div className="product-list" id="product-container">
            <div className="san-pham-page">
              <div className="products-wrapper-page">
                {products && products.length > 0 &&
                  images && images.length > 0 &&
                  authorName && authorName.length > 0 ? (
                  products.map(product => {
                    const productImage = images.find(image => image.productId === product._id);
                    const productDiscount = discounts
                      .filter(dis => dis)
                      .find(dis => dis._id === product.discount);
                    const discountPercent = productDiscount ? Number(productDiscount.value) : 0;
                    const currentPrice = Number(product.price) * ((100 - discountPercent) / 100);
                    const productAuthor = authorName.find(author => author._id === product.author);
                    return (
                      <div className="san-pham-item-page" key={product._id}>
                        <img
                          src={productImage?.url || ""}
                          alt={product.name}
                        />
                        <Link to={`/product/${product._id}`} className="sach-title">
                          {product.name}
                        </Link>
                        <div className="price-current">
                          {currentPrice.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                          })}
                        </div>
                        <div className="shop-name-price-old">
                          <div className="price-old">
                            {Number(product.price).toLocaleString('vi-VN', {
                              style: 'currency',
                              currency: 'VND'
                            })}
                          </div>
                          <div className="shop-name">
                            {productAuthor ? productAuthor.name : ''}
                          </div>
                        </div>
                        <div
                          className="add-to-cart"
                          onClick={() => {
                            addCart(product, productImage);
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          THÊM VÀO GIỎ
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>Đang tải sản phẩm...</p>
                )}
              </div>
            </div>
          </div>
          <div className="pagination" id="pagination-container" />
        </article>
      </div>

      {/* Phân trang */}
      <nav className="clearfix nav_pagi f-left w_100" style={{ margin: '20px 0' }}>
        <ul className="pagination clearfix">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a className="page-link" href="#!" onClick={() => currentPage > 1 && doSearch(currentPage - 1)}>
              <i className="fas fa-caret-left"></i>
            </a>
          </li>
          {/* Ví dụ hiển thị 3 trang đứng gần currentPage */}
          {[currentPage - 1, currentPage, currentPage + 1].map((page, index) => {
            if (page < 1) return null;
            return (
              <li key={index} className={`page-item ${page === currentPage ? 'active disabled' : ''}`}>
                <a className="page-link" href="#!" onClick={() => doSearch(page)}>
                  {page}
                </a>
              </li>
            );
          })}
          <li className="page-item">
            <a className="page-link" href="#!" onClick={() => doSearch(currentPage + 1)}>
              <i className="fas fa-caret-right"></i>
            </a>
          </li>
        </ul>
      </nav>

      <section className="intro-section">
        <div className="intro-container">
          <div className="intro-item">
            <i style={{ fontSize: '55px' }} className="bi bi-truck"></i>
            <p>
              <strong>MIỄN PHÍ VẬN CHUYỂN</strong>
              <br />
              Đơn hàng từ 500,000VND
            </p>
          </div>
          <div className="intro-item">
            <img src="https://media-hosting.imagekit.io//eddb2ce4d6a74b79/Last%2024%20Hours.png?Expires=1835360299&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=KlbhxUiQ5M2DKrj10oGxPShxmrHnmnwAYJXWu~ErW8XBqGhVkLqJxdL9y6LEX6mq6HU3fpUWnqEZ36XHkZrg1OD0Idmy76PcRrJIiJPoW0~4V2Bp1apPhLJZg4J2DQwi6lqsfgBKL7C47Hzjn8XMyv8Y~Q7IxQiPcUa8kTkUyqggKKzsQot8C95pH38B3MmkEBGfg6Ppnc2zLS4YWkegmKMitd7hroNslOYzse9KZNkkf77kiefirpeVEzRzgM3OK-trRbif005NSFFJOhig2GYCY433pbM7IuL8Q3bWTJxJvbgX~tzv8TT0Z5-FZYVf5bqJVZAAnJaoxkxpt7DhvQ__" alt="Convenience" />
            <p>
              <strong>DỄ DÀNG TIỆN LỢI</strong>
              <br />
              Đặt sách theo yêu cầu
            </p>
          </div>
          <div className="intro-item">
            <i style={{ fontSize: '55px' }} className="bi bi-box"></i>
            <p>
              <strong>TÍCH ĐIỂM ĐỔI QUÀ</strong>
              <br />
              Nhận nhiều ưu đãi
            </p>
          </div>
          <div className="intro-item">
            <i style={{ fontSize: '55px', color: 'white' }} className="bi bi-star-fill"></i>
            <p>
              <strong>DỊCH VỤ 5 SAO</strong>
              <br />
              150+ rating từ Facebook
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;