// Función para abrir el modal y mostrar los detalles de la factura
let factId = 0;

function abrirModalYMostrarDetalles(facturaId) {
  // Realizar la solicitud a la API para obtener los detalles de la factura
  const result = localStorage.getItem("facturaId");
  factId = facturaId;
  console.log(facturaId);
  const url = `http://localhost:8585/facturas/${facturaId}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Actualizar los elementos del modal con los datos recibidos
      $(".TituloFactura").text(`Factura N° ${data.numero_factura}`);
      $(".CedulaFactura").text(`Cédula: ${data.cliente.cedula}`);
      $(".NombreFactura").text(`Nombre: ${data.cliente.nombre}`);
      $(".ApellidoFactura").text(`Apellido: ${data.cliente.apellido}`);

      // Limpiar la tabla de productos antes de agregar nuevos datos
      $(".TablaFactura2 tbody").empty();

      // Agregar los productos a la tabla
      data.factura_producto.forEach((Fproducto) => {
        const fila = `<tr>
						  <td>${Fproducto.producto.codigo}</td>
						  <td>${Fproducto.producto.nombre}</td>
						  <td>${Fproducto.cantidad}</td>
						  <td>${Fproducto.producto.precio}</td>
              <td>${Fproducto.totalPorProducto}</td>
						</tr>`;
        $(".TablaFactura2 tbody").append(fila);
      });

      // Actualizar el precio total
      $(".PrecioTotal").text(`Total: ${data.total}`);

      // Mostrar el modal
      $(".FondoModal").css("display", "block");
      $(".VentanaModal").show();

      $(".BotonCancelar").click(function () {
        // Cerrar el modal
        $(".FondoModal").css("display", "none");
        $(".VentanaModal").hide();

        // Recargar la tabla con la información actualizada
        buscarFacturasPorFecha();
      });
    })
    .catch((error) =>
      console.error("Error al obtener los detalles de la factura:", error)
    );
}

// Agregar un listener de eventos al botón
async function generarPdf() {
  console.log(factId);
  try {
    const res = await fetch(`http://localhost:8585/facturas/${factId}`);
    const datos = await res.json();

    console.log(datos.factura_producto);
    const datosFactura = {
      total: datos.total,
      fecha_creacion: datos.fecha_creacion,
      numero_factura: datos.numero_factura,
      cliente: {
        id: datos.cliente.id,
        nombre: datos.cliente.nombre,
        apellido: datos.cliente.apellido,
        cedula: datos.cliente.cedula,
      },
      productos: datos.factura_producto.map((Fproducto) => ({
        codigo: Fproducto.producto.codigo,
        nombre: Fproducto.producto.nombre,
        cantidad: Fproducto.cantidad,
        precio: Fproducto.producto.precio,
        totalPorProducto: Fproducto.totalPorProducto,
      })),
    };

    // Realizar la llamada a la API para generar el PDF
    const respuesta = await fetch("http://localhost:8585/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosFactura),
    });
    const respuestaJson = await respuesta.json();
    console.log(respuestaJson.url);

    if (respuesta.ok) {
      const fileUrl = "http://localhost/localsites/sgi5/factura.pdf";
      window.open(fileUrl, "_blank");
    } else {
      // Error al generar el PDF
      console.error("Error al generar el PDF:", respuesta.statusText);
      alert("Error al generar el PDF. Por favor, intenta de nuevo más tarde.");
    }
  } catch (error) {
    // Error de red u otro error
    console.error("Error al generar el PDF:", error);
    alert("Error al generar el PDF. Por favor, intenta de nuevo más tarde.");
  }
}
