$(document).ready(function () {
  $(".BarraBusqueda").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#tabla-productos tbody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

$(document).ready(function () {
  $(".BarraBusqueda").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#tabla-facturas tbody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});
