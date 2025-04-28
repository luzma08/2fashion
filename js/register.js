const SUPABASE_URL="https://hxrcmbaxxfvlgubpdifu.supabase.co";

const supabaseUrl = "https://hxrcmbaxxfvlgubpdifu.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4cmNtYmF4eGZ2bGd1YnBkaWZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0OTgxNzQsImV4cCI6MjA1ODA3NDE3NH0.uPrLyN5PfPv8kx414tZetdQLkiQGXq9Lkg_kJZ1zvyc"; // Usa variables de entorno en producción
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
async function registerUser() {
    
        const nombre = document.getElementById('nombre').value;
        const password = document.getElementById('password').value;
        const telefono = document.getElementById('telefono').value;
        const correo = document.getElementById('email').value;
        
        console.log("Intentando registrar usuario...");
let { data, error } = await supabase.from('usuarios').insert([
{ nombre: nombre, email: correo, contraseñas: password, telefono: telefono}
]);

if (error) {
alert('Error al registrar usuario: ' + error.message)
console.error(error);
} else {

console.log("Usuario registrado:", data);
window.location.href = "../index.html";
}
}

document.getElementById("registroForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que la página se recargue
        registerUser();
    });
