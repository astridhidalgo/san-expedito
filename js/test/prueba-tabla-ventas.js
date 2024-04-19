let precioTotal = 0;
document.addEventListener("DOMContentLoaded", async function () {
  document
    .getElementById("buscarProducto")
    .addEventListener("keydown", async function (event) {
      if (event.key === "Enter") {
        const searchTerm = event.target.value.trim(); // Eliminar espacios en blanco al inicio y al final del término de búsqueda

        if (searchTerm !== "") {
          // Solo realizar la búsqueda si el término de búsqueda no está vacío
          console.log("Buscando:", searchTerm);

          // Hacer la solicitud a la API
          try {
            const response = await fetch(
              `http://localhost:8585/productos/${searchTerm}`
            );

            if (response.ok) {
              // Convertir la respuesta a JSON
              const data = await response.json();
              const result = [];
              result.push(data);
              console.log(result);
              mostrarResultados(result);
              event.target.value = "";
            } else {
              alert("El codigo de producto no existe");
              console.error(
                "Error al realizar la solicitud a la API:",
                response.statusText
              );
            }
          } catch (error) {
            console.error("Error al realizar la solicitud a la API:", error);
          }
        }
      }
    });

  function mostrarResultados(result) {
    console.log(result);
    const tabla = document.getElementById("tablaResultados");
    const tbody = tabla.querySelector("tbody");

    // Iterar sobre los datos y agregar filas a la tabla
    result.forEach((producto) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
			<td>${producto.cantidad}</td>
			<td><input id="cantidadCompra_${producto.codigo}" class="cantidadCompra" name="CantidadCompra"></td>
			<td>${producto.precio}</td>
			<td class="totalProducto">0</td>
            <td><button class="eliminarBtn">Eliminar</button></td>
			<td style="display:none;" class="productoId">${producto.id}</td>
        `;
      tbody.appendChild(fila);
    });

    // Agregar evento de clic a los botones de eliminar
    const botonesEliminar = document.querySelectorAll(".eliminarBtn");
    botonesEliminar.forEach((boton) => {
      boton.addEventListener("click", function () {
        // Obtener el precio del producto que se eliminará
        const precioProductoEliminar = parseFloat(
          this.closest("tr").querySelector("td:nth-child(4)").textContent.trim()
        );

        // Reducir el precio total al eliminar el producto
        precioTotal -= precioProductoEliminar;

        // Actualizar el contenido del elemento que muestra el precio total
        document.getElementById("precioTotal").textContent =
          precioTotal.toFixed(2);

        // Eliminar la fila de la tabla
        const fila = this.closest("tr");
        fila.remove();
      });
    });

    const camposCantidad = document.querySelectorAll(".cantidadCompra");
    camposCantidad.forEach((campo) => {
      campo.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          // Obtener el valor de la cantidad ingresada
          const cantidad = parseInt(this.value.trim(), 10) || 0;

          // Obtener el precio del producto
          const precio =
            parseFloat(
              this.closest("tr")
                .querySelector("td:nth-child(5)")
                .textContent.trim()
            ) || 0;

          // Calcular el total del producto multiplicando la cantidad por el precio
          const total = cantidad * precio;
          const precioFormateado1 = total.toFixed(2);
          const texto = "Bs. ";
          const mensaje = texto + precioFormateado1;
          this.closest("tr").querySelector(".totalProducto").textContent =
            mensaje;

          precioTotal = precioTotal + total;
          const preciototalFormateado = precioTotal.toFixed(2);
          const texto1 = "Bs. ";
          const mensaje1 = texto1 + preciototalFormateado;
          // Asignar el total general al campo específico
          document.getElementById("precioTotal").textContent = mensaje1;
          campo.disabled = true;
        }
      });
    });
  }

  const fechaActual = new Date();

  // Obtener el año, mes y día de la fecha actual
  const año = fechaActual.getFullYear();
  // El mes se obtiene sumando 1 al valor devuelto por getMonth(), ya que los meses se indexan desde 0
  const mes = fechaActual.getMonth() + 1;
  const dia = fechaActual.getDate();

  // Formatear la fecha en el formato deseado (por ejemplo, "YYYY-MM-DD")
  const fechaFormateada = `${año}-${mes < 10 ? "0" + mes : mes}-${
    dia < 10 ? "0" + dia : dia
  }`;

  // Actualizar el contenido del elemento HTML con la fecha formateada
  const fechaFacturaElemento = document.querySelector(".FechaFactura");
  fechaFacturaElemento.textContent = `Fecha: ${fechaFormateada}`;

  async function obtenerUltimoCorrelativo() {
    try {
      // Realizar la solicitud GET a tu API para obtener el último correlativo
      const response = await fetch(
        "http://localhost:8585/facturas/ultimaFactura",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json", // Ajusta los encabezados según sea necesario
          },
        }
      );

      if (response.ok) {
        // Si la solicitud es exitosa, obtener el cuerpo de la respuesta
        const data = await response.json();
        return data.numero_factura; // Suponiendo que la respuesta de tu API incluye el último correlativo
      } else {
        // Si la solicitud no es exitosa, mostrar un mensaje de error
        console.error(
          "Error al obtener el último correlativo:",
          response.statusText
        );
        return null;
      }
    } catch (error) {
      // Si ocurre un error durante la solicitud, mostrar un mensaje de error
      console.error("Error al realizar la solicitud:", error);
      return null;
    }
  }

  // Ejemplo de cómo usar la función obtenerUltimoCorrelativo()
  obtenerUltimoCorrelativo().then((ultimoCorrelativo) => {
    if (ultimoCorrelativo !== null) {
      const nuevoCorrelativo = Number(ultimoCorrelativo) + 1;
      const numFactura = document.querySelector(".NumeroFactura");
      const correlativoConCeros = String(nuevoCorrelativo).padStart(10, "0"); // Ajusta la longitud total según sea necesario
      numFactura.textContent = `N° Factura: ${correlativoConCeros}`;
    } else {
      console.log("No se pudo obtener el último correlativo.");
    }
  });

  document
    .querySelector(".BotonAceptar")
    .addEventListener("click", async function () {
      // 1. Recopilar los datos del cliente
      const cedulaCliente = document.querySelector(".CedulaCliente").value;
      const nombreCliente = document.querySelector(".NombreCliente").value;
      const apellidoCliente = document.querySelector(".ApellidoCliente").value;

      // 2. Obtener el número de factura
      const numeroFactura = document
        .querySelector(".NumeroFactura")
        .textContent.split(": ")[1];

      // 3. Obtener la fecha actual
      const fechaFactura = fechaFormateada; // Ya la tienes formateada en el script
      const total = document.getElementById("precioTotal").textContent;
      const totalFormat = total.replace("Bs. ", "");

      // 4. Recopilar los datos de los productos de la tabla
      const productos = [];
      document.querySelectorAll("#tablaResultados tbody tr").forEach((row) => {
        const codigo = row.querySelector("td:nth-child(1)").textContent;
        const nombre = row.querySelector("td:nth-child(2)").textContent;
        const cantidad = row.querySelector(".cantidadCompra").value;
        const precio = row.querySelector("td:nth-child(5)").textContent;

        const id = row.querySelector(".productoId").textContent;
        productos.push({ codigo, nombre, cantidad, precio, id });
      });

      // 5. Organizar los datos
      const datosVenta = {
        cliente: {
          cedula: cedulaCliente,
          nombre: nombreCliente,
          apellido: apellidoCliente,
        },
        numero_factura: numeroFactura,
        fecha: fechaFactura,
        total: totalFormat,
        productos: productos,
      };

      console.log(datosVenta);

      // 6. Enviar los datos a través de la API
      try {
        const response = await fetch("http://localhost:8585/facturas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosVenta),
        });

        if (response.ok) {
          alert("Datos guardados correctamente");
          location.reload();
        } else {
          alert("Error al guardar los datos");
        }
      } catch (error) {
        console.error("Error al enviar los datos a la API:", error);
        alert("Error al enviar los datos a la API");
      }
    });
});
