import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentResult = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(true);

    useEffect(() => {
        // Lấy các query parameter từ URL (được VNPay redirect về sau giao dịch)
        const params = new URLSearchParams(window.location.search);
        const responseCode = params.get('vnp_ResponseCode'); // "00" nếu thành công
        const txnRef = params.get('vnp_TxnRef');             // Mã giao dịch VNPay
        const amountParam = params.get('vnp_Amount');
        const createDate = params.get('vnp_CreateDate');

        // VNPay thường gửi số tiền đã nhân 100, do đó ta chia lại 100
        const formattedAmount = amountParam ? Number(amountParam) / 100 : null;

        const message = responseCode === '00'
            ? 'Thanh toán thành công'
            : 'Thanh toán không thành công';

        // Cập nhật state hiển thị kết quả giao dịch
        setResult({
            code: responseCode,
            txnRef,
            amount: formattedAmount,
            createDate,
            message,
        });
        setLoading(false);

        // Giả sử bạn đã lưu orderId và paymentId vào sessionStorage lúc tạo đơn hàng
        const orderId = sessionStorage.getItem('orderId');
        const paymentId = sessionStorage.getItem('paymentId');
        console.log(orderId);
        // Gọi API cập nhật trạng thái thanh toán ở backend
        // Đây là nơi bạn tích hợp các hàm axios đã được cấu hình ở file server.js (hoặc helper api) của BE
        axios.post('http://localhost:3000/payment/confirm', {
            orderId,
            paymentId,
            vnp_ResponseCode: responseCode
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
        <>
            <main className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-sm">
                            <div
                                className={`card-header text-center ${result.code === '00'
                                        ? 'bg-success text-white'
                                        : 'bg-danger text-white'
                                    }`}
                            >
                                <h4 className="mb-0">{result.message}</h4>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center">
                                    Thông tin giao dịch thanh toán
                                </h5>
                                <p className="card-text text-center">
                                    Chi tiết giao dịch của bạn được hiển thị bên dưới:
                                </p>
                                <ul className="list-group list-group-flush mb-3">
                                    <li className="list-group-item">
                                        <strong>Mã giao dịch VNPay:</strong> {result.txnRef}
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
        </>
    );
};

export default PaymentResult;