// Back button:
function goBack(){
    window.history.back();
}


const cordImageFilename = "Knight-Wander-3.png";
const pages = ["portfolio.html", "end.html", "Divine-Beings/thesevenideals.html"];

//Wanderer
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

        overlay.classList.remove("no-transition");
        document.body.style.overflow = "hidden";

        setTimeout(() => {
            overlay.classList.add("shift-screen-show");
        }, 10);

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * pages.length);
            window.location.href = pages[randomIndex];
        }, 4000);
    });
}

//Overlay
(function() {
    const overlay = document.getElementById("shift-screen");
    if (overlay) {
        overlay.classList.add("no-transition");
        overlay.classList.remove("shift-screen-show");
        document.body.style.overflow = "";
    }
})();

window.addEventListener("pageshow", (event) => {
    const overlay = document.getElementById("shift-screen");
    if (overlay) {
        overlay.classList.add("no-transition");
        overlay.classList.remove("shift-screen-show");
        document.body.style.overflow = "";
        
        void overlay.offsetWidth;
    }
    checkCordVisibility();
});

//!Venture
function checkCordVisibility() {
    const cord = document.querySelector(".cord");
    if (!cord) return;

    const page = window.location.pathname.split("/").pop().toLowerCase();
    if (page === "" || page === "index.html") {
        localStorage.removeItem("cordEnabled");
        localStorage.removeItem("cordDisabled");
        cord.style.display = "none";
        return;
    }

    const cordEnabled = localStorage.getItem("cordEnabled") === "true";
    const cordDisabled = localStorage.getItem("cordDisabled") === "true";
    if (!cordEnabled || cordDisabled) {
        cord.style.display = "none";
        return;
    }
    
    const isListedPage = pages.some(p => p.split("/").pop().toLowerCase() === page);
    if (!isListedPage) {
        cord.style.display = "none";
        return;
    }

    const cordImg = cord.querySelector("img");
    if (!cordImg) return;

    cordImg.src = "/Rogue-Illustrations/jsc/Knight-Wander-3.png";
    cord.style.display = "block";
}

function setupCordClickHandler() {
    const cord = document.querySelector(".cord");
    if (!cord) return;

    cord.addEventListener("click", (event) => {
        event.preventDefault();
        localStorage.setItem("cordDisabled", "true");
        cord.style.display = "none";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupRandomLink();
    checkCordVisibility();
    setupCordClickHandler();
});



// document.addEventListener("DOMContentLoaded", () => {
//   const cord = document.querySelector(".cord");
//   if (!cord) return;

//   const page = window.location.pathname.split("/").pop().toLowerCase();

//   if (page === "" || page === "index.html") {
//     localStorage.removeItem("cordEnabled");
//     cord.style.display = "none";
//     return;
//   }

//   const cordEnabled = localStorage.getItem("cordEnabled") === "true";
//   if (!cordEnabled) return;
//   if (!pages.includes(page)) return;

//   const cordImg = cord.querySelector("img");
//   if (!cordImg) return;

//   cordImg.src = "/Rogue-Illustrations/jsc/Knight-Wander-3.png";
//   cord.style.display = "block";

// document.addEventListener("DOMContentLoaded", () => {
//     setupRandomLink();
//     setupCord();
//
// });






