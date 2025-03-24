export const convertTime = (time) => {
    const dateObj = new Date(time);
  
    // Lấy ngày, tháng, năm
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Tháng trong JS bắt đầu từ 0
    const year = dateObj.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate
  };
  