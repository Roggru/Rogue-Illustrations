// Back button:
function goBack(){
    window.history.back();
}

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

const cordImageFilename = "Knight-Wander-3.png";

function getThisScriptUrl() {
  if (document.currentScript?.src) return document.currentScript.src;
  const scripts = document.getElementsByTagName("script");
  for (let i = scripts.length - 1; i >= 0; i--) {
    const src = scripts[i].src || "";
    if (src.includes("/jsc/") || src.endsWith("/scripts.js") || src.endsWith("/cord.js")) {
      return src;
    }
  }
  return "";
}

function getScriptFolder() {
  const url = getThisScriptUrl();
  if (!url) return "";
  return decodeURIComponent(url).split(/[?#]/)[0].replace(/\/[^/]*$/, "");
}

function getCordImagePath() {
  const folder = getScriptFolder();
  return folder ? `${folder}/${cordImageFilename}` : `jsc/${cordImageFilename}`;
}

function enableCord() {
  if (localStorage.getItem("cordBurned") === "true") return;
  localStorage.setItem("cordEnabled", "true");
}

function updateCordVisibility() {
  const cord = document.querySelector(".cord");
  if (!cord) return;

  const cordImg = cord.querySelector("img");
  if (cordImg) cordImg.src = getCordImagePath();

  const page = window.location.pathname.split("/").pop().toLowerCase().replace(/\/$/, "");
  const isIndex = page === "" || page === "index.html";

  if (isIndex) {
    localStorage.removeItem("cordEnabled");
    cord.style.display = "none";
    return;
  }

  cord.style.display =
    localStorage.getItem("cordEnabled") === "true" &&
    localStorage.getItem("cordBurned") !== "true"
      ? "block"
      : "none";

  if (cordImg && !cordImg.dataset.bound) {
    cordImg.dataset.bound = "true";
    cordImg.addEventListener("click", () => {
      localStorage.removeItem("cordEnabled");
      localStorage.setItem("cordBurned", "true");
      cord.style.display = "none";
    });
  }
}
window.addEventListener("pageshow", updateCordVisibility);





