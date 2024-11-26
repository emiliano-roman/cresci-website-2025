import $ from 'jquery'; // Importa jQuery
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type'; // Si SplitType no se está importando, este es el problema

gsap.registerPlugin(ScrollTrigger);

export function initTextAnimations() {
    console.log("Initializing text animations...");

    const elements = document.querySelectorAll("[text-split]");
    console.log("Found elements for text-split:", elements);

    if (elements.length > 0) {
        new SplitType("[text-split]", {
            types: "words, chars",
            tagName: "span"
        });

     // Define tus animaciones aquí
	$("[zoom-in-up]").each(function() {
		let tl = gsap.timeline({ paused: true });
		tl.from($(this).find(".word"), {
			opacity: 0,
			scale: 100,
			duration: 0.5,
			ease: "back.out(2)",
			stagger: { amount: 0.5 }
		});
		createScrollTrigger($(this), tl);
	});

	$("[words-slide-up]").each(function() {
		let tl = gsap.timeline({ paused: true });
		tl.from($(this).find(".word"), {
			opacity: 0,
			yPercent: 100,
			duration: 0.5,
			ease: "back.out(2)",
			stagger: { amount: 0.5 }
		});
		createScrollTrigger($(this), tl);
	});

	$("[words-move-up]").each(function() {
		let tl = gsap.timeline({ paused: true });
		tl.from($(this).find(".word"), {
			opacity: 0,
			yPercent: 200,
			duration: 1,
			ease: "power2.out",
			stagger: { amount: 0.1 }
		});
		createScrollTrigger($(this), tl);
	});

	$("[words-rotate-in]").each(function() {
		let tl = gsap.timeline({ paused: true });
		tl.set($(this).find(".word"), { transformPerspective: 1000 });
		tl.from($(this).find(".word"), {
			rotationX: -90,
			duration: 0.6,
			ease: "power2.out",
			stagger: { amount: 0.6 }
		});
		createScrollTrigger($(this), tl);
	});

	$("[words-slide-from-right]").each(function() {
		let tl = gsap.timeline({ paused: true });
		tl.from($(this).find(".word"), {
			opacity: 0,
			x: "1em",
			duration: 0.6,
			ease: "power2.out",
			stagger: { amount: 0.2 }
		});
		createScrollTrigger($(this), tl);
	});

	$("[letters-slide-up]").each(function() {
		let tl = gsap.timeline({ paused: true });
		tl.from($(this).find(".char"), {
			yPercent: 160,
			duration: 0.5,
			ease: "power1.out",
			stagger: { amount: 0.5 }
		});
		createScrollTrigger($(this), tl);
	});

	$("[letters-slide-down]").each(function() {
		let tl = gsap.timeline({ paused: true });
		tl.from($(this).find(".char"), {
			yPercent: -120,
			duration: 0.3,
			ease: "power1.out",
			stagger: { amount: 0.7 }
		});
		createScrollTrigger($(this), tl);
	});

	$("[letters-fade-in]").each(function() {
		let tl = gsap.timeline({ paused: true });
		tl.from($(this).find(".char"), {
			opacity: 0,
			duration: 0.2,
			ease: "power1.out",
			stagger: { amount: 0.8 }
		});
		createScrollTrigger($(this), tl);
	});

	$("[letters-fade-in-random]").each(function() {
		let tl = gsap.timeline({ paused: true });
		tl.from($(this).find(".char"), {
			opacity: 0,
			duration: 0.05,
			ease: "power1.out",
			stagger: {
				amount: 0.4,
				from: "random"
			}
		});
		createScrollTrigger($(this), tl);
	});

	$("[scrub-each-word]").each(function() {
		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: $(this),
				start: "top 90%",
				end: "bottom center",
				scrub: true
			}
		});
		tl.from($(this).find(".word"), {
			opacity: 0.15,
			duration: 2.8,
			ease: "power1.out",
			stagger: { each: 0.4 }
		});
	});

        gsap.set("[text-split]", { opacity: 1 });
    } else {
        console.warn("No elements found for SplitType.");
    }
}

// Función para crear el ScrollTrigger
function createScrollTrigger(triggerElement, timeline) {
    ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 100%",
        onEnter: () => timeline.play(),
        onLeaveBack: () => {
            timeline.progress(0);
            timeline.pause();
        },
    });
}
