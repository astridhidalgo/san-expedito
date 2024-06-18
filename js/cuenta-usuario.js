$(".BotonCerrarSesion").click(function () {
  sessionStorage.clear();
  cierreSesion();
});
document.addEventListener("DOMContentLoaded", async function () {
  const opcionesUsuario = document.getElementById("OpcionesUsuario");

  opcionesUsuario.addEventListener("submit", async function (event) {
    event.preventDefault();
    const contrasenyaActual = document.querySelector(
      ".ContrasenyaUsuarioActual"
    ).value;
    const contrasenyaNueva = document.querySelector(
      ".ContrasenyaUsuarioNueva"
    ).value;
    // Objeto con los datos a enviar a la API
    const datos = {
      contrasenyaActual: contrasenyaActual,
      contrasenyaNueva: contrasenyaNueva,
    };
    login(datos);
  });
});

async function login(datosUsuario) {
  const id = sessionStorage.getItem("idUsuario");

  try {
    const url = `http://localhost:8585/usuarios/${id}`;

    // Realizar la solicitud PATCH a la API de login
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosUsuario),
    });

    // Verificar si la respuesta fue exitosa
    if (response.ok) {
      alert("usuario actualizado exitosamente");
      limpiarFormulario();
    } else {
      const errorData = await response.json();
      if (errorData && errorData.message) {
        // Mostrar mensaje de error específico si está disponible
        alert(errorData.message);
      }
    }
  } catch (error) {
    // Capturar errores de red u otros errores durante la solicitud
    console.error("Error en la solicitud de login:", error);
    alert(
      "Error al intentar iniciar sesión. Por favor, inténtelo de nuevo más tarde."
    );
  }
}

function limpiarFormulario() {
  // Limpiar campos de contraseña
  document.querySelector(".ContrasenyaUsuarioActual").value = "";
  document.querySelector(".ContrasenyaUsuarioNueva").value = "";
}

async function cierreSesion() {
  try {
    const confirmacion = await mostrarConfirmacion(
      "¿Estás seguro que deseas cerrar sesión?"
    );

    if (confirmacion) {
      // Si el usuario confirma, redireccionar a la página de ventas
      window.location.href = "./index.html";
    } else {
      // Si el usuario cancela, no hacer nada o mostrar un mensaje de cancelación
      console.log("El usuario canceló el cierre de sesión.");
    }
  } catch (error) {
    console.error("Error al insertar la categoría:", error);
  }
}

async function mostrarConfirmacion(mensaje) {
  return new Promise((resolve) => {
    const confirmacion = confirm(mensaje);
    resolve(confirmacion);
  });
}
