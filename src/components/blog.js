import React, { useState, useEffect } from 'react';
import '../asset/css/blog.css'
import {
    getImages,
    getProductHot,
    getDiscounts
} from '../api/server';
import { height } from '@fortawesome/free-solid-svg-icons/fa0';
import { Link } from 'react-router-dom';
const Blog = () => {
    //product
    const [discounts, setDiscounts] = useState([]);
    const [productHot, setProductHot] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {

        //discount
        const fetchDiscounts = async () => {
            try {
                const discountData = await getDiscounts();
                setDiscounts(discountData);
            } catch (error) {
                console.error('Có lỗi xảy ra khi lấy mã giảm giá:', error);
            }
        };
        fetchDiscounts();
        // sản phẩm hot
        const fetchProductHot = async () => {
            try {
                const productsData = await getProductHot();
                setProductHot(productsData);
            } catch (error) {
                console.error('Có lỗi xảy ra khi lấy sản phẩm hot:', error);
            }
        };
        fetchProductHot();

        const fetchImages = async () => {
            try {
                const imagesData = await getImages();
                setImages(imagesData);
            } catch (error) {
                console.error('Có lỗi xảy ra khi lấy hình ảnh:', error);
            }
        };
        fetchImages();

        const wrapper = document.querySelector('.products-wrapper');
        const prevBtn = document.getElementById('prev');
        const nextBtn = document.getElementById('next');

        let scrollAmount = 0;
        const step = 220;

        nextBtn?.addEventListener('click', () => {
            scrollAmount += step;
            wrapper.style.transform = `translateX(-${scrollAmount}px)`;
        });

        prevBtn?.addEventListener('click', () => {
            scrollAmount -= step;
            if (scrollAmount < 0) scrollAmount = 0;
            wrapper.style.transform = `translateX(-${scrollAmount}px)`;
        })
    }, []);

    return (
        <>
            <section className="banner">
                <div className="banner-overlay">
                    <h1>Contact</h1>
                    <p style={{ fontSize: 20, fontWeight: 400 }}>
                        <a href="/">Trang chủ</a> &gt; Contact
                    </p>
                </div>
            </section>
            <div className='blog-container'>
                <main style={{paddingTop: "30px"}}>
                    <article>
                        <div
                            className="d-flex justify-content-between align-items-center"
                            style={{ borderBottom: "1px solid rgb(190, 188, 188)" }}
                        >
                            <div className="sptt">Sản phẩm hot</div>
                            <div className="d-flex align-items-center gap-3">
                                <div
                                    style={{ color: "#917fb3", fontSize: 25, cursor: "pointer" }}
                                    id="prev"
                                >
                                    &lt;
                                </div>
                                <div
                                    style={{ color: "#917fb3", fontSize: 25, cursor: "pointer" }}
                                    id="next"
                                >
                                    &gt;
                                </div>
                            </div>
                        </div>
                        <div className="article_2">
                            <div className="article_2_left">
                                <div className="article_2_title">
                                    <div className="article_2_title_background">
                                        <span className="title_manga">
                                            <svg
                                                width={17}
                                                height={17}
                                                viewBox="0 0 15 17"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5ZM1.96953 7.5C1.96953 10.5544 4.44561 13.0305 7.5 13.0305C10.5544 13.0305 13.0305 10.5544 13.0305 7.5C13.0305 4.44561 10.5544 1.96953 7.5 1.96953C4.44561 1.96953 1.96953 4.44561 1.96953 7.5Z"
                                                    fill="white"
                                                />
                                                <circle cx="7.5" cy="7.5" r="3.5" fill="white" />
                                            </svg>
                                            MANGA
                                        </span>
                                    </div>
                                    <div className="title_manga_1">
                                        <span className="title_manga_1a">
                                            Kagurabachi Chapter 61: Liên minh của Chihiro với Makizumi
                                        </span>
                                    </div>
                                    <div className="title_manga_2">
                                        <span className="title_manga_2a">
                                            <svg
                                                width={15}
                                                height={15}
                                                viewBox="0 0 13 13"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                            >
                                                <rect
                                                    width={13}
                                                    height={13}
                                                    fill="url(#pattern0_517_12933)"
                                                />
                                                <defs>
                                                    <pattern
                                                        id="pattern0_517_12933"
                                                        patternContentUnits="objectBoundingBox"
                                                        width={1}
                                                        height={1}
                                                    >
                                                        <use
                                                            xlinkHref="#image0_517_12933"
                                                            transform="scale(0.01)"
                                                        />
                                                    </pattern>
                                                    <image
                                                        id="image0_517_12933"
                                                        width={100}
                                                        height={100}
                                                        preserveAspectRatio="none"
                                                        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC20lEQVR4nO2dzYrUQBSFy9GNos/g/zvIKI7vMGTXbtK5p+jeNcj0MiouBHHtC8wLyDyB+AOKy1mKoO0TuHci1ZNBHNqkR+jUSeV8cJeBe++XSioQ6jonhBBCkAPgkpntmdkbM/toZq8mk8kNR8Z4PL4VcqtzDLk+ms1mF11K5Hl+BcBnANWp+Glm244E7/3dkNOKPD9Np9PLLhXM7OWKIk/iS5Zl52PnWJblBQBfG/J84VLBzH40FFoVRXGHIMftphzN7LtLBQBHLcXuxs7RzHZbcvzlUqGp0DoyghyztjxdKkgIGRISgaIorpvZw7BvBzA/FW2PrP0V18w7jv018vzrmrrWkff+mmPBe/8AwPs1ikk6zOydme3EdHEOwLO2HdTA4gjA09Cbzm3UMmI3oCKNJzEeU1oZaFwp9zsTYmYfCO7Civ2d0omMsKOIXSx6EmHnuXEhYWsbu1D0J0YbF7Lmd4UCyx7MNy7EzB6r4Vjrhgu9khDwrE4JQXwJEoL4jZcQxG+2hCB+gyUE8ZsqIYjfSAkhaB4kJH7DICHxmwQJid8YDFlI+MOv/scp+bDjWrmFADh0AwHAoYQQISFkSAgZEkKGhJAhIWRICBkSQoaEkCEhZEgIGRJChoSQISFkSAgZEkKGhJAhIWRICBkSQoaEkCEhZEgIGRJChoSQISFkSAgZEkKGhJAhIWRICBkSQoaEkCEhZEgIGRJChoSQISFkSAgZEkJGX4R8cwMBwKIPQkLcdInjvb/di7NO6nhdluWWS5SyLLcAHPRJyFJKmJrp0lwZBzSnAf3HUeOLespnCrE44/FMexsXosP4wXUYf57nVzXMBTzjKgJhWMkZH1tDjLedyKiF7GiVoG3k0T3XJWEaGcFdWDFGJ7urf4zNC1I0HAx/VkYto/uxeSeEaWR6p2D5zuj8MbXGsLBRPZL0+RACx99ko7DzjN1/IYQQQgghhBBCCCFcx/wGTFfoYNipPBIAAAAASUVORK5CYII="
                                                    />
                                                </defs>
                                            </svg>
                                            2/3/2025
                                        </span>
                                        <span className="title_manga_2a">
                                            <img
                                                width={14}
                                                height={14}
                                                preserveaspectratio="none"
                                                src="https://media-hosting.imagekit.io//1383d94ae8c748c0/download.png?Expires=1836489064&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Xc6YKJDxSQJwwUIYDxlrtiYwsmYk8C~xITF1W7OE4sQ1yJpBKpgVRR-XDd2JON5G17xr73OcL3fwvAvbraxs0GVTRad7tbJW9KWTxRecDCiM3XXSlJxf4pgnYHpJAZA8acpp6byJyZqIVVf4pAsJt9U51ORZcmFWhue62eKEW-zg5Vr1AfZs9kYEBcaC9EBnfOpA1SQburE2qMPphyj26Op4uzKLBfl05XjuQK9aM-93E-~OuCuLFTWHMlRiZ9MHGefFyF2QuwS7USc6s5Xn19i4R8aE6tifFOgfo6KlOpJVGPzhQmPoz7WLNcYgo2jjTQ9QQ5Gr7MKyUxy0rk~TVA__"
                                            />
                                            2/3/2025
                                        </span>
                                    </div>
                                    <div className="title_manga_3">
                                        <span className="title_manga_3a">
                                            Những fan muốn biết thêm về mối quan hệ của Dae Ho với nhân vật
                                            nữ chính có lẽ sẽ có được nhiều thông tin chuyên sâu hơn trong
                                            Secret Class Chapter 245.
                                        </span>
                                    </div>
                                    <div className="title_manga_4">
                                        <span className="title_manga_4a">
                                            <img
                                                src="https://media-hosting.imagekit.io//55d60f98dbfb4747/avt1.png?Expires=1835257364&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=BGXDi67WtbrUu6MMFpHtgEuuUlB2TUqDdN6ThcWyCgUV-4sH6LgyuD2EZaBuz3nCDzHNSmfHkWwVCDPXI0f~-gLtFRvzq3V9U~iRcYMZV4YSe-yIM-fyTdUwvFkdlYpK2AlFVsMi-mcmTXQI3itXLpic6jw8rwaKWW4KnvScQxq6d9PS1pUWWrgM9FfRlQUXUdaJ~Lnz7oaP7izU6gttdM9tPnzKbY0UfPFy4UB-3I~0uLC9KPlGzqBLzFkwSl0TfZGlxVJWZf8rswqM3mbaeCI0THv8ANBXfdW~WtU69ppXsR3JPebaLJbIxMv0tCzgrnvJAkrfleDkjwK-RvxHvQ__"
                                                id="image0_517_12945"
                                                width="40px"
                                                height="40px"

                                                preserveaspectratio="none"
                                                style={{ marginRight: "15px" }}
                                            />
                                            KURAI TENSHI
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="article_2_right">
                                <img src="https://media-hosting.imagekit.io//e93dae2c8ce54ca3/kagurabachi-chapter-61-600x421.jpeg?Expires=1836490926&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wqDhAAAqfvwdrV7mP95ejI8O-tRidXI6JzbqF1OKIZI1wzcYmsjuZOtYgXIBj70I2SZlDj49BwtNqxq1CkHrwZpNclQSo6pZxWHlm5prrpcwyGcfLKo5YoVUBIIAE-mfML-q4MmC117l096H5tpFgEuxRnoQyhPYWPhW6ntCGsdQNsn7s7KXc100UzAJNZvUS~MZrg5qFcAfyycUSVDukyJ4fhez5GCqMCocqv1hsLDmzPg9rARgikrVXodsX0Ns~ijWg1hdibu~Lu-t3mE5fl5X50MKbRpCyBAeQWhBJY0VOYKkJeofPXxaLMaDxZTMxRFASxDI766uaN-Ih~OqcA__" alt="" />
                            </div>
                        </div>
                        <div className="article_3">
                            <div className="article_3_left">
                                <div className="article_3_left_1">
                                    <div className="article_3_title_left">
                                        <span className="article_3_title_left_text_1">Nổi bật</span>
                                    </div>
                                    <div className="article_3_title_left_1">
                                        <span className="article_3_title_left_text_2">
                                            Các bài viết nổi bật được lựa chọn bởi các biên tập viên có kinh
                                            nghiệm. Nó cũng dựa trên đánh giá của người đọc. Những bài viết
                                            này có rất nhiều sự quan tâm.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="article_3_rigth">
                                <div className="article_3_card">
                                    <div className="article_3_card_silde">
                                        <div className="article_3_right_text_1">
                                            <span className="article_3_right_text_1a">
                                                Hunter x Hunter chap 403: kế hoạch ám sát thất bại c...
                                            </span>
                                        </div>
                                        <div className="article_3_right_img">
                                            <img style={{ width: "197px", height: "197px" }} src="https://media-hosting.imagekit.io//1fbfed4a94444e88/blog_context.jpg?Expires=1836491026&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=JK34G8afaIc1A1FNkJWHZwca4yUA2~I4YW-HIJTCLeO4uByQmFFC6P5ZhMfRC3NdGaW2sUzVevCLr0ijwhwTBgvwi6N-uRWK1FCPeRebb2cnxBtn3LyrKY1AeK1rj265xzacLWZpImC9u8iAQanfBUhOc0lGY-mpYhMv0~aTCIbDnusxZO0MS-MMBmIEPtR3oBTf7XFx9PgprIFQPTHnlhFTxMCHfVShwOEhxOUFs-d9hhsVbN4kccENvOui6gOOih0fDf6qMK9Ln0RxTpLHwBMJqOET0nBzdkmNyih2P5jyADtXm7xUkZ4L7qFKhSyIcdtjPkJ~zilpuWZFoECuaQ__" alt="" />
                                        </div>
                                        <div className="article_3_right_text_2">
                                            <span className="article_3_right_text_2a">14 Oct, 2024</span>
                                            <span className="article_3_right_text_2a">927 lượt xem</span>
                                        </div>
                                    </div>
                                    <div className="article_3_card_silde">
                                        <div className="article_3_right_text_1">
                                            <span className="article_3_right_text_1a">
                                                Hunter x Hunter chap 403: kế hoạch ám sát thất bại c...
                                            </span>
                                        </div>
                                        <div className="article_3_right_img">
                                            <img style={{ width: "197px", height: "197px" }} src="https://media-hosting.imagekit.io//1fbfed4a94444e88/blog_context.jpg?Expires=1836491026&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=JK34G8afaIc1A1FNkJWHZwca4yUA2~I4YW-HIJTCLeO4uByQmFFC6P5ZhMfRC3NdGaW2sUzVevCLr0ijwhwTBgvwi6N-uRWK1FCPeRebb2cnxBtn3LyrKY1AeK1rj265xzacLWZpImC9u8iAQanfBUhOc0lGY-mpYhMv0~aTCIbDnusxZO0MS-MMBmIEPtR3oBTf7XFx9PgprIFQPTHnlhFTxMCHfVShwOEhxOUFs-d9hhsVbN4kccENvOui6gOOih0fDf6qMK9Ln0RxTpLHwBMJqOET0nBzdkmNyih2P5jyADtXm7xUkZ4L7qFKhSyIcdtjPkJ~zilpuWZFoECuaQ__" alt="" />
                                        </div>
                                        <div className="article_3_right_text_2">
                                            <span className="article_3_right_text_2a">14 Oct, 2024</span>
                                            <span className="article_3_right_text_2a">927 lượt xem</span>
                                        </div>
                                    </div>
                                    <div className="article_3_card_silde">
                                        <div className="article_3_right_text_1">
                                            <span className="article_3_right_text_1a">
                                                Hunter x Hunter chap 403: kế hoạch ám sát thất bại c...
                                            </span>
                                        </div>
                                        <div className="article_3_right_img">
                                            <img style={{ width: "197px", height: "197px" }} src="https://media-hosting.imagekit.io//1fbfed4a94444e88/blog_context.jpg?Expires=1836491026&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=JK34G8afaIc1A1FNkJWHZwca4yUA2~I4YW-HIJTCLeO4uByQmFFC6P5ZhMfRC3NdGaW2sUzVevCLr0ijwhwTBgvwi6N-uRWK1FCPeRebb2cnxBtn3LyrKY1AeK1rj265xzacLWZpImC9u8iAQanfBUhOc0lGY-mpYhMv0~aTCIbDnusxZO0MS-MMBmIEPtR3oBTf7XFx9PgprIFQPTHnlhFTxMCHfVShwOEhxOUFs-d9hhsVbN4kccENvOui6gOOih0fDf6qMK9Ln0RxTpLHwBMJqOET0nBzdkmNyih2P5jyADtXm7xUkZ4L7qFKhSyIcdtjPkJ~zilpuWZFoECuaQ__" alt="" />
                                        </div>
                                        <div className="article_3_right_text_2">
                                            <span className="article_3_right_text_2a">14 Oct, 2024</span>
                                            <span className="article_3_right_text_2a">927 lượt xem</span>
                                        </div>
                                    </div>
                                    <div className="article_3_card_silde">
                                        <div className="article_3_right_text_1">
                                            <span className="article_3_right_text_1a">
                                                Hunter x Hunter chap 403: kế hoạch ám sát thất bại c...
                                            </span>
                                        </div>
                                        <div className="article_3_right_img">
                                            <img style={{ width: "197px", height: "197px" }} src="https://media-hosting.imagekit.io//1fbfed4a94444e88/blog_context.jpg?Expires=1836491026&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=JK34G8afaIc1A1FNkJWHZwca4yUA2~I4YW-HIJTCLeO4uByQmFFC6P5ZhMfRC3NdGaW2sUzVevCLr0ijwhwTBgvwi6N-uRWK1FCPeRebb2cnxBtn3LyrKY1AeK1rj265xzacLWZpImC9u8iAQanfBUhOc0lGY-mpYhMv0~aTCIbDnusxZO0MS-MMBmIEPtR3oBTf7XFx9PgprIFQPTHnlhFTxMCHfVShwOEhxOUFs-d9hhsVbN4kccENvOui6gOOih0fDf6qMK9Ln0RxTpLHwBMJqOET0nBzdkmNyih2P5jyADtXm7xUkZ4L7qFKhSyIcdtjPkJ~zilpuWZFoECuaQ__" alt="" />
                                        </div>
                                        <div className="article_3_right_text_2">
                                            <span className="article_3_right_text_2a">14 Oct, 2024</span>
                                            <span className="article_3_right_text_2a">927 lượt xem</span>
                                        </div>
                                    </div>
                                    <div className="article_3_card_silde">
                                        <div className="article_3_right_text_1">
                                            <span className="article_3_right_text_1a">
                                                Hunter x Hunter chap 403: kế hoạch ám sát thất bại c...
                                            </span>
                                        </div>
                                        <div className="article_3_right_img">
                                            <img style={{ width: "197px", height: "197px" }} src="https://media-hosting.imagekit.io//1fbfed4a94444e88/blog_context.jpg?Expires=1836491026&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=JK34G8afaIc1A1FNkJWHZwca4yUA2~I4YW-HIJTCLeO4uByQmFFC6P5ZhMfRC3NdGaW2sUzVevCLr0ijwhwTBgvwi6N-uRWK1FCPeRebb2cnxBtn3LyrKY1AeK1rj265xzacLWZpImC9u8iAQanfBUhOc0lGY-mpYhMv0~aTCIbDnusxZO0MS-MMBmIEPtR3oBTf7XFx9PgprIFQPTHnlhFTxMCHfVShwOEhxOUFs-d9hhsVbN4kccENvOui6gOOih0fDf6qMK9Ln0RxTpLHwBMJqOET0nBzdkmNyih2P5jyADtXm7xUkZ4L7qFKhSyIcdtjPkJ~zilpuWZFoECuaQ__" alt="" />
                                        </div>
                                        <div className="article_3_right_text_2">
                                            <span className="article_3_right_text_2a">14 Oct, 2024</span>
                                            <span className="article_3_right_text_2a">927 lượt xem</span>
                                        </div>
                                    </div>
                                    <div className="article_3_card_silde">
                                        <div className="article_3_right_text_1">
                                            <span className="article_3_right_text_1a">
                                                Hunter x Hunter chap 403: kế hoạch ám sát thất bại c...
                                            </span>
                                        </div>
                                        <div className="article_3_right_img">
                                            <img src="https://media-hosting.imagekit.io//1fbfed4a94444e88/blog_context.jpg?Expires=1836491026&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=JK34G8afaIc1A1FNkJWHZwca4yUA2~I4YW-HIJTCLeO4uByQmFFC6P5ZhMfRC3NdGaW2sUzVevCLr0ijwhwTBgvwi6N-uRWK1FCPeRebb2cnxBtn3LyrKY1AeK1rj265xzacLWZpImC9u8iAQanfBUhOc0lGY-mpYhMv0~aTCIbDnusxZO0MS-MMBmIEPtR3oBTf7XFx9PgprIFQPTHnlhFTxMCHfVShwOEhxOUFs-d9hhsVbN4kccENvOui6gOOih0fDf6qMK9Ln0RxTpLHwBMJqOET0nBzdkmNyih2P5jyADtXm7xUkZ4L7qFKhSyIcdtjPkJ~zilpuWZFoECuaQ__" alt="" />
                                        </div>
                                        <div className="article_3_right_text_2">
                                            <span className="article_3_right_text_2a">14 Oct, 2024</span>
                                            <span className="article_3_right_text_2a">927 lượt xem</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </main>
                <div className="article_4">
                    <div className="article_4_left">
                        <span className="title_new_left">BÀI VIẾT MỚI</span>
                        <div className="card_left">
                            <div className="card_left_1">
                                <img
                                    src="https://media-hosting.imagekit.io//ad79d5602821404d/blog_img.png?Expires=1836489263&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=phLdBI46zuhJxYKy9FRnMjS-E9zVNAQwcFGtFhvkwIkOkt3RG4HCOue7JaKEhG4IeBX7rzk6toh~0MbAOomB2Bu9Vrc4BWlaVpcXcDT6Uej81wj8beU2V5J0DBf9Z4uRG10bEcKrl4NTUznrg1b5uwoPVc3MZ5-ewKoKkBVyQ3CqaSESZwo2r5UEzTv3Z52j7zbOJ5QIrZoBRrrCoJPAa3xSZd-p8KG~UUJ4isr3Zmeeou3jPiaGFGOmDkEKUXmfcI-zDXC1wSAQTyqzmDPdyKrtsumiH78siGtnLLwEwfvB4M4pBnLKemFDpb9DGJynh8wVsSwG00bNrkhZ4usUfA__"
                                    alt=""
                                />
                            </div>
                            <div className="card_left_2">
                                <div className="card_left_2_title_background">
                                    <span className="title_manga">
                                        <svg
                                            width={17}
                                            height={17}
                                            viewBox="0 0 15 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5ZM1.96953 7.5C1.96953 10.5544 4.44561 13.0305 7.5 13.0305C10.5544 13.0305 13.0305 10.5544 13.0305 7.5C13.0305 4.44561 10.5544 1.96953 7.5 1.96953C4.44561 1.96953 1.96953 4.44561 1.96953 7.5Z"
                                                fill="white"
                                            />
                                            <circle cx="7.5" cy="7.5" r="3.5" fill="white" />
                                        </svg>
                                        MANGA
                                    </span>
                                </div>
                                <div className="card_left_2_title_1">
                                    <span className="card_left_2_text_1">
                                        RuriDragon Chapter 26: Dạng giới hạn
                                    </span>
                                </div>
                                <div className="card_left_2_title_2">
                                    <span className="card_left_2_text_2">13 Dec, 2024</span>
                                    <span className="card_left_2_text_2">
                                        <img
                                            id=""
                                            width={13}
                                            height={13}
                                            preserveaspectratio="none"
                                            src="https://media-hosting.imagekit.io//1383d94ae8c748c0/download.png?Expires=1836489064&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Xc6YKJDxSQJwwUIYDxlrtiYwsmYk8C~xITF1W7OE4sQ1yJpBKpgVRR-XDd2JON5G17xr73OcL3fwvAvbraxs0GVTRad7tbJW9KWTxRecDCiM3XXSlJxf4pgnYHpJAZA8acpp6byJyZqIVVf4pAsJt9U51ORZcmFWhue62eKEW-zg5Vr1AfZs9kYEBcaC9EBnfOpA1SQburE2qMPphyj26Op4uzKLBfl05XjuQK9aM-93E-~OuCuLFTWHMlRiZ9MHGefFyF2QuwS7USc6s5Xn19i4R8aE6tifFOgfo6KlOpJVGPzhQmPoz7WLNcYgo2jjTQ9QQ5Gr7MKyUxy0rk~TVA__"
                                        />
                                        123 lượt xem
                                    </span>
                                </div>
                                <div className="card_left_2_title_3">
                                    <span className="card_left_2_text_3">
                                        RuriDragon Chapter 26 có thể khám phá xung đột giữa Yoshioka và
                                        học sinh đã thách đấu anh ta. Chi tiết về lịch sử của họ hoặc lý
                                        do cho mối hận thù có thể sẽ được tiết lộ.
                                    </span>
                                </div>
                                <div className="card_left_2_title_4">
                                    <span className="card_left_2_text_4">XEM THÊM-&gt;</span>
                                </div>
                            </div>
                        </div>
                        <div className="card_left">
                            <div className="card_left_1">
                                <img
                                    src="https://media-hosting.imagekit.io//ad79d5602821404d/blog_img.png?Expires=1836489263&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=phLdBI46zuhJxYKy9FRnMjS-E9zVNAQwcFGtFhvkwIkOkt3RG4HCOue7JaKEhG4IeBX7rzk6toh~0MbAOomB2Bu9Vrc4BWlaVpcXcDT6Uej81wj8beU2V5J0DBf9Z4uRG10bEcKrl4NTUznrg1b5uwoPVc3MZ5-ewKoKkBVyQ3CqaSESZwo2r5UEzTv3Z52j7zbOJ5QIrZoBRrrCoJPAa3xSZd-p8KG~UUJ4isr3Zmeeou3jPiaGFGOmDkEKUXmfcI-zDXC1wSAQTyqzmDPdyKrtsumiH78siGtnLLwEwfvB4M4pBnLKemFDpb9DGJynh8wVsSwG00bNrkhZ4usUfA__"
                                    alt=""
                                />
                            </div>
                            <div className="card_left_2">
                                <div className="card_left_2_title_background">
                                    <span className="title_manga">
                                        <svg
                                            width={17}
                                            height={17}
                                            viewBox="0 0 15 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5ZM1.96953 7.5C1.96953 10.5544 4.44561 13.0305 7.5 13.0305C10.5544 13.0305 13.0305 10.5544 13.0305 7.5C13.0305 4.44561 10.5544 1.96953 7.5 1.96953C4.44561 1.96953 1.96953 4.44561 1.96953 7.5Z"
                                                fill="white"
                                            />
                                            <circle cx="7.5" cy="7.5" r="3.5" fill="white" />
                                        </svg>
                                        MANGA
                                    </span>
                                </div>
                                <div className="card_left_2_title_1">
                                    <span className="card_left_2_text_1">
                                        RuriDragon Chapter 26: Dạng giới hạn
                                    </span>
                                </div>
                                <div className="card_left_2_title_2">
                                    <span className="card_left_2_text_2">13 Dec, 2024</span>
                                    <span className="card_left_2_text_2">
                                        <img
                                            id=""
                                            width={13}
                                            height={13}
                                            preserveaspectratio="none"
                                            src="https://media-hosting.imagekit.io//1383d94ae8c748c0/download.png?Expires=1836489064&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Xc6YKJDxSQJwwUIYDxlrtiYwsmYk8C~xITF1W7OE4sQ1yJpBKpgVRR-XDd2JON5G17xr73OcL3fwvAvbraxs0GVTRad7tbJW9KWTxRecDCiM3XXSlJxf4pgnYHpJAZA8acpp6byJyZqIVVf4pAsJt9U51ORZcmFWhue62eKEW-zg5Vr1AfZs9kYEBcaC9EBnfOpA1SQburE2qMPphyj26Op4uzKLBfl05XjuQK9aM-93E-~OuCuLFTWHMlRiZ9MHGefFyF2QuwS7USc6s5Xn19i4R8aE6tifFOgfo6KlOpJVGPzhQmPoz7WLNcYgo2jjTQ9QQ5Gr7MKyUxy0rk~TVA__"
                                        />
                                        123 lượt xem
                                    </span>
                                </div>
                                <div className="card_left_2_title_3">
                                    <span className="card_left_2_text_3">
                                        RuriDragon Chapter 26 có thể khám phá xung đột giữa Yoshioka và
                                        học sinh đã thách đấu anh ta. Chi tiết về lịch sử của họ hoặc lý
                                        do cho mối hận thù có thể sẽ được tiết lộ.
                                    </span>
                                </div>
                                <div className="card_left_2_title_4">
                                    <span className="card_left_2_text_4">XEM THÊM-&gt;</span>
                                </div>
                            </div>
                        </div>
                        <div className="card_left">
                            <div className="card_left_1">
                                <img
                                    src="https://media-hosting.imagekit.io//ad79d5602821404d/blog_img.png?Expires=1836489263&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=phLdBI46zuhJxYKy9FRnMjS-E9zVNAQwcFGtFhvkwIkOkt3RG4HCOue7JaKEhG4IeBX7rzk6toh~0MbAOomB2Bu9Vrc4BWlaVpcXcDT6Uej81wj8beU2V5J0DBf9Z4uRG10bEcKrl4NTUznrg1b5uwoPVc3MZ5-ewKoKkBVyQ3CqaSESZwo2r5UEzTv3Z52j7zbOJ5QIrZoBRrrCoJPAa3xSZd-p8KG~UUJ4isr3Zmeeou3jPiaGFGOmDkEKUXmfcI-zDXC1wSAQTyqzmDPdyKrtsumiH78siGtnLLwEwfvB4M4pBnLKemFDpb9DGJynh8wVsSwG00bNrkhZ4usUfA__"
                                    alt=""
                                />
                            </div>
                            <div className="card_left_2">
                                <div className="card_left_2_title_background">
                                    <span className="title_manga">
                                        <svg
                                            width={17}
                                            height={17}
                                            viewBox="0 0 15 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5ZM1.96953 7.5C1.96953 10.5544 4.44561 13.0305 7.5 13.0305C10.5544 13.0305 13.0305 10.5544 13.0305 7.5C13.0305 4.44561 10.5544 1.96953 7.5 1.96953C4.44561 1.96953 1.96953 4.44561 1.96953 7.5Z"
                                                fill="white"
                                            />
                                            <circle cx="7.5" cy="7.5" r="3.5" fill="white" />
                                        </svg>
                                        MANGA
                                    </span>
                                </div>
                                <div className="card_left_2_title_1">
                                    <span className="card_left_2_text_1">
                                        RuriDragon Chapter 26: Dạng giới hạn
                                    </span>
                                </div>
                                <div className="card_left_2_title_2">
                                    <span className="card_left_2_text_2">13 Dec, 2024</span>
                                    <span className="card_left_2_text_2">
                                        <img
                                            id=""
                                            width={13}
                                            height={13}
                                            preserveaspectratio="none"
                                            src="https://media-hosting.imagekit.io//1383d94ae8c748c0/download.png?Expires=1836489064&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Xc6YKJDxSQJwwUIYDxlrtiYwsmYk8C~xITF1W7OE4sQ1yJpBKpgVRR-XDd2JON5G17xr73OcL3fwvAvbraxs0GVTRad7tbJW9KWTxRecDCiM3XXSlJxf4pgnYHpJAZA8acpp6byJyZqIVVf4pAsJt9U51ORZcmFWhue62eKEW-zg5Vr1AfZs9kYEBcaC9EBnfOpA1SQburE2qMPphyj26Op4uzKLBfl05XjuQK9aM-93E-~OuCuLFTWHMlRiZ9MHGefFyF2QuwS7USc6s5Xn19i4R8aE6tifFOgfo6KlOpJVGPzhQmPoz7WLNcYgo2jjTQ9QQ5Gr7MKyUxy0rk~TVA__"
                                        />
                                        123 lượt xem
                                    </span>
                                </div>
                                <div className="card_left_2_title_3">
                                    <span className="card_left_2_text_3">
                                        RuriDragon Chapter 26 có thể khám phá xung đột giữa Yoshioka và
                                        học sinh đã thách đấu anh ta. Chi tiết về lịch sử của họ hoặc lý
                                        do cho mối hận thù có thể sẽ được tiết lộ.
                                    </span>
                                </div>
                                <div className="card_left_2_title_4">
                                    <span className="card_left_2_text_4">XEM THÊM-&gt;</span>
                                </div>
                            </div>
                        </div>
                        <div className="card_left">
                            <div className="card_left_1">
                                <img
                                    src="https://media-hosting.imagekit.io//ad79d5602821404d/blog_img.png?Expires=1836489263&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=phLdBI46zuhJxYKy9FRnMjS-E9zVNAQwcFGtFhvkwIkOkt3RG4HCOue7JaKEhG4IeBX7rzk6toh~0MbAOomB2Bu9Vrc4BWlaVpcXcDT6Uej81wj8beU2V5J0DBf9Z4uRG10bEcKrl4NTUznrg1b5uwoPVc3MZ5-ewKoKkBVyQ3CqaSESZwo2r5UEzTv3Z52j7zbOJ5QIrZoBRrrCoJPAa3xSZd-p8KG~UUJ4isr3Zmeeou3jPiaGFGOmDkEKUXmfcI-zDXC1wSAQTyqzmDPdyKrtsumiH78siGtnLLwEwfvB4M4pBnLKemFDpb9DGJynh8wVsSwG00bNrkhZ4usUfA__"
                                    alt=""
                                />
                            </div>
                            <div className="card_left_2">
                                <div className="card_left_2_title_background">
                                    <span className="title_manga">
                                        <svg
                                            width={17}
                                            height={17}
                                            viewBox="0 0 15 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5ZM1.96953 7.5C1.96953 10.5544 4.44561 13.0305 7.5 13.0305C10.5544 13.0305 13.0305 10.5544 13.0305 7.5C13.0305 4.44561 10.5544 1.96953 7.5 1.96953C4.44561 1.96953 1.96953 4.44561 1.96953 7.5Z"
                                                fill="white"
                                            />
                                            <circle cx="7.5" cy="7.5" r="3.5" fill="white" />
                                        </svg>
                                        MANGA
                                    </span>
                                </div>
                                <div className="card_left_2_title_1">
                                    <span className="card_left_2_text_1">
                                        RuriDragon Chapter 26: Dạng giới hạn
                                    </span>
                                </div>
                                <div className="card_left_2_title_2">
                                    <span className="card_left_2_text_2">13 Dec, 2024</span>
                                    <span className="card_left_2_text_2">
                                        <img
                                            id=""
                                            width={13}
                                            height={13}
                                            preserveaspectratio="none"
                                            src="https://media-hosting.imagekit.io//1383d94ae8c748c0/download.png?Expires=1836489064&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Xc6YKJDxSQJwwUIYDxlrtiYwsmYk8C~xITF1W7OE4sQ1yJpBKpgVRR-XDd2JON5G17xr73OcL3fwvAvbraxs0GVTRad7tbJW9KWTxRecDCiM3XXSlJxf4pgnYHpJAZA8acpp6byJyZqIVVf4pAsJt9U51ORZcmFWhue62eKEW-zg5Vr1AfZs9kYEBcaC9EBnfOpA1SQburE2qMPphyj26Op4uzKLBfl05XjuQK9aM-93E-~OuCuLFTWHMlRiZ9MHGefFyF2QuwS7USc6s5Xn19i4R8aE6tifFOgfo6KlOpJVGPzhQmPoz7WLNcYgo2jjTQ9QQ5Gr7MKyUxy0rk~TVA__"
                                        />
                                        123 lượt xem
                                    </span>
                                </div>
                                <div className="card_left_2_title_3">
                                    <span className="card_left_2_text_3">
                                        RuriDragon Chapter 26 có thể khám phá xung đột giữa Yoshioka và
                                        học sinh đã thách đấu anh ta. Chi tiết về lịch sử của họ hoặc lý
                                        do cho mối hận thù có thể sẽ được tiết lộ.
                                    </span>
                                </div>
                                <div className="card_left_2_title_4">
                                    <span className="card_left_2_text_4">XEM THÊM-&gt;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="article_4_rigth">
                        <span className="title_new_right">Theo dõi chúng tôi</span>
                        <div className="card_icon_left">
                            <img src="img/facebook.png" alt="" />
                            <img src="img/facebook.png" alt="" />
                        </div>
                        <div className="card_icon_right">
                            <img src="img/facebook.png" alt="" />
                            <img src="img/facebook.png" alt="" />
                        </div>
                        <div className="card_right">
                            <span className="title_trend">PHỔ BIẾN TRENDING</span>
                            <div className="card_right_0">
                                <div className="card_right_1">
                                    <img src="img/blog_context_10.png" alt="" />
                                </div>
                                <div className="card_right_2">
                                    <div className="card_right_2_title_background">
                                        <span className="title_manga">
                                            <svg
                                                width={17}
                                                height={17}
                                                viewBox="0 0 15 17"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5ZM1.96953 7.5C1.96953 10.5544 4.44561 13.0305 7.5 13.0305C10.5544 13.0305 13.0305 10.5544 13.0305 7.5C13.0305 4.44561 10.5544 1.96953 7.5 1.96953C4.44561 1.96953 1.96953 4.44561 1.96953 7.5Z"
                                                    fill="white"
                                                />
                                                <circle cx="7.5" cy="7.5" r="3.5" fill="white" />
                                            </svg>
                                            TIỂU SỬ
                                        </span>
                                    </div>
                                    <div className="card_right_2_title_1">
                                        <span className="card_right_2_text_1">
                                            'Mã nguồn' chuyện đời tỷ phú Bill Ga...
                                        </span>
                                    </div>
                                    <div className="card_right_2_title_2">
                                        <span className="card_right_2_text_2">05 Dec, 2024</span>
                                        <span className="card_right_2_text_3">5,579 lượt xem</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card_right_0">
                                <div className="card_right_1">
                                    <img src="img/blog_context_10.png" alt="" />
                                </div>
                                <div className="card_right_2">
                                    <div className="card_right_2_title_background">
                                        <span className="title_manga">
                                            <svg
                                                width={17}
                                                height={17}
                                                viewBox="0 0 15 17"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5ZM1.96953 7.5C1.96953 10.5544 4.44561 13.0305 7.5 13.0305C10.5544 13.0305 13.0305 10.5544 13.0305 7.5C13.0305 4.44561 10.5544 1.96953 7.5 1.96953C4.44561 1.96953 1.96953 4.44561 1.96953 7.5Z"
                                                    fill="white"
                                                />
                                                <circle cx="7.5" cy="7.5" r="3.5" fill="white" />
                                            </svg>
                                            TIỂU SỬ
                                        </span>
                                    </div>
                                    <div className="card_right_2_title_1">
                                        <span className="card_right_2_text_1">
                                            'Mã nguồn' chuyện đời tỷ phú Bill Ga...
                                        </span>
                                    </div>
                                    <div className="card_right_2_title_2">
                                        <span className="card_right_2_text_2">05 Dec, 2024</span>
                                        <span className="card_right_2_text_3">5,579 lượt xem</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card_right_0">
                                <div className="card_right_1">
                                    <img src="img/blog_context_10.png" alt="" />
                                </div>
                                <div className="card_right_2">
                                    <div className="card_right_2_title_background">
                                        <span className="title_manga">
                                            <svg
                                                width={17}
                                                height={17}
                                                viewBox="0 0 15 17"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5ZM1.96953 7.5C1.96953 10.5544 4.44561 13.0305 7.5 13.0305C10.5544 13.0305 13.0305 10.5544 13.0305 7.5C13.0305 4.44561 10.5544 1.96953 7.5 1.96953C4.44561 1.96953 1.96953 4.44561 1.96953 7.5Z"
                                                    fill="white"
                                                />
                                                <circle cx="7.5" cy="7.5" r="3.5" fill="white" />
                                            </svg>
                                            TIỂU SỬ
                                        </span>
                                    </div>
                                    <div className="card_right_2_title_1">
                                        <span className="card_right_2_text_1">
                                            'Mã nguồn' chuyện đời tỷ phú Bill Ga...
                                        </span>
                                    </div>
                                    <div className="card_right_2_title_2">
                                        <span className="card_right_2_text_2">05 Dec, 2024</span>
                                        <span className="card_right_2_text_3">5,579 lượt xem</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card_right_0">
                                <div className="card_right_1">
                                    <img src="img/blog_context_10.png" alt="" />
                                </div>
                                <div className="card_right_2">
                                    <div className="card_right_2_title_background">
                                        <span className="title_manga">
                                            <svg
                                                width={17}
                                                height={17}
                                                viewBox="0 0 15 17"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5ZM1.96953 7.5C1.96953 10.5544 4.44561 13.0305 7.5 13.0305C10.5544 13.0305 13.0305 10.5544 13.0305 7.5C13.0305 4.44561 10.5544 1.96953 7.5 1.96953C4.44561 1.96953 1.96953 4.44561 1.96953 7.5Z"
                                                    fill="white"
                                                />
                                                <circle cx="7.5" cy="7.5" r="3.5" fill="white" />
                                            </svg>
                                            TIỂU SỬ
                                        </span>
                                    </div>
                                    <div className="card_right_2_title_1">
                                        <span className="card_right_2_text_1">
                                            'Mã nguồn' chuyện đời tỷ phú Bill Ga...
                                        </span>
                                    </div>
                                    <div className="card_right_2_title_2">
                                        <span className="card_right_2_text_2">05 Dec, 2024</span>
                                        <span className="card_right_2_text_3">5,579 lượt xem</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card_right_0">
                                <div className="card_right_1">
                                    <img src="img/blog_context_10.png" alt="" />
                                </div>
                                <div className="card_right_2">
                                    <div className="card_right_2_title_background">
                                        <span className="title_manga">
                                            <svg
                                                width={17}
                                                height={17}
                                                viewBox="0 0 15 17"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5ZM1.96953 7.5C1.96953 10.5544 4.44561 13.0305 7.5 13.0305C10.5544 13.0305 13.0305 10.5544 13.0305 7.5C13.0305 4.44561 10.5544 1.96953 7.5 1.96953C4.44561 1.96953 1.96953 4.44561 1.96953 7.5Z"
                                                    fill="white"
                                                />
                                                <circle cx="7.5" cy="7.5" r="3.5" fill="white" />
                                            </svg>
                                            TIỂU SỬ
                                        </span>
                                    </div>
                                    <div className="card_right_2_title_1">
                                        <span className="card_right_2_text_1">
                                            'Mã nguồn' chuyện đời tỷ phú Bill Ga...
                                        </span>
                                    </div>
                                    <div className="card_right_2_title_2">
                                        <span className="card_right_2_text_2">05 Dec, 2024</span>
                                        <span className="card_right_2_text_3">5,579 lượt xem</span>
                                    </div>
                                </div>
                            </div>
                            <img
                                className="card_slide"
                                id="slideshow"
                                src="img/book_1.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="article_5">
                <div className="article_nav">
                    <div className="title_nav">
                        <span className="title_left">NỔI BẬT</span>
                        <ul className="title_right">
                            <li>
                                <a className="title_nav_right_link" href="">
                                    MANGA
                                </a>
                            </li>
                            <li>
                                <a className="title_nav_right_link" href="">
                                    TECH
                                </a>
                            </li>
                            <li>
                                <a className="title_nav_right_link" href="">
                                    VIETNAM
                                </a>
                            </li>
                            <li>
                                <a className="title_nav_right_link" href="">
                                    EDUCATION
                                </a>
                            </li>
                            <li>
                                <a className="title_nav_right_link" href="">
                                    NEWS
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="article_blog">
                    <div className="article_5_left">
                        <div className="article_5_left_img">
                            <div className="title_background">
                                <span className="title_manga">
                                    <svg
                                        width={17}
                                        height={17}
                                        viewBox="0 0 15 17"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5ZM1.96953 7.5C1.96953 10.5544 4.44561 13.0305 7.5 13.0305C10.5544 13.0305 13.0305 10.5544 13.0305 7.5C13.0305 4.44561 10.5544 1.96953 7.5 1.96953C4.44561 1.96953 1.96953 4.44561 1.96953 7.5Z"
                                            fill="white"
                                        />
                                        <circle cx="7.5" cy="7.5" r="3.5" fill="white" />
                                    </svg>
                                    MANGA
                                </span>
                            </div>
                        </div>
                        <div className="article_5_left_text">
                            <div className="article_5_left_text_1">
                                <span>Mercenary Enrollment Chapter 219: Quá khứ của Ijin</span>
                            </div>
                            <div className="article_5_left_text_2">
                                <span>13 Dec, 2024</span>
                                <span>19 phút đọc</span>
                                <span>114 lượt xem</span>
                            </div>
                            <div className="article_5_left_text_3">
                                <span>
                                    Mercenary Enrollment Chapter 219 sẽ là một chương đầy hành động và
                                    hồi hộp, nêu bật chiến lược của Ijin trong trận chiến sắp tới và
                                    sự biến đổi của anh từ một lính đánh thuê thành một ...
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="article_5_right">
                        <div className="article_5_right_top">
                            <div className="article_5_right_img">
                                <img src="img/kagurabachi-chapter-61-600x421a.png" alt="" />
                                <div className="article_5_right_text">
                                    <div className="article_5_right_text_1">
                                        <span>Kagurabachi Chapter 61: Liên minh của Chihiro v...</span>
                                    </div>
                                    <div className="article_5_right_text_2">
                                        <span>13 Dec</span>
                                        <span>159 lượt xem</span>
                                    </div>
                                </div>
                            </div>
                            <div className="article_5_right_img">
                                <img src="img/kagurabachi-chapter-61-600x421a.png" alt="" />
                                <div className="article_5_right_text">
                                    <div className="article_5_right_text_1">
                                        <span>Kagurabachi Chapter 61: Liên minh của Chihiro v...</span>
                                    </div>
                                    <div className="article_5_right_text_2">
                                        <span>13 Dec</span>
                                        <span>159 lượt xem</span>
                                    </div>
                                </div>
                            </div>
                            <div className="article_5_right_img">
                                <img src="img/kagurabachi-chapter-61-600x421a.png" alt="" />
                                <div className="article_5_right_text">
                                    <div className="article_5_right_text_1">
                                        <span>Kagurabachi Chapter 61: Liên minh của Chihiro v...</span>
                                    </div>
                                    <div className="article_5_right_text_2">
                                        <span>13 Dec</span>
                                        <span>159 lượt xem</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="article_5_right_bot">
                            <div className="article_5_right_img">
                                <img src="img/kagurabachi-chapter-61-600x421a.png" alt="" />
                                <div className="article_5_right_text">
                                    <div className="article_5_right_text_1">
                                        <span>Kagurabachi Chapter 61: Liên minh của Chihiro v...</span>
                                    </div>
                                    <div className="article_5_right_text_2">
                                        <span>13 Dec</span>
                                        <span>159 lượt xem</span>
                                    </div>
                                </div>
                            </div>
                            <div className="article_5_right_img">
                                <img src="img/kagurabachi-chapter-61-600x421a.png" alt="" />
                                <div className="article_5_right_text">
                                    <div className="article_5_right_text_1">
                                        <span>Kagurabachi Chapter 61: Liên minh của Chihiro v...</span>
                                    </div>
                                    <div className="article_5_right_text_2">
                                        <span>13 Dec</span>
                                        <span>159 lượt xem</span>
                                    </div>
                                </div>
                            </div>
                            <div className="article_5_right_img">
                                <img src="img/kagurabachi-chapter-61-600x421a.png" alt="" />
                                <div className="article_5_right_text">
                                    <div className="article_5_right_text_1">
                                        <span>Kagurabachi Chapter 61: Liên minh của Chihiro v...</span>
                                    </div>
                                    <div className="article_5_right_text_2">
                                        <span>13 Dec</span>
                                        <span>159 lượt xem</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='blog-container'>
                <div className='blog_product'>
                    <div
                        className="d-flex justify-content-between align-items-center"
                        style={{ borderBottom: "1px solid rgb(190, 188, 188)" }}
                    >
                        <div className="sptt">Sản phẩm hot</div>
                        <div className="d-flex align-items-center gap-3">
                            <div
                                style={{ color: "#917fb3", fontSize: 25, cursor: "pointer" }}
                                id="prev"
                            >
                                &lt;
                            </div>
                            <div
                                style={{ color: "#917fb3", fontSize: 25, cursor: "pointer" }}
                                id="next"
                            >
                                &gt;
                            </div>
                        </div>
                    </div>

                    {/* product start */}
                    <div className="list-product">
                        <div className="products-wrapper">

                            {productHot && productHot.length > 0 && images && images.length > 0 ? (
                                productHot.map(product => {
                                    const productImage = images.find(image => image.productId === product._id);
                                    const productDiscount = discounts.filter(dis => dis).find((dis) => dis._id === product.discount);
                                    // Tính current price nếu có discount
                                    const discountPercent = productDiscount ? Number(productDiscount.value) : 0;
                                    const currentPrice = Number(product.price) * ((100 - discountPercent) / 100);

                                    return (
                                        <div className="mobile-product" key={product._id}>
                                            <div className="product-image">
                                                <img src={productImage ? productImage.url : ''} alt={product.name} />
                                            </div>
                                            <div className="product-details">
                                                <Link className="product-name" to={`/product/${product._id}`}>
                                                    {product.name}
                                                </Link>
                                                <div className="price-container">
                                                    {/* Giá sau giảm, tức là giá gốc trừ đi discount */}
                                                    <div className="product-price">
                                                        {currentPrice.toLocaleString("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND"
                                                        })}
                                                    </div>
                                                    <div className="sale-badge">
                                                        -{discountPercent > 0 ? discountPercent : ''}%
                                                    </div>
                                                </div>
                                                <div className="price-sold-container">
                                                    {/* Hiển thị giá gốc, ở đây lưu trong product.price */}
                                                    <div className="product-old-price">
                                                        {Number(product.price).toLocaleString("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND"
                                                        })}
                                                    </div>
                                                    <div className="product-sold">Đã bán {product.sale_count}</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>Đang tải sản phẩm...</p>
                            )}


                        </div>
                        {/* Repeat the above structure for each product, removing unique classes */}
                    </div>
                    {/* product end */}

                </div>

            </div >

        </>
    );
};
export default Blog;
