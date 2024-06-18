$(".BotonExportar").click(function () {
  exportardb();
});

async function exportardb() {
  try {
    const url = "http://localhost:8585/database/backup";

    // Realizar la solicitud POST a la API de backup
    const response = await fetch(url, {
      method: "POST",
    });

    // Verificar si la respuesta fue exitosa
    if (response.ok) {
      alert("Base de datos exportada exitosamente");
    } else {
      // Si hay un error en la respuesta, obtener los detalles del error
      const errorData = await response.json();
      if (errorData && errorData.message) {
        // Mostrar mensaje de error específico si está disponible
        alert(errorData.message);
      } else {
        // Mostrar un mensaje de error genérico si no hay mensaje específico
        alert("Error al exportar la base de datos");
      }
    }
  } catch (error) {
    // Capturar errores de red u otros errores durante la solicitud
    console.error("Error en la solicitud de exportación:", error);
    alert(
      "Error al intentar exportar la base de datos. Por favor, inténtelo de nuevo más tarde."
    );
  }
}
