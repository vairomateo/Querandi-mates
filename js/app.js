import { cargarProductos, filtrarProductos } from "./productos.js";
import { renderizarProductos } from "./render.js";
import { agregarProductoAlCarrito } from "./carrito.js";

let productos = [];

async function init() {
    productos = await cargarProductos();
    renderizarProductos(productos, document.getElementById("productosContainer"));
}

init();

// AGREGAR PRODUCTO AL CARRITO
document.addEventListener("click", e => {
    if (!e.target.classList.contains("btn-agregar")) return;
    const id       = Number(e.target.dataset.id);
    const producto = productos.find(p => p.id === id);
    if (!producto) return;
    // Pasa también la imagen para mostrarla en el carrito
    agregarProductoAlCarrito(producto.nombre, producto.precio, producto.id, producto.imagen);
});

// FILTROS
const buscador        = document.getElementById("buscador");
const filtroCategoria = document.getElementById("filtroCategoria");

function aplicarFiltros() {
    const resultado = filtrarProductos(productos, buscador.value, filtroCategoria.value);
    renderizarProductos(resultado, document.getElementById("productosContainer"));
}

buscador?.addEventListener("input", aplicarFiltros);
filtroCategoria?.addEventListener("change", aplicarFiltros);
