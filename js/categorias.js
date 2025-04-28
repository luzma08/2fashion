// Esperar que todo cargue
document.addEventListener('DOMContentLoaded', function () {
  const buscador = document.getElementById('buscador');
  const productos = document.querySelectorAll('.recuadro-ropa'); // todos los productos

  buscador.addEventListener('input', function () {
      const texto = buscador.value.toLowerCase(); // lo que escribe el usuario en minúscula

      productos.forEach(producto => {
          const nombre = producto.querySelector('.texto-info h4').textContent.toLowerCase();

          if (nombre.includes(texto)) {
              producto.style.display = 'block'; // mostrar si coincide
          } else {
              producto.style.display = 'none'; // ocultar si no coincide
          }
      });
  });
});

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    // Cargar datos del localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    
    // Actualizar contadores
    const contadorCarrito = document.getElementById('contador-carrito');
    const contadorFav = document.getElementById('contador-fav');
    
    if (contadorCarrito) contadorCarrito.textContent = carrito.length;
    if (contadorFav) contadorFav.textContent = favoritos.length;
    
    // Configurar eventos para los botones de carrito
    const iconosCompra = document.querySelectorAll('.fa-cart-shopping');
    const mensajeCarrito = document.getElementById('mensaje-carrito');
    
    iconosCompra.forEach(icono => {
      icono.addEventListener('click', function (e) {
        e.preventDefault();
        
        const recuadro = this.closest('.recuadro-ropa');
        if (!recuadro) return;
        
        const img = recuadro.querySelector('img')?.src || '';
        const nombre = recuadro.querySelector('.texto-info h4')?.textContent || 'Producto';
        const precio = recuadro.querySelector('.texto-precio h3')?.textContent || '$0';
        const talla = recuadro.querySelector('.talla-compra')?.textContent || 'Talla: -';
        
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
        if (contadorCarrito) contadorCarrito.textContent = productos.length;
        
        // Mostrar mensaje
        mensajeCarrito.textContent = `${nombre} se añadió al carrito`;
        mensajeCarrito.style.display = 'block';
        
        setTimeout(() => {
          mensajeCarrito.style.display = 'none';
        }, 2000);
      });
    });
    
    // Configurar eventos para los botones de favoritos
    const iconosFavorito = document.querySelectorAll('.fa-heart');
    
    iconosFavorito.forEach(icono => {
      icono.addEventListener('click', function (e) {
        e.preventDefault();
        
        const recuadro = this.closest('.recuadro-ropa');
        if (!recuadro) return;
        
        const img = recuadro.querySelector('img')?.src || '';
        const nombre = recuadro.querySelector('.texto-info h4')?.textContent || 'Producto';
        const precio = recuadro.querySelector('.texto-precio h3')?.textContent || '$0';
        const talla = recuadro.querySelector('.talla-compra')?.textContent || 'Talla: -';
        
        const nuevoFavorito = {
          img: img,
          nombre: nombre,
          precio: precio,
          talla: talla
        };
        
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        favoritos.push(nuevoFavorito);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        
        // Actualizar contador
        if (contadorFav) contadorFav.textContent = favoritos.length;
        
        // Mostrar mensaje
        mensajeCarrito.textContent = `${nombre} se añadió a tus favoritos`;
        mensajeCarrito.style.display = 'block';
        
        setTimeout(() => {
          mensajeCarrito.style.display = 'none';
        }, 2000);
      });
    });
  });
  
  // Función para redirigir al carrito
  function llevaracarrito(){
    window.location.href = "./carrito.html"
}

  
  // Función para eliminar filtros
  function eliminarChulito() {
    var checkboxes = document.querySelectorAll('.miCheckbox');
    checkboxes.forEach(function(checkbox) {
      checkbox.checked = false;  // Esto quita el chulito
    });
  }
  
  // Función para actualizar el valor actual del rango
  function actualizarValor() {
    var valor = document.getElementById("precio").value;
    document.getElementById("valorActual").textContent = "$" + valor;
  }