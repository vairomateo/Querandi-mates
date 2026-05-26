import {
    cargarProductos,
    filtrarProductos
} from "./productos.js";

import {
    agregarAlCarrito,
    eliminarProducto,
    vaciarCarrito
} from "./carrito.js";

import {
    renderizarProductos,
    renderizarCarrito
} from "./render.js";

import {
    guardarCarrito,
    obtenerCarrito
} from "./storage.js";

let productos = [];

let carrito = obtenerCarrito();

const contenedorProductos =
    document.getElementById("productosContainer");

const itemsCarrito =
    document.getElementById("itemsCarrito");

const totalCarrito =
    document.getElementById("totalCarrito");

const contadorCarrito =
    document.getElementById("contadorCarrito");

const buscador =
    document.getElementById("buscador");

const filtroCategoria =
    document.getElementById("filtroCategoria");

const vaciarBtn =
    document.getElementById("vaciarCarrito");

const finalizarCompraBtn =
    document.getElementById("finalizarCompra");

// =======================
// INIT
// =======================

async function init() {

    productos = await cargarProductos();

    renderizarProductos(
        productos,
        contenedorProductos
    );

    actualizarCarrito();
}

init();

// =======================
// ACTUALIZAR CARRITO
// =======================

function actualizarCarrito() {

    guardarCarrito(carrito);

    renderizarCarrito(
        carrito,
        itemsCarrito,
        totalCarrito,
        contadorCarrito
    );
}

// =======================
// EVENTOS GLOBALES
// =======================

document.addEventListener("click", e => {

    // AGREGAR PRODUCTO

    if (
        e.target.classList.contains("btn-agregar")
    ) {

        const id =
            Number(e.target.dataset.id);

        const producto =
            productos.find(
                producto => producto.id === id
            );

        carrito = agregarAlCarrito(
            carrito,
            producto
        );

        actualizarCarrito();

        Swal.fire({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            icon: "success",
            title: "Producto agregado"
        });
    }

    // ELIMINAR PRODUCTO

    if (
        e.target.classList.contains("btn-eliminar")
    ) {

        const id =
            Number(e.target.dataset.id);

        carrito = eliminarProducto(
            carrito,
            id
        );

        actualizarCarrito();

        Swal.fire({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            icon: "info",
            title: "Producto eliminado"
        });
    }
});

// =======================
// FILTROS
// =======================

function aplicarFiltros() {

    const resultado = filtrarProductos(
        productos,
        buscador.value,
        filtroCategoria.value
    );

    renderizarProductos(
        resultado,
        contenedorProductos
    );
}

if (buscador) {

    buscador.addEventListener(
        "input",
        aplicarFiltros
    );
}

if (filtroCategoria) {

    filtroCategoria.addEventListener(
        "change",
        aplicarFiltros
    );
}

// =======================
// VACIAR CARRITO
// =======================

if (vaciarBtn) {

    vaciarBtn.addEventListener(
        "click",
        () => {

            carrito = vaciarCarrito();

            actualizarCarrito();

            Swal.fire({
                icon: "info",
                title: "Carrito vaciado",
                timer: 1500,
                showConfirmButton: false
            });
        }
    );
}

// =======================
// FINALIZAR COMPRA
// =======================

if (finalizarCompraBtn) {

    finalizarCompraBtn.addEventListener(
        "click",
        () => {

            if (carrito.length === 0) {

                Swal.fire({
                    icon: "warning",
                    title: "El carrito está vacío"
                });

                return;
            }

            Swal.fire({
                icon: "success",
                title: "Compra realizada",
                text: "Gracias por comprar en Querandí Mates"
            });

            carrito = [];

            actualizarCarrito();
        }
    );
}