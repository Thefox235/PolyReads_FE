import '../asset/css/detail.css';

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductByCate, getCategory, getProductById, getAuthor } from '../api/server';
import { Link } from 'react-router-dom';
import { useCart } from './context/cartContext';
import { getImages } from '../api/server';
const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [productByCate, setProductByCate] = useState({});
  const [productCate, setProductCate] = useState([]);
  const { addToCart } = useCart();
  const [images, setImages] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [authorName, setAuthorName] = useState('');
  // console.log(product.category);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const productData = await getProductById(id);
        // console.log('Fetched product:', productData);
        setProduct(productData);

        const imagesData = await getImages();
        // console.log('Fetched images:', imagesData);
        setImages(imagesData);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
      }
    };

    fetchData();

  }, [id]);
  // Lọc ra các hình ảnh phù hợp với sản phẩm hiện tại dựa trên product._id
  const productImages = images.filter(image => image.productId === product._id);

  // useEffect để kiểm tra giá trị của product ngay sau khi nó được gán vào state
  useEffect(() => {
    // console.log('Product state updated:', product);
  }, [product]);

  const idCate = product.category ? product.category : 'N/A';
  const idAuthor = product.ahutor ? product.author : 'N/A';

  // console.log(idCate);
  useEffect(() => {
    const fetchProductCate = async () => {
      try {
        const data = await getProductByCate(idCate);
        setProductCate(data);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy chi tiết sản phẩm:', error);
      }
    };

    if (idCate !== 'N/A') {
      fetchProductCate();
    }
  }, [idCate]);

  //fetch category
  useEffect(() => {
    const fetchCategory = async (idCate) => {
      try {
        const data = await getCategory(idCate); // Hàm getCategory() của bạn, trả về đối tượng danh mục
        const dataAuthor = await getAuthor(idAuthor);
        setCategoryName(data[0].name);
        setAuthorName(dataAuthor[0].name);
        // console.log(data[0].name);
      } catch (error) {
        console.error('Có lỗi khi lấy danh mục:', error);
      }
    };

    // Giả sử product là state chứa chi tiết sản phẩm
    if (product && product.category) {
      fetchCategory(product.category);
    }
  }, [product]);

  const fetchProductByCate = async () => {
    try {
      const mangadata = await getProductByCate(idCate);
      setProductByCate(mangadata);
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy sản phẩm hot:', error);
    }
  };
  fetchProductByCate();
  //chuyển tab
  const [activeTab, setActiveTab] = useState('motasp');

  const handleTabClick = (target) => {
    setActiveTab(target);
  };
  // Kiểm tra nếu product là một object rỗng
  if (!product) {
    return <p>Loading...</p>;
  }
  const wrapper = document.querySelector('.products-wrapper');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
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
  // console.log(productCate);

  const formattedPrice = product.price ? product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND', currencyDisplay: "code" }).replace("VND", "VNĐ") : 'N/A';
  return (
    <>

      <main>
        <div className="duongdan">
          <a href='/'>Trang chủ </a> &gt; {categoryName} &gt; {product.name}
        </div>
        <div className="detail">
          {productImages.length > 0 ? (
            productImages.map(img => (
              <img key={img._id} src={img.url} alt={product.name} />
            ))
          ) : (
            <p>Không có hình ảnh</p>
          )}
          <div className="content">
            <div className="content-1">
              <h3>{product.name}</h3>
              <div className="d-flex align-items-center gap-4">
                <p>
                  <span className="fw-bold">Tác giả</span>: {authorName}
                </p>
                <p>
                  <span className="fw-bold">Thể loại</span>: {categoryName}
                </p>
              </div>
              <div className="d-flex align-items-center gap-4 mb-3">
                <div>
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star" />
                </div>
                <p style={{ margin: 0 }}>(154 đánh giá)</p>
                <div>
                  <i className="bi bi-chat-left" />
                  <span>156</span>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="sphot">{formattedPrice}</div>
              </div>
              <div className="mt-2">
                <ul>
                  <li>Ngày phát hành: {product.published_date}</li>
                  <li>Ngôn ngữ: {product.language}</li>
                  <li>Số trang: {product.pages}</li>
                  <li>Hình thức: {product.format}</li>
                  <li>Kích Thước Bao Bì: {product.size} cm</li>
                  <li>NXB: {product.publisher}</li>
                </ul>
              </div>
            </div>
            <div className="content-2">
              <h5 className="fw-bold">Thông tin vận chuyển</h5>
              <p>
                Giao hàng đến
                <span className="fw-bold fs-6">
                  14 Hà Thị Khiêm, Quận 12, Hồ Chí Minh
                </span>
                <span className="text-primary"> Thay đổi</span>
              </p>
              <div>
                <div className="delivery-info d-flex gap-3 align-items-center">
                  <div className="delivery-icon">
                    <img
                      src="https://s3-alpha-sig.figma.com/img/7dca/d58a/4be22ce06d0af64c09778b15866e3adc?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Sb3nkQeCbEwIOauHfexg5U6UPUCQF-3TQiJ3mG9ld3DrgLhqiE3COrrfhMYwd96lTgz0GOnjO1EE90k7guMMeeU3oETmy8rC~ZoDwwUuveYhrqv6LGYO6lQMyrxLm--xZ9T3sN6v-Kpqkws2QMtBWEHCbDJYjRyk46cGIcvbts8kiTbElyE7L4iXlMWs5VufejxDqLFBpoJrjZsqT381V5WugFQJ2giPlWG9JjMEnq5A4GawgqbwoDhMNMe1iM2QRa4ePHWc7F5D0~mzr45kVq7IB7ccfqhUOtlMNUaSc6oPpM62WnsIW5sisjdXyTtUDX4qjgtdpkvjEyP7srzebg__"
                      width={30}
                      className="img-fluid"
                    />
                  </div>
                  <div className="delivery-details">
                    <div className="delivery-title fw-bold">Giao hàng tiêu chuẩn</div>
                    <div className="delivery-date">
                      Dự kiến giao hàng{" "}
                      <span className="fw-bolder">Thứ 2 - 06/01</span>
                    </div>
                  </div>
                </div>
                <div className="fw-bold">
                  Ưu đãi liên quan
                  <span className="fw-normal text-primary"> Xem thêm&gt;</span>
                </div>
                <div className="d-flex gap-1 mt-3">
                  <div className="discount-card d-flex align-items-center border p-1 gap-2">
                    <div className="discount-icon">
                      <img
                        src="https://s3-alpha-sig.figma.com/img/7dca/d58a/4be22ce06d0af64c09778b15866e3adc?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Sb3nkQeCbEwIOauHfexg5U6UPUCQF-3TQiJ3mG9ld3DrgLhqiE3COrrfhMYwd96lTgz0GOnjO1EE90k7guMMeeU3oETmy8rC~ZoDwwUuveYhrqv6LGYO6lQMyrxLm--xZ9T3sN6v-Kpqkws2QMtBWEHCbDJYjRyk46cGIcvbts8kiTbElyE7L4iXlMWs5VufejxDqLFBpoJrjZsqT381V5WugFQJ2giPlWG9JjMEnq5A4GawgqbwoDhMNMe1iM2QRa4ePHWc7F5D0~mzr45kVq7IB7ccfqhUOtlMNUaSc6oPpM62WnsIW5sisjdXyTtUDX4qjgtdpkvjEyP7srzebg__"
                        width={30}
                        alt="Discount Icon"
                        className="img-fluid"
                      />
                    </div>
                    <div className="discount-text">Mã giảm 20k - sách...</div>
                  </div>
                  <div className="d-flex align-items-center gap-2 border p-1 gap-2">
                    <img
                      src="https://s3-alpha-sig.figma.com/img/252f/95e9/f70b85f5034e90bebefa6e7a42921503?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=jMJWo3AJ66n6rffehw2ZvS5gWljoKUJggJoibiDdra4Jo-5pXIk7QXa4bodW8yVh21DoRUMeODuOSjdIYHMIhdUVLz7QO-1qBfsl6aTeEjZUIpuch8olhTOaSuC5wbXLCzP~RuZHFVJIwhNR3lQf77Y7dQzw2ymecc3~NyX-mb8t7QOaQeI272l5qbBixKjRgS6gFavhGnS2Ea~dVLLJ5GUv8uHoisAMU1CT-mdC1VxuWJHNblqtqXtY4Vu-~9V5EfmLyFFL3hLAlH1b3hSbpqSF2H1z40N8H9uX9VXyS52Q8aeSFw9leN0arFBx~lPf8wQbsUIZo205uwiFyTQfzg__"
                      width={30}
                      alt=""
                      className="img-fluid"
                    />
                    <div style={{ fontSize: 13 }}>Mã giảm phí vận ch...</div>
                  </div>
                </div>
                <div className="d-flex align-items-center mt-2 mb-2 gap-2">
                  <img
                    src="https://media-hosting.imagekit.io//c2caec833b6e46b1/heart0.png?Expires=1835161260&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=ECcmFiPc25rbl0Ua6OVmPhaGXj9bv48u7DJ8WIHciHUxydXUxwlSoqdw4AdC~gB53Cd89-aCTQA0T9J-Oo6gyV5UMEUPOf3oarUUO3yWii47mhIDpBoddhkZ94GvkN9s~WkQbiyqJlrJzXNUrgLLOy8lOQvn8uCB3ZL39e6x4s~2b06sSG2~plFdvQC2tBHYyqXst7J1rXRRhtIDybKKQI28vuQVwogOBL6v-SLHeIve30qQ64bMS6KBx7JPTyqkkmf93yfez076uPj489G83T4fXAPCAboBqnT8S1XETXtfQZjL-Y2WsQz3BVM9vZ9HyShpbENHzuZVlT~tdjS6EQ__"
                    alt=""
                    width={23}
                    className="img-fluid"
                  />
                  <div className="">Thêm vào yêu thích</div>
                </div>
                <div className="quantity">
                  <div className="fs-6">Số lượng</div>
                  <button>-</button>
                  <input type="text" placeholder={1} className="text-center" />
                  <button>+</button>
                </div>
                <button className="addcart">Thêm vào giỏ hàng</button>
              </div>
            </div>
          </div>
        </div>
        {/* tab start */}
        <div className="tabs-container">
          <div
            className="d-flex tabs tab-menu justify-content-center gap-3 fs-4 mb-3"
            style={{ color: "#898989" }}
          >
            <div
              className={`tab ${activeTab === 'motasp' ? 'active' : ''}`}
              onClick={() => handleTabClick('motasp')}
              data-target="motasp"
            >
              MÔ TẢ
            </div>
            <div
              className={`tab ${activeTab === 'thongtin' ? 'active' : ''}`}
              onClick={() => handleTabClick('thongtin')}
              data-target="thongtin"
            >
              THÔNG TIN
            </div>
            <div
              className={`tab ${activeTab === 'feedback' ? 'active' : ''}`}
              onClick={() => handleTabClick('feedback')}
              data-target="feedback"
            >
              ĐÁNH GIÁ
            </div>
          </div>
          <div className="chitiet">
            <div className={`motasp ${activeTab === 'motasp' ? 'active' : ''}`}>
              <div>Mô tả sản phẩm</div>
              <p>
                {product.description}
              </p>
            </div>
            <div className={`thongtin ${activeTab === 'thongtin' ? 'active' : ''}`}>
              <div style={{ fontSize: "2rem", fontWeight: 500, marginBottom: 20 }}>
                Thông tin sản phẩm
              </div>
              <div className="tt">
                <div className="tt1">Mã hàng</div>
                <div className="tt2">{product._id}</div>
              </div>
              <div className="tt">
                <div className="tt1">Tác giả</div>
                <div className="tt2">{authorName}</div>
              </div>
              <div className="tt">
                <div className="tt1">NXB</div>
                <div className="tt2">{product.publisher}</div>
              </div>
              <div className="tt">
                <div className="tt1">Năm XB</div>
                <div className="tt2">{product.published_date}</div>
              </div>
              <div className="tt">
                <div className="tt1">Ngôn Ngữ</div>
                <div className="tt2">{product.language}</div>
              </div>
              <div className="tt">
                <div className="tt1">Trọng lượng (gr)</div>
                <div className="tt2">{product.weight}</div>
              </div>
              <div className="tt">
                <div className="tt1">Kích Thước Bao Bì</div>
                <div className="tt2">{product.size} cm</div>
              </div>
              <div className="tt">
                <div className="tt1">Số trang</div>
                <div className="tt2">{product.pages}</div>
              </div>
              <div className="tt">
                <div className="tt1">Hình thức</div>
                <div className="tt2">{product.format}</div>
              </div>
              <div className="tt">
                <div className="tt1">Mã hàng</div>
                <div className="tt2 text-primary">
                  Top 100 sản phẩm Light Novel bán chạy của tháng
                </div>
              </div>
            </div>
            <div className={`feedback ${activeTab === 'feedback' ? 'active' : ''}`}>
              <div style={{ fontSize: "2rem", fontWeight: 500, marginBottom: 20 }}>
                Đánh giá sản phẩm
              </div>
              <div className="grid">
                <div className="rating-summary align-items-center gap-3">
                  <div className="rating-details d-flex flex-column justify-content-center align-items-center">
                    <div>
                      <span className="rating-score fs-1">5</span>/
                      <span className="total-score fs-3">5</span>
                    </div>
                    <div className="star-rating">
                      <i className="bi bi-star-fill" />
                      <i className="bi bi-star-fill" />
                      <i className="bi bi-star-fill" />
                      <i className="bi bi-star-fill" />
                      <i className="bi bi-star-fill" />
                    </div>
                    <span
                      className="rating-count"
                      style={{ color: "#00000099", fontSize: 14 }}
                    >
                      (4 đánh giá)
                    </span>
                  </div>
                  <div className="rating-filters dg">
                    <button>Tất cả</button>
                    <button>5 Sao</button>
                    <button>4 Sao</button>
                    <button>3 Sao</button>
                    <button>2 Sao</button>
                    <button>1 Sao</button>
                  </div>
                </div>
                <button className="btn-dg">
                  <img
                    src="https://media-hosting.imagekit.io//e53ddc3e6be34a6a/Hand%20With%20Pen.png?Expires=1835791964&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=PJC2u5WFpYM5ORSBexftdgeTtsCwdBwfnJwvlVOwvE-4MY8f8XIJUGcFa7Eyf8DD0HNW72RTGUponK7XVxUy5kZORgWfUssFzodQEXds0XcWBgozC1e9zfZ-GpzUbiZSjvRtqKni2Id6xz1YSQHeqbAKNm-aQnvuiEl0alOJEcoktpR2XUjh~cWF5cPQmBxAt7YoUT8hv5T0fOpLJ2LQsmp75-mS32ePvV0kvheoXxMrxNMD3ql-KS9xvwVd~ATa2WUcYxWKwYO1T0a9jwmXef~5bX3~L3lsUjn~A3NjSV2td7N0YK7RECrqIQ6-WEAq8CkEwRfoRoWJHTJuKIsfwQ__"
                    alt="Viết đánh giá"
                    width={30}
                  />
                  Viết đánh giá
                </button>
              </div>
              <div className="d-flex gap-4 mb-2">
                <div className="text-danger">Mới nhất</div>
                <div>Bình luận hữu ích nhất</div>
              </div>
              <div className="review">
                <div className="review-header">
                  <p className="review-author">Thượng</p>
                  <p className="review-date">13/08/2022</p>
                </div>
                <div className="review-body">
                  <div className="review-stars">
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                  </div>
                  <p className="review-text">
                    Thật sự đây là một lựa chọn không lãng phí thời giờ của mọi người
                    một chút nào đâu. Mình thật sự không nghĩ mình sẽ thích nó đến thế,
                    cứ đêm ngày say sưa với từng dòng chữ trong sách, đắm chìm vào trong
                    những bức tranh minh họa đầy tài tình, có lúc còn hòa mình vào những
                    hành động và cử chỉ siêu đáng yêu của cô bé Latina...
                  </p>
                  <span className="review-more">Xem thêm</span>
                  <div className="review-footer d-flex align-items-center gap-4">
                    <div className="review-helpful d-flex align-items-center gap-2">
                      <img
                        src="https://media-hosting.imagekit.io//da4de5807dfd47de/Facebook%20Like.png?Expires=1835791963&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=t7-46AdUsTOXIE0Cg7IiRQoWmEZY-~zS4UTkftE6X49wXu5dnBuHE4bBLHAJ7QneCpXBoznqrUvYVxXRNpUMOkF9McmwRXL3WzFqJgSdZ9uMlC2rlQMLqcSQNtE3c9gp49w8SFi1On4Or6ogcl4Ez52NblC-ZOnprHCIH3JudlH3WxmEFichJcfvH4WbzJRDQr6vl4ExjRYzGPtE1q8nt8coo8VDgcC4Tb0eXvhhJUJAwnH2Wdv074SyIJlVUKVdj1PeltUgclKm6cpKzvgnI5Lu~lw4LrNpqHcUjeqS5pPADVAjQ39AZCNwU4MiGuVitbVd8RNWVDeECLTA2UAeMg__"
                        width={18}
                        alt="Hữu ích"
                      />
                      <div className="review-helpful-text">Hữu ích (0)</div>
                    </div>
                    <div className="review-report">(!) Báo cáo</div>
                  </div>
                </div>
              </div>
              <div className="m-auto w-100">
                <div className="paginations">
                  <a href="#">&lt;</a>
                  <a href="#" className="active">
                    1
                  </a>
                  <a href="#">2</a>
                  <a href="#">3</a>
                  <a href="#">4</a>
                  <a href="#">&gt;</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/** Tag end */}
        <div>
          <div>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ borderBottom: "1px solid rgb(190, 188, 188)" }}
            >
              <div className="sptt">Sản phẩm tương tự</div>
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

                {productByCate && productByCate.length > 0 && images && images.length > 0 ? (
                  productByCate.map(product => {
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
        </div>
      </main>


    </>

  )
};

export default Detail;