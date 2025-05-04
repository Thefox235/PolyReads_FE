import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  getProductFilter,
  getCategory,
  getImages,
  getDiscounts,
  getAuthor,
  getPublishers,
  getFilteredAuthors,
  getFilteredPublishers,
  // Giá sử dụng API tìm kiếm
  // Giả định có hàm được export: getProductSearch từ api/server.js
  getProductSearch
} from '../api/server';
import { useCart } from "./context/cartContext";
import '../asset/css/product.css';

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [danhmuc, setDanhmuc] = useState(false);
  // Lấy tham số tìm kiếm (nếu có)
  const isSearch = queryParams.get("search") === "true";
  const searchField = queryParams.get("field") || null;
  const searchKeyword = queryParams.get("keyword") || null;

  // Nếu không là tìm kiếm, các filter mặc định như cũ:
  const initialCategory = isSearch ? null : (queryParams.get("category") || null);
  const initialAuthors = isSearch ? [] : (queryParams.get("author")
    ? queryParams.get("author").split(",")
    : []);
  const initialPublishers = isSearch ? [] : (queryParams.get("publisher")
    ? queryParams.get("publisher").split(",")
    : []);
  const initialPage = parseInt(queryParams.get("page"), 10) || 1;
  const limit = 20;

  // State tìm kiếm (nếu cần)
  const [products, setProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [images, setImages] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [authorList, setAuthorList] = useState([]);
  const [publisherList, setPublisherList] = useState([]);

  // Filter states cho trường hợp không tìm kiếm.
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedAuthors, setSelectedAuthors] = useState(initialAuthors);
  const [selectedPublishers, setSelectedPublishers] = useState(initialPublishers);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { addToCart } = useCart();

  // (Các useEffect khác giữ nguyên để load dữ liệu cố định như Category, Discounts, Images.)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catData, discData, imgData] = await Promise.all([
          getCategory(),
          getDiscounts(),
          getImages(),
        ]);
        const productCategories = catData.filter(cat => cat.type === 'Product');
        setCategoryList(productCategories);
        setDiscounts(discData);
        setImages(imgData);
      } catch (error) {
        console.error("Lỗi khi load dữ liệu cố định:", error);
      }
    };
    fetchData();
  }, []);

  // Nếu không phải tìm kiếm, load tác giả & nhà xuất bản dựa theo selectedCategory
  useEffect(() => {
    const fetchFilteredLists = async () => {
      try {
        if (!isSearch) {
          if (selectedCategory) {
            const [filteredAuth, filteredPub] = await Promise.all([
              getFilteredAuthors({ category: selectedCategory }),
              getFilteredPublishers({ category: selectedCategory }),
            ]);
            setAuthorList(filteredAuth);
            setPublisherList(filteredPub);
          } else {
            const [allAuth, allPub] = await Promise.all([
              getAuthor(),
              getPublishers(),
            ]);
            setAuthorList(allAuth);
            setPublisherList(allPub);
          }
        }
      } catch (error) {
        console.error("Lỗi khi load tác giả/nhà xuất bản theo category:", error);
      }
    };
    fetchFilteredLists();
  }, [selectedCategory, isSearch]);

  // --- Load sản phẩm ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (isSearch && searchField && searchKeyword) {
          // Nếu là tìm kiếm, gọi API tìm kiếm
          const productData = await getProductSearch({ field: searchField, keyword: searchKeyword, page: currentPage, limit });
          console.log(productData);
          setProducts(productData);
        } else {
          // Gọi API filter tổng hợp
          let params = { page: currentPage, limit };
          if (selectedCategory) params.category = selectedCategory;
          if (selectedAuthors.length > 0) params.author = selectedAuthors.join(",");
          if (selectedPublishers.length > 0) params.publisher = selectedPublishers.join(",");
          const productData = await getProductFilter(params);
          console.log(productData.products);
          setProducts(productData.products);
        }
      } catch (error) {
        console.error("Lỗi khi load sản phẩm:", error);
      }
    };
    fetchProducts();
  }, [isSearch, searchField, searchKeyword, selectedCategory, selectedAuthors, selectedPublishers, currentPage]);

  // Hàm thêm sản phẩm vào giỏ, chuyển trang, và xử lý chọn filter cũng giữ nguyên như trước...
  // (Ví dụ: addCart, doSearch, handleCategorySelect, handleAuthorToggle, handlePublisherToggle)

  // Hàm thêm sản phẩm vào giỏ
  const addCart = (product, productImage) => {
    const data = {
      product,
      img: productImage?.url || "",
      quantity: 1,
    };
    addToCart(data);
  };

  const doSearch = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      const params = new URLSearchParams();
      if (!isSearch) {
        if (selectedCategory) params.set("category", selectedCategory);
        if (selectedAuthors.length > 0) params.set("author", selectedAuthors.join(","));
        if (selectedPublishers.length > 0) params.set("publisher", selectedPublishers.join(","));
      } else {
        params.set("search", "true");
        if (searchField) params.set("field", searchField);
        if (searchKeyword) params.set("keyword", searchKeyword);
      }
      params.set("page", page);
      params.set("limit", limit);
      navigate(`/product?${params.toString()}`);
    }
  };

  // Các hàm xử lý chọn filter trong sidebar (nếu không tìm kiếm)
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    const params = new URLSearchParams();
    if (categoryId) params.set("category", categoryId);
    if (selectedAuthors.length > 0) params.set("author", selectedAuthors.join(","));
    if (selectedPublishers.length > 0) params.set("publisher", selectedPublishers.join(","));
    params.set("page", 1);
    params.set("limit", limit);
    navigate(`/product?${params.toString()}`);
  };

  const handleAuthorToggle = (authorId) => {
    setSelectedAuthors(prev => {
      if (prev.includes(authorId)) {
        return prev.filter(id => id !== authorId);
      } else {
        return [...prev, authorId];
      }
    });
    setCurrentPage(1);
  };

  const handlePublisherToggle = (publisherId) => {
    setSelectedPublishers(prev => {
      if (prev.includes(publisherId)) {
        return prev.filter(id => id !== publisherId);
      } else {
        return [...prev, publisherId];
      }
    });
    setCurrentPage(1);
  };

  // Tự động áp dụng filter khi các lựa chọn thay đổi (nếu không đang ở trạng thái tìm kiếm)
  useEffect(() => {
    if (!isSearch) {
      const params = new URLSearchParams();
      if (selectedCategory) params.set("category", selectedCategory);
      if (selectedAuthors.length > 0) params.set("author", selectedAuthors.join(","));
      if (selectedPublishers.length > 0) params.set("publisher", selectedPublishers.join(","));
      params.set("page", 1);
      params.set("limit", limit);
      navigate(`/product?${params.toString()}`);
    }
  }, [selectedCategory, selectedAuthors, selectedPublishers, isSearch]);

  useEffect(() => {
    const fetchSidebarLists = async () => {
      try {
        if (isSearch && searchKeyword) {
          // Nếu là chế độ tìm kiếm và có từ khóa, gọi API lọc theo keyword
          // (Bạn cần đảm bảo backend của bạn có hỗ trợ endpoint này)
          const [searchedAuthors, searchedPublishers] = await Promise.all([
            getFilteredAuthors({ keyword: searchKeyword }),
            getFilteredPublishers({ keyword: searchKeyword }),
          ]);
          setAuthorList(searchedAuthors);
          setPublisherList(searchedPublishers);
        } else if (selectedCategory) {
          // Nếu có category được chọn (và không ở chế độ tìm kiếm) thì lọc theo category
          const [filteredAuthors, filteredPublishers] = await Promise.all([
            getFilteredAuthors({ category: selectedCategory }),
            getFilteredPublishers({ category: selectedCategory }),
          ]);
          setAuthorList(filteredAuthors);
          setPublisherList(filteredPublishers);
        } else {
          // Còn lại, tải toàn bộ tác giả, nhà xuất bản
          const [allAuthors, allPublishers] = await Promise.all([
            getAuthor(),
            getPublishers(),
          ]);
          setAuthorList(allAuthors);
          setPublisherList(allPublishers);
        }
      } catch (error) {
        console.error("Error loading sidebar data:", error);
      }
    };
    fetchSidebarLists();
  }, [selectedCategory, isSearch, searchKeyword]);

  const selectedCategoryName =
    selectedCategory && categoryList.length > 0
      ? categoryList.find(cat => cat._id === selectedCategory)?.name
      : null;
  const selectedAuthorName =
    selectedAuthors.length > 0 && authorList.length > 0
      ? authorList
        .filter(auth => selectedAuthors.includes(auth._id))
        .map(auth => auth.name)
        .join(", ")
      : null;
  const selectedPublisherName =
    selectedPublishers.length > 0 && publisherList.length > 0
      ? publisherList
        .filter(pub => selectedPublishers.includes(pub._id))
        .map(pub => pub.name)
        .join(", ")
      : null;

  return (
    <>
      {/* Banner */}
      <section className="banner">
        <div className="banner-overlay">
          <h1>Sản phẩm</h1>
          <p style={{ fontSize: 20, fontWeight: 400 }}>
            <Link to="/">Trang chủ</Link> &gt;{" "}
            {!isSearch ? (
              <>
                {selectedCategory
                  ? (selectedCategoryName || "Sản phẩm lọc theo danh mục")
                  : "Tất cả sản phẩm"}
                {selectedAuthors.length > 0 && ` > Tác giả: ${selectedAuthorName}`}
                {selectedPublishers.length > 0 && ` > Nhà xuất bản: ${selectedPublisherName}`}
              </>
            ) : (
              <>
                Kết quả tìm kiếm: {searchField}: {searchKeyword}
              </>
            )}
          </p>
        </div>

        <div className="danhmuc " onClick={() => setDanhmuc(!danhmuc)}>
          {danhmuc === false ? (
            <img
              src="https://s3-alpha-sig.figma.com/img/5eb6/f072/7332695743681bad126d9f443d0b5617?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=H0J~5-n3eIWeWz76z7bJEN83ZDcuEczXTmD5EbDZXjxLGjAp7bfXuRLUWhFao~6~VflRB-T~wtBKILe9GWQ0mLg5zMVEwpVfZj1qUnFfoKHaHult0odOlzw3FFS0bBd~qUKcjXqQRtoyTnfVaH9SH-MmRsTUMOWhBkFU4sLznlH6YqXOkqs2TjDEryQest7KtoCKK~jhNLEiw-qsPt8bA4wsZ72ykg9aRphTk-JPmQqeM9PubX1oyLUj5hYAltxZrMMA8uEXlkVKWwrdOGgZGK-~SiMEMauUmePtTbMmnuCi7E1HDOt24VmsjIKlpdJeuQVdWDqavwKHoobrgh65qg__"
              alt=""
              width={40}
            />
          ) : (
            <div>X</div>
          )}
        </div>
      </section>

      <div
        className=" justify-content-between align-items-center px-4 p-sp"
        style={{ borderBottom: "1px solid rgb(190, 188, 188)" }}
      >
        <div className="title_top_menu tab_link_module mt-3">
          <h3>
            <a href="new-arrivals" title="Sản phẩm mới">
              Sản phẩm mới
            </a>
          </h3>
        </div>
      </div>

      <div className="product-container">
        <aside className={`sidebar ${danhmuc == false && "none"}`}>
          {/* Sidebar cho danh mục */}
          <div className="d-flex justify-content-between align-items-center" style={{ borderBottom: "1px solid rgb(190,188,188)" }}>
            <div className="title_top_menu_product tab_link_module">
              <h3 className="product-title-h3">
                <a href="#!" onClick={() => handleCategorySelect(null)}>Tất cả danh mục</a>
              </h3>
            </div>
          </div>
          <div className="sidebar-item">
            <ul>
              {categoryList && categoryList.length > 0 ? (
                categoryList.map((dm, index) => (
                  <li key={dm._id || index}>
                    <a href="#!" onClick={() => handleCategorySelect(dm._id)}>
                      {dm.name}
                    </a>
                  </li>
                ))
              ) : (
                <li>Đang tải danh mục...</li>
              )}
            </ul>
          </div>

          {/* Sidebar cho tác giả dạng checkbox */}
          <div className="d-flex justify-content-between align-items-center" style={{ borderBottom: "1px solid rgb(190,188,188)" }}>
            <div className="title_top_menu_product tab_link_module">
              <h3 className="product-title-h3">
                <a href="#!">Tất cả tác giả</a>
              </h3>
            </div>
          </div>
          <div className="sidebar-item">
            <ul>
              {authorList && authorList.length > 0 ? (
                authorList.map((au, index) => (
                  <li key={au._id || index}>
                    <label style={{ cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={selectedAuthors.includes(au._id)}
                        onChange={() => handleAuthorToggle(au._id)}
                      />{" "}
                      {au.name}
                    </label>
                  </li>
                ))
              ) : (
                <li>Đang tải tác giả...</li>
              )}
            </ul>
          </div>

          {/* Sidebar cho nhà xuất bản dạng checkbox */}
          <div className="d-flex justify-content-between align-items-center" style={{ borderBottom: "1px solid rgb(190,188,188)" }}>
            <div className="title_top_menu_product tab_link_module">
              <h3 className="product-title-h3">
                <a href="#!">Nhà xuất bản</a>
              </h3>
            </div>
          </div>
          <div className="sidebar-item">
            <ul>
              {publisherList && publisherList.length > 0 ? (
                publisherList.map((pub, index) => (
                  <li key={pub._id || index}>
                    <label style={{ cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={selectedPublishers.includes(pub._id)}
                        onChange={() => handlePublisherToggle(pub._id)}
                      />{" "}
                      {pub.name}
                    </label>
                  </li>
                ))
              ) : (
                <li>Đang tải nhà xuất bản...</li>
              )}
            </ul>
          </div>

          {/* Sidebar cho giá tiền (giữ nguyên) */}
          {/* <div className="d-flex justify-content-between align-items-center" style={{ borderBottom: "1px solid rgb(190,188,188)" }}>
            <div className="title_top_menu_product tab_link_module">
              <h3 className="product-title-h3">
                <a href="new-arrivals" title="Sản phẩm hot">Giá tiền</a>
              </h3>
            </div>
          </div>
          <div className="sidebar-item">
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
          </div> */}
        </aside>

        <article>
          <div className="product-list" id="product-container">
            <div className="san-pham-page">
              <div className="products-wrapper-page">
                {isSearch ? (
                  // Nếu đang ở chế độ search thì chỉ cần kiểm tra sản phẩm
                  products.length > 0 ? (
                    products.map(product => {
                      const productImage = images.find(image => image.productId === product._id);
                      const productDiscount = discounts.find(dis => dis && dis._id === product.discount);
                      const discountPercent = productDiscount ? Number(productDiscount.value) : 0;
                      const currentPrice = Number(product.price) * ((100 - discountPercent) / 100);
                      const productAuthor = product.author ? product.author.name : "";
                      return (
                        <div className="san-pham-item-page" key={product._id}>
                          <img src={productImage?.url || ""} alt={product.name} />
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
                              {productAuthor ? product.author.name : ''}
                            </div>
                          </div>
                          <div className="add-to-cart" onClick={() => addCart(product, productImage)} style={{ cursor: 'pointer' }}>
                            THÊM VÀO GIỎ
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p>Đang tải sản phẩm...</p>
                  )
                ) : (
                  // Nếu không phải search thì kiểm tra đầy đủ các mảng cần thiết
                  (products && products.length > 0 && images && images.length > 0 && authorList && authorList.length > 0) ? (
                    products.map(product => {
                      const productImage = images.find(image => image.productId === product._id);
                      const productDiscount = discounts.find(dis => dis && dis._id === product.discount);
                      const discountPercent = productDiscount ? Number(productDiscount.value) : 0;
                      const currentPrice = Number(product.price) * ((100 - discountPercent) / 100);
                      const productAuthor = product.author ? product.author.name : "";
                      return (
                        <div className="san-pham-item-page" key={product._id}>
                          <img src={productImage?.url || ""} alt={product.name} />
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
                              {productAuthor ? product.author.name : ''}
                            </div>
                          </div>
                          <div className="add-to-cart" onClick={() => addCart(product, productImage)} style={{ cursor: 'pointer' }}>
                            THÊM VÀO GIỎ
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p>Đang tải sản phẩm...</p>
                  )
                )
                }
              </div>
            </div>
          </div>
          <div className="pagination" id="pagination-container" />
        </article>
      </div>

      <nav className="clearfix nav_pagi f-left w_100" style={{ margin: '20px 0' }}>
        <ul className="pagination clearfix">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a className="page-link" href="#!" onClick={() => currentPage > 1 && doSearch(currentPage - 1)}>
              <i className="fas fa-caret-left"></i>
            </a>
          </li>
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
            <i style={{ fontSize: '55px' }} class="bi bi-emoji-smile-fill"></i>
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