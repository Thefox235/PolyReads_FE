import React, { useState, useEffect } from "react";
import { getPosts } from "../api/server"; // Điều chỉnh đường dẫn theo dự án của bạn

// Component riêng cho từng card dựa trên cấu trúc HTML bạn gửi
const ArticleCard = ({ post }) => {
    // Rút gọn tiêu đề nếu quá dài (có thể điều chỉnh độ dài theo mong muốn)
    const truncatedTitle =
        post.title.length > 40 ? post.title.substring(0, 40) + "..." : post.title;
    // Sử dụng trường views nếu có, ngược lại hiển thị "0 lượt xem"
    const viewCount = post.views ? `${post.views} lượt xem` : "0 lượt xem";

    return (
        <div className="article_3_card_silde">
            <div className="article_3_right_text_1">
                <span className="article_3_right_text_1a">{truncatedTitle}</span>
            </div>
            <div className="article_3_right_img">
                <img

                    src={post.coverImage}
                    alt={post.title}
                />
            </div>
            <div className="article_3_right_text_2">
                <span className="article_3_right_text_2a">
                    {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span className="article_3_right_text_2a">{viewCount}</span>
            </div>
        </div>
    );
};

const ArticleCardSlider = () => {
    const [posts, setPosts] = useState([]);       // Danh sách bài post
    const [currentIndex, setCurrentIndex] = useState(0); // Để điều khiển slider

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                // Lấy 10 bài post đầu tiên
                setPosts(data.slice(0, 5));
            } catch (err) {
                console.error("Lỗi khi lấy bài viết:", err);
            }
        };

        fetchPosts();
    }, []);

    // Giả sử mỗi card có chiều rộng cố định (bao gồm cả khoảng cách margin)
    const CARD_WIDTH = 220; // Đổi số này nếu cần (ví dụ: 197px + 23px margin)

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % posts.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
    };

    return (
        <div className="article_3_rigth">
            {/* Container chứa các card, áp dụng transform để dịch chuyển */}
            <div
                className="article_3_card"
                style={{
                    transform: `translateX(-${currentIndex * CARD_WIDTH}px)`,
                    transition: "transform 0.5s ease"
                }}
            >
                {posts.map((post) => (
                    <ArticleCard key={post._id} post={post} />
                ))}
            </div>
            <div className="card-slider-controls">
                <button onClick={prevSlide}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <button onClick={nextSlide} style={{ marginLeft: "10px" }}>
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
            </div>
        </div>
    );
};

export default ArticleCardSlider;