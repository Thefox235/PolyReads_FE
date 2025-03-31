import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Detail from './components/detail';
import AuthForm from './components/login';
import ViewPro from './components/admin/viewPro';
import ViewCate from './components/admin/viewCate';
import Logout from './components/logout';
import IndexLayout from './components/indexLayout';
import MainLayout from './components/mainLayout';
import SideBar from './components/admin/sideBar';
import AdminLayout from './components/adminLayout';
import ViewAuthor from './components/admin/viewAuthor';
import Contact from './components/contact';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/register';
import Cart from './components/cart';
import ViewBanner from './components/admin/viewBanner';
import ViewPublisher from './components/admin/viewPublisher';
import Blog from './components/blog';
import ViewDiscount from './components/admin/viewDiscount';
import ForgotPassword from './components/ForgotPassword';
import Account from './components/account';
import Checkout from './components/checkout';
import ViewOrder from './components/admin/viewOrder';
import ViewPost from './components/admin/viewPost';
import BlogDetail from './components/blog_detail';
import PaymentResult from './components/paymetResult';
import EditOrder from './components/admin/editOrder';
import Favourite from './components/favorite';
import Product from './components/product';
// import ViewOrder from './components/admin/viewOrder';

function App() {

  // console.log(user);
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
          <Route path="/paymentResult" element={<PaymentResult />} />
          <Route path="/editOrder" element={<EditOrder />} />
          {/* Các route không cần header (hoặc có layout khác) */}
          <Route element={<MainLayout />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/favorite" element={<Favourite />} />
            <Route path="/product" element={<Product />} />
            <Route path="/account" element={<Account />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<AuthForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/product/:id" element={<Detail />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
          </Route>

          {/* Các route admin có thể đặt ở đây nếu muốn dùng chung layout */}
          <Route element={<AdminLayout />}>
            {/* <Route path="/viewOrder" element={<PrivateRoute element={ViewOrder} roles={['1']} />} /> */}

            <Route path="/viewPro" element={<PrivateRoute element={ViewPro} roles={['1']} />} />
            <Route path="/viewCate" element={<PrivateRoute element={ViewCate} roles={['1']} />} />
            <Route path="/viewAuthor" element={<PrivateRoute element={ViewAuthor} roles={['1']} />} />
            <Route path="/viewBanner" element={<PrivateRoute element={ViewBanner} roles={['1']} />} />
            <Route path="/viewPublisher" element={<PrivateRoute element={ViewPublisher} roles={['1']} />} />
            <Route path="/viewDiscount" element={<PrivateRoute element={ViewDiscount} roles={['1']} />} />
            <Route path="/viewOrder" element={<PrivateRoute element={ViewOrder} roles={['1']} />} />
            <Route path="/viewPost" element={<PrivateRoute element={ViewPost} roles={['1']} />} />

          </Route>
          <Route path="/sideBar" element={<SideBar />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
