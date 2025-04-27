import React, { useState } from "react";
import "../../asset/css/customDropdown.css"; // Import file CSS mới bên dưới

const CustomDropdown = ({ options, selected, onChange, defaultLabel }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(prev => !prev);

  const handleSelect = (value) => {
    onChange(value);
    setOpen(false);
  };

  // Tìm tên hiển thị dựa trên giá trị selected; nếu rỗng, hiển thị defaultLabel
  const displayText =
    selected && options.find(opt => opt._id === selected)
      ? options.find(opt => opt._id === selected).name
      : defaultLabel || "Tất cả";

  return (
    <div className="adminSelect">
      <div className="adminSelected" onClick={toggleOpen}>
        <span>{displayText}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
          className="adminArrow"
        >
          <path
            d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
          ></path>
        </svg>
      </div>
      {open && (
        <div className="adminOptions">
          <div className="adminOption" onClick={() => handleSelect("")}>
            {defaultLabel || "Tất cả"}
          </div>
          {options.map((opt) => (
            <div
              key={opt._id}
              className="adminOption"
              onClick={() => handleSelect(opt._id)}
            >
              {opt.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;