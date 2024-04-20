//abrir modal
let modoOperacion = "crear";
let idproductoModificar = 0;
$(".BotonAgregarProducto").click(function () {
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
  // Llenar los select de proveedores y categorías al cargar la página
  await llenarSelectProveedores();
  await llenarSelectCategorias();

  const formularioProducto = document.getElementById("formulario-producto");
  formularioProducto.addEventListener("submit", async function (event) {
    event.preventDefault();

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
      proveedor_id: Number(ProveedorProducto),
      categoria_id: Number(CategoriaProducto),
    };

    console.log(datosProductos);

    console.log(modoOperacion);
    if (modoOperacion === "crear") {
      // Lógica para crear un nuevo producto
      crearProducto(datosProductos);
    } else if (modoOperacion === "modificar") {
      actualizarProducto(datosProductos, idproductoModificar);
    }
  });
});

async function abrirModalModificarProducto(producto) {
  idproductoModificar = producto.id;
  console.log(idproductoModificar);
  $(".CodigoProducto").val(producto.codigo);
  $(".NombreProducto").val(producto.nombre);
  $(".CantidadProducto").val(producto.cantidad);
  $(".PrecioProducto").val(producto.precio);
  $(".UnidadMedidaProducto").val(producto.unidad_medida);

  // Seleccionar el proveedor y la categoría del producto en los select
  $(".ProveedorProducto").val(producto.proveedorId);
  $(".CategoriaProducto").val(producto.categoriaId);
  // Seleccionar las opciones en los campos select
  $(`.ProveedorProducto option[value='${producto.proveedor.id}']`).prop(
    "selected",
    true
  );
  $(`.CategoriaProducto option[value='${producto.categoria.id}']`).prop(
    "selected",
    true
  );
}

async function crearProducto(datosProductos) {
  console.log(crearProducto);
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
}

// Función para actualizar un producto existente
async function actualizarProducto(datosProductoModificado, id) {
  console.log("ACTUALIZAR");
  console.log(datosProductoModificado);
  console.log(id);

  try {
    // Realizar la llamada a la API para modificar el producto
    const respuesta = await fetch(`http://localhost:8585/productos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosProductoModificado), // Aquí se corrige el nombre de la variable
    });
    if (respuesta.ok) {
      console.log("Producto modificado correctamente");
      // Puedes hacer algo después de modificar el producto, como cerrar el modal
      $(".FondoModal").css("display", "none");
      $(".VentanaModal").hide();
      // También puedes recargar la página o actualizar la lista de productos
    } else {
      console.error("Error al modificar el producto:", respuesta.statusText);
    }
  } catch (error) {
    console.error("Error al modificar el producto:", error);
  }
  location.reload();
}

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
