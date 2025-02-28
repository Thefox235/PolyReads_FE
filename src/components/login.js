import React, { useEffect, useState } from 'react';
import { Register, Login } from '../api/server';
import '../asset/css/login.css'
const AuthForm = () => {
  const [registerData, setRegisterData] = useState({
    name: '',
    pass: '',
    email: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    pass: ''
  });

  const [registerError, setRegisterError] = useState('');
  const [loginError, setLoginError] = useState('');

  let cpassword = '';

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cpassword') {
      cpassword = value;
    } else {
      setRegisterData({
        ...registerData,
        [name]: value
      });
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerData.pass !== cpassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Register Data:', registerData);
    try {
      const result = await Register(registerData);
      console.log('Đăng ký thành công:', result);
      window.location.href = '/login';
    } catch (error) {
      console.error('Có lỗi xảy ra khi đăng ký:', error);
      if (error.response && error.response.data && error.response.data.mess) {
        alert(error.response.data.mess); // Hiển thị thông báo lỗi bằng alert
      } else {
        alert('Có lỗi xảy ra khi đăng ký');
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log('Login Data:', loginData);
    try {
      const result = await Login(loginData);
      console.log('Đăng nhập thành công:', result);
      setLoginError('');
      sessionStorage.setItem('user', JSON.stringify(result));
      if (result.role === "1") {
        window.location.href = '/viewPro';
      } else {
        window.location.href = '/home';
      }
    } catch (error) {
      console.error('Có lỗi xảy ra khi đăng nhập:', error);
      setLoginError(error.response.data.mess || 'Có lỗi xảy ra khi đăng nhập');
    }
  };

  // useEffect(() => {
  //   const panelOneHeight = document.querySelector('.form-panel.one').clientHeight;
  //   const panelTwoHeight = document.querySelector('.form-panel.two').scrollHeight;
  //   const formToggle = document.querySelector('.form-toggle');
  //   const form = document.querySelector('.form');
  //   const formOne = document.querySelector('.form-panel.one');
  //   const formTwo = document.querySelector('.form-panel.two');

  //   // Sự kiện khi click vào phần màu vàng để mở form đăng ký
  //   formTwo.addEventListener('click', function (e) {
  //     if (!formTwo.classList.contains('active')) {
  //       e.preventDefault();
  //       formToggle.classList.add('visible');
  //       formOne.classList.add('hidden');
  //       formTwo.classList.add('active');
  //       form.style.height = panelTwoHeight + 'px';
  //     }
  //   });

  //   // Sự kiện khi click vào nút chữ X để đóng form đăng ký
  //   formToggle.addEventListener('click', function (e) {
  //     if (formTwo.classList.contains('active')) {
  //       e.preventDefault();
  //       this.classList.remove('visible');
  //       formOne.classList.remove('hidden');
  //       formTwo.classList.remove('active');
  //       form.style.height = panelOneHeight + 'px';
  //     }
  //   });
  // }, []);

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
          {/* <div className="social-login">
            <button className="facebook-btn">
              <i className="bi bi-facebook" /> Facebook
            </button>
            <button className="google-btn">
              {" "}
              <i className="bi bi-google" /> Google
            </button>
          </div> */}
          <form className="login-form">
            <input type="email" placeholder="Email" required="" />
            <input type="password" placeholder="Mật khẩu" required="" />
            <button type="submit">Đăng nhập</button>
          </form>
          <div className="links">
            <p>
              Bạn chưa có tài khoản, vui lòng đăng ký{" "}
              <a href="register.html">tại đây</a>
            </p>
            <p>
              Quên mật khẩu? <a href="#">Click</a>
            </p>
          </div>
        </div>
      </div>


      {/* Form */}
      {/* <div className="form">
        <div className="form-toggle" />
        <div className="form-panel one">
          <div className="form-header">
            <h1>Account Login</h1>
          </div>
          <div className="form-content">
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="pass">Password</label>
                <input
                  type="password"
                  id="pass"
                  name="pass"
                  value={loginData.pass}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-remember">
                  <input type="checkbox" />
                  Remember Me
                </label>
                <a className="form-recovery" href="#">
                  Forgot Password?
                </a>
              </div>
              <div className="form-group">
                <button type="submit">Log In</button>
              </div>
            </form>
          </div>
        </div>
        <div className="form-panel two">
          <div className="form-header">
            <h1>Register Account</h1>
          </div>
          <div className="form-content">
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="pass">Password</label>
                <input
                  type="password"
                  id="pass"
                  name="pass"
                  value={registerData.pass}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cpassword">Confirm Password</label>
                <input
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div> */}

    </>
  );
};

export default AuthForm;
