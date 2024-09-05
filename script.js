document.addEventListener("DOMContentLoaded", () => {
	gsap.registerPlugin(CustomEase); //? REGISTERING THE GSAP PLUGIN
	CustomEase.create(
		//? CREATING A CUSTOM HOP EASE EFFECT
		"customHop",
		"M0,0 C0.126,0.382 0.328,0.199 0.6,0.4 0.947,0.656 0.818,1.001 1,1"
	);

	//? SPLIT TEXT INTO INDIVIDUAL SPAN
	let splitTextIntoSpan = (selector) => {
		const elements = document.querySelectorAll(selector);
		elements.forEach((element) => {
			let text = element.innerText;
			let splitText = text
				.split(" ")
				.map((char) => {
					return `<span>${
						char === " " ? "&nbsp;&nbsp;" : char
					}</span>`;
				})
				.join(" ");
			element.innerHTML = splitText;
		});
	};
	splitTextIntoSpan(".header h1");

	//? COUNTER UPDATE ANIMATION
	let counterAnimation = () => {
		const counterElement = document.querySelector(".counter p");
		let currentValue = 0;
		const updateInterval = 300;
		const maxDuration = 2000;
		const endValue = 100;
		const startValue = Date.now();

		let counterUpdate = () => {
			const elapsedTime = Date.now() - startValue;
			if (elapsedTime < maxDuration) {
				currentValue = Math.min(
					currentValue + Math.floor(Math.random() * 30) + 5,
					endValue
				);
				counterElement.textContent = currentValue;
				setTimeout(counterUpdate, updateInterval);
			} else {
				setTimeout(() => {
					gsap.to(counterElement, {
						y: -20,
						duration: 1,
						ease: "power3.inOut",
						onStart: () => {
							revealPage();
						},
					});
				}, -500);
			}
		};
		counterUpdate();
	};

	//? COUNTER ANIMATION
	gsap.to(".counter p", {
		y: 0,
		duration: 1,
		ease: "power3.out",
		delay: 1,
		onComplete: counterAnimation,
	});

	//? PAGE REVEAL ANIMATION
	let revealPage = () => {
		gsap.to(".hero", {
			clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
			duration: 2,
			ease: "customHop",
			onStart: () => {
				//? HERO ANIMATION
				gsap.to(".hero", {
					transform: "translate(-50%, -50%) scale(1)",
					duration: 2.25,
					ease: "power3.inOut",
					delay: 0.25,
				});

				//? OVERLAY ANIMATION
				gsap.to(".overlay", {
					clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
					duration: 2,
					delay: 0.05,
					ease: "customHop",
				});

				//? IMAGE ANIMATION
				gsap.to(".image img", {
					transform: "scale(1)",
					duration: 2.25,
					ease: "power3.inOut",
					delay: 0.25,
				});

				//? HEADER ANIMATION
				gsap.to(".header h1 span", {
					y: 0,
					stagger: 1,
					duration: 2,
					ease: "power4.inOut",
					delay: 1,
				});
			},
		});
	};
});
