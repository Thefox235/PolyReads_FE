import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getProductSearch } from "../../api/server"; // Điều chỉnh đường dẫn theo dự án

// Hàm debounce đơn giản
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

const AdminSearchForm = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const debouncedSearch = useCallback(
    debounce((value) => {
      if (value.trim() === "") {
        setSuggestions([]);
        return;
      }
      // Gọi API tìm kiếm (đảm bảo API trả về mảng hoặc {products: [...]})
      getProductSearch({ field: "name", keyword: value, page: 1, limit: 5 })
        .then((data) => {
          const results = data.products || data;
          setSuggestions(results);
        })
        .catch((err) => {
          console.error("Search error:", err);
        });
    }, 500),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    debouncedSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim() !== "") {
      navigate(`/viewPro?search=true&keyword=${encodeURIComponent(keyword)}&page=1`);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setKeyword(suggestion.name);
    setSuggestions([]);
    navigate(`/viewPro?search=true&keyword=${encodeURIComponent(suggestion.name)}&page=1`);
  };

  return (
    <div className="adminSearchContainer">
      <form onSubmit={handleSubmit} className="adminSearchForm">
        <input
          placeholder="Search"
          id="adminSearchInput"
          className="adminSearchInput"
          name="text"
          type="text"
          value={keyword}
          onChange={handleChange}
        />
        <svg className="adminSearchIcon" viewBox="0 0 512 512">
          <path
            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 
               25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 
               144 144 0 1 0 0 288z"
          ></path>
        </svg>
        {suggestions.length > 0 && (
          <ul className="adminSuggestionsDropdown">
            {suggestions.map((item) => (
              <li key={item._id} onClick={() => handleSelectSuggestion(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default AdminSearchForm;