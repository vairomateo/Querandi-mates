export function renderizarProductos(productos, contenedor) {

    contenedor.innerHTML = "";

    if (productos.length === 0) {
        contenedor.innerHTML = `<p class="text-center fs-5">No se encontraron productos</p>`;
        return;
    }

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.className = "col-6 col-md-4 col-lg-3 mb-4";

        const sinStock = producto.stock === 0;

        div.innerHTML = `
            <div class="card producto-card h-100 shadow-sm ${sinStock ? 'opacity-75' : ''}">
                <div style="position:relative">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="height:200px;object-fit:cover;">
                    ${producto.oferta && !sinStock ? '<span class="badge bg-danger position-absolute top-0 start-0 m-2">OFERTA</span>' : ''}
                    ${sinStock ? '<span class="badge bg-secondary position-absolute top-0 start-0 m-2">Sin stock</span>' : ''}
                </div>
                <div class="card-body text-center d-flex flex-column">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="small text-muted">${producto.descripcion}</p>
                    <p class="fw-bold mb-1">$${producto.precio.toLocaleString('es-AR')}</p>
                    ${!sinStock && producto.stock <= 3
                        ? `<p class="small text-warning mb-2 fw-semibold">⚠️ Últimas ${producto.stock} unidades</p>`
                        : '<div class="mb-2"></div>'
                    }
                    <button
                        class="btn btn-dark mt-auto btn-agregar"
                        data-id="${producto.id}"
                        ${sinStock ? 'disabled' : ''}
                    >
                        ${sinStock ? 'Sin stock' : 'Agregar al carrito'}
                    </button>
                </div>
            </div>
        `;

        contenedor.appendChild(div);
    });
}
