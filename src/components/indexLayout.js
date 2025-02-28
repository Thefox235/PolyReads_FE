import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './header';
import Footer from './footer';


function IndexLayout() {
  const location = useLocation();

  // Danh sách các đường dẫn mà bạn không muốn hiển thị header
  const noHeaderPaths = ['/login', '/register', '/detail'];

  // Nếu có route cần header khác, bạn có thể thêm điều kiện riêng, ví dụ:
  // const adminHeaderPaths = ['/admin'];

  const shouldShowHeader = !noHeaderPaths.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      {/* Hiển thị nội dung route con */}
      <Outlet />
      {/* Tương tự, nếu muốn ẩn footer trong một số route, có thể làm như header */}
      <Footer/>
    </>
  );
}

export default IndexLayout;
