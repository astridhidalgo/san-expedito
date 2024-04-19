async function obtenerDatosYMostrarTabla() {
  try {
    const respuesta = await fetch("http://localhost:8585/categorias");
    const datos = await respuesta.json();

    // Obtener la tabla
    const tabla = document.getElementById("tabla-categorias");
    const tbody = tabla.querySelector("tbody");

    // Limpiar la tabla antes de agregar nuevos datos
    tbody.innerHTML = "";

    // Iterar sobre los datos obtenidos y agregar filas a la tabla
    datos.forEach((categoria) => {
      const fila = document.createElement("tr");

      // Agregar una casilla de verificación para la selección
      const seleccion = document.createElement("td");
      const checkbox = document.createElement("input");
      checkbox.type = "radio";
      checkbox.name = "categoria-seleccion"
      checkbox.value = categoria.id;
      seleccion.appendChild(checkbox);
      fila.appendChild(seleccion);

      // Agregar las celdas para el ID y el nombre de la categoría
      const idCategoria = document.createElement("td");
      idCategoria.textContent = categoria.id;
      fila.appendChild(idCategoria);

      const nombreCategoria = document.createElement("td");
      nombreCategoria.textContent = categoria.nombre;
      fila.appendChild(nombreCategoria);

      tbody.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al obtener datos de la API:", error);
  }
}

// Función para eliminar las categorías seleccionadas
function eliminarCategoriasSeleccionadas() {
  const tabla = document.getElementById("tabla-categorias");
  const checkboxes = tabla.querySelectorAll("input[type='checkbox']:checked");
  console.log(checkboxes);
  const categoriasAEliminar = Array.from(checkboxes).map((checkbox) =>
    console.log(checkbox.value)
  );

  // Mostrar las categorías seleccionadas en la consola
  console.log("Categorías seleccionadas para eliminar:", categoriasAEliminar);

  // Enviar las categorías seleccionadas al servidor para eliminarlas
  fetch("http://localhost:8585/categorias", {
    method: "DELETE", // Método DELETE para eliminar recursos
    headers: {
      "Content-Type": "application/json", // Especificar el tipo de contenido JSON
    },
    body: JSON.stringify({ ids: categoriasAEliminar }), // Enviar el array de IDs en el cuerpo de la solicitud
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al eliminar categorías"); // Lanzar error si la respuesta no es exitosa
      }
      return response.json(); // Convertir la respuesta a JSON si es exitosa
    })
    .then((data) => {
      console.log("Categorías eliminadas exitosamente:", data); // Manejar la respuesta del servidor
    })
    .catch((error) => {
      alert("No se puede eliminar categoria, esta vinculada a productos");
      console.error("Error al eliminar categorías:", error); // Capturar y manejar cualquier error
    });
}

// Llamar a la función para mostrar los datos en la tabla cuando se cargue la página
window.onload = obtenerDatosYMostrarTabla;

document.addEventListener("DOMContentLoaded", function () {
  // Asocia la función eliminarCategoriasSeleccionadas al evento click del botón
  const botonEliminarCategorias = document.getElementById(
    "botonEliminarCategorias"
  );
  botonEliminarCategorias.addEventListener("click", function () {
    eliminarCategoriasSeleccionadas();
  });
});
