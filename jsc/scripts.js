// Back button:
function goBack(){
    window.history.back();
}

//Overlay
document.addEventListener("DOMContentLoaded", () => {
    const daemonsTrigger = document.querySelector(".display-move-1");
    const daemonsOverlay = document.querySelector(".DaemonsO");
    
    if (daemonsTrigger && daemonsOverlay) {
        daemonsTrigger.addEventListener("mouseenter", () => {
            daemonsOverlay.style.opacity = ".6";
        });
        
        daemonsTrigger.addEventListener("mouseleave", () => {
            daemonsOverlay.style.opacity = "0";
        });
    }
    
    const divinesTrigger = document.querySelector(".display-move-2");
    const divinesOverlay = document.querySelector(".DivinesO");
    
    if (divinesTrigger && divinesOverlay) {
        divinesTrigger.addEventListener("mouseenter", () => {
            divinesOverlay.style.opacity = ".4";
        });
        
        divinesTrigger.addEventListener("mouseleave", () => {
            divinesOverlay.style.opacity = "0";
        });
    }

    const beastsTrigger = document.querySelector(".display-move-3");
    const beastsOverlay = document.querySelector(".BeastsO");
    
    if (beastsTrigger && beastsOverlay) {
        beastsTrigger.addEventListener("mouseenter", () => {
            beastsOverlay.style.opacity = ".6";
        });
        
        beastsTrigger.addEventListener("mouseleave", () => {
            beastsOverlay.style.opacity = "0";
        });
    }
});


const cordImageFilename = "Knight-Wander-3.png";
const pages = ["portfolio.html", "end.html", "Divine-Beings/arabas.html", "Divine-Beings/melthildkhyne.html", "Divine-Beings/immirus.html"];

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

//Shift
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

//Venture
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



//Portfolio 
let allArtwork = [];
let showingAll = false;

function loadArtwork() {
    fetch('jsc/pieces.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            allArtwork = data;
            displayArtwork(false);
        })
        .catch(error => {
            console.error('Error loading artwork:', error);
        });
}

function displayArtwork(showAll) {
    const portfolio = document.querySelector('.portfolio');
    if (!portfolio) return;
    
    portfolio.innerHTML = '';
    
    const filtered = showAll 
        ? allArtwork 
        : allArtwork.filter(art => art.category === "portfolio");
    
    filtered.forEach(art => {
        const figure = document.createElement('figure');
        if (art.isLong) figure.classList.add('long');
        
        const img = document.createElement('img');
        img.src = art.src;
        img.alt = art.title;
        
        const figcaption = document.createElement('figcaption');
        figcaption.innerHTML = `
            <h3>${art.title}</h3>
            ${art.caption ? `<p class="passage">${art.caption}</p>` : ''}
        `;
        
        figure.appendChild(img);
        figure.appendChild(figcaption);
        portfolio.appendChild(figure);
    });
    
    setTimeout(() => {
        attachLightboxListeners();
    }, 100);
}


// Lightbox
function attachLightboxListeners() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxInner = document.querySelector(".lightbox-inner");
    const containerAllPort = document.querySelector(".container-all-port");
    const captionBtn = document.getElementById("caption-btn");
    const captionText = document.getElementById("caption-text");

    if (!lightbox || !lightboxImg || !containerAllPort) return;

    document.querySelectorAll(".portfolio figure").forEach(figure => {
        const img = figure.querySelector("img");
        const figcaption = figure.querySelector("figcaption");
        
        const newImg = img.cloneNode(true);
        img.parentNode.replaceChild(newImg, img);
        
        newImg.addEventListener("click", (e) => {
            e.stopPropagation();

            lightboxImg.src = newImg.src;
            lightboxImg.alt = newImg.alt;
            
            if (figcaption && figcaption.innerHTML.trim()) {
                captionText.innerHTML = figcaption.innerHTML;
                captionBtn.classList.remove("hidden");
            } else {
                captionText.innerHTML = "";
                captionBtn.classList.add("hidden");
            }
            
            captionText.classList.remove("show");
            lightboxInner.classList.remove("caption-expanded");
            lightbox.classList.remove("caption-active");
            lightbox.classList.remove("long-layout-active");
            
            if (figure.classList.contains("long")) {
                lightboxImg.classList.add("long");
                lightboxInner.classList.add("long-layout");
            } else {
                lightboxImg.classList.remove("long");
                lightboxInner.classList.remove("long-layout");
            }
            
            lightbox.classList.add("show");
            containerAllPort.classList.add("blurred");
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadArtwork();

    const swapBtn = document.getElementById("swapBtn");
    if (swapBtn) {
        swapBtn.addEventListener("click", () => {
            showingAll = !showingAll;
            displayArtwork(showingAll);
            swapBtn.textContent = showingAll ? "Only Filtered" : "Give me Everything";
        });
    }

    const lightbox = document.getElementById("lightbox");
    const lightboxInner = document.querySelector(".lightbox-inner");
    const containerAllPort = document.querySelector(".container-all-port");
    const captionBtn = document.getElementById("caption-btn");
    const captionText = document.getElementById("caption-text");

    if (lightbox && lightboxInner && containerAllPort) {
        lightbox.addEventListener("mouseenter", () => {
            captionBtn.classList.add("visible");
        });

        lightbox.addEventListener("mouseleave", () => {
            captionBtn.classList.remove("visible");
        });

        captionBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            captionText.classList.toggle("show");
            lightboxInner.classList.toggle("caption-expanded");
            
            lightbox.classList.toggle("caption-active");
            
            if (lightboxInner.classList.contains("long-layout")) {
                lightbox.classList.toggle("long-layout-active");
            }
        });

        document.body.addEventListener("click", (e) => {
            if (lightbox.classList.contains("show")) {
                lightbox.classList.remove("show");
                containerAllPort.classList.remove("blurred");
                captionText.classList.remove("show");
                lightboxInner.classList.remove("caption-expanded");
                lightbox.classList.remove("caption-active");
                lightbox.classList.remove("long-layout-active");
            }
        });

        lightbox.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    }

    setupRandomLink();
    checkCordVisibility();
    setupCordClickHandler();
});