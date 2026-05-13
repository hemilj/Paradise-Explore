export function initializeAnimations() {

    // Intersection Observer Options
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    // Create Observer
    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("fade-in-visible");

                observer.unobserve(entry.target);

            }

        });

    }, observerOptions);

    // Select Elements
    const animatedElements = document.querySelectorAll(".animate-on-scroll");

    // Observe Each Element
    animatedElements.forEach((el) => observer.observe(el));

}

export function initializeSlider() {

    const slider = document.getElementById('packageSlider');

    const leftBtn = document.getElementById('slideLeft');

    const rightBtn = document.getElementById('slideRight');

    if (slider && leftBtn && rightBtn) {

        rightBtn.addEventListener('click', () => {

            slider.scrollBy({
                left: 325,
                behavior: 'smooth'
            });

        });

        leftBtn.addEventListener('click', () => {

            slider.scrollBy({
                left: -325,
                behavior: 'smooth'
            });

        });

    }

}

export function initializeCounter() {

    const counters = document.querySelectorAll('.counter-value');

    const speed = 200;

    const animateCounters = () => {

        counters.forEach(counter => {

            const updateCount = () => {

                const target = +counter.getAttribute('data-target');

                const count = +counter.innerText;

                const increment = target / speed;

                if (count < target) {

                    counter.innerText = Math.ceil(count + increment);

                    setTimeout(updateCount, 20);

                } else {

                    counter.innerText = target;

                }

            };

            updateCount();

        });

    };

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateCounters();

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.5
    });

    const counterSection = document.querySelector('.counter-section');

    if (counterSection) {

        observer.observe(counterSection);

    }

}