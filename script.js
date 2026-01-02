document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Scroll Progress Indicator
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    
    if (prefersReducedMotion) {
        gsap.config({ autoKillThreshold: 0 });
    }

    // Terminal Typing Effect
    const terminalBody = document.getElementById('terminal-body');
    const commands = [
        { type: 'command', text: 'whoami' },
        { type: 'output', text: 'rajesh.ramesh (Senior Infrastructure Architect)' },
        { type: 'command', text: 'kubectl get nodes --context production' },
        { type: 'output', text: 'NAME             STATUS   ROLES    AGE    VERSION' },
        { type: 'output', text: 'prod-node-01     Ready    worker   142d   v1.27.3' },
        { type: 'output', text: 'prod-node-02     Ready    worker   142d   v1.27.3' },
        { type: 'command', text: 'finer enforcer --check-budgets' },
        { type: 'output', text: 'INFO[0001] Scanning cluster costs...' },
        { type: 'output', text: 'SUCCESS: All namespaces within budget (100% compliance)' },
        { type: 'command', text: 'echo $STATUS' },
        { type: 'output', text: 'SYSTEMS_READY_FOR_GIGS' }
    ];

    async function typeTerminal() {
        terminalBody.innerHTML = '';
        for (const cmd of commands) {
            const line = document.createElement('div');
            line.className = 'line';

            if (cmd.type === 'command') {
                line.innerHTML = `<span class="prompt">$</span> <span class="typing-text"></span>`;
                terminalBody.appendChild(line);
                const typingSpan = line.querySelector('.typing-text');
                await typeText(typingSpan, cmd.text);
            } else {
                line.className = 'line output';
                line.textContent = cmd.text;
                terminalBody.appendChild(line);
            }
            await new Promise(resolve => setTimeout(resolve, 300));
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    }

    function typeText(element, text) {
        return new Promise(resolve => {
            let i = 0;
            const interval = setInterval(() => {
                element.textContent += text[i];
                i++;
                if (i === text.length) {
                    clearInterval(interval);
                    resolve();
                }
            }, 40);
        });
    }

    // GSAP Entry Animations
    const heroTl = gsap.timeline();

    heroTl.from(".logo", { y: -30, opacity: 0, duration: 1, ease: "power4.out" })
        .from(".nav-links a", { y: -20, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power4.out" }, "-=0.7")
        .from(".sub-title", { x: -30, opacity: 0, duration: 1, ease: "power4.out" }, "-=0.5")
        .from(".main-title", { y: 50, opacity: 0, duration: 1.2, ease: "power4.out" }, "-=0.8")
        .from(".hero-description", { y: 30, opacity: 0, duration: 1, ease: "power4.out" }, "-=0.8")
        .from(".badge", { scale: 0.8, opacity: 0, stagger: 0.1, duration: 0.8, ease: "back.out(2)" }, "-=0.6")
        .from(".terminal-wrapper", { scale: 0.9, opacity: 0, duration: 1.2, ease: "power4.out" }, "-=1")
        .add(() => typeTerminal(), "-=0.5");

    // Scroll Animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            x: -30,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        });
    });

    // project-card animation fix: ensure they appear even if scroll is missed
    gsap.utils.toArray('.project-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 95%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    gsap.from(".bento-box", {
        scrollTrigger: {
            trigger: ".bento-container",
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out"
    });

    // Skill item animations with enhanced stagger
    gsap.from(".skill-list span", {
        scrollTrigger: {
            trigger: ".bento-container",
            start: "top 85%",
            toggleActions: "play none none none"
        },
        scale: 0.8,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "back.out(1.7)"
    });

    gsap.from(".timeline-item", {
        scrollTrigger: {
            trigger: ".timeline",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        x: -40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out"
    });

    gsap.from(".edu-card", {
        scrollTrigger: {
            trigger: ".education-grid",
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power4.out"
    });

    // Cursor Follower
    const cursor = document.querySelector('.cursor-follower');
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    // Hover & Magnetic effects
    const interactives = document.querySelectorAll('a, button, .project-card, .bento-box');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 3,
                backgroundColor: 'rgba(45, 212, 191, 0.1)',
                borderColor: 'var(--accent-primary)',
                duration: 0.3
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: 'transparent',
                borderColor: 'var(--accent-primary)',
                duration: 0.3
            });
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "power4.out" });
        });

        if (el.tagName === 'A' || el.tagName === 'BUTTON') {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(el, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.5,
                    ease: "power4.out"
                });
            });
        }
    });
    // Particle Background
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');

    let particles = [];
    const particleCount = isMobile ? 30 : 80;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.3 - 0.15;
            this.speedY = Math.random() * 0.3 - 0.15;
            this.opacity = Math.random() * 0.4 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(45, 212, 191, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = `rgba(45, 212, 191, ${0.1 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', initParticles);
    initParticles();
    animateParticles();
});
