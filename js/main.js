document.addEventListener('DOMContentLoaded', function() {
    // Efecto de cursor personalizado
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });
    
    // Efecto hover en enlaces para el cursor
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
    
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
    
    // Efecto de scroll en el header
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Observer para animaciones al hacer scroll
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
    
    // Cambio de color de los botones dinámicamente
    const primaryButtons = document.querySelectorAll('.btn-primary');
    const secondaryButtons = document.querySelectorAll('.btn-secondary, .btn-outline');
    
    function getRandomBlue() {
        const hues = [200, 210, 220]; // Variaciones de azul
        const randomHue = hues[Math.floor(Math.random() * hues.length)];
        return `hsl(${randomHue}, 100%, 70%)`;
    }
    
    function updateButtonColors() {
        const newPrimaryColor = getRandomBlue();
        const newSecondaryColor = getRandomBlue();
        
        document.documentElement.style.setProperty('--accent-blue', newPrimaryColor);
        document.documentElement.style.setProperty('--accent-blue-dark', 
            `hsl(${parseInt(newPrimaryColor.split(',')[0].split('(')[1])}, 100%, 60%)`);
    }
    
    // Año actual en el footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Smooth scroll para los enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efecto de carga inicial
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);

    // Código corregido para "Ver más proyectos"
    const loadMoreBtn = document.getElementById('load-more-projects');
    const projectsGrid = document.querySelector('.projects-grid');

    // Datos de proyectos adicionales
    const moreProjects = [
       
    ];

    if (loadMoreBtn && projectsGrid) {
        loadMoreBtn.addEventListener('click', function() {
            // Verificar si hay proyectos para cargar
            if (moreProjects.length === 0) {
                loadMoreBtn.disabled = true;
                loadMoreBtn.innerHTML = `No hay más proyectos <span class="hover-effect"></span>`;
                return;
            }

            // Tomar los primeros 2 proyectos disponibles
            const projectsToAdd = moreProjects.splice(0, 2);
            
            projectsToAdd.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.style.opacity = '0'; // Inicialmente invisible
                
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
                
                // Activar animación
                setTimeout(() => {
                    projectCard.style.opacity = '1';
                    projectCard.classList.add('fade-in');
                }, 10);
            });
            
            // Actualizar el estado del botón
            if (moreProjects.length === 0) {
                loadMoreBtn.disabled = true;
                loadMoreBtn.innerHTML = `No hay más proyectos <span class="hover-effect"></span>`;
            }
        });
    }
});