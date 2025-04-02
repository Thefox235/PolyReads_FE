import React, { useEffect, useState } from "react";
import "../../asset/css/dashboard.css";
import { getAllOrder, getAllUser, getAllProduct } from '../../api/server';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";
import "../../asset/css/dashboard.css";
import BestSellingCategoriesChart from './BestSellingCategoriesChart';
import MonthlyRevenueChart from './MonthlyRevenueChart';

// Đăng ký các module cần thiết của Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
    const statusOptions = [
        { value: 0, label: "Đang xử lý" },
        { value: 1, label: "Đang giao" },
        { value: 2, label: "Hoàn tất" },
        { value: -1, label: "Bị hủy" },
        { value: 3, label: "Đổi trả" },
    ];
    // Lưu trữ mảng order, sau đó tính toán pendingOrderCount và totalOrderCount
    const [orders, setOrders] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [productCount, setProductCount] = useState(0);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                // Lấy dữ liệu từ API (giả sử các API trả về mảng)
                const ordersData = await getAllOrder();
                const usersData = await getAllUser();
                const productsData = await getAllProduct();

                // Nên kiểm tra xem dữ liệu có phải là mảng không trước khi lấy độ dài
                setOrders(Array.isArray(ordersData) ? ordersData : []);
                setUserCount(Array.isArray(usersData) ? usersData.length : 0);
                setProductCount(Array.isArray(productsData) ? productsData.length : 0);
            } catch (error) {
                console.error("Lỗi khi fetch dữ liệu:", error);
            }
        };
        fetchCounts();
    }, []);

    // Tính số lượng đơn hàng chờ duyệt và tổng số đơn hàng
    const pendingOrderCount = orders.filter(order => order.status === 0).length;
    const totalOrderCount = orders.length;

    const donutData = {
        labels: ["Đã hoàn tất", "Đang xử lý", "Đã hủy"],
        datasets: [
            {
                data: [60, 25, 15],
                backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
                hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
            },
        ],
    };

    // Dữ liệu cho biểu đồ cột
    const barData = {
        labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
        datasets: [
            {
                label: "Doanh thu (USD)",
                backgroundColor: "#36A2EB",
                borderColor: "#36A2EB",
                borderWidth: 1,
                hoverBackgroundColor: "#36A2EB",
                hoverBorderColor: "#36A2EB",
                data: [4500, 3800, 5000, 6000, 5500, 7000],
            },
        ],
    };


    return (
        <div className="admin-product">
            <h1 className="dashboard-title">Dashboard</h1>

            {/* Các summary card */}
            <div
                className="summary-cards"
                style={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "20px",
                    flexWrap: "wrap",
                    padding: "30px",
                }}
            >
                <div className="card">
                    <div className="dashboard-icon">
                        <i className="bi bi-person-circle"></i>
                    </div>
                    <div className="dashboard-title-content">
                        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{userCount}</p>
                        <h3>Người dùng</h3>
                    </div>
                </div>

                <div className="card">
                    <div className="dashboard-icon">
                        <i className="bi bi-book"></i>
                    </div>
                    <div className="dashboard-title-content">
                        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{productCount}</p>
                        <h3>Quyển sách</h3>
                    </div>
                </div>

                {/* Thẻ hiển thị số đơn hàng chờ duyệt */}
                <div className="card">
                    <div className="dashboard-icon">
                        <i className="bi bi-hourglass-split"></i>
                    </div>
                    <div className="dashboard-title-content">
                        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{pendingOrderCount}</p>
                        <h3>Chờ duyệt</h3>
                    </div>
                </div>


                {/* Thẻ hiển thị tổng số đơn hàng */}
                <div className="card">
                    <div className="dashboard-icon">
                        <i className="bi bi-box-seam-fill"></i>
                    </div>
                    <div className="dashboard-title-content">
                        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalOrderCount}</p>
                        <h3>Đơn hàng</h3>
                    </div>
                </div>

            </div>

            {/* Phần Biểu đồ */}
            <div className="charts"
            // style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '30px' }}
            >
                {/* Biểu đồ tròn: Thể loại bán chạy nhất */}
                <div
                    className="chart-doughnut-container"
                // style={{
                //     height: '320px',
                //     width: '320px',
                //     background: '#fff',
                //     padding: '20px',
                //     borderRadius: '5px',
                //     boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                // }}
                >
                    <h3>Thể loại bán chạy nhất</h3>
                    <BestSellingCategoriesChart />
                </div>


                {/* Biểu đồ cột (Monthly Revenue Chart) */}
                <div className="chart-bar-container" style={{ height: '350px', flex: '1 1 300px', background: '#fff', padding: '20px', borderRadius: '5px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
                
                    <MonthlyRevenueChart />
                </div>
            </div>

            {/* Recent Activity */}
            <div
                className="recent-activity"
                style={{
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "5px",
                    overflowX: "auto",
                    marginBottom: "30px",
                }}
            >
                <h2>Hóa Đơn</h2>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>

                            <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>Khách hàng</th>
                            <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>Ngày</th>
                            <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>Mã hóa đơn</th>
                            <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>Số tiền</th>
                            <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>Tình trạng</th>
                            <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>Trạng thái</th>

                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={order._id}>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{order.userId.name}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{new Date(order.date).toLocaleString("vi-VN")}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                                        {order._id}
                                    </td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{order.total &&
                                        order.total.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{order.paymentId.status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                                        {
                                            statusOptions.find(
                                                (opt) => String(opt.value) === String(order.status)
                                            )?.label || "Khác"
                                        }</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">Không có đơn hàng nào.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default Dashboard;