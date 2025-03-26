import React, { useState, useEffect } from 'react';
import { getBanners } from '../api/server'; // API lấy banner
import '../asset/css/header.css';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from "./context/cartContext";
const Header = ({ user, handleLogout }) => {
    const [activeBanners, setActiveBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { cart } = useCart();
    const numbercart = cart.reduce((total, item) => total + item.cartQuantity, 0);
    const a = useLocation();
    // Fetch banner: Lọc ra những banner có trạng thái active và có position là 'header-banner'
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const banners = await getBanners();
                const active = banners.filter(
                    banner => banner.is_active === true && banner.position === 'header-banner'
                );
                setActiveBanners(active);
            } catch (error) {
                console.error("Lỗi khi lấy banner:", error);

            }
        };
        fetchBanners();
    }, []);

    // Thay đổi background của .bg-header theo chu kỳ nếu có banner active
    useEffect(() => {
        const bgHeader = document.querySelector(".bg-header");
        const changeBackground = () => {
            if (bgHeader && activeBanners.length > 0) {
                bgHeader.style.backgroundImage = `url(${activeBanners[currentIndex].image_url})`;
                setCurrentIndex(prev => (prev + 1) % activeBanners.length);
            }
        };

        let intervalId;
        if (activeBanners.length > 0) {
            intervalId = setInterval(changeBackground, 3000);
        }
        return () => { if (intervalId) clearInterval(intervalId); };
    }, [activeBanners, currentIndex, isLoading]);

    // Functions to handle open and close elements
    // const closeElement = () => {
    //     const element = document.querySelector(".moblie");
    //     if (element) element.classList.remove("open");
    // };

    // const openElement = () => {
    //     const element = document.querySelector(".moblie");
    //     if (element) element.classList.toggle("open");
    // };
    return (
        <>
            <header>
                <div className="bg-header">
                    <div className="nav">
                        <div className="sreach w-100">
                            <div className="logo-sreach">
                                <Link to={'/home'} className="logo-img">
                                    <img
                                        src="https://media-hosting.imagekit.io//29d6e5ff805d4235/download-10.png?Expires=1837170924&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Vf-I1tp1iEMiPxgzy8ulSny9ROJx5xHvoW9YjGN9AEqDkCbNEzgirf0u7U1j3IK11dYRvkmKwhYU6eQ5r66RUpwd3nyEV8DHEvaSGTMB~IiOSr3Vo-nnl3bAfd9Al8MtnKoMYcYWkLcNXUQqBGmf2rQIkrf6K1jVSaxRxPQz-Gelim0evIIgiEHMSL3-UCksUvxQpO1Zmmv1LUuhTsp8tYlwj9aUuDeF25NGhso7aV2Y8H5H~zM0j0F9H8wN-b95oZobTbSh8JZkiKZm6Zo5o-DxfaDUpizEAffML-A8uqAECU879OOlppSI-cyngwuuqaja7CT9D7DEWDmzHgknZA__"
                                        alt=""
                                    />
                                </Link>
                                <h1>Poly Reads</h1>
                            </div>
                        </div>
                        <div className=" justify-content-between align-items-start w-100 custom-menu ">
                            <div className="custom-sreach-input position-relative">
                                <div className="sreach-icon">
                                    <i className="bi bi-search" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Đăng ký và nhận voucher bạn mới đến 70k!"
                                />
                            </div>
                            <nav className="d-flex align-items-center custom-nav">
                                <li>Tiếng Việt</li>
                                <>
                                    {user ? (
                                        <li className="user-dropdown-menu">
                                            <button className="user-dropdown-btn">
                                                <p className='login-user-name'>{user.name}</p>
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
                                </>

                                <li className="border-start p-2">
                                    <img
                                        src="https://media-hosting.imagekit.io//c2caec833b6e46b1/heart0.png?Expires=1835161260&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=ECcmFiPc25rbl0Ua6OVmPhaGXj9bv48u7DJ8WIHciHUxydXUxwlSoqdw4AdC~gB53Cd89-aCTQA0T9J-Oo6gyV5UMEUPOf3oarUUO3yWii47mhIDpBoddhkZ94GvkN9s~WkQbiyqJlrJzXNUrgLLOy8lOQvn8uCB3ZL39e6x4s~2b06sSG2~plFdvQC2tBHYyqXst7J1rXRRhtIDybKKQI28vuQVwogOBL6v-SLHeIve30qQ64bMS6KBx7JPTyqkkmf93yfez076uPj489G83T4fXAPCAboBqnT8S1XETXtfQZjL-Y2WsQz3BVM9vZ9HyShpbENHzuZVlT~tdjS6EQ__"
                                        alt=""
                                        className="favourite"
                                    />
                                </li>
                                <li>
                                    <Link to={'/cart'} type="button" className="position-relative bg-transparent">
                                        <img
                                            src="https://media-hosting.imagekit.io//ca0ca63ea9194c3a/fast-cart0.png?Expires=1837170915&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=z1rdhaP6OLMIsgulbU0xrCoUyARXEXolE2F-~bVCU75EEp4X9Up6fu9nB3mB0zCl1W7Qcf-B0S98rG0DdBO~Rv5yvAtvs5hbEf5oetLsV4j2PDf34W4~v9d8bfEUMBK4conlEVK-ucmWb3GSSBpn0VmueCjQJPcePtvcKQ0YwFeZQrMsaQ~eeECw3EVtRWt~VY8qOXo0FnMQIDX8dv1ygkb-bCoVyHjEGPJWwKglVOAnVvnupYjcG~NOiCXo2YfTy~bj0TJcdg1fHqdbECSWYDGsR-wKqyh8hixZ-7MLCz2GSdqkAbUPAQ8AuaCEUz2jyzxlZ17OeML1~2X97Q6rXg__"
                                            className="cart"
                                            alt=""
                                        />
                                        <span
                                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                                            style={{ backgroundColor: "#917FB3", color: "#fff" }}
                                        >
                                            {numbercart}
                                            <span className="visually-hidden">unread messages</span>
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
                                    src="https://media-hosting.imagekit.io//c2caec833b6e46b1/heart0.png?Expires=1835161260&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=ECcmFiPc25rbl0Ua6OVmPhaGXj9bv48u7DJ8WIHciHUxydXUxwlSoqdw4AdC~gB53Cd89-aCTQA0T9J-Oo6gyV5UMEUPOf3oarUUO3yWii47mhIDpBoddhkZ94GvkN9s~WkQbiyqJlrJzXNUrgLLOy8lOQvn8uCB3ZL39e6x4s~2b06sSG2~plFdvQC2tBHYyqXst7J1rXRRhtIDybKKQI28vuQVwogOBL6v-SLHeIve30qQ64bMS6KBx7JPTyqkkmf93yfez076uPj489G83T4fXAPCAboBqnT8S1XETXtfQZjL-Y2WsQz3BVM9vZ9HyShpbENHzuZVlT~tdjS6EQ__"
                                    width={25}
                                    alt=""
                                />
                            </div>
                            <div>
                                <Link to={'/cart'} type="button" className="position-relative bg-transparent">
                                    <img
                                        src="https://media-hosting.imagekit.io//ca0ca63ea9194c3a/fast-cart0.png?Expires=1837170915&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=z1rdhaP6OLMIsgulbU0xrCoUyARXEXolE2F-~bVCU75EEp4X9Up6fu9nB3mB0zCl1W7Qcf-B0S98rG0DdBO~Rv5yvAtvs5hbEf5oetLsV4j2PDf34W4~v9d8bfEUMBK4conlEVK-ucmWb3GSSBpn0VmueCjQJPcePtvcKQ0YwFeZQrMsaQ~eeECw3EVtRWt~VY8qOXo0FnMQIDX8dv1ygkb-bCoVyHjEGPJWwKglVOAnVvnupYjcG~NOiCXo2YfTy~bj0TJcdg1fHqdbECSWYDGsR-wKqyh8hixZ-7MLCz2GSdqkAbUPAQ8AuaCEUz2jyzxlZ17OeML1~2X97Q6rXg__"
                                        width={20}
                                        className="cart"
                                        alt=""
                                    />
                                    <span
                                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                                        style={{ backgroundColor: "#917FB3", color: "#fff" }}
                                    >
                                        {numbercart}
                                        <span className="visually-hidden">unread messages</span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="nav-moblie ">
                            <img
                                src="https://media-hosting.imagekit.io//4bd35604d5604946/menu0.png?Expires=1835266160&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=jWWSVjWn5qwSRqb3BJjbUQcdGArR4n~Fz1gxjDB6X8w~drbMSC2oOVI90SIO~TxCKcxQ4luWCHiGSUNvbyRcQXKe4uNyemEg67tx3~VoQrAlDHS3PDwSnuN82ZlpnDDqXorW5QjsVhbQvMfMsGQ-XJx6jo13P7OG11AqxiMUxfmoCn~9NMsEWpU1sLUAnHmFvDJKasZNQz3UUxD8uj5jmnqM6zjfSU-eQ5uxBHe1h6HKgMFTibVyrZHLs3sC0z9QzVHkBo3E60pDOdEPl-CQF3yterHzqe62hvPhmV9Iqcr2ZiHQbSIgcZyBBvTdJ0G09fta14iRrNTHXwhfYvUPYA__"
                                height={20}
                                alt=""
                                className=""
                                onclick="openElement()"
                            />
                            <i 
                            style={{color: 'white'}}
                            class="bi bi-search"></i>
                        </div>
                        <div className="moblie">
                            <div className="position-relative ">
                                <div className="close" onclick="closeElement()">
                                    X
                                </div>
                                <ul>
                                    <li>Tất cả </li>
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
                            className=" custom-menu justify-content-between align-items-center w-100 mt-3 menu"
                            style={{ paddingBottom: 500 }}
                        >
                            <div className="d-flex align-items-center gap-3 menu">
                                <div className="dropdown">
                                    <i className="bi bi-list" />
                                    <button className="border-0 dropdown-btn">Tất cả thể loại</button>
                                    <div className="dropdown-content">
                                        <a href="#">
                                            <span style={{ color: "#a00f0f" }}>&gt;</span>Tất cả
                                        </a>
                                        <a href="#">
                                            <span style={{ color: "#a00f0f" }}>&gt;</span>Viễn tưởng
                                        </a>
                                        <a href="#">
                                            <span style={{ color: "#a00f0f" }}>&gt;</span>Nonfictions
                                        </a>
                                        <a href="">
                                            <span style={{ color: "#a00f0f" }}>&gt;</span>Thơ ca
                                        </a>
                                        <a href="">
                                            <span style={{ color: "#a00f0f" }}>&gt;</span>Manga, novel
                                        </a>
                                        <a href="">
                                            <span style={{ color: "#a00f0f" }}>&gt;</span>Art, Photography
                                            &amp; Design
                                        </a>
                                        <a href="">
                                            <span style={{ color: "#a00f0f" }}>&gt;</span>Ngôn ngữ, Sách
                                            tham khảo
                                        </a>
                                        <a href="">
                                            <span style={{ color: "#a00f0f" }}>&gt;</span>Sách giáo khoa
                                        </a>
                                        <a href="">
                                            <span style={{ color: "#a00f0f" }}>&gt;</span>Sách về Việt Nam
                                        </a>
                                    </div>
                                </div>
                                <div className="d-flex gap-3">
                                    <p>Allbook</p>
                                    <p>Sách mới</p>
                                    <p>FAQ</p>
                                    <Link style={{ color: "#212529" }} to={'/contact'}> Liên hệ</Link>
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
export default Header;
