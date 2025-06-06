import '../asset/css/header.css';
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useCart } from "./context/cartContext";
import SearchForm from "./sreachForm"; // Import phía trên
import CategoryNavDropdown from "./CategoryNavDropdown";
const HeaderNoBan = ({ user, handleLogout }) => {
    const { cart } = useCart();
    const numbercart = cart.reduce((total, item) => total + item.cartQuantity, 0);

    // Quản lý trạng thái mở/đóng menu mobile
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const toggleMobile = () => {
        setIsMobileOpen(prev => !prev);
    };

    const closeMobile = () => {
        setIsMobileOpen(false);
    };

    return (
        <>
            <header>
                <div className="bg-header-noBan">
                    <div className="nav">
                        <div className="sreach w-100">
                            <Link to={'/'} className="logo-sreach">
                                <div className="logo-img">
                                    <img
                                        src="https://media-hosting.imagekit.io//29d6e5ff805d4235/download-10.png?Expires=1837170924&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Vf-I1tp1iEMiPxgzy8ulSny9ROJx5xHvoW9YjGN9AEqDkCbNEzgirf0u7U1j3IK11dYRvkmKwhYU6eQ5r66RUpwd3nyEV8DHEvaSGTMB~IiOSr3Vo-nnl3bAfd9Al8MtnKoMYcYWkLcNXUQqBGmf2rQIkrf6K1jVSaxRxPQz-Gelim0evIIgiEHMSL3-UCksUvxQpO1Zmmv1LUuhTsp8tYlwj9aUuDeF25NGhso7aV2Y8H5H~zM0j0F9H8wN-b95oZobTbSh8JZkiKZm6Zo5o-DxfaDUpizEAffML-A8uqAECU879OOlppSI-cyngwuuqaja7CT9D7DEWDmzHgknZA__"
                                        alt="Logo"
                                    />
                                </div>
                                <h1>Poly Reads</h1>
                            </Link>
                        </div>
                        <div className="justify-content-between align-items-start w-100 custom-menu">
                            <div className="custom-sreach-input position-relative">
                                <div className="sreach-icon">
                                    <i className="bi bi-search" />
                                </div>
                                <SearchForm />

                            </div>
                            <nav className="d-flex align-items-center custom-nav">
                                <li>Tiếng Việt</li>
                                {user ? (
                                    <li className="user-dropdown-menu">
                                        <button className="user-dropdown-btn">
                                            <p className="login-user-name">{user.name}</p>
                                        </button>
                                        <div className="user-dropdown-content">
                                            {user.role === "1" && (
                                                <>
                                                    <a href="/dashboard">
                                                        <span style={{ color: "rgb(160, 15, 15)" }}>&gt;</span> Dashboard
                                                    </a>
                                                    <a href="/viewPro">
                                                        <span style={{ color: "rgb(160, 15, 15)" }}>&gt;</span> Quản lý sản phẩm
                                                    </a>
                                                    <hr className="user-dropdown-divider" />
                                                </>
                                            )}
                                            <a href="/account">
                                                <span style={{ color: "rgb(160, 15, 15)" }}>&gt;</span> Trang người dùng
                                            </a>
                                            <a href="#" onClick={handleLogout}>
                                                ĐĂNG XUẤT
                                            </a>
                                        </div>
                                    </li>
                                ) : (
                                    <>
                                        <li className="border-start p-2">
                                            <Link to="/register" style={{ color: "#212529" }}>
                                                ĐĂNG KÝ
                                            </Link>
                                        </li>
                                        <li className="border-start p-2">
                                            <Link to="/login" style={{ color: "#212529" }}>
                                                ĐĂNG NHẬP
                                            </Link>
                                        </li>
                                    </>
                                )}
                                <li

                                    className="border-start p-2">
                                    <Link
                                        to={'/favorite'}
                                    >
                                        <img
                                            src="https://media-hosting.imagekit.io//c2caec833b6e46b1/heart0.png?Expires=1835161260&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=ECcmFiPc25rbl0Ua6OVmPhaGXj9bv48u7DJ8WIHciHUxydXUxwlSoqdw4AdC~gB53Cd89-aCTQA0T9J-Oo6gyV5UMEUPOf3oarUUO3yWii47mhIDpBoddhkZ94GvkN9s~WkQbiyqJlrJzXNUrgLLOy8lOQvn8uCB3ZL39e6x4s~2b06sSG2~plFdvQC2tBHYyqXst7J1rXRRhtIDybKKQI28vuQVwogOBL6v-SLHeIve30qQ64bMS6KBx7JPTyqkkmf93yfez076uPj489G83T4fXAPCAboBqnT8S1XETXtfQZjL-Y2WsQz3BVM9vZ9HyShpbENHzuZVlT~tdjS6EQ__"
                                            alt="Favourite"
                                            className="favourite"
                                        />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/cart'} className="position-relative bg-transparent">
                                        <img
                                            src="https://media-hosting.imagekit.io//ca0ca63ea9194c3a/fast-cart0.png?Expires=1837170915&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=z1rdhaP6OLMIsgulbU0xrCoUyARXEXolE2F-~bVCU75EEp4X9Up6fu9nB3mB0zCl1W7Qcf-B0S98rG0DdBO~Rv5yvAtvs5hbEf5oetLsV4j2PDf34W4~v9d8bfEUMBK4conlEVK-ucmWb3GSSBpn0VmueCjQJPcePtvcKQ0YwFeZQrMsaQ~eeECw3EVtRWt~VY8qOXo0FnMQIDX8dv1ygkb-bCoVyHjEGPJWwKglVOAnVvnupYjcG~NOiCXo2YfTy~bj0TJcdg1fHqdbECSWYDGsR-wKqyh8hixZ-7MLCz2GSdqkAbUPAQ8AuaCEUz2jyzxlZ17OeML1~2X97Q6rXg__"
                                            className="cart"
                                            alt="Cart"
                                        />
                                        <span
                                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                                            style={{ backgroundColor: "#917FB3", color: "#fff" }}
                                        >
                                            {numbercart} <span className="visually-hidden">unread messages</span>
                                        </span>
                                    </Link>
                                </li>
                            </nav>
                        </div>
                        <div className="responsive-mobile">
                            <div>Tiếng Việt</div>
                            <div>ĐĂNG KÝ | </div>
                            <div>ĐĂNG NHẬP |</div>
                            <div>
                                <img
                                    src="https://s3-alpha-sig.figma.com/img/05e6/e546/190235f6904e7113a9ac5a3736a6c1cd?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iE~9uj46h2zEcViWjT7vuEBeJwpKYwlr8nOn7nlZguSvxy4dUvPCLzKc~XD1fC7xZ0a-Fs1-bIjXWewm2tzh7AGqfSTeOFwLKghQNDO3MrHd1cb4XXPLrFBx~mv1jJlEC-26g5UNZ9yDYkJPbiB87tbYD9KExA15KQUnUlgDmK5UmOPw8MIA67OTak3jg9mzC7zBW3Kg0XWai4LeOWK1Bz7Bm1gCO7pQ5syc9bPd-EhqzOTO10EikmNknPCVw3nJFLC6Kq2ZQShG~QaZbjRPRK8PvyLisv7FnSz3hc6JI2xgmOaFyBMhu81YCCw-KphYieW40MIfJ4s-HQRwDhgQ9w__"
                                    width={25}
                                    alt="Mobile Icon"
                                />
                            </div>
                            <Link to={'/cart'}>
                                <button type="button" className="position-relative bg-transparent">
                                    <img
                                        src="https://media-hosting.imagekit.io//ca0ca63ea9194c3a/fast-cart0.png?Expires=1837170915&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=z1rdhaP6OLMIsgulbU0xrCoUyARXEXolE2F-~bVCU75EEp4X9Up6fu9nB3mB0zCl1W7Qcf-B0S98rG0DdBO~Rv5yvAtvs5hbEf5oetLsV4j2PDf34W4~v9d8bfEUMBK4conlEVK-ucmWb3GSSBpn0VmueCjQJPcePtvcKQ0YwFeZQrMsaQ~eeECw3EVtRWt~VY8qOXo0FnMQIDX8dv1ygkb-bCoVyHjEGPJWwKglVOAnVvnupYjcG~NOiCXo2YfTy~bj0TJcdg1fHqdbECSWYDGsR-wKqyh8hixZ-7MLCz2GSdqkAbUPAQ8AuaCEUz2jyzxlZ17OeML1~2X97Q6rXg__"
                                        width={20}
                                        className="cart"
                                        alt="Cart"
                                    />
                                    <span
                                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                                        style={{ backgroundColor: "#917FB3", color: "#fff" }}
                                    >
                                        {numbercart} <span className="visually-hidden">unread messages</span>
                                    </span>
                                </button>
                            </Link>
                        </div>
                        {/* Menu mobile có sử dụng state để toggle class "open" */}
                        <div className={`moblie ${isMobileOpen ? "open" : ""}`}>
                            <div className="position-relative">
                                <div className="close" onClick={closeMobile}>
                                    X
                                </div>
                                <ul>
                                    <li>Tất cả</li>
                                    <br />
                                    <li>Viễn tưởng</li>
                                    <br />
                                    <li>Nonfictions</li>
                                    <br />
                                    <li>Thơ ca</li>
                                    <br />
                                    <li>Manga, novel</li>
                                    <br />
                                    <li>Art, Photography &amp; Design</li>
                                    <br />
                                    <li>Ngôn ngữ, Sách tham khảo</li>
                                    <br />
                                    <li>Sách giáo khoa</li>
                                    <br />
                                    <li>Sách về Việt Nam</li>
                                    <br />
                                </ul>
                            </div>
                        </div>
                        <div
                            className="custom-menu justify-content-between align-items-center w-100 mt-3 menu"
                            style={{ paddingBottom: 500 }}
                        >
                            <div className="d-flex align-items-center gap-3 menu">
                                <div className="dropdown">
                                    <i className="bi bi-list" />
                                    <button className="border-0 dropdown-btn">Tất cả thể loại</button>
                                    <div className="dropdown-content">
                                        <CategoryNavDropdown />


                                    </div>
                                </div>
                                <div className="d-flex gap-3">
                                    <Link
                                        style={{ color: "#333333" }}
                                        to={'/product'}
                                    >Allbook</Link>
                                    <Link
                                    style={{color:'#333333'}}
                                        to={'/blog'}
                                    >Blog</Link>
                                    <p>FAQ</p>
                                    <Link style={{ color: "#212529" }} to={'/contact'}>
                                        Liên hệ
                                    </Link>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <img
                                    src="https://media-hosting.imagekit.io//ff86fba143394d7c/hang-up0.png?Expires=1835161670&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=2c6lpd1~GKq2zk8MTx0F89fKZElZM6A-B9ClosrfsnDpg~FF9a3GKVYj94wrPrUU0uT19Owoc4CP5DxhKk1aZx9mt~dvKUIcgzKMCTy50yIS7Jdzo5GyEYxGTcnsEy4xlFXfQhZkXqrmIzAmqF79klzj7OrDlIIE5CXNEUb1EsTtK27R9iBg8yY-g5AP-xitvd9yn6SxvPiWSDX5rUI-xtAaDt6v1ZMAEWegfgnjs9UqgjQebJ5qXeGJqSOgx1ykaXhI3dRa1KMyfiIF-2uV1HBBDwer5bqH3um8nogofIn8T38J63cESSORh81ju4iq3Yqu7SDKSR5la3F55kOmRg__"
                                    alt=""
                                    width={25}
                                    style={{ transform: "rotate(90deg)" }}
                                />
                                <span>0123456789</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default HeaderNoBan;