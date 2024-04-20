async function obtenerDatosYMostrarTabla() {
  try {
    const respuesta = await fetch("http://localhost:8585/facturas");
    const datos = await respuesta.json();

    // Obtener la tabla
    const tabla = document.getElementById("tabla-facturas");
    const tbody = tabla.querySelector("tbody");

    // Limpiar la tabla antes de agregar nuevos datos
    tbody.innerHTML = "";

    // Iterar sobre los datos obtenidos y agregar filas a la tabla
    datos.forEach((factura) => {
      const fila = document.createElement("tr");

      // Agregar las celdas para el ID y el nombre de la categoría
      const numero_factura = document.createElement("td");
      numero_factura.textContent = factura.numero_factura;
      numero_factura.classList.add("FacturaModal");
      fila.appendChild(numero_factura);

      const cedula = document.createElement("td");
      cedula.textContent = factura.cliente.cedula;
      cedula.classList.add("FacturaModal");
      fila.appendChild(cedula);

      const cantidadProductos = document.createElement("td");
      cantidadProductos.textContent = factura.cantidadProductos;
      cantidadProductos.classList.add("FacturaModal");
      fila.appendChild(cantidadProductos);

      const total = document.createElement("td");
      total.textContent = factura.total;
      total.classList.add("FacturaModal");
      fila.appendChild(total);

      const fecha = document.createElement("td");
      fecha.textContent = factura.fecha_creacion;
      fecha.classList.add("FacturaModal");
      fila.appendChild(fecha);

      tbody.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al obtener datos de la API:", error);
  }
}

window.onload = obtenerDatosYMostrarTabla;
