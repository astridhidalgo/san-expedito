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
    datos.forEach((proveedores) => {
      const fila = document.createElement("tr");

      // Agregar una casilla de verificación para la selección
      const seleccion = document.createElement("td");
      const checkbox = document.createElement("input");
      checkbox.type = "radio";
      checkbox.name = "proveedores-seleccion";
      checkbox.value = proveedores.id;
      seleccion.appendChild(checkbox);
      fila.appendChild(seleccion);

      // Agregar las celdas para el ID y el nombre de la categoría
      const idProveedor = document.createElement("td");
      idProveedor.textContent = proveedores.id;
      fila.appendChild(idProveedor);

      const nombreProveedor = document.createElement("td");
      nombreProveedor.textContent = proveedores.nombre;
      fila.appendChild(nombreProveedor);

      tbody.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al obtener datos de la API:", error);
  }
}

// Función para eliminar las categorías seleccionadas
function eliminarProveedoresSeleccionadas() {
  const tabla = document.getElementById("tabla-proveedores");
  const radioButtons = tabla.querySelectorAll("input[type='radio']:checked");

  if (radioButtons.length === 0) {
    alert("Por favor, seleccione un provedor para eliminar.");
    return;
  }

  // Obtener el valor del ID de la categoría seleccionada
  const proveedorAEliminar = radioButtons[0].value;

  console.log(proveedorAEliminar);

  // Mostrar el ID de la categoría seleccionada en la consola
  console.log("Proveedor seleccionado para eliminar:", proveedorAEliminar);

  // Enviar el ID de la categoría seleccionada al servidor para eliminarla
  fetch(`http://localhost:8585/proveedores/${proveedorAEliminar}`, {
    method: "DELETE", // Método DELETE para eliminar recursos
  }).then((response) => {
    console.log(response);
    if (response.ok) {
      console.log("Proveedor eliminado exitosamente");
      obtenerDatosYMostrarTabla();
      return response.json(); // Convertir la respuesta a JSON si es exitosa
    } else {
      alert("No se puede eliminar el proveedor, está vinculado a productos");
      throw new Error(
        "No se puede eliminar el proveedor, está vinculada a productos"
      );
    }
  });
}
// Llamar a la función para mostrar los datos en la tabla cuando se cargue la página
window.onload = obtenerDatosYMostrarTabla;

document.addEventListener("DOMContentLoaded", function () {
  // Asocia la función eliminarCategoriasSeleccionadas al evento click del botón
  const botonEliminarProveedores = document.getElementById(
    "botonEliminarProveedores"
  );
  botonEliminarProveedores.addEventListener("click", function () {
    eliminarProveedoresSeleccionadas();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const botonModificarproveedores = document.getElementById(
    "botonModificarproveedores"
  );
  botonModificarproveedores.addEventListener("click", function () {
    actualizarProveedorSeleccionado();
  });
});

async function actualizarProveedorSeleccionado() {
  const tabla = document.getElementById("tabla-proveedores");
  const radioButtons = tabla.querySelectorAll("input[type='radio']:checked");

  if (radioButtons.length === 0) {
    alert("Por favor, seleccione una categoria para Modificar.");
    $(".FondoModal").css("display", "none");
    $(".VentanaModal").hide();
    return;
  }
  const proveedorAModificar = radioButtons[0].value;

  console.log("Categoria seleccionada para modificar:", proveedorAModificar);
  try {
    const respuesta = await fetch(
      `http://localhost:8585/proveedores/${proveedorAModificar}`
    );
    const datos = await respuesta.json();
    console.log(datos);
    abrirModalModificarProveedor(datos);
  } catch (error) {
    console.error("Error al obtener la cantidad de productos:", error);
  }
}
