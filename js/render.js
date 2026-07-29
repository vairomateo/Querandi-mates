export function renderizarProductos(productos, contenedor) {
    contenedor.innerHTML = "";

    // Mantenemos tu validación de array vacío
    if (productos.length === 0) {
        contenedor.innerHTML = `<p class="text-center fs-5">No se encontraron productos</p>`;
        return;
    }

    productos.forEach(producto => {
        const div = document.createElement("div");
        // Mantenemos tus clases originales para que no se rompa el responsive en celulares
        div.className = "col-6 col-md-4 col-lg-3 mb-4";

        const sinStock = producto.stock === 0;

        // Lógica de las etiquetas modernas (arriba a la derecha)
        let badgeHtml = '';
        if (sinStock) {
            badgeHtml = `<span class="badge modern-badge grey-badge">SIN STOCK</span>`;
        } else if (producto.oferta) {
            badgeHtml = `<span class="badge modern-badge gold-badge">OFERTA</span>`;
        }

        // Lógica de advertencia de stock
        let stockWarning = '<div class="mb-3"></div>'; // Espaciador para mantener la altura
        if (!sinStock && producto.stock <= 3) {
            stockWarning = `<p class="stock-warning mb-3"><i class="bi bi-exclamation-circle"></i> Últimas ${producto.stock} unidades</p>`;
        }

        // Inyectamos la nueva estructura premium
        div.innerHTML = `
            <div class="card product-card h-100 border-0 ${sinStock ? 'opacity-75' : ''}">
                <div class="card-img-wrapper">
                    ${badgeHtml}
                    <img 
                        src="${producto.imagen}" 
                        class="card-img-top producto-detalle" 
                        alt="${producto.nombre}"
                        data-id="${producto.id}"
                        data-bs-toggle="modal"
                        data-bs-target="#productoModal"
                        style="cursor:zoom-in;"
                    >
                </div>
                
                <div class="card-body dark-body d-flex flex-column text-start">
                    <h5 
                        class="card-title font-heading producto-detalle"
                        data-id="${producto.id}"
                        data-bs-toggle="modal"
                        data-bs-target="#productoModal"
                        style="cursor:pointer"
                    >
                        ${producto.nombre}
                    </h5>
                    <p class="card-text description mb-3">${producto.descripcion}</p>
                    
                    <div class="mt-auto">
                        <p class="price mb-2"><span class="signo-peso">$</span>${producto.precio.toLocaleString('es-AR')}</p>
                        ${stockWarning}
                        
                        <button 
                            class="btn ${sinStock ? 'btn-disabled' : 'btn-outline-gold'} w-100 btn-agregar"
                            data-id="${producto.id}"
                            ${sinStock ? 'disabled' : ''}
                        >
                            ${sinStock ? 'Sin stock' : 'Agregar al carrito'}
                        </button>
                    </div>
                </div>
            </div>
        `;

        contenedor.appendChild(div);
    });
}