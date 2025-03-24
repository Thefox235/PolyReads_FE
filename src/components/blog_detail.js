import React, { useState, useEffect } from 'react';
import '../asset/css/blog-detail.css'
import {
    getImages,
    getProductHot,
    getDiscounts
} from '../api/server';
import { height } from '@fortawesome/free-solid-svg-icons/fa0';
import { Link } from 'react-router-dom';
const BlogDetail = () => {
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
                    <h1>Blog</h1>
                    <p style={{ fontSize: 20, fontWeight: 400 }}>
                        <a href="/">Trang chủ</a> &gt; Blog
                    </p>
                </div>
            </section>

            <div className='blog-container'>
                <main style={{ paddingTop: "30px" }}>
                    <article>
                        <div
                            className="d-flex justify-content-between align-items-center"
                            style={{ borderBottom: "1px solid rgb(190, 188, 188)" }}
                        >
                            <div className="title_top_menu tab_link_module">
                                <h3><a href="new-arrivals" title="Sản phẩm hot">Tất cả bài viết</a></h3>
                            </div>
                            <div className="d-flex align-items-center gap-3">

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

                        <div className="detail_article_3">

                            <div className="detail_article_3_left">
                                
                                <div className="detail_article_3_left_1">
                                    <p>
                                        abc
                                    </p>
                                </div>

                                <div className="detail_article_3_left_4">
                                    {/* icon fb */}
                                    <svg
                                        width={35}
                                        height={35}
                                        viewBox="0 0 35 35"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                    >
                                        <circle cx="17.5" cy="17.5" r="17.5" fill="#3F51B5" />
                                        <rect width={35} height={35} fill="url(#pattern0_2_1355)" />
                                        <defs>
                                            <pattern
                                                id="pattern0_2_1355"
                                                patternContentUnits="objectBoundingBox"
                                                width={1}
                                                height={1}
                                            >
                                                <use xlinkHref="#image0_2_1355" transform="scale(0.01)" />
                                            </pattern>
                                            <image
                                                id="image0_2_1355"
                                                width={100}
                                                height={100}
                                                preserveAspectRatio="none"
                                                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD0ElEQVR4nO2dy0tUURzHb9vqbymjbd6fktJGmHtGlKgxg7CN1CKVMJHcFBEtihZBFG0KgsBFc85Y2sNiypQKKQoLcXR8ZvRypHB8nDiTkIux7jj33nPG+X7gtx3u+X3Oe+7Mz7IAAAAAAAAAAAAAAChS7OrYLnJ4xA6LJpvxk5sywqJJtZFCvMQykcrK+9uIiXZyxBgxIYspbEeM2g5vUzmwTKAsFNtrO2Jad2JIdzh8ikLRMq0yKMQP24wvak8GMyQcnraZOKRFRmmY2+SIBe1JYAZKCfPyQGVQzePtmKbEv8RM7q66uzU4IWoB190TmdlhM3EqIB1yCzGe1N1gKoDdl8pVMOcMAxpMBRDlLLrTdyEU5nW6G0oFEqUsdtB/IQ5v0d1QKpRweIv/Qpjo0N5QVjDRASFMuwQIIf2JhxDSn2wIIQ+SFGnslReuvJXdvRPyzfuvMpFMyc9ffsm5VDprjE/NQwj50FsbW5/L/tezMle+/ViAEPJYxuXr7+TyykrOMiCEeT8yrt4c2pAICPFBxtHmuFxc2tjIgBAfhDwb+CTzBWsI80ZG9ZGHcnk5v9EBIcy70XHm4mDeMiCEeSfkTnQkp6SLB+Pyxu2PmTPK2jh7aTCf58BdFq0mo++lu/UjNZ/OTG9+rGEQwv4mQ53C3fD0xbRfMiCE1iRjeHTOlRDek4SQICKRTLkS0hkbhRAIKcJvDBMYIfolEIToTXpFTZc8cbo/a8zM/nS1hsQHZtb9DBXH2vryecbiOoeE6nuk3wwNf4cQMkiI+mYRI4SZI+TarQ8QQgYJaT//CkLIICH1x59ACBkiZGlpRVbUdkEIGSIkOZnXK0DY9npNvH8GQiiHHlgWFrKqrjtrjE2kXN/2rvcZ+/bfgxDy6NCIuywDTu4EIfoTTxBizl0WQYhZl4sEIRBCuXWM4rp+J4wQCCGMEIERgilLeDV1Yg2h1WTgpG5YJPAakH4JBCH6E08QgnMIYVEXGCE4qQtsewlrCO6yOvH7EOyyPAW3vQK7LMIuCyOEsMvCSX1T/01swoTLxUD+JlZVljEg4VQAQuywOOC/kBAv0Z1schHqZwQNzfH/Rm3DI9+eYU91bIfvQjJSmBjRnXAyPGzGE1ZQqJpLuhtMpocjWoMtAqZqLuluNDMzbIePB1rQRWGHoqUoeSSyjAye1lYcTBXAyjyAAb2STAhVk8vhEUsnqjeomkvak8H0T1OqUJplAmq+VDWX1M5Cd2Io+BhRC3jga4ZbVJmfP4dH3kyOOLcpg6m28Uhg5wwAAAAAAAAAAAAAACzz+A1nNW5bngdKqgAAAABJRU5ErkJggg=="
                                            />
                                        </defs>
                                    </svg>
                                    {/* icon twitter */}
                                    <svg
                                        width={35}
                                        height={35}
                                        viewBox="0 0 35 35"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                    >
                                        <circle cx="17.5" cy="17.5" r="17.5" fill="#03A9F4" />
                                        <rect width={35} height={35} fill="url(#pattern0_2_1358)" />
                                        <defs>
                                            <pattern
                                                id="pattern0_2_1358"
                                                patternContentUnits="objectBoundingBox"
                                                width={1}
                                                height={1}
                                            >
                                                <use xlinkHref="#image0_2_1358" transform="scale(0.01)" />
                                            </pattern>
                                            <image
                                                id="image0_2_1358"
                                                width={100}
                                                height={100}
                                                preserveAspectRatio="none"
                                                xlinkHref="data:image/png;base64,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"
                                            />
                                        </defs>
                                    </svg>
                                    {/* icon tiktok */}
                                    <svg
                                        width={35}
                                        height={35}
                                        viewBox="0 0 35 35"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                    >
                                        <circle cx="17.5" cy="17.5" r="17.5" fill="#212121" />
                                        <rect width={35} height={35} fill="url(#pattern0_2_1361)" />
                                        <defs>
                                            <pattern
                                                id="pattern0_2_1361"
                                                patternContentUnits="objectBoundingBox"
                                                width={1}
                                                height={1}
                                            >
                                                <use xlinkHref="#image0_2_1361" transform="scale(0.01)" />
                                            </pattern>
                                            <image
                                                id="image0_2_1361"
                                                width={100}
                                                height={100}
                                                preserveAspectRatio="none"
                                                xlinkHref="data:image/png;base64,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"
                                            />
                                        </defs>
                                    </svg>
                                    {/* icon toptop */}
                                    <svg
                                        width={35}
                                        height={35}
                                        viewBox="0 0 35 35"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                    >
                                        <circle cx="17.5" cy="17.5" r="17.5" fill="#212121" />
                                        <rect
                                            x={5}
                                            y={5}
                                            width={25}
                                            height={25}
                                            fill="url(#pattern0_2_1352)"
                                        />
                                        <defs>
                                            <pattern
                                                id="pattern0_2_1352"
                                                patternContentUnits="objectBoundingBox"
                                                width={1}
                                                height={1}
                                            >
                                                <use xlinkHref="#image0_2_1352" transform="scale(0.01)" />
                                            </pattern>
                                            <image
                                                id="image0_2_1352"
                                                width={100}
                                                height={100}
                                                preserveAspectRatio="none"
                                                xlinkHref="data:image/png;base64,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"
                                            />
                                        </defs>
                                    </svg>
                                </div>
                                <div className="detail_article_3_left_5">
                                    <svg
                                        width={770}
                                        height={1}
                                        viewBox="0 0 770 1"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <line
                                            x1="4.37114e-08"
                                            y1="0.5"
                                            x2={770}
                                            y2="0.500067"
                                            stroke="#8D8585"
                                            strokeOpacity="0.5"
                                        />
                                    </svg>
                                </div>
                                <div className="detail_article_3_left_6">
                                    <div className="detail_article_3_left_6a">
                                    <img
                                                src="https://media-hosting.imagekit.io//55d60f98dbfb4747/avt1.png?Expires=1835257364&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=BGXDi67WtbrUu6MMFpHtgEuuUlB2TUqDdN6ThcWyCgUV-4sH6LgyuD2EZaBuz3nCDzHNSmfHkWwVCDPXI0f~-gLtFRvzq3V9U~iRcYMZV4YSe-yIM-fyTdUwvFkdlYpK2AlFVsMi-mcmTXQI3itXLpic6jw8rwaKWW4KnvScQxq6d9PS1pUWWrgM9FfRlQUXUdaJ~Lnz7oaP7izU6gttdM9tPnzKbY0UfPFy4UB-3I~0uLC9KPlGzqBLzFkwSl0TfZGlxVJWZf8rswqM3mbaeCI0THv8ANBXfdW~WtU69ppXsR3JPebaLJbIxMv0tCzgrnvJAkrfleDkjwK-RvxHvQ__"
                                                id="image0_517_12945"
                                                width="90px"
                                                height="90px"

                                                preserveaspectratio="none"
                                
                                            />
                                    </div>

                                    <div className="detail_article_3_left_6b">
                                        <div>
                                            <span className="detail_article_3_left_6ab">Kurai Tenshi</span>
                                        </div>
                                        <div>
                                            <span className="detail_article_3_left_6bb">decription aaaa....</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="detail_article_3_left_5">
                                    <svg
                                        width={770}
                                        height={1}
                                        viewBox="0 0 770 1"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <line
                                            x1="4.37114e-08"
                                            y1="0.5"
                                            x2={770}
                                            y2="0.500067"
                                            stroke="#8D8585"
                                            strokeOpacity="0.5"
                                        />
                                    </svg>
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
                                            <img
                                                style={{ width: 113, height: 100 }}
                                                src="https://media-hosting.imagekit.io//b1e96396c8b3453a/blog_context_10.jpg?Expires=1837258842&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=TJBOLRCdHSu9AYSw-A-K0XKBy~OfTdYQRnbAwsbWi3~DoFnmGt9mxHlg2ip4Lgj6MFKyP98pnIREH88YfXch84PIyhYkSBjgjshqhTLQL9cFKyM5KIrRqzMO0a3WfJJBFPzCuDqJr~7nb9DLlh-WZngQFPOsyv-~L8PcQGTiMEsznzho-iRtiGh2trTJFbKPw-U7ux1KD~r6VUe8ieY4zVpSXRe8FTK597DGEiJqHMEoriufkdBBNWt4AtEr8FeOVsHtlohf-Jw0NvUiuC~K~wPjRaQgJpILvDxttXNgZMDCLReMbytT1U4KHUFeLMxrQRDHy2X3apWohQqJCXKBAA__" alt="" />
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
                                            <img
                                                style={{ width: 113, height: 100 }}
                                                src="https://media-hosting.imagekit.io//b1e96396c8b3453a/blog_context_10.jpg?Expires=1837258842&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=TJBOLRCdHSu9AYSw-A-K0XKBy~OfTdYQRnbAwsbWi3~DoFnmGt9mxHlg2ip4Lgj6MFKyP98pnIREH88YfXch84PIyhYkSBjgjshqhTLQL9cFKyM5KIrRqzMO0a3WfJJBFPzCuDqJr~7nb9DLlh-WZngQFPOsyv-~L8PcQGTiMEsznzho-iRtiGh2trTJFbKPw-U7ux1KD~r6VUe8ieY4zVpSXRe8FTK597DGEiJqHMEoriufkdBBNWt4AtEr8FeOVsHtlohf-Jw0NvUiuC~K~wPjRaQgJpILvDxttXNgZMDCLReMbytT1U4KHUFeLMxrQRDHy2X3apWohQqJCXKBAA__" alt="" />

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
                                            <img
                                                style={{ width: 113, height: 100 }}
                                                src="https://media-hosting.imagekit.io//b1e96396c8b3453a/blog_context_10.jpg?Expires=1837258842&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=TJBOLRCdHSu9AYSw-A-K0XKBy~OfTdYQRnbAwsbWi3~DoFnmGt9mxHlg2ip4Lgj6MFKyP98pnIREH88YfXch84PIyhYkSBjgjshqhTLQL9cFKyM5KIrRqzMO0a3WfJJBFPzCuDqJr~7nb9DLlh-WZngQFPOsyv-~L8PcQGTiMEsznzho-iRtiGh2trTJFbKPw-U7ux1KD~r6VUe8ieY4zVpSXRe8FTK597DGEiJqHMEoriufkdBBNWt4AtEr8FeOVsHtlohf-Jw0NvUiuC~K~wPjRaQgJpILvDxttXNgZMDCLReMbytT1U4KHUFeLMxrQRDHy2X3apWohQqJCXKBAA__" alt="" />

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
                                            <img
                                                style={{ width: 113, height: 100 }}
                                                src="https://media-hosting.imagekit.io//b1e96396c8b3453a/blog_context_10.jpg?Expires=1837258842&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=TJBOLRCdHSu9AYSw-A-K0XKBy~OfTdYQRnbAwsbWi3~DoFnmGt9mxHlg2ip4Lgj6MFKyP98pnIREH88YfXch84PIyhYkSBjgjshqhTLQL9cFKyM5KIrRqzMO0a3WfJJBFPzCuDqJr~7nb9DLlh-WZngQFPOsyv-~L8PcQGTiMEsznzho-iRtiGh2trTJFbKPw-U7ux1KD~r6VUe8ieY4zVpSXRe8FTK597DGEiJqHMEoriufkdBBNWt4AtEr8FeOVsHtlohf-Jw0NvUiuC~K~wPjRaQgJpILvDxttXNgZMDCLReMbytT1U4KHUFeLMxrQRDHy2X3apWohQqJCXKBAA__" alt="" />

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
                                            <img
                                                style={{ width: 113, height: 100 }}
                                                src="https://media-hosting.imagekit.io//b1e96396c8b3453a/blog_context_10.jpg?Expires=1837258842&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=TJBOLRCdHSu9AYSw-A-K0XKBy~OfTdYQRnbAwsbWi3~DoFnmGt9mxHlg2ip4Lgj6MFKyP98pnIREH88YfXch84PIyhYkSBjgjshqhTLQL9cFKyM5KIrRqzMO0a3WfJJBFPzCuDqJr~7nb9DLlh-WZngQFPOsyv-~L8PcQGTiMEsznzho-iRtiGh2trTJFbKPw-U7ux1KD~r6VUe8ieY4zVpSXRe8FTK597DGEiJqHMEoriufkdBBNWt4AtEr8FeOVsHtlohf-Jw0NvUiuC~K~wPjRaQgJpILvDxttXNgZMDCLReMbytT1U4KHUFeLMxrQRDHy2X3apWohQqJCXKBAA__" alt="" />

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
                                    style={{ width: 350, height: 280 }}
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
                                    style={{ width: 350, height: 280 }}
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
                                    style={{ width: 350, height: 280 }}
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
                                    style={{ width: 350, height: 280 }}
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
                                    <img
                                        style={{ width: 113, height: 100 }}
                                        src="https://media-hosting.imagekit.io//b1e96396c8b3453a/blog_context_10.jpg?Expires=1837258842&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=TJBOLRCdHSu9AYSw-A-K0XKBy~OfTdYQRnbAwsbWi3~DoFnmGt9mxHlg2ip4Lgj6MFKyP98pnIREH88YfXch84PIyhYkSBjgjshqhTLQL9cFKyM5KIrRqzMO0a3WfJJBFPzCuDqJr~7nb9DLlh-WZngQFPOsyv-~L8PcQGTiMEsznzho-iRtiGh2trTJFbKPw-U7ux1KD~r6VUe8ieY4zVpSXRe8FTK597DGEiJqHMEoriufkdBBNWt4AtEr8FeOVsHtlohf-Jw0NvUiuC~K~wPjRaQgJpILvDxttXNgZMDCLReMbytT1U4KHUFeLMxrQRDHy2X3apWohQqJCXKBAA__" alt="" />
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
                                    <img
                                        style={{ width: 113, height: 100 }}
                                        src="https://media-hosting.imagekit.io//b1e96396c8b3453a/blog_context_10.jpg?Expires=1837258842&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=TJBOLRCdHSu9AYSw-A-K0XKBy~OfTdYQRnbAwsbWi3~DoFnmGt9mxHlg2ip4Lgj6MFKyP98pnIREH88YfXch84PIyhYkSBjgjshqhTLQL9cFKyM5KIrRqzMO0a3WfJJBFPzCuDqJr~7nb9DLlh-WZngQFPOsyv-~L8PcQGTiMEsznzho-iRtiGh2trTJFbKPw-U7ux1KD~r6VUe8ieY4zVpSXRe8FTK597DGEiJqHMEoriufkdBBNWt4AtEr8FeOVsHtlohf-Jw0NvUiuC~K~wPjRaQgJpILvDxttXNgZMDCLReMbytT1U4KHUFeLMxrQRDHy2X3apWohQqJCXKBAA__" alt="" />

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
                                    <img
                                        style={{ width: 113, height: 100 }}
                                        src="https://media-hosting.imagekit.io//b1e96396c8b3453a/blog_context_10.jpg?Expires=1837258842&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=TJBOLRCdHSu9AYSw-A-K0XKBy~OfTdYQRnbAwsbWi3~DoFnmGt9mxHlg2ip4Lgj6MFKyP98pnIREH88YfXch84PIyhYkSBjgjshqhTLQL9cFKyM5KIrRqzMO0a3WfJJBFPzCuDqJr~7nb9DLlh-WZngQFPOsyv-~L8PcQGTiMEsznzho-iRtiGh2trTJFbKPw-U7ux1KD~r6VUe8ieY4zVpSXRe8FTK597DGEiJqHMEoriufkdBBNWt4AtEr8FeOVsHtlohf-Jw0NvUiuC~K~wPjRaQgJpILvDxttXNgZMDCLReMbytT1U4KHUFeLMxrQRDHy2X3apWohQqJCXKBAA__" alt="" />

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
                                    <img
                                        style={{ width: 113, height: 100 }}
                                        src="https://media-hosting.imagekit.io//b1e96396c8b3453a/blog_context_10.jpg?Expires=1837258842&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=TJBOLRCdHSu9AYSw-A-K0XKBy~OfTdYQRnbAwsbWi3~DoFnmGt9mxHlg2ip4Lgj6MFKyP98pnIREH88YfXch84PIyhYkSBjgjshqhTLQL9cFKyM5KIrRqzMO0a3WfJJBFPzCuDqJr~7nb9DLlh-WZngQFPOsyv-~L8PcQGTiMEsznzho-iRtiGh2trTJFbKPw-U7ux1KD~r6VUe8ieY4zVpSXRe8FTK597DGEiJqHMEoriufkdBBNWt4AtEr8FeOVsHtlohf-Jw0NvUiuC~K~wPjRaQgJpILvDxttXNgZMDCLReMbytT1U4KHUFeLMxrQRDHy2X3apWohQqJCXKBAA__" alt="" />

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
                                    <img
                                        style={{ width: 113, height: 100 }}
                                        src="https://media-hosting.imagekit.io//b1e96396c8b3453a/blog_context_10.jpg?Expires=1837258842&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=TJBOLRCdHSu9AYSw-A-K0XKBy~OfTdYQRnbAwsbWi3~DoFnmGt9mxHlg2ip4Lgj6MFKyP98pnIREH88YfXch84PIyhYkSBjgjshqhTLQL9cFKyM5KIrRqzMO0a3WfJJBFPzCuDqJr~7nb9DLlh-WZngQFPOsyv-~L8PcQGTiMEsznzho-iRtiGh2trTJFbKPw-U7ux1KD~r6VUe8ieY4zVpSXRe8FTK597DGEiJqHMEoriufkdBBNWt4AtEr8FeOVsHtlohf-Jw0NvUiuC~K~wPjRaQgJpILvDxttXNgZMDCLReMbytT1U4KHUFeLMxrQRDHy2X3apWohQqJCXKBAA__" alt="" />

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

            <div className='blog-container'>
                <div className='blog_product'>
                    <div
                        className="d-flex justify-content-between align-items-center"
                        style={{ borderBottom: "1px solid rgb(190, 188, 188)" }}
                    >
                        <div className="title_top_menu tab_link_module">
                            <h3><a href="new-arrivals" title="Sản phẩm hot">Sản phẩm hot</a></h3>
                        </div>
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
export default BlogDetail;
