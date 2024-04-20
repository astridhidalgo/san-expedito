// Función para abrir el modal y mostrar los detalles de la factura
function abrirModalYMostrarDetalles(facturaId) {
  // Realizar la solicitud a la API para obtener los detalles de la factura
  const result = localStorage.getItem("facturaId");
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
      data.Factura_Producto.forEach((Fproducto) => {
        const fila = `<tr>
						  <td>${Fproducto.producto.codigo}</td>
						  <td>${Fproducto.producto.nombre}</td>
						  <td>${Fproducto.cantidad}</td>
						  <td>${Fproducto.producto.precio}</td>
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
