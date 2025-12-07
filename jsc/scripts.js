// Back button:
function goBack(){
    window.history.back();
}

//Wanderer
const cordImageFilename = "Knight-Wander-3.png";
const pages = ["portfolio.html", "end.html", "thesevenideals.html"];

function setupRandomLink() {
    const box = document.getElementById("shift");
    if (!box) return;

    const img1 = box.querySelector(".i3-1");
    const img2 = box.querySelector(".i3-2");
    const link = document.getElementById("randomLink");
    const overlay = document.getElementById("shift-screen");

    if (!link || !overlay) return;

    box.addEventListener("mouseenter", () => {
        img1.style.opacity = 0;
        img2.style.opacity = 1;
    });
    box.addEventListener("mouseleave", () => {
        img1.style.opacity = 1;
        img2.style.opacity = 0;
    });

    link.addEventListener("click", (event) => {
        event.preventDefault();
        localStorage.setItem("cordEnabled", "true");

        overlay.classList.add("shift-screen-show");
        document.body.style.overflow = "hidden";

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * pages.length);
            window.location.href = pages[randomIndex];
        }, 4000);
    });
}



//!Venture
document.addEventListener("DOMContentLoaded", () => {
  const cord = document.querySelector(".cord");
  if (!cord) return;

  const page = window.location.pathname.split("/").pop().toLowerCase();
  if (page === "" || page === "index.html") {
    localStorage.removeItem("cordEnabled");
    cord.style.display = "none";
    return;
  }

  const cordImg = cord.querySelector("img");
  if (!cordImg) return;

  cord.style.display = "none";

  const cordEnabled = localStorage.getItem("cordEnabled") === "true";
  if (!cordEnabled) return;

  if (!pages.includes(page)) return;

  cordImg.src = "/Rogue-Illustrations/jsc/Knight-Wander-3.png";
  cord.style.display = "block";
});

document.addEventListener("DOMContentLoaded", setupRandomLink);







//!Test
// document.addEventListener("DOMContentLoaded", () => {
//   const cord = document.querySelector(".cord");
//   if (!cord) {
//     console.warn("No .cord element found");
//     return;
//   }

//   const cordImg = cord.querySelector("img");
//   if (!cordImg) {
//     console.warn("No <img> inside .cord");
//     return;
//   }

//   cordImg.src = "/Rogue-Illustrations/jsc/Knight-Wander-3.png";

//   cord.style.display = "block"; // force it to appear for testing

//   cordImg.onload = () => console.log("Cord image loaded!");
//   cordImg.onerror = () => console.error("Failed to load cord image at:", cordImg.src);
// });



//?Old
// const script = document.currentScript;
// const scriptFolder = script.src.substring(0, script.src.lastIndexOf("/"));
// const cordBaseImage = scriptFolder + "/Knight-Wander-3.png";

// function enableCord() {
//     localStorage.setItem("cordEnabled", "true");
//     sessionStorage.removeItem("cordHidden");
// }

// function updateCordVisibility() {
//     const cord = document.querySelector(".cord");
//     if (!cord) return;

//     const cordImg = cord.querySelector("img");
//     if (cordImg) cordImg.src = cordBaseImage;

//     const currentPage = window.location.pathname.split("/").pop();
//     const isIndex = currentPage === "index.html" || currentPage === "";

//     if (isIndex) {
//         localStorage.removeItem("cordEnabled");
//         sessionStorage.removeItem("cordHidden");
//         cord.style.display = "none";
//         return;
//     }

//     const enabled = localStorage.getItem("cordEnabled") === "true";
//     const hidden = sessionStorage.getItem("cordHidden") === "true";

//     cord.style.display = enabled && !hidden ? "block" : "none";

//     if (cordImg) {
//         cordImg.addEventListener("click", () => {
//             cord.style.display = "none";
//             sessionStorage.setItem("cordHidden", "true");
//         });
//     }
// }
// document.addEventListener("DOMContentLoaded", updateCordVisibility);