// Back button:
function goBack(){
    window.history.back();
}

// Wanderer:
const cordImageSrc = "Images/Knight-Wander-3.png";

function enableCord() {
    localStorage.setItem("cordEnabled", "true");
    sessionStorage.removeItem("cordHidden");
}

function updateCordVisibility() {
    const cord = document.querySelector(".cord");
    if (!cord) return;

    const cordImg = cord.querySelector("img");
    if (cordImg) cordImg.src = cordImageSrc;

    const currentPage = window.location.pathname.split("/").pop();
    const isIndex = currentPage === "index.html" || currentPage === "";

    if (isIndex) {
        localStorage.removeItem("cordEnabled");
        sessionStorage.removeItem("cordHidden");
        cord.style.display = "none";
        return;
    }

    const hidden = sessionStorage.getItem("cordHidden") === "true";
    const enabled = localStorage.getItem("cordEnabled") === "true";
    cord.style.display = enabled && !hidden ? "block" : "none";

    if (cordImg) {
        cordImg.addEventListener("click", () => {
            cord.style.display = "none";
            sessionStorage.setItem("cordHidden", "true");
        });
    }
}

document.addEventListener("DOMContentLoaded", updateCordVisibility);