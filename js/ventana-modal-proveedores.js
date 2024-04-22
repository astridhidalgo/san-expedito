let modoOperacion = "crear";
let idproveedorModificar = 0;

//abrir modal
$(".BotonAgregarProducto, .BotonModificarProducto").click(function () {
  modoOperacion = "crear";
  $(".FondoModal").css("display", "block");
  $(".VentanaModal").show();
});
$(".BotonModificarProducto").click(function () {
  modoOperacion = "modificar";
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
    console.log(modoOperacion);
    if (modoOperacion === "crear") {
      // Lógica para crear un nuevo producto
      crearProveedor(datosProveedor);
    } else if (modoOperacion === "modificar") {
      actualizarProveedor(datosProveedor, idproveedorModificar);
    }
  });
});

//Función que crea proveedores
async function crearProveedor(datosProveedor) {
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
      $(".FondoModal").css("display", "none");
      $(".VentanaModal").hide();
      location.reload();
    } else {
      console.error("Error al insertar la categoría:", respuesta.statusText);
    }
  } catch (error) {
    console.error("Error al insertar la categoría:", error);
  }
  location.reload();
}

//Función que actualiza proveedores
async function actualizarProveedor(datosProveedorModificado, id) {
  console.log("ACTUALIZAR");

  try {
    // Realizar la llamada a la API para modificar el producto
    const respuesta = await fetch(`http://localhost:8585/proveedores/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosProveedorModificado), // Aquí se corrige el nombre de la variable
    });
    if (respuesta.ok) {
      console.log("Proveedor modificado correctamente");
      $(".FondoModal").css("display", "none");
      $(".VentanaModal").hide();
    } else {
      console.error("Error al modificar el proveedor:", respuesta.statusText);
    }
  } catch (error) {
    console.error("Error al modificar el proveedor:", error);
  }
  location.reload();
}

async function abrirModalModificarProveedor(proveedor) {
  idproveedorModificar = proveedor.id;
  $(".IdValorCategoria").val(idproveedorModificar);
  $(".NombreProveedor").val(proveedor.nombre);
}
