import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Login } from '../api/server';
import '../asset/css/login.css';
import { Link } from 'react-router-dom';
import OtpModal from './OtpModal';

const AuthForm = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    pass: '',
  });
  const [loginError, setLoginError] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [tempUser, setTempUser] = useState(null);

  // Hàm xử lý thay đổi input cho đăng nhập email/pass
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // Xử lý đăng nhập qua email/pass
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await Login(loginData);
      setLoginError('');
      if (result.is_verified === false) {
        setTempUser(result);
        setShowOtpModal(true);
      } else {
        sessionStorage.setItem('user', JSON.stringify(result));
        if (result.role === "1") {
          window.location.href = '/viewPro';
        } else {
          window.location.href = '/home';
        }
      }
    } catch (error) {
      setLoginError(error.response?.data?.mess || 'Có lỗi xảy ra khi đăng nhập');
    }
  };

  // Hook để đăng nhập qua Google sử dụng custom button
  const googleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      console.log('Google login success:', credentialResponse);
      try {
        // Sửa chỗ lấy token: dùng access_token thay vì credential
        const googleToken = credentialResponse.access_token;
        if (!googleToken) {
          alert("Không nhận được token từ Google!");
          return;
        }
        // Gọi API đăng nhập bằng Google với payload chứa token
        const result = await Login({ googleToken });
        setLoginError('');
        if (result.is_verified === false) {
          setTempUser(result);
          setShowOtpModal(true);
        } else {
          sessionStorage.setItem('user', JSON.stringify(result));
          if (result.role === "1") {
            window.location.href = '/viewPro';
          } else {
            window.location.href = '/home';
          }
        }
      } catch (error) {
        setLoginError('Đăng nhập bằng Google thất bại');
        console.error(error);
      }
    },
    onError: () => {
      console.log('Đăng nhập với Google không thành công');
      setLoginError('Đăng nhập với Google không thành công');
    },
  });
  

  // Xử lý khi OTP được xác thực thành công
  const handleVerified = (userVerified) => {
    sessionStorage.setItem('user', JSON.stringify(userVerified));
    setShowOtpModal(false);
    alert('Xác thực thành công!');
    if (userVerified.role === "1") {
      window.location.href = '/viewPro';
    } else {
      window.location.href = '/home';
    }
  };

  return (
    <>
      <section className="banner">
        <div className="banner-overlay">
          <h1>Đăng nhập</h1>
          <p style={{ fontSize: 20, fontWeight: 400 }}>
            <a href="/">Trang chủ</a> &gt; Đăng nhập
          </p>
        </div>
      </section>

      <div className="login-container">
        <div className="login-box">
          <h2>Đăng nhập</h2>
          <div className="social-login">
            <button className="facebook-btn">
              <i className="bi bi-facebook" /> Facebook
            </button>

            {/* Nút đăng nhập Google với giao diện custom */}
            <button className="google-btn" onClick={() => googleLogin()}>
              <i className="bi bi-google" /> Google
            </button>
          </div>

          <form className="login-form" onSubmit={handleLoginSubmit}>
            <input
              type="email"
              placeholder="Email"
              required
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              required
              id="pass"
              name="pass"
              value={loginData.pass}
              onChange={handleLoginChange}
            />
            <button type="submit">Đăng nhập</button>
          </form>
          {loginError && <p className="error">{loginError}</p>}
          <div className="links">
            <p>
              Bạn chưa có tài khoản, vui lòng đăng ký <Link to="/register">tại đây</Link>
            </p>
            <p>
              Quên mật khẩu? <Link to="/forgotPassword">Click</Link>
            </p>
          </div>
        </div>
      </div>

      {showOtpModal && tempUser && (
        <OtpModal
          userId={tempUser._id}
          onVerified={handleVerified}
          onCancel={() => setShowOtpModal(false)}
        />
      )}
    </>
  );
};

export default AuthForm;
