// Back button:
function goBack(){
    window.history.back();
}

// Notification
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

// Overlay ----
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

// Page List ----
const cordImageFilename = "Knight-Wander-3.png";
const pages = 
    ["end.html", 
    //--//
    "divinebeings/arabas.html", "divinebeings/melthildkhyne.html", "divinebeings/immirus.html", "divinebeings/apex.html", "divinebeings/syrecon.html",
    //--// 
    "beasts/enera.html", "beasts/rahznir.html", "beasts/namelessruin.html",
    //--//
    // "analects/osteon.html"
    ];

function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/divinebeings/') || path.includes('/daemonicbeings/') || path.includes('/beasts/') || path.includes('/analects/')) {
        return '../';
    }
    return '';
}


// Wanderer ----
function setupRandomLink() {
    const box = document.getElementById("shift");
    if (!box) return;

    const img1 = box.querySelector(".i3-1");
    const img2 = box.querySelector(".i3-2");
    const link = document.getElementById("randomLink");
    const sequenceContainer = document.getElementById("sequence-container");

    if (!link || !sequenceContainer) return;
    let hasBeenClicked = false;

    function resetState() {
        hasBeenClicked = false;
        img1.style.opacity = 1;
        img2.style.opacity = 0;
        document.body.style.overflow = "";
        document.querySelectorAll(".dynamic-shift-cover").forEach(el => el.remove());
        const text = document.getElementById("sequence-text");
        if (text) text.remove();
    }

    window.addEventListener("pageshow", (event) => {
        if (event.persisted) resetState();
    });

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

// Venture
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


// Portfolio ----
let allArtwork = [];
let showingAll = false;

const STAGGER_MOVE_MAX = 220;
const STAGGER_ENTER_MAX = 260;
const STAGGER_EXIT_MAX = 180;

function randomDelay(maxMs) {
    return Math.random() * maxMs;
}

const imageDimensions = new Map();
const imageLoadPromises = new Map();
let currentFigures = new Map();

function getImageDimensions(src) {
    if (imageDimensions.has(src)) {
        return Promise.resolve(imageDimensions.get(src));
    }
    if (imageLoadPromises.has(src)) {
        return imageLoadPromises.get(src);
    }
    const promise = new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const dims = { naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight };
            imageDimensions.set(src, dims);
            resolve(dims);
        };
        img.onerror = () => {
            const dims = { naturalWidth: 1, naturalHeight: 1 };
            imageDimensions.set(src, dims);
            resolve(dims);
        };
        img.src = src;
    });
    imageLoadPromises.set(src, promise);
    return promise;
}

function preloadAllImages(artworkList) {
    artworkList.forEach(art => getImageDimensions(art.src));
}

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
            preloadAllImages(allArtwork);
            displayArtwork(false);
        })
        .catch(error => {
            console.error('Error loading artwork:', error);
        });
}

function createFigureElement(art) {
    const figure = document.createElement('figure');
    if (art.isLong) figure.classList.add('long');
    figure.dataset.src = art.src;

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

    attachFigureClickListener(figure, img, figcaption);

    return figure;
}

function computeMasonryPositions(portfolio, artworkList) {
    const positions = new Map();
    const columns = 5;
    const gap = 40;
    const portfolioWidth = portfolio.offsetWidth;
    const columnWidth = (portfolioWidth - (gap * (columns - 1))) / columns;
    const columnHeights = new Array(columns).fill(0);

    artworkList.forEach(art => {
        const dims = imageDimensions.get(art.src);
        const aspectRatio = dims ? (dims.naturalHeight / dims.naturalWidth) : 1;

        const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
        const left = shortestColumn * (columnWidth + gap);
        const top = columnHeights[shortestColumn];

        positions.set(art.src, { left, top, width: columnWidth });

        const figureHeight = (columnWidth * aspectRatio) + 40;
        columnHeights[shortestColumn] += figureHeight;
    });

    positions.maxHeight = Math.max(...columnHeights, 0);
    return positions;
}

function applyPosition(figure, pos, isMobile) {
    if (isMobile) {
        figure.style.position = '';
        figure.style.left = '';
        figure.style.top = '';
        figure.style.width = '';
        return;
    }
    figure.style.position = 'absolute';
    figure.style.left = pos.left + 'px';
    figure.style.top = pos.top + 'px';
    figure.style.width = pos.width + 'px';
}

function displayArtwork(showAll) {
    const portfolio = document.querySelector('.portfolio');
    if (!portfolio) return;

    const filtered = showAll
        ? allArtwork
        : allArtwork.filter(art => art.category === "portfolio");

    const isMobile = window.innerWidth <= 768;
    const targetSrcs = new Set(filtered.map(a => a.src));
    const currentSrcs = new Set(currentFigures.keys());

    const toRemove = [...currentSrcs].filter(src => !targetSrcs.has(src));
    const toAdd = filtered.filter(a => !currentSrcs.has(a.src));
    const toKeep = filtered.filter(a => currentSrcs.has(a.src));

    const firstRects = new Map();
    if (!isMobile) {
        toKeep.forEach(art => {
            const figure = currentFigures.get(art.src);
            firstRects.set(art.src, figure.getBoundingClientRect());
        });
    }

    toRemove.forEach(src => {
        const figure = currentFigures.get(src);
        currentFigures.delete(src);
        const delay = randomDelay(STAGGER_EXIT_MAX);
        figure.style.transition = `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms`;
        figure.style.opacity = '0';
        figure.style.transform = 'scale(0.94)';
        figure.style.pointerEvents = 'none';
        setTimeout(() => figure.remove(), 420 + delay);
    });

    Promise.all(filtered.map(art => getImageDimensions(art.src).then(dims => ({ art, dims }))))
        .then(() => {
            const newFigureMap = new Map();
            toAdd.forEach(art => {
                const figure = createFigureElement(art);
                figure.style.opacity = '0';
                portfolio.appendChild(figure);
                currentFigures.set(art.src, figure);
                newFigureMap.set(art.src, figure);
            });

            const positions = isMobile ? null : computeMasonryPositions(portfolio, filtered);

            filtered.forEach(art => {
                const figure = currentFigures.get(art.src);
                applyPosition(figure, positions ? positions.get(art.src) : null, isMobile);
            });
            portfolio.style.height = isMobile ? 'auto' : positions.maxHeight + 'px';

            if (!isMobile) {
                toKeep.forEach(art => {
                    const figure = currentFigures.get(art.src);
                    const first = firstRects.get(art.src);
                    const last = figure.getBoundingClientRect();
                    const dx = first.left - last.left;
                    const dy = first.top - last.top;
                    const scaleX = first.width / last.width;
                    const scaleY = first.height / last.height;

                    if (dx === 0 && dy === 0 && scaleX === 1 && scaleY === 1) return;

                    figure.style.transition = 'none';
                    figure.style.transformOrigin = 'top left';
                    figure.style.transform = `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY})`;

                    const delay = randomDelay(STAGGER_MOVE_MAX);

                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            figure.style.transition = `transform 0.6s cubic-bezier(0.65, 0, 0.35, 1) ${delay}ms`;
                            figure.style.transform = 'translate(0, 0) scale(1, 1)';
                        });
                    });
                });
            }

            toAdd.forEach(art => {
                const figure = newFigureMap.get(art.src);
                const img = figure.querySelector('img');
                const delay = randomDelay(STAGGER_ENTER_MAX);

                const finishIn = () => {
                    figure.style.transition = `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`;
                    figure.style.transform = 'translateY(0)';
                    figure.style.opacity = '1';
                };

                figure.style.transform = 'translateY(18px)';

                if (img.complete) {
                    requestAnimationFrame(() => requestAnimationFrame(finishIn));
                } else {
                    img.onload = () => requestAnimationFrame(() => requestAnimationFrame(finishIn));
                }
            });
        });
}

function repositionAll() {
    const portfolio = document.querySelector('.portfolio');
    if (!portfolio || currentFigures.size === 0) return;

    const isMobile = window.innerWidth <= 768;
    const artworkList = [...currentFigures.keys()].map(src => ({ src }));
    // Rebuild in DOM order so masonry columns fill consistently with the visual order
    const orderedSrcs = Array.from(portfolio.children).map(fig => fig.dataset.src).filter(Boolean);

    if (isMobile) {
        currentFigures.forEach(figure => applyPosition(figure, null, true));
        portfolio.style.height = 'auto';
        return;
    }

    const positions = computeMasonryPositions(portfolio, orderedSrcs.map(src => ({ src })));
    orderedSrcs.forEach(src => {
        const figure = currentFigures.get(src);
        if (!figure) return;
        figure.style.transition = 'none';
        applyPosition(figure, positions.get(src), false);
    });
    portfolio.style.height = positions.maxHeight + 'px';
}

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(repositionAll, 100);
});

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

// Lightbox ----
let lightbox, lightboxImg, lightboxTitle, lightboxInner, containerAllPort, captionBtn, captionText, captionArea;

function cacheLightboxElements() {
    lightbox = document.getElementById("lightbox");
    lightboxImg = document.getElementById("lightbox-img");
    lightboxTitle = document.getElementById("lightbox-title");
    lightboxInner = document.querySelector(".lightbox-inner");
    containerAllPort = document.querySelector(".container-all-port");
    captionBtn = document.getElementById("caption-btn");
    captionText = document.getElementById("caption-text");
    captionArea = document.getElementById("caption-area");
}

function attachFigureClickListener(figure, img, figcaption) {
    img.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!lightbox || !lightboxImg || !containerAllPort) return;

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;

        const titleElement = figcaption.querySelector("h3");
        lightboxTitle.textContent = titleElement ? titleElement.textContent : (img.alt || "");

        const captionContent = figcaption.querySelector("p.passage");
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
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(() => {
                    fitTitleText(lightboxTitle);
                });
            } else {
                fitTitleText(lightboxTitle);
            }
        });
    });
}

function toggleCaption(e) {
    e.stopPropagation();

    const isClosing = captionText.classList.contains("show");

    if (isClosing) {
        const currentWidth = captionText.getBoundingClientRect().width;
        captionText.style.width = currentWidth + "px";
        void captionText.offsetWidth;

        captionText.classList.remove("show");
        captionText.style.width = "0px";
    } else {
        captionText.classList.add("show");
        captionText.style.width = "";
    }

    lightboxInner.classList.toggle("caption-expanded");
    lightbox.classList.toggle("caption-active");

    if (lightboxInner.classList.contains("long-layout")) {
        lightbox.classList.toggle("long-layout-active");
    }
}

function initLightbox() {
    cacheLightboxElements();
    if (!lightbox || !lightboxInner || !containerAllPort) return;

    lightbox.addEventListener("mouseenter", () => {
        captionBtn.classList.add("visible");
    });

    lightbox.addEventListener("mouseleave", () => {
        captionBtn.classList.remove("visible");
    });

    captionBtn.addEventListener("click", toggleCaption);

    captionArea.addEventListener("click", (e) => {
        if (captionBtn.classList.contains('hidden')) return;
        toggleCaption(e);
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

document.addEventListener('DOMContentLoaded', function() {
    document.fonts.load('1em "Cormorant SC"').catch(() => {});

    initLightbox();
    loadArtwork();

    const swapBtn = document.getElementById("swapBtn");
    if (swapBtn) {
        swapBtn.addEventListener("click", () => {
            showingAll = !showingAll;
            displayArtwork(showingAll);
            swapBtn.textContent = showingAll ? "Only Filtered" : "Give me Everything";
        });
    }

    setupRandomLink();
    checkCordVisibility();
    setupCordClickHandler();
});


// Translation ----
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


// Analects ----
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