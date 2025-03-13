import React, { useState, useEffect } from 'react';
import {
  getCategories,
  getAuthor,
  getImagesByProductId,
  updateProduct,
  getPublishers,
  uploadImageToCloudinary
} from '../../api/server';
import CustomSelect from './customSelect';

<<<<<<< HEAD
const EditPro = ({ initialData, onClose }) => {
  // Sử dụng dữ liệu ban đầu được truyền từ component cha
  const [form, setForm] = useState(initialData || {
=======
const EditPro = ({ initialData, onClose, onEditSuccess }) => {
  // Khởi tạo form từ dữ liệu ban đầu (initialData)
  const [form, setForm] = useState({
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
    name: '',
    title: '',
    description: '',
    price: '',
    stock: '',
    weight: '',
    size: '',
    pages: '',
    language: '',
    format: '',
    published_date: '',
    publisher: '',
    category: '',
    author: ''
  });
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [error, setError] = useState('');
  // State cho danh sách hình ảnh
  const [images, setImages] = useState([]);
<<<<<<< HEAD
  const [imageUrlInput, setImageUrlInput] = useState('');

  // Load thông tin danh mục và tác giả
=======
  
  // Khi mở EditPro, prefill thông tin từ initialData
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        title: initialData.title || '',
        description: initialData.description || '',
        price: initialData.price || '',
        stock: initialData.stock || '',
        weight: initialData.weight || '',
        size: initialData.size || '',
        pages: initialData.pages || '',
        language: initialData.language || '',
        format: initialData.format || '',
        published_date: initialData.published_date || '',
        publisher: initialData.publisher || '',
        category: initialData.category || '',
        author: initialData.author || ''
      });
      // Nếu sản phẩm đã có hình ảnh, load chúng
      if (initialData.images) {
        setImages(initialData.images);
      }
    }
  }, [initialData]);
  
  // Fetch danh mục, tác giả, NXB và ảnh từ API
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
  useEffect(() => {
    const fetchData = async () => {
      try {
        const catData = await getCategories();
        setCategories(catData);
        const authData = await getAuthor();
        setAuthors(authData);
<<<<<<< HEAD
        // Nếu bạn có API để lấy hình ảnh theo product id:
        const imagesData = await getImagesByProductId(initialData._id);
        if (imagesData && imagesData.length > 0) {
          setImages(imagesData);
=======
        const nxbData = await getPublishers();
        setPublishers(nxbData);
        // Nếu API có trả về hình ảnh dựa trên product id
        if (initialData && initialData._id) {
          const imagesData = await getImagesByProductId(initialData._id);
          if (imagesData && imagesData.length > 0) {
            setImages(imagesData);
          }
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
        }
      } catch (err) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu:', err);
        setError('Có lỗi xảy ra khi lấy danh mục hoặc tác giả');
      }
    };
<<<<<<< HEAD
    if (initialData) {
      fetchData();
    }
  }, [initialData]);

  // Handler cho các input
=======
    
    fetchData();
  }, [initialData]);
  
  // Handler cho các input văn bản
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
<<<<<<< HEAD

  const handleImageInputChange = (e) => {
    setImageUrlInput(e.target.value);
  };

  const handleAddImage = () => {
    if (imageUrlInput.trim()) {
      setImages(prev => [...prev, { url: imageUrlInput.trim() }]);
      setImageUrlInput('');
    }
  };

  const handleDeleteImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gọi API cập nhật sản phẩm với id từ initialData
      await updateProduct(initialData._id, form, images);
      alert('Cập nhật sản phẩm thành công!');
      // Đóng modal sau khi thành công
      window.location.reload();

=======
  
  // Handler upload file ảnh (cho phép nhiều file)
  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      const uploadedResults = await Promise.all(
        Array.from(files).map(async (file) => {
          try {
            const uploadedUrl = await uploadImageToCloudinary(file);
            return { url: uploadedUrl };
          } catch (error) {
            console.error("Lỗi upload ảnh:", error);
            return null;
          }
        })
      );
      const validResults = uploadedResults.filter(item => item !== null);
      setImages(prev => [...prev, ...validResults]);
    } catch (err) {
      alert('Có lỗi khi upload ảnh');
    }
  };
  
  // Handler xoá ảnh khỏi state
  const handleDeleteImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  
  // Submit form cập nhật sản phẩm
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = await updateProduct(initialData._id, form, images);
      // Re-fetch hình ảnh từ API để lấy dữ liệu mới nhất
      const freshImages = await getImagesByProductId(initialData._id);
      const completeProduct = { ...updatedProduct, images: (freshImages && freshImages.length > 0) ? freshImages : images };
      alert('Sản phẩm đã được cập nhật thành công!');
      if (onEditSuccess) onEditSuccess(completeProduct);
      if (onClose) onClose();
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
    } catch (err) {
      console.error('Có lỗi xảy ra khi cập nhật sản phẩm:', err);
      setError('Có lỗi xảy ra khi cập nhật sản phẩm');
      alert('Có lỗi xảy ra khi cập nhật sản phẩm');
    }
  };
<<<<<<< HEAD
=======
  
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869

  return (
    <div className="editPro-container">
      <h1>Sửa sản phẩm</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Row 1: Tên sản phẩm và Title */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Tên sản phẩm:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        {/* Row 2: Số lượng và Giá */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="stock">Số lượng:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Giá:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        {/* Row 3: Trọng lượng và Kích thước */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="weight">Trọng lượng:</label>
            <input
              type="text"
              id="weight"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="size">Kích thước:</label>
            <input
              type="text"
              id="size"
              name="size"
              value={form.size}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        {/* Row 4: Số trang và Ngôn ngữ */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="pages">Số trang:</label>
            <input
              type="text"
              id="pages"
              name="pages"
              value={form.pages}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="language">Ngôn ngữ:</label>
            <input
              type="text"
              id="language"
              name="language"
              value={form.language}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        {/* Row 5: Hình thức và Năm phát hành */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="format">Hình thức:</label>
            <input
              type="text"
              id="format"
              name="format"
              value={form.format}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="published_date">Năm phát hành:</label>
            <input
              type="date"
              id="published_date"
              name="published_date"
              value={form.published_date}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

<<<<<<< HEAD
        {/* Row 6: Nhà xuất bản (full-width) */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="publisher">Nhà xuất bản:</label>
            <input
              type="text"
              id="publisher"
              name="publisher"
              value={form.publisher}
              onChange={handleChange}
              className="form-control"
            />
          </div>
=======
        {/* Row 6: Nhà xuất bản */}
        <div className="form-row">
          <CustomSelect
            label="Nhà xuất bản"
            options={publishers.map(pub => ({ value: pub._id, label: pub.name }))}
            value={form.publisher}
            onChange={(selectedValue) =>
              setForm(prev => ({ ...prev, publisher: selectedValue }))
            }
            placeholder="Chọn NXB"
          />
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
          <div className="form-group">
            <label htmlFor="description">Mô tả:</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Nhập mô tả"
              className="form-control"
            ></textarea>
          </div>
        </div>

        {/* Row 8: Danh mục và Tác giả */}
        <div className="form-row">
<<<<<<< HEAD
          <div className="form-group">
            <label htmlFor="category">Danh mục:</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Chọn danh mục</option>
              {categories.map(dm => (
                <option key={dm._id} value={dm._id}>{dm.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="author">Tác giả:</label>
            <select
              id="author"
              name="author"
              value={form.author}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Chọn tác giả</option>
              {authors.map(au => (
                <option key={au._id} value={au._id}>{au.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 9: Hình ảnh sản phẩm (full-width) */}
        <div className="form-group full-width">
          <label htmlFor="imageUrl">Hình ảnh sản phẩm (URL):</label>
=======
          <CustomSelect
            label="Danh mục"
            options={categories.map(cat => ({ value: cat._id, label: cat.name }))}
            value={form.category}
            onChange={(selectedValue) =>
              setForm(prev => ({ ...prev, category: selectedValue }))
            }
            placeholder="Chọn danh mục"
          />
          <CustomSelect
            label="Tác giả"
            options={authors.map(auth => ({ value: auth._id, label: auth.name }))}
            value={form.author}
            onChange={(selectedValue) =>
              setForm(prev => ({ ...prev, author: selectedValue }))
            }
            placeholder="Chọn tác giả"
          />
        </div>


        {/* Row 9: Hình ảnh sản phẩm (full-width) */}
        <div className="form-group full-width">
        <label htmlFor="imageFile">Chọn ảnh mới (có thể chọn nhiều):</label>
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
          <input
            type="file"
            id="imageFile"
            name="imageFile"
            multiple
            onChange={handleFileChange}
            className="form-control"
          />
          {images.length > 0 && (
            <div className="images-preview" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              {images.map((img, index) => (
                <div key={index} className="image-preview-item" style={{ position: 'relative' }}>
                  <img
                    src={img.url}
                    alt={`Preview ${index + 1}`}
                    style={{ width: '100px', height: '150px', objectFit: 'cover' }}
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(index)}
                    style={{
                      position: 'absolute',
                      top: '-5px',
                      right: '-5px',
                      backgroundColor: 'red',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer'
                    }}
                    title="Xóa hình ảnh"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Nút Submit */}
        <button type="submit" className="btn btn-primary">Sửa sản phẩm</button>
      </form>
    </div>
  );
};

export default EditPro;
