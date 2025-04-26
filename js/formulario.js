// Inicialización del documento
document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos DOM
    const form = document.getElementById('prendaForm');
    const resetBtn = document.getElementById('resetBtn');
    const fileInput1 = document.getElementById('imagen1');
    const fileInput2 = document.getElementById('imagen2');
    const preview1 = document.getElementById('preview1');
    const preview2 = document.getElementById('preview2');
    const upload1 = document.getElementById('upload1');
    const upload2 = document.getElementById('upload2');
    const confirmation = document.getElementById('confirmation');
    const closeConfirmation = document.getElementById('closeConfirmation');
  
    // Evento para manejar la carga de imagen 1
    fileInput1.addEventListener('change', function() {
      previewImage(this, preview1, upload1);
    });
  
    // Evento para manejar la carga de imagen 2
    fileInput2.addEventListener('change', function() {
      previewImage(this, preview2, upload2);
    });
  
    // Función para previsualizar la imagen
    function previewImage(input, previewElement, uploadElement) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
          // Crear elemento de imagen
          const img = document.createElement('img');
          img.src = e.target.result;
          
          // Limpiar vista previa anterior
          previewElement.innerHTML = '';
          previewElement.appendChild(img);
          previewElement.style.display = 'block';
          
          // Cambiar estilo del contenedor
          uploadElement.style.borderStyle = 'solid';
          
          // Añadir botón para eliminar la imagen
          const removeBtn = document.createElement('button');
          removeBtn.className = 'remove-image';
          removeBtn.innerHTML = '×';
          removeBtn.onclick = function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            // Limpiar imagen y reset del input
            previewElement.innerHTML = '';
            previewElement.style.display = 'none';
            input.value = '';
            uploadElement.style.borderStyle = 'dashed';
          };
          
          previewElement.appendChild(removeBtn);
        };
        
        reader.readAsDataURL(input.files[0]);
      }
    }
  
    // Evento para enviar el formulario
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validar formulario
      if (validateForm()) {
        // Simulación de envío (aquí se enviaría a un servidor)
        saveForm();
      }
    });
  
    // Validación del formulario
    function validateForm() {
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      
      // Limpiar mensajes de error previos
      const errorMessages = form.querySelectorAll('.error-message');
      errorMessages.forEach(msg => msg.remove());
      
      // Validar campos requeridos
      requiredFields.forEach(field => {
        if ((field.type === 'file' && !field.files[0]) || 
            (field.type !== 'file' && !field.value.trim())) {
          
          showError(field, 'Este campo es obligatorio');
          isValid = false;
        }
      });
      
      // Validar formato de email
      const email = document.getElementById('contacto');
      if (email.value && !validateEmail(email.value)) {
        showError(email, 'Por favor ingresa un correo electrónico válido');
        isValid = false;
      }
      
      return isValid;
    }
  
    // Mostrar mensaje de error
    function showError(field, message) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.style.color = 'var(--error-color)';
      errorDiv.style.fontSize = '14px';
      errorDiv.style.marginTop = '5px';
      errorDiv.textContent = message;
      
      // Encontrar el elemento padre adecuado para mostrar el error
      if (field.type === 'radio') {
        const radioGroup = field.closest('.estado-options');
        if (!radioGroup.querySelector('.error-message')) {
          radioGroup.appendChild(errorDiv);
        }
      } else if (field.type === 'checkbox') {
        const checkboxParent = field.closest('.terms');
        if (!checkboxParent.querySelector('.error-message')) {
          checkboxParent.appendChild(errorDiv);
        }
      } else if (field.type === 'file') {
        const uploadParent = field.closest('.image-upload');
        if (!uploadParent.querySelector('.error-message')) {
          uploadParent.appendChild(errorDiv);
        }
      } else {
        const parent = field.parentElement;
        if (!parent.querySelector('.error-message')) {
          parent.appendChild(errorDiv);
        }
      }
      
      // Resaltar campo con error
      if (field.type !== 'radio' && field.type !== 'checkbox') {
        field.style.borderColor = 'var(--error-color)';
        
        // Quitar estilo de error cuando el usuario cambie el valor
        field.addEventListener('input', function() {
          this.style.borderColor = '';
          const error = this.parentElement.querySelector('.error-message');
          if (error) {
            error.remove();
          }
        }, { once: true });
      }
    }
  
    // Validar formato de email
    function validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  
    // Guardar formulario (simulado)
    function saveForm() {
      // Aquí se haría la petición AJAX al servidor
      // Simulamos un tiempo de espera
      
      // Cambiar botón de envío a "Enviando..."
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        // Mostrar mensaje de confirmación
        confirmation.classList.add('active');
        
        // Restaurar botón
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Recopilar datos para enviar (para demostración)
        const formData = new FormData(form);
        console.log('Datos del formulario listos para enviar:');
        for (let [key, value] of formData.entries()) {
          if (key !== 'imagen1' && key !== 'imagen2') {
            console.log(`${key}: ${value}`);
          } else {
            console.log(`${key}: ${value.name}`);
          }
        }
      }, 1500);
    }
  
    // Cerrar confirmación
    closeConfirmation.addEventListener('click', function() {
      confirmation.classList.remove('active');
      form.reset();
      resetPreviews();
    });
  
    // Reiniciar formulario
    resetBtn.addEventListener('click', function() {
      form.reset();
      resetPreviews();
      
      // Eliminar mensajes de error
      const errorMessages = form.querySelectorAll('.error-message');
      errorMessages.forEach(msg => msg.remove());
      
      // Restaurar estilos de los campos
      const fields = form.querySelectorAll('input, select, textarea');
      fields.forEach(field => {
        field.style.borderColor = '';
      });
    });
  
    // Limpiar previsualizaciones
    function resetPreviews() {
      preview1.innerHTML = '';
      preview2.innerHTML = '';
      preview1.style.display = 'none';
      preview2.style.display = 'none';
      upload1.style.borderStyle = 'dashed';
      upload2.style.borderStyle = 'dashed';
    }
  });