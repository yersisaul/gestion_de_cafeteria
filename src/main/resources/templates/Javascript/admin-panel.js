document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search)
  const seccion = urlParams.get("seccion") || "dashboard"

  // Ocultar todas las secciones
  document.querySelectorAll(".section").forEach((section) => {
    section.style.display = "none"
  })

  // Mostrar solo la sección actual si existe
  const seccionActiva = document.getElementById(seccion)
  if (seccionActiva) {
    seccionActiva.style.display = "block"
  }

  // Marcar visualmente el enlace activo del menú
  document.querySelectorAll(".sidebar a").forEach((link) => {
    const linkSeccion = link.getAttribute("href").split("=")[1]
    if (linkSeccion === seccion) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })

  // Actualizar dashboard cada 30 segundos
  if (seccion === "dashboard") {
    setInterval(actualizarDashboard, 30000)
  }

  // Actualizar reservas cada 15 segundos
  if (seccion === "reservas") {
    setInterval(() => {
      location.reload()
    }, 15000)
  }
})

function actualizarDashboard() {
  fetch("actualizar-dashboard.php")
    .then((response) => response.json())
    .then((data) => {
      // Actualizar widgets
      const reservasHoy = document.getElementById("reservas-hoy")
      const mesasDisponibles = document.getElementById("mesas-disponibles")
      const reservasPendientes = document.getElementById("reservas-pendientes")
      const ingresosHoy = document.getElementById("ingresos-hoy")

      if (reservasHoy) reservasHoy.textContent = data.reservas_hoy
      if (mesasDisponibles) mesasDisponibles.textContent = data.mesas_disponibles
      if (reservasPendientes) reservasPendientes.textContent = data.reservas_pendientes
      if (ingresosHoy) ingresosHoy.textContent = data.ingresos_hoy

      // Actualizar tablas
      const tablaUltimas = document.getElementById("ultimas-reservas")
      if (tablaUltimas) {
        tablaUltimas.innerHTML = data.ultimas_reservas_html
      }

      const tablaPendientes = document.getElementById("reservas-pendientes-tabla")
      if (tablaPendientes) {
        tablaPendientes.innerHTML = data.reservas_pendientes_html
      }
    })
    .catch((error) => {
      console.error("Error actualizando dashboard:", error)
    })
}

// Funciones para confirmar/cancelar reservas desde el dashboard
function confirmarReserva(id) {
  if (confirm("¿Confirmar esta reserva?")) {
    fetch("actualizar-estado-reserva.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "id=" + id + "&estado=Confirmada",
    })
      .then((response) => response.text())
      .then((data) => {
        alert("Reserva confirmada")
        actualizarDashboard() // Actualizar dashboard inmediatamente
      })
      .catch((error) => {
        console.error("Error:", error)
        alert("Error al confirmar la reserva")
      })
  }
}

function cancelarReserva(id) {
  if (confirm("¿Cancelar esta reserva?")) {
    fetch("actualizar-estado-reserva.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "id=" + id + "&estado=Cancelada",
    })
      .then((response) => response.text())
      .then((data) => {
        alert("Reserva cancelada")
        actualizarDashboard() // Actualizar dashboard inmediatamente
      })
      .catch((error) => {
        console.error("Error:", error)
        alert("Error al cancelar la reserva")
      })
  }
}
