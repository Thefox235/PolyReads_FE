// DonutChart.jsx
import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { getAllOrder } from '../../api/server';

const DonutChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchDonutData = async () => {
      try {
        const orders = await getAllOrder();
        if (Array.isArray(orders)) {
          // Giả sử:
          // status === 0: Chờ duyệt
          // status === 1: Đã duyệt
          // status === -1: Đã hủy
          const pendingCount = orders.filter(order => order.status === 0).length;
          const approvedCount = orders.filter(order => order.status === 1).length;
          const cancelledCount = orders.filter(order => order.status === -1).length;
          setChartData({
            labels: ['Chờ duyệt', 'Đã duyệt', 'Đã hủy'],
            datasets: [
              {
                data: [pendingCount, approvedCount, cancelledCount],
                backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384'],
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching orders for donut chart:", error);
      }
    };

    fetchDonutData();
  }, []);

  return (
    <div style={{ height: '320px', width: '320px', position: 'relative' }}>
      <Doughnut
        data={chartData}
        options={{
          maintainAspectRatio: false,
          animation: { duration: 0 },
        }}
      />
    </div>
  );
};

export default DonutChart;