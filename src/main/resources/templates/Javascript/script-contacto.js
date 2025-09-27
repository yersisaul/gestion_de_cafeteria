       // Mejoras interactivas con JavaScript
        document.addEventListener('DOMContentLoaded', function() {
        // Añade clase loaded para animación de entrada
        document.body.classList.add('loaded');
        
        // Efecto hover para secciones de información
        const infoSections = document.querySelectorAll('.info-section');
        infoSections.forEach(section => {
            section.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
            });
            
            section.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });
 
        // Interacción con la sección de contacto
        const contactSection = document.querySelector('.contact-section');
        const contactButtons = document.querySelector('.contact-buttons');
        
        contactSection.addEventListener('click', function() {
            contactButtons.style.display = contactButtons.style.display === 'none' ? 'flex' : 'none';
            contactButtons.style.gap = '10px';
            contactButtons.style.marginTop = '10px';
            contactButtons.style.justifyContent = 'center';
        });
        
        // Efecto pulsante para las estrellas
        const stars = document.querySelector('.stars');
        setInterval(() => {
            stars.style.transform = 'scale(1.05)';
            setTimeout(() => {
                stars.style.transform = 'scale(1)';
            }, 300);
        }, 2000);
    });

// Abrir ubicación EXACTA en Google Maps
function openGoogleMaps() {
    window.open(
        "https://www.google.com/maps?q=-12.006108370095522,-76.84460935328943&ll=-12.006108370095522,-76.84460935328943&z=17",
        "_blank"
    );
}

// Cómo llegar DESDE la ubicación del usuario
function getDirections() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                window.open(
                    `https://www.google.com/maps/dir/${userLat},${userLng}/-12.006108370095522,-76.84460935328943/`,
                    "_blank"
                );
            },
            () => {
                // Si el usuario bloquea la geolocalización
                window.open(
                    "https://www.google.com/maps/dir//-12.006108370095522,-76.84460935328943/",
                    "_blank"
                );
            }
        );
    } else {
        // Navegadores sin soporte de geolocalización
        window.open(
            "https://www.google.com/maps/dir//-12.006108370095522,-76.84460935328943/",
            "_blank"
        );
    }
}