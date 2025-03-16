import React, { createContext, useState, useContext, useEffect } from 'react';
import { addOrder } from '../../api/server';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item._id === product._id);
      if (existingProduct) {
        return prevCart.map(item =>
          item._id === product._id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, cartQuantity: 1 }];
      }
    });
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCart(cart.map(item =>
      item._id === productId ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
    ));
  };

  const decreaseQuantity = (productId) => {
    setCart(cart.map(item =>
      item._id === productId && item.cartQuantity > 1 ? { ...item, cartQuantity: item.cartQuantity - 1 } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkout = async (userId) => {
    try {
      const orders = cart.map(item => ({
        name: item.name,
        quantity: item.cartQuantity,
        img: item.img,
        price: item.price,
        total: item.price * item.cartQuantity,
        userId: userId,
        status: 0 // Trạng thái đơn hàng ban đầu
      }));
      await Promise.all(orders.map(order => addOrder(order)));
      clearCart();
      console.log('Đơn hàng đã được thêm thành công');
    } catch (error) {
      console.error('Có lỗi xảy ra khi thanh toán:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, checkout }}>
      {children}
    </CartContext.Provider>
  );
};
