export function guardarCarrito(carrito) {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );
}

export function obtenerCarrito() {

    return JSON.parse(
        localStorage.getItem("carrito")
    ) || [];
}