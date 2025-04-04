import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentResult = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // Nếu bạn thêm paymentMethod vào redirectUrl, giúp xác định cổng thanh toán
    const paymentMethod = params.get('paymentMethod') || 
      (params.get('vnp_ResponseCode') ? 'vnpay' : 'zalopay');

    let responseCode, txnRef, amountParam, createDate;
    if (paymentMethod === 'vnpay') {
      responseCode = params.get('vnp_ResponseCode'); // "00" nếu thành công
      txnRef = params.get('vnp_TxnRef');
      amountParam = params.get('vnp_Amount');
      createDate = params.get('vnp_CreateDate');
    } else if (paymentMethod === 'zalopay') {
      // Giả sử backend của ZaloPay trả về các tham số dưới dạng này, tùy chỉnh theo tài liệu
      responseCode = params.get('zp_ResponseCode'); 
      txnRef = params.get('zp_TransactionId');
      amountParam = params.get('zp_Amount');
      createDate = params.get('zp_CreateDate');
    }

    // Nếu ZaloPay cũng nhân số tiền với 100 (như VNPay), ta chia lại, nếu không thì bỏ qua
    const formattedAmount = amountParam ? Number(amountParam) / 100 : null;
    const message = responseCode === '00'
      ? 'Thanh toán thành công'
      : 'Thanh toán không thành công';

    setResult({
      code: responseCode,
      txnRef,
      amount: formattedAmount,
      createDate,
      message,
      paymentMethod,
    });
    setLoading(false);

    // Cập nhật trạng thái thanh toán (sessionStorage đã lưu orderId và paymentId lúc tạo đơn)
    const orderId = sessionStorage.getItem('orderId');
    const paymentId = sessionStorage.getItem('paymentId');

    axios.post('http://localhost:3000/payment/confirm', {
      orderId,
      paymentId,
      responseCode, // hoặc vnp_ResponseCode, tùy thuộc vào cổng
    })
      .then(response => {
        console.log('Cập nhật thanh toán thành công:', response.data);
        setUpdating(false);
      })
      .catch(error => {
        console.error('Lỗi cập nhật thanh toán:', error);
        setUpdating(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h4>Đang xử lý kết quả giao dịch...</h4>
      </div>
    );
  }

  return (
    <main className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className={`card-header text-center ${result.code === '00' ? 'bg-success text-white' : 'bg-danger text-white'}`}>
              <h4 className="mb-0">{result.message}</h4>
            </div>
            <div className="card-body">
              <h5 className="card-title text-center">Thông tin giao dịch thanh toán</h5>
              <p className="card-text text-center">Chi tiết giao dịch của bạn được hiển thị bên dưới:</p>
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item">
                  <strong>Mã giao dịch:</strong> {result.txnRef}
                </li>
                <li className="list-group-item">
                  <strong>Số tiền:</strong>{' '}
                  {result.amount
                    ? new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(result.amount)
                    : 'N/A'}
                </li>
                <li className="list-group-item">
                  <strong>Thời gian giao dịch:</strong> {result.createDate || 'N/A'}
                </li>
                <li className="list-group-item">
                  <strong>Cổng thanh toán:</strong> {result.paymentMethod.toUpperCase()}
                </li>
              </ul>
              {updating ? (
                <p className="text-center">Đang cập nhật trạng thái thanh toán...</p>
              ) : (
                <div className="text-center">
                  <a href="/" className="btn btn-primary">
                    Trở về trang chủ
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentResult;