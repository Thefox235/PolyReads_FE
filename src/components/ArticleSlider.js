import React, { useState, useEffect } from "react";
import { getPosts } from "../api/server"; // Đường dẫn này có thể cần điều chỉnh tùy theo cấu trúc dự án
import '../asset/css/ArticleSlider.css'

// Component hiển thị banner cho một post
const PostBanner = ({ post }) => {
  return (
    <div className="article_banner" style={{ display: "flex", padding: "20px" }}>
      <div className="article_banner_left" style={{ flex: 1, paddingRight: "20px" }}>
        <h2>{post.title}</h2>
        <div className="article_banner_meta" style={{ margin: "10px 0", color: "#666" }}>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        {/* Nếu có thể, bạn có thể trích đoạn thêm từ content hoặc sử dụng 1 field excerpt */}
        <p>
          {post.content.length > 150
            ? post.content.substring(0, 150) + "..."
            : post.content}
        </p>
      </div>
      <div className="article_banner_right" style={{ flex: 1 }}>
        <img
          src={post.coverImage}
          alt={post.title}

        />
      </div>
    </div>
  );
};

// Component ArticleSlider: Hiển thị slide show banner cho 5 post đầu tiên
const ArticleSlider = () => {
  const [posts, setPosts] = useState([]); // Lưu trữ dữ liệu các post
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Lấy dữ liệu từ API khi component load
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        // Giới hạn lấy 5 post đầu tiên
        setPosts(data.slice(0, 5));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Tự động chuyển slide sau mỗi 5 giây
  useEffect(() => {
    if (posts.length > 0) {
      const slideInterval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % posts.length);
      }, 5000);
      return () => clearInterval(slideInterval);
    }
  }, [posts]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (posts.length === 0) return <div>No posts available</div>;

  return (
    <div className="slider-container" style={{ overflow: "hidden", position: "relative" }}>
      <div
        className="slider-wrapper"
        style={{
          display: "flex",
          transition: "transform 0.5s ease",
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {posts.map((post) => (
          <div key={post._id} className="slider-slide" style={{ minWidth: "100%" }}>
            <PostBanner post={post} />
          </div>
        ))}
      </div>

      <div className="slider-controls">
        <button onClick={() => setCurrentSlide((prev) => (prev - 1 + posts.length) % posts.length)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % posts.length)}
          style={{ marginLeft: "10px" }}
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>

    </div>
  );
};

export default ArticleSlider;