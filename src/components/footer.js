import '../asset/css/footer.css';
import React, { useState, useEffect } from 'react';
import {
    getPosts,
    getCategory
} from '../api/server';
import { Link } from 'react-router-dom';

const Footer = () => {
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
    }, []);

    return (
        <>
            <footer>
                <div className="footer-logo">
                    <div className="d-flex  align-items-center gap-1 ">
                        <img
                            src="https://s3-alpha-sig.figma.com/img/b0af/45d1/c03498be8824b354d70f86daf9efda3b?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=O47y7q8tovut9dmcr1DJFrZn7iU8O7eBv2VS8M20yorz~y0jJQHhlrOVt33fcFKmTnZ6rIwZO6YcqcB-WmC3xmRKwcnXSv8sSYTIBZVQZB9dtNoDXdTyU9jHEyEg-A-xykXj~Qpwf-i9XhXzw84Fyl3QenFbMt6bvISbmXjF2~GUBdMbSMuNkuyO4yxy3DQphoznSMsBQWiG9b1n2UbMgyIi1yfneQNxl6Hwt2CYRSV2Ffc~vODoWT99Mc4VIO-ASeQ9WWZqyXO1TGWL5c4kv2zfx8XIxms6P5zfzjmZl8KWdCnhrRa4CDOQXNLmlfrMGWJLLw87lLZDB4Z6GgKV~g__"
                            alt=""
                            style={{ maxWidth: 60 }}
                        />
                        <h5>Poly Reads</h5>
                    </div>
                    <div className="d-flex flex-column " style={{ alignItems: "flex-start" }}>
                        <h6>Tiệm sách Poly Reads:</h6>
                        <p style={{ textAlign: "left" }}>Cảm hứng sáng tạo từ trang sách!</p>
                    </div>
                    <div className="d-flex flex-column " style={{ alignItems: "flex-start" }}>
                        <p className="text-start">
                            QTSC 9 Building, Đ. Tô Ký, Tân Chánh Hiệp, Quận 12, Hồ Chí Minh, Việt
                            Nam
                        </p>
                        <p>Email: polyreads@gmail.com</p>
                        <p>SĐT: 0123456789</p>
                    </div>
                    <div className="icon-mxh d-flex align-items-center">
                        <i className="bi bi-facebook" />
                        <i className="bi bi-twitter" />
                        <i className="bi bi-tiktok" />
                        <img
                            src="https://media-hosting.imagekit.io//9410bee802df4779/link0.png?Expires=1837259374&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=KQnh-pmWXgQVZR6zYWwNu7SYSbhBnRNP29P7mnGQDbQ6tJlErnEjpfzpBksKFPex2MCFI3oFRHksaryfPZ3tx9L6tvJMIDD-cK4oytD54DgN~ISJqseouk9NMY3TbhWsvOflv94OoWQwARwq3mjMSov3Q6~Iz7He~YAzJQpvnCBPH4l0hBsquKpX0N3uS6sY2cn45FIDee1Ez~TKpNNokTyMRW105BAh~kIk7J2QOXe4v7IzzgyV8qU2N5EDD~9wdn6Bgn1F~g7ffJgLdzh7utg5~XkxAhjRSnwUgXzMVb2p8cTJ3JYvWkgjNJ3w9owJi8hDn~ERX6ysNSWzN7O-rw__"
                            alt=""
                        />
                    </div>
                </div>
                <div>
                    <h5 style={{ fontWeight: "bold" }} className="text-start">
                        BÀI VIẾT NỖI BẬT
                    </h5>

                    {posts && posts.length > 0 ? (
                        (posts.slice(0, 2)).map((post, index) => {
                            const postCate = categoryName.filter(cate => cate).find(cate => cate._id === post.tag);
                            return (

                                <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                                    <Link to={`/blog/${post._id}`} className="image-blog-container">
                                        <img
                                            className="blog-tag-img"
                                            src={post.coverImage}
                                            width={113}
                                            alt={post.slug}
                                        />
                                    </Link>
                                    <div>
                                        <div
                                            className="d-flex align-items-center gap-2 ts "
                                            style={{ backgroundColor: "#917FB3" }}
                                        >
                                            <div className="containers">
                                                <div className="outer-circle">
                                                    <div className="inner-circle" />
                                                </div>
                                            </div>
                                            <p className="tag-text" style={{ marginTop: 15 }}>
                                                {postCate && postCate.name}
                                            </p>
                                        </div>
                                        <Link to={`/blog/${post._id}`}>
                                            <p style={{ fontWeight: "bold", color: "white"}} className="text-start">
                                                {post.title.length > 40
                                                    ? post.title.substring(0, 40) + "..."
                                                    : post.title}
                                            </p>
                                        </Link>

                                        <div className="d-flex justify-content-between">
                                            <span style={{ color: "#889097", textAlign: "left", fontSize: 13 }}>
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </span>
                                            <span style={{ color: "#889097", textAlign: "left", fontSize: 13 }}>
                                                5,579 lượt xem
                                            </span>
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
                <div className="dm ">
                    <h5 style={{ fontWeight: "bold" }}>DANH MỤC</h5>
                    <p className="mt-4">Tất cả</p>
                    <p>Viễn tưởng</p>
                    <p>Nonfictions</p>
                    <p>Thơ ca</p>
                    <p>Manga, novel</p>
                    <p>Art, Photography &amp; Design</p>
                    <p>Ngôn ngữ, Sách tham khảo</p>
                    <p>Sách giáo khoa</p>
                    <p>Sách về Việt Nam</p>
                </div>
                <div className="lh">
                    <h5 style={{ fontWeight: "bold" }}>TÀI KHOẢN CỦA TÔI</h5>
                    <p className="mt-4">Đăng nhập/Tạo mới tài khoản</p>
                    <p>Thay đổi địa chỉ khách hàng</p>
                    <p>Chi tiết tài khoản</p>
                    <p>Lịch sử mua hàng</p>
                    <div style={{ paddingTop: 20 }} className="footer-register">
                        <h5 className="text-start">ĐĂNG KÝ</h5>
                        <div className="d-flex mt-3">
                            <input
                                type="text"
                                style={{ padding: "10px 13px" }}
                                placeholder="Email"
                            />{" "}
                        </div>
                        <button className="d-flex mt-2 btn-lh">Đăng ký</button>
                    </div>
                </div>
            </footer>

        </>
    );
};
export default Footer;
