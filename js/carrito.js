export function agregarAlCarrito(
    carrito,
    producto
) {

    const existe = carrito.find(
        item => item.id === producto.id
    );

    if (existe) {

        existe.cantidad++;

    } else {

        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    return carrito;
}

export function eliminarProducto(
    carrito,
    id
) {

    return carrito.filter(
        producto => producto.id !== id
    );
}

export function vaciarCarrito() {

    return [];
}