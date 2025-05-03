import React, { useState, useEffect } from "react";
import { getPosts, getCategory } from "../api/server"; // Đường dẫn này có thể cần điều chỉnh tùy theo cấu trúc dự án
import '../asset/css/ArticleSlider.css'
// Component hiển thị banner cho một post
const PostBanner = ({ post }) => {
  const fetchCategory = async () => {
    try {
      const categoryData = await getCategory();
      setCategoryName(categoryData);
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy danh mục:', error);
    }
  };
  fetchCategory();

  const [categoryName, setCategoryName] = useState([]);
  const postCate = categoryName.filter(cate => cate).find(cate => cate._id === post.tag);


  return (
    <div className="article_banner" style={{ display: "flex", padding: "20px" }}>
      <div className="article_banner_left" style={{ flex: 1, paddingRight: "20px" }}>
        <div className="blog-detail-article_2_title_background">
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