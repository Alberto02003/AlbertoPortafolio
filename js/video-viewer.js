document.addEventListener('DOMContentLoaded', function() {
    // Datos de los videos de proyectos
    const projectVideos = [
        {
            id: 1,
            title: "Emulacion de Tuenti en Jetpack Compose",
            description: "Plataforma de Red social con aspectos detallados.",
            videoUrl: "../assets/video/PruebaTuTuenti.mp4",
            thumbnail: "../assets/images/TuTuenti.jpg",
            tech: ["Kotlin", "Jetpack Compose"],
            date: "2024-11-15"
        },
        
    ];

    // Elementos del DOM
    const videoPlayer = document.getElementById('video-player');
    const videoTitle = document.getElementById('video-title');
    const videoInfo = document.getElementById('video-info');
    const videoProjectTitle = videoInfo.querySelector('.video-project-title');
    const videoProjectDescription = videoInfo.querySelector('.video-project-description');
    const videoProjectTech = videoInfo.querySelector('.video-project-tech');
    const thumbnailsContainer = document.querySelector('.video-thumbnails');
    const updateDate = document.getElementById('update-date');

    // Formatear fecha
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    // Mostrar la fecha de actualización (último video)
    const latestDate = projectVideos.reduce((latest, video) => {
        return video.date > latest ? video.date : latest;
    }, '');
    updateDate.textContent = formatDate(latestDate);

    // Cargar miniaturas
    function loadThumbnails() {
        thumbnailsContainer.innerHTML = '';
        
        projectVideos.forEach((video, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `video-thumbnail ${index === 0 ? 'active' : ''}`;
            thumbnail.innerHTML = `
                <img src="${video.thumbnail}" alt="${video.title}">
                <div class="video-thumbnail-title">${video.title}</div>
            `;
            
            thumbnail.addEventListener('click', () => {
                loadVideo(index);
                updateThumbnails(index);
            });
            
            thumbnailsContainer.appendChild(thumbnail);
        });
    }

    // Actualizar estado de miniaturas
    function updateThumbnails(activeIndex) {
        document.querySelectorAll('.video-thumbnail').forEach((thumb, index) => {
            if (index === activeIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    // Cargar video
    function loadVideo(index) {
        const video = projectVideos[index];
        
        videoPlayer.innerHTML = `
            <iframe src="${video.videoUrl}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
            </iframe>
        `;
        
        videoTitle.textContent = video.title;
        videoProjectTitle.textContent = video.title;
        videoProjectDescription.textContent = video.description;
        
        videoProjectTech.innerHTML = '';
        video.tech.forEach(tech => {
            const techItem = document.createElement('span');
            techItem.className = 'video-tech-item';
            techItem.textContent = tech;
            videoProjectTech.appendChild(techItem);
        });
    }

    // Inicializar
    loadThumbnails();
    loadVideo(0); // Cargar el primer video por defecto

    // Año actual en el footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Efecto de cursor personalizado
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });
    
    // Efecto hover en enlaces
    const hoverElements = document.querySelectorAll('a, button, .video-thumbnail, .video-tech-item');
    
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
});