document.addEventListener('DOMContentLoaded', function() {
    const profileImage = document.getElementById('profileImage');
    const addPhotoText = document.getElementById('addPhotoText');
    const fileInput = document.getElementById('fileInput');
    
    // Evento para abrir el selector de archivos cuando se hace clic en el texto
    addPhotoText.addEventListener('click', function() {
        fileInput.click();
    });
    
    // También permite hacer clic en la imagen para seleccionar una foto
    profileImage.addEventListener('click', function() {
        fileInput.click();
    });
    
    // Cuando se selecciona un archivo
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        
        if (file) {
            // Verificar que sea una imagen
            if (!file.type.match('image.*')) {
                alert('Por favor selecciona una imagen.');
                return;
            }
            
            // Crear un objeto URL para la imagen seleccionada
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Eliminar el placeholder
                while (profileImage.firstChild) {
                    profileImage.removeChild(profileImage.firstChild);
                }
                
                // Crear y agregar la imagen
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Foto de perfil';
                profileImage.appendChild(img);
                
                // Cambiar el texto
                addPhotoText.textContent = 'Cambiar foto de perfil';
                // Añadir nuevamente el icono después de cambiar el texto
                addPhotoText.setAttribute('data-changed', 'true');
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    // Script adicional para restaurar el icono después de cambiar el texto
    addPhotoText.addEventListener('data-changed', function() {
        // Este evento personalizado se dispara cuando se cambia el texto
        // Para mantener la consistencia del icono
        let currentText = addPhotoText.textContent;
        addPhotoText.textContent = "";
        addPhotoText.textContent = currentText;
    });
});