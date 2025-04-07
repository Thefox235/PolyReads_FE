import React, { useState } from 'react';
import { Register } from '../api/server';
import { useGoogleLogin } from '@react-oauth/google';
import '../asset/css/login.css';
import { Link } from 'react-router-dom';

const AuthForm = () => {
  const [registerData, setRegisterData] = useState({
    name: '',
    pass: '',
    email: '',
    phone: ''
  });
  const [cpassword, setCpassword] = useState('');
  const [registerError, setRegisterError] = useState('');

  // Xử lý thay đổi input cho form đăng ký
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cpassword') {
      setCpassword(value);
    } else {
      setRegisterData({
        ...registerData,
        [name]: value
      });
    }
  };

  // Xử lý đăng ký bằng form thông thường
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra độ dài mật khẩu (cần > 6 ký tự, tức tối thiểu 7 ký tự)
    if (registerData.pass.length <= 6) {
      alert('Mật khẩu phải dài hơn 6 ký tự!');
      return;
    }

    // Kiểm tra confirm password
    if (registerData.pass !== cpassword) {
      alert('Mật khẩu không khớp!');
      return;
    }

    // Xây dựng payload cho đăng ký thông thường
    const payload = {
      email: registerData.email,
      pass: registerData.pass,
      name: registerData.name,
      phone: registerData.phone
    };

    try {
      const result = await Register(payload);
      alert('Đăng ký thành công!');
      console.log('Đăng ký thành công:', result);
      window.location.href = '/login';
    } catch (error) {
      console.error('Có lỗi xảy ra khi đăng ký:', error);
      if (error.response && error.response.data && error.response.data.mess) {
        alert(error.response.data.mess);
      } else {
        alert('Có lỗi xảy ra khi đăng ký');
      }
    }
  };

  // Tích hợp đăng ký bằng Google sử dụng hook useGoogleLogin
  const googleRegister = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      console.log('Google register success:', credentialResponse);
      try {
        // Lấy token từ trường access_token thay cho credential
        const googleToken = credentialResponse.access_token;
        if (!googleToken) {
          alert("Google token không hợp lệ!");
          return;
        }
        // Gọi API đăng ký với payload chứa trường googleToken
        const result = await Register({ googleToken });
        alert('Đăng ký thành công bằng Google!');
        window.location.href = '/login';
      } catch (error) {
        console.error(error);
        alert('Đăng ký bằng Google thất bại!');
      }
    },
    onError: () => {
      console.log('Đăng ký với Google không thành công');
      alert('Đăng ký bằng Google không thành công');
    },
  });

  return (
    <>
      <section className="banner">
        <div className="banner-overlay">
          <h1>Đăng ký</h1>
          <p style={{ fontSize: 20, fontWeight: 400 }}>
            <a href="/">Trang chủ</a> &gt; Đăng ký
          </p>
        </div>
      </section>

      <div className="login-container">
        <div className="login-box">
          <h2>Đăng ký</h2>

          {/* Nút đăng ký bằng Google */}
          <div className="social-login">
            <button className="google-btn" onClick={() => googleRegister()}>
              <i className="bi bi-google" /> Google
            </button>
            {/* Nếu bạn có hàm đăng ký Facebook riêng, thay vì sử dụng cùng googleRegister */}
            {/* <button className="facebook-btn" onClick={() => { }}>
              <i className="bi bi-facebook" /> Facebook
            </button> */}
          </div>

          {/* Form đăng ký thông thường */}
          <form className="login-form" onSubmit={handleRegisterSubmit}>
            <input
              type="text"
              placeholder="Họ và tên"
              id="name"
              name="name"
              value={registerData.name}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="number"
              placeholder="Số điện thoại"
              id="phone"
              name="phone"
              value={registerData.phone}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              id="pass"
              name="pass"
              value={registerData.pass}
              onChange={handleRegisterChange}
              required
              minLength={7}
              onInvalid={(e) =>
                e.target.setCustomValidity('Mật khẩu phải có ít nhất 7 ký tự!')
              }
              onInput={(e) => e.target.setCustomValidity('')}
            />
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              id="cpassword"
              name="cpassword"
              value={cpassword}
              onChange={handleRegisterChange}
              required
            />
            <button type="submit">Đăng ký</button>
          </form>
          <div className="links">
            <p>
              Bạn đã có tài khoản, đăng nhập <Link to="/login">tại đây</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;