import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getProductSearch } from "../api/server"; // API của bạn

const SearchForm = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Sử dụng debounce để gọi API sau khi người dùng dừng gõ
  const debounceSearch = useCallback(
    debounce((value) => {
      if (value.trim() === "") {
        setSuggestions([]);
        return;
      }
      // Gọi API search, truyền các tham số cần thiết
      getProductSearch({ field: "name", keyword: value, page: 1, limit: 5 })
        .then((data) => {
          // Giả sử API trả về danh sách sản phẩm
          setSuggestions(data);
        })
        .catch((error) => {
          console.error("Search error:", error);
        });
    }, 500),
    [] // debounce khi component mount
  );

  // Hàm onChange cho input
  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    debounceSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Khi submit, chuyển hướng sang trang Product với query search
    navigate(
      `/product?search=true&field=name&keyword=${encodeURIComponent(
        keyword
      )}&page=1&limit=20`
    );
  };

  // Khi người dùng click vào một gợi ý
  const handleSelectSuggestion = (suggestion) => {
    setKeyword(suggestion.name);
    // Chuyển hướng sang trang Product với từ khóa tìm kiếm
    navigate(
      `/product?search=true&field=name&keyword=${encodeURIComponent(
        suggestion.name
      )}&page=1&limit=20`
    );
  };

  return (
    <form onSubmit={handleSubmit} className="custom-sreach-input position-relative">
      <div className="sreach-icon">
        <i className="bi bi-search" />
      </div>
      <input
        type="text"
        placeholder="Nhập từ khóa tìm kiếm..."
        value={keyword}
        onChange={handleChange}
      />
      {/* Hiển thị danh sách gợi ý nếu có */}
      {suggestions.length > 0 && (
        <ul className="suggestions-dropdown">
          {suggestions.map((item) => (
            <li key={item._id} onClick={() => handleSelectSuggestion(item)}>
              {item.name}
            </li>
          ))}
        </ul>
      )}
      <button type="submit" style={{ display: "none" }}>
        Search
      </button>
    </form>
  );
};

// Hàm debounce (ví dụ đơn giản nếu bạn không dùng thư viện lodash)
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default SearchForm;