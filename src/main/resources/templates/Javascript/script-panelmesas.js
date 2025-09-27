function abrirModalCrearMesa() {
  document.getElementById("modal-crear-mesa").style.display = "block"
}

function cerrarModalCrearMesa() {
  document.getElementById("modal-crear-mesa").style.display = "none"
}

function abrirModalEditarMesa(datos) {
  document.getElementById("edit-mesa-id").value = datos.id
  document.getElementById("edit-mesa-numero").value = datos.numero_mesa
  document.getElementById("edit-mesa-capacidad").value = datos.capacidad
  document.getElementById("edit-mesa-estado").value = datos.estado
  document.getElementById("modal-editar-mesa").style.display = "block"
}

function cerrarModalEditarMesa() {
  document.getElementById("modal-editar-mesa").style.display = "none"
}

function eliminarMesa(id) {
  if (confirm("¿Estás seguro de eliminar esta mesa?")) {
    // Crear formulario dinámico para eliminar
    const form = document.createElement("form")
    form.method = "POST"
    form.style.display = "none"

    const input = document.createElement("input")
    input.type = "hidden"
    input.name = "eliminar_mesa"
    input.value = id

    form.appendChild(input)
    document.body.appendChild(form)
    form.submit()
  }
}

function eliminarReserva(id) {
  if (confirm("¿Estás seguro de eliminar esta reserva?")) {
    // Crear formulario dinámico para eliminar
    const form = document.createElement("form")
    form.method = "POST"
    form.style.display = "none"

    const input = document.createElement("input")
    input.type = "hidden"
    input.name = "eliminar_reserva"
    input.value = id

    form.appendChild(input)
    document.body.appendChild(form)
    form.submit()
  }
}
