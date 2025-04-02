import React, { createContext, useState, useContext, useEffect } from "react";
import { createOrder, createOrderDetail, getDiscounts, createPayment, updateOrder } from "../../api/server";
import { Navigate, useNavigate } from "react-router-dom";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Giữ nguyên các dữ liệu của giỏ hàng
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // Dữ liệu dùng cho trang giỏ hàng (chọn sản phẩm, v.v)
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    console.log(product);
    setCart((prevCart) => {
      const productId = product._id || product?.product?._id;
      if (!productId) return prevCart;
      const existingProduct = prevCart.find((item) => item._id === productId);

      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === productId
            ? { ...item, cartQuantity: item.cartQuantity + product.quantity }
            : item
        );
      } else {
        return [
          ...prevCart,
          { ...product, _id: productId, cartQuantity: product.quantity },
        ];
      }
    });
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(
      (item) => item._id !== productId && item.product._id !== productId
    );
    console.log("Giỏ hàng sau khi xóa:", updatedCart);
    setCart(updatedCart);
  };

  // Hàm tăng số lượng sản phẩm trong giỏ
  const increaseQuantity = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId
          ? { ...item, cartQuantity: item.cartQuantity + 1 }
          : item
      )
    );
  };

  // Hàm giảm số lượng
  const decreaseQuantity = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === productId
            ? item.cartQuantity > 1
              ? { ...item, cartQuantity: item.cartQuantity - 1 }
              : null
            : item
        )
        .filter((item) => item !== null)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Hàm checkout: tạo Order và Order Detail với toàn bộ sản phẩm trong giỏ hàng, 
  // áp dụng discount bằng cách gọi getDiscounts từ server và so sánh với iD discount của product.
  const checkout = async (userId, addressId, checkedItems, paymentMethod = "vnpay") => {
    try {
      if (!userId || userId.trim() === "") {
        alert("Bạn chưa đăng nhập hoặc userId không hợp lệ!");
        return;
      }
      if (!addressId || addressId.trim() === "") {
        alert("Bạn chưa chọn địa chỉ giao hàng!");
        return;
      }
  
      // Lấy danh sách discount từ server (giả sử getDiscounts đã có)
      const discountList = await getDiscounts();
  
      // Xây dựng danh sách order items, áp dụng giảm giá nếu có
      const orderItems = checkedItems.map((item) => {
        const prod = item.product;
        const discountObj = prod.discount
          ? discountList.find((dis) => dis._id === prod.discount)
          : null;
        const discountPercent = discountObj ? Number(discountObj.value) : 0;
        const currentPrice = Number(prod.price) * ((100 - discountPercent) / 100);
        return {
          productId: prod._id,
          quantily: item.cartQuantity || 1,
          price: currentPrice,
          total: currentPrice * (item.cartQuantity || 1),
        };
      });
  
      // Tính tổng số lượng và tổng tiền
      const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantily, 0);
      const totalPrice = orderItems.reduce((sum, item) => sum + item.total, 0);
  
      // Payload cho Order chính (với trạng thái pending, payment_status pending)
      const orderPayload = {
        userId: userId,
        addressId: addressId,
        name: "Đơn hàng của khách hàng",
        quantity: totalQuantity,
        img: checkedItems[0]?.img || "",
        price: totalPrice,
        total: totalPrice,
        status: 0,            // 0 = pending
        payment_status: 0,    // Đang chờ thanh toán
      };
  
      // Gọi API tạo Order và lấy orderId
      const orderRes = await createOrder(orderPayload);
      const orderId = orderRes.order._id;
  
      // Tạo payload cho Order Detail và gọi API tạo Order Detail
      const orderDetailPayload = {
        orderId,
        items: orderItems.map((item) => ({ ...item, orderId })),
      };
      await createOrderDetail(orderDetailPayload);
  
      // Xử lý phần Payment dựa theo phương thức thanh toán
      if (paymentMethod === "vnpay") {
        const paymentPayload = {
          amount: totalPrice,
          currency: "vnd",  // hoặc "usd"
          status: "pending", // Đang chờ thanh toán từ VNPay
          method: "vnpay",
        };
        const paymentRes = await createPayment(paymentPayload);
        const paymentId = paymentRes.payment._id;
        // Cập nhật PaymentId cho Order
        await updateOrder(orderId, { paymentId });
        // Lưu paymentId vào sessionStorage (nếu cần)
        sessionStorage.setItem("paymentId", paymentId);
      } else if (paymentMethod === "cash") {
        // Nếu COD, có thể tạo Payment record với method "cash" và status "pending" hoặc "success"
        const paymentPayload = {
          amount: totalPrice,
          currency: "vnd",
          status: "failed", // Bạn có thể điều chỉnh status tùy theo nghiệp vụ COD
          method: "cash",
        };
        const paymentRes = await createPayment(paymentPayload);
        const paymentId = paymentRes.payment._id;
        await updateOrder(orderId, { paymentId, payment_method: "cash" });
      }
      // Lưu orderId vào sessionStorage cho các bước thanh toán online sau nếu cần
      sessionStorage.setItem("orderId", orderId);
  
      // Cập nhật lại giỏ hàng: loại bỏ những mặt hàng đã được thanh toán
      setCart((prevCart) =>
        prevCart.filter(
          (item) =>
            !checkedItems.some(
              (checkedItem) => checkedItem._id === item._id
            )
        )
      );
  
      // Trả về orderId
      return orderId;
    } catch (error) {
      console.error("Lỗi tạo đơn hàng:", error);
      alert("Có lỗi xảy ra khi tạo đơn hàng. Vui lòng kiểm tra console để biết thêm chi tiết");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        checkout,
        selectedItems,
        setSelectedItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;