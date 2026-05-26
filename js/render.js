export function renderizarProductos(
    productos,
    contenedor
) {

    contenedor.innerHTML = "";

    if (productos.length === 0) {

        contenedor.innerHTML = `
            <p class="text-center fs-5">
                No se encontraron productos
            </p>
        `;

        return;
    }

    productos.forEach(producto => {

        const div = document.createElement("div");

        div.className =
            "col-6 col-md-4 col-lg-3 mb-4";

        div.innerHTML = `
            <div class="card producto-card h-100 shadow-sm">

                <img
                    src="${producto.imagen}"
                    class="card-img-top"
                    alt="${producto.nombre}"
                >

                <div class="card-body text-center d-flex flex-column">

                    <h5 class="card-title">
                        ${producto.nombre}
                    </h5>

                    <p class="small text-muted">
                        ${producto.descripcion}
                    </p>

                    <p class="fw-bold mb-2">
                        $ ${producto.precio.toLocaleString()}
                    </p>

                    ${producto.oferta
                        ? '<span class="badge bg-danger mb-2">OFERTA</span>'
                        : ''
                    }

                    <button
                        class="btn btn-dark mt-auto btn-agregar"
                        data-id="${producto.id}"
                    >
                        Agregar
                    </button>

                </div>
            </div>
        `;

        contenedor.appendChild(div);
    });
}

export function renderizarCarrito(
    carrito,
    itemsCarrito,
    totalCarrito,
    contadorCarrito
) {

    itemsCarrito.innerHTML = "";

    carrito.forEach(producto => {

        const li = document.createElement("li");

        li.className =
            "list-group-item d-flex justify-content-between align-items-center gap-3";

        li.innerHTML = `
            <div class="d-flex align-items-center gap-3">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    width="60"
                    height="60"
                    style="
                        object-fit: cover;
                        border-radius: 10px;
                    "
                >

                <div>

                    <strong>
                        ${producto.nombre}
                    </strong>

                    <br>

                    Cantidad: ${producto.cantidad}

                    <br>

                    <small>
                        $ ${(producto.precio * producto.cantidad).toLocaleString()}
                    </small>

                </div>

            </div>

            <button
                class="btn btn-sm btn-danger btn-eliminar"
                data-id="${producto.id}"
            >
                X
            </button>
        `;

        itemsCarrito.appendChild(li);
    });

    const total = carrito.reduce((acc, producto) => {

        return acc +
            producto.precio *
            producto.cantidad;

    }, 0);

    totalCarrito.textContent =
        `$ ${total.toLocaleString()}`;

    contadorCarrito.textContent =
        carrito.length;
}