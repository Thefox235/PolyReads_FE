import React, { useState, useEffect } from 'react';
import {
    getCategory,
    getProducts,
    getImages,
    getDiscounts,
    getAuthor,
    getPublishers

} from '../api/server';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from "./context/cartContext";
import '../asset/css/product.css';
const Product = () => {
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const [images, setImages] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const { addToCart } = useCart();
    const [authorName, setAuthorName] = useState('');
    const [publishers, setPublisher] = useState('');

    useEffect(() => {
        //nxb
        const fetchPublisher = async () => {
            try {
                const publisherData = await getPublishers();
                // Lọc ra các danh mục có type bằng 'product'
                setPublisher(publisherData);
            } catch (error) {
                console.error('Có lỗi xảy ra khi lấy nxb:', error);
            }
        };
        fetchPublisher();
        //cate
        const fetchCategory = async () => {
            try {
                const categoryData = await getCategory();
                // Lọc ra các danh mục có type bằng 'product'
                const productCategories = categoryData.filter(category => category.type === 'Product');
                setCategoryName(productCategories);
            } catch (error) {
                console.error('Có lỗi xảy ra khi lấy danh mục:', error);
            }
        };
        fetchCategory();
        //product
        const fetchProducts = async () => {
            try {
                const productData = await getProducts();
                setProducts(productData);
            } catch (error) {
                console.error('Có lỗi xảy ra khi lấy sản phẩm:', error);
            }
        }
        fetchProducts();

        const fetchDiscounts = async () => {
            try {
                const discountData = await getDiscounts();
                setDiscounts(discountData);
            } catch (error) {
                console.error('Có lỗi xảy ra khi lấy mã giảm giá:', error);
            }
        };
        fetchDiscounts();

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


    }, []);

    const addCart = (product, productImages) => {
        console.log(product, productImages);
        const data = {
            product: product,
            img: productImages.url,
            quantity: 1,
        };
        addToCart(data);
    };
    console.log(products);
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

            <>

                <div className="product-container">
                    <aside className="sidebar">
                        <div
                            className="d-flex justify-content-between align-items-center"
                            style={{ borderBottom: "1px solid rgb(190, 188, 188)" }}
                        >
                            <div className="title_top_menu_product tab_link_module">
                                <h3 className='product-title-h3'><a href="new-arrivals" title="Sản phẩm hot">Tất cả danh mục</a></h3>
                            </div>

                        </div>
                        <div className='sidebar-item'>
                            <ul>
                                <li>Tất cả</li>
                                {categoryName && categoryName.length > 0 ? (
                                    categoryName.map((dm, index) => (
                                        <li key={index}>{dm.name}</li>
                                    ))
                                ) : (
                                    <li >Đang tải danh mục...</li>
                                )}
                                {/* <li>Tất cả</li>
                                <li>Văn học</li>
                                <li>Notfications</li>
                                <li>Thơ ca</li>
                                <li>Manga, novel</li>
                                <li>Art, Photography &amp; Design</li>
                                <li>Nghiên cứu, Sách tham khảo</li>
                                <li>Sách giáo khoa</li>
                                <li>Sách về Việt Nam</li> */}
                            </ul>
                        </div>
                        <div
                            className="d-flex justify-content-between align-items-center"
                            style={{ borderBottom: "1px solid rgb(190, 188, 188)" }}
                        >
                            <div className="title_top_menu_product tab_link_module">
                                <h3 className='product-title-h3'><a href="new-arrivals" title="Sản phẩm hot">Tác giả</a></h3>
                            </div>

                        </div>
                        <div className='sidebar-item'>
                            <ul>
                                {authorName && authorName.length > 0 ? (
                                    authorName.map((au, index) => (
                                        <li>
                                            <input type="checkbox" /> {au.name}
                                        </li>
                                    ))
                                ) : (
                                    <li >Đang tải danh mục...</li>
                                )}
                            </ul>
                        </div>
                        <div
                            className="d-flex justify-content-between align-items-center"
                            style={{ borderBottom: "1px solid rgb(190, 188, 188)" }}
                        >
                            <div className="title_top_menu_product tab_link_module">
                                <h3 className='product-title-h3'><a href="new-arrivals" title="Sản phẩm hot">Nhà xuất bảng</a></h3>
                            </div>

                        </div>
                        <div className='sidebar-item'>

                            <ul>
                                {publishers && publishers.length > 0 ? (
                                    publishers.map((nxb, index) => (
                                        <li>
                                            <input type="checkbox" /> {nxb.name}
                                        </li>
                                    ))
                                ) : (
                                    <li >Đang tải danh mục...</li>
                                )}
                            </ul>
                        </div>
                        <div
                            className="d-flex justify-content-between align-items-center"
                            style={{ borderBottom: "1px solid rgb(190, 188, 188)" }}
                        >
                            <div className="title_top_menu_product tab_link_module">
                                <h3 className='product-title-h3'><a href="new-arrivals" title="Sản phẩm hot">Giá tiền</a></h3>
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
                        <div className="product-list" id="product-container" >
                            <div className="san-pham-page">
                                <div className="products-wrapper-page">

                                    {products && products.length > 0 && images && images.length > 0 && authorName && authorName.length > 0 ? (
                                        products.slice(0, 20).map(product => {
                                            const productImage = images.find(image => image.productId === product._id);
                                            const productDiscount = discounts.filter(dis => dis).find((dis) => dis._id === product.discount);
                                            // Tính current price nếu có discount
                                            const discountPercent = productDiscount ? Number(productDiscount.value) : 0;
                                            const currentPrice = Number(product.price) * ((100 - discountPercent) / 100);
                                            const productAuthor = authorName.find(
                                                (author) => author._id === product.author
                                            );
                                            return (

                                                <div className="san-pham-item-page" key={product._id}>
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
                        </div>
                        <div className="pagination" id="pagination-container" />
                    </article>

                </div >

                <nav class="clearfix nav_pagi f-left w_100">
                    <ul class="pagination clearfix">
                        <li class="page-item disabled"><a class="page-link" href="#"><i class="fas fa-caret-left"></i></a></li>
                        <li class="active page-item disabled"><a class="page-link" href="javascript:;">1</a></li>
                        <li class="page-item"><a class="page-link" onclick="doSearch(2)" href="javascript:;">2</a></li>
                        <li class="page-item"><a class="page-link" onclick="doSearch(3)" href="javascript:;">3</a></li>
                        <li class="page-item"><a class="page-link" href="javascript:;">...</a></li>
                        <li class="page-item"><a class="page-link" onclick="doSearch(227)" href="javascript:;">227</a></li>
                        <li class="page-item hidden-xs"><a class="page-link" onclick="doSearch(2)" href="javascript:;"><i class="fas fa-caret-right"></i>
                        </a></li>
                    </ul>
                </nav>

                <section className="intro-section">
                    <div className="intro-container">
                        <div className="intro-item">
                            <img src="https://media-hosting.imagekit.io//d8885c8d45604926/Delivery.png?Expires=1835360299&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=h3~doExbW2hX03NPvvoewJn~-dZLh49v0YFJAMm9K6tj3Ju3ZV7L3~H4z1VQNHV9LQaUrwQmHhE-AeUEiwD~El~Y~FgdQ-jh59drRztXahsA7qthCLB-YmTg9wyXqX0HQ4A7IFe5XZz70e4tbprwH9Nzj~~Wme4wL7ruhzpe66QOkHXpug8jZvezcuU~DdIlF8QCrXj7J3NrrHA~yv4uLsGjgVKI2nbaS6KIcGDtu1~uduCYHFgl083eBHkQ1PrIWRIHH~V7CgXTpzfXggIriuQUCiG0H80w0MqYsHNjnuU-vg7vEjJnbl33AXWMYcNNObZYZqcRwk0eFLcXlTxkHA__" alt="Free Shipping" />
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
                            <img src="https://media-hosting.imagekit.io//60fec97ed3cc45d7/Open%20Parcel.png?Expires=1835360299&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=gZx2lghidwUpA6Eitt3swpkGc6uIjrIpqXmYi8IgbjLF5fHMLCmSzwDTkPnXFSLkyBVxtzo2kLH2Pmj8iF44VAbbIfJATLC1WVtHjFsFGmMAZi6JuDE8uwp0nQ3iZYgS3eij9eChl0MtsPYNqNisUdLXrcnKI9UQ20bSkuomkE33LJ7UWi5NOgsnmQzB4XTdkyad5gVaMhrGZ8VDUPMp4xjQfPJU6kQ5fGnDok5VQH3X3vKoxYO4LNgvV0-ogivix~Z2xl1XxBHDfO-Q3tEJwfEJdVDBWx~5PO7FJ3onlxSpfWM6zi5UyBQ9W184jmMEqhKUnpES7q2p9-gOv9-RbA__" alt="Loyalty Points" />
                            <p>
                                <strong>TÍCH ĐIỂM ĐỔI QUÀ</strong>
                                <br />
                                Nhận nhiều ưu đãi
                            </p>
                        </div>
                        <div className="intro-item">
                            <img src="https://media-hosting.imagekit.io//573ba216bb0f46c8/Hand%20Drawn%20Star.png?Expires=1835360299&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=HJUzEOeDs5AzeG04X~WFAVHqr7AuoYW46skJyQwyL-T2ivCAbPgHEtvgAdBhMyPd7SIc418z1u3h1dnJay2jCzEmpx-GgrsgX2xciwMe8Irpqs6PiaZNIJdt2YkYc98kcBjoWq6xIb1gRuH9RtTZBLL03V2Gln-Af4PGgJ~0RUmfhRsMpCm5Cp7g-DINj4ubC4ZjtsgKeRzjLwKJfRkmp5UNCWzCo729QEGLqMW5Q0zrDQ6IkHu6AZoWzEL0LxlWIbSf5TfR1yH1QVBLigN-HDF7eIC0OHmhWym1~Eexs7GEHmi~yyYLRV44iA08q-fTaABKXahigdaScyicwFWhAw__" alt="5-star Service" />
                            <p>
                                <strong>DỊCH VỤ 5 SAO</strong>
                                <br />
                                150+ rating từ Facebook
                            </p>
                        </div>
                    </div>
                </section>
            </>


        </>
    );
};
export default Product;
