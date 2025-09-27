document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos del DOM
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const closeChatbot = document.getElementById('close-chatbot');
    const chatMessages = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('chatbot-user-input');
    const sendButton = document.getElementById('chatbot-send');

    // Estado del chat
    let isChatOpen = false;
    let currentReservationData = {};

    let conversationHistory = [];

    // Base de conocimiento del chatbot
    const botKnowledge = {
        greetings: ["hola", "buenos días", "buenas tardes"],
        farewells: ["adiós", "hasta luego", "chao"],
        menu: {
            triggers: ["menú", "carta", "qué tienen", "precios"],
            response: `☕ <strong>Menú de El Arte del Café</strong> ☕<br><br>
            <u>Cafés Especiales:</u><br>
            • Espresso Clásico - S/ 9.00<br>
            • Latte Artesanal - S/ 12.00<br>
            • Cappuccino Italiano - S/ 11.50<br><br>
            <u>Desayunos:</u><br>
            • Continental - S/ 18.00<br>
            • Andino - S/ 22.00<br><br>
            <span class='quick-reply'>Ver postres</span> <span class='quick-reply'>Bebidas frías</span>`
        },
        reservations: {
            triggers: ["reservar", "mesa", "quiero venir"],
            steps: [
                {
                    question: "¡Perfecto! ¿Para cuántas personas será la reserva?",
                    field: "people"
                },
                {
                    question: "¿Qué fecha te gustaría? (Ej: 15/07 o 'este viernes')",
                    field: "date"
                },
                {
                    question: "¿Prefieres terraza o interior?",
                    field: "location"
                },
                {
                    question: "Por último, ¿a qué hora? (Ej: 14:00 o 'a las 2pm')",
                    field: "time"
                }
            ]
        },
        location: {
            triggers: ["dónde están", "ubicación", "dirección"],
            response: `📍 <strong>Nuestra ubicación:</strong><br>
            Praderas de Pariachi 3ra. Etapa<br>
            Mz B Lote 12, Ate, Lima - Perú<br><br>
            <a href="https://maps.app.goo.gl/..." target="_blank" style="color: #6f4e37; text-decoration: underline;">Ver en Google Maps</a>`
        },
        hours: {
            triggers: ["horario", "abierto", "a qué hora"],
            response: `🕒 <strong>Horario de atención:</strong><br>
            • Lunes a Viernes: 7:30am - 10pm<br>
            • Sábados y Domingos: 8am - 11pm<br><br>
            <em>Horario extendido los viernes de jazz</em>`
        }
    };

    // Funciones principales
    function toggleChat() {
        isChatOpen = !isChatOpen;
        chatbotContainer.classList.toggle('chatbot-visible');
        
        if (isChatOpen) {
            userInput.focus();
            if (conversationHistory.length === 0) {
                showWelcomeMessage();
            }
        }
    }

    function showWelcomeMessage() {
        const welcomeMsg = `¡Hola! Soy el asistente de <strong>El Arte del Café</strong> 🎨☕<br><br>
        ¿En qué puedo ayudarte hoy?<br><br>
        <span class='quick-reply'>Reservar mesa</span>
        <span class='quick-reply'>Ver menú</span>
        <span class='quick-reply'>Horarios</span>
        <span class='quick-reply'>Ubicación</span>`;
        
        displayMessage(welcomeMsg, 'bot');
    }

    function displayMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}-message`;
        messageDiv.innerHTML = content;
        chatMessages.appendChild(messageDiv);
        
        // Scroll al final
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Guardar en historial
        conversationHistory.push({
            sender,
            content,
            timestamp: new Date()
        });
        
        // Manejar quick replies
        if (sender === 'bot') {
            setTimeout(() => {
                const quickReplies = messageDiv.querySelectorAll('.quick-reply');
                quickReplies.forEach(reply => {
                    reply.addEventListener('click', () => {
                        userInput.value = reply.textContent;
                        sendMessage();
                    });
                });
            }, 100);
        }
    }

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
        
        // Simular procesamiento
        setTimeout(() => {
            chatMessages.removeChild(typingIndicator);
            processUserMessage(message);
        }, 1000 + (Math.random() * 1000));
    }

    function processUserMessage(message) {
        const lowerMsg = message.toLowerCase();
        
        // 1. Verificar saludos
        if (botKnowledge.greetings.some(g => lowerMsg.includes(g))) {
            showWelcomeMessage();
            return;
        }
        
        // 2. Verificar despedidas
        if (botKnowledge.farewells.some(f => lowerMsg.includes(f))) {
            displayMessage("¡Gracias por visitar El Arte del Café! Esperamos verte pronto. ☕", 'bot');
            return;
        }
        
        // 3. Procesar reservas (flujo multi-paso)
        if (Object.keys(currentReservationData).length > 0) {
            continueReservationFlow(message);
            return;
        }
        
        // 4. Verificar otros temas
        let response = "Disculpa, no entendí completamente. ¿Podrías reformular tu pregunta?";
        
        // Menú
        if (botKnowledge.menu.triggers.some(t => lowerMsg.includes(t))) {
            response = botKnowledge.menu.response;
        }
        // Ubicación
        else if (botKnowledge.location.triggers.some(t => lowerMsg.includes(t))) {
            response = botKnowledge.location.response;
        }
        // Horarios
        else if (botKnowledge.hours.triggers.some(t => lowerMsg.includes(t))) {
            response = botKnowledge.hours.response;
        }
        // Iniciar reserva
        else if (botKnowledge.reservations.triggers.some(t => lowerMsg.includes(t))) {
            startReservationFlow();
            return;
        }
        
        displayMessage(response, 'bot');
    }

    function startReservationFlow() {
        currentReservationData = {};
        const firstStep = botKnowledge.reservations.steps[0];
        displayMessage(firstStep.question, 'bot');
    }

    function continueReservationFlow(message) {
        const currentStepIndex = Object.keys(currentReservationData).length;
        const currentStep = botKnowledge.reservations.steps[currentStepIndex];
        
        // Guardar respuesta
        currentReservationData[currentStep.field] = message;
        
        // Verificar si hay más pasos
        if (currentStepIndex < botKnowledge.reservations.steps.length - 1) {
            const nextStep = botKnowledge.reservations.steps[currentStepIndex + 1];
            displayMessage(nextStep.question, 'bot');
        } else {
            // Finalizar reserva
            completeReservation();
        }
    }

    function completeReservation() {
        const { people, date, location, time } = currentReservationData;
        
        const reservationSummary = `📝 <strong>Reserva confirmada:</strong><br><br>
        👥 Personas: ${people}<br>
        📅 Fecha: ${date}<br>
        🕒 Hora: ${time}<br>
        🪑 Zona: ${location}<br><br>
        ¿Podrías confirmarme tu nombre completo y un número de contacto?`;
        
        displayMessage(reservationSummary, 'bot');
        currentReservationData = {}; // Reset para nueva reserva
    }

    // Event Listeners
    chatbotToggle.addEventListener('click', toggleChat);
    closeChatbot.addEventListener('click', toggleChat);
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Iniciar chat después de 5 segundos (solo en página de inicio)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        setTimeout(() => {
            if (!isChatOpen && conversationHistory.length === 0) {
                displayMessage("¡Hola! 👋 ¿Necesitas ayuda para encontrar algo en El Arte del Café?", 'bot');
            }
        }, 5000);
    }
});