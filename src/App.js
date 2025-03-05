import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Detail from './components/detail';
import AuthForm from './components/login';
import ViewPro from './components/admin/viewPro';
import CreatePro from './components/admin/createPro';
import CreateCate from './components/admin/createCate';
import EditPro from './components/admin/editPro';
import EditCate from './components/admin/editCate';
import ViewCate from './components/admin/viewCate';
import Logout from './components/logout';
import IndexLayout from './components/indexLayout';
import MainLayout from './components/mainLayout';
import SideBar from './components/admin/sideBar';
import AdminLayout from './components/adminLayout';
import ViewAuthor from './components/admin/viewAuthor';
import CreateAuthor from './components/admin/createAuthor';
import EditAuthor from './components/admin/editAuthor';
import Contact from './components/contact';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/register';
import Cart from './components/cart';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Các route sử dụng indexLayout có header & footer */}
          <Route element={<IndexLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />

            {/* <Route path="/viewPro" element={<PrivateRoute element={ViewPro} roles={['1']} />} />
            <Route path="/viewCate" element={<PrivateRoute element={ViewCate} roles={['1']} />} />
            <Route path="/viewBrand" element={<PrivateRoute element={ViewBrand} roles={['1']} />} /> */}
          </Route>

          {/* Các route không cần header (hoặc có layout khác) */}
          <Route element={<MainLayout />}>
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<AuthForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/product/:id" element={<Detail />} />
          </Route>

          {/* Các route admin có thể đặt ở đây nếu muốn dùng chung layout */}
          <Route element={<AdminLayout />}>
            <Route path="/viewPro" element={<PrivateRoute element={ViewPro} roles={['1']} />} />
            <Route path="/viewCate" element={<PrivateRoute element={ViewCate} roles={['1']} />} />
            <Route path="/viewAuthor" element={<PrivateRoute element={ViewAuthor} roles={['1']} />} />
            <Route path="/createPro" element={<PrivateRoute element={CreatePro} roles={['1']} />} />
            <Route path="/createCate" element={<PrivateRoute element={CreateCate} roles={['1']} />} />
            <Route path="/createAuthor" element={<PrivateRoute element={CreateAuthor} roles={['1']} />} />
            <Route path="/editSp/:id" element={<PrivateRoute element={EditPro} roles={['1']} />} />
            <Route path="/editCate/:id" element={<PrivateRoute element={EditCate} roles={['1']} />} />
            <Route path="/editAuthor/:id" element={<PrivateRoute element={EditAuthor } roles={['1']} />} />
          </Route>
          <Route path="/sideBar" element={<SideBar />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
