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


