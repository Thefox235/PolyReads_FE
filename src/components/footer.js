import '../asset/css/footer.css';
import React, { useState, useEffect } from 'react';
const Footer = () => {

    return (
        <>
            <footer>
                <div className="footer-logo">
                    <div className="d-flex  align-items-center gap-1 ">
                        <img
                            src="https://s3-alpha-sig.figma.com/img/b0af/45d1/c03498be8824b354d70f86daf9efda3b?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=O47y7q8tovut9dmcr1DJFrZn7iU8O7eBv2VS8M20yorz~y0jJQHhlrOVt33fcFKmTnZ6rIwZO6YcqcB-WmC3xmRKwcnXSv8sSYTIBZVQZB9dtNoDXdTyU9jHEyEg-A-xykXj~Qpwf-i9XhXzw84Fyl3QenFbMt6bvISbmXjF2~GUBdMbSMuNkuyO4yxy3DQphoznSMsBQWiG9b1n2UbMgyIi1yfneQNxl6Hwt2CYRSV2Ffc~vODoWT99Mc4VIO-ASeQ9WWZqyXO1TGWL5c4kv2zfx8XIxms6P5zfzjmZl8KWdCnhrRa4CDOQXNLmlfrMGWJLLw87lLZDB4Z6GgKV~g__"
                            alt=""
                            style={{ maxWidth: 60 }}
                        />
                        <h5>Poly Reads</h5>
                    </div>
                    <div className="d-flex flex-column " style={{ alignItems: "flex-start" }}>
                        <h6>Tiệm sách Poly Reads:</h6>
                        <p style={{ textAlign: "left" }}>Cảm hứng sáng tạo từ trang sách!</p>
                    </div>
                    <div className="d-flex flex-column " style={{ alignItems: "flex-start" }}>
                        <p className="text-start">
                            QTSC 9 Building, Đ. Tô Ký, Tân Chánh Hiệp, Quận 12, Hồ Chí Minh, Việt
                            Nam
                        </p>
                        <p>Email: polyreads@gmail.com</p>
                        <p>SĐT: 0123456789</p>
                    </div>
                    <div className="icon-mxh d-flex align-items-center">
                        <i className="bi bi-facebook" />
                        <i className="bi bi-twitter" />
                        <i className="bi bi-tiktok" />
                        <img
                            src="https://s3-alpha-sig.figma.com/img/be21/49be/c88622e49b6235579f1f13b3c20aeab4?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=k69IQF1sNV8by8sIDhmo4FzNigvSHPQZN9MN5Esv0ldQN5fVPXhaUMSXid1t03fQr~8Aizk1W3JXKHYXWzNQv3o0MbzqkfZaeIHZjNQkSZtUoyV63~tf-pF4g8LHT-cAchmyZbLmTAD0CVRXpllvRc7qoZMJW3FT6azdk5GkHGSs0hTQxWyPaXBTpyWcc6AUu-4tZZcDA0jgkbpxVx1FNsqe5u1jlsHUNGFyjU-H0trVNDVsCj3fcOQqx4SfrXs39O~QwzKMRYjRynHDg8cB6D5rchq4r2MDXm~txmt1i-NLKTgmGJjoLpXB~GklHPMfFMWFsJWt9t3SsSjEqOa--g__"
                            alt=""
                        />
                    </div>
                </div>
                <div>
                    <h5 style={{ fontWeight: "bold" }} className="text-start">
                        BÀI VIẾT NỖI BẬT
                    </h5>
                    <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                        <div className="image-blog-container">
                            <img
                                className="blog-tag-img"
                                src="https://s3-alpha-sig.figma.com/img/d942/d8d1/3018c14d28aa7db45b5f389e57caa819?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=p6JoK3sw~OBC8zijkYzWS1iXDZBJ1c2-6tHfl0kE8yPGWRndPHKppzeyEZU2ZwUHCpwzWVvyEjroY1c3Lb-eN8SoWIxxUEqxNg~Uv-LKq63lj~Nfqm-V0PKIXhfOlZ4JolVj2KioBWkCZ5XbPA8Y14q6gR57lPzs8O1u-Ij5pIQr2sC2y33Q-iZsg25wjAZVd5bEm1oJBRoDfwOZDwUb5A1dVpTvZjIMf94QUn16HPDekkm84MmBq9BQIRV3fJvogdYVL4CdRdfmdlEr8xGs2Ee7QEuDFQWxaF9gJfWmlm0Z5gp3A3nqszM2IWZtZboppR5-osizlvnq5O5SVeVGgA__"
                                width={113}
                                alt=""
                            />
                        </div>
                        <div>
                            <div
                                className="d-flex align-items-center gap-2 ts "
                                style={{ backgroundColor: "#FD57FD" }}
                            >
                                <div className="containers">
                                    <div className="outer-circle">
                                        <div className="inner-circle" />
                                    </div>
                                </div>
                                <p className="tag-text" style={{ marginTop: 15 }}>
                                    TIỂU SỬ
                                </p>
                            </div>
                            <p style={{ fontWeight: "bold" }} className="text-start">
                                'Mã nguồn' chuyện đời tỷ phú Bill Ga...
                            </p>
                            <div className="d-flex justify-content-between">
                                <span style={{ color: "#889097", textAlign: "left", fontSize: 13 }}>
                                    05 Dec, 2024
                                </span>
                                <span style={{ color: "#889097", textAlign: "left", fontSize: 13 }}>
                                    5,579 lượt xem
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                        <div className="image-blog-container">
                            <img
                                className="blog-tag-img"
                                src="https://s3-alpha-sig.figma.com/img/d942/d8d1/3018c14d28aa7db45b5f389e57caa819?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=p6JoK3sw~OBC8zijkYzWS1iXDZBJ1c2-6tHfl0kE8yPGWRndPHKppzeyEZU2ZwUHCpwzWVvyEjroY1c3Lb-eN8SoWIxxUEqxNg~Uv-LKq63lj~Nfqm-V0PKIXhfOlZ4JolVj2KioBWkCZ5XbPA8Y14q6gR57lPzs8O1u-Ij5pIQr2sC2y33Q-iZsg25wjAZVd5bEm1oJBRoDfwOZDwUb5A1dVpTvZjIMf94QUn16HPDekkm84MmBq9BQIRV3fJvogdYVL4CdRdfmdlEr8xGs2Ee7QEuDFQWxaF9gJfWmlm0Z5gp3A3nqszM2IWZtZboppR5-osizlvnq5O5SVeVGgA__"
                                width={113}
                                alt=""
                            />
                        </div>
                        <div>
                            <div
                                className="d-flex align-items-center gap-2 ts "
                                style={{ backgroundColor: "#FF5F5F" }}
                            >
                                <div className="containers">
                                    <div className="outer-circle">
                                        <div className="inner-circle" />
                                    </div>
                                </div>
                                <p className="tag-text" style={{ marginTop: 15 }}>
                                    VIETNAM
                                </p>
                            </div>
                            <p style={{ fontWeight: "bold" }} className="text-start">
                                'Mã nguồn' chuyện đời tỷ phú Bill Ga...
                            </p>
                            <div className="d-flex justify-content-between">
                                <span style={{ color: "#889097", textAlign: "left", fontSize: 13 }}>
                                    05 Dec, 2024
                                </span>
                                <span style={{ color: "#889097", textAlign: "left", fontSize: 13 }}>
                                    5,579 lượt xem
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dm ">
                    <h5 style={{ fontWeight: "bold" }}>DANH MỤC</h5>
                    <p className="mt-4">Tất cả</p>
                    <p>Viễn tưởng</p>
                    <p>Nonfictions</p>
                    <p>Thơ ca</p>
                    <p>Manga, novel</p>
                    <p>Art, Photography &amp; Design</p>
                    <p>Ngôn ngữ, Sách tham khảo</p>
                    <p>Sách giáo khoa</p>
                    <p>Sách về Việt Nam</p>
                </div>
                <div className="lh">
                    <h5 style={{ fontWeight: "bold" }}>TÀI KHOẢN CỦA TÔI</h5>
                    <p className="mt-4">Đăng nhập/Tạo mới tài khoản</p>
                    <p>Thay đổi địa chỉ khách hàng</p>
                    <p>Chi tiết tài khoản</p>
                    <p>Lịch sử mua hàng</p>
                    <div style={{ paddingTop: 20 }} className="footer-register">
                        <h5 className="text-start">ĐĂNG KÝ</h5>
                        <div className="d-flex mt-3">
                            <input
                                type="text"
                                style={{ padding: "10px 13px" }}
                                placeholder="Email"
                            />{" "}
                        </div>
                        <button className="d-flex mt-2 btn-lh">Đăng ký</button>
                    </div>
                </div>
            </footer>

        </>
    );
};
export default Footer;
