
import '../asset/css/header.css';
import '../asset/css/sanpham.css';
// import { PulsatingButton } from "@/registry/magicui/pulsating-button";
import React, { useState, useEffect } from 'react';
import {
  getImages,
  getAllProduct,
  getProductHot,
  getProductByCate,
  getAuthor,
  getBanners,
  getDiscounts,
  getPosts,
  getCategory
} from '../api/server';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from "./context/cartContext";
const Home = () => {

  //banner
  const [activeBanners, setActiveBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  //product
  const { addToCart, clearCart } = useCart();
  const [products, setProducts] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [productHot, setProductHot] = useState([]);
  const [mangas, setManga] = useState([]);
  const [fantasys, setFantasy] = useState([]);
  const [images, setImages] = useState([]);
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  const [authorName, setAuthorName] = useState('');
  const [posts, setPosts] = useState([]);       // Danh sách bài post
  const [categoryName, setCategoryName] = useState([]);

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    // console.log(userData);
    if (userData) {
      setUser(JSON.parse(userData));
    }
    //cate
    // clearCart();
    const fetchCategory = async () => {
      try {
        const categoryData = await getCategory();
        setCategoryName(categoryData);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy danh mục:', error);
      }
    };
    fetchCategory();
    //post
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        // Lấy 10 bài post đầu tiên
        setPosts(data);
      } catch (err) {
        console.error("Lỗi khi lấy bài viết:", err);
      }
    };

    fetchPosts();

    const fetchProducts = async () => {
      try {
        const productsData = await getAllProduct();
        setProducts(productsData);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy sản phẩm:', error);
      }
    };
    fetchProducts();
    //discount
    const fetchDiscounts = async () => {
      try {
        const discountData = await getDiscounts();
        setDiscounts(discountData);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy mã giảm giá:', error);
      }
    };
    fetchDiscounts();
    // sản phẩm hot
    const fetchProductHot = async () => {
      try {
        const productsData = await getProductHot();
        setProductHot(productsData);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy sản phẩm hot:', error);
      }
    };
    fetchProductHot();
    // sản phẩm theo cate
    const idManga = "67c19c891d46a1cf08bca662";
    const idFantasy = "67c1a2f51d46a1cf08bca7d9";
    const fetchManga = async () => {
      try {
        const mangadata = await getProductByCate(idManga);
        setManga(mangadata);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy sản phẩm hot:', error);
      }
    };
    fetchManga();

    const fetchFantasy = async () => {
      try {
        const mangadata = await getProductByCate(idFantasy);
        setFantasy(mangadata);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy sản phẩm hot:', error);
      }
    };
    fetchFantasy();

    const fetchImages = async () => {
      try {
        const imagesData = await getImages();
        setImages(imagesData);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy hình ảnh:', error);
      }
    };
    fetchImages();

    const fecthAuthor = async () => {
      try {
        const authorData = await getAuthor();
        setAuthorName(authorData);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy hình ảnh:', error);
      }
    };
    fecthAuthor();

    const fetchBanners = async () => {
      try {
        const banners = await getBanners();
        const active = banners.filter(
          banner => banner.is_active === true && banner.position === 'line-banner'
        );
        setActiveBanners(active);
        setIsLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy banner:", error);
        setIsLoading(false);
      }
    };
    fetchBanners();

    const wrapper = document.querySelector('.products-wrapper');
    const wrapper2 = document.querySelector('.products-wrapper2');
    const wrapper3 = document.querySelector('.products-wrapper3');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const prev2Btn = document.getElementById('pre2');
    const next2Btn = document.getElementById('next2');
    const prev3Btn = document.getElementById('pre3');
    const next3Btn = document.getElementById('next3');
    let scrollAmount = 0;
    const step = 220;

    nextBtn?.addEventListener('click', () => {
      scrollAmount += step;
      wrapper.style.transform = `translateX(-${scrollAmount}px)`;
    });

    prevBtn?.addEventListener('click', () => {
      scrollAmount -= step;
      if (scrollAmount < 0) scrollAmount = 0;
      wrapper.style.transform = `translateX(-${scrollAmount}px)`;
    });

    next2Btn?.addEventListener('click', () => {
      scrollAmount += step;
      wrapper2.style.transform = `translateX(-${scrollAmount}px)`;
    });

    prev2Btn?.addEventListener('click', () => {
      scrollAmount -= step;
      if (scrollAmount < 0) scrollAmount = 0;
      wrapper2.style.transform = `translateX(-${scrollAmount}px)`;
    });

    next3Btn?.addEventListener('click', () => {
      scrollAmount += step;
      wrapper3.style.transform = `translateX(-${scrollAmount}px)`;
    });

    prev3Btn?.addEventListener('click', () => {
      scrollAmount -= step;
      if (scrollAmount < 0) scrollAmount = 0;
      wrapper3.style.transform = `translateX(-${scrollAmount}px)`;
    });
  }, []);

  useEffect(() => {
    const lineBanner = document.querySelector(".line-banner");
    const changeBackground = () => {
      if (lineBanner && activeBanners.length > 0) {
        lineBanner.style.backgroundImage = `url(${activeBanners[currentIndex].image_url})`;
        setCurrentIndex(prev => (prev + 1) % activeBanners.length);
      }
    };

    let intervalId;
    if (!isLoading && activeBanners.length > 0) {
      intervalId = setInterval(changeBackground, 3000);
    }
    return () => { if (intervalId) clearInterval(intervalId); };
  }, [activeBanners, currentIndex, isLoading]);

  const addCart = (product, productImages) => {
    console.log(product, productImages);
    const data = {
      product: product,
      img: productImages.url,
      quantity: 1,
    };
    addToCart(data);
  };
  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/login');
  };
  // console.log(mangas);
  // console.log(products);
  // console.log(images);
  return (
    <>

      <main className="p-5">
        <div>

          <div
            className="d-flex justify-content-between align-items-center"
            style={{ borderBottom: "1px solid rgb(190, 188, 188)" }}
          >
            <div className="title_top_menu tab_link_module">
              <h3><a href="new-arrivals" title="Sản phẩm hot">Sản phẩm hot</a></h3>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div
                style={{ color: "#917fb3", fontSize: 25, cursor: "pointer" }}
                id="prev"
              >
                &lt;
              </div>
              <div
                style={{ color: "#917fb3", fontSize: 25, cursor: "pointer" }}
                id="next"
              >
                &gt;
              </div>
            </div>
          </div>
          {/* product start */}
          <div className="list-product">
            <div className="products-wrapper">

              {productHot && productHot.length > 0 && images && images.length > 0 ? (
                productHot.map(product => {
                  const productImage = images.find(image => image.productId === product._id);
                  const productDiscount = discounts.filter(dis => dis).find((dis) => dis._id === product.discount);
                  // Tính current price nếu có discount
                  const discountPercent = productDiscount ? Number(productDiscount.value) : 0;
                  const currentPrice = Number(product.price) * ((100 - discountPercent) / 100);

                  return (
                    <div className="mobile-product" key={product._id}>
                      <div className="product-image">
                        <img src={productImage ? productImage.url : ''} alt={product.name} />
                      </div>
                      <div className="product-details">
                        <Link className="product-name" to={`/product/${product._id}`}>
                          {product.name}
                        </Link>
                        <div className="price-container">
                          {/* Giá sau giảm, tức là giá gốc trừ đi discount */}
                          <div className="product-price">
                            {currentPrice.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND"
                            })}
                          </div>
                          <div className="sale-badge">
                            -{discountPercent > 0 ? discountPercent : ''}%
                          </div>
                        </div>
                        <div className="price-sold-container">
                          {/* Hiển thị giá gốc, ở đây lưu trong product.price */}
                          <div className="product-old-price">
                            {Number(product.price).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND"
                            })}
                          </div>
                          <div className="product-sold">Đã bán {product.sale_count}</div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>Đang tải sản phẩm...</p>
              )}


            </div>
            {/* Repeat the above structure for each product, removing unique classes */}
          </div>
          {/* product end */}

        </div>
        <div className="line-banner">
          {/* <img
            src="https://media-hosting.imagekit.io//bcbb496d533e4d00/line-banner.png?Expires=1835165149&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=237bRo-L05FiJfg31Mz0CXoJKe0l3uDh9EiuKT6eNa8SwpNkfyf9Hoj4CC2eNlV27nq8YCaF6kKAJ~PL1vrleBlENBR0eZBCFr~HvhJoOrReZSFBkzUQg~2nQXYDux9lx99yBLnI-uZ4LxvVGNKuLVwfyHDjQ2agthAaQN4BegbKw-QFoy5fn94yjLTO-UEt1PZESQgD3ZxPWhQKOE98ot0jEgVGDBuvLm5jS4n3zCYSKTokY2fv5V7z7lUBb6Hs7XCsu72D7qKaGg~p8Ca2whu8AGO6mjzBTZ2RVC99up30jUMUCHRMiFZxEGMAO7gou5cP4O4vUaxtCjCtUofcOQ__"
            alt=""
          /> */}
        </div>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ borderBottom: "1px solid rgb(190, 188, 188)" }}
        >
          <div className="title_top_menu tab_link_module">
            <h3><a href="new-arrivals" title="Sản phẩm mới">Sản phẩm mới</a></h3>
          </div>
        </div>
        <div className='NewProducts'>
          {/* product start */}
          <div className="mt-2 d-flex align-items-center justify-content-center gap-3 overflow-hidden container-card2">
            {/* product start */}
            <div className="list-product">

              {/* Repeat the above structure for each product, removing unique classes */}
              {products && products.length > 0 && images && images.length > 0 ? (
                products.slice(0, 10).map(product => {
                  const productImage = images.find(image => image.productId === product._id);
                  const productDiscount = discounts.filter(dis => dis).find((dis) => dis._id === product.discount);
                  const discountPercent = productDiscount ? Number(productDiscount.value) : 0;
                  const currentPrice = Number(product.price) * ((100 - discountPercent) / 100);
                  return (

                    <div className="mobile-product" key={product._id}>
                      <div className="product-image">
                        <img src={productImage ? productImage.url : ''} alt={product.name} />
                      </div>
                      <div className="product-details">
                        <Link className="product-name" to={`/product/${product._id}`}>{product.name}</Link>
                        <div className="price-container">
                          <div className="product-price">
                            {currentPrice.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND"
                            })}
                          </div>
                          <div className="sale-badge">
                            -{discountPercent > 0 ? discountPercent : 0}%
                          </div>
                        </div>
                        <div className="price-sold-container">
                          <div className="product-old-price">
                            {Number(product.price).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND"
                            })}
                          </div>
                          <div className="product-sold">Đã bán {product.sale_count}</div>
                        </div>
                      </div>
                    </div>


                  );
                })
              ) : (
                <p>Đang tải sản phẩm...</p>
              )}
              {/* Repeat the above structure for each product, removing unique classes */}
            </div>


            {/* product end */}
          </div>
        </div>

        {/* Product End */}
        <div className="mt-2 d-flex align-items-center justify-content-center gap-3 overflow-hidden container-card3"></div>
        <br />
        <div className="d-flex justify-content-center">
          <Link
            to={'/product'}
          >

            <div className="container-button">
              <a href="#" className="button-page">
                <div className="button__content">
                  <span className="button__text">Xem thêm</span>
                  <i className="ri-corner-right-down-line" />
                  <div className="button__reflection-1" />
                  <div className="button__reflection-2" />
                </div>
                <img src="https://media-hosting.imagekit.io/efe5cf484a8c4cbf/tako.png?Expires=1838103475&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=VOGs6KVA9jzeBzQekUMYe5jcCHdOZqYCXmGXlqgABIxY6e0Y0nEXC5gL0DE4koB9lRzBOoU4p87MM0w6XHgDBFGhByzF~ZxV9DreZmY~3s2nxwviPs8O0oe1rrZM63Vb149b8mlAH-6ZOgzhnxVfTq4e21J8rmVpRd37CXJKS5SdBtj6bsSl1LHNp5HtwWHl2Dp7oxDp9znKGmcyeEEMlR4fVaPz4~pZOzKFkyUhcq8064xjSXuuoXv6qm5GjKXcZ2spQGENTYzI9gTuwN~jtR3Cf4jQU1LTXvuzhVmiAXPcI0XGq731mhGM-pYxEgHipyEcITK~rLEkSee545Womw__" alt="" className="button__star-1" />
                <img src="https://media-hosting.imagekit.io/efe5cf484a8c4cbf/tako.png?Expires=1838103475&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=VOGs6KVA9jzeBzQekUMYe5jcCHdOZqYCXmGXlqgABIxY6e0Y0nEXC5gL0DE4koB9lRzBOoU4p87MM0w6XHgDBFGhByzF~ZxV9DreZmY~3s2nxwviPs8O0oe1rrZM63Vb149b8mlAH-6ZOgzhnxVfTq4e21J8rmVpRd37CXJKS5SdBtj6bsSl1LHNp5HtwWHl2Dp7oxDp9znKGmcyeEEMlR4fVaPz4~pZOzKFkyUhcq8064xjSXuuoXv6qm5GjKXcZ2spQGENTYzI9gTuwN~jtR3Cf4jQU1LTXvuzhVmiAXPcI0XGq731mhGM-pYxEgHipyEcITK~rLEkSee545Womw__" alt="" className="button__star-2" />
                <img src="https://media-hosting.imagekit.io/5bfea4b205154cde/cookie.png?Expires=1838103475&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Jn1lUc~x0dEfASlc-FINzjW9WdQN7wbK4ijzr-TAMju0DYFkzcC-GsII6zpMsewrdZjYNc-oa8Wg82Wb~TqbXcx5saUwOQDuDmj1ByZ4B~xLz4Us-THvloLSu3zb8oyoRu0ydci-oA-ZuSQndORcIG1YRgh3QIK8mWVIZf2iXDyrW~e~KUCH~Q1wSETdXHj8UB4tpj3q0VnFrlsg9QSh1u0TtIikcZuf0nv~-GB3pzkU80zNALNClbRJxNiPRqz6BknN0iUiAfffFwnt5nFtTau2cCEiAPl516ldreksPUVp5AYLO3xvOU3hc0XrES7cuE6a8NSKIuyQ3-8ASQirLQ__" alt="" className="button__circle-1" />
                <img src="https://media-hosting.imagekit.io/5bfea4b205154cde/cookie.png?Expires=1838103475&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Jn1lUc~x0dEfASlc-FINzjW9WdQN7wbK4ijzr-TAMju0DYFkzcC-GsII6zpMsewrdZjYNc-oa8Wg82Wb~TqbXcx5saUwOQDuDmj1ByZ4B~xLz4Us-THvloLSu3zb8oyoRu0ydci-oA-ZuSQndORcIG1YRgh3QIK8mWVIZf2iXDyrW~e~KUCH~Q1wSETdXHj8UB4tpj3q0VnFrlsg9QSh1u0TtIikcZuf0nv~-GB3pzkU80zNALNClbRJxNiPRqz6BknN0iUiAfffFwnt5nFtTau2cCEiAPl516ldreksPUVp5AYLO3xvOU3hc0XrES7cuE6a8NSKIuyQ3-8ASQirLQ__" alt="" className="button__circle-2" />
                <img src="https://media-hosting.imagekit.io/2cf2571ba18c4284/tako2.png?Expires=1838103475&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Uw1IC84qGFkaBjWuh07~yZJrWxpbc3EPMD2J~vf9nGidrgSona-Wn3Z1~u-WPG140wDbEG-yGPq4jDsIG2FWvAvExzao6bTHm926~G8PUgj83nfd5tzWgfwEak03OarmjUt978P-eNanqnNYylH4IK6B8Pry4M--rUHT7s8~fIa4BWK0CeaQH7LktmOrAwVI3QqI6sUD0aYgS3HuCH-8S9gJRpZCGNWAJdWphav~HlqZgA6uIcqHFSDH6koGIsNLyaxQJ7MlRLgG3-EpB9QnKrFrHGbrwfNa68LnE9TzBr8nn0tpVn8VwkjLhxF7KMdqFFfWOSCe0l-v~WpodJhkYA__" alt="" className="button__diamond" />
                <img src="https://media-hosting.imagekit.io/2cf2571ba18c4284/tako2.png?Expires=1838103475&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Uw1IC84qGFkaBjWuh07~yZJrWxpbc3EPMD2J~vf9nGidrgSona-Wn3Z1~u-WPG140wDbEG-yGPq4jDsIG2FWvAvExzao6bTHm926~G8PUgj83nfd5tzWgfwEak03OarmjUt978P-eNanqnNYylH4IK6B8Pry4M--rUHT7s8~fIa4BWK0CeaQH7LktmOrAwVI3QqI6sUD0aYgS3HuCH-8S9gJRpZCGNWAJdWphav~HlqZgA6uIcqHFSDH6koGIsNLyaxQJ7MlRLgG3-EpB9QnKrFrHGbrwfNa68LnE9TzBr8nn0tpVn8VwkjLhxF7KMdqFFfWOSCe0l-v~WpodJhkYA__" alt="" className="button__triangle" />
                <div className="button__shadow" />
              </a>
            </div>


          </Link>
        </div>
        <br />
        <br />
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ borderBottom: "1px solid rgb(190, 188, 188)" }}
        >
          <div className="title_top_menu tab_link_module">
            <h3><a href="new-arrivals" title="Truyện Tranh">Truyện Tranh</a></h3>

          </div>
          <div className="d-flex align-items-center gap-3">
            <div style={{ color: "#917fb3", fontSize: 25 }} id="pre2">
              &lt;
            </div>
            <div style={{ color: "#917fb3", fontSize: 25 }} id="next2">
              &gt;
            </div>
          </div>
        </div>
        {/* Product Start */}
        <div className="san-pham">
          <div className="products-wrapper2">

            {mangas && mangas.length > 0 && images && images.length > 0 && authorName && authorName.length > 0 ? (
              mangas.map(product => {
                const productImage = images.find(image => image.productId === product._id);
                const productDiscount = discounts
                  .filter(dis => dis)
                  .find(dis => dis._id === product.discount);
                // Tính current price nếu có discount
                const discountPercent = productDiscount ? Number(productDiscount.value) : 0;
                const currentPrice = Number(product.price) * ((100 - discountPercent) / 100);
                const productAuthor = authorName.find(author => author._id === product.author);
                return (
                  <div className="san-pham-item" key={product._id}>
                    <img src={productImage.url} alt={product.name} />
                    <Link to={`/product/${product._id}`} className="sach-title">
                      {product.name}
                    </Link>
                    <div className="price-current">
                      {currentPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND"
                      })}
                    </div>
                    <div className="shop-name-price-old">
                      <div className="price-old">
                        {Number(product.price).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND"
                        })}
                      </div>
                      <div className="shop-name">
                        {productAuthor ? productAuthor.name : ''}
                      </div>
                    </div>
                    <div
                      className="add-to-cart"
                      onClick={() => {
                        // Gọi hàm addCart với product và ảnh của sản phẩm
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
        {/* Product End */}
        <br />
        <br />
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ borderBottom: "1px solid rgb(190, 188, 188)" }}
        >
          <div className="title_top_menu tab_link_module">
            <h3><a href="new-arrivals" title="Viễn Tưởng">Viễn Tưởng</a></h3>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div style={{ color: "#917fb3", fontSize: 25 }} id="pre3">
              &lt;
            </div>
            <div style={{ color: "#917fb3", fontSize: 25 }} id="next3">
              &gt;
            </div>
          </div>
        </div>
        {/* Product Start */}
        <div className="san-pham">
          <div className="products-wrapper3">

            {fantasys && fantasys.length > 0 && images && images.length > 0 && authorName && authorName.length > 0 ? (
              fantasys.map(product => {
                const productImage = images.find(image => image.productId === product._id);
                const productDiscount = discounts.filter(dis => dis).find((dis) => dis._id === product.discount);
                // Tính current price nếu có discount
                const discountPercent = productDiscount ? Number(productDiscount.value) : 0;
                const currentPrice = Number(product.price) * ((100 - discountPercent) / 100);
                const productAuthor = authorName.find(
                  (author) => author._id === product.author
                );
                return (

                  <div className="san-pham-item" key={product._id}>
                    <img
                      src={productImage.url}
                      alt={product.name}
                    />
                    <Link to={`/product/${product._id}`} className="sach-title">
                      {product.name}
                    </Link>
                    <div className="price-current">
                      {currentPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND"
                      })}
                    </div>
                    <div className="shop-name-price-old">
                      <div className="price-old">
                        {Number(product.price).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND"
                        })}
                      </div>
                      <div className="shop-name">{productAuthor ? productAuthor.name : ''}</div>
                    </div>
                    <div
                      className="add-to-cart"
                      onClick={() => {
                        // Gọi hàm addCart với product và ảnh của sản phẩm
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
        {/* Product End */}

        <br />
        <br />
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ borderBottom: "1px solid rgb(190, 188, 188)" }}
        >
          <div className="title_top_menu tab_link_module">
            <h3><a href="/blog" title="Blog">Blog</a></h3>
          </div>

        </div>
        <div className="mt-3 blog gap-3">

          {posts && posts.length > 0 ? (
            (posts.slice(0, 3)).map((post, index) => {
              const postCate = categoryName.filter(cate => cate).find(cate => cate._id === post.tag);
              return (

                <div>
                  <div className="card-blog ">
                    <Link  to={`/blog/${post._id}`}>
                      <img
                        src={post.coverImage}
                        alt={post.slug}
                      />
                    </Link>

                    <Link
                      style={{ color: "#333333" }}
                      to={`/blog/${post._id}`} className="time d-flex justify-content-center align-items-center ">
                      <img
                        src="https://media-hosting.imagekit.io//1130699f09b34e04/Calendar.png?Expires=1837523307&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=JWvcYCc5XEVcl9FkztGpESUdoc57i1ANIOcx9mFXsfZp2eR8vy1JZyWYsu8YlDcRsev~cLZur2h-OxDiNOxKtonGz-zAo6ltwM4IqwtjDxaDHABBOMZRj~TqtKe4LxkPi9HXD0NfARdDprPD1815EuBOJ2RwbnTbwPdPFcNdXT6QP22x63xuPqoCwhPyZa2ld7BnqML-R47a3J-ob6DKA9~W7mSUJYyNrX26HStxi9PlofOCDWu47Krfea2e~K3btCVNx33N5pwX42mBEMawpkv3O9-dwf373CosOMB6qwqnOkYB3WCZSpR9SLg8WAm~rqHjuf6Fi6IFdbF5tztPLQ__"
                        alt="calendar"
                      />
                      <div className="posting-date ">{new Date(post.createdAt).toLocaleDateString()} </div>
                      <div>

                        Đăng bởi: <span className="fw-bold">Admin</span>
                      </div>
                    </Link>
                  </div>
                  <div className="cart-body mt-3">
                    <h5>
                      <Link
                        style={{ color: "#333333" }}
                        to={`/blog/${post._id}`}>
                        {post.title}
                      </Link>

                    </h5>
                    <p>
                      {post.content.length > 100
                        ? post.content.substring(0, 100) + "..."
                        : post.content}
                    </p>
                  </div>
                </div>

              );
            })
          ) : (
            <tr>
              <td colSpan="6">Đang tải bài viết...</td>
            </tr>
          )}

        </div>
      </main>





    </>

  )
}

export default Home;