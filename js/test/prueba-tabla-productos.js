async function obtenerCantidadProductos() {
  try {
    // Realizar la solicitud a la API para obtener los datos del inventario
    const respuesta = await fetch("http://localhost:8585/productos/contador");
    const datos = await respuesta.json();
    console.log(datos);

    // Extraer la cantidad de productos de los datos recibidos
    const cantidadProductos = datos;

    // Escribir la cantidad de productos en la página
    const contadorProductos = document.querySelector(".ContadorProductos span");
    contadorProductos.textContent = cantidadProductos;
    console.log(contadorProductos);
  } catch (error) {
    console.error("Error al obtener la cantidad de productos:", error);
  }
}

async function obtenerDatosYMostrarTabla() {
  try {
    const respuesta = await fetch("http://localhost:8585/productos");
    const datos = await respuesta.json();

    // Obtener la tabla
    const tabla = document.getElementById("tabla-productos");
    const tbody = tabla.querySelector("tbody");

    // Limpiar la tabla antes de agregar nuevos datos
    tbody.innerHTML = "";

    // Iterar sobre los datos obtenidos y agregar filas a la tabla
    datos.forEach((producto) => {
      const fila = document.createElement("tr");

      console.log(producto.id);
      // Agregar una casilla de verificación para la selección
      const seleccion = document.createElement("td");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "producto-seleccionado"; // Asegúrate de que todos los radio buttons tengan el mismo nombre
      radio.value = producto.id; // Puedes asignar el código del producto como el valor del radio button
      seleccion.appendChild(radio);
      fila.appendChild(seleccion);

      fila.innerHTML += `
				<td>${producto.codigo}</td>
				<td>${producto.nombre}</td>
				<td>${producto.proveedor.nombre}</td>
				<td>${producto.categoria.nombre}</td>
				<td>${producto.cantidad}</td>
				<td>${producto.unidad_medida}</td>
				<td>${producto.precio}</td>
			`;
      tbody.appendChild(fila);
    });
    obtenerCantidadProductos();
  } catch (error) {
    console.error("Error al obtener datos de la API:", error);
  }
}

// Función para eliminar las categorías seleccionadas
function eliminarProductosSeleccionados() {
  const tabla = document.getElementById("tabla-productos");
  const radioButtons = tabla.querySelectorAll("input[type='radio']:checked");

  if (radioButtons.length === 0) {
    alert("Por favor, seleccione un producto para eliminar.");
    return;
  }

  // Obtener el valor del ID de la categoría seleccionada
  const productoAEliminar = radioButtons[0].value;

  console.log(productoAEliminar);

  // Mostrar el ID de la categoría seleccionada en la consola
  console.log("Producto seleccionado para eliminar:", productoAEliminar);

  // Enviar el ID de la categoría seleccionada al servidor para eliminarla
  fetch(`http://localhost:8585/productos/${productoAEliminar}`, {
    method: "DELETE", // Método DELETE para eliminar recursos
  }).then((response) => {
    console.log(response);
    if (response.ok) {
      console.log("Producto eliminado exitosamente");
      obtenerDatosYMostrarTabla();
      return response.json(); // Convertir la respuesta a JSON si es exitosa
    } else {
      alert("No se puede eliminar el Producto, está vinculado a registros");
      throw new Error(
        "No se puede eliminar el Producto, está vinculada a registros"
      );
    }
  });
}

// Llamar a la función para mostrar los datos en la tabla cuando se cargue la página
window.onload = obtenerDatosYMostrarTabla;

document.addEventListener("DOMContentLoaded", function () {
  // Asocia la función eliminarCategoriasSeleccionadas al evento click del botón
  const botonEliminarProductos = document.getElementById(
    "botonEliminarProductos"
  );
  botonEliminarProductos.addEventListener("click", function () {
    eliminarProductosSeleccionados();
  });
});
