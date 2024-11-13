/* eslint-disable */
import $ from 'jquery';
import { gsap, Expo, Power2 } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import SplitType from 'split-type'; // Asegúrate de que SplitType esté importado

gsap.registerPlugin(ScrollTrigger);

// Función para inicializar Lenis
export function initializeLenis() {
	const initSmoothScrolling = () => {
		// Initialize Lenis for smooth scroll effects. Lerp value controls the smoothness.
		const lenis = new Lenis({ lerp: 0.12 });
		
		// Sync ScrollTrigger with Lenis' scroll updates.
		lenis.on('scroll', ScrollTrigger.update);
		
		// Ensure GSAP animations are in sync with Lenis' scroll frame updates.
		gsap.ticker.add(time => {
			lenis.raf(time * 1000); // Convert GSAP's time to milliseconds for Lenis.
		});
		
		// Turn off GSAP's default lag smoothing to avoid conflicts with Lenis.
		gsap.ticker.lagSmoothing(0);
	  };	 
}

// Función para manejar las transiciones de carga
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
			setTimeout(HideLoad, 200); // Llama a HideLoad después de 0ms
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

		function RevealLoad() {
			var tl_transitIn = gsap.timeline({ defaults: { duration: 1, ease: Expo.easeInOut } });
			tl_transitIn
				.set("#page-transition", { autoAlpha: 1 })
				.to(".ptr-overlay", { scaleY: 1, transformOrigin: "center bottom" }, 0)
				// .to("#content-wrap", { y: -80, autoAlpha: 0 }, 0)
				.to("#cs-header", { y: -20, autoAlpha: 0 }, 0)
				.to(".ptr-preloader", { autoAlpha: 1 }, 0);
		}

		// Transiciones de salida (cuando "ptr-overlay" se desliza hacia afuera)
		function HideLoad() {
			var tl_transitOut = gsap.timeline();
			tl_transitOut
				.to(".ptr-preloader", { duration: 1, autoAlpha: 0, ease: Expo.easeInOut })
				.to(".ptr-overlay", { duration: 1, scaleY: 0, transformOrigin: "center top", ease: Expo.easeInOut }, 0.3)
				.call(() => {
					// Aquí se llama a initAnimations, asegurando que se use el contexto correcto
					if (typeof initAnimations === 'function') {
						initAnimations(); // Llama a las animaciones del proyecto
					}
				}, null, 0.3) // Llama justo después de la animación de la overlay
				.call(titleHero)
				.from("#cs-header", { duration: 1, y: 20, autoAlpha: 0, ease: Expo.easeInOut, clearProps: "all" }, 0.6)
				.from(".logo-appear", { duration: 1.5, y: 50, autoAlpha: 0, stagger: 0.4, ease: Expo.easeOut, clearProps: "all" }, 1.4)
				
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
				}, 1000);

				RevealLoad(); // Llama a las animaciones de carga.
			});
	}
}

// cursor
export function cursorMagic() {
	if ($("body").not(".is-mobile").hasClass("cs-magic-cursor")) {
		if ($(window).width() > 1024) {
			$(".magnetic-item").wrap('<div class="magnetic-wrap"></div>');
			
			if ($("a.magnetic-item").length) {
				$("a.magnetic-item").addClass("not-hide-cursor");
			}

			var $mouse = { x: 0, y: 0 }; // Cursor position
			var $pos = { x: 0, y: 0 }; // Cursor position
			var $ratio = 0.15; // delay follow cursor
			var $active = false;
			var $ball = $("#ball");

			var $ballWidth = 34; // Ball default width
			var $ballHeight = 34; // Ball default height
			var $ballScale = 1; // Ball default scale
			var $ballOpacity = 1 // Ball default opacity
			var $ballBorderWidth = 2; // Ball default border width

			gsap.set($ball, {  // scale from middle and style ball
				xPercent: -50, 
				yPercent: -50, 
				width: $ballWidth,
				height: $ballHeight,
				borderWidth: $ballBorderWidth, 
				opacity: $ballOpacity 
			});

			document.addEventListener("mousemove", mouseMove);

			function mouseMove(e) {
				$mouse.x = e.clientX;
				$mouse.y = e.clientY;
			}

			gsap.ticker.add(updatePosition);

			function updatePosition() {
				if (!$active) {
					$pos.x += ($mouse.x - $pos.x) * $ratio;
					$pos.y += ($mouse.y - $pos.y) * $ratio;

					gsap.set($ball, { x: $pos.x, y: $pos.y });
				}
			}

			$(".magnetic-wrap").mousemove(function(e) {
				parallaxCursor(e, this, 2); // magnetic ball = low number is more attractive
				callParallax(e, this);
			});

			function callParallax(e, parent) {
				parallaxIt(e, parent, parent.querySelector(".magnetic-item"), 25); // magnetic area = higher number is more attractive
			}

			function parallaxIt(e, parent, target, movement) {
				var boundingRect = parent.getBoundingClientRect();
				var relX = e.clientX - boundingRect.left;
				var relY = e.clientY - boundingRect.top;

				gsap.to(target, {
					duration: 0.3, 
					x: ((relX - boundingRect.width / 2) / boundingRect.width) * movement,
					y: ((relY - boundingRect.height / 2) / boundingRect.height) * movement,
					ease: Power2.easeOut
				});
			}

			function parallaxCursor(e, parent, movement) {
				var rect = parent.getBoundingClientRect();
				var relX = e.clientX - rect.left;
				var relY = e.clientY - rect.top;
				$pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
				$pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
				gsap.to($ball, {duration: 0.3, x: $pos.x, y: $pos.y });
			}


			// Magnetic item hover.
			$(".magnetic-wrap").on("mouseenter", function(e) {
				gsap.to($ball, { duration: 0.3, scale: 2, borderWidth: 1, opacity: $ballOpacity });
				$active = true;
			}).on("mouseleave", function(e) {
				gsap.to($ball, { duration: 0.3, scale: $ballScale, borderWidth: $ballBorderWidth, opacity: $ballOpacity });
				gsap.to(this.querySelector(".magnetic-item"), { duration: 0.3, x: 0, y: 0, clearProps:"all" });
				$active = false;
			});

			// Alternative cursor style on hover.
			$(".cursor-alter, .cs-main-menu-list > li > a, .cs-main-menu-list > li > .cs-submenu-trigger > a")
			.not(".magnetic-item") // omit from selection.
			.on("mouseenter", function() {
				gsap.to($ball, {
					duration: 0.3, 
					borderWidth: 0, 
					opacity: 0.2, 
					backgroundColor: "#CCC", 
					width: "100px", 
					height: "100px", 
				});
			}).on("mouseleave", function() {
				gsap.to($ball, {
					duration: 0.3, 
					borderWidth: $ballBorderWidth, 
					opacity: $ballOpacity, 
					backgroundColor: "transparent", 
					width: $ballWidth, 
					height: $ballHeight, 
					clearProps:"backgroundColor" 
				});
			});

			// Overlay menu caret hover.
			$(".cs-ol-submenu-caret-wrap .magnetic-wrap").on("mouseenter", function() {
				gsap.to($ball, { duration: 0.3, scale: 1.3, borderWidth: $ballBorderWidth });
			}).on("mouseleave", function() {
				gsap.to($ball, { duration: 0.3, scale: $ballScale });
			});

			// Cursor view on hover (data attribute "data-cursor="...").
			$("[data-cursor]").each(function() {
				$(this).on("mouseenter", function() {
					$ball.append('<div class="ball-view"></div>');
					$(".ball-view").append($(this).attr("data-cursor"));
					gsap.to(ball, { duration: 0.3, yPercent: -75, width: 95, height: 95, opacity: 1, borderWidth: 0, color: "#FFFFFF", backgroundColor: "#F15025" });
					gsap.to(".ball-view", { duration: 0.3, scale: 1, autoAlpha: 1 });
				}).on("mouseleave", function() {
					gsap.to(ball, { duration: 0.3, yPercent: -50, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity, borderWidth: $ballBorderWidth, backgroundColor: "transparent" });
					gsap.to(".ball-view", { duration: 0.3, scale: 0, autoAlpha: 0, clearProps:"all" });
					$ball.find(".ball-view").remove();
				});
				$(this).addClass("not-hide-cursor");
			});

			// Cursor view on hover (data attribute "data-cursor="...").
			$("[data-cursor-video]").each(function() {
				$(this).on("mouseenter", function() {
					$("#magic-cursor").addClass("video-interactive-hover-on");
					$ball.append('<div class="cursor-text"></div>');
					$(".cursor-text").append($(this).attr("data-cursor-video"));
					gsap.to($ball, { duration: 0.3, yPercent: -75, width: 100, height: 100, opacity: 1, borderWidth: 0, color: "#FFFFFF", backgroundColor: "transparent" });
					gsap.to(".cursor-text", { duration: 0.3, scale: 1, autoAlpha: 1 });
				}).on("mouseleave", function() {
					$("#magic-cursor").removeClass("video-interactive-hover-on");
					gsap.to($ball, { duration: 0.3, yPercent: -50, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity, borderWidth: $ballBorderWidth, backgroundColor: "transparent" });
					gsap.to(".cursor-text", { duration: 0.3, scale: 0, autoAlpha: 0, clearProps: "all" });
					$ball.find(".cursor-text").remove();
				});
				$(this).addClass("not-hide-cursor");
			});


			// Cursor view on hover (data attribute "data-cursor2").
			$("[data-cursor-rotate]").each(function() {
				$(this).on("mouseenter", function() {
					$("#ball").append('<div class="ball-rotate"><svg xmlns="http://www.w3.org/2000/svg" xml:lang="en" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500" class="hover-cursor"><defs><path id="textcircle" d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z" transform="rotate(12,250,250)"/></defs><text class="default"><textPath xlink:href="#textcircle" aria-label="MEET JUAN . MEET JUAN . MEET JUAN . MEET JUAN ." textLength="930"> MEET JUAN ~ MEET JUAN ~ MEET JUAN ~ MEET JUAN ~</textPath></text></svg></div>');
					$(".ball-rotate").append($(this).attr("data-cursor"));
					gsap.to(ball, { duration: 0.3, yPercent: -75, width: 95, height: 95, opacity: 1, borderWidth: 0, backgroundColor: "#EC542A" });
					gsap.to(".ball-rotate", { duration: 0.3, scale: 1, autoAlpha: 1 });
				}).on("mouseleave", function() {
					gsap.to(ball, { duration: 0.3, yPercent: -50, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity, borderWidth: $ballBorderWidth, backgroundColor: "transparent" });
					gsap.to(".ball-rotate", { duration: 0.3, scale: 0, autoAlpha: 0, clearProps:"all" });
					$("#ball").find(".ball-rotate").remove();
				});
				$(this).addClass("not-hide-cursor");
			});
			

			// Cursor view on hover (data attribute "data-cursor2").
			$("[data-cursor-project]").each(function() {
				$(this).on("mouseenter", function() {
					$("#ball").append('<div class="ball-rotate"><svg xmlns="http://www.w3.org/2000/svg" xml:lang="en" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500" class="hover-cursor"><defs><path id="textcircle" d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z" transform="rotate(12,250,250)"/></defs><text class="default"><textPath xlink:href="#textcircle" aria-label="VIEW PROJECT . VIEW PROJECT . VIEW PROJECT ." textLength="930"> VIEW PROJECT ~ VIEW PROJECT ~ VIEW PROJECT ~ </textPath></text></svg></div>');
					$(".ball-rotate").append($(this).attr("data-cursor"));
					gsap.to(ball, { duration: 0.3, yPercent: -75, width: 95, height: 95, opacity: 1, borderWidth: 0, backgroundColor: "#EC542A" });
					gsap.to(".ball-rotate", { duration: 0.3, scale: 1, autoAlpha: 1 });
				}).on("mouseleave", function() {
					gsap.to(ball, { duration: 0.3, yPercent: -50, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity, borderWidth: $ballBorderWidth, backgroundColor: "transparent" });
					gsap.to(".ball-rotate", { duration: 0.3, scale: 0, autoAlpha: 0, clearProps:"all" });
					$("#ball").find(".ball-rotate").remove();
				});
				$(this).addClass("not-hide-cursor");
			});


			
			// Cursor drag on hover (class "cursor-drag"). For Swiper sliders.
			$(".swiper").each(function() {
				if ($(this).parent().attr("data-simulate-touch") == "true") {
					if ($(this).parent().hasClass("cursor-drag")) {
						$(this).on("mouseenter", function() {
							//  $ball.append('<div class="ball-drag"><div class="marquee"><div class="marquee--inner"><span>DRAG FOR MORE - </span><span>DRAG FOR MORE - </span><span>DRAG FOR MORE - </span><span>DRAG FOR MORE - </span></div></div></div>');
							$ball.append('<div class="ball-drag">DRAG</div>');
							gsap.to($ball, { duration: 0.3, width: 90, height: 90, opacity: 1, borderWidth: 0, color: "#FFFFFF", backgroundColor: "#F15025" });
						}).on("mouseleave", function() {
							$ball.find(".ball-drag").remove();
							gsap.to($ball, { duration: 0.3, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity, borderWidth: $ballBorderWidth, backgroundColor: "transparent" });
						});
						$(this).addClass("not-hide-cursor");

						// Ignore "data-cursor" on hover.
						$(this).find("[data-cursor]").on("mouseenter mouseover", function() {
							$ball.find(".ball-drag").remove();
							return false;
						}).on("mouseleave", function() {
							// $ball.append('<div class="ball-drag">DRAG</div>');
							gsap.to($ball, { duration: 0.3, width: 60, height: 60, opacity: 1 });
						});
					}
				}
			});
			


			// Show/hide magic cursor
			// =======================

			// Hide on hover.
			$("a, button, .cs-btn, .cs-form-control, .cs-form-radio, .cs-form-check, .hide-cursor") // class "hide-cursor" is for global use.
			.not(".not-hide-cursor") // omit from selection (class "not-hide-cursor" is for global use).
			.not(".cursor-alter") // omit from selection
			.not(".cs-main-menu-list > li > a") // omit from selection
			.not(".cs-main-menu-list > li > .cs-submenu-trigger > a") // omit from selection
			.on("mouseenter", function() {
				gsap.to($ball, { duration: 0.3, scale: 0, opacity: 0 });
			}).on("mouseleave", function() {
				gsap.to($ball, { duration: 0.3, scale: $ballScale, opacity: $ballOpacity });
			});

			// Hide on click.
			$("a")
				.not('[target="_blank"]') // omit from selection.
				.not('[href^="#"]') // omit from selection.
				.not('[href^="mailto"]') // omit from selection.
				.not('[href^="tel"]') // omit from selection.
				.not(".lg-trigger") // omit from selection.
				.not(".cs-btn-disabled a") // omit from selection.
				.on('click', function() {
					gsap.to($ball, { duration: 0.3, scale: 1.3, autoAlpha: 0 });
			});

			// Show/hide on document leave/enter.
			$(document).on("mouseleave", function() {
				gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 0 });
			}).on("mouseenter", function() {
				gsap.to("#magic-cursor", {duration: 0.3, autoAlpha: 1 });
			});

			// Show as the mouse moves.
			$(document).mousemove(function() {
				gsap.to("#magic-cursor", {duration: 0.3, autoAlpha: 1 });
			});
		}
	} 
}

// actualizar el logo color
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
    } else if (currentPath === '/' || currentPath === '/expertise') {
		// else if (currentPath === '/2025/' || currentPath === '/2025/expertise') {
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

// inicializar el evento
export function initThemeUpdate() {
    // Llama a la función al cargar el documento
    document.addEventListener('DOMContentLoaded', updateHeaderTheme);

    // también llama a la función en cada cambio de ruta
    window.addEventListener('popstate', updateHeaderTheme); // Para navegaciones hacia atrás/adelante

    // Si estás utilizando Vue Router:
    // router.afterEach(() => {
    //     updateHeaderTheme();
    // });
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
				start: "top 100%",
				markers: false,
				onEnter: () => animZoomInRefresh(),
			}
		});
		tl_ZoomIn.from($this, { duration: 1.5, autoAlpha: 0, scale: 1.5, ease: Power2.easeOut, clearProps:"all" });

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

		tl_FadeInUp.from(this, { duration: 1.5, autoAlpha: 0, y: 100, ease: Expo.easeOut, clearProps:"all" }, "+=0.3");
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

		tl_FadeInDown.from(this, { duration: 1.5, autoAlpha: 0, y: -100, ease: Expo.easeOut, clearProps:"all" }, "+=0.3");
	});
	
}


$(window).on("pagehide", function(){
	$(window).scrollTop(0);
});


