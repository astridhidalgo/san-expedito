let rolActual = sessionStorage.getItem("rol");
let botonProductos = document.querySelector(".BotonMenu.Productos");
let botonCategorias = document.querySelector(".BotonMenu.Categorias");
let botonProveedores = document.querySelector(".BotonMenu.Proveedores");
let botonUsuarios = document.querySelector(".BotonMenu.Usuarios");

if (rolActual == "admin")
{
	botonProductos.style = "display: block;";
	botonCategorias.style = "display: block;";
	botonProveedores.style = "display: block;";
	botonProveedores.style = "display: block;";
	botonUsuarios.style = "display: block;";
}
	else
	{
		botonProductos.style = "display: none;";
		botonCategorias.style = "display: none;";
		botonProveedores.style = "display: none;";
		botonUsuarios.style = "display: none;";
	}
