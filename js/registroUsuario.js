$(".BotonCerrarSesion").click(function () {
  sessionStorage.clear();
  cierreSesion();
});

document.addEventListener("DOMContentLoaded", async function () {
  const ventanaRegistro = document.getElementById("ventanaRegistro");

  ventanaRegistro.addEventListener("submit", async function (event) {
    event.preventDefault();
    const nombre = document.querySelector(".nombre").value;
    const apellido = document.querySelector(".apellido").value;
    const nombreUsuario = document.querySelector(".nombreUsuario").value;
    const email = document.querySelector(".email").value;
    const contrasenya = document.querySelector(".Contrasenya").value;
    const rol = document.querySelector(".TipoCuenta").value;
    // Objeto con los datos a enviar a la API
    const datos = {
      nombre: nombre,
      apellido: apellido,
      nombreUsuario: nombreUsuario,
      email: email,
      contrasenya: contrasenya,
      rol: rol,
    };
    registroUsuario(datos);
  });
});

async function registroUsuario(datosUsuario) {
  try {
    // Realizar la llamada a la API para insertar el usuario
    const respuesta = await fetch("http://localhost:8585/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosUsuario),
    });

    if (respuesta.ok) {
      alert("Usuario creado exitosamente.");
      window.location.href = "./index.html";
    } else {
      const errorData = await respuesta.json();
      if (
        respuesta.status === 400 &&
        errorData.message === "Usuario ya existe"
      ) {
        alert("El usuario ya existe. Por favor, elige otro nombre de usuario.");
      } else {
        alert("Error al crear Usuario: " + errorData.message);
      }
      console.error("Error al insertar el usuario:", respuesta.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Ocurrió un error inesperado. Por favor, inténtalo nuevamente.");
  }
}
