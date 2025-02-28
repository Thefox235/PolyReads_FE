import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, roles, ...rest }) => {
  const user = JSON.parse(sessionStorage.getItem('user'));

  if (!user) {
    // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
    return <Navigate to="/login" />;
  }

  if (roles && roles.indexOf(user.role) === -1) {
    // Nếu người dùng không có quyền truy cập, chuyển hướng đến trang không có quyền
    return <Navigate to="/" />;
  }

  // Nếu người dùng có quyền truy cập, render component
  return <Element {...rest} />;
};

export default PrivateRoute;
