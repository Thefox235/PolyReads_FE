import { Link } from 'react-router-dom';
import '../../asset/css/admin.css';

const SideBar = () => {
    return (
        <div className="dashboard">
            <div className=''>
                <header class="header">
                    <div class="overlap">
                        <Link to={'/'} class="overlap-group"><img class="menu" src="https://media-hosting.imagekit.io//96b5077801644d68/Home.png?Expires=1835326765&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=pfzif1X6g42DEmKxAuD9xM5LgW3NskfLucKqpDlpWfRhUL425y8BDbrRMIgDrGIB8w9R79w-f-IV-ujujXZ7XywgK~qVdtXA68AawwiQqIxd5JL-DeldGomnc6wtkkA7j7KBlLqpGgQ66Xa6DBBD7lhlzrD4bUykiqUCUjxgp4AA3KNhsIJWoefqTd5Op13l5p91egX21dLKEG~C4IkfAj7PaB8CePE2YcmplCUrnawXNSw2pBLe20kAFMfEdbkAShh31UTdF4KHbDRK7m7lVevn2pqarjxvnoU0DDeK-9kz2dMNfbZ6Ok8eTz5TX~lTWO9FJSXQs2tQkd0rn2309w__" /></Link>
                        <div class="logo">
                            <img class="download" src="https://media-hosting.imagekit.io//1fcf0cb17e7545fb/download-10.png?Expires=1835161296&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=om0N3cA1nqjVFxvpLnvazM2ZfOUy2r5aNLReJQm9cm-MbcQLe5rMsDbJLAlnbspCmDCkO-7wHiOnG4j2NiiC5ReUaC4qDl0gqcybOJfWsHy3a-GaivpzNbGhZ9DGx2DqfhR9ZLz8ovOVpScr~KnLo3QIsIkcktJcgWRP0Feo~5Q1s8KDyNHtX5jq6i3GZETDvRe4PARlsM21IWE9kWLkuOTjvEkNjCc8WzmwVs4THufEJSVkm4fypym4iW11Twecf9HJ1S8SwWnurl18GfET7Qg5OIGmBcKyNbB6NQeKVKvqfjsW2Gn5siOUiDfsPvZMmYIN-0s1V6r5deG0c3SHGQ__" />
                            <div class="text-wrapper">Poly Reads</div>
                        </div>
                        <div class="overlap-2">
                            <div class="text-wrapper-2">Kurai Tenshi</div>
                            <img class="avt" src="https://media-hosting.imagekit.io//55d60f98dbfb4747/avt1.png?Expires=1835257364&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=BGXDi67WtbrUu6MMFpHtgEuuUlB2TUqDdN6ThcWyCgUV-4sH6LgyuD2EZaBuz3nCDzHNSmfHkWwVCDPXI0f~-gLtFRvzq3V9U~iRcYMZV4YSe-yIM-fyTdUwvFkdlYpK2AlFVsMi-mcmTXQI3itXLpic6jw8rwaKWW4KnvScQxq6d9PS1pUWWrgM9FfRlQUXUdaJ~Lnz7oaP7izU6gttdM9tPnzKbY0UfPFy4UB-3I~0uLC9KPlGzqBLzFkwSl0TfZGlxVJWZf8rswqM3mbaeCI0THv8ANBXfdW~WtU69ppXsR3JPebaLJbIxMv0tCzgrnvJAkrfleDkjwK-RvxHvQ__" />
                            <img class="expand-arrow" src="https://media-hosting.imagekit.io//6d6cf6a50d13489d/expand-arrow0.png?Expires=1835266301&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=fVwJKRlCKJOxPqtyhbIydlwbDbuJJNeE77Avre~1stvdRP901gA0-rNNb6bQTOiaRdd-xgSwOZgvEmTht5OdCB12oVUy56plV68b4V-sGhK-HBCVv4LN9Gb4Q8VIbBW2QiTg7mVY7UvAmc1U2djwJzaEYrTVPP4QIfEBS2NNHtjP3swXSUDhsUFlfO7mUjn5AgAXWLFJY4cmqP0bzsSNn8kkl4TFlwbVmPz3mdnUFlN3p9P21O7kiB6kOgEwDvTeQGpBqAPWjuGA-L2APSwKT2kp~I~xfaKP6HwYvB7JUVKTMPSxSCPmemwl8VeB2viJtULIjJ4yXW6qevePMPBRgA__" />
                        </div>
                        {/* <div class="group">
                            <div class="overlap-3">
                                <img class="img" src="https://media-hosting.imagekit.io//45c3de0286cc41c2/doorbell0.png?Expires=1835266392&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=rNYzHEhvoSOC7jmcpysveFcRpcOz8Tm21siP-01fWl~bhTQF0PSLSJNdjFrTuSHWCzgJX3CnS3hhOslyOak~ecD9dPabDiSDtiFyWF5uZzkb7Acht~8kpt18fjkjDa-2pzQOxBJmt9n~Bd8QLSoleHTKyKPrw~-~Afo4-srQyzL~SMeSM3EyOozZ9HiZkX1jTcItNyDqsTmTolyk49zYbxZOew6jgdWwuzoNeu3y6nTGNLnFl8i-yTBYbAymcPbFwU8s7GC1CLfXsZUeQx7g-HulirSrYS6SvqjGQ6Zw5fH5-ACjEj50KK4X4XOZVzZl7izjUxt6FP~FSw4UV3mX~g__" />
                                <div class="overlap-group-wrapper">
                                    <div class="div-wrapper"><div class="text-wrapper-3">1</div></div>
                                </div>
                            </div>
                            <div class="overlap-4">
                                <img class="img" src="https://media-hosting.imagekit.io//299c03f0a7bf4325/envelope0.png?Expires=1835266393&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=sUE5b2RjTQ2DDDSWhY-UXRN7gWXU~sFlf9pPMfb32tBY68JxmDTMCfQ8bYVRIgbR38f3CO3rJEHE1eLVLku44gVSrPXECCAVuZ0EMelZle7wS0NjxiCCtoI9JuFttPHWMH6mNvgeGWr6~xKsFV0RDbL4uoR4bnO8GzZtz9T1GDGaEXDimW~96lz1JnmIOrvaillh2L4zC3--czi-1Jjgn-ewFEX6k4sIOwjZD6aaPvN6iAoQisv3aNXvkRp0fpBVZke4iaTa7Xo77avf7mv4QZH8akGntcIO4VXU~nyefYT~iUfBQbrjOu~R8DOg93WAX9ZGlCtjHUwZr77k7aS90Q__" />
                                <div class="overlap-wrapper">
                                    <div class="div-wrapper"><div class="text-wrapper-3">1</div></div>
                                </div>
                            </div>
                        </div> */}
                    </div>

                </header>
                <div className="side-bar">
                    <div className="overlap-20">
                        <img className="avt-2" src="https://media-hosting.imagekit.io//55d60f98dbfb4747/avt1.png?Expires=1835257364&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=BGXDi67WtbrUu6MMFpHtgEuuUlB2TUqDdN6ThcWyCgUV-4sH6LgyuD2EZaBuz3nCDzHNSmfHkWwVCDPXI0f~-gLtFRvzq3V9U~iRcYMZV4YSe-yIM-fyTdUwvFkdlYpK2AlFVsMi-mcmTXQI3itXLpic6jw8rwaKWW4KnvScQxq6d9PS1pUWWrgM9FfRlQUXUdaJ~Lnz7oaP7izU6gttdM9tPnzKbY0UfPFy4UB-3I~0uLC9KPlGzqBLzFkwSl0TfZGlxVJWZf8rswqM3mbaeCI0THv8ANBXfdW~WtU69ppXsR3JPebaLJbIxMv0tCzgrnvJAkrfleDkjwK-RvxHvQ__" />
                        <div className="name">
                            <div className="overlap-group-9">
                                <div className="text-wrapper-67">Kurai Tenshi</div>
                                <div className="group-28">
                                    <div className="text-wrapper-68">online</div>
                                    <div className="ellipse-6" />
                                </div>
                            </div>
                        </div>
                        <div className="overlap-21">
                            <div className="text-wrapper-69">General</div>
                        </div>
                        <Link to={'/dashboard'} className="div-2">
                            <div className="text-wrapper-70">
                                <a style={{ color: "white" }} href="/index.html">
                                    Dashboard
                                </a>
                            </div>
                            <img className="img-3" src="https://media-hosting.imagekit.io//5d332c42b20f464a/dashboard-gauge0.png?Expires=1835257435&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=HITKvnPglU-9yD7Oss3JaMAPtgqYCvZ7ZsFM6yKAUnoTkN2eNBnLcZp6dcqRqZHMwIgn2okyiT26paIolSEX0RxG7tu24sDQfviQyg9ecgn0vmgR7x-iehfAypE4SjDLc8W0KiUbh~dYUnWCp~dRCzorPRhfbrCJ5q5mQ8MCw-eCU8b~4QLXtBWyBj-AuhaLwbe386~WfPOycuP76KeKGclT5TG5TXcJYKWw8qLjbj6Hfq~2-LxV6UYPS2izbWZGVq0BO1PITn-MlDyX2k0kdj51dk38yo8tj3tx9YR5xrW0UBfC~ipLCMbVIPvKADrTeN1yldlpZlbrX-oZJ8atcw__" />
                        </Link>
                        <Link to={'/viewcate'} className="div-3">
                            <div className="text-wrapper-70">
                                <a style={{ color: "white" }} href="category.html">
                                    Danh mục
                                </a>{" "}
                            </div>
                            <img className="img-3" src="https://media-hosting.imagekit.io//82af2d9dedf5420c/category0.png?Expires=1835257474&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=HVLRMYV9qEGNEXVKkSmRgdh4YNoPHlXfqihG~E7EXdOTR9AQ49-bckh4lFCkL~CCnoOcYPg7ZcXczZWLahS96QAAL2rivW1eDVcn-Yns8ADH6loLZ~0mhHPijPR7EYMsbY6xvNxyKHVOlnjaiRwUEkFJiDrLKFDlKo1pcnk78wnS5DRRxQ8LlBLxbya55rGituFt8OStbyTvd9gqdpB21JiaPQawZq9vZGbfQGnuitfc12LehNiqYri3VR4oAw89qJqEXDO8OnjaxQfj637pR5tgWaBtFHvYJE4UXPVUWnZEDP6AFNX0O~gasBHu67FQP0D88btvrm8BJSSxwbR7Mw__" />
                        </Link>
                        <Link to={'/viewPro'} className="div-4">
                            <div className="text-wrapper-70">
                                <a style={{ color: "white" }} href="" /> Sách
                            </div>
                            <img className="img-3" src="https://media-hosting.imagekit.io//48d00380ab864198/book2.png?Expires=1835263535&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=VstNALttRRA75Rr8uUp9tfieFpeQmxdt4w3e39AFXpwPMWuDmqn6BGyZ9GUrdL6dkDe9OIM-z1o0rqVVwb-MfahSuJdHKhJqEYCJP-V~JMEHuZAHb4gFn~DCTUQevGGx8u6oO-qTGhFCAEWl6O0TrY7qBbMISKqzqmry0FJPWRAfN1g6ui1lCOUSJ~BuqleXlvAyQdiPYfbQ6Lc-yq3oygqf8MaK~gFXknU4lWuv-KulpoV9sWmfVZVRTsx~PlYxOveNkYjJ8LQ0gfOt1kIYdO-BQjfCCZu0C0HVnktkwZKfqEjM8NfT5NP2imwb4eStSCf8HNrnUCqS9SkmgIR9Ew__" />
                        </Link>
                        <Link to={'/viewAuthor'} className="div-5">
                            <div className="text-wrapper-70">
                                <a style={{ color: "white" }} href="" /> Tác giả
                            </div>
                            <img className="img-3" src="https://media-hosting.imagekit.io//d526b34886f54a44/user0.png?Expires=1835257684&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=qmfBhcc31rlT22dAFR8ORNbHAA6L8t3kKhmU2Dtt5RVACiTHd-CKJZoMAwq4PkN6Y1lbtGwdtgbhoh3hWmBhFrOs73pvMgbVyDwA5uvrmAZf6toBapKfi-SSc-c7jF98H7Sg6L8HOjd7eCTDEUWlrj2OKdY~MskKL4qUcfNysv-kFmgwb4xEAnV3zI1wtXXHk6kDOPSD3jO1rwkEsDkPtjdKHxx1Oyy9-jvVKwhcNjCIv8LHr3jJh~AfWPDT6t~4~DAxclwxnOzPZKBm9psDPXYtaozYLNCReBaeYYv47ovEvQqV4dsMiYRbBDW2U~fief~sp2l3smBFcbO-8P89Kw__" />
                        </Link>
                        <Link to={'/viewOrder'} className="div-6">
                            <div className="text-wrapper-70">
                                <a style={{ color: "white" }} href="" /> Đơn hàng
                            </div>
                            <img className="img-3" src="https://media-hosting.imagekit.io//abf4e99dd7f24c7f/order-completed0.png?Expires=1835257536&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=JB6CYDV0uw7Cyrw1tdQDXQ0EJK90XyJaCR63o6RllejwX2duLnO-GQC4v3zP19Qg6Leyjvactfydgu2-q9Zj0iF0faAAN2pjM6E5DQ1TLoy99PnK3o-hHMZYv~AU9k0r~2IKdVEPVMnUpRaCk42WlZTwPC~869ZiExU4Pjuhqon~hz8sXOXkS6d-5ljoJHbg7TUfLN6q-lPuvWCxXcmKPqptXHHBLNMa~z0gY2YwgbDMnoE5rfz1kE4QL~sDKpHigL6Q61I0ygUkYH4RrQ-RoPIgOjpa2q2VQjioQ8JXfbZB5sc6ajR37v~gLTsKD~uc47~oPjF58njWxjduhzfM3A__" />
                        </Link>
                        <Link to={'/viewPost'} className="div-7">
                            <div className="text-wrapper-70">
                                <a style={{ color: "white" }} href="" /> Bài viết
                            </div>
                            <img className="img-3" src="https://media-hosting.imagekit.io//3cfcbd3fe9dd439a/edit-text-file0.png?Expires=1835257583&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=AIiDvHBN6jM0o5ZU8mqporDwSV0ynOoYaqWdcw-eQyWVV-F0e6KbUFnb8nhlvsRt6hiceE4udVkHA6qyZDsg4YMfIoMa8frdfvaDrHkyCNUkedshIjiIU4V6qUlMOhsi0hqUgcDd-hkcS7n9Pp~ShVsNU~dRPon97AisjIbx8yydg9PGzVTJk0csOs2iNc9ahJgV915A-RJGKwo~GNsX3Q0WOiVZ7DalHPwLDCEtcixHuqBB1L1TcOILC-dsy6w0au1xCIljtqDrGr5adoMwZM1j32hPWYuBIPzm3dydR3jQPbRYFzNoREgYXmg1RkyL6ZzL3eWWUoeZ3ZryyOxWrA__" />
                        </Link>
                        <Link to={'/viewBanner'} className="div-8">
                            <div className="text-wrapper-70">
                                <a style={{ color: "white" }} href="" /> Banner
                            </div>
                            <img className="img-3" src="https://media-hosting.imagekit.io//481d9015f59a404b/banner1.png?Expires=1835257617&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=I4nExQItyiiA3YW0G5OInPU9QDRDsmv~xPpuTW8S3SBLXwSPbZeVUpE-tz7RDF9XMzP6ThBWVe0JYEatajkA4hRitA9AG6HB1-qGfD8XhhCG2bzwtjKRIVDMgCcBD3TBXxlL~e2Neyr5-HbPZOCwMPKwWR2GeeOM8Pv8Um32gY8tecmKoNSmgsxuFOFjZnQD9hiBZffI4maq5v1pYQ0soSrtn5X0yH6fI01z-WxcYDALgYEq0-A4~OHXHT2aCfYmJWuBZfo0TyXzYqp4xtGXLMV12ROlNfnfFP4nMe80aXvs-1cfhrHBAhvL3Sc6P6LikyL~qJ4LgybziZDczfg8HQ__" />
                        </Link>
                        <Link to={'/viewPublisher'} className="div-9">
                            <div className="text-wrapper-70">
                                <a style={{ color: "white" }} href="" /> Nhà xuất bản
                            </div>
                            <img className="img-3" src="https://media-hosting.imagekit.io//234d454134ff4465/publishing.png?Expires=1836360148&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=DhNFOSs6vsEYxtlfEuxrEbx4vPimzYINWJ-AetBG0FezX-7u-UDGmR94n5cPV8f79nhAtdKrE0yLCd8uYRuWvvuuWWiYUCY10cdZq3iIh1FUNjvGYAKrea55l~MQ2ODWplxlI4~r~T1NBE23DrSZXsFEELjwMSVjpKFdd1ZZQP1~jf1OzrSgmLpQKRTrs36kd8GfCHEmYaTfe0-mxYdKjN38eDGeiqYASpqtxKmQiwzYz7I-1YxhYzzqMSegAUWG7JSMYaHTW~ca0jZ1gci0o4O6uWwu2oVT7jvkxzaIGTgd2WzU74Hb8OInrMcHnWp17IWkIVxHgW4XMomA68xt7g__" />
                        </Link>
                        <Link to={'/viewUser'} className="div-10">
                            <div className="text-wrapper-70">
                                <a style={{ color: "white" }} href="" /> Người dùng
                            </div>
                            <img className="img-3" src="https://res.cloudinary.com/dxwda4hfn/image/upload/v1745244470/human_gl8pgu.png" />
                        </Link>
                        <Link to={'/viewCoupon'} className="div-11">
                            <div className="text-wrapper-70">
                                <a style={{ color: "white" }} href="" /> Mã giảm giá
                            </div>
                            <img className="img-3" src="https://media-hosting.imagekit.io//5ef2f6dab1c747f0/voucher.png?Expires=1836820324&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=L3QiT-riV242VZWFOKROGMBo~xKMgTc1IF6hU9nhMDlkNz9EJdFJjG9kpIZztoauP-GR6ycAydySP4T~DPGWdAa1xpQ0rUd0zT3clyWPt8ugBawyQGb2Ut38eof5z1stWGhwzySYp1fdnAmilmBbwIcHv5Yw-7ziDnBgNWHpOz92zXDSdLuIGq9O-wm-y7jy4c~zCK7E210XyUYdi4n~0exav2b-33dwIBeM3wWE4x8MRhu98I30iGWH6-i~z0RJzsuwr6G0rQ~~K2K2~kPriVNuhtd7RUJXAJZn9KAGIXzG5OrWQ~T3z0l6419sNG57ymROS5tFfZdZkszZDVm4QQ__" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
