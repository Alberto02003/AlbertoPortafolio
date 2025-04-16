 // Datos completos de los proyectos
 const projects = {
    '1': {
        title: "E-commerce Platform",
        subtitle: "Plataforma de comercio electrónico completa",
        description: "Desarrollo de una plataforma de e-commerce con todas las funcionalidades necesarias para una tienda online moderna.",
        longDescription: `
            <p>Este proyecto consistió en el desarrollo completo de una plataforma de comercio electrónico desde cero. La aplicación permite a los usuarios:</p>
            <ul>
                <li>Registrarse y autenticarse de forma segura</li>
                <li>Explorar productos organizados por categorías</li>
                <li>Buscar productos con filtros avanzados</li>
                <li>Gestionar un carrito de compras persistente</li>
                <li>Realizar pagos a través de Stripe</li>
                <li>Seguir el estado de sus pedidos</li>
            </ul>
            <p>Para los administradores, incluye un completo panel de control con:</p>
            <ul>
                <li>Gestión de productos y categorías</li>
                <li>Visualización de estadísticas de ventas</li>
                <li>Gestión de usuarios y permisos</li>
                <li>Sistema de cupones y descuentos</li>
            </ul>
        `,
        challenges: "Los principales desafíos técnicos incluyeron la implementación del carrito de compras persistente (que mantiene los items incluso después de cerrar sesión), la integración segura con la API de Stripe, y la optimización del rendimiento para manejar grandes catálogos de productos.",
        tech: ["React", "Node.js", "Express", "MongoDB", "Redux", "Stripe API"],
        demoLink: "#",
        codeLink: "#",
        image: "https://via.placeholder.com/1200x600/0a192f/64ffda?text=E-commerce+Platform"
    },
    '2': {
        title: "Social Network API",
        subtitle: "API RESTful para red social",
        description: "Desarrollo de una API completa para una red social con funcionalidades como publicaciones, comentarios, relaciones entre usuarios y mensajería.",
        longDescription: `
            <p>API completa para una red social que incluye:</p>
            <ul>
                <li>Sistema de autenticación con JWT</li>
                <li>CRUD completo para publicaciones y comentarios</li>
                <li>Sistema de relaciones entre usuarios (seguidores/seguidos)</li>
                <li>Mensajería en tiempo real usando WebSockets</li>
                <li>Sistema de notificaciones</li>
                <li>Documentación automática con Swagger</li>
            </ul>
        `,
        challenges: "Los mayores retos fueron implementar el sistema de notificaciones en tiempo real que escala bien con muchos usuarios concurrentes, y optimizar las consultas para el feed de publicaciones que muestra contenido relevante para cada usuario.",
        tech: ["Node.js", "Express", "MongoDB", "Socket.io", "JWT", "Redis"],
        demoLink: "#",
        codeLink: "#",
        image: "https://via.placeholder.com/1200x600/172a45/64ffda?text=Social+Network+API"
    },
    '3': {
        title: "Task Management App",
        subtitle: "Aplicación de gestión de tareas",
        description: "Aplicación web para gestión de tareas personales y en equipo con tableros Kanban y sistema de prioridades.",
        longDescription: `
            <p>Aplicación de productividad que permite:</p>
            <ul>
                <li>Creación de tableros Kanban personalizables</li>
                <li>Vista de calendario integrada</li>
                <li>Sistema de etiquetas y prioridades</li>
                <li>Colaboración en tiempo real entre equipo</li>
                <li>Gráficos de progreso y productividad</li>
                <li>Exportación de reportes en PDF/CSV</li>
            </ul>
        `,
        challenges: "Implementar la colaboración en tiempo real requirió solucionar problemas de concurrencia cuando múltiples usuarios editaban el mismo tablero. También fue un reto hacer que la aplicación fuera completamente responsiva manteniendo todas las funcionalidades.",
        tech: ["Vue.js", "Firebase", "Quasar", "Vuex"],
        demoLink: "#",
        codeLink: "#",
        image: "https://via.placeholder.com/1200x600/303f60/64ffda?text=Task+Management+App"
    },
    '4': {
        title: "Health Tracking App",
        subtitle: "Aplicación móvil de seguimiento de salud",
        description: "Aplicación para registrar y monitorear métricas de salud como actividad física, nutrición y signos vitales.",
        longDescription: `
            <p>Aplicación móvil que permite:</p>
            <ul>
                <li>Registro de actividad física y nutrición</li>
                <li>Sincronización con wearables (Apple Watch, Fitbit)</li>
                <li>Visualización de datos con gráficos interactivos</li>
                <li>Recordatorios inteligentes</li>
                <li>Recomendaciones personalizadas basadas en los datos</li>
                <li>Exportación de datos para compartir con médicos</li>
            </ul>
        `,
        challenges: "La integración con diferentes wearables fue compleja debido a la variedad de APIs. También fue un reto procesar grandes volúmenes de datos en dispositivos móviles manteniendo un buen rendimiento y duración de batería.",
        tech: ["Flutter", "Firebase", "BLoC", "Health Connect API"],
        demoLink: "#",
        codeLink: "#",
        image: "https://via.placeholder.com/1200x600/0a192f/64ffda?text=Health+Tracking+App"
    }
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
                    <p><strong>Arquitectura:</strong> ${project.tech.includes('Node.js') ? 'Backend con Node.js y Express' : 'Aplicación móvil con Flutter'}</p>
                    <p><strong>Base de datos:</strong> ${project.tech.includes('MongoDB') ? 'MongoDB (NoSQL)' : 'Firebase Realtime Database'}</p>
                    <p><strong>Estado:</strong> Completado y en producción</p>
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