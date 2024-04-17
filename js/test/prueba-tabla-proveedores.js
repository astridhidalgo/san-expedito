async function obtenerDatosYMostrarTabla() {
  try {
    const respuesta = await fetch("http://localhost:8585/proveedores");
    const datos = await respuesta.json();

    // Obtener la tabla
    const tabla = document.getElementById("tabla-proveedores");
    const tbody = tabla.querySelector("tbody");

    // Limpiar la tabla antes de agregar nuevos datos
    tbody.innerHTML = "";

    // Iterar sobre los datos obtenidos y agregar filas a la tabla
    datos.forEach((proveedor) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
				<td>${proveedor.id}</td>
				<td>${proveedor.nombre}</td>
			  `;
      tbody.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al obtener datos de la API:", error);
  }
}

// Llamar a la función para mostrar los datos en la tabla cuando se cargue la página
window.onload = obtenerDatosYMostrarTabla;
