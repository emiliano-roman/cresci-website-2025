/* eslint-disable */
import $ from 'jquery';
import { gsap, Expo, Power2 } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import SplitType from 'split-type'; // Asegúrate de que SplitType esté importado

gsap.registerPlugin(ScrollTrigger);

// inicializar Lenis
export function initializeLenis() {
    // Verifica que `Lenis` esté disponible
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        direction: 'vertical',
    });

    // // Verifica si la instancia de `lenis` está correctamente inicializada
    // console.log('Lenis initialized:', lenis);

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return lenis;
}


// para manejar las transiciones de carga
export function pageTransition(initAnimations) { // Asegúrate de que initAnimations sea pasado como parámetro
	if ($("body").hasClass("cs-transition")) {
	   // Variables para controlar el preloader y Lenis
	    let preloaderActive = true; // Estado del preloader
	    let lenis;

	    // Inicializamos Lenis
	    function initLenis() {
	        lenis = new Lenis({
	            duration: 1.2,
	            easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
	            smoothWheel: true,
	            smoothTouch: false
	        });

	        function raf(time) {
	            lenis.raf(time);
	            requestAnimationFrame(raf);
	        }

	        requestAnimationFrame(raf);
	    }

		// Espera hasta que toda la página se haya cargado.
		$(window).on("load", function () {
			setTimeout(HideLoad, 1000); // Llama a HideLoad después de 0ms
		});

		// Funciones de animación de títulos en la parte superior
		const titleHero = function () {
			$(".skew-up").each(function (index) {
				const text = new SplitType($(this), {
					types: "lines, words",
					lineClass: "word-line"
				});
				let textInstance = $(this);
				let word = textInstance.find(".word-line .word");
				let tl = gsap.timeline({
					scrollTrigger: {
						trigger: textInstance,
						start: "top 85%",
						end: "top 100%",
						onComplete: function () {
							$(textInstance).removeClass("skew-up");
						}
					}
				});
				tl.set(textInstance, { opacity: 1 }).from(word, {
					y: "100%",
					duration: 1,
					stagger: 0.15,
					ease: "expo.out"
				});
			});
		};

		// Transiciones de entrada (cuando "ptr-overlay" se desliza hacia adentro).
		function RevealLoad() {
			var tl_transitIn = gsap.timeline({ defaults: { duration: 1, ease: Expo.easeInOut } });
			tl_transitIn
				.set("#page-transition", { autoAlpha: 1 })
				.to(".ptr-overlay", { scaleY: 1, transformOrigin: "center bottom" }, 0)
				// .to("#content-wrap", { y: -80, autoAlpha: 0 }, 0)
				.to("#cs-header", { y: -20, autoAlpha: 0 }, 0)
				.to(".ptr-preloader", { autoAlpha: 1 }, 0.4);
		}

		// Transiciones de salida (cuando "ptr-overlay" se desliza hacia afuera)
		function HideLoad() {
			var tl_transitOut = gsap.timeline();
			tl_transitOut
				.to(".ptr-preloader", { duration: 1, autoAlpha: 0, ease: Expo.easeInOut })
				.to(".ptr-overlay", { duration: 1, scaleY: 0, transformOrigin: "center top", ease: Expo.easeInOut }, 0.1)
				.call(() => {
					// Aquí se llama a initAnimations, asegurando que se use el contexto correcto
					if (typeof initAnimations === 'function') {
						initAnimations(); // Llama a las animaciones del proyecto
					}
				}, null, 0.1) // Llama justo después de la animación de la overlay
				.call(titleHero)
				.from("#cs-header", { duration: 1, y: 20, autoAlpha: 0, ease: Expo.easeInOut, clearProps: "all" }, 0.6)
				.from(".logo-appear", { duration: 1.5, y: 50, autoAlpha: 0, stagger: 0.4, ease: Expo.easeOut, clearProps: "all" }, 1.3)
				.from(".anim-videoUp", { duration: 1.5, autoAlpha: 0, y: 80, ease: Expo.easeOut, clearProps: "all" }, 1.7)
				// .from(".z1-content", { duration: .2, opacity: 0, zIndex:-999, ease: Expo.easeInOut })
				.set("#page-transition", { duration: 1, autoAlpha: 0, ease: Expo.easeInOut })
				.eventCallback("onComplete", function () {
					preloaderActive = false; // Cambia el estado del preloader
					document.documentElement.classList.remove("no-scroll"); // Quita la clase no-scroll
					initLenis(); // Inicializa Lenis después de que el preloader ha terminado
				});
		}

		// Agrega la clase "no-scroll" al html al inicio
		document.documentElement.classList.add("no-scroll");

		// Fuerza la recarga de la página cuando se hace clic en el botón "Atrás" del navegador.
		window.onpageshow = function (event) {
			if (event.persisted) {
				window.location.reload();
			}
		};

		// Al hacer clic en el enlace
		$("a")
			.not('[target="_blank"], [href^="#"], [href^="mailto"], [href^="tel"], .lg-trigger, .cs-btn-disabled a, .no-transition')
			.on('click', function (e) {
				e.preventDefault();
				let url = this.href;

				setTimeout(function () {
					window.location = url;
				}, 500);

				RevealLoad(); // Llama a las animaciones de carga.
			});
	}
}


// Funciones de el navbar
export function menuSite() {
	if ($("#cs-header").hasClass("cs-header-fixed")) {
		$("body").addClass("cs-header-fixed-on");
	}

	// On menu toggle button click
	var $olMenuToggleBtn = $(".cs-ol-menu-toggle-btn-text, .cs-ol-menu-toggle-btn");
	
	$olMenuToggleBtn.on("click", function() {
		$("html").toggleClass("cs-no-scroll");
		$("body").toggleClass("cs-ol-menu-open");	
		if ($("body").hasClass("cs-ol-menu-open")) {

			// Menu step in animations
			$("body").addClass("olm-toggle-no-click"); // Disable toggle button click until the animations last.

			var tl_olMenuIn = gsap.timeline({
				onComplete: function() { 
					$("body").removeClass("olm-toggle-no-click"); 
				}
			});

				 tl_olMenuIn.to(".cs-overlay-menu", { duration: 0.4, autoAlpha: 1 });
				 tl_olMenuIn.from(".cs-ol-menu-list > li", { duration: 0.4, y: 80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeOut, clearProps:"all" });
				 tl_olMenuIn.from(".cs-ol-menu-contact > li", { duration: .8, x: -20, autoAlpha: 0, stagger: 0.07, ease: Power2.easeOut, clearProps:"all" });

			// On menu link click
			$(".cs-overlay-menu a, .cs-logo a")
			.not('[target="_blank"]') // omit from selection
			.not('[href^="#"]') // omit from selection
			.not('[href^="mailto"]') // omit from selection
			.not('[href^="tel"]') // omit from selection
			// Hide sliding sidebar
			if ($(".cs-sliding-sidebar-wrap").length) {
				gsap.to(".cs-sliding-sidebar-trigger", { duration: 1, autoAlpha: 0, ease: Expo.easeOut });
			}

		} else {	

			// Menu step out animations
			// =========================
			$("body").addClass("olm-toggle-no-click"); // Disable toggle button click until the animations last.

			var tl_olMenuOut = gsap.timeline({
				onComplete: function() { 
					$("body").removeClass("olm-toggle-no-click"); 
				}
			});
				 tl_olMenuOut.to(".cs-ol-menu-list > li", { duration: 0.4, y: -80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeIn });
				 tl_olMenuOut.to(".cs-ol-menu-contact > li", { duration: 0.4, x: 20, autoAlpha: 0, stagger: 0.05, ease: Power2.easeIn }); 
				 tl_olMenuOut.to(".cs-overlay-menu", { duration: 0.4, autoAlpha: 0, clearProps:"all" }, "+=0.2");
				 tl_olMenuOut.set(".cs-ol-menu-list > li", { clearProps:"all" }); // clearProps only
				 tl_olMenuOut.set(".cs-ol-menu-contact > li", { clearProps:"all" }); // clearProps only

				 // Show sliding sidebar
				 if ($(".cs-sliding-sidebar-wrap").length) {
				 	gsap.to(".cs-sliding-sidebar-trigger", { duration: 1, autoAlpha: 1, ease: Expo.easeOut, clearProps:"all" }, "-=0.3");
				 }

			// Close open submenus
			setTimeout(function () {
				$(".cs-ol-submenu").slideUp(350);
				$(".cs-ol-submenu-trigger").removeClass("cs-ol-submenu-open");
			}, 500);

		}
		
		return false;
	});

	// Menu list hover
	$(".cs-ol-menu-list").on("mouseenter", function() {
		$(this).addClass("cs-ol-menu-hover");
	}).on("mouseleave", function() {
		$(this).removeClass("cs-ol-menu-hover");
	});
}



// Función para actualizar el logo color
export function updateHeaderTheme() {
    const logoWhite = document.getElementById('logo-white');
    const logoDark = document.getElementById('logo-dark');
    const menuText = document.querySelectorAll('.cs-ol-menu-toggle-btn-text');
    const bodyClass = document.body.classList;

    // Obtiene la ruta actual
    const currentPath = window.location.pathname; // O puedes usar this.$route.path si está en un componente de Vue

    // Verifica la ruta y aplica la lógica para mostrar el logo correspondiente
    if (currentPath.includes('/project')) {
        // Si la ruta incluye "project", mostrar el logo oscuro
        logoWhite.style.display = 'block';
        logoDark.style.display = 'none';
        menuText.forEach(item => item.style.color = '#FFF'); // Cambia el color del texto del menú a negro
    } else if (currentPath === '/m/' || currentPath === '/m/expertise') {
		// else if (currentPath === '/2025/m/' || currentPath === '/2025/m/expertise') {
        // Si la ruta es "home" o "expertise", mostrar el logo blanco
        logoWhite.style.display = 'none';
        logoDark.style.display = 'block';
        menuText.forEach(item => item.style.color = '#000'); // Cambia el color del texto del menú a blanco
    } else {
        // En cualquier otra ruta, puedes definir un comportamiento por defecto si es necesario
        logoWhite.style.display = 'none';
        logoDark.style.display = 'none';
        menuText.forEach(item => item.style.color = '#FFF'); // Cambia el color del texto del menú a negro
    }
}


// Función para inicializar el evento
export function initThemeUpdate() {
    // Llama a la función al cargar el documento
    document.addEventListener('DOMContentLoaded', updateHeaderTheme);

    // Si estás utilizando un router, también llama a la función en cada cambio de ruta
    window.addEventListener('popstate', updateHeaderTheme); // Para navegaciones hacia atrás/adelante

    // Si estás utilizando Vue Router, podrías hacer algo como esto:
    // router.afterEach(() => {
    //     updateHeaderTheme();
    // });
}


// Funciones para el NavBar
export function navbarFix() {
	// HEADER SCROLL FIXED
	window.addEventListener('load', function() {
	    // Registrar el plugin ScrollTrigger con GSAP
	    gsap.registerPlugin(ScrollTrigger);

	    var scrollUp = document.querySelector('.jwpnavbar');
	    var logoWhite = document.getElementById('logo-white');
	    var logoDark = document.getElementById('logo-dark');

	    ScrollTrigger.create({
	        start: 'top -50',
	        end: 99999,
	        markers: false,  // Eliminar los marcadores: true en producción
	        toggleClass: {
	            className: 'jwpnavbar--scrolled',
	            targets: '.jwpnavbar'
	        },
	        onEnter: () => {
	            // Si el body tiene la clase theme-white, oculta el logo oscuro
	            if (document.body.classList.contains('theme-white')) {
	                logoDark.style.display = 'none'; // Ocultar logo oscuro
	                logoWhite.style.display = 'block'; // Mostrar logo blanco
	            }
	        },
	        onLeaveBack: () => {
	            // Si el body tiene la clase theme-white, muestra el logo oscuro y oculta el blanco
	            if (document.body.classList.contains('theme-white')) {
	                logoDark.style.display = 'block'; // Mostrar logo oscuro
	                logoWhite.style.display = 'none'; // Ocultar logo blanco
	            }
	        }
	    });

	    ScrollTrigger.create({
	        start: 'top -300',
	        end: 99999,
	        toggleClass: {
	            className: 'jwpnavbar--up',
	            targets: '.jwpnavbar'
	        },
	        onUpdate: ({ direction }) => {
	            if (direction == -1) {
	                scrollUp.classList.remove('jwpnavbar--up');
	            } else {
	                scrollUp.classList.add('jwpnavbar--up');
	            }
	        }
	    });
	});

	// HEADER LOGO 
	// =================
	const sections = gsap.utils.toArray('.logo-white');
	sections.forEach(section => {
		 ScrollTrigger.create({
			 trigger: section,
			 start: 'top top-=-120',
			 end: 'bottom top-=-120',
			 toggleClass: {
				 targets: '.cs-header-fixed',
				 className: 'has-scrolled'
			 },
			 markers: false
		 })
	});
}



// Funciones de animacion
export function animationsEfx() {
	// Image parallax
	// ===============
	$(".anim-image-parallax").each(function() {

		// Add wrap <div>.
		$(this).wrap('<div class="anim-image-parallax-wrap"><div class="anim-image-parallax-inner"></div></div>');

		// Add overflow hidden.
		$(".anim-image-parallax-wrap").css({ "overflow": "hidden" });

		var $animImageParallax = $(this);
		var $aipWrap = $animImageParallax.parents(".anim-image-parallax-wrap");
		var $aipInner = $aipWrap.find(".anim-image-parallax-inner");

		// Parallax
		gsap.to($animImageParallax, {
			yPercent: 30,
			ease: "none",
			scrollTrigger: {
				trigger: $aipWrap,
				start: "top bottom",
				end: "bottom top",
				scrub: true,
				markers: false,
			}, 
		});

		// Zoom in
		let tl_aipZoomIn = gsap.timeline({
			scrollTrigger: {
				trigger: $aipWrap,
				start: "top 90%",
				markers: false,
			}
		});
		tl_aipZoomIn.from($aipInner, { duration: 1.5, autoAlpha: 0, scale: 1.2, ease: Power2.easeOut, clearProps:"all" });

	});


	// Appear on scroll
	// =================

	// zoom in
	$(".anim-zoomin").each(function() {

		// Add wrap <div>.
		$(this).wrap('<div class="anim-zoomin-wrap"></div>');

		// Add overflow hidden.
		$(".anim-zoomin-wrap").css({ "overflow": "hidden" })

		var $this = $(this);
		var $asiWrap = $this.parents(".anim-zoomin-wrap");

		let tl_ZoomIn = gsap.timeline({
			scrollTrigger: {
				trigger: $asiWrap,
				start: "top 90%",
				markers: false,
				onEnter: () => animZoomInRefresh(),
			}
		});
		tl_ZoomIn.from($this, { duration: 1.5, autoAlpha: 0, scale: 1.2, ease: Power2.easeOut, clearProps:"all" });

		// Refresh start/end positions on enter.
		function animZoomInRefresh() {
			ScrollTrigger.refresh();
		};
	});


	// fade in-up
	$(".anim-fadeinup").each(function() {
		let tl_FadeInUp = gsap.timeline({
			scrollTrigger: {
				trigger: this,
				start: "top bottom",
				markers: false
			}
		});

		tl_FadeInUp.from(this, { duration: 1.2, autoAlpha: 0, y: 100, ease: Expo.easeOut, clearProps:"all" }, "+=0.3");
	});

	// fade in-up
	$(".anim-fadeindown").each(function() {
		let tl_FadeInDown = gsap.timeline({
			scrollTrigger: {
				trigger: this,
				start: "top bottom",
				markers: false
			}
		});

		tl_FadeInDown.from(this, { duration: 1.2, autoAlpha: 0, y: -100, stagger: 0.4, ease: Expo.easeOut, clearProps:"all" }, "+=0.3");
	});



	// fade in-up
	$(".anim-moveUp").each(function() {
		let tl_moveUp = gsap.timeline({
			scrollTrigger: {
				trigger: this,
				start: "top bottom",
				markers: false
			}
		});

		tl_moveUp.from(this, { duration: 1, autoAlpha: 0, y: 150, skewY: 0, ease: Expo.easeOut, clearProps:"all" }, "+=0.3");
	});

}



// Funciones del Text Marquee
export function textScrolling() {
	// Scrolling text
	$(".cs-scrolling-text").each(function() {
		var $tt_stSpeed = $(this).data("scroll-speed");
		$(this).find(".cs-scrolling-text-inner").css({ 
			"animation-duration": $tt_stSpeed + "s",
		});
	});
}

$(window).on("pagehide", function(){
	$(window).scrollTop(0);
});


// Page header elements scrolling effects:
// export function headerParallax() {
// 	if ($("#page-header").hasClass("ph-content-parallax-hero")) {
// 	    let tlPhParallax = gsap.timeline({ 
// 	      scrollTrigger: {
// 	        trigger: "#page-header", 
// 	        start: 'top top', 
// 	        end: 'bottom top', 
// 	        scrub: 1,
// 	        markers: false
// 	      }
// 	    });

// 	    // Page header scroll title
// 	    if ($(".title-parallax").length) {
// 	      gsap.to(".title-parallax", { 
// 	        y: 500,
// 	        autoAlpha: 9,
// 	        ease: "none",
// 	        scrollTrigger: {
// 	          trigger: "#page-header",
// 	          start: "top top",
// 	          end: "60% top",
// 	          scrub: 1,
// 	          markers: false
// 	        }, 
// 	      });
// 	    }
// 	    if ($(".ph-caption-subtitle").length) {
// 	      gsap.to(".ph-caption-subtitle", { 
// 	        y: 500,
// 	        autoAlpha: 0,
// 	        ease: "none",
// 	        scrollTrigger: {
// 	          trigger: "#page-header",
// 	          start: "top top",
// 	          end: "70% top",
// 	          scrub: 1,
// 	          markers: false
// 	        }, 
// 	      });
// 	    }
// 	}  

// }




  