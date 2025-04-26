document.addEventListener('DOMContentLoaded', function () {
    const profileImage = document.getElementById('profileImage');
    const addPhotoText = document.getElementById('addPhotoText');
    const fileInput = document.getElementById('fileInput');

    ['usuario', 'nombre', 'correo'].forEach(function (field) {
        const savedValue = localStorage.getItem(field);
        if (savedValue) {
            document.getElementById(field).textContent = savedValue;
            originalValues[field] = savedValue;
        }
    });

    const savedPhoto = localStorage.getItem('fotoPerfil');
    if (savedPhoto) {
        setProfileImage(savedPhoto);
        addPhotoText.textContent = 'Cambiar foto de perfil';
    }

    function setProfileImage(src) {
        while (profileImage.firstChild) {
            profileImage.removeChild(profileImage.firstChild);
        }
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Foto de perfil';
        profileImage.appendChild(img);
        checkForChanges();
    }

    addPhotoText.addEventListener('click', () => fileInput.click());
    profileImage.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file && file.type.match('image.*')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgSrc = e.target.result;
                setProfileImage(imgSrc);
                addPhotoText.textContent = 'Cambiar foto de perfil';
                checkForChanges();
            };
            reader.readAsDataURL(file);
        } else {
            showAlert('Formato no válido', 'Por favor selecciona una imagen.', 'error');
        }
    });

    document.querySelectorAll('.edit-icon').forEach(function (icon) {
        icon.addEventListener('click', function () {
            const field = this.getAttribute('data-field');
            enableEditing(field);
        });
    });

    document.getElementById('guardarCambios').addEventListener('click', function () {
        ['usuario', 'nombre', 'correo'].forEach(function (field) {
            const current = document.getElementById(field).textContent;
            localStorage.setItem(field, current);
            originalValues[field] = current;
        });

        const currentPhoto = profileImage.querySelector('img');
        if (currentPhoto) {
            localStorage.setItem('fotoPerfil', currentPhoto.src);
        }

        document.querySelector('.reset-container').style.display = 'none';

        showAlert('¡Cambios guardados!', 'Tu información se ha actualizado correctamente.', 'success');
    });

    document.getElementById('restablecerCambios').addEventListener('click', function () {
        Swal.fire({
            title: '¿Estás segura?',
            text: '¿Deseas restablecer los cambios?',
            icon: 'warning',
            iconColor: '#4F1D3F',
            background: '#ffffff',
            color: '#4F1D3F',
            confirmButtonColor: '#D9C6DD',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Sí, restablecer',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'mi-alerta'
            },
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                ['usuario', 'nombre', 'correo'].forEach(function (field) {
                    const original = originalValues[field];
                    document.getElementById(field).textContent = original;
                    localStorage.removeItem(field);
                });

                while (profileImage.firstChild) {
                    profileImage.removeChild(profileImage.firstChild);
                }
                localStorage.removeItem('fotoPerfil');
                addPhotoText.textContent = 'Agregar foto de perfil';
                document.querySelector('.reset-container').style.display = 'none';

                showAlert('Restablecido', 'Los cambios han sido restablecidos.', 'success');
            }
        });
    });
});

const originalValues = {
    usuario: document.getElementById('usuario').textContent,
    nombre: document.getElementById('nombre').textContent,
    correo: document.getElementById('correo').textContent
};

function enableEditing(field) {
    const element = document.getElementById(field);
    const originalValue = element.textContent;

    const input = document.createElement('input');
    input.type = field === 'correo' ? 'email' : 'text';
    input.value = originalValue;
    input.className = 'edit-input';

    element.innerHTML = '';
    element.appendChild(input);
    input.focus();

    input.addEventListener('blur', function () {
        saveChanges(field, this.value, originalValue);
    });

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') this.blur();
        if (e.key === 'Escape') saveChanges(field, originalValue, originalValue);
    });
}

function saveChanges(field, newValue, originalValue) {
    const element = document.getElementById(field);

    if (newValue.trim() === '') {
        showAlert('Campo vacío', 'El campo no puede estar vacío.', 'warning');
        element.innerHTML = originalValue;
        return;
    }

    if (field === 'correo') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newValue)) {
            showAlert('Correo inválido', 'Por favor ingresa un correo electrónico válido.', 'error');
            element.innerHTML = originalValue;
            return;
        }
    }

    element.innerHTML = newValue;
    checkForChanges();
}

function checkForChanges() {
    let changesDetected = false;

    ['usuario', 'nombre', 'correo'].forEach(function (field) {
        const current = document.getElementById(field).textContent;
        if (current !== originalValues[field]) {
            changesDetected = true;
        }
    });

    const currentPhoto = document.getElementById('profileImage').querySelector('img');
    const originalPhoto = localStorage.getItem('fotoPerfil');
    if ((currentPhoto && currentPhoto.src !== originalPhoto) || (!currentPhoto && originalPhoto)) {
        changesDetected = true;
    }

    document.querySelector('.reset-container').style.display = changesDetected ? 'block' : 'none';
}

// ✅ ALERTAS ESTILIZADAS
function showAlert(title, text, icon) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        iconColor: '#4F1D3F',
        background: '#ffffff',
        color: '#4F1D3F',
        confirmButtonColor: '#D9C6DD',
        confirmButtonText: 'Aceptar',
        customClass: {
            popup: 'mi-alerta'
        }
    });
}
