$(".BotonCerrarSesion").click(function () {
  sessionStorage.clear();
  cierreSesion();
});

document.addEventListener("DOMContentLoaded", async function () {
  const ventanaLogin = document.getElementById("ventanaLogin");

  ventanaLogin.addEventListener("submit", async function (event) {
    event.preventDefault();
    const nombreusuario = document.querySelector(".nombreUsuario").value;
    const contrasenya = document.querySelector(".Contrasenya").value;
    const rol = document.querySelector(".TipoCuenta").value;
    console.log(rol);
    // Objeto con los datos a enviar a la API
    const datos = {
      nombreUsuario: nombreusuario,
      contrasenya: contrasenya,
      rol: rol,
    };
    login(datos);
  });
});

async function login(datosUsuario) {
  try {
    const url = "http://localhost:8585/usuarios/login";

    // Realizar la solicitud POST a la API de login
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosUsuario),
    });

    // Verificar si la respuesta fue exitosa
    if (response.ok) {
      // Obtener los datos de la respuesta (generalmente el rol del usuario)
      const datosRespuesta = await response.json();
      // Guardar el rol en sessionStorage para mantener la sesión
      sessionStorage.setItem("rol", datosUsuario.rol);
      // Redirigir al usuario a la página de ventas
      window.location.href = "./ventas.html";
    } else {
      // Si hay un error en la respuesta, obtener los detalles del error
      const errorData = await response.json();
      if (errorData && errorData.message) {
        // Mostrar mensaje de error específico si está disponible
        alert(errorData.message);
      } else {
        // Mostrar un mensaje genérico si no se puede obtener un mensaje específico
        alert("Error al iniciar sesión. Por favor, inténtelo de nuevo.");
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
