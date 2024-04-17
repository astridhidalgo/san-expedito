//abrir modal
$(".BotonAgregarProducto").click(function () {
  $(".FondoModal").css("display", "block");
  $(".VentanaModal").show();
});

$(".FacturaModal").click(function () {
  $(".FondoModal").css("display", "block");
  $(".VentanaModal").show();
});

//cerrar modal
$(".BotonCancelar").click(function () {
  $(".FondoModal").css("display", "none");
  $(".VentanaModal").hide();
});

document.addEventListener("DOMContentLoaded", async function () {
  const formularioProveedor = document.getElementById("formulario-proveedor");

  formularioProveedor.addEventListener("submit", async function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    const nombreProveedor = document.querySelector(".NombreProveedor").value;

    console.log("PROVEEDOR");

    // Objeto con los datos a enviar a la API
    const datosProveedor = {
      nombre: nombreProveedor,
    };

    try {
      // Realizar la llamada a la API para insertar la categoría
      const respuesta = await fetch("http://localhost:8585/proveedores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosProveedor),
      });

      if (respuesta.ok) {
        console.log("Proveedor insertado correctamente");
        // Puedes hacer algo después de insertar la categoría, como cerrar el modal
        $(".FondoModal").css("display", "none");
        $(".VentanaModal").hide();
        // También puedes recargar la página o actualizar la lista de categorías
        location.reload();
      } else {
        console.error("Error al insertar la categoría:", respuesta.statusText);
      }
    } catch (error) {
      console.error("Error al insertar la categoría:", error);
    }
  });
});
