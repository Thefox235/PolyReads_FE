
import '../asset/css/header.css';
import '../asset/css/sanpham.css';

import React, { useState, useEffect } from 'react';
import { getImages, getAllProduct, getProductHot, getProductByCate, getAuthor } from '../api/server';
import { Link, useNavigate } from 'react-router-dom';
const Home = () => {
  const [products, setProducts] = useState([]);
  const [productHot, setProductHot] = useState([]);
  const [mangas, setManga] = useState([]);
  const [fantasys, setFantasy] = useState([]);
  const [images, setImages] = useState([]);
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [authorName, setAuthorName] = useState('');


  useEffect(() => {
    // const userData = sessionStorage.getItem('user');

    // if (userData) {
    //   setUser(JSON.parse(userData));
    // }

    const fetchProducts = async () => {
      try {
        const productsData = await getAllProduct();
        setProducts(productsData);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy sản phẩm:', error);
      }
    };
    fetchProducts();
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

  // const handleLogout = () => {
  //   sessionStorage.removeItem('user');
  //   navigate('/login');
  // };
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
            <div className="sptt">Sản phẩm hot</div>
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
                  return (
                    <div className="mobile-product" key={product._id}>
                      <div className="product-image">
                        <img src={productImage ? productImage.url : ''} alt={product.name} />
                      </div>
                      <div className="product-details">
                        <Link className="product-name" to={`/product/${product._id}`}>{product.name}</Link>
                        <div className="price-container">
                          <div className="product-price">
                            {Number(product.price).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND"
                            })}
                          </div>
                          <div className="sale-badge">-50%</div>
                        </div>
                        <div className="price-sold-container">
                          <div className="product-old-price">100,000đ</div>
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
          <img
            src="https://media-hosting.imagekit.io//bcbb496d533e4d00/line-banner.png?Expires=1835165149&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=237bRo-L05FiJfg31Mz0CXoJKe0l3uDh9EiuKT6eNa8SwpNkfyf9Hoj4CC2eNlV27nq8YCaF6kKAJ~PL1vrleBlENBR0eZBCFr~HvhJoOrReZSFBkzUQg~2nQXYDux9lx99yBLnI-uZ4LxvVGNKuLVwfyHDjQ2agthAaQN4BegbKw-QFoy5fn94yjLTO-UEt1PZESQgD3ZxPWhQKOE98ot0jEgVGDBuvLm5jS4n3zCYSKTokY2fv5V7z7lUBb6Hs7XCsu72D7qKaGg~p8Ca2whu8AGO6mjzBTZ2RVC99up30jUMUCHRMiFZxEGMAO7gou5cP4O4vUaxtCjCtUofcOQ__"
            alt=""
          />
        </div>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ borderBottom: "1px solid rgb(190, 188, 188)" }}
        >
          <div className="sptt">Sản phẩm mới</div>
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
                  return (

                    <div className="mobile-product" key={product._id}>
                      <div className="product-image">
                        <img src={productImage ? productImage.url : ''} alt={product.name} />
                      </div>
                      <div className="product-details">
                        <Link className="product-name" to={`/product/${product._id}`}>{product.name}</Link>
                        <div className="price-container">
                          <div className="product-price">
                            {Number(product.price).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND"
                            })}
                          </div>
                          <div className="sale-badge">-50%</div>
                        </div>
                        <div className="price-sold-container">
                          <div className="product-old-price">100,000đ</div>
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
          <button className="btn-xt">Xem thêm</button>{" "}
        </div>
        <br />
        <br />
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ borderBottom: "1px solid rgb(190, 188, 188)" }}
        >
          <div className="sptt">Truyện tranh</div>
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
                const productAuthor = authorName.find(
                  (author) => author._id === product.author
                );
                return (

                  <div className="san-pham-item" key={product._id}>
                    <img
                      src={productImage.url}
                      alt={product.name}
                    />
                    <div className="sach-title">
                      {product.name}
                    </div>
                    <div className="price-current">
                      {Number(product.price).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND"
                      })}
                    </div>
                    <div className="shop-name-price-old">
                      <div className="price-old">98.000 đ</div>
                      <div className="shop-name">{productAuthor ? productAuthor.name : ''}</div>
                    </div>
                    <div className="add-to-cart">THÊM VÀO GIỎ</div>
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
          <div className="sptt">Viễn tưởng</div>
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
                const productAuthor = authorName.find(
                  (author) => author._id === product.author
                );
                return (

                  <div className="san-pham-item" key={product._id}>
                    <img
                      src={productImage.url}
                      alt={product.name}
                    />
                    <div className="sach-title">
                      {product.name}
                    </div>
                    <div className="price-current">
                      {Number(product.price).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND"
                      })}
                    </div>
                    <div className="shop-name-price-old">
                      <div className="price-old">98.000 đ</div>
                      <div className="shop-name">{productAuthor ? productAuthor.name : ''}</div>
                    </div>
                    <div className="add-to-cart">THÊM VÀO GIỎ</div>
                  </div>

                );
              })
            ) : (
              <p>Đang tải sản phẩm...</p>
            )}
          </div>
        </div>
        {/* Product End */}
        {/* product end */}
        <br />
        <br />
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ borderBottom: "1px solid rgb(190, 188, 188)" }}
        >
          <div className="sptt">Blog</div>
          <div className="d-flex align-items-center gap-3">
            <div style={{ color: "#917fb3", fontSize: 25 }}>&lt;</div>
            <div style={{ color: "#917fb3", fontSize: 25 }}>&gt;</div>
          </div>
        </div>
        <div className="mt-3 blog gap-3">
          <div>
            <div className="card-blog ">
              <img
                src="https://s3-alpha-sig.figma.com/img/2a51/eb3a/59c48b164f7129f269fbf3cd8ebc39e2?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=L7SKgo5psoI06ydBS6xntMiLAccWfWuy3TGM2okaLUKzeJK4IS22IS5m67jo6BbQHdAUhG-BkETlQcclPDdKiXuRoTugZCcKqZieeotKjj8tscekzjHdQqq-FPd0KSnEZVIEwdVAtRm6Smf-PPX6AThuDII7-eRQal6uh896e8UJa-fYuncm0v7dVwdNZaUZD0d8cE~Lm~A5mF2m5Ha8O7YUnrUd0Gcz5SSfHtV4aEvcPIQ6JxOov5B4A2BVaGGLY6AT5joo8CnBeCnLi5yfCwtEzvNojfWl7ZUcWqMUaX9c4Rx2g7yPxjl60pCsWRPkWyCu7ixbMP9gOqpgJTpGVg__"
                alt=""
              />
              <div className="time d-flex justify-content-center align-items-center ">
                <img
                  src="https://s3-alpha-sig.figma.com/img/1983/4611/cb3cb5fd2331bf6bf0c66f20d505d876?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=V1gMxNdHeCOgWjG9Y6ZLPUzCp~FYwV8AhtstYHWot4kcJ3O2ev8w~hpHiM3SoPXhE60WMmKYjIZBJ2x4g0QVXCyNcriJoZnZaU5j3rpNuU11XHDTZRv7K1-4pK~RNXNDjL3ASb62AwD07GGf7eei6O4dEzi2GXfxY0DtbG2NDPqMucSbK8u~N94F489uUp0uJlRZ1dK3FDS5PWhC2x3AEcr1PBurnlg5AeSt-I33Q23RXWnmZBZiHXX8I4d1R3xuZXKExcl6reRIJW~mR4~e8o4bH7avZtafZZsVPJaSsvdm~FyUOQGEkBNV-jXHv~N-g8ZaB8fIQq-to~ZuTZUP9A__"
                  alt=""
                />
                <div className="posting-date ">23/4/2020 </div>
                <div>
                  {" "}
                  Đăng bởi: <span className="fw-bold">ABC</span>
                </div>
              </div>
            </div>
            <div className="cart-body mt-3">
              <h5>
                Yuval Noah Harari: Chúng ta cần giáo dục con trẻ như thế nào để thành
                công nào năm 2050?
              </h5>
              <p>
                Yuval Noah Harari là tác gỉả người Israel&nbsp;được biết đến nhiều qua
                các cuốn sác...&nbsp;
              </p>
            </div>
          </div>
          <div>
            <div className="card-blog ">
              <img
                src="https://s3-alpha-sig.figma.com/img/9a24/be1a/1979ba9f5480ec51c03934784d58a9aa?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fMn2tyqM7roEWi5YhzDSTiUcwD-86YUZfOA3hG7k6gYyvl7pMdVH8bpZubGW1ikM21oOb0IXrxOPOoEbuwtpPvoY7iDswAZ6Qifc8QWGrzaI9aOn-VcF9~3Nqbvi0pt0cCgFYVWyjIbhYVR~ukFLKrICgIiC3tb7~ycRqbS2~dS149qs4-I1EZMeDyV7j6vN~9SA~TtlDsF~UPf~89j5gU3buv1F7Jw68y6LQUOEOz6tM5TDLmOjNJWensayHENu6oaxmo4wYYXHiCahxaid~~b7AjuuQlspfVACOj1dNwh5Ni3B4jXP8yA845zupihnAZZ98HpLT02IZBbyE8PFWw__"
                alt=""
              />
              <div className="time d-flex justify-content-center align-items-center ">
                <img
                  src="https://s3-alpha-sig.figma.com/img/1983/4611/cb3cb5fd2331bf6bf0c66f20d505d876?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=V1gMxNdHeCOgWjG9Y6ZLPUzCp~FYwV8AhtstYHWot4kcJ3O2ev8w~hpHiM3SoPXhE60WMmKYjIZBJ2x4g0QVXCyNcriJoZnZaU5j3rpNuU11XHDTZRv7K1-4pK~RNXNDjL3ASb62AwD07GGf7eei6O4dEzi2GXfxY0DtbG2NDPqMucSbK8u~N94F489uUp0uJlRZ1dK3FDS5PWhC2x3AEcr1PBurnlg5AeSt-I33Q23RXWnmZBZiHXX8I4d1R3xuZXKExcl6reRIJW~mR4~e8o4bH7avZtafZZsVPJaSsvdm~FyUOQGEkBNV-jXHv~N-g8ZaB8fIQq-to~ZuTZUP9A__"
                  alt=""
                />
                <div className="posting-date ">23/4/2020 </div>
                <div>
                  {" "}
                  Đăng bởi: <span className="fw-bold">ABC</span>
                </div>
              </div>
            </div>
            <div className="cart-body mt-3">
              <h5>
                Xếp hạng kết thúc của Jujutsu Kaisen, My Hero Academia và Call of the
                Night năm 2024
              </h5>
              <p>
                Năm 2024, cái kết của một số bộ manga được yêu thích đã để lại cho
                người...
              </p>
            </div>
          </div>
          <div>
            <div className="card-blog ">
              <img
                src="https://s3-alpha-sig.figma.com/img/fab4/6ead/f404d04341eab1b042c3dd60c800f9b7?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ZWC7ms-osv3n4YpOnCzV3KFhMIxXcRoX-1RLjKOBRrahUrDyOYvvY7Oht6YCVgbRZAFz9A00nTJFWGi1Xh3DyqjOpU0ETrVtQuZE8nkEsd1qoVkIeKH6gZXE9qFXpCxkKfj-5xxtWdp0sJ5BqoZqnL29WsloH~ltlXej0~YNkPkDRNKwbuABqMsjkXMCWqhcUgwNMgekvsTMsu3C-70hHT3nWHCe2BWnel5YADaAa6RVzBfEzMBT~o6zfIe~AhCk4oZmWRsFD18CoMeH0H~LSpJqds1g958sMntPm~FMrWNvwZYzDZcu51AybygLhbkraZgnoGgI8l~TM1cX5O5szw__"
                alt=""
              />
              <div className="time d-flex justify-content-center align-items-center ">
                <img
                  src="https://s3-alpha-sig.figma.com/img/1983/4611/cb3cb5fd2331bf6bf0c66f20d505d876?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=V1gMxNdHeCOgWjG9Y6ZLPUzCp~FYwV8AhtstYHWot4kcJ3O2ev8w~hpHiM3SoPXhE60WMmKYjIZBJ2x4g0QVXCyNcriJoZnZaU5j3rpNuU11XHDTZRv7K1-4pK~RNXNDjL3ASb62AwD07GGf7eei6O4dEzi2GXfxY0DtbG2NDPqMucSbK8u~N94F489uUp0uJlRZ1dK3FDS5PWhC2x3AEcr1PBurnlg5AeSt-I33Q23RXWnmZBZiHXX8I4d1R3xuZXKExcl6reRIJW~mR4~e8o4bH7avZtafZZsVPJaSsvdm~FyUOQGEkBNV-jXHv~N-g8ZaB8fIQq-to~ZuTZUP9A__"
                  alt=""
                />
                <div className="posting-date ">23/4/2020 </div>
                <div>
                  {" "}
                  Đăng bởi: <span className="fw-bold">ABC</span>
                </div>
              </div>
            </div>
            <div className="cart-body mt-3">
              <h5>Một số thuật ngữ sách ngoại văn bạn nên biết?</h5>
              <p>
                1. Movie tie-in edition Movie tie-in là thuật ngữ dùng để chỉ một cuốn
                sách mà...
              </p>
            </div>
          </div>
        </div>
      </main>





    </>

  )
}

export default Home;