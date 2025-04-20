// apiClient.js
import axios from 'axios';

const BASE_URL = 'https://polyread-be.netlify.app';

// Tạo một instance của axios với các cấu hình mặc định:
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Hàm lấy access token từ storage (ví dụ: từ localStorage hoặc sessionStorage)
function getAccessToken() {
  return localStorage.getItem("accessToken");
}

// Hàm lấy refresh token từ storage
function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

// Hàm lưu token mới (có thể là access token hoặc refresh token)
function setAccessToken(token) {
  localStorage.setItem("accessToken", token);
}

// Gán access token mặc định vào headers nếu tồn tại
const token = getAccessToken();
if (token) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Thêm interceptor cho response để refresh token tự động
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    // Nếu lỗi có status 401 (Unauthorized) và chưa retry trước đó
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          // Gọi endpoint refresh token; bạn cần đảm bảo endpoint này trên backend đã được triển khai
          const { data } = await axios.post(`${BASE_URL}/refresh-token`, { refreshToken });
          const newAccessToken = data.token;
          // Lưu access token mới và cập nhật header của apiClient
          setAccessToken(newAccessToken);
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          
          // Retry lại request ban đầu với token mới
          return apiClient(originalRequest);
        } catch (refreshError) {
          // Nếu refresh token không hợp lệ, có thể redirect về trang login
          console.error("Refresh token error:", refreshError);
          window.location.href = '/login'; // hoặc thực hiện logout
          return Promise.reject(refreshError);
        }
      } else {
        // Nếu không có refresh token, buộc người dùng đăng nhập lại
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;