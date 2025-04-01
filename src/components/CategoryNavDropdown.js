import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategory } from "../api/server";

const CategoryNavDropdown = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategory();
        // Lọc ra các danh mục có type là "Product"
        const productCategories = data.filter(item => item.type === "Product");
        setCategories(productCategories);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="dropdown-categories">
      <ul>
        {categories.map(cat => (
          <li key={cat._id}>
            {/* Khi click, chuyển hướng sang trang Product với các tham số */}
            <Link to={`/product?category=${cat._id}&page=1&limit=20`}>
              <span style={{ color: "#a00f0f" }}>&gt;</span> {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryNavDropdown;