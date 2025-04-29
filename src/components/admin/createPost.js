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
    category: ''  // Đây là id của danh mục được chọn
  });
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]); // cho gallery nếu cần
  const [showCreateCateModal, setShowCreateCateModal] = useState(false);

  // Ref cho Toast UI Editor
  const editorRef = useRef();

  // Fetch các danh mục và lọc ra chỉ các danh mục có type là "blog" (theo yêu cầu)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        // Lọc danh mục có type là "blog" (không phân biệt chữ hoa, chữ thường)
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

  // Handler thay đổi input cho title và coverImage (nếu dùng input text để chỉnh sửa URL)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  // Handler upload file cho Gallery (nếu cần)
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

  // Handler upload file cho ảnh bìa
  const handleCoverImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const uploadedUrl = await uploadImageToCloudinary(file);
      setForm((prev) => ({
        ...prev,
        coverImage: uploadedUrl,
      }));
    } catch (error) {
      console.error("Lỗi upload cover image:", error);
      setError("Lỗi upload cover image");
    }
  };

  // Submit dữ liệu để tạo bài viết; map form.category thành tag để phù hợp với schema
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
    if (!form.category) {
      setError('Vui lòng chọn danh mục (tag)');
      return;
    }

    try {
      // Tạo object postData, mapping form.category thành tag
      const postData = {
        title: form.title,
        coverImage: form.coverImage,
        tag: form.category, // map trường category thành tag
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

        {/* Upload ảnh bìa */}
        <div className="form-group">
          <label htmlFor="coverImage">Hình ảnh bìa:</label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            onChange={handleCoverImageUpload}
            className="form-control"
          />
          {form.coverImage && (
            <div style={{ marginTop: '10px' }}>
              <img
                src={form.coverImage}
                alt="Cover Preview"
                style={{ width: '200px', border: '1px solid #ddd', padding: '5px' }}
              />
            </div>
          )}
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
            hooks={{
              addImageBlobHook: async (blob, callback) => {
                try {
                  const url = await uploadImageToCloudinary(blob);
                  callback(url, 'Uploaded image');
                } catch (error) {
                  console.error("Lỗi upload ảnh từ Toast UI Editor:", error);
                }
              }
            }}
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