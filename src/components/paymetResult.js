import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentResult = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    console.log("Query parameters:", Array.from(params.entries()));

    // Xác định cổng thanh toán dựa vào query parameter
    const paymentMethod =
      params.get('paymentMethod') ||
      (params.get('vnp_ResponseCode') ? 'vnpay' : (params.get('status') ? 'zalopay' : ''));

    let responseCode,
      txnRef,
      amountParam,
      createDate,
      bankcode,
      checksum,
      discountAmount,
      pmcid;

    if (paymentMethod === 'vnpay') {
      responseCode = params.get('vnp_ResponseCode'); // Ví dụ "00" nếu giao dịch thành công
      txnRef = params.get('vnp_TxnRef');
      amountParam = params.get('vnp_Amount');
      createDate = params.get('vnp_CreateDate');
    } else if (paymentMethod === 'zalopay') {
      // Với Zalopay, URL mẫu trả về có:
      // status=1 (giao dịch thành công), apptransid, amount, bankcode, checksum, discountamount, pmcid
      responseCode = params.get('status'); // Ví dụ "1" nếu thành công
      txnRef = params.get('apptransid');
      amountParam = params.get('amount');
      createDate = params.get('createdate') || 'N/A';
      bankcode = params.get('bankcode');
      checksum = params.get('checksum');
      discountAmount = params.get('discountamount');
      pmcid = params.get('pmcid');
    }

    // Nếu VNPay thông thường lượng số tiền trả về đã được nhân, bạn có thể xử lý lại ở đây;
    // với Zalopay theo mẫu trên thì amount được trả về dạng chuẩn đơn vị VND.
    const formattedAmount = amountParam ? Number(amountParam) : null;

    // Xác định thông điệp hiển thị:
    // Với VNPay: nếu responseCode === "00" thì thành công;
    // Với Zalopay: nếu responseCode === "1" thì thành công.
    const message =
      (paymentMethod === 'vnpay' && responseCode === '00') ||
      (paymentMethod === 'zalopay' && responseCode === '1')
        ? 'Thanh toán thành công'
        : 'Thanh toán không thành công';

    // Lưu kết quả đã chuẩn hóa
    setResult({
      code: responseCode,
      txnRef,
      amount: formattedAmount,
      createDate,
      message,
      paymentMethod,
      bankcode,
      checksum,
      discountAmount,
      pmcid,
    });
    setLoading(false);

    // Sử dụng kết quả đã chuẩn hóa để gửi cho BE:
    // FE sẽ gửi trường duy nhất "responseCode", với VNPay: "00", với Zalopay: "1"
    const unifiedResponseCode = responseCode;
    const orderId = sessionStorage.getItem('orderId');
    const paymentId = sessionStorage.getItem('paymentId');

    axios
      .post('http://localhost:3000/payment/confirm', {
        orderId,
        paymentId,
        responseCode: unifiedResponseCode,
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
            <div
              className={`card-header text-center ${
                // Nếu VNPay: thành công khi code === "00", nếu Zalopay: thành công khi code === "1"
                (result.paymentMethod === 'vnpay'
                  ? result.code === '00'
                  : result.code === '1')
                  ? 'bg-success text-white'
                  : 'bg-danger text-white'
              }`}
            >
              <h4 className="mb-0">{result.message}</h4>
            </div>
            <div className="card-body">
              <h5 className="card-title text-center">Thông tin giao dịch thanh toán</h5>
              <p className="card-text text-center">
                Chi tiết giao dịch của bạn được hiển thị bên dưới:
              </p>
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
                {result.bankcode && (
                  <li className="list-group-item">
                    <strong>Mã ngân hàng:</strong> {result.bankcode}
                  </li>
                )}
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