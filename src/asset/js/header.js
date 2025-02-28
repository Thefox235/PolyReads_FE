const images = [
  "https://s3-alpha-sig.figma.com/img/2a97/651f/0dc597b8a16ab0b502b1e83fd759962a?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dJ0j4AebaZwNvi8LWlQZDo-U~3y79mO~3Vd6YcepAdZ-NXfGSDXc0t3kjvGNbKQ4LObNQzp-dTqqnolVfTEUwJv8bndRWhVjB3D6YB3FKGdaKKtz2o4XU1tEXbt4Iohth~hazLdJa6M8R-PaK8tumcMUEW4EV3iVtIX8p1eIqQtCZ6ysOVnDPjjyTdYFdVLy1L8SW3PT88CyI04tEb9fxfLE083Hx1JbO7U1ksuBqpWetS5yHNP222KrRPwu2fQGlJHW9rH1j-kAfDW1KUKOrjhztiWcfSQP7jbilsuxgSSIdU-H9hq7aqt3zT3aYdhdTtswmUkke-apX63HIUUnFA__",
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
function closeElement() {
  var element = document.querySelector(".moblie");
  element.classList.remove("open");
}
function openElement() {
  console.log("open");
  var element = document.querySelector(".moblie");
  element.classList.toggle("open");
}
document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".products-wrapper");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  let scrollAmount = 0;
  const step = 220;

  nextBtn.addEventListener("click", function () {
    scrollAmount += step;
    wrapper.style.transform = `translateX(-${scrollAmount}px)`;
  });

  prevBtn.addEventListener("click", function () {
    scrollAmount -= step;
    if (scrollAmount < 0) scrollAmount = 0;
    wrapper.style.transform = `translateX(-${scrollAmount}px)`;
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".products-wrapper3");
  const prevBtn = document.getElementById("prev3");
  const nextBtn = document.getElementById("next3");
  let scrollAmount = 0;
  const step = 220;

  nextBtn.addEventListener("click", function () {
    scrollAmount += step;
    wrapper.style.transform = `translateX(-${scrollAmount}px)`;
  });

  prevBtn.addEventListener("click", function () {
    scrollAmount -= step;
    if (scrollAmount < 0) scrollAmount = 0;
    wrapper.style.transform = `translateX(-${scrollAmount}px)`;
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".products-wrapper2");
  const prevBtn = document.getElementById("prev2");
  const nextBtn = document.getElementById("next2");
  let scrollAmount = 0;
  const step = 220;

  nextBtn.addEventListener("click", function () {
    scrollAmount += step;
    wrapper.style.transform = `translateX(-${scrollAmount}px)`;
  });

  prevBtn.addEventListener("click", function () {
    scrollAmount -= step;
    if (scrollAmount < 0) scrollAmount = 0;
    wrapper.style.transform = `translateX(-${scrollAmount}px)`;
  });
});
