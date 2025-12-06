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
  if (document.currentScript && document.currentScript.src) {
    return document.currentScript.src;
  }

  const scripts = document.getElementsByTagName("script");
  for (let i = scripts.length - 1; i >= 0; i--) {
    const s = scripts[i].src || "";
    if (!s) continue;
    if (s.includes("/jsc/") || s.endsWith("/scripts.js") || s.endsWith("/cord.js")) {
      return s;
    }
  }

  const last = scripts[scripts.length - 1];
  return (last && last.src) ? last.src : "";
}

function getScriptFolder() {
  const scriptUrl = getThisScriptUrl();
  if (!scriptUrl) return "";

  const decoded = decodeURIComponent(scriptUrl);
  const clean = decoded.split(/[?#]/)[0];
  return clean.substring(0, clean.lastIndexOf("/"));
}

function getCordImagePath() {
  const folder = getScriptFolder();
  if (folder) {
    return folder + "/" + cordImageFilename;
  }
  return "jsc/" + cordImageFilename;
}

function enableCord() {
  localStorage.setItem("cordEnabled", "true");
  localStorage.removeItem("visitedIndex");
  sessionStorage.removeItem("cordHidden");
}

function updateCordVisibility() {
  const cord = document.querySelector(".cord");
  if (!cord) return;

  const cordImg = cord.querySelector("img");
  const imagePath = getCordImagePath();
  if (cordImg) cordImg.src = imagePath;

  const currentPage = window.location.pathname.split("/").pop().toLowerCase().replace(/\/$/, "");
  const isIndex = currentPage === "index.html" || currentPage === "";

  if (isIndex) {
    localStorage.removeItem("cordEnabled");
    localStorage.setItem("visitedIndex", "true");
    sessionStorage.setItem("cordHidden", "true");
    cord.style.display = "none";
    return;
  }

  const enabled = localStorage.getItem("cordEnabled") === "true";
  const visitedIndex = localStorage.getItem("visitedIndex") === "true";
  const hidden = sessionStorage.getItem("cordHidden") === "true";

  cord.style.display = enabled && !hidden && !visitedIndex ? "block" : "none";

  if (cordImg) {
    cordImg.addEventListener("click", () => {
      cord.style.display = "none";
      sessionStorage.setItem("cordHidden", "true");
    });
  }
}
document.addEventListener("DOMContentLoaded", updateCordVisibility);


