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

document.getElementById("productoModal").addEventListener("show.bs.modal", e => {
    // El trigger es el elemento que disparó el modal
    const trigger = e.relatedTarget;
    const id = Number(trigger.dataset.id);
    const producto = productos.find(p => p.id === id);

    document.getElementById("modalProductoNombre").textContent = producto.nombre;
    document.getElementById("modalProductoImg").src = producto.imagen;
    document.getElementById("modalProductoImg").alt = producto.nombre;
    document.getElementById("modalProductoDesc").textContent = producto.descripcion;
    document.getElementById("modalProductoPrecio").textContent = `$ ${producto.precio.toLocaleString()}`;
    document.getElementById("modalProductoOferta").innerHTML = producto.oferta
        ? '<span class="badge bg-danger mb-2">OFERTA</span>' : '';
    document.getElementById("modalBtnAgregar").dataset.id = producto.id;
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
