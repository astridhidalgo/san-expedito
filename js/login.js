$(".BotonCerrarSesion").click(function () {
  cierreSesion();
});

document.addEventListener("DOMContentLoaded", async function () {
  const ventanaLogin = document.getElementById("ventanaLogin");

  ventanaLogin.addEventListener("submit", async function (event) {
    event.preventDefault();
    const usuario = document.querySelector(".nombreUsuario").value;
    const contrasenya = document.querySelector(".Contrasenya").value;
    const rol = document.querySelector(".TipoCuenta").value;
    // Objeto con los datos a enviar a la API
    const datos = {
      nombre: usuario,
      contrasenya: contrasenya,
      rol: rol,
    };
    login(datos);
  });
});

async function login(datosUsuario) {
  try {
    // Realizar la llamada a la API para insertar la categoría
    const respuesta = await fetch("http://localhost:8585/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosUsuario),
    });

    if (respuesta.ok) {
      window.location.href = "./ventas.html";
    } else {
      console.error("Error al insertar la categoría:", respuesta.statusText);
      alert("Las credenciales introduciadas no son correctas.");
    }
  } catch (error) {
    console.error("Error al insertar la categoría:", error);
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
