// components/OtpModal.jsx

import React, { useState } from 'react';
import { verifyOTP, resendOTP } from '../api/server';

const OtpModal = ({ userId, onVerified, onCancel }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await verifyOTP({ userId, otp });
      if (result.verified) {
        onVerified(result.user);
      } else {
        setError(result.message || 'OTP không chính xác, vui lòng thử lại!');
      }
    } catch (error) {
      console.error('Lỗi xác thực OTP:', error);
      setError(error.response?.data?.mess || 'Có lỗi xảy ra khi xác thực OTP');
    }
  };

  // Hàm này gửi yêu cầu để gửi lại OTP cho người dùng
// Giả sử bạn đã có thông tin user sau khi đăng ký

// Khi nhấn nút "Gửi lại OTP"
const handleResendOtp = async () => {
  try {
    const result = await resendOTP({ userId });
    setStatus('Mã OTP đã được gửi lại vào email của bạn.');
  } catch (error) {
    setError('Có lỗi khi gửi lại OTP');
  }
};

  return (
    <div className="otp-modal">
      <div className="otp-modal-content">
        <h3>Xác thực tài khoản</h3>
        <p>
          Chúng tôi đã gửi mã OTP vào email của bạn. Vui lòng nhập mã OTP để xác thực tài
          khoản.
        </p>
        <form onSubmit={handleOtpSubmit}>
          <input
            type="text"
            placeholder="Nhập OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          {status && <p className="status">{status}</p>}
          <button type="submit">Xác thực</button>
        </form>
        {/* Nút "Gửi lại OTP" */}
        <button onClick={handleResendOtp} className="resend-otp">
          Gửi lại OTP
        </button>
        <button onClick={onCancel} className="close-modal">
          Hủy
        </button>
      </div>
    </div>
  );
};

export default OtpModal;
