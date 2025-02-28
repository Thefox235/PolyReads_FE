import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getProductById,
  getCategories,
  getAuthor,
  getImagesByProductId,
  updateProduct
} from '../../api/server';

const EditPro = () => {
  const { id } = useParams();

  // State cho thông tin sản phẩm (không chứa hình ảnh vì ảnh nằm ở bảng riêng)
  const [form, setForm] = useState({
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
  const [error, setError] = useState('');

  // State cho danh sách hình ảnh đã thêm (mảng các object { url })
  const [images, setImages] = useState([]);
  // State cho URL ảnh mới nhập từ input
  const [imageUrlInput, setImageUrlInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy thông tin sản phẩm
        const productData = await getProductById(id);
        setForm(productData);

        // Lấy hình ảnh liên quan tới sản phẩm từ bảng hình ảnh
        const imagesData = await getImagesByProductId(id);
        if (imagesData && imagesData.length > 0) {
          setImages(imagesData);
        }

        // Lấy danh sách danh mục và tác giả
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        const authorsData = await getAuthor();
        setAuthors(authorsData);
      } catch (err) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu:', err);
        setError('Có lỗi xảy ra khi lấy dữ liệu sản phẩm, danh mục hoặc tác giả');
      }
    };

    fetchData();
  }, [id]);

  // Xử lý thay đổi đối với các input chung của product
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Xử lý thay đổi cho input URL hình ảnh mới
  const handleImageInputChange = (e) => {
    setImageUrlInput(e.target.value);
  };

  // Khi nhấn nút "Thêm ảnh", thêm URL vào mảng images
  const handleAddImage = () => {
    if (imageUrlInput.trim()) {
      setImages(prev => [...prev, { url: imageUrlInput.trim() }]);
      setImageUrlInput('');
    }
  };

  // Hàm submit cập nhật sản phẩm
  const fetchData = async () => {
    try {
      const productData = await getProductById(id);
      setForm(productData);
      const imagesData = await getImagesByProductId(id);
      if (imagesData && imagesData.length > 0) {
        setImages(imagesData);
      }
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, form, images);
      alert('Sản phẩm đã được cập nhật thành công!');
      await fetchData(); // cập nhật lại dữ liệu sau update
    } catch (err) {
      console.error('Có lỗi xảy ra khi cập nhật sản phẩm:', err);
      setError('Có lỗi xảy ra khi cập nhật sản phẩm');
    }
  };
  
  //xóa hình
  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="editPro-container">
      <h1>Sửa sản phẩm</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Tên sản phẩm */}
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

        {/* Title */}
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

        {/* Số lượng */}
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

        {/* Giá */}
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

        {/* Trọng lượng */}
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

        {/* Kích thước */}
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

        {/* Số trang */}
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

        {/* Ngôn ngữ */}
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

        {/* Hình thức */}
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

        {/* Năm phát hành */}
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

        {/* Nhà xuất bản */}
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

        {/* Mô tả */}
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

        {/* Danh mục */}
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

        {/* Tác giả */}
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

        {/* Phần hình ảnh sản phẩm */}
        <div className="form-group">
          <label htmlFor="imageUrl">Hình ảnh sản phẩm (URL):</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={imageUrlInput}
            onChange={handleImageInputChange}
            className="form-control"
          />
          <button
            type="button"
            onClick={handleAddImage}
            className="btn btn-secondary"
            style={{ marginTop: '10px' }}
          >
            Thêm ảnh
          </button>
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


        <button type="submit"  className="btn btn-primary">Submit</button>

      </form>
    </div>
  );
};

export default EditPro;
