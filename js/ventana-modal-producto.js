//abrir modal
$(".BotonAgregarProducto").click(function () {
  $(".FondoModal").css("display", "block");
  $(".VentanaModal").show();
});

$(".BotonModificarProducto").click(function () {
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
  // Llenar los select de proveedores y categorías al cargar la página
  await llenarSelectProveedores();
  await llenarSelectCategorias();

  const formularioProducto = document.getElementById("formulario-producto");
  formularioProducto.addEventListener("submit", async function (event) {
    event.preventDefault();

    console.log("PRODUCTO");
    const CodigoProducto = document.querySelector(".CodigoProducto").value;
    const NombreProducto = document.querySelector(".NombreProducto").value;
    const CantidadProducto = document.querySelector(".CantidadProducto").value;
    const PrecioProducto = document.querySelector(".PrecioProducto").value;
    const UnidadMedidaProducto = document.querySelector(
      ".UnidadMedidaProducto"
    ).value;
    const ProveedorProducto =
      document.querySelector(".ProveedorProducto").value;
    const CategoriaProducto =
      document.querySelector(".CategoriaProducto").value;

    // Objeto con los datos a enviar a la API
    const datosProductos = {
      codigo: CodigoProducto,
      nombre: NombreProducto,
      cantidad: Number(CantidadProducto),
      unidad_medida: UnidadMedidaProducto,
      precio: Number(PrecioProducto),
      proveedorId: Number(ProveedorProducto),
      categoriaId: Number(CategoriaProducto),
    };

    console.log(datosProductos);

    try {
      // Realizar la llamada a la API para insertar la categoría
      const respuesta = await fetch("http://localhost:8585/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosProductos),
      });

      if (respuesta.ok) {
        console.log("producto insertado correctamente");
        // Puedes hacer algo después de insertar la categoría, como cerrar el modal
        $(".FondoModal").css("display", "none");
        $(".VentanaModal").hide();
        // También puedes recargar la página o actualizar la lista de categorías
      } else {
        console.error("Error al insertar la categoría:", respuesta.statusText);
      }
    } catch (error) {
      console.error("Error al insertar la categoría:", error);
    }
    location.reload();
  });

  // Obtener el ID del producto a modificar, por ejemplo:
  const idProducto = obtenerIdProductoAModificar(); // Debes implementar esta función

  // Resto del código similar al de inserción, pero ahora enviando una solicitud PUT o PATCH
  // en lugar de POST, y utilizando el ID obtenido para identificar el producto a modificar.

  // Objeto con los datos a enviar a la API
  const datosProductos = {
    // Campos del producto a modificar...
  };

  try {
    const respuesta = await fetch(
      `http://localhost:8585/productos/${idProducto}`,
      {
        method: "PUT", // O PATCH según corresponda
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosProductos),
      }
    );

    // Resto del código similar a la inserción...
  } catch (error) {
    console.error("Error al modificar el producto:", error);
  }
  location.reload();
});

// Función para llenar el select de proveedores
async function llenarSelectProveedores() {
  try {
    const respuesta = await fetch("http://localhost:8585/proveedores");
    const datos = await respuesta.json();
    const selectProveedores = document.getElementById("select-proveedores");
    selectProveedores.innerHTML = "";
    datos.forEach((proveedor) => {
      const opcion = document.createElement("option");
      opcion.text = proveedor.nombre;
      opcion.value = proveedor.id;
      selectProveedores.appendChild(opcion);
    });
  } catch (error) {
    console.error("Error al obtener los proveedores:", error);
  }
}

// Función para llenar el select de categorías
async function llenarSelectCategorias() {
  try {
    const respuesta = await fetch("http://localhost:8585/categorias");
    const datos = await respuesta.json();
    const selectCategorias = document.getElementById("select-categorias");
    selectCategorias.innerHTML = ""; // Limpiar el select
    datos.forEach((categoria) => {
      const opcion = document.createElement("option");
      opcion.text = categoria.nombre;
      opcion.value = categoria.id;
      selectCategorias.appendChild(opcion);
    });
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
  }
}
