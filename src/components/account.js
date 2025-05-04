import React, { useState, useEffect } from "react";
import "../asset/css/account.css";
import { Link } from "react-router-dom";
import {
    updateUser,
    getAllAddresses,
    updatePassword
    // Giả sử hàm createAddress và updateAddress đã được định nghĩa trong API
} from "../api/server";

import Modal from "./model"; // Component Modal
import OrderManagement from "./orderManagement"; // Nếu có
// Các phần xử lý user, sessionStorage,...
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CreateAddress from "./admin/createAddress"; // Component tạo địa chỉ
import EditAddress from "./admin/editAddress"; // Component chỉnh sửa địa chỉ (ví dụ như bạn đã tạo ở phần trước)
import { deleteAddress } from "../api/server"; // Import hàm deleteAddress (giả sử tồn tại)
import VoucherWallet from "./voucherWallet";

const Account = () => {
    const storedUser = sessionStorage.getItem("user");

    if (!storedUser) {
        throw new Error("User not found");
    }
    const users = JSON.parse(storedUser);
    console.log(users);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [passwordError, setPasswordError] = useState(""); // state lưu lỗi đổi m

    // Ví dụ trong handlePasswordSubmit
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordError(""); // Reset lỗi trước khi xử lý

        // Kiểm tra mật khẩu mới không được trùng với mật khẩu hiện tại
        if (currentPassword === newPassword) {
            setPasswordError("Mật khẩu mới phải khác mật khẩu hiện tại!");
            return;
        }

        // Kiểm tra xem mật khẩu mới có khớp với xác nhận mật khẩu mới không
        if (newPassword !== confirmNewPassword) {
            alert("Mật khẩu mới không khớp, vui lòng kiểm tra lại!");
            return;
        }

        try {
            // Gọi API đổi mật khẩu
            const data = await updatePassword(currentPassword, newPassword);
            alert(data.message || "Đổi mật khẩu thành công!");
            // Reset các state liên quan đến mật khẩu
            setCurrentPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
        } catch (error) {
            console.error("Lỗi khi đổi mật khẩu:", error);
            // Nếu có lỗi từ API, hiển thị thông báo lỗi
            const errorMessage =
                error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : "Có lỗi xảy ra khi đổi mật khẩu!";
            setPasswordError(errorMessage);
        }
    };

    const [addresses, setAddresses] = useState([]);
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : {};
    });

    // Lấy danh sách địa chỉ từ API
    useEffect(() => {
        getAllAddresses()
            .then((response) => {
                setAddresses(response);
            })
            .catch((error) => {
                console.error("Error fetching addresses:", error);
            });
    }, []);

    // State menu, chỉnh sửa thông tin ...
    const [activeMenu, setActiveMenu] = useState("profile-info");
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user.name || "");
    const [email, setEmail] = useState(user.email || "");
    const [phone, setPhone] = useState(user.phone || "");

    useEffect(() => {
        setName(user.name || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");
    }, [user]);

    const handleMenuClick = (target) => {
        setActiveMenu(target);
        if (target === "profile-info") {
            setIsEditing(false);
        }
    };

    const handleEditClick = (e) => {
        e.preventDefault();
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { name, email, phone };
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

    // --- Xử lý modal tạo/chỉnh sửa địa chỉ ---
    const [showCreateAddressModal, setShowCreateAddressModal] = useState(false);
    const [showEditAddressModal, setShowEditAddressModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    // Khi nhấn "+ Thêm địa chỉ mới"
    const handleAddAddress = () => {
        setShowCreateAddressModal(true);
    };

    const handleCloseCreateAddressModal = () => {
        setShowCreateAddressModal(false);
    };

    const handleCreateAddressSuccess = (newAddress) => {
        setAddresses((prev) => [...prev, newAddress]);
        setShowCreateAddressModal(false);
    };

    // Khi nhấn "Sửa" trên một địa chỉ trong danh sách
    const handleEditAddress = (address) => {
        setEditingAddress(address);
        setShowEditAddressModal(true);
    };

    const handleCloseEditAddressModal = () => {
        setShowEditAddressModal(false);
        setEditingAddress(null);
    };

    const handleEditAddressSuccess = (updatedAddress) => {
        setAddresses((prev) =>
            prev.map((addr) =>
                addr._id === updatedAddress._id ? updatedAddress : addr
            )
        );
        setShowEditAddressModal(false);
        setEditingAddress(null);
    };

    const handleDeleteAddress = async (addressId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này không?")) {
            try {
                await deleteAddress(addressId);
                setAddresses((prev) =>
                    prev.filter((addr) => addr._id !== addressId)
                );
                alert("Xóa địa chỉ thành công!");
            } catch (err) {
                console.error("Lỗi xóa địa chỉ:", err);
                alert("Có lỗi xảy ra khi xóa địa chỉ!");
            }
        }
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
                            src={user.url_image}
                            alt="Avatar"
                            className="account-avatar"
                            crossOrigin="anonymous"
                            referrerPolicy="no-referrer"
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
                                        required
                                        onInvalid={(e) =>
                                            e.target.setCustomValidity("Vui lòng nhập Họ và tên!")
                                        }
                                        onInput={(e) => e.target.setCustomValidity("")}
                                    />
                                    {!isEditing && (
                                        <a href="#" onClick={handleEditClick}>
                                            Thay đổi
                                        </a>
                                    )}
                                </div>

                                <label className="account-label">Email</label>
                                <div className="account-input">
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={!isEditing}
                                        required
                                        onInvalid={(e) =>
                                            e.target.setCustomValidity("Vui lòng nhập Email hợp lệ!")
                                        }
                                        onInput={(e) => e.target.setCustomValidity("")}
                                    />
                                    {!isEditing && (
                                        <a href="#" onClick={handleEditClick}>
                                            Thay đổi
                                        </a>
                                    )}
                                </div>

                                <label className="account-label">Số điện thoại</label>
                                <div className="account-input">
                                    <input
                                        type="text"
                                        name="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        disabled={!isEditing}
                                        required
                                        pattern="^[0-9]{10,11}$"
                                        onInvalid={(e) =>
                                            e.target.setCustomValidity(
                                                "Vui lòng nhập số điện thoại hợp lệ (10-11 số)!"
                                            )
                                        }
                                        onInput={(e) => e.target.setCustomValidity("")}
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
                    {/* Phần nội dung hiển thị dựa trên activeMenu */}
                    {activeMenu === "address-info" && (
                        <div id="address-info">
                            <div className="address-header">
                                <h2>Số địa chỉ</h2>
                                <span className="add-new-address" onClick={handleAddAddress}>
                                    +Thêm địa chỉ mới
                                </span>
                            </div>
                            {addresses.filter((addr) => addr.userId === user._id).length > 0 ? (
                                addresses.filter((addr) => addr.userId === user._id).map((addr) => (
                                    <div className="address-item" key={addr._id}>
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
                                        <div className="address-actions">
                                            <span
                                                className="address-edit"
                                                onClick={() => handleEditAddress(addr)}
                                            >
                                                Sửa
                                            </span>
                                            <span className="address-divider"> | </span>
                                            <span
                                                className="address-delete"
                                                onClick={() => handleDeleteAddress(addr._id)}
                                            >
                                                <i class="bi bi-trash"></i>
                                            </span>
                                        </div>
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
                            <form className="account-form" onSubmit={handlePasswordSubmit}>
                                <label className="account-label">Mật khẩu hiện tại</label>
                                <input
                                    className="account-input"
                                    type="password"
                                    placeholder="Mật khẩu hiện tại"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                                {/* Hiển thị lỗi nếu mật khẩu hiện tại không đúng hoặc không hợp lệ */}
                                {passwordError && (
                                    <div className="alert alert-danger" style={{ marginTop: "5px" }}>
                                        {passwordError}
                                    </div>
                                )}

                                <label className="account-label">Mật khẩu mới</label>
                                <input
                                    className="account-input"
                                    type="password"
                                    placeholder="Mật khẩu mới"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    minLength={7}
                                    onInvalid={(e) =>
                                        e.target.setCustomValidity("Mật khẩu phải có ít nhất 7 ký tự!")
                                    }
                                    onInput={(e) => e.target.setCustomValidity("")}
                                />

                                <label className="account-label">Nhập lại mật khẩu mới</label>
                                <input
                                    className="account-input"
                                    type="password"
                                    placeholder="Nhập lại mật khẩu mới"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    required
                                />

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
                        <VoucherWallet />
                    )}
                    {/* Modal cho CreateAddress */}
                    {showCreateAddressModal && (
                        <Modal onClose={handleCloseCreateAddressModal}>
                            <CreateAddress
                                userId={user._id}
                                onSubmit={handleCreateAddressSuccess}
                                onClose={handleCloseCreateAddressModal}
                            />
                        </Modal>
                    )}

                    {/* Modal cho EditAddress */}
                    {showEditAddressModal && editingAddress && (
                        <Modal onClose={handleCloseEditAddressModal}>
                            <EditAddress
                                initialAddress={editingAddress}
                                onSubmit={handleEditAddressSuccess}
                                onClose={handleCloseEditAddressModal}
                            />
                        </Modal>
                    )}

                </main>
            </div>
        </>
    );
};

export default Account;
