 // Datos completos de los proyectos
 const projects = {
    '1': {
        title: "Emulacion de Tuenti en Jetpack Compose",
        subtitle: "Plataforma de Red social con aspectos detallados.",
        description: "Desarrollo de una plataforma de red social con funcionalidades necesarias para una comportamiento basico.",
        longDescription: `
            <p>Este proyecto consistió en el desarrollo completo de una red social desde cero. La aplicación permite a los usuarios:</p>
            <ul>
                <li>Registrarse y autenticarse de forma segura</li>
                <li>Explorar publicacion en menu principal</li>
                <li>Buscar usuarios</li>
                <li>gestion de configuracion completa</li>
                <li>Realizar publicaciones y comentarios en las mismas</li>
                <li>Ver perfiles en tiempo real</li>
            </ul>
        `,
        challenges: "Los principales desafíos técnicos incluyeron la implementación del los comentarios en las puvlicaciones, la integración segura con Firebase, y la optimización del rendimiento para manejar errores.",
        tech: ["Kotlin", "Jetpack Compose"],
        demoLink: "../html/video.html",
        codeLink: "https://github.com/Alberto02003/Tutuenti",
        image: "../assets/images/TuTuenti.jpg"
    },
};

// Obtener el ID del proyecto de la URL
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id') || '2';
const project = projects[projectId];

// Cargar los datos del proyecto en la página
if (project) {
    const projectDetail = document.getElementById('project-detail');
    
    projectDetail.innerHTML = `
        <div class="project-header">
            <div>
                <h1 class="project-title">${project.title}</h1>
                <p class="project-subtitle">${project.subtitle}</p>
            </div>
        </div>
        
        <div class="project-content">
            <div class="project-main">
                <img src="${project.image}" alt="${project.title}">
                
                <div class="project-section">
                    <h3>Descripción Detallada</h3>
                    ${project.longDescription}
                </div>
                
                <div class="project-section">
                    <h3>Desafíos y Soluciones</h3>
                    <p>${project.challenges}</p>
                </div>
            </div>
            
            <div class="project-sidebar">
                <div class="project-section">
                    <h3>Tecnologías Utilizadas</h3>
                    <div class="project-tech-list">
                        ${project.tech.map(tech => `<span class="project-tech-item">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="project-section">
                    <h3>Enlaces Relacionados</h3>
                    <div class="project-links">
                        <a href="${project.demoLink}" class="project-link" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Demo en vivo
                        </a>
                        <a href="${project.codeLink}" class="project-link" target="_blank">
                            <i class="fab fa-github"></i> Código fuente
                        </a>
                    </div>
                </div>
                
                <div class="project-section">
                    <h3>Detalles Técnicos</h3>
                    <p><strong>Arquitectura:</strong> ${project.tech.includes('Kotlin') ? 'Backend con Kotlin' : 'Aplicación móvil con Flutter'}</p>
                    <p><strong>Base de datos:</strong> ${project.tech.includes('MongoDB') ? 'MongoDB (NoSQL)' : 'Firebase Realtime Database'}</p>
                    <p><strong>Estado:</strong> Completado </p>
                </div>
            </div>
        </div>
    `;
} else {
    // Si no se encuentra el proyecto, mostrar mensaje de error
    document.getElementById('project-detail').innerHTML = `
        <div class="project-header">
            <h1 class="project-title">Proyecto no encontrado</h1>
            <a href="index.html#projects" class="btn btn-outline">
                <i class="fas fa-arrow-left"></i> Volver a proyectos
                <span class="hover-effect"></span>
            </a>
        </div>
        <div class="project-content">
            <p>El proyecto solicitado no existe o no está disponible.</p>
        </div>
    `;
}

// Actualizar el año en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Efecto de cursor personalizado (similar al de index.html)
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
});

// Efecto hover en enlaces
const hoverElements = document.querySelectorAll('a, button, .project-link, .project-tech-item');

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