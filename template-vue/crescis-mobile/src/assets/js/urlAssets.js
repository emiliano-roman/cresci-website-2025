
// redirect.js
export function redirectResolution() {
    function checkResolution() {
        const anchoPantalla = window.innerWidth;
        const isMobilePage = window.location.href.includes("/m"); // Verifica si está en la página móvil

        // Redirige si está en la página móvil y el ancho de pantalla es mayor a 968
        if (isMobilePage && anchoPantalla > 968) {
            window.location.href = "https://cresci.co/";
        }
    }

    // Función debounce para optimizar el evento resize
    function debounce(func, wait = 100) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Adjunta los eventos solo cuando se llama a redirectResolution
    window.onload = checkResolution;
    window.onresize = debounce(checkResolution);
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

    // Función para cargar videos diferidos
    const lazyLoadVideo = (video) => {
        const sources = video.querySelectorAll("source[data-src]");
        let hasLoaded = false;
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

    // Detecta si es móvil
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Configuración de rootMargin según si es móvil o escritorio
    const rootMarginValue = isMobile ? '1000px' : '500px'; // Aumenta el margen en móviles
    const thresholdValue = 0.1; // Umbral del 10% para que se cargue cuando el 10% del video sea visible

    // Configurar IntersectionObserver
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                lazyLoadVideo(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: rootMarginValue,
        threshold: thresholdValue // Cargar cuando al menos el 10% sea visible
    });

    // Observar todos los videos con data-src en source
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




