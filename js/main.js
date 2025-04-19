document.addEventListener('DOMContentLoaded', function() {
    // ==================== PRELOADER ====================
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => preloader.remove(), 500);
        }, 1000);
    }

    // ==================== AJUSTES MOBILE ====================
    // Ajustar viewport height para dispositivos móviles
    function adjustViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    window.addEventListener('resize', adjustViewportHeight);
    adjustViewportHeight();

    // Detectar dispositivos táctiles
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        document.body.classList.add('touch-device');
    }

    // ==================== TEMA OSCURO/CLARO ====================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            const icon = themeToggle.querySelector('i');
            if (body.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light');
                icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                localStorage.setItem('theme', 'dark');
                icon.classList.replace('fa-sun', 'fa-moon');
            }
        });
        
        // Cargar tema guardado
        if (localStorage.getItem('theme') === 'light') {
            body.classList.add('light-theme');
            const icon = themeToggle.querySelector('i');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    // ==================== CURSOR PERSONALIZADO ====================
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursorFollower && !document.body.classList.contains('touch-device')) {
        document.addEventListener('mousemove', (e) => {
            cursorFollower.style.left = `${e.clientX}px`;
            cursorFollower.style.top = `${e.clientY}px`;
        });
        
        const hoverElements = document.querySelectorAll('a, button, .tech-tag, .project-card, .contact-item, .social-link, .nav-link, .skill-icon');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
                cursorFollower.style.backgroundColor = 'rgba(100, 255, 218, 0.1)';
                cursorFollower.style.border = '1px solid var(--accent-blue)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.backgroundColor = 'rgba(100, 255, 218, 0.3)';
                cursorFollower.style.border = 'none';
            });
        });
    }

    // ==================== FILTRADO DE PROYECTOS ====================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.dataset.filter;
                
                projectCards.forEach(card => {
                    card.style.display = 'none';
                    card.classList.remove('fade-in');
                    
                    if (filter === 'all' || card.dataset.category === filter) {
                        setTimeout(() => {
                            card.style.display = 'block';
                            card.classList.add('fade-in');
                        }, 10);
                    }
                });
            });
        });
    }

    // ==================== ANIMACIÓN DE ESTADÍSTICAS ====================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length) {
        const animateNumbers = () => {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.dataset.count);
                const duration = 2000;
                const start = 0;
                const increment = target / (duration / 16);
                let current = start;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        clearInterval(timer);
                        current = target;
                    }
                    stat.textContent = Math.floor(current).toLocaleString();
                }, 16);
            });
        };
        
        // Activar cuando la sección es visible
        const statsSection = document.getElementById('stats');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    animateNumbers();
                    observer.unobserve(statsSection);
                }
            }, { threshold: 0.5 });
            
            observer.observe(statsSection);
        }
    }

    // ==================== ANIMACIONES GSAP ====================
    if (typeof gsap !== 'undefined') {
        // Animación inicial
        gsap.from(".hero-content", { 
            duration: 1, 
            y: 50, 
            opacity: 0, 
            ease: "power3.out",
            delay: 0.5
        });
        
        gsap.from(".hero-code", {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power3.out",
            delay: 0.8
        });
        
        // Animaciones al hacer scroll
        gsap.utils.toArray("[data-aos]").forEach(element => {
            ScrollTrigger.create({
                trigger: element,
                start: "top 80%",
                once: true,
                onEnter: () => element.classList.add("aos-animate")
            });
        });
        
        // Efecto parallax para elementos con clase .parallax-bg
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.speed) || 0.4;
            gsap.to(element, {
                yPercent: 15 * speed,
                ease: "none",
                scrollTrigger: {
                    trigger: element.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }

    // ==================== MENÚ MÓVIL ====================
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Bloquear scroll cuando el menú está abierto
            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ==================== SCROLL SUAVE ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Cerrar menú móvil si está abierto
                if (nav && nav.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    nav.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                const yOffset = -80;
                const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                
                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== EFECTO HEADER AL SCROLL ====================
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ==================== CARGAR MÁS PROYECTOS ====================
    const loadMoreBtn = document.getElementById('load-more-projects');
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (loadMoreBtn && projectsGrid) {
        const moreProjects = [
            {
                id: 5,
                title: "Weather Dashboard",
                description: "Aplicación meteorológica con pronósticos en tiempo real.",
                tech: ["React", "API", "Chart.js"],
                image: "https://via.placeholder.com/600x400",
                category: "frontend"
            },
            {
                id: 6,
                title: "Recipe Finder",
                description: "Buscador de recetas con filtros avanzados.",
                tech: ["Vue.js", "Firebase"],
                image: "https://via.placeholder.com/600x400",
                category: "frontend"
            }
        ];

        loadMoreBtn.addEventListener('click', function() {
            if (moreProjects.length === 0) {
                loadMoreBtn.disabled = true;
                loadMoreBtn.innerHTML = `No hay más proyectos <span class="hover-effect"></span>`;
                return;
            }

            const projectsToAdd = moreProjects.splice(0, 2);
            
            projectsToAdd.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card fade-in';
                projectCard.style.opacity = '0';
                projectCard.dataset.category = project.category;
                
                projectCard.innerHTML = `
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}">
                        <div class="project-links">
                            <a href="#" class="project-link"><i class="fas fa-external-link-alt"></i></a>
                            <a href="#" class="project-link"><i class="fab fa-github"></i></a>
                        </div>
                    </div>
                    <div class="project-info">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-tech">
                            ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
                        </div>
                        <a href="./html/project-details.html?id=${project.id}" class="btn btn-outline project-more-btn">
                            Ver más detalles
                            <span class="hover-effect"></span>
                        </a>
                    </div>
                `;
                
                projectsGrid.appendChild(projectCard);
                
                setTimeout(() => {
                    projectCard.style.opacity = '1';
                }, 10);
            });
            
            if (moreProjects.length === 0) {
                loadMoreBtn.disabled = true;
                loadMoreBtn.innerHTML = `No hay más proyectos <span class="hover-effect"></span>`;
            }
        });
    }

    // ==================== OBSERVER PARA ANIMACIONES ====================
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // ==================== ACTUALIZAR AÑO FOOTER ====================
    document.getElementById('year').textContent = new Date().getFullYear();

    // ==================== MANEJO DE FORMULARIO ====================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envío
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado';
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }

    // ==================== OPTIMIZACIONES PARA IOS ====================
    // Corrección para scroll suave en iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const yOffset = -80;
                    const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    
                    window.scrollTo({
                        top: y,
                        behavior: 'auto'
                    });
                }
            });
        });
    }

    // ==================== OPTIMIZACIONES PARA ANDROID ====================
    if (/Android/.test(navigator.userAgent)) {
        // Corrección para teclado virtual
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                document.body.classList.add('keyboard-visible');
            });
            
            input.addEventListener('blur', () => {
                document.body.classList.remove('keyboard-visible');
            });
        });
    }
});