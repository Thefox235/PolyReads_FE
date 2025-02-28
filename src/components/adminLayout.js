import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SideBar from './admin/sideBar';



function AmindLayout() {
  const location = useLocation();

  // Nếu có route cần header khác, bạn có thể thêm điều kiện riêng, ví dụ:
  // const adminHeaderPaths = ['/admin'];


  return (
    <>
      {/* Hiển thị nội dung route con */}
      <SideBar/>
      <Outlet />

      {/* Tương tự, nếu muốn ẩn footer trong một số route, có thể làm như header */}
    </>
  );
}

export default AmindLayout;
