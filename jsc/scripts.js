// Back button:
function goBack(){
    window.history.back();
}

//Notification
const notif = document.querySelector('.notif');

if (notif) {
    if (sessionStorage.getItem('notifDismissed') === 'true') {
        notif.style.display = 'none';
    }
    
    notif.addEventListener('click', function() {
        notif.style.display = 'none';
        sessionStorage.setItem('notifDismissed', 'true');
    });
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
const pages = ["portfolio.html", "end.html", "divinebeings/arabas.html", "divinebeings/melthildkhyne.html", "divinebeings/immirus.html"];

function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/divinebeings/') || path.includes('/daemonbeings/') || path.includes('/beastialkind/')) {
        return '../';
    }
    return '';
}

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

    const basePath = getBasePath();
    cordImg.src = basePath + "jsc/Knight-Wander-3.png";
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
    const basePath = getBasePath();
    fetch(basePath + 'jsc/pieces.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            allArtwork = data;
            displayArtwork(false, true);
        })
        .catch(error => {
            console.error('Error loading artwork:', error);
        });
}

function displayArtwork(showAll) {
    const portfolio = document.querySelector('.portfolio');
    if (!portfolio) return;
    
    const filtered = showAll 
        ? allArtwork 
        : allArtwork.filter(art => art.category === "portfolio");
    
    portfolio.innerHTML = '';
    
    filtered.forEach(art => {
        const figure = document.createElement('figure');
        if (art.isLong) figure.classList.add('long');
        
        figure.classList.add('new');
        
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
        portfolio.querySelectorAll('figure.new').forEach(fig => {
            fig.classList.remove('new');
        });
        layoutMasonry();
        attachLightboxListeners();
    }, 100);
}

function layoutMasonry() {
    const portfolio = document.querySelector('.portfolio');
    if (!portfolio) return;
    
    if (window.innerWidth <= 768) {
        portfolio.style.height = 'auto';
        const figures = Array.from(portfolio.querySelectorAll('figure'));
        figures.forEach(figure => {
            figure.style.position = '';
            figure.style.left = '';
            figure.style.top = '';
            figure.style.width = '';
        });
        return;
    }
    
    const figures = Array.from(portfolio.querySelectorAll('figure'));
    const columns = 5;
    const gap = 40;
    
    const portfolioWidth = portfolio.offsetWidth;
    const columnWidth = (portfolioWidth - (gap * (columns - 1))) / columns;
    
    const columnHeights = new Array(columns).fill(0);
    
    figures.forEach((figure, index) => {
        const img = figure.querySelector('img');
        
        if (img.complete) {
            positionFigure(figure, img, columnWidth, columnHeights, gap, columns);
        } else {
            img.onload = () => {
                positionFigure(figure, img, columnWidth, columnHeights, gap, columns);
            };
        }
    });
}

function positionFigure(figure, img, columnWidth, columnHeights, gap, columns) {

    const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
    
    const left = shortestColumn * (columnWidth + gap);
    const top = columnHeights[shortestColumn];
    
    figure.style.position = 'absolute';
    figure.style.left = left + 'px';
    figure.style.top = top + 'px';
    figure.style.width = columnWidth + 'px';
    
    const aspectRatio = img.naturalHeight / img.naturalWidth;
    const figureHeight = (columnWidth * aspectRatio) + 40;
    
    columnHeights[shortestColumn] += figureHeight;
    
    const maxHeight = Math.max(...columnHeights);
    figure.parentElement.style.height = maxHeight + 'px';
}

window.addEventListener('resize', () => {
    layoutMasonry();
});

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


// Translation
document.addEventListener('DOMContentLoaded', function() {
    const speakElements = document.querySelectorAll('.speak');
    
    speakElements.forEach(speak => {
        const bkp = speak.querySelector('.bkp');
        const bkpT = speak.querySelector('.bkp-t');
        
        if (!bkp || !bkpT) return;
        
        const originalText = bkp.textContent;
        const translatedText = bkpT.textContent;

        setupDecipherLayers(bkp, bkpT, originalText, translatedText);
        
        let isTranslated = false;
        let isAnimating = false;
        
        speak.addEventListener('mouseenter', () => {
            if (!isTranslated && !isAnimating) {
                isAnimating = true;
                revealText(bkp, bkpT, true, () => {
                    isTranslated = true;
                    isAnimating = false;
                });
            }
        });
        
        speak.addEventListener('mouseleave', () => {
            if (isTranslated && !isAnimating) {
                isAnimating = true;
                revealText(bkp, bkpT, false, () => {
                    isTranslated = false;
                    isAnimating = false;
                });
            }
        });
    });
});

function setupDecipherLayers(bkp, bkpT, originalText, translatedText) {
    const fadeDuration = 2;
    
    bkp.innerHTML = originalText.split('').map((char) => 
        `<span style="display: inline-block; min-width: ${char === ' ' ? '0.25em' : 'auto'}; transition: opacity ${fadeDuration}s ease;">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');
    
    bkpT.innerHTML = translatedText.split('').map((char) => 
        `<span style="display: inline-block; min-width: ${char === ' ' ? '0.25em' : 'auto'}; opacity: 0; transition: opacity ${fadeDuration}s ease;">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');
    
    bkpT.style.display = 'block';
}

function revealText(bkp, bkpT, showTranslation, callback) {
    const duration = 3000;
    const charsPerStep = 2;
    
    const bkpSpans = bkp.querySelectorAll('span');
    const bkpTSpans = bkpT.querySelectorAll('span');
    
    const maxLength = Math.max(bkpSpans.length, bkpTSpans.length);
    
    let indices = [...Array(maxLength).keys()];
    indices.sort(() => Math.random() - 0.5);
    
    const totalSteps = Math.ceil(maxLength / charsPerStep);
    
    for (let step = 0; step < totalSteps; step++) {
        const delay = (duration / totalSteps) * step;
        
        setTimeout(() => {
            for (let j = 0; j < charsPerStep; j++) {
                const indexPos = step * charsPerStep + j;
                if (indexPos >= indices.length) break;
                
                const charIndex = indices[indexPos];
                
                if (showTranslation) {
                    if (charIndex < bkpSpans.length) {
                        bkpSpans[charIndex].style.opacity = '0';
                    }
                    if (charIndex < bkpTSpans.length) {
                        bkpTSpans[charIndex].style.opacity = '1';
                    }
                } else {
                    if (charIndex < bkpTSpans.length) {
                        bkpTSpans[charIndex].style.opacity = '0';
                    }
                    if (charIndex < bkpSpans.length) {
                        bkpSpans[charIndex].style.opacity = '1';
                    }
                }
                
                if (indexPos === indices.length - 1 && callback) {
                    setTimeout(callback, 2000);
                }
            }
        }, delay);
    }
}