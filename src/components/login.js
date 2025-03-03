import React, { useState } from 'react';
import { Login } from '../api/server';
import '../asset/css/login.css';
import { Link } from 'react-router-dom';
import OtpModal from './OtpModal'; // Đường dẫn đúng tới file OtpModal

const AuthForm = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    pass: ''
  });
  const [loginError, setLoginError] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [tempUser, setTempUser] = useState(null);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await Login(loginData);
      setLoginError('');
      // Nếu tài khoản chưa xác thực, hiển thị modal OTP
      if (result.is_verified === false) {
        setTempUser(result);
        setShowOtpModal(true);
      } else {
        // Nếu đã xác thực, lưu thông tin và chuyển hướng
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

  // Hàm xử lý khi OTP được xác thực thành công trong modal
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
              Bạn chưa có tài khoản, vui lòng đăng ký <Link to={"/register"}>tại đây</Link>
            </p>
            <p>
              Quên mật khẩu? <Link to="">Click</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Hiển thị OTP Modal nếu cần */}
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
