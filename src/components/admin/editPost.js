// src/components/posts/EditPost.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
// Nhớ import CSS của Toast UI Editor nếu chưa có
// import 'tui-editor/dist/tui-editor.css';
// import 'tui-editor/dist/tui-editor-contents.css';
import { updatePost } from '../../api/server';

const EditPost = ({ initialData, onClose, onEditSuccess }) => {
  const [form, setForm] = useState({
    title: '',
    tag: '',
    coverImage: '',
  });
  const [error, setError] = useState('');
  const editorRef = useRef();

  // Khi initialData thay đổi (ví dụ: khi mở modal sửa bài viết), prefill form & nội dung editor
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        tag: initialData.tag || '',
        coverImage: initialData.coverImage || '',
      });

      // Đợi editor render xong thì set nội dung
      if (editorRef.current) {
        editorRef.current.getInstance().setMarkdown(initialData.content || '');
      }
    }
  }, [initialData]);

  // Hàm xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit cập nhật bài viết
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate các trường bắt buộc
    if (!form.title.trim()) {
      setError('Tiêu đề bài viết không được để trống.');
      return;
    }
    const content = editorRef.current.getInstance().getMarkdown();
    if (!content.trim()) {
      setError('Nội dung bài viết không được để trống.');
      return;
    }

    try {
      const updatedPostData = {
        ...form,
        content, // Nội dung mới từ editor
      };

      // Gọi API updatePost với id của bài viết cần chỉnh sửa
      const updatedPost = await updatePost(initialData._id, updatedPostData);
      alert('Bài viết đã được cập nhật thành công!');
      if (onEditSuccess) onEditSuccess(updatedPost);
    } catch (err) {
      console.error('Lỗi khi cập nhật bài viết:', err);
      setError('Có lỗi xảy ra khi cập nhật bài viết.');
    }
  };

  return (
    <div className="addPro-container">
      <h1>Chỉnh sửa Bài Viết</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Input tiêu đề */}
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
        {/* Input danh mục (tag) */}
        <div className="form-group">
          <label htmlFor="tag">Danh mục (ID hoặc tên):</label>
          <input
            type="text"
            id="tag"
            name="tag"
            value={form.tag}
            onChange={handleChange}
            className="form-control"
            placeholder="Nhập danh mục..."
          />
        </div>
        {/* Input hình ảnh bìa */}
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
        {/* Toast UI Editor cho nội dung bài viết */}
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
          Chỉnh sửa bài viết
        </button>
      </form>
    </div>
  );
};

export default EditPost;