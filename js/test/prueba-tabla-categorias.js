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
      checkbox.name = "categoria-seleccion";
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
  const radioButtons = tabla.querySelectorAll("input[type='radio']:checked");

  if (radioButtons.length === 0) {
    alert("Por favor, seleccione una categoría para eliminar.");
    return;
  }

  // Obtener el valor del ID de la categoría seleccionada
  const categoriaAEliminar = radioButtons[0].value;

  console.log(categoriaAEliminar);

  // Mostrar el ID de la categoría seleccionada en la consola
  console.log("Categoría seleccionada para eliminar:", categoriaAEliminar);

  // Enviar el ID de la categoría seleccionada al servidor para eliminarla
  fetch(`http://localhost:8585/categorias/${categoriaAEliminar}`, {
    method: "DELETE", // Método DELETE para eliminar recursos
  }).then((response) => {
    console.log(response);
    if (response.ok) {
      console.log("Categoría eliminada exitosamente");
      obtenerDatosYMostrarTabla();
      return response.json(); // Convertir la respuesta a JSON si es exitosa
    } else {
      alert("No se puede eliminar la categoría, está vinculada a productos");
      throw new Error(
        "No se puede eliminar la categoría, está vinculada a productos"
      );
    }
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

document.addEventListener("DOMContentLoaded", function () {
  const botonActualizarCategorias = document.getElementById(
    "botonModificarCategorias"
  );
  botonActualizarCategorias.addEventListener("click", function () {
    actualizarCategoriaSeleccionada();
  });
});

async function actualizarCategoriaSeleccionada() {
  const tabla = document.getElementById("tabla-categorias");
  const radioButtons = tabla.querySelectorAll("input[type='radio']:checked");

  if (radioButtons.length === 0) {
    alert("Por favor, seleccione una categoria para Modificar.");
    $(".FondoModal").css("display", "none");
    $(".VentanaModal").hide();
    return;
  }
  const categoriaAModificar = radioButtons[0].value;

  console.log("Categoria seleccionada para modificar:", categoriaAModificar);
  try {
    const respuesta = await fetch(
      `http://localhost:8585/categorias/${categoriaAModificar}`
    );
    const datos = await respuesta.json();
    console.log(datos);
    abrirModalModificarcategorias(datos);
  } catch (error) {
    console.error("Error al obtener la cantidad de productos:", error);
  }
}
