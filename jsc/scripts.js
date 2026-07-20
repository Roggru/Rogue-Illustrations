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
const pages = 
    ["end.html", 
    //--//
    "divinebeings/arabas.html", "divinebeings/melthildkhyne.html", "divinebeings/immirus.html", "divinebeings/apex.html", "divinebeings/syrecon.html",
    //--// 
    "beasts/enera.html", "beasts/rahznir.html",
    //--//
    "analects/osteon.html"];

function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/divinebeings/') || path.includes('/daemonicbeings/') || path.includes('/beasts/') || path.includes('/analects/')) {
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
    const sequenceContainer = document.getElementById("sequence-container");

    if (!link || !sequenceContainer) return;
    let hasBeenClicked = false;

    box.addEventListener("mouseenter", () => {
        if (!hasBeenClicked){
            img1.style.opacity = 0;
            img2.style.opacity = 1;
        }
    });
    box.addEventListener("mouseleave", () => {
        if (!hasBeenClicked){
            img1.style.opacity = 1;
            img2.style.opacity = 0;   
        }
    });

    link.addEventListener("click", (event) => {
        event.preventDefault();
        localStorage.setItem("cordEnabled", "true");

        hasBeenClicked = true;
        img1.style.opacity = 0;
        img2.style.opacity = 1;

        document.body.style.overflow = "hidden";

        const verticalOffset = 150;
        const rect = box.getBoundingClientRect();
        const elementCenterY = rect.top + window.scrollY + (rect.height / 2);
        const targetScrollY = elementCenterY - (window.innerHeight / 2) - verticalOffset;

        const startVideo = () => {
            const updatedRect = box.getBoundingClientRect();
            const img2Rect = img2.getBoundingClientRect();
            const vw = window.innerWidth;
            const vh = window.innerHeight;

            const scale = img2Rect.width / 583.6666870117188;
            const extraTop = 15 * scale;

            const covers = [
                { top: 0, left: 0, width: img2Rect.left, height: vh },
                { top: 0, left: img2Rect.right, width: vw - img2Rect.right, height: vh },
                { top: 0, left: img2Rect.left, width: img2Rect.width, height: img2Rect.top + extraTop },
                { top: img2Rect.bottom, left: img2Rect.left, width: img2Rect.width, height: vh - img2Rect.bottom }
            ];

            covers.forEach(pos => {
                const cover = document.createElement("div");
                cover.className = "dynamic-shift-cover";
                cover.style.cssText = `
                    position: fixed;
                    top: ${pos.top}px;
                    left: ${pos.left}px;
                    width: ${pos.width}px;
                    height: ${pos.height}px;
                    background: #1b1b1d;
                    z-index: 500;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 2s ease;
                `;
                document.body.appendChild(cover);
            });

            const text = document.createElement("h3");
            text.id = "sequence-text";
            text.textContent = "Good luck";
            text.style.cssText = `
                position: fixed;
                top: 25%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #1b1b1d;
                font-family: "Cormorant SC", serif;
                font-size: 5rem;
                text-transform: uppercase;
                z-index: 99999;
                opacity: 0;
                pointer-events: none;
                transition: opacity 2s ease;
                margin: 0;
                white-space: nowrap;
            `;
            document.body.appendChild(text);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    document.querySelectorAll(".dynamic-shift-cover").forEach(cover => {
                        cover.style.opacity = "1";
                    });
                    text.style.opacity = "1";
                });
            });

            sequenceContainer.style.display = "block";

            playVideoSequence(sequenceContainer, img2Rect, () => {
                const randomIndex = Math.floor(Math.random() * pages.length);
                window.location.href = pages[randomIndex];
            });
        };

        const distance = Math.abs(window.scrollY - targetScrollY);
        if (distance < 5) {
            startVideo();
            return;
        }

        window.scrollTo({
            top: targetScrollY,
            left: window.scrollX,
            behavior: "smooth"
        });

        let scrollTimeout;
        const onScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                window.removeEventListener("scroll", onScroll);
                startVideo();
            }, 50);
        };

        window.addEventListener("scroll", onScroll);

        scrollTimeout = setTimeout(() => {
            window.removeEventListener("scroll", onScroll);
            startVideo();
        }, 1000);
    });
}

function playVideoSequence(container, startRect, onComplete) {
    const video = container.querySelector("video");

    console.log("Knight displayed width:", startRect.width);
    
    // Configuration
    const offsetXRatio = -970 / 583.6666870117188;
    const offsetYRatio = -850 / 583.6666870117188;
    const manualScale = 1.3;
    
    // Native dimensions
    const videoNativeWidth = 4320;
    const videoNativeHeight = 2550;
    const knightNativeWidth = 1440;
    
    video.pause();
    video.currentTime = 0;
    
    const nativeRatio = videoNativeWidth / knightNativeWidth;
    const knightDisplayedWidth = startRect.width;
    
    const finalWidth = knightDisplayedWidth * nativeRatio * manualScale;
    const finalHeight = (videoNativeHeight / videoNativeWidth) * finalWidth;
    
    const offsetX = knightDisplayedWidth * offsetXRatio;
    const offsetY = knightDisplayedWidth * offsetYRatio;
    
    const finalLeft = startRect.left + offsetX;
    const finalTop = startRect.top + offsetY;
    
    video.style.position = "fixed";
    video.style.top = finalTop + "px";
    video.style.left = finalLeft + "px";
    video.style.width = finalWidth + "px";
    video.style.height = finalHeight + "px";
    video.style.objectFit = "fill";
    video.style.zIndex = "99999";
    
    void video.offsetWidth;
    
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            video.play().catch(err => {
                console.error("Video play failed:", err);
            });
        });
    });
    
    video.onended = () => {
        if (onComplete) onComplete();
    };
}

window.addEventListener("pageshow", (event) => {
    const sequenceContainer = document.getElementById("sequence-container");
    if (sequenceContainer) {
        sequenceContainer.style.display = "none";
        document.body.style.overflow = "";

        const video = sequenceContainer.querySelector("video");
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    }

    document.querySelectorAll(".dynamic-shift-cover").forEach(c => c.remove());
    const text = document.getElementById("sequence-text");
    if (text) text.remove();

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
    
    portfolio.style.opacity = '0';
    portfolio.innerHTML = '';
    
    let imagesLoaded = 0;
    const totalImages = filtered.length;
    
    filtered.forEach(art => {
        const figure = document.createElement('figure');
        if (art.isLong) figure.classList.add('long');
        
        figure.classList.add('new');
        
        const img = document.createElement('img');
        img.src = art.src;
        img.alt = art.title;
        
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                layoutMasonry();
                
                setTimeout(() => {
                    portfolio.querySelectorAll('figure.new').forEach(fig => {
                        fig.classList.remove('new');
                    });

                    portfolio.style.transition = 'opacity 0.3s ease';
                    portfolio.style.opacity = '1';
                    attachLightboxListeners();
                }, 50);
            }
        };
        
        const figcaption = document.createElement('figcaption');
        figcaption.innerHTML = `
            <h3>${art.title}</h3>
            ${art.caption ? `<p class="passage">${art.caption}</p>` : ''}
        `;
        
        figure.appendChild(img);
        figure.appendChild(figcaption);
        portfolio.appendChild(figure);
    });
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

function fitTitleText(el) {
    const maxFontSize = 36;
    const minFontSize = 16;
    let fontSize = maxFontSize;
    
    el.style.fontSize = fontSize + 'px';
    
    while (el.scrollWidth > el.clientWidth && fontSize > minFontSize) {
        fontSize -= 1;
        el.style.fontSize = fontSize + 'px';
    }
}

window.addEventListener('resize', () => {
    layoutMasonry();
});

// Lightbox
function attachLightboxListeners() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxTitle = document.getElementById("lightbox-title");
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
            
            const titleElement = figcaption ? figcaption.querySelector("h3") : null;
            if (titleElement) {
                lightboxTitle.textContent = titleElement.textContent;
            } else {
                lightboxTitle.textContent = newImg.alt || "";
            }
            
            const captionContent = figcaption ? figcaption.querySelector("p.passage") : null;
            const hasCaption = captionContent && captionContent.textContent.trim();
            
            if (hasCaption) {
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
            document.body.classList.add("lightbox-active");

            requestAnimationFrame(() => {
                fitTitleText(lightboxTitle);
            });
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
                document.body.classList.remove("lightbox-active");
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


//Analects
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const revealPoint = pageHeight * 0.8;
    
    const hiddenElements = document.querySelectorAll('.analect-hidden');
    
    hiddenElements.forEach(function(element) {
        if (scrollPosition >= revealPoint) {
            element.classList.add('analect-header');
        }
    });
});