function llevaracarrito(){
  window.location.href = "../html/carrito.html"
}

document.addEventListener('DOMContentLoaded', function () {
  // Manejar botón de favoritos
  const botonFavorito = document.querySelector('.icono-fav-agregar');
  const contadorFav = document.getElementById('contador-fav');

  if (botonFavorito) {
    botonFavorito.addEventListener('click', function (e) {
      e.preventDefault();

      const img = document.getElementById('imagen-detalles')?.src || '';
      const nombre = document.querySelector('.titulo-prenda')?.textContent || 'Producto';
      const precio = document.querySelector('.precio')?.textContent || '$0';
      // Extraer la talla del texto de descripción
      const textoDescripcion = document.querySelector('.texto')?.textContent || '';
      let talla = 'Talla: -';
      
      if (textoDescripcion) {
        const tallaMatch = textoDescripcion.match(/Talla:\s*([^.]+)/);
        if (tallaMatch && tallaMatch[1]) {
          talla = 'Talla: ' + tallaMatch[1].trim();
        }
      }

      const nuevoFavorito = {
        img: img,
        nombre: nombre,
        precio: precio,
        talla: talla
      };

      let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

      // Validar si ya está en favoritos para evitar duplicados
      const yaExiste = favoritos.some(item => item.nombre === nuevoFavorito.nombre && item.talla === nuevoFavorito.talla);
      if (!yaExiste) {
        favoritos.push(nuevoFavorito);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
      }

      // Actualizar contador del corazón en el header
      contadorFav.textContent = favoritos.length;

      // Opcional: mensaje de confirmación
      const mensaje = document.createElement('div');
      mensaje.textContent = `${nombre} se añadió a favoritos`;
      mensaje.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #53214F;
        color: white;
        padding: 10px 20px;
        border-radius: 10px;
        z-index: 9999;
        font-family: Poppins, serif;
      `;
      document.body.appendChild(mensaje);
      setTimeout(() => mensaje.remove(), 2000);
    });
  }

  // NUEVO: Manejar botón de carrito en la página de detalles
  const botonCarrito = document.querySelector('.boton-carrito');
  const contadorCarrito = document.getElementById('contador-carrito');

  if (botonCarrito) {
    botonCarrito.addEventListener('click', function (e) {
      e.preventDefault();

      const img = document.getElementById('imagen-detalles')?.src || '';
      const nombre = document.querySelector('.titulo-prenda')?.textContent || 'Producto';
      const precio = document.querySelector('.precio')?.textContent || '$0';
      // Extraer la talla del texto de descripción
      const textoDescripcion = document.querySelector('.texto')?.textContent || '';
      let talla = 'Talla: -';
      
      if (textoDescripcion) {
        const tallaMatch = textoDescripcion.match(/Talla:\s*([^.]+)/);
        if (tallaMatch && tallaMatch[1]) {
          talla = 'Talla: ' + tallaMatch[1].trim();
        }
      }

      const nuevoProducto = {
        img: img,
        nombre: nombre,
        precio: precio,
        talla: talla
      };

      let productos = JSON.parse(localStorage.getItem('carrito')) || [];
      productos.push(nuevoProducto);
      localStorage.setItem('carrito', JSON.stringify(productos));

      // Actualizar contador
      contadorCarrito.textContent = productos.length;

      // Mensaje de confirmación
      const mensaje = document.createElement('div');
      mensaje.textContent = `${nombre} se añadió al carrito`;
      mensaje.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #53214F;
        color: white;
        padding: 10px 20px;
        border-radius: 10px;
        z-index: 9999;
        font-family: Poppins, serif;
      `;
      document.body.appendChild(mensaje);
      setTimeout(() => mensaje.remove(), 2000);
    });
  }

  // Actualiza los contadores al cargar
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  if (contadorCarrito) contadorCarrito.textContent = carrito.length;
  if (contadorFav) contadorFav.textContent = favoritos.length;
});

// Código para el zoom de imagen
document.addEventListener('DOMContentLoaded', function () {
    const imagenDetalles = document.getElementById('imagen-detalles');
    const modal = document.getElementById('zoom-modal');
    const imagenAmpliada = document.getElementById('imagen-ampliada');
    const cerrarModal = document.querySelector('.zoom-cerrar');

    if (imagenDetalles && modal && imagenAmpliada && cerrarModal) {
        // Abrir modal con imagen
        imagenDetalles.addEventListener('click', function () {
            imagenAmpliada.src = this.src;
            imagenAmpliada.classList.remove('zoom'); // Asegura que el zoom no esté activado
            modal.style.display = 'flex';
        });

        // Cerrar modal
        cerrarModal.addEventListener('click', function () {
            modal.style.display = 'none';
            imagenAmpliada.classList.remove('zoom');
        });

        // Zoom al hacer clic en imagen dentro del modal
        imagenAmpliada.addEventListener('click', function () {
            this.classList.toggle('zoom');
        });

        // Cerrar al hacer clic fuera de la imagen
        modal.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                imagenAmpliada.classList.remove('zoom');
            }
        });
    }
});