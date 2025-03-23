import React, { useState, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { createPost } from '../../api/server';

const CreatePost = ({ onClose, onCreateSuccess }) => {
  const [form, setForm] = useState({
    title: '',
    tag: '',         // có thể là ID của danh mục hoặc bạn sẽ chuyển thành <select/>
    coverImage: '',  // URL ảnh bìa nếu có
  });
  const [error, setError] = useState('');
  const editorRef = useRef();

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError('Vui lòng nhập tiêu đề bài viết');
      return;
    }

    // Lấy nội dung từ Toast Editor (có thể dùng getMarkdown hoặc getHTML)
    const content = editorRef.current.getInstance().getMarkdown();
    if (!content.trim()) {
      setError('Vui lòng nhập nội dung bài viết');
      return;
    }

    try {
      const postData = {
        ...form,
        content
      };

      const newPost = await createPost(postData);
      console.log('Bài viết tạo thành công:', newPost);
      alert('Thêm bài viết thành công');
      if (onCreateSuccess) onCreateSuccess(newPost);
      // Reset form hoặc thực hiện các hành động cần thiết khác
    } catch (err) {
      setError('Có lỗi xảy ra khi tạo bài viết');
      console.error(err);
    }
  };

  return (
    <div className="create-post-container">
      <h1>Tạo Bài Viết Mới</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Tiêu đề bài viết:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tag">Danh mục (ID hoặc chọn từ danh sách):</label>
          <input
            type="text"
            id="tag"
            name="tag"
            value={form.tag}
            onChange={handleChange}
            className="form-control"
            placeholder="Nhập ID danh mục..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="coverImage">Hình ảnh bìa (URL):</label>
          <input
            type="text"
            id="coverImage"
            name="coverImage"
            value={form.coverImage}
            onChange={handleChange}
            className="form-control"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-group">
          <label>Nội dung bài viết:</label>
          <Editor
            initialValue="Soạn nội dung bài viết tại đây..."
            previewStyle="vertical"
            height="400px"
            initialEditType="markdown"
            useCommandShortcut={true}
            ref={editorRef}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Tạo bài viết
        </button>
      </form>
    </div>
  );
};

export default CreatePost;