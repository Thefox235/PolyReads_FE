import React, { useEffect, useState } from 'react';
import { Register, Login } from '../api/server';
import '../asset/css/login.css';

const AuthForm = () => {
    const [registerData, setRegisterData] = useState({
        name: '',
        pass: '',
        email: '',
        phone: ''
    });

    const [cpassword, setCpassword] = useState('');
    const [registerError, setRegisterError] = useState('');

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

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (registerData.pass !== cpassword) {
            alert('Mật khẩu không khớp!');
            console.log('Confirm password:', cpassword);
            return;
        }
        console.log('Register Data:', registerData);
        try {
            const result = await Register(registerData);
            alert('Đăng ký thành công!')
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
                        />
                        <input
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            id="cpassword"
                            name="cpassword"
                            value={cpassword} // Đảm bảo controlled component
                            onChange={handleRegisterChange}
                            required
                        />
                        <button type="submit">Đăng ký</button>
                    </form>
                    <div className="links">
                        <p>
                            Bạn đã có tài khoản, đăng nhập <a href="/login">tại đây</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthForm;
