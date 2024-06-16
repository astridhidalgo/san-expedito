$(".BotonCerrarSesion").click(function () {
  sessionStorage.clear();
  cierreSesion();
});

document.addEventListener("DOMContentLoaded", async function () {
  const recuperacionContrasenya = document.getElementById(
    "recuperacionContrasenya"
  );

  recuperacionContrasenya.addEventListener("submit", async function (event) {
    event.preventDefault();
    const nombreUsuario = document.querySelector(".nombreUsuario").value;
    // Objeto con los datos a enviar a la API
    const datos = {
      nombreUsuario: nombreUsuario,
    };
    registroUsuario(datos);
  });
});

async function registroUsuario(datosUsuario) {
  try {
    // Realizar la llamada a la API para insertar el usuario
    const respuesta = await fetch(
      "http://localhost:8585/usuarios/recuperacion",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosUsuario),
      }
    );

    console.log(respuesta);
    if (respuesta.ok) {
      alert(
        "Se ha enviado un correo electrónico al correo registrado en su cuenta con la nueva contraseña"
      );
      window.location.href = "./index.html";
    } else {
      const errorData = await respuesta.json();
      alert("Error: " + errorData.message);
      console.error("Error al insertar el usuario:", respuesta.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Ocurrió un error inesperado. Por favor, inténtalo nuevamente.");
  }
}
