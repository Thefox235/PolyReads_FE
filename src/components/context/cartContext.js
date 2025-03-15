import React, { createContext, useState, useContext, useEffect } from "react";
import { addOrder } from "../../api/server";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    console.log(product);
    setCart((prevCart) => {
      // Lấy ID của sản phẩm, đảm bảo không bị lỗi truy cập
      const productId = product._id || product?.product?._id;
      if (!productId) return prevCart; // Nếu không có ID, không làm gì cả

      // Kiểm tra sản phẩm đã có trong giỏ chưa
      const existingProduct = prevCart.find((item) => item._id === productId);

      if (existingProduct) {
        // Nếu có, tăng số lượng
        return prevCart.map((item) =>
          item._id === productId
            ? { ...item, cartQuantity: item.cartQuantity + product.quantity }
            : item
        );
      } else {
        // Nếu chưa có, thêm mới
        return [...prevCart, { ...product, _id: productId, cartQuantity: 1 }];
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
    setCart(
      cart.map((item) =>
        item._id === productId
          ? { ...item, cartQuantity: item.cartQuantity + 1 }
          : item
      )
    );
  };
  const decreaseQuantity = (productId) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item._id === productId
              ? item.cartQuantity > 1
                ? { ...item, cartQuantity: item.cartQuantity - 1 } // Giảm số lượng nếu >1
                : null // Trả về `null` nếu số lượng là 1 (để xóa)
              : item
          )
          .filter((item) => item !== null) // Loại bỏ `null` khỏi giỏ hàng
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkout = async (userId) => {
    try {
      const orders = cart.map((item) => ({
        name: item.name,
        quantity: item.cartQuantity,
        img: item.img,
        price: item.price,
        total: item.price * item.cartQuantity,
        userId: userId,
        status: 0, // Trạng thái đơn hàng ban đầu
      }));
      await Promise.all(orders.map((order) => addOrder(order)));
      clearCart();
      console.log("Đơn hàng đã được thêm thành công");
    } catch (error) {
      console.error("Có lỗi xảy ra khi thanh toán:", error);
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
