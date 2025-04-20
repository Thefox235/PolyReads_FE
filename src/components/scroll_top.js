import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang
  }, [pathname]); // Theo dõi sự thay đổi của đường dẫn

  return null;
};

export default ScrollToTop;