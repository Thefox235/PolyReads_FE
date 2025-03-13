import React, { useState, useEffect } from 'react';
import { createProduct, getCategories, getAuthors, getPublishers, uploadImageToCloudinary } from '../../api/server';
import CustomSelect from './customSelect';
import Modal from '../model';
import CreatePublisher from './createPublisher';   // Nếu cần tạo NXB inline
import CreateCate from './createCate';   // Nếu cần tạo danh mục inline
import CreateAuthor from './createAuthor';     // Nếu cần tạo tác giả inline

const CreatePro = ({ onClose, onCreateSuccess }) => {
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
  const [publishers, setPublishers] = useState([]);
  const [error, setError] = useState('');

<<<<<<< HEAD
  // State dùng để xử lý hình ảnh
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState([]);

  // Lấy danh mục và tác giả khi component mount
=======
  // State dùng xử lý hình ảnh
  // const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState([]);

  // Hàm xử lý khi người dùng chọn file
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
  // State hiển thị modal tạo mới
  const [showCreateCateModal, setShowCreateCateModal] = useState(false);
  const [showCreateAuthorModal, setShowCreateAuthorModal] = useState(false);
  const [showCreatePublisherModal, setShowCreatePublisherModal] = useState(false);

>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        const authorsData = await getAuthors();
        setAuthors(authorsData);
        const pubData = await getPublishers();
        setPublishers(pubData);
      } catch (err) {
        setError('Có lỗi xảy ra khi lấy danh sách');
      }
    };
    fetchData();
  }, []);

<<<<<<< HEAD
  // Xử lý thay đổi ở input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevState => ({ ...prevState, [name]: value }));
  };

  // Xử lý thay đổi input hình ảnh (URL)
  const handleImageChange = (e) => {
    setImageUrl(e.target.value);
  };

  // Thêm ảnh vào mảng images
  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setImages(prev => [...prev, { url: imageUrl.trim() }]);
      setImageUrl('');
    }
=======
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      // Gọi API tạo sản phẩm, truyền dữ liệu form và images
=======
      // Gọi API tạo sản phẩm
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
      const newProduct = await createProduct(form, images);
      // Nếu newProduct không có trường images, ghép images từ state vào đối tượng
      const completeProduct = { ...newProduct, images };
      console.log('Sản phẩm mới đầy đủ:', completeProduct);
      alert('Tạo sản phẩm thành công!');
<<<<<<< HEAD
      // Reset lại form và images sau khi submit thành công
=======
      // Reset form và images
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
      setForm({
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
      setImages([]);
<<<<<<< HEAD
      window.location.reload();
=======
      if (onCreateSuccess) onCreateSuccess(completeProduct);
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
    } catch (err) {
      setError('Có lỗi xảy ra khi thêm sản phẩm');
      alert('Có lỗi xảy ra khi thêm sản phẩm');
    }
  };
<<<<<<< HEAD

  // Xóa hình ảnh khỏi danh sách
  const handleDeleteImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

=======
  
  const handleDeleteImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
  return (
    <div className="addPro-container">
      <h1>Thêm sản phẩm:</h1>
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
        <div className='form-row'>
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

          {/* Row 7: Mô tả (full-width) */}
=======
        {/* Row 6: Nhà xuất bản và Mô tả */}
        <div className="form-row">
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <CustomSelect
              label="Nhà xuất bản"
              options={publishers.map(pub => ({ value: pub._id, label: pub.name }))}
              value={form.publisher}
              onChange={(selectedValue) =>
                setForm(prev => ({ ...prev, publisher: selectedValue }))
              }
              placeholder="Chọn NXB"
            />
            <button
              type="button"
              onClick={() => setShowCreatePublisherModal(true)}
              className="btn btn-secondary"
              style={{ marginLeft: '10px' }}
            >
              Tạo mới
            </button>
          </div>
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
<<<<<<< HEAD
        
        {/* Row 8: Danh mục và Tác giả */}
        <div className="form-row">
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
              {categories.map((cate) => (
                <option key={cate._id} value={cate._id}>
                  {cate.name}
                </option>
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
              {authors.map((author) => (
                <option key={author._id} value={author._id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 9: Phần hình ảnh sản phẩm (full-width) */}
        <div className="form-group full-width">
          <label htmlFor="imageUrl">Hình ảnh sản phẩm (URL):</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={imageUrl}
            onChange={handleImageChange}
            className="form-control"
          />
          <button
            type="button"
            onClick={handleAddImage}
            className="btn btn-secondary"
            style={{ marginTop: '10px', backgroundColor: '#917fb3'}}
          >
            Thêm ảnh
          </button>
=======

        {/* Row 8: Danh mục và Tác giả */}
        <div className="form-row">
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <CustomSelect
              label="Danh mục"
              options={categories.map(cat => ({ value: cat._id, label: cat.name }))}
              value={form.category}
              onChange={(selectedValue) =>
                setForm(prev => ({ ...prev, category: selectedValue }))
              }
              placeholder="Chọn danh mục"
            />
            <button
              type="button"
              onClick={() => setShowCreateCateModal(true)}
              className="btn btn-secondary"
              style={{ marginLeft: '10px' }}
            >
              Tạo mới
            </button>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <CustomSelect
              label="Tác giả"
              options={authors.map(auth => ({ value: auth._id, label: auth.name }))}
              value={form.author}
              onChange={(selectedValue) =>
                setForm(prev => ({ ...prev, author: selectedValue }))
              }
              placeholder="Chọn tác giả"
            />
            <button
              type="button"
              onClick={() => setShowCreateAuthorModal(true)}
              className="btn btn-secondary"
              style={{ marginLeft: '10px' }}
            >
              Tạo mới
            </button>
          </div>
        </div>

        {/* Phần chọn hình ảnh */}
        <div className="form-group">
          <label htmlFor="imageFile">Chọn ảnh sản phẩm:</label>
          <input
            type="file"
            id="imageFile"
            name="imageFile"
            multiple
            onChange={handleFileChange}
            className="form-control"
          />
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
          {images.length > 0 && (
            <div
              className="images-preview"
              style={{ display: 'flex', gap: '10px', marginTop: '10px' }}
            >
              {images.map((img, index) => (
                <div
                  key={index}
                  className="image-preview-item"
                  style={{ position: 'relative' }}
                >
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
<<<<<<< HEAD
        <button type="submit" className="btn btn-primary"  style={{ backgroundColor: '#917fb3'}} >
=======
        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#917fb3' }}>
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
          Thêm sản phẩm
        </button>
      </form>

      {/* Modal cho Tạo mới Danh mục */}
      {showCreateCateModal && (
        <Modal onClose={() => setShowCreateCateModal(false)}>
          <CreateCate
            onClose={() => setShowCreateCateModal(false)}
            onCreateSuccess={(newCate) => {
              setCategories(prev => [...prev, newCate]);
              setForm(prev => ({ ...prev, category: newCate._id }));
            }}
          />
        </Modal>
      )}

      {/* Modal cho Tạo mới Tác giả */}
      {showCreateAuthorModal && (
        <Modal onClose={() => setShowCreateAuthorModal(false)}>
          <CreateAuthor
            onClose={() => setShowCreateAuthorModal(false)}
            onCreateSuccess={(newAuthor) => {
              setAuthors(prev => [...prev, newAuthor]);
              setForm(prev => ({ ...prev, author: newAuthor._id }));
            }}
          />
        </Modal>
      )}

      {/* Modal cho Tạo mới Nhà xuất bản */}
      {showCreatePublisherModal && (
        <Modal onClose={() => setShowCreatePublisherModal(false)}>
          <CreatePublisher
            onClose={() => setShowCreatePublisherModal(false)}
            onCreateSuccess={(newPublisher) => {
              setPublishers(prev => [...prev, newPublisher]);
              setForm(prev => ({ ...prev, publisher: newPublisher._id }));
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default CreatePro;