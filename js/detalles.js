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
