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

  // Một số state và hàm khác vẫn giữ nguyên (selectedItems dùng cho Cart – ở trang giỏ hàng)
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

  // Hàm checkout: Tạo Order và Order Detail.
  // Ở phiên bản mới này, chúng ta sẽ dùng toàn bộ cart (không dựa vào selectedItems)
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

      // Dùng toàn bộ cart mà không lọc theo selectedItems
      const checkedItems = cart;

      // Tính tổng số lượng và tổng tiền từ toàn bộ các sản phẩm trong cart
      const totalQuantity = checkedItems.reduce(
        (sum, item) => sum + item.cartQuantity,
        0
      );
      const totalPrice = checkedItems.reduce(
        (sum, item) => sum + item.price * item.cartQuantity,
        0
      );

      // Xây dựng danh sách order items theo yêu cầu của Order Detail:
      // Lưu ý: theo thông báo lỗi, schema Order Detail yêu cầu trường "quantily" (không phải "quantity") và "price".
      const orderItems = checkedItems.map((item) => {
        const prod = item.product;
        return {
          productId: prod._id,
          quantily: item.cartQuantity || 1, // dùng "quantily" theo schema
          price: item.price,                // đảm bảo trường price có giá trị
          total: item.price * item.cartQuantity,
        };
      });

      // Payload cho Order chính
      const orderPayload = {
        userId: userId,
        addressId: addressId,
        name: "Đơn hàng của khách hàng",
        quantity: totalQuantity, // Nếu schema Order cũng dùng "quantity", giữ nguyên
        img: checkedItems[0]?.img || "",
        price: totalPrice,
        total: totalPrice,
        status: 0,
        payment_status: 0,
      };

      // Tạo Order và lấy Order ID trả về
      const orderRes = await createOrder(orderPayload);
      const orderId = orderRes.order._id;

      // Tạo payload cho Order Detail (đính kèm orderId cho từng item)
      const orderDetailPayload = {
        orderId,
        items: orderItems.map((item) => ({ ...item, orderId })),
      };
      console.log(orderDetailPayload);
      await createOrderDetail(orderDetailPayload);
      clearCart(); // Xóa giỏ hàng sau khi đặt đơn
      return orderId;
    } catch (error) {
      console.error("Lỗi tạo đơn hàng:", error);
      alert(
        "Có lỗi xảy ra khi tạo đơn hàng. Vui lòng kiểm tra console để biết thêm chi tiết"
      );
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