function abrirModal(reserva) {
  document.getElementById("modal-edicion").style.display = "flex"

  document.getElementById("edit-id").value = reserva.id
  document.getElementById("edit-nombre").value = reserva.nombre
  document.getElementById("edit-fecha").value = reserva.fecha
  document.getElementById("edit-hora").value = reserva.hora
  document.getElementById("edit-personas").value = reserva.personas
  document.getElementById("edit-estado").value = reserva.estado
}

function cerrarModal() {
  const modal = document.getElementById("modal-edicion")
  modal.style.display = "none"
  document.getElementById("form-editar-reserva").reset()
}

function verDetalles(datos) {
  const contenido = `
        <p><strong>ID:</strong> ${datos.id}</p>
        <p><strong>Nombre:</strong> ${datos.nombre}</p>
        <p><strong>Teléfono:</strong> ${datos.telefono || "No especificado"}</p>
        <p><strong>Email:</strong> ${datos.email || "No especificado"}</p>
        <p><strong>Fecha:</strong> ${datos.fecha}</p>
        <p><strong>Hora:</strong> ${datos.hora}</p>
        <p><strong>Personas:</strong> ${datos.personas}</p>
        <p><strong>Estado:</strong> ${datos.estado}</p>
        <p><strong>Ocasión:</strong> ${datos.ocasion || "No especificada"}</p>
        <p><strong>Comentarios:</strong> ${datos.comentarios || "Sin comentarios"}</p>
    `
  document.getElementById("detalles-contenido").innerHTML = contenido
  document.getElementById("modal-detalles").style.display = "block"
}

function cerrarModalDetalles() {
  document.getElementById("modal-detalles").style.display = "none"
}

function abrirModalCrearReserva() {
  document.getElementById("modal-crear-reserva").style.display = "block"
}

function cerrarModalCrearReserva() {
  document.getElementById("modal-crear-reserva").style.display = "none"
}
