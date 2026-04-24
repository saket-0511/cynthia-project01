// ── Locomotive Scroll ──────────────────────────────────────────────────────
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// ── Hero entrance animation ────────────────────────────────────────────────
function firstPageAnim() {
    var t1 = gsap.timeline();

    t1.from("#nav", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: "expo.inOut"
    })
    .to(".boundingelem", {
        y: 0,
        ease: "expo.inOut",
        duration: 2,
        stagger: 0.2,
    }, "-=1.5")
    .from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: "expo.inOut",
        delay: -1,
    });
}

// ── Custom cursor ──────────────────────────────────────────────────────────
function circleChaptaKaro() {
    let xprev = 0;
    let yprev = 0;

    window.addEventListener("mousemove", function (e) {
        let xscale = gsap.utils.clamp(0.8, 1.2, e.clientX - xprev);
        let yscale = gsap.utils.clamp(0.8, 1.2, e.clientY - yprev);

        xprev = e.clientX;
        yprev = e.clientY;

        document.querySelector("#minicircle").style.transform =
            `translate(${e.clientX - 5}px, ${e.clientY - 5}px) scale(${xscale}, ${yscale})`;
    });
}

// ── Elem image hover — smooth follow + rotate on direction ────────────────
document.querySelectorAll(".elem").forEach(function (elem) {
    const img = elem.querySelector("img");

    let prevX = 0;
    let prevY = 0;
    let currentRotation = 0;

    // Fade in on enter
    elem.addEventListener("mouseenter", function (e) {
        prevX = e.clientX;
        prevY = e.clientY;

        gsap.to(img, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
        });
    });

    // Follow cursor + rotate based on movement direction
    elem.addEventListener("mousemove", function (e) {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate movement delta
        const deltaX = e.clientX - prevX;
        const deltaY = e.clientY - prevY;

        // Rotation: tilt based on horizontal speed, clamped to ±20deg
        const targetRotation = gsap.utils.clamp(-20, 20, deltaX * 0.8);

        // Smooth interpolate rotation
        currentRotation += (targetRotation - currentRotation) * 0.3;

        gsap.to(img, {
            x: x - img.offsetWidth / 2,
            y: y - img.offsetHeight / 2,
            rotation: currentRotation,
            duration: 0.5,
            ease: "power3.out"
        });

        prevX = e.clientX;
        prevY = e.clientY;
    });

    // Fade out + reset rotation on leave
    elem.addEventListener("mouseleave", function () {
        gsap.to(img, {
            opacity: 0,
            rotation: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.in"
        });
        currentRotation = 0;
    });
});

// ── Init ───────────────────────────────────────────────────────────────────
circleChaptaKaro();
firstPageAnim();
