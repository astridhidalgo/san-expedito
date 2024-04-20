async function buscarFacturasPorFecha() {
  try {
    // Obtener las fechas seleccionadas
    const fechaDesde = document.querySelector(".FechaDesde").value;
    const fechaHasta = document.querySelector(".FechaHasta").value;

    // Construir la URL de la API con los parámetros de búsqueda
    const url = `http://localhost:8585/facturas?fechaInicio=${fechaDesde}&fechaFin=${fechaHasta}`;

    // Realizar la solicitud a la API
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    // Obtener la tabla
    const tabla = document.getElementById("tabla-facturas");
    const tbody = tabla.querySelector("tbody");

    // Limpiar la tabla antes de agregar nuevos datos
    tbody.innerHTML = "";

    // Iterar sobre los datos obtenidos y agregar filas a la tabla
    datos.forEach((factura) => {
      const fila = document.createElement("tr");

      // Agregar las celdas para los datos de la factura
      const numero_factura = document.createElement("td");
      numero_factura.textContent = factura.numero_factura;
      fila.appendChild(numero_factura);

      const cedula = document.createElement("td");
      cedula.textContent = factura.cliente.cedula;
      fila.appendChild(cedula);

      const cantidadProductos = document.createElement("td");
      cantidadProductos.textContent = factura.cantidadProductos;
      fila.appendChild(cantidadProductos);

      const total = document.createElement("td");
      total.textContent = factura.total;
      fila.appendChild(total);

      const fecha_creacion = document.createElement("td");
      const fechaSinHora = factura.fecha_creacion.split("T")[0]; // Obtener solo la parte de la fecha
      fecha_creacion.textContent = fechaSinHora;
      fila.appendChild(fecha_creacion);

      const botonAbrirModal = document.createElement("button");
      botonAbrirModal.textContent = "Detalle";
      botonAbrirModal.classList.add("FacturaModal"); // Agregar la clase al botón
      const valorId = factura.id;
      botonAbrirModal.setAttribute("id", `${valorId}`);
      //botonAbrirModal.addEventListener("click", () => abrirModal(factura)); // Agregar un controlador de eventos para abrir el modal
      const celdaBoton = document.createElement("td");
      celdaBoton.appendChild(botonAbrirModal);
      fila.appendChild(celdaBoton);

      tbody.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al obtener datos de la API:", error);
  }
}

// Agregar eventos de cambio a los elementos de fecha
const fechaDesdeInput = document.querySelector(".FechaDesde");
const fechaHastaInput = document.querySelector(".FechaHasta");

fechaDesdeInput.addEventListener("change", buscarFacturasPorFecha);
fechaHastaInput.addEventListener("change", buscarFacturasPorFecha);

// Llamar a la función para cargar los datos por primera vez
window.onload = buscarFacturasPorFecha;

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("FacturaModal")) {
    const idBoton = event.target.getAttribute("id");
    console.log("ID del botón:", idBoton);
    abrirModalYMostrarDetalles(idBoton);
  }
});
