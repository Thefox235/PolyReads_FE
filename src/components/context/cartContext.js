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
  const checkout = async (
    userId,
    addressId,
    checkedItems,
    shippingFee = 0,
    paymentMethod = "vnpay",
    appliedCoupon = null // sử dụng appliedCoupon đã chọn
  ) => {
    try {
      if (!userId || userId.trim() === "") {
        alert("Bạn chưa đăng nhập hoặc userId không hợp lệ!");
        return;
      }
      if (!addressId || addressId.trim() === "") {
        alert("Bạn chưa chọn địa chỉ giao hàng!");
        return;
      }
  
      // Lấy danh sách discount từ server (giả sử hàm getDiscounts đã có)
      const discountList = await getDiscounts();
  
      // Tạo danh sách order items dựa trên sản phẩm đã chọn
      const orderItems = checkedItems.map((item) => {
        const prod = item.product;
        const discountObj = prod.discount
          ? discountList.find((dis) => dis._id === prod.discount)
          : null;
        const discountPercent = discountObj ? Number(discountObj.value) : 0;
        const currentPrice = Number(prod.price) * ((100 - discountPercent) / 100);
        return {
          productId: prod._id,
          quantity: item.cartQuantity || 1,
          price: currentPrice,
          total: currentPrice * (item.cartQuantity || 1),
        };
      });
  
      const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = orderItems.reduce((sum, item) => sum + item.total, 0);
  
      // Tính giảm giá riêng cho đơn hàng và phí vận chuyển dựa trên appliedCoupon
      let orderDiscount = 0;
      let shippingDiscount = 0;
      if (appliedCoupon) {
        if (appliedCoupon.couponType === "order") {
          if (appliedCoupon.discountValue) {
            orderDiscount = Number(appliedCoupon.discountValue);
          } else if (appliedCoupon.discountPercentage) {
            orderDiscount = totalPrice * (Number(appliedCoupon.discountPercentage) / 100);
          }
        } else if (appliedCoupon.couponType === "shipping") {
          if (appliedCoupon.discountValue) {
            shippingDiscount = Number(appliedCoupon.discountValue);
          } else if (appliedCoupon.discountPercentage) {
            shippingDiscount = shippingFee * (Number(appliedCoupon.discountPercentage) / 100);
          }
        }
      }
  
      // Tính finalTotal = (tổng tiền sản phẩm sau giảm) + (phí vận chuyển sau giảm)
      const finalTotal = (totalPrice - orderDiscount) + (shippingFee - shippingDiscount);
  
      // Xây dựng payload đơn hàng (bao gồm thông tin coupon nếu có)
      const orderPayload = {
        userId,
        addressId,
        name: "Đơn hàng của khách hàng",
        quantity: totalQuantity,
        img: checkedItems[0]?.img || "",
        price: finalTotal,
        total: finalTotal,
        status: 0,
        payment_status: "pending",
        coupon: appliedCoupon
          ? {
              couponId: appliedCoupon.couponId, // hoặc dùng _id tùy vào cấu trúc dữ liệu của bạn
              code: appliedCoupon.code,
              couponType: appliedCoupon.couponType,
              discountPercentage: appliedCoupon.discountPercentage,
              discountValue: appliedCoupon.discountValue,
            }
          : undefined,
      };
  
      console.log("Order payload:", orderPayload);
  
      // Tạo Order
      const orderRes = await createOrder(orderPayload);
      const orderId = orderRes.order._id;
  
      // Tạo Order Detail
      const orderDetailPayload = {
        orderId,
        items: orderItems.map((item) => ({ ...item, orderId })),
      };
      await createOrderDetail(orderDetailPayload);
  
      // Xử lý thanh toán
      if (paymentMethod === "vnpay" || paymentMethod === "zalopay") {
        const paymentPayload = {
          amount: finalTotal,
          currency: "vnd",
          status: "pending",
          method: paymentMethod,
        };
        const paymentRes = await createPayment(paymentPayload);
        const paymentId = paymentRes.payment._id;
        // Update Order nếu cần
        await updateOrder(orderId, {
          paymentId,
          payment_method: paymentMethod,
        });
        sessionStorage.setItem("paymentId", paymentId);
      } else if (paymentMethod === "cash") {
        const paymentPayload = {
          amount: finalTotal,
          currency: "vnd",
          status: "pending",
          method: "cash",
        };
        const paymentRes = await createPayment(paymentPayload);
        const paymentId = paymentRes.payment._id;
        await updateOrder(orderId, {
          paymentId,
          payment_method: "cash",
          payment_status: "success",
        });
      }
  
      sessionStorage.setItem("orderId", orderId);
  
      // Cập nhật giỏ hàng: loại bỏ các mặt hàng đã thanh toán
      setCart((prevCart) =>
        prevCart.filter(
          (item) => !checkedItems.some((checkedItem) => checkedItem._id === item._id)
        )
      );
  
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