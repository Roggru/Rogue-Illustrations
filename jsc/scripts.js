// Back button:
function goBack(){
    window.history.back();
}

//Wanderer
const cordImageFilename = "Knight-Wander-3.png";
const pages = ["portfolio.html", "end.html", "Divine Beings/thesevenideals.html"];

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

        enableCord();

        overlay.classList.add("shift-screen-show");
        document.body.style.overflow = "hidden";

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * pages.length);
            window.location.href = pages[randomIndex];
        }, 4000);
    });

    window.addEventListener("pageshow", () => {
        overlay.classList.remove("shift-screen-show");
        document.body.style.overflow = "";
    });
}
document.addEventListener("DOMContentLoaded", () => {
    setupRandomLink();
});

//!Venture
function getScriptFolder() {
    const scripts = document.getElementsByTagName("script");
    const src = scripts[scripts.length - 1]?.src || "";
    return src ? decodeURIComponent(src).split(/[?#]/)[0].replace(/\/[^/]*$/, "") : "";
}

function getCordImagePath() {
    const folder = getScriptFolder();
    return folder ? `${folder}/${cordImageFilename}` : `jsc/${cordImageFilename}`;
}

function enableCord() {
    if (localStorage.getItem("cordBurned") !== "true") {
        localStorage.setItem("cordEnabled", "true");
    }
}

function updateCordVisibility() {
    const cord = document.querySelector(".cord");
    if (!cord) return;

    const cordImg = cord.querySelector("img");
    if (cordImg) cordImg.src = getCordImagePath();

    const page = window.location.pathname.split("/").pop().toLowerCase();
    const isIndex = page === "" || page === "index.html";
    const isCordPage = cordPages.some(p => p.toLowerCase().endsWith(page));

    if (isIndex) {
        localStorage.removeItem("cordEnabled");
        localStorage.setItem("cordBurned", "true");
        cord.style.display = "none";
        return;
    }

    const showCord =
        localStorage.getItem("cordEnabled") === "true" &&
        localStorage.getItem("cordBurned") !== "true" &&
        isCordPage;

    cord.style.display = showCord ? "block" : "none";

    if (cordImg && !cord.dataset.bound) {
        cord.dataset.bound = "true";
        cord.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("cordEnabled");
            localStorage.setItem("cordBurned", "true");
            cord.style.display = "none";
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateCordVisibility();
});









// Wanderer:
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