// src/components/admin/CreatePost.js
import React, { useState, useEffect, useRef } from 'react';
import { createPost, getCategories, uploadImageToCloudinary } from '../../api/server';
import CustomSelect from './customSelect';
import Modal from '../model';
import CreateCate from './createCate'; // Modal tạo danh mục inline
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const CreatePost = ({ onClose, onCreateSuccess }) => {
  // Sử dụng state với key "category" cho giao diện người dùng,
  // nhưng khi gửi dữ liệu, ta sẽ map nó thành key "tag".
  const [form, setForm] = useState({
    title: '',
    coverImage: '',
    category: ''  // Đây là danh mục được chọn (dùng để hiển thị)
  });
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [showCreateCateModal, setShowCreateCateModal] = useState(false);

  // Ref cho Toast UI Editor
  const editorRef = useRef();

  // Fetch danh mục và lọc ra chỉ những danh mục có type là "post"
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        // Lọc danh mục có type là "post" (không phân biệt chữ hoa, chữ thường)
        const postCategories = data.filter(
          (cat) => cat.type && cat.type.toLowerCase() === 'blog'
        );
        setCategories(postCategories);
      } catch (err) {
        setError('Có lỗi xảy ra khi lấy danh mục');
      }
    };
    fetchCategories();
  }, []);

  // Handler thay đổi input cho title và coverImage
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  // Handler upload file ảnh qua Cloudinary
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

  // Handler xóa ảnh khỏi danh sách preview
  const handleDeleteImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // Submit dữ liệu để tạo bài viết; Lưu ý ta map form.category thành tag để phù hợp với schema
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate dữ liệu
    if (!form.title.trim()) {
      setError('Tiêu đề không được để trống');
      return;
    }
    const content = editorRef.current.getInstance().getMarkdown();
    if (!content.trim()) {
      setError('Nội dung bài viết không được để trống');
      return;
    }
    // Kiểm tra danh mục (tag) đã được chọn hay chưa
    if (!form.category) {
      setError('Vui lòng chọn danh mục (tag)');
      return;
    }
    
    try {
      // Tạo object postData, mapping form.category thành tag
      const postData = { 
        title: form.title,
        coverImage: form.coverImage,
        tag: form.category,  // Đảm bảo trường "tag" có giá trị
        content,
        images 
      };

      const newPost = await createPost(postData);
      alert('Bài viết đã được tạo thành công!');
      if (onCreateSuccess) onCreateSuccess(newPost);
      // Reset dữ liệu
      setForm({ title: '', coverImage: '', category: '' });
      editorRef.current.getInstance().setMarkdown('');
      setImages([]);
    } catch (err) {
      console.error(err);
      setError('Có lỗi xảy ra khi tạo bài viết');
    }
  };

  return (
    <div className="addPro-container">
      <h1>Tạo bài viết mới</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Input tiêu đề */}
        <div className="form-group">
          <label htmlFor="title">Tiêu đề:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Nhập tiêu đề bài viết..."
            value={form.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Input hình ảnh bìa (nếu cần) */}
        <div className="form-group">
          <label htmlFor="coverImage">Hình ảnh bìa (URL):</label>
          <input
            type="text"
            id="coverImage"
            name="coverImage"
            placeholder="https://example.com/image.jpg"
            value={form.coverImage}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Phần chọn danh mục */}
        <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
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
            Tạo mới Danh mục
          </button>
        </div>

        {/* Phần upload & preview hình ảnh (nếu cần gallery) */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="imageFile">Chọn ảnh bài viết:</label>
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              multiple
              onChange={handleFileChange}
              className="form-control"
            />
            {images.length > 0 && (
              <div
                className="images-preview"
                style={{ display: 'flex', gap: '10px', marginTop: '10px' }}
              >
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
        </div>

        {/* Toast UI Editor cho nội dung bài viết */}
        <div className="form-group">
          <label>Nội dung bài viết:</label>
          <Editor
            initialValue="Soạn nội dung bài viết tại đây..."
            previewStyle="vertical"
            height="500px"
            initialEditType="markdown"
            useCommandShortcut={true}
            ref={editorRef}
          />
        </div>

        {/* Nút submit */}
        <button type="submit" className="btn btn-primary">
          Tạo bài viết
        </button>
      </form>

      {/* Modal inline: Tạo mới Danh mục */}
      {showCreateCateModal && (
        <Modal onClose={() => setShowCreateCateModal(false)}>
          <CreateCate
            onClose={() => setShowCreateCateModal(false)}
            onCreateSuccess={(newCate) => {
              // Cập nhật danh sách danh mục và chọn danh mục mới tạo
              setCategories(prev => [...prev, newCate]);
              setForm(prev => ({ ...prev, category: newCate._id }));
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default CreatePost;