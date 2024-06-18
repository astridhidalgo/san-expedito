async function obtenerDatosYMostrarTabla() {
  try {
    const respuesta = await fetch("http://localhost:8585/usuarios");
    const datos = await respuesta.json();

    // Obtener la tabla
    const tabla = document.getElementById("tabla-usuarios");
    const tbody = tabla.querySelector("tbody");

    // Limpiar la tabla antes de agregar nuevos datos
    tbody.innerHTML = "";

    // Iterar sobre los datos obtenidos y agregar filas a la tabla
    datos.forEach((usuario) => {
      const fila = document.createElement("tr");

      // Agregar las celdas para el ID y el nombre de la categoría
      const usuarioId = document.createElement("td");
      usuarioId.textContent = usuario.id;
      fila.appendChild(usuarioId);

      const nombre = document.createElement("td");
      nombre.textContent = usuario.nombre;
      fila.appendChild(nombre);

      const apellido = document.createElement("td");
      apellido.textContent = usuario.apellido;
      fila.appendChild(apellido);

      const nombreUsuario = document.createElement("td");
      nombreUsuario.textContent = usuario.usuario;
      fila.appendChild(nombreUsuario);

      const correo = document.createElement("td");
      correo.textContent = usuario.correo;
      fila.appendChild(correo);

      const rol = document.createElement("td");
      rol.textContent = usuario.rol;
      fila.appendChild(rol);

      // Agregar la celda para el botón de eliminar
      const eliminarCelda = document.createElement("td");
      const botonEliminar = document.createElement("button");
      botonEliminar.textContent = "Eliminar";
      botonEliminar.dataset.id = usuario.id;
      botonEliminar.addEventListener("click", function () {
        eliminarUsuario(usuario.id);
      });
      eliminarCelda.appendChild(botonEliminar);
      fila.appendChild(eliminarCelda);

      tbody.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al obtener datos de la API:", error);
  }
}

// Función para eliminar un usuario
async function eliminarUsuario(id) {
  try {
    const respuesta = await fetch(`http://localhost:8585/usuarios/${id}`, {
      method: "DELETE",
    });

    if (respuesta.ok) {
      alert("Usuario eliminado exitosamente");
      obtenerDatosYMostrarTabla(); // Recargar la tabla de usuarios
    } else {
      console.error("Error al eliminar usuario:", respuesta.statusText);
    }
  } catch (error) {
    console.error("Error al intentar eliminar el usuario:", error);
  }
}

// Llamar a la función para mostrar los datos en la tabla cuando se cargue la página
window.onload = obtenerDatosYMostrarTabla;
