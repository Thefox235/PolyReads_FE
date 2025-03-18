import React, { useState } from 'react';
import { sendForgotPasswordOTP, verifyForgotPasswordOTP, resetForgotPassword } from '../api/server';

const ForgotPassword = () => {
    // stage: 1 - gửi OTP; 2 - xác thực OTP & đổi mật khẩu
    const [stage, setStage] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Bước gửi OTP
    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const data = await sendForgotPasswordOTP(email);
            setMessage(data.mess || 'OTP đã được gửi, kiểm tra email của bạn!');
            setStage(2);
        } catch (err) {
            setError(err.response?.data?.mess || 'Lỗi gửi OTP');
        }
    };

    // Bước đổi mật khẩu sau khi xác thực OTP
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu không khớp!');
            return;
        }
        try {
            // Xác thực OTP trước
            const verifyRes = await verifyForgotPasswordOTP(email, otp);
            if (!verifyRes.verified) {
                setError(verifyRes.mess || 'OTP không đúng');
                return;
            }
            // Đổi mật khẩu
            const resetRes = await resetForgotPassword(email, newPassword);
            setMessage(resetRes.message || 'Đổi mật khẩu thành công!');
            // Bạn có thể chuyển hướng về trang đăng nhập hoặc thực hiện hành động khác sau thành công
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi đổi mật khẩu');
        }
    };

    return (
        <>
            <section className="banner">
                <div className="banner-overlay">
                    <h1>Quên Mật Khẩu</h1>
                    <p style={{ fontSize: 20, fontWeight: 400 }}>
                        <a href="/">Trang chủ</a> &gt; quên mật khẩu
                    </p>
                </div>
            </section>
            <div className="login-container">

                {stage === 1 && (
                    <>
                        <div className='login-box'>
                            <h2>Quên mật khẩu</h2>
                            {error && <p className="error">{error}</p>}
                            {message && <p className="message">{message}</p>}
                            <form className='login-form' onSubmit={handleSendOTP}>
                                <input
                                    type="email"
                                    placeholder="Nhập email của bạn"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button type="submit">Gửi OTP</button>
                            </form>
                        </div>
                    </>
                )}
                {stage === 2 && (
                    <div className='login-container'>
                        <div className='login-box'>
                            <h2>Đặt lại mật khẩu</h2>
                            {error && <p className="error">{error}</p>}
                            {message && <p className="message">{message}</p>}
                            <form className='login-form' onSubmit={handleResetPassword}>
                                <input
                                    type="text"
                                    placeholder="Nhập OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Mật khẩu mới"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Xác nhận mật khẩu mới"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button type="submit">Đổi mật khẩu</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ForgotPassword;
