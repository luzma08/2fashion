document.addEventListener('DOMContentLoaded', function () {
    const botonFavorito = document.querySelector('.icono-fav-agregar');
    const contadorFav = document.getElementById('contador-fav');

    botonFavorito.addEventListener('click', function (e) {
      e.preventDefault();

      const img = document.getElementById('imagen-detalles')?.src || '';
      const nombre = document.querySelector('.titulo-prenda')?.textContent || 'Producto';
      const precio = document.querySelector('.precio')?.textContent || '$0';

      const nuevoFavorito = {
        img: img,
        nombre: nombre,
        precio: precio,
        talla: 'Talla: 32'
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

    // Actualiza el contador al cargar
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    contadorFav.textContent = favoritos.length;
  });



document.addEventListener('DOMContentLoaded', function () {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    document.getElementById('contador-carrito').textContent = carrito.length;
    document.getElementById('contador-fav').textContent = favoritos.length;
  });






document.addEventListener('DOMContentLoaded', function () {
    const imagenDetalles = document.getElementById('imagen-detalles');
    const modal = document.getElementById('zoom-modal');
    const imagenAmpliada = document.getElementById('imagen-ampliada');
    const cerrarModal = document.querySelector('.zoom-cerrar');

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
});
