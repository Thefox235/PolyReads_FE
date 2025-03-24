import React, { useState, useEffect } from 'react';
import '../asset/css/blog.css'
import {
    getImages,
    getProductHot,
    getDiscounts,
    getPosts,
    getCategory
} from '../api/server';
import { Link } from 'react-router-dom';
import ArticleSlider from './ArticleSlider';
import ArticleCard from './ArticleCardSlider';
const Blog = () => {
    //product
    const [discounts, setDiscounts] = useState([]);
    const [productHot, setProductHot] = useState([]);
    const [images, setImages] = useState([]);
    const [posts, setPosts] = useState([]);       // Danh sách bài post
    const [categoryName, setCategoryName] = useState([]);

    useEffect(() => {
        //cate
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

        const fetchImages = async () => {
            try {
                const imagesData = await getImages();
                setImages(imagesData);
            } catch (error) {
                console.error('Có lỗi xảy ra khi lấy hình ảnh:', error);
            }
        };
        fetchImages();

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
        })
    }, []);

    return (
        <>
            <section className="banner">
                <div className="banner-overlay">
                    <h1>Blog</h1>
                    <p style={{ fontSize: 20, fontWeight: 400 }}>
                        <a href="/">Trang chủ</a> &gt; Blog
                    </p>
                </div>
            </section>

            <div className='blog-container'>
                <main style={{ paddingTop: "30px" }}>
                    <article>
                        <div
                            className="d-flex justify-content-between align-items-center"
                            style={{ borderBottom: "1px solid rgb(190, 188, 188)" }}
                        >
                            <div className="title_top_menu tab_link_module">
                                <h3><a href="new-arrivals" title="Sản phẩm hot">Tất cả bài viết</a></h3>
                            </div>
                            <div className="d-flex align-items-center gap-3">

                            </div>
                        </div>

                        <ArticleSlider />

                        <div className="article_3">
                            <div className="article_3_left">
                                <div className="article_3_left_1">
                                    <div className="article_3_title_left">
                                        <span className="article_3_title_left_text_1">Nổi bật</span>
                                    </div>
                                    <div className="article_3_title_left_1">
                                        <span className="article_3_title_left_text_2">
                                            Các bài viết nổi bật được lựa chọn bởi các biên tập viên có kinh
                                            nghiệm. Nó cũng dựa trên đánh giá của người đọc. Những bài viết
                                            này có rất nhiều sự quan tâm.
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="article_3_rigth">
                                <div className="article_3_card">

                                    <div className="article_3_card_silde">
                                        <div className="article_3_right_text_1">
                                            <span className="article_3_right_text_1a">
                                                Hunter x Hunter chap 403: kế hoạch ám sát thất bại c...
                                            </span>
                                        </div>
                                        <div className="article_3_right_img">
                                            <img style={{ width: "197px", height: "197px" }} src="https://media-hosting.imagekit.io//1fbfed4a94444e88/blog_context.jpg?Expires=1836491026&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=JK34G8afaIc1A1FNkJWHZwca4yUA2~I4YW-HIJTCLeO4uByQmFFC6P5ZhMfRC3NdGaW2sUzVevCLr0ijwhwTBgvwi6N-uRWK1FCPeRebb2cnxBtn3LyrKY1AeK1rj265xzacLWZpImC9u8iAQanfBUhOc0lGY-mpYhMv0~aTCIbDnusxZO0MS-MMBmIEPtR3oBTf7XFx9PgprIFQPTHnlhFTxMCHfVShwOEhxOUFs-d9hhsVbN4kccENvOui6gOOih0fDf6qMK9Ln0RxTpLHwBMJqOET0nBzdkmNyih2P5jyADtXm7xUkZ4L7qFKhSyIcdtjPkJ~zilpuWZFoECuaQ__" alt="" />
                                        </div>
                                        <div className="article_3_right_text_2">
                                            <span className="article_3_right_text_2a">14 Oct, 2024</span>
                                            <span className="article_3_right_text_2a">927 lượt xem</span>
                                        </div>
                                    </div>

                                    
                                    <div className="article_3_card_silde">
                                        <div className="article_3_right_text_1">
                                            <span className="article_3_right_text_1a">
                                                Hunter x Hunter chap 403: kế hoạch ám sát thất bại c...
                                            </span>
                                        </div>
                                        <div className="article_3_right_img">
                                            <img style={{ width: "197px", height: "197px" }} src="https://media-hosting.imagekit.io//1fbfed4a94444e88/blog_context.jpg?Expires=1836491026&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=JK34G8afaIc1A1FNkJWHZwca4yUA2~I4YW-HIJTCLeO4uByQmFFC6P5ZhMfRC3NdGaW2sUzVevCLr0ijwhwTBgvwi6N-uRWK1FCPeRebb2cnxBtn3LyrKY1AeK1rj265xzacLWZpImC9u8iAQanfBUhOc0lGY-mpYhMv0~aTCIbDnusxZO0MS-MMBmIEPtR3oBTf7XFx9PgprIFQPTHnlhFTxMCHfVShwOEhxOUFs-d9hhsVbN4kccENvOui6gOOih0fDf6qMK9Ln0RxTpLHwBMJqOET0nBzdkmNyih2P5jyADtXm7xUkZ4L7qFKhSyIcdtjPkJ~zilpuWZFoECuaQ__" alt="" />
                                        </div>
                                        <div className="article_3_right_text_2">
                                            <span className="article_3_right_text_2a">14 Oct, 2024</span>
                                            <span className="article_3_right_text_2a">927 lượt xem</span>
                                        </div>
                                    </div>

                                </div>
                            </div> */}
                            <ArticleCard />

                        </div>

                    </article>
                </main>

                <div className="article_4">
                    <div className="article_4_left">
                        <span className="title_new_left">BÀI VIẾT MỚI</span>

                        {posts && posts.length > 0 ? (
                            (posts.slice(0, 4)).map((post, index) => {
                                const postCate = categoryName.filter(cate => cate).find(cate => cate._id === post.tag);
                                return (

                                    <div className="card_left" key={post._id || index}>
                                        <div className="card_left_1">
                                            <img
                                                src={post.coverImage}
                                                alt=""

                                            />
                                        </div>

                                        <div className="card_left_2">

                                            <div className="card_left_2_title_background">
                                                <span className="title_manga">

                                                    <svg
                                                        width={17}
                                                        height={17}

                                                        viewBox="0 0 15 17"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5ZM1.96953 7.5C1.96953 10.5544 4.44561 13.0305 7.5 13.0305C10.5544 13.0305 13.0305 10.5544 13.0305 7.5C13.0305 4.44561 10.5544 1.96953 7.5 1.96953C4.44561 1.96953 1.96953 4.44561 1.96953 7.5Z"
                                                            fill="white"
                                                        />
                                                        <circle cx="7.5" cy="7.5" r="3.5" fill="white" />
                                                    </svg>
                                                    <span>{postCate && postCate.name}</span>

                                                </span>

                                            </div>

                                            <div className="card_left_2_title_1">
                                                <span className="card_left_2_text_1">
                                                    {post.title}
                                                </span>
                                            </div>

                                            <div className="card_left_2_title_2">
                                                <span className="card_left_2_text_2">{new Date(post.createdAt).toLocaleDateString()}</span>
                                                <span className="card_left_2_text_2">
                                                    <img
                                                        id=""
                                                        width={13}
                                                        height={13}
                                                        preserveaspectratio="none"
                                                        src="https://media-hosting.imagekit.io//1383d94ae8c748c0/download.png?Expires=1836489064&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Xc6YKJDxSQJwwUIYDxlrtiYwsmYk8C~xITF1W7OE4sQ1yJpBKpgVRR-XDd2JON5G17xr73OcL3fwvAvbraxs0GVTRad7tbJW9KWTxRecDCiM3XXSlJxf4pgnYHpJAZA8acpp6byJyZqIVVf4pAsJt9U51ORZcmFWhue62eKEW-zg5Vr1AfZs9kYEBcaC9EBnfOpA1SQburE2qMPphyj26Op4uzKLBfl05XjuQK9aM-93E-~OuCuLFTWHMlRiZ9MHGefFyF2QuwS7USc6s5Xn19i4R8aE6tifFOgfo6KlOpJVGPzhQmPoz7WLNcYgo2jjTQ9QQ5Gr7MKyUxy0rk~TVA__"
                                                    />
                                                    123 lượt xem
                                                </span>
                                            </div>

                                            <div className="card_left_2_title_3">
                                                <span className="card_left_2_text_3">
                                                    {post.content.length > 200
                                                        ? post.content.substring(0, 180) + "..."
                                                        : post.content}
                                                </span>
                                            </div>

                                            <div className="card_left_2_title_4">
                                                <Link to={`/blog/${post._id}`} className="card_left_2_text_4">XEM THÊM-&gt;</Link>
                                            </div>
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
                    <div className="article_4_rigth">
                        <span className="title_new_right">Theo dõi chúng tôi</span>
                        <div className="card_icon_left">
                            <img src="https://media-hosting.imagekit.io//92a62286f2644892/facebook.png?Expires=1837450880&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=mFhrcQJCpLejv7cKUolBFE480sE998usEnszLlGkcJpEd9LXwxszdv1AvH1ppzXDCw0pGPKNvs6bnLn~uj6DlM3Rd75UVBulBmBHqF1w5GFk0gnO7AimXY6KNFY3C~KGSQ4cnv1MPYKdYtBSmIAn1pMo--gd5iUVe6~UH-1mJPXfe9FesUrJN7hMedV7dz67Ce61dS6fvRsyOYqibY4ybM438YVvy~8JVoTQqUZFOl4to4OR-vIHz3WgQEYjPeWbF6OiUwGeKOoHVpW2Sr~eob24skE4LZ-KGegM3MJ7AVtEIE2JRxOt91Czln~Q3kJojToEg9PO-nRPTeA3kNhnOw__" alt="facebook" />
                            <img src="https://media-hosting.imagekit.io//5d0d66bad9a84455/twitter.png?Expires=1837450880&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=1ExtPjWeVu-XI-m0PEx~KQ7M27NBn9U4baeSU08XrStATBrcncW7yZZyH~MyMfJea4rZ1HlWXR9ickflrc4EZb8eGFlrP0P7oIh6VgkWXV31GS-cYKEaskpdMZA55R~TbCWJcSLUrcO96vRmevh3FZdYtZhl2NISnys9c9Og~g9ClqkuyGoETmslhGekaolvOa7Xl-Ann2-xXt3u1O8-50dgNlqTzROiKzipOESD0R3TC6IVI6aK-gBl10fq9C-k~WgZBrlsIHHD4eMBdKl9zy461p0HXHelaXCVLM1iNFklaCZ4tL~5HU5c6pKlpuskvlDzxz1aK3lHuauABQIb4w__" alt="twitter" />
                        </div>
                        <div className="card_icon_right">
                            <img src="https://media-hosting.imagekit.io//06dffb0c28374efb/instagram.png?Expires=1837450880&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=JswuGGQSA5Hg~zZ6gthf0DXDS20MadfLSMGlQoNyeg~7GWE8vNNnvPUR0-fLVA23FMRnZ~t3lEqmrHoREMxCIWZUYQmoeKlDiaAN4MFl92EX3GyzvYT6EFXots2sFEuIoMPdgEHFONJeR4lZr3wnvia3~YGX9Ay~IJ~or0jJGUzzHDaBU0hE7Md0aERNu6rxCKbhTY5MH8EoR8JMKUCy~RlQezN7vOQTQyPFREPYVBJ3ROn82ko63BROIvELUUfXKko9X20AP8axdgCH0s26Zw-rmoIi6j2u2M8~7U3bHdPZTn5jdbl2BiLaEkNtetlG6F5on6xixtwsleOg3lVxqA__" alt="insta" />
                            <img src="https://media-hosting.imagekit.io//0935e16350674e7c/toptop.png?Expires=1837450880&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=uUqa3S5P~ytf77kdXYUXua6tY98H27ENWoGsqWW-qKS-jGYQrHoFV-WiMySh14fS3dEJ2tShMd0fV8t45yhPyU4FVv-wTYLgswNxL3G8D2g~JWMGhHOGnQZ1stBGq~CYaer5YqW5LkblvzErfpBv~g-QeFkY1Cjd-Cx9KbJt6Gk2eI5Jy~JXUhAQWiWw3vXr8SQ~U1PKg9l902rYa6~FGf8OJyJ-OTCjJnFZ4ChYLUJ87ia0Ah2IK8md2nBPxLu3lRQ1Pqtk0VBHDTxZkQ4awIDHPSeh-LMA5leClehtpKZW5sMo3pjq7TIo-hUA62CO9LQUv3AqVjgw828H4782vw__" alt="toptop" />
                        </div>
                        <div className="card_right">
                            <span className="title_trend">PHỔ BIẾN TRENDING</span>

                            {posts && posts.length > 0 ? (
                                (posts.slice(0, 5)).map((post, index) => {
                                    const postCate = categoryName.filter(cate => cate).find(cate => cate._id === post.tag);
                                    return (

                                        <div className="card_right_0" key={post._id || index}>
                                            <div className="card_right_1">
                                                <img
                                                    style={{ width: 113, height: 100 }}
                                                    src={post.coverImage} alt={post.title} />
                                            </div>

                                            <div className="card_right_2">
                                                <div className="card_right_2_title_background">
                                                    <span className="title_manga">
                                                        <svg
                                                            width={17}
                                                            height={17}
                                                            viewBox="0 0 15 17"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5ZM1.96953 7.5C1.96953 10.5544 4.44561 13.0305 7.5 13.0305C10.5544 13.0305 13.0305 10.5544 13.0305 7.5C13.0305 4.44561 10.5544 1.96953 7.5 1.96953C4.44561 1.96953 1.96953 4.44561 1.96953 7.5Z"
                                                                fill="white"
                                                            />
                                                            <circle cx="7.5" cy="7.5" r="3.5" fill="white" />
                                                        </svg>
                                                        <span>{postCate && postCate.name}</span>
                                                    </span>
                                                </div>
                                                <div className="card_right_2_title_1">
                                                    <span className="card_right_2_text_1">
                                                    {post.title.length > 35
                                                        ? post.title.substring(0, 30) + "..."
                                                        : post.title}
                                                    </span>
                                                </div>
                                                <div className="card_right_2_title_2">
                                                    <span className="card_right_2_text_2">05 Dec, 2024</span>
                                                    <span className="card_right_2_text_3">5,579 lượt xem</span>
                                                </div>
                                            </div>
                                        </div>

                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6">Đang tải bài viết...</td>
                                </tr>
                            )}

                            <img
                                className="card_slide"
                                id="slideshow"
                                src="img/book_1.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="article_5">
                <div className="article_nav">
                    <div className="title_nav">
                        <span className="title_left">NỔI BẬT</span>
                        <ul className="title_right">
                            <li>
                                <a className="title_nav_right_link" href="">
                                    MANGA
                                </a>
                            </li>
                            <li>
                                <a className="title_nav_right_link" href="">
                                    TECH
                                </a>
                            </li>
                            <li>
                                <a className="title_nav_right_link" href="">
                                    VIETNAM
                                </a>
                            </li>
                            <li>
                                <a className="title_nav_right_link" href="">
                                    EDUCATION
                                </a>
                            </li>
                            <li>
                                <a className="title_nav_right_link" href="">
                                    NEWS
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="article_blog">
                    <div className="article_5_left">
                        <div className="article_5_left_img">
                            <img
                                style={{ width: '370', height: '370' }}
                                src='https://media-hosting.imagekit.io//bc7c7f487c474e47/blog_context_14.jpg?Expires=1837259782&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=fJBsoPBvGjlCMFpJt9U1WBDgnqsUXB2nIY-aqfWSHxYnDuWqrXFggWqIJWqQIcwoi4nAkhDhwOWge~F9xGNlDRGnXd1UanTVTsaAHXiZn1q4qtjibqxf3uf5LZK6dGa-8C1v1F2dr7bQUJL1ckAwnMz945r4sle-2q2rC36bW9hlogzMocr126t~i3y~QoJX9gmcEwkKDf7cCrZDK0QLsSRN4jCPGzH2WoQ9fRVY8y5uPDFy~ic9bPMtwRUV9u5WVTLiQUrGQXbtP-v8GyRhHR2QCc99B6qKACJ7onOrA5AHFYsW53qFF10bOxWZKk9t4VWG~2ENfBnxrNYRYvTk8w__' />


                        </div>
                        <div className="article_5_left_text">
                            <div className="article_5_left_text_1">
                                <span>Mercenary Enrollment Chapter 219: Quá khứ của Ijin</span>
                            </div>
                            <div className="article_5_left_text_2">
                                <span>13 Dec, 2024</span>
                                <span>19 phút đọc</span>
                                <span>114 lượt xem</span>
                            </div>
                            <div className="article_5_left_text_3">
                                <span>
                                    Mercenary Enrollment Chapter 219 sẽ là một chương đầy hành động và
                                    hồi hộp, nêu bật chiến lược của Ijin trong trận chiến sắp tới và
                                    sự biến đổi của anh từ một lính đánh thuê thành một ...
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="article_5_right">
                        <div className="article_5_right_top">
                            <div className="article_5_right_img">
                                <div className='article_5_right_img_img'>
                                    <img
                                        src="https://media-hosting.imagekit.io//e93dae2c8ce54ca3/kagurabachi-chapter-61-600x421.jpeg?Expires=1836490926&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wqDhAAAqfvwdrV7mP95ejI8O-tRidXI6JzbqF1OKIZI1wzcYmsjuZOtYgXIBj70I2SZlDj49BwtNqxq1CkHrwZpNclQSo6pZxWHlm5prrpcwyGcfLKo5YoVUBIIAE-mfML-q4MmC117l096H5tpFgEuxRnoQyhPYWPhW6ntCGsdQNsn7s7KXc100UzAJNZvUS~MZrg5qFcAfyycUSVDukyJ4fhez5GCqMCocqv1hsLDmzPg9rARgikrVXodsX0Ns~ijWg1hdibu~Lu-t3mE5fl5X50MKbRpCyBAeQWhBJY0VOYKkJeofPXxaLMaDxZTMxRFASxDI766uaN-Ih~OqcA__" alt="" />
                                </div>
                                <div className="article_5_right_text">
                                    <div className="article_5_right_text_1">
                                        <span>Kagurabachi Chapter 61: Liên minh của Chihiro v...</span>
                                    </div>
                                    <div className="article_5_right_text_2">
                                        <span>13 Dec</span>
                                        <span>159 lượt xem</span>
                                    </div>
                                </div>
                            </div>
                            <div className="article_5_right_img">
                                <div className='article_5_right_img_img'>
                                    <img
                                        src="https://media-hosting.imagekit.io//e93dae2c8ce54ca3/kagurabachi-chapter-61-600x421.jpeg?Expires=1836490926&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wqDhAAAqfvwdrV7mP95ejI8O-tRidXI6JzbqF1OKIZI1wzcYmsjuZOtYgXIBj70I2SZlDj49BwtNqxq1CkHrwZpNclQSo6pZxWHlm5prrpcwyGcfLKo5YoVUBIIAE-mfML-q4MmC117l096H5tpFgEuxRnoQyhPYWPhW6ntCGsdQNsn7s7KXc100UzAJNZvUS~MZrg5qFcAfyycUSVDukyJ4fhez5GCqMCocqv1hsLDmzPg9rARgikrVXodsX0Ns~ijWg1hdibu~Lu-t3mE5fl5X50MKbRpCyBAeQWhBJY0VOYKkJeofPXxaLMaDxZTMxRFASxDI766uaN-Ih~OqcA__" alt="" />
                                </div>
                                <div className="article_5_right_text">
                                    <div className="article_5_right_text_1">
                                        <span>Kagurabachi Chapter 61: Liên minh của Chihiro v...</span>
                                    </div>
                                    <div className="article_5_right_text_2">
                                        <span>13 Dec</span>
                                        <span>159 lượt xem</span>
                                    </div>
                                </div>
                            </div>
                            <div className="article_5_right_img">
                                <div className='article_5_right_img_img'>
                                    <img
                                        src="https://media-hosting.imagekit.io//e93dae2c8ce54ca3/kagurabachi-chapter-61-600x421.jpeg?Expires=1836490926&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wqDhAAAqfvwdrV7mP95ejI8O-tRidXI6JzbqF1OKIZI1wzcYmsjuZOtYgXIBj70I2SZlDj49BwtNqxq1CkHrwZpNclQSo6pZxWHlm5prrpcwyGcfLKo5YoVUBIIAE-mfML-q4MmC117l096H5tpFgEuxRnoQyhPYWPhW6ntCGsdQNsn7s7KXc100UzAJNZvUS~MZrg5qFcAfyycUSVDukyJ4fhez5GCqMCocqv1hsLDmzPg9rARgikrVXodsX0Ns~ijWg1hdibu~Lu-t3mE5fl5X50MKbRpCyBAeQWhBJY0VOYKkJeofPXxaLMaDxZTMxRFASxDI766uaN-Ih~OqcA__" alt="" />
                                </div>
                                <div className="article_5_right_text">
                                    <div className="article_5_right_text_1">
                                        <span>Kagurabachi Chapter 61: Liên minh của Chihiro v...</span>
                                    </div>
                                    <div className="article_5_right_text_2">
                                        <span>13 Dec</span>
                                        <span>159 lượt xem</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="article_5_right_bot">
                            <div className="article_5_right_img">
                                <div className='article_5_right_img_img'>
                                    <img
                                        src="https://media-hosting.imagekit.io//e93dae2c8ce54ca3/kagurabachi-chapter-61-600x421.jpeg?Expires=1836490926&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wqDhAAAqfvwdrV7mP95ejI8O-tRidXI6JzbqF1OKIZI1wzcYmsjuZOtYgXIBj70I2SZlDj49BwtNqxq1CkHrwZpNclQSo6pZxWHlm5prrpcwyGcfLKo5YoVUBIIAE-mfML-q4MmC117l096H5tpFgEuxRnoQyhPYWPhW6ntCGsdQNsn7s7KXc100UzAJNZvUS~MZrg5qFcAfyycUSVDukyJ4fhez5GCqMCocqv1hsLDmzPg9rARgikrVXodsX0Ns~ijWg1hdibu~Lu-t3mE5fl5X50MKbRpCyBAeQWhBJY0VOYKkJeofPXxaLMaDxZTMxRFASxDI766uaN-Ih~OqcA__" alt="" />
                                </div>
                                <div className="article_5_right_text">
                                    <div className="article_5_right_text_1">
                                        <span>Kagurabachi Chapter 61: Liên minh của Chihiro v...</span>
                                    </div>
                                    <div className="article_5_right_text_2">
                                        <span>13 Dec</span>
                                        <span>159 lượt xem</span>
                                    </div>
                                </div>
                            </div>
                            <div className="article_5_right_img">
                                <div className='article_5_right_img_img'>
                                    <img
                                        src="https://media-hosting.imagekit.io//e93dae2c8ce54ca3/kagurabachi-chapter-61-600x421.jpeg?Expires=1836490926&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wqDhAAAqfvwdrV7mP95ejI8O-tRidXI6JzbqF1OKIZI1wzcYmsjuZOtYgXIBj70I2SZlDj49BwtNqxq1CkHrwZpNclQSo6pZxWHlm5prrpcwyGcfLKo5YoVUBIIAE-mfML-q4MmC117l096H5tpFgEuxRnoQyhPYWPhW6ntCGsdQNsn7s7KXc100UzAJNZvUS~MZrg5qFcAfyycUSVDukyJ4fhez5GCqMCocqv1hsLDmzPg9rARgikrVXodsX0Ns~ijWg1hdibu~Lu-t3mE5fl5X50MKbRpCyBAeQWhBJY0VOYKkJeofPXxaLMaDxZTMxRFASxDI766uaN-Ih~OqcA__" alt="" />
                                </div>
                                <div className="article_5_right_text">
                                    <div className="article_5_right_text_1">
                                        <span>Kagurabachi Chapter 61: Liên minh của Chihiro v...</span>
                                    </div>
                                    <div className="article_5_right_text_2">
                                        <span>13 Dec</span>
                                        <span>159 lượt xem</span>
                                    </div>
                                </div>
                            </div>
                            <div className="article_5_right_img">
                                <div className='article_5_right_img_img'>
                                    <img
                                        src="https://media-hosting.imagekit.io//e93dae2c8ce54ca3/kagurabachi-chapter-61-600x421.jpeg?Expires=1836490926&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wqDhAAAqfvwdrV7mP95ejI8O-tRidXI6JzbqF1OKIZI1wzcYmsjuZOtYgXIBj70I2SZlDj49BwtNqxq1CkHrwZpNclQSo6pZxWHlm5prrpcwyGcfLKo5YoVUBIIAE-mfML-q4MmC117l096H5tpFgEuxRnoQyhPYWPhW6ntCGsdQNsn7s7KXc100UzAJNZvUS~MZrg5qFcAfyycUSVDukyJ4fhez5GCqMCocqv1hsLDmzPg9rARgikrVXodsX0Ns~ijWg1hdibu~Lu-t3mE5fl5X50MKbRpCyBAeQWhBJY0VOYKkJeofPXxaLMaDxZTMxRFASxDI766uaN-Ih~OqcA__" alt="" />
                                </div>
                                <div className="article_5_right_text">
                                    <div className="article_5_right_text_1">
                                        <span>Kagurabachi Chapter 61: Liên minh của Chihiro v...</span>
                                    </div>
                                    <div className="article_5_right_text_2">
                                        <span>13 Dec</span>
                                        <span>159 lượt xem</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='blog-container'>
                <div className='blog_product'>
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

            </div >

        </>
    );
};
export default Blog;
