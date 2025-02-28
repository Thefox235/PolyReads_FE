import React, { useState, useEffect } from 'react';
import '../asset/css/contact.css'
const Contact = () => {

    return (
        <>
            <>
                <section className="banner">
                    <div className="banner-overlay">
                        <h1>Contact</h1>
                        <p style={{ fontSize: 20, fontWeight: 400 }}>
                            <a href="/">Trang chủ</a> &gt; Contact
                        </p>
                    </div>
                </section>
                <main>
                    <section className="contact-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 contact-info-form">
                                    <div className="contact-info">
                                        <p>
                                            <i className="bi bi-geo-alt-fill" /> QTSC 9 Building, Đ. Tô Ký,
                                            Tân Chánh Hiệp, Quận 12, TP. HCM
                                        </p>
                                        <p>
                                            <i className="bi bi-telephone-fill" /> 0123 456 789
                                        </p>
                                        <p>
                                            <i className="bi bi-envelope-fill" /> polyread@gmail.com
                                        </p>
                                    </div>
                                    <div className="contact-form">
                                        <h4>Liên hệ</h4>
                                        <form>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Họ và tên"
                                            />
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Email"
                                            />
                                            <textarea
                                                className="form-control"
                                                rows={4}
                                                placeholder="Nội dung"
                                                defaultValue={""}
                                            />
                                            <button type="submit" className="btn btn-primary">
                                                Gửi liên hệ
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-md-8 contact-map">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.444049623332!2d106.62348867480605!3d10.853791489299715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752a20d8555e69%3A0x743b1e9558fb89e0!2sQTSC%209%20Building!5e0!3m2!1svi!2s!4v1740273726428!5m2!1svi!2s"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <section className="intro-section">
                    <div className="intro-container">
                        <div className="intro-item">
                            <img src="https://media-hosting.imagekit.io//d8885c8d45604926/Delivery.png?Expires=1835360299&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=h3~doExbW2hX03NPvvoewJn~-dZLh49v0YFJAMm9K6tj3Ju3ZV7L3~H4z1VQNHV9LQaUrwQmHhE-AeUEiwD~El~Y~FgdQ-jh59drRztXahsA7qthCLB-YmTg9wyXqX0HQ4A7IFe5XZz70e4tbprwH9Nzj~~Wme4wL7ruhzpe66QOkHXpug8jZvezcuU~DdIlF8QCrXj7J3NrrHA~yv4uLsGjgVKI2nbaS6KIcGDtu1~uduCYHFgl083eBHkQ1PrIWRIHH~V7CgXTpzfXggIriuQUCiG0H80w0MqYsHNjnuU-vg7vEjJnbl33AXWMYcNNObZYZqcRwk0eFLcXlTxkHA__" alt="Free Shipping" />
                            <p>
                                <strong>MIỄN PHÍ VẬN CHUYỂN</strong>
                                <br />
                                Đơn hàng từ 500,000VND
                            </p>
                        </div>
                        <div className="intro-item">
                            <img src="https://media-hosting.imagekit.io//eddb2ce4d6a74b79/Last%2024%20Hours.png?Expires=1835360299&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=KlbhxUiQ5M2DKrj10oGxPShxmrHnmnwAYJXWu~ErW8XBqGhVkLqJxdL9y6LEX6mq6HU3fpUWnqEZ36XHkZrg1OD0Idmy76PcRrJIiJPoW0~4V2Bp1apPhLJZg4J2DQwi6lqsfgBKL7C47Hzjn8XMyv8Y~Q7IxQiPcUa8kTkUyqggKKzsQot8C95pH38B3MmkEBGfg6Ppnc2zLS4YWkegmKMitd7hroNslOYzse9KZNkkf77kiefirpeVEzRzgM3OK-trRbif005NSFFJOhig2GYCY433pbM7IuL8Q3bWTJxJvbgX~tzv8TT0Z5-FZYVf5bqJVZAAnJaoxkxpt7DhvQ__" alt="Convenience" />
                            <p>
                                <strong>DỄ DÀNG TIỆN LỢI</strong>
                                <br />
                                Đặt sách theo yêu cầu
                            </p>
                        </div>
                        <div className="intro-item">
                            <img src="https://media-hosting.imagekit.io//60fec97ed3cc45d7/Open%20Parcel.png?Expires=1835360299&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=gZx2lghidwUpA6Eitt3swpkGc6uIjrIpqXmYi8IgbjLF5fHMLCmSzwDTkPnXFSLkyBVxtzo2kLH2Pmj8iF44VAbbIfJATLC1WVtHjFsFGmMAZi6JuDE8uwp0nQ3iZYgS3eij9eChl0MtsPYNqNisUdLXrcnKI9UQ20bSkuomkE33LJ7UWi5NOgsnmQzB4XTdkyad5gVaMhrGZ8VDUPMp4xjQfPJU6kQ5fGnDok5VQH3X3vKoxYO4LNgvV0-ogivix~Z2xl1XxBHDfO-Q3tEJwfEJdVDBWx~5PO7FJ3onlxSpfWM6zi5UyBQ9W184jmMEqhKUnpES7q2p9-gOv9-RbA__" alt="Loyalty Points" />
                            <p>
                                <strong>TÍCH ĐIỂM ĐỔI QUÀ</strong>
                                <br />
                                Nhận nhiều ưu đãi
                            </p>
                        </div>
                        <div className="intro-item">
                            <img src="https://media-hosting.imagekit.io//573ba216bb0f46c8/Hand%20Drawn%20Star.png?Expires=1835360299&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=HJUzEOeDs5AzeG04X~WFAVHqr7AuoYW46skJyQwyL-T2ivCAbPgHEtvgAdBhMyPd7SIc418z1u3h1dnJay2jCzEmpx-GgrsgX2xciwMe8Irpqs6PiaZNIJdt2YkYc98kcBjoWq6xIb1gRuH9RtTZBLL03V2Gln-Af4PGgJ~0RUmfhRsMpCm5Cp7g-DINj4ubC4ZjtsgKeRzjLwKJfRkmp5UNCWzCo729QEGLqMW5Q0zrDQ6IkHu6AZoWzEL0LxlWIbSf5TfR1yH1QVBLigN-HDF7eIC0OHmhWym1~Eexs7GEHmi~yyYLRV44iA08q-fTaABKXahigdaScyicwFWhAw__" alt="5-star Service" />
                            <p>
                                <strong>DỊCH VỤ 5 SAO</strong>
                                <br />
                                150+ rating từ Facebook
                            </p>
                        </div>
                    </div>
                </section>
            </>


        </>
    );
};
export default Contact;
