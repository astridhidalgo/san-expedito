//abrir modal
$(".BotonAgregarProducto").click(
	function(){
		$(".FondoModal").css("display", "block");
		$(".VentanaModal").show();
	}
);

$(".FacturaModal").click(
	function(){
		$(".FondoModal").css("display", "block");
		$(".VentanaModal").show();
	}
);

//cerrar modal
$(".BotonCancelar").click(
	function(){
		$(".FondoModal").css("display", "none");
		$(".ModalAgregarProductos").hide();
	}
);
