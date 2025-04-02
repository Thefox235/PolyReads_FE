// MonthlyRevenueChart.jsx
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { getAllOrder } from '../../api/server';

const MonthlyRevenueChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  // Hàm nhóm đơn hàng theo tháng dạng "YYYY-MM"
  const groupOrdersByMonth = orders => {
    const grouped = {};
    orders.forEach(order => {
      const date = new Date(order.date);
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}`;
      if (!grouped[monthKey]) {
        grouped[monthKey] = { count: 0, revenue: 0 };
      }
      grouped[monthKey].count += 1;
      // Chỉ cộng doanh thu nếu đơn hàng đã hoàn thành (status === 2)
      if (order.status === 2) {
        grouped[monthKey].revenue += order.total;
      }
    });
    return grouped;
  };
  
  useEffect(() => {
    const fetchAndGroupOrders = async () => {
      try {
        const orders = await getAllOrder();
        if (Array.isArray(orders)) {
          const grouped = groupOrdersByMonth(orders);
          const sortedMonths = Object.keys(grouped).sort();
          const revenues = sortedMonths.map(month => grouped[month].revenue);
          const orderCounts = sortedMonths.map(month => grouped[month].count);

          setChartData({
            labels: sortedMonths,
            datasets: [
              {
                label: 'Doanh thu (VND)',
                data: revenues,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                yAxisID: 'y',
              },
              {
                label: 'Số đơn hàng',
                data: orderCounts,
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                yAxisID: 'y1'
              }
            ]
          });
        }
      } catch (error) {
        console.error("Lỗi khi lấy đơn hàng:", error);
      }
    };

    fetchAndGroupOrders();
  }, []);

  return (
    <div style={{ height: '350px', position: 'relative' }}>
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Doanh thu (VND)'
              }
            },
            y1: {
              position: 'right',
              beginAtZero: true,
              grid: {
                drawOnChartArea: false,
              },
              title: {
                display: true,
                text: 'Số đơn hàng'
              }
            }
          }
        }}
      />
    </div>
  );
};

export default MonthlyRevenueChart;