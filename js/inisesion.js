document.getElementById("userSelect").addEventListener("change", function() {
    const selectedValue = this.value;
    if (selectedValue) {
        window.location.href = selectedValue; // Redirige en la misma pestaña
    }
});
const supabaseUrl = "https://hxrcmbaxxfvlgubpdifu.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4cmNtYmF4eGZ2bGd1YnBkaWZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0OTgxNzQsImV4cCI6MjA1ODA3NDE3NH0.uPrLyN5PfPv8kx414tZetdQLkiQGXq9Lkg_kJZ1zvyc";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function loginUser() {
    const correo = document.getElementById('email').value;
    const password = document.getElementById('contraseña').value;
    
    console.log("Intentando iniciar sesión con:", correo);
    
    try {
        // Corregido: asegúrate de que 'contrasena' sea el nombre correcto del campo
        let { data, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('email', correo)
            .eq('contrasena', password)  // Asegúrate de que este es el nombre correcto
            .single();  // Para traer solo un usuario
        
        console.log("Resultado de la consulta:", data, error);
        
        if (error || !data) {
            alert("Correo o contraseña incorrectos");
            console.error(error);
        } else {
            console.log("Usuario encontrado:", data);
            
            // Guarda alguna información del usuario en localStorage (opcional)
            localStorage.setItem('userId', data.id);
            localStorage.setItem('userEmail', data.email);
            
            window.location.href = "../index.html";
        }
    } catch (e) {
        console.error("Error en la autenticación:", e);
        alert("Error al intentar iniciar sesión");
    }
}