// components/OtpModal.jsx

import React, { useState } from 'react';
import { verifyOTP } from '../api/server';

const OtpModal = ({ userId, onVerified, onCancel }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await verifyOTP({ userId, otp });
      if (result.verified) {
        onVerified(result.user);
      } else {
        setError(result.message || 'OTP không chính xác, vui lòng thử lại!');
      }
    } catch (error) {
      console.log(otp);
      console.error('Lỗi xác thực OTP:', error);
      setError(error.response?.data?.mess || 'Có lỗi xảy ra khi xác thực OTP');
    }
  };

  return (
    <div className="otp-modal">
      <div className="otp-modal-content">
        <h3>Xác thực tài khoản</h3>
        <p>Chúng tôi đã gửi mã OTP vào email của bạn. Vui lòng nhập mã OTP để xác thực tài khoản.</p>
        <form onSubmit={handleOtpSubmit}>
          <input
            type="text"
            placeholder="Nhập OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Xác thực</button>
        </form>
        <button onClick={onCancel} className="close-modal">Hủy</button>
      </div>
    </div>
  );
};

export default OtpModal;
