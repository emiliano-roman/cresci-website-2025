/* eslint-disable */
import $ from 'jquery'; 
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis'; 
import imagesLoaded from 'imagesloaded'; // importar imagesLoaded

// Inicializa GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

let lenis;

export default function initialiseImageTrail() {
  const body = document.body;
  const docEl = document.documentElement;

  const MathUtils = {
    lerp: (a, b, n) => (1 - n) * a + n * b,
    distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1)
  };

  let masteringSection;

  const calcMasteringWinsize = () => {
    const section = document.getElementById('mastering');
    if (section) {
      masteringSection = {
        width: section.offsetWidth,
        height: section.offsetHeight,
        offsetLeft: section.getBoundingClientRect().left + window.pageXOffset,
        offsetTop: section.getBoundingClientRect().top + window.pageYOffset
      };
    } else {
      masteringSection = null; // Asegúrate de que se asigne null si no se encuentra
    }
  };

  calcMasteringWinsize();
  window.addEventListener('resize', calcMasteringWinsize);

  // Asegura que el cálculo de dimensiones ocurra después de la carga completa de la página
  window.onload = () => {
    calcMasteringWinsize();
  };

  const getMasteringMousePos = (ev) => {
    let posx = 0, posy = 0;
    if (masteringSection) {
      if (!ev) ev = window.event;
      posx = (ev.pageX || ev.clientX + body.scrollLeft + docEl.scrollLeft) - masteringSection.offsetLeft;
      posy = (ev.pageY || ev.clientY + body.scrollTop + docEl.scrollTop) - masteringSection.offsetTop;
    }
    return { x: posx, y: posy };
  };

  let mousePos = { x: 0, y: 0 };
  let lastMousePos = { x: 0, y: 0 };
  let cacheMousePos = { x: 0, y: 0 };
  let isInMasteringSection = false;

  window.addEventListener('mousemove', ev => {
    const pos = getMasteringMousePos(ev);
    isInMasteringSection = pos.x >= 0 && pos.y >= 0 && masteringSection && pos.x <= masteringSection.width && pos.y <= masteringSection.height;
    if (isInMasteringSection) {
      mousePos = pos;
    }
  });

  const getMouseDistance = () => MathUtils.distance(mousePos.x, mousePos.y, lastMousePos.x, lastMousePos.y);

  class Image {
    constructor(el) {
      this.DOM = { el };
      this.defaultStyle = { x: 0, y: 0, opacity: 0 };
      this.getRect();
      this.initEvents();
    }

    initEvents() {
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      gsap.set(this.DOM.el, this.defaultStyle);
      this.getRect();
    }

    getRect() {
      this.rect = this.DOM.el.getBoundingClientRect();
    }

    isActive() {
      return gsap.isTweening(this.DOM.el) || this.DOM.el.style.opacity != 0;
    }
  }

  class ImageTrail {
    constructor() {
      this.DOM = { content: document.querySelector('.content-trail') };
      this.images = Array.from(this.DOM.content.querySelectorAll('img')).map(img => new Image(img));
      this.imagesTotal = this.images.length;
      this.imgPosition = 0;
      this.zIndexVal = 1;
      this.threshold = 100;
      requestAnimationFrame(() => this.render());
    }

    render() {
      if (isInMasteringSection) {
        let distance = getMouseDistance();
        cacheMousePos.x = MathUtils.lerp(cacheMousePos.x || mousePos.x, mousePos.x, 0.1);
        cacheMousePos.y = MathUtils.lerp(cacheMousePos.y || mousePos.y, mousePos.y, 0.1);

        if (distance > this.threshold) {
          this.showNextImage();
          ++this.zIndexVal;
          this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
          lastMousePos = mousePos;
        }

        const isIdle = this.images.every(img => !img.isActive());
        if (isIdle && this.zIndexVal !== 1) {
          this.zIndexVal = 1;
        }
      }
      requestAnimationFrame(() => this.render());
    }

    showNextImage() {
      const img = this.images[this.imgPosition];
      gsap.killTweensOf(img.DOM.el);

      if (masteringSection) { // Asegúrate de que masteringSection no sea nulo
        gsap.timeline()
          .set(img.DOM.el, {
            startAt: { opacity: 0 },
            opacity: 1,
            zIndex: this.zIndexVal,
            x: cacheMousePos.x - img.rect.width / 2,
            y: cacheMousePos.y - img.rect.height / 2
          }, 0)
          .to(img.DOM.el, 1.6, {
            ease: "expo.out",
            x: mousePos.x - img.rect.width / 2,
            y: mousePos.y - img.rect.height / 2
          }, 0)
          .to(img.DOM.el, 1, {
            ease: "power1.out",
            opacity: 1
          }, 0.4)
          .to(img.DOM.el, 2, {
            ease: "quint.inOut",
            y: `+=${masteringSection.height + img.rect.height / 2}`
          }, 0.4)
          .eventCallback('onComplete', () => {
            img.DOM.el.style.opacity = 1;  // Mantener visible la imagen
          });
      }
    }
  }

  const preloadImages = () => {
    return new Promise((resolve) => {
      imagesLoaded(document.querySelectorAll('.content__img'), { background: true }, resolve);
    });
  };

  preloadImages().then(() => {
    document.body.classList.remove('loading');
    new ImageTrail();
  });
}
