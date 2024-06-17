const rolActual = sessionStorage.getItem("rol");
const botonProductos = document.querySelector(".BotonMenu.Productos");
const botonCategorias = document.querySelector(".BotonMenu.Categorias");
const botonProveedores = document.querySelector(".BotonMenu.Proveedores");
const botonUsuarios = document.querySelector(".BotonMenu.Usuarios");
const botonBaseDatos = document.querySelector(".BotonMenu.BaseDatos");

if (rolActual == "admin")
{
	botonProductos.style = "display: block;";
	botonCategorias.style = "display: block;";
	botonProveedores.style = "display: block;";
	botonProveedores.style = "display: block;";
	botonUsuarios.style = "display: block;";
	botonBaseDatos.style = "display: block;";
}
	else
	{
		botonProductos.style = "display: none;";
		botonCategorias.style = "display: none;";
		botonProveedores.style = "display: none;";
		botonUsuarios.style = "display: none;";
		botonBaseDatos.style = "display: none;";
	}
