import React, { useState, useEffect } from "react";
import "../asset/css/account.css";
import { Link } from "react-router-dom";
import { updateUser, getAllAddresses } from "../api/server"; // Hàm API update user đã được định nghĩa
import CreateAddress from "./admin/createAddress"; // Import CreateAddress component
import Modal from "./model"; // Import Modal component
import OrderManagement from "./orderManagement"; // Import component OrderManagement
const Account = () => {
    const [addresses, setAddresses] = useState([]);
    // Khởi tạo state user từ sessionStorage

    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : {};
    });

    useEffect(() => {

        // Lấy danh sách địa chỉ từ API
        getAllAddresses()
            .then((response) => {
                setAddresses(response);
            })
            .catch((error) => {
                console.error("Error fetching addresses:", error);
            });
    }, []);
    // console.log(addresses);

    // State active menu (nếu có nhiều phần trong Account)
    const [activeMenu, setActiveMenu] = useState("profile-info");
    // State chỉnh sửa cho phần profile-info
    const [isEditing, setIsEditing] = useState(false);

    // Các state cho các input cập nhật
    const [name, setName] = useState(user.name || "");
    const [email, setEmail] = useState(user.email || "");
    const [phone, setPhone] = useState(user.phone || "");

    // Khi user thay đổi, cập nhật lại các giá trị cho form
    useEffect(() => {
        setName(user.name || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");
    }, [user]);

    // Handler cho các mục menu (nếu cần)
    const handleMenuClick = (target) => {
        setActiveMenu(target);
        // Nếu chuyển sang "profile-info", có thể reset chế độ edit
        if (target === "profile-info") {
            setIsEditing(false);
        }
    };

    // Handler khi nhấn "Thay đổi": bật chế độ edit
    const handleEditClick = (e) => {
        e.preventDefault();
        setIsEditing(true);
    };

    // Handler submit form cập nhật thông tin
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name,
            email,
            phone,
        };

        try {
            const updatedUser = await updateUser(user._id, payload);
            setUser(updatedUser);
            sessionStorage.setItem("user", JSON.stringify(updatedUser));
            setIsEditing(false);
            alert("Cập nhật thông tin thành công!");
        } catch (error) {
            console.error("Lỗi cập nhật user:", error);
            alert("Có lỗi xảy ra khi cập nhật thông tin!");
        }
    };

    const [showCreateAddressModal, setShowCreateAddressModal] = useState(false);

    const handleAddAddress = () => {
        setShowCreateAddressModal(true);
    };

    const handleCloseModal = () => {
        setShowCreateAddressModal(false);
    };

    const handleCreateAddressSuccess = (newAddress) => {
        setAddresses((prev) => [...prev, newAddress]);
        setShowCreateAddressModal(false);
    };

    return (
        <>
            <section className="banner">
                <div className="banner-overlay">
                    <h1>Người dùng</h1>
                    <p style={{ fontSize: 20, fontWeight: 400 }}>
                        <Link to="/">Trang chủ</Link> &gt; Người dùng
                    </p>
                </div>
            </section>

            <div className="account-container">
                <aside className="account-sidebar">
                    <div className="account-profile">
                        <img
                            src={user.url_image || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
                            alt="Avatar"
                            className="account-avatar"
                        />
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                    </div>
                    <nav>
                        <ul>
                            <li
                                className={`menu-item ${activeMenu === "profile-info" ? "active" : ""}`}
                                onClick={() => handleMenuClick("profile-info")}
                                data-target="profile-info"
                            >
                                Thông tin tài khoản
                            </li>
                            <li
                                className={`menu-item ${activeMenu === "address-info" ? "active" : ""}`}
                                onClick={() => handleMenuClick("address-info")}
                                data-target="address-info"
                            >
                                Số địa chỉ
                            </li>
                            <li
                                className={`menu-item ${activeMenu === "password-change" ? "active" : ""}`}
                                onClick={() => handleMenuClick("password-change")}
                                data-target="password-change"
                            >
                                Đổi mật khẩu
                            </li>
                            <li
                                className={`menu-item ${activeMenu === "order-management" ? "active" : ""}`}
                                onClick={() => handleMenuClick("order-management")}
                                data-target="order-management"
                            >
                                Quản lý đơn hàng
                            </li>
                            <li
                                className={`menu-item ${activeMenu === "voucher-wallet" ? "active" : ""}`}
                                onClick={() => handleMenuClick("voucher-wallet")}
                                data-target="voucher-wallet"
                            >
                                Ví voucher
                            </li>
                        </ul>
                    </nav>
                </aside>

                <main className="content">
                    {/* Phần nội dung hiển thị dựa trên activeMenu */}
                    {activeMenu === "profile-info" && (
                        <div id="profile-info">
                            <h2>Hồ sơ cá nhân</h2>
                            <form className="account-form" onSubmit={handleSubmit}>
                                <label className="account-label">Họ và tên</label>
                                <div className="account-input">
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={!isEditing}
                                    />
                                    {!isEditing && (
                                        <a href="#" onClick={handleEditClick}>
                                            Thay đổi
                                        </a>
                                    )}
                                </div>
                                <label>Email</label>
                                <div className="account-input">
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={!isEditing}
                                    />
                                    {!isEditing && (
                                        <a href="#" onClick={handleEditClick}>
                                            Thay đổi
                                        </a>
                                    )}
                                </div>
                                <label>Số điện thoại</label>
                                <div className="account-input">
                                    <input
                                        type="text"
                                        name="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        disabled={!isEditing}
                                    />
                                    {!isEditing && (
                                        <a href="#" onClick={handleEditClick}>
                                            Thay đổi
                                        </a>
                                    )}
                                </div>
                                {isEditing && (
                                    <>
                                        <br />
                                        <button className="account-button" type="submit">
                                            Lưu thay đổi
                                        </button>
                                    </>
                                )}
                            </form>
                        </div>
                    )}

                    {activeMenu === "address-info" && (
                        <div id="address-info">
                            <div className="address-header">
                                <h2>Số địa chỉ</h2>
                                <span className="add-new-address" onClick={handleAddAddress}>
                                    +Thêm địa chỉ mới
                                </span>
                            </div>

                            {addresses.filter(addr => addr.userId === user._id).length > 0 ? (
                                addresses.filter(addr => addr.userId === user._id).map((addr) => (
                                    <div className="address-item" key={addr.id}>
                                        <div>
                                            <strong>{addr.name}</strong> | <strong>{addr.phone}</strong>
                                            {addr.default && (
                                                <span className="address-default">
                                                    Địa chỉ thanh toán mặc định
                                                </span>
                                            )}
                                            <p>{addr.address_line}</p>
                                            <p>
                                                {addr.ward}, {addr.district}, {addr.province}
                                            </p>
                                        </div>
                                        <span className="address-edit">Sửa</span>
                                    </div>
                                ))
                            ) : (
                                <p>Chưa có địa chỉ nào.</p>
                            )}

                        </div>
                    )}

                    {activeMenu === "password-change" && (
                        <div id="password-change">
                            <h2>Đổi mật khẩu</h2>
                            <form>
                                <label className="account-label">Mật khẩu hiện tại</label>
                                <input className="account-input" type="password" placeholder="Mật khẩu hiện tại" required />
                                <label className="account-label">Mật khẩu mới</label>
                                <input className="account-input" type="password" placeholder="Mật khẩu mới" required />
                                <label className="account-label">Nhập lại mật khẩu mới</label>
                                <input className="account-input" type="password" placeholder="Nhập lại mật khẩu mới" required />
                                <br />
                                <button className="account-button" type="submit">
                                    Lưu thay đổi
                                </button>
                            </form>
                        </div>
                    )}
                    {activeMenu === "order-management" && (
                        <OrderManagement userId={user._id} />
                    )}

                    {activeMenu === "voucher-wallet" && (
                        <div id="voucher-wallet">
                            <h2 className="voucher-title">Ví Voucher</h2>
                            <div className="voucher-container">
                                <div className="voucher-card">
                                    <div className="voucher-icon">
                                        <i className="fa-solid fa-percent" />
                                    </div>
                                    <div className="voucher-content">
                                        <div className="voucher-details">
                                            <h3>Mã Giảm Giá Phí Vận Chuyển 10k</h3>
                                            <p>Áp dụng cho đơn hàng từ 200k khi mua Manga,Comic,Light Novel</p>
                                            <span className="voucher-expiry">
                                                HSD:<span className="date">28/02/2025</span>
                                            </span>
                                            <div className="voucher-code">
                                                <i className="fa-solid fa-ticket" />
                                                FSMGS10225
                                            </div>
                                        </div>
                                        <div className="voucher-action">
                                            <a href="#" className="voucher-link">
                                                Chi tiết
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                {/* ... Một vài voucher khác */}
                            </div>
                        </div>
                    )}
                    {showCreateAddressModal && (
                        <Modal onClose={handleCloseModal}>
                            <CreateAddress
                                userId={user._id} // đảm bảo đây là một chuỗi hợp lệ (24 ký tự hex) từ backend
                                onSubmit={handleCreateAddressSuccess}
                                onClose={handleCloseModal}
                            />
                        </Modal>
                    )}

                </main>
            </div>
        </>
    );
};

export default Account;
