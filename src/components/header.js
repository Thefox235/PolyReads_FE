import React, { useState, useEffect } from 'react';
import { getBanners } from '../api/server'; // API lấy banner
import '../asset/css/header.css';
<<<<<<< HEAD
import React, { useEffect } from 'react';
const Header = ({ user, handleLogout }) => {
    // console.log(user);
    const images = [
        "https://media-hosting.imagekit.io//1671484bdb114629/banner-2.png?Expires=1835161637&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=ZYZAgsu-Zll1X7Amec~71fJlXSChHpspeigeTCGhmE3IDr6f0N8bbZeJoKieLaPGX7LajArUbvPBwhNrx-bEHqEvf2UYYmk5D2fFCI4uNk8EFfr4u73nGbV3rNfe~Po0J4Bd9iC3C-SRMIu8xe8aCgZgowaOGJwi8P~ZNefRnwiTjUTfb-~t0WvGoRMu0BibEdbhyzOSEFQbI3n53xMIZEyXyEeyJ9g1ykNxOnLpryObN7BMMv6Nayh4CYnhA5WZ2RVpSJdCtrA3eKe6O9qjNZ6EjXPa4trWoSsUaMDR6bnBX7jctOHPlHzSnasaCE0rP24HtRpCny-bLOeuPN3Cyg__",
        "https://media-hosting.imagekit.io//4fb50c3afeb84d25/banner-3.png?Expires=1835161637&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=XJVHVGaEJe8jbxiwS2SYUvIj-BlCwGjqlvf6ZTHLKz5qLwKK8mJqeZ1ult8pVL1Q96aidxJ8eePPjkf7oKabaSJKPgJcyXLFCYRb-VLixH7ycpuqljZRWBgg6Yt~FhHZL3tVCTsk4V~3RxCrKnEqfl9oTs7JS~2zdMHCOTC0U3VHGeU4KFWa1FfSWue~DPCR7CtJe9kHtE32emvB6YltGJ9dBukSq-nAQxMDOobrcHhSrOBkkgb3VJrEYeUGuQxVsKn4oJ7X8xQX6OENqsbyUA14E0CrZWfbcGNdfLu9Te5z1wD2iSLGPg5i4j0s45KClbqZrQbLHrGKOY4gM6kf8A__",
        "https://s3-alpha-sig.figma.com/img/2a97/651f/0dc597b8a16ab0b502b1e83fd759962a?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dJ0j4AebaZwNvi8LWlQZDo-U~3y79mO~3Vd6YcepAdZ-NXfGSDXc0t3kjvGNbKQ4LObNQzp-dTqqnolVfTEUwJv8bndRWhVjB3D6YB3FKGdaKKtz2o4XU1tEXbt4Iohth~hazLdJa6M8R-PaK8tumcMUEW4EV3iVtIX8p1eIqQtCZ6ysOVnDPjjyTdYFdVLy1L8SW3PT88CyI04tEb9fxfLE083Hx1JbO7U1ksuBqpWetS5yHNP222KrRPwu2fQGlJHW9rH1j-kAfDW1KUKOrjhztiWcfSQP7jbilsuxgSSIdU-H9hq7aqt3zT3aYdhdTtswmUkke-apX63HIUUnFA__"
    ];

    let currentIndex = 0;

    useEffect(() => {
        const bgHeader = document.querySelector(".bg-header");
        const changeBackground = () => {
            if (bgHeader) {
                bgHeader.style.backgroundImage = `url(${images[currentIndex]})`;
                currentIndex = (currentIndex + 1) % images.length;
            }
        };

        const intervalId = setInterval(changeBackground, 3000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount

    }, []); // Only run once on component mount

    // Functions to handle open and close elements
    const closeElement = () => {
        const element = document.querySelector(".moblie");
        if (element) element.classList.remove("open");
    };

    const openElement = () => {
        const element = document.querySelector(".moblie");
        if (element) element.classList.toggle("open");
    };
=======
import { Link } from 'react-router-dom';

const Header = ({ user, handleLogout }) => {
  const [activeBanners, setActiveBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
    return (
        <>
            <header>
                <div className="bg-header">
                    <div className="nav">
                        <div className="sreach w-100">
                            <div className="logo-sreach">
                                <Link to={'/home'} className="logo-img">
                                    <img
                                        src="https://s3-alpha-sig.figma.com/img/b0af/45d1/c03498be8824b354d70f86daf9efda3b?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=JrcB2oVrKpzIjqbEdZ3mDFItqIY6WTbXqMSD3MNT05y1P9AgZn13ZnMaSXCZBarIj1GS7ZQ~E-uM3-HsJUMSpG6PRPhvqUiDHcwGYaszSk6F86gkpq8G9o7j67yHHoNEi9143lgkzoLCOEfzjScNwhbYrNX3WXuq~sbtdriEHyRrDU6Ki~WqHVQzM7w1Vz0MWzwOvVZlBkD2e-zvGywWd6Ps4h21Jm5hEwH62m~tIaHTglUIPv5CWSgWQCkEGLsUF3r0UfmH6IxmTgpI5RqczdeA42J4yrPsT2pv0rOP~gBo7gnVc5244CaoGmfDHAjd2kIMdmuT7I33ypcjCJluEg__"
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
                                                {user.name}
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
<<<<<<< HEAD
                                                        <a href="/admin/users">
                                                            <span style={{ color: "rgb(160, 15, 15)" }}>&gt;</span> Quản lý người dùng
                                                        </a>
=======
>>>>>>> 34cf7eacab846c910a33805fbcd77c54f1520869
                                                        <hr className="user-dropdown-divider" />
                                                    </>
                                                )}
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
                                    <div type="button" className="position-relative bg-transparent">
                                        <img
                                            src="https://s3-alpha-sig.figma.com/img/86b4/b45c/31ba89cf4af5edcd2445279bbde80ed8?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=euFCrS6DWh4fOLrJW8OBkE4YHMFNCEinv9CiN63vvKx-KLMwK7dHrgomI~udpbmbej6OkhO2psbtfCmhQ0pk-DPErEsx3sQg5~W~KQUTFM1Q75Utd~6m3g-51p342r-QuNaD4WHUQtezbMnRqSBwkXRayybhx7Ri7a8vyUK7c~~IyHX7o7PslEIRDU-6GOg~iu0ZB-OcDSOk3yF6nX3WNfkaU-TAPRgGA9ETzXBWnuHL4EJ~1r6UJm0AsgsS9PqHU87IBj2ModiScFcPiAlbC2V0Ya1bSgyPsFyo01DT5qk9getmONyf2~JMpR061RN5yOUrax83g8ovwmkcRpPW-A__"
                                            className="cart"
                                            alt=""
                                        />
                                        <span
                                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                                            style={{ backgroundColor: "#917FB3", color: "#fff" }}
                                        >
                                            0 <span className="visually-hidden">unread messages</span>
                                        </span>
                                    </div>
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
                                    alt=""
                                />
                            </div>
                            <div>
                                <div type="button" className="position-relative bg-transparent">
                                    <img
                                        src="https://s3-alpha-sig.figma.com/img/86b4/b45c/31ba89cf4af5edcd2445279bbde80ed8?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=euFCrS6DWh4fOLrJW8OBkE4YHMFNCEinv9CiN63vvKx-KLMwK7dHrgomI~udpbmbej6OkhO2psbtfCmhQ0pk-DPErEsx3sQg5~W~KQUTFM1Q75Utd~6m3g-51p342r-QuNaD4WHUQtezbMnRqSBwkXRayybhx7Ri7a8vyUK7c~~IyHX7o7PslEIRDU-6GOg~iu0ZB-OcDSOk3yF6nX3WNfkaU-TAPRgGA9ETzXBWnuHL4EJ~1r6UJm0AsgsS9PqHU87IBj2ModiScFcPiAlbC2V0Ya1bSgyPsFyo01DT5qk9getmONyf2~JMpR061RN5yOUrax83g8ovwmkcRpPW-A__"
                                        width={20}
                                        className="cart"
                                        alt=""
                                    />
                                    <span
                                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                                        style={{ backgroundColor: "#917FB3", color: "#fff" }}
                                    >
                                        0 <span className="visually-hidden">unread messages</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="nav-moblie ">
                            <img
                                src="https://s3-alpha-sig.figma.com/img/5eb6/f072/7332695743681bad126d9f443d0b5617?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dHrSDnKBQZgeMuvXwrkeQ7-46P-cHOco1Thxe0X1WVWCcuBVAQN-EI65MzjuVCBOUTv5PUcF28PSwrEMfD~pt6frsJOGKef6wMUzaXvsVZ-kMMqBW9wiuey3rBR5Z9JENIrzKbiOxsV8Wy~-PplFqf44YQfEccxCNejAA0iI9qoKFsTpzSge~LvV9frGi6DMeW6birO56K1ibUWAnuImys5izVHEWxKUXMeKCD36lvgp1HPm0bEnV-cszZJk9B3ZmfAoRtpEZSuy2xjangCUvnDXinRSg4uKwC8vw-ydc5TXKLDWBt-00eQUVBCQ012Tv1rMDUsbWA3IjXpf2~EAvw__"
                                height={20}
                                alt=""
                                className=""
                                onclick="openElement()"
                            />
                            <img
                                src="https://s3-alpha-sig.figma.com/img/f070/e520/26e91c3156ef6d1240f3961be8d940f0?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=BS4OmjIC5aS2rq52JKjNfJdjRpg7VKhLXiIHD3UyvXf-Uy~C9~wcZ2Y4LAw-LjK7CfwvVPAeaoEONRoTGzF3WB~iVJukDxxtCT0KDLNejF4aUSTOfiR0w-pASHeOOmtCy9MnurSJlyKtGGBSOQUZ88M2VOMb6OxZQnypG5QujH1AxOM3IOdTMko6yFdK6dyaDak~1wcOuswsZlpMSGrgMbqxfloj62M97pognCKVNTOxiMUN19A6EZGN6d2lcFTs9~S5~aOoowPD3l74pw2HsQJtEtjPYP470IPVJZxOtCU~7YyRW5RBwAOS8p0YobWerrZAFodsY-eArlgiD~K06Q__"
                                height={30}
                            />
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
