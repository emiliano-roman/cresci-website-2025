import $ from 'jquery';
import { gsap, Power2, Expo } from 'gsap'; // Asegúrate de incluir Power2 y Expo
import ScrollTrigger from 'gsap/ScrollTrigger'; // Asegúrate de que esta línea esté presente

// Registra el plugin
gsap.registerPlugin(ScrollTrigger);

// Función para el menú de navegación
export function menuSite() {
    if ($("#cs-header").hasClass("cs-header-fixed")) {
        $("body").addClass("cs-header-fixed-on");
    }

    var $olMenuToggleBtn = $(".cs-ol-menu-toggle-btn-text, .cs-ol-menu-toggle-btn");

    $olMenuToggleBtn.on("click", function () {
        $("html").toggleClass("cs-no-scroll");
        $("body").toggleClass("cs-ol-menu-open");

        if ($("body").hasClass("cs-ol-menu-open")) {
            $("body").addClass("olm-toggle-no-click");

            var tl_olMenuIn = gsap.timeline({
                onComplete: function () {
                    $("body").removeClass("olm-toggle-no-click");
                },
            });

            tl_olMenuIn.to(".cs-overlay-menu", { duration: 0.4, autoAlpha: 1 });
            tl_olMenuIn.fromTo(
                ".cs-ol-menu-list > li",
                { y: 80, autoAlpha: 0 },
                { duration: 0.4, y: 0, autoAlpha: 1, stagger: 0.05, ease: Power2.easeOut, clearProps: "all" }
            );
            tl_olMenuIn.fromTo(
                ".cs-ol-menu-contact > li",
                { x: -20, autoAlpha: 0 },
                { duration: 0.8, x: 0, autoAlpha: 1, stagger: 0.07, ease: Power2.easeOut, clearProps: "all" }
            );

            if ($(".cs-sliding-sidebar-wrap").length) {
                gsap.to(".cs-sliding-sidebar-trigger", {
                    duration: 1,
                    autoAlpha: 0,
                    ease: Expo.easeOut,
                });
            }
        } else {
            $("body").addClass("olm-toggle-no-click");

            var tl_olMenuOut = gsap.timeline({
                onComplete: function () {
                    $("body").removeClass("olm-toggle-no-click");
                },
            });

            tl_olMenuOut.to(".cs-ol-menu-list > li", {
                duration: 0.4,
                y: -80,
                autoAlpha: 0,
                stagger: 0.05,
                ease: Power2.easeIn,
            });
            tl_olMenuOut.to(".cs-ol-menu-contact > li", {
                duration: 0.4,
                x: 20,
                autoAlpha: 0,
                stagger: 0.05,
                ease: Power2.easeIn,
            });
            tl_olMenuOut.to(".cs-overlay-menu", { duration: 0.4, autoAlpha: 0, clearProps: "all" }, "+=0.2");

            if ($(".cs-sliding-sidebar-wrap").length) {
                gsap.to(".cs-sliding-sidebar-trigger", {
                    duration: 1,
                    autoAlpha: 1,
                    ease: Expo.easeOut,
                    clearProps: "all",
                });
            }

            setTimeout(function () {
                $(".cs-ol-submenu").slideUp(350);
                $(".cs-ol-submenu-trigger").removeClass("cs-ol-submenu-open");
            }, 500);
        }
        return false;
    });

    $(".cs-ol-menu-list").on("mouseenter", function () {
        $(this).addClass("cs-ol-menu-hover");
    }).on("mouseleave", function () {
        $(this).removeClass("cs-ol-menu-hover");
    });
}



// Función para fijar el Navbar al hacer scroll
export function navbarFix() {
    window.addEventListener('load', function() {
        const scrollUp = document.querySelector('.jwpnavbar');
        const logoWhite = document.getElementById('logo-white');
        const logoDark = document.getElementById('logo-dark');

        // Aquí aseguramos que ScrollTrigger está definido
        if (ScrollTrigger) {
            ScrollTrigger.create({
                start: 'top -50',
                end: 99999,
                toggleClass: {
                    className: 'jwpnavbar--scrolled',
                    targets: '.jwpnavbar'
                },
                onEnter: () => {
                    if (document.body.classList.contains('theme-white')) {
                        logoDark.style.display = 'none';
                        logoWhite.style.display = 'block';
                    }
                },
                onLeaveBack: () => {
                    if (document.body.classList.contains('theme-white')) {
                        logoDark.style.display = 'block';
                        logoWhite.style.display = 'none';
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
                    if (direction === -1) {
                        scrollUp.classList.remove('jwpnavbar--up');
                    } else {
                        scrollUp.classList.add('jwpnavbar--up');
                    }
                }
            });

            const sections = gsap.utils.toArray('.logo-white');
            sections.forEach(section => {
                ScrollTrigger.create({
                    trigger: section,
                    start: 'top top-=-120',
                    end: 'bottom top-=-120',
                    toggleClass: {
                        targets: '.cs-header-fixed',
                        className: 'has-scrolled'
                    }
                });
            });
        } else {
            console.error("ScrollTrigger is not defined");
        }
    });
}
