/* =========================================================
   DJ STARKEY - LIONS DEN
   COMPLETE WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuButton =
        document.getElementById("mobileMenuButton");

    const navigation =
        document.getElementById("mainNavigation");


    if (menuButton && navigation) {

        menuButton.addEventListener("click", () => {

            const isOpen =
                navigation.classList.toggle(
                    "mobile-menu-open"
                );

            menuButton.classList.toggle(
                "menu-open",
                isOpen
            );

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        const menuLinks =
            navigation.querySelectorAll("a");


        menuLinks.forEach((link) => {

            link.addEventListener("click", () => {

                navigation.classList.remove(
                    "mobile-menu-open"
                );

                menuButton.classList.remove(
                    "menu-open"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        document.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Escape") {

                    navigation.classList.remove(
                        "mobile-menu-open"
                    );

                    menuButton.classList.remove(
                        "menu-open"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );


        window.addEventListener(
            "resize",
            () => {

                if (window.innerWidth > 700) {

                    navigation.classList.remove(
                        "mobile-menu-open"
                    );

                    menuButton.classList.remove(
                        "menu-open"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            },
            { passive: true }
        );

    }



    /* =====================================================
       WEB3FORMS BOOKING FORM
       AJAX SUBMISSION
    ===================================================== */

    const bookingForm =
        document.querySelector(".booking-form");


    if (bookingForm) {

        /*
         * Create the result message automatically.
         * This means we do not need to change index.html.
         */

        let resultMessage =
            document.getElementById(
                "bookingFormResult"
            );


        if (!resultMessage) {

            resultMessage =
                document.createElement("div");

            resultMessage.id =
                "bookingFormResult";

            resultMessage.setAttribute(
                "role",
                "status"
            );

            resultMessage.setAttribute(
                "aria-live",
                "polite"
            );


            resultMessage.style.display =
                "none";

            resultMessage.style.marginTop =
                "25px";

            resultMessage.style.padding =
                "20px";

            resultMessage.style.border =
                "1px solid rgba(212, 175, 55, 0.55)";

            resultMessage.style.borderRadius =
                "10px";

            resultMessage.style.textAlign =
                "center";

            resultMessage.style.fontFamily =
                "Poppins, sans-serif";

            resultMessage.style.fontSize =
                "15px";

            resultMessage.style.lineHeight =
                "1.7";


            bookingForm.appendChild(
                resultMessage
            );

        }


        bookingForm.addEventListener(
            "submit",
            async (event) => {

                /*
                 * Prevent the browser from opening
                 * the Web3Forms success page.
                 */

                event.preventDefault();


                const submitButton =
                    bookingForm.querySelector(
                        'button[type="submit"]'
                    );


                /*
                 * Disable button while sending
                 * to prevent double submissions.
                 */

                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.dataset.originalText =
                        submitButton.textContent;

                    submitButton.textContent =
                        "SENDING...";

                    submitButton.style.opacity =
                        "0.65";

                    submitButton.style.cursor =
                        "wait";

                }


                /*
                 * Show loading message.
                 */

                resultMessage.style.display =
                    "block";

                resultMessage.style.color =
                    "#d4af37";

                resultMessage.style.borderColor =
                    "rgba(212, 175, 55, 0.55)";

                resultMessage.innerHTML =
                    "Sending your enquiry...";


                try {

                    /*
                     * Collect all form fields.
                     */

                    const formData =
                        new FormData(
                            bookingForm
                        );


                    /*
                     * Convert form data to JSON.
                     * This is the method recommended
                     * by Web3Forms for JavaScript forms.
                     */

                    const formObject =
                        Object.fromEntries(
                            formData
                        );


                    const json =
                        JSON.stringify(
                            formObject
                        );


                    /*
                     * Send the form directly to
                     * Web3Forms using POST.
                     */

                    const response =
                        await fetch(
                            "https://api.web3forms.com/submit",
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json",

                                    "Accept":
                                        "application/json"
                                },

                                body: json
                            }
                        );


                    /*
                     * Read Web3Forms response.
                     */

                    const result =
                        await response.json();


                    /*
                     * SUCCESS
                     */

                    if (
                        response.ok &&
                        result.success
                    ) {

                        resultMessage.style.color =
                            "#d4af37";

                        resultMessage.style.borderColor =
                            "rgba(212, 175, 55, 0.65)";

                        resultMessage.style.background =
                            "rgba(212, 175, 55, 0.06)";


                        resultMessage.innerHTML = `
                            <strong
                                style="
                                    display:block;
                                    font-size:20px;
                                    letter-spacing:1px;
                                    margin-bottom:8px;
                                "
                            >
                                THANK YOU!
                            </strong>

                            Your enquiry has been received successfully.<br>

                            DJ Starkey will get back to you
                            as soon as possible.
                        `;


                        /*
                         * Clear the form after
                         * successful submission.
                         */

                        bookingForm.reset();


                        /*
                         * Scroll slightly toward the
                         * confirmation message.
                         */

                        setTimeout(() => {

                            resultMessage.scrollIntoView({
                                behavior: "smooth",
                                block: "center"
                            });

                        }, 100);


                    } else {

                        /*
                         * Web3Forms returned an error.
                         */

                        throw new Error(
                            result.message ||
                            "Unable to submit the form."
                        );

                    }


                } catch (error) {

                    console.error(
                        "DJ Starkey booking form error:",
                        error
                    );


                    /*
                     * ERROR MESSAGE
                     */

                    resultMessage.style.display =
                        "block";

                    resultMessage.style.color =
                        "#ffb4b4";

                    resultMessage.style.borderColor =
                        "rgba(255, 80, 80, 0.55)";

                    resultMessage.style.background =
                        "rgba(255, 80, 80, 0.06)";


                    resultMessage.innerHTML = `
                        <strong
                            style="
                                display:block;
                                font-size:18px;
                                margin-bottom:8px;
                            "
                        >
                            SOMETHING WENT WRONG
                        </strong>

                        Your enquiry could not be sent.<br>
                        Please try again or contact DJ Starkey directly.
                    `;

                }


                /*
                 * Restore submit button.
                 */

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        submitButton.dataset.originalText ||
                        "REQUEST YOUR OFFER";

                    submitButton.style.opacity =
                        "";

                    submitButton.style.cursor =
                        "";

                }

            }
        );

    }



    /* =====================================================
       HERO ATMOSPHERE
    ===================================================== */

    const heroContent =
        document.querySelector(".hero-content");

    const banner =
        document.querySelector(".hero-banner");


    if (!heroContent || !banner) {
        return;
    }


    /*
     * Prevent creating the atmosphere twice.
     */

    if (
        heroContent.querySelector(
            ".hero-atmosphere"
        )
    ) {
        return;
    }


    const atmosphere =
        document.createElement("div");

    atmosphere.className =
        "hero-atmosphere";

    atmosphere.setAttribute(
        "aria-hidden",
        "true"
    );


    const smoke =
        document.createElement("div");

    smoke.className =
        "atmosphere-smoke";


    const haze =
        document.createElement("div");

    haze.className =
        "atmosphere-haze";


    const beams =
        document.createElement("div");

    beams.className =
        "atmosphere-beams";


    const particles =
        document.createElement("div");

    particles.className =
        "atmosphere-particles";


    atmosphere.append(
        smoke,
        haze,
        beams,
        particles
    );


    heroContent.prepend(
        atmosphere
    );



    /* =====================================================
       MOVING HEAD BEAMS
    ===================================================== */

    const beamNames = [
        "beam-left-one",
        "beam-left-two",
        "beam-right-one",
        "beam-right-two"
    ];


    beamNames.forEach(
        (className) => {

            const beam =
                document.createElement("span");

            beam.className =
                `dj-beam ${className}`;

            beam.setAttribute(
                "aria-hidden",
                "true"
            );

            beams.appendChild(
                beam
            );

        }
    );



    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );



    /* =====================================================
       CREATE HERO PARTICLES
    ===================================================== */

    const createParticles =
        () => {

            particles
                .querySelectorAll(
                    ".hero-particle"
                )
                .forEach(
                    (particle) => {
                        particle.remove();
                    }
                );


            if (
                reducedMotion.matches
            ) {
                return;
            }


            const particleCount =
                window.innerWidth <= 600
                    ? 60
                    : 120;


            for (
                let i = 0;
                i < particleCount;
                i++
            ) {

                const particle =
                    document.createElement(
                        "span"
                    );


                particle.className =
                    "hero-particle";


                particle.setAttribute(
                    "aria-hidden",
                    "true"
                );


                /*
                 * Balanced particles:
                 * left side and right side.
                 */

                const leftSide =
                    i % 2 === 0;


                if (leftSide) {

                    particle.style.left =
                        `${8 + Math.random() * 32}%`;

                } else {

                    particle.style.left =
                        `${60 + Math.random() * 32}%`;

                }


                particle.style.top =
                    `${18 + Math.random() * 65}%`;


                particle.style.animationDuration =
                    `${7 + Math.random() * 8}s`;


                particle.style.animationDelay =
                    `-${Math.random() * 9}s`;


                particles.appendChild(
                    particle
                );

            }

        };


    createParticles();



    /* =====================================================
       RESPONSIVE PARTICLES
    ===================================================== */

    let lastWidth =
        window.innerWidth;


    window.addEventListener(
        "resize",
        () => {

            const currentWidth =
                window.innerWidth;


            const wasMobile =
                lastWidth <= 600;


            const isMobile =
                currentWidth <= 600;


            if (
                wasMobile !== isMobile
            ) {

                createParticles();

            }


            lastWidth =
                currentWidth;

        },
        { passive: true }
    );



    /* =====================================================
       NO LIGHT SWEEP
    ===================================================== */

});
/* =========================================================
   BOOKING CTA — SCROLL REVEAL
========================================================= */

const bookingHeading =
    document.querySelector(".booking h2");


if (bookingHeading) {

    const bookingObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            bookingHeading.classList.add(
                                "booking-visible"
                            );

                            bookingObserver.unobserve(
                                bookingHeading
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.25
            }
        );


    bookingObserver.observe(
        bookingHeading
    );

}
/* =========================================================
   REVIEWS — DYNAMIC HEIGHT
   Match slider height to the visible review
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const reviewsSection = document.querySelector("section.reviews");
    const reviewsSlider = document.querySelector(".reviews-slider");
    const reviewsTrack = document.querySelector(".reviews-track");
    const reviewSlides = document.querySelectorAll(".review-slide");

    if (!reviewsSection || !reviewsSlider || !reviewsTrack || !reviewSlides.length) {
        return;
    }


    /* Prevent the fixed navigation from covering the title */

    reviewsSection.style.scrollMarginTop = "85px";


    /* Set slider height to the currently visible slide */

    function updateReviewHeight() {

        let currentIndex = 0;

        const transform = reviewsTrack.style.transform;

        if (transform) {

            const match = transform.match(/translateX\(\s*(-?\d+(?:\.\d+)?)%\s*\)/);

            if (match) {

                currentIndex = Math.round(
                    Math.abs(parseFloat(match[1])) / 100
                );

            }

        }


        const currentSlide = reviewSlides[currentIndex];

        if (!currentSlide) {
            return;
        }


        const slideHeight = currentSlide.offsetHeight;

        if (slideHeight > 0) {

            reviewsSlider.style.height = slideHeight + "px";

        }

    }


    /* Initial height */

    setTimeout(updateReviewHeight, 100);


    /* Watch the carousel when the slide changes */

    const observer = new MutationObserver(function () {

        setTimeout(updateReviewHeight, 50);

    });


    observer.observe(reviewsTrack, {
        attributes: true,
        attributeFilter: ["style"]
    });


    /* Recalculate after fonts/images/layout changes */

    window.addEventListener("resize", updateReviewHeight);

});