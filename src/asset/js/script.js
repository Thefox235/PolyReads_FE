import { arr } from "./data.js";
import { arr2 } from "./data.js";

const images = [
  "https://s3-alpha-sig.figma.com/img/ab25/a9a0/eab207dc06a5c084f08d0242e791130f?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=NOMUO8ureBbKc-jE4OFnlKAA2imwPK5VgTfaZW8PQFjxwxikSpxvaSZYitSC2WA22t1FX2es~drcEmp~6fzvVXyOVZ4Ylqa6gux7FitEWWdP3d19Pdw1bhSyv2wR0TE3wONL2583Z5D41RDU-0iTaXIGV0WzOeFxcWVNv0Mt2J4vOjeDB96zODyiP90x5JBH458bH~S8o0cGZ35OaUR0eyydELuiugOGwJCIrOa~CdQe4AQm4rxHmSsjqSUV9WdVQ0KvKrM0e-YvRCqecsfgqgMdIIw6Y9w0Cb7NcOFb~CuKpFPhLna3nlYKbWqF1ei77RhbUemoPFiEwhZUQ~nk9g__",
  "banner2.png",
  "banner3.png",
];

let currentIndex = 0;
const bgHeader = document.querySelector(".bg-header");

function changeBackground() {
  bgHeader.style.backgroundImage = `url(${images[currentIndex]})`;
  currentIndex = (currentIndex + 1) % images.length;
}

setInterval(changeBackground, 3000);

// for (let i = 0; i < arr2.length; i++) {
//   const item = arr2[i];
//   const card = document.createElement("div");
//   card.innerHTML = `
//   <div class="pt-4 pb-2">
//   <div class="card2 rounded-4">
//     <div class="image-container">
//       <img
//         src=${item.img}
//         alt=""
//         class="img-default"
//       />
//       <img
//         src=${item.hover}
//         class="img-hover"
//         alt="Banner"
//       />
//     </div>

//     <h6 class="m-auto p-2" style="max-width: 200px">
//     ${item.namebook}
//     </h6>
//     <span class="text-danger text-start p-2">${item.price.toLocaleString(
//       "vi-VN"
//     )} ₫ </span>
//     <div class="d-flex justify-content-between gap-1 align-items-center" style="padding: 2px 8px;">
//       <span class="giagoc">${item.discount.toLocaleString("vi-VN")}</span>
//       <span class="fw-medium" style="font-size: 12px;">Amber Manga Shop</span>
//     </div>
//     <div class="btn w-100 rounded-0" style="color: red;border-top: 1px solid rgb(195, 191, 191);">Thêm vào giỏ</div>
//   </div>
// </div>
//     `;
//   list6.appendChild(card);
// }
function closeElement() {
  console.log("close");
  // Thêm logic để ẩn hoặc xóa phần tử
  var element = document.querySelector(".moblie");
  var close = document.querySelector(".open");
  element.style.transform = "translateX(0%)";
  element.parentNode.removeChild(element);
}
