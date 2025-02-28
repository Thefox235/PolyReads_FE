// api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; 
//hàm lấy hình ảnh theo productId
export const getImagesByProductId = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/images/product/${productId}`);
    return response.data.images;
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy hình ảnh:', error);
    throw error;
  }
}
//hàm lấy tất cả user
export const getAllUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data.result;
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy sản phẩm:', error);
    throw error;
  }
};
//hàm lấy hình ảnh sản phẩm
export const getImages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/images/`);
    return response.data.result;
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy hình ảnh:', error);
    throw error;
  }
};
//hàm lấy đơn hàng theo id user
export const getOrderByIdUser = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/order/user/${id}`);
    return response.data;
    console.log(response.data);
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy sản phẩm:', error);
    throw error;
  }
}
//hàm lấy đơn hàng
export const getOrder = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/order`);
    return response.data;
    console.log(response.data);
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy sản phẩm:', error);
    throw error;
  }
};
// Hàm thêm đơn hàng
export const addOrder = async (orderData) => {
  try {
    const response = await axios.post(`${BASE_URL}/order/add`, orderData);
    return response.data;
  } catch (error) {
    console.error('Có lỗi xảy ra khi thêm đơn hàng:', error);
    throw error;
  }
};
//hàm xóa tác giả
export const deleteAuthor = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/author/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Có lỗi xảy ra khi xóa tác giả:', error);
    throw error;
  }
}
// Hàm cập nhật danh mục
export const updateAuthor = async (id, categoryData) => {
  try {
    const response = await axios.put(`${BASE_URL}/author/${id}`, categoryData);
    return response.data.Products;
  } catch (error) {
    console.error('Có lỗi xảy ra khi cập nhật tác giả:', error);
    throw error;
  }
};

// Hàm lấy danh mục theo ID
export const getAuthorById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/author/${id}`);
    return response.data.productNew;
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy tác giả:', error);
    throw error;
  }
};
//hàm xóa sản phẩm 
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/category/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Có lỗi xảy ra khi xóa sản phẩm:', error);
    throw error;
  }
}
// Hàm cập nhật danh mục
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await axios.put(`${BASE_URL}/category/${id}`, categoryData);
    return response.data.Products;
  } catch (error) {
    console.error('Có lỗi xảy ra khi cập nhật danh mục:', error);
    throw error;
  }
};

// Hàm lấy danh mục theo ID
export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/category/${id}`);
    return response.data.productNew;
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy danh mục:', error);
    throw error;
  }
};
//hàm xóa sản phẩm 
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/product/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Có lỗi xảy ra khi xóa sản phẩm:', error);
    throw error;
  }
}
// Hàm cập nhật sản phẩm
export const updateProduct = async (id, productData, images) => {
  try {
    // Đóng gói productData và images vào object requestBody
    const requestBody = { productData, images };
    const response = await axios.put(`${BASE_URL}/product/${id}`, requestBody);
    // Giả sử backend trả về kết quả với key "product"
    return response.data.product;
  } catch (error) {
    console.error('Có lỗi xảy ra khi cập nhật sản phẩm:', error);
    throw error;
  }
};

// Hàm lấy danh sách danh mục
export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/category`);
    return response.data.result;
    console.log(response.data);
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy danh mục:', error);
    throw error;
  }
};

// Hàm lấy danh sách tác giả
export const getAuthors = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/author`);
    return response.data.result;
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy tác giả:', error);
    throw error;
  }
};
// Hàm tạo sản phẩm
export const createProduct = async (productData, images) => {
  try {
    // Đóng gói cả productData và images vào một object gửi đi
    const response = await axios.post(`${BASE_URL}/product/add`, { productData, images });
    // Lưu ý chỉnh sửa key nếu cần, ví dụ: "productNew" thay vì "prodcutNew"
    return response.data.productNew;
  } catch (error) {
    console.error('Có lỗi xảy ra khi thêm sản phẩm:', error);
    throw error;
  }
};

// Hàm tạo brand
export const createAuthor = async (authorData) => {
  try {
    const response = await axios.post(`${BASE_URL}/author/add`, authorData);
    return response.data.result;
  } catch (error) {
    console.error('Có lỗi xảy ra khi thêm tác giả:', error);
    throw error;
  }
};
// Hàm tạo danh mục
export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${BASE_URL}/category/add`, categoryData);
    return response.data.newCategory;
  } catch (error) {
    console.error('Có lỗi xảy ra khi thêm danh mục:', error);
    throw error;
  }
};
//hàm lấy tất cả sản phẩm
export const getAllProduct = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product`);
    return response.data.products;
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy sản phẩm:', error);
    throw error;
  }
};
//hàm đăng nhập
export const Login = async (userData) => {
  try {
    console.log('Sending login data:', userData); // Log dữ liệu gửi đi để kiểm tra
    const response = await axios.post(`${BASE_URL}/users/login`, userData);
    console.log('Login response data:', response.data); // Log dữ liệu nhận được từ API
    return response.data;
  } catch (error) {
    console.error('Có lỗi xảy ra khi đăng nhập:', error);
    throw error;
  }
};
//hàm đăng ký
export const Register = async (userData) => {
  try {
    console.log('Sending user data:', userData); // Log dữ liệu gửi đi để kiểm tra
    const response = await axios.post(`${BASE_URL}/users/register`, userData);
    console.log('Response data:', response.data); // Log dữ liệu nhận được từ API
    return response.data;
  } catch (error) {
    console.error('Có lỗi xảy ra khi đăng ký:', error);
    throw error;
  }
};
//hàm lấy sản phẩm
export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product/`);
    return response.data.proNew;
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy sản phẩm:', error);
    throw error;
  }
};
//hàm lấy sản phẩm
export const getProductHot = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product/hot`);
    return response.data.products;
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy sản phẩm hot:', error);
    throw error;
  }
};
//lấy chi tiết sản phẩm
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/product/${id}`);
    console.log('API response:', response.data.productNew); // Kiểm tra dữ liệu trả về từ API
    return response.data.productNew;
  } catch (error) {
    console.error(`Có lỗi xảy ra khi lấy sản phẩm với ID ${id}:`, error);
    throw error;
  }
};
//lấy sản phẩm tương tự
export const getProductByCate = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/category/similar/${id}`);
    return response.data.Products;
  } catch (error) {
    console.error(`Có lỗi xảy ra khi lấy sản phẩm với ID ${id}:`, error);
    throw error;
  }
};
//hàm lấy danh mục
export const getCategory = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/category`);
    return response.data.result;
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy danh mục:', error);
    throw error;
  }
};
//hàm lấy tác giả
export const getAuthor = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/author`);
    return response.data.result;
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy tác giả:', error);
    throw error;
  }
};
