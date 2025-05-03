// ViewPro.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getAllProduct,
  deleteProduct,
  getImages,
  getCategory,
  getAuthor,
  getPublishers,
  getDiscounts,
  getFilteredAuthors,
  getProductFilter,
  getProductSearch
} from "../../api/server";
import "../../asset/css/adminPro.css";
import CreatePro from "./createPro";
import EditPro from "./editPro";
import Modal from "../model";
import AdminSearchForm from './AdminSearchForm';
import CustomDropdown from "./CustomDropdown";

const ViewPro = () => {
  // Lấy thông tin từ location và navigate
  const location = useLocation();
  const navigate = useNavigate();

  // State cho modal Thêm/Sửa sản phẩm
  const [showCreateModal, setShowCreateModal] = useState(false);
  const openCreateModal = () => setShowCreateModal(true);
  const closeCreateModal = () => setShowCreateModal(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedProduct(null);
  };

  // Data states
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [authorList, setAuthorList] = useState([]);
  const [publisherList, setPublisherList] = useState([]);
  const [discountValue, setDiscountValue] = useState([]);

  // States cho tìm kiếm & phân trang & dropdown filter
  const [isSearch, setIsSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");

  // Load dữ liệu cố định: danh mục, hình ảnh, discount, publisher (chỉ chạy một lần khi mount)
  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        const [catData, discData, imgData, pubData] = await Promise.all([
          getCategory(),
          getDiscounts(),
          getImages(),
          getPublishers(),
        ]);
        // Lọc ra các danh mục có type "Product"
        const productCategories = catData.filter((cat) => cat.type === "Product");
        setCategoryList(productCategories);
        setDiscountValue(discData);
        setImages(imgData);
        setPublisherList(pubData);
      } catch (error) {
        console.error("Lỗi khi load dữ liệu cố định:", error);
      }
    };
    fetchStaticData();
  }, []);

  // Load danh sách tác giả: nếu có chọn danh mục -> lấy tác giả theo danh mục đó, ngược lại tải tất cả
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        if (selectedCategory) {
          const filteredAuthors = await getFilteredAuthors({ category: selectedCategory });
          setAuthorList(filteredAuthors);
        } else {
          const allAuthors = await getAuthor();
          setAuthorList(allAuthors);
        }
      } catch (error) {
        console.error("Lỗi khi load tác giả:", error);
      }
    };
    fetchAuthors();
  }, [selectedCategory]);

  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (isSearch && searchTerm.trim() !== "") {
          const params = { field: "name", keyword: searchTerm, page: currentPage, limit };
          const productsData = await getProductSearch(params);
          // Giả sử API tìm kiếm cũng trả về { total, products }
          console.log(productsData);
          setProducts(productsData);

          setTotalProducts(productsData.total);
        } else {
          const params = { page: currentPage, limit };
          if (selectedCategory) params.category = selectedCategory;
          if (selectedAuthor) params.author = selectedAuthor;
          const productsData = await getProductFilter(params);
          console.log(getProductFilter(params));
          setProducts(productsData.products);
          setTotalProducts(productsData.total);
        }
      } catch (error) {
        console.error("Lỗi khi load sản phẩm:", error);
      }
    };
    fetchProducts();
  }, [isSearch, searchTerm, currentPage, selectedCategory, selectedAuthor]);

  // Đồng bộ hóa state từ URL (query parameters)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchFlag = params.get("search");
    const keyword = params.get("keyword") || "";
    const page = params.get("page");
    const category = params.get("category") || "";

    if (searchFlag === "true" && keyword.trim() !== "") {
      setIsSearch(true);
      setSearchTerm(keyword);
    } else {
      setIsSearch(false);
      setSearchTerm("");
    }

    if (page) {
      setCurrentPage(Number(page));
    } else {
      setCurrentPage(1);
    }

    setSelectedCategory(category);
  }, [location.search]);

  // Các hàm xử lý thêm, sửa, xóa sản phẩm
  const handleCreateSuccess = async (newProduct) => {
    setProducts(prev => [...prev, newProduct]);
    const freshProducts = await getAllProduct();
    setProducts(freshProducts);
    const freshImages = await getImages();
    setImages(freshImages);
    const freshCategories = await getCategory();
    setCategoryList(freshCategories);
    const freshAuthors = await getAuthor();
    setAuthorList(freshAuthors);
    const freshPublishers = await getPublishers();
    setPublisherList(freshPublishers);
    const freshDiscount = await getDiscounts();
    setDiscountValue(freshDiscount);
  };

  const handleEditSuccess = (updatedProduct) => {
    setProducts(prev =>
      prev.map(product =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      alert("Sản phẩm đã được xóa");
      setProducts(prev => prev.filter(prod => prod._id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  // Handlers cho dropdown
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
    // Khi chọn danh mục thì có thể reset giá trị tác giả
    setSelectedAuthor("");
  };

  const handleAuthorChange = (value) => {
    setSelectedAuthor(value);
    setCurrentPage(1);
  };

  // Hàm chuyển trang
  const doSearch = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      const params = new URLSearchParams();
      if (selectedCategory) params.set("category", selectedCategory);
      if (selectedAuthor) params.set("author", selectedAuthor);
      params.set("page", page);
      params.set("limit", limit);
      navigate(`/viewPro?${params.toString()}`);
    }
  };

  console.log(products);
  return (
    <div>
      <div className="admin-product">
        {/* Thanh thao tác */}
        <div className="admin-product__action" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="admin-product__category-title">
            Sản phẩm: {totalProducts} quyển hiện có
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Thanh tìm kiếm với AdminSearchForm */}
            <AdminSearchForm />
            {/* Dropdown lọc danh mục */}
            <CustomDropdown
              options={categoryList}
              selected={selectedCategory}
              onChange={handleCategoryChange}
              defaultLabel="Tất cả danh mục"
            />
            {/* Dropdown lọc tác giả */}
            <CustomDropdown
              options={authorList}
              selected={selectedAuthor}
              onChange={handleAuthorChange}
              defaultLabel="Tất cả tác giả"
            />
          </div>
          <button className="admin-product__btn-add-category" onClick={openCreateModal}>
            Thêm Sản Phẩm
          </button>
        </div>

        {/* Bảng hiển thị sản phẩm */}
        <table className="admin-product__table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Hình Ảnh</th>
              <th>Tên Sách</th>
              <th>Nhà Xuất Bản</th>
              <th>Giá</th>
              <th>Danh Mục</th>
              <th>Tác Giả</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((prod, index) => {
                const prodCategory = prod.category ? prod.category.name : "";
                const prodAuthor = prod.author ? prod.author.name : "";
                const prodPublisher = prod.publisher ? prod.publisher.name : "";
                const prodImage = images.find((img) => img.productId === prod._id);
                return (
                  <tr key={prod._id || index}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={prodImage ? prodImage.url : ""} alt={prod.name} width="60" />
                    </td>
                    <td>{prod.name}</td>
                    <td>{prodPublisher}</td>
                    <td>
                      {Number(prod.price).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td>{prodCategory}</td>
                    <td>{prodAuthor}</td>
                    <td className="action-button">
                      <button
                        onClick={() => {
                          if (window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
                            handleDelete(prod._id);
                          }
                        }}
                        className="trash"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                      <button onClick={() => openEditModal(prod)} className="fix">
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
        {/* Phân trang */}
        <div className="clearfix_viewPro nav_pagi f-left w_100" style={{ margin: "20px 0" }}>
          <ul className="pagination clearfix">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#!"
                onClick={() => currentPage > 1 && doSearch(currentPage - 1)}
              >
                <i className="fas fa-caret-left"></i>
              </a>
            </li>
            {[currentPage - 1, currentPage, currentPage + 1].map((page, idx) => {
              if (page < 1) return null;
              return (
                <li key={idx} className={`page-item ${page === currentPage ? "active disabled" : ""}`}>
                  <a
                    className="page-link"
                    href="#!"
                    onClick={(e) => { e.preventDefault(); doSearch(page); }}
                  >
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
        </div>
      </div>



      {/* Modal CreatePro */}
      {showCreateModal && (
        <Modal onClose={closeCreateModal}>
          <CreatePro onClose={closeCreateModal} onCreateSuccess={handleCreateSuccess} />
        </Modal>
      )}

      {/* Modal EditPro */}
      {showEditModal && selectedProduct && (
        <Modal onClose={closeEditModal}>
          <EditPro initialData={selectedProduct} onClose={closeEditModal} onEditSuccess={handleEditSuccess} />
        </Modal>
      )}
    </div>
  );
};

export default ViewPro;