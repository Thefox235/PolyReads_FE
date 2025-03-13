import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './header';
import Footer from './footer';


function IndexLayout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };

  const location = useLocation();
  console.log(user);
  // Danh sách các đường dẫn mà bạn không muốn hiển thị header
  const noHeaderPaths = ['/login', '/register', '/detail'];

  // Nếu có route cần header khác, bạn có thể thêm điều kiện riêng, ví dụ:
  // const adminHeaderPaths = ['/admin'];

  const shouldShowHeader = !noHeaderPaths.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header user={user} handleLogout={handleLogout}/>}
      {/* Hiển thị nội dung route con */}
      <Outlet />
      {/* Tương tự, nếu muốn ẩn footer trong một số route, có thể làm như header */}
      <Footer/>
    </>
  );
}

export default IndexLayout;
