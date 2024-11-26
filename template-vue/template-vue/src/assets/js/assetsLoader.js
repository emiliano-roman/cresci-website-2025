// assetsLoader.js o urlAssets.js

export function redirectResolution() {
    function checkResolution() {
        const anchoPantalla = window.innerWidth;
        const isMobilePage = window.location.href.includes("/m"); // Verifica si ya está en la página móvil

        // Redirige a la versión móvil
        if (anchoPantalla <= 968 && !isMobilePage) { 
            window.location.href = "https://cresci.co/m";  
        } 
        // Redirige a la versión de escritorio
        else if (anchoPantalla > 968 && isMobilePage) {
            window.location.href = "https://cresci.co/";
        }
    }
  
    function debounce(func, wait = 100) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
  
    window.addEventListener("load", checkResolution);
    window.addEventListener("resize", debounce(checkResolution));
}

export function initUrlAssets() {
    const AssetsBaseUrl = "https://d2llx07cilb2cs.cloudfront.net/";

    // Cargar imágenes con data-src
    const allImgs = document.querySelectorAll("img[data-src]");
    allImgs.forEach((img) => {
        const dataSrc = img.getAttribute("data-src");
        if (dataSrc) {
            img.setAttribute("src", AssetsBaseUrl + dataSrc);
            img.removeAttribute("data-src");
        }
    });

    // Lazy loading para videos
    const lazyLoadVideo = (video) => {
        let hasLoaded = false;
        const sources = video.querySelectorAll("source[data-src]");
        sources.forEach((source) => {
            const srcData = source.getAttribute("data-src");
            if (srcData) {
                source.setAttribute("src", AssetsBaseUrl + srcData);
                source.removeAttribute("data-src");
                hasLoaded = true;
            }
        });
        if (hasLoaded) {
            video.load();
        }
    };

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    lazyLoadVideo(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        },
        {
            rootMargin: '500px', // Cargar antes de entrar en el viewport
            threshold: 0.1 // Cargar cuando al menos el 10% sea visible
        }
    );

    const videos = document.querySelectorAll("video source[data-src]");
    videos.forEach((source) => {
        observer.observe(source.closest('video'));
    });
}



function attachAssetLoader() {
    document.addEventListener("DOMContentLoaded", initUrlAssets);
    window.addEventListener("load", initUrlAssets);
}

attachAssetLoader();

