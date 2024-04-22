let modoOperacion = "crear";
let idcategoriaModificar = 0;
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

$(".BotonImprimir").click(function () {
  generarPdf();
});

$(document).on("click", ".FacturaModal", function () {
  $(".FondoModal").css("display", "block");
  $(".VentanaModal").show();
});

//cerrar modal
$(".BotonCancelar").click(function () {
  $(".FondoModal").css("display", "none");
  $(".VentanaModal").hide();
});

document.addEventListener("DOMContentLoaded", async function () {
  const formularioCategoria = document.getElementById("formulario-categoria");

  formularioCategoria.addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log(modoOperacion);
    const nombreCategoria = document.querySelector(".NombreCategoria").value;

    // Objeto con los datos a enviar a la API
    const datosCategoria = {
      nombre: nombreCategoria,
    };

    if (modoOperacion === "crear") {
      // Lógica para crear un nuevo producto
      crearCategoria(datosCategoria);
    } else if (modoOperacion === "modificar") {
      actualizarCategoria(datosCategoria, idcategoriaModificar);
    }
  });
});

async function crearCategoria(datosCategoria) {
  try {
    // Realizar la llamada a la API para insertar la categoría
    const respuesta = await fetch("http://localhost:8585/categorias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosCategoria),
    });

    if (respuesta.ok) {
      console.log("Categoría insertada correctamente");
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
}

async function actualizarCategoria(datosCategoriaModificada, id) {
  console.log(JSON.stringify(datosCategoriaModificada));
  console.log(id);
  const respuesta = await fetch(`http://localhost:8585/categorias/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosCategoriaModificada),
  });
  if (respuesta.ok) {
    console.log("categoria modificado correctamente");
    $(".FondoModal").css("display", "none");
    $(".VentanaModal").hide();
  } else {
    console.error("Error al modificar la categoria:", respuesta.statusText);
  }
  location.reload();
}

async function abrirModalModificarcategorias(categoria) {
  idcategoriaModificar = categoria.id;
  $(".IdValorCategoria").val(categoria.id);
  $(".NombreCategoria").val(categoria.nombre);
}
