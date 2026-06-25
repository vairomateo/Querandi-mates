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
    const id = Number(e.target.dataset.id);
    const producto = productos.find(p => p.id === id);
    
    if (!producto) return;
    
    // Pasa también la imagen para mostrarla en el carrito
    agregarProductoAlCarrito(producto.nombre, producto.precio, producto.id, producto.imagen);
});

// MODAL DEL PRODUCTO
document.getElementById("productoModal").addEventListener("show.bs.modal", e => {
    const trigger = e.relatedTarget;
    const id = Number(trigger.dataset.id);
    const producto = productos.find(p => p.id === id);

    document.getElementById("modalProductoNombre").textContent = producto.nombre;
    document.getElementById("modalProductoImg").src = producto.imagen;
    document.getElementById("modalProductoImg").alt = producto.nombre;
    document.getElementById("modalProductoDesc").textContent = producto.descripcion;
    
    // --- CAMBIO PARA EL PRECIO ELEGANTE ---
    const precioModal = document.getElementById("modalProductoPrecio");
    precioModal.classList.add("precio-modal");
    precioModal.innerHTML = `<span class="signo-peso">$</span>${producto.precio.toLocaleString('es-AR')}`;
    
    // Acá actualizamos la etiqueta para que use el diseño premium dorado
    document.getElementById("modalProductoOferta").innerHTML = producto.oferta
        ? '<span class="badge modern-badge gold-badge mb-3">OFERTA</span>' : '';
        
    document.getElementById("modalBtnAgregar").dataset.id = producto.id;
});

// FILTROS
const buscador = document.getElementById("buscador");
const filtroCategoria = document.getElementById("filtroCategoria");

function aplicarFiltros() {
    const resultado = filtrarProductos(productos, buscador.value, filtroCategoria.value);
    renderizarProductos(resultado, document.getElementById("productosContainer"));
}

buscador?.addEventListener("input", aplicarFiltros);
filtroCategoria?.addEventListener("change", aplicarFiltros);