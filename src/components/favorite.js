import React, { useState, useEffect } from 'react';
import "../asset/css/favorite.css";
import { deleteFavorite, getFavorite, getFavoriteSearch, getImages, getDiscounts } from "../api/server";
import { useCart } from "./context/cartContext";

const Favorite = () => {
  // Các state cần thiết
  const [favorite, setFavorite] = useState(null);
  const [images, setImages] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useCart();

  // Lấy danh sách yêu thích và discount khi component mount
  useEffect(() => {
    const fetchFavoriteData = async () => {
      try {
        const data = await getFavorite();
        setFavorite(data);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu yêu thích:", error);
      }
    };

    const fetchDiscounts = async () => {
      try {
        const data = await getDiscounts();
        setDiscounts(data);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu giảm giá:", error);
      }
    };

    fetchFavoriteData();
    fetchDiscounts();
  }, []);

  // Lấy hình ảnh của sản phẩm
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesData = await getImages();
        setImages(imagesData);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy hình ảnh:", error);
      }
    };

    fetchImages();
  }, []);

  // Hàm xử lý xóa một mục yêu thích (có xác nhận)
  const remove = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm khỏi danh sách yêu thích?")) {
      return;
    }
    try {
      const result = await deleteFavorite(id);
      if (result) {
        // Cập nhật lại state favorite
        setFavorite(prevFavorite => {
          if (!prevFavorite) return prevFavorite;
          return {
            ...prevFavorite,
            favorites: prevFavorite.favorites.filter(item => item._id !== id)
          };
        });
      } else {
        console.error(`Xóa yêu thích ${id} thất bại!`);
      }
    } catch (error) {
      console.error("Lỗi khi xóa yêu thích:", error);
    }
  };

  // Hàm thêm sản phẩm vào giỏ hàng
  const addCart = (product, productImages) => {
    const data = {
      product,
      img: productImages.url,
      quantity: 1,
    };
    addToCart(data);
  };

  // Hàm xử lý tìm kiếm. Khi gửi form tìm kiếm, gọi API getFavoriteSearch
  const handleSearch = async (e) => {
    e.preventDefault();
    // Lấy userId từ sessionStorage (giả sử user đã được lưu sau khi đăng nhập)
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      alert("Vui lòng đăng nhập để tìm kiếm trong danh sách yêu thích");
      return;
    }

    try {
      // Nếu từ khóa rỗng, ta load về danh sách yêu thích ban đầu
      if (searchTerm.trim() === "") {
        const data = await getFavorite();
        setFavorite(data);
      } else {
        // Gọi API tìm kiếm favorites theo userId và từ khóa
        const data = await getFavoriteSearch(user._id, searchTerm);
        setFavorite(data);
      }
    } catch (error) {
      console.error("Lỗi trong quá trình tìm kiếm favorites:", error);
    }
  };

  return (
    <>
      <section className="banner">
        <div className="banner-overlay">
          <h1>Yêu Thích</h1>
          <p style={{ fontSize: 20, fontWeight: 400 }}>
            <a href="/">Trang chủ</a> &gt; Yêu thích
          </p>
        </div>
      </section>

      <main className="checkout-session">
        <div className="favoraite-container" style={{ textAlign: "left" }}>
          {/* Thanh tìm kiếm tích hợp */}
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="searchyt mb-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* <button type="submit" className="search-btn">Tìm kiếm</button> */}
          </form>

          <div>
            {favorite?.favorites?.length > 0 ? (
              favorite.favorites.map((item) => {
                // Tìm hình ảnh của sản phẩm theo productId
                const productImage = images.find(
                  (image) => image.productId === item.productId._id
                );
                // Tìm giảm giá của sản phẩm nếu có
                const productDiscount = discounts.find(
                  (dis) => dis && dis._id === item.productId.discount
                );
                const discountPercent = productDiscount ? productDiscount.value : 0;
                const currentPrice = Number(item.productId.price) * ((100 - discountPercent) / 100);
                return (
                  <div className="favorite-item" key={item._id}>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        <img
                          src={productImage ? productImage.url : ""}
                          alt={item.productId.name}
                          style={{ width: "150px" }}
                        />
                        <div>
                          <div className="favorite-title">
                            <p>{item.productId.name}</p>
                          </div>
                          <div className="favorite-price">
                            {currentPrice.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND"
                            })}
                          </div>
                          <div className="addcart-moblie">
                            <br />
                            <button className="addcart mb-2">Thêm vào giỏ hàng</button>
                            <div
                              style={{ textAlign: "right", cursor: "pointer" }}
                              onClick={() => remove(item._id)}
                            >
                              <span className="fw-bold">X </span>xóa sản phẩm
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="addcart-table">
                        <button
                          onClick={() => {
                            addCart(item.productId, productImage);
                          }}
                          className="addcart mb-2"
                        >
                          Thêm vào giỏ hàng
                        </button>
                        <div
                          style={{ textAlign: "right", cursor: "pointer" }}
                          onClick={() => remove(item._id)}
                        >
                          <span className="fw-bold">X </span>xóa sản phẩm
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Danh sách yêu thích trống hoặc đang tải dữ liệu...</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Favorite;