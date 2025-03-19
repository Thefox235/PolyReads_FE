// api.js
import axios from 'axios';
const BASE_URL = 'http://localhost:3000'; 
const ADDR_URL = 'https://vapi.vnappmob.com/api/province';

//api lấy địa chỉ
export const getProvinces = async () => {
  const response = await axios.get(ADDR_URL);
  return response.data.results; // Trả về danh sách tỉnh/thành phố
};

// Lấy danh sách quận/huyện theo province_code
export const getDistrictsByProvince = async (provinceCode) => {
  const response = await axios.get(`${ADDR_URL}/district/${provinceCode}`);
  return response.data.results; // Trả về danh sách quận/huyện
};

// Lấy danh sách xã/phường theo district_code
export const getWardsByDistrict = async (districtCode) => {
  const response = await axios.get(`${ADDR_URL}/ward/${districtCode}`);
  return response.data.results; // Trả về danh sách xã/phường
};
// Hàm tạo địa chỉ mới
export const createAddress = async (addressData) => {
  const response = await axios.post(`${BASE_URL}/address`, addressData);
  console.log(addressData);
  return response.data;
};

// Hàm cập nhật địa chỉ theo ID (nếu cần)
export const updateAddress = async (id, addressData) => {
  const response = await axios.put(`${BASE_URL}/address/${id}`, addressData);
  return response.data;
};

// Hàm lấy tất cả các địa chỉ (có thể áp dụng bộ lọc theo userId nếu cần)
export const getAllAddresses = async () => {
  const response = await axios.get(`${BASE_URL}/address`);
  return response.data.addresses;
};

// Hàm lấy địa chỉ theo ID
export const getAddressById = async (id) => {
  const response = await axios.get(`${BASE_URL}/address/${id}`);
  return response.data;
};
// update user
export const updateUser = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/users/${id}`, data);
  console.log(response.data);
  return response.data.user;
};
// tạo order
export const createOrder = async (orderData) => {
  const response = await axios.post(`${BASE_URL}/order`, orderData);
  return response.data; // ví dụ: { order: { _id: '...', ... } }
};

export const createOrderDetail = async (orderDetailData) => {
  const response = await axios.post(`${BASE_URL}/order-detail`, orderDetailData);

  return response.data; // ví dụ: { orderDetail: { ... } }
};
// Export a constant function called getUserOrder which is an asynchronous function
export const getUserOrder = async (userId) => {
  const response = await axios.get(`${BASE_URL}/order/user/${userId}`);
  console.log(response.data.orders);
  return response.data;
};


// Export a function called deleteOrder that takes in an id as a parameter
export const deleteOrder = async (id) => {
  // Make a delete request to the API using the id parameter
  const response = await axios.delete(`${BASE_URL}/order/${id}`);
  // Return the data from the response
  return response.data;
};
//gửi otp quên mk
export const sendForgotPasswordOTP = async (email) => {
  const response = await axios.post(`${BASE_URL}/users/forgotPass/send-otp`, { email });
  return response.data;
};
//sát thực otp quên mk
export const verifyForgotPasswordOTP = async (email, otp) => {
  const response = await axios.post(`${BASE_URL}/users/forgotPass/verify-otp`, { email, otp });
  return response.data;
};
//reset mk
export const resetForgotPassword = async (email, newPassword) => {
  const response = await axios.post(`${BASE_URL}/users/forgotPass/reset`, { email, newPassword });
  return response.data;
};
//lấy discount theo id 
export const getDiscountById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/discount/${id}`);
    // console.log(response.data.discounts);
    // Giả sử API trả về: { discounts: [...] }
    return response.data.discount;

  } catch (error) {
    console.error('Lỗi khi lấy discount:', error);
    throw error;
  }
};

// Lấy danh sách discount
export const getDiscounts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/discount/`);
    // console.log(response.data.discounts);
    // Giả sử API trả về: { discounts: [...] }
    return response.data.discounts;

  } catch (error) {
    console.error('Lỗi khi lấy danh sách discount:', error);
    throw error;
  }
};

// Tạo mới discount
export const createDiscount = async (discountData) => {
  try {
    const response = await axios.post(`${BASE_URL}/discount`, discountData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // Giả sử API trả về: { discount: {...} }
    return response.data.discount;
  } catch (error) {
    console.error('Lỗi khi tạo discount:', error);
    throw error;
  }
};

// Cập nhật discount
export const updateDiscount = async (id, discountData) => {
  try {
    const response = await axios.put(`${BASE_URL}/discount/${id}`, discountData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // Giả sử API trả về: { discount: {...} }
    return response.data.discount;
  } catch (error) {
    console.error('Lỗi khi cập nhật discount:', error);
    throw error;
  }
};

// Xóa discount
export const deleteDiscount = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/discount/${id}`);
    // API có thể trả về thông báo thành công
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa discount:', error);
    throw error;
  }
};

export const uploadImageToCloudinary = async (file) => {
  // Tạo FormData để gửi file
  const formData = new FormData();
  formData.append('file', file);
  // Thêm upload preset mà bạn đã tạo trên Cloudinary
  formData.append('upload_preset', 'PolyReads'); // Thay YOUR_UPLOAD_PRESET bằng preset của bạn

  try {
    // Gọi API upload Cloudinary. Thay YOUR_CLOUD_NAME bằng Cloud Name của bạn.
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dxwda4hfn/upload`,
      formData
    );
    // Trả về URL an toàn (secure_url) của ảnh sau khi upload
    return response.data.secure_url;
  } catch (error) {
    console.error('Lỗi upload ảnh lên Cloudinary:', error);
    throw error;
  }
};

// Hàm upload ảnh lên Imgur
export const uploadImageToImgur = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  try {
    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        // Hãy nhớ rằng với FormData, chúng ta không nên thiết lập "Content-Type" thủ công
        Authorization: 'Client-ID 6c11fde85d8f55e'
      },
      body: formData
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.data.error || "Upload failed");
    }
    const data = await response.json();
    return data.data.link;
  } catch (error) {
    console.error('Lỗi upload ảnh lên Imgur:', error);
    throw error;
  }
};


// Hàm tạo nxb
export const createPublisher = async (publisherData) => {
  try {
    const response = await axios.post(`${BASE_URL}/publisher/add`, publisherData);
    return response.data.newNXB;
  } catch (error) {
    console.error('Có lỗi xảy ra khi thêm nxb:', error);
    throw error;
  }
};
// Hàm lấy danh sách nxb
export const getPublishers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/publisher`);
    return response.data.result;
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy nxb:', error);
    throw error;
  }
};
// Hàm cập nhật nxb
export const updatePublisher = async (id, publisherData) => {
  try {
    const response = await axios.put(`${BASE_URL}/publisher/${id}`, publisherData);
    // Trả về trực tiếp đối tượng publisher cập nhật
    return response.data.NXB.data;
  } catch (error) {
    console.error('Có lỗi xảy ra khi cập nhật NXB:', error);
    throw error;
  }
};


// Hàm lấy danh mục theo ID
export const getPublisherById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/publisher/${id}`);
    return response.data.NXB;
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy NXB:', error);
    throw error;
  }
};
//hàm xóa nxb
export const deletePublisher = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/publisher/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Có lỗi xảy ra khi xóa nxb:', error);
    throw error;
  }
}
//hàm lấy banner
export const getBanners = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/banner`);
    return response.data.banners;
  } catch (error) {
    console.error("Error getting banners:", error);
    throw error;
  }
};

// Tạo Banner mới
export const createBanner = async (bannerData) => {
  try {
    const response = await axios.post(`${BASE_URL}/banner`, bannerData);
    return response.data;
  } catch (error) {
    console.error("Error creating banner:", error);
    throw error;
  }
};

// Cập nhật Banner
export const updateBanner = async (id, bannerData) => {
  try {
    const response = await axios.put(`${BASE_URL}/banner/${id}`, bannerData);
    return response.data.NewBanner;
  } catch (error) {
    console.error("Error updating banner:", error);
    throw error;
  }
};

// Xóa Banner
export const deleteBanner = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/banner/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting banner:", error);
    throw error;
  }
};
//hàm gửi lại otp
// api/server.js
export const resendOTP = async (data) => {
  const response = await axios.post(`${BASE_URL}/users/resend-otp`, data);
  console.log(data);
  return response.data;
};

//hàm sát thực otp
export const verifyOTP = async (data) => {
  // data gồm { userId, otp }
  const response = await axios.post(`${BASE_URL}/users/verify-otp`, data);
  return response.data;
};
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
// Hàm cập nhật tác giả
export const updateAuthor = async (id, categoryData) => {
  try {
    const response = await axios.put(`${BASE_URL}/author/${id}`, categoryData);
    console.log(response.data.Products);
    return response.data.Products.data;
  } catch (error) {
    console.error('Có lỗi xảy ra khi cập nhật tác giả:', error);
    throw error;
  }
};

// Hàm lấy tác giả theo ID
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
    console.log(response.data.Products);
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
    console.log(response.data.productNew);
    // Trả về đối tượng sản phẩm (chỉ chứa thông tin cơ bản)
    // Bạn có thể không có dữ liệu ảnh trong response
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
    // console.log(response.data.newAuthor);
    return response.data.newAuthor;
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
    // Lọc bỏ các trường undefined
    const payload = Object.keys(userData).reduce((acc, key) => {
      if (userData[key] !== undefined) {
        acc[key] = userData[key];
      }
      return acc;
    }, {});
    
    console.log('Sending user data:', payload);
    const response = await axios.post(`${BASE_URL}/users/register`, payload);
    console.log('Response data:', response.data);
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
