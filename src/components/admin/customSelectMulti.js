// customSelectMulti.js
import React from "react";
import Select from "react-select";

const CustomSelectMulti = ({
  label,
  options,
  value,
  onChange,
  placeholder,
}) => {
  // Ở chế độ multi‑select, value nên là một mảng các đối tượng
  return (
    <div className="form-group">
      <label>{label}</label>
      <Select
        options={options || []}
        value={value || []}
        onChange={onChange}
        placeholder={placeholder || `Chọn ${label}`}
        isMulti
        isClearable
      />
    </div>
  );
};

export default CustomSelectMulti;