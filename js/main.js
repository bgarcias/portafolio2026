document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. CUSTOM CURSOR
    // ==========================================
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (cursor && follower && window.innerWidth > 768) {
        let posX = 0, posY = 0;
        let mouseX = 0, mouseY = 0;

        // Follower delay physics
        gsap.to({}, 0.016, {
            repeat: -1,
            onRepeat: () => {
                posX += (mouseX - posX) / 7;
                posY += (mouseY - posY) / 7;

                gsap.set(follower, {
                    css: {
                        left: posX,
                        top: posY
                    }
                });

                gsap.set(cursor, {
                    css: {
                        left: mouseX,
                        top: mouseY
                    }
                });
            }
        });

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Hover effects for links and buttons
        const interactables = document.querySelectorAll('a, button, .project-card, .btn');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                follower.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                follower.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 2. MOBILE NAVIGATION
    // ==========================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 3. FOOTER YEAR
    // ==========================================
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==========================================
    // 4. GSAP ANIMATIONS
    // ==========================================
    // Ensure GSAP plugins are registered
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // --- Hero Intro Animation ---

        // convertir el nombre en caracteres para animarlo letra por letra
        const heroName = document.querySelector('.hero-title .name');

        if (heroName && heroName.textContent.trim() !== "") {
            const text = heroName.textContent;
            heroName.innerHTML = text
                .split('')
                .map(char => {
                    if (char === ' ') return `<span class="char space"> </span>`;
                    return `<span class="char">${char}</span>`;
                })
                .join('');
        }

        const heroTl = gsap.timeline();

        // Estado inicial
        gsap.set('.navbar', { y: -50, opacity: 0 });

        gsap.set([
            '.hero-title .greeting',
            '.hero-subtitle',
            '.hero-description',
            '.hero-buttons .btn'
        ], {
            opacity: 0,
            y: 16
        });

        gsap.set('.hero-title .name .char', {
            opacity: 0,
            y: 22
        });

        gsap.set('.terminal-line', {
            width: 0
        });

        gsap.set('.hero-image-container', {
            opacity: 0,
            y: 20
        });

        gsap.set('.cyber-accents .corner', {
            opacity: 0,
            scale: 0.82
        });

        // Timeline
        heroTl
            .to('.navbar', {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power3.out'
            })

            // terminal line 1
            .to('.terminal-line.line-1', {
                width: '100%',
                duration: 0.55,
                ease: 'none'
            }, '-=0.25')

            // terminal line 2
            .to('.terminal-line.line-2', {
                width: '100%',
                duration: 0.60,
                ease: 'none'
            }, '+=0.10')

            // greeting
            .to('.hero-title .greeting', {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: 'power2.out'
            }, '+=0.18')

            // name letter by letter
            .to('.hero-title .name .char', {
                opacity: 1,
                y: 0,
                duration: 0.45,
                stagger: 0.035,
                ease: 'power3.out'
            }, '-=0.08')

            // subtitle
            .to('.hero-subtitle', {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: 'power2.out'
            }, '-=0.18')

            // description
            .to('.hero-description', {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: 'power2.out'
            }, '-=0.14')

            // buttons
            .to('.hero-buttons .btn', {
                opacity: 1,
                y: 0,
                duration: 0.28,
                stagger: 0.08,
                ease: 'power2.out'
            }, '-=0.10')

            // image smoother entrance
            .to('.hero-image-container', {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out'
            }, '-=0.05')

            // corners after image
            .to('.cyber-accents .corner', {
                opacity: 1,
                scale: 1,
                duration: 0.35,
                stagger: 0.05,
                ease: 'power2.out'
            }, '+=0.05');

        // Image hover zoom 
        const heroImageWrapper = document.querySelector('.hero-image-wrapper');
        const heroImage = document.querySelector('.hero-image');

        if (heroImageWrapper && heroImage) {

            heroImageWrapper.addEventListener('mouseenter', () => {

                gsap.to(heroImage, {
                    scale: 1.08,
                    duration: 0.6,
                    ease: "power2.out",
                    force3D: true
                });

            });

            heroImageWrapper.addEventListener('mouseleave', () => {

                gsap.to(heroImage, {
                    scale: 1,
                    duration: 0.7,
                    ease: "power2.out",
                    force3D: true
                });

            });

        }
        // About Stats
        const statItems = gsap.utils.toArray('.stat-item');
        if (statItems.length > 0) {
            gsap.fromTo(statItems,
                { opacity: 0, x: 30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.about-stats',
                        start: 'top 85%'
                    }
                }
            );
        }

        // Project Cards
        const projectCards = gsap.utils.toArray('.project-card');
        if (projectCards.length > 0) {
            gsap.fromTo(projectCards,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.projects-grid',
                        start: 'top 85%',
                        // Using fromTo guarantees end state is 1 on completion
                    }
                }
            );
        }

        // Stack Categories
        const stackCategories = gsap.utils.toArray('.stack-category');
        if (stackCategories.length > 0) {
            gsap.fromTo(stackCategories,
                { opacity: 0, y: 30, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.stack-grid',
                        start: 'top 85%'
                    }
                }
            );
        }

        // --- Terminal Interactivity (Contact Section) ---
        const terminalBody = document.querySelector('.terminal-body');

        if (terminalBody) {
            const loadingText = terminalBody.querySelector('.loading-text');
            const successText = terminalBody.querySelector('.success-text');
            const btn = terminalBody.querySelector('.terminal-btn');

            const loadingFullText = loadingText.textContent;
            const successFullText = successText.textContent;

            // estado inicial
            gsap.set([loadingText, successText, btn], { opacity: 0, visibility: 'hidden' });

            ScrollTrigger.create({
                trigger: '.terminal-window',
                start: 'top 80%',
                once: true,
                onEnter: () => {

                    const tl = gsap.timeline();

                    tl
                        .set([loadingText, successText, btn], { visibility: 'visible' })
                        .set(loadingText, { opacity: 1, textContent: "" })

                        // typing de "Downloading..."
                        .to({}, {
                            duration: 1.5,
                            onUpdate: function () {
                                const p = this.progress();
                                const chars = Math.floor(p * loadingFullText.length);
                                loadingText.textContent = loadingFullText.substring(0, chars);
                            }
                        })

                        // pausa pequeña
                        .to({}, { duration: 0.6 })

                        // typing de "[OK] File ready."
                        .set(successText, { opacity: 0, y: 4 })
                        .to(successText, {
                            opacity: 1,
                            y: 0,
                            duration: 0.35,
                            ease: "power2.out"
                        })

                        // pausa antes del botón
                        .to({}, { duration: 0.4 })

                        // botón
                        .to(btn, { opacity: 1, duration: 0.25 });
                }
            });
        }
    } else {
        console.warn('GSAP or ScrollTrigger not loaded. Animations disabled.');
    }
});
