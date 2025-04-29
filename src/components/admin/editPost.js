// src/components/posts/EditPost.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { updatePost, uploadImageToCloudinary } from '../../api/server';

const EditPost = ({ initialData, onClose, onEditSuccess }) => {
  const [form, setForm] = useState({
    title: '',
    tag: '',
    coverImage: '',
  });
  const [error, setError] = useState('');
  const editorRef = useRef();

  // Prefill dữ liệu khi nhận initialData
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        tag: initialData.tag || '',
        coverImage: initialData.coverImage || '',
      });
      // Đợi editor được mount rồi set Markdown
      if (editorRef.current) {
        editorRef.current.getInstance().setMarkdown(initialData.content || '');
      }
    }
  }, [initialData]);

  // Xử lý thay đổi cho input text
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  // Xử lý upload file cho ảnh bìa
  const handleCoverImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const uploadedUrl = await uploadImageToCloudinary(file);
      setForm((prev) => ({ ...prev, coverImage: uploadedUrl }));
    } catch (err) {
      console.error('Lỗi upload cover image:', err);
      setError('Lỗi upload cover image');
    }
  };

  // Submit cập nhật bài viết
  const handleSubmit = async (e) => {
    e.preventDefault();
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
        content, // Nội dung lấy từ editor
      };
      const updatedPost = await updatePost(initialData._id, updatedPostData);
      alert('Bài viết đã được cập nhật thành công!');
      if (onEditSuccess) onEditSuccess(updatedPost);
      if (onClose) onClose();
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
          <label htmlFor="tag">Danh mục (Tag):</label>
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
                style={{
                  width: '200px',
                  border: '1px solid #ddd',
                  padding: '5px',
                }}
              />
            </div>
          )}
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
            hooks={{
              addImageBlobHook: async (blob, callback) => {
                try {
                  const url = await uploadImageToCloudinary(blob);
                  callback(url, 'Uploaded image');
                } catch (err) {
                  console.error('Lỗi upload ảnh từ Editor:', err);
                }
              },
            }}
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