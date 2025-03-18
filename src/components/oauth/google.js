import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function Google() {
  // Hàm xử lý khi đăng nhập thành công
  const handleSuccess = (credentialResponse) => {
    console.log('Credential Response:', credentialResponse);
    // Ở đây bạn có thể gửi token lên server để xác thực,
    // hoặc sử dụng token để lấy thông tin người dùng qua API của Google.
  };

  // Hàm xử lý khi có lỗi đăng nhập
  const handleError = () => {
    console.error('Đăng nhập thất bại');
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div>
        <h2>Đăng nhập bằng Google</h2>
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </div>
    </GoogleOAuthProvider>
  );
}

export default Google;
