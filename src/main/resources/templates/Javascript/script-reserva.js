document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".reserva-form")
  const fechaInput = document.getElementById("fecha")

  // Establecer fecha mínima como hoy
  const today = new Date().toISOString().split("T")[0]
  fechaInput.min = today

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    // Validar fecha antes de enviar
    const fechaSeleccionada = new Date(fechaInput.value)
    const fechaHoy = new Date()
    fechaHoy.setHours(0, 0, 0, 0)
    fechaSeleccionada.setHours(0, 0, 0, 0)

    if (fechaSeleccionada < fechaHoy) {
      mostrarNotificacion("No se pueden hacer reservas para fechas pasadas", "error")
      return
    }

    const formData = new FormData(form)

    fetch("../php/reservar.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text)
          })
        }
        return response.text()
      })
      .then((mensaje) => {
        console.log("Respuesta del servidor:", mensaje)
        // Mostrar popup de éxito
        const popup = document.getElementById("popup-reserva")
        popup.style.display = "flex"
        // Limpiar formulario
        form.reset()
      })
      .catch((error) => {
        console.error("Error:", error)
        mostrarNotificacion(error.message, "error")
      })
  })
})

function mostrarNotificacion(mensaje, tipo = "info") {
  // Crear elemento de notificación
  const notificacion = document.createElement("div")
  notificacion.className = `notificacion ${tipo}`
  notificacion.innerHTML = `
    <div class="notificacion-contenido">
      <span class="notificacion-icono">${tipo === "error" ? "⚠️" : "ℹ️"}</span>
      <span class="notificacion-mensaje">${mensaje}</span>
      <button class="notificacion-cerrar" onclick="cerrarNotificacion(this)">×</button>
    </div>
  `

  // Agregar estilos si no existen
  if (!document.getElementById("notificacion-styles")) {
    const styles = document.createElement("style")
    styles.id = "notificacion-styles"
    styles.textContent = `
      .notificacion {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease-out;
      }
      .notificacion.info {
        background-color: #e3f2fd;
        border-left: 4px solid #2196f3;
        color: #1565c0;
      }
      .notificacion.error {
        background-color: #ffebee;
        border-left: 4px solid #f44336;
        color: #c62828;
      }
      .notificacion-contenido {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .notificacion-icono {
        font-size: 18px;
      }
      .notificacion-mensaje {
        flex: 1;
        font-weight: 500;
      }
      .notificacion-cerrar {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: inherit;
        opacity: 0.7;
      }
      .notificacion-cerrar:hover {
        opacity: 1;
      }
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `
    document.head.appendChild(styles)
  }

  // Agregar al DOM
  document.body.appendChild(notificacion)

  // Auto-remover después de 5 segundos
  setTimeout(() => {
    if (notificacion.parentNode) {
      notificacion.remove()
    }
  }, 5000)
}

function cerrarNotificacion(button) {
  const notificacion = button.closest(".notificacion")
  if (notificacion) {
    notificacion.remove()
  }
}

function cerrarPopup() {
  document.getElementById("popup-reserva").style.display = "none"
}

