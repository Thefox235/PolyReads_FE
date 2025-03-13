import React from 'react';
import Select from 'react-select';

const CustomSelect = ({ label, options, value, onChange, placeholder }) => {
  // Tìm option phù hợp với giá trị hiện tại
  const selectedOption = options.find(option => option.value === value) || null;

  return (
    <div className="form-group">
      <label>{label}</label>
      <Select
        options={options}
        value={selectedOption}
        onChange={option => onChange(option ? option.value : '')}
        placeholder={placeholder || `Chọn ${label}`}
        isClearable
        filterOption={(option, inputValue) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        }
      />

    </div>
  );
};

export default CustomSelect;
