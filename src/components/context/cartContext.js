import React, { createContext, useState, useContext, useEffect } from "react";
import { createOrder, createOrderDetail } from "../../api/server";
import { Navigate, useNavigate } from "react-router-dom";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

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

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(
      (item) => item._id !== productId && item.product._id !== productId
    );
    console.log("Giỏ hàng sau khi xóa:", updatedCart);
    setCart(updatedCart);
  };

  const increaseQuantity = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId
          ? { ...item, cartQuantity: item.cartQuantity + 1 }
          : item
      )
    );
  };

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

  // Hàm checkout: Tạo Order và Order Detail. Bổ sung addressId cho order.
  const checkout = async (userId, addressId) => {
    try {
      if (!userId || userId.trim() === "") {
        alert("Bạn chưa đăng nhập hoặc userId không hợp lệ!");
        return;
      }
      if (!addressId || addressId.trim() === "") {
        alert("Bạn chưa chọn địa chỉ giao hàng!");
        return;
      }

      // Tính toán tổng số lượng và tổng tiền (chỉ cho các sản phẩm đã tick)
      const checkedItems = cart.filter((item) => selectedItems[item.product._id]);
      const totalQuantity = checkedItems.reduce(
        (sum, item) => sum + item.cartQuantity,
        0
      );
      const totalPrice = checkedItems.reduce(
        (sum, item) => sum + item.price * item.cartQuantity,
        0
      );

      // Tạo danh sách order items từ cart (Mỗi order item chứa các thuộc tính cần thiết)
      const orderItems = checkedItems.map((item) => {
        const prod = item.product;
        return {
          productId: prod._id,
          quantily: item.cartQuantity || 1, // dùng "quantily" theo schema của Order Detail
          price: item.price,
          total: item.price * item.cartQuantity,
        };
      });

      // Payload cho Order chính
      const orderPayload = {
        userId: userId,
        addressId: addressId, // Thêm thông tin địa chỉ giao hàng
        name: "Đơn hàng của khách hàng",
        quantity: totalQuantity,
        img: checkedItems[0]?.img || "",
        price: totalPrice,
        total: totalPrice,
        status: 0,
        payment_status: 0,
      };

      const orderRes = await createOrder(orderPayload);
      const orderId = orderRes.order._id;

      // Thêm orderId vào mỗi order item để tạo Order Detail
      const orderDetailPayload = {
        orderId,
        items: orderItems.map((item) => ({ ...item, orderId })),
      };

      await createOrderDetail(orderDetailPayload);

      clearCart();
      return orderId;
    } catch (error) {
      console.error("Lỗi tạo đơn hàng:", error);
      alert("Có lỗi xảy ra khi tạo đơn hàng, hãy kiểm tra console để biết thêm chi tiết");
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
