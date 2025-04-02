import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
// Giả sử rằng hàm getAllProduct và getCategories được export từ '../../api/server'
import { getAllProduct, getCategories } from '../../api/server';

const BestSellingCategoriesChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        // Lấy danh sách sản phẩm và thể loại.
        const products = await getAllProduct();
        const categories = await getCategories();

        // Tạo mapping (id => name) cho category. Sử dụng _id được chuyển thành string.
        const categoryMapping = {};
        if (Array.isArray(categories)) {
          categories.forEach(cat => {
            categoryMapping[cat._id.toString()] = cat.name;
          });
        }

        // Nhóm sản phẩm theo category dựa trên số lượng bán: sale_count.
        // Lưu ý: dựa trên schema, trường sale_count có số lượng đã bán.
        const categorySales = {};
        if (Array.isArray(products)) {
          products.forEach(product => {
            // Lấy id của category. Nếu product.category là object (đã populate), lấy _id; nếu không, dùng chính giá trị.
            const catId =
              typeof product.category === 'object'
                ? product.category._id.toString()
                : product.category.toString();
            const sale = Number(product.sale_count) || 0;
            if (categorySales[catId]) {
              categorySales[catId] += sale;
            } else {
              categorySales[catId] = sale;
            }
          });
        }

        // Sắp xếp các category theo sale (giảm dần)
        const sortedCategoryIds = Object.keys(categorySales).sort(
          (a, b) => categorySales[b] - categorySales[a]
        );
        // Lấy top 6 thể loại bán chạy nhất (bạn có thể chỉnh số lượng theo nhu cầu)
        const topCategoryIds = sortedCategoryIds.slice(0, 6);
        const labels = topCategoryIds.map(id => categoryMapping[id] || 'Unknown');
        const salesData = topCategoryIds.map(id => categorySales[id]);

        setChartData({
          labels,
          datasets: [
            {
              data: salesData,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
              ]
            }
          ]
        });
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu thể loại:', error);
      }
    };

    fetchAndProcessData();
  }, []);

  return (
    <div className='' style={{ height: '320px', width: '320px', position: 'relative' }}>
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

export default BestSellingCategoriesChart;