document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatMessages = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('chatbot-user-input');
    const sendButton = document.getElementById('chatbot-send');

    // Estado del chat
    let isChatOpen = false;

    // Función para mostrar/ocultar el chat
    function toggleChat() {
        isChatOpen = !isChatOpen;
        chatbotContainer.classList.toggle('chatbot-visible');
        if (isChatOpen) {
            userInput.focus();
        }
    }

    // Función para mostrar mensajes
    function displayMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}-message`;
        messageDiv.innerHTML = content;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Función para redirección segura
    function safeRedirect(path) {
        displayMessage(`Redirigiendo a ${path}...`, 'bot');
        setTimeout(() => {
            try {
                window.location.href = path;
            } catch (error) {
                console.error("Error en redirección:", error);
                displayMessage("Ocurrió un error al redirigir. Por favor intenta manualmente.", 'bot');
            }
        }, 1000);
    }

    // Base de conocimiento mejorada
    const botKnowledge = {
        greetings: ["hola", "buenos días", "buenas tardes"],
        farewells: ["adiós", "hasta luego", "chao"],
        options: {
            "reservar": {
                triggers: ["reservar", "mesa", "reserva"],
                response: "Te llevaré a nuestra página de reservas",
                action: () => safeRedirect("reservas.html")
            },
            "menú": {
                triggers: ["menú", "carta", "qué tienen"],
                response: "Aquí está nuestro menú",
                action: () => safeRedirect("menu.html")
            },
            "ubicación": {
                triggers: ["dónde están", "ubicación", "dirección"],
                response: "Nuestra ubicación y contacto",
                action: () => safeRedirect("contacto.html")
            },
            "horarios": {
                triggers: ["horario", "abierto", "a qué hora"],
                response: "Nuestros horarios de atención",
                action: () => safeRedirect("contacto.html#horarios")
            },
            "galería": {
                triggers: ["fotos", "galería", "imágenes"],
                response: "Mira nuestra galería de fotos",
                action: () => safeRedirect("galeria.html")
            },
            "contacto": {
                triggers: ["contacto", "teléfono", "whatsapp"],
                response: "Información de contacto",
                action: () => safeRedirect("contacto.html")
            }
        }
    };

    // Función para procesar mensajes
    function processMessage(message) {
        const lowerMsg = message.toLowerCase();
        
        // Verificar saludos
        if (botKnowledge.greetings.some(g => lowerMsg.includes(g))) {
            showWelcomeMessage();
            return;
        }
        
        // Verificar despedidas
        if (botKnowledge.farewells.some(f => lowerMsg.includes(f))) {
            displayMessage("¡Gracias por visitar El Arte del Café! Vuelve pronto.", 'bot');
            return;
        }
        
        // Buscar opción válida
        for (const [key, option] of Object.entries(botKnowledge.options)) {
            if (option.triggers.some(t => lowerMsg.includes(t))) {
                displayMessage(option.response, 'bot');
                option.action();
                return;
            }
        }
        
        // Si no se reconoce
        displayMessage("No entendí tu solicitud. Puedes preguntar por: <strong>reservas, menú, ubicación, horarios o galería</strong>.", 'bot');
    }

    // Mensaje de bienvenida mejorado
    function showWelcomeMessage() {
        const welcomeMsg = `¡Hola! Soy el asistente de <strong>El Arte del Café</strong> ☕<br><br>
        ¿En qué puedo ayudarte hoy?<br><br>
        <span class='quick-reply'>Reservar mesa</span>
        <span class='quick-reply'>Ver menú</span>
        <span class='quick-reply'>Ubicación</span>
        <span class='quick-reply'>Horarios</span>
        <span class='quick-reply'>Galería</span>`;
        
        displayMessage(welcomeMsg, 'bot');
    }

    // Enviar mensaje mejorado
    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;
        
        displayMessage(message, 'user');
        userInput.value = '';
        
        // Mostrar "escribiendo..."
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'chatbot-message bot-message typing-indicator';
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Procesar después de breve retraso
        setTimeout(() => {
            chatMessages.removeChild(typingIndicator);
            processMessage(message);
        }, 800);
    }

    // Event listeners mejorados
    chatbotToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleChat();
    });

    sendButton.addEventListener('click', function(e) {
        e.preventDefault();
        sendMessage();
    });

    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

    // Manejar quick replies
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quick-reply')) {
            e.preventDefault();
            userInput.value = e.target.textContent;
            sendMessage();
        }
    });

    // Cerrar chat al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (isChatOpen && !chatbotContainer.contains(e.target) && e.target !== chatbotToggle) {
            toggleChat();
        }
    });

    // Mensaje inicial después de 2 segundos
    setTimeout(() => {
        if (!isChatOpen) {
            displayMessage("¿Necesitas ayuda? Haz clic en el ícono del chat ☕", 'bot');
        }
    }, 2000);
});